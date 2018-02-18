import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import db from '../../db';
import Project from '../../../src/models/Project';
import Registration from '../../../src/models/Registration';
import app from '../../../src';

const expect = chai.expect;
chai.use(chaiHttp);
const projectData = {
  name: 'Test project',
  client: 'Reviso'
};
const registrationData = {
  name: 'Test time registration',
  description: 'Some description',
  lastStart: moment()
    .subtract(2, 'h')
    .toDate(),
  time: 0,
  playing: true
};

describe('Registration API', function() {
  afterEach(done => db.afterEach(done));

  describe('GET /registrations', function() {
    beforeEach(function(done) {
      Project.create(projectData)
        .then(project =>
          Promise.all([
            Registration.create({
              ...registrationData,
              project: project._id
            }),
            Registration.create({
              ...registrationData,
              project: project._id
            })
          ])
        )
        .then(() => done());
    });

    it('responds with all registrations', function(done) {
      chai
        .request(app)
        .get('/registrations')
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(2);
          done();
        });
    });
  });

  describe('POST /registrations', function() {
    beforeEach(function(done) {
      Project.create(projectData).then(() => done());
    });

    describe('with valid data', function() {
      it('responds with the created registration', function(done) {
        Project.findOne({}).then(project =>
          chai
            .request(app)
            .post('/registrations')
            .type('json')
            .send({
              ...registrationData,
              project: project._id
            })
            .then(res => {
              expect(res).to.have.status(200);
              expect(res.body.data).to.contain.keys('_id');
              done();
            })
        );
      });
    });

    describe('with invalid data', function(done) {
      it('responds with 400 Bad Request', function(done) {
        chai
          .request(app)
          .post('/registrations')
          .type('json')
          .send({
            ...registrationData,
            project: null
          })
          .catch(error => {
            expect(error).to.have.status(400);
            expect(error.response.body.error.message).to.include(
              'Path `project` is required'
            );
            done();
          });
      });
    });
  });

  describe('POST /toggle', function() {
    beforeEach(function(done) {
      Project.create(projectData)
        .then(project =>
          Registration.create({
            ...registrationData,
            project: project._id
          })
        )
        .then(() => done());
    });

    it('should update timeTotal on associated project', function(done) {
      Registration.findOne({}).then(registration =>
        chai
          .request(app)
          .get(`/registrations/${registration._id}/toggle`)
          .type('json')
          .then(() => Project.findById({ _id: registration.project }))
          .then(project => {
            expect(Math.round(project.timeTotal)).to.equal(2);
            done();
          })
      );
    });

    it('should update registration', function(done) {
      Registration.findOne({}).then(registration =>
        chai
          .request(app)
          .get(`/registrations/${registration._id}/toggle`)
          .type('json')
          .then(res => {
            expect(res.body.data.playing).to.be.false;
            done();
          })
      );
    });
  });
});
