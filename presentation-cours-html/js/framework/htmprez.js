(function () {
    window.htmprez.bootstrap = (element) => {

        let slideTree = Array.from(
            element.querySelectorAll('section')
        ).map((section, nbPage) => {
            return {
                nbPage,
                target: section,
                active: false,
                activableElements: Array.from(
                    section
                        .querySelectorAll('[data-appear]')
                ).map((appearElement, nbAppear) => {
                    return {
                        target: appearElement,
                        nbAppearence: appearElement.getAttribute('data-appear'),
                        shown: false
                    };
                })
            }
        });

        console.log(slideTree);

        const KEY = {
            RIGHT_ARROW: 39,
            LEFT_ARROW: 37
        };

        const state = {
            currentPage: 0
        };

        const nbPages = slideTree.length;

        const refreshProgress = () => {
            const nbPages = slideTree.length;
            const nbPagesProgressPerc = state.currentPage / nbPages;
            element
                .querySelector('.progress-container .progress-bar')
                .setAttribute('style', 'transform:scaleX(' + nbPagesProgressPerc + ');')
        }

        const setPage = (nbPage) => {
            const ui = {
                "slideContainer": element.querySelector('.slides')
            }
            slideTree = slideTree.map((section, nbP) => {
                section.active = false;
                if (nbP === nbPage) {
                    section.active = true;
                }
                return section;
            });

            ui.slideContainer && ui.slideContainer.setAttribute("style", "transform: translate3D(" + nbPage * -100 + "%, 0, 0);");
            ui.slideContainer.setAttribute("data-currentpage", nbPage);

            refreshProgress();
            window.htmprez.setURLPage(nbPage);
        }
        const pageInQuery = window.htmprez.detectPage();

        console.log(pageInQuery);

        if (pageInQuery) {
            state.currentPage = pageInQuery;
            setPage(pageInQuery)
        }

        element.addEventListener('keyup', ($event) => {
            switch ($event.keyCode) {
                case KEY.RIGHT_ARROW:
                    nextElement();
                    break;
                case KEY.LEFT_ARROW:
                    state.currentPage -= 1;
                    break;
                default:
                    $event.stopPropagation();
                    break;
            }
            setPage(state.currentPage);
        })

        // NAVIGATION BY LINK

        const targetSlideElements = element.querySelectorAll('[data-target-slide]');
        let slidePageNumber;
        for (let elem of targetSlideElements) {
            elem.addEventListener('click', () => {
                state.currentPage = window.htmprez.getSlidePageNumberById(elem.getAttribute('data-target-slide'));
                setPage(state.currentPage);
            });
        }

        document.addEventListener('click', ($event) => {
            nextElement();
        });

        const nextElement = () => {
            activeSlide = state.currentPage;
            const _activeSlide = slideTree[activeSlide];
            const elementToShow = _activeSlide.activableElements.filter(e => !e.shown)
                .sort((a, b) => a.nbAppearence > b.nbAppearence)[0];
            if (elementToShow) {
                elementToShow.shown = true;
                elementToShow.target.classList.add('visible');
            } else {
                state.currentPage++;
                setPage(state.currentPage);
            }

        }
    }

})();
