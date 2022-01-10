const cards = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg'
    
];

const settings = {
    width: 4,
    height: 5
}

let firstCard=null;
const gameField = document.getElementById('game-field');

const bannerCard ='19.jpg';


const banner=document.createElement('img');
banner.setAttribute('src','19.jpg');

banner.classList.add('banner');

const gameheader = document.getElementById('game-header');
gameheader.after(banner);

let cardsCount=null;


let isBlocked=false;
let timer = null;


function handleCardClick(event){
    window.clearTimeout(timer);
    if(!isBlocked){
    const cell = event.currentTarget;
    const bg = cell.dataset.bg;

    cell.style.backgroundImage=`url(${bg})`;
    cell.classList.toggle('open');

    if(!firstCard){
        firstCard={
            card:cell,
            bg:bg,
        }
     } else {
        if(firstCard.bg===bg){
            cardsCount-=2;
            firstCard=null;
        

        } else {
            isBlocked=true;

            setTimeout(function() {
                cell.classList.toggle('open');
            firstCard.card.classList.toggle('open');
            cell.style.backgroundImage='';
            firstCard.card.style.backgroundImage='';

            firstCard=null;
            isBlocked=false;

            },600);
        }
    }
    timer = setTimeout(function() {
        if (cardsCount===0) {
            gameField.innerHTML='<h2>Поздравляю</h2>'

        }

    },600);
}
}

function handleStartButtonClick() {
gameField.innerHTML='';

cardsCount=settings.width*settings.height;
const usedBG=[];
const cardsBGS=[];

for (let i = 0; i < cardsCount; i++) {
    let selectedBG;
    if(i<cardsCount/2){
        const cardsBGIndex=Math.floor(Math.random()*cards.length);

        selectedBG=cards[cardsBGIndex];
        usedBG.push(selectedBG);  

    } else {
        selectedBG=usedBG.pop();
    }

    cardsBGS.push(selectedBG)
    
}

cardsBGS.sort(()=>Math.random()-0.5);

let iterator = 0;
for (let i = 0; i < settings.height; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < settings.width; j++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.bg=cardsBGS[iterator];
    card.addEventListener('click',handleCardClick)

    row.appendChild(card);
    iterator++;
    }

    gameField.appendChild(row);
    
    
}



}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click',handleStartButtonClick)


