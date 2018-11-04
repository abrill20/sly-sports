const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Article = require('../models/Article');

router.route('/').get((req, res) => {
  console.log(`${req.method} articles${req.url} ${req.httpVersion}`);
  Article.find((err, articles) => {
    if (err)
      console.log(err);
    else
      res.json(articles);
  });
});

router.get('/:id', (req, res) => {
  console.log(`${req.method} articles${req.url} ${req.httpVersion}`);
  Article.getArticleById(req.params.id, (err, article) => {
    if (err)
      console.log(err);
    else
      res.json(article);
  });
});

router.post('/:id', (req, res) => {
  console.log(`${req.method} articles${req.url} ${req.httpVersion}`);
  console.log(`comment is ${req.body.comment}`)
  const comment = req.body.comment;
  const username = req.body.username;
  Article.update({ _id: req.params.id }, { $push: { comments: {msg: comment, username: username} } }, function (err, article) {
     if (err) {
       console.log('not success');
       console.log(err);
       res.json(err);
     } else {
       console.log('Comment success');
       res.json('Removed successfully');
     }
   });
});

module.exports = router;