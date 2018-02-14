import chai from 'chai';
import Project from '../../../src/models/Project';
import db from '../../db';

const expect = chai.expect;
const projectData = {
  name: 'Test project'
};

describe('Project', function() {
  afterEach(done => db.afterEach(done));

  describe('relationships', function() {});

  describe('validations', function() {
    it('is valid with correct data', function() {
      const project = new Project(projectData);
      const errors = project.validateSync();

      expect(errors).not.to.exist;
    });

    it('is invalid when name is not present', function() {
      const project = new Project({ name: null });
      const { errors } = project.validateSync();

      expect(errors.name).to.exist;
    });

    it('is invalid when name not unique', function(done) {
      Project.create(projectData)
        .then(() => Project.create(projectData))
        .catch(err => {
          expect(err.errors.name.kind).to.equal('unique');
          done();
        });
    });
  });
});
