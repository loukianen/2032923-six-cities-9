type Offer = {
  placeName: string,
  placeType: string,
  price: number,
  premiumMark: boolean,
  rating: number,
  imgPath: string,
}

const IMG_URL = '../../public/img/';

export const offers: Offer[] = [
  {
    placeName: 'Beautiful &amp; luxurious apartment at great location',
    placeType: 'Apartment',
    price: 120,
    premiumMark: true,
    rating: 80,
    imgPath: `${IMG_URL}apartment-01.jpg`,
  },
  {
    placeName: 'Wood and stone place',
    placeType: 'Private room',
    price: 80,
    premiumMark: false,
    rating: 80,
    imgPath: `${IMG_URL}room.jpg`,
  },
  {
    placeName: 'Canal View Prinsengracht',
    placeType: 'Apartment',
    price: 132,
    premiumMark: false,
    rating: 80,
    imgPath: `${IMG_URL}apartment-02.jpg`,
  },
  {
    placeName: 'Canal View Prinsengracht',
    placeType: 'Apartment',
    price: 180,
    premiumMark: true,
    rating: 100,
    imgPath: `${IMG_URL}apartment-03.jpg`,
  },
];
