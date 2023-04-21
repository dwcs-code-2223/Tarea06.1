/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


function getRoles() {
    let roles_url = "?controller=Usuario&action=getRoles";

    fetch(BASE_URL + roles_url)
            .then(response => {
                roles = response.json();
                return roles;

            })
            .then(roles => {
                buildRolesSelect(roles);
            }).catch((error) => {
        console.log('Ha ocurrido un error: ' + error);
    });
}



function buildRolesSelect(roles) {
    let select_roles = document.querySelector('#rol');
    for (let i = 0; i < roles.length; i++) {
        let option = '<option value="' + roles[i].id + '">' + roles[i].name + '</option>';
        select_roles.innerHTML += option;
    }
}
//3.a) 
function cargarUsuarios() {
    let list_users_url = "?controller=Usuario&action=list";
    fetch(BASE_URL + list_users_url)
            .then(response => {

                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("Something went wrong on API server: cargarUsuarios()!");
                    return false;
                }



            })
            .then(response_json => {
                if (response_json.page_title && response_json.data) {
                    let title = response_json.page_title;
                    //console.log(response_json);
                    setPageTitle(title);
                    let table = crearTabla('users_table', response_json.data, ["id", "Email", "Roles"]); 
                    let mainContent = document.getElementById('mainContent');
                    mainContent.appendChild(table);
                } else {
                    showError('No se han podido obtener los usuarios', true);
                }



            }).catch((error) => {
        console.log('Ha ocurrido un error en cargarUsuarios: ' + error);
        showError('Ha ocurrido un error: ' + error, true);
    });
}

//3b) Tercer punto
/** Crea una tabla html con id enviado por parámetro, datos y cabeceras enviados
 * @param {string} tableId El valor del atributo html id que acompañará al objeto <table>
 * @param {Array} array_data array de objetos JSON con los que se poblará el cuerpo de la tabla
 * @param {Array} array_cabeceras de cadenas con los que se poblará la cabecera de la tabla
 * @returns {HTMLElement|crearTabla.table} el elemento table con la clase table de Bootstrap https://getbootstrap.com/docs/5.0/content/tables/
 
 */
function crearTabla(tableId, array_data, array_cabeceras) {
    let table = document.createElement('table');
    table.setAttribute('id', tableId);
    //añadimos clase css de bootstrap https://getbootstrap.com/docs/5.0/content/tables/
    table.classList.add('table');
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let fila_cab = crear_fila(array_cabeceras, 'th');
    thead.appendChild(fila_cab);

    let tbody = document.createElement('tbody');
    for (let i = 0; i < array_data.length; i++) {

        let fila_body = crear_fila(array_data[i], 'td');
        fila_body.setAttribute('id', 'tr_' + array_data[i].userId);
        tbody.append(fila_body);
    }

    table.appendChild(tbody);
    return table;
}
/**
 * Crea un elemento tr con celdas th o td con los datos incluidos en el 
 * @param {Object} object Puede tratarse de un array de índices numéricos con las cadenas que se incluirán dentro de las celdas cabecera o un objeto JSON cuyos valores formarán parte de las celdas
 * @param {String} th_td Se indica si se crearán celdas th o td mediante las cadenas 'th' o 'td'
 * @returns {HTMLElement} Devuelve el elemento tr
 */
function crear_fila(object, th_td) {

    const keys = Object.keys(object);

    let tr = document.createElement('tr');

    for (let i = 0; i < keys.length; i++) {
        let celda = document.createElement(th_td);
        const key = keys[i];
        celda.innerHTML = object[key];

        tr.appendChild(celda);
    }
    return tr;
}






