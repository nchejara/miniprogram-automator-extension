"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extended_element_1 = __importDefault(require("./extended-element"));
class ExtendedPage {
    constructor(page) {
        this.page = page;
    }
    _$(selector) {
        return this.page.$(selector);
    }
    $(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return el;
            return new extended_element_1.default(el);
        });
    }
    $$(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const elments = yield this.page.$$(selector);
            if (!elments)
                return elments;
            let len = elments.length;
            if (len === 1)
                return new extended_element_1.default(elments[0]);
            return elments.map((el) => new extended_element_1.default(el));
        });
    }
    /**
     * Tap/click on the HTMLElement
     * @param selector { string } a valid html selector
     */
    tap(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return el;
            return el.tap();
        });
    }
    text(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.text();
        });
    }
    wxml(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.wxml();
        });
    }
    outerWxml(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.outerWxml();
        });
    }
    attribute(selector, attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.attribute(attributeName);
        });
    }
    trigger(selector, type, details) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.trigger(type, details);
        });
    }
    type(selector, textToType, delay = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (delay === 0)
                return this.trigger(selector, "input", { value: textToType });
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                const typeWithDelay = (selector, text) => __awaiter(this, void 0, void 0, function* () {
                    return this.trigger(selector, "input", { value: text });
                });
                textToType = textToType.toString(); //make sure the input is string
                let text = "";
                let len = textToType.length - 1;
                for (let i = 0; i <= len; i++) {
                    text += textToType[i];
                    yield typeWithDelay(selector, text);
                    yield this.waitFor(delay);
                    if (i === len)
                        return res();
                }
            }));
        });
    }
    value(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.value();
        });
    }
    style(selector, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this._$(selector);
            if (!el)
                return null;
            return el.style(name);
        });
    }
    waitFor(ms) {
        return this.page.waitFor(ms);
    }
    waitForSelector(selector) {
        return this.waitFor(selector);
    }
    waitUntil(selector, textToMatch, timeout = 30000, type = 'text') {
        return __awaiter(this, void 0, void 0, function* () {
            let timer = null;
            const startTime = Date.now();
            /* eslint-disable consistent-return */
            return new Promise((res, rej) => {
                const waitForCondition = (selector, textToMatch) => __awaiter(this, void 0, void 0, function* () {
                    let text = '';
                    if (type === 'wxml')
                        text = yield this.wxml(selector);
                    else
                        text = yield this.text(selector);
                    if (textToMatch === text) {
                        clearTimeout(timer);
                        yield this.waitFor(1000); // Add additional 1 sec wait to slow down the operation
                        return res();
                    }
                    if (Date.now() - startTime >= timeout) {
                        clearTimeout(timer);
                        throw `Timeout: actual (${text}) and expected (${textToMatch}) values doesn't matched within the specifed time!`;
                    }
                    timer = setTimeout(() => waitForCondition(selector, textToMatch), 1000);
                });
                timer = setTimeout(() => {
                    return waitForCondition(selector, textToMatch);
                }, 0);
            });
            /* eslint-enable consistent-return */
        });
    }
    waitUntilTextMatch(selector, textToMatch, timeout = 30000) {
        return this.waitUntil(selector, textToMatch, timeout);
    }
    waitUntilAttributeValueMatch(selector, textToMatch, attributeName, timeout = 30000) {
        return __awaiter(this, void 0, void 0, function* () {
            let timer = null;
            const startTime = Date.now();
            /* eslint-disable consistent-return */
            return new Promise((res, rej) => {
                const waitForCondition = (selector, textToMatch, attributeName) => __awaiter(this, void 0, void 0, function* () {
                    const value = yield this.attribute(selector, attributeName);
                    if (textToMatch === value) {
                        clearTimeout(timer);
                        yield this.waitFor(1000); // Add additional 1 sec wait to slow down the operation
                        return res();
                    }
                    if (Date.now() - startTime > timeout) {
                        clearTimeout(timer);
                        throw `Timeout: actual (${value}) and expected (${textToMatch}) values doesn't matched within the specifed time!`;
                    }
                    timer = setTimeout(() => waitForCondition(selector, textToMatch, attributeName), 1000);
                });
                timer = setTimeout(() => {
                    return waitForCondition(selector, textToMatch, attributeName);
                }, 0);
            });
            /* eslint-enable consistent-return */
        });
    }
    waitUntilWxmlMatch(selector, textToMatch, timeout = 30000) {
        return this.waitUntil(selector, textToMatch, timeout, 'wxml');
    }
    findElementByText(selector, textToMatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.$$(selector);
            if (!elements)
                return null;
            if (!Array.isArray(elements))
                return elements;
            return elements.find((el, t) => __awaiter(this, void 0, void 0, function* () {
                const text = yield el.elementHandler.text();
                if (text.includes(t))
                    return el;
            }), textToMatch);
        });
    }
    findByIndex(selector, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.$$(selector);
            if (!elements)
                return null;
            if (!Array.isArray(elements))
                return elements;
            return elements[index];
        });
    }
    data() {
        return this.page.data();
    }
    setData(data) {
        return this.page.setData(data);
    }
    size() {
        return this.page.size();
    }
    callMethod(method, ...args) {
        return this.page.callMethod(method, args);
    }
    scrollHeight() {
        return this.page.scrollHeight();
    }
    scrollWidth() {
        return this.page.scrollWidth();
    }
    scrollY() {
        return this.page.scrollY();
    }
    scrollX() {
        return this.page.scrollX();
    }
}
exports.default = ExtendedPage;
