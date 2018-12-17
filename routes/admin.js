const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../logging/logs');

const Article = require('../models/Article');
const User = require('../models/User');

router.get('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  logger.info(`${req.method} admin${req.url} ${req.httpVersion}`);
  console.log("USERNAME IS: ", req.user.username);
  if(!req.user.privileges) {
    res.status(401);
    res.send("Unauthorized access");
  } else {
    Article.find((err, articles)=> {
      if(err) 
        logger.error(err);
      else
        res.json(articles);
    });
  }
});

router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
  logger.info(`${req.method} admin${req.url} ${req.httpVersion}`);
  if(!req.user.privileges) {
    res.status(401);
    res.send("Unauthorized access");
  } else {
    Article.getArticleById(req.params.id, (err, article) => {
      if(err) 
        logger.error(err);
      else
        res.json(article);
    });
  }
});

router.post('/add', passport.authenticate('jwt', {session:false}), (req,res) => {
  logger.info(`${req.method} admin${req.url} ${req.httpVersion}`);
  if(!req.user.privileges) {
    res.status(401);
    res.send("Unauthorized access");
  } else {
    let article = new Article(req.body);
    Article.addArticle(article, (err, article) => {
      if(err){
        logger.error(`Failed to add article ${err}`);
        res.json({success: false, msg:'Failed to add article'});
      } else {
        res.json({success: true, msg:'Article added'});
      }
    });
  }
});

router.get('/delete/:id', passport.authenticate('jwt', {session:false}), (req,res)=> {
  logger.info(`${req.method} admin${req.url} ${req.httpVersion}`);
  if(!req.user.privileges) {
    res.status(401);
    res.send("Unauthorized access");
  } else {
    Article.findByIdAndRemove({_id: req.params.id}, (err, article) => {
      if(err) {
        logger.error(`Article remove error: ${err}`)
        res.json(err);
      } else {
        res.json('Removed successfully');
      }
    })
  }
});

router.post('/update/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
  logger.info(`${req.method} admin${req.url} ${req.httpVersion}`);
  if(!req.user.privileges) {
    res.status(401);
    res.send("Unauthorized access");
  } else {
    Article.findOneAndUpdate({_id: req.params.id},{$set: {
      title: req.body.title,
      author: req.body.author,
      content: req.body. content,
      sampleContent: req.body.sampleContent,
      imageURL: req.body.imageURL
    }
    }, function(err, article){
      if(err) {
        logger.log(`Error updating article ${err}`);
        res.json(err);
        Error
      } else {
        res.json('Updated successfully');
      }
    });
  }
});

module.exports = router;