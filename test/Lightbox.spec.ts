import { expect } from 'chai'
import { Lightbox } from '..'
import jsdomGlobal from 'jsdom-global'

describe('Lightbox', function () {

    this.beforeEach(() => {
        jsdomGlobal()
    })

    it('should constructor parameter override header class name', () => {

        const testHeaderClassName: string = 'testHeader'

        const lightbox: Lightbox = new Lightbox('', {
            classes: {
                header: testHeaderClassName
            }
        })

        lightbox.attach()

        const result: number = document.body.querySelectorAll('.remind-lightbox .' + testHeaderClassName).length

        expect(result).to.equal(1)
    })

    it('should constructor parameter override footer rendering function', () => {

        const lightbox: Lightbox = new Lightbox('', {
            functions: {
                createFooter: (className) => {
                    let footer = document.createElement('span')
                    footer.classList.add(className)
                    return footer
                }
            }
        })

        lightbox.attach()

        const result: HTMLElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__footer')

        expect(result).to.be.an.instanceof(HTMLSpanElement)
    })

    it('should attach lightbox html to document', () => {

        const lightbox: Lightbox = new Lightbox()

        lightbox.attach()

        const result: number = document.body.querySelectorAll('.remind-lightbox').length

        expect(result).to.equal(1)
    })

    it('should attach and detach lightbox html from document', () => {

        const lightbox: Lightbox = new Lightbox()

        lightbox.attach()

        const preResult: number = document.body.querySelectorAll('.remind-lightbox').length

        expect(preResult).to.equal(1)

        lightbox.detach()

        const postResult: number = document.body.querySelectorAll('.remind-lightbox').length

        expect(postResult).to.equal(0)
    })

    it('should attach lightbox html to document only once', () => {

        const lightbox: Lightbox = new Lightbox()

        lightbox.attach()
        lightbox.attach()

        const result: number = document.body.querySelectorAll('.remind-lightbox').length

        lightbox.detach()

        expect(result).to.equal(1)
    })

})
