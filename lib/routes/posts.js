const { Router } = require('express');
const Post = require('../models/Post');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post
      .create({ ...req.body, author: req.user._id })
      .then(Review => res.send(Review))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next)=> {
    Post
      .find()
      .then(Posts => res.send(Posts))
      .catch(next);
  })
//   GET /posts/:id
//   responds with a post by id
//   should include the populated user
//   should include all comments associated with the post (populated with commenter)
//   

  .get('/:id', ensureAuth, (req, res, next) => {
    Post
      .findById(req.params.id)
      .populate('user')
      .populate('comments')
      .then(Post => res.send(Post))
      .catch(next);
  })
//   PATCH /posts/:id
//   requires authentication
//   only can update the post caption
//   respond with the updated post
//   NOTE: make sure the user attempting to update the post owns it
//.patch('/posts/:id', )

  .patch('/posts/:id', ensureAuth, (req, res, next)=> {
    Post
      .findOneAndUpdate({
        _id: req.params.id,
        author: req.user._id
      }, req.body, { new: true })
      .then(Post => res.send(Post))
      .catch(next);
  })

  .delete('/posts/:id', ensureAuth, (req, res, next)=> {
    Post
      .findOneAndDelete({
        _id: req.params.id,
        author: req.user_.id
      })
      .then(Post => res.send(Post))
      .catch(next);
  });

//   DELETE /posts/:id
//   requires authentication
//   deletes a post
//   responds with the deleted post
//   NOTE: make sure the user attempting to delete the post owns it
//   GET /posts/popular
//   respond with a list of the 10 posts with the most comments
