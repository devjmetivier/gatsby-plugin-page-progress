# gatsby-plugin-page-progress

![npm](https://img.shields.io/npm/v/gatsby-plugin-page-progress.svg?color=green)
![npm bundle size](https://img.shields.io/bundlephobia/min/gatsby-plugin-page-progress.svg)
![npm](https://img.shields.io/npm/dt/gatsby-plugin-page-progress.svg)

Add a page progress indicator to your Gatsby project 😎
The progress bar moves as you scroll down the page.

![Page Progress Example](https://i.imgur.com/N1jdBST.gif)

> Useful for blog sites and other reading material so users know how far they've read into an article or page.

## Install
`npm i gatsby-plugin-page-progress`

## Options

Inside `gatsby-config.js`

```js
plugins: [
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        matchStartOfPath: ['blog', 'post', 'about'],
        matchEndOfPath: ['marketing-page'],
        height: 3,
        prepend: false,
        color: '#663399'
      }
    }
]
```

If you'd like the progression bar to appear on all pages of your project,
you can simply add the name of the plugin to your plugins array in `gatsby-config.js`

```js
plugins: ['gatsby-plugin-page-progress']
```

## Available Options

| option           | accepts         | default | required | description                                                                                                                                                                                                                                     |
|------------------|-----------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| matchStartOfPath | `Array[String]` | []      | ❌        | Supports multiple paths. This option overrides the progress bar to be on every page. It matches the beginning of a given path. Example: `www.blog.com/post/birds-arent-real` would match `post`.                                                |
| matchEndOfPath   | `Array[String]` | []      | ❌        | Supports multiple paths. This option overrides the progress bar to be on every page. It matches the end of a given path. Example: `www.blog.com/post/birds-arent-real` would match `birds-arent-real`. This also accounts for trailing slashes. |
| prependToBody    | `Boolean`       | false   | ❌        | If `false`, the bar is appended to the end of the body. If `true`, the bar is prepended to the beginning of the body.                                                                                                                           |
| height           | `Number`        | 3       | ❌        | Sets the height of the progress bar.                                                                                                                                                                                                            |
| color            | `String`        | #663399 | ❌        | Sets the color of the progress bar.                                                                                                                                                                                                             |
