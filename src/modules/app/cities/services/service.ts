import RestfulEndpoint from "reactor/http/restful-endpoint";

class CitiesService extends RestfulEndpoint {
    route = '/city';
}

const citiesService: CitiesService = new CitiesService();

export default citiesService;