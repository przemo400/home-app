import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
};

let id = 0;
function createData(id, name, value) {
  id += 1;
  return { id, name, value };
}

const data = [
  createData(1, 'Temperatura', 22),
  createData(2, 'Wilgotność', 70),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <div>
      <Typography variant="h4" gutterBottom component="h2">
        Orders
  </Typography>

      <Paper className={classes.root}>

        <Table className={classes.table}  >
          <TableHead>
            <TableRow>
              <TableCell>Parametr</TableCell>
              <TableCell align="right">Wartość</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.name}
                  </TableCell>
                  <TableCell align="right">{n.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
