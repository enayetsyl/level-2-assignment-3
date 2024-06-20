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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const UserModel_1 = require("./UserModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUtils_1 = require("../../utils/authUtils");
const config_1 = __importDefault(require("../../config"));
const signUpUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserModel_1.User.create(userData);
    if (result) {
        const editedResult = result.toObject();
        delete editedResult.__v;
        delete editedResult.createdAt;
        delete editedResult.updatedAt;
        return editedResult;
    }
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role
    };
    let accessToken = (0, authUtils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const editedUser = user.toObject();
    delete editedUser.__v;
    delete editedUser.createdAt;
    delete editedUser.updatedAt;
    // accessToken = `Bearer ${accessToken}`
    return { accessToken, user: editedUser };
});
exports.UserServices = {
    signUpUser, loginUser
};
