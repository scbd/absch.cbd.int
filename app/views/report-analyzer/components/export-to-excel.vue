<template>    
    <button class="btn btn-success" :disabled="isExporting || !hasData" @click="exportToExcel">
        <i class="fa fa-file-excel-o" aria-hidden="true"></i>
        <span v-if="isExporting"> Exporting…</span>
        <span v-else> Export</span>
    </button>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { computed, ref } from 'vue';
import { lstring } from '~/components/kb/filters';

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps({
    /**
     * Array of section objects from the analyzer, each shaped:
     * { key, title, questions: [{ key, type, title, ... }], reports: [{ government, documentId, Qxxx, ... }] }
     */
    sections: {
        type: Array,
        default: () => []
    },
    /** Optional filename (without extension) */
    filename: {
        type: String,
        default: 'report-export'
    }
});

// ─── State ────────────────────────────────────────────────────────────────────
const isExporting = ref(false);

const hasData = computed(() =>{
    return Array.isArray(props.sections) &&
    props.sections.some(s => s.reports?.length > 0)
    }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safely read a dot-notation path from an object. */
function getByPath(obj, path) {
    return path.split('.').reduce((cur, key) => (cur != null ? cur[key] : undefined), obj);
}

/**
 * Resolve a value that may be a plain string or an lstring object { en: "…", fr: "…" }.
 * Prefers English, falls back to first available language.
 */
function resolveLstring(val) {
    if (!val) return '';
    if (typeof val === 'string') return stripHtmlToText(val);
    if (typeof val === 'object') {
        return stripHtmlToText(lstring(val));
    }
    return String(stripHtmlToText(val));
}

/**
 * Given a Q-field value, collect all leaf sub-paths.
 * e.g.  { value: 242, details: { es: "..." } }  →  ['value', 'details.es']
 * A primitive or null  →  [] (use the Q key directly as the column)
 * A string / number   →  [] (use the Q key directly)
 */
function leafPaths(val, prefix = '') {
    if (val === null || val === undefined || typeof val !== 'object') return [];
    const paths = [];
    for (const [k, v] of Object.entries(val)) {
        const p = prefix ? `${prefix}.${k}` : k;
        if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
            paths.push(...leafPaths(v, p));
        } else {
            paths.push(p);
        }
    }
    return paths;
}

/**
 * Collect the ordered list of Q-column descriptors for a given section.
 * Returns [ { qKey, subPath|null, colId, label } ]
 *
 * - colId  is the column key used in the data row object
 * - label  is the header text shown in Excel row 2
 */
function buildQColumns(section) {
    const { questions = [], reports = [] } = section;
    const colMap = new Map(); // preserve insertion order

    // Walk question definitions (gives us the canonical order)
    for (const q of questions) {
        // Find a sample record that has this Q field to sniff sub-paths
        const sampleVal = reports.map(r => r[q.key]).find(v => v !== undefined && v !== null);
        const paths = sampleVal !== undefined ? leafPaths(sampleVal) : [];

        if (paths.length === 0) {
            // Primitive / missing — single column
            const colId = q.key;
            if (!colMap.has(colId)) colMap.set(colId, { qKey: q.key, subPath: null, colId, label: q.key });
        } else {
            for (const sub of paths) {
                const colId = `${q.key}.${sub}`;
                if (!colMap.has(colId)) colMap.set(colId, { qKey: q.key, subPath: sub, colId, label: colId });
            }
        }
    }

    return Array.from(colMap.values());
}

/** Resolve a column's value from a report record. */
function mapAnswerToQuestion(value, question) {
    if (value === undefined || value === null || value === '') return '';

    // Normalize objects (value/details/identifier) to primitive
    if (typeof value === 'object') {
        if (value.details !== undefined && value.details !== null) {
            value = value.details;
        } else if (value.value !== undefined && value.value !== null) {
            value = value.value;
        } else if (value.identifier !== undefined && value.identifier !== null) {
            value = value.identifier;
        } else {
            // For lstring-style objects
            return resolveLstring(value);
        }
    }

    if (Array.isArray(value)) {
        return value
            .map(v => mapAnswerToQuestion(v, question))
            .filter(v => v !== '' && v !== undefined && v !== null)
            .join(', ');
    }

    if (typeof value === 'string') {
        const option = (question?.options || []).find(o =>
            o != null && (
                o.identifier === value ||
                o.value === value ||
                o.key === value ||
                o.id === value
            )
        );

        if (option) {
            const text = option.customValue ?? option.title ?? option.label ?? option.text ?? option.name;
            if (text !== undefined && text !== null && text !== '') {
                return resolveLstring(text);
            }
        }

        return resolveLstring(value);
    }

    return resolveLstring(value);
}

function resolveValue(record, col, section) {
    const qVal = record[col.qKey];
    if (qVal === undefined || qVal === null) return '';

    const raw = col.subPath === null ? qVal : getByPath(qVal, col.subPath);
    if (raw === undefined || raw === null) return '';

    const question = section?.questions?.find(q => q.key === col.qKey);
    return mapAnswerToQuestion(raw, question);
}

