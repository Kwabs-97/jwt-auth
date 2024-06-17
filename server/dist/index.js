"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = __importDefault(require("./config/db"));
var authRoute_1 = __importDefault(require("./routes/authRoute"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
//configs
dotenv_1.default.config();
(0, db_1.default)();
//middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//route
app.use(authRoute_1.default);
app.listen("".concat(process.env.PORT), function () {
    console.log("server is listening for requests");
});
//# sourceMappingURL=index.js.map