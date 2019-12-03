import {elementFactory} from "@remindgmbh/util";
import {Lightbox, LightboxOptions} from "./Lightbox";

export interface LightboxHtmlOptions extends LightboxOptions {
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

    constructor(source: string, options?: Partial<LightboxHtmlOptions>) {
        super(options);

        this.source = source;
        this.lazy = options && options.lazy ? options.lazy : false;

        this.classes = Object.assign({
            html: this.CLASS_HTML,
            loader: this.CLASS_LOADER
        }, this.classes);

        this.functions = Object.assign({
            createHTML: elementFactory,
            createLoader: elementFactory,
        }, this.functions);
    }

    protected createCanvas(): void {
        super.createCanvas();

        if (this.source == '' && !this.lazy) {
            this.innerHTML = this.functions.createLoader('div', {className: this.classes.html});
        } else {
            this.innerHTML = this.functions.createHTML('div', {className: this.classes.html, innerHTML: this.source});
        }

        this.canvas.appendChild(this.innerHTML);
    }

    public setSource(source: string): void {
        this.source = source;
    }
}
