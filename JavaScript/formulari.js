var llista = [];

function afegeix(e) {
	e.preventDefault();
    let nom = e.target[0].value;
    let preu = e.target[1].value;
    let any = e.target[2].value;
    if (nom == "" || preu=="" || any=="") {
        avis("Omple tots els camps per afegir el producte", "warning");
    } else if (!existeix(nom)){
        let producte = new Producte(nom, preu, any);
        llista.push(producte);
        afegeixPantalla(producte);
        avis("Producte afegit correctament", "success");
        e.target.reset();
    } else {
        avis("Ja existeix un producte amb aquest nom", "danger");
        e.target.reset();
    }
}

function existeix(nom){
    let detectat = false;
    llista.forEach(producte => {
        if (producte.getNom() == nom) {
            detectat = true;
            return detectat;
        }  
    });
    return detectat;
}

function afegeixPantalla(producte){
    let llistaHTML = document.getElementById("llista");

    let div = document.createElement("div");
    div.id = "prod"+producte.getNom();
    div.className += "row producte";

    let p = document.createElement("p");
    p.innerHTML = producte.toString();

    let boto = document.createElement("button");
    boto.className += "btn btn-danger";
    boto.innerHTML = "Elimina";
    boto.setAttribute("onClick", `elimina("${producte.getNom()}");`);

    div.appendChild(p);
    div.appendChild(boto);
    llistaHTML.appendChild(div);
}

function elimina(nom) {
    console.log(nom);
    llista.forEach(producte => {
        if (producte.getNom() == nom) {
            llista.splice(producte);
        }  
    });
    let llistaHTML = document.getElementById("llista");
    console.log(nom);
    llistaHTML.removeChild(document.getElementById("prod"+nom));
    avis("Producte eliminat correctament", "danger");
}

function avis(missatge, color){
    let avis = document.getElementById("avis");
    switch(color){
        case "success":
            avis.className = "bg-success text-light";
            break;
        case "danger":
            avis.className = "bg-danger text-light";
            break;
        case "warning":
            avis.className = "bg-warning text-dark";
            break;
        default:
            avis.className = "bg-primary text-light";
    }
    avis.innerHTML = missatge;
    avis.parentElement.classList.remove("ocult");
    setTimeout(() => {
        avis.parentElement.classList.add("ocult");
    }, 3000);
}

class Producte {
    
    constructor(nom, preu, any){
        this._nom = nom;
        this._preu = preu;
        this._any = any;
    }

    // Getters i Setters
    getNom(){return this._nom;}
    setNom(nouNom){this._nom = nouNom;}

    getPreu(){return this._preu;}
    setPreu(nouPreu){this._preu = nouPreu;}
    
    getAny(){return this._any;}
    setAny(nouAny){this._any = nouAny;}

    // toString
    toString() {return `<b>Nom del producte:</b> ${this._nom}<br><b>Preu del producte:</b> ${this._preu}<br><b>Any de llançament:</b> ${this._any}`;}

}