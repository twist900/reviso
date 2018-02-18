import Registration from '../models/Registration';

class RegistrationService {
  static find(criteria) {
    return Registration.find(criteria);
  }

  static insert(registration) {
    return Registration.create(registration);
  }
}

export default RegistrationService;
