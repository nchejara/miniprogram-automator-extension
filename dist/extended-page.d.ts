import Page from "miniprogram-automator/out/Page";
import ExtendedElement from "./extended-element";
export default class ExtendedPage {
    page: Page;
    constructor(page: Page);
    private _$;
    $(selector: string): Promise<ExtendedElement | null>;
    $$(selector: string): Promise<null | ExtendedElement | Array<ExtendedElement>>;
    /**
     * Tap/click on the HTMLElement
     * @param selector { string } a valid html selector
     */
    tap(selector: string): Promise<void | null>;
    text(selector: string): Promise<string | string[] | null>;
    wxml(selector: string): Promise<any>;
    outerWxml(selector: string): Promise<any>;
    attribute(selector: string, attributeName: string): Promise<string | string[] | null>;
    trigger(selector: string, type: string, details: any): Promise<void | null>;
    type(selector: string, textToType: string, delay?: number): Promise<unknown>;
    value(selector: string): Promise<string | string[] | null>;
    style(selector: string, name: string): Promise<string | string[] | null>;
    waitFor(ms: number | string): Promise<void>;
    waitForSelector(selector: string): Promise<void>;
    waitUntil(selector: string, textToMatch: string, timeout?: number, type?: string): Promise<void>;
    waitUntilTextMatch(selector: string, textToMatch: string, timeout?: number): Promise<void>;
    waitUntilAttributeValueMatch(selector: string, textToMatch: string, attributeName: string, timeout?: number): Promise<void>;
    waitUntilWxmlMatch(selector: string, textToMatch: string, timeout?: number): Promise<void>;
    findElementByText(selector: string, textToMatch: string): Promise<null | undefined | ExtendedElement>;
    findByIndex(selector: string, index: number): Promise<null | ExtendedElement>;
    data(): Promise<any>;
    setData(data?: any): Promise<void>;
    size(): Promise<{
        width: string;
        height: string;
    }>;
    callMethod(method: string, ...args: []): Promise<any>;
    scrollHeight(): Promise<string | string[]>;
    scrollWidth(): Promise<string | string[]>;
    scrollY(): Promise<string | string[]>;
    scrollX(): Promise<string | string[]>;
}
