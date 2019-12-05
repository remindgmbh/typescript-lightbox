import {elementFactory} from "@remindgmbh/util";
import {Lightbox, Overrideables} from "./Lightbox";

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    protected readonly CLASS_CONTENT: string = 'remind-lightbox__image';

    protected source: string = '';

    constructor(source: string, options?: Partial<Overrideables>) {
        super(source, options);

        /* Override content rendering function */
        if (options && options.functions && options.functions.createContent) {
            this.functions.createContent = LightboxImage.createImage
        }
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
