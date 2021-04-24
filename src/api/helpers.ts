export const BASE_URL = '/api/';

export function url(url: string, base = BASE_URL): string {
  const baseWithoutEndingSlash = base.replace(/\/$/, '');
  const urlWithoutStartingSlash = url.replace(/^\//, '');

  return `${baseWithoutEndingSlash}/${urlWithoutStartingSlash}`;
}
