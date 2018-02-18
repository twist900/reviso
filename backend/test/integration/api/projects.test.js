import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../../db';
import Project from '../../../src/models/Project';
import app from '../../../src';

const expect = chai.expect;
chai.use(chaiHttp);
const projectData = {
  name: 'Test project',
  client: 'Reviso'
};

describe('Projects API', function() {
  afterEach(done => db.afterEach(done));

  describe('GET /projects', function() {
    beforeEach(function(done) {
      Promise.all([
        Project.create({ ...projectData, name: 'Project 1' }),
        Project.create({ ...projectData, name: 'Project 2' }),
        Project.create({ ...projectData, name: 'Project 3' })
      ]).then(() => done());
    });

    it('responds with all projects', function(done) {
      chai
        .request(app)
        .get('/projects')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(3);
          done();
        });
    });
  });

  describe('POST /projects', function() {
    describe('with valid data', function() {
      it('responds with the created project', function(done) {
        chai
          .request(app)
          .post('/projects')
          .type('json')
          .send({
            name: 'Test project',
            client: 'Reviso',
            description: 'Test description',
            timeTotal: 55
          })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.contain.keys('_id');
            done();
          });
      });
    });

    describe('with invalid data', function(done) {
      it('responds with 400 Bad Request', function(done) {
        chai
          .request(app)
          .post('/projects')
          .type('json')
          .send({
            client: 'Reviso',
            description: 'Test description',
            timeTotal: 55
          })
          .catch(error => {
            expect(error).to.have.status(400);
            expect(error.response.body.error.message).to.include(
              'Path `name` is required'
            );
            done();
          });
      });
    });
  });
});
