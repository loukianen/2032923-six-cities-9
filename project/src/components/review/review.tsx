import {Comment} from '../../types/offers';
import {getRatingStyleData} from '../../services/utils';

function Review(props: { comment: Comment }): JSX.Element {
  const { comment: {
    comment, date, rating, user: { avatarUrl, name },
  } } = props;
  const displayedDate = new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getRatingStyleData(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{displayedDate}</time>
      </div>
    </li>
  );
}

export default Review;
