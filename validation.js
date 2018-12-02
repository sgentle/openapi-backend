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
var ajv_1 = __importDefault(require("ajv"));
var router_1 = require("./router");
/**
 * Class that handles request validation
 *
 * @export
 * @class OpenAPIRequestValidator
 */
var OpenAPIRequestValidator = /** @class */ (function () {
    /**
     * Creates an instance of OpenAPIValidation
     *
     * @param opts - constructor options
     * @param {Document | string} opts.definition - the OpenAPI definition, file path or Document object
     * @param {{ [operationId: string]: Handler | ErrorHandler }} opts.handlers - Operation handlers to be registered
     * @memberof OpenAPIRequestValidator
     */
    function OpenAPIRequestValidator(opts) {
        this.definition = opts.definition;
        this.ajvOpts = opts.ajvOpts || {};
        // initalize router
        this.router = new router_1.OpenAPIRouter({ definition: this.definition });
        // build schemas for api operations
        this.schemas = {};
        var operations = this.router.getOperations();
        operations.map(this.buildSchemasForOperation.bind(this));
    }
    /**
     * Validates a request with Ajv and returns the Ajv validator.
     *
     * The method will first match the request to an API operation and use the pre-compiled Ajv validation schema to
     * validate it.
     *
     * @param {Request} req - request to validate
     * @param {Operation} operation - operation to validate against
     * @returns {ValidationResult}
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIRequestValidator.prototype.validateRequest = function (req, operation) {
        var _a;
        var result = {
            valid: true,
            errors: [],
        };
        if (!operation) {
            operation = this.router.matchOperation(req);
        }
        var operationId = operation.operationId;
        // get pre-compiled ajv schemas for operation
        var schemas = this.schemas[operationId];
        // build a parameter object to validate
        var _b = this.router.parseRequest(req, operation.path), params = _b.params, query = _b.query, headers = _b.headers, cookies = _b.cookies, requestBody = _b.requestBody;
        // convert singular query parameters to arrays if specified as array in operation parametes
        for (var _i = 0, _c = lodash_1.default.entries(query); _i < _c.length; _i++) {
            var _d = _c[_i], name = _d[0], value = _d[1];
            if (typeof value === 'string') {
                var operationParameter = lodash_1.default.find(operation.parameters, { name: name, in: 'query' });
                if (operationParameter) {
                    var schema = operationParameter.schema;
                    if (schema && schema.type === 'array') {
                        query[name] = [value];
                    }
                }
            }
        }
        var parameters = lodash_1.default.omitBy({
            path: params,
            query: query,
            header: headers,
            cookie: cookies,
        }, lodash_1.default.isNil);
        if (typeof req.body !== 'object' && req.body !== undefined) {
            var payloadFormats = lodash_1.default.keys(lodash_1.default.get(operation, 'requestBody.content', {}));
            if (payloadFormats.length === 1 && payloadFormats[0] === 'application/json') {
                // check that JSON isn't malformed when the only payload format is JSON
                try {
                    JSON.parse("" + req.body);
                }
                catch (err) {
                    result.errors.push({
                        keyword: 'parse',
                        dataPath: '',
                        schemaPath: '#/requestBody',
                        params: [],
                        message: err.message,
                    });
                }
            }
        }
        if (typeof requestBody === 'object' || headers['content-type'] === 'application/json') {
            // include request body in validation if an object is provided
            parameters.requestBody = requestBody;
        }
        // validate parameters against each pre-compiled schema
        for (var _e = 0, schemas_1 = schemas; _e < schemas_1.length; _e++) {
            var validate = schemas_1[_e];
            validate(parameters);
            if (validate.errors) {
                (_a = result.errors).push.apply(_a, validate.errors);
            }
        }
        if (lodash_1.default.isEmpty(result.errors)) {
            // set empty errors array to null so we can check for result.errors truthiness
            result.errors = null;
        }
        else {
            // there were errors, set valid to false
            result.valid = false;
        }
        return result;
    };
    /**
     * Builds an Ajv schema validation function for an operation and registers it
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    OpenAPIRequestValidator.prototype.buildSchemasForOperation = function (operation) {
        var operationId = operation.operationId;
        // schemas for this operation
        var schemas = [];
        // schema for operation requestBody
        if (operation.requestBody) {
            var requestBody = operation.requestBody;
            var jsonbody = requestBody.content['application/json'];
            if (jsonbody && jsonbody.schema) {
                var requestBodySchema = {
                    title: 'Request',
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                        requestBody: jsonbody.schema,
                    },
                    required: [],
                };
                if (lodash_1.default.keys(requestBody.content).length === 1) {
                    // if application/json is the only specified format, it's required
                    requestBodySchema.required.push('requestBody');
                }
                // add compiled params schema to schemas for this operation id
                var requstBodyValidator = new ajv_1.default(this.ajvOpts);
                schemas.push(requstBodyValidator.compile(requestBodySchema));
            }
        }
        // schema for operation parameters in: path,query,header,cookie
        var paramsSchema = {
            title: 'Request',
            type: 'object',
            additionalProperties: true,
            properties: {
                path: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {},
                    required: [],
                },
                query: {
                    type: 'object',
                    properties: {},
                    additionalProperties: false,
                    required: [],
                },
                header: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {},
                    required: [],
                },
                cookie: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {},
                    required: [],
                },
            },
            required: [],
        };
        // params are dereferenced here, no reference objects.
        var parameters = operation.parameters;
        parameters.map(function (param) {
            var target = paramsSchema.properties[param.in];
            if (param.required) {
                target.required.push(param.name);
                paramsSchema.required = lodash_1.default.uniq(paramsSchema.required.concat([param.in]));
            }
            target.properties[param.name] = param.schema;
        });
        // add compiled params schema to schemas for this operation id
        var paramsValidator = new ajv_1.default(__assign({}, this.ajvOpts, { coerceTypes: true })); // types should be coerced for params
        schemas.push(paramsValidator.compile(paramsSchema));
        this.schemas[operationId] = schemas;
    };
    return OpenAPIRequestValidator;
}());
exports.OpenAPIRequestValidator = OpenAPIRequestValidator;
//# sourceMappingURL=validation.js.map