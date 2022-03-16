import {memo, useState} from 'react';
import {offersSortingVariants} from '../../const';
import {OffersSortingType} from '../../types/other-types';

const getTextBySortingType = (type: OffersSortingType) => {
  const mapping = {
    none: 'Popular',
    byPriceUp: 'Price: low to high',
    byPriceDown: 'Price: high to low',
    byRatingDown: 'Top rated first',
  };
  return mapping[type];
};

type SortingMenuProps = {
  setSorting: (type: OffersSortingType) => void,
  sortingType: OffersSortingType,
}

function SortingMenu(props: SortingMenuProps): JSX.Element {
  const {setSorting, sortingType} = props;
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleClick = (type: OffersSortingType) => () => {
    setSorting(type);
    setIsMenuOpened(false);
  };

  const handleClickOnArrow = () => {
    setIsMenuOpened(true);
  };

  return (
    <form className="places__sorting" action="#-some-valid-path" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleClickOnArrow}>
        {getTextBySortingType(sortingType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${' places__options--opened'}`}>
        {isMenuOpened && offersSortingVariants.map((item) => (
          <li key={item} className="places__option" tabIndex={0} onClick={handleClick(item)}>{getTextBySortingType(item)}</li>
        ))}
      </ul>
    </form>
  );
}

export default memo(SortingMenu, (prevProps, nextProps) => prevProps.sortingType === nextProps.sortingType);
