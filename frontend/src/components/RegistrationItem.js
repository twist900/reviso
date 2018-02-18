import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Grid } from 'semantic-ui-react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

class RegistrationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.time || 0
    };

    if (this.props.playing) {
      this.startTimer();
    }
  }

  tick = () => this.setState({ time: this.state.time + 1 });

  startTimer() {
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  render() {
    const { name, project, description, playing, toggleTimer } = this.props;
    const { time } = this.state;

    return (
      <Card key={name} fluid>
        <Card.Content>
          <Card.Header content={name} />
          <Card.Meta content={project.name} />
          <Card.Description content={description} />
        </Card.Content>
        <Card.Content extra>
          <Grid className="middle aligned horizontally">
            <Grid.Column floated="left" width={3}>
              <div>
                <Icon name="clock" />{' '}
                {moment.duration(time, 'seconds').format('h:mm:s')}
              </div>
            </Grid.Column>
            <Grid.Column floated="right" width={2}>
              {playing && (
                <Button
                  onClick={toggleTimer}
                  color="red"
                  circular
                  icon="stop"
                />
              )}
              {!playing && (
                <Button
                  onClick={toggleTimer}
                  color="green"
                  circular
                  icon="play"
                />
              )}
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

RegistrationItem.defaultProps = {
  description: '',
  time: 0,
  playing: false
};

RegistrationItem.propTypes = {
  name: PropTypes.string.isRequired,
  project: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  toggleTimer: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  time: PropTypes.number,
  description: PropTypes.string
};

export default RegistrationItem;
