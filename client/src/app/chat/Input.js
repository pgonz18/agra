import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../features/thunks';

const Input = () => {
  const [message, setMessage] = useState('');

  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handleMessageChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    const data = { user: player.username, message, color: player.color };
    dispatch(sendMessage(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input type="text" value={message} onChange={handleMessageChange} />
      </label>
      <input type="submit" value="Send" />
    </form>
  );
};

export default Input;
