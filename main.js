const form=document.getElementById("form");  
const searchBtn=form.querySelector("button");
const lyrics=document.getElementById("lyrics-here");
const errorMsg=document.getElementById("error"); 

searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    const myArtist=document.getElementById("artist"); 
    const myTitle=document.getElementById("title"); 

    let URL="https://api.lyrics.ovh/v1/" + encodeURI(myArtist.value) +"/" + encodeURI(myTitle.value);
    console.log(myArtist.value); 
    console.log(myTitle.value);

    fetch(URL).then(function(response){
        response.json().then(function(data){
        const myLyrics=document.createElement("p"); 
        myLyrics.textContent=data.lyrics;
        //IF FETCH LYCKAS
        
        lyrics.appendChild(myLyrics);

        });
    }).catch(function(){
        //IF FETCH MISSLYCKAS
        
        const myError=document.createElement("p");
        myError.textContent="Sorry, we cannot find that song.";
        errorMsg.appendChild(myError);
    });
    
});
