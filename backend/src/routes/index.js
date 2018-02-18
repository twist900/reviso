import projectsRoute from './projects';
import registrationsRoute from './registrations';

exports.init = app => {
  app.use('/projects', projectsRoute);
  app.use('/registrations', registrationsRoute);

  app.get('/*', (req, res) => {
    res.json({ name: 'Reviso API' });
  });
};
