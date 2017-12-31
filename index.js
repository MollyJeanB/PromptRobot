const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/random'
// const WORDS_SEARCH_URL =

function getGifFromApi(callback) {
  const params = {
		api_key: 'SuVHVPdadEPH1hDcJXQHV9r3d3aO7yei',
    rating: 'g',
    fmt: 'json',
    tag: 'art',
	}
	$.getJSON(GIPHY_SEARCH_URL, params, callback);

}

// function getNounFromApi(callback){
//
// }

// function getVerbFromApi(callback) {
//
// }
//
// function getAdjectiveFromApi(callback) {
//
// }
//
function displayPrompt(response) {
  $('.results').html('');
  const gif = response.data.fixed_height_downsampled_url
  const resultsHtml = $(
    `<div class="results-container">
    <div class="results-gif"><img src="${gif}"/></div>
    <div class="results-noun">Barn</div>
    <div class="results-verb">Run</div>
    <div class="results-adjective">Fast</div>
  </div>`)
  $('.results').append(resultsHtml);
  console.log(response);

}

function listenButton() {
  $('.prompt-form').submit( event => {
    event.preventDefault();
    console.log('prompt requested')
    getGifFromApi(displayPrompt);
    // getVerbFromApi(displayPrompt);
    // getAdjectiveFromApi(displayPrompt);
    // getNounFromApi(displayPrompt);

  })
}

$(listenButton)
