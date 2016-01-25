var request = require('request');

var baseUrl = 'http://localhost:3000/';

describe('server.js', function() {

  xdescribe('GET /', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl).on('response', function(response) {
        console.log('test1', response.statusCode);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  xdescribe('GET /postList', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + 'postList')
      .on('response', function(response) {
        console.log('test2', response.statusCode, response.data);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  xdescribe('POST /authenticate', function() {

    it('returns status code 200 and a user object if user and password match', function(done) {
      request({
        url: baseUrl + 'authenticate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: { username: 'test', password: 'asdf' },
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log(response.statusCode, body);
          expect(response.statusCode).toBe(200);
          expect(body[0].username).toBe('test');
          done();
        }
      });
    });

      it('returns status code 401 if user and password DONT match', function(done) {
        request({
          url: baseUrl + 'authenticate',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          json: { username: 'raphael', password: 'fail' },
        }, function(error, response, body) {
          if (error) {
            console.log(error);
          } else {
            console.log('returns status code 401 if user and password DONT match:', response.statusCode, body);
            expect(response.statusCode).toBe(401);
            expect(body).toBe(false);
            done();
          }
        });

    });
  });
  xdescribe('/create user', function () {
    it('returns status code 406 on dupe user found', function(done) {
      request({
        url: baseUrl + 'createUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: { username: 'test', password: 'asdf' },
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log('returns status code 406 if dupe user:', response.statusCode, body);
          expect(response.statusCode).toBe(406);
          // expect(body).toBe(false);
          done();
        }
      });
    });

    it('returns status code 406 incomplete data', function(done) {
      request({
        url: baseUrl + 'createUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: { username: 'test' },
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log('returns status code 406 if incomplete data:', response.statusCode, body);
          expect(response.statusCode).toBe(406);
          done();
        }
      });
    });

    it('should return 200 on success MUST RESET DB OR USE A NEW USERNAME EVERY TIME FOR THIS TO WORK', function(done) {
      request({
        url: baseUrl + 'createUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        json: { username: 'test12', password: 'asdf' },
      }, function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          console.log('returns status code 406 if incomplete data:', response.statusCode, body);
          expect(response.statusCode).toBe(200);
          done();
        }
      });
    });

  });
  describe('createPost', function() {});
  xdescribe('viewpost', function() {});

});
