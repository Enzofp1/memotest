let cantidadTarjetas = 16
let temporizador = false;
let timer = 0;
let acierto = 0;
let tiempoid = null;
temporizador=false;
mas1=0;
let mt = document.getElementById("tm");
let nombre = prompt("Ingrese su nombre ");

        let iconos = []
        let selecciones = []

        generarTablero()

        function cargarIconos() {
            iconos = [
                '<img class="img" src="./img/hilux.jpg" alt="">',
                '<img class="img" src="./img/camaro.jpg" alt="">',
                '<img class="img" src="./img/mustang.jpg" alt="">',
                '<img class="img" src="./img/chevrolete cruze.jpg" alt="">',
                '<img class="img" src="./img/Fiat-Cronos.jpg" alt="">',
                '<img class="img" src="./img/golf.jpg" alt="">',
                '<img class="img" src="./img/R.jpg" alt="">',
                '<img class="img" src="./img/peugeot.jpg" alt="">',
                
                
                
            ]
        }

        function generarTablero() {
            cargarIconos()
            selecciones = []
            timer=0;
            mas1=0;
            temporizador=false;
            let tablero = document.getElementById("tablero")
            let tarjetas = []
            for (let i = 0; i < cantidadTarjetas; i++) {
                tarjetas.push(`
                <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                    <div class="tarjeta" id="tarjeta${i}">
                        <div class="cara trasera" id="trasera${i}">
                            ${iconos[0]}
                        </div>
                        <div class="cara superior">
                            <i class="far fa-question-circle"></i>
                        </div>
                    </div>
                </div>        
                `)
                if (i % 2 == 1) {
                    iconos.splice(0, 1)
                }
            }
            tarjetas.sort(() => Math.random() - 0.5)
            tablero.innerHTML = tarjetas.join(" ")
        }
        function ct() {
            tiempoid = setInterval(() => {
              timer++;
              mt.innerHTML= `Tiempo que le llevo: ${timer} segs`;
              if (mas1 == cantidadTarjetas / 2) {
                clearInterval(tiempoid);
              }
            }, 1000);
          }
          
        function seleccionarTarjeta(i) {
            let tarjeta = document.getElementById("tarjeta" + i)
            if (tarjeta.style.transform != "rotateY(180deg)") {
                tarjeta.style.transform = "rotateY(180deg)"
                selecciones.push(i)
            }
            if (selecciones.length == 2) {
                deseleccionar(selecciones)
                selecciones = []
            }
            if (temporizador == false) {
                ct(selecciones);
                temporizador = true;
              }
        }

        function deseleccionar(selecciones) {
            setTimeout(() => {
                let trasera1 = document.getElementById("trasera" + selecciones[0])
                let trasera2 = document.getElementById("trasera" + selecciones[1])
                if (trasera1.innerHTML != trasera2.innerHTML) {
                    let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
                    let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
                    tarjeta1.style.transform = "rotateY(0deg)"
                    tarjeta2.style.transform = "rotateY(0deg)"
                } else {
                    trasera1.style.background = "plum"
                    trasera2.style.background = "plum"
                    mas1++;
                }
                if (verificarFin()) {
                    swal.fire({
                        title: `El juego ha finalizado`,
                        text: `Felicitaciones!  ${nombre}  tu tiempo es de  ${
                            timer + 1 
                          } segundos` ,
                         
                          icon: `success`,
                    })
                }
            }, 1000);
        }

        function verificarFin() {
            for (let i = 0; i < cantidadTarjetas; i++) {
                let trasera = document.getElementById("trasera" + i)
                if (trasera.style.background != "plum") {
                    return false
                }
            }
            return true
        }