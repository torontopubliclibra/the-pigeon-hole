// create app
const app = {};

// flickr API key
app.key = `ba29e2524c03fb467cf6af47fca859df`;

// flickr API address to call (search method, using api key, sorting by relevance, for 10 results, in json)
app.flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.key}&sort=relevance&per_page=10&format=json&dataType=json&nojsoncallback=1`;

// random array element function
app.getRandomElement = function(array){
    const index = Math.floor(Math.random() * array.length)
    return array[index]
};

// cities array to randomize
app.cities = [`toronto`, `vancouver`, `new york city`, `chicago`, `boston`, `washington, d.c.`, `london`, `glasgow`, `melbourne`, `paris`, `amsterdam`, `stockholm`, `venice`, `mumbai`, `cairo`];

// display photos function using data from json API call
app.displayPhoto = function(data){

    // generate random whole number between 0 and 9 (for the 10 photos in each object)
    const randomNumber = Math.floor(Math.random() * 10);

    // pull randomized photo from data object
    const pigeon = data.photos.photo[randomNumber];

    // stitch info into URLs using photo ID, server, secret, and owner from pigeon object
    const photoURL = `https://live.staticflickr.com/${pigeon.server}/${pigeon.id}_${pigeon.secret}.jpg`;
    const photoLink = `https://www.flickr.com/photos/${pigeon.owner}/${pigeon.id}/`;

    // set HTML to add to page using URLs and title from pigeon object
    const photoHTML = `<h3 class="city-label">${app.selectedCity}</h3><div class="image-container"><a href="${photoLink}" target="_blank"><img src="${photoURL}" alt="${pigeon.title}" class="pigeon-image"></a></div>`;

    // set image results section
    app.imageResults = $(`#image-results`);

    // delay image for 0.2 seconds
    setTimeout(() => {

        // add HTML to the image results section
        app.imageResults.html(photoHTML);

        // reset city selection when image appears
        $(`#cities`).val(``);
        app.selectedCity = ``;

        // re-enable random button when image appears
        $(`#random`).attr(`disabled`, false);

    }, 200)
};

// initialize the app
app.init = function(){

    // reset city selection
    $(`#cities`).val(``);
    app.selectedCity = ``;

    // enable random button when app is ready
    $(`#random`).attr(`disabled`, false);

    // disable submit button until city selection
    $(`#submit`).attr(`disabled`, true);
    $(`#cities`).on(`change`, function(){
        $(`#submit`).attr(`disabled`, false);
    })
        
    // run function on submit button click
    $(`#submit`).on(`click`, function(){

        // disable submit button until a new selection is made
        $(`#submit`).attr(`disabled`, true);

        // pull city value from selection
        app.selectedCity = $(`#cities`).val();

        // set flickr API search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`};

        // run json API call and run display photo function using ajax shorthand
        $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
    });

    // run function on random button click
    $(`#random`).on(`click`, function(){

        // disable buttons until photo is displayed
        $(`#random`).attr(`disabled`, true);
        $(`#submit`).attr(`disabled`, true);

        // randomize city value from cities array
        app.selectedCity = app.getRandomElement(app.cities);

        // set flickr API search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`};

        // run json API call and run display photo function using ajax shorthand
        $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
    });
};

// run the app
$(document).ready(function () {
    app.init();
});