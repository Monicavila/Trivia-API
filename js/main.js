import { comprehensionGetElemen, hi } from "./helpers.js";
let correctsAnswers = [];
const getApi = [
  "questionsQuantity.questions-number",
  "categorySelect.category-type",
  "difficulty.difficulty",
  "type.type",
];
class Questions {
  constructor(data) {
    this.data = data;
  }

  //OBTAIN ALL ANSWERS AND APPLY A RANDOM POSITION
  returnAnswersHTML(correct, incorrects, indexCard) {
    incorrects.push(correct);
    // This one sort the position of all answers
    incorrects.sort(function () {
      return Math.random() - 0.5;
    });

    let answersHTML = "";
    incorrects.forEach((incorrect, index) => {
      answersHTML += `<div class="form-check">
                                <input class="form-check-input" type="radio" name="radios-${indexCard}" id="radio${indexCard}-${index}" value="${incorrect}" required>
                                <label class="form-check-label" for="radio${indexCard}-${index}">${incorrect}</label>
                            </div>`;
    });

    return answersHTML;
  }

  //ESTRUCTURE OF CARD INFORMATION
  returnCardHTML(q, indexCard) {
    const card = `<div class="card margin-card">
                        <div class="card-body bg-card">
                        <h5 class="card-title">${q.question}</h5>
                            ${this.returnAnswersHTML(
                              q.correct_answer,
                              q.incorrect_answers,
                              indexCard
                            )}           
                        </div>
                    </div>`;

    return card;
  }

  // OBTAIN CORRECT ANSWER ARRAY
  correCtAnswers(questions) {
    let correctAns = [];
    questions.forEach((question) => correctAns.push(question.correct_answer));
    //console.log(correctAns) //Don't show de answers in console.
    return correctAns;
  }

  //DISPLAY CARDS
  printCards(categorySelect = "") {
    let questions = this.data;
    const container = document.getElementById("container-cards");
    container.innerHTML = "";
    let x = document.getElementById("btnWorked");
    if (x.style.display === "none") {
      x.style.display = "block";
    }

    if (questions.length === 0) {
      let y = document.getElementById("btnWorked");
      if (y.style.display === "block") {
        y.style.display = "none";
      }
      container.innerHTML = `<div class="alert alert-warning" role="alert">
                                        ¡Test again, this section is empty!
                                    </div>`;
    } else {
      container.innerHTML += `<h1 class="text-center">${categorySelect}</h1>`;
      sessionStorage.setItem("inicio", new moment());
      questions.forEach((question, indexCard) => {
        const card = this.returnCardHTML(question, indexCard);
        container.innerHTML += card;
      });
    }
    correctsAnswers = this.correCtAnswers(questions);
  }
}

// OBTAIN CATEGORIES
function getCategory() {
  fetch(`https://opentdb.com/api_category.php`)
    .then((response) => response.json())
    .then((data) => {
      const categories = data.trivia_categories;
      const categoriesHTML = document.getElementById("category-type");
      categories.forEach((category) => {
        const categoryType = `<option value="${category.id}">${category.name}</option>`;
        categoriesHTML.innerHTML += categoryType;
      });
    });
}

// OBTAIN VALUE FOR EACH FORM CONTROL
function getQuestions() {
  const {
    questionsQuantity,
    categorySelect,
    difficulty,
    type,
  } = comprehensionGetElemen(...getApi);
  fetch(
    `https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${difficulty}&type=${type}`
  )
    .then((response) => response.json())
    .then((data) => {
      let trivia = new Questions(data.results);
      if (data.results[0]) {
        trivia.printCards(data.results[0].category);
      } else {
        trivia.printCards();
      }
    });
}

