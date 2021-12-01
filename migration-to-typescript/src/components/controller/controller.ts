import Model from '../model/model';
import AppView from '../view/appView';
import { event, sources, news } from '../interfaces';

class AppController {
    sources: Element;
    view: AppView;
    model: Model;
    constructor(view: AppView, model: Model, sources: Element) {
        this.view = view;
        this.model = model;
        this.sources = sources;
    }
    getSources(): void {
        const url: string = this.model.makeUrl({
            endpoint: 'sources',
        });
        this.model
            .getResp('GET', url)
            .then((data: sources) => this.view.drawSources(data))
            .catch((err) => console.log(err));
    }

    getNews(e: event): void {
        const target: Element = e.target;
        const newsContainer: Element = e.currentTarget;
        if (target != newsContainer) {
            const news = target.closest('.source__item');
            const sourceId: string = news.getAttribute('data-source-id');
            if (newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                const url: string = this.model.makeUrl({
                    endpoint: 'everything',
                    sources: sourceId,
                });
                this.model
                    .getResp('GET', url)
                    .then((data: news) => this.view.drawNews(data))
                    .catch((err) => console.log(err));
            }
        }
    }

    init(): void {
        this.sources.addEventListener('click', this.getNews.bind(this));
        this.getSources();
    }
}

export default AppController;
