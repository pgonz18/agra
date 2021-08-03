import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import CasinoIcon from '@material-ui/icons/Casino';
import { rollDice, endTurn } from '../features/playerSlice';
import { SendEndTurn } from '../features/thunks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  number: {
    padding: '1px',
    font: 'bold 4em courier',
  },
  die: {
    fontSize: 60,
    color: props => props.color,
  },
});

const Die = () => {
  const { rolledNumber, color } = useSelector(state => state.player);
  const dispatch = useDispatch();

  const classes = useStyles({ color });

  const getRandomNum = () => {
    dispatch(rollDice(Math.floor(Math.random() * 6) + 1));
  };

  const endTurnClickHandler = (e) => {
    e.preventDefault();
    SendEndTurn();
    dispatch(endTurn());
  };

  return (
    <div className={classes.root}>
      <div className={classes.number}>{rolledNumber}</div>
      {(rolledNumber === 6 || rolledNumber === 0) &&     <CasinoIcon className={classes.die} onClick={getRandomNum}/>}
      <button onClick={endTurnClickHandler}>End Turn</button>
    </div>
  );
};

export default Die;
