const form=document.getElementById("form");  
const searchBtn=form.querySelector("button");
const lyrics=document.getElementById("lyrics-here");
const errorMsg=document.getElementById("error"); 
const myArtist=document.getElementById("artist"); 
const myTitle=document.getElementById("title"); 


searchBtn.addEventListener("click", checkInputFields);