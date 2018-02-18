import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
  state = {
    data: {
      name: '',
      client: '',
      description: ''
    },
    errors: {},
    serverError: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
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
    if (!data.client) errors.client = "Can't be blank";
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
        <Form.Field error={!!errors.client}>
          <label htmlFor="client">Client</label>
          <input
            id="client"
            name="client"
            placeholder="Client"
            value={data.client}
            onChange={this.onChange}
          />
          {errors.client && <InlineError text={errors.client} />}
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
LoginForm.defaultProps = {
  loading: false,
  serverError: {}
};

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  serverError: PropTypes.shape({ message: PropTypes.string.isRequired })
};

export default LoginForm;
