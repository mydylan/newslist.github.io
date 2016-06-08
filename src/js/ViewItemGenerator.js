export default class ViewItem {
  constructor(items) {
    this.items = items;
    this.template = "";
    this.query = (elem) => {
      return document.querySelector(elem);
    };
    this.container = this.query(".item-news");

    this.dateFormat = (stringDate) => {
      const date = new Date(stringDate);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    this.show = () => {
      this.query("#item-container").classList.add('show');
      this.query('html').style.overflow = "hidden";
      window.scrollTo(0, 0);
    };

    this.hide = () => {
      this.query("#item-container").classList.remove('show');
      this.query('html').style.overflow = "scroll";
    };

    this.getRelatedNewsTemplate = (item) => {
      const isShow = !this.query('#box').checked;
      if (isShow && item.relatedStories) {
        let template = item.relatedStories.map(story => {
          const dateText = this.dateFormat(story.publishedDate);
          return (`
            <div class="related-item">
              <div class="icon"></div>
              <div class="related-title">
                <p>${story.title} <a href=${story.unescapedUrl} target="_blank">read more</a></p>
                <div class="related-post">
                  <div class="related-date">${dateText}</div>
                  <div class="related-publisher">${story.publisher}</div>
                </div>
              </div>
            </div>
            `);
          });
          return template.join('');
      } else {
        return '';
      }
    };

    this.createTemplate = (id) => {
      const item = this.items.find(item => {
        return item.id === JSON.parse(id);
      });
      const dateText = this.dateFormat(item.date);
      return (`
  			<div class="news">
  				<div class="news-content">
  					<div class="img-wrapper">
  						<img src="${item.image.url}" alt="">
  						<div class="post">
  							<div class="post-date">${dateText}</div>
  							<div class="publisher">${item.publisher}</div>
  						</div>
  					</div>
  					<div class="news-text">
  						<div class="news-title">${item.title}</div>
  						<div class="news-text-content">
  							${item.content}
  							<a href=${item.unescapedUrl} target="_blank">read more</a>
  						</div>
  					</div>
  				</div>
  				<div class="related-news">
            ${this.getRelatedNewsTemplate(item)}
  				</div>
  			</div>
      `);
    };

    this.template = (id) => {
      if (this.items.length) {
        const template = this.createTemplate(id);
        this.container.insertAdjacentHTML('beforeend', template);
      }
      this.show();
    };
  }

  destroy() {
    this.hide();
    this.container.innerHTML = '';
  };

  render(id) {
    this.destroy();
    this.template(id);
  }

}
