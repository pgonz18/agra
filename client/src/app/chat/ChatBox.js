import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Messages from './Messages';
import Input from './Input';

const useStyles = makeStyles({
  root: {
    maxHeight: '200px',
    // width: '180px',
    flex: '1 20%',
    padding: '1%',
    margin: '1%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1%',
    padding: '1%',
  },
  messages: {
    flex: '1 80%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '175px',
  },
  input: {
    flex: '1 1%',
    height: '20px',
    marginTop: '5px',
  },
});

const ChatBox = () => {
  const messages = useSelector((state) => state.messages);
  const classes = useStyles();
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    chatRef.current.focus({ preventScroll: false });
  });

  return (
    <div className={classes.root}>
      <h3>Chat</h3>
      <div className={classes.messages} >{
        messages.map((message, i) =>
          <Messages message={message.message} player={message.username} color={message.color} key={i} />
      )}
      <div ref={chatRef} ></div>
      </div>
      <div className={classes.input}>
        <Input />
      </div>
    </div>
  );
};

export default ChatBox;
