// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 777

let initialScore 
let energy
const saveqty = 10000;

const level2 = 1020
const level3 = 1040


// Всплывающее окно с информацией
const titleForModalChange = 'Кликайте на волка - зарабатывайте баллы';
const descriptionForModalChange = 'Баллы можно обменять на реальные монеты';
const openModalBtn = document.getElementById("infoiconchange");
const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close-btn");


getScore()
    
    
function getScore(){
        const scoreelement = document.getElementById('game__score__figures')
        const value = localStorage.getItem('score')
        scoreelement.textContent = value;
        initialScore = Number(value)

        const energyelement = document.getElementById('game__energy__currentlevel')
        const valueenergy = localStorage.getItem('energy')
        energyelement.textContent = valueenergy;
        energy = Number(valueenergy)

        setWolfImg(initialScore)

}

function setWolfImg(value) {
    const wolfimg = document.getElementById('clickelement');
    
    if (value >= level3) {
        wolfimg.src = 'assets/wolf3.png';
    } else if (value >= level2) {
        wolfimg.src = 'assets/wolf2.png';
    } else {
        wolfimg.src = 'assets/wolf1.png';
    }
}

function setScore(score,energy){
    localStorage.setItem('score',score)
    localStorage.setItem('energy',energy)
}

// Клик
document.getElementById('clickbtn').addEventListener('click',()=>{
    
    const energyelement = document.getElementById('game__energy__currentlevel')
    let energyelementvalue = Number(energyelement.textContent)

    if (energyelementvalue <=0){
        console.log ('отриц энергия')
        document.getElementById('modaltitle').textContent = 'Энергия закончилась'
        document.getElementById('modaldescription').textContent = 'Обнуление энергии произойдет в 00:00мск'
        modal.classList.add("show");
    } else {    
        energyelementvalue--
        energyelement.textContent = energyelementvalue

        const scoreelement = document.getElementById('game__score__figures')
        let scoreelementvalue = Number(scoreelement.textContent)
        scoreelementvalue++
        scoreelement.textContent = scoreelementvalue

        setScore(scoreelementvalue,energyelementvalue)
        setWolfImg(scoreelementvalue)
        console.log ('initial=',initialScore,' currentScore=',scoreelementvalue);


        ////// + 1 элемент

        // Создаем элемент "+1"
        const plusOdin = document.createElement('div');
        plusOdin.textContent = '+1';
        plusOdin.classList.add('game__click__plusodin');

        // Устанавливаем позицию "+1" относительно клика
        const rect = clickbtn.getBoundingClientRect();
        plusOdin.style.left = `${event.clientX - rect.left - 1}px`;
        plusOdin.style.top = `${event.clientY - rect.top - 1}px`;

        // Добавляем "+1" внутрь элемента
        clickbtn.appendChild(plusOdin);

        // Запускаем анимацию (поднимаем вверх и уменьшаем прозрачность)
        setTimeout(() => {
            plusOdin.style.transform = 'translateY(-20px)';
            plusOdin.style.opacity = '0';
        }, 10);

        // Удаляем "+1" через 1 сек
        setTimeout(() => {
            plusOdin.remove();
        }, 1000);


        if (scoreelementvalue === level2 || scoreelementvalue === level3  ){
            congratulate();
        }

        if (scoreelementvalue-initialScore>= saveqty ){
            // сохранение в БД
            saveToDB(scoreelementvalue,initialScore,energyelementvalue);
        }
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
    


async function saveToDB(currentvalue, initialvalue,energyvalue) {
    try {
        const response = await fetch('https://api.directual.com/good/api/v5/data/rqsttosavescore/rqstSaveScore?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'score': currentvalue,
                'uid': tlgid,
                'isOperated': false,
                'energy':energyvalue
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
        } else if (data.result === 'refreshenergy') {
            console.log (data.result)
            initialScore = currentvalue 
            localStorage.setItem('energy',1000)
            const energyelement = document.getElementById('game__energy__currentlevel')
            energyelement.textContent = 1000
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






// Открытие окна
openModalBtn.addEventListener("click", function () {
    console.log ('clicked')
        document.getElementById('modaltitle').textContent = titleForModalChange
        document.getElementById('modaldescription').textContent = descriptionForModalChange
        modal.classList.add("show");
});

// Закрытие окна
closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
});

//Закрытие по клику по любому месту модального окна
document.addEventListener("click", function (event) {
if (event.target.dataset.name == 'modalwindow'){    
modal.classList.remove("show");
}
    })


function congratulate(){
    document.getElementById('modaltitle').textContent = 'Поздравляем!'
    document.getElementById('modaldescription').textContent = 'Вы достигли нового уровня'
    modal.classList.add("show"); 
}









