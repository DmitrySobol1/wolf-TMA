// В проде раскоментировать получитение id из тлг и убрать ручной ввод
const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
window.Telegram.WebApp.enableClosingConfirmation()
// const tlgid = 412697670;
const currentScore = localStorage.getItem('score')


const isSentWalletAdress = localStorage.getItem('isSentWalletAdress');

setLevel();

function setLevel() {
  const userLevel = document.getElementById('userLevel');

  userLevel.textContent = localStorage.getItem('userLevel');

  if (userLevel.textContent == 1) {
    const notAvailableOnYourLevel = document.getElementById(
      'notAvailableOnYourLevel'
    );
    notAvailableOnYourLevel.style.display = 'flex';
  } else {
    const change__btnchangeddiv = document.getElementById(
      'change__btnchangeddiv'
    );
    change__btnchangeddiv.classList.remove('nonvisible');
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
    3) Уровень 3 открывается после приглашения 20 рефералов <br>
   <i>на данном уровне открывается возможность стейкинга и вывода монет </i>   `;
  modal.classList.add('show');
});


const btnchange = document.getElementById('btnchange')

btnchange.addEventListener('click', () => {
    const walletInfo = document.getElementById('walletInfo');

    if (currentScore <2500){
      
      const epmtyInfo = document.createElement('div');
              epmtyInfo.textContent = 'минимальная сумма для обмена 2500'
              epmtyInfo.classList.add('epmtyInfo')

              walletInfo.appendChild(epmtyInfo);
              
              setTimeout(()=>{
                epmtyInfo.classList.add('nonvisible')  
              },1500)



    } else{

    
    if (isSentWalletAdress == 'false') {
        addWalletAddress()
    } else {
        addSum()

    }
}})
    
        
    function addWalletAddress(){

        btnchange.style.display = 'none'

        const textInfo = document.createElement('div');
        textInfo.textContent = 'Укажите адрес вашего кошелька:';
        textInfo.classList.add ('change__textInfo')
      
        const inputWalletAdress = document.createElement('input');
        inputWalletAdress.classList.add('inputWalletAdress')

        const btnNext = document.createElement('button');
        btnNext.textContent='Далее >'
        btnNext.classList.add ('change__btnchange')

        walletInfo.appendChild(textInfo);
        walletInfo.appendChild(inputWalletAdress);
        walletInfo.appendChild(btnNext);
    
        btnNext.addEventListener('click',()=>{

            if (inputWalletAdress.value == ''){
              const epmtyInfo = document.createElement('div');
              epmtyInfo.textContent = 'заполните адрес кошелка'
              epmtyInfo.classList.add('epmtyInfo')

              walletInfo.appendChild(epmtyInfo);
              
              setTimeout(()=>{
                epmtyInfo.classList.add('nonvisible')  
              },1500)

            } else {
              const walletAdress=inputWalletAdress.value;
              textInfo.style.display = 'none'
              inputWalletAdress.style.display = 'none'
              btnNext.style.display = 'none'
              addSum(walletAdress)
            }
    
        })
      
    }

   
   
   function addSum(walletAdress = 'exist') {

    btnchange.style.display = 'none'

    const textInfo = document.createElement('div');
    textInfo.textContent = 'Укажите cумму для обмена:';
    textInfo.classList.add ('change__textInfo')
  
    const inputSum = document.createElement('input');
    inputSum.classList.add('inputWalletAdress')
    inputSum.type = 'number'

    const btnNext = document.createElement('button');
    btnNext.textContent='Далее >'
    btnNext.classList.add ('change__btnchange')

    walletInfo.appendChild(textInfo);
    walletInfo.appendChild(inputSum);
    walletInfo.appendChild(btnNext);


    btnNext.addEventListener('click',()=>{

      if (inputSum.value == ''){
        const epmtyInfo = document.createElement('div');
        epmtyInfo.textContent = 'заполните сумму'
        epmtyInfo.classList.add('epmtyInfo')

        walletInfo.appendChild(epmtyInfo);
        
        setTimeout(()=>{
          epmtyInfo.classList.add('nonvisible')  
        },1500)
      } 
        else if (inputSum.value % 2500 != 0){
          const epmtyInfo = document.createElement('div');
          epmtyInfo.textContent = 'число монет должно быть кратно 2500'
          epmtyInfo.classList.add('epmtyInfo')
  
          walletInfo.appendChild(epmtyInfo);
          
          setTimeout(()=>{
            epmtyInfo.classList.add('nonvisible')  
          },1500)


      } 

        else {
        const sum = inputSum.value
        // const sumToChange=inputSum.value;
        textInfo.style.display = 'none'
        inputSum.style.display = 'none'
        btnNext.style.display = 'none'
        
        const textInfo2 = document.createElement('div');
        textInfo2.textContent = 'Запрос на обмен отправлен администраторам';
        textInfo2.classList.add ('change__textInfo')
        walletInfo.appendChild(textInfo2);


          fetch('https://api.directual.com/good/api/v5/data/rqsttoexchangeballtocoin/rqstToExchange?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=', {
          method: 'POST',
          
          body: JSON.stringify({
            'sum': sum,
            'walletAdress': walletAdress,
            'user_id': tlgid,
            'isCoinSentByAdmin': false
          }),
          headers: {
              'Content-Type': 'application/json'
          },
          }).then(res=>{
              console.log(res.json())
          })
      }

  })
        
   }
   
   
    
     

          


       

         

          

          
  
          
 