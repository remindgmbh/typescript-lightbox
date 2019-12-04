import {elementFactory} from "@remindgmbh/util";
import {Lightbox, LightboxFunctions, LightboxOptions} from "./Lightbox";

export interface LightboxHtmlFunctions extends LightboxFunctions {
    createHTML: (source: string, className: string) => HTMLElement,
    createLoader: (className: string) => HTMLElement
}

export interface LightboxHtmlOptions extends LightboxOptions {
    functions: Partial<LightboxHtmlFunctions>,
    lazy: boolean
}

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxHtml extends Lightbox {
    private readonly CLASS_HTML: string = 'remind-lightbox__HTML';
    private readonly CLASS_LOADER: string = 'remind-lightbox__loader';

    protected innerHTML: HTMLElement;
    protected source: string = '';
    protected lazy: boolean = false;

    protected functions: LightboxHtmlFunctions;

    constructor(source: string, options?: Partial<LightboxHtmlOptions>) {
        super(options);

        this.source = source;
        this.lazy = options && options.lazy ? options.lazy : false;

        /* Add css loader, html class */
        this.classes = Object.assign({
            html: this.CLASS_HTML,
            loader: this.CLASS_LOADER
        }, this.classes);

        /* Add loader, html rendering functions */
        this.functions = Object.assign({
            createHTML: LightboxHtml.createHtmlElement,
            createLoader: Lightbox.createElement,
        }, this.functions);
    }

    /**
     * Create canvas
     * Add innerHtml
     * If lazy mode is enabled and html is empty, render loader
     *
     */
    protected buildCanvas(): void {
        super.buildCanvas();

        if (this.source == '' && !this.lazy) {
            this.innerHTML = this.functions.createLoader(this.classes.loader);
        } else {
            this.innerHTML = this.functions.createHTML(this.source, this.classes.html);
        }

        this.canvas.append(this.innerHTML);
    }

    /**
     * Static default function to create html div element with className and innerHTML
     */
    protected static createHtmlElement(source: string, className: string): HTMLElement {
        return elementFactory('div', {
            className: className,
            innerHTML: source
        });
    }

    /**
     * Set innerHTML source
     *
     * @param source
     */
    public setSource(source: string): void {
        this.source = source;
    }
}
