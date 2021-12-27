import News from './news/news';
import Sources from './sources/sources';
import { IArticle, INews, ISource, ISources } from '../interfaces';

class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: INews): void {
        const values: IArticle[] = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources): void {
        const values: ISource[] = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
