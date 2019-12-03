import {elementFactory} from "@remindgmbh/util";
import {Lightbox, LightboxOptions} from "./Lightbox";

/**
 * LightboxImage - Light box with a single image
 */
export class LightboxImage extends Lightbox {
    private readonly CLASS_IMAGE: string = 'remind-lightbox__image';

    protected image: HTMLElement;
    protected source: string = '';

    constructor(source: string, options?: Partial<LightboxOptions>) {
        super(options);

        this.source = source;

        this.classes = Object.assign({
            image: this.CLASS_IMAGE
        }, this.classes);

        this.functions = Object.assign({
            createImage: elementFactory,
        }, this.functions);
    }

    protected createCanvas(): void {
        super.createCanvas();

        this.image = this.functions.createImage('img', {className: this.classes.image, src: this.source});
        this.canvas.appendChild(this.image);
    }

    public setSource(source: string): void {
        this.source = source;
    }
}
