import {elementFactory} from "@remindgmbh/util";
import {Lightbox, LightboxFunctions, Overrideables} from "./Lightbox";

export interface LightboxItem {
    image: string,
    headline: string,
    text: string
}

export interface LightboxImageFunctions extends LightboxFunctions {
    createImage: (item: LightboxItem, classNameOuter: string, classNameImage: string, classNameHeadline: string, classNameText: string) => HTMLElement,
}

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    protected readonly CLASS_IMAGE: string = 'remind-lightbox__image';
    protected readonly CLASS_HEADLINE: string = 'remind-lightbox__headline';
    protected readonly CLASS_TEXT: string = 'remind-lightbox__text';

    protected item: LightboxItem = {
        image: '',
        headline: '',
        text: ''
    };

    protected functionsImageExtended: LightboxImageFunctions;

    constructor(item: Partial<LightboxItem> = {}, options: Partial<Overrideables> = {}) {
        super('', options);

        this.item = {...this.item, ...item};

        this.classes = {
            image: this.CLASS_IMAGE,
            headline: this.CLASS_HEADLINE,
            text: this.CLASS_TEXT,
            ...this.classes
        };

        this.functionsImageExtended = {
            createImage: LightboxImage.createImage,
            ...this.functions
        };
    }

    protected buildContent(): void {
        this.content = LightboxImage.createImage(this.item, this.CLASS_CONTENT, this.CLASS_IMAGE, this.CLASS_HEADLINE, this.CLASS_TEXT);
    }

    /**
     * Static function to thumbnail
     *
     * @param item
     * @param classNameOuter
     * @param classNameImage
     * @param classNameHeadline
     * @param classNameText
     */
    protected static createImage(item: LightboxItem, classNameOuter: string, classNameImage: string, classNameHeadline: string, classNameText: string): HTMLElement {
        let content: HTMLElement = elementFactory('div', {className: classNameOuter});

        const image: HTMLElement = elementFactory('img', {className: classNameImage, src: item.image});
        content.appendChild(image);

        const headline: HTMLElement = elementFactory('h2', {className: classNameHeadline, innerText: item.headline});
        content.appendChild(headline);

        const text: HTMLElement = elementFactory('span', {className: classNameText, innerText: item.text});
        content.appendChild(text);

        return content;
    }
}
