import {elementFactory, CreatedElement} from "@remindgmbh/util";

export interface LightboxFunctions {
    [name: string]: <T extends string>(tag?: T, props?: Partial<CreatedElement<T>>) => HTMLElement
}

export interface LightboxClasses {
    [name: string]: string
}

export interface LightboxOptions {
    functions: LightboxFunctions,
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
    protected classes: LightboxClasses = {};
    protected functions: LightboxFunctions = {};

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
            createCanvas: elementFactory,
            createFooter: elementFactory,
            createHeader: elementFactory,
            createCloseButton: elementFactory
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

        this.createHeader();
        this.createCanvas();
        this.createFooter();

        this.container.appendChild(this.header);
        this.container.appendChild(this.canvas);
        this.container.appendChild(this.footer);

        this.bindEvents();
    }

    /**
     * Create canvas div and add css class
     */
    protected createCanvas(): void {
        this.canvas = this.functions.createCanvas('div', {className: this.classes.canvas});
    }

    /**
     * Create header div and add css class
     * Create close button, add css class and append to header
     */
    protected createHeader(): void {
        this.header = this.functions.createHeader('div', {className: this.classes.header});

        this.closeButton = this.functions.createCloseButton('button', {className: this.classes.closeButton});
        this.header.appendChild(this.closeButton);
    }

    /**
     * Create footer div and add css class
     */
    protected createFooter(): void {
        this.footer = this.functions.createFooter('div', {className: this.classes.footer});
    }

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
            document.body.appendChild(this.container);
        }
    }

    /**
     * If lightbox exist, detach lightbox from window
     */
    public detach(): void {
        let html: HTMLElement | null = document.body.querySelector(Lightbox.getClassSelector(this.classes.lightbox));
        if (html) {
            document.body.removeChild(this.container);
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
