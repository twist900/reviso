import Registration from '../models/Registration';

class RegistrationService {
  static find(criteria) {
    return Registration.find(criteria).populate('project').exec();
  }

  static insert(registration) {
    return Registration.create(registration);
  }
}

export default RegistrationService;
