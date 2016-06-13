/* global $ */
class ViewModel
{
  constructor ()
  {
    // DOM reference to mount point
    this.$root = document.querySelector('#contact-slideout .container')
    this.appendHTML()

    // Get references to just created DOM elements
    this.$toggle = document.querySelector('.contact-menu-link i')
    this.$back = document.querySelector('#contact-slideout #back')
    this.$choices = document.querySelectorAll('#contact-slideout h1.choice')

    this.$rows = document.querySelectorAll('#contact-slideout .guide')
    this.$intro = document.querySelector('#contact-slideout #intro')

    // Event listeners
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    this.$toggle.addEventListener('click', this.onToggleClick.bind(this))
    this.$back.addEventListener('click', this.onBackClick.bind(this))
    for (let i = 0; i < this.$choices.length; i++)
      this.$choices[i].addEventListener('click', this.onChoiceClick.bind(this))

    // Update for the first time - for when hash !== ''
    this.update()
  }

  appendHTML ()
  {
    const html = '<button id="back"></button>'
    this.$root.insertAdjacentHTML('afterbegin', html)
  }

  onToggleClick ()
  {
    location.hash = ''
  }

  onChoiceClick (event)
  {
    location.hash = event.target.getAttribute('data-slug')
  }

  onBackClick ()
  {
    history.back()
  }

  onHashChange ()
  {
    this.update()
  }

  update ()
  {
    // Show/hide grids based on their slug's occurence in location.hash
    for (let i = 0; i < this.$rows.length; i++)
    {
      const slug = this.$rows[i].getAttribute('data-slug')
      const hidden = location.hash.slice(1) !== slug
      if (hidden)
      {
        $(this.$rows[i]).velocity({scaleY: 0, opacity: 0}, {complete: () =>
        this.$rows[i].classList.add('hidden')})

      }
      else
      {
        $(this.$rows[i]).velocity({scaleY: 1, opacity: 1}, {complete: () =>
        this.$rows[i].classList.remove('hidden')})
      }
    }
    // Show/hide the #intro based on the content of location.hash
    if (location.hash !== '')
    {
      $(this.$intro).velocity({opacity: 0, height: 0, marginTop: 0})
      $(this.$back).velocity({opacity: 1, height: 'auto'})
    }
    else
    {
      $(this.$back).velocity({opacity: 0, height: 0})
      $(this.$intro).velocity({opacity: 1, height: 'auto', marginTop: 100})
    }

    // Set first choice active based on location.hash
    for (let i = 0; i < this.$choices.length; i++)
      this.$choices[i].classList.toggle('active', location.hash.includes(this.$choices[i].getAttribute('data-slug')))

    // Change the background color when location.hash includes individueel
    this.$root.parentNode.classList.toggle('alternate-color', location.hash.includes('individueel'))
  }
}

if (!window.$) window.$ = window.jQuery

window.onload = () => new ViewModel()
