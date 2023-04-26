const messageError = document.querySelector(".error"),
  iconError = document.querySelector(".icon-error"),
  form = document.querySelector("form"),
  submitButton = document.querySelector("button"),
  inputField = document.querySelector("input");

function isValidEmail(string) {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
    string
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (isValidEmail(inputField.value)) {
    messageError.style.display = "none";
    iconError.style.display = "none";
    form.submit();
  } else {
    messageError.style.display = "block";
    iconError.style.display = "block";
  }
});
