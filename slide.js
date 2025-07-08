const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
let currentIndex = 0

function updateSlide() {
  slider.style.transform = `translateX(-${currentIndex * 100}vw)`
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length
  updateSlide()
})

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length
  updateSlide()
})

const weddingDate = new Date('2025-09-13T11:00:00+09:00')
const today = new Date()
const diff = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24))
document.getElementById('dday').textContent = diff > 0 ? diff : '오늘'
