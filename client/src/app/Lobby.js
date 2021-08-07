import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Game from './Game';
import CreateRoom from './home/CreateRoom';
import JoinGame from './home/JoinGame';
import { makeStyles } from '@material-ui/styles';
import { notifyWin, resetEveryone } from './features/thunks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '350px',
    height: '350px',
    margin: 'auto',
    borderRadius: '1.5em',
    backgroundColor: '#ffffff',
    boxShadow: '0px 11px 35px 2px rgba(0, 0, 0, 0.14)',
    font: 'bold 20px sans-serif',
  },
  join: {
    color: 'green',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  create: {
    color: 'blue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  input: {
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  button: {
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
});

const Lobby = () => {
  const [click, setClick] = useState("Lobby");
  const player = useSelector((state) => state.player);
  const classes = useStyles();

  const resetGame = (e) => {
    e.preventDefault();
    resetEveryone();
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setClick(e.target.value);
  }

  if (player.playerNumber) {
    if (player.won !== undefined) {
      if (player.won) notifyWin(player.username);
      const display =
        <div>{
          player.won ?
            <div><h1>YOU WON!!!</h1></div> :
            <div><h1>You lost to {player.winner}!</h1></div>
          }
          <button onClick={resetGame}>Reset</button>
        </div>;
      return (display);
    };
    return ( <Game /> );
  };

  return (

      click === 'Create' ?
        <CreateRoom clickHandler={clickHandler} /> :
        click === 'Join' ?
        <JoinGame clickHandler={clickHandler} /> :
    <div className={classes.root} >
      <div className={classes.join} >
      <label>
        Join game!
      </label>
      <input onClick={clickHandler} type="submit" value="Join" />
      </div>
      <div className={classes.create} >
      <label>
        Create a new game here!
      </label>
      <input onClick={clickHandler} type="submit" value="Create" />
        </div>
    </div>


  );
};

export default Lobby;
