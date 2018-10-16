import React from 'react';

function getTrackingCode(pluginOptions) {
  const html = `
    (function(f, a, t, h, o, m){
      a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
      };
      o=f.createElement('script'),
      m=f.getElementsByTagName('script')[0];
      o.async=1; o.src=t; o.id='fathom-script';
      m.parentNode.insertBefore(o,m)
    })(document, window, '//${pluginOptions.trackingUrl}/tracker.js', 'fathom');
    ${pluginOptions.siteId &&
      "fathom('set', 'siteId', '" + pluginOptions.siteId + "');"}
  `;

  return (
    <script
      key="gatsby-plugin-fathom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

exports.onRenderBody = ({ setPostBodyComponents, pathname }, pluginOptions) => {
  if (process.env.NODE_ENV === 'production') {
    return setPostBodyComponents([getTrackingCode(pluginOptions)]);
  }
  return null;
};
