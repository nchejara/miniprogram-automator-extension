"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Automator_1 = __importDefault(require("miniprogram-automator/out/Automator"));
class Simulator {
    constructor() {
    }
    static launch(options) {
        return new Automator_1.default().launch(options);
    }
    static connect(options) {
        return new Automator_1.default().connect(options);
    }
}
exports.default = Simulator;
