// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 777
let reflink

reflinkmaker()

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



document.getElementById("friend__btnaddfriend").addEventListener("click", () => {
  const msgtxt = 'Заходи в игру и забирай 1000 баллов от меня:'
  const link = `https://telegram.me/wolf_games_bot?start=${reflink}`
//   const msglink = 'https://telegram.me/wolf_games_bot?start=ref--12345678-eee4-4fb7-b2f4-75161f1537f6'
  window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${msgtxt} ${link}`); 
})



// document.getElementById("refbtn").addEventListener("click", () => {
//     reflinkmaker()
//      })


function reflinkmaker() {
    const temptlgid = tlgid
    const templatelink = '12345678-ed1e-4477-8e19-1b8e71ab2689';
    let newId = temptlgid.toString() + 'e';
    const firstPart = newId.padEnd(8, '0').slice(0, 8); 
    const secondPart = newId.padEnd(12, '0').slice(8, 12); 
    const thirdPart = templatelink.split('-').slice(2).join('-');
    reflink = `${firstPart}-${secondPart}-${thirdPart}`;
    console.log(reflink);
}





