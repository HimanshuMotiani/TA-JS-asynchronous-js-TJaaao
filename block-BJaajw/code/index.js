let news = document.querySelector(".news");
let root = document.querySelector(".allArticles");
let loader = document.querySelector(".loader");
function handleSpinner(isloading = false){
    if(isloading){
        root.innerHTML = `<div class="loader"></div>`
    }
}
news.addEventListener("input", handleEvent);
// loader.classList.add("show");
// loader.classList.remove("hide");
function handleEvent(event) {
  let selectedValue = news.options[news.selectedIndex].value;
  fetching(selectedValue);
}
function fetching(selectedValue) {
    handleSpinner(true)
//   loader.classList.add("show");
//   loader.classList.remove("hide");
  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        // loader.classList.add("hide");
        // loader.classList.remove("show");
        handleSpinner();
        return res.json();
      }
    })
    .then((result) => {
      let mainData = result.filter((item) => {
        return item.newsSite == selectedValue;
      });
      drawUI(mainData);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally((item) => {
      loader.classList.add("hide");
      loader.classList.remove("show");
    });
}

function drawUI(mainData) {
  root.innerHTML = "";
  mainData.forEach((element) => {
    let article = document.createElement("article");
    article.classList.add("flex");
    let div = document.createElement("div");
    div.classList.add("img-div");
    let img = document.createElement("img");
    img.src = element.imageUrl;
    div.append(img);
    let contentDiv = document.createElement("div");
    let h3 = document.createElement("h3");
    h3.innerText = element.title;
    let p = document.createElement("p");
    p.innerText = element.summary;
    let divButton = document.createElement("div");
    divButton.classList.add("right");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = "Read More";
    divButton.append(button);
    contentDiv.append(h3, p, divButton);
    article.append(div, contentDiv);
    root.append(article);
  });
}
function init(){
    // isloading = true;
    handleSpinner(true);
// loader.classList.add("show");
// loader.classList.remove("hide");
fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Something went wrong");
    } else {
        handleSpinner();
    //   loader.classList.remove("show");
    //   loader.classList.add("hide");
      return res.json();
    }
  })
  .then((result) => drawUI(result))
  .catch((error) => {
    console.log(error);
  });
}
init();