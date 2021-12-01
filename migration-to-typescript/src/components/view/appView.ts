import News from './news/news';
import Sources from './sources/sources';
import { article, news, source, sources } from '../interfaces';

class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: news): void {
        const values: article[] = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: sources): void {
        const values: source[] = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
