import {render, screen} from '@testing-library/react';
import Review from './review';
import makeFakeComments from '../../mocks/comments';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const comment = makeFakeComments(1)[0];
    comment.date = '2022-03-26';
    const controlDateText = 'March 2022';

    render(<Review comment={comment} />);

    const avatar = screen.getByAltText(/Reviews avatar/i);
    expect(avatar.getAttribute('src')).toBe(comment.user.avatarUrl);

    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
    expect(screen.getByText(controlDateText)).toBeInTheDocument();

    expect(screen.getByTestId('review-time').getAttribute('dateTime')).toBe(comment.date);
  });
});
