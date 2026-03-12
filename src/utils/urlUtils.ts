export function buildQueryString(params: Record<string, string | number | boolean>): string {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
}

export function parseQueryString(query: string): Record<string, string> {
  return Object.fromEntries(
    query.replace(/^\?/, '').split('&').filter(Boolean).map(pair => {
      const [key, val] = pair.split('=');
      return [decodeURIComponent(key), decodeURIComponent(val ?? '')];
    })
  );
}
