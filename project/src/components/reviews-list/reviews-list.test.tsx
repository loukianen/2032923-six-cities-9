import {render, screen} from '@testing-library/react';
import {REVIEW} from '../../const';
import ReviewsList from './reviews-list';
import makeFakeComments from '../../mocks/comments';

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const comments = makeFakeComments(12);

    render(<ReviewsList comments={comments} />);

    expect(screen.getAllByTestId('review-item').length).not.toBeGreaterThan(REVIEW.MaxCount);
  });
});
