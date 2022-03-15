import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/hooks';

function ReviewBlock(): JSX.Element {
  const {comments} = useAppSelector((state) => state);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewsList comments={comments} />
      <CommentForm />
    </section>
  );
}

export default ReviewBlock;
