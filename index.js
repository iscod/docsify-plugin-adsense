(function(window) {
  window.DocsifyAds = {
    create(caPub) {
      return function(hook, vm) {
        hook.ready(function() {
          window.DocsifyAds.injectStyle();
        });

        hook.doneEach(function() {
          window.DocsifyAds.injectScript(caPub);
        });
      };
    },

    injectScript(caPub) {
      const adEl = document.querySelector("#adsense");
      const scriptID = "_adsense_js";
      const sidebarEl = document.querySelector(".sidebar-nav");

      if (!adEl && sidebarEl) {
        let scriptEl = document.querySelector(`#${scriptID}`);

        if (scriptEl) {
          scriptEl = scriptEl.parentNode.removeChild(scriptEl);
        }
        else {
          scriptEl = document.createElement("script");
          scriptEl.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`;
          scriptEl.async = "async";
          scriptEl.id = scriptID;
        }

        sidebarEl.insertBefore(scriptEl, sidebarEl.firstChild);
      }
    },

    injectStyle() {
      const styleEl = document.createElement("style");

      styleEl.textContent = `
        #adsense * {
          margin: initial;
          padding: initial;
        }

        #adsense {
          max-width: 330px;
          background-color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
            sans-serif;
        }

        #adsense a {
          color: inherit;
          text-decoration: none;
        }

        #adsense a:hover {
          color: inherit;
        }

        #adsense span {
          display: block;
          position: relative;
          overflow: hidden;
        }

        #adsense .adsense-wrap {
          display: flex;
        }

        #adsense .adsense-img img {
          display: block;
        }

        #adsense .adsense-text {
          align-self: center;
          margin-bottom: 20px;
          padding: 8px 10px;
          font-size: 12px;
          line-height: 1.5;
          text-align: left;
        }

        #adsense .adsense-poweredby {
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 6px 8px;
          border-top-left-radius: 3px;
          background-color: #f1f1f1;
          font-size: 8px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.5px;
          text-align: center;
          text-transform: uppercase;
        }
      `;

      document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
    },
  };
})(window);
