import { elementFactory } from '@remindgmbh/typescript-utility-lib'

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
    private readonly CLASS_LIGHTBOX: string = 'remind-lightbox'
    private readonly CLASS_CANVAS: string = 'remind-lightbox__canvas'
    private readonly CLASS_CLOSE_BUTTON: string = 'remind-lightbox__close-button'
    private readonly CLASS_FOOTER: string = 'remind-lightbox__footer'
    private readonly CLASS_HEADER: string = 'remind-lightbox__header'
    protected readonly CLASS_CONTENT: string = 'remind-lightbox__content'
    /* Lightbox html elements */
    protected container: HTMLElement | null = null
    protected canvas: HTMLElement | null = null
    protected footer: HTMLElement | null = null
    protected header: HTMLElement | null = null
    protected closeButton: HTMLElement | null = null
    protected content: HTMLElement | null = null

    /* Objects for css classes & rendering function */
    protected classes: LightboxClasses
    protected functions: LightboxFunctions

    protected html: string = ''

    /**
     * Set default css classes & rendering function
     *
     * @param html html string
     * @param options Override default options
     */
    constructor(html: string = '', options: Partial<Overrideables> = {}) {
        this.html = html;

        this.classes = {
            lightbox: this.CLASS_LIGHTBOX,
            canvas: this.CLASS_CANVAS,
            closeButton: this.CLASS_CLOSE_BUTTON,
            footer: this.CLASS_FOOTER,
            header: this.CLASS_HEADER,
            content: this.CLASS_CONTENT
        , ...options.classes};

        this.functions = {
            createCanvas: Lightbox.createElement,
            createFooter: Lightbox.createElement,
            createHeader: Lightbox.createElement,
            createCloseButton: Lightbox.createElement,
            createContent: Lightbox.createHtmlElement
        , ...options.functions};
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

        Lightbox.appendToClass(this.container, this.classes.lightbox, this.header);
        Lightbox.appendToClass(this.container, this.classes.lightbox, this.canvas);
        Lightbox.appendToClass(this.container, this.classes.lightbox, this.footer);

        this.bindEvents();
    }

    /**
     * Bind close event
     * Parent method to bind more
     */
    protected bindEvents(): void {
        if (!this.container) {
            return;
        }

        const closeBtn: HTMLElement | null = this.container.querySelector(Lightbox.getClassSelector(this.classes.closeButton));
        if (closeBtn) {
            closeBtn.addEventListener('click', this.detach.bind(this));
        }
    }

    protected buildContent(): void {
        this.content = this.functions.createContent(this.html, this.classes.content);
    }

    /**
     * Create canvas div and add css class
     */
    protected buildCanvas(): void {
        this.canvas = this.functions.createCanvas(this.classes.canvas);

        this.buildContent();
        Lightbox.appendToClass(this.canvas, this.classes.canvas, this.content);
    }

    /**
     * Create header div and add css class
     * Create close button, add css class and append to header
     */
    protected buildHeader(): void {
        this.header = this.functions.createHeader(this.classes.header);

        this.closeButton = this.functions.createCloseButton(this.classes.closeButton);
        Lightbox.appendToClass(this.header, this.classes.header, this.closeButton);
    }

    /**
     * Create footer div and add css class
     */
    protected buildFooter(): void {
        this.footer = this.functions.createFooter(this.classes.footer);
    }

    /**
     * Append to element with target class
     * Workaround for overwritten output
     *
     * @param target
     * @param targetClassName
     * @param element
     */
    protected static appendToClass(target: HTMLElement | null, targetClassName: string, element: HTMLElement | null): void {
        if (!element || !target) {
            return;
        }

        if (target.classList.contains(targetClassName)) {
            target.append(element);
            return;
        }

        const innerTarget: HTMLElement | null = target.querySelector(Lightbox.getClassSelector(targetClassName));
        if (innerTarget) {
            innerTarget.append(element);
        }
    }

    /**
     * Append to element with target class
     * Workaround for overwritten output
     *
     * @param target
     * @param targetClassName
     * @param element
     */
    protected static prependToClass(target: HTMLElement | null, targetClassName: string, element: HTMLElement | null): void {
        if (!element || !target) {
            return;
        }

        if (target.classList.contains(targetClassName)) {
            target.prepend(element);
            return;
        }

        const innerTarget: HTMLElement | null = target.querySelector(Lightbox.getClassSelector(targetClassName));
        if (innerTarget) {
            innerTarget.prepend(element);
        }
    }

    /**
     * Static default function to create html div element with className
     *
     * @param className
     * @param data
     */
    protected static createElement(className: string, data: {[key: string]: string} = {}): HTMLElement {
        const element: HTMLElement = elementFactory('div', {
            className: className
        });

        for (const key in data) {
            element.dataset[key] = data[key];
        }

        return element;
    }

    /**
     * Static default function to create html div element with className and innerHTML
     */
    protected static createHtmlElement(html: string, className: string, data: {[key: string]: string} = {}): HTMLElement {
        const element: HTMLElement = elementFactory('div', {
            className: className,
            innerHTML: html
        });

        for (const key in data) {
            element.dataset[key] = data[key];
        }

        return element;
    }

    /**
     * Static default function to create html div element with className and innerHTML
     */
    protected static createImageElement(src: string, className: string, data: {[key: string]: string} = {}): HTMLElement {
        const element: HTMLElement = elementFactory('img', {
            className: className,
            src: src
        });

        for (const key in data) {
            element.dataset[key] = data[key];
        }

        return element;
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
     * Set innerHTML html
     *
     * @param html
     */
    public setHtml(html: string): void {
        this.html = html;

        if (!this.container) {
            return;
        }

        const canvas: HTMLElement | null
            = this.container.querySelector(Lightbox.getClassSelector(this.classes.canvas));

        if (canvas && this.content) {
            this.buildContent();
            canvas.innerHTML = this.content.outerHTML;
        }
    }

    /**
     * If lightbox does not exist, attach lightbox to window
     */
    public attach(): void {
        const html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (!html) {
            this.create();

            if (this.container) {
                document.body.append(this.container);
            }
        }
    }

    /**
     * If lightbox exist, detach lightbox from window
     */
    public detach(): void {
        const html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (html && this.container) {
            this.container.remove();
        }
    }
}
