const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondsElement = document.querySelector("#seconds");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear =document.getElementById("clear-films");

//UI Project başlatma
const ui = new UI();
 //storage objesi üret
 const storage = new Storage();
 
//Tüm eventleri başlatma
eventListeners();
 
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
        
    });
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
console.log(title, director, url);
    if (title === "" || director ==="" || url ===""){
        //Hata
        ui.displayMessages("Tüm alanları doldurun","danger");
    }
    else{
        //Yeni film
        const newFilm = new Film(title,director,url);
 
        ui.addFilmToUI(newFilm); //Arayüze film ekleme
        storage.addFilmToStorage(newFilm);// Storeage'a film ekleme
        ui.displayMessages("Film Başaryla Eklendi . . . ","success");
    }
 
    ui.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id==="delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme Başarı ile Gerçekleştitirldi","success");

    }
}
function clearAllFilms(){
    if (confirm("Emin misiniz ")) {
        ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
    }
    
}

UI.prototype.clearAllFilmsFromUI=function () {
    const filmList=document.getElementById("films");
    // filmList.innerHTML = "";

    while (filmList.firstElementChild!==null) { 
        filmList.firstElementChild.remove();
        
    }
}