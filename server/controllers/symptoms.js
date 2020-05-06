const express = require('express');
//const _ = require('underscore');
const app = express();
const Symptom = require('../models/symptoms');


app.post('/symptom', function (req, res)  {
    let body = req.body;
    let symptom = new Symptom({
        name: body.name
    });

    symptom.save((err, symptomDb) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            symptom: symptomDb
        });
    });
});

app.get('/symptom', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 10;
    limit = Number(limit);

    Symptom.find()
        .skip(from)
        .limit(limit)
        .exec((err, symptom) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Symptom.count((err, count) => {
                res.json({
                    ok: true,
                    symptom,
                    howMany: count
                });
            });
        });
});

app.get('/symptom/:id', (req, res) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error symptom doesn't exist"});
    }
    Symptom.findById(id)
        .exec((err, symptom) => {
        if(err) return res.status(500).json({message: 'Error returning data'});

        if(! symptom ) return res.status(404).json({message: "Error symptom doesn't exist"});

        return res.status(200).json({
            ok: true,
            symptom
        });

    });
});

app.put('/symptom/:id' ,function(req, res){

    let id = req.params.id;
    let body =_.pick( req.body, ['name']);

    Symptom.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, symptomDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! symptomDB) return res.status(404).json({message: "Error symptom doesn't exist"});

        res.json({
            ok: true,
            symptom: symptomDB
        });
    });
} );

module.exports = app;