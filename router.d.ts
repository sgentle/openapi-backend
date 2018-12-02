import { OpenAPIV3 } from 'openapi-types';
export declare type Document = OpenAPIV3.Document;
/**
 * OAS Operation Object containing the path and method so it can be placed in a flat array of operations
 *
 * @export
 * @interface Operation
 * @extends {OpenAPIV3.OperationObject}
 */
export interface Operation extends OpenAPIV3.OperationObject {
    path: string;
    method: string;
}
export interface Request {
    method: string;
    path: string;
    headers: {
        [key: string]: string | string[];
    };
    query?: {
        [key: string]: string | string[];
    } | string;
    body?: any;
}
export interface ParsedRequest extends Request {
    params?: {
        [key: string]: string | string[];
    };
    cookies?: {
        [key: string]: string | string[];
    };
    query?: {
        [key: string]: string | string[];
    };
    requestBody?: any;
}
/**
 * Class that handles routing
 *
 * @export
 * @class OpenAPIRouter
 */
export declare class OpenAPIRouter {
    definition: Document;
    /**
     * Creates an instance of OpenAPIRouter
     *
     * @param opts - constructor options
     * @param {Document} opts.definition - the OpenAPI definition, file path or Document object
     * @memberof OpenAPIRouter
     */
    constructor(opts: {
        definition: Document;
    });
    /**
     * Matches a request to an API operation (router)
     *
     * @param {Request} req
     * @returns {Operation}
     * @memberof OpenAPIRouter
     */
    matchOperation(req: Request): Operation;
    /**
     * Flattens operations into a simple array of Operation objects easy to work with
     *
     * @returns {Operation[]}
     * @memberof OpenAPIRouter
     */
    getOperations(): Operation[];
    /**
     * Gets a single operation based on operationId
     *
     * @param {string} operationId
     * @returns {Operation}
     * @memberof OpenAPIRouter
     */
    getOperation(operationId: string): Operation;
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
    normalizeRequest(req: Request): Request;
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
    parseRequest(req: Request, path?: string): ParsedRequest;
}
