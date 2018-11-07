const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Article = require('../models/Article');
const User = require('../models/User');

router.get('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  console.log(`${req.method} admin${req.url} ${req.httpVersion}`);
  Article.find((err, articles)=> {
    if(err) 
      console.log(err);
    else
      res.json(articles);
  });
});

router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
  console.log(`${req.method} admin${req.url} ${req.httpVersion}`);
  Article.getArticleById(req.params.id, (err, article) => {
    if(err) 
      console.log(err);
    else
      res.json(article);
  });
});

router.post('/add', passport.authenticate('jwt', {session:false}), (req,res) => {
  console.log(`${req.method} admin${req.url} ${req.httpVersion}`);
  console.log(`body is ${req.body}`);
  let article = new Article(req.body);
  Article.addArticle(article, (err, article) => {
    if(err){
      res.json({success: false, msg:'Failed to add article'});
    } else {
      res.json({success: true, msg:'Article added'});
    }
  });
});

router.get('/delete/:id', passport.authenticate('jwt', {session:false}), (req,res)=> {
  console.log(`${req.method} admin${req.url} ${req.httpVersion}`);
  Article.findByIdAndRemove({_id: req.params.id}, (err, article) => {
    if(err) {
      res.json(err);
    } else {
      res.json('Removed successfully');
    }
  })
});

router.post('/update/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
  console.log(`${req.method} admin${req.url} ${req.httpVersion}`);
  Article.findOneAndUpdate({_id: req.params.id},{$set: {
    title: req.body.title,
    author: req.body.author,
    content: req.body. content,
    sampleContent: req.body.sampleContent,
    imageURL: req.body.imageURL
  }
  }, function(err, article){
    if(err) {
      res.json(err);
    } else {
      res.json('Removed successfully');
    }
  });
});

module.exports = router;