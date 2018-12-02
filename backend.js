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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var openapi_schema_validation_1 = require("openapi-schema-validation");
var swagger_parser_1 = __importDefault(require("swagger-parser"));
var mock_json_schema_1 = require("mock-json-schema");
var router_1 = require("./router");
var validation_1 = require("./validation");
/**
 * Main class and the default export of the 'openapi-backend' module
 *
 * @export
 * @class OpenAPIBackend
 */
var OpenAPIBackend = /** @class */ (function () {
    /**
     * Creates an instance of OpenAPIBackend.
     *
     * @param opts - constructor options
     * @param {Document | string} opts.definition - the OpenAPI definition, file path or Document object
     * @param {boolean} opts.strict - strict mode, throw errors or warn on OpenAPI spec validation errors (default: false)
     * @param {boolean} opts.validate - whether to validate requests with Ajv (default: true)
     * @param {boolean} opts.withContext - whether to pass context object to handlers as first argument (default: true)
     * @param {{ [operationId: string]: Handler | ErrorHandler }} opts.handlers - Operation handlers to be registered
     * @memberof OpenAPIBackend
     */
    function OpenAPIBackend(opts) {
        this.allowedHandlers = ['notFound', 'notImplemented', 'validationFail'];
        var optsWithDefaults = __assign({ withContext: true, validate: true, strict: false, ajvOpts: {}, handlers: {} }, opts);
        this.inputDocument = optsWithDefaults.definition;
        this.strict = optsWithDefaults.strict;
        this.validate = optsWithDefaults.validate;
        this.handlers = optsWithDefaults.handlers;
        this.withContext = optsWithDefaults.withContext;
        this.ajvOpts = optsWithDefaults.ajvOpts;
        this.schemas = {};
    }
    /**
     * Initalizes OpenAPIBackend.
     *
     * 1. Loads and parses the OpenAPI document passed in constructor options
     * 2. Validates the OpenAPI document
     * 3. Builds validation schemas for all API operations
     * 4. Marks property `initalized` to true
     * 5. Registers all [Operation Handlers](#operation-handlers) passed in constructor options
     *
     * The init() method should be called right after creating a new instance of OpenAPIBackend
     *
     * @returns parent instance of OpenAPIBackend
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        // parse the document
                        _a = this;
                        return [4 /*yield*/, swagger_parser_1.default.parse(this.inputDocument)];
                    case 1:
                        // parse the document
                        _a.document = _c.sent();
                        // validate the document
                        this.validateDefinition();
                        // dereference the document into definition
                        _b = this;
                        return [4 /*yield*/, swagger_parser_1.default.dereference(this.document)];
                    case 2:
                        // dereference the document into definition
                        _b.definition = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        if (this.strict) {
                            // in strict-mode, fail hard and re-throw the error
                            throw err_1;
                        }
                        else {
                            // just emit a warning about the validation errors
                            console.warn(err_1);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        // initalize router with dereferenced definition
                        this.router = new router_1.OpenAPIRouter({ definition: this.definition });
                        // initalize validator with dereferenced definition
                        this.validator = new validation_1.OpenAPIRequestValidator({ definition: this.definition, ajvOpts: this.ajvOpts });
                        // we are initalized
                        this.initalized = true;
                        // register all handlers
                        if (this.handlers) {
                            this.register(this.handlers);
                        }
                        // return this instance
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Handles a request
     * 1. Routing: Matches the request to an API operation
     * 2. Validation: Validates the request against the API operation schema
     * 3. Handling: Passes the request on to a registered handler
     *
     * @param {Request} req
     * @param {...any[]} handlerArgs
     * @returns {Promise} handler return value
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.handleRequest = function (req) {
        var handlerArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlerArgs[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var context, notFoundHandler, _a, path, operationId, validationFailHandler, routeHandler, notImplementedHandler;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.initalized) return [3 /*break*/, 2];
                        // auto-initalize if not yet initalized
                        return [4 /*yield*/, this.init()];
                    case 1:
                        // auto-initalize if not yet initalized
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        context = {};
                        // parse request
                        context.request = this.router.parseRequest(req);
                        // match operation
                        context.operation = this.matchOperation(req);
                        if (!context.operation || !context.operation.operationId) {
                            notFoundHandler = this.handlers['404'] || this.handlers['notFound'];
                            if (!notFoundHandler) {
                                throw Error("404-notFound: no route matches request");
                            }
                            return [2 /*return*/, this.withContext ? notFoundHandler.apply(void 0, [context].concat(handlerArgs)) : notFoundHandler.apply(void 0, handlerArgs)];
                        }
                        _a = context.operation, path = _a.path, operationId = _a.operationId;
                        // parse request again now with matched path
                        context.request = this.router.parseRequest(req, path);
                        // validate against route
                        if (this.validate) {
                            context.validation = this.validator.validateRequest(req);
                            if (context.validation.errors) {
                                validationFailHandler = this.handlers['validationFail'];
                                if (validationFailHandler) {
                                    return [2 /*return*/, this.withContext
                                            ? validationFailHandler.apply(void 0, [context].concat(handlerArgs)) : validationFailHandler.apply(void 0, handlerArgs)];
                                }
                                // if no validation handler is specified, just proceed to route handler (context.validation is still populated)
                            }
                        }
                        routeHandler = this.handlers[operationId];
                        if (!routeHandler) {
                            notImplementedHandler = this.handlers['501'] || this.handlers['notImplemented'];
                            if (!notImplementedHandler) {
                                throw Error("501-notImplemented: " + operationId + " no handler registered");
                            }
                            return [2 /*return*/, this.withContext ? notImplementedHandler.apply(void 0, [context].concat(handlerArgs)) : notImplementedHandler.apply(void 0, handlerArgs)];
                        }
                        // handle route
                        return [2 /*return*/, this.withContext ? routeHandler.apply(void 0, [context].concat(handlerArgs)) : routeHandler.apply(void 0, handlerArgs)];
                }
            });
        });
    };
    /**
     * Registers a handler for an operation
     *
     * @param {string} operationId
     * @param {Handler} handler
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.registerHandler = function (operationId, handler) {
        // make sure we are registering a function and not anything else
        if (typeof handler !== 'function') {
            throw new Error('Handler should be a function');
        }
        // if initalized, check that operation matches an operationId or is one of our allowed handlers
        if (this.initalized) {
            var operation = this.router.getOperation(operationId);
            if (!operation && !lodash_1.default.includes(this.allowedHandlers, operationId)) {
                var err = "Unknown operationId " + operationId;
                // in strict mode, throw Error, otherwise just emit a warning
                if (this.strict) {
                    throw new Error(err + ". Refusing to register handler");
                }
                else {
                    console.warn(err);
                }
            }
        }
        // register the handler
        this.handlers[operationId] = handler;
    };
    /**
     * Overloaded register() implementation
     *
     * @param {...any[]} args
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.register = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof args[0] === 'string') {
            // register a single handler
            var operationId = args[0];
            var handler = args[1];
            this.registerHandler(operationId, handler);
        }
        else {
            // register multiple handlers
            var handlers = args[0];
            for (var operationId in handlers) {
                if (handlers[operationId]) {
                    this.registerHandler(operationId, handlers[operationId]);
                }
            }
        }
    };
    /**
     * Mocks a response for an operation based on example or response schema
     *
     * @param {string} operationId - operationId of the operation for which to mock the response
     * @param {object} opts - (optional) options
     * @param {number} opts.responseStatus - (optional) the response code of the response to mock (default: 200)
     * @param {string} opts.mediaType - (optional) the media type of the response to mock (default: application/json)
     * @param {string} opts.example - (optional) the specific example to use (if operation has multiple examples)
     * @returns {{ status: number; mock: any }}
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.mockResponseForOperation = function (operationId, opts) {
        if (opts === void 0) { opts = {}; }
        var status = 200;
        var defaultMock = {};
        var operation = this.router.getOperation(operationId);
        if (!operation || !operation.responses) {
            return { status: status, mock: defaultMock };
        }
        // resolve status code
        var responses = operation.responses;
        var response;
        // 1. check for provided code opt (default: 200)
        if (!response && opts.code && responses[opts.code]) {
            status = Number(opts.code);
            response = responses[opts.code];
        }
        // 2. check for a 20X response
        if (!response) {
            for (var _i = 0, _a = lodash_1.default.range(200, 204); _i < _a.length; _i++) {
                var ok = _a[_i];
                if (responses[ok]) {
                    status = ok;
                    response = responses[ok];
                }
            }
        }
        // 3. check for the "default" response
        if (!response && responses.default) {
            status = 200;
            response = responses.default;
        }
        // 4. pick first response code in list
        if (!response) {
            status = Number(lodash_1.default.first(lodash_1.default.keys(responses)));
            response = responses[lodash_1.default.first(lodash_1.default.keys(responses))];
        }
        if (!response || !response.content) {
            return { status: status, mock: defaultMock };
        }
        var content = response.content;
        // resolve media type
        // 1. check for mediaType opt in content (default: application/json)
        // 2. pick first media type in content
        var mediaType = opts.mediaType || 'application/json';
        var mediaResponse = content[mediaType] || content[lodash_1.default.first(lodash_1.default.keys(content))];
        if (!mediaResponse) {
            return { status: status, mock: defaultMock };
        }
        var examples = mediaResponse.examples, schema = mediaResponse.schema;
        // if example argument was provided, locate and return its value
        if (opts.example && examples) {
            var exampleObject = examples[opts.example];
            if (exampleObject && exampleObject.value) {
                return { status: status, mock: exampleObject.value };
            }
        }
        // if operation has an example, return its value
        if (mediaResponse.example && mediaResponse.example.value) {
            return { status: status, mock: mediaResponse.example.value };
        }
        // pick the first example from examples
        if (examples) {
            var exampleObject = examples[lodash_1.default.first(lodash_1.default.keys(examples))];
            return { status: status, mock: exampleObject.value };
        }
        // mock using json schema
        if (schema) {
            return { status: status, mock: mock_json_schema_1.mock(schema) };
        }
        // we should never get here, schema or an example must be provided
        return { status: status, mock: defaultMock };
    };
    /**
     * Validates this.document, which is the parsed OpenAPI document. Throws an error if validation fails.
     *
     * @returns {Document} parsed document
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.validateDefinition = function () {
        var _a = openapi_schema_validation_1.validate(this.document, 3), valid = _a.valid, errors = _a.errors;
        if (!valid) {
            var prettyErrors = JSON.stringify(errors, null, 2);
            throw new Error("Document is not valid OpenAPI. " + errors.length + " validation errors:\n" + prettyErrors);
        }
        return this.document;
    };
    /**
     * Flattens operations into a simple array of Operation objects easy to work with
     *
     * Alias for: router.getOperations()
     *
     * @returns {Operation[]}
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.getOperations = function () {
        return this.router.getOperations();
    };
    /**
     * Gets a single operation based on operationId
     *
     * Alias for: router.getOperation(operationId)
     *
     * @param {string} operationId
     * @returns {Operation}
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.getOperation = function (operationId) {
        return this.router.getOperation(operationId);
    };
    /**
     * Matches a request to an API operation (router)
     *
     * Alias for: router.matchOperation(req)
     *
     * @param {Request} req
     * @returns {Operation}
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.matchOperation = function (req) {
        return this.router.matchOperation(req);
    };
    /**
     * Validates a request and returns the result.
     *
     * The method will first match the request to an API operation and use the pre-compiled Ajv validation schema to
     * validate it.
     *
     * Alias for validator.validateRequest(req)
     *
     * @param {Request} req - request to validate
     * @returns {ValidationStatus}
     * @memberof OpenAPIBackend
     */
    OpenAPIBackend.prototype.validateRequest = function (req) {
        return this.validator.validateRequest(req);
    };
    return OpenAPIBackend;
}());
exports.OpenAPIBackend = OpenAPIBackend;
//# sourceMappingURL=backend.js.map