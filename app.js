const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const datePicker = document.getElementById('date-picker')

const countdownItem = document.getElementById('countdown')
const countdownItemTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timerElements = document.querySelectorAll('span')

const completeItem = document.getElementById('complete')
const completeItemInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive;
let saveCountdown

//LOADING SCREEN
let loadingSpinner = document.getElementById('loading-spinner')
window.addEventListener('load', function () {
    loadingSpinner.parentElement.removeChild(loadingSpinner);
 });

//milliseconds - converting to values ​​in timer
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

//Entering today's date / Only a date from the future can be selected
const today = new Date().toISOString().split('T')[0]
datePicker.setAttribute('min', today)

// input data as a complement to countdown
//distance -how much to the entered event - milliseconds
function updateItems(){
    countdownActive = setInterval(() =>{
    const now = new Date().getTime()
    const distance = countdownValue - now 
    console.log('Distance to event: ', distance)
    //Convert distance to timer value
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const mimutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    console.log(days,hours,mimutes,seconds)
    // hide input
    inputContainer.hidden = true

    // if countdown end, show complete event
    if(distance < 0){
        countdownItem.hidden = true
        clearInterval(countdownActive) //The clearInterval() method clears a timer set with the setInterval() method.
        completeItemInfo.textContent = `${countdownTitle} Ended on ${countdownDate}`
        completeItem.hidden = false
    } else{
    // Countdown still in progres
        countdownItemTitle
        .textContent = `${countdownTitle}`
        timerElements[0].textContent = `${days}`
        timerElements[1].textContent = `${hours}`
        timerElements[2].textContent = `${mimutes}`
        timerElements[3].textContent = `${seconds}`
        completeItem.hidden = true
        countdownItem.hidden = false
    }
    }, second) // counter updates every second/ console
}
//FUNCTION-value from input
function updateTimer(e){
    e.preventDefault()
    countdownDate = e.srcElement[1].value
    countdownTitle = e.srcElement[0].value
    // information to be saved in localStorage
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    //Convert a JavaScript object into a string with JSON.stringify().
    localStorage.setItem('countdown', JSON.stringify(saveCountdown))// local storage key and value
    console.log(countdownDate, countdownTitle)
    // check the correctness of the date/date must be selected
    if (countdownDate === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oh no...',
            text: 'Please, select a date of event',
          })
    }else {
        // get version of current date
        countdownValue = new Date(countdownDate).getTime()
        console.log('countdown value :', countdownValue)
        updateItems()
    }
}
//Function that Reset values
function reset(){
    //hide all/show inputs
    countdownItem.hidden = true
    inputContainer.hidden = false
    completeItem.hidden = true
    
    //stop countdown
    clearInterval(countdownActive)
    //clear values
    countdownTitle = ''
    countdownDate = ''
}
function loadLastCountdown(){
    if( localStorage.getItem('countdown')){
        inputContainer.hidden = true
        //method parses a JSON string, 
        //constructing the JavaScript value or object described by the string.
        saveCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = saveCountdown.title
        countdownDate = saveCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateItems()
    }
}
//event Listners
countdownForm.addEventListener('submit', updateTimer)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)
loadLastCountdown()