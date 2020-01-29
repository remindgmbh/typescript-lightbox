// import { expect } from 'chai'
// import { Lightbox } from '../source/Lightbox'
//
// describe('Lightbox', () => {
//     const testHeaderClassName: string = 'testHeader';
//
//     const lightbox: Lightbox = new Lightbox('', {
//         classes: {
//             header: testHeaderClassName
//         },
//         functions: {
//             createFooter: (className) => {
//                 let footer = document.createElement('span')
//                 footer.classList.add(className)
//                 return footer
//             }
//         }
//     })
//
//     it('should constructor parameter override header class name', () => {
//         lightbox.attach()
//
//         const result: number = document.body.querySelectorAll('.remind-lightbox .' + testHeaderClassName).length
//
//         lightbox.detach()
//
//         expect(result).to.equal(1)
//     })
//
//     it('should constructor parameter override footer rendering function', () => {
//         lightbox.attach()
//
//         const result: HTMLElement | null = document.body.querySelector('.remind-lightbox .remind-lightbox__footer')
//
//         lightbox.detach()
//
//         expect(result).to.be.an.instanceof(HTMLSpanElement)
//     })
//
//     it('should attach lightbox html to document', () => {
//
//         lightbox.attach()
//
//         const result: number = document.body.querySelectorAll('.remind-lightbox').length
//
//         lightbox.detach()
//
//         expect(result).to.equal(1)
//     })
//
//     it('should detach lightbox html from document', () => {
//
//         lightbox.detach()
//
//         const result: number = document.body.querySelectorAll('.remind-lightbox').length
//
//         lightbox.detach()
//
//         expect(result).to.equal(0)
//     })
//
//     it('should attach lightbox html to document and then detach from document', () => {
//
//         lightbox.attach()
//         lightbox.detach()
//
//         const result: number = document.body.querySelectorAll('.remind-lightbox').length
//
//         lightbox.detach()
//
//         expect(result).to.equal(0)
//     })
//
//     it('should attach lightbox html to document only once', () => {
//
//         lightbox.attach()
//         lightbox.attach()
//
//         const result: number = document.body.querySelectorAll('.remind-lightbox').length
//
//         lightbox.detach()
//
//         expect(result).to.equal(1)
//     })

    // it('should override source before attach', () => {
    //     lightbox.setSource('<div class="test">Just a simple test</div>')
    //     lightbox.attach()
    //
    //     const result: number = document.body.querySelectorAll('.remind-lightbox .test').length
    //
    //     lightbox.detach()
    //
    //     expect(result).to.equal(1)
    // })
    //
    // it('should override source after attach', () => {
    //     lightbox.attach()
    //     lightbox.setSource('<div class="test">Just a simple test</div>')
    //
    //     const result: number = document.body.querySelectorAll('.remind-lightbox .test').length
    //
    //     lightbox.detach()
    //
    //     expect(result).to.equal(1)
    // })
// })
