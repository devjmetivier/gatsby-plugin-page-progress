# gatsby-plugin-page-progress

![npm](https://img.shields.io/npm/v/gatsby-plugin-page-progress.svg?color=green)
![npm bundle size](https://img.shields.io/bundlephobia/min/gatsby-plugin-page-progress.svg)

Add a page progress indicator to your Gatsby project 😎

## Install
`npm i gatsby-plugin-page-progress`

## API

Inside `gatsby-config.js`

```js
{
  resolve: 'gatsby-plugin-page-progress',
  options: {
    matchStartOfPath: ['blog'],
    height: 3,
    prepend: false,
    color: '#663399'
  }
}
``` 

## Available Options

| option           | accepts         | default | required | description                                                                                                                                                                                  |
|------------------|-----------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| matchStartOfPath | `Array[String]` | []      | ❌        | This option overrides the progress bar to be on every page by default. It matches the beginning route of a given path. For example: `www.blog.com/post/birds-arent-real` would match `post`. |
| prependToBody    | `Boolean`       | false   | ❌        | If `false`, the bar is appended to the end of the body. If `true`, the bar is prepended to the beginning of the body.                                                                        |
| height           | `Number`        | 3       | ❌        | Sets the height of the progress bar.                                                                                                                                                         |
| color            | `String`        | #663399 | ❌        | Sets the color of the progress bar.                                                                                                                                                          |
