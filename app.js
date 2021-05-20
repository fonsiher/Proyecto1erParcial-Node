const argv = require("./config/yargs").argv;
const colors = require("colors");
const http = require('http');
const fs = require('fs');
const { obtenerEstadisticas, crearArchivo } = require("./controlador/estadisticas");
//let comando = argv._[0]; // trae del objeto el comando alias
let file = argv.file;
let pais = argv.pais;
let year = argv.year.toString();
let nombre_archivo = argv.salida;

let info;

const run = async() => {
    info = await obtenerEstadisticas(pais, year, file);
    opciones();
    return info;
};

const opciones = () => {
    let comando = argv._[0];
    switch (comando) {
        case "publicar":
            console.log("======================================================================".red);
            console.log(`Estadísticas de suscripciones a telefonía celular en ${pais} en el año ${year} `.yellow);
            console.log("======================================================================".red);
            console.log(`${info.media_mundial}`.cyan);
            console.log(`${info.comparacion}`.green);
            console.log("\n");
            console.log(`========El top cinco de países con mas subscripciones en ${year}==========`.bgRed);
            for (i in info.topCinco) {
                console.log(`País:  ${info.topCinco[i]} - Suscriptores: ${info.valoresTop[i]} `.blue);
            }
            console.log("\n");
            console.log(`========Los países por encima del valor de suscripciones de ${pais}==========`.bgRed);
            for (i in info.paisesPorEncima) {
                console.log(`País:  ${info.paisesPorEncima[i]} - Suscriptores: ${info.valoresEncima[i]} `.yellow);
            }
            console.log("\n");
            console.log(`========Los países por debajo del valor de suscripciones de ${pais}==========`.bgRed);
            for (i in info.paisesPorDebajo) {
                console.log(`País:  ${info.paisesPorDebajo[i]} - Suscriptores: ${info.valoresDebajo[i]} `.cyan);
            }
            console.log("\n");
            const http = require('http');
            const hostname = '127.0.0.1';
            const port = 3000;
            const server = http.createServer((req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos/estilo.css">
    <title>Estadísticas</title>
    <style>
    body{

        position: relative;
        background-color: #58F9D1;
        padding: 20px;
    }
table {
   width: 50%;
   border: 1px solid #000;
}
th, td {
   width: 25%;
   text-align: center;
   vertical-align: top;
   border: 1px solid #000;
   border-collapse: collapse;
   padding: 0.3em;
   caption-side: bottom;
}
caption {
    padding: 0.3em;
    font-weight: bold;
    font-style: italic;
}
th {
   background: #eee;
}

h2{
    font: oblique bold 150% cursive;
}
h1{
  font-family: "Segoe UI";
}

</style>

</head>

<body>
    <h1 align ="center">Estadísticas de suscripciones a telefonía móvil en ${pais}  en el año ${year}</h1>
    <h2>${info.media_mundial}</h2>
    <h2>${info.comparacion}</h2>

    <div align="center">
    <table class="">

  <tr>

    <th  colspan = "2" align="center">Los 5 países con mas suscripciones en el año ${year}</th>

  </tr>
    <tr>

    <th align="center">País</th>
    <th align="center">Número de Suscriptores</th>

  </tr>

  <tr>

    <td>${info.topCinco[0]}</td>

    <td>${info.valoresTop[0]}</td>


  </tr>

  <tr>

    <td>${info.topCinco[1]}</td>

    <td>${info.valoresTop[1]}</td>


  </tr>

  <tr>

    <td>${info.topCinco[2]}</td>

    <td>${info.valoresTop[2]}</td>


  </tr>
    <tr>

    <td>${info.topCinco[3]}</td>

    <td>${info.valoresTop[3]}</td>


  </tr>
    <tr>

    <td>${info.topCinco[4]}</td>

    <td>${info.valoresTop[4]}</td>


  </tr>

</table>    

    <table class="">

  <tr>

    <th  colspan = "3" align="center">Los 5 países por debajo del valor de suscripciones de ${pais}</th>

  </tr>
      <tr>

    <th align="center">País</th>
    <th align="center">Número de Suscriptores</th>

  </tr>

  <tr>

    <td>${info.paisesPorDebajo[0]}</td>

    <td>${info.valoresDebajo[0]}</td>


  </tr>

  <tr>

    <td>${info.paisesPorDebajo[1]}</td>

    <td>${info.valoresDebajo[1]}</td>


  </tr>

  <tr>

    <td>${info.paisesPorDebajo[2]}</td>

    <td>${info.valoresDebajo[2]}</td>


  </tr>
    <tr>

    <td>${info.paisesPorDebajo[3]}</td>

    <td>${info.valoresDebajo[3]}</td>


  </tr>
    <tr>

    <td>${info.paisesPorDebajo[4]}</td>

    <td>${info.valoresDebajo[4]}</td>


  </tr>

</table>
    <table id="tablePrint">

  <tr>

    <th  colspan = "3" align="center">Los 5 países Por encima del valor de suspcripciones de ${pais}</th>

  </tr>
      <tr>

    <th align="center">País</th>
    <th align="center">Número de Suscriptores</th>

  </tr>

  <tr>

    <td>${info.paisesPorEncima[0]}</td>

    <td>${info.valoresEncima[0]}</td>


  </tr>

  <tr>

    <td>${info.paisesPorEncima[1]}</td>

    <td>${info.valoresEncima[1]}</td>


  </tr>

  <tr>

    <td>${info.paisesPorEncima[2]}</td>

    <td>${info.valoresEncima[2]}</td>


  </tr>
    <tr>

    <td>${info.paisesPorEncima[3]}</td>

    <td>${info.valoresEncima[3]}</td>


  </tr>
    <tr>

    <td>${info.paisesPorEncima[4]}</td>

    <td>${info.valoresEncima[4]}</td>

  </tr>

</table>

        
  </div>
</body>



</html>`);
            });

            server.listen(port, hostname, () => {
                console.log(`Server running at http://${hostname}:${port}/`);
            });

            break;
        case "guardar":
            console.log("==================================================================".red);
            console.log(`Estadísticas de suscripciones a telefonía celular en ${pais} en el año ${year} `.yellow);
            console.log("==================================================================".red);
            console.log(`${info.media_mundial}`.cyan);
            console.log(`${info.comparacion}`.green);
            console.log(`========El top cinco de países con mas subscripciones en ${year}==========`.bgRed);
            for (i in info.topCinco) {
                console.log(`País:  ${info.topCinco[i]} - Suscriptores: ${info.valoresTop[i]} `.blue);
            }
            console.log("\n");
            console.log(`========Los países por encima del valor de suscripciones de ${pais}==========`.bgRed);
            var vp = info.paisesPorEncima
            for (i in info.paisesPorEncima) {
                console.log(`País:  ${info.paisesPorEncima[i]} - Suscriptores: ${info.valoresEncima[i]} `.yellow);
            }
            console.log("\n");
            console.log(`========Los países por debajo del valor de suscripciones de ${pais}==========`.bgRed);
            for (i in info.paisesPorDebajo) {
                console.log(`País:  ${info.paisesPorDebajo[i]} - Suscriptores: ${info.valoresDebajo[i]} `.cyan);
            }
            console.log("\n");
            crearArchivo(info, nombre_archivo)
                .then((mensaje) => console.log(colors.bgGreen(mensaje).black))
                .catch((err) => console.log(colors.bgRed(err)));
            break;
        default:
            console.log("El comando no existe");
            break;
    }
};

run()
    .then()
    .catch((err) => {
        console.log(err);
    });