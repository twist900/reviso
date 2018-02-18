import RegistrationService from '../services/RegistrationService';

exports.get = async (req, res) => {
  const registrations = await RegistrationService.find(req.query);
  res.json({ data: registrations });
};

exports.create = async (req, res) => {
  try {
    const registration = await RegistrationService.insert(req.body);
    res.json({ data: registration });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

exports.toggle = async (req, res) => {
  try {
    const registration = await RegistrationService.toggle(req.params.id);
    res.json({ data: registration });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};
