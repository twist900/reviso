import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button, Grid } from 'semantic-ui-react';

const ListItem = ({
  header,
  meta,
  description,
  timeTotal,
  btnLabel,
  icon,
  btnCircular
}) => (
  <Card key={header} fluid>
    <Card.Content>
      <Card.Header content={header} />
      <Card.Meta content={meta} />
      <Card.Description content={description} />
    </Card.Content>
    <Card.Content extra>
      <Grid className="middle aligned horizontally padded">
        <Grid.Column floated="left" width={3}>
          <div>
            <Icon name="clock" /> {timeTotal}
          </div>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button icon={icon} circular={btnCircular}>
            {btnLabel}
          </Button>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
);

ListItem.props = {
  description: '',
  timeTotal: 0,
  btnCircular: false
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  timeTotal: PropTypes.number,
  description: PropTypes.string,
  btnCircular: PropTypes.bool
};

export default ListItem;
