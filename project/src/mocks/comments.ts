import { Comments } from '../types/other-types';
import { IMG_URL } from '../const';

const comments: Comments = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: `${IMG_URL}avatar-max.jpg`,
      id: 1,
      isPro: false,
      name: 'Max',
    },
  },
];

export default comments;
