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

//FUNCTION TO UPDATE DOT COLOR
const updateDots = (currentDot, targetDot)=> {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')
}

//FUNCTION TO HIDE/SHOW ARROWS
const hideShow = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('hidden')
        nextButton.classList.remove('hidden')
    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('hidden')
        nextButton.classList.add('hidden')
    } else {
        prevButton.classList.remove('hidden')
        nextButton.classList.remove('hidden')
    }
}

//CLICK RIGHT ARROW, MOVE SLIDES TO RIGHT
nextButton.addEventListener('click', e => {
    //Get current slide and next slide
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    //Get current dot and next dot
    const currentDot = dotNav.querySelector('.current-slide')
    const nextDot = currentDot.nextElementSibling
    const nextIndex = slides.findIndex(slide => slide === nextSlide)
    //call moveSlide
    moveSlide(track, currentSlide, nextSlide)
    //move indicator current class
    updateDots(currentDot, nextDot)

    hideShow(slides, prevButton, nextButton, nextIndex)

})

//CLICK LEFT ARROW, MOVE SLIDES TO LEFT
prevButton.addEventListener('click', e => {
    //Get current slide and next slide
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling
    //Get current dot and next dot
    const currentDot = dotNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling
    const prevIndex = slides.findIndex(slide => slide === prevSlide)
    //call moveSlide
    moveSlide(track, currentSlide, prevSlide)
    //update dots
    updateDots(currentDot, prevDot)
    //hide show arrows
    hideShow(slides, prevButton, nextButton, prevIndex)
})

//CLICK INDICATOR, MOVE TO THAT SLIDE
dotNav.addEventListener('click', e => {
    //which indicator clicked
    const targetDot = e.target.closest('button')
    
    //end function if targetDot is NOT clicked
    if (!targetDot) return
   
    //get current slide, current dot and associated dot and slide index
    const currentSlide = track.querySelector('.current-slide')
    const currentDot = dotNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]
   
    //call moveSlide
    moveSlide(track, currentSlide, targetSlide)

    //move indicator current class 
    updateDots(currentDot, targetDot)

    //hide or show arrows
    hideShow(slides, prevButton, nextButton, targetIndex)
    
})