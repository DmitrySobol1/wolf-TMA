// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 777

let initialScore 
const saveqty = 10;

getScore()
    
    
function getScore(){
        const scoreelement = document.getElementById('game__score__figures')
        const value = localStorage.getItem('score')
        scoreelement.textContent = value;
        initialScore = Number(value)
}

function setScore(value){
    localStorage.setItem('score',value)
}

document.getElementById('clickbtn').addEventListener('click',()=>{
    const scoreelement = document.getElementById('game__score__figures')
    let scoreelementvalue = Number(scoreelement.textContent)
    scoreelementvalue++
    scoreelement.textContent = scoreelementvalue
    setScore(scoreelementvalue)
    console.log ('initial=',initialScore,' currentScore=',scoreelementvalue)
    if (scoreelementvalue-initialScore>= saveqty ){
        // сохранение в БД
        saveToDB(scoreelementvalue,initialScore);
    }
})

// function saveToDB(currentvalue, initialvalue){
//     fetch('https://api.directual.com/good/api/v5/data/rqsttosavescore/rqstSaveScore?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=', {
//         method: 'POST',
//         // specify id if you want to edit existing objects
//         body: JSON.stringify({
//             'score': currentvalue,
//             'uid': tlgid,
//             'isOperated':false
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         }).then(res=>{
//             console.log(res.json())
            
//            
//             // if server == ок{
//             //     initialScore = currentvalue  
//             // }
//             // а если не ок {
//             //     scoreelementvalue = initialvalue
//             //     и в Local Storage обновить и на фронте
//                     // и обновить энергию и лимит на день
//             // }

//         })
// }
    


async function saveToDB(currentvalue, initialvalue) {
    try {
        const response = await fetch('https://api.directual.com/good/api/v5/data/rqsttosavescore/rqstSaveScore?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'score': currentvalue,
                'uid': tlgid,
                'isOperated': false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        
     
        if (data.result === 'allIsGood') {  
            initialScore = currentvalue;
            console.log (data.result)
            
        } else if (data.result === 'pnh') {
            console.log ('пнх')
             // document.getElementById('scoreElement').innerText = initialvalue; // Обновляем UI
            // localStorage.setItem('score', initialvalue); // Возвращаем старое значение в Local Storage
        }


// убрать это действие из функции, где клик кнопки обрабатываю
//             // if server == ок{
//             //     initialScore = currentvalue  
//             // }
//             // а если не ок {
//             //     scoreelementvalue = initialvalue
//             //     и в Local Storage обновить и на фронте
//                     // и обновить энергию и лимит на день
//             // }

        
    } catch (error) {
        console.error('Ошибка сети или сервера:', error);
    }
}




    
    // кнопки главного меню
    const mainmenubtn__btn2 = document.getElementById('mainmenubtn__btn2').addEventListener('click',()=>{
        window.location.href = "friend.html";
    })
    
    const mainmenubtn__btn3 = document.getElementById('mainmenubtn__btn3').addEventListener('click',()=>{
        window.location.href = "change.html";     
    })




    // Всплывающее окно с информацией
const titleForModalChange = 'Кликайте на волка - зарабатывайте баллы';
const descriptionForModalChange = 'Баллы можно обменять на реальные монеты';

const openModalBtn = document.getElementById("infoiconchange");
const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close-btn");

// Открытие окна
openModalBtn.addEventListener("click", function () {
        const title = document.getElementById('modaltitle').textContent = titleForModalChange
        const description = document.getElementById('modaldescription').textContent = descriptionForModalChange
        modal.classList.add("show");
});

// Закрытие окна
closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
});

// Закрытие по клику вне окна
document.addEventListener("click", function (event) {
       if (event.target === modal) {
            modal.classList.remove("show");
        }
});