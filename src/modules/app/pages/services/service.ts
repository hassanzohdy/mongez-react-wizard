import RestfulEndpoint from "reactor/http/restful-endpoint";

class PagesService extends RestfulEndpoint {
    route = '/pages';
}

const pagesService: RestfulEndpoint = new PagesService();

export default pagesService;