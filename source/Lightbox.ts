import {elementFactory} from "@remindgmbh/util";

export interface LightboxFunctions {
    createCanvas: (className: string) => HTMLElement,
    createFooter: (className: string) => HTMLElement,
    createHeader: (className: string) => HTMLElement,
    createCloseButton: (className: string) => HTMLElement,
    createContent: (source: string, className: string) => HTMLElement
}

export interface LightboxClasses {
    [name: string]: string
}

export interface Overrideables {
    classes: Partial<LightboxClasses>,
    functions: Partial<LightboxFunctions>
}

/**
 * Lightbox base class
 */
export class Lightbox {
    /* CSS class constants */
    private readonly CLASS_LIGHTBOX: string = 'remind-lightbox';
    private readonly CLASS_CANVAS: string = 'remind-lightbox__canvas';
    private readonly CLASS_CLOSE_BUTTON: string = 'remind-lightbox__close-button';
    private readonly CLASS_FOOTER: string = 'remind-lightbox__footer';
    private readonly CLASS_HEADER: string = 'remind-lightbox__header';
    protected readonly CLASS_CONTENT: string = 'remind-lightbox__content';
    /* Lightbox html elements */
    protected container: HTMLElement;
    protected canvas: HTMLElement;
    protected footer: HTMLElement;
    protected header: HTMLElement;
    protected closeButton: HTMLElement;
    protected content: HTMLElement;

    /* Objects for css classes & rendering function */
    protected classes: LightboxClasses;
    protected functions: LightboxFunctions;

    protected source: string = '';

    /**
     * Set default css classes & rendering function
     *
     * @param source html string
     * @param options Override default options
     */
    constructor(source: string = '', options: Partial<Overrideables> = {}) {
        this.source = source;

        this.classes = Object.assign({
            lightbox: this.CLASS_LIGHTBOX,
            canvas: this.CLASS_CANVAS,
            closeButton: this.CLASS_CLOSE_BUTTON,
            footer: this.CLASS_FOOTER,
            header: this.CLASS_HEADER,
            content: this.CLASS_CONTENT
        }, (options && options.classes ? options.classes : {}));

        this.functions = Object.assign({
            createCanvas: Lightbox.createElement,
            createFooter: Lightbox.createElement,
            createHeader: Lightbox.createElement,
            createCloseButton: Lightbox.createElement,
            createContent: Lightbox.createHtmlElement
        }, (options && options.functions ? options.functions : {}));
    }

    /**
     * Create html for container, header, canvas and footer
     * Append header, canvas and footer to container
     */
    protected create(): void {
        this.container = elementFactory('div', {
            className: this.classes.lightbox
        });

        this.buildHeader();
        this.buildCanvas();
        this.buildFooter();

        this.container.append(this.header);
        this.container.append(this.canvas);
        this.container.append(this.footer);

        this.bindEvents();
    }

    /**
     * Bind close event
     * Parent method to bind more
     */
    protected bindEvents(): void {
        let closeBtn: HTMLElement | null = this.container.querySelector(Lightbox.getClassSelector(this.classes.closeButton));
        if (closeBtn) {
            closeBtn.addEventListener('click', this.detach.bind(this));
        }
    }

    protected buildContent(): void {
        this.content = this.functions.createContent(this.source, this.classes.content);
    }

    /**
     * Create canvas div and add css class
     */
    protected buildCanvas(): void {
        this.canvas = this.functions.createHeader(this.classes.canvas);

        this.buildContent();
        this.canvas.append(this.content);
    }

    /**
     * Create header div and add css class
     * Create close button, add css class and append to header
     */
    protected buildHeader(): void {
        this.header = this.functions.createHeader(this.classes.header);

        this.closeButton = this.functions.createCloseButton(this.classes.closeButton);
        this.header.append(this.closeButton);
    }

    /**
     * Create footer div and add css class
     */
    protected buildFooter(): void {
        this.footer = this.functions.createFooter(this.classes.footer);
    }

    /**
     * Static default function to create html div element with className
     *
     * @param className
     */
    protected static createElement(className: string): HTMLElement {
        return elementFactory('div', {className: className});
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
     * Add '.' before class string and replace spaces with '.'
     *
     * @param classString
     * @return string
     */
    protected static getClassSelector(classString: string): string {
        if (classString) {
            return '.' + classString.replace(' ', '.');
        }

        return '';
    }

    /**
     * Set innerHTML source
     *
     * @param source
     */
    public setSource(source: string): void {
        this.source = source;

        let canvas: HTMLElement | null
            = this.container.querySelector(Lightbox.getClassSelector(this.classes.canvas));
        if (canvas) {
            this.buildContent();
            canvas.innerHTML = this.content.outerHTML;
        }
    }

    /**
     * If lightbox does not exist, attach lightbox to window
     */
    public attach(): void {
        let html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (!html) {
            this.create();
            document.body.append(this.container);
        }
    }

    /**
     * If lightbox exist, detach lightbox from window
     */
    public detach(): void {
        let html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (html) {
            this.container.remove();
        }
    }
}
