import {SyntheticEvent, useState, useEffect, Fragment} from 'react';
import {errorHandle} from '../../services/error-handle';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {sendCommentAction} from '../../store/api-actions';
import {REVIEW, MAX_STARS_RATING} from '../../const';
import {CommentFormDataType} from '../../types/other-types';
import {getHotelId} from '../../store/room-process/selectors';

const FORM_DATA_INIT_STATE = {
  rating: null,
  comment: '',
  checkboxesValue: getCheckboxesInitState(),
};

function getCheckboxesInitState() {
  return Array(MAX_STARS_RATING).fill(false);
}

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState<CommentFormDataType>(FORM_DATA_INIT_STATE);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormLocked, setIsFormLocked] = useState(false);
  const dispatch = useAppDispatch();
  const hotelId = useAppSelector(getHotelId);

  function clearComment() {
    setFormData({...FORM_DATA_INIT_STATE});
    setCommentText('');
    setIsFormLocked(false);
  }

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLFormElement;
    const newState = { ...formData, [name]: value, checkboxesValue: getCheckboxesInitState()};
    if (newState.rating) {
      newState.checkboxesValue[MAX_STARS_RATING - newState.rating] = true;
    }
    setFormData(newState);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (hotelId) {
      setIsFormLocked(true);
      dispatch(sendCommentAction({
        comment: formData,
        hotelId,
        onClearCommentForm: clearComment,
        onLockCommentForm: setIsFormLocked,
      }));
    } else {
      errorHandle({error: new Error()});
    }
  }

  function setCommentText(text: string) {
    const textareaElement = document.getElementById('room-comment-text') as HTMLTextAreaElement | null;
    if (textareaElement) {
      textareaElement.value = text;
    }
  }

  // function restoreFormData(data: CommentFormDataType) {
  //   setFormData(data);
  //   setCommentText(data.comment);
  // }

  useEffect(() => {
    const {rating, comment} = formData;
    setIsFormValid(rating !== null && comment.length >= REVIEW.MinLength);
  }, [formData]);

  return (
    <form className="reviews__form form" data-testid="reviews-form" action="#-some-valid-path" method="post" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {formData.checkboxesValue.map((item, i) => {
          const value = MAX_STARS_RATING - i;
          return (
            <Fragment key={value}>
              <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" checked={item} readOnly/>
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea id="room-comment-text" data-testid="room-comment-text" className="reviews__textarea form__textarea" name="comment" maxLength={REVIEW.MaxLength} placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={formData.comment} ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" data-testid="submit" type="submit" disabled={!isFormValid || isFormLocked}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
