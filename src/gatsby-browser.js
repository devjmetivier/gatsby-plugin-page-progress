const defaultOptions = {
  includePaths: [],
  excludePaths: [],
  height: 3,
  prependToBody: false,
  color: `#663399`,
};

// browser API usage: https://www.gatsbyjs.org/docs/browser-apis/#onRouteUpdate
export const onRouteUpdate = ({ location: { pathname } }, pluginOptions = {}) => {
  // merge default options with user defined options in `gatsby-config.js`
  const options = { ...defaultOptions, ...pluginOptions };

  const { includePaths, excludePaths, height, prependToBody, color } = options;

  function pageProgress() {
    // create progress indicator container and append/prepend to document body
    const node = document.createElement(`div`);
    node.id = `gatsby-plugin-page-progress`;
    // eslint-disable-next-line
    prependToBody
      ? document.body.prepend(node)
      : document.body.append(node);

    // set defaults and grab progress indicator from the DOM
    let scrolling = false;
    const indicator = document.getElementById(`gatsby-plugin-page-progress`);

    // determine width of progress indicator
    const getIndicatorPercentageWidth = (currentPos, totalScroll) => {
      return (currentPos / totalScroll) * 100;
    };

    // find the total height of window
    const getScrollHeight = () => {
      // https://javascript.info/size-and-scroll-window#width-height-of-the-document
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
    };

    // add throttled listener to update on scroll
    window.addEventListener(`scroll`, () => {
      const currentPos = window.scrollY;
      const { innerHeight } = window;
      const scrollHeight = getScrollHeight();
      const scrollDistance = scrollHeight - innerHeight;

      if (!scrolling) {
        window.requestAnimationFrame(() => {
          const indicatorWidth = getIndicatorPercentageWidth(currentPos, scrollDistance);

          indicator.setAttribute(
            `style`,
            // eslint-disable-next-line
            `width: ${indicatorWidth}%; position: fixed; height: ${height}px; background-color: ${color}; top: 0; left: 0; transition: width 0.25s; z-index: 9999;`
          );

          scrolling = false;
        });
        scrolling = true;
      }
    });
  }

  function checkPaths(val, paths) {
    if (paths.length === 0) return val; // return if no paths
    let returnVal = val;

    // loop over each path
    paths.forEach(x => {
      // if returnVal has already changed => return
      if (returnVal === !val) return;
      // regex is supplied in an object: { regex: '/beep/beep/lettuce' }
      const isRegex = typeof x === `object`;

      // if regex is present test it against the pathname - if test passes, change returnVal
      if (isRegex && new RegExp(x.regex, `gm`).test(pathname)) returnVal = !returnVal;
      // otherwise if the current path is strictly equal to the pathname, change returnVal
      if (x === pathname) returnVal = !returnVal;
    });

    return returnVal;
  }

  // check to see if the scroll indicator already exists - if it does, remove it
  function removeProgressIndicator() {
    const indicatorCheck = document.getElementById(`gatsby-plugin-page-progress`);
    if (indicatorCheck) indicatorCheck.remove();
  }

  // if there's no excluded paths && no included paths
  if (!excludePaths.length && !includePaths.length) {
    removeProgressIndicator();
    pageProgress();
    // if there's excluded paths && no included paths
  } else if (excludePaths.length && !includePaths.length) {
    const continueAfterExclude = checkPaths(true, excludePaths);
    removeProgressIndicator();

    if (continueAfterExclude) pageProgress();
    // if there's either excluded paths && included paths || no excluded paths && included paths
  } else {
    const continueAfterExclude = checkPaths(true, excludePaths);
    removeProgressIndicator();

    if (continueAfterExclude) {
      const match = checkPaths(false, includePaths);
      match && pageProgress();
    }
  }
};
