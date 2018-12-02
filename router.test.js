"use strict";
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
var router_1 = require("./router");
var backend_1 = require("./backend");
var headers = { accept: 'application/json' };
var responses = {
    200: { description: 'ok' },
};
var pathId = {
    name: 'id',
    in: 'path',
    required: true,
    schema: {
        type: 'integer',
    },
};
var hobbyId = {
    name: 'hobbyId',
    in: 'path',
    required: true,
    schema: {
        type: 'integer',
    },
};
var queryLimit = {
    name: 'limit',
    in: 'query',
    schema: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
    },
};
var definition = {
    openapi: '3.0.0',
    info: {
        title: 'api',
        version: '1.0.0',
    },
    paths: {
        '/': {
            get: {
                operationId: 'apiRoot',
                responses: responses,
            },
        },
        '/pets': {
            get: {
                operationId: 'getPets',
                responses: responses,
            },
            post: {
                operationId: 'createPet',
                responses: responses,
            },
            parameters: [queryLimit],
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
        '/pets/{id}/hobbies/{hobbyId}': {
            get: {
                operationId: 'getPetHobbies',
                responses: responses,
            },
            parameters: [pathId, hobbyId],
        },
        '/pets/meta': {
            get: {
                operationId: 'getPetsMeta',
                responses: responses,
            },
        },
    },
};
describe('OpenAPIRouter', function () {
    describe('.matchOperation', function () {
        var api = new router_1.OpenAPIRouter({ definition: definition });
        test('matches GET /', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('apiRoot');
                return [2 /*return*/];
            });
        }); });
        test('matches GET /pets', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('getPets');
                return [2 /*return*/];
            });
        }); });
        test('matches POST /pets', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets', method: 'post', headers: headers }).operationId;
                expect(operationId).toEqual('createPet');
                return [2 /*return*/];
            });
        }); });
        test('matches GET /pets/{id}', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('getPetById');
                return [2 /*return*/];
            });
        }); });
        test('matches PUT /pets/{id}', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1', method: 'put', headers: headers }).operationId;
                expect(operationId).toEqual('replacePetById');
                return [2 /*return*/];
            });
        }); });
        test('matches PATCH /pets/{id}', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1', method: 'patch', headers: headers }).operationId;
                expect(operationId).toEqual('updatePetById');
                return [2 /*return*/];
            });
        }); });
        test('matches DELETE /pets/{id}', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1', method: 'delete', headers: headers }).operationId;
                expect(operationId).toEqual('deletePetById');
                return [2 /*return*/];
            });
        }); });
        test('matches GET /pets/{id}/owner', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1/owner', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('getOwnerByPetId');
                return [2 /*return*/];
            });
        }); });
        test('matches GET /pets/{id}/hobbies/{hobbyId}', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/1/hobbies/3', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('getPetHobbies');
                return [2 /*return*/];
            });
        }); });
        test('matches GET /pets/meta', function () { return __awaiter(_this, void 0, void 0, function () {
            var operationId;
            return __generator(this, function (_a) {
                operationId = api.matchOperation({ path: '/pets/meta', method: 'get', headers: headers }).operationId;
                expect(operationId).toEqual('getPetsMeta');
                return [2 /*return*/];
            });
        }); });
    });
});
describe('OpenAPIBackend', function () {
    describe('.handleRequest withContext=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var dummyHandlers, dummyHandler, api;
        var _this = this;
        return __generator(this, function (_a) {
            dummyHandlers = {};
            dummyHandler = function (operationId) { return (dummyHandlers[operationId] = jest.fn(function () { return ({ operationId: operationId }); })); };
            api = new backend_1.OpenAPIBackend({
                definition: definition,
                withContext: false,
                handlers: {
                    apiRoot: dummyHandler('apiRoot'),
                    getPets: dummyHandler('getPets'),
                    getPetById: dummyHandler('getPetById'),
                    createPet: dummyHandler('createPet'),
                    updatePetById: dummyHandler('updatePetById'),
                    notImplemented: dummyHandler('notImplemented'),
                    notFound: dummyHandler('notFound'),
                },
            });
            beforeAll(function () { return api.init(); });
            test('handles GET /', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/', headers: headers }, 'param0', 'param0')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'apiRoot' });
                            expect(dummyHandlers['apiRoot']).toBeCalledWith('param0', 'param0');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets', headers: headers }, 'param0', 'param1')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalledWith('param0', 'param1');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles POST /pets', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'POST', path: '/pets', headers: headers }, 'param1', 'param2')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'createPet' });
                            expect(dummyHandlers['createPet']).toBeCalledWith('param1', 'param2');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/1', headers: headers }, 'param2', 'param3')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPetById' });
                            expect(dummyHandlers['getPetById']).toBeCalledWith('param2', 'param3');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles PATCH /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'PATCH', path: '/pets/1', headers: headers }, 'param3', 'param4')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'updatePetById' });
                            expect(dummyHandlers['updatePetById']).toBeCalledWith('param3', 'param4');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles a 404 for unregistered endpoint GET /humans', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/humans', headers: headers }, 'param4', 'param5')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'notFound' });
                            expect(dummyHandlers['notFound']).toBeCalledWith('param4', 'param5');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles a 501 for not implemented endpoint DELETE /pets/1', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'DELETE', path: '/pets/1', headers: headers }, 'param5', 'param6')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'notImplemented' });
                            expect(dummyHandlers['notImplemented']).toBeCalledWith('param5', 'param6');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/ with trailing slash', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/', headers: headers }, 'param6', 'param7')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalledWith('param6', 'param7');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/?limit=10 with query string', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/?limit=10', headers: headers }, 'param7', 'param8')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalledWith('param7', 'param8');
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET pets with no leading slash', function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: 'pets', headers: headers }, 'param8', 'param9')];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalledWith('param8', 'param9');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe('.handleRequest withContext=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var dummyHandlers, dummyHandler, api;
        var _this = this;
        return __generator(this, function (_a) {
            dummyHandlers = {};
            dummyHandler = function (operationId) { return (dummyHandlers[operationId] = jest.fn(function () { return ({ operationId: operationId }); })); };
            api = new backend_1.OpenAPIBackend({
                definition: definition,
                withContext: true,
                handlers: {
                    apiRoot: dummyHandler('apiRoot'),
                    getPets: dummyHandler('getPets'),
                    getPetById: dummyHandler('getPetById'),
                    createPet: dummyHandler('createPet'),
                    updatePetById: dummyHandler('updatePetById'),
                    notImplemented: dummyHandler('notImplemented'),
                    notFound: dummyHandler('notFound'),
                },
            });
            beforeAll(function () { return api.init(); });
            test('handles GET / and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'apiRoot' });
                            expect(dummyHandlers['apiRoot']).toBeCalled();
                            contextArg = dummyHandlers['apiRoot'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/', headers: headers });
                            expect(contextArg.operation.operationId).toEqual('apiRoot');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalled();
                            contextArg = dummyHandlers['getPets'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/pets', headers: headers });
                            expect(contextArg.operation.operationId).toEqual('getPets');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles POST /pets and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'POST', path: '/pets', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'createPet' });
                            expect(dummyHandlers['createPet']).toBeCalled();
                            contextArg = dummyHandlers['createPet'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'post', path: '/pets', headers: headers });
                            expect(contextArg.operation.operationId).toEqual('createPet');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/1 and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/1', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPetById' });
                            expect(dummyHandlers['getPetById']).toBeCalled();
                            contextArg = dummyHandlers['getPetById'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/pets/1', params: { id: '1' }, headers: headers });
                            expect(contextArg.operation.operationId).toEqual('getPetById');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles PATCH /pets/1 and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'PATCH', path: '/pets/1', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'updatePetById' });
                            expect(dummyHandlers['updatePetById']).toBeCalled();
                            contextArg = dummyHandlers['updatePetById'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'patch', path: '/pets/1', params: { id: '1' }, headers: headers });
                            expect(contextArg.operation.operationId).toEqual('updatePetById');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles a 404 for unregistered endpoint GET /humans and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/humans', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'notFound' });
                            contextArg = dummyHandlers['notFound'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/humans', headers: headers });
                            expect(contextArg.operation).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles a 501 for not implemented endpoint DELETE /pets/1 and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'DELETE', path: '/pets/1', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'notImplemented' });
                            expect(dummyHandlers['notImplemented']).toBeCalled();
                            contextArg = dummyHandlers['notImplemented'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'delete', path: '/pets/1', params: { id: '1' }, headers: headers });
                            expect(contextArg.operation.operationId).toEqual('deletePetById');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/ with trailing slash and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalled();
                            contextArg = dummyHandlers['getPets'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/pets', headers: headers });
                            expect(contextArg.operation.operationId).toEqual('getPets');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            test('handles GET /pets/?limit=10 with query string and passes context', function () { return __awaiter(_this, void 0, void 0, function () {
                var res, contextArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.handleRequest({ method: 'GET', path: '/pets/?limit=10', headers: headers })];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual({ operationId: 'getPets' });
                            expect(dummyHandlers['getPets']).toBeCalled();
                            contextArg = dummyHandlers['getPets'].mock.calls.slice(-1)[0][0];
                            expect(contextArg.request).toMatchObject({ method: 'get', path: '/pets', query: { limit: '10' }, headers: headers });
                            expect(contextArg.operation.operationId).toEqual('getPets');
                            expect(contextArg.validation.errors).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=router.test.js.map