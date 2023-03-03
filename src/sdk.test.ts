import AndrewGivensSDK from './sdk';

import { AllMovies } from './movie';
jest.mock('./movie', () => {
  return {
    AllMovies: jest.fn(),
  };
});

describe('AndrewGivensSDK', () => {
  const mockToken = 'the-one-api-token';
  let sdk = new AndrewGivensSDK();

  afterEach(() => {
    sdk = new AndrewGivensSDK();
  });

  describe('AllMovies()', () => {
    describe('when authenticated', () => {
      test('it calls AllMovies', () => {
        sdk.authenticate(mockToken).allMovies();
        expect(AllMovies).toBeCalled();
      });
    });

    describe('when unauthenticated ', () => {
      test('it raises an error', () => {
        expect(() => sdk.allMovies()).toThrow('authentication required');
      });
    });
  });
});
