const c = console.log;
const d = document;
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCo8Fflun-o_L6z8eXzsz69ooM_VBc6jss",
    authDomain: "fir-a293f.firebaseapp.com",
    projectId: "fir-a293f",
});

let db = firebase.firestore();
// agregar documentos
function guardar() {
    let nombre = d.getElementById("nombre").value;
    let apellido = d.getElementById("apellido").value;
    let fecha = d.getElementById("fecha").value;
    db.collection("users")
        .add({
            first: nombre,
            last: apellido,
            born: fecha,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            let nombre = (d.getElementById("nombre").value = "");
            let apellido = (d.getElementById("apellido").value = "");
            let fecha = (d.getElementById("fecha").value = "");
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
// Leer Documentos
let tabla = d.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
    //escuchar get()traer
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
            <tr>
                <!--<th scope="row">${doc.id} </th>-->
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().born}</td>
                <td><button class="btn btn-danger" onclick ="eliminar('${
                    doc.id
                }')">Eliminar</button></td>
                <td><button class="btn btn-warning" onclick = "editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>

            </tr>
        `;
    });
});

// Borrar Datos
function eliminar(id) {
    db.collection("users")
        .doc(id)
        .delete()
        .then(function () {
            console.log("Document successfully deleted!");
        })
        .catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

// Editar

function editar(id, nombre, apellido, fecha) {
    d.getElementById("nombre").value = nombre;
    d.getElementById("apellido").value = apellido;
    d.getElementById("fecha").value = fecha;
    let boton = d.getElementById("boton");
    boton.innerHTML = "Editar";
    boton.onclick = function () {
        let washingtonRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'
        let nombre = (d.getElementById("nombre").value);
        let apellido = (d.getElementById("apellido").value);
        let fecha = (d.getElementById("fecha").value);
        return washingtonRef
            .update({
                first: nombre,
                last: apellido,
                born: fecha,
            })
            .then(function () {
                console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            boton.onclick=function(){
                guardar();
            }
            let nombre = (d.getElementById("nombre").value = "");
            let apellido = (d.getElementById("apellido").value = "");
            let fecha = (d.getElementById("fecha").value = "");

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    };
}
