import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/hooks';
import {getReviewBlockData} from '../../store/comments-process/selectors';
import {AuthorizationStatus} from '../../const';

function ReviewBlock(): JSX.Element {
  const {comments, authorizationStatus} = useAppSelector(getReviewBlockData);
  const isAuthorisedUser = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewsList comments={comments} />
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default ReviewBlock;
