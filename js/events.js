const formName = document.getElementById("formName");
formName.addEventListener("submit", redirecTrivia);

function redirecTrivia(event) {
  event.preventDefault();
  const name = document.getElementById("inputName").value;
  sessionStorage.setItem("triviaPlayerName", `${name}`);
  location = `${location.origin}/html/trivia.html`;
}
