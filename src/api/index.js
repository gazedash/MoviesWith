// @flow
import qs from 'qs';

export const ENDPOINT = 'https://api.themoviedb.org';
export const VERSION = '3';
import SECRET from "./secret"; const api_key = SECRET;

export function buildUrl(method: ?string, args: ?Object): string {
  if (method) {
    const query = qs.stringify({ ...args, api_key }, { addQueryPrefix: true });
    return `${ENDPOINT}/${VERSION}/${method}${query}`;
  }
  return '';
}

function fetchJson(method: string, args: ?Object): Promise<any> {
  const url = buildUrl(method, args);
  return fetch(url).then(res => res.json()).catch((error) => {
    console.error(error);
    return { error };
  });
}

const fetchActor = async (query: string): Object =>
  fetchJson('search/person', { query });

const fetchMovies = async ({ type = 'movie', ...args }: Object): Object =>
  fetchJson(`discover/${type}`, args);

const fetchCast = async (id: string | number, type = 'movie'): Object =>
  fetchJson(`${type}/${id}/credits`);

export default {
  fetchActor,
  fetchMovies,
  fetchCast,
};
