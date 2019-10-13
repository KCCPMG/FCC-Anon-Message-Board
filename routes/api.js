/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const mongoose = require('mongoose');
var expect = require('chai').expect;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'MessageBoard'
})

const db = mongoose.connection;
db.once('open', function(){
  console.log('They\'re connected!')
})
db.on('error', function(err) {
  console.bind("Error", err);
})

const threadSchema = mongoose.Schema({
  text: String,
  createdOn: Date,
  bumpedOn: Date,
  reported: Boolean,
  delete_password: String,
  replies: [replySchema]
}, {
  collection: 'threads'
})

const replySchema = mongoose.Schema({
  text: String,
  deletePassword: String,
  threadID: String
})


/*
I can POST a thread to a specific message board by passing form data text and delete_password to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).
I can POST a reply to a thead on a specific board by passing form data text, delete_password, & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array will be saved _id, text, created_on, delete_password, & reported.
I can GET an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
I can GET an entire thread with all it's replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields.
I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')
I can delete a post(just changing the text to '[deleted]') if I send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. (Text response will be 'incorrect password' or 'success')
I can report a thread and change it's reported value to true by sending a PUT request to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')
I can report a reply and change it's reported value to true by sending a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. (Text response will be 'success')
*/

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .post(function(req, res){
    
  })
  
    
  app.route('/api/replies/:board');

};
