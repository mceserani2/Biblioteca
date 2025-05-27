let libri = [];

let lastId = -1;

function disegnaTabella(){

    let tBody = document.getElementById("bookList");
    
    // Pulisci il corpo della tabella
    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    let filtroTitolo = document.getElementById("searchTitle").value.trim();

    let filtroAutore = document.getElementById("searchAuthor").value.trim().toLowerCase();

    let filtroGenere = document.getElementById("selectGenre").value;

    let filtroDisponibile = document.getElementById("availableBooks").value;

    libri.forEach((libro,i) => {
        let disp = libro.disponibile ? "available" : "borrowed";
        // Filtra i libri in base ai criteri di ricerca
        if (filtroTitolo === "" || libro.titolo.toLowerCase().includes(filtroTitolo)) {
            if (filtroAutore === "" || libro.autore.toLowercase().includes(filtroAutore)) {
                if (filtroGenere === "all" || filtroGenere === libro.genere) {
                    if (filtroDisponibile === "all" || filtroDisponibile === disp) {
                        let tr = document.createElement("tr");
                        let tdTitolo = document.createElement("td");
                        tdTitolo.innerText = libro.titolo;
                        tr.appendChild(tdTitolo);
                        let tdAutore = document.createElement("td");
                        tdAutore.innerText = libro.autore;
                        tr.appendChild(tdAutore);
                        let tdGenere = document.createElement("td");
                        tdGenere.innerText = libro.genere;
                        tr.appendChild(tdGenere);
                        let tdAnno = document.createElement("td");
                        tdAnno.innerText = libro.anno;
                        tr.appendChild(tdAnno);
                        let tdDisp = document.createElement("td");
                        tdDisp.innerText = libro.disponibile ? "Disponibile" : "In prestito";
                        tr.appendChild(tdDisp);
                        let tdAzioni = document.createElement("td");
                        let buttonDelete = document.createElement("button");
                        buttonDelete.innerText = "Elimina";
                        buttonDelete.addEventListener("click",() => {
                            // Rimuovi libro dal vettore libri
                            libri.splice(i,1);
                            disegnaTabella();
                            aggiornaTotali();
                            aggiornaPrestiti();
                        });
                        tdAzioni.appendChild(buttonDelete);
                        let buttonBorrow = document.createElement("button");
                        buttonBorrow.innerText = libro.disponibile ? "Presta" : "Restituisci";
                        buttonBorrow.addEventListener("click",() => {
                            if (libro.disponibile){
                                libro.disponibile = false;
                                buttonBorrow.innerText = "Restituisci";
                            } else {
                                libro.disponibile = true;
                                buttonBorrow.innerText = "Presta";
                            }
                            disegnaTabella();
                            aggiornaPrestiti();
                        });
                        tdAzioni.appendChild(buttonBorrow);
                        tr.appendChild(tdAzioni);
                        tBody.appendChild(tr);
                    }
                }
            }
        }
    });

}

function aggiungiLibro(){

    // Aggiungi il libro al vettore libri
    let titolo = document.getElementById("title").value;
    let autore = document.getElementById("author").value;
    let genere = document.getElementById("genre").value;
    let anno = document.getElementById("year").value;
    let libro = {
        id: ++lastId,
        titolo: titolo,
        autore: autore,
        genere: genere,
        anno: anno,
        disponibile: true
    };
    libri.push(libro);

    // Ridisegna la tabella
    disegnaTabella();

    aggiornaTotali();

    // Pulisci il form
    document.getElementById("insertBookForm").reset();

}

function aggiornaTotali() {
    let libriTot = document.getElementById("libriTot"); 
    libriTot.innerText = libri.length;
}

function aggiornaPrestiti() {
    let libriPres = document.getElementById("libriPres");
    let numPres = 0;
    libri.forEach((libro) => {
        if (!libro.disponibile)
            numPres++;
    });
    libriPres.innerText = numPres;
}

let formInserisci = document.getElementById("insertBookForm");
formInserisci.addEventListener("submit",(event) => {
    event.preventDefault();
    aggiungiLibro();
});

let searchTitle = document.getElementById("searchTitle");
searchTitle.addEventListener("input",() => {
    disegnaTabella();
});

let searchAuthor = document.getElementById("searchAuthor");
searchAuthor.addEventListener("input",() => {
    disegnaTabella();
});

let selectGenre = document.getElementById("selectGenre");
selectGenre.addEventListener("change", () => {
    disegnaTabella();
});

let availableBooks = document.getElementById("availableBooks");
availableBooks.addEventListener("change", () => {
    disegnaTabella();
});