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
            console.log("=====================================================".green);
            console.log(`Estadísticas de suscripciones a telefonía celular en ${pais} en el año ${year} `.yellow);
            console.log("=====================================================".green);
            console.log(`${info.media_mundial}`.cyan);
            console.log(`${info.comparacion}`);
            console.log(`El top cinco de países con mas subscripciones en ${year} son: ${info.topCinco}`.blue);
            console.log(`Los países por encima del valor de suscripciones de ${pais} son : ${info.paisesPorEncima}`.bgBlue);
            console.log(`Los países por debajo del valor de suscripciones de ${pais} son : ${info.paisesPorDebajo}`.bgMagenta);
            let handleRequest = (request, response) => {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.readFile('./index.html', null, function(error, data) {
                    if (error) {
                        response.writeHead(404);
                        respone.write('Archivo no Encontrado!');
                    } else {
                        response.write(data);
                    }
                    response.end();
                });
            };

            http.createServer(handleRequest).listen(3000);
        case "guardar":
            crearArchivo(info, nombre_archivo)
                .then((mensaje) => console.log(colors.green(mensaje)))
                .catch((err) => console.log(colors.red(err)));
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