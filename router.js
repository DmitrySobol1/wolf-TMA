// В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 777
let tryQty = 0

async function checkIfFirstEnter(tlgid, tryQty = 0) {
    try {
        const response = await fetch(
            `https://api.directual.com/good/api/v5/data/WebUser/isFirstEnter?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=&uid=${tlgid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json(); 
        const payloadlength = data.payload.length;

        if (payloadlength === 0) {
             createNew(tlgid);
            
        } else if (payloadlength === 1) {
            console.log('существует');
            window.location.href = "game.html";
        }

    } catch (error) {
        console.error("Ошибка запроса:", tryQty);
        
        if (tryQty < 2) {  
            setTimeout(() => {
                checkIfFirstEnter(tlgid, tryQty + 1); 
            }, 3000);
        } else {
            document.getElementById("loader").style.display = "none";
            const trylater = document.getElementById('trylater');
            trylater.classList.remove('nonvisible');
            
        }
    }
}

  checkIfFirstEnter(tlgid)
  


  async function createNew(tlgid) {
    try {
        const response = await fetch(
            'https://api.directual.com/good/api/v5/data/rqsttocreatenewuser/rqstToCreateNewUser?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=',
            {
                method: 'POST',
                body: JSON.stringify({
                    'tlgid': tlgid,
                    'rqstIsOperated':false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); 
        console.log(data); 
        window.location.href = "firstcome.html"; 

    } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
    }
}