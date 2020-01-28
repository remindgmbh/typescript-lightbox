# REMIND - LIGHTBOX

Diese Extension erweitert die rmnd_vehicles um LUEG-Spezifische Logiken.
Typescript Modul für die Ausgabe von Lightboxen

![remind-badge](https://img.shields.io/badge/author-REMIND-black.svg?style=flat-square)
![typescript-badge](https://img.shields.io/badge/TypeScript-3.7.2-green.svg?style=flat-square)
![license-badge](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg?style=flat-square)
![version-badge](https://img.shields.io/badge/version-1.1.0-lightgrey.svg?style=flat-square)

--------------------------------------------------------------------------------

## Table of contents

- [Autoren](#autoren)
- [Abhängigkeiten](#voraussetzungen)
- [Installation](#installation)
- [Benutzung](#benutzung)

--------------------------------------------------------------------------------
## Autor
- REMIND GmbH - <technik@remind.de>
- Michael Didion - <m.didion@remind.de>

--------------------------------------------------------------------------------

## Abhängigkeiten

- [rmnd-util](https://bitbucket.org/remindgmbh/remind-util/)

--------------------------------------------------------------------------------

## Installation

Zum Einbinden des TypeScript Moduls muss folgende Abhängigkeit in den Dependencies
einer package.json eingetragen werden.

```"@remindgmbh/lightbox": "git+ssh://git@bitbucket.org:remindgmbh/remind-lightbox.git#1.1.0"```

--------------------------------------------------------------------------------

## Benutzung 
### Lightbox

```
let lightbox: Lightbox = new Lightbox('<div>Ein Html string</div>');
// Attach html to dochument body
lightbox.attach();
// Change source
lightbox.setSource('<div>Ein anderer HTML string</div>');
// Detach html from dochument body
lightbox.detach();
```
#### Ausgabe 
```
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

#### Parameter
| Parameter     | Type    | Default                           | Description                                                   |
| ------------- | ------- | --------------------------------- | ------------------------------------------------------------- |
| source        | string  | ```''```                          | Ein Html String der ausgeben wird                             |
| options       | object  | {classes: {...}, functions: {...}}| Zum Überschreiben von CSS-Classes und Funktion für die Ausgabe|

#### Funktionen 
| Parameter         | Type                                                   |
| ------------      | ------------------------------------------------------ |
| createCanvas      | (className: string) => HtmlElement                     |
| createFooter      | (className: string) => HtmlElement                     |
| createHeader      | (className: string) => HtmlElement                     |
| createCloseButton | (className: string) => HtmlElement                     |
| createContent     | (htmlString: string, className: string) => HtmlElement |

#### CSS Klassen 
| Parameter|Default|
| ----------- | ----------------------------- |
| lightbox    | remind-lightbox               |
| canvas      | remind-lightbox__canvas       |
| header      | remind-lightbox__header       |
| footer      | remind-lightbox__footer       |
| content     | remind-lightbox__content      |
| closeButton | remind-lightbox__close-button |

#### Beispiel

```
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
#### Ausgabe 
```
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
### LightboxImage
#### Parameter
| Parameter     | Type    | Default                           | Description                                                   |
| ------------- | ------- | --------------------------------- | ------------------------------------------------------------- |
| source        | string  | ```''```                          | Pfad zur Bild Datei                                           |
| options       | object  | {classes: {...}, functions: {...}}| Zum Überschreiben von CSS-Classes und Funktion für die Ausgabe|

#### Funktionen 
| Parameter        | Type                                                                                                                |
| ------------     | ------------------------------------------------------------------------------------------------------------------- |
| ...              | ...                                                                                                                 |
| createContent    | (imgString: string, className: string) => HtmlElement                                                               |

### LightboxGallery

#### Zusätzliche öffentliche Methoden
| Method                              | Description                                              |
| ----------------------------------  | -------------------------------------------------------- |
| next(): void                        | Setze das nächste Bild in den sources als aktives Bild   |
| prev(): void                        | Setze das vorherige Bild in den sources als aktives Bild |
| setSources(sources: string[]): void | Setze neue sources                                       |

#### Parameter
| Parameter     | Type     | Default                           | Description                                                   |
| ------------- | -------  | --------------------------------- | ------------------------------------------------------------- |
| source        | string   | ```''```                          | Pfad zur Bild Datei, Erstes Bild was ausgeben wird (Fallback erstes bild von sources) |
| sources       | string[] | ```''```                          | Pfad zur Bild Datei                                           |
| options       | object   | {showThumbnails: false, showPagination: false, classes: {...}, functions: {...}}| Erweitert um die Optionen zur Anzeige der Thumbnails und der Pagination |

#### Funktionen 
| Parameter        | Type                                                                                                                |
| ------------     | ------------------------------------------------------------------------------------------------------------------- |
| ...              | ...                                                                                                                 |
| createThumbnails | (className: string) => HtmlElement                                                                                  |
| createThumbnail  | (source: string, className: string) => HTMLElement                                                                  |
| createPagination | (index: number, maxIndex: number, className: string, classNameCurrent: string, classNameMax: string) => HTMLElement |
| createNext       | (className: string) => HtmlElement                                                                                  |
| createPrev       | (className: string) => HtmlElement                                                                                  |

#### CSS Klassen 
| Parameter         | Default                       |
| ----------------- | ----------------------------- |
| thumbnails        | remind-lightbox__thumbnails   |
| thumbnail         | remind-lightbox__thumbnail    |
| pagination        | remind-lightbox__pagination   |
| paginationCurrent | remind-lightbox__current      |
| paginationMax     | remind-lightbox__max          |
| next              | remind-lightbox__next         |
| prev              | remind-lightbox__prev         |

#### Beispiel

```
<div class="remind-lightbox">
	<div class="remind-lightbox__header">
		<div class="remind-lightbox__counter">
			<span class="remind-lightbox__current">###index###</span>
			<span class="remind-lightbox__max">###maxIndex###</span>
		</div>
		<div class="remind-lightbox__close-button"></div>
	</div>
	<div class="remind-lightbox__canvas">
		<img class="remind-lightbox__image"	source="###source###">
	</div>
	<div class="remind-lightbox__footer">
		<div class="remind-lightbox__thumbnails">
			<img class="remind-lightbox__thumbnail" src="###source###">
			<img class="remind-lightbox__thumbnail" src="###source###">
			<img class="remind-lightbox__thumbnail" src="###source###">
			<img class="remind-lightbox__thumbnail" src="###source###">
			...
		</div>
	</div>
</div>

```
