const form=document.getElementById("form");  
const searchBtn=form.querySelector("button");
const lyrics=document.getElementById("lyrics-here");
const errorMsg=document.getElementById("error"); 
const myArtist=document.getElementById("artist"); 
const myTitle=document.getElementById("title"); 

//Funktion för felmeddelanden.
function myErrorMsg(text) {
        const myError=document.createElement("p");
        myError.textContent=text;
        errorMsg.appendChild(myError);
}

// Funktion som kollar om inputfälten är tomma.
function checkInputFields(event) {
    if(myArtist.value==="" || myTitle.value==="") {
        event.preventDefault();
        console.log("No");
        myErrorMsg("You have to enter both an artist and a song title for this to work.");
    }
    else {
        event.preventDefault();

        let URL="https://api.lyrics.ovh/v1/" + encodeURI(myArtist.value) +"/" + encodeURI(myTitle.value);  

        fetch(URL).then(function(response){
            response.json().then(function(data){
            const myLyrics=document.createElement("textarea"); 
            myLyrics.textContent=data.lyrics;
        
        //OM FETCH LYCKAS

            const mySearch=document.createElement("h2"); 
            mySearch.textContent="Lyrics for " + myTitle.value+ " by " + myArtist.value;
            lyrics.appendChild(mySearch);
            lyrics.appendChild(myLyrics);
            myArtist.value="";
            myTitle.value="";

        });

        }).catch(function(){
        //OM FETCH MISSLYCKAS
            myErrorMsg("Sorry, we could not find that song.")
    });
    }
}


searchBtn.addEventListener("click", checkInputFields);