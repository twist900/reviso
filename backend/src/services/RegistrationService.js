import moment from 'moment';
import Registration from '../models/Registration';
import Project from '../models/Project';

class RegistrationService {
  static find(criteria) {
    return Registration.find(criteria)
      .populate('project')
      .exec();
  }

  static insert(registration) {
    return Registration.create(registration);
  }

  static async toggle(_id) {
    const prevRegistration = await Registration.findById({ _id });
    const { playing, lastStart, time } = prevRegistration;
    let updatedRegistration;

    if (playing) {
      const now = moment(new Date());
      const start = moment(lastStart);
      const duration = moment.duration(now.diff(start)).asSeconds();

      prevRegistration.playing = false;
      prevRegistration.time = time + duration;
      updatedRegistration = await prevRegistration.save();

      const project = await Project.findById({ _id: prevRegistration.project });
      project.timeTotal += duration;
      await project.save();
    } else {
      prevRegistration.playing = true;
      prevRegistration.lastStart = new Date();
      updatedRegistration = await prevRegistration.save();
    }

    return updatedRegistration;
  }
}

export default RegistrationService;
