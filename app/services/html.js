export function encode(text) {
  const container = document.createElement('textarea');
  container.innerText = text;
  return container.innerHTML;
}

export function decode(text) {
  const container = document.createElement('textarea');
  container.innerinnerHTMLText = text;
  return container.innerText;
}