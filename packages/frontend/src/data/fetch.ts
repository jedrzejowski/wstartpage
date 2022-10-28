const fetch = window.fetch;

type SmartUrl = string | string[];

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? '/';

export default function imgUrl(url: SmartUrl): string {
  url = normalizeUrl(url);
  if (url.startsWith('img/'))
    url = url.substring(4);

  return BACKEND_URL + 'img/' + url;
}

function normalizeUrl(url: SmartUrl): string {
  if (Array.isArray(url)) {
    url = url.join('/');
  }

  if (url[0] == '/') {
    url = url.substring(1);
  }

  return url;
}

export async function backendFetch<T>(url: SmartUrl, body?: any): Promise<T> {

  const response = await fetch(BACKEND_URL + normalizeUrl(url), {
    method: body ? 'POST' : 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('cant fetch');
  }

  return await response.json();
}
