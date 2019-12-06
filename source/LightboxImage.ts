import {elementFactory} from "@remindgmbh/util";
import {Lightbox, Overrideables} from "./Lightbox";

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    protected readonly CLASS_CONTENT: string = 'remind-lightbox__image';

    protected source: string = '';

    protected imageDefaults = {
        classes: {
            content: this.CLASS_CONTENT
        },
        functions: {
            createContent: LightboxImage.createImage
        }
    };

    constructor(source: string = '', options: Partial<Overrideables> = {}) {
        super(source, options);

        this.functions.createContent = options && options.functions && options.functions.createContent ? this.functions.createContent : this.imageDefaults.functions.createContent;
        this.classes.content = options && options.classes && options.classes.content ? this.classes.content : this.imageDefaults.classes.content;
    }

    /**
     * Static function to thumbnail
     *
     * @param source
     * @param className
     */
    protected static createImage(source: string, className: string): HTMLElement {
        return elementFactory('img', {
            className: className,
            src: source
        });
    }
}
