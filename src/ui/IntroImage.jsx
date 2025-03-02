function IntroImage({ imgPath, imgAltText, pageTitle, classes }) {
  return (
    <div className="intro-image">
      {pageTitle && <div className="page-title">{pageTitle}</div>}
      <img className={`${classes}`} src={imgPath} alt={imgAltText} />
    </div>
  );
}

export default IntroImage;
