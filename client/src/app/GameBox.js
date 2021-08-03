import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import ChatBox from './chat/ChatBox';
import Board from './board/Board'
import Die from './dice/Die';
import Instructions from './Instructions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  instrucstionsAndDie: {
    width: '100px',
    heigth: '100px',
    flex: '0 1 auto',
  },
});

const GameBox = () => {
  const player = useSelector((state) => state.player);

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <div className={classes.instrucstionsAndDie}>
      <Instructions />
      {
      player.playerNumber === player.whoseTurn + '' &&      <Die />
      }
      </div>
      <Board />
      <ChatBox />
    </div>
  );
};

export default GameBox;
