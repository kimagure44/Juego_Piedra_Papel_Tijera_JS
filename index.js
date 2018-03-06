var game = (function(win, doc) {
    var params;
    var stContador = 0;
    var stInterval = null;
    var cpuImg = ["stone.png", "paper.png", "scissors.png"];
    var turnoEnd = false;
    var indiceImg;
    var mensajeEnd = ["EL PAPEL ENVUELVE LA PIEDRA", "LA PIEDRA APLASTA A LAS TIJERAS", "LAS TIJERAS CORTAN EL PAPEL"];
    var init = function(p) {
        params = p;
        var btn = document.querySelectorAll(".buttons .btn");
        doc.addEventListener("keyup", function(e) {
            if (turnoEnd == false) {
                for (var cont = 0, len = btn.length; cont < len; cont++) {
                    btn[cont].children[0].classList.remove("opacity");
                    btn[cont].setAttribute("data-sel", "0");
                }
                var _indice;
                if (params.teclas.piedra === e.key)
                    _indice = 0;
                if (params.teclas.papel === e.key)
                    _indice = 1;
                if (params.teclas.tijera === e.key)
                    _indice = 2;
                btn[_indice].children[0].classList.add("opacity")
                btn[_indice].setAttribute("data-sel", "1");
            }
        });
        start();
    };
    var start = function() {
        stInterval = setInterval(function() {
            if (stContador < 3) {
                if (stContador > 0)
                    document.querySelector(".pantalla").children[stContador - 1].classList.remove("show");

                document.querySelector(".pantalla").children[stContador].classList.add("show");
            } else {
                document.querySelector(".pantalla").children[stContador - 1].classList.remove("show");
                window.clearInterval(stInterval);
                partida(3);
            }
            stContador++;
        }, 1000)
    };
    var partida = function(t) {
        generar(t);
    };
    var generar = function(t) {
        var g = setInterval(function() {
            indiceImg = Math.floor(Math.random() * 3);
            document.querySelector(".pantalla .figuraCPU").style.backgroundImage = "url(" + cpuImg[indiceImg] + ")"
        }, 100);
        setTimeout(function() {
            var btn = document.querySelectorAll(".buttons .btn");
            var _mensaje = "";

            window.clearInterval(g);
            turnoEnd = true;
            if (btn[indiceImg].dataset.sel == 1)
                _mensaje = "EMPATE"
            else {
                if (indiceImg == 0) {
                    if (btn[1].dataset.sel == 1)
                        _mensaje = "HAS GANADO!!!, " + mensajeEnd[0];
                    if (btn[2].dataset.sel == 1)
                        _mensaje = "HAS PERDIDO!!!, " + mensajeEnd[1];
                }
                if (indiceImg == 1) {
                    if (btn[0].dataset.sel == 1)
                        _mensaje = "HAS PERDIDO!!!, " + mensajeEnd[0];
                    if (btn[2].dataset.sel == 1)
                        _mensaje = "HAS GANADO!!!, " + mensajeEnd[2];
                }
                if (indiceImg == 2) {
                    if (btn[0].dataset.sel == 1)
                        _mensaje = "HAS GANADO!!!, " + mensajeEnd[1];
                    if (btn[1].dataset.sel == 1)
                        _mensaje = "HAS PERDIDO!!!, " + mensajeEnd[2];
                }
            }
            document.querySelector(".mensaje").innerHTML = _mensaje;
        }, t * 1000);
    };
    return {
        start: function(params) {
            init(params);
        }
    }
})(window, document);
game.start({
    teclas: {
        piedra: "g",
        papel: "h",
        tijera: "j"
    }
});