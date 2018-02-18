import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import api from '../../api';

class RegistrationForm extends Component {
  state = {
    options: [],
    data: {
      name: '',
      project: '',
      description: ''
    },
    projectsLoading: false,
    errors: {},
    serverError: {}
  };

  componentDidMount() {
    this.setState({ projectsLoading: true });
    api.list.fetchAll('projects').then(projects => {
      const options = [];
      projects.forEach(project => {
        options.push({
          key: project._id,
          value: project._id,
          text: project.name
        });
      });

      this.setState({ ...this.state, options, projectsLoading: false });
    });
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onProjectChange = (e, data) =>
    this.setState({
      data: { ...this.state.data, project: data.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.project) errors.project = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { loading, serverError } = this.props;

    return (
      <Form onSubmit={this.onSubmit.bind(this)} loading={loading}>
        {serverError && (
          <Message negative>
            <Message.Header>{serverError}</Message.Header>
            <p>{serverError.message}</p>
          </Message>
        )}
        <Form.Field error={!!errors.name}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>
        <Form.Field error={!!errors.project}>
          <label htmlFor="project">Project</label>
          <Dropdown
            id="project"
            name="project"
            placeholder="Select a project"
            options={this.state.options}
            onChange={this.onProjectChange}
            loading={this.state.projectsLoading}
            fluid
            selection
          />
        </Form.Field>
        <Form.Field error={!!errors.description}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={this.onChange}
          />
          {errors.description && <InlineError text={errors.description} />}
        </Form.Field>
        <Button primary>Add</Button>
      </Form>
    );
  }
}
RegistrationForm.defaultProps = {
  loading: false,
  serverError: {}
};

RegistrationForm.propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  serverError: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default RegistrationForm;
