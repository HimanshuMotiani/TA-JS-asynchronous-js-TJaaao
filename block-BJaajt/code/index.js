let img = document.querySelector(".user");
let input = document.querySelector(".username");
let h3 = document.querySelector("h3");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let catImg = document.querySelector(".cat-img");
let btn = document.querySelector(".btn");
input.addEventListener("keyup", handleInput);

let names = "";
function handleInput(event) {
  if (event.keyCode == 13) {
    let xhr = new XMLHttpRequest();
    names = event.target.value;
    xhr.open("GET", `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };
    xhr.onerror = function () {
      console.log("Something went wrong");
    };
    xhr.send();
    event.target.value = "";
  }
}

function displayUI(userData) {
  img.src = userData.avatar_url;
  h3.innerText = userData.login;
//   let followers = ;
  getFollowers();
  getFollowing();
}
function getFollowers() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.github.com/users/${names}/followers`);
 
  xhr.send();
  xhr.onload = function () {
    let followersData = JSON.parse(xhr.response);
    displayFollowers(followersData);
    
  };
}

function getFollowing() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${names}/following`);
    xhr.onload = function () {
      let followingData = JSON.parse(xhr.response);
      displayFollowing(followingData);
    };
    xhr.send();
}

function displayFollowers(followersData){
    followers.innerHTML = ""
followersData.forEach((element,index) => {
    if(index<5){
        let img = document.createElement("img");
        img.src = element.avatar_url;
        followers.append(img);
    }
});
}
function displayFollowing(followingData){
    following.innerHTML = ""
    followingData.forEach((element,index) => {
        if(index<5){
            let img = document.createElement("img");
            img.src = element.avatar_url;
            following.append(img);
        }
    });
}
btn.addEventListener("click", handleButton);
function handleButton(event){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    xhr.onload = function () {
      let catData = JSON.parse(xhr.response);
      displayCat(catData);
    };
    xhr.send();
}
function displayCat(catData){
    console.log(catData);
    catImg.src = catData[0].url;
}