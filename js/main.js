let modalCloseBtns = document.querySelectorAll(".close-popup")
let modalOverlays = document.querySelectorAll(".modal-overlay")
let takeOfferBtn = document.querySelector("#take-offer")
let rentalBtns = document.querySelectorAll(".rentals-card-btn")
let rentalCards = document.querySelectorAll(".rentals-card")
let backToChoise = document.querySelector(".close-popup-btn")

for(let btn of modalCloseBtns){
  btn.addEventListener("click", function(){
    this.parentNode.parentNode.parentNode.classList.add("d-none")
  })
}

if(backToChoise){
   backToChoise.addEventListener("click", function(e){
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("d-none")
   }) 
}




if(takeOfferBtn){
  takeOfferBtn.addEventListener("click", function(){
  document.querySelector(".offer-modal").classList.remove("d-none")
  })   
}

for(let modal of modalOverlays){
    modal.addEventListener("click", function(e){
        if(e.target.classList.contains("workout-attr-radio")){
            console.log("work")
            for(attr of document.querySelectorAll(".workout-attr-radio")){
              if(attr.checked){
                  attr.parentNode.classList.add("attr-active")
              } else{
                  attr.parentNode.classList.remove("attr-active")
              }
            }
        }
    })
}

for(let btn of rentalBtns){
  btn.addEventListener("click", function(){
    btn.classList.toggle("active")
    if(btn.textContent === 'Выбрать'){
      btn.textContent = "Выбрано"
    } else{
      btn.textContent = 'Выбрать'
    }
  })
}


let comments = document.querySelectorAll(".reviews-tlink")

for(let comment of comments){
    comment.addEventListener("click", function(e){
       if(e.target.parentNode.parentNode.querySelector(".comment-full").style.height === 100 + "px"){
           e.target.parentNode.parentNode.querySelector(".comment-full").style.height = 100 + "%"
           comment.innerHTML = "Скрыть"
       } else {
           e.target.parentNode.parentNode.querySelector(".comment-full").style.height = 100 + "px"
           comment.innerHTML = "Читать целиком"
       }
    })
}




jin = document.getElementById('fio');
jin.addEventListener('keydown', function(e){
  if( e.key.match(/[0-9]/) ) return e.preventDefault();
}); 

jin.addEventListener('input', function(e){
  jin.value = jin.value.replace(/[0-9]/g, "");
});

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const EMAIL = document.getElementById('email');
function validateEmail(value) {
  return EMAIL_REGEXP.test(value);
}
function updateInput() {
  if (validateEmail(EMAIL.value)) EMAIL.style.borderColor = 'green';
  else EMAIL.style.borderColor = 'red';
}
EMAIL.addEventListener('input', updateInput);


