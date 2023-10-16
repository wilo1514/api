
window.addEventListener('load', function () {
    fetch('http://localhost:3001/empresa')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('empresa');
            data["body"].forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa._id;
                option.textContent = "Nombre: " + empresa.nombre + " RUC: " + empresa.ruc;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API REST:', error);
        });



        fetch('http://localhost:3001/representante')
        .then(response => response.json())
        .then(data => {
            const repLegalTable = document.getElementById('repLegalTable');
            repLegalTable.innerHTML = '';
            data["body"].forEach(repLegal => {
                const newRow = repLegalTable.insertRow();
                const cells = Array.from({ length: 9 }, () => newRow.insertCell());
                
                const representanteDetalleText = repLegal.representante_detalle.map(obj => (
                    Object.keys(obj).map(key => `${key}: ${obj[key]}`).join(', ')
                )).join(', ');
    
                cells[0].innerHTML = repLegal._id;
                cells[1].innerHTML = repLegal.rucrep;
                cells[2].innerHTML = repLegal.cedula;
                cells[3].innerHTML = repLegal.nombre;
                cells[4].innerHTML = repLegal.apellido;
                cells[5].innerHTML = repLegal.email;
                cells[6].innerHTML = repLegal.domicilio;
                cells[7].innerHTML = repLegal.telefono;
                cells[8].innerHTML = representanteDetalleText;
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API REST:', error);
        });
    
});



function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 900000000 + 100000000).toString();
}

function generarValorAlfanumerico() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < 8; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}
function generarValores() {
    document.getElementById('ruc').value = generarNumeroAleatorio();
    document.getElementById('cedula').value = generarNumeroAleatorio();
    document.getElementById('nombre').value = "Nombre " + generarValorAlfanumerico();
    document.getElementById('apellido').value = "Apellido " + generarValorAlfanumerico();
    document.getElementById('email').value = generarValorAlfanumerico() + "@gmail.com";
    document.getElementById('telefono').value = generarNumeroAleatorio();
    document.getElementById('domicilio').value = generarValorAlfanumerico();
}
function encerarValores() {
    document.getElementById('ruc').value = "";
    document.getElementById('cedula').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('email').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('domicilio').value = "";
    const empresaTable = document.getElementById('empresaTable');

    while (empresaTable.rows.length > 0) {
        empresaTable.deleteRow(0);
    }

}
function mostrarAlerta(titulo, mensaje, tipo) {
    const alertaHTML = `
        <div class="alert ${tipo} alert-dismissible fade show" role="alert">
            <strong>${titulo}</strong> ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertContainer.innerHTML = alertaHTML;
}

function notiAlerta() {
    const notiHTML = `${
    <script>
        var socket = io.connect('http://localhost:3001/', {
            forceNet: true
        })
        socket.on('mensaje', (data)=>console.log(data))
    </script>}
    `;
    noti.innerHTML = notiHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    const enviarBtn = document.getElementById('enviarBtn');
    const empresaTable = document.getElementById('empresaTable');
    const filas = empresaTable.getElementsByTagName('tr');
    const agregarEmpresaBtn = document.getElementById('agregarEmpresaBtn');

    enviarBtn.addEventListener('click', function () {
        const valoresCeldas = [];

        for (let i = 0; i < filas.length; i++) {
            const fila = filas[i];
            const celdas = fila.getElementsByTagName('td');
            console.log('Fila ' + i + ': ' + celdas[0].textContent.toString());
            valoresCeldas.push({ "empresa_detalle": celdas[0].textContent.toString() });
        }

        const ruc = document.getElementById('ruc').value;
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const domicilio = document.getElementById('domicilio').value;
        //const empresaDetalle = document.getElementById('empresa').value;

        if (ruc === '' || cedula === '' || nombre === '' || apellido === '' || email === '' || telefono === '' || domicilio === '') {
            mostrarAlerta('Campos Vacíos', 'Por favor, complete todos los campos antes de enviar.', 'alert-warning');
        } else if (filas.length == 0) {
            mostrarAlerta('Campos Vacíos', 'Por favor, agregar al menos una empresa.', 'alert-warning');
        }
        else {
            const formData = {
                rucrep: ruc,
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                email: email,
                domicilio: domicilio,
                telefono: telefono,
                representante_detalle: valoresCeldas
            };

            fetch('http://localhost:3001/representante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (response.ok) {
                        encerarValores();
                        mostrarAlerta('Inserción Correcta', 'La inserción se realizó correctamente.', 'alert-success');
                        notiAlerta();
                        return response.json();
                        
                    } else {
                        mostrarAlerta('Error de Inserción', 'Hubo errores al realizar la inserción.', 'alert-danger');
                        throw new Error('Error en la solicitud POST');
                    }
                })
                .then(data => {
                    console.log('Respuesta de la API:', data);
                })
                .catch(error => {
                    console.error('Error al enviar la solicitud POST:', error);
                    mostrarAlerta('Error de Inserción', 'Hubo errores al realizar la inserción.', 'alert-danger');
                });
        }
    });

    agregarEmpresaBtn.addEventListener('click', function () {
        event.preventDefault();

        const combobox = document.getElementById("empresa");
        const selectedOption = combobox.options[combobox.selectedIndex];
        const selectedText = selectedOption.text;

        const nuevaEmpresa = {
            id: document.getElementById('empresa').value,
            nombre: `${selectedText}`
        };
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td style="padding-left: 20px;">${nuevaEmpresa.id}</td>
            <td>${nuevaEmpresa.nombre}</td>
        `;
        empresaTable.appendChild(newRow);
    });


});