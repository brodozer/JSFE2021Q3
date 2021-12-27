type TArticleSource = {
    id: string;
    name: string;
};

interface IArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: TArticleSource;
    title: string;
    url: string;
    urlToImage: string;
}

interface IData {
    status: string;
}

interface INews extends IData {
    articles: IArticle[];
    totalResults: number;
}

interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface ISources extends IData {
    sources: ISource[];
}

interface IEvent {
    target: Element;
    currentTarget: Element;
}

interface IUrlParams {
    endpoint: string;
    sources?: string;
}

export { TArticleSource, IArticle, INews, ISource, ISources, IEvent, IUrlParams };
