import chai from 'chai';
import Project from '../../../src/models/Project';
import Registration from '../../../src/models/Registration';
import db from '../../db';

const expect = chai.expect;
const projectData = {
  name: 'Test project',
  client: 'Reviso'
};
const registrationData = {
  name: 'Test time registration',
  description: 'Some description'
};

describe('Registration', function() {
  afterEach(done => db.afterEach(done));

  describe('relationships', function() {});

  describe('validations', function() {
    it('is valid with correct data', function() {
      Project.create(projectData).then(project => {
        const registration = new Registration({
          ...registrationData,
          project: project._id
        });
        const errors = registration.validateSync();

        expect(errors).not.to.exist;
      });
    });

    it('is invalid when project is not present', function(done) {
      const registration = new Registration({
        ...registrationData,
        project: null
      });
      const { errors } = registration.validateSync();

      expect(errors.project).to.exist;
      done();
    });

    it('is invalid when name is not present', function(done) {
      Project.create(projectData).then(project => {
        const registration = new Registration({
          ...registrationData,
          project: project._id,
          name: null
        });
        const { errors } = registration.validateSync();

        expect(errors.name).to.exist;
        done();
      });
    });
  });

  describe('hooks', function() {
    describe('after save', function() {
      it('updates totalTime on project', function(done) {
        Project.create(projectData)
          .then(project =>
            Registration.create({
              ...registrationData,
              project: project._id
            })
          )
          .then(registration => {
            registration.previousTime = registration.time;
            registration.time += 60;
            return registration.save();
          })
          .then(registration =>
            Project.findById({ _id: registration.project })
          )
          .then(project => {
            expect(project.timeTotal).to.equal(60);
            done();
          });
      });
    });
  });
});
