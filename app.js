var express = require('express');
var path = require('path');
var app = express();
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var session = require('express-session');
app.use(session({
    secret: 'zfpx',
    resave: true,
    saveUninitialized: true})
);

function checkLogin(req,res,next){
    if(req.session &&req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
}

app.get('/login',function(req,res) {
    res.render('login');
});
app.post('/login',function(req,res) {
    var user = req.body;//得到请求体
    if(user.username == user.password){//如果在表单中输入的用户名和密码相同，则登录成功
        //把用户名写入cookie
        req.session.username=user.username;
        //重定向到user页面
        res.redirect('/user');
    }else{
        res.redirect('back');
    }
});
app.get('/user',checkLogin,function(req,res) {
    res.render('user',{username:req.session.username});
});
app.listen(326);