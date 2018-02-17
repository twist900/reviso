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
      ])
        .then(() => done())
        .catch(err => console.log(err));
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
});
