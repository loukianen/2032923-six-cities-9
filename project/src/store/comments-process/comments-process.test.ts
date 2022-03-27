import commentsProcess, {setComments} from './comments-process';
import {setRoomData} from '../room-process/room-process';
import makeFakeComments from '../../mocks/comments';
import makeFakeRoomData from '../../mocks/roomData';
import {Comment} from '../../types/offers';

const comments = makeFakeComments();
const roomData = makeFakeRoomData();

describe('Reducer: commentsProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual([]);
  });

  it('should update comments by set comments', () => {
    const state = [] as Comment[];
    expect(commentsProcess.reducer(state, setComments(comments)))
      .toEqual(comments);
  });

  it('should update comments by set room data', () => {
    const state = [] as Comment[];
    expect(commentsProcess.reducer(state, setRoomData(roomData)))
      .toEqual(roomData.comments);
  });
});
