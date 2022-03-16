import cn from 'classnames';
import {Host} from '../../types/offers';

function RoomHost(props: {host: Host}): JSX.Element {
  const { avatarUrl, isPro, name } = props.host;
  const avatarWrapperClass = cn('property__avatar-wrapper', 'user__avatar-wrapper', {
    'property__avatar-wrapper--pro': isPro,
  });

  function showProStatus() {
    return (
      <span className="property__user-status">
        Pro
      </span>
    );
  }
  return (
    <div className="property__host-user user">
      <div className={avatarWrapperClass}>
        <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
      </div>
      <span className="property__user-name">
        {name}
      </span>
      {isPro && showProStatus()}
    </div>
  );
}

export default RoomHost;
