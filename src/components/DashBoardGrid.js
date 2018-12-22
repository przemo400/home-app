import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { blue400 } from 'material-ui/styles/colors';
import red from '@material-ui/core/colors/red';
import Avatar from '@material-ui/core/Avatar';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    alignItems: 'flex-end'
  },
  grid: {
    alignContent: 'flex-start'
  },
  gridList: {
    width: 500,
    height: 500,
  },
  card: {
    minWidth: 60,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: red[500],
  },
};

let id = 0;
function createData(id, name, temp, hum) {
  id += 1;
  return { id, name, temp, hum };
}

const data = [
  createData(0, 'Czujnik 1', 22, 70),
  createData(1, 'Czujnik 2', 21, 60),
];

function DashboardTiles(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  console.log(classes);

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        {data.map(n => {
          return (
            <GridListTile key={n.id}>
              <Card className={classes.card}>

                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {n.name}
        </Typography>
                  <div className={classes.info}>
                    <Typography className={classes.title}  gutterBottom>
                      Temp (C)&nbsp;&nbsp;
              </Typography>
                    <Typography variant="h5" color='primary' component="h3">
                      {n.temp}
                  </Typography>
                  </div>
                  <div className={classes.info}>
                    <Typography className={classes.title}  gutterBottom>
                      Wilgotność (%)&nbsp;&nbsp;
                  </Typography>
                    <Typography variant="h5" color='primary' component="h3">
                      {n.hum}
                  </Typography>
                  </div>
                </CardContent>

              </Card>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

DashboardTiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardTiles);
