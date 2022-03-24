function BookmarkContent(props: { svgClassName: string, width: string, height: string }) {
  return (
    <>
      <svg className={props.svgClassName} width={props.width} height={props.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </>
  );
}

export default BookmarkContent;
