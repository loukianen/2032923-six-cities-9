import { SyntheticEvent, useState, useEffect, Fragment } from 'react';
import { MIN_REVIEW_LENGTH, MAX_STARS_RATING } from '../../const';

function getCheckboxesInitState() {
  return Array(MAX_STARS_RATING).fill(false);
}

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState({ rating: null, review: '' } as { rating: number | null, review: string });
  const [isFormValid, setIsFormValid] = useState(false);
  const [checkboxes, setCheckboxes] = useState(getCheckboxesInitState());

  function handleChange(e: SyntheticEvent) {
    const { name, value } = e.target as HTMLFormElement;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setCheckboxes(getCheckboxesInitState());
    setFormData({ rating: null, review: '' });
  }

  useEffect(() => {
    const { rating, review } = formData;
    const newCheckboxes = getCheckboxesInitState();
    if (rating !== null) {
      newCheckboxes[MAX_STARS_RATING - rating] = true;
    }
    setIsFormValid(rating !== null && review.length >= MIN_REVIEW_LENGTH);
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
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review}></textarea>
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
