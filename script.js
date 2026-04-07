const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileLinks = document.querySelectorAll('.mobile-menu a')
const mobileClose = document.querySelector('.mobile-menu-close')
const logoImage = document.querySelector('.brand-logo')
const logoFallback = document.querySelector('.brand-fallback')

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24)
})

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
  document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('open'))
})

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open')
    document.body.classList.remove('no-scroll')
  })
})

mobileClose?.addEventListener('click', () => {
  mobileMenu.classList.remove('open')
  document.body.classList.remove('no-scroll')
})

if (logoImage && logoFallback) {
  logoImage.addEventListener('error', () => {
    logoImage.style.display = 'none'
    logoFallback.style.display = 'inline-flex'
  })
}

const revealItems = document.querySelectorAll('.reveal')
const counters = document.querySelectorAll('.counter-value')

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    })
  },
  { threshold: 0.18 }
)

revealItems.forEach((item) => revealObserver.observe(item))

const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const valueEl = entry.target.querySelector('.counter-value')
      const target = Number(valueEl.dataset.target)
      const suffix = valueEl.dataset.suffix || ''
      let current = 0
      const duration = 1800
      const increment = Math.ceil(target / (duration / 30))

      const countInterval = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(countInterval)
        }
        valueEl.textContent = `${current.toLocaleString()}${suffix}`
      }, 30)

      observer.unobserve(entry.target)
    })
  },
  { threshold: 0.3 }
)

counters.forEach((stat) => countObserver.observe(stat.closest('.impact-card')))

const parallaxItems = document.querySelectorAll('[data-parallax]')
function updateParallax() {
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax) || 0.14
    const rect = item.getBoundingClientRect()
    const offset = rect.top * speed
    item.style.transform = `translateY(${offset}px)`
  })
}

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateParallax)
})

updateParallax()

// Interactive Initiatives Section
const initiativeItems = document.querySelectorAll('.initiative-item')
const initiativeImage = document.getElementById('initiativeImage')

if (initiativeItems.length && initiativeImage) {
  initiativeItems.forEach((item) => {
    // Hover event for desktop
    item.addEventListener('mouseenter', () => {
      updateInitiative(item)
    })

    // Click event for mobile/touch
    item.addEventListener('click', (e) => {
      e.preventDefault()
      updateInitiative(item)
    })
  })

  function updateInitiative(item) {
    const index = item.dataset.initiative
    const imageUrl = item.dataset.image
    const altText = item.dataset.alt

    // Update image
    initiativeImage.style.opacity = '0'
    setTimeout(() => {
      initiativeImage.src = imageUrl
      initiativeImage.alt = altText
      initiativeImage.style.opacity = '1'
    }, 200)

    // Update active state
    initiativeItems.forEach((el) => {
      el.classList.remove('active')
    })
    item.classList.add('active')
  }
}

