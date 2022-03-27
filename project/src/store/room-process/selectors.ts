import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getRoomPageData = (state: State) => ({
  room: state[NameSpace.Room],
  offersNearby: state[NameSpace.OffersNearby],
});

export const getHotelId = (state: State) => {
  const room = state[NameSpace.Room];
  return room ? room.id : null;
};
