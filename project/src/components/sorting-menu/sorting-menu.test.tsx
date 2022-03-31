import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingMenu, {SortingMenuProps} from './sorting-menu';

const props = {onSortiedType: jest.fn(), sortingType: 'none'} as SortingMenuProps;

describe('Component: SortingMenu', () => {
  it('should rendering correctly for the first time', () => {
    render(<SortingMenu {...props} />);

    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-option')).not.toBeInTheDocument();
  });

  it('should show menu when user ckick', () => {
    render(<SortingMenu {...props} />);

    userEvent.click(screen.getByTestId('places-sorting-type'));

    expect(screen.getAllByText('Popular').length).toBe(2);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should close menu and give data into callback after choosing', () => {
    const chosenSortingType = 'byPriceDown';

    render(<SortingMenu {...props} />);

    userEvent.click(screen.getByTestId('places-sorting-type'));
    userEvent.click(screen.getByTestId(`menu-option-${chosenSortingType}`));

    expect(props.onSortiedType).toBeCalledWith(chosenSortingType);
    expect(screen.queryByText('Price: high to low')).not.toBeInTheDocument();
  });
});
