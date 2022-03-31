import Review from '../review/review';
import {Comment} from '../../types/offers';

function ReviewsList(props: { comments: Comment[] }): JSX.Element {
  const { comments } = props;

  return (
    <ul className="reviews__list" data-testid="reviews-list">
      {comments.map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default ReviewsList;
