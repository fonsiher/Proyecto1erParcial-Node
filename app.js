const argv = require("./config/yargs").argv;
const colors = require("colors");
const http = require('http');
const fs = require('fs');
const { obtenerEstadisticas, crearArchivo } = require("./controlador/estadisticas");
//const guardarData = require("./controlador/datos").crearArchivo;
let comando = argv._[0]; // trae del objeto el comando alias

let file = argv.file;
let pais = argv.pais;
let year = argv.year.toString();
let nombre_archivo = argv.salida;

let info;
/* const run = async() => {
    info = await obtenerEstadisticas(pais, year, nombre_archivo);
    opciones();
    return info;
};

const opciones = () => {
    switch (comando) {
        case "publicar":
            //leerCSV(argv.file);
            //cargarDatos(argv.file);
            console.log(info.media2);
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
            break;
        case "guardar":
            guardarData(info, pais, year)
                .then((mensaje) => console.log(colors.green(mensaje)))
                .catch((err) => console.log(colors.red(err)));
            break;
        default:
            console.log("Comando no válido");
            break;
    }
}

run()
    .then()
    .catch((err) => {
        console.log(err);
    }); */

switch (comando) {
    case "publicar":
        //leerCSV(argv.file);
        //cargarDatos(argv.file);
        obtenerEstadisticas(pais, year, file)
            .then(mensaje => {
                console.log(mensaje);
                info = dato.media2
            })
            .catch(err => console.log(err.message))
        console.log(info);
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
        break;
    case "guardar":
        crearArchivo(pais, year, file, nombre_archivo)
        break;
    default:
        console.log("Comando no válido");
        break;
}