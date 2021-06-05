//Funktion för felmeddelanden.
function myErrorMsg(text) {
    const myError=document.createElement("p");
    myError.textContent=text;
    errorMsg.appendChild(myError);
} 

//Funktion för att tömma lyricsfältet på eventuella barn. 
function clearLyrics() {
lyrics.querySelectorAll('p').forEach(n => n.remove());
lyrics.querySelectorAll('textarea').forEach(n => n.remove());
lyrics.querySelectorAll('h2').forEach(n => n.remove());
}

// Funktion som kollar om inputfälten är tomma.
function checkInputFields(event) {
    clearLyrics();

    if(myArtist.value==="" || myTitle.value==="") {
        event.preventDefault();
        console.log("No, no button click for you.");
        myErrorMsg("You have to enter both an artist and a song title for this to work.");
    }
    else {
        event.preventDefault();
        console.log("Ok, you can click.");
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
        //Denna tar lång tid att ladda, kan man korta ner detta på något vis eller är det APIn som gör det? 
            myErrorMsg("Sorry, we could not find that song.")
    });
    }
}