// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 41269767012



const popupfcbtn = document.getElementById('popupfc__btn').addEventListener('click', () => {
    window.location.href = "game.html";
})