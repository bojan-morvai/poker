class Card{
	
	constructor(znak,broj){
		const znakovi = ["Hearts","Diamonds","Clubs","Spades"];
		const brojevi = ['A','2','3','4','5','6','7','8','9','10','J',"Q",'K'];
		const vrednosti={'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14};
		this.znak=znakovi[znak];
		this.broj=brojevi[broj];
		this.vrednost = vrednosti[this.broj];
	}

	reprezent(){
		return this.broj + " of " + this.znak;
	}
}

class Deck{
	constructor(){
		var spil = [], karta;
		for (var i=0;i<4;i++){
			for(var j=0;j<13;j++){
				karta = new Card(i,j);
				spil.push(karta);
			}
		}
		this.cards=spil;
		for(let i=0;i<52;i++){
			// this.cards[i].slika=slike_fajl[i];	// Iz fajla na kompu
			this.cards[i].slika=slike[i];			// Sa interneta			
		}
	}

	restart(){
		var spil = [], karta;
		for (var i=0;i<4;i++){
			for(var j=0;j<13;j++){
				karta = new Card(i,j);
				spil.push(karta);
			}
		}
		this.cards=spil;
		for(let i=0;i<52;i++){
			// this.cards[i].slika=slike_fajl[i];	// Iz fajla na kompu
			this.cards[i].slika=slike[i];			// Sa interneta
		}
		return this.cards;
	}

	count(){
		return this.cards.length;
	}

	reprezent(){
		return console.log("Deck of "+this.count()+" cards");
	}

	_deal(broj=1){
		var brojac=this.count();
		if(brojac===0){
			return console.log("All cards have been dealt");
		}
		else if(broj>brojac){
			broj=brojac;
		}
		var daj=this.cards.splice(brojac-broj,broj);
		return daj;
	}

	deal_card(){
		// return this._deal()[0].reprezent()
		return this._deal()[0];
	}

	deal_hand(broj){
		return this._deal(broj);
	}

	shuffle(){
		var brojac=this.count(),m;
		if (brojac<52){
			return console.log("Only full decks can be shuffled");
		}
		while(brojac>0){
			m=Math.floor(Math.random()*brojac);
			brojac--;
			[this.cards[brojac],this.cards[m]] = [this.cards[m],this.cards[brojac]];
		}
		return this.cards;
	}
}


// function Card(znak,broj){
// 	const znakovi = ["Hearts","Diamonds","Clubs","Spades"];
// 	const brojevi = ['A','2','3','4','5','6','7','8','9','10','J',"Q",'K'];
// 	const vrednosti={'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14};
// 	this.znak=znakovi[znak]
// 	this.broj=brojevi[broj]
// 	this.vrednost = vrednosti[this.broj]
// }

// Card.prototype.reprezent = function(){
// 	return console.log(this.broj + " of " + this.znak);
// }

// function Deck(){
// 	this.cards=this.makeDeck()
// }

// Deck.prototype.makeDeck = function(){
// 	var spil = [], karta;
// 	for (var i=0;i<4;i++){
// 		for(var j=0;j<13;j++){
// 			karta= new Card(i,j);
// 			spil.push(karta);
// 		}
// 	}
// 	return spil
// }

// Deck.prototype.count = function(){
// 	return this.cards.length
// }

// Deck.prototype.reprezent = function(){
// 	return console.log("Deck of "+this.count()+" cards")
// }	

// Deck.prototype._deal = function(broj=1){
// 	var brojac=this.count()
// 	if(brojac===0){
// 		return console.log("Sve karte su podeljene!")
// 	}
// 	else if(broj>brojac){
// 		broj=brojac
// 	}
// 	//var daj=this.cards.slice(brojac-broj)
// 	var daj=this.cards.splice(brojac-broj,broj)
// 	return daj
// }

// Deck.prototype.deal_card = function(){
// 	return this._deal()[0].reprezent()
// }

// Deck.prototype.deal_hand = function(broj){
// 	return this._deal(broj)
// }

// Deck.prototype.shuffle = function(){
// 	if (this.count()<52){
// 		return console.log("Samo puni spilovi se mogu promesati")
// 	}

// }

/////////////////////////////////////////////////////////////////
// {'A': [srce_slika, kocka_slika, tref_slika, spades_slika]
// '2': [srce_slika, kocka_slika, tref_slika, spades_slika]
// }

// if key === 'A' and Card.znak===heart slika=A[0]
////////////////////////////////////////////////////////////////////
const slike =['https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cards-A-Heart.svg/800px-Cards-A-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cards-2-Heart.svg/800px-Cards-2-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Cards-3-Heart.svg/800px-Cards-3-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Cards-4-Heart.svg/800px-Cards-4-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cards-5-Heart.svg/800px-Cards-5-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cards-6-Heart.svg/800px-Cards-6-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cards-7-Heart.svg/800px-Cards-7-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cards-8-Heart.svg/800px-Cards-8-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cards-9-Heart.svg/800px-Cards-9-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Cards-10-Heart.svg/800px-Cards-10-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cards-J-Heart.svg/800px-Cards-J-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Cards-Q-Heart.svg/800px-Cards-Q-Heart.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Cards-K-Heart.svg/800px-Cards-K-Heart.svg.png',
'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Cards-A-Diamond.svg/800px-Cards-A-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Cards-2-Diamond.svg/800px-Cards-2-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Cards-3-Diamond.svg/800px-Cards-3-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cards-4-Diamond.svg/800px-Cards-4-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Cards-5-Diamond.svg/800px-Cards-5-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Cards-6-Diamond.svg/800px-Cards-6-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Cards-7-Diamond.svg/800px-Cards-7-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cards-8-Diamond.svg/800px-Cards-8-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Cards-9-Diamond.svg/800px-Cards-9-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Cards-10-Diamond.svg/800px-Cards-10-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Cards-J-Diamond.svg/800px-Cards-J-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cards-Q-Diamond.svg/800px-Cards-Q-Diamond.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cards-K-Diamond.svg/800px-Cards-K-Diamond.svg.png',
'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Cards-A-Club.svg/800px-Cards-A-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Cards-2-Club.svg/800px-Cards-2-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cards-3-Club.svg/800px-Cards-3-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cards-4-Club.svg/800px-Cards-4-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Cards-5-Club.svg/800px-Cards-5-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cards-6-Club.svg/800px-Cards-6-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Cards-7-Club.svg/800px-Cards-7-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Cards-8-Club.svg/800px-Cards-8-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Cards-9-Club.svg/800px-Cards-9-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Cards-10-Club.svg/800px-Cards-10-Club.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cards-J-Club.svg/800px-Cards-J-Club.svg.png','https://media.istockphoto.com/photos/queen-of-clubs-isolated-picture-id186683534?k=6&m=186683534&s=612x612&w=0&h=A0ca-XzDLPQp0M5Hd2LNx_GVufxBBh49Wg_kNkKuD2Q=','https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cards-K-Club.svg/800px-Cards-K-Club.svg.png',
'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Cards-A-Spade.svg/800px-Cards-A-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cards-2-Spade.svg/800px-Cards-2-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Cards-3-Spade.svg/800px-Cards-3-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Cards-4-Spade.svg/800px-Cards-4-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Cards-5-Spade.svg/800px-Cards-5-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Cards-6-Spade.svg/800px-Cards-6-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Cards-7-Spade.svg/800px-Cards-7-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Cards-8-Spade.svg/800px-Cards-8-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cards-9-Spade.svg/800px-Cards-9-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Cards-10-Spade.svg/800px-Cards-10-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Cards-J-Spade.svg/800px-Cards-J-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Cards-Q-Spade.svg/800px-Cards-Q-Spade.svg.png','https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cards-K-Spade.svg/800px-Cards-K-Spade.svg.png'];

const slike_fajl=['PNG/AH.png','PNG/2H.png','PNG/3H.png','PNG/4H.png','PNG/5H.png','PNG/6H.png','PNG/7H.png','PNG/8H.png','PNG/9H.png','PNG/10H.png','PNG/JH.png','PNG/QH.png','PNG/KH.png',
'PNG/AD.png','PNG/2D.png','PNG/3D.png','PNG/4D.png','PNG/5D.png','PNG/6D.png','PNG/7D.png','PNG/8D.png','PNG/9D.png','PNG/10D.png','PNG/JD.png','PNG/QD.png','PNG/KD.png',
'PNG/AC.png','PNG/2C.png','PNG/3C.png','PNG/4C.png','PNG/5C.png','PNG/6C.png','PNG/7C.png','PNG/8C.png','PNG/9C.png','PNG/10C.png','PNG/JC.png','PNG/QC.png','PNG/KC.png',
'PNG/AS.png','PNG/2S.png','PNG/3S.png','PNG/4S.png','PNG/5S.png','PNG/6S.png','PNG/7S.png','PNG/8S.png','PNG/9S.png','PNG/10S.png','PNG/JS.png','PNG/QS.png','PNG/KS.png'];