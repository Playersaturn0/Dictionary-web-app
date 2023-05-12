async function getData(inputWord) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
  ).then((response) => {
    return response.json();
  });
  return response;
}

function renderDictionaryCard(responseFromGetData) {
  const dictionaryHeader = document.querySelector(".dictionaryCardHeader");
  const dictionaryBody = document.querySelector(".dictionaryCardBody");

  const word = document.querySelector(".APIWord");
  word.textContent = "Undefined";

  const origin = document.querySelector(".APIWordOrigin");
  origin.textContent = "Undefined";

  const definition = document.querySelector(".APIWordDefinition");
  definition.textContent = "Undefined";

  const example = document.querySelector(".APIWordExample");
  example.textContent = "Undefined";

  if (responseFromGetData[0]?.word) {
    word.textContent = responseFromGetData[0].word.toUpperCase();
  }
  if (responseFromGetData[0]?.origin) {
    origin.textContent = responseFromGetData[0].origin;
  }
  if (responseFromGetData[0]?.meanings[0]?.definitions[0]?.definition) {
    definition.textContent =
      responseFromGetData[0].meanings[0].definitions[0].definition;
  }
  if (responseFromGetData[0]?.meanings[0]?.definitions[0]?.example) {
    example.textContent =
      responseFromGetData[0].meanings[0].definitions[0].example;
  }
}

const form = document.querySelector(".wordSearch");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const wordSearchInput = document.querySelector(".wordSearchInput");
  getData(wordSearchInput.value).then((response) => {
    renderDictionaryCard(response);
    wordSearchInput.value = "";
  });
});
