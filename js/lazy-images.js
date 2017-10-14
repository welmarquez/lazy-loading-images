(function (window) {
    "use strict";

    const lazyload = sel => {
        let loaded = [];

        const html = document.documentElement;

        /**
         * Loads and displays the image in the DOM.
         */
        const load = target => {
            target.src = target.dataset.src;
            target.classList.add("loaded");
            delete target.dataset.src;
        };

        /**
         * Checker if image is within the viewport.
         */
        const inview = target => {
            const rect = target.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                (rect.top <= (window.innerHeight || html.clientHeight) ||
                rect.bottom <= (window.innerHeight || html.clientHeight)) &&
                (rect.left <= (window.innerWidth || html.clienthWidth) ||
                rect.right <= (window.innerWidth || html.clienthWidth))
            );
        };

        /**
         * Event handler for the window scroll event.
         */
        const lazy = e => {
            images.forEach(image => {
                if (inview(image) && image.dataset.src) {
                    load(image);
                    image.resolve(image);
                }
            });
        };


        // Check for selector validity.
        if (typeof sel !== "string" || sel === "") {
            return;
        }

        const images = Array.prototype.slice.call(
            document.querySelectorAll(sel)
        );

        // Return immediately if there are
        // no result from the dom query.
        if (images.length === 0) {
            return;
        }

        // Set initial state of each image
        // in the DOM.
        images.forEach(image => {
            image.style.minWidth = "100%";
            image.style.minHeight = "250px";
            image.style.backgroundColor = "rgb(254, 254, 254)";

            // Create a promise for each image item
            // and set a reference to the resolve method
            // by extending the image object itself.

            // This way, when the image is in the viewport,
            // we can load the image and resolve the
            // promise for that particular image only.
            loaded.push(new Promise((resolve, reject) => {
                image.resolve = resolve;
                image.reject = reject;
            }));

            // This is the default check when the page
            // is loaded and the scroll event is not
            // yet triggered.
            if (inview(image)) {
                load(image);
                image.resolve(image);
            }
        });


        window.addEventListener("scroll", lazy);

        // When all of the images are loaded, 
        // unsubscribed to the scroll event
        // to free up memory.
        Promise.all(loaded).then(v => {
            window.removeEventListener("scroll", lazy);
        });
    };

    lazyload(".lazy-img");
})(window);

