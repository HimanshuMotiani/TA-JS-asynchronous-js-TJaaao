let img = document.querySelector(".user")
let input = document.querySelector(".username")
let h3 = document.querySelector("h3")
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
input.addEventListener("keyup",handleInput);


let names = ''
function handleInput(event){
    if(event.keyCode == 13){
     let xhr = new XMLHttpRequest();
     names= event.target.value
xhr.open("GET",`https://api.github.com/users/${event.target.value}`);
xhr.onload = function(){
    let userData = JSON.parse(xhr.response) ;
    console.log(userData);
    displayUI(userData)
}
xhr.onerror = function(){
    console.log("Something went wrong");
}
xhr.send();
event.target.value = "";
}
}

function displayUI(userData){
 img.src = userData.avatar_url;
 h3.innerText = userData.login
let followers = getFollowers()
}
function getFollowers(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",`https://api.github.com/users/${names}/followers`);
xhr.onload = function(){
    let followersData = JSON.parse(xhr.response) ;
    console.log(followersData);
}
xhr.send();
}