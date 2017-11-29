var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid mailid'
        }

    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]


})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    user.token.push({
        access,
        token
    });
    user.save();
    return token;
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({
        email
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    })
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decode;
    try {
        decode = jwt.verify(token, 'abc123');
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject();
        })
    }
    return User.findOne({
        '_id': decode._id,
        'token.token': token,
        'token.access': 'auth'
    })
}

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}
