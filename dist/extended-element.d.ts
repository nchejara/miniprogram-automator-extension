import Element from "miniprogram-automator/out/Element";
export default class ExtendedElement {
    elementHandler: Element;
    constructor(elementHandler: Element);
    waitFor(ms: number): Promise<unknown>;
    $(selector: string): Promise<Element | null | undefined>;
    $$(selector: string): Promise<any>;
    wxml(selector: string): Promise<any>;
    outerWxml(selector: string): Promise<any>;
    attribute(selector: string, attributeName: string): Promise<string | string[] | null>;
    /**
       *
       * Search for the 'aria-disabled' attribute from the element and return the attribute value
       * @param { String } selector - Validate HTML selector
       * @returns Boolean - rerturn true when the element disabled
       */
    hasDisabled(selector: string): Promise<boolean>;
    text(selector: string): Promise<string | string[] | null>;
    value(selector: string): Promise<string | string[] | null>;
    tap(selector: string): Promise<void | null>;
    style(selector: string, styleName: string): Promise<string | string[] | null>;
    longpress(selector: string): Promise<void | null>;
    trigger(selector: string, eventName: string, detail: any): Promise<void | null>;
    type(selector: string, textToType: string, delay?: number): Promise<unknown>;
    find(selector: string, textToFind: string): Promise<ExtendedElement | null>;
    /**
     *
     * @param {*} selector
     * @param {*} index
     * @return {Promise<ExtendedElement<Element>>}
     */
    findByIndex(selector: string, index: number): Promise<ExtendedElement>;
}
