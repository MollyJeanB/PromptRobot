const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/random'
// const WORDS_SEARCH_URL =

const nounBank = [
  {word: 'thiamin', definition:`a B vitamin that prevents beriberi; maintains appetite and growth`},
  {word: 'frown', definition: `a facial expression of dislike or displeasure`},
  {word: 'kaph', definition: `the 11th letter of the Hebrew alphabet`},
  {word: 'canteen', definition: `a restaurant outside; often for soldiers or policemen`},
  {word: 'fasting', definition: `abstaining from food`},
  {word: 'bigot', definition: `a prejudiced person who is intolerant of any opinions differing from his own`},
  {word: 'signal', definition: `any nonverbal action or gesture that encodes a message`},
  {word: 'woods', definition: `the trees and other plants in a large densely wooded area`},
  {word: 'octad', definition: `the cardinal number that is the sum of seven and one`},
  {word: 'pock', definition: `a pustule in an eruptive disease`},
  {word: 'knot', definition: `soft lump or unevenness in a yarn; either an imperfection or created by design`},
]

const verbBank = [
  {word: 'shout', definition: `utter a sudden loud cry`},
  {word: 'conk', definition: `pass out from weakness, physical or emotional distress due to a loss of blood supply to the brain`},
  {word: 'yodel', definition: `sing by rapidly changing register`},
  {word: 'congest', definition: `become or cause to become obstructed`},
  {word: 'tut-tut', definition: `utter 'tsk,' 'tut,' or 'tut-tut,' as in disapproval`},
  {word: 'shun', definition: `avoid and stay away from deliberately; stay clear of`},
  {word: 'pout', definition: `be in a huff and display one's displeasure`},
  {word: 'flaunt', definition: `display proudly; act ostentatiously or pretentiously`},
  {word: 'scoot', definition: `run or move very quickly or hastily`},
  {word: 'bash', definition: `hit hard`},
]

const adjBank = [
  {word: 'doddery', definition: `mentally or physically infirm with age`},
  {word: 'svelte', definition: `being of delicate or slender build`},
  {word: 'slubbed', definition: `of textiles; having a rough surface`},
  {word: 'noetic', definition: `of or associated with or requiring the use of the mind`},
  {word: 'blueish', definition: `of the color intermediate between green and violet; having a color similar to that of a clear unclouded sky`},
  {word: 'atilt', definition: `departing or being caused to depart from the true vertical or horizontal`},
  {word: 'streaky', definition: `marked with or as if with stripes or linear discolorations`},
  {word: 'dual', definition: `consisting of or involving two parts or components usually in pairs`},
  {word: 'skyward', definition: `directed toward heaven or the sky`},
  {word: 'plucky', definition: `marked by courage and determination in the face of difficulties or danger; robust and uninhibited`},
]

function getGifFromApi(callback) {
  const tagBank = ['art', 'surreal', 'illustration', 'artist', 'strange', 'original', 'sea', 'cloud', 'bird', 'dance', 'vintage', 'history', 'nature', 'abstract'];
  const tagWord = tagBank[Math.floor(Math.random() * tagBank.length)];
  console.log(tagWord);
  const params = {
		api_key: 'SuVHVPdadEPH1hDcJXQHV9r3d3aO7yei',
    rating: 'g',
    fmt: 'json',
    tag: tagWord,
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
  const nounObject = nounBank[Math.floor(Math.random() * nounBank.length)];
  const noun = nounObject.word;
  const verbObject = verbBank[Math.floor(Math.random() * verbBank.length)];
  const verb = verbObject.word;
  const adjObject = adjBank[Math.floor(Math.random() * adjBank.length)]
  const adj = adjObject.word;
  console.log(noun);
  console.log(verb);
  console.log(adj);
  const resultsHtml = $(
    `<section class="results-container">
    <div class="results-gif"><img src="${gif}"/></div>
    <div class="results-noun">${noun}</div>
    <div class="results-verb">${verb}</div>
    <div class="results-adjective">${adj}</div>
  </section>
  <section class="learn-more-info">
    <p>Click on a word to see its definition.</p>
    <div class="more-info-content"></div>
    <p>GIF credit: </p>
  </section>`)
  $('.results').append(resultsHtml);
  console.log(response);

}

function listenPromptButton() {
  $('.prompt-form').submit( event => {
    event.preventDefault();
    console.log('prompt requested')
    getGifFromApi(displayPrompt);
    // getVerbFromApi(displayPrompt);
    // getAdjectiveFromApi(displayPrompt);
    // getNounFromApi(displayPrompt);

  })
}

function listenInfoX() {
  $('.close').on('click', event => {
    console.log('info remove requested')
    $('.explanation-text').addClass('hidden');
  })
}

function handleApp() {
  listenInfoX();
  listenPromptButton();
}

$(handleApp)
