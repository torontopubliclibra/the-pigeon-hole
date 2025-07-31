let app = {

    api: {
        key: `ba29e2524c03fb467cf6af47fca859df`,
        url: ``,
        query: ``,
        limit: 25,
    },

    elements: {
        cities: $(`#cities`),
        imageResults: $(`#image-results`),
        submit: $(`#submit`),
        random: $(`#random`)
    },

    data: {
        cities: [
            `toronto`,
            `halifax`,
            `new york city`,
            `chicago`,
            `boston`,
            `vancouver`,
            `seattle`,
            `san francisco`,
            `stockholm`,
            `glasgow`,
            `london`,
            `paris`,
            `lisbon`,
            `berlin`,
            `venice`,
            `rome`,
            `amsterdam`,
            `melbourne`,
            `mumbai`
        ],
        selection: '',
        photos: [],
        photo: {},
    },

    functions: {

        randomFromArray: (array) => {
            let x = Math.floor(Math.random() * array.length);
            return array[x];
        },
        
        cities: () => {

            let cityOptions = [``]
            app.data.cities.forEach((city) => {
                cityOptions.push(`<button onClick="app.functions.selectCity('${city}')" id="${city.replace(/\s/g, "")}">${city}</button>`)
            })

            cityOptions.push(`<button onClick="app.functions.apiCall('random')" id="random">Random city</button>`)

            app.elements.cities.html(cityOptions.reduce((accumulator, option) => {return accumulator + option}));
        },

        selectCity: (city) => {
            app.data.selection = city;
            app.functions.apiCall(`submit`);
            $(`#cities button`).removeClass(`selected`);
            $(`button#${city.replace(/\s/g, "")}`).addClass(`selected`);
        },

        displayPhoto: (photos) => {

            let randomPhoto = app.functions.randomFromArray(photos);

            while (randomPhoto === app.data.photo) {randomPhoto = app.functions.randomFromArray(photos)};

            app.data.photo = randomPhoto;

            let photoData = {
                url: `https://live.staticflickr.com/${app.data.photo.server}/${app.data.photo.id}_${app.data.photo.secret}.jpg`,
                link: `https://www.flickr.com/photos/${app.data.photo.owner}/${app.data.photo.id}/`,
                title: `${app.data.selection} pigeon`,
            }

            let photoHTML = `
            <div class="image-container">
                <a href="${photoData.link}" target="_blank">
                    <img src="${photoData.url}" alt="${photoData.title}" title="${photoData.title}" class="pigeon-image">
                </a>
            </div>`;

            setTimeout(() => {
                app.elements.imageResults.html(photoHTML);
            }, 100)
        },

        errorPhoto: () => {

            let photoHTML = `
                <div id="image-results">
                    <div class="image-container">
                        <img src="assets/pigeon-default.svg" alt="A silhouette of a pigeon" class="pigeon-image default">
                    </div>
                </div>
            `;

            app.elements.imageResults.html(photoHTML);
        },

        apiCall: (button) => {
            app.api.url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.api.key}&sort=relevance&per_page=${app.api.limit}&format=json&dataType=json&nojsoncallback=1`

            if (button === `random`){
                let randomCity = app.functions.randomFromArray(app.data.cities);

                while (randomCity === app.data.selection) {
                    randomCity = app.functions.randomFromArray(app.data.cities);
                }

                app.data.selection = randomCity;
                $(`#cities button`).removeClass(`selected`);
                $(`button#${randomCity.replace(/\s/g, "")}`).addClass(`selected`);
            }

            app.api.query = {text: `pigeon ${app.data.selection}`};

            $.ajax({
                url: app.api.url,
                data: app.api.query
            }).done((data) => {
                if (data.stat === "ok") {
                    app.data.photos = data.photos.photo;
                    app.functions.displayPhoto(app.data.photos);
                } else {
                    app.functions.errorPhoto();
                }
            }).fail(() => {
                app.functions.errorPhoto();
            })

            setTimeout(() => {
                window.scrollTo({top: 0, behavior: "smooth"});
            }, 100);
        }
    },
    init: () => {
        app.data.selection = ``;
        app.functions.cities();
    }
}

$(document).ready(function () {
    app.init();
});