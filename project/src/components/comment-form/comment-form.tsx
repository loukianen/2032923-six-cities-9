import {SyntheticEvent, useState, useEffect, Fragment} from 'react';
import {errorHandle} from '../../services/error-handle';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {sendCommentAction} from '../../store/api-actions';
import {REVIEW, MAX_STARS_RATING} from '../../const';
import {CommentFormDataType} from '../../types/other-types';
import {getHotelId} from '../../store/room-process/selectors';

export const FORM_DATA_INIT_STATE = { rating: null, comment: '' };

function getCheckboxesInitState() {
  return Array(MAX_STARS_RATING).fill(false);
}

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState(FORM_DATA_INIT_STATE as CommentFormDataType);
  const [checkboxes, setCheckboxes] = useState(getCheckboxesInitState());
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const hotelId = useAppSelector(getHotelId);

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({ ...formData, [name]: value });
  }

  function clearComment() {
    setFormData({...FORM_DATA_INIT_STATE});
    setCheckboxes(getCheckboxesInitState());
    const textareaElement = document.getElementById('room-comment-text') as HTMLTextAreaElement | null;
    if (textareaElement) {
      textareaElement.value = '';
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (hotelId) {
      clearComment();
      dispatch(sendCommentAction({comment: formData, hotelId, onRestoreFormData: setFormData}));
    } else {
      errorHandle({error: new Error()});
    }
  }

  useEffect(() => {
    const { rating, comment } = formData;
    const newCheckboxes = getCheckboxesInitState();
    if (rating !== null) {
      newCheckboxes[MAX_STARS_RATING - rating] = true;
    }
    setIsFormValid(rating !== null && comment.length >= REVIEW.MinLength);
    setCheckboxes(newCheckboxes);
  }, [formData]);

  return (
    <form className="reviews__form form" action="#-some-valid-path" method="post" onChange={handleChange} onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {checkboxes.map((item, i) => {
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
      <textarea id="room-comment-text" className="reviews__textarea form__textarea" name="comment" maxLength={REVIEW.MaxLength} placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={formData.comment} ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
