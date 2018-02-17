import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  client: { type: String, required: true }
});

schema.plugin(uniqueValidator);

export default mongoose.model('Project', schema);
