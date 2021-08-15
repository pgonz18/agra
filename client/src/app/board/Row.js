import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Spot from './Spot';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    border: 'none',
    margin: '2px',
    height: '15px',
    flexDirection: 'row',
    alignItems: 'center',
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
