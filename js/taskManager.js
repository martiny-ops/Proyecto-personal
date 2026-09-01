const createTaskHtml = (id, name, description, dueDate, status) => {
  let borderClass = 'border-pendiente';
  let titleClass = 'text-warning fw-bold';
  let badgeClass = 'badge-pendiente';
  let badgeIcon = 'bi-clock';
  let extraCardClass = '';

  if (status === 'En progreso') {
    borderClass = 'border-progreso';
    titleClass = 'text-primary fw-bold';
    badgeClass = 'badge-progreso';
    badgeIcon = 'bi-arrow-repeat';
  } else if (status === 'Completada') {
    borderClass = 'border-completada';
    titleClass = 'text-green text-decoration-line-through fw-normal';
    badgeClass = 'badge-completada';
    badgeIcon = 'bi-check-circle-fill';
    extraCardClass = 'opacity-50';
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
                <div class="d-flex justify-content-end mt-3">
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

  addTask(name, description, dueDate, status) {
    this.currentId++;
    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status || 'Pendiente'
    });
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

  toggleTaskStatus(cardElement) {
    const badge = cardElement.querySelector('.badge');
    const title = cardElement.querySelector('.card-title');

    cardElement.classList.remove('border-green', 'border-pendiente', 'border-progreso', 'border-completada');

    if (badge.classList.contains('badge-pendiente')) {
      badge.className = 'badge badge-progreso';
      badge.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i>En progreso';
      cardElement.classList.add('border-progreso');
      title.className = 'card-title text-primary fw-bold';
      cardElement.classList.remove('opacity-50');
    } else if (badge.classList.contains('badge-progreso')) {
      badge.className = 'badge badge-completada';
      badge.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Completada';
      cardElement.classList.add('border-completada');
      title.className = 'card-title text-green text-decoration-line-through fw-normal';
      cardElement.classList.add('opacity-50');
    } else {
      badge.className = 'badge badge-pendiente';
      badge.innerHTML = '<i class="bi bi-clock me-1"></i>Pendiente';
      cardElement.classList.add('border-pendiente');
      title.className = 'card-title text-warning fw-bold';
      cardElement.classList.remove('opacity-50');
    }
  }
}
