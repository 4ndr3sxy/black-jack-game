var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = new Array();
var cardsUser = '';
var cardsUserArray = [];
var cardsDealer = '';
var cardsDealerArray = [];
var scoreUser = 0;
var scoreDealer = 0;
var flag = false;
var valuesDealer = [];
var SuitsDealer = [];

function start() {
	getDeck();
}

function getDeck() {
	for (let i = 0; i < suits.length; i++) {
		for (let x = 0; x < values.length; x++) {
			let card = { Value: values[x], Suit: suits[i] };
			deck.push(card);
		}
	}
	console.log(deck);
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
	alert('The cards will be dealt');
	dealt();
}


function deleteCard() {
	console.log(deck[Object.keys(deck)[0]]);
	delete deck[Object.keys(deck)[0]];
	console.log(deck);
}

function dealt() {
	let value = 0;
	for (let i = 0; i < 2; i++) {
		cardsUser += deck[Object.keys(deck)[0]].Value + ' ' + deck[Object.keys(deck)[0]].Suit + ' - ';
		value = parseInt(deck[Object.keys(deck)[0]].Value);
		if (isNaN(value)) {
			if (deck[Object.keys(deck)[0]].Value === 'A') {
				cardsUserArray.push(1);
			} else {
				cardsUserArray.push(10);
			}
		} else {
			cardsUserArray.push(value);
		}
		deleteCard();
	}
	for (let i = 0; i < 2; i++) {
		cardsDealer += '? ' + ' ? - ';
		value = parseInt(deck[Object.keys(deck)[0]].Value);
		if (isNaN(value)) {
			if (deck[Object.keys(deck)[0]].Value === 'A') {
				cardsDealerArray.push(1);
			} else {
				cardsDealerArray.push(10);
			}
		} else {
			cardsDealerArray.push(value);
		}
		valuesDealer.push(deck[Object.keys(deck)[0]].Value);
		SuitsDealer.push(deck[Object.keys(deck)[0]].Suit);
		deleteCard();
	}
	scoreUser = calcscore(cardsUserArray);
	if (scoreUser === 21) {
		alert('User win with 21 score with 2 cards, Congratulations!');
	}

	console.log('User');
	console.log(cardsUser);
	console.log(cardsUserArray);
	console.log('----');

	console.log('Dealer');
	console.log(cardsDealer);
	console.log(cardsDealerArray);
	console.log('----');

	user = document.getElementById("cardsU").innerText = cardsUser;
	dealer = document.getElementById("cardsD").innerText = cardsDealer;
}

function giveMe() {
	let value = 0;
	cardsUser += deck[Object.keys(deck)[0]].Value + ' ' + deck[Object.keys(deck)[0]].Suit + ' - ';
	value = parseInt(deck[Object.keys(deck)[0]].Value);
	if (isNaN(value)) {
		if (deck[Object.keys(deck)[0]].Value === 'A') {
			cardsUserArray.push(1);
		} else {
			cardsUserArray.push(10);
		}
	} else {
		cardsUserArray.push(value);
	}
	deleteCard();

	user = document.getElementById("cardsU").innerText = cardsUser;
	scoreUser = calcscore(cardsUserArray);
	if (scoreUser > 21) {
		cardsDealerhidden();
		alert('User lost with ' + scoreUser + ' score with ' + cardsUserArray.length + ' cards!');
	}

	console.log('User');
	console.log(cardsUser);
	console.log(cardsUserArray);
	console.log('----');

}

function stop() {
	let value = 0;
	scoreDealer = calcscore(cardsDealerArray);
	cardsDealerhidden();
	while (scoreDealer < scoreUser) {
		flag = true;
		cardsDealer += deck[Object.keys(deck)[0]].Value + ' ' + deck[Object.keys(deck)[0]].Suit + ' - ';
		value = parseInt(deck[Object.keys(deck)[0]].Value);
		if (isNaN(value)) {
			if (deck[Object.keys(deck)[0]].Value === 'A') {
				cardsDealerArray.push(1);
			} else {
				cardsDealerArray.push(10);
			}
		} else {
			cardsDealerArray.push(value);
		}
		deleteCard();
		document.getElementById("cardsD").innerText = cardsDealer;

		scoreDealer = calcscore(cardsDealerArray);
		if (scoreDealer >= scoreUser && scoreDealer < 22) {
			alert('Dealer win with ' + scoreDealer + ' score with ' + cardsDealerArray.length + ' cards!');
			alert('User lost with ' + scoreUser + ' score with ' + cardsUserArray.length + ' cards!');
			break;
		} else if (scoreDealer > 21) {
			alert('Dealer lost with ' + scoreDealer + ' score with ' + cardsDealerArray.length + ' cards!');
			alert('User win with ' + scoreUser + ' score with ' + cardsUserArray.length + ' cards, congratulations!');
			break;
		}

		console.log('Dealer');
		console.log(cardsDealer);
		console.log(cardsDealerArray);
		console.log('----');

	}
	if (flag === false) {
		document.getElementById("cardsD").innerText = cardsDealer;
		alert('Dealer win with ' + scoreDealer + ' score with ' + cardsDealerArray.length + ' cards!');
		alert('User lost with ' + scoreUser + ' score with ' + cardsUserArray.length + ' cards!');
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
	document.getElementById("scoretxt").innerText = "Score:" + endscore;
	return endscore;
}

function reset() {
	window.location.reload(true);
}

function cardsDealerhidden() {
	cardsDealer = valuesDealer[0] + ' ' + SuitsDealer[0] + ' - ' + valuesDealer[1] + ' ' + SuitsDealer[1] + ' - ';
	document.getElementById("cardsD").innerText = cardsDealer;
}
