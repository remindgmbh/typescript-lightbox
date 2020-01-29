// import { expect } from 'chai'
// import { LightboxGallery } from '../source/LightboxGallery'

// describe('LightboxGallery public methods', () => {
    // const sources: string[] = [
    //   '/apple.png',
    //   '/banana.png',
    //   '/orange.png',
    //   '/potato.png'
    // ]
    //
    // const lightboxGallery1: LightboxGallery = new LightboxGallery()
    //
    // it('should set orange.png as lightbox image before attach', () => {
    //
    //     const source: string = sources[2]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.setSource(source)
    //
    //     lightboxGallery1.attach()
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(source)
    // })
    //
    // it('should set orange.png as lightbox image after attach', () => {
    //
    //     const source: string = sources[2]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.attach()
    //
    //     lightboxGallery1.setSource(source)
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(source)
    // })
    //
    // it('set first image as lightbox image and should go to next image', () => {
    //
    //     const source: string = sources[0]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.setSource(source)
    //
    //     lightboxGallery1.attach()
    //
    //     lightboxGallery1.next()
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(sources[1])
    // })
    //
    // it('set first image as lightbox image and should not go to next image', () => {
    //
    //     const source: string = sources[3]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.setSource(source)
    //
    //     lightboxGallery1.attach()
    //
    //     lightboxGallery1.next()
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(sources[3])
    // })
    //
    // it('set last image as lightbox image and should go to previous image', () => {
    //
    //     const source: string = sources[3]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.setSource(source)
    //
    //     lightboxGallery1.attach()
    //
    //     lightboxGallery1.prev()
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(sources[2])
    // })
    //
    // it('set first image as lightbox image and should not go to previous image', () => {
    //
    //     const source: string = sources[0]
    //
    //     lightboxGallery1.setSources(sources)
    //     lightboxGallery1.setSource(source)
    //
    //     lightboxGallery1.attach()
    //
    //     lightboxGallery1.prev()
    //
    //     const lightboxImageElem: HTMLImageElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__image')
    //
    //     const result: string = lightboxImageElem instanceof HTMLImageElement ? lightboxImageElem.src : ''
    //
    //     lightboxGallery1.detach()
    //
    //     expect(result).to.equal(sources[0])
    // })
// })

// describe('LightboxGallery display options', () => {
    // const sources: string[] = [
    //     '/apple.png',
    //     '/banana.png',
    //     '/orange.png',
    //     '/potato.png'
    // ]

    // const lightboxGallery2: LightboxGallery = new LightboxGallery('/orange.png', sources, {
    //     showPagination: false,
    //     showThumbnails: false
    // })

    // it('lightbox should not render a pagination', () => {
    //
    //     lightboxGallery2.attach()
    //
    //     const result: number = document.body.querySelectorAll('.remind-lightbox__pagination').length
    //
    //     lightboxGallery2.detach()
    //
    //     expect(result).to.equal(0)
    // })
    //
    // it('lightbox should not render a thumbnails', () => {
    //
    //     lightboxGallery2.attach()
    //
    //     const result: number = document.body.querySelectorAll('.remind-lightbox__thumbnails').length
    //
    //     lightboxGallery2.detach()
    //
    //     expect(result).to.equal(0)
    // })
// })
