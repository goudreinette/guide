/* global $ */
class Guide {
    constructor() {
        // DOM reference to mount point
        this.$root = document.querySelector('#contact-slideout .container')
        this.appendHTML()

        // Get references to just created DOM elements
        this.$toggle = document.querySelector('.contact-menu-link i')
        this.$back = document.querySelector('#contact-slideout #back')
        this.$choices = document.querySelectorAll('#contact-slideout h1.choice')
        this.$icons = document.querySelectorAll('#contact-slideout .choice-icon')

        this.$rows = document.querySelectorAll('#contact-slideout .guide')
        this.$intro = document.querySelector('#contact-slideout #intro')

        // Event listeners
        window.toggleGuide = () => $(this.$toggle).trigger('click')
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        this.$toggle.addEventListener('click', this.onToggleClick.bind(this))
        this.$back.addEventListener('click', this.onBackClick.bind(this))
        for (let i = 0; i < this.$choices.length; i++)
            this.$choices[i].addEventListener('click', this.onChoiceClick.bind(this))

        // Update for the first time - for when hash !== ''
        this.show = false
        this.update()
    }

    appendHTML() {
        const html = '<button id="back">Terug</button>'
        this.$root.insertAdjacentHTML('afterbegin', html)
    }

    onToggleClick() {
        location.hash = ''
        this.show = !this.show
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
            const hidden = location.hash.slice(1) !== slug
            if (hidden) {
                $(this.$rows[i]).velocity({opacity: 0, height: 0, scaleY: 0})
            }
            else {
                $(this.$rows[i]).velocity({opacity: 1, height: 'auto', scaleY: 1})
            }
        }
        // Show/hide the #intro based on the content of location.hash
        if (location.hash !== '') {
            $(this.$intro).velocity({opacity: 0, height: 0, marginTop: -230})
            $(this.$back).velocity({opacity: 1, height: 30})
        }
        else {
            $(this.$back).velocity({opacity: 0, height: 0})
            $(this.$intro).velocity({opacity: 1, height: 220, marginTop: 100})
        }

        // Set first choice active based on location.hash
        for (let i = 0; i < this.$choices.length; i++)
            this.$choices[i].classList.toggle('active', location.hash.includes(this.$choices[i].getAttribute('data-slug')))

        // Change the background color when location.hash includes individueel
        this.$root.parentNode.classList.toggle('alternate-color', location.hash.includes('individueel'))

        /**
         * Root visibility
         */
        debugger
        this.$root.parentNode.classList.toggle('show', this.show)

        // Hide icons when location.hash !== ''
        for (var i = 0; i < this.$icons.length; i++)
            this.$icons[i].classList.toggle('hidden', location.hash !== '')
    }
}

if (!window.$) window.$ = window.jQuery

window.onload = () => new Guide()
