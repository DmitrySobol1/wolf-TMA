// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 777

const popupfcbtn = document.getElementById('popupfc__btn').addEventListener('click', () => {
    window.location.href = "game.html";
})

giveBonus()

function giveBonus(){
    localStorage.setItem('score',1000)
}