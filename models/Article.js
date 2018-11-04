const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const ArticleSchema = mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  content: {
    type: String
  },
  sampleContent: {
    type: String
  },
  //URL for image... may change to file
  imageURL: {
    type: String
  },
  comments: [ {
    msg: {
      type: String
    },
    username: {
      type: String
    }
  } ]
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.getArticleById = function (id, callback) {
  Article.findById(id, callback);
}

module.exports.addArticle = function (newArticle, callback) {
  newArticle.save(callback);
}

module.exports.getArticleByTitle = function (title, callback) {
  const query = { title: title }
  Article.findOne(query, callback);
}