import { AccommodationType } from './types/offers';
import {toast} from 'react-toastify';
import { ReactText } from 'react';

export function getAccommodationTitle(type: AccommodationType) {
  const mapping = {
    apartment: 'Apartment',
    room: 'Private Room',
    house: 'House',
    hotel: 'Hotel',
  };
  return mapping[type];
}

export function getRatingStyleData(rating: number) {
  return Math.round(rating) * 20;
}

export const uniqueId = Object.assign(
  (prefix = '') => {
    uniqueId.counter += 1;
    return `${prefix}${uniqueId.counter}`;
  },
  { counter: 0 },
);

export const infoMessage = {
  checkLine: () : void => {
    const nextSpiner: ReactText | undefined = infoMessage.spinerLine[0];
    if (nextSpiner) {
      toast.loading('Loading...', {
        position: toast.POSITION.TOP_CENTER,
        toastId: nextSpiner,
      });
    } else {
      infoMessage.isSpinerRun = false;
    }
  },
  isSpinerRun: false,
  spinerLine: [] as string[],
  spinerRun: (id: string) : void => {
    if (infoMessage.isSpinerRun) {
      infoMessage.spinerLine.push(id);
    } else {
      infoMessage.isSpinerRun = true;
      infoMessage.startToastLoading(id);
    }
  },
  spinerStop: (id: string) :void => {
    if (infoMessage.spinerLine.includes(id)) {
      infoMessage.spinerLine = infoMessage.spinerLine.filter((item) => item !== id);
      infoMessage.checkLine();
    } else {
      toast.dismiss(id);
      infoMessage.isSpinerRun = false;
    }
  },
  startToastLoading: (id: string) => toast.loading('Loading...', {
    position: toast.POSITION.TOP_CENTER,
    toastId: id,
  }),
};
