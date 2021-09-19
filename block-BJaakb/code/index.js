let imgFinder = document.querySelector(".img-finder");
let root = document.querySelector(".image-container")
imgFinder.addEventListener("keyup", handleInput)
const searchUrl = (query)=>{
   return  `https://api.unsplash.com/search/photos?query=${query}&client_id=Vl1nPvBwQGVzhiRomi_iZajaATynUx6slsSqNFbxDsE`;
}
function handleInput(event){
    if(event.keyCode == 13){
        let imgType = event.target.value;
        // fetchi(searchUrl(event.target.value),(a)=>{
        //     displayImages(a.results)
        // });
        let result = fetchi(searchUrl(event.target.value)).then((data)=>{
            displayImages(data.results)
        }).catch(error=>{
            alert(`check your connection`)
        })
        // data.displayImages();
    }
}
function fetchi(url,successHandler){
    return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.onload = ()=>{ 
            resolve(JSON.parse(xhr.response));
        }
            // successHandler(JSON.parse(xhr.response))
        xhr.onerror = ()=>{ reject("Something went wrong")
            // console.log("Something went wrong...");
        }
        xhr.send();
})
}
function displayImages(images){
    root.innerHTML = "";
    images.forEach(val =>{
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = val.urls.thumb;
    li.append(img);
    root.append(li)
})
}