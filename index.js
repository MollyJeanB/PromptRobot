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
  const tagBank = ['art', 'surreal', 'illustration', 'jump', 'broken', 'heart', 'love', 'artist', 'strange', 'sea', 'cloud', 'bird', 'dance', 'vintage', 'history', 'nature', 'abstract', 'animation', 'landscape', 'forest', 'space'];
  const tagWord = getArrayValue(tagBank);
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
function getArrayValue(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function displayPrompt(response) {
  $('.returned-content').html('');
  const gif = response.data.fixed_height_downsampled_url
  const gifUrl = response.data.url
  const nounObject = getArrayValue(nounBank);
  const noun = nounObject.word;
  const nounDef = nounObject.definition;
  const verbObject = getArrayValue(verbBank);
  const verb = verbObject.word;
  const verbDef = verbObject.definition;
  const adjObject = getArrayValue(adjBank);
  const adj = adjObject.word;
  const adjDef = adjObject.definition;
  console.log(noun);
  console.log(verb);
  console.log(adj);
  const resultsHtml = $(
    `<section class="prompt-container">
    <div class="gif-box"><a href="${gifUrl}" target="blank"><img src="${gif}" class="gif-itself" alt="Animated GIF from GIPHY. Click for more information"/></a></div>
    <div class="results noun">
      <div class="word">${noun}</div>
      <div class="def-container">
        <span class ="def hidden">${nounDef}</span>
      </div>
    </div>
    <div class="results verb">
      <div class="word">${verb}</div>
      <div class="def-container">
        <span class ="def hidden">${verbDef}</span>
      </div>
    </div>
    <div class="results adjective">
      <div class="word">${adj}</div>
      <div class="def-container">
        <span class ="def hidden">${adjDef}</span>
      </div>
    </div>
  </section>
  <section class="learn-more-info">
    <p>Click on a word to see its definition.</p>
  </section>`)
  $('.returned-content').append(resultsHtml);
  console.log(response);
}

function listenPromptButton() {
  $('.prompt-form').submit( event => {
    event.preventDefault();
    getGifFromApi(displayPrompt);
    // getVerbFromApi(displayPrompt);
    // getAdjectiveFromApi(displayPrompt);
    // getNounFromApi(displayPrompt);

  })
}

function listenInfoX() {
  $('.close').on('click', event => {
    $('.explanation-text').addClass('hidden');
  })
}

function listenDefine() {
  $('.returned-content').on('click', '.results', event => {
    console.log('clicked', event.currentTarget);
    $(event.currentTarget).find('.def').removeClass('hidden');
  })
}

function handleApp() {
  listenInfoX();
  listenPromptButton();
  listenDefine();
}

$(handleApp)
