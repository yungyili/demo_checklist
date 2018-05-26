process.env.NODE_ENV = 'test';

const _ = require('lodash');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const axios = require('axios');
var expect = chai.expect;
chai.use(chaiHttp);

const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');
require('../models/CheckList');
const CheckList = mongoose.model('checklists');
const User = mongoose.model('users');
//mongoose.connect(keys.mongoURI);


describe('CheckList', ()=>{
	//login: {"email": "john@mail.com", "password": "john123"}

	let token = null;

	before(async (done) => {
		var error = false;
		User.remove({}, (err)=>{
			if(err) {error=true;}
		});

		CheckList.remove({}, (err)=>{
			if(err) {error=true;}
		});

		done();
	});

	const cred = {
		"email": "john@mail.com", 
		"password": "john123"
	};

	const user = {
	    "name": "John",
	    "email": "john@mail.com",
	    "password": "john123"
	}

	const checklist = {
	    "title": "My first checklist",
	    "items": [{
	        "checked": false,
	        "content": "Buy eggs"
	      }, {
	        "checked": false,
	        "content": "Buy milk"
	      }, {
	        "checked": true,
	        "content": "wash car"
	      }
	    ]
  	};

  	describe('login', () => {
  		it('should be able to create a user', (done)=>{
	  		chai.request(server)
				.post('/api/user')
				.send(user)
				.end((err, res)=>{
					res.should.have.status(200);
					done();
				});
		});

		it('should be able to login', (done)=>{
			chai.request(server)
				.post('/api/login')
				.send(cred)
				.end((err, res)=>{
					res.should.have.status(200);
					token = res.body.token;
					done();
				});
		});
  	});

	describe('create checklist', () => {
		let _id = null;
		it('should be able to create a checklist', (done)=>{
			chai.request(server)
			.post('/api/checklist')
			.set('Authorization', `JWT ${token}`)
			.send(checklist)
			.end((err, res)=>{
				res.should.have.status(200);
				_id = res.body._id;
				done();
			});
		});

		it('the created checklist should be the same as given one', (done)=>{
			chai.request(server)
			.get(`/api/checklist/${_id}`)
			.set('Authorization', `JWT ${token}`)
			.end((err, res)=>{
				res.should.have.status(200);
				expect(res.body._id).to.equal(_id);
				for (var property in checklist){
					if (checklist.hasOwnProperty(property)){
						for (var p in checklist[property]){
							expect(res.body[property][p]).to.include(checklist[property][p]);
						}
					}
				};
				done();
			});
		});
	});

});