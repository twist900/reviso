import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { fetchProjects } from '../../actions/projects';

class ProjectsPage extends Component {
  state = {};

  componentDidMount = () => this.props.fetchProjects();

  render() {
    return <div>{map(this.props.projects, 'name')}</div>;
  }
}

ProjectsPage.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({ projects: state.projects.items });

export default connect(mapStateToProps, { fetchProjects })(ProjectsPage);
