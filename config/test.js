function generar_tabla(info) {

    let datosencima = `${info.paisesPorEncima}`
    let myTable = "";

    for (i in datosencima) {
        myTable += "<tr>";
        myTable += "<td> datosencima[i] </td>";
        myTable += "<td> datosencina[i] </td>";
        myTable += "</tr>";
    }

    document.getElementById('paises2').innerHTML = myTable;


}

generar_tabla();

module.exports = { generar_tabla };