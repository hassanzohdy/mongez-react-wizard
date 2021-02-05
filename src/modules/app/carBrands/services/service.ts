import RestfulEndpoint from "reactor/http/restful-endpoint";

class CarBrandsService extends RestfulEndpoint {
    route = '/cars/brands';
}

const carBrandsService: CarBrandsService = new CarBrandsService();

export default carBrandsService;