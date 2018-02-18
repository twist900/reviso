import Project from './Project';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  previousTime: { type: Number, default: 0 },
  time: { type: Number, default: 0 },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

schema.post('save', async registration => {
  const project = await Project.findById({ _id: registration.project });
  const { time, previousTime } = registration;
  project.timeTotal += time - previousTime;
  await project.save();
});

export default mongoose.model('Registration', schema);
