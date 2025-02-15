const mainmenubtn__btn1 = document.getElementById('mainmenubtn__btn1').addEventListener('click',()=>{
    window.
    window.location.href = "game.html";
})
    
    const mainmenubtn__btn2 = document.getElementById('mainmenubtn__btn2').addEventListener('click',()=>{
        window.location.href = "friend.html";
})




document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close-btn");

    // Открытие окна
    openBtn.addEventListener("click", function () {
        modal.classList.add("show");
    });

    // Закрытие окна
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    // Закрытие по клику вне окна
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
