import {datatype, date, internet, lorem} from 'faker';
import {Comment} from '../types/offers';

const COMMENT_AMOUNT = 2;

const makeFakeComments = (amount = COMMENT_AMOUNT): Comment[] => Array.from(
  Array(amount),
  () => ({
    comment: lorem.paragraph(COMMENT_AMOUNT),
    date: date.past(1).toString(),
    id: datatype.number(),
    rating: datatype.float(),
    user: {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
    },
  }),
);

export default makeFakeComments;
