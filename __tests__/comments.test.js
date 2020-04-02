require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const { getUser, getPost, getComment, getAgent } = require('../db/data-helpers');

describe('comments tests', () => {
  it('posts a comment', async() => {
    const user = await getUser();
    const post = await getPost({ userId: user._id });
    return getAgent()
      .post('/api/v1/comments')
      .send({
        comment: 'I know what you did last summer',
        commentBy: user._id,
        post: post._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: expect.any(String),
          commentBy: expect.any(String),
          post: expect.any(String),
          __v: 0
        });
      });
        
  });
});
