import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Spot from './Spot';

const useStyles = makeStyles({
  root: {
    border: 'none',
    margin: '0',
    height: '15px',
    flexDirection: 'row',
  },
});

const Row = ({ row }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      { row.map((spot, i) => <Spot value={spot} key={i} />) }
    </div>
  );
};

export default Row;
