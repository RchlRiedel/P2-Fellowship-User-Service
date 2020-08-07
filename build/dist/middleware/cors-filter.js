"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsFilter = void 0;
function corsFilter(req, res, next) {
    //we always have to have the Access Control Allow part to allows stuff
    res.header('Access-Control-Allow-Origin', req.headers.origin); //* is bad because lets any origin send requests; 
    //this is a dirty hack. Don't do this when deploying an actual app
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Authorization'); //if we don't do this, the website cannot get access to the token
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    //the purposed of OPTIONS is to figure out what kind of request are allowed to be made to the server
    //we specify these kinds of requests uing the headers of the response to the options request
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); //will send back the options for the pre flight requests
    }
    else {
        next(); //allow through
    }
}
exports.corsFilter = corsFilter;
//# sourceMappingURL=cors-filter.js.map