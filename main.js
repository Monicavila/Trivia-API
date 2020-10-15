
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
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${dificultad}&type=${Tipo}`)
        .then(response => response.json())
        .then(data =>  {printCards(data.results)
                        })
}

// console.log(datos);
function printCards(questions) {
    const container = document.getElementById('container-cards')
    container.innerHTML = '';
    questions.forEach((question, indexCard)=> {
        const card = returnCardHTML(question, indexCard)
        container.innerHTML += card;
    });
    // button
    const hola = correctAnswer(questions)
    container.innerHTML += `<button type="button" value='${hola}' onclick="validate(correctAnswer)" id='btnWorked' class="btn btn-success m-5">Validar</button>`
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
                            <input class="form-check-input" type="radio" name="radios-${indexCard}" id="radio${indexCard}-${index}" value='${incorrect}'>
                            <label class="form-check-label" for="radio${indexCard}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })
    return incorrectHTML;
}

function correctAnswer(results) {
    let correctAns = []
    results.forEach( result => correctAns.push(result.correct_answer))
    console.log(correctAns)
    return correctAns
    /////////    
}

function validate() {
    const btnVAl = document.getElementById('btnWorked').value
    console.log( btnVAl)
    const res = btnVAl.split(',')
    console.log( res)
    const numCards = document.getElementById('questions-number').value
    let numGood = 0
    for(let i = 0; i < numCards; i++){
        const opciones = document.getElementsByName(`radios-${i}`)
        opciones.forEach(opcion=> {
            if (opcion.checked){
                 if (opcion.value == res[i]){
                     console.log('asertaste')
                     numGood ++
                 }else{
                    console.log('fallaste')
                 }
            }
        })
        
    }
    alert('tienes bien: ' + numGood + ' respuestas')
}





window.category = category
getCategory()
