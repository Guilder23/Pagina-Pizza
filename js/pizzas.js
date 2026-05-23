// JS
const pizzaRain = document.getElementById('pizzaRain')

function createPizzaRain(){

  for(let i = 0; i < 25; i++){

    const slice = document.createElement('div')

    slice.classList.add('slice')
    slice.innerHTML = '🍕'

    slice.style.left = Math.random() * 100 + 'vw'
    slice.style.animationDuration = (Math.random() * 3 + 2) + 's'
    slice.style.fontSize = (Math.random() * 16 + 12) + 'px'

    pizzaRain.appendChild(slice)

    setTimeout(() => {
      slice.remove()
    }, 5000)

  }

}

// SOLO UNA VEZ AL ENTRAR
window.addEventListener('load', () => {
  createPizzaRain()
})