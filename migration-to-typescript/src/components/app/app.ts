import AppController from '../controller/controller';
import AppView from '../view/appView';
import AppModel from '../model/model';

class App {
    static start(): void {
        const sources: Element = document.querySelector('.sources');
        const apiKey = 'ece68924ff9d491b97e02b97bc836f73';
        //const baseLink = 'https://newsapi.org/v2/';
        const baseLink = 'https://nodenews.herokuapp.com/';
        const view: AppView = new AppView();
        const model: AppModel = new AppModel(baseLink, apiKey);
        const controller: AppController = new AppController(view, model, sources);
        controller.init();
    }
}

export default App;
