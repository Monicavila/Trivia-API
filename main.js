function getCategory() { 
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data =>  {
            category(data.trivia_categories)
        })
}
function category (categories){
    const categoriesH = document.getElementById('category')
    categories.forEach(category => {
        const categoryType = `<option value="${category.id}">${category.name}</option>`
        categoriesH.innerHTML += categoryType
    })
}

/////
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const categorySelect = document.getElementById('category').value
    const difficulty = document.getElementById('difficulty').value
    const type = document.getElementById('type').value
    console.log('category: ' + categorySelect + ' difficulty: ' + difficulty + ' type: ' + type)
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${difficulty}&type=${type}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

// console.log(datos);
function printCards(questions) {
    const container = document.getElementById('container-cards')
    container.innerHTML = ''
    questions.forEach(question => {
        const card = returnCardHTML(question)
        container.innerHTML += card
    });
    // Display questions on web page
}

function returnCardHTML(q) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers)}           
                    </div>
                </div>`
    return card;
}
function returnAnswersHTML(correct, incorrects) {
    const correctHTML = `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${correct}
                            </label>
                        </div>`;


    let incorrectHTML = '';
    incorrects.forEach((incorrect) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return correctHTML + incorrectHTML;
}

window.category = category
getCategory()
