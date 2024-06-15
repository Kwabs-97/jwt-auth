"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uuid_1 = require("uuid");
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        default: (0, uuid_1.v4)(),
        unique: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});
var userDb = mongoose_1.default.model("userDb", userSchema);
exports.default = userDb;
//# sourceMappingURL=usersModel.js.map