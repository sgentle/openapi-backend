"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var bath_1 = __importDefault(require("bath"));
var cookie_1 = __importDefault(require("cookie"));
var qs_1 = require("qs");
/**
 * Class that handles routing
 *
 * @export
 * @class OpenAPIRouter
 */
var OpenAPIRouter = /** @class */ (function () {
    /**
     * Creates an instance of OpenAPIRouter
     *
     * @param opts - constructor options
     * @param {Document} opts.definition - the OpenAPI definition, file path or Document object
     * @memberof OpenAPIRouter
     */
    function OpenAPIRouter(opts) {
        this.definition = opts.definition;
    }
    /**
     * Matches a request to an API operation (router)
     *
     * @param {Request} req
     * @returns {Operation}
     * @memberof OpenAPIRouter
     */
    OpenAPIRouter.prototype.matchOperation = function (req) {
        // normalize request for matching
        req = this.normalizeRequest(req);
        // get all operations matching request method in a flat array
        var operations = lodash_1.default.filter(this.getOperations(), function (_a) {
            var method = _a.method;
            return method === req.method;
        });
        // first check for an exact match for path
        var exactMatch = lodash_1.default.find(operations, function (_a) {
            var path = _a.path;
            return path === req.path;
        });
        if (exactMatch) {
            return exactMatch;
        }
        // then check for matches using path templating
        return lodash_1.default.find(operations, function (_a) {
            var path = _a.path;
            // convert openapi path template to a regex pattern i.e. /{id}/ becomes /[^/]+/
            var pathPattern = "^" + path.replace(/\{.*?\}/g, '[^/]+').replace(/\//g, '\\/') + "$";
            return Boolean(req.path.match(new RegExp(pathPattern, 'g')));
        });
    };
    /**
     * Flattens operations into a simple array of Operation objects easy to work with
     *
     * @returns {Operation[]}
     * @memberof OpenAPIRouter
     */
    OpenAPIRouter.prototype.getOperations = function () {
        var paths = lodash_1.default.get(this.definition, 'paths', {});
        return lodash_1.default.chain(paths)
            .entries()
            .flatMap(function (_a) {
            var path = _a[0], pathBaseObject = _a[1];
            var methods = lodash_1.default.pick(pathBaseObject, ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']);
            return lodash_1.default.map(lodash_1.default.entries(methods), function (_a) {
                var method = _a[0], operation = _a[1];
                return (__assign({}, operation, { path: path,
                    method: method, 
                    // add the path base object's operations to the operation's parameters
                    parameters: (operation.parameters || []).concat((pathBaseObject.parameters || [])) }));
            });
        })
            .value();
    };
    /**
     * Gets a single operation based on operationId
     *
     * @param {string} operationId
     * @returns {Operation}
     * @memberof OpenAPIRouter
     */
    OpenAPIRouter.prototype.getOperation = function (operationId) {
        return lodash_1.default.find(this.getOperations(), { operationId: operationId });
    };
    /**
     * Normalises request:
     * - http method to lowercase
     * - path leading slash 👍
     * - path trailing slash 👎
     * - path query string 👎
     *
     * @export
     * @param {Request} req
     * @returns {Request}
     */
    OpenAPIRouter.prototype.normalizeRequest = function (req) {
        return __assign({}, req, { path: (req.path || '')
                .trim()
                .split('?')[0] // remove query string
                .replace(/\/+$/, '') // remove trailing slash
                .replace(/^\/*/, '/'), method: req.method.trim().toLowerCase() });
    };
    /**
     * Parses request
     * - parse json body
     * - parse path params based on uri template
     * - parse query string
     * - parse cookies from headers
     *
     * @export
     * @param {Request} req
     * @param {string} [path]
     * @returns {ParsedRequest}
     */
    OpenAPIRouter.prototype.parseRequest = function (req, path) {
        var requestBody = req.body;
        if (req.body && typeof req.body !== 'object') {
            try {
                // attempt to parse json
                requestBody = JSON.parse(req.body.toString());
            }
            catch (_a) {
                // suppress json parsing errors
                // we will emit error if validation requires it later
            }
        }
        // parse query string from req.path + req.query
        var query = typeof req.query === 'object' ? req.query : qs_1.parse(req.path.split('?')[1]);
        // header keys are converted to lowercase, so Content-Type becomes content-type
        var headers = lodash_1.default.mapKeys(req.headers, function (val, header) { return header.toLowerCase(); });
        // parse cookie from headers
        var cookieHeader = headers['cookie'];
        var cookies = cookie_1.default.parse(lodash_1.default.flatten([cookieHeader]).join('; '));
        // normalize
        req = this.normalizeRequest(req);
        var params = {};
        if (path) {
            // parse path params if path is given
            var pathParams = bath_1.default(path);
            params = pathParams.params(req.path);
        }
        return __assign({}, req, { params: params,
            headers: headers,
            query: query,
            cookies: cookies,
            requestBody: requestBody });
    };
    return OpenAPIRouter;
}());
exports.OpenAPIRouter = OpenAPIRouter;
//# sourceMappingURL=router.js.map