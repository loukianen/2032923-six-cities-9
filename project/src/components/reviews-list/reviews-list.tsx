import Review from '../review/review';
import {Comment} from '../../types/offers';
import {REVIEW} from '../../const';

function compare(a: Comment, b: Comment) {
  const first = Date.parse(a.date);
  const second = Date.parse(b.date);
  return second - first;
}

function getCommentsForRendering(data: Comment[]) {
  const sortedComments = [...data].sort(compare);
  return sortedComments.slice(0, REVIEW.MaxCount);
}

function ReviewsList(props: { comments: Comment[] }): JSX.Element {
  const { comments } = props;
  const commentsForRendering = getCommentsForRendering(comments);

  return (
    <ul className="reviews__list" data-testid="reviews-list">
      {commentsForRendering.map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default ReviewsList;
