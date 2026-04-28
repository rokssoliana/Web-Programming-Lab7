// ===== БЛОК 1: ЗМІННІ ДЛЯ РОБОТИ ТЕСТУ =====

let questions = []; // масив питань тесту
let currentQuestion = 0; // номер поточного питання
let userAnswers = []; // масив відповідей користувача


// ===== БЛОК 2: ОТРИМАННЯ HTML ЕЛЕМЕНТІВ =====

const questionText = document.getElementById("questionText"); // текст питання
const answersBlock = document.getElementById("answers"); // блок варіантів відповіді
const nextBtn = document.getElementById("nextBtn"); // кнопка наступного питання
const finishBtn = document.getElementById("finishBtn"); // кнопка завершення тесту
const resultBlock = document.getElementById("result"); // блок результату
const numbersBlock = document.getElementById("numbers"); // блок номерів питань
const restartBtn = document.getElementById("restartBtn"); // кнопка повторного тесту

let dataJSON; // змінна для JSON даних


// ===== БЛОК 3: ЗАВАНТАЖЕННЯ ПИТАНЬ З JSON =====

fetch("questions.json") // завантажуємо файл з питаннями
.then(response => response.json()) // перетворюємо відповідь у JSON
.then(data => {

    dataJSON = data; // зберігаємо дані
    startTest(); // запускаємо тест

});


// ===== БЛОК 4: ФОРМУВАННЯ ТЕСТУ (6 ПИТАНЬ) =====

function startTest(){

    const selected = [

        ...shuffle(dataJSON.single).slice(0,2).map(q => ({...q,type:"single"})), // беремо 2 питання з single
        ...shuffle(dataJSON.multiple).slice(0,2).map(q => ({...q,type:"multiple"})), // беремо 2 питання з multiple
        ...shuffle(dataJSON.text).slice(0,2).map(q => ({...q,type:"text"})) // беремо 2 питання з text

    ];

    questions = shuffle(selected); // перемішуємо всі питання

    currentQuestion = 0; // починаємо тест з першого питання
    userAnswers = []; // очищаємо відповіді

    numbersBlock.innerHTML=""; // очищаємо блок номерів
    resultBlock.innerHTML=""; // очищаємо результат

    createNumbers(); // створюємо кнопки з номерами
    showQuestion(); // показуємо перше питання

}


// ===== БЛОК 5: ФУНКЦІЯ ПЕРЕМІШУВАННЯ =====

function shuffle(array){
    return array.sort(() => Math.random() - 0.5); // випадкове сортування
}


// ===== БЛОК 6: СТВОРЕННЯ НОМЕРІВ ПИТАНЬ =====

function createNumbers(){

    questions.forEach((q,i)=>{

        const btn=document.createElement("button"); // створюємо кнопку
        btn.textContent=i+1; // номер питання

        btn.onclick=()=>{

            saveAnswer(); // зберігаємо відповідь
            currentQuestion=i; // переходимо до вибраного питання
            showQuestion(); // показуємо питання

        };

        numbersBlock.appendChild(btn); // додаємо кнопку

    });

}


// ===== БЛОК 7: ВІДОБРАЖЕННЯ ПИТАННЯ =====

function showQuestion(){

    const q = questions[currentQuestion]; // поточне питання

    questionText.textContent = (currentQuestion+1)+". "+q.question; // текст питання

    answersBlock.innerHTML=""; // очищаємо блок відповідей


    // ----- RADIO (одна відповідь)

    if(q.type==="single"){

        q.options.forEach((opt,i)=>{

            const label=document.createElement("label");

            label.innerHTML =
            `<input type="radio" name="answer" value="${i}"> ${opt}`;

            answersBlock.appendChild(label);

        });

    }


    // ----- CHECKBOX (кілька відповідей)

    if(q.type==="multiple"){

        q.options.forEach((opt,i)=>{

            const label=document.createElement("label");

            label.innerHTML =
            `<input type="checkbox" value="${i}"> ${opt}`;

            answersBlock.appendChild(label);

        });

    }


    // ----- TEXT (текстове поле)

    if(q.type==="text"){

        const input=document.createElement("input");
        input.type="text";
        input.placeholder="Введіть відповідь";

        answersBlock.appendChild(input);

    }

    highlightNumber(); // підсвічуємо номер питання


    // ----- керування кнопками

    if(currentQuestion===questions.length-1){

        nextBtn.style.display="none"; // ховаємо кнопку далі
        finishBtn.style.display="block"; // показуємо завершення

    }else{

        nextBtn.style.display="block";
        finishBtn.style.display="none";

    }

}


// ===== БЛОК 8: ПІДСВІЧУВАННЯ НОМЕРА ПИТАННЯ =====

