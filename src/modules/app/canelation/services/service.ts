import RestfulEndpoint from "reactor/http/restful-endpoint";

class CanelationService extends RestfulEndpoint {
    route = '/canceling-reasons';
}

const canelationService: CanelationService = new CanelationService();

export default canelationService;