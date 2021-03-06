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

const replySchema = mongoose.Schema({
  text: String,
  createdOn: Date,
  deletePassword: String,
  threadID: String,
  reported: Boolean
})

const threadSchema = mongoose.Schema({
  board: String,
  text: String,
  createdOn: Date,
  bumpedOn: Date,
  reported: Boolean,
  deletePassword: String,
  replies: [replySchema]
}, {
  collection: 'threads'
})

var Thread = mongoose.model('thread', threadSchema);

//Test
// var thread = new Thread({
//   text: "This is a test",
//   createdOn: new Date(),
//   bumpedOn: null,
//   reported: false,
//   deletePassword: "delete thread",
//   replies: []
// })
// async function addReply() {
//   let id;
//   console.log(thread);
//   await thread.save(function(){
//     console.log("Inside await - thread id ", thread._id);
//     return thread._id;
//   });
//   console.log("After await - thread id ", id);
//   let reply = {
//     text: "Obviously you are Hitler",
//     deletePassword: "delete reply",
//     threadID: id
//   }
//   thread.replies.push(reply);
//   thread.bumpedOn = new Date();
//   Thread.findById(id, function(err, thr){
//     if (err) console.log(err);
//     else if (thr !== null) console.log(thr._id === id);
//     else console.log("null");
//   })
//   thread.save();
// }

// addReply();





/*
x - I can POST a thread to a specific message board by passing form data text and delete_password to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).

x - I can POST a reply to a thead on a specific board by passing form data text, delete_password, & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array will be saved _id, text, created_on, delete_password, & reported.

x - I can GET an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.

x - I can GET an entire thread with all it's replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields.

x - I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')


x - I can delete a post(just changing the text to '[deleted]') if I send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. (Text response will be 'incorrect password' or 'success')

x - I can report a thread and change it's reported value to true by sending a PUT request to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')

x - I can report a reply and change it's reported value to true by sending a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. (Text response will be 'success')
*/

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  
  .post(function(req, res){
    var board = req.params.board;
    let newThread = new Thread({
      board: board,
      text: req.body.text,
      createdOn: new Date(),
      bumpedOn: new Date(),
      reported: false,
      deletePassword: req.body.delete_password,
      replies: []
    });
    newThread.save();
    res.redirect(`/b/${board}`);
  })
  
  
  .get(function(req, res){
    var board = req.params.board;
    
    var searchObj = {board: board}
    if (req.query.thread_id) searchObj._id = `ObjectId(\"${req.query.thread_id}\")`
    
    Thread.find(searchObj).sort('-bumpedOn').limit(10).then(function(data){
      
      let output = [];
      let retData = JSON.parse(JSON.stringify(data));
      
      retData.forEach(function(el) {
        if (el.replies.length>3){
          el.replycount = el.replies.length;
          el.replies = el.replies.splice(el.replies.length-3);
        } else el.replycount = el.replies.length;
        
        el.replies.forEach(function(reply){
          delete reply.deletePassword;
          delete reply.reported;
        })
        
        output.push(el);
      })
      res.json(output);
    })
  })
    
    
    // I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')
  .delete(function(req, res){
    Thread.findById(req.body.thread_id, function(err, data){
      if (err) console.log(err);
      else {
        if (data.board === req.params.board && data.deletePassword === req.body.delete_password) {
          data.remove();
          res.send('success');
        } else {
          res.send('incorrect password');
        }
      }
    })
  })

  
  // I can report a thread and change it's reported value to true by sending a PUT request to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')
  .put(function(req, res){
    Thread.findById(req.body.thread_id, function(err, data){
      if (err) console.log(err);
      else if (data === null) res.send('invalid thread id');
      else {
        data.reported = true;
        data.save(function(){
          res.send('success');
        })
      }
    })
  })
  
  
  
  
    
  app.route('/api/replies/:board')
  .post(function(req, res){
    var reply = {
      text: req.body.text,
      createdOn: new Date(),
      deletePassword: req.body.delete_password,
      threadID: req.body.thread_id,
      reported: false
    }
    
    var deletePassword = req.body.delete_password;
    Thread.findById(req.body.thread_id, function(err, thread){
      if (err) console.log(err);
      else if (thread === null) res.send('Thread does not exist');
      else {
        thread.replies.push(reply);
        thread.bumpedOn = new Date();
        thread.save(function(err, data){
          if (err) console.log(err);
          else {
            // res.json(data);
            res.redirect(`../../b/${req.params.board}/${req.body.thread_id}`);
          }
        });
      }
    })    
  })
  
  
  .get(function(req, res){
    let board = req.params.board;
    let id = req.query.thread_id;
    Thread.findById(id, function(err, data){
      if (err) console.log(err);
      else res.json(data);
    })
  })
  
  
 // I can delete a post(just changing the text to '[deleted]') if I send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. (Text response will be 'incorrect password' or 'success')
  .delete(function(req, res){
    let found = false;
    Thread.findById(req.body.thread_id, function(err, data) {
      if (err) console.log(err);
      else {
        data.replies.forEach(function(el){
          if (el._id.toString() === req.body.reply_id && el.deletePassword === req.body.delete_password) {
            found = true;
            el.text = "[deleted]";
            data.save(function(){
              res.send('success')
            });
          } 
        })
        if (found===false) res.send('incorrect password');
      }
    });
  })  
  
  
  // I can report a reply and change it's reported value to true by sending a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. (Text response will be 'success')
  .put(function(req, res){
    Thread.findById(req.body.thread_id, function(err, data){
      if (err) console.log(err);
      else if (data===null || data.board !== req.params.board) res.send('invalid reply')
      else {
        let found = false;
        data.replies.forEach(function(rep){
          if (rep._id.toString()===req.body.reply_id) {
            rep.reported = true;
            found = true;
            data.save(function(){
              res.send('success')
            })
          }
        })
        if (found===false) res.send('invalid reply');
      }
    })
  })
  
};
