class TaskManager {
  constructor() {
    this.tasks = [];
  }

  toggleTaskStatus(cardElement) {
    const badge = cardElement.querySelector('.badge');
    const title = cardElement.querySelector('.card-title');

    cardElement.classList.remove('border-green', 'border-pendiente', 'border-progreso', 'border-completada');

    if (badge.classList.contains('badge-pendiente')) {
      // 1. De Pendiente pasa a En progreso
      badge.className = 'badge badge-progreso';
      badge.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i>En progreso';

      cardElement.classList.add('border-progreso');
      title.className = 'card-title text-primary fw-bold';
      cardElement.classList.remove('opacity-50');

    } else if (badge.classList.contains('badge-progreso')) {
      // 2. De En progreso pasa a Completada
      badge.className = 'badge badge-completada';
      badge.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Completada';

      cardElement.classList.add('border-completada');
      title.className = 'card-title text-green text-decoration-line-through fw-normal';
      cardElement.classList.add('opacity-50');

    }else {
     // 3. De Completada vuelve a Pendiente
      badge.className = 'badge badge-pendiente';
      badge.innerHTML = '<i class="bi bi-clock me-1"></i>Pendiente';

      cardElement.classList.add('border-pendiente');
      title.className = 'card-title text-warning fw-bold';
      cardElement.classList.remove('opacity-50');
    }
  }
}
