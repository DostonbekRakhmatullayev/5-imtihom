// LISTS
let elUserList = document.querySelector(".user__list")
let elPostList = document.querySelector(".post__list")
let elCommentsList = document.querySelector(".comments__list")

// IMAGE
let elImage = document.querySelector(".commit__image")
let elLoginImg = document.querySelector(".commit__login")
// TEMPLATE
let elUserTemplate = document.querySelector(".user__list-template").content;
let elPostTemplate = document.querySelector(".post__list-template").content;
let elCommentsTemplate = document.querySelector(".comments__list-template").content;

// Create Document Fragment
let filmsFragment = document.createDocumentFragment()
let filmsFragmentPost = document.createDocumentFragment()
let filmsFragmentComments = document.createDocumentFragment()

// elUser Id
let elUser = []

//   1-function
function theAir(array, node) { 
  node.innerHTML = ""
  array.forEach(element => { 
    node.innerHTML = ""
    // new Template
    let newTemplate =  elUserTemplate.cloneNode(true);
    elUser.push(element.id)
    newTemplate.querySelector(".user__list-username").textContent = element.username
    newTemplate.querySelector(".user__list-name").textContent = element.name
    newTemplate.querySelector(".user__list-id").textContent = element.id
    newTemplate.querySelector(".address__street").textContent = element.address.street
    newTemplate.querySelector(".address__suite").textContent = element.address.suite
    newTemplate.querySelector(".address__city").textContent = element.address.city
    newTemplate.querySelector(".address__zipcode").textContent = element.address.zipcode
    newTemplate.querySelector(".box__phone").textContent = element.phone
    newTemplate.querySelector(".box__phone").href = `tel:${element.phone}`
    newTemplate.querySelector(".joy").textContent = "@geo"
    newTemplate.querySelector(".joy").href = `https://www.google.com/maps/place/${element.address.geo.lat}, ${element.address.geo.lng}`
    newTemplate.querySelector(".website").textContent = "website"
    newTemplate.querySelector(".website").href = `https:${element.website}`
    newTemplate.querySelector(".emails").textContent = element.email
    newTemplate.querySelector(".emails").href = `mailto:${element.email}`
    newTemplate.querySelector(".user__list-company__name").textContent = element.company.name
    newTemplate.querySelector(".user__list-company__catch").textContent = element.company.catchPhrase
    newTemplate.querySelector(".user__list-company__bs").textContent = element.company.bs
    newTemplate.querySelector(".user__list-item").dataset.id = element.id

    filmsFragment.appendChild(newTemplate)
  });
  node.appendChild(filmsFragment)
  
}


//   1-fetch
async function getUser() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users")
  let data = await response.json()
  theAir(data, elUserList)
}
getUser()



// 2 elPOSTID ID
let elPOSTID = []

// 3-function
function theComments(array, node) {
  node.innerHTML = ""
  array.forEach(e => {
    // newTemplatep
    let newTemplatep = elCommentsTemplate.cloneNode(true);
    newTemplatep.querySelector(".comments__list-name").textContent = e.name
    newTemplatep.querySelector(".comments__list-body").textContent = e.body
    newTemplatep.querySelector(".comments__list-emil").textContent = e.email;
    newTemplatep.querySelector(".comments__list-emil").href = `mailto:${e.email}`
 
    filmsFragmentComments.appendChild(newTemplatep)
  });
  node.appendChild(filmsFragmentComments)
}

// 2-function
function thePost(array, node) {
  node.innerHTML = ""
  array.forEach(element => {
    elPOSTID.push(element.id)
    // new Template
    let newTemplate = elPostTemplate.cloneNode(true);
    newTemplate.querySelector(".post__list-title").textContent = element.title
    newTemplate.querySelector(".post__list-body").textContent = element.body
    newTemplate.querySelector(".post__list-item").dataset.id = element.id;
 
    filmsFragmentPost.appendChild(newTemplate)
  });
  node.appendChild(filmsFragmentPost)
}

//    2-fetch
async function getPost(userId) {
  let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  let dataPost = await response.json()
  thePost(dataPost, elPostList)
}

//    1-LIST CLICK 
elUserList.addEventListener("click", function(evt) {
  //   LOADER IMAGE
  elImage.setAttribute("style", "display:block")
  if(evt.target.matches(".user__list-item")) {
    let postIdd = evt.target.dataset.id - 0;
    elUser.forEach((newUserId) => {
      if(postIdd === newUserId){ 
        getPost(newUserId)    
      }
    }) 
  }    
})

// //    3-fetch
async function getCommit(comment) {
  let response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${comment}`)
  let dataCommit = await response.json()
  theComments(dataCommit, elCommentsList)
}

// 1-LIST CLICK 
elPostList.addEventListener("click", function(evt) {
  //   LOADER IMAGE
  elLoginImg.setAttribute("style", "display:block")
  if(evt.target.matches(".post__list-item")) {
    let postIddd = evt.target.dataset.id - 0;
    elPOSTID.forEach((newUserId) => {
      if(postIddd === newUserId){ 
        getCommit(newUserId)
      }
    }) 
  }    
})  

// TOKENS
const token = window.localStorage.getItem("token")
if (!token) {
  window.location.replace("login.html")
}
elLogOutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token")
  window.location.replace("login.html")
})

