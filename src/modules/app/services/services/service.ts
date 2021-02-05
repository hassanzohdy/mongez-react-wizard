import RestfulEndpoint from "reactor/http/restful-endpoint";

class ServicesService extends RestfulEndpoint {
    route = '/services';
}

const servicesService: ServicesService = new ServicesService();

export default servicesService;