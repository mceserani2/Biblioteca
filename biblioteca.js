let libri = [];

function disegnaTabella(){
    
}

function aggiungiLibro(){

    // Aggiungi il libro al vettore libri


    // Ridisegna la tabella
    disegnaTabella();

}

let formInserisci = document.getElementById("insertBookForm");
formInserisci.addEventListener("submit",(event) => {
    event.preventDefault();
    aggiungiLibro();
});