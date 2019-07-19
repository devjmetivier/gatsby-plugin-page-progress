# gatsby-plugin-page-progress

![npm](https://img.shields.io/npm/v/gatsby-plugin-page-progress.svg?color=green)
![npm (tag)](https://img.shields.io/npm/v/gatsby-plugin-page-progress/beta.svg?color=blue)
![npm bundle size](https://img.shields.io/bundlephobia/min/gatsby-plugin-page-progress.svg)
![npm](https://img.shields.io/npm/dt/gatsby-plugin-page-progress.svg)

Add a page progress indicator to your Gatsby project 😎
The progress bar moves as you scroll down the page.

![Page Progress Example](https://i.imgur.com/N1jdBST.gif)

> Useful for blog sites and other reading material so users know how far they've read into an article or page.

## [Install](#install)
`npm i gatsby-plugin-page-progress`

## [Options Example](#options-example)

Inside `gatsby-config.js`

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/', { regex: '^/blog' }],
        excludePaths: ['/blog/beep-beep-lettuce'],
        height: 3,
        prependToBody: false,
        color: `#663399`,
      }
    }
]
```

If you'd like the progression bar to appear on all pages of your project,
you can simply add the name of the plugin to your plugins array in `gatsby-config.js`

```js
plugins: ['gatsby-plugin-page-progress']
```

## [Options](#options)

#### `includePaths`
Required: ❌
Accepts: `array[string | object]`
Default: `[]`
> Supports multiple paths. This option enables the plugin to include an array of paths. You can use regex to include multiple paths to include. __See examples below__                                                                                

#### `excludePaths`
Required: ❌
Accepts: `array[string | object]`
Default: `[]`
> Supports multiple paths. This option enables the plugin to exclude an array of paths. You can use regex to include multiple paths to exclude. Defining paths to exclude will take precedence over `includePath` definitions. __See examples below__ 

#### `prependToBody`
Required: ❌
Accepts: `boolean`
Default: `false`
> If `false`, the bar is appended to the end of the body. If `true`, the bar is prepended to the beginning of the body.                                                                                                                               

#### `height`
Required: ❌
Accepts: `number`
Default: `3`
> Sets the height of the progress bar.                                                                                                                                                                                                                

#### `color`
Required: ❌
Accepts: `string`
Default: `#663399`
> Sets the color of the progress bar.                                                                                                                                                                                                                 

## [Examples](#examples)

#### Only include the root path:

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/'],
        excludePaths: [],
      }
    }
]
```

#### Include the root path, plus all paths under the `/blog` route:

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/', { regex: '^/blog' }],
        excludePaths: [],
      }
    }
]
```

> This plugin calls the constructor function for [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Creating_a_regular_expression). That's why we define any regex that we want to use inside an object. For more information on how to write regular expressions using the RegExp constructor use [MDN for reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Description).

#### Exclude only the root path:

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [],
        excludePaths: ['/'],
      }
    }
]
```

#### Include the root path, plus every path under the `/blog` route, but exclude a specific path under `/blog`:

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/', { regex: '^/blog' }],
        excludePaths: ['/blog/awesome/article'],
      }
    }
]
```

#### Include the root path, plus all paths under the `/blog` route, but exclude all paths under `/blog` that end with `'react'`':

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/', { regex: '^/blog' }],
        excludePaths: [{ regex: '^/blog.+react$' }],
      }
    }
]
```

> Remember that exclusions always take precedence over inclusions. In the case above - If the plugin finds any path that begins with `/blog` and ends with `react` it will skip over the inclusions because it already knows to exclude that route 😁 Inversely, if we were on a route under `/blog` that didn't end with `react`, it would apply the progress indicator because the exclusion rule wouldn't be valid.
