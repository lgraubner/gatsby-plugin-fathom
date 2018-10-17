# gatsby-plugin-fathom

[![npm package](https://img.shields.io/npm/v/gatsby-plugin-fathom.svg)](https://www.npmjs.com/package/gatsby-plugin-fathom)

Gatsby plugin to add Fathom tracking to your Gatsby site.

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

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

*By default, this plugin only generates output when run in production mode. To test your tracking code, run `gatsby build && gatsby serve`.*

## Options

Option           | Explanation
-----------------|---------
`trackingUrl`    | Your Fathom instance URL
`siteId`         | Unique site id (optional, required for Fathom v1.1.0+)

## License

[MIT](https://github.com/lgraubner/gatsby-plugin-fathom/blob/master/LICENSE) © [Lars Graubner](https://larsgraubner.com)
