import RestfulEndpoint from "reactor/http/restful-endpoint";

class CompaniesService extends RestfulEndpoint {
    route = '/companies';
}

const companiesService: CompaniesService = new CompaniesService();

export default companiesService;