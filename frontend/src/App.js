import React from 'react';
import { Route } from 'react-router-dom';
import ProjectsPage from './components/pages/ProjectsPage';
import RegistrationsPage from './components/pages/RegistrationsPage';
import TopNavigation from './components/navigation/TopNavigation';

const App = () => (
  <div className="ui container">
    <TopNavigation />
    <Route path="/" exact component={RegistrationsPage} />
    <Route path="/projects" exact component={ProjectsPage} />
  </div>
);

export default App;
