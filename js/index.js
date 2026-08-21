const taskManager = new TaskManager();

console.log(taskManager.tasks);

const inputNombre = document.querySelector('#nombreTarea');
const inputDescripcion = document.querySelector('#descripcion');
const inputFecha = document.querySelector('#fechaTarea');
const selectEstado = document.querySelector('#estadoTarea');
const btnAgregar = document.querySelector('#btnAgregar');

const alertaError = document.querySelector('#alertaError');
const mensajeError = document.querySelector('#mensajeError');

function mostrarError(mensaje, elementoInput) {
  mensajeError.textContent = mensaje;
  alertaError.classList.remove('d-none');
  alertaError.classList.add('d-flex');

  if (elementoInput) {
    elementoInput.focus();
  }
}

function ocultarError() {
  alertaError.classList.add('d-none');
  alertaError.classList.remove('d-flex');
  mensajeError.textContent = '';
}

function validFormFieldInput() {
  const nombreTarea = inputNombre.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const fecha = inputFecha.value;
  const estado = selectEstado.value;

  if (nombreTarea === "") {
    mostrarError("Por favor, ingrese el nombre de la tarea.", inputNombre);
    return false;
  }

  if (descripcion === "") {
    mostrarError("Por favor, ingrese una descripción.", inputDescripcion);
    return false;
  }

  if (fecha === "") {
    mostrarError("Por favor, seleccione una fecha.", inputFecha);
    return false;
  }

  if (estado === "" || estado === "Seleccione un estado") {
    mostrarError("Por favor, seleccione un estado.", selectEstado);
    return false;
  }

  ocultarError();
  return true;
}

btnAgregar.addEventListener('click', () => {
  if (validFormFieldInput()) {
    console.log("Formulario válido");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tarjetas = document.querySelectorAll('.card');

  tarjetas.forEach((card) => {

    if (card.closest('#formTarea')) return;

    const badge = card.querySelector('.badge');
    if (!badge) return;

    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.3s ease';

    card.addEventListener('click', () => {
      taskManager.toggleTaskStatus(card);
    });
  });
});
