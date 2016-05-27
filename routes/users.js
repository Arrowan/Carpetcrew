var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://localhost:27017/test', ['users']);

router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

router.get('/user/:id', function(req, res, next){
    db.users.findOne({
        _id: mongojs.ObjectId(req.param.id)
    }, function(err, users){
        if(err) {
            res.send(err);
        } else {
            res.json(users);
        }
    });
});

//POST, Save a USER
router.post('/user', function(req, res, next){
    var user = req.body;
    db.users.save(user, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.put('/user/:id', function(req, res, next){
    var user = req.body;
    var updObj = {};
    
    db.users.update({
        _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;