# gatsby-plugin-fathom

[![npm package](https://img.shields.io/npm/v/gatsby-plugin-fathom.svg)](https://www.npmjs.com/package/gatsby-plugin-fathom)

Gatsby plugin to add Fathom tracking to your site.

- [Install](#install)
- [Usage](#usage)
  - [Options](#options)
  - [Example](#example)
  - [Example using environment variables](#example-using-environment-variables)
- [Goal Tracking](#goal-tracking)
- [License](#license)

## Install

```
npm install gatsby-plugin-fathom
```

## Usage

_By default, this plugin only generates output when run in production mode. To test your tracking code, run `gatsby build && gatsby serve`._

### Options

| Option        | Explanation                          | Default           |
| ------------- | ------------------------------------ | ----------------- |
| `trackingUrl` | Your Fathom custom domain (optional) | cdn.usefathom.com |
| `siteId`      | Fathom site ID                       |                   |
| `honorDnt`    | Honor do not track                   | `false`           |

For more information on each option check https://usefathom.com/support/tracking-advanced.

### Example

```JavaScript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        // Your custom domain, defaults to `cdn.usefathom.com`
        trackingUrl: 'your-fathom-instance.com',
        // Unique site id
        siteId: 'FATHOM_SITE_ID'
      }
    }
  ]
}
```

### Example using environment variables

You may want to use different site ids across different deployments. This is best achieved by defining config in environment variables. The value will be read on build-time, e.g. during CI.

```bash
# .env.production
FATHOM_SITE_ID=ABCDEF
```

```JavaScript
// gatsby-config.js
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: process.env.FATHOM_SITE_ID
      }
    }
  ]
}
```

For more details, see https://www.gatsbyjs.org/docs/environment-variables/

## Goal Tracking

You can import a hook for tracking goals in any component like so:

```javascript
import { useGoal } from 'gatsby-plugin-fathom'

export default function Foo() {
  // can pass true as the 2nd param in order to console log the tracked goal's ID
  // useful for debugging in development
  const handleGoal = useGoal('GOAL-ID')

  return <button onClick={handleGoal}>Click me</button>
}
```

## License

[MIT](https://github.com/lgraubner/gatsby-plugin-fathom/blob/master/LICENSE) © [Lars Graubner](https://larsgraubner.com)
