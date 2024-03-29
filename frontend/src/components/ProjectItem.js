import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Grid } from 'semantic-ui-react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const ProjectItem = ({ name, client, description, timeTotal }) => (
  <Card key={name} fluid>
    <Card.Content>
      <Card.Header content={name} />
      <Card.Meta content={client} />
      <Card.Description content={description} />
    </Card.Content>
    <Card.Content extra>
      <Grid className="middle aligned horizontally padded">
        <Grid.Column floated="left" width={3}>
          <div>
            <Icon name="clock" />
            {moment.duration(timeTotal, 'seconds').format('h:mm:s')}
          </div>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button>
            <Icon name="dollar" />
            Bill
          </Button>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

ProjectItem.defaultProps = {
  description: '',
  timeTotal: 0
};

ProjectItem.propTypes = {
  name: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  timeTotal: PropTypes.number,
  description: PropTypes.string
};

export default ProjectItem;
