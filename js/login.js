const elForm = document.querySelector(".js-form");
const elEmailInput = document.querySelector(".js-email");
const elPasswordInput = document.querySelector(".js-password");
const elEyeBtn = document.querySelector(".js-eye-btn");


elEyeBtn.addEventListener("click", () => {
  elPasswordInput.innerHTML = ""
  if (elPasswordInput.type == "text") {
    elPasswordInput.type = "password"
  } else {
    elPasswordInput.type = "text"
  }
})


elForm.addEventListener("submit", evt => {
  evt.preventDefault()

  let elEmailInputVal = elEmailInput.value.trim();
  let elPasswordInputVal = elPasswordInput.value.trim();
  console.log(elEmailInputVal, elPasswordInputVal);

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: elEmailInputVal,
      password: elPasswordInputVal
    })
  }).then(res => res.json()).then(data => {
    if (data) {
      window.localStorage.setItem("token", data.token);

      window.location.replace("index.html")
    }
  })

})

