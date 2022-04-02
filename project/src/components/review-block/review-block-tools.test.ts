import makeFakeComments from '../../mocks/comments';
import {getCommentsForRendering} from './review-block';
import {shuffle} from '../../services/utils';
import {Comment} from '../../types/offers';
import {REVIEW} from '../../const';

const commentCount = REVIEW.MaxCount + 2;
const datesForFakeComments = Array(commentCount).fill(31).map((el, i) => `2022-03-${el - i}`);

const fakeComments = makeFakeComments(commentCount);
const commentsWithCustomDate = fakeComments.map((item, i) => ({...item, date: datesForFakeComments[i]}));

const controlComments = commentsWithCustomDate.slice(0, REVIEW.MaxCount);
const testData = shuffle(commentsWithCustomDate) as Comment[];

it('should resultComments be equal to control comments', () =>{
  expect(getCommentsForRendering(testData)).toEqual(controlComments);
});
