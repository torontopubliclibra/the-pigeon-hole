# The Pigeon Hole

## About

[The Pigeon Hole](https://torontopubliclibra.github.io/pigeon) was designed in July 2022 by Dana Teagle at [Juno College](https://junocollege.com) as part of the part-time Javascript course's final API project using the [Flickr API](https://www.flickr.com/services/api/). This app was written using HTML, CSS, and jQuery.

## Functionality

Upon loading the page, the user is presented with a selection box of fifteen cities, a submit button, and a random button. The random button becomes active upon the app loading, whereas the submit button becomes active only upon selection of a city.

When a selected city is submitted, an API call is made to Flickr for ten photos of pigeons in the selected city. A number is then randomized between 0 and 9 and the corresponding photo URL and alt text is stitched together from the data. That information is then added to the HTML page, the image is displayed, and the submit button is disabled until a new selection is made.

When the random button is pressed, the app randomizes an array of the fifteen cities. It then makes an API call to Flickr for ten photos of pigeons in that city and the function follows the same as for a selected photo until a photo is displayed. The random button is disabled while the function runs to prevent any interruptions.

## Attributions

- Photos from [Flickr](https://www.flickr.com)
- [Raleway on Google Fonts](https://fonts.google.com/specimen/Raleway)
- [jQuery on Google Hosted Libraries](https://developers.google.com/speed/libraries#jquery)
- Cartoon Pigeon Illustration by @mybeautifulfiles from [Canva](https://canva.com)
- [ICO Converter](https://www.icoconverter.com/index.php)

## Creator

Dana Teagle (they/she) is a web developer from Tkaronto, Ontario. You can find them on Twitter at [@teagleistyping](https://twitter.com/teagleistyping) and on GitHub at [torontopubliclibra](https://github.com/torontopubliclibra).
