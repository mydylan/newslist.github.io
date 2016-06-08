export default class ItemsList {
  constructor(items) {
    this.items = items;
    this.itemsOnThePage = items;
    this.itemsPerPage = 3;
    this.currentPage = 0;
    this.totalPages = 1;

    this.buildList = (items, itemsPerPage) => {
      let list = [];
      let pages = Math.ceil(items.length/itemsPerPage);
      let counter = 0;

      for (let i=0; i<pages; i+=1) {
        list[i] = [];
        for (let j=0; j<itemsPerPage; j+=1) {
          if (items[counter] !== undefined) {
            list[i][j] = items[counter];
            counter += 1;
          }
        }
      }
      return list;
    };
  }

  search(string) {
    this.itemsOnThePage = this.items.filter(item => {
      return item.searchTitle.search(string.toLowerCase()) !== -1;
    });
    this.setTotalPages();
    return this.buildList(this.itemsOnThePage, this.itemsPerPage)[this.currentPage];
  }

  filter(fromDate, toDate) {
    this.itemsOnThePage =  this.items.filter(item => {
      return item.date >= fromDate && item.date <= toDate;
    });
    this.setTotalPages();
    return this.buildList(this.itemsOnThePage, this.itemsPerPage)[this.currentPage];
  }

  setItemsPerPage(itemsPerPage = this.itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.setTotalPages();
    return this.buildList(this.items, this.itemsPerPage)[this.currentPage];
  }

  getItemsPerPage() {
    return this.itemsPerPage;
  }

  getCurrentPage() {
    return this.currentPage + 1;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  getTotalPages() {
    return this.totalPages;
  }

  setTotalPages(items = this.itemsOnThePage) {
    this.totalPages = Math.ceil(items.length/this.itemsPerPage);
  }

  getItemsList(itemsPerPage) {
    this.setTotalPages();
    return this.buildList(this.itemsOnThePage, this.itemsPerPage)[this.currentPage];
  }

  getNextPage() {
    if (this.getCurrentPage() !== this.getTotalPages()) {
      this.setCurrentPage(this.currentPage + 1);
      this.setTotalPages();
      return this.getItemsList(this.itemsOnThePage);
    } else {
      return;
    }
  }

  getPrevPage() {
    if (this.getCurrentPage() !== 1) {
      this.setCurrentPage(this.currentPage - 1);
      this.setTotalPages();
      return this.getItemsList(this.itemsOnThePage);
    }
  }
};
