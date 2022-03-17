import {SyntheticEvent, useState, useEffect, Fragment} from 'react';
import {errorHandle} from '../../services/error-handle';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {sendCommentAction} from '../../store/api-actions';
import {MIN_REVIEW_LENGTH, MAX_STARS_RATING} from '../../const';
import {CommentFormDataType} from '../../types/other-types';
import {NameSpace} from '../../const';

export const FORM_DATA_INIT_STATE = { rating: null, comment: '' };

function getCheckboxesInitState() {
  return Array(MAX_STARS_RATING).fill(false);
}

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState(FORM_DATA_INIT_STATE as CommentFormDataType);
  const [isFormValid, setIsFormValid] = useState(false);
  const [checkboxes, setCheckboxes] = useState(getCheckboxesInitState());
  const dispatch = useAppDispatch();
  const hotelId = useAppSelector((state) => {
    const room = state[NameSpace.room];
    return room ? room.id : null;
  });

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (hotelId) {
      setCheckboxes(getCheckboxesInitState());
      setFormData(FORM_DATA_INIT_STATE);
      dispatch(sendCommentAction(formData, hotelId.toString(), setFormData));
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
    setIsFormValid(rating !== null && comment.length >= MIN_REVIEW_LENGTH);
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
              <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" checked={item} />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.comment}></textarea>
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
