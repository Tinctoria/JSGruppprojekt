function searchForSong(event) {
    clearLyrics();
    event.preventDefault();
    let URL = "http://ianertson.com:3500/" + myArtist.value + "/" + myTitle.value;

    fetch(URL).then(function (response) {
        response.json().then(function (data) {
            const myLyrics = document.createElement("textarea");
            // här är data en array, vill vi komma åt lyrics så behöver vi komma åt det index i arrayen där lyrics ligger 
            
            if (data.length>=1){ //om arrayen som returneras har innehåll händer detta 
                myLyrics.textContent = data[0].lyrics;   
                
                const mySearch = document.createElement("h2");
                mySearch.textContent = "Lyrics for " + myTitle.value + " by " + myArtist.value;


                lyrics.appendChild(mySearch);
                lyrics.appendChild(myLyrics);
                myArtist.value = "";
                myTitle.value = "";
                searchBtn.setAttribute("disabled", 1)   

            } else { //om fetch inte returnerar data i form av en array händer detta 
                myErrorMsg("Sorry, we could not find that song.")
            }
            
        });
            
    });
    
}