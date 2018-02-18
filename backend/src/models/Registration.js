import Project from './Project';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  lastStart: { type: Date },
  time: { type: Number, default: 0 },
  playing: { type: Boolean, default: false},
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

export default mongoose.model('Registration', schema);
