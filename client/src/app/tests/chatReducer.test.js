import reducer, { addMessage } from '../features/chatSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual([]);
});

test('should add a message', () => {
const fakeMessageData = { user: 'test', message: 'hello', color: 'red' };

const newState = reducer([], addMessage(fakeMessageData));
expect(newState[0].message).toEqual('hello');
});

test('should add new message to existing messages', () => {
  const fakeMessageData = { user: 'someOtherTest', message: 'world', color: 'blue' };

  const newState = reducer([{ user: 'test', message: 'hello', color: 'red' }], addMessage(fakeMessageData));
  expect(newState[1].user).toEqual('someOtherTest');
});
