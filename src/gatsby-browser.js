exports.onRouteUpdate = ({ location }) => {
  if (process.env.NODE_ENV === 'production' && typeof fathom !== 'undefined') {
    fathom('trackPageview');
  }
};
