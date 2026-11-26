const NotFound = () => (
  <div className="wrap plain-page">
    <h1>
      <code>this.page</code> is undefined
    </h1>
    <p>There’s nothing at this address. The link may be old, or it may have a typo.</p>
    <a className="button button--solid" href="/">
      Go to the home page
    </a>
  </div>
);

export default NotFound;
