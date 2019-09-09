import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems } from './listItems';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import DashboardTiles from './DashBoardGrid';
import axios from 'axios';
import { createSensorData, getSensorData } from '../data/sensor.js';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const titleText = {
  overview: 'Przegląd',
  chart: 'Wykres',
  settings: 'Ustawienia'
}

class Dashboard extends React.Component {
  state = {
    open: false,
    chart: true,
    table: false,
    type: '1',
    title: "Overview",
    sensorData: [],
    busy: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getTitle = (type) => {
    switch (type) {
      case '1': return titleText.overview;
      case '2': return titleText.chart;
      default: return 'Unknown';
    }
  };

  onMyClick = (source, type) => {
    source.persist();
    this.setState({ type: type, open: false, title: this.getTitle(type) });
    console.log(source);
    console.log(type);
  };

  onRefresh = (source) => {
    console.log('OnRefresh');
    getSensorData().then((sensorData) => {
      this.setState({ sensorData : sensorData})
    });
  };

  componentDidMount() {
    try {

      this.setState({ title: this.getTitle(this.state.type) });
      
      getSensorData().then((sensorData) => {
        this.setState({ sensorData : sensorData})
      });
/*
      axios.get('rpi-dht/dht?test=true').then((res) => {
        console.log(res);
        console.log(  createSensorData(
              res.data.device, 
              res.data.device,
              res.data.temperature,
              res.data.humidity));
        this.setState({ sensorData : [
          createSensorData(
            res.data.device, 
            res.data.device,
            res.data.temperature,
            res.data.humidity)]});
      }

      )*/
    } catch (e) {
      // Do nothing at all
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {this.state.title}
            </Typography>
        
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
          onClose={this.handleDrawerClose}
        >
          <Divider />
          <List><MainListItems onMyClick={this.onMyClick} /></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          {this.state.type == 1 && <DashboardTiles onRefresh={this.onRefresh} sensorData={this.state.sensorData}/>}

          {this.state.type == 2 && <SimpleLineChart />}

        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
