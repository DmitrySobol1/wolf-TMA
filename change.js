// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
// window.Telegram.WebApp.enableClosingConfirmation()
const tlgid = 412697670;

setLevel();

function setLevel() {
  const userLevel = document.getElementById('userLevel');

  userLevel.textContent = localStorage.getItem('userLevel');

  if (userLevel.textContent == 1) {
    const notAvailableOnYourLevel = document.getElementById('notAvailableOnYourLevel');
    notAvailableOnYourLevel.style.display = 'flex';
  } else {
    const change__btnchangeddiv = document.getElementById('change__btnchangeddiv');
    change__btnchangeddiv.classList.remove('nonvisible')
  }
}

// кнопки главного меню
const mainmenubtn__btn1 = document
  .getElementById('mainmenubtn__btn1')
  .addEventListener('click', () => {
    window.window.location.href = 'game.html';
  });

const mainmenubtn__btn2 = document
  .getElementById('mainmenubtn__btn2')
  .addEventListener('click', () => {
    window.location.href = 'friend.html';
  });

// Всплывающее окно с информацией
const titleForModalChange = 'Здесь вы можете обменять баллы на монеты';
const descriptionForModalChange = 'Данный раздел сейчас находится в разработке';

const openModalBtn = document.getElementById('infoiconchange');
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-btn');

// Открытие окна
openModalBtn.addEventListener('click', function () {
  const title = (document.getElementById('modaltitle').textContent =
    titleForModalChange);
  const description = (document.getElementById('modaldescription').textContent =
    descriptionForModalChange);
  modal.classList.add('show');
});

// Закрытие окна
closeModalBtn.addEventListener('click', function () {
  modal.classList.remove('show');
});

//Закрытие по клику по любому месту модального окна
document.addEventListener('click', function (event) {
  if (event.target.dataset.name == 'modalwindow') {
    modal.classList.remove('show');
  }
});

// Info btn в разделе уровня
document.getElementById('infoiconLevel').addEventListener('click', () => {
  document.getElementById('modaltitle').textContent = 'Система уровней';
  document.getElementById(
    'modaldescription'
  ).innerHTML = `Приглашайте друзей и повышайте свой уровень: <br>
    1) Уровень 1 доступен при старте игры <br>
    2) Уровень 2 открывается после приглашения 10 рефералов<br>
    <i>на данном уровне открывается возможность обмена баллов на монеты</i><br>
    3) Уровен 3 открывается после приглашения 20 рефералов <br>
   <i>на данном уровне открывается возможность стейкинга и вывода монет </i>   `;
  modal.classList.add('show');
});
