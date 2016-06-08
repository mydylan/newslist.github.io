import parse from './helpers/parse';
import { headerEvents } from './helpers/events';
import ItemsList from './ItemsList';
import ViewListGenerator from './ViewListGenerator';
import ViewItemGenerator from './ViewItemGenerator';

export default class App {
  constructor(data) {
    this.headerEvents = headerEvents;
    this.itemsList = new ItemsList(parse(data));
    this.viewList = new ViewListGenerator(this);
    this.viewItem = new ViewItemGenerator(parse(data));
  }

  init() {
    this.viewList.render(this.itemsList.getItemsList());
    this.headerEvents(this);
  }
}
