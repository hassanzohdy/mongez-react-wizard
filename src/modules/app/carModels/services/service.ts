import RestfulEndpoint from "reactor/http/restful-endpoint";

class CarModelsService extends RestfulEndpoint {
    route = '/cars/models';
}

const carModelsService: CarModelsService = new CarModelsService();

export default carModelsService;