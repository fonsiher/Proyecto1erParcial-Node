const file = {
    demand: true,
    alias: 'f',
    desc: 'Establecer el path del archivo CSV que contiene los datos a analizar'
}

const pais = {
    demand: true,
    alias: 'c',
    desc: 'Determinar el país a analizar a través de su código ISO 3166 ALPHA-3',
}

const year = {
    default: 2018,
    alias: 'y',
    desc: 'Especificar el año para el cual se requiere las estadísticas',
}

const salida = {
    demand: true,
    alias: 'o',
    desc: 'Establece el nombre del archivo JSON donde se almacenarán los resultados',
}

const argv = require('yargs')
    // Establece la descripcion del comando que se tendrá que ejecutar a nivel de linea de consola
    .command('publicar', 'Publicará las estadísticas en una página web básica', { file, pais, year })
    .command('guardar', 'Almacenará los resultados de las estadísticas en un archivo json', { file, pais, year, salida })
    .help()
    .argv;

module.exports = {
    argv
}