// index.js

// import { name } from "happy-dom/cjs/PropertySymbol.cjs";
// import { defaultInclude } from "vitest/config.js";

// import { name } from "happy-dom/cjs/PropertySymbol.cjs";
const menuRamen = document.getElementById("ramen-menu")
const detailImage = document.querySelector(".detail-image")
const detailName = document.querySelector(".name")
const detailRestaurant = document.querySelector(".restaurant")
const detailRatingDisplay = document.querySelector("#rating-display")
const detailComment = document.querySelector("#comment-display")


// Callbacks
const handleClick = (event) => {
  // Add code
  console.log("clicked");
  const ramen = event.target.closest(".card-details")
  if (ramen) {
    const ramenImage = ramen.querySelector("img").src
    const ramenName = ramen.querySelector("h2").textContent
    const ramenRestaurant = ramen.querySelector("h4").textContent
    const ramenRating = ramen.querySelector("#ramen-rating").textContent
    const ramenComment = ramen.querySelector("#ramen-comment").textContent

    detailImage.src = ramenImage
    detailImage.alt = ramenName
    detailName.textContent = ramenName
    detailRestaurant.textContent = ramenRestaurant
    detailRatingDisplay.textContent = `${ramenRating} `
    detailComment.textContent = ramenComment
  }

};
menuRamen.addEventListener("click",handleClick)

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit',(event)=>{
    event.preventDefault();
  
    let ramenObj = {
      name:event.target.new_name.value,
      restaurant:event.target.new_restaurant.value,
      image:event.target.new_image.value,
      rating:event.target.new_rating.value,
      comment:event.target.new_comment.value
    } 
    displayedRamen(ramenObj);
    addRamen(ramenObj);
});
}

const displayedRamen = (ramen) => {
  const ramenContainer = document.getElementById('ramen-menu');
  const card = document.createElement('div');
  card.classList.add('card-details')
  card.innerHTML =`
    <img src="${ramen.image}" alt="${ramen.name}">
    <h2>${ramen.name}</h2>
    <h4>${ramen.restaurant}</h4>
    <p id = "ramen-rating">
    <span>${ramen.rating}</span>/10
    </p>
    <p id = "ramen-comment">${ramen.comment}</p>
  `
  ramenContainer.appendChild(card);
}

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens",{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
         accept: 'application/json'
      }
    }
  )
  .then(response => response.json())
  .then((ramenData) => ramenData.forEach((ramen) => displayedRamen(ramen))); 
}

const addRamen = (ramen) => {
  fetch("http://localhost:3000/ramens",{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      accept:'application/json'
    },
    body:JSON.stringify(ramen)
  })
  .then(response => response.json())
  .then((ramen) => console.log(ramen))
}


const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  addSubmitListener()
  displayRamens()
  
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
