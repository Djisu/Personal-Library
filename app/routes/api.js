/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
const mongoose = require('mongoose')

//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
mongoose.connect('mongodb+srv://djisu:Timbuk2tudjesu@cluster0-nlxec.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
}); 

  const Schema = mongoose.Schema
  var bookSchema =  new Schema({
    _id:  {
      type: String
    },
    title: {
      type: Number
    },
    comments: []
  })
//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      let varId = req.params._id
      let varTitle = req.params.title
      let varCommentCount = req.params.length
      
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      res.json[{'_id': varId, 'title': varTitle, "commentcount": varCommentCount}]
     
    })
    
    .post(function (req, res){
      var title = req.body.title;
      //response will contain new book object including atleast _id and title
    
      const Book = mongoose.model("Book", bookSchema); 
      var book = new Book({
        title: req.params.title,
        comments: req.params.comments
      })
     book.save(function(err, data) {
        if (err){
          res.json({'message': err.toString()})
        } else {
          res.json({'_id': data._id, 'title': data.title})
        }
      })

    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      const Book = mongoose.model("Book", bookSchema);
      var book = new Book({
        title: req.params.title,
        comments: req.params.comments
      })
      Book.findOne({ email : req.params._id} ,
      function (err,user){
      if (!err){
          Book.remove( function(err){
            res.json({'message': 'complete delete successful'})
          });
        }
      });
    
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
