var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');


app.use(cors({origin: '*'}));
app.use(bodyParser.json());
/* use body parser so we can get info from POST and/or URL parameters */
app.use(bodyParser.urlencoded({extended: false}));

/*--- Mongo DB ---*/
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/bardsguild';

/*--- DB Connect ---*/
MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to server.");
    db.close();
});

/*-----------------------------------------------------------------------------------------------------------------------------------*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
/* used to create, sign, and verify tokens */
var config = module.exports = {
    'secret': 'cthulhuforpresident',
    'database': 'mongodb://localhost:27017/bardsguild'
};

var userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    created: Date,
    lastLogin: Date,
    sheets: [{ type: Schema.Types.ObjectId, ref: 'Sheet'}]
});

var sheetSchema = Schema({
    created: Date,
    lastUpdate: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    playerclass: String,
    level: String
}, {strict: false});

var User = module.exports = mongoose.model('User', userSchema);
var Sheet = module.exports = mongoose.model('Sheet', sheetSchema);

mongoose.connect(config.database);
app.set('superSecret', config.secret);

var apiRoutes = express.Router();

// register user
app.post('/user', function (req, res) {
    if (req.body.username.length >= 4) {
        if (req.body.password.length >= 4) {
            User.findOne({
                $or: [
                    {username: req.body.username},
                    {username: req.body.email},
                    {email: req.body.username},
                    {email: req.body.email}
                ]
            }, function (err, user) {
                if (err) console.log(err);
                if (user) {
                    if (user.username == req.body.username || user.username == req.body.email) {
                        res.status(400).send('Create User failed: Username is already taken.');
                    } else {
                        res.status(400).send('Create User failed: E-Mail is already taken.');
                    }
                } else if (!user) {
                    user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        created: new Date(),
                        lastLogin: new Date(),
                        verify: false,
                        admin: false
                    });
                    //user.save();
                    var token = jwt.sign({user: user.username}, app.get('superSecret'), {
                        expiresIn: "7d" /* expires in 7 days */
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        res.json({
                            message: 'Enjoy your token!',
                            token: token,
                            username: req.body.username,
                            userid: user._id
                        });
                    });
                }
            });
        } else {
            res.status(400).send('Create User failed: Password too short (must be at least 6 characters).');
        }
    } else {
        res.status(400).send('Create User failed: Username too short (must be at least 4 characters).');
    }
});

// login user
app.post('/user/login', function (req, res) {
    User.findOne({
        $or: [
            {username: req.body.email},
            {email: req.body.email}
        ]
    }, function (err, user) {
        if (err) console.log(err);
        if (!user) {
            res.status(404).send('Authentication failed: User not found.');
        } else if (user) {
            user.lastLogin = new Date();
            if (user.password != req.body.password) {
                res.status(400).send('Authentication failed: Wrong password.');
            } else {
                var token = jwt.sign({user: user.username}, app.get('superSecret'), {
                    expiresIn: "7d"
                });
                res.json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token: token,
                });
            }
        }
    });
});

/* route middleware to verify a token */
apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                res.status(403).send('Failed to authenticate token.');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send('No token provided.');
    }
});

app.use('/api', apiRoutes);

// get user profile
apiRoutes.get('/user/:username', function (req, res) {
    User.findOne({username: req.params.username})
        .select('-password -verify -admin -__v')
        .populate({
            path: 'sheets',
            select: '_id name playerclass level'
        })
        .exec(function (err, docs) {
            if (err) console.log(err);
            if (docs) {
                res.send(
                    docs
                );
            } else {
                res.status(400).send('Unable to get user.');
            }
        });
});

// update user profile
apiRoutes.put('/user', function (req, res) {
    if (req.body.newPassword.length > 5) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) console.log(err);
            if (!user) {
                res.status(404).send('Update User failed: User not found.');
            } else if (user) {
                if (req.body.password == user.password) {
                    user.password = req.body.newPassword;
                    var token = jwt.sign({user: user.username}, app.get('superSecret'), {
                        expiresIn: "7d" /* expires in 7 days */
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        res.json({
                            message: 'Enjoy your token!',
                            token: token,
                            username: req.body.username,
                            userid: user._id
                        });
                    });
                } else {
                    res.status(400).send('Update User failed: Old Password don\'t match.');
                }
            }
        });
    } else {
        res.status(400).send('Update User failed: Password too short (must be at least 6 characters).');
    }
});

