const createTaskHtml = (id, name, description, dueDate, status) => {
  let borderClass = 'border-pendiente';
  let titleClass = 'text-warning fw-bold';
  let badgeClass = 'badge-pendiente';
  let badgeIcon = 'bi-clock';
  let extraCardClass = '';
  let btnClass = 'btn-outline-warning';

  if (status === 'En progreso') {
    borderClass = 'border-progreso';
    titleClass = 'text-primary fw-bold';
    badgeClass = 'badge-progreso';
    badgeIcon = 'bi-arrow-repeat';
    btnClass = 'btn-outline-primary';
  } else if (status === 'Completada' || status === 'DONE') {
    borderClass = 'border-completada';
    titleClass = 'text-green text-decoration-line-through fw-normal';
    badgeClass = 'badge-completada';
    badgeIcon = 'bi-check-circle-fill';
    extraCardClass = 'opacity-50';
    btnClass = 'btn-outline-success';
  }

  return `
    <div class="col-md-6 mb-3" data-task-id="${id}">
        <div class="card ${borderClass} ${extraCardClass}">
            <div class="card-body">
                <h5 class="card-title ${titleClass}">${name}</h5>
                <p class="card-text">${description}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <small class="text-secondary">
                        <i class="bi bi-calendar3 me-1"></i>${dueDate}
                    </small>
                    <span class="badge ${badgeClass}">
                        <i class="bi ${badgeIcon} me-1"></i>${status}
                    </span>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-3">
                    <button class="btn ${btnClass} status-button btn-sm">
                        Cambiar Estado
                    </button>
                    <button class="btn btn-danger delete-button btn-sm">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate) {
    this.currentId++;
    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: 'Pendiente'
    });
  }

  getTaskById(taskId) {
    let foundTask;
    for (let task of this.tasks) {
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  deleteTask(taskId) {
    const numericId = Number(taskId);
    this.tasks = this.tasks.filter(task => task.id !== numericId);
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', String(this.currentId));
  }

  load() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (localStorage.getItem('currentId')) {
      this.currentId = Number(localStorage.getItem('currentId'));
    }
  }

  render() {
    const tasksContainer = document.querySelector('#tasksList');
    if (!tasksContainer) return;

    const tasksHtml = this.tasks
      .map(task => createTaskHtml(task.id, task.name, task.description, task.dueDate, task.status))
      .join('');

    tasksContainer.innerHTML = tasksHtml;
  }
}
