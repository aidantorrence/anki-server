"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var express_promise_router_1 = __importDefault(require("express-promise-router"));
var client_1 = require("@prisma/client");
var luxon_1 = require("luxon");
var active_win_1 = __importDefault(require("active-win"));
var prisma = new client_1.PrismaClient();
var tasks = (0, express_promise_router_1.default)();
tasks.get("/current-desktop-window", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var activeWin, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, active_win_1.default)()];
            case 1:
                activeWin = _a.sent();
                res.json(activeWin);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.json(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
tasks.get("/tasks-completed-today", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var startOfDay, tasks_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startOfDay = luxon_1.DateTime.now().startOf("day").toUTC().toISO();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.task.findMany({
                        where: {
                            createdAt: {
                                gt: startOfDay,
                            },
                        },
                    })];
            case 2:
                tasks_1 = _a.sent();
                // const records = await prisma.task.aggregate({
                // 	_count: {
                // 		content: true,
                // 	},
                // 	where: {
                // 		createdAt: {
                // 			gt: startOfDay,
                // 		},
                // 	},
                // });
                res.json(tasks_1);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.json(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
tasks.get("/backlog", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks_2, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.task.findMany({
                        where: {
                            completed: false,
                        },
                    })];
            case 1:
                tasks_2 = _a.sent();
                res.json(tasks_2);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.json(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
tasks.post("/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks_3, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.task.create({
                        data: req.body,
                    })];
            case 1:
                tasks_3 = _a.sent();
                res.status(200).send("task created");
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                res.status(400).send("task failed");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
tasks.patch("/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks_4, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.task.update({
                        where: {
                            id: req.body.id,
                        },
                        data: req.body,
                    })];
            case 1:
                tasks_4 = _a.sent();
                res.status(200).send("task updated");
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(400).send("task failed");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
tasks.delete("/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks_5, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.task.delete({
                        where: {
                            id: req.body.id,
                        },
                    })];
            case 1:
                tasks_5 = _a.sent();
                res.status(200).send("task deleted");
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                res.status(400).send("task failed");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = tasks;