// delete user
apiRoutes.delete('/user', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) console.log(err);
        if (!user) {
            res.status(404).send('Delete User failed: User not found.');
        } else if (user) {
            if (req.body.password == user.password) {
                user.remove(function (err) {
                    if (err) console.log(err);
                    res.json({
                        message: 'User deleted!'
                    });
                });
            } else {
                res.status(400).send('Delete User failed: Old Password don\'t match.');
            }
        }
    });
});

apiRoutes.get('/user', function (req, res) {
    User.find({})
        .select('username -_id')
        .exec(function (err, docs) {
            if (err) console.log(err);
            if (docs) {
                res.json({
                    message: 'Found matching Users',
                    users: docs
                })
            } else {
                res.json({
                    message: 'No Match found'
                })
            }
        });
});

/*-----------------------------------------------------------------------------------------------------------------------------------*/

/*--- API GET ---*/
apiRoutes.get('/sheets/:userid', function (req, res) {

    Sheet.find({user: req.params.userid})
        .select('id name created lastUpdate')
        .exec(function (err, docs) {
            if (err) console.log(err);
            if (docs) {
                res.json(docs);
            } else {
                res.send('empty');
            }
        });
});

apiRoutes.get('/sheet/:_id', function (req, res) {
    Sheet.findById(req.params._id, function (err, sheet) {
            if (err) console.log(err);
            if (sheet) {
                res.send(
                    sheet
                );
            } else {
                res.status(400).send('Unable to get sheet.');
            }
        });
});

/*--- API POST ---*/
apiRoutes.post('/sheet', function (req, res) {
    User.findById(
        req.body.user, function (err, user) {
        if (err) console.log(err);
        if (!user) {
            res.status(404).send('Couldn\'t save character');
        } else if (user) {
            if (!req.body._id) {

                var sheet = new Sheet(req.body);
                sheet._id = new mongoose.Types.ObjectId();
                sheet.created = new Date();
                sheet.lastUpdate = new Date();
                sheet.user = user.id;

                sheet.save(function (err) {
                    if (err) console.log(err);

                    user.sheets.push({_id: sheet._id});
                    user.save(function (err) {
                        if (err) console.log(err);

                        res.json({
                            message: 'success',
                            id: sheet.id
                        });

                    });
                });
            } else {
                res.status(400).send('Save Character failed: insufficient data provided!');
            }
        }
    });
});

apiRoutes.put('/sheet', function (req, res) {
    console.log('update sheet');
    req.body.lastUpdate = new Date();
    Sheet.findByIdAndUpdate(req.body._id, req.body, function (err, sheet) {
        if (err) console.log(err);

        if (!sheet) {
            res.status(400).send('Couldn\'t update character');
        } else {
            res.json({
                message: 'success'
            });
        }
    });

});

/*--- API DELETE ---*/
apiRoutes.delete('/sheet/:_id', function (req, res) {

    Sheet.findByIdAndRemove(req.params._id, function (err, sheet) {
       if (err) {
           console.log(err);
           res.status(400).send('Couldn\'t delete character');
       } else {
           console.log(sheet);

           User.findById(sheet.user, function (err, user){
               if (err) console.log(err);
               for (var i = 0; i < user.sheets.length; i++) {
                   if (user.sheets[i].equals(sheet._id.valueOf())) {
                       user.sheets.splice(i, 1);
                   }
               }

               user.save(function (err) {
                  if (err) console.log(err);

                  res.json({message: "success"});
               });
           });
       }
    });
});

/*--- Server ---*/
var server = app.listen(3333, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Bard\'s Guild app listening at http://%s:%s', host, port);
});