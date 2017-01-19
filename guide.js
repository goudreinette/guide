/* global $ */
class Guide {
    constructor() {
        // DOM reference to mount point
        this.$root = document.querySelector('#contact-slideout .container')
        this.appendHTML()


        // Get references to just created DOM elements
        this.$toggle = document.querySelector('.contact-menu-link')
        this.$back = document.querySelector('#contact-slideout #back')
        this.$choices = document.querySelectorAll('#contact-slideout h1.choice')
        this.$icons = $('#contact-slideout .choice-icon')
        this.$headingContainer = $('#contact-slideout #heading-container')

        this.$rows = document.querySelectorAll('#contact-slideout .guide')
        this.$intro = document.querySelector('#contact-slideout #intro')

        // Event listeners
        window.toggleGuide = this.toggleGuide.bind(this)
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        this.$toggle.addEventListener('click', this.onToggleClick.bind(this))
        this.$back.addEventListener('click', this.onBackClick.bind(this))
        for (let i = 0; i < this.$choices.length; i++)
            this.$choices[i].addEventListener('click', this.onChoiceClick.bind(this))

        // Update for the first time - for when hash !== ''
        this.update()
        this.spinCompass()
    }

    spinCompass() {
        $(this.$toggle).addClass('animated rotateIn');
    }

    toggleGuide() {
        $(this.$toggle).toggleClass('slide-open')
        this.update()
    }

    appendHTML() {
        const html = '<button id="back">Terug</button>'
        $('#contact-slideout #heading-container').prepend(html)
    }

    onToggleClick() {
        location.hash = ''
        this.update()
    }

    onChoiceClick(event) {
        location.hash = event.target.getAttribute('data-slug')
    }

    onBackClick() {
        history.back()
    }

    onHashChange() {
        this.update()
    }

    update() {
        // Show/hide grids based on their slug's occurence in location.hash
        for (let i = 0; i < this.$rows.length; i++) {
            const slug = this.$rows[i].getAttribute('data-slug')
            const show = location.hash.slice(1) === slug
            $(this.$rows[i]).toggleClass('show', show)
        }

        // Show/hide the #intro based on the content of location.hash
        const hashEmpty = location.hash === ''

        $(this.$intro).toggleClass('show', hashEmpty)
        $(this.$back).toggleClass('show', !hashEmpty)


        // Set first choice active based on location.hash
        for (let i = 0; i < this.$choices.length; i++)
            this.$choices[i].classList.toggle('active', location.hash.includes(this.$choices[i].getAttribute('data-slug')))

        // Change the background color when location.hash includes individueel
        this.$root.parentNode.classList.toggle('alternate-color', location.hash.includes('individueel'))

        /**
         * Root visibility
         */
        var show = $(this.$toggle).hasClass('slide-open')
        this.$root.parentNode.classList.toggle('show', show)

        // Hide icons when location.hash !== ''
        this.$icons.toggleClass('show', hashEmpty)
        this.$headingContainer.toggleClass('top', !hashEmpty)
    }
}

if (!window.$) window.$ = window.jQuery

window.onload = () => new Guide()
