import Ajv from 'ajv';
import { OpenAPIV3 } from 'openapi-types';
import { OpenAPIRouter, Request, Operation } from './router';
declare type Document = OpenAPIV3.Document;
/**
 * The output object for validationRequest. Contains the results for validation
 *
 * @export
 * @interface ValidationStatus
 */
export interface ValidationResult {
    valid: boolean;
    errors?: Ajv.ErrorObject[];
}
/**
 * Class that handles request validation
 *
 * @export
 * @class OpenAPIRequestValidator
 */
export declare class OpenAPIRequestValidator {
    definition: Document;
    ajvOpts: Ajv.Options;
    schemas: {
        [operationId: string]: Ajv.ValidateFunction[];
    };
    router: OpenAPIRouter;
    /**
     * Creates an instance of OpenAPIValidation
     *
     * @param opts - constructor options
     * @param {Document | string} opts.definition - the OpenAPI definition, file path or Document object
     * @param {{ [operationId: string]: Handler | ErrorHandler }} opts.handlers - Operation handlers to be registered
     * @memberof OpenAPIRequestValidator
     */
    constructor(opts: {
        definition: Document;
        ajvOpts?: Ajv.Options;
    });
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
    validateRequest(req: Request, operation?: Operation): ValidationResult;
    /**
     * Builds an Ajv schema validation function for an operation and registers it
     *
     * @param {Operation} operation
     * @memberof OpenAPIRequestValidator
     */
    buildSchemasForOperation(operation: Operation): void;
}
export {};
