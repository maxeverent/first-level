const partnersItems = document.querySelector('.partners-items__container')

let offset
let offsetX
let maxOffset

let countItems
let partnersWidth

let countItemsInVision
let oneStepWidth

let progressBarWidth
const progressBar = document.querySelector('.progress-bar__element')

const computeParams = () => {
    offset = 0
    offsetX = 0;
    maxOffset = 0;

    offset = partnersItems.children[0].offsetWidth

    countItems = partnersItems.children.length
    partnersWidth = partnersItems.offsetWidth

    countItemsInVision = partnersWidth/offset
    oneStepWidth = partnersWidth/countItems

    maxOffset = -(countItems - countItemsInVision)*offset

    progressBarWidth = countItemsInVision*oneStepWidth
    progressBar.style.width = progressBarWidth + 'px'

    partnersItems.style.transform = `translate(0px, 0px)`
}

computeParams()

window.addEventListener('resize', (e) => {
    computeParams()
    switchLeftBtn.setAttribute('src','./images/arrow-left.svg')
    switchRightBtn.setAttribute('src', './images/arrow-right_green.svg')
}, true);

const updateProgressBar = (direction) => {
    if (direction == 'right') {
        progressBarWidth += oneStepWidth       
        progressBar.style.width = progressBarWidth + 'px'
    }
    if (direction == 'left') {
        progressBarWidth -= oneStepWidth
        progressBar.style.width = progressBarWidth + 'px'
    }
}

const switchLeftBtn = document.querySelector('.partners__arrow-left')
switchLeftBtn.addEventListener('click', (e) => {
    if (offsetX != 0) {
        offsetX += offset
        partnersItems.style.transform = `translate(${offsetX}px, 0px)`
        updateProgressBar('left')
        switchRightBtn.setAttribute('src', './images/arrow-right_green.svg')
        if (offsetX == 0) {
            switchLeftBtn.setAttribute('src','./images/arrow-left.svg')
        }
    }
})
const switchRightBtn = document.querySelector('.partners__arrow-right')
switchRightBtn.addEventListener('click', (e) => {
    if (!(offsetX - offset <= maxOffset)) {
        offsetX -= offset
        partnersItems.style.transform = `translate(${offsetX}px, 0px)`
        updateProgressBar('right')
        switchLeftBtn.setAttribute('src', './images/arrow-left_green.svg')
        if (offsetX - offset <= maxOffset) {
            switchRightBtn.setAttribute('src', './images/arrow-right.svg')
            progressBar.style.width = partnersWidth + 'px'
        }
    }
})

//мобильный слайдер

let x1
let y1
let mobileOffset = 0
let xDiff
let yDiff

partnersItems.addEventListener('touchstart', (e) => {
    const firstTouch = e.touches[0]
    x1 = firstTouch.clientX
    y1 = firstTouch.clientY

}, false)

partnersItems.addEventListener('touchend', (e) => {
    
    mobileOffset += xDiff

    //правый край
    if (mobileOffset <= maxOffset) {
        partnersItems.style.transform = `translate(${maxOffset}px, 0px)`
        mobileOffset = maxOffset
        switchRightBtn.setAttribute('src', './images/arrow-right.svg')
        switchLeftBtn.setAttribute('src', './images/arrow-left_green.svg')
        progressBar.style.width = partnersWidth + 'px'
    } 
    //левый край
    else if (mobileOffset > 0) {
        partnersItems.style.transform = `translate(${0}px, 0px)`
        mobileOffset = 0
        switchRightBtn.setAttribute('src', './images/arrow-right_green.svg')
        switchLeftBtn.setAttribute('src', './images/arrow-left.svg')
        progressBarWidth = countItemsInVision*oneStepWidth
        progressBar.style.width = progressBarWidth + 'px'
    } 
    //середина
    else {
        progressBarWidth = countItemsInVision*oneStepWidth
        let offsetProgress  = partnersWidth - progressBarWidth
        const widthInPercent = (mobileOffset*100)/maxOffset
        offsetProgress = (offsetProgress*widthInPercent)/100
        progressBarWidth += offsetProgress
        progressBar.style.width = progressBarWidth + 'px'
    }

}, false)


partnersItems.addEventListener('touchmove', (e) => {
    if (!x1 || !y1) {
        return false
    }
    let x2 = e.touches[0].clientX
    let y2 = e.touches[0].clientY

    xDiff = x2 - x1
    yDiff = y2 - y1

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        //свайп вправо
        if (xDiff > 0 ) {
            partnersItems.style.transform = `translate(${mobileOffset+xDiff}px, 0px)`        
        } 
        //свайп влево
        if (xDiff < 0) {
            partnersItems.style.transform = `translate(${mobileOffset+xDiff}px, 0px)`
            switchLeftBtn.setAttribute('src', './images/arrow-left_green.svg')         
        }
    }
}, false)
