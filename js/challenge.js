const incrementCounter  = document.getElementById("counter");

//Increments Counter Functionality
function counterIncrementer () {
    setInterval(function () {
        let counterValue = parseInt(incrementCounter.textContent) + 1;
        incrementCounter.textContent = counterValue;
    }, 1000)    
}

let counterNumber = counterIncrementer()

function pauseCounter () {
    clearInterval(counterNumber);
}

function resumeCounter () {
    counterNumber = counterIncrementer();
}

function minusOne () {
    incrementCounter.textContent = parseInt(incrementCounter.textContent) - 1;
}

function plusOne () {
    incrementCounter.textContent = parseInt(incrementCounter.textContent) + 1;
}

//Heart Click Counts
const numberAndClickCount = {}

function getClickCount(number){
    if(Object.keys(numberAndClickCount).includes(number)){
        numberAndClickCount[number] += 1;
    }else{
        numberAndClickCount[number] = 1;
    }

    return `${number} has been liked ${numberAndClickCount[number]} times`
}

//Updating Click Counts
function updateClickCount() {
    const likedNumbers = document.querySelector('ul.likes')

    let currentLikedNumber = document.getElementById(`number-${incrementCounter.textContent}`)
    if(currentLikedNumber){
        currentLikedNumber.textContent = getClickCount(incrementCounter.textContent)
    }else {
        currentLikedNumber = document.createElement('li')
        currentLikedNumber.id = `number-${incrementCounter.textContent}`
        currentLikedNumber.textContent = getClickCount(incrementCounter.textContent)

        likedNumbers.appendChild(currentLikedNumber)
    }
}


//Event Listeners
function addListener(){
    document.getElementById("minus").addEventListener("click", minusOne)
    document.getElementById("plus").addEventListener("click", plusOne)
    document.getElementById("heart").addEventListener("click", updateClickCount)
    document.getElementById("comment-form").addEventListener("submit", processCommentInput)
}

function removeListener(){
    document.getElementById("minus").removeEventListener("click", minusOne)
    document.getElementById("plus").removeEventListener("click", plusOne)
    document.getElementById("heart").removeEventListener("click", updateClickCount)
    document.getElementById("comment-form").removeEventListener("submit", processCommentInput)
}

addListener();


// const minusBtn = document.getElementById("minus");
// const plusBtn = document.getElementById("plus");
// const heartBtn = document.getElementById("heart");



//Pause Functionality
function disableBtns () {
    const btns = Array.from(document.querySelectorAll("button"));
    for(const btn of btns) {
        btn.classList.add("inactive");
        btn.classList.remove("active");
    }
}

function enableBtns () {
    const btns = Array.from(document.querySelectorAll("button"));
    for(const btn of btns) {
        btn.classList.add("active");
        btn.classList.remove("inactive");
    }
}

function changeBtnStyle(){
    const inactiveBtns = Array.from(document.getElementsByClassName("inactive"))
    const activeBtns = Array.from(document.getElementsByClassName("active"))

    for(const btn of inactiveBtns){
        if(btn.id == "pause"){
            continue;
        }
        btn.style.opacity = "0.5"
    }

    for(const btn of activeBtns){
        btn.style.opacity = "1"
    }
}

const pauseBtn = document.getElementById("pause");

pauseBtn.addEventListener("click", event =>{    
    if(pauseBtn.textContent == "pause"){
        pauseCounter();
        pauseBtn.textContent = "resume"
        removeListener();
        disableBtns();
        changeBtnStyle();
    }else {
        resumeCounter();
        pauseBtn.textContent = "pause"
        addListener();
        enableBtns();
        changeBtnStyle();
    }
})

const commentForm = document.getElementById("comment-form")

function createAListThatWillHoldComments(){
    let commentsHeader = document.querySelector("#list + h3")
    let commentsHeaderParent = document.querySelector("body div");
    let commentsContainer = document.createElement("div")
    commentsContainer.id = "user-inputted-comments"

    commentsHeader.parentNode.insertBefore(commentsContainer, commentsHeader.nextSibling)
}

createAListThatWillHoldComments();

function processCommentInput(event){
    const newComment = document.createElement("p")
    newComment.textContent = commentForm.querySelector("#comment-input").value

    const commentsContainer = document.getElementById("user-inputted-comments")
    commentsContainer.appendChild(newComment)

    event.target.reset();
}

commentForm.addEventListener("submit", event => event.preventDefault())
commentForm.addEventListener("submit", processCommentInput)
