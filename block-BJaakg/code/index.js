let root = document.querySelector(".allArticles");

function getData(){
    fetch(`https://www.anapioficeandfire.com/api/books`).then(res=>{
       return res.json()
    }).then(response => {
        drawUi(response);
        console.log(response)
    });
}
getData();
{/* <div class="content">
<h3>Title</h3>
<h4>Tessdfdfsf fasasfas</h4>
<div class="center">
<button class="btn">Show Characters(434)</button>
<hr>
</div> */}
function drawUi(data){
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList.add("content");
        let h3= document.createElement("h3")
        h3.innerText = element.name;
        let h4 = document.createElement("h4");
        h4.innerText = element.authors[0];
        let btnDiv = document.createElement("div");
        btnDiv.classList.add("center")
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = "Show Characters"
        let span = document.createElement("span");
        span.innerText = ` (${element.characters.length})`;
        button.append(span);
        btnDiv.append(button)
        div.append(h3,h4,btnDiv);
        root.append(div);
    });
}