document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let vidas = 5
  let nameGlobal = ""
  let historial = ""


  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch(id) {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
      vidas = vidas-1
      document.getElementById("namePlayer").innerText = 'Current Player: ' +  nameGlobal + "///" + 'Remaining Lives:' + " " + vidas

      //console.log(id)
      if(vidas == 0){
        alert('Game Over')
        Array.from(document.getElementsByTagName("img")).forEach(img =>{
          img.hidden = true
        })
      }
    }
    console.log(historial)
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  let contador = 0
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    if(contador == 0){
      historial = historial + " " + "Pictures "  + cardId + ' &'
      contador += 1
    }else{
      historial = historial + " " + cardId + "\n"
      contador = 0
    }

    //console.log(cardId)
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      //setTimeout(checkForMatch(cardId), 500)
      setTimeout(() => { checkForMatch(cardId) }, 500);
    }
  }

  createBoard()

  //Modal para mostrar instrucciones
  if(document.getElementById("btnModal")){
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];


    btn.onclick = function() {
      modal.style.display = "block";

      body.style.position = "static";
      body.style.height = "100%";
      body.style.overflow = "hidden";
    }

    span.onclick = function() {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
      }
    }
  }
  //modal para solicitar nombre de jugador
  if(document.getElementById("btnModalName")){
    var modalName = document.getElementById("myModal2");
    var btnName = document.getElementById("btnModalName");
    var spanName = document.getElementsByClassName("closeName")[0];
    var bodyName = document.getElementsByTagName("body")[0];


    btnName.onclick = function() {
      modalName.style.display = "block";

      bodyName.style.position = "static";
      bodyName.style.height = "100%";
      bodyName.style.overflow = "hidden";
    }

    spanName.onclick = function() {
      modalName.style.display = "none";

      bodyName.style.position = "inherit";
      bodyName.style.height = "auto";
      bodyName.style.overflow = "visible";
    }

    window.onclick = function(event) {
      if (event.target === modalName) {
        modalName.style.display = "none";

        bodyName.style.position = "inherit";
        bodyName.style.height = "auto";
        bodyName.style.overflow = "visible";
      }
    }
  }
  //Evento para llevar el nombre del jugador a la pantalla
  window.addEventListener('load', () =>
  {
    const divName = document.querySelector('#namePlayer');
    const boton = document.querySelector('#send');
    const btnMovements = document.querySelector('#showMovements');
    const divMovements = document.querySelector('#divMovements')

    boton.addEventListener('click', function()
    {
      const name = document.querySelector('#name').value;
      divName.innerHTML = 'Current Player: ' +  name + ' /// ' + "Remaining Lives: " + vidas
      document.getElementById("name").value = ""
      nameGlobal = name
    });

    btnMovements.addEventListener('click', function()
    {
      divMovements.innerHTML = 'Movements History: ' +  historial
    });

  });



})

