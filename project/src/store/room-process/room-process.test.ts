import roomProcess, {setRoom, setRoomData} from './room-process';
import makeFakeOffers from '../../mocks/offers';
import makeFakeRoomData from '../../mocks/roomData';

const state = null;
const room = makeFakeOffers(1)[0];
const roomData = makeFakeRoomData();

describe('Reducer: roomProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(roomProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual(null);
  });

  it('should update offers by set room', () => {
    expect(roomProcess.reducer(state, setRoom(room)))
      .toEqual(room);
  });

  it('should update offers by set room data', () => {
    expect(roomProcess.reducer(state, setRoomData(roomData)))
      .toEqual(roomData.room);
  });
});
