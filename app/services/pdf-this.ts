// html-pdf.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import HtmlPdfApi from "../api/html-pdf-api";
  import { getRecaptchaToken, resetRecaptcha } from '~/services/reCaptcha'

// ---- Types ----

type Appendable = string | Node | ArrayLike<Node> | null | undefined;

export type CopyTagMode = boolean | "b" | "h" | "bh";

export interface PdfOptions {
  // behavior & content capture
  debug?: boolean;                 // show the pdfFrame for debugging (not used visually here, kept for parity)
  importCSS?: boolean;             // import <link rel="stylesheet"> from parent
  importStyle?: boolean;           // import <style> tags from parent
  pdfContainer?: boolean;          // keep selected elements as containers vs. their children
  loadCSS?: string | string[];     // extra CSS file(s)
  pageTitle?: string;              // title in the output HTML
  removeInline?: boolean;          // strip inline styles
  removeInlineSelector?: string;   // selector for stripping inline styles (when removeInline is true)
  header?: Appendable;             // prefix content
  footer?: Appendable;             // postfix content
  base?: boolean | string;         // true => copy <base> href; string to force URL; false => current origin
  baseUrl?: string;                // base URL for the PDF
  formValues?: boolean;            // copy form values
  canvas?: boolean;                // clone canvas content
  removeScripts?: boolean;         // remove <script> tags in cloned content
  copyTagClasses?: CopyTagMode;    // copy classes from html/body (uses "b" branch below)
  copyTagStyles?: CopyTagMode;     // copy inline styles from html/body (uses "b" branch below)

  // Required for download (moved here from implicit global references)
  downloadFileName: string;        // e.g., "report.pdf"
}

// Ensure window typing for scbdApp usage
declare global {
  interface Window {
    scbdApp?: { accountsUrl: string };
  }
}

// ---- Defaults ----
const defaultOptions: Omit<PdfOptions, "downloadFileName"> = {
  debug: false,
  importCSS: true,
  importStyle: true,
  pdfContainer: true,
  loadCSS: "",
  pageTitle: "",
  removeInline: false,
  removeInlineSelector: "*",
  header: null,
  footer: null,
  base: false,
  formValues: true,
  canvas: true,
  removeScripts: false,
  copyTagClasses: true,
  copyTagStyles: true,
};

// ---- Implementation helpers ----

function appendContent(element: HTMLElement, content: Appendable): void {
  if (!content) return;

  if (typeof content === "string") {
    // Parse the string as HTML and append resulting nodes
    const temp = document.createElement("div");
    temp.innerHTML = content;
    while (temp.firstChild) {
      element.appendChild(temp.firstChild);
    }
  } else if (content instanceof Node) {
    element.appendChild(content.cloneNode(true));
  } else if ((content as any).length !== undefined && content !== (window as any)) {
    // NodeList, HTMLCollection, Array of Nodes, (or jQuery-like)
    Array.from(content as ArrayLike<Node>).forEach((node) => {
      if (node instanceof Node) {
        element.appendChild(node.cloneNode(true));
      }
    });
  }
}

