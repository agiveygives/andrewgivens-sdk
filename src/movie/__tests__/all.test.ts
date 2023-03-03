import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import allMovies from '../all';

describe('allMovies()', () => {
  const mock = new MockAdapter(axios);
  const mockMovieList = [
    {
      _id: '5cd95395de30eff6ebccde5d',
      name: 'The Return of the King',
      runtimeInMinutes: 201,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 1120,
      academyAwardNominations: 11,
      academyAwardWins: 11,
      rottenTomatoesScore: 95,
    },
  ];

  afterEach(() => {
    mock.resetHandlers();
  });

  describe('when the api responds successfully', () => {
    beforeEach(() => {
      mock.onGet('/movie').reply(200, {
        docs: mockMovieList,
      });
    });

    test('it resolves to the list of movies', async () => {
      await expect(allMovies(axios)).resolves.toStrictEqual(mockMovieList);
    });
  });

  describe('when the api responds with an error', () => {
    beforeEach(() => {
      mock.onGet('/movie').networkError();
    });

    test('it resolves to the list of movies', async () => {
      await expect(allMovies(axios)).rejects.toEqual(
        new Error('Network Error'),
      );
    });
  });
});
