const expect = require('expect');
const request = require('supertest');
const {
    todo,
    populateTodos,
    user,
    populateUsers
} = require('./seed/seed');
const {
    ObjectID
} = require('mongodb');
const {
    app
} = require('./../server.js');
var {
    Todo
} = require('./../models/todo.js');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST/ todos', () => {
    it('Should create a new todo', (done) => {
        var text = "Test todo text";
        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('Should not create a new file', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                })
            })
    })
});

describe('GET /todos', () => {
    it('Should fetch todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                done()
            })
    })
})

describe('GET /todo/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
            .get(`/todos/${todo[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.todo.text).toBe(todo[0].text);
            })
            .end(done);
    })

    it('should return 404 if not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todo/${hexId}`)
            .expect(404)
            .end(done);

    })
})

describe('Delete /todo/:id', () => {

    it('should delete a todo doc', (done) => {
        var id = todo[0]._id.toHexString();
        request(app)
            .delete(`/todos/${todo[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done();
                }
            })
        Todo.findById(id).then((todo) => {
            expect(todo.body).toBe(undefined);
        }).catch((e) => {
            console.log(e);
        })
        done();
    })
})

describe('PATCH /todos/:id', () => {
    it('Should set completed to false', (done) => {
        request(app)
            .patch(`/todos/${todo[1]._id.toHexString()}`)
            .send({
                "completed": false
            })
            .expect(200)
            .expect((res) => {

                expect(res.body.completed).toBe(false);
            })
            .end(done)
    })

    it('Should set completed to true', (done) => {
        request(app)
            .patch(`/todos/${todo[1]._id.toHexString()}`)
            .send({
                "completed": true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.completed).toBe(true);
            })
            .end(done)
    })


})

describe('GET User/me', () => {
    it('Should be able to return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', user[0].token[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(user[0]._id.toHexString());
                expect(res.body.email).toBe(user[0].email);
            })
            .end(done);
    });

    it('Should return a 401 if not auth', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done)

    })
})


describe('POST /users', () => {
    it('should create a new user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb';
        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end(done)
    })
    it('should return validation errro', (done) => {
        var email = 'exampleexample.com';
        var password = '123b';
        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(400)

            .end(done)
    })

})

describe('POST/users/login', (done) => {
    it('Should generate a new auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: user[0].email,
                password: user[0].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    return done();
                }

            });
    })
})