function highlightNumber(){ // функція підсвічує номер поточного питання

    const buttons = numbersBlock.querySelectorAll("button"); // отримуємо всі кнопки з номерами

    buttons.forEach(b=>b.classList.remove("active")); // прибираємо підсвічування у всіх кнопок

    buttons[currentQuestion].classList.add("active"); // підсвічуємо кнопку поточного питання

}


// ===== БЛОК 9: ЗБЕРЕЖЕННЯ ВІДПОВІДІ =====

function saveAnswer(){ // функція зберігає відповідь користувача

    const q = questions[currentQuestion]; // беремо поточне питання


    if(q.type==="single"){ // якщо тип питання radio

        const selected=document.querySelector("input[name='answer']:checked"); // знаходимо вибраний radio

        userAnswers[currentQuestion]= selected ? Number(selected.value) : null; // зберігаємо значення

    }


    if(q.type==="multiple"){ // якщо тип питання checkbox

        const selected=[...document.querySelectorAll("input[type='checkbox']:checked")] // беремо всі вибрані checkbox
        .map(el=>Number(el.value)); // перетворюємо їх значення у числа

        userAnswers[currentQuestion]=selected; // зберігаємо відповіді

    }


    if(q.type==="text"){ // якщо текстове питання

        const val=document.querySelector("input[type='text']").value; // отримуємо введений текст

        userAnswers[currentQuestion]=val; // зберігаємо текстову відповідь

    }


    if(userAnswers[currentQuestion] !== null && userAnswers[currentQuestion] !== undefined){ // якщо відповідь є

        const buttons = numbersBlock.querySelectorAll("button"); // отримуємо кнопки номерів

        buttons[currentQuestion].classList.add("answered"); // позначаємо питання як відповіле

    }

}


// ===== БЛОК 10: КНОПКА НАСТУПНОГО ПИТАННЯ =====

nextBtn.addEventListener("click", ()=>{ // подія натискання кнопки "далі"

    saveAnswer(); // зберігаємо відповідь
    currentQuestion++; // переходимо до наступного питання
    showQuestion(); // показуємо нове питання

});


// ===== БЛОК 11: КНОПКА ЗАВЕРШЕННЯ ТЕСТУ =====

finishBtn.addEventListener("click", ()=>{ // подія натискання кнопки завершення

    saveAnswer(); // зберігаємо відповідь
    showResult(); // показуємо результат тесту

});


// ===== БЛОК 12: ПІДРАХУНОК РЕЗУЛЬТАТУ =====

function showResult(){ // функція обчислення результату

    let correct=0; // лічильник правильних відповідей
    let resultHTML=""; // змінна для HTML результату

    questions.forEach((q,i)=>{ // перебираємо всі питання

        const user=userAnswers[i]; // відповідь користувача
        let correctAnswer=""; // правильна відповідь


        if(q.type==="single"){ // якщо питання radio

            correctAnswer=q.options[q.answer]; // отримуємо правильну відповідь

            if(user===q.answer) correct++; // якщо відповідь правильна — додаємо бал

        }


        if(q.type==="multiple"){ // якщо checkbox

            correctAnswer=q.answer.map(a=>q.options[a]).join(", "); // формуємо список правильних відповідей

            const userSet = new Set(user); // відповіді користувача
            const correctSet = new Set(q.answer); // правильні відповіді

            let match = true; // прапорець правильності

            correctSet.forEach(a=>{ // перевіряємо всі правильні відповіді
                if(!userSet.has(a)) match=false; // якщо якоїсь немає — відповідь неправильна
            });

            if(match) correct++; // якщо всі співпали — додаємо бал

        }


        if(q.type==="text"){ // якщо текстове питання

            correctAnswer=q.answer; // правильна відповідь

            if(user?.toLowerCase().trim()===q.answer.toLowerCase()) correct++; // порівнюємо без регістру

        }


        resultHTML += ` 
        <div style="margin-bottom:20px;">
        <b>${i+1}. ${q.question}</b><br>
        Ваша відповідь: ${Array.isArray(user) ? user.map(u=>q.options[u]).join(", ") : user}<br>
        Правильна відповідь: <span style="color:green">${correctAnswer}</span>
        </div>
        `; // формуємо HTML результату

    });


    const previous = localStorage.getItem("testResult"); // отримуємо попередній результат


    resultBlock.innerHTML=` 
        <h2>Результат тесту</h2>
        Правильних відповідей: ${correct} з ${questions.length}<br>
        Попередній результат: ${previous ? previous : "немає"}
        <hr>
        ${resultHTML}
    `; // показуємо результат на сторінці


    localStorage.setItem("testResult", correct); // зберігаємо результат у LocalStorage

    restartBtn.style.display="inline-block"; // показуємо кнопку повторного тесту

}


// ===== БЛОК 13: ПОВТОРНЕ ПРОХОДЖЕННЯ ТЕСТУ =====

restartBtn.addEventListener("click", ()=>{ // подія натискання кнопки повтору

    startTest(); // запускаємо тест заново

});