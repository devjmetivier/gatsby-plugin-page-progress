/* eslint-disable no-prototype-builtins */
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

const defaultOptions = {
  includePaths: [],
  excludePaths: [],
  height: 3,
  prependToBody: false,
  color: `#663399`,
  footerHeight: 0,
  headerHeight: 0,
};

// browser API usage: https://www.gatsbyjs.org/docs/browser-apis/#onRouteUpdate
export const onRouteUpdate = ({ location: { pathname } }, pluginOptions = {}) => {
  // merge default options with user defined options in `gatsby-config.js`
  const options = { ...defaultOptions, ...pluginOptions };

  const { includePaths, excludePaths, height, prependToBody, color, footerHeight, headerHeight } = options;

  function pageProgress() {
    // create progress indicator container and append/prepend to document body
    const node = document.createElement(`div`);
    node.id = `gatsby-plugin-page-progress`;
    // eslint-disable-next-line
    prependToBody ? document.body.prepend(node) : document.body.append(node);

    // set defaults and grab progress indicator from the DOM
    let scrolling = false;
    const indicator = document.getElementById(`gatsby-plugin-page-progress`);

    // determine width of progress indicator
    const getIndicatorPercentageWidth = (currentPos, totalScroll) => {
      return Math.min(1.0, currentPos / totalScroll) * 100;
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
      const scrollDistance = scrollHeight - innerHeight - footerHeight - headerHeight;

      if (!scrolling) {
        window.requestAnimationFrame(() => {
          const indicatorWidth = getIndicatorPercentageWidth(currentPos, scrollDistance);
          const initialScrollPosition = headerHeight ? headerHeight : 0;

          indicator.setAttribute(
            `style`,
            // eslint-disable-next-line
            `width: ${indicatorWidth}%; position: fixed; height: ${height}px; background-color: ${color}; top: ${initialScrollPosition}px; left: 0; transition: width 0.25s; z-index: 9999;`
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
    paths.forEach((x) => {
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
