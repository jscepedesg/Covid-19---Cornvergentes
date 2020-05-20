const express = require('express');
//const _ = require('underscore');
const app = express();
const Record = require('../models/record');


app.post('/record', function (req, res)  {
    let body = req.body;
    let record = new Record({
        idUser: body.idUser,
        idSymptoms: body.idSymptom
    });

    record.save((err, recordDb) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            record: recordDb
        });
    });
});

app.get('/record', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 10;
    limit = Number(limit);

    Record.find()
        .skip(from)
        .limit(limit)
        .populate('idSymptoms', 'name')
        .populate('idUser', 'firstName')
        .exec((err, record) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Record.count((err, count) => {
                res.json({
                    ok: true,
                    record,
                    howMany: count
                });
            });
        });
});

app.get('/recordCount/:id', (req, res) => {
    let id = req.params.id;
    Record.find({idSymptoms: id})
    .populate('idSymptoms', 'name')
    .populate('idUser', 'firstName')
    .exec((err, record) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Record.count({idSymptoms: id}, (err, count) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                record,
                howMany: count
            });
        });
    });

});

app.get('/recordUser/:id', (req, res) => {
    let id = req.params.id;
    Record.find({idUser: id})
    .populate('idSymptoms', 'name')
    .populate('idUser', 'firstName')
    .exec((err, record) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Record.count({idSymptoms: id}, (err, count) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                record,
                howMany: count
            });
        });
    });

});

module.exports = app;