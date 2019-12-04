import {elementFactory} from "@remindgmbh/util";

export interface LightboxFunctions {
    createCanvas: (className: string) => HTMLElement,
    createFooter: (className: string) => HTMLElement,
    createHeader: (className: string) => HTMLElement,
    createCloseButton: (className: string) => HTMLElement
}

export interface LightboxClasses {
    [name: string]: string
}

export interface LightboxOptions {
    functions: Partial<LightboxFunctions>,
    classes: LightboxClasses
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
    /* Lightbox html elements */
    protected container: HTMLElement;
    protected canvas: HTMLElement;
    protected footer: HTMLElement;
    protected header: HTMLElement;
    protected closeButton: HTMLElement;

    /* Objects for css classes & rendering function */
    protected classes: LightboxClasses;
    protected functions: LightboxFunctions;

    /**
     * Set default css classes & rendering function
     *
     * @param options Override default options
     */
    constructor(options?: Partial<LightboxOptions>) {

        this.classes = Object.assign({
            lightbox: this.CLASS_LIGHTBOX,
            canvas: this.CLASS_CANVAS,
            closeButton: this.CLASS_CLOSE_BUTTON,
            footer: this.CLASS_FOOTER,
            header: this.CLASS_HEADER
        }, (options && options.classes ? options.classes : {}));

        this.functions = Object.assign({
            createCanvas: Lightbox.createElement,
            createFooter: Lightbox.createElement,
            createHeader: Lightbox.createElement,
            createCloseButton: Lightbox.createElement
        }, (options && options.functions ? options.functions : {}));
    }

    /**
     * Create html for container, header, canvas and footer
     * Append header, canvas and footer to container
     */
    public create(): void {
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
     * Create canvas div and add css class
     */
    protected buildCanvas(): void {
        this.canvas = this.functions.createHeader(this.classes.canvas);
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
     * Bind close event
     * Parent method to bind more
     */
    protected bindEvents(): void {
        let closeBtn: HTMLElement | null = this.container.querySelector(Lightbox.getClassSelector(this.classes.closeButton));
        if (closeBtn) {
            closeBtn.addEventListener('click', this.detach.bind(this));
        }
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
     * If lightbox does not exist, attach lightbox to window
     */
    public attach(): void {
        let html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (!html) {
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

    /**
     * Detach, create and attach again
     */
    public update(): void {
        this.detach();
        this.create();
        this.attach();
    }
}
