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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var headers = { accept: 'application/json' };
var responses = {
    200: { description: 'ok' },
};
var meta = {
    openapi: '3.0.0',
    info: {
        title: 'api',
        version: '1.0.0',
    },
};
describe('OpenAPIRequestValidator', function () {
    describe('.validateRequest', function () {
        describe('path params in path base object', function () {
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets/{id}': {
                            get: {
                                operationId: 'getPetById',
                                responses: responses,
                            },
                            delete: {
                                operationId: 'deletePetById',
                                responses: responses,
                            },
                            parameters: [
                                {
                                    name: 'id',
                                    in: 'path',
                                    required: true,
                                    schema: {
                                        type: 'integer',
                                        minimum: 0,
                                    },
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/1.1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1.1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/-1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for DELETE /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'delete', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/1.1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1.1', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for DELETE /pets/-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/-1', method: 'delete', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('path params in operation object', function () {
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets/{id}': {
                            get: {
                                operationId: 'getPetById',
                                responses: responses,
                                parameters: [
                                    {
                                        name: 'id',
                                        in: 'path',
                                        required: true,
                                        schema: {
                                            type: 'integer',
                                            minimum: 0,
                                        },
                                    },
                                ],
                            },
                        },
                    } }),
            });
            test('passes validation for GET /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/1', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets/NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets/NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('query params in path base object', function () {
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            get: {
                                operationId: 'getPets',
                                responses: responses,
                            },
                            parameters: [
                                {
                                    name: 'limit',
                                    in: 'query',
                                    schema: {
                                        type: 'integer',
                                        minimum: 1,
                                        maximum: 100,
                                    },
                                },
                                {
                                    name: 'offset',
                                    in: 'query',
                                    schema: {
                                        type: 'integer',
                                        minimum: 0,
                                    },
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /pets', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?limit=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?offset=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?offset=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?limit=10&offset=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10&offset=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=NaN', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=NaN', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=-1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=-1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=999999999', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=999999999', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?unknownparam=1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('query params in operation object', function () {
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            get: {
                                operationId: 'getPets',
                                responses: responses,
                                parameters: [
                                    {
                                        name: 'q',
                                        in: 'query',
                                        schema: {
                                            type: 'array',
                                            items: {
                                                type: 'string',
                                            },
                                        },
                                    },
                                    {
                                        name: 'limit',
                                        in: 'query',
                                        schema: {
                                            type: 'integer',
                                            minimum: 1,
                                            maximum: 100,
                                        },
                                    },
                                ],
                            },
                        },
                    } }),
            });
            test('passes validation for GET /pets?limit=10', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?limit=10', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?limit=10&limit=20', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q=search', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q=search', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q=search1&q=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q=search1&q=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q[]=search1&q[]=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q[]=search1&q[]=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for GET /pets?q[0]=search1&q[1]=search2', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?q[0]=search1&q[1]=search2', method: 'get', headers: headers });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /pets?unknownparam=1', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({ path: '/pets?unknownparam=1', method: 'get', headers: headers });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('headers', function () {
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/secret': {
                            get: {
                                operationId: 'secretWithApiKey',
                                responses: responses,
                            },
                            parameters: [
                                {
                                    name: 'x-api-key',
                                    in: 'header',
                                    schema: {
                                        type: 'string',
                                        pattern: '^[A-Za-z0-9]{8,16}$',
                                    },
                                    required: true,
                                },
                            ],
                        },
                    } }),
            });
            test('passes validation for GET /secret, x-api-key:abcd0123', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': 'abcd0123' }),
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /secret, x-api-key:123', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': '123' }),
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for GET /secret, x-api-key:äääöööååå', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/secret',
                        method: 'get',
                        headers: __assign({}, headers, { 'x-api-key': 'äääöööååå' }),
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('request payloads', function () {
            var petSchema = {
                type: 'object',
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string',
                    },
                    age: {
                        type: 'integer',
                    },
                },
                required: ['name'],
            };
            var validator = new index_1.OpenAPIRequestValidator({
                definition: __assign({}, meta, { paths: {
                        '/pets': {
                            post: {
                                operationId: 'createPet',
                                responses: responses,
                                requestBody: {
                                    content: {
                                        'application/json': {
                                            schema: petSchema,
                                        },
                                    },
                                },
                            },
                            put: {
                                operationId: 'replacePet',
                                responses: responses,
                                requestBody: {
                                    content: {
                                        'application/json': {
                                            schema: petSchema,
                                        },
                                        'application/xml': {
                                            example: '<Pet><name>string</name></Pet>',
                                        },
                                    },
                                },
                            },
                        },
                    } }),
            });
            test('passes validation for POST /pets with full object', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                            age: 40,
                        },
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('passes validation for POST /pets with name only', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                        },
                    });
                    expect(valid.errors).toBeFalsy();
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with age only', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            age: 40,
                        },
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with additional property', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                        body: {
                            name: 'Garfield',
                            hello: 'world',
                        },
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for POST /pets with empty payload', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        headers: headers,
                    });
                    expect(valid.errors).toHaveLength(1);
                    return [2 /*return*/];
                });
            }); });
            test('fails validation for non-json data when the only media type defined is application/json', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        body: '<XML>',
                        headers: headers,
                    });
                    expect(valid.errors).toHaveLength(2);
                    expect(valid.errors[0].keyword).toBe('parse');
                    return [2 /*return*/];
                });
            }); });
            test('allows non-json data when application/json is not the only allowed media type', function () { return __awaiter(_this, void 0, void 0, function () {
                var valid;
                return __generator(this, function (_a) {
                    valid = validator.validateRequest({
                        path: '/pets',
                        method: 'post',
                        body: '<XML>',
                        headers: headers,
                    });
                    expect(valid.errors).toHaveLength(2);
                    expect(valid.errors[0].keyword).toBe('parse');
                    return [2 /*return*/];
                });
            }); });
        });
    });
});
//# sourceMappingURL=validation.test.js.map