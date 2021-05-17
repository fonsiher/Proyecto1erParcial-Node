const argv = require("./config/yargs").argv;
const colors = require("colors");
const { obtenerEstadisticas } = require("./controlador/estadisticas");
//const guardarData = require("./controlador/datos").crearArchivo;


let comando = argv._[0]; // trae del objeto el comando alias

let file = argv.file;
let pais = argv.pais;
let year = argv.year.toString();

switch (comando) {
    case "publicar":
        //leerCSV(argv.file);
        //cargarDatos(argv.file);
        obtenerEstadisticas(pais, year, file)
            .then(mensaje => console.log(mensaje))
            .catch(err => console.log(err.message))
        break;
    case "guardar":


        break;
    default:
        console.log("Comando no válido");
        break;
}