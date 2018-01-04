const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/random'

//get data for one random GIF from GIPHY API
function getGifFromApi(callback) {
  //I wanted to avoid pulling mostly pop culture GIFS and instead prioritize original GIF art and vintage media. To do this, I created a bank of tag words, then sent a random one as a param to the GIPHY API.
  const tagBank = ['art', 'surreal', 'illustration', 'jump', 'broken', 'heart', 'love', 'artist', 'strange', 'sea', 'cloud', 'bird', 'dance', 'vintage', 'history', 'nature', 'abstract', 'animation', 'landscape', 'forest', 'space'];
  const tagWord = getArrayValue(tagBank);
  console.log(tagWord);
  const params = {
		api_key: 'SuVHVPdadEPH1hDcJXQHV9r3d3aO7yei',
    //pulls only GIFS rated 'g' on GIPHY
    rating: 'g',
    fmt: 'json',
    tag: tagWord,
	}
	$.getJSON(GIPHY_SEARCH_URL, params, callback);

}
// function getAdjFromApi(callback) {
//
// }
//
function getNounFromApi(callback){
  const url = "/words"
  const partOfSpeech = "noun"
  const params = {
    partOfSpeech: "noun",
  }
  $.getJSON(url, params, callback)

}
//
// function getVerbFromApi(callback) {
//
// }


//get random string from array
function getArrayValue(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function displayGif(response) {
  //removes previous GIF from the DOM
  $('.gif').html('');
  //GIF from API
  const gif = response.data.fixed_height_downsampled_url
  const gifUrl = response.data.url
  const gifResultsHtml = $(`<a href="${gifUrl}" target="blank"><img src="${gif}" class="gif-itself" alt="Animated GIF from GIPHY. Click for more information"/></a>`)
  //display results
  $('.gif').append(gifResultsHtml);
  console.log(response);
}

// function displayAdj(response) {
//
// }

function displayNoun(response) {
  $('.noun').html('');
  const nounResponse = response.word
  const nounResultHtml = $(`<a href="http://www.dictionary.com/browse/${nounResponse}" target="_blank" class="word">${nounResponse}</a>`)
  $('.noun').append(nounResultHtml);
  console.log(response);

}
//
// function displayVerb(response) {
//
// }

//listens for when user submits 'New Prompt' button
function listenPromptButton() {
  $('.prompt-form').submit( event => {
    event.preventDefault();
    getGifFromApi(displayGif);
    showClickMessage();
    // getAdjFromApi(displayAdj);
    getNounFromApi(displayNoun);
    // getVerbFromApi(displayVerb);
  })
}

function showClickMessage() {
  $('.click-to-learn').removeClass('hidden');
}

//listen for when user clicks the 'x' button in the info text box and then hides the box
function listenInfoX() {
  $('.close').on('click', event => {
    $('.explanation-text').addClass('hidden');
    $('.about').removeClass('hidden');
  })
}

function listenAboutMe() {
  $('.about').on('click', event => {
    $('.explanation-text').removeClass('hidden');
    $('.about').addClass('hidden');
  })
}

//calls click handlers
function handleApp() {
  listenInfoX();
  listenPromptButton();
  listenAboutMe();
}

$(handleApp)
