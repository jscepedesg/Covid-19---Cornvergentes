const express = require('express');
//const _ = require('underscore');
const app = express();
const User = require('../models/user');


app.post('/user', function (req, res)  {
    let body = req.body;
    let user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        birthday: body.birthday
    });

    user.save((err, userDb) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDb
        });
    });
});

app.get('/user', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 10;
    limit = Number(limit);

    User.find()
        .skip(from)
        .limit(limit)
        .exec((err, user) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count((err, count) => {
                res.json({
                    ok: true,
                    user,
                    howMany: count
                });
            });
        });
});

app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error User doesn't exist"});
    }
    User.findById(id)
        .exec((err, user) => {
        if(err) return res.status(500).json({message: 'Error returning data'});

        if(! user) return res.status(404).json({message: "Error User doesn't exist"});

        return res.status(200).json({
            ok: true,
            user
        });

    });
});

app.put('/user/:id' ,function(req, res){

    let id = req.params.id;
    let body =_.pick( req.body, ['firstName','lastName']);

    User.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, userDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! userDB) return res.status(404).json({message: "Error user doesn't exist"});

        res.json({
            ok: true,
            user: userDB
        });
    });
} );

module.exports = app;