/* async function obtenerDatos(file) {
    try {
        const datos = await csv().fromFile(file);
        let data = [];
        var codes = JSON.parse(fs.readFileSync('./data/ISO-3166-ALPHA-3.json', 'utf8'));
        for (let dat of datos) {
            dat = Object.values(dat);
            for (let cod of codes) {
                if (dat[1] == cod.countryCode) {
                    data.push(dat);
                }
            }
        }

        return data;
    } catch (e) {
        e = "Error 200"
        return e
    }
} */

const parse = require('csv-parse');
const fs = require('fs')

const csvData = [];
cont = 0

fs.createReadStream("./datost.csv")
    .pipe(
        parse({
            delimiter: ','
        })
    )
    .on('data', function(dataRow) {
        //cont++;
        if (cont > 4) {

        }
        csvData.push(dataRow)

    })
    .on('end', function() {
        console.log(csvData);
        console.log('CSV file successfully processed');
    });

//console.log(datosCSV);