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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.loginHandler = exports.registerHandler = void 0;
var usersModel_1 = __importDefault(require("../models/usersModel"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var registerHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, saltRounds, hashedPassword, existingUser, newUser, savedUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                //validate input
                if (!username || !email || !password)
                    return [2 /*return*/, res.status(400).json({ message: "please enter credentials" })];
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, usersModel_1.default.findOne({ email: email })];
            case 3:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(400).json({ message: "user already exists" })];
                newUser = new usersModel_1.default({
                    username: username,
                    email: email,
                    passwordHash: hashedPassword,
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                savedUser = _b.sent();
                //send response to the client
                res.status(201).json({
                    message: "user created successfully",
                    data: { email: savedUser.email, username: savedUser.username },
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: "error creating user" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerHandler = registerHandler;
var loginHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, payload, jwtSecretKey, refreshTokenSecretKey, token, refreshToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, usersModel_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(401).json({
                            message: "account does not exist. Sign up instead",
                        })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.passwordHash)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: "invalid email or password. Please try again" })];
                payload = { userId: user.userId };
                jwtSecretKey = process.env.JWT_SECRET_KEY;
                refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_KEY;
                token = jsonwebtoken_1.default.sign(payload, jwtSecretKey, { expiresIn: "3600s" });
                refreshToken = jsonwebtoken_1.default.sign(payload, refreshTokenSecretKey, {
                    expiresIn: "7d",
                });
                //send the token to the client in a cookie
                res.cookie("auth-Token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                });
                //send the refresh token as well to the client
                res.cookie("refresh-token", refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                //response message on successful login
                res.status(200).json({
                    message: "login successful",
                    data: {
                        email: user.email,
                        username: user.username,
                    },
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).json({ message: "error authenticating user" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginHandler = loginHandler;
//# sourceMappingURL=authController.js.map