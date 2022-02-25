function RoomGallery(props: { images: string[] }): JSX.Element {
  const { images } = props;
  let key = 0;
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => {
          key += 1;
          return (
            <div key={key} className="property__image-wrapper">
              <img className="property__image" src={image} alt="studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoomGallery;
