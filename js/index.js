const taskManager = new TaskManager();

if (typeof taskManager.load === 'function') {
  taskManager.load();
}

const newTaskForm = document.querySelector('#formTarea');
const inputNombre = document.querySelector('#nombreTarea');
const inputDescripcion = document.querySelector('#descripcion');
const inputFecha = document.querySelector('#fechaTarea');
const selectEstado = document.querySelector('#estadoTarea');
const btnAgregar = document.querySelector('#btnAgregar');

const alertaError = document.querySelector('#alertaError');
const mensajeError = document.querySelector('#mensajeError');

function mostrarError(mensaje, elementoInput) {
  if (!alertaError || !mensajeError) return;
  mensajeError.textContent = mensaje;
  alertaError.classList.remove('d-none');
  alertaError.classList.add('d-flex');
  if (elementoInput) {
    elementoInput.focus();
  }
}

function ocultarError() {
  if (!alertaError || !mensajeError) return;
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

if (btnAgregar) {
  btnAgregar.addEventListener('click', (event) => {
    event.preventDefault();

    if (validFormFieldInput()) {
      const name = inputNombre.value.trim();
      const description = inputDescripcion.value.trim();
      const dueDate = inputFecha.value;
      const status = selectEstado.value;

      taskManager.addTask(name, description, dueDate, status);

      if (typeof taskManager.save === 'function') {
        taskManager.save();
      }

      taskManager.render();

      if (newTaskForm) {
        newTaskForm.reset();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  taskManager.render();

  const tasksContainer = document.querySelector('#tasksList');

  if (tasksContainer) {
    tasksContainer.addEventListener('click', (event) => {

      // Evento para el botón "Mark As Done"
      if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.closest('[data-task-id]');

        if (parentTask) {
          const taskId = Number(parentTask.dataset.taskId);
          const task = taskManager.getTaskById(taskId);

          if (task) {
            task.status = 'DONE';

            if (typeof taskManager.save === 'function') {
              taskManager.save();
            }

            taskManager.render();
          }
        }
        return;
      }

      // Evento para el botón "Eliminar"
      if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.closest('[data-task-id]');
        if (parentTask) {
          const taskId = Number(parentTask.dataset.taskId);
          taskManager.deleteTask(taskId);

          if (typeof taskManager.save === 'function') {
            taskManager.save();
          }

          taskManager.render();
        }
        return;
      }
    });
  }
});
