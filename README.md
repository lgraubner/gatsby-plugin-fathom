# gatsby-plugin-fathom

[![npm package](https://img.shields.io/npm/v/gatsby-plugin-fathom.svg)](https://www.npmjs.com/package/gatsby-plugin-fathom)

Gatsby plugin to add Fathom tracking to your site.

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
        // Fathom server URL. Defaults to `cdn.usefathom.com`
        trackingUrl: 'your-fathom-instance.com',
        // Unique site id
        siteId: 'FATHOM_SITE_ID',
        // Domain whitelist
        whitelistHostnames: [
          'yoursite.com',
          'www.yoursite.com'
        ]
      }
    }
  ]
}
```

_By default, this plugin only generates output when run in production mode. To test your tracking code, run `gatsby build && gatsby serve`._

## Options

| Option               | Explanation                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `trackingUrl`        | Your Fathom instance URL (optional; only necessary if self-hosting Fathom)                                   |
| `siteId`             | Unique site id (required when using the hosted version of Fathom or self-hosting Fathom v1.1.0+)             |
| `whitelistHostnames` | List of hostnames to enable tracking for (optional; if not provided tracking will be enabled on all domains) |

## License

[MIT](https://github.com/lgraubner/gatsby-plugin-fathom/blob/master/LICENSE) © [Lars Graubner](https://larsgraubner.com)
