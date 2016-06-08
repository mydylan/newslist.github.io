const query = (elem) => {
  return document.querySelector(elem);
};

const getIdOfElement = (target) => {
  while (target.id === "") {
    target = target.parentElement;
  }
  return target.id;
};

const keyHandler = (e, app) => {
  let searchText = e.currentTarget.value;
  app.viewList.render(app.itemsList.search(searchText));
};

const toggleOpen = (dropdown, caret) => {
  query(dropdown).classList.toggle('open');
  query(caret).classList.toggle('rotate');
};

const openItem = (e, app) => {
  const id = getIdOfElement(e.target);
  app.viewItem.render(id);
};

const dateFilterHandler = (fromDate, toDate, app) => {
  if (fromDate >= toDate) {
    alert("Start Date bigger than End Date");
    return ;
  }
  if (fromDate && toDate) {
    app.viewList.render(app.itemsList.filter(fromDate, toDate));
  }
};

export function headerEvents(app) {
  let fromDate, toDate;

  query('.search-input input').addEventListener('keyup', (e) => {
    keyHandler(e, app);
  });

  query('.filter-button').addEventListener('click', () => {
    toggleOpen('.filters-wrapper', '.filter-button .caret');
  });

  query('#from-date').addEventListener('change', (e) => {
    fromDate = new Date(e.currentTarget.value).getTime();
    dateFilterHandler(fromDate, toDate, app);
  });

  query('#to-date').addEventListener('change', (e) => {
    toDate = new Date(e.currentTarget.value).getTime();
    dateFilterHandler(fromDate, toDate, app);
  });
}

export function listEvents(app) {
  query('.list-wrapper').addEventListener('click', (e) => {
    openItem(e, app);
  }, true);

  window.addEventListener('keyup', (e) => {
    if(e.keyCode === 27) {
      app.viewItem.destroy();
    }
  });

  query('.close').addEventListener('click', () => {
    app.viewItem.destroy();
  });

  query('.page-dropdown').addEventListener('click', () => {
    toggleOpen('.page-menu', '.page-dropdown .caret');
  });

  query('.page-menu').addEventListener('click', (e) => {
    const items = JSON.parse(e.target.dataset.items);
    if (items) {
      app.viewList.render(app.itemsList.setItemsPerPage(items));
    }
  }, true);

  query('.page-next').addEventListener('click', () => {
    const list = app.itemsList.getNextPage();
    if (list) app.viewList.render(list);
  });

  query('.page-prev').addEventListener('click', () => {
    const list = app.itemsList.getPrevPage();
    if (list) app.viewList.render(list);
  });
}
