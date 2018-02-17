import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Loader } from 'semantic-ui-react';

import ProjectItem from '../ProjectItem';
import { fetchProjects } from '../../actions/projects';

class ProjectsPage extends Component {
  state = {};

  componentDidMount = () => this.props.fetchProjects();

  renderProject = project => <ProjectItem key={project.name} {...project} />;

  render() {
    const { projects, loading } = this.props;

    return (
      <div>
        {loading && <Loader active inline="centered" />}
        {!loading && map(projects, this.renderProject)}
      </div>
    );
  }
}

ProjectsPage.defaultProps = {
  loading: false
};

ProjectsPage.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
  ).isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  projects: state.projects.items,
  loading: state.projects.loading
});

export default connect(mapStateToProps, { fetchProjects })(ProjectsPage);
