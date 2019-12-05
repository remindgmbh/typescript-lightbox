import {elementFactory} from "@remindgmbh/util";
import {Lightbox, Overrideables} from "./Lightbox";

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    protected readonly CLASS_CONTENT: string = 'remind-lightbox__image';

    protected source: string = '';

    protected static imageDefaults: Partial<Overrideables> = {
        classes: {
            content: 'remind-lightbox__image'
        },
        functions: {
            createContent: LightboxImage.createImage
        }
    };

    constructor(source: string = '', options: Partial<Overrideables> = {}) {
        super(source, Object.assign(LightboxImage.imageDefaults, options));
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
