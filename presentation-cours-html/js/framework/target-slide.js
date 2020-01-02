(function () {

    let slides = [];

    window.htmprez.getSlidePageNumberById = (slideID) => {

        let ret;

        slides = slides.length ?
            slides :
            Array.from(
                document.querySelectorAll('section')
            ).map((htmlElement, index) => {
                return {
                    index: index,
                    id: htmlElement.getAttribute('id'),
                    element: htmlElement,
                    pageNumber: index
                }
            });

        let matchingSlides = slides.filter(e => e.id === slideID);

        if (matchingSlides.length) {
            ret = matchingSlides[0].pageNumber;
        }

        return ret;

    }
})();