function copyFormValues(source: Element, target: Element): void {
  const sourceInputs = source.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    "input, select, textarea"
  );
  const targetInputs = target.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    "input, select, textarea"
  );

  const allSource: (Element | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[] = Array.from(sourceInputs);
  const allTarget: (Element | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[] = Array.from(targetInputs);

  // Include roots if they are form elements
  if (["INPUT", "SELECT", "TEXTAREA"].includes(source.tagName)) {
    allSource.unshift(source);
    allTarget.unshift(target);
  }

  for (let i = 0; i < allSource.length; i++) {
    if (i >= allTarget.length) break;
    const s = allSource[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const t = allTarget[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    if (s.tagName !== t.tagName) continue;

    if (s.tagName === "SELECT" || s.tagName === "TEXTAREA") {
      (t as HTMLSelectElement | HTMLTextAreaElement).value = (s as any).value;
    } else if (s.tagName === "INPUT") {
      const si = s as HTMLInputElement;
      const ti = t as HTMLInputElement;
      if (si.type === "checkbox" || si.type === "radio") {
        ti.checked = si.checked;
      } else if (si.type !== "file") {
        ti.value = si.value;
      }
    }
  }
}

function appendBody(body: HTMLElement, elements: Element[], options: PdfOptions): void {
  if (!elements || elements.length === 0) return;

  elements.forEach((element) => {
    if (!(element instanceof Node)) return;

    const clone = element.cloneNode(true) as Element;

    if (options.formValues) {
      copyFormValues(element, clone);
    }

    if (options.removeScripts) {
      (clone as Element).querySelectorAll("script").forEach((s) => s.remove());
    }

    if (options.pdfContainer) {
      body.appendChild(clone);
    } else {
      // Append children of clone (flatten)
      while (clone.firstChild) {
        body.appendChild(clone.firstChild);
      }
    }
  });
}

// ---- Main API ----
// In "production" (per original logic), force API_DIRECT_URL
const API_DIRECT_URL = "https://api-direct.cbd.int";
const htmlPdfApi = new HtmlPdfApi({
    prefixUrl: isProduction() ? API_DIRECT_URL : '/'
});


function isProduction(): boolean {
  // Preserved original logic
  return (window.scbdApp?.accountsUrl || "").indexOf("accounts.cbd.int") >= 0;
}

/**
 * Convert selected DOM content to PDF by sending a generated HTML snapshot to the API.
 * @param selector CSS selector, a Node, or an array-like of Nodes
 * @param options PdfOptions (must include downloadFileName)
 */
export async function pdfThis(
  selector: string | Node | ArrayLike<Node>,
  options: PdfOptions
): Promise<void> {
  const resolved: PdfOptions = {
    ...defaultOptions,
    ...options,
  };

  // Normalize selection
  let elements: Element[] = [];
  if (typeof selector === "string") {
    elements = Array.from(document.querySelectorAll(selector));
  } else if (selector instanceof Node) {
    elements = [selector as Element];
  } else if (selector && (selector as any).length !== undefined && selector !== (window as any)) {
    elements = Array.from(selector as ArrayLike<Node>).filter((e): e is Element => e instanceof Element);
  }

  const strFrameName = "pdfThis-" + new Date().getTime();

  // Keep old behavior: handle existing frame (likely won't exist since id is timestamped)
  const existingFrame = document.getElementById(strFrameName);
  if (existingFrame && !resolved.debug) {
    const ef = existingFrame as HTMLElement;
    ef.style.position = "absolute";
    ef.style.width = "0px";
    ef.style.height = "0px";
    ef.style.left = "-600px";
    ef.style.top = "-600px";
  }

  // Build a virtual HTML document (in-memory)
  const frame = document.createElement("div");
  frame.id = strFrameName;
  frame.setAttribute("name", "pdfIframe");

  const head = document.createElement("head");
  frame.appendChild(head);

  const body = document.createElement("body");
  frame.appendChild(body);

  // Base URL determination
  const baseTag = document.querySelector("base");
  let baseURL: string;
   if (resolved.base === true && resolved.baseUrl) {
    baseURL = resolved.baseUrl;
  } else if (resolved.base === true && baseTag && (baseTag as HTMLBaseElement).href) {
    baseURL = (baseTag as HTMLBaseElement).href;
  } else if (typeof resolved.base === "string") {
    baseURL = resolved.base;
  } else {
    baseURL = window.location.protocol + "//" + window.location.host;
  }
  head.insertAdjacentHTML("beforeend", `<base href="${baseURL}">`);

  // Pull in <link rel="stylesheet"> from parent
  if (resolved.importCSS) {
    document.querySelectorAll<HTMLLinkElement>("link[rel=stylesheet]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const media = link.getAttribute("media") || "all";
        head.insertAdjacentHTML(
          "beforeend",
          `<link type="text/css" rel="stylesheet" href="${href}" media="${media}">`
        );
      }
    });
  }

  // Pull in <style> tags from parent (strip sourceMappingURL comments)
  if (resolved.importStyle) {
    document.querySelectorAll<HTMLStyleElement>("style").forEach((style) => {
      const cleaned = style.outerHTML.replace(/\/\*\# sourceMappingURL=.*\*\//gim, "");
      head.insertAdjacentHTML("beforeend", cleaned);
    });
  }

  // Optional <title>
  if (resolved.pageTitle) {
    head.insertAdjacentHTML("beforeend", `<title>${resolved.pageTitle}</title>`);
  }

  // Additional CSS file(s)
  if(!resolved.loadCSS){
    resolved.loadCSS = '/app/css/print-friendly.css'
  }
  if (resolved.loadCSS) {
    const cssList = Array.isArray(resolved.loadCSS) ? resolved.loadCSS : [resolved.loadCSS];
    cssList.forEach((href) => {
      head.insertAdjacentHTML("beforeend", `<link type="text/css" rel="stylesheet" href="${href}">`);
    });
  }

  // Copy root tag classes (kept original semantics: only handles 'b' branch here)
  let tag: CopyTagMode = resolved.copyTagClasses;
  if (tag) {
    tag = tag === true ? "bh" : tag;
    if ((tag as string).indexOf("b") !== -1) {
      body.className = document.body.className;
    }
  }

  // Copy root tag inline styles (kept original semantics: only handles 'b' branch here)
  tag = resolved.copyTagStyles;
  if (tag) {
    tag = tag === true ? "bh" : tag;
    if ((tag as string).indexOf("b") !== -1) {
      (body as HTMLElement).style.cssText = (document.body as HTMLElement).style.cssText;
    }
  }

  // Header content
  appendContent(body, resolved.header ?? null);

  // Canvas handling: tag originals
  if (resolved.canvas) {
    let canvasId = 0;
    elements.forEach((el) => {
      if ((el as Element).tagName === "CANVAS") {
        (el as Element).setAttribute("data-pdfThis", String(canvasId++));
      }
      el.querySelectorAll("canvas").forEach((c) => {
        c.setAttribute("data-pdfThis", String(canvasId++));
      });
    });
  }

  // Clone body content
  appendBody(body, elements, resolved);

  // Canvas: redraw the clones using the originals
  if (resolved.canvas) {
    body.querySelectorAll<HTMLCanvasElement>("canvas").forEach((canvas) => {
      const cid = canvas.getAttribute("data-pdfThis");
      if (cid) {
        const src = document.querySelector<HTMLCanvasElement>(`[data-pdfThis="${cid}"]`);
        if (src) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(src, 0, 0);
          }
        }
      }
    });

    // Cleanup the data attributes on the original nodes
    elements.forEach((el) => {
      if ((el as Element).tagName === "CANVAS") (el as Element).removeAttribute("data-pdfThis");
      el.querySelectorAll("canvas").forEach((c) => c.removeAttribute("data-pdfThis"));
    });
  }

  // Remove inline styles if requested
  if (resolved.removeInline) {
    const sel = resolved.removeInlineSelector || "*";
    body.querySelectorAll<HTMLElement>(sel).forEach((el) => el.removeAttribute("style"));
  }

  // Footer content
  appendContent(body, resolved.footer ?? null);
  body.classList.add('print')

  // Final HTML payload
  const html = "<html>" + frame.innerHTML + "</html>";

  if (existingFrame) existingFrame.remove();

  // Dispatch to API and download
  await sendHtmlToPdf(
    html,
    resolved.downloadFileName,
    baseURL
  );
}

async function sendHtmlToPdf(
  html: string,
  downloadFileName: string,
  baseUrl:string
): Promise<void> {
  try {

    const captchaToken = await getRecaptchaToken();
    
    const pdfBlob: Blob = await htmlPdfApi.generatePdf(html, downloadFileName, baseUrl as any, captchaToken as any);

    // Create an object URL and trigger download
    const url = window.URL.createObjectURL(pdfBlob);
    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", downloadFileName);
    tempLink.click();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    // Safer logging
    const err = e as Error;
    console.error("PDF generation failed:", err?.message || e);
  }
}
