// кнопки главного меню
const mainmenubtn__btn1 = document.getElementById('mainmenubtn__btn1').addEventListener('click',()=>{
window.
window.location.href = "game.html";
})

const mainmenubtn__btn3 = document.getElementById('mainmenubtn__btn3').addEventListener('click',()=>{
    window.location.href = "change.html";     
})


// Всплывающее окно с информацией
const titleForModalChange = 'Приглашайте друзей и зарабатывайте баллы';
const descriptionForModalChange = 'За каждого приглашенного друга вы получаете 500 баллов и друг получает 1000 баллов';

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

// Закрытие по клику по любому месту модального окна
document.addEventListener("click", function (event) {
    if (event.target.dataset.name == 'modalwindow'){    
    modal.classList.remove("show");
    }
        })



document.getElementById('refbtn').addEventListener('click',()=>{
    console.log ('ref btn clicked')
    // const inviteLink = "https://t.me/your_bot?start=777";
    window.Telegram.WebApp.openTelegramLink('tg://msg_url?url=https://t.me/your_bot?start=777');
})
