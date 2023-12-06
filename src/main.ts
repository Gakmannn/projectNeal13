import './style.css'

// JS_PZ_Module_15_16_Week_21_1548323208.pdf

// 1. HTML page with tabs.


const tabs = document.querySelectorAll('[data-tab-value]') as NodeListOf<HTMLElement>
const tabInfos = document.querySelectorAll('[data-tab-info]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tabValue) {
      const target = document.getElementById(tab.dataset.tabValue)
      tabInfos.forEach(tabInfo => {
        tabInfo.classList.remove('active')
      })
      if (target) target.classList.add('active')
    }
  })
})


// 2. Modal window.
const updateButton = document.getElementById('updateDetails') as HTMLElement;
const dialog = document.getElementById("favDialog") as HTMLDialogElement;
// const cancelButton = dialog.querySelector("[type=reset]") as HTMLElement;
// const confirm = dialog.querySelector("[type=submit]") as HTMLElement;
const select = dialog.querySelector("#favAnimal") as HTMLSelectElement

dialog.addEventListener('close', (e) => {
  if (dialog.returnValue == 'cancel') {
    console.log("Canceled");
  } else {
    console.log(select.value)
  }
})


// function openCheck(dialog: any) {
//     if (dialog.open) {
//         console.log("Dialog open");
//     } else {
//         console.log("Dialog closed");
//     }
// }

updateButton.addEventListener("click", () => {
  dialog.showModal();
});


// cancelButton.addEventListener("click", () => {
//     dialog.close();
//     console.log("animalNotChosen")
//     openCheck(dialog);
// });

// confirm.addEventListener("click", () => {
//     dialog.close();
//     const 
//     openCheck(dialog);
// });

// return.value = "favDialog"

// 3. Text field with autocomplete.
// 4. User rating score card

const rating = {
  "header": "User rating",
  "maxvalue": 254,
  "data": [
    {
      "title": "5 stars",
      "value": 190
    },
    {
      "title": "4 stars",
      "value": 63
    },
    {
      "title": "3 stars",
      "value": 15
    },
    {
      "title": "2 stars",
      "value": 6
    },
    {
      "title": "1 star",
      "value": 20
    }
  ]
}

const ratingDiv = document.querySelector('.userRating') as HTMLDivElement

function renderRating() {
  ratingDiv.innerHTML = ''
  ratingDiv.innerHTML += `<span class="heading">${rating.header}</span>`
  ratingDiv.innerHTML += `<hr style="border: 3px solid #f1f1f1">`
  rating.data.forEach(el=>{
    ratingDiv.innerHTML += `<div class="side">
    <div>${el.title}</div>
  </div>
  <div class="middle">
    <div class="bar-container">
      <div style="width:${el.value/rating.maxvalue*100}%" class="bar-${el.title[0]}"></div>
    </div>
  </div>
    <div class="side right">
      <div>${el.value}</div>
    </div>`
  })
}

renderRating()

const cards = document.querySelectorAll('.memory-card') as NodeListOf<HTMLDivElement>
const startGame = document.querySelector('#startGame') as HTMLButtonElement
const cardsSvg = ['2D','4H','7D','9S','2D','4H','7D','9S'] 
const shuffleArray = (array:any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let isGameRun = false
let showPause = false
let card1: Element|undefined
let card2: Element|undefined

document.body.addEventListener('click', (e:MouseEvent) => {

  if (e.target == startGame) {
    isGameRun = !isGameRun
    if (isGameRun) {
      startGame.textContent = 'Finish'
      shuffleArray(cardsSvg)
      cards.forEach((el,i) => {
        (el.querySelector('.front-face') as HTMLImageElement).src = 'images/'+cardsSvg[i]+'.svg'   
      })
    } else {
      startGame.textContent = 'Start'
      cards.forEach(el => {
        el.classList.remove('flip')
      })
    }
  }

  const card = (e.target as HTMLElement).closest('.memory-card')
  
  if (card && isGameRun && !showPause) {
    card.classList.toggle('flip')
    if (card.classList.contains('flip')) {
      if (!card1) {
        card1 = card
      } else {
        card2 = card
      }
      if (card1 && card2) {
        // check value
        if ((card1.querySelector('.front-face') as HTMLImageElement).src == (card2.querySelector('.front-face') as HTMLImageElement).src) {
          // if same value clear cards
          console.log('true')
          card1 = card2 = undefined
        } else {
          console.log('false')
          // if not same -> clear cards and toggle flip
          showPause = true
          setTimeout(()=>{
            showPause = false            
            card1?.classList.toggle('flip')
            card2?.classList.toggle('flip')
            card1 = card2 = undefined
          },3000)
        }
      }
    }
  }
})


console.log(import.meta.env)
let marker = 100
const input = document.querySelector('input') as HTMLInputElement
const printMachine = document.querySelector('.printMachine') as HTMLDivElement
printMachine.innerHTML = localStorage.text ? localStorage.text : ''
input.addEventListener('input', (e) => {
  const inputEvent = e as InputEvent
  if (inputEvent.inputType == 'insertText') {
    printMachine.innerHTML += `<span style="opacity: ${marker/100}">${inputEvent.data}</span>`
    localStorage.text = printMachine.innerHTML
    if (inputEvent.data != ' ') marker -= 0.5
  }
})