import RestfulEndpoint from "reactor/http/restful-endpoint";

class BranchesService extends RestfulEndpoint {
    route = '/branches';
}

const branchesService: BranchesService = new BranchesService();

export default branchesService;