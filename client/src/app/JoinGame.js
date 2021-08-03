import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameBox from './GameBox';
import { makeStyles } from '@material-ui/styles';
import { fetchPlayer, notifyWin, resetEveryone } from './features/thunks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '350px',
    height: '350px',
    margin: '7em auto',
    borderRadius: '1.5em',
    backgroundColor: '#ffffff',
    boxShadow: '0px 11px 35px 2px rgba(0, 0, 0, 0.14)',
    font: 'bold 20px sans-serif',
  },
  pickColor: {
    margin: '1em auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  input: {
    margin: '1em auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  button: {
    margin: '1em auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
});

const JoinGame = () => {
  const [select, setSelect] = useState('2');
  const [name, setName] = useState('');

  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelect(e.target.value);
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPlayer({ select, name }));
  };

  const resetGame = (e) => {
    e.preventDefault();
    resetEveryone();
  };

  if (player.playerNumber) {
    if (player.won !== undefined) {
      if (player.won) notifyWin(name);
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
    return ( <GameBox /> );
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.pickColor}>
        <label>
          Pick color:
          <select value={select} onChange={handleSelectChange}>
            <option value="2">Red</option>
            <option value="3">Blue</option>
            <option value="4">Green</option>
            <option value="5">Orange</option>
          </select>
        </label>
      </div>
      <div className={classes.input}>
      <label>
        Player name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      </div>
      <div className={classes.button}>
      <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default JoinGame;
