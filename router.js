// // В проде раскоментировать получитение id из тлг и убрать ручной ввод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const tlgid = 412697670;

let tryQty = 0;

if (
  Telegram.WebApp.platform == 'web' ||
  Telegram.WebApp.platform == 'tdesktop'
) {
  window.location.href = 'nomobile.html';
}

async function checkIfFirstEnter(tlgid, tryQty = 0) {
  try {
    const response = await fetch(
      `https://api.directual.com/good/api/v5/data/WebUser/isFirstEnter?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=&uid=${tlgid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    const payloadlength = data.payload.length;

    if (payloadlength === 0) {
      createNew(tlgid);
    } else if (payloadlength === 1) {
      // if (data.payload[0].canRewriteEnergy == false){
      //     localStorage.setItem('energy',1000)
      //     changeRewriteEnergy()
      // } else {
      //     window.location.href = "game.html";
      // }
      const userLevel = data.payload[0].userLevel;
      localStorage.setItem('userLevel', userLevel);
      
      const isSentWalletAdress=data.payload[0].isSentWalletAdress
      localStorage.setItem('isSentWalletAdress', isSentWalletAdress);
      
      const walletAdress=data.payload[0].walletAdress
      localStorage.setItem('walletAdress', walletAdress);


      checkUserInfo(tlgid, data.payload[0].canRewriteEnergy,data.payload[0].isNeedPlusScore);
    }
  } catch (error) {
    console.error('Ошибка запроса:', tryQty);

    if (tryQty < 2) {
      setTimeout(() => {
        checkIfFirstEnter(tlgid, tryQty + 1);
      }, 3000);
    } else {
      document.getElementById('loader').style.display = 'none';
      const trylater = document.getElementById('trylater');
      trylater.classList.remove('nonvisible');
    }
  }
}

checkIfFirstEnter(tlgid);

async function createNew(tlgid) {
  try {
    const response = await fetch(
      'https://api.directual.com/good/api/v5/data/rqsttocreatenewuser/rqstToCreateNewUser?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=',
      {
        method: 'POST',
        body: JSON.stringify({
          tlgid: tlgid,
          rqstIsOperated: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    window.location.href = 'firstcome.html';
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
  }
}

async function checkUserInfo(tlg, energy, score) {
  const promises = [];

  if (energy === false) {
    localStorage.setItem('energy', 1000);
    promises.push(changeRewriteEnergy()); // Добавляем в массив промисов
    console.log('энергии добавил');
  }

  if (score === true) {
    const currentscore = localStorage.getItem('score');
    let newscore = Number(currentscore) + 500;
    localStorage.setItem('score', newscore);
    promises.push(changeNeedPlusScore()); // Добавляем в массив промисов
    console.log('баллов добавил');
  }

  await Promise.all(promises); // Дожидаемся выполнения всех запросов
  // console.log ('редирект на game')
  window.location.href = 'game.html'; // Делаем редирект только после завершения запросов
}

async function changeRewriteEnergy() {
  try {
    const response = await fetch(
      'https://api.directual.com/good/api/v5/data/rqsttochangevariablecanrewriteenergy/rqstChangeRewriteEnergy?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=',
      {
        method: 'POST',
        body: JSON.stringify({
          uid: tlgid,
          isOperated: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    //   window.location.href = "game.html";
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}

async function changeNeedPlusScore() {
  try {
    const response = await fetch(
      'https://api.directual.com/good/api/v5/data/rqsttochangevariableisneedplusscore/rqstChangeNeedPlusScore?appID=b27175e7-b9eb-48bb-a207-e7b7e3c32835&sessionID=',
      {
        method: 'POST',
        body: JSON.stringify({
          uid: tlgid,
          isOperated: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    //   window.location.href = "game.html";
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
}
