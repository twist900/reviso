import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';

import ListItem from '../ListItem';
import FormModal from '../FormModal';
import RegistrationForm from '../forms/RegistrationForm';
import { fetchItems, resetNewItem, createItem } from '../../actions/list';

const LIST_NAME = 'registrations';

class RegistrationsPage extends Component {
  state = { modalOpen: false };

  componentDidMount = () => this.initList();

  componentWillReceiveProps = nextProps => {
    const { newItem } = nextProps;
    if (this.props.newItem.loading && !newItem.loading && !newItem.error) {
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

  initList = () => this.props.fetchItems(LIST_NAME);

  renderRegistration = registration => {
    return (
      <ListItem
        key={registration.name}
        header={registration.name}
        meta={registration.project.name}
        description={registration.description}
        timeTotal={registration.time}
        icon="play"
        btnCircular
      />
    );
  };

  render() {
    const { items, loading, newItem, listName } = this.props;

    if (listName !== LIST_NAME) {
      return <Loader active inline="centered" />;
    }

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
              Add Timer
            </Button>
            <FormModal
              open={this.state.modalOpen}
              onClose={() =>
                this.setState({
                  ...this.state,
                  modalOpen: !this.state.modalOpen
                })
              }
              header="Create Timer"
            >
              <RegistrationForm
                submit={project => this.props.createItem(project, LIST_NAME)}
                serverError={newItem.error}
                loading={newItem.loading}
              />
            </FormModal>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading && <Loader active inline="centered" />}
          {!loading && map(items, this.renderRegistration)}
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
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
  ).isRequired,
  newItem: PropTypes.shape({
    project: PropTypes.shape({ name: PropTypes.string.isRequired }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired,
  listName: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  items: state.list.items,
  loading: state.list.loading,
  serverError: state.list.serverError,
  newItem: state.list.newItem,
  listName: state.list.name
});

export default connect(mapStateToProps, {
  fetchItems,
  createItem,
  resetNewItem
})(RegistrationsPage);
