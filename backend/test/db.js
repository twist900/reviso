import mongoose from 'mongoose';
import Cleaner from 'database-cleaner';

const dbCleaner = new Cleaner('mongodb');

before(done => {
  mongoose.connect('mongodb://localhost/reviso_test', done);
});

export default {
  afterEach(done) {
    dbCleaner.clean(mongoose.connection.db, done);
  }
};
