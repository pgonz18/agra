import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { boardConstructor } from './boardMatrix';
import Row from './Row';

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    borderRadius: '20px',
    backgroundColor: '#E7B18F',
    padding: '1%',
    minHeight: '280px',
    maxHeight: '320px',
    minWidth: '330px',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    boxShadow: '10px 5px 5px #6649ec',
  },
});

const Board = () => {
  const classes = useStyles();
  const boardArray = boardConstructor();

  return (
    <div className={classes.root}>
      { boardArray.map((row, i) => <Row row={row} key={i} />) }
    </div>
  );
};

export default Board;
