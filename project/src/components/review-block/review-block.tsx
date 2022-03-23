import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../reviews-list/reviews-list';
import {useAppSelector} from '../../hooks/hooks';
import {NameSpace} from '../../const';

function ReviewBlock(): JSX.Element {
  const {comments, authorizationStatus} = useAppSelector((state) => ({
    comments: state[NameSpace.Comments],
    authorizationStatus: state[NameSpace.Auth],
  }));
  const isAuthorisedUser = authorizationStatus === 'authorized';

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewsList comments={comments} />
      {isAuthorisedUser && <CommentForm />}
    </section>
  );
}

export default ReviewBlock;
