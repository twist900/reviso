import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';

import ProjectItem from '../ProjectItem';
import FormModal from '../FormModal';
import CreateProjectForm from '../forms/ProjectForm';
import {
  fetchItems,
  resetNewItem,
  createItem
} from '../../actions/list';

const LIST_NAME = 'registrations';

class RegistrationsPage extends Component {
  state = { modalOpen: false };

  componentDidMount = () => this.props.fetchItems(LIST_NAME);

  componentWillReceiveProps = nextProps => {
    const { newItem } = nextProps;
    if (
      this.props.newItem.loading &&
      !newItem.loading &&
      !newItem.error
    ) {
      this.setState({ ...this.state, modalOpen: false });
    }
  };

  onAddProject = () => {
    this.props.resetNewItem();
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  };
  renderProject = project => <ProjectItem key={project.name} {...project} />;

  render() {
    const { items, loading, newItem } = this.props;

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
                  this.props.createItem(project);
                }}
                serverError={newItem.error}
                loading={newItem.loading}
              />
            </FormModal>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading && <Loader active inline="centered" />}
          {!loading && map(items, this.renderProject)}
        </Grid.Row>
      </Grid>
    );
  }
}

RegistrationsPage.defaultProps = {
  loading: false,
  serverError: { message: null }
};

RegistrationsPage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  resetNewItem: PropTypes.func.isRequired,
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
  items: state.list.items,
  loading: state.list.loading,
  serverError: state.list.serverError,
  newItem: state.list.newItem
});

export default connect(mapStateToProps, {
  fetchItems,
  createItem,
  resetNewItem
})(RegistrationsPage);
