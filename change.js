const mainmenubtn__btn1 = document.getElementById('mainmenubtn__btn1').addEventListener('click',()=>{
    window.
    window.location.href = "game.html";
})
    
    const mainmenubtn__btn2 = document.getElementById('mainmenubtn__btn2').addEventListener('click',()=>{
        window.location.href = "friend.html";
})

const titleForModalChange = 'Здесь вы можете обменять баллы на монеты';
const descriptionForModalChange = 'Данный раздел сейчас находится в разработке';




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
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

