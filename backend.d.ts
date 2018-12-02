import Ajv from 'ajv';
import { OpenAPIV3 } from 'openapi-types';
import { OpenAPIRouter, Request, ParsedRequest, Operation } from './router';
import { OpenAPIRequestValidator, ValidationResult } from './validation';
declare type Document = OpenAPIV3.Document;
/**
 * Passed context built for request. Passed as first argument for all handlers.
 *
 * @export
 * @interface Context
 */
export interface Context {
    request?: ParsedRequest;
    operation?: Operation;
    validation?: ValidationResult;
}
export declare type Handler = (context?: Context, ...args: any[]) => any | Promise<any>;
/**
 * Main class and the default export of the 'openapi-backend' module
 *
 * @export
 * @class OpenAPIBackend
 */
export declare class OpenAPIBackend {
    document: Document;
    inputDocument: Document | string;
    definition: Document;
    initalized: boolean;
    strict: boolean;
    validate: boolean;
    withContext: boolean;
    ajvOpts: Ajv.Options;
    handlers: {
        [operationId: string]: Handler;
    };
    allowedHandlers: string[];
    router: OpenAPIRouter;
    validator: OpenAPIRequestValidator;
    schemas: {
        [operationId: string]: Ajv.ValidateFunction;
    };
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
    constructor(opts: {
        definition: Document | string;
        strict?: boolean;
        validate?: boolean;
        withContext?: boolean;
        ajvOpts?: Ajv.Options;
        handlers?: {
            notFound?: Handler;
            notImplemented?: Handler;
            validationFail?: Handler;
            [handler: string]: Handler;
        };
    });
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
    init(): Promise<this>;
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
    handleRequest(req: Request, ...handlerArgs: any[]): Promise<any>;
    /**
     * Registers a handler for an operation
     *
     * @param {string} operationId
     * @param {Handler} handler
     * @memberof OpenAPIBackend
     */
    registerHandler(operationId: string, handler: Handler): void;
    /**
     * Registers multiple handlers
     *
     * @param {{ [operationId: string]: Handler }} handlers
     * @memberof OpenAPIBackend
     */
    register(handlers: {
        [operationId: string]: Handler;
    }): void;
    /**
     * Registers a handler for an operation
     *
     * Alias for: registerHandler
     *
     * @param {string} operationId
     * @param {Handler} handler
     * @memberof OpenAPIBackend
     */
    register(operationId: string, handler: Handler): void;
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
    mockResponseForOperation(operationId: string, opts?: {
        code?: number;
        mediaType?: string;
        example?: string;
    }): {
        status: number;
        mock: any;
    };
    /**
     * Validates this.document, which is the parsed OpenAPI document. Throws an error if validation fails.
     *
     * @returns {Document} parsed document
     * @memberof OpenAPIBackend
     */
    validateDefinition(): OpenAPIV3.Document;
    /**
     * Flattens operations into a simple array of Operation objects easy to work with
     *
     * Alias for: router.getOperations()
     *
     * @returns {Operation[]}
     * @memberof OpenAPIBackend
     */
    getOperations(): Operation[];
    /**
     * Gets a single operation based on operationId
     *
     * Alias for: router.getOperation(operationId)
     *
     * @param {string} operationId
     * @returns {Operation}
     * @memberof OpenAPIBackend
     */
    getOperation(operationId: string): Operation;
    /**
     * Matches a request to an API operation (router)
     *
     * Alias for: router.matchOperation(req)
     *
     * @param {Request} req
     * @returns {Operation}
     * @memberof OpenAPIBackend
     */
    matchOperation(req: Request): Operation;
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
    validateRequest(req: Request): ValidationResult;
}
export {};
