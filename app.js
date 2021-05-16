const argv = require("./config/yargs").argv;
const colors = require("colors");
const { obtenerData } = require("./controlador/estadisticas");
//const guardarData = require("./controlador/datos").crearArchivo;


let comando = argv._[0]; // trae del objeto el comando alias

let file = argv.file;
let pais = argv.pais;
let year = argv.year.toString();

switch (comando) {
    case "publicar":
        //leerCSV(argv.file);
        //cargarDatos(argv.file);
        obtenerData(pais, year, file)
            .then(mensaje => console.log(mensaje))
            .catch(err => console.log(err.message))
            //console.log(vecAnio("2018"));
            // info = obtenerData(argv.pais, argv.year.toString(), argv.file);
            // console.log("=====================================================".green);
            // console.log(`Personas que usan internet (% de la poblacion)`.yellow);
            // console.log(`Pais: ${pais}`.green);
            // console.log(`Año: ${year}`.green);
            // console.log(`Valor: ${info.porcentaje} %`.red);
        break;
    case "guardar":


        break;
    default:
        console.log("Comando no válido");
        break;
}