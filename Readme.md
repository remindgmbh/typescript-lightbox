# REMIND - LIGHTBOX

[travis-img]: https://img.shields.io/travis/remindgmbh/typescript-lightbox.svg?style=flat-square
[codecov-img]: https://img.shields.io/codecov/c/github/remindgmbh/typescript-lightbox.svg?style=flat-square
[github-issues-img]: https://img.shields.io/github/issues/remindgmbh/typescript-lightbox.svg?style=flat-square
[contrib-welcome-img]: https://img.shields.io/badge/contributions-welcome-blue.svg?style=flat-square
[license-img]: https://img.shields.io/github/license/remindgmbh/typescript-lightbox.svg?style=flat-square

[![travis-img]](https://travis-ci.com/github/remindgmbh/typescript-lightbox)
[![codecov-img]](https://codecov.io/gh/remindgmbh/typescript-lightbox)
[![github-issues-img]](https://github.com/remindgmbh/typescript-lightbox/issues)
[![contrib-welcome-img]](https://github.com/remindgmbh/typescript-lightbox/blob/master/CONTRIBUTING.md)
[![license-img]](https://github.com/remindgmbh/typescript-lightbox/blob/master/LICENSE)

Does whatever a lightbox does.

--------------------------------------------------------------------------------

## Table of contents

- [Authors](#Authors)
- [Installation](#Installation)
- [Usage](#Usage)

--------------------------------------------------------------------------------
## Authors
- REMIND GmbH - <technik@remind.de>
- Michael Didion - <m.didion@remind.de>

--------------------------------------------------------------------------------

## Installation

Zum Einbinden des TypeScript Moduls muss folgende Abhängigkeit in den Dependencies
einer package.json eingetragen werden.

```npm i @remindgmbh/typescript-lightbox```

--------------------------------------------------------------------------------

## Usage

### Lightbox

```typescript
import { Lightbox } from '@remindgmbh/typescript-lightbox'

let lightbox: Lightbox = new Lightbox('<div>Ein Html string</div>');
// Attach html to dochument body
lightbox.attach();
// Change source
lightbox.setSource('<div>Ein anderer HTML string</div>');
// Detach html from dochument body
lightbox.detach();
```

#### Output

```html
<div class="remind-lightbox">
	<div class="remind-lightbox__header">
		<div class="remind-lightbox__close-button"></div>
	</div>

	<div class="remind-lightbox__canvas">
		<div class="remind-lightbox__content">
			<!--html string-->
			<div>Ein anderer Html string</div>
		</div>
	</div>

	<div class="remind-lightbox__footer"></div>
</div>

```

#### Parameters
| Parameter     | Type    | Default                           | Description                                                   |
| ------------- | ------- | --------------------------------- | ------------------------------------------------------------- |
| html        | string  | ```''```                          | Ein Html String der ausgeben wird                             |
| options       | object  | {classes: {...}, functions: {...}}| Zum Überschreiben von CSS-Classes und Funktion für die Ausgabe|

#### Functions
| Parameter         | Type                                                   |
| ------------      | ------------------------------------------------------ |
| createCanvas      | (className: string) => HtmlElement                     |
| createFooter      | (className: string) => HtmlElement                     |
| createHeader      | (className: string) => HtmlElement                     |
| createCloseButton | (className: string) => HtmlElement                     |
| createContent     | (htmlString: string, className: string) => HtmlElement |

#### CSS Classes
| Parameter|Default|
| ----------- | ----------------------------- |
| lightbox    | remind-lightbox               |
| canvas      | remind-lightbox__canvas       |
| header      | remind-lightbox__header       |
| footer      | remind-lightbox__footer       |
| content     | remind-lightbox__content      |
| closeButton | remind-lightbox__close-button |

#### Example

```typescript
import { Lightbox } from '@remindgmbh/typescript-lightbox'

let lightbox: Lightbox = new Lightbox(
	'<div>Ein Html string</div>',
	{
		classes: {
			footer: 'custom-content-class'
		},
		functions: {
			createContent: (htmlString, className) => {
				let html = document.createElement('span');
				html.classList.add(className);
				html.innerHtml = htmlString;
				return html;
			}
		}
	}
);
// Create html
lightbox.create();
// Attach html to dochument body
lightbox.attach();
// Detach html from dochument body
lightbox.detach();
```

#### Output

```html
<div class="remind-lightbox">
	<div class="remind-lightbox__header">
		<div class="remind-lightbox__close-button"></div>
	</div>

	<div class="remind-lightbox__canvas">
		<span class="custom-content-class">
			<!--html string-->
			<div>Ein Html string</div>
		</div>
	</div>

	<div class="remind-lightbox__footer"></div>
</div>
```

--------------------------------------------------------------------------------

### LightboxImage

#### Parameters
| Parameter     | Type    | Default                           | Description                                                   |
| ------------- | ------- | --------------------------------- | ------------------------------------------------------------- |
| item        | LightboxItem  | ```{image: '', headline: '', text: ''}``` | Pfad zur Bild Datei, Überschrift und Text zum Bild |
| options       | object  | {classes: {...}, functions: {...}}| Zum Überschreiben von CSS-Classes und Funktion für die Ausgabe|

#### Functions
| Parameter        | Type                                                                                                                |
| ------------     | ------------------------------------------------------------------------------------------------------------------- |
| ...              | ...                                                                                                                 |
| createImage    | createImage: (item: LightboxItem, classNameOuter: string, classNameImage: string, classNameHeadline: string, classNameText: string) => HTMLElement                                                       |

--------------------------------------------------------------------------------

### LightboxGallery

#### Additional Public Methods
| Method                              | Description                                              |
| ----------------------------------  | -------------------------------------------------------- |
| next(): void                        | Setze das nächste Bild in den sources als aktives Bild   |
| prev(): void                        | Setze das vorherige Bild in den sources als aktives Bild |
| setItems(items: LightboxItem[]): void | Setze neue Items                                       |
| setItem(item: LightboxItem): void | Setze ausgwähltes Item                                     |

#### Parameters
| Parameter     | Type     | Default                           | Description                                                   |
| ------------- | -------  | --------------------------------- | ------------------------------------------------------------- |
| item        | LightboxItem   | ```{image: '', headline: '', text: ''}```                         | Pfad zur Bild Datei, Überschrift und Text zum Bild |
| items       | LightboxItem[] | ```[]```                          |  |
| options       | object   | {showThumbnails: false, showPagination: false, classes: {...}, functions: {...}}| Erweitert um die Optionen zur Anzeige der Thumbnails und der Pagination |

#### Functions
| Parameter        | Type                                                                                                                |
| ------------     | ------------------------------------------------------------------------------------------------------------------- |
| ...              | ...                                                                                                                 |
| createThumbnails | (className: string) => HtmlElement                                                                                  |
| createThumbnail  | (source: string, className: string) => HTMLElement                                                                  |
| createPagination | (index: number, maxIndex: number, className: string, classNameCurrent: string, classNameMax: string) => HTMLElement |
| createNext       | (className: string) => HtmlElement                                                                                  |
| createPrev       | (className: string) => HtmlElement                                                                                  |

#### CSS Classes
| Parameter         | Default                       |
| ----------------- | ----------------------------- |
| thumbnails        | remind-lightbox__thumbnails   |
| thumbnail         | remind-lightbox__thumbnail    |
| pagination        | remind-lightbox__pagination   |
| paginationCurrent | remind-lightbox__current      |
| paginationMax     | remind-lightbox__max          |
| next              | remind-lightbox__next         |
| prev              | remind-lightbox__prev         |

#### Example

```html
<div class="remind-lightbox">
	<div class="remind-lightbox__header">
		<div class="remind-lightbox__counter">
			<span class="remind-lightbox__current">###index###</span>
			<span class="remind-lightbox__max">###maxIndex###</span>
		</div>
		<div class="remind-lightbox__close-button"></div>
	</div>
	<div class="remind-lightbox__canvas">
        <div class="remind-lightbox__prev"/>
        <div class="remind-lightbox__content">
	    <img class="remind-lightbox__image"	src="###item.image###"/>
            <h2 class="remind-lightbox__headline">###item.headline###</h2>
            <span class="remind-lightbox__text">###item.text###</span>
        </div>
        <div class="remind-lightbox__prev"/>
	</div>
	<div class="remind-lightbox__footer">
		<div class="remind-lightbox__thumbnails">
			<img class="remind-lightbox__thumbnail" src="###item.image###" data="###item###">
			<img class="remind-lightbox__thumbnail" src="###item.image###" data="###item###">
			<img class="remind-lightbox__thumbnail" src="###item.image###" data="###item###">
			<img class="remind-lightbox__thumbnail" src="###item.image###" data="###item###">
			...
		</div>
	</div>
</div>

```
