import axios, { CreateAxiosDefaults } from 'axios';
import { AllMovies, MovieType } from './movie';

interface AndrewGivensSDKType {
  authenticate: (bearerToken: string) => AndrewGivensSDKType;
  allMovies: () => Promise<MovieType[]>;
}

/** @public An SDK for interacting with The One API */
class AndrewGivensSDK implements AndrewGivensSDKType {
  private bearerToken: string = '';
  private axiosConfig: CreateAxiosDefaults<any> = {
    baseURL: 'https://the-one-api.dev/v2',
  };

  /**
   * Authenticates the AndrewGivensSDK instance
   *
   * @param bearerToken - Token for The One API
   *
   * @example
   * ```
   * AndrewGivensSDK.authenticate('the-one-api-token')
   * ```
   */
  authenticate(bearerToken: string) {
    this.bearerToken = bearerToken;
    this.axiosConfig = {
      ...this.axiosConfig,
      headers: { Authorization: `Bearer ${this.bearerToken}` },
    };

    return this;
  }

  /**
   * Get a list of all movies from Lord of the Rings franchise. Authentication required.
   *
   * @example
   * ```
   * await AndrewGivensSDK.authenticate('the-one-api-token').allMovies();
   * ```
   */
  allMovies() {
    this.checkAuth();

    const instance = axios.create(this.axiosConfig);

    return AllMovies(instance);
  }

  private checkAuth() {
    if (this.bearerToken.length <= 0) {
      throw new Error('authentication required');
    }
  }
}

export default AndrewGivensSDK;
