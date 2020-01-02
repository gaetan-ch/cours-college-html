(function () {
    window.htmprez.detectPage = () => {

        let page = 0;

        const splitURL = location.href.split('?');

        if (splitURL[1]) {

            let query = splitURL[1].split('&');

            if (query.length) {

                let queryAsObject = {};

                query.forEach(e => {

                    const splitedElem = e.split('=');
                    queryAsObject[splitedElem[0]] = +splitedElem[1];

                });

                page = queryAsObject.page || page;

            }

        }

        return page;

    }

    window.htmprez.setURLPage = (pageNumber) => {

        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=' + pageNumber;
        window.history.pushState({ path: newurl }, '', newurl);

    }

})();
