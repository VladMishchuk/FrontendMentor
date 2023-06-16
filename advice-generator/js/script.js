const id = document.getElementsByTagName("span")[0];
const advice = document.getElementsByTagName("span")[1];

function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      return response.json();
    })
    .then((slip) => {
      id.innerHTML = slip.slip.id;
      advice.innerHTML = slip.slip.advice;
    });
}
 getAdvice();