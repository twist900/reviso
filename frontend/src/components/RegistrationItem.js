import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Grid } from 'semantic-ui-react';

const RegistrationItem = ({
  name,
  project,
  description,
  time,
  playing,
  toggleTimer
}) => (
  <Card key={name} fluid>
    <Card.Content>
      <Card.Header content={name} />
      <Card.Meta content={project.name} />
      <Card.Description content={description} />
    </Card.Content>
    <Card.Content extra>
      <Grid className="middle aligned horizontally">
        <Grid.Column floated="left" width={1}>
          <div>
            <Icon name="clock" /> {time}
          </div>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          {playing && (
            <Button onClick={toggleTimer} color="red" circular icon="stop" />
          )}
          {!playing && (
            <Button onClick={toggleTimer} color="green" circular icon="play" />
          )}
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

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
