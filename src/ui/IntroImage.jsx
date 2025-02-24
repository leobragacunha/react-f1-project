function IntroImage({ imgPath, imgAltText, pageTitle }) {
  return (
    <div className="intro-image">
      {pageTitle && <div className="page-title">{pageTitle}</div>}
      <img src={imgPath} alt={imgAltText} />
    </div>
  );
}

export default IntroImage;
