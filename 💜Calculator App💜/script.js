/*themes*/
const themes = document.querySelectorAll(".theme");

if (!localStorage.getItem("theme")) {
  const preferredTheme =
    window.matchMedia("(prefers-color-scheme: dark)").matches === true
      ? "theme-three"
      : "theme-one";
  localStorage.setItem("theme", preferredTheme);
  document.documentElement.dataset.theme = preferredTheme;
}

themes.forEach((theme) => {
  theme.addEventListener("click", () => {
    localStorage.setItem("theme", theme.id);
    document.documentElement.dataset.theme = theme.id;
  });
});

const setTheme = () => {
  const activeTheme = localStorage.getItem("theme");
  themes.forEach((theme) => {
    if (theme.id === activeTheme) {
      theme.checked = true;
      document.documentElement.dataset.theme = theme.id;
    }
  });
};

document.onload = setTheme();

/* calculator */
var input = document.getElementById("screen"),
  numbers = document.querySelectorAll(".num"),
  operators = document.querySelectorAll(".oper"),
  oDot = document.getElementById("."),
  result = document.getElementById("="),
  clear = document.getElementById("reset"),
  del = document.getElementById("del"),
  dotInputed = false,
  numHaveDot = false,
  expression = input.value,
  mnsOneOut = input.value.slice(0, -1);

input.addEventListener("input", () => {
  val = input.value.replace(/[^0-9]/g, "");
  input.value = val;
});

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    numHaveDot =
      input.value[input.value.length - 1] === ","
        ? true
        : input.value[input.value.length - 1] === "/" ||
          input.value[input.value.length - 1] === "x" ||
          input.value[input.value.length - 1] === "+" ||
          input.value[input.value.length - 1] === "-"
        ? false
        : numHaveDot;
    input.value === "0"
      ? (input.value = event.target.innerHTML)
      : (input.value += event.target.innerHTML);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    input.value[input.value.length - 1] === "/" ||
    input.value[input.value.length - 1] === "x" ||
    input.value[input.value.length - 1] === "+" ||
    input.value[input.value.length - 1] === "-"
      ? ((input.value = input.value.slice(0, -1) + event.target.innerHTML),
        (dotInputed = false))
      : input.value !== "" && input.value[input.value.length - 1] != ","
      ? ((input.value += event.target.innerHTML), (dotInputed = false))
      : null;
  });
});

oDot.addEventListener("click", () => {
  if (
    dotInputed === false &&
    input.value[input.value.length - 1] !== "," &&
    input.value[input.value.length - 1] !== "/" &&
    input.value[input.value.length - 1] !== "x" &&
    input.value[input.value.length - 1] !== "+" &&
    input.value[input.value.length - 1] !== "-" &&
    input.value !== "" &&
    numHaveDot === false
  ) {
    input.value += ",";
    dotInputed = numHaveDot = true;
    resultDisplayed = false;
  }
});

del.addEventListener("click", () => {
  mnsOneOut = input.value.slice(0, -1);
  input.value[input.value.length - 1] === ","
    ? (dotInputed = numHaveDot = false)
    : null;
  mnsOneOut.length === 0
    ? (input.value = "0")
    : (input.value = input.value.slice(0, -1));
  resultDisplayed = false;
});

clear.addEventListener("click", () => {
  input.value = "0";
  dotInputed = numHaveDot = false;
});

result.addEventListener("click", () => {
  expression = input.value.replaceAll("x", "*");
  expression = expression.replaceAll(",", ".");
  expression[expression.length - 1] === "/" ||
  expression[expression.length - 1] === "*" ||
  expression[expression.length - 1] === "+" ||
  expression[expression.length - 1] === "-"
    ? (expression = expression.slice(0, -1))
    : expression;
  if (eval(expression) === Infinity) {
    expression = 0;
    alert("Infinity");
  }
  if (eval(expression) === -Infinity) {
    expression = 0;
    alert("-Infinity");
  }
  if (isNaN(eval(expression))) {
    expression = 0;
    alert(")");
  }
  input.value = eval(expression);
  input.value = input.value.replace(".", ",");
  if (!input.value.includes(",")) dotInputed = numHaveDot = false;
});
