import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/hooks';
import {getReviewBlockData} from '../../store/comments-process/selectors';
import {AuthorizationStatus, REVIEW} from '../../const';
import {Comment} from '../../types/offers';

function compare(a: Comment, b: Comment) {
  return b.date.localeCompare(a.date);
}

export function getCommentsForRendering(data: Comment[]) {
  const sortedComments = [...data].sort(compare);
  return sortedComments.slice(0, REVIEW.MaxCount);
}

function ReviewBlock(): JSX.Element {
  const {comments, authorizationStatus} = useAppSelector(getReviewBlockData);
  const isAuthorisedUser = authorizationStatus === AuthorizationStatus.Auth;

  const commentsForRendering = getCommentsForRendering(comments);

  return (
    <section className="property__reviews reviews" data-testid="property-reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount" data-testid="reviews-amount">{commentsForRendering.length}</span></h2>
      <ReviewsList comments={commentsForRendering} />
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default ReviewBlock;
