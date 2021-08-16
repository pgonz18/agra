import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import ChatBox from './chat/ChatBox';
import Board from './board/Board'
import Die from './dice/Die';
import Instructions from './home/Instructions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  instrucstionsAndDie: {
    padding: '1%',
    margin: '1%',
    flex: '1 20%',
  },
});

const Game = () => {
  const player = useSelector((state) => state.player);

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Board />
      <ChatBox />
      <div className={classes.instrucstionsAndDie}>
      <Instructions />
      {
      player.playerNumber === player.whoseTurn + '' &&      <Die />
      }
      </div>
    </div>
  );
};

export default Game;
