import {elementFactory} from "@remindgmbh/util";
import {LightboxFunctions, Overrideables} from "./Lightbox";
import {LightboxImage} from "./LightboxImage";

export interface LightboxGalleryFunctions extends LightboxFunctions {
    createThumbnails: (className: string) => HTMLElement,
    createThumbnail: (source: string, className: string) => HTMLElement,
    createPagination: (index: number, maxIndex: number, className: string, classNameCurrent: string, classNameMax: string) => HTMLElement,
    createNext: (className: string) => HTMLElement,
    createPrev: (className: string) => HTMLElement
}

export interface LightboxGalleryOptions extends Overrideables{
    showThumbnails: boolean,
    showPagination: boolean,
    functions: Partial<LightboxGalleryFunctions>
}

export class LightboxGallery extends LightboxImage {
    private readonly CLASS_THUMBNAILS: string = 'remind-lightbox__thumbnails';
    private readonly CLASS_THUMBNAIL: string = 'remind-lightbox__thumbnail';
    private readonly CLASS_PAGINATION: string = 'remind-lightbox__pagination';
    private readonly CLASS_PAGINATION_CURRENT: string = 'remind-lightbox__current';
    private readonly CLASS_PAGINATION_MAX: string = 'remind-lightbox__max';
    private readonly CLASS_NEXT: string = 'remind-lightbox__next';
    private readonly CLASS_PREV: string = 'remind-lightbox__prev';

    protected functions: LightboxGalleryFunctions;

    protected index: number = 0;
    protected sources: string[] = [];
    protected showThumbnails: boolean = false;
    protected showPagination: boolean = false;

    protected pagination: HTMLElement;
    protected thumbnails: HTMLElement;

    constructor(source: string = '', sources: string[] = [], options?: Partial<LightboxGalleryOptions>) {
        super(source, options);

        this.sources = sources;
        this.showThumbnails = options && options.showThumbnails ? options.showThumbnails : false;
        this.showPagination = options && options.showPagination ? options.showPagination : false;

        this.source = source ? source : this.sources[0];
        this.index = this.getIndexBySource(this.source);

        this.classes = Object.assign({
            thumbnails: this.CLASS_THUMBNAILS,
            thumbnail: this.CLASS_THUMBNAIL,
            pagination: this.CLASS_PAGINATION,
            paginationCurrent: this.CLASS_PAGINATION_CURRENT,
            paginationMax: this.CLASS_PAGINATION_MAX,
            next: this.CLASS_NEXT,
            prev: this.CLASS_PREV
        }, this.classes);

        this.functions = Object.assign({
            createThumbnails: LightboxImage.createElement,
            createThumbnail: LightboxImage.createImage,
            createPagination: LightboxGallery.createPagination,
            createNext: LightboxImage.createElement,
            createPrev: LightboxImage.createElement
        }, this.functions);
    }

    /**
     * Override bind events
     * Add click on thumbnail to switch gallery image
     * Add click on next / prev element
     */
    protected bindEvents(): void {
        super.bindEvents();

        let thumbnails: NodeListOf<HTMLElement>
            = this.container.querySelectorAll(LightboxImage.getClassSelector(this.classes.thumbnail));

        for (let i: number = 0; i < thumbnails.length; i++) {
            let thumbnail: HTMLElement = thumbnails.item(i);

            let src: string = thumbnail instanceof HTMLImageElement ? thumbnail.src : '';

            if (!src) {
                let thumbnailImage: HTMLImageElement | null = thumbnail.querySelector('img');
                src = thumbnailImage instanceof HTMLImageElement ? thumbnailImage.src : '';
            }

            if (src) {
                thumbnail.addEventListener('click', this.setSource.bind(this, src));
            }
        }

        let next: HTMLElement | null = this.container.querySelector(LightboxImage.getClassSelector(this.classes.next));
        if (next) {
            next.addEventListener('click', this.next.bind(this));
        }

        let prev: HTMLElement | null = this.container.querySelector(LightboxImage.getClassSelector(this.classes.next));
        if (prev) {
            prev.addEventListener('click', this.prev.bind(this));
        }
    }

    /**
     * Override build header
     * Add conditional pagination
     */
    protected buildHeader(): void {
        super.buildHeader();

        if (this.showPagination) {
            this.pagination = this.functions.createPagination(
                (this.index + 1),
                this.sources.length,
                this.classes.pagination,
                this.classes.paginationCurrent,
                this.classes.paginationMax);

            this.header.prepend(this.pagination);
        }
    }

    /**
     * Override build footer
     * Add conditional thumbnails
     */
    protected buildFooter(): void {
        super.buildFooter();

        if (this.showThumbnails) {
            this.thumbnails = this.functions.createThumbnails(this.classes.thumbnails);

            for (let index: number = 0; index < this.sources.length; index++) {
                let thumbnail: HTMLElement = this.functions.createThumbnail(
                    this.sources[index],
                    this.classes.thumbnail);

                this.thumbnails.append(thumbnail);
            }

            this.footer.append(this.thumbnails);
        }
    }

    /**
     * Static function to create pagination
     *
     * @param index
     * @param maxIndex
     * @param className
     * @param classNameCurrent
     * @param classNameMax
     */
    protected static createPagination(index: number, maxIndex: number, className: string, classNameCurrent: string, classNameMax: string): HTMLElement {
        let pagination: HTMLElement = elementFactory('div', {
            className: className
        });

        let current: HTMLElement = elementFactory('span', {
            className: classNameCurrent,
            innerText: String(index)
        });
        pagination.append(current);

        let max: HTMLElement = elementFactory('span', {
            className: classNameMax,
            innerText: String(maxIndex)
        });
        pagination.append(max);

        return pagination;
    }

    /**
     * @param source
     * @return number
     */
    private getIndexBySource(source: string): number {
        return this.sources.indexOf(source);
    }

    /**
     * @param index
     * @return string
     */
    private getSourceByIndex(index: number): string {
        return this.sources[index];
    }

    /**
     * Check for next source
     * Set source and index
     */
    public next(): void {
        let index = this.index + 1;
        if (index < this.sources.length) {
            return;
        }

        let src: string = this.getSourceByIndex(index);
        this.setSource(src);
    }

    /**
     * Check for previous source
     * Set source and index
     */
    public prev(): void {
        let index = this.index - 1;
        if (index > 0) {
            return;
        }

        let src: string = this.getSourceByIndex(index);
        this.setSource(src);
    }

    /**
     * Set image source and index
     *
     * @param source
     */
    public setSource(source: string): void {
        this.source = source;
        this.index = this.getIndexBySource(source);

        let counter: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.paginationCurrent));
        if (counter) {
            counter.innerText = String(this.index + 1);
        }

        let image: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.image));
        if (!image) {
            return;
        }

        if (image instanceof HTMLImageElement) {
            image.src = this.source;
            return;
        }

        image = image.querySelector('img');
        if (image && image instanceof HTMLImageElement) {
            image.src = this.source;
        }
    }
}
