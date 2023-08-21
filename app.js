// app object
let app = {
    api: {
        key: `ba29e2524c03fb467cf6af47fca859df`,
        url: ``,
        query: ``,
        limit: 10,
    },
    elements: {
        cities: $(`#cities`),
        imageResults: $(`#image-results`),
        submit: $(`#submit`),
        random: $(`#random`)
    },
    data: {
        cities: [
            `Toronto`,
            `Vancouver`,
            `New York City`,
            `Chicago`,
            `Boston`,
            `Washington, D.C.`,
            `London`,
            `Glasgow`,
            `Melbourne`,
            `Paris`,
            `Amsterdam`,
            `Stockholm`,
            `Venice`,
            `Mumbai`,
            `Cairo`
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
            // establish select options array with default option
            let cityOptions = [`<option disabled selected value="">Select a city</option>`]
            // for each city, push an option to the array
            app.data.cities.forEach((city) => {
                cityOptions.push(`<option value="${city}">${city}</option>`)
            })
            // stitch together options and add to city selector
            app.elements.cities.html(cityOptions.reduce((accumulator, option) => {return accumulator + option}));
        },
        displayPhoto: (photos) => {
            // randomize photo from photos array
            let randomPhoto = app.functions.randomFromArray(photos);
            // so long as random photo is equal to last photo
            while (randomPhoto === app.data.photo) {
                // keep randomizing
                randomPhoto = app.functions.randomFromArray(photos);
            }
            // set photo to randomized photo
            app.data.photo = randomPhoto;
            // establish photo data
            let photoData = {
                url: `https://live.staticflickr.com/${app.data.photo.server}/${app.data.photo.id}_${app.data.photo.secret}.jpg`,
                link: `https://www.flickr.com/photos/${app.data.photo.owner}/${app.data.photo.id}/`,
                title: `${app.data.selection} pigeon`,
            }
            // stitch together HTML to add to the page
            let photoHTML = `
            <h3 class="city-label">${app.data.selection}</h3>
            <div class="image-container">
                <a href="${photoData.link}" target="_blank">
                    <img src="${photoData.url}" alt="${photoData.title}" title="${photoData.title}" class="pigeon-image">
                </a>
            </div>`;
            // delay image for 0.2 seconds
            setTimeout(() => {
                // add HTML to the image results section
                app.elements.imageResults.html(photoHTML);
                // reset city selection when image appears
                app.elements.cities.val(``);
                // re-enable random button when image appears
                app.elements.random.attr(`disabled`, false);
            }, 200)
        },
        apiCall: (button) => {
            // disable buttons until photo is displayed
            app.elements.random.attr(`disabled`, true);
            app.elements.submit.attr(`disabled`, true);
            // set api url
            app.api.url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.api.key}&sort=relevance&per_page=${app.api.limit}&format=json&dataType=json&nojsoncallback=1`
            // if randomizing cities
            if (button === `random`){
                // randomize from the cities array
                let randomCity = app.functions.randomFromArray(app.data.cities)
                // so long as random city is equal to last selection
                while (randomCity === app.data.selection) {
                    // keep randomizing
                    randomCity = app.functions.randomFromArray(app.data.cities);
                }
                // set selection to new random city
                app.data.selection = randomCity;
            }
            // set API search query using city value
            app.api.query = {text: `pigeon ${app.data.selection}`};
            // run API call, save data as photos array, and run display photo function with the array
            $.getJSON(app.api.url, app.api.query, (data) => {
                app.data.photos = data.photos.photo;
                app.functions.displayPhoto(app.data.photos);
            });
        }
    },
    // event handlers
    events: () => {
        // run apiCall on submit button click
        app.elements.submit.on(`click`, () => app.functions.apiCall(`submit`));
        // run apiCall on random button click
        app.elements.random.on(`click`, () => app.functions.apiCall(`random`));
        // update selected city on select change
        app.elements.cities.change(() => {
            app.data.selection = app.elements.cities.val();
            app.elements.submit.attr(`disabled`, false);
        });
    },
    // initialize function
    init: () => {
        // reset city selection
        app.data.selection = ``;
        app.elements.cities.val(``);
        // populate city selector
        app.functions.cities();
        // enable random button when app is ready
        app.elements.random.attr(`disabled`, false);
        // disable submit button until city selection
        app.elements.submit.attr(`disabled`, true);
        // add event handlers
        app.events();
    }
}
// initialize the app
$(document).ready(function () {
    app.init();
});