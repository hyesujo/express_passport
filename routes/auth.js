var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

module.exports = function (passport) {
  router.get('/login', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.success) {
      feedback =fmsg.success[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
      <div style="color:red;">${feedback}</div>
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');
    response.send(html);
  });

  router.post('/login_process',
    passport.authenticate('local', {
    failureFlash:true,
    successRedirect:'/',
    failureRedirect:'/auth/login',
    successFlash:true,
    }),
  function(req, res) {
    console.log(req.user);
    req.session.save(function(){
    console.log('success');
    res.redirect('/');
  })
});


  router.get('/logout', function (request, response) {
    request.logout();
  //   request.session.destroy(function(err) {
  //   
  //  });
  request.session.save(function() {
    response.redirect('/'); 
  });
  });

  return router;
}