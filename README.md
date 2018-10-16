# gatsby-plugin-fathom

Gatsby plugin to add Fathom tracking onto a site.

## Install

```
npm install gatsby-plugin-fathom
```

## Usage

```JavaScript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        // your Fathom server URL
        trackingUrl: 'your-fathom-instance.com',
        // unique site id (optional, required for Fathom v1.1.0+)
        siteId: 'FATHOM_SITE_ID'
      }
    }
  ]
}
```
