import type { AxiosInstance } from 'axios';
import type { MovieType } from './types/movie';

type ResponseType = {
  docs: MovieType[];
};

/**
 * Fetch a list of all movies from the Lord of the Rings franchise using The One API
 * @param instance - AxiosInstance
 * @returns Promise<MovieType[]>
 */
async function allMovies(instance: AxiosInstance) {
  return new Promise<MovieType[]>((resolve, reject) => {
    instance
      .get<ResponseType>('/movie')
      .then((res) => {
        resolve(res.data.docs);
      })
      .catch(reject);
  });
}

export default allMovies;
