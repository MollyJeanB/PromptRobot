const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/random";

//get data for one random GIF from GIPHY API
function getGifFromApi(callback) {
  //checks whether g-rated setting is checked or unchecked
  const gChecked = $(".onoffswitch-checkbox").prop("checked") ? "g" : "";
  //I wanted to avoid pulling mostly pop culture GIFS and instead prioritize original GIF art and vintage media. To do this, I created a bank of tag words, then sent a random one as a param to the GIPHY API.
  const tagBank = [
    "art",
    "surreal",
    "illustration",
    "jump",
    "broken",
    "heart",
    "love",
    "artist",
    "strange",
    "sea",
    "cloud",
    "bird",
    "dance",
    "vintage",
    "history",
    "nature",
    "abstract",
    "animation",
    "landscape",
    "forest",
    "space"
  ];
  const tagWord = getArrayValue(tagBank);
  const params = {
    api_key: "SuVHVPdadEPH1hDcJXQHV9r3d3aO7yei",
    //uses either g rating or no rating, depending on user preference
    rating: gChecked,
    fmt: "json",
    tag: tagWord
  };
  $.getJSON(GIPHY_SEARCH_URL, params, callback);
}

//get data from Words API for adjective via web server
function getAdjFromApi(callback) {
  const url = "/words";
  const partOfSpeech = "adjective";
  const params = {
    partOfSpeech: "adjective"
  };
  $.getJSON(url, params, callback);
}

//get data from Words API for noun via web server
function getNounFromApi(callback) {
  const url = "/words";
  const partOfSpeech = "noun";
  const params = {
    partOfSpeech: "noun"
  };
  $.getJSON(url, params, callback);
}

//get data from Words API for verb via web server
function getVerbFromApi(callback) {
  const url = "/words";
  const partOfSpeech = "verb";
  const params = {
    partOfSpeech: "verb"
  };
  $.getJSON(url, params, callback);
}

//get random string from array
function getArrayValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//capitalze first letter in strings
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGif(response) {
  //removes previous GIF from the DOM
  hideLoading($(".gif .loading"));
  //GIF from API
  const gif = response.data.fixed_height_downsampled_url;
  const gifUrl = response.data.url;
  //html to be appended, with link and alt text for GIF. As caption strings are often empty in GIPHY's API data, I opted for a generic message instructing users to get more information on GIPHY
  const gifResultsHtml = $(
    `<a href="${gifUrl}" target="blank"><img src="${gif}" class="gif-itself" alt="Animated GIF from GIPHY. Click for more information"/></a>`
  );
  //display result
  $(".gif-display").append(gifResultsHtml);
}

function displayAdj(response) {
  //remove previous word from DOM
  hideLoading($(".adj .loading"));
  const adjResponse = response.word;
  const useAdj = capitalizeFirstLetter(adjResponse);
  //html to be appended, with link to dictionary.com to define word
  const adjResultHtml = $(
    `<a href="http://www.dictionary.com/browse/${adjResponse}" target="_blank" class="word">${useAdj}</a>`
  );
  //display result
  $(".adj-display").append(adjResultHtml);
}

function displayNoun(response) {
  //remove previous word from DOM
  hideLoading($(".noun .loading"));
  const nounResponse = response.word;
  const useNoun = capitalizeFirstLetter(nounResponse);
  //html to be appended, with link to dictionary.com to define word
  const nounResultHtml = $(
    `<a href="http://www.dictionary.com/browse/${nounResponse}" target="_blank" class="word">${useNoun}</a>`
  );
  //display result
  $(".noun-display").append(nounResultHtml);
}

function displayVerb(response) {
  //remove previous word from DOM
  hideLoading($(".verb .loading"));
  const verbResponse = response.word;
  const useVerb = capitalizeFirstLetter(verbResponse);
  //html to be appended, with link to dictionary.com to define word
  const verbResultHtml = $(
    `<a href="http://www.dictionary.com/browse/${verbResponse}" target="_blank" class="word">${useVerb}</a>`
  );
  //display result
  $(".verb-display").append(verbResultHtml);
}

//listens for when user submits 'New Prompt' button, then calls all prompt functions
function listenPromptButton() {
  $(".prompt-form").submit(event => {
    hidePromptElements();
    showLoading();
    event.preventDefault();
    getGifFromApi(displayGif);
    showClickMessage();
    getAdjFromApi(displayAdj);
    getNounFromApi(displayNoun);
    getVerbFromApi(displayVerb);
  });
}

function hidePromptElements() {
  $(".adj-display").html("");
  $(".noun-display").html("");
  $(".verb-display").html("");
  $(".gif-display").html("");
}

function showLoading() {
  $(".loading").removeClass("hidden");
}

function hideLoading($el) {
  $el.addClass("hidden");
}

//show 'Click on word to define' message
function showClickMessage() {
  $(".click-to-learn").removeClass("hidden");
}

//listen for when user clicks the 'x' button in the info text box and then hides the box
function listenInfoX() {
  $(".close").on("click", event => {
    $(".explanation-text").addClass("hidden");
    $(".about").removeClass("hidden");
  });
}

//listen for when user clicks 'About Me' button and expand
function listenAboutMe() {
  $(".about").on("click", event => {
    $(".explanation-text").removeClass("hidden");
    $(".about").addClass("hidden");
  });
}

//calls click handlers
function handleApp() {
  listenInfoX();
  listenPromptButton();
  listenAboutMe();
}

$(handleApp);