//msg Modal
function msgModal(numGood, correctsAnswers) {
  const promedio = (numGood / correctsAnswers) * 100;
  sessionStorage.setItem("goodAnswers", `[${numGood}, ${promedio}]`);
  const modal = document.getElementById("scoreModal");
  if (promedio >= 80) {
    modal.innerHTML = `<div>
    <span class="bold"> Congratulations</span>
    you got <span  class="text-success">${numGood} hits </span>
    of ${correctsAnswers} questions
  </div>
  <div>
  Good job! average of <span class="text-success">${promedio}%</span>
  </div>`;
    console.log("Good", promedio);
  } else if (promedio >= 50) {
    modal.innerHTML = `<div>
    <span class="bold"> Not bad, but you can do better,</span>
    you got <span class="text-primary">${numGood} hits </span>
    of ${correctsAnswers} questions
  </div>
  <div>
  We can improve it! average of <span <span class="text-primary">${promedio}%</span>
  </div>`;
  } else {
    modal.innerHTML = `<div>
    <span class="bold"> We are sorry!</span> We must improve this, <span class="text-danger">${numGood} hits </span>
    of ${correctsAnswers} questions
  </div>
  <div>
  Wow! I think you have to study.  average of <span class="text-danger">${promedio}%</span>
  </div>`;
  }
}
// len of top10
function checkTop() {
  const top10 = JSON.parse(localStorage.getItem("top10"));
  if (top10) {
    return Object.keys(top10).length;
  }
  localStorage.setItem("top10", "{}");
  return 0;
}

// ordenar
function ordenarAverage() {
  let top10 = JSON.parse(localStorage.getItem("top10"));
  let newTop10 = {};
  for (let i = 0; i < checkTop(); i++) {
    let averagePre = -1;
    let key = "";
    for (let item in top10) {
      let average = top10[item].goodAnswers.average;
      if (average > averagePre) {
        averagePre = average;
        key = item;
      }
    }
    newTop10[`item${i + 1}`] = top10[key];
    delete top10[key];
  }
  console.log("ordenar:", newTop10);
  localStorage.setItem("top10", JSON.stringify(newTop10));
  return newTop10;
}
// validate
function validate(evt) {
  evt.preventDefault();
  sessionStorage.setItem("fin", moment());
  let numGood = 0;
  for (let i = 0; i < correctsAnswers.length; i++) {
    const options = document.getElementsByName(`radios-${i}`);
    options.forEach((option) => {
      if (option.checked) {
        if (option.value == correctsAnswers[i]) {
          numGood++;
        }
      }
    });
  }
  msgModal(numGood, correctsAnswers.length);
  const modal = new bootstrap.Modal(document.getElementById("modalValidate"));
  modal.show();
  if (checkTop() < 10) {
    const top10 = JSON.parse(localStorage.getItem("top10"));
    top10[`item${[checkTop() + 1]}`] = {
      fecha: moment().format("L"),
      time: {
        inicio: sessionStorage.getItem("inicio"),
        fin: sessionStorage.getItem("fin"),
      },
      palyer: sessionStorage.getItem("triviaPlayerName"),
      goodAnswers: {
        good: JSON.parse(sessionStorage.getItem("goodAnswers"))[0],
        average: JSON.parse(sessionStorage.getItem("goodAnswers"))[1],
      },
    };
    localStorage.setItem("top10", JSON.stringify(top10));
    ordenarAverage();
  } else {
    let top10 = JSON.parse(localStorage.getItem("top10"));
    const scortop10 = top10["item10"].goodAnswers.average;
    const scorToValidate = JSON.parse(sessionStorage.getItem("goodAnswers"))[1];
    if (scorToValidate >= scortop10) {
      if (scorToValidate > scortop10) {
        top10["item10"] = {
          fecha: moment().format("L"),
          time: {
            inicio: sessionStorage.getItem("inicio"),
            fin: sessionStorage.getItem("fin"),
          },
          palyer: sessionStorage.getItem("triviaPlayerName"),
          goodAnswers: {
            good: JSON.parse(sessionStorage.getItem("goodAnswers"))[0],
            average: JSON.parse(sessionStorage.getItem("goodAnswers"))[1],
          },
        };
        console.log(top10.item10);
        localStorage.setItem("top10", JSON.stringify(top10));
        ordenarAverage();
      } else {
        //validar
        console.log("validar");
      }
    }
  }
}

function reload() {
  location.reload();
}

function score() {
  location = `${location.origin}/html/score.html`;
}

getCategory();
window.getQuestions = getQuestions;
window.validate = validate;
window.reload = reload;
window.score = score;
window.ordenarAverage = ordenarAverage;
