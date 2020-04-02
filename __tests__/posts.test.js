const { getUser, getUsers, getPost, getPosts, getComments, getAgent } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('post routes', () => {

  it (' creates a post', async() =>{
    const user = await getUser();
    return getAgent()
      .post('/api/v1/posts')
      .send({
        userId: user._id,   
        photoUrl: 'whatever photo',
        caption: 'wow how cool',
        tags: ['tag', 'stuff', 'whatever', 'hungry']   
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: user._id,
          photoUrl: 'whatever photo',
          caption: 'wow how cool',
          tags: ['tag', 'stuff', 'whatever', 'hungry'],
          __v: 0 

        });
      });
  });

  it('get all posts', async() => {
    const posts = await getPosts();
    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toEqual(posts);
      });
  });

});
