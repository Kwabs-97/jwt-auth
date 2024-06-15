"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var protected_route_1 = require("../api/protected-route");
var verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
var router = express_1.default.Router();
router.post("/register", authController_1.registerHandler);
router.get("/login", authController_1.loginHandler);
router.get("/protected", verifyJWT_1.default, protected_route_1.protectedRoute);
exports.default = router;
//# sourceMappingURL=authRoute.js.map