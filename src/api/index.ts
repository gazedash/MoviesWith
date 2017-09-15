// @flow
import { stringify } from 'qs';

export const ENDPOINT = 'https://api.themoviedb.org';
export const VERSION = '3';
import SECRET from "./secret"; const api_key = SECRET;

export function buildUrl(method?: string, args?: Object): string {
  if (method) {
    const query = stringify({ ...args, api_key }, { addQueryPrefix: true });
    return `${ENDPOINT}/${VERSION}/${method}${query}`;
  }
  return '';
}

function fetchJson(method: string, args?: Object): Promise<{}> {
  const url = buildUrl(method, args);
  return fetch(url).then(res => res.json()).catch((error) => {
    console.error(error);
    return { error };
  });
}

export const fetchActor = async (query?: string): Promise<{}> =>
  fetchJson('search/person', { query });

interface FetchMoviesParams {
  type?: 'movie' | 'tv';
  with_cast?: string | number;
}
export const fetchMovies =  ({ type = 'movie', ...args }: FetchMoviesParams): Promise<{}> =>
  fetchJson(`discover/${type}`, args);

export const fetchCast = async (id: string | number, type = 'movie'): Promise<{}> =>
  fetchJson(`${type}/${id}/credits`);

export default {
  fetchActor,
  fetchMovies,
  fetchCast,
};
