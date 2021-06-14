//Funktion för felmeddelanden.
function myErrorMsg(text) {
    const myError=document.createElement("p");
    myError.textContent=text;
    errorMsg.appendChild(myError);
} 

//Funktion för att tömma lyricsfältet på eventuella barn. 
function clearLyrics() {
lyrics.querySelectorAll('p').forEach(n => n.remove());          //Gamla felmeddelanden
lyrics.querySelectorAll('textarea').forEach(n => n.remove());   //Gamla lyrics 
lyrics.querySelectorAll('h2').forEach(n => n.remove());         //Gamla lyrics övertexter
}


// Funktion som kollar om inputfälten är tomma, och därefter styr knappens disabled attribut. 
function checkInputFields(){
    if(myArtist.value==="" || myTitle.value==="") {
        clearLyrics();
        myErrorMsg("You have to enter both an artist and a song title for this to work.");
    }
    else{
        clearLyrics();
        searchBtn.removeAttribute("disabled");
    }
    

}

//Sökfunktionen
function searchForSong(event) {
    clearLyrics();
    event.preventDefault();
    let URL = "https://api.lyrics.ovh/v1/" + encodeURI(myArtist.value) + "/" + encodeURI(myTitle.value);

    fetch(URL).then(function (response) {
        response.json().then(function (data) {
            const myLyrics = document.createElement("textarea");
            myLyrics.textContent = data.lyrics;                      // Lyrics är objektet som ligger i responsen från APIet. 

            //om fetch lyckas händer detta 

            const mySearch = document.createElement("h2");
            mySearch.textContent = "Lyrics for " + myTitle.value + " by " + myArtist.value;


            lyrics.appendChild(mySearch);
            lyrics.appendChild(myLyrics);
            myArtist.value = "";
            myTitle.value = "";
            searchBtn.setAttribute("disabled", 1)


        });

        }).catch(function(){
        //Om fetch misslyckas händer detta
        //Denna tar lång tid att ladda, kan man korta ner detta på något vis eller är det APIn som gör det? 
            myErrorMsg("Sorry, we could not find that song.")
    });
    
}