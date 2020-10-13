
function getCategory() { 
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data =>  {
            category(data.trivia_categories)
        })
}
function category (categorias){
    const categorys = document.getElementById('category-type')
    const categorySelect = document.getElementById('category-type').value;
    categorias.forEach(categoria => {
        if (categorySelect == categoria.name){
                        let idCategory = categoria.id
                        console.log('categetCategory()gory id: ' + idCategory)
                    }
        const categoryType = `<option value="${categoria.id}">${categoria.name}</option>`
        categorys.innerHTML += categoryType
    })
}


/////
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const categorySelect = document.getElementById('category-type').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

// console.log(datos);
function printCards(questions) {
    const container = document.getElementById('container-cards')
    container.innerHTML = '';
    questions.forEach(question => {
        const card = returnCardHTML(question)
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
}

function returnCardHTML(q) {
    const card = `<div class="car">
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
