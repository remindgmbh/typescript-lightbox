import {elementFactory} from "@remindgmbh/util";
import {Lightbox, LightboxFunctions, LightboxOptions} from "./Lightbox";

export interface LightboxImageFunctions extends LightboxFunctions {
    createImage: (source: string, className: string) => HTMLElement
}

export interface LightboxImageOptions extends LightboxOptions {
    functions: Partial<LightboxImageFunctions>
}

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    private readonly CLASS_IMAGE: string = 'remind-lightbox__image';

    protected image: HTMLElement;
    protected source: string = '';

    protected functions: LightboxImageFunctions;

    constructor(source: string, options?: Partial<LightboxImageOptions>) {
        super(options);

        this.source = source;

        /* Add css image class */
        this.classes = Object.assign({
            image: this.CLASS_IMAGE
        }, this.classes);

        /* Add image rendering function */
        this.functions = Object.assign({
            createImage: LightboxImage.createImage,
        }, this.functions);
    }

    /**
     * Create canvas
     * Add image to canvas
     */
    protected buildCanvas(): void {
        super.buildCanvas();

        this.image = this.functions.createImage(this.source, this.classes.image);
        this.canvas.append(this.image);
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

    /**
     * Update image source
     *
     * @param source
     */
    public setSource(source: string): void {
        this.source = source;
    }
}
