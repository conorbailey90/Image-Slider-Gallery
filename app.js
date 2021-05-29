const mainEl = document.querySelector('main');
const content = document.querySelector('.content');
const images = [...document.querySelectorAll('.img')];
images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`;
    image.addEventListener('click', () => {
        image.classList.toggle('active');
    })
})

// measure translate pixels
let current = 0;

// Store slide number
let slide = 0;


// set app height to be window.innerheight as vh doesnt work properly on mobile: https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
const doc = document.documentElement
const appHeight = () => {
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    current = -slide * window.innerHeight;
    content.style.transform = `translateY(-${slide * window.innerHeight}px)`;
    
}
window.addEventListener('resize', appHeight)
appHeight();

mainEl.addEventListener("touchstart", startTouch, {passive: false});
mainEl.addEventListener("touchend", endTouch, false);
mainEl.addEventListener("touchmove", moveTouch, {passive: false});
mainEl.addEventListener("mousedown", startMousedown, false);
mainEl.addEventListener("mouseup", startMouseup, false);
mainEl.addEventListener('wheel', wheelFunc, {passive: false})


// Mouse grab/ Mouse wheel / track pad
let canSwipe = true;
function wheelFunc(e){
    if(canSwipe){
        // swipe up
        if(e.deltaY > 60 && current !== -(window.innerHeight * 5)){
            canSwipe = false;
            current -= window.innerHeight;
            slide++
            console.log(slide)
            content.style.transform = `translateY(${current}px)`;
            setTimeout(() => {
                canSwipe = true;
            }, 1000)
        }
    
        // Swipe down
        if(e.deltaY < -60 && current !== 0){
            canSwipe = false;
            current += window.innerHeight;
            slide--
            console.log(slide)
            content.style.transform = `translateY(${current}px)`;
            setTimeout(() => {
                canSwipe = true;
            }, 1000)
        }   
    } 
}

function startMousedown(e){
    initialStart = Date.now();
    initialY = e.clientY;
}

function startMouseup(e){
    initialEnd = Date.now();
    endY = e.clientY;
    if(initialEnd - initialStart < 800){
        swipe()
    }
}


// Touch screens
let initialY = null;
let endY = null;

let initialStart = 0
let initialEnd = 0
 
function startTouch(e) {
    initialStart = Date.now();
    initialY = e.touches[0].clientY;
}

function endTouch(e) {
    initialEnd = Date.now();
    endY = e.changedTouches[0].clientY;

    if(initialEnd - initialStart < 800){
        swipe()
    }
}

  function swipe(){
      // Swipe up
      if(endY - initialY < -50){

          if(current !== -(window.innerHeight * 5)){
            current -= window.innerHeight;
            slide++
          }
          // Swipe down
      }else if(endY - initialY > 50){
          if(current !== 0){
            current += window.innerHeight;
            slide--
          }   
      }
      content.style.transform = `translateY(${current}px)`
  }

  function moveTouch(e){
      e.preventDefault()
  }