let modalCloseBtns = document.querySelectorAll(".close-popup")
let modalOverlays = document.querySelectorAll(".modal-overlay")
let takeOfferBtn = document.querySelector("#take-offer")
let rentalBtns = document.querySelectorAll(".rentals-card-btn")
let rentalCards = document.querySelectorAll(".rentals-card")

for(let btn of modalCloseBtns){
	btn.addEventListener("click", function(){
		this.parentNode.parentNode.parentNode.classList.add("d-none")
	})
}



takeOfferBtn.addEventListener("click", function(){
	document.querySelector(".offer-modal").classList.remove("d-none")
})


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
