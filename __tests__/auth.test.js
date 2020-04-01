require('dotenv').config();

const User = require('../lib/models/User');

describe('User Model', () => {
  it('hashes password', () => {
    const user = new User({
      username: 'Joe_Exotic',
      password: 'tigers'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });
});

it('creates a jwt auth token', () => {
  const user = new User({
    username: 'Otis_Toole',
    password: 'itWASme',
  });
  const token = user.authToken();
  expect(token).toBeTruthy();
});

it('finds a user by token', () => {
  const user = new User({
    username: 'Luca_M',
    password: 'no-cats',
  });

  const token = user.authToken();
  return User 
    .findByToken(token)
    .then(foundUser => {
      expect(foundUser.toJSON()).toEqual(user.toJSON());
    });
});
 

