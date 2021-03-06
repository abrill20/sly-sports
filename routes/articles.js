const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../logging/logs');

const Article = require('../models/Article');

router.route('/').get((req, res) => {
  logger.info(`${req.method} articles${req.url} ${req.httpVersion}`);
  Article.find((err, articles) => {
    if (err)
      logger.error(err);
    else {
      res.json(articles);
    }
  });
});

router.get('/:id', (req, res) => {
  logger.info(`${req.method} articles${req.url} ${req.httpVersion}`);
  Article.getArticleById(req.params.id, (err, article) => {
    if (err)
      logger.error(err);
    else
      res.json(article);
  });
});

// Used for commenting
router.post('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  logger.info(`${req.method} articles${req.url} ${req.httpVersion}`);
  const comment = req.body.comment;
  const username = req.body.user.username;
  Article.update({ _id: req.params.id }, { $push: { comments: {msg: comment, username: username} } }, function (err, article) {
     if (err) {
       logger.error(`unsuccessful comment ${err}`);
       res.json(err);
     } else {
       logger.info('Comment success');
       res.json('Removed successfully');
     }
   });
});

module.exports = router;