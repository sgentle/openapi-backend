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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var backend_1 = require("./backend");
var testsDir = path_1.default.join(__dirname, '..', '__tests__');
var examplePetAPIJSON = path_1.default.join(testsDir, 'resources', 'example-pet-api.openapi.json');
var examplePetAPIYAML = path_1.default.join(testsDir, 'resources', 'example-pet-api.openapi.yml');
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
var pathId = {
    name: 'id',
    in: 'path',
    required: true,
    schema: {
        type: 'integer',
    },
};
describe('OpenAPIBackend', function () {
    var definition = __assign({}, meta, { paths: {
            '/pets': {
                get: {
                    operationId: 'getPets',
                    responses: responses,
                },
                post: {
                    operationId: 'createPet',
                    responses: responses,
                },
            },
            '/pets/{id}': {
                get: {
                    operationId: 'getPetById',
                    responses: responses,
                },
                put: {
                    operationId: 'replacePetById',
                    responses: responses,
                },
                patch: {
                    operationId: 'updatePetById',
                    responses: responses,
                },
                delete: {
                    operationId: 'deletePetById',
                    responses: responses,
                },
                parameters: [pathId],
            },
            '/pets/{id}/owner': {
                get: {
                    operationId: 'getOwnerByPetId',
                    responses: responses,
                },
                parameters: [pathId],
            },
            '/pets/meta': {
                get: {
                    operationId: 'getPetsMeta',
                    responses: responses,
                },
            },
        } });
    test('can be initalised with a valid OpenAPI document as JS Object', function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new backend_1.OpenAPIBackend({ definition: definition, strict: true });
                    return [4 /*yield*/, api.init()];
                case 1:
                    _a.sent();
                    expect(api.initalized).toEqual(true);
                    expect(api.router.getOperations()).toHaveLength(8);
                    return [2 /*return*/];
            }
        });
    }); });
    test('can be initalised using a valid YAML file', function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new backend_1.OpenAPIBackend({ definition: examplePetAPIYAML, strict: true });
                    return [4 /*yield*/, api.init()];
                case 1:
                    _a.sent();
                    expect(api.initalized).toEqual(true);
                    expect(api.router.getOperations()).toHaveLength(8);
                    return [2 /*return*/];
            }
        });
    }); });
    test('can be initalised using a valid JSON file', function () { return __awaiter(_this, void 0, void 0, function () {
        var api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new backend_1.OpenAPIBackend({ definition: examplePetAPIJSON, strict: true });
                    return [4 /*yield*/, api.init()];
                case 1:
                    _a.sent();
                    expect(api.initalized).toEqual(true);
                    expect(api.router.getOperations()).toHaveLength(8);
                    return [2 /*return*/];
            }
        });
    }); });
    test('throws an error when initalised with an invalid document in strict mode', function () { return __awaiter(_this, void 0, void 0, function () {
        var invalid, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalid = { invalid: 'not openapi' };
                    api = new backend_1.OpenAPIBackend({ definition: invalid, strict: true });
                    return [4 /*yield*/, expect(api.init()).rejects.toThrowError()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('emits a warning when initalised with an invalid OpenAPI document not in strict mode', function () { return __awaiter(_this, void 0, void 0, function () {
        var invalid, warn, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalid = { invalid: 'not openapi' };
                    warn = console.warn;
                    console.warn = jest.fn();
                    api = new backend_1.OpenAPIBackend({ definition: invalid, strict: false });
                    return [4 /*yield*/, api.init()];
                case 1:
                    _a.sent();
                    expect(console.warn).toBeCalledTimes(1);
                    console.warn = warn; // reset console.warn
                    expect(api.router.getOperations()).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('.register', function () {
        var api = new backend_1.OpenAPIBackend({ definition: definition });
        beforeAll(function () { return api.init(); });
        var dummyHandler = jest.fn();
        test('registers a single handler with .registerHandler', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                api.registerHandler('getPets', dummyHandler);
                expect(api.handlers['getPets']).toBe(dummyHandler);
                return [2 /*return*/];
            });
        }); });
        test('registers a single handler with .register', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                api.register('getPets', dummyHandler);
                expect(api.handlers['getPets']).toBe(dummyHandler);
                return [2 /*return*/];
            });
        }); });
        test('emits a warning when registering a handler for unknown operationId not in strict mode', function () { return __awaiter(_this, void 0, void 0, function () {
            var warn;
            return __generator(this, function (_a) {
                api.strict = false;
                warn = console.warn;
                console.warn = jest.fn();
                api.register('getHumans', dummyHandler);
                expect(console.warn).toBeCalledTimes(1);
                expect(api.handlers['getHumans']).toBe(dummyHandler);
                console.warn = warn; // reset console.warn
                return [2 /*return*/];
            });
        }); });
        test('refuses to register a handler for unknown operationId when in strict mode', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                api.strict = true;
                expect(function () { return api.register('getAliens', dummyHandler); }).toThrowError();
                expect(api.handlers['getAliens']).not.toBe(dummyHandler);
                return [2 /*return*/];
            });
        }); });
        test('registers multiple handlers with .register', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                api.register({
                    getPetById: dummyHandler,
                    createPet: dummyHandler,
                    notFound: dummyHandler,
                });
                expect(api.handlers['getPetById']).toBe(dummyHandler);
                expect(api.handlers['createPet']).toBe(dummyHandler);
                expect(api.handlers['notFound']).toBe(dummyHandler);
                return [2 /*return*/];
            });
        }); });
    });
    describe('.mockResponseForOperation', function () {
        var exampleGarfield = {
            id: 1,
            name: 'Garfield',
        };
        var exampleGarfieldWithTag = {
            id: 1,
            tag: 'Lost',
        };
        var exampleOdey = {
            id: 2,
            name: 'Odey',
        };
        var api = new backend_1.OpenAPIBackend({
            definition: __assign({}, meta, { paths: {
                    '/pets': {
                        get: {
                            operationId: 'getPets',
                            responses: {
                                200: { $ref: '#/components/responses/PetsListWithExample' },
                            },
                        },
                        post: {
                            operationId: 'createPet',
                            responses: {
                                201: { $ref: '#/components/responses/SinglePetWithResponseSchema' },
                            },
                        },
                    },
                }, components: {
                    schemas: {
                        PetWithName: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                name: {
                                    type: 'string',
                                    example: 'Garfield',
                                },
                            },
                        },
                        PetWithTag: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                tag: {
                                    type: 'string',
                                    example: 'Lost',
                                },
                            },
                        },
                    },
                    responses: {
                        SinglePetWithResponseSchema: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/PetWithName',
                                    },
                                },
                            },
                        },
                        SimplePetsListWithExample: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    example: {
                                        value: [exampleGarfield],
                                    },
                                },
                            },
                        },
                        SimplePetsListWithExamplesArray: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    examples: {
                                        garfield: {
                                            value: [exampleGarfield, exampleOdey],
                                        },
                                    },
                                },
                            },
                        },
                        SimplePetsListWithResponseSchema: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/PetWithName',
                                        },
                                    },
                                },
                            },
                        },
                        AllOfPetsListWithResponseSchema: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            allOf: [
                                                { $ref: '#/components/schemas/PetWithName' },
                                                { $ref: '#/components/schemas/PetWithTag' },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                        AnyOfPetsListWithResponseSchema: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            anyOf: [
                                                { $ref: '#/components/schemas/PetWithName' },
                                                { $ref: '#/components/schemas/PetWithTag' },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                        OneOfPetsListWithResponseSchema: {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            oneOf: [
                                                { $ref: '#/components/schemas/PetWithName' },
                                                { $ref: '#/components/schemas/PetWithTag' },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                } }),
        });
        test('mocks getPets with example object', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/SimplePetsListWithExample' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks getPets with examples array', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/SimplePetsListWithExamplesArray' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield, exampleOdey]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks getPets with response schema', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/SimplePetsListWithResponseSchema' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks getPets with response schema containing allOf', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/AnyOfPetsListWithResponseSchema' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield, exampleGarfieldWithTag]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks getPets with response schema containing anyOf', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/AnyOfPetsListWithResponseSchema' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield, exampleGarfieldWithTag]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks getPets with response schema containing oneOf', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].get.responses = {
                            200: { $ref: '#/components/responses/OneOfPetsListWithResponseSchema' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('getPets'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(200);
                        expect(mock).toMatchObject([exampleGarfield]);
                        return [2 /*return*/];
                }
            });
        }); });
        test('mocks createPet with response schema', function () { return __awaiter(_this, void 0, void 0, function () {
            var paths, _a, status, mock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paths = api.inputDocument.paths;
                        paths['/pets'].post.responses = {
                            201: { $ref: '#/components/responses/SinglePetWithResponseSchema' },
                        };
                        return [4 /*yield*/, api.init()];
                    case 1:
                        _b.sent();
                        _a = api.mockResponseForOperation('createPet'), status = _a.status, mock = _a.mock;
                        expect(status).toBe(201);
                        expect(mock).toMatchObject(exampleGarfield);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=backend.test.js.map