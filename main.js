//GLOBAL VARIABLES
let correctsAnswers = [];

// CONSUME TRIVIA API
function getCategory() {
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data => {
            category(data.trivia_categories)
        });
}

// OBTAIN CATEGORIES
function category(categories) {
    const categoriesHTML = document.getElementById('category-type');
    //const categorySelect = document.getElementById('category-type').value;
    categories.forEach(category => {
        const categoryType = `<option value="${category.id}">${category.name}</option>`;
        categoriesHTML.innerHTML += categoryType;
    });
}

// OBTAIN VALUE FOR EACH FORM CONTROL 
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value;
    const categorySelect = document.getElementById('category-type').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${difficulty}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            printCards(data.results)
        });
}

//OBTAIN ALL ANSWERS AND APPLY A RANDOM POSITION
function returnAnswersHTML(correct, incorrects, indexCard) {

    incorrects.push(correct);
    // This one sort the position of all answers
    incorrects.sort(function () { return Math.random() - 0.5 });

    //This option only sort the position of correcto answer
    //incorrects.splice([Math.floor(Math.random() * 4)], 0, correct);

    let answersHTML = '';
    incorrects.forEach((incorrect, index) => {

        answersHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="radios-${indexCard}" id="radio${indexCard}-${index}" value="${incorrect}" required>
                            <label class="form-check-label" for="radio${indexCard}-${index}">${incorrect}</label>
                        </div>`;
    });

    return answersHTML;
}

//ESTRUCTURE OF CARD INFORMATION 
function returnCardHTML(q, indexCard) {

    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`;

    return card;
}

// OBTAIN CORRECT ANSWER ARRAY
function correctAnswers(questions) {
    let correctAns = [];
    questions.forEach(question => correctAns.push(question.correct_answer));
    //console.log(correctAns) //Don't show de answers in console.
    return correctAns;
}

//DISPLAY CARDS
function printCards(questions) {

    x = document.getElementById('btnWorked');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    }

    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    if (questions.length === 0) {
        y = document.getElementById('btnWorked');
        if (y.style.display === 'block') {
            y.style.display = 'none';
        }
        container.innerHTML = `<div class="alert alert-warning" role="alert">
                                    ¡Prueba otra vez, esta selección está vacía!
                                </div>`;
    } else {
        questions.forEach((question, indexCard) => {
            const card = returnCardHTML(question, indexCard);
            container.innerHTML += card;
        });
    }
    correctsAnswers = correctAnswers(questions);
    //se pasa a front// container.innerHTML += `<button type="button" onclick="validate(correctAnswers)" id="btnWorked" class="btn btn-success m-5">Validar</button>`;
}

// OBTAIN HOW MANY CORRECT ANSWERS USER HAVE
function validate() {
    // const btnVAl = document.getElementById('btnWorked').value
    // console.log( btnVAl)
    // const numCards = document.getElementById('questions-number').value

    // const elements = document.getElementsByClassName('.col')
    // Array.from(elements)
    // document.querySelectorAll('name*=radios-')
    // document.querySelector('.col')

    /*CA =[true, false]
    [radio1, radio2]
    radio1.value == true*/

    let numGood = 0;
    for (let i = 0; i < correctsAnswers.length; i++) {
        const options = document.getElementsByName(`radios-${i}`);
        options.forEach(option => {
            if (option.checked) {
                if (option.value == correctsAnswers[i]) {
                    numGood++
                }
            };
        });
    };
    //evt.preventDefault();
    if (numGood === 5) {
        alert('¡FELICIDADES ASERTASTE! Tienes bien las' + ' ' + numGood + ' ' + 'respuestas.');
    }
    if (numGood < 5) {
        alert('¡VUELVELO A INTENTAR! Tienes bien' + ' ' + numGood + ' ' + 'de 5 respuestas.');
    }
}

getCategory();
window.category = category