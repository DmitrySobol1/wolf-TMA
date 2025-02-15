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