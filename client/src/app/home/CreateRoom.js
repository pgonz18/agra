import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { sendCreateRoom } from '../features/thunks';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '350px',
    height: '350px',
    margin: 'auto',
    borderRadius: '1.5em',
    backgroundColor: '#ffffff',
    boxShadow: '0px 11px 35px 2px rgba(0, 0, 0, 0.14)',
    font: 'bold 20px sans-serif',
  },
  room: {
    margin: '5px auto',
    border: '1px solid #f5f5f5',
    borderRadius: '20px',
    padding: '20px',
  },
  pickColor: {
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

const CreateRoom = ({ clickHandler }) => {
  const [select, setSelect] = useState('2');
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

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

  const handleRoomNameChange = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendCreateRoom({ select, name, roomName }));
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <input onClick={clickHandler} type="submit" value="Lobby" />
    <div className={classes.room} >
      <label>
        Room name:
        <input type="text" value={roomName} onChange={handleRoomNameChange} />
      </label>
    </div>
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

export default CreateRoom;