let imgFinder = document.querySelector(".img-finder");
imgFinder.addEventListener("keyup", handleInput)
function handleInput(event){
    if(event.keyCode == 13){
        let imgType = event.target.value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET","https://api.unsplash.com/search/photos/?client_id=Vl1nPvBwQGVzhiRomi_iZajaATynUx6slsSqNFbxDsE");
        xhr.onload() = function(){
            let result = JSON.parse(xhr.response)
            console.log(result);
        }
        xhr.onerror = function(){
            console.log("Something went wrong...");
        }
        xhr.send();
    }

}