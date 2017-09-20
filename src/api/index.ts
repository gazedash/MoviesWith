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
  console.log(url);
  return fetch(url).then(res => res.json()).catch((error) => {
    console.error(error);
    return { error };
  });
}

export const fetchActor = async (query?: string): Promise<{}> =>
  fetchJson('search/person', { query });

interface FetchMoviesParams {
  type?: 'movie' | 'tv' | 'combined';
  with_cast?: string | number;
  page?: number;
}

interface FetchTVorEverything extends FetchMoviesParams {
  type?: 'tv' | 'combined';
}

// Basically there is no point in type, because 'discover/tv' can't search by cast
export const fetchMovies =  ({ type = 'movie', ...args }: FetchMoviesParams): Promise<{}> => type === 'movie' ?
  fetchJson(`discover/${type}`, args) : fetchTVorEverything({ type, ...args});

// I search movies with different method because I can search it by cast (multiple actors...)
export const fetchTVorEverything = ({ type = 'tv', with_cast = 0, ...args}: FetchTVorEverything): Promise<{}> =>
  fetchJson(`person/${with_cast}/${type}_credits`);

// export const fetchCast = async (id: string | number, type = 'movie'): Promise<{}> =>
//   fetchJson(`${type}/${id}/credits`);

export default {
  fetchActor,
  fetchMovies,
  // fetchCast,
};