// ─── Excel build ──────────────────────────────────────────────────────────────

/**
 * Encode a 0-based column index to an Excel column letter (A, B, … Z, AA …).
 */
function colLetter(idx) {
    let letter = '';
    idx++; // 1-based
    while (idx > 0) {
        const rem = (idx - 1) % 26;
        letter = String.fromCharCode(65 + rem) + letter;
        idx = Math.floor((idx - 1) / 26);
    }
    return letter;
}
function stripHtmlToText(html) {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').trim();
}

async function fetchCountryNameMap() {
    try {
        const apiBase = window.scbdApp?.apiUrl || '';
        const res = await fetch(`${apiBase}/api/v2013/thesaurus/domains/countries/terms`);
        if (!res.ok) return new Map();
        const terms = await res.json();
        const map = new Map();
        for (const t of (terms || [])) {
            const id = (t.identifier || '').toLowerCase();
            const name = resolveLstring(t.title) || id;
            if (id) map.set(id, name);
        }
        return map;
    } catch {
        return new Map();
    }
}

async function exportToExcel() {
    if (!hasData.value) return;
    isExporting.value = true;

    try {
        // ── 0. Resolve government names from thesaurus ───────────────────────
        const countryNameMap = await fetchCountryNameMap();

        // ── 1. Build column descriptors ─────────────────────────────────────
        // Fixed columns
        const fixed = [
            { colId: 'government', label: 'Government' },
            { colId: 'documentId', label: 'DocumentId' }
        ];

        // Per-section Q columns
        const sectionMeta = props.sections
            .filter(s => Array.isArray(s.reports) && s.reports.length)
            .map(s => ({
                key: s.key,
                title: resolveLstring(s.title) || s.key,
                qCols: buildQColumns(s)
            }))
            .filter(s => s.qCols.length > 0);

        const allQCols = sectionMeta.flatMap(s => s.qCols);
        const allCols  = [...fixed, ...allQCols];

        // ── 2. Build all unique records (merge across sections) ─────────────
        // Key by government identifier to produce one row per country
        const rowMap = new Map(); // government → merged row object

        for (const sm of sectionMeta) {
            const section = props.sections.find(s => s.key === sm.key);
            for (const report of section.reports) {
                const gov = report.government ?? '';
                if (!rowMap.has(gov)) {
                    rowMap.set(gov, {
                        government: countryNameMap.get(gov),
                        documentId: report.documentId ?? ''
                    });
                }
                const row = rowMap.get(gov);
                for (const col of sm.qCols) {
                    row[col.colId] = resolveValue(report, col, section);
                }
            }
        }

        const dataRows = Array.from(rowMap.values());

        // ── 3. Build worksheet manually (two header rows + data) ─────────────
        //   Row 1: blank | blank | [Part N title spanning its Q cols] | …
        //   Row 2: Government | DocumentId | Q001 | Q002 | …
        //   Row 3+: data

        const ws = {};
        const merges = [];

        // Helper to set a cell
        const setCell = (r, c, v, t = 's') => {
            const addr = `${colLetter(c)}${r}`;
            ws[addr] = { v, t };
        };

        // Row 1 — Part titles (merged over their Q columns)
        let colIdx = 0;
        // Fixed columns: blank in row 1
        setCell(1, colIdx++, '');
        setCell(1, colIdx++, '');

        for (const sm of sectionMeta) {
            const startCol = colIdx;
            const endCol   = colIdx + sm.qCols.length - 1;
            setCell(1, startCol, sm.title);
            // Fill remaining cells in the merge range (SheetJS needs only the first cell)
            for (let c = startCol + 1; c <= endCol; c++) setCell(1, c, '');
            if (endCol > startCol) {
                merges.push({ s: { r: 0, c: startCol }, e: { r: 0, c: endCol } });
            }
            colIdx += sm.qCols.length;
        }

        // Row 2 — column labels
        let col2 = 0;
        for (const col of allCols) {
            setCell(2, col2++, col.label);
        }

        // Row 3+ — data
        dataRows.forEach((row, ri) => {
            let ci = 0;
            for (const col of allCols) {
                const val = row[col.colId] ?? '';
                const t   = typeof val === 'number' ? 'n' : 's';
                setCell(3 + ri, ci++, val, t);
            }
        });

        // Worksheet range
        const totalRows  = 2 + dataRows.length;
        const totalCols  = allCols.length;
        ws['!ref']    = `A1:${colLetter(totalCols - 1)}${totalRows}`;
        ws['!merges'] = merges;

        // Column widths
        ws['!cols'] = allCols.map(c => ({ wch: Math.max(c.label.length + 2, 12) }));

        // ── 4. Write file ────────────────────────────────────────────────────
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
        XLSX.writeFile(wb, `${props.filename}.xlsx`);
    } finally {
        isExporting.value = false;
    }
}
</script>
