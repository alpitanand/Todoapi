const expect =  require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');

const todo = [{
    _id : new ObjectID(),
    text : 'First item in the array'
},{
     _id : new ObjectID(),
    text : 'Second item in the array'
}];

beforeEach((done)=>{
            Todo.remove({}).then(()=>{
                
                return Todo.insertMany(todo);
                
            }).then(()=>{
                done();
            }).catch((e)=>{
                done(e);
            })
        });

describe('POST/ todos', ()=>{
    it('Should create a new todo',(done)=>{
        var text = "Test todo text";
        request(app)
        .post('/todos')
        .send({text}) 
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err); 
            }
         Todo.find({text}).then((todos)=>{
             expect(todos.length).toBe(1);
             expect(todos[0].text).toBe(text);
             done();
         }).catch((e)=>done(e));
        }) 
    });
    
    it('Should not create a new file', (done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>{
                done(e);
            })
        })
    })
});

describe('GET /todos',()=>{
    it('Should fetch todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
            
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            
            done()
    })
})
})

describe('GET /todo/:id',()=>{
    it('should return a todo doc',(done)=>{
        request(app)
        .get(`/todos/${todo[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          
            expect(res.body.todo.text).toBe(todo[0].text);
        })
        .end(done);
    })
    
    it('should return 404 if not found',(done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todo/${hexId}`)
        .expect(404)
        .end(done);
         
    })
})