/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

var thread_id;
var thread_delete_password;
var next_thread_id;

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    // I can POST a thread to a specific message board by passing form data text and delete_password to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).
    suite('POST', function() {
      
      test('POST thread' , function(done){
        chai.request(server)
          .post('/api/threads/apitest')
          .send({
            text: "This is a test",
            delete_password: "Test Delete Password"
          })
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.redirects[0].endsWith('/b/apitest'), true, "Res redirect");
            done();  
          });
        });
    });
    
    suite('GET', function() {
      
      // I can GET an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
      test('GET thread', function(done) {
        chai.request(server)
          .get('/api/threads/apitest')
          .send()
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            let responseObj = JSON.parse(res.text);
            assert.equal(responseObj.length, 10, "check length")
            assert.equal(responseObj[0].board, "apitest", "check board");
            assert.equal(responseObj[0].text, "This is a test", "check text");
            thread_id = responseObj[0]._id;
            thread_delete_password = responseObj[0].deletePassword;
            next_thread_id = responseObj[1]._id;
            done();  
          });
      })
    });
    
    suite('DELETE', function() {
      
      // I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')
      test('DELETE thread', function(done) {
        chai.request(server)
          .delete('/api/threads/apitest')
          .send({
            board: 'apitest',
            thread_id,
            delete_password: thread_delete_password
          })
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "success", "check text");
            done();  
          });
      })
    });
    
    suite('PUT', function() {
    
      // I can report a thread and change it's reported value to true by sending a PUT request to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')
      test('PUT thread', function(done) {
        chai.request(server)
          .put('/api/threads/apitest')
          .send({
            thread_id: next_thread_id
          })
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "success");
            done();  
          });
      })
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    // I can POST a reply to a thead on a specific board by passing form data text, delete_password, & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array will be saved _id, text, created_on, delete_password, & reported.
    suite('POST', function() {
      test('POST reply', function(done) {
        chai.request(server)
          .post('/api/replies/apitest')
          .send({
            text: "Little Comment",
            delete_password: "Little Comment Delete",
            thread_id: next_thread_id
          })
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.redirects[0].endsWith('/b/apitest/' + next_thread_id), true, "Res redirect");
            done();  
          });
      })
    });
    
    // I can GET an entire thread with all it's replies from /api/replies/{board}?thread_id={thread_id}. Also hiding the same fields.
    suite('GET', function() {
      test('GET reply', function(done){
        let get_str = '/api/replies/apitest/' + next_thread_id;
        console.log(get_str);
        chai.request(server)
          .get(get_str)
          .send()
          .end(function (err,res){
            assert.equal(res.statusCode, 200);
            let retObj = JSON.parse(res.text);
            assert.isOk(retObj, 'board');
            assert.isOk(retObj, 'createdOn');
            assert.isOk(retObj, 'bumpedOn');
            assert.isOk(retObj, 'reported');
            assert.isOk(retObj, 'replies');
            done();  
          });
      })
    });
    
    suite('PUT', function() {
      test('PUT reply', function(done) {
        chai.request(server)
          .put('/api/replies/apitest')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
       })
    });
    
    suite('DELETE', function() {
      test('DELETE reply', function(done){
        chai.request(server)
          .delete('/api/replies/apitest')
          .send()
          .end(function (err,res){
            assert.fail("No Test");
            done();  
          });
      })
    });
    
  });

});
