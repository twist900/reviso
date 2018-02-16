import projectsRoute from './projects';

exports.init = app => {
  app.use('/projects', projectsRoute);

  app.get('/*', (req, res) => {
    res.json({ name: 'Reviso API' });
  });
};
