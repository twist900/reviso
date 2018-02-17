import React from 'react';
import { Route } from 'react-router-dom';
import ProjectsPage from './components/pages/ProjectsPage';

const App = () => (
  <div className="ui container">
    <Route path="/" exact component={ProjectsPage} />
  </div>
);

export default App;
