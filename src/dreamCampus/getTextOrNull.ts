export function getTextOrNull(element: Element | null) {
  const text = element?.textContent?.trim();
  return text ? text : null;
}
