import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom'

const TopNavigation = () => (
  <Menu secondary pointing>
    <Menu.Item as={NavLink} to="/projects" content="Projects" />
    <Menu.Item as={NavLink} to="/registrations" content="Timer" />
  </Menu>
);

export default withRouter(TopNavigation);
