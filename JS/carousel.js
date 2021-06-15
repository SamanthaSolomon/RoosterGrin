//VARIABLES
const track = document.querySelector('.carousel-track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel-button--right')
const prevButton = document.querySelector('.carousel-button--left')
const dotNav = document.querySelector('.carousel-nav')
const dots = Array.from(dotNav.children)

// GET WIDTH OF SLIDE
const slideWidth = slides[0].getBoundingClientRect().width

//ARRANGE SLIDES NEXT TO EACH OTHER
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}

slides.forEach(setSlidePosition)

//FUNCTION TO MOVE SLIDES
const moveSlide = (track, currentSlide, targetSlide) => {
    //move to the next slide
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    //move current-slide class
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

//CLICK RIGHT ARROW, MOVE SLIDES TO RIGHT
nextButton.addEventListener('click', e => {
    //Get current slide and next slide
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    moveSlide(track, currentSlide, nextSlide)

})

//CLICK LEFT ARROW, MOVE SLIDES TO LEFT
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    moveSlide(track, currentSlide, prevSlide)
})

//CLICK INDICATOR, MOVE TO THAT SLIDE