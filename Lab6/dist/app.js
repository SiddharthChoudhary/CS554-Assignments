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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const tasks_1 = require("./data/tasks");
const comment_1 = require("./modals/comment");
const task_1 = require("./modals/task");
// import {task} from './modals/task';
// import tasks from '.tasks';
class App {
    constructor() {
        this.tasksData = new tasks_1.Tasks();
        this.app = express_1.default();
        this.config();
        this.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes(router) {
        // const router = express.Router();
        router.get("/api/tasks/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { skip = 0, take = 20 } = req.query;
                if (skip) {
                    if (!Number.isInteger(parseFloat(skip))) {
                        return res.status(500).json({ error: 'skip should be integer' });
                    }
                    else {
                        skip = parseInt(skip);
                    }
                }
                if (take) {
                    if (!Number.isInteger(parseFloat(take))) {
                        return res.status(500).json({ error: 'take should be integer' });
                    }
                    else {
                        take = parseInt(take) > 100 ? 100 : parseInt(take);
                    }
                }
                let task = yield this.tasksData.getAllTasks();
                return res.json(task.slice(skip, skip + take));
            }
            catch (e) {
                return res.status(500).json({ error: "Something's wrong with get query" });
            }
        }));
        router.get("/api/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.tasksData.getTasksById(req.params.id);
                res.json(tasks);
            }
            catch (e) {
                res.status(404).json({ error: "Not found" });
            }
        }));
        router.post('/api/tasks', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, hoursEstimated } = req.body;
            if (!title || !description || !hoursEstimated) {
                return res.status(500).json({ status: 500, error: 'The required information is not given!' });
            }
            const tasks = new task_1.Task(title, description, hoursEstimated, false, []);
            let postedTask;
            try {
                postedTask = yield this.tasksData.postTasks(tasks);
            }
            catch (e) {
                return res.status(500).json({ status: 500, error: e });
            }
            return res.json(postedTask);
        }));
        router.put("/api/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const objec = req.body;
                if (!req.params.id) {
                    return res.status(500).json({ error: "Object is not formatted" });
                }
                const { title, description, hoursEstimated, completed, comments } = req.body;
                if (!title || typeof title !== "string" || !description || typeof description !== "string" || !hoursEstimated || isNaN(hoursEstimated) || !completed) {
                    return res.status(500).json({ error: "Object is not in perfect format" });
                }
                const task = yield this.tasksData.updateATask(req.params.id, objec);
                res.json(task);
            }
            catch (e) {
                res.status(500).json({ error: "Error while applying put method" });
            }
        }));
        router.patch("/api/tasks/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const objec = req.body;
                const task = yield this.tasksData.patchATask(req.params.id, objec);
                res.json(task);
            }
            catch (e) {
                res.status(500).json({ error: "Patch error" });
            }
        }));
        router.post("/api/tasks/:id/comments", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, comment } = req.body;
                let commentObject = new comment_1.Comment(name, comment);
                if (typeof comment != 'string' || typeof name != 'string') {
                    return res.status(500).json({ error: "Comment or name is not string" });
                }
                const task = yield this.tasksData.postAComment(commentObject, req.params.id);
                res.json(task);
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        }));
        router.delete("/api/tasks/:taskId/:commentId", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.tasksData.deleteAComment(req.params.taskId, req.params.commentId);
                res.json(task);
            }
            catch (e) {
                res.status(500).send();
            }
        }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map