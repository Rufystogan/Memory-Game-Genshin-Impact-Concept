//Array of flower artifact images
const  flowersArti =["FlowerArtifact1.png","FlowerArtifact1.png",
					 "FlowerArtifact2.png","FlowerArtifact2.png",
					 "FlowerArtifact3.png","FlowerArtifact3.png",
					 "FlowerArtifact4.png","FlowerArtifact4.png",
					 "FlowerArtifact5.png","FlowerArtifact5.png",
					 "FlowerArtifact6.png","FlowerArtifact6.png",
					 "FlowerArtifact7.png","FlowerArtifact7.png",
					 "FlowerArtifact8.png","FlowerArtifact8.png"
					 ];

//refers <ul> with .flowersdeck as class
const flowersdeck = document.querySelector(".flowersdeck");
//create an empty array to store the opened artifacts
let opened = [];
//create an empty array to store matched artifacts
let matched = [];
//Access the modal
const modal = document.getElementById("modal");
//access the reset button
const reset = document.querySelector(".reset-btn");
//access the play again button
const playAgain = document.querySelector(".play-again-btn");
//select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");
//create variable for moves counter, start the count at zero
let moves = 0;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array){
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function startGame(){
	//invoke shuffle function and store in variable
	const shuffleDeck = shuffle(flowersArti);
	//lterate over deck of flower artifact Array
	for (let i = 0; i < shuffleDeck.length; i++){
		//create <li> tags
		const liTag = document.createElement("LI");
		//give <li> class of card
		liTag.classList.add("card");
		//create the <img> tags
		const addImage = document.createElement("IMG");
		//append <img> to <li>
		liTag.appendChild(addImage);
		//set the img src path to the shuffled deck
		addImage.setAttribute("src", "img/" + shuffleDeck[i]);
		//add an alt tag to the image
		addImage.setAttribute("alt", "flower artifact from Geshin Impact Game");
		//update teh new <li> to the deck <ul>
		flowersdeck.appendChild(liTag);
	}
}
startGame();
function removeCard(){
	while(flowersdeck.hasChildNodes()){
		flowersdeck.removeChild(flowersdeck.firstChild);
	}
}
function timer(){
	time = setInterval(function(){
		seconds++;
		if(seconds === 60){
			minutes++;
			seconds = 0;
		}
		timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer:" +minutes+"Mins "+seconds + " Secs" ;
	}, 1000);
}

function stopTime(){
	clearInterval(time);
}
function resetEverything() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  // Reset moves count and reset its inner HTML
  moves = 0;
  movesCount.innerHTML = 0;
  // Clear both arrays that hold the opened and matched cards
  matched = [];
  opened = [];
  // Clear the deck
  removeCard();
  // Create a new deck
  startGame();
}
function movesCounter(){
	movesCount.innerHTML ++;
	moves ++;
}

/*compare two flower cards to see if the match or not*/
function compareTwo(){
	//when there are 2 cards in the opened array
	if(opened.length === 2){
		document.body.style.pointerEvents = "none";
	}
	if (opened.length === 2 && opened[0].src === opened[1].src){
		match();
	}else if (opened.length === 2 && opened[0].src !=opened[1].src){
		noMatch();
	}

}
function match(){
	setTimeout(function(){
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		document.body.style.pointerEvents = "auto";
		winGame();
		opened = [];
	},600);
	movesCounter();
}

function noMatch(){
	setTimeout(function(){
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];

 }, 700);
	movesCounter();
}

function AddStats(){
	const stats = document.querySelector(".modal-content");
	for (let i = 1; i <= 3;i++){
		const statsElement = document.createElement("p");
		statsElement.classList.add("stats");
		stats.appendChild(statsElement);
	}
	let p =stats.querySelectorAll("p.stats");
	p[0].innerHTML = "Times taken to complete: " + minutes + " Minutes and " + seconds + " Seconds";
	p[1].innerHTML = "Moves Taken: " + moves;
}

function displayModal(){
	const modalClose = document.getElementsByClassName("close")[0];
	modal.style.display= "block";
	modalClose.onclick = function(){
		modal.style.display = "none";
	};

	window.onclick = function(event){

	if (event.target == modal){
		modal.style.display = "none";

		}
	};

}

function winGame(){
	if (matched.length ===16){
		stopTime();
		AddStats();
		displayModal();
	}
}

flowersdeck.addEventListener("click", function(evt){
	if(evt.target.nodeName === "LI"){
		console.log(evt.target.nodeName + " Was clicked");
		if (timeStart === false){
			timeStart = true;
			timer();
		}
		flipCard();
	}

	function flipCard(){
		evt.target.classList.add("flip");
		addToOpened();
	}

	function addToOpened(){
		if (opened.length === 0 || opened.length === 1){
			opened.push(evt.target.firstElementChild);
		}

		compareTwo();
	}

});

reset.addEventListener("click", resetEverything);
playAgain.addEventListener("click", function(){
	modal.style.display ="none";
	resetEverything()
});