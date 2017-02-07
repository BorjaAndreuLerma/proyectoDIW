function Juego() {

}

var juego = new Juego();

Juego.prototype.onDragStartCartaSinPoner = function (event) {
    event.dataTransfer.setData("text", event.target.id);

};
Juego.prototype.onDragStartCartaPuesta = function (event) {
    event.dataTransfer.setData("text", event.target.id);
};


Juego.prototype.onDropCartaPuesta = function (event) {
    event.preventDefault();
    var destElement = document.getElementById(event.dataTransfer.getData("text"));
    var originElement = document.getElementById(event.target.id);

    var destSrc = destElement.src;
    var originSrc = originElement.src;

    var destDrag = destElement.draggable;
    var originDrag = originElement.draggable;

    var destEstado = destElement.getAttribute("estado");
    var originEstado = originElement.getAttribute("estado");

    destElement.src = originSrc;
    originElement.src = destSrc;

    destElement.draggable = originDrag;
    originElement.draggable = destDrag;

    destElement.setAttribute("estado", originEstado);
    originElement.setAttribute("estado", destEstado);

};
Juego.prototype.onDropCartaSinPoner = function (event) {
    event.preventDefault();
    var destElement = document.getElementById(event.dataTransfer.getData("text"));
    var originElement = document.getElementById(event.target.id);

    var destSrc = destElement.src;
    var originSrc = originElement.src;

    var destDrag = destElement.draggable;
    var originDrag = originElement.draggable;

    var destEstado = destElement.getAttribute("estado");
    var originEstado = originElement.getAttribute("estado");

    destElement.src = originSrc;
    originElement.src = destSrc;

    destElement.draggable = originDrag;
    originElement.draggable = destDrag;

    destElement.setAttribute("estado", originEstado);
    originElement.setAttribute("estado", destEstado);

};
var numCartas = 8;
function areColocadas() {
    var resultado = false;
    var colocadas = 0;
    var estadoCarta;
    for (var i = 0; i < numCartas; i++) {
        var carta = document.getElementsByTagName("img")[i + (numCartas * 2)];
        estadoCarta = carta.getAttribute("estado");
        if (estadoCarta == 1) {
            colocadas++;
        }
    }
    if (colocadas === numCartas) {
        alert("colocadas");
        document.getElementById("botonColocar").style.display = "none";
        for (var i = 0; i < numCartas; i++) {
            var carta = document.getElementsByTagName("img")[i + (numCartas * 2)];
            carta.setAttribute("draggable", false);
        }
        for (var i = 0; i < numCartas; i++) {
            var divJuego = document.getElementsByClassName("borde_div_juego")[i];
            divJuego.classList.add("flip");
            divJuego.firstChild.classList.add("flip-2");
            var dorso = document.createElement("img");
            dorso.setAttribute("id", "dorso" + (i + 1));
            dorso.setAttribute("src", "my_assets/images/dorso.png");
            dorso.setAttribute("class", "tamanyoCartas img-responsive flip-1");
            divJuego.appendChild(dorso);
        }
        $(".borde_div_juego").bind("click", addClassFlip);
    } else {
        alert("No has acabado de colocar las cartas en su sitio.");
    }
    return resultado;
}
;

function addClassFlip() {
    var divJuego = document.getElementById($(this).attr("Id"));
    divJuego.classList.add("flipOnClick");
    $(divJuego).unbind("click");
    setTimeout(function(){anotarPareja(divJuego);}, 1000);
}

var primeraEleccion = null;
var segundaEleccion = null;
function anotarPareja(divJuego) {
    if (primeraEleccion === null) {
        primeraEleccion = divJuego.id;
    } else {
        segundaEleccion = divJuego.id;
        comprobarPareja();
    }
}
;

var finJuego = 0;
function comprobarPareja() {
    var primeraCarta = document.getElementById(primeraEleccion).firstChild;
    var segundaCarta = document.getElementById(segundaEleccion).firstChild;
    var srcPrimera = primeraCarta.getAttribute("src");
    var srcSegunda = segundaCarta.getAttribute("src");
    if (srcPrimera === srcSegunda) {
        finJuego++;
        var divEncontrada = document.createElement("div");
        var divEncontrada2 = document.createElement("div");
        divEncontrada.setAttribute("class", "col-lg-1 borde_div_juego_encontrada");
        divEncontrada2.setAttribute("class", "col-lg-1 borde_div_juego_encontrada");
        var div1 = document.getElementById(primeraEleccion);
        divEncontrada.setAttribute("id", div1.id);
        div1.parentNode.replaceChild(divEncontrada, div1);
        var div2 = document.getElementById(segundaEleccion);
        divEncontrada2.setAttribute("id", div2.id);
        div2.parentNode.replaceChild(divEncontrada2, div2);
        primeraEleccion = null;
        primeraCarta = null;
        segundaEleccion = null;
        segundaCarta = null;
        divEncontrada = null;
        divEncontrada2 = null;
    } else {
        $(".flipOnClick").bind("click", addClassFlip);
        document.getElementById(primeraEleccion).classList.remove("flipOnClick");
        document.getElementById(segundaEleccion).classList.remove("flipOnClick");
        primeraEleccion = null;
        primeraCarta = null;
        segundaEleccion = null;
        segundaCarta = null;
    }
    isResuelto();
}
;

function isResuelto() {
    if (finJuego === (numCartas/2)) {
        var tableroJuego = document.getElementById("tableroJuego");
        tableroJuego.innerHTML = '';
        var botonFin = document.getElementById("botonFin");
        botonFin.classList.remove("boton_reiniciar");
        botonFin.classList.add("bounceIn");
        for (var i = 0; i < numCartas; i++) {
            var cartaBlanca = document.getElementsByClassName("borde_div_cartasSinPoner")[i].firstChild;
            var cartaLetra = document.getElementsByClassName("borde_div_cartasSinPoner")[i].children[1];
            cartaBlanca.classList.add("fadeOutDown");
            cartaLetra.classList.remove("cartasFinal");
            cartaLetra.classList.add("cartasFinal_GG");
            cartaLetra.classList.add("fadeInUp");
        }
    }
}
;

function reset() {
    window.location.reload();
}


//hacer que el borde resalte.
Juego.prototype.onDragOverCartaPuesta = function (event) {
    event.preventDefault();
};

Juego.prototype.onDragOverCartaSinPoner = function (event) {
    event.preventDefault();
};