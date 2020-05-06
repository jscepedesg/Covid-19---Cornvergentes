'use strict'
const env = require('node-env-file');
env(__dirname + '/.env');

const mongoose = require('mongoose');
const app = require('./server/app');

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGO_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
            .then( () => {
                console.log('Database connection established suceessfully');
                //Server Creation
                app.listen(process.env.PORT, () => {
                    if(process.env.NODE_ENV === 'dev')
                    {
                        console.log(`Server running correctly in url: http://localhost:${process.env.PORT}`);
                    }
                    else {
                        console.log(`Server running correctly in url: https://roll-backend.herokuapp.com:${process.env.PORT}`);
                    }
                });
            })
            .catch(err => console.log(err));