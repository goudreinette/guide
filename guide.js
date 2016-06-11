/* global $ */

class Model
{
  constructor ()
  {
    this.hidden = true
    this.listeners = []
  }

  setState (key, value)
  {
    this[key] = value
    this.notify()
  }

  attach (listener)
  {
    this.listeners.push(listener)
  }

  notify ()
  {
    for (const listener of this.listeners)
      listener()
  }
}

class ViewModel
{
  constructor (model)
  {
    this.model = model
    this.model.attach(this.update.bind(this))

    this.appendHTML()

    // DOM references
    this.$root    = document.querySelector('#guide')
    this.$toggle  = document.querySelector('#guide-toggle')
    this.$choices = document.querySelectorAll('#guide h1.choice')
    this.$grids   = document.querySelectorAll('.uber-grid-wrapper')
    this.$intro   = document.querySelector('#guide #intro')

    if (this.$grids.length) this.moveGrids()

    // Event listeners
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    this.$toggle.addEventListener('click', this.onToggleClick.bind(this))
    for (const choice of this.$choices)
      choice.addEventListener('click', this.onChoiceClick.bind(this))
  }

  appendHTML ()
  {
    const html = `<div id="guide-toggle"></div>
    <div id="guide">
      <h1 id="intro">Maak uw keuze</h1>
      <div id="heading-container">
        <h1 class="choice" id="groepen">Groepen</h1>
        <h1 class="choice" id="individueel">Individueel</h1>
      </div>

    </div>`
    document.body.insertAdjacentHTML('afterbegin', html)
  }

  moveGrids ()
  {
    this.$grids.forEach((grid) => this.$root.appendChild(grid))
  }

  onToggleClick ()
  {
    this.model.setState('hidden', !this.model.hidden)
    location.hash = ''
  }

  onChoiceClick (event)
  {
    location.hash = event.target.getAttribute('id')
  }

  onHashChange ()
  {
    this.update()
  }

  update ()
  {
    // Show/hide grids based on their slug's occurence in location.hash
    for (const grid of this.$grids)
    {
      const slug   = grid.getAttribute('data-slug')
      const hidden = !location.hash.includes(slug)
      if (hidden)
        $(this.$grid).velocity({opacity: 0, scaleY: 0})
      else
        $(this.$grid).velocity({opacity: 1, scaleY: 1})
    }

    // Show/hide the #intro based on the content of location.hash
    if (location.hash !== '')
      $(this.$intro).velocity({opacity: 0, height: 0, marginTop: 0})
    else
      $(this.$intro).velocity({opacity: 1, height: 'auto', marginTop: 300})

    // Show/hide the #guide based on model.hidden
    if (this.model.hidden)
      $(this.$root).velocity({scale: 0.5, opacity: 0})
    else
      $(this.$root).velocity({scale: 1, opacity: 1})

    // Set first choice active based on location.hash
    for (const choice of this.$choices)
      choice.classList.toggle('active', location.hash.includes(choice.getAttribute('id')))
  }
}

window.onload = () => new ViewModel(new Model())
