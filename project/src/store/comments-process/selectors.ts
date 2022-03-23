import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getReviewBlockData = (state: State) => ({
  comments: state[NameSpace.Comments],
  authorizationStatus: state[NameSpace.User].authorizationStatus,
});

