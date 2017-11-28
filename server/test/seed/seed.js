const {
    ObjectID
} = require('mongodb');
const {
    Todo
} = require('./../../models/todo');
const {
    User
} = require('./../../models/user')
const jwt = require('jsonwebtoken');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const user = [{
    _id: userOneId,
    email: 'alpitanand20@gmail.com',
    password: 'userpass',
    token: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            access: 'auth'
        }, 'abc123').toString()



    }]
}, {
    _id: userTwoId,
    email: 'alpit@example.com',
    password: 'usertwopass'

}]

const todo = [{
    _id: new ObjectID(),
    text: 'First item in the array'
}, {
    _id: new ObjectID(),
    text: 'Second item in the array',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {

        return Todo.insertMany(todo);

    }).then(() => {
        done();
    }).catch((e) => {
        done(e);
    })
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(user[0]).save();
        var userTwo = new User(user[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => {
        done();
    })
}


module.exports = {
    todo,
    populateTodos,
    user,
    populateUsers
};
