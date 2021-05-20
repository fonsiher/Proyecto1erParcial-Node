const fs = require("fs");
const neatCsv = require("neat-csv");
const paises = require("../data/paises").paises;
const colors = require('colors');
let datosAnio = [];
let informacion = [];


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
    return true;
};

const limpiar = () => {
    vec = [];
    datosAnio.forEach((element) => {
        if (paises.includes(element[2]) && ((element[0]) != "0") && ((element[0] != ""))) {
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


const ordenarPaises = () => {
    let top = [];
    let topcountrys = [];
    let listaSubs = [];
    datosAnio.forEach((element) => {
        listaSubs.push(Number(element[0]));
    });
    //top = listaSubs.sort((a, b) => b - a);
    top = listaSubs.sort((a, b) => (a > b ? -1 : 1))
        //top = top.slice(0, 5);
    for (var i = 0; i < top.length; i++) {
        datosAnio.forEach((element) => {
            if (top[i] == element[0]) {
                topcountrys.push(element[1]);
            }
        });
    }
    return {
        topcountrys,
        top
    }
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
    let indexpais = 0
    let listap = ordenarPaises().topcountrys;
    datosAnio.forEach((element) => {
        if (element[2] == codPais) {
            indexpais = listap.findIndex(pais => pais == element[1]);
            dato = element;
            return;
        }
    });
    return {
        dato,
        indexpais
    };
};


const obtenerEstadisticas = async(codPais, anio, path) => {
    await cargarDatos(path);
    //cargarDatos(path);
    //validarNum(anio);
    vecAnio(anio);
    limpiar();
    let mediaworld = Math.round(mediaMundial());
    let five = ordenarPaises().topcountrys;
    let fiveval = ordenarPaises().top
    five2 = five.slice(0, 5);
    fiveval2 = fiveval.slice(0, 5);
    r1 = `La media mundial de suscriptores en el año ${anio} es ${mediaworld} `
        //await comprobarAnio(anio);
        //await comprobar(codPais);
    let mediaPais = vectorPais(codPais).dato
    let indexpais = vectorPais(codPais).indexpais
        //indexpais = indexpais / 3;
    let paisesAntes = []
    let paisesDespues = []
    let valoresAntes = []
    let valoresDespues = []
    if (indexpais < 5) {
        paisesAntes = five.slice(0, indexpais)
        valoresAntes = fiveval.slice(0, indexpais)
    } else {
        paisesAntes = five.slice(indexpais - 5, indexpais)
        valoresAntes = fiveval.slice(indexpais - 5, indexpais)
    }

    if ((indexpais + 5) > five.length) {
        paisesDespues = five.slice(indexpais + 1, indexpais - 1)
        valoresDespues = fiveval.slice(indexpais + 1, indexpais - 1)

    } else {
        paisesDespues = five.slice(indexpais + 1, indexpais + 6)
        valoresDespues = fiveval.slice(indexpais + 1, indexpais + 6)
    }


    r2 = ""
    if (mediaPais[0] > mediaworld) {
        r2 = `Los usuarios en ${mediaPais[1]} con ${mediaPais[0]} suscriptores es mayor a la media mundial `
    } else {
        r2 = `Los usuarios en ${mediaPais[1]} con ${mediaPais[0]} suscriptores es menor a la media mundial `
    }
    return {
        media_mundial: r1,
        comparacion: r2,
        topCinco: five2,
        valoresTop: fiveval2,
        paisesPorEncima: paisesAntes,
        valoresEncima: valoresAntes,
        paisesPorDebajo: paisesDespues,
        valoresDebajo: valoresDespues
    };
};



//=========  GUARDAR EN ARCHIVO JSON ================

let estats = [];
let crearArchivo = (datos, out) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(
                "resultados")) {
            fs.mkdirSync(
                "resultados");
        }
        let valores = {
            datos
        }
        estats.push(valores)
        let data = JSON.stringify(estats)
        fs.writeFile(`./data/${out}.json`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`El archivo ${out}.json se ha guardado satisfactoriamente`);
        });
    });
};



module.exports = { obtenerEstadisticas, crearArchivo };