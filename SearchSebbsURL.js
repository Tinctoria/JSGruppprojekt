function searchForSong(event) {
    clearLyrics();
    event.preventDefault();
    let URL = "http://ianertson.com:3500/" + myArtist.value + "/" + myTitle.value;

    fetch(URL).then(function (response) {
        response.json().then(function (data) {// här är data en array, vill vi komma åt lyrics så behöver vi komma åt det index i arrayen där lyrics ligger 
            
            const myLyrics = document.createElement("textarea");
            
            
            if (data.length>=1){ //om arrayen som returneras har innehåll händer detta 
                myLyrics.textContent = data[0].lyrics;   
                
                const mySearch = document.createElement("h2");
                mySearch.textContent = "Lyrics for " + myTitle.value + " by " + myArtist.value;


                lyrics.appendChild(mySearch);
                lyrics.appendChild(myLyrics);
                myArtist.value = "";
                myTitle.value = "";
                searchBtn.setAttribute("disabled", 1)   

            } else { //om fetchen returnerar en tom array, händer detta: 
                myErrorMsg("Sorry, we could not find that song.")
            }
            
        });
            
    });
    
}