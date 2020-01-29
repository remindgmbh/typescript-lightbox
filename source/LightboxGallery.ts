import {elementFactory} from "@remindgmbh/util";
import {LightboxFunctions, Overrideables} from "./Lightbox";
import {LightboxImage, LightboxItem} from "./LightboxImage";

export interface LightboxGalleryFunctions extends LightboxFunctions {
    createThumbnails: (className: string) => HTMLElement,
    createThumbnail: (src: string, className: string, data?: { [key: string]: string }) => HTMLElement,
    createPagination: (index: number, maxIndex: number, className: string, classNameCurrent: string, classNameMax: string) => HTMLElement,
    createNext: (className: string) => HTMLElement,
    createPrev: (className: string) => HTMLElement
}

export interface LightboxGalleryOverrideables extends Overrideables {
    showThumbnails: boolean,
    showPagination: boolean,
    functions: Partial<LightboxGalleryFunctions>
}

export class LightboxGallery extends LightboxImage {
    private readonly CLASS_THUMBNAILS: string = 'remind-lightbox__thumbnails';
    private readonly CLASS_THUMBNAIL: string = 'remind-lightbox__thumbnail';
    private readonly CLASS_THUMBNAIL_ACTIVE: string = 'active';
    private readonly CLASS_PAGINATION: string = 'remind-lightbox__pagination';
    private readonly CLASS_PAGINATION_CURRENT: string = 'remind-lightbox__current';
    private readonly CLASS_PAGINATION_MAX: string = 'remind-lightbox__max';
    private readonly CLASS_NEXT: string = 'remind-lightbox__next';
    private readonly CLASS_PREV: string = 'remind-lightbox__prev';

    protected functionsGalleryExtended: LightboxGalleryFunctions;

    protected index: number = 0;
    protected items: LightboxItem[] = [];
    protected showThumbnails: boolean = true;
    protected showPagination: boolean = true;

    protected pagination: HTMLElement | null = null;
    protected thumbnails: HTMLElement | null = null;

    constructor(item: Partial<LightboxItem> = {}, sources: LightboxItem[] = [], options?: Partial<LightboxGalleryOverrideables>) {
        super(item, options);

        this.items = Array.from(new Set(sources));
        this.showThumbnails = options && !options.showThumbnails && options.showThumbnails != undefined ? options.showThumbnails : this.showThumbnails;
        this.showPagination = options && !options.showPagination && options.showPagination != undefined ? options.showPagination : this.showPagination;

        this.item = item ? {...this.item, ...item} : {...this.item, ...this.items[0]};

        this.index = this.getIndexByItem(this.item);

        this.classes = Object.assign({
            thumbnails: this.CLASS_THUMBNAILS,
            thumbnail: this.CLASS_THUMBNAIL,
            thumbnailActive: this.CLASS_THUMBNAIL_ACTIVE,
            pagination: this.CLASS_PAGINATION,
            paginationCurrent: this.CLASS_PAGINATION_CURRENT,
            paginationMax: this.CLASS_PAGINATION_MAX,
            next: this.CLASS_NEXT,
            prev: this.CLASS_PREV
        }, this.classes);

        this.functionsGalleryExtended = Object.assign({
            createThumbnails: LightboxImage.createElement,
            createThumbnail: LightboxImage.createImageElement,
            createPagination: LightboxGallery.createPagination,
            createNext: LightboxImage.createElement,
            createPrev: LightboxImage.createElement
        }, this.functionsImageExtended);
    }

    /**
     * Override create method and set initial active thumbnail
     */
    protected create(): void {
        super.create();

        this.setActiveThumbnail();
    }

    /**
     * Override bind events
     * Add click on thumbnail to switch gallery image
     * Add click on next / prev element
     */
    protected bindEvents(): void {
        super.bindEvents();

        if (!this.container) {
            return;
        }

        let thumbnails: NodeListOf<HTMLElement>
            = this.container.querySelectorAll(LightboxImage.getClassSelector(this.classes.thumbnail));

        for (let i: number = 0; i < thumbnails.length; i++) {
            let thumbnail: HTMLElement = thumbnails.item(i);
            let {image, headline, text}  = thumbnail.dataset;
            headline = headline ? headline : '';
            text = text ? text : '';

            if (image) {
                thumbnail.addEventListener('click', this.setItem.bind(this, {image: image, headline: headline, text: text}));
            }
        }

        let next: HTMLElement | null = this.container.querySelector(LightboxImage.getClassSelector(this.classes.next));
        if (next) {
            next.addEventListener('click', this.next.bind(this));
        }

        let prev: HTMLElement | null = this.container.querySelector(LightboxImage.getClassSelector(this.classes.prev));
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
            this.pagination = this.functionsGalleryExtended.createPagination(
                (this.index + 1),
                this.items.length,
                this.classes.pagination,
                this.classes.paginationCurrent,
                this.classes.paginationMax);

            LightboxImage.prependToClass(this.header, this.classes.header, this.pagination);
        }
    }

    /**
     * Override build canvas
     * Add next / prev element
     */
    protected buildCanvas(): void {
        super.buildCanvas();

        if (this.content) {
            let next: HTMLElement = this.functionsGalleryExtended.createNext(this.classes.next);
            this.content.after(next);

            let prev: HTMLElement = this.functionsGalleryExtended.createNext(this.classes.prev);
            this.content.before(prev);
        }
    }

    /**
     * Override build footer
     * Add conditional thumbnails
     */
    protected buildFooter(): void {
        super.buildFooter();

        if (this.showThumbnails) {
            this.thumbnails = this.functionsGalleryExtended.createThumbnails(this.classes.thumbnails);

            for (let index: number = 0; index < this.items.length; index++) {
                if (!this.items[index].image) {
                    return;
                }

                let thumbnail: HTMLElement = this.functionsGalleryExtended.createThumbnail(
                    this.items[index].image,
                    this.classes.thumbnail,
                    {
                        image: this.items[index].image,
                        headline: this.items[index].headline,
                        text: this.items[index].text
                    });

                LightboxImage.appendToClass(this.thumbnails, this.classes.thumbnails, thumbnail);
            }

            LightboxImage.appendToClass(this.footer, this.classes.footer, this.thumbnails);
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
     * @param item
     * @return number
     */
    private getIndexByItem(item: LightboxItem): number {
        if (!item.image) {
            return -1;
        }

        for (let i: number = 0; i < this.items.length; i++) {
            if (this.items[i].image === item.image) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @param index
     * @return string
     */
    private getItemByIndex(index: number): LightboxItem {
        return this.items[index];
    }

    /**
     * Add active class to active thumbnail
     */
    protected setActiveThumbnail(): void {
        if (!this.container) {
            return;
        }

        let activeThumbnail: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.thumbnail) + '.' + this.classes.thumbnailActive);
        if (activeThumbnail) {
            activeThumbnail.classList.remove(this.classes.thumbnailActive);
        }

        let thumbnails: NodeListOf<HTMLElement>
            = this.container.querySelectorAll(LightboxImage.getClassSelector(this.classes.thumbnail));

        for (let i: number = 0; i < thumbnails.length; i++) {
            let thumbnail: HTMLElement = thumbnails.item(i);

            if (thumbnail.dataset['image'] && thumbnail.dataset['image'] == this.item.image) {
                thumbnail.classList.add(this.classes.thumbnailActive);
                return;
            }
        }
    }

    /**
     * Check for next source
     * Set source and index
     */
    public next(): void {
        let index = this.index + 1;
        if (index >= this.items.length) {
            return;
        }

        let item: LightboxItem = this.getItemByIndex(index);
        this.setItem(item);
    }

    /**
     * Check for previous source
     * Set source and index
     */
    public prev(): void {
        let index = this.index - 1;
        if (index < 0) {
            return;
        }

        let item: LightboxItem = this.getItemByIndex(index);
        this.setItem(item);
    }

    /**
     * Set image source and index
     *
     * @param item
     */
    public setItem(item: LightboxItem): void {
        this.item = item;
        this.index = this.getIndexByItem(item);

        if (!this.container) {
            return;
        }

        this.setActiveThumbnail();

        let counter: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.paginationCurrent));
        if (counter) {
            counter.innerText = String(this.index + 1);
        }

        let image: HTMLImageElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.image));
        if (!(image instanceof HTMLImageElement)) {
            return;
        }

        let headline: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.headline));
        if (!headline) {
            return;
        }

        headline.innerText = this.item.headline;

        let text: HTMLElement | null
            = this.container.querySelector(LightboxImage.getClassSelector(this.classes.text));
        if (!text) {
            return;
        }

        text.innerText = this.item.text;
    }

    /**
     * Set sources
     *
     * @param items
     */
    public setItems(items: LightboxItem[]): void {
        /* [...new Set(Array)] removes duplicates from array */
        this.items = Array.from(new Set(items));
        this.setItem(items[0]);

        let html: HTMLElement | null = document.body.querySelector(LightboxImage.getClassSelector(this.classes.lightbox));
        if (html) {
            this.detach();
            this.attach();
        }
    }
}
