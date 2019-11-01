"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ExtendedElement {
    constructor(elementHandler) {
        this.elementHandler = elementHandler;
    }
    waitFor(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    $(selector) {
        return this.elementHandler.$(selector);
    }
    $$(selector) {
        return this.elementHandler.$$(selector);
    }
    wxml(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.wxml();
        });
    }
    outerWxml(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.outerWxml();
        });
    }
    attribute(selector, attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.attribute(attributeName);
        });
    }
    /**
       *
       * Search for the 'aria-disabled' attribute from the element and return the attribute value
       * @param { String } selector - Validate HTML selector
       * @returns Boolean - rerturn true when the element disabled
       */
    hasDisabled(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.attribute(selector, 'aria-disabled');
            return value === 'true';
        });
    }
    text(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.text();
        });
    }
    value(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.value();
        });
    }
    tap(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.tap();
        });
    }
    style(selector, styleName) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.style(styleName);
        });
    }
    longpress(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.longpress();
        });
    }
    trigger(selector, eventName, detail) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = yield this.$(selector);
            if (!el)
                return null;
            return el.trigger(eventName, detail);
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
    find(selector, textToFind) {
        return __awaiter(this, void 0, void 0, function* () {
            /* eslint-disable consistent-return */
            const elements = yield this.$$(selector);
            if (!elements)
                return elements;
            const element = yield elements.find((el, t) => __awaiter(this, void 0, void 0, function* () {
                const text = yield el.text();
                if (text.includes(t))
                    return el;
            }), textToFind);
            return new ExtendedElement(element);
            /* eslint-enable consistent-return */
        });
    }
    /**
     *
     * @param {*} selector
     * @param {*} index
     * @return {Promise<ExtendedElement<Element>>}
     */
    findByIndex(selector, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.$$(selector);
            return new ExtendedElement(elements[index]);
        });
    }
}
exports.default = ExtendedElement;
