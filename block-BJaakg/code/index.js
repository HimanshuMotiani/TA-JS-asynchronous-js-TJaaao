let root = document.querySelector(".allArticles");
let charRoot = document.querySelector(".characters");
let charactersSection = document.querySelector(".characters-section");
let heroSection = document.querySelector(".hero");
let closeButton = document.querySelector(".close");
let responseData;
charactersSection.classList.add("hide");
let hidebooks = false;
closeButton.addEventListener("click", handleClose);
function handleClose() {
  handleSpinner();
  charactersSection.classList.add("hide");
  heroSection.classList.remove("hide");
  getData();
}

function handleSpinner(isloading = false) {
  if (isloading) {
    root.innerHTML = `<div class="loader"></div>`;
  }
}
function getData() {
  root.innerHTML = "";
  fetch(`https://www.anapioficeandfire.com/api/books`)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      responseData = response;
      drawUi(response);
      console.log(response);
    });
}
getData();
/* <div class="content">
<h3>Title</h3>
<h4>Tessdfdfsf fasasfas</h4>
<div class="center">
<button class="btn">Show Characters(434)</button>
<hr>
</div> */
function drawUi(data) {
  data.forEach((element, index) => {
    let div = document.createElement("div");
    div.classList.add("content");
    let h3 = document.createElement("h3");
    h3.innerText = element.name;
    let h4 = document.createElement("h4");
    h4.innerText = element.authors[0];
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("center");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.id = index;
    button.addEventListener("click", handleClick);
    button.innerText = "Show Characters";
    let span = document.createElement("span");
    span.innerText = ` (${element.characters.length})`;
    button.append(span);
    btnDiv.append(button);
    div.append(h3, h4, btnDiv);
    root.append(div);
  });
}
function handleClick(event) {
  handleSpinner(true);
  Promise.all(responseData[event.target.id].characters.map((character) => {
     return fetch(character).then((res) => {
        return res.json();
      });
    })
  ).then((result) => {
    heroSection.classList.add("hide");
    charactersSection.classList.remove("hide");
    console.log(result, "rexuly");
    drawCharacter(result);
  });
}
/* <div class="char-content">
                    <h5>Walder</h5>
                    <span>:</span>
                    <span>(Walder adasdas asdassdasa assdasdasds)</span>
                </div> */
function drawCharacter(data) {
  data.forEach((result) => {
    let div = document.createElement("div");
    div.classList.add("char-content");
    let h5 = document.createElement("h5");
    h5.innerText = result.name;
    let span = document.createElement("span");
    span.innerText = ":";
    let spanContext = document.createElement("span");
    spanContext.innerText = "(" + result.aliases.join(" ") + ")";
    div.append(h5, span, spanContext);
    charRoot.append(div);
  });
}
