const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show')
  })
})

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el))

// Sidebar menu
const menuBtn = document.getElementById('menuBtn')
const navLinks = document.getElementById('navLinks')
const navOverlay = document.getElementById('navOverlay')
const navCloseBtn = document.getElementById('navCloseBtn')

if (menuBtn && navLinks && navOverlay) {
  const open = () => {
    navLinks.classList.add('active')
    navOverlay.classList.add('active')
  }
  const close = () => {
    navLinks.classList.remove('active')
    navOverlay.classList.remove('active')
  }

  menuBtn.addEventListener('click', open)
  navOverlay.addEventListener('click', close)
  navCloseBtn?.addEventListener('click', close)

  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      close()
    })
  })

  // Close using explicit close button
}






// Modal
const modalOverlay = document.getElementById('pizzaModalOverlay')
const modalClose = document.getElementById('pizzaModalClose')
const modalTitle = document.getElementById('pizzaModalTitle')
const modalDesc = document.getElementById('pizzaModalDesc')
const modalPrice = document.getElementById('pizzaModalPrice')
const modalGallery = document.getElementById('pizzaModalGallery')
const modalWhatsApp = document.getElementById('pizzaModalWhatsApp')

function openModalFromButton(btn) {
  if (!modalOverlay) return

  const name = btn.dataset.name || ''
  const desc = btn.dataset.desc || ''
  const price = btn.dataset.price || ''
  const img1 = btn.dataset.img1 || ''
  const img2 = btn.dataset.img2 || ''
  const img3 = btn.dataset.img3 || ''
  const whatsappLink = btn.dataset.whatsapp || '#'

  modalTitle.textContent = name
  modalDesc.textContent = desc
  modalPrice.textContent = price

  modalGallery.innerHTML = [img1, img2, img3]
    .filter(Boolean)
    .map((src) => `<img src="${src}" alt="${name}">`)
    .join('')

  if (modalWhatsApp) modalWhatsApp.setAttribute('href', whatsappLink)

  modalOverlay.classList.add('active')
  document.body.style.overflow = 'hidden'
}


function closeModal() {
  if (!modalOverlay) return
  modalOverlay.classList.remove('active')
  document.body.style.overflow = ''
}

if (modalOverlay) {
  modalClose?.addEventListener('click', closeModal)
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal()
  })
}

// Attach handlers to all detalle buttons
document.querySelectorAll('[data-action="details"]').forEach((btn) => {
  btn.addEventListener('click', () => openModalFromButton(btn))
})

