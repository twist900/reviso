import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';

import ProjectItem from '../ProjectItem';
import FormModal from '../FormModal';
import CreateProjectForm from '../forms/ProjectForm';
import {
  fetchProjects,
  resetNewProject,
  createProject
} from '../../actions/projects';

class ProjectsPage extends Component {
  state = { modalOpen: false };

  componentDidMount = () => this.props.fetchProjects();

  componentWillReceiveProps = nextProps => {
    const { newProject } = nextProps;
    if (
      this.props.newProject.loading &&
      !newProject.loading &&
      !newProject.error
    ) {
      this.setState({ ...this.state, modalOpen: false });
    }
  };

  onAddProject = () => {
    this.props.resetNewProject();
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  };
  renderProject = project => <ProjectItem key={project.name} {...project} />;

  render() {
    const { projects, loading, newProject } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button
              floated="right"
              positive
              disabled={loading}
              onClick={this.onAddProject}
            >
              Add Project
            </Button>
            <FormModal
              open={this.state.modalOpen}
              onClose={() =>
                this.setState({
                  ...this.state,
                  modalOpen: !this.state.modalOpen
                })
              }
              header="Create Project"
            >
              <CreateProjectForm
                submit={project => {
                  this.props.createProject(project);
                }}
                serverError={newProject.error}
                loading={newProject.loading}
              />
            </FormModal>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading && <Loader active inline="centered" />}
          {!loading && map(projects, this.renderProject)}
        </Grid.Row>
      </Grid>
    );
  }
}

ProjectsPage.defaultProps = {
  loading: false,
  serverError: { message: null }
};

ProjectsPage.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  resetNewProject: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
  ).isRequired,
  newProject: PropTypes.shape({
    project: PropTypes.shape({ name: PropTypes.string.isRequired }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  projects: state.projects.items,
  loading: state.projects.loading,
  serverError: state.projects.serverError,
  newProject: state.projects.newProject
});

export default connect(mapStateToProps, {
  fetchProjects,
  createProject,
  resetNewProject
})(ProjectsPage);
