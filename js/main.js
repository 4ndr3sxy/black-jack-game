const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let cardsUser = '';
let cardsUserArray = [];
let cardsDealer = '';
let cardsDealerArray = [];
let scoreUser = 0;
let scoreDealer = 0;
let flag = false;
let valuesDealer = [];
let suitsDealer = [];

function start() {
	getDeck();
}

function getDeck() {
	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < values.length; x++) {
			let card = { value: values[x], suit: suits[i] };
			deck.push(card);
		}
	}
	shuffle();
}

function shuffle() {
	for (let i = 0; i < 1000; i++) {
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
	console.log(deck);
	alert('The cards will be dealt');
	dealt();
}


function deleteCard() {
	console.log(deck[Object.keys(deck)[0]]);
	delete deck[Object.keys(deck)[0]];
}

function dealt() {
	dealtSpecific('u', 2);
	dealtSpecific('d', 2);
	scoreUser = calcscore(cardsUserArray);
	if (scoreUser === 21) {
		alert('User win with 21 score with 2 cards, Congratulations!');
	}
	informationConsole();
	user = document.getElementById('cardsU').innerText = cardsUser;
	dealer = document.getElementById('cardsD').innerText = cardsDealer;
}

function dealtSpecific(objectTxt, count) {
	if (objectTxt === 'u') {
		for (let i = 0; i < count; i++) {
			cardsUser += deck[Object.keys(deck)[0]].value + ' ' + deck[Object.keys(deck)[0]].suit + ' - ';
			value = parseInt(deck[Object.keys(deck)[0]].value);
			if (isNaN(value)) {
				if (deck[Object.keys(deck)[0]].value === 'A') {
					cardsUserArray.push(1);
				} else {
					cardsUserArray.push(10);
				}
			} else {
				cardsUserArray.push(value);
			}
			deleteCard();
		}
	} else {
		for (let i = 0; i < count; i++) {
			cardsDealer += '? ' + ' ? - ';
			value = parseInt(deck[Object.keys(deck)[0]].value);
			if (isNaN(value)) {
				if (deck[Object.keys(deck)[0]].value === 'A') {
					cardsDealerArray.push(1);
				} else {
					cardsDealerArray.push(10);
				}
			} else {
				cardsDealerArray.push(value);
			}
			valuesDealer.push(deck[Object.keys(deck)[0]].value);
			suitsDealer.push(deck[Object.keys(deck)[0]].suit);
			deleteCard();
		}
	}
}

function giveMe() {
	let value = 0;
	cardsUser += deck[Object.keys(deck)[0]].value + ' ' + deck[Object.keys(deck)[0]].suit + ' - ';
	value = parseInt(deck[Object.keys(deck)[0]].value);
	if (isNaN(value)) {
		if (deck[Object.keys(deck)[0]].value === 'A') {
			cardsUserArray.push(1);
		} else {
			cardsUserArray.push(10);
		}
	} else {
		cardsUserArray.push(value);
	}
	deleteCard();

	user = document.getElementById('cardsU').innerText = cardsUser;
	scoreUser = calcscore(cardsUserArray);
	if (scoreUser > 21) {
		cardsDealerhidden();
		alert(`User lost with ${scoreUser} score with ${cardsUserArray.length} cards!`);
		scoreDealer = calcscore(cardsDealerArray);
		alert(`Dealer win with ${scoreDealer} score with ${cardsDealerArray.length} cards!`);
	}
	informationConsole();
}

function stop() {
	let value = 0;
	scoreDealer = calcscore(cardsDealerArray);
	cardsDealerhidden();
	while (scoreDealer < scoreUser) {
		flag = true;
		cardsDealer += deck[Object.keys(deck)[0]].value + ' ' + deck[Object.keys(deck)[0]].suit + ' - ';
		value = parseInt(deck[Object.keys(deck)[0]].value);
		if (isNaN(value)) {
			if (deck[Object.keys(deck)[0]].value === 'A') {
				cardsDealerArray.push(1);
			} else {
				cardsDealerArray.push(10);
			}
		} else {
			cardsDealerArray.push(value);
		}
		deleteCard();
		document.getElementById('cardsD').innerText = cardsDealer;

		scoreDealer = calcscore(cardsDealerArray);
		if (scoreDealer >= scoreUser && scoreDealer < 22) {
			alert(`Dealer win with ${scoreDealer} score with ${cardsDealerArray.length} cards!`);
			alert(`User lost with ${scoreUser} score with ${cardsUserArray.length} cards!`);
			break;
		} else if (scoreDealer > 21) {
			alert(`Dealer lost with ${scoreDealer} score with ${cardsDealerArray.length} cards!`);
			alert(`User win with ${scoreUser} score with ${cardsUserArray.length} cards, congratulations!`);
			break;
		}
		informationConsole();
	}
	if (flag === false) {
		document.getElementById('cardsD').innerText = cardsDealer;
		alert(`Dealer win with ${scoreDealer} score with ${cardsDealerArray.length} cards!`);
		alert(`User lost with ${scoreUser} score with ${cardsUserArray.length} cards!`);
	}
}

function calcscore(cards) {
	var aces = 0;
	var endscore = 0;

	for (i = 0; i < cards.length; i++) {
		if (cards[i] == 1 && aces == 0) {
			aces++;
		} else {
			if (cards[i] >= 10) {
				endscore += 10;
			} else {
				endscore += cards[i];
			}
		}
	}

	if (aces == 1) {
		if (endscore + 11 > 21) {
			endscore++;
		} else {
			endscore += 11;
		}
	}
	document.getElementById('scoretxt').innerText = 'Score:' + endscore;
	return endscore;
}

function reset() {
	window.location.reload(true);
}

function cardsDealerhidden() {
	cardsDealer = valuesDealer[0] + ' ' + suitsDealer[0] + ' - ' + valuesDealer[1] + ' ' + suitsDealer[1] + ' - ';
	document.getElementById('cardsD').innerText = cardsDealer;
}

function informationConsole() {
	console.log('User');
	console.log(cardsUser);
	console.log(cardsUserArray);
	console.log('----');

	console.log('Dealer');
	console.log(cardsDealer);
	console.log(cardsDealerArray);
	console.log('----');
}
