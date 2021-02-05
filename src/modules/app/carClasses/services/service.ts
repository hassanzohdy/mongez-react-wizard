import RestfulEndpoint from "reactor/http/restful-endpoint";

class CarClassesService extends RestfulEndpoint {
    route = '/cars/classes';
}

const carClassesService: CarClassesService = new CarClassesService();

export default carClassesService;