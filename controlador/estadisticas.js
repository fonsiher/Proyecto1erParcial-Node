const fs = require("fs");
const neatCsv = require("neat-csv");
const paises = require("../datos/paises").paises;

let datosAnio = [];
let informacion = [];
let listayear = []


const cargarDatos = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async(err, data) => {
            if (err) {
                reject("Error no se pudo leer el archivo");
            } else {
                resolve((informacion = await neatCsv(data)));
            }
        });
    });
};

const vecAnio = async(anio) => {
    let anios = Object.values(informacion[3]);
    listayear = anios.slice(4, anios.length);
    anio = anios.indexOf(anio);
    for (let index = 4; index < informacion.length; index++) {

        datosAnio.push([
            informacion[index][anio],
            informacion[index][0],
            informacion[index][1],
            informacion[index][2]
        ]);
    }
    //return datosAnio.length;
    //return true;
};

const limpiar = () => {
    vec = [];
    datosAnio.forEach((element) => {
        if (paises.includes(element[2])) {
            vec.push(element);
        }
    });
    datosAnio = vec;
};


const mediaMundial = () => {
    let suma = 0;
    datosAnio.forEach((element) => {
        suma += Number(element[0]);
    });

    let promedio = suma / datosAnio.length
    return promedio
}


const comprobar = (codigoPais) => {
    return new Promise((resolve, reject) => {
        datosAnio.forEach((element) => {
            if (element[2] == codigoPais) {
                resolve(true);
                return;
            }
        });
        reject(`El codigo de país: "${codigoPais}" no fue encontrado`);
    });
};

const comprobarAnio = (anio) => {
    let anios = Object.values(informacion[3]);
    return new Promise((resolve, reject) => {
        anios.forEach((element) => {
            if (element == anio) {
                resolve(true);
                return;
            }
        });
        reject(`El año ${anio} no es valido`);
    });
};


const vectorPais = (codPais) => {
    dato = [];
    datosAnio.forEach((element) => {
        if (element[2] == codPais) {
            dato = element;
            return;
        }
    });
    return dato;
};



const obtenerData = async(codPais, anio, path) => {
    await cargarDatos(path);
    //validarNum(anio);
    vecAnio(anio);
    limpiar();
    let mediaworld = Math.round(mediaMundial());
    r1 = `La media mundial en el año ${anio} es ${mediaworld} `
        //await comprobarAnio(anio);
        //await comprobar(codPais);
    let mediaPais = vectorPais(codPais)
    r2 = ""
    if (mediaPais[0] > mediaworld) {
        r2 = `La media en ${codPais} con ${mediaPais[0]} suscriptores es mayor a la media mundial `
    } else {
        r2 = `La media en ${codPais} con ${mediaPais[0]} suscriptores es menor a la media mundial `
    }
    return {
        media_mundial: r1,
        comparacion: r2
    };
};

module.exports = {
    //crearArchivo,
    obtenerData
};