class Button {
  constructor({ description, classN, handler }) {
    this.description = typeof description == 'string' ? description : null;
    this.classN = typeof classN == 'string' ? classN : null;
    this.handler = typeof handler == 'function' ? handler : null;
  }
}

class Card {
  constructor({ title, description, caracteristics, buttons }) {
    this.title = typeof title == 'string' ? title : null;
    this.description = typeof description == 'string' ? description : null;
    this.caracteristics = Array.isArray(caracteristics) ? caracteristics : null;
    this.buttons = [];
  }

  addButtons(btns) {
    if (Array.isArray(btns)) {
      btns.forEach((btn) => {
        if (btn instanceof Button) {
          this.buttons.push(btn);
        }
      });
    }
  }
}

class Filtro {
  constructor({ id, description, values }) {
    this.id = typeof id == 'string' ? id : null;
    this.description = typeof description == 'string' ? description : null;
    this.values = Array.isArray(values) ? values : null;
  }
}

class View {
  constructor({ title, stateView, entidad, search }) {
    this.title = typeof title == 'string' ? title : null;
    this.stateView = typeof stateView == 'boolean' ? stateView : null;
    this.entidad = typeof entidad == 'string' ? entidad : null;
    this.search = typeof search == 'boolean' ? search : null;
    this.filtros = [];
    this.content = [];
  }

  addFilters(filters) {
    if (Array.isArray(filters)) {
      filters.forEach((filter) => {
        if (filter instanceof Filtro) {
          this.filtros.push(filter);
        }
      });
    }
  }

  addContent(newContent) {
    if (newContent instanceof Card) {
      this.content.push(newContent);
    }
  }

  set setStateView(newState) {
    this.stateView = newState;
  }
}

export {View, Filtro, Card, Button};
