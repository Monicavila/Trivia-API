
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
        const categoryType = `<option value="${categoria.id}">${categoria.name}</option>`
        categorys.innerHTML += categoryType
    })
}


/////
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const categorySelect = document.getElementById('category-type').value
    const dificultad = document.getElementById('dificultad').value
    const Tipo = document.getElementById('Tipo').value
    console.log('categoria: ' + categorySelect + ' dificultad: ' + dificultad + ' Tipo: ' + Tipo)
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${dificultad}&type=${Tipo}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

// console.log(datos);
function printCards(questions) {
    const container = document.getElementById('container-cards')
    container.innerHTML = '';
    questions.forEach((question, indexCard)=> {
        const card = returnCardHTML(question, indexCard)
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
    container.innerHTML += `<button type="button" onclick="validate()" class="btn btn-success m-5">Validar</button>`
}

function returnCardHTML(q, indexCard) {
    const card = `<div class="car">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>

                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}
function returnAnswersHTML(correct, incorrects, indexCard) {
    incorrects.push(correct)
    let incorrectHTML = '';
    incorrects.forEach((incorrect, index) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="radios-${indexCard}" id="radio${indexCard}-${index}">
                            <label class="form-check-label" for="radio${indexCard}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })
    return incorrectHTML;
}

function validate() {
    const numCards = document.getElementById('questions-number').value
    for(let i = 0; i < numCards; i++){
        const opciones = document.getElementsByName(`radios-${i}`)
        for(let option of opciones){
            if(option.checked){
                console.log('true')
            }else{
                console.log('false')
            }
        }
    }
}

window.category = category
getCategory()
