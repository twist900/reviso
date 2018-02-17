import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom'

const TopNavigation = () => (
  <Menu secondary pointing>
    <Menu.Item as={NavLink} exact to="/" content="Timer" />
    <Menu.Item as={NavLink} to="/projects" content="Projects" />
  </Menu>
);

export default withRouter(TopNavigation);
