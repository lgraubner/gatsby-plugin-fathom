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
        customDomain: 'your-fathom-instance.com',
        // Unique site id
        site: 'FATHOM_SITE_ID',
        // Domain whitelist
        includedDomains: [
          'yoursite.com',
          'www.yoursite.com'
        ]
      }
    }
  ]
}
```

## Goal Tracking

You can import a hook for tracking goals in any component like so:

```javascript
import { useGoal } from 'gatsby-plugin-fathom'

export default function Foo() {
  // use can pass true as the 3rd param in order to console log the tracked goal's ID
  // useful for debugging in development
  const handleGoal = useGoal('GOAL-ID', 0)
  
  return (
    <button onClick={handleGoal}>Click me</button>
  )
}
```

## Options

| Option               | Explanation                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `site`               | Unique site id (required when using the hosted version of Fathom or self-hosting Fathom v1.1.0+)             |
| `customDomain`       | Your Fathom instance URL (optional; only necessary if self-hosting Fathom)                                   |
| `includedDomains`    | Array of domains to enable tracking for (optional; if not provided tracking will be enabled on all domains)  |
| `excludedDomains`    | Array of domains to disable tracking for (optional)                                                          |
| `honorDNT`           | Honor the visitor Do Not Track config (optional; see https://usefathom.com/support/tracking-advanced)        |
| `canonical`          | Ignore canonical meta tag (optional; see https://usefathom.com/support/tracking-advanced )                   |
| `auto`               | Disable automatic tracking (optional; see https://usefathom.com/support/tracking-advanced)                   |
| `disableOnDev`       | Disable plugin on development environment (optional; defaults to false)                                      |

## License

[MIT](https://github.com/lgraubner/gatsby-plugin-fathom/blob/master/LICENSE) © [Lars Graubner](https://larsgraubner.com)
