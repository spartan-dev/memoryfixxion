//1.Globales
const cards = [
  {
    name: "Rick Sanchez",
    url: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    name: "Morty Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    name: "Summer Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    name: "Beth Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    name: "Jerry Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
  {
    name: "Abradolf Lincler",
    url: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
  },
  {
    name: "Amish Cyborg",
    url: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
  },
  {
    name: "Aqua Rick",
    url: "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
  },
  {
    name: "Arthricia",
    url: "https://rickandmortyapi.com/api/character/avatar/26.jpeg",
  },
  {
    name: "Baby Legs",
    url: "https://rickandmortyapi.com/api/character/avatar/29.jpeg",
  },
  {
    name: "Body Guard Morty",
    url: "https://rickandmortyapi.com/api/character/avatar/44.jpeg",
  },
  {
    name: "Calypso",
    url: "https://rickandmortyapi.com/api/character/avatar/60.jpeg",
  },
  {
    name: "Rick Sanchez",
    url: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    name: "Morty Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    name: "Summer Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    name: "Beth Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    name: "Jerry Smith",
    url: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
  {
    name: "Abradolf Lincler",
    url: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
  },
  {
    name: "Amish Cyborg",
    url: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
  },
  {
    name: "Aqua Rick",
    url: "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
  },
  {
    name: "Arthricia",
    url: "https://rickandmortyapi.com/api/character/avatar/26.jpeg",
  },
  {
    name: "Baby Legs",
    url: "https://rickandmortyapi.com/api/character/avatar/29.jpeg",
  },
  {
    name: "Body Guard Morty",
    url: "https://rickandmortyapi.com/api/character/avatar/44.jpeg",
  },
  {
    name: "Calypso",
    url: "https://rickandmortyapi.com/api/character/avatar/60.jpeg",
  },
];
let pickedCards = [];
let pairsClicked = 0;
let pairsGuessed = 0;
//=============================end of Globals

//maquetado=============================
const html = `
<div class="container"></div>
`;
const container = document.createElement("div");
container.innerHTML = html;
//colocacion=============================
document.body.appendChild(container);

//funciones=============================
const setCards = () => {
  suffleCards();
  console.log(cards);
  cards.forEach((card, index) => {
    const div1 = document.createElement("div");
    div1.dataset.cardname = card.name;
    div1.classList.add("card");
    div1.classList.add("image");
    //div1.style = `background-image:url('${card.url}')`;
    div1.id = index;
    const grid = document.querySelector("#container");
    grid.appendChild(div1);
  });
};

const showCard = (card) => {
  card.style = `background-image:url('${cards[card.id].url}')`;
  card.classList.remove("image");
  card.classList.toggle("active");
};
const getNameOfCard = (card) => {
  return card.dataset.cardname;
};

const suffleCards = () => {
  /*  for (let i = cards.length; i > 0; i--) {
    let random = Math.floor(Math.random() * i--);
    let temp = cards[i];
    cards[i] = cards[random];
    cards[random] = temp;
  } */
  cards.sort(() => {
    return 0.5 - Math.random();
  });
};
const hideCards = () => {
  let activeElements = document.querySelectorAll(".active");
  activeElements.forEach((element) => {
    element.style = ``;
    element.classList.add("image");
    element.classList.add("card");
    element.classList.toggle("active");
  });
};

const checkIfPair = (card1, card2) => {
  pairsClicked = pairsClicked + 1;
  if (card1 == card2) {
    pairsGuessed = pairsGuessed + 1;
    return true;
  } else {
    return false;
  }
};

const updatePairsBoard = () => {
  let clicked = document.querySelector("#pairs_clicked");
  let guessed = document.querySelector("#pairs_guessed");
  clicked.innerText = pairsClicked.toString();
  guessed.innerText = pairsGuessed.toString();
};
const removeActiveClass = () => {
  let activeElements = document.querySelectorAll(".active");
  activeElements.forEach((element, idx) => {
    element.classList.toggle("active");
  });
};

const isFinished = () => {
  if (pairsGuessed < 12) {
    return false;
  } else if (pairsGuessed == 12) {
    return true;
  }
};
//listeners =============================
const setListeners = () => {
  const cards = document.querySelectorAll(".image");
  cards.forEach((card) => {
    card.onclick = () => {
      if (pickedCards.length < 2) {
        showCard(card);
        let cardName = getNameOfCard(card);
        pickedCards.push(cardName);
        let cardOne = pickedCards[0];
        let cardTwo = pickedCards[1];
        if (pickedCards.length == 2) {
          //check at least two cards selected
          let arePairs = checkIfPair(cardOne, cardTwo);
          if (!arePairs) {
            setTimeout(() => {
              hideCards();
              pickedCards = [];
              updatePairsBoard();
            }, 1500);
          } else {
            pickedCards = [];
            removeActiveClass();
            updatePairsBoard();
            let finishIm = isFinished();
            if (finishIm) {
              alert("great you have won");
            }
          }
        }
      } else {
        alert("you cant chose yet!! 💀");
      }
    };
  });
};
//invocaciones=============================
setCards();
setListeners();
