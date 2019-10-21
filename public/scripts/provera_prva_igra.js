function provera(ruka){
/* Provera ruke i dobitka, vraca true ako ima nesto, false ako nema nista */
	var brojevi=[],znakovi=[];
	for (let i in ruka){
		brojevi.push(ruka[i].vrednost);
		znakovi.push(ruka[i].znak);
	}
	// brojevi=[2,2,1,5,5]							//TEST
	// znakovi=['hearts','hearts','hearts','spades']	//TEST
	var ide;
	if(provera_royal_flush(brojevi,znakovi)){
		dobitak=k2*15000;
		ide="You have Royal Flush";
	}else if(provera_straight_flush(brojevi,znakovi)){
		dobitak=k2*9000;
		ide="You have Straight Flush";
	}else if(provera_poker(brojevi)){
		dobitak=k2*5000;
		ide="You have Poker";
	}else if(provera_full_hause(brojevi)){
		dobitak=k2*3000;
		ide="You have Full House";
	}else if(provera_flush(znakovi)){
		dobitak=k2*2000;
		ide="You have Flush";
	}else if(provera_straight(brojevi)){
		dobitak=k2*1000;
		ide="You have Straight";
	}else if(provera_triling(brojevi)){
		dobitak=k2*700;
		ide="You have Three of a Kind";
	}else if(provera_two_pair(brojevi)){
		dobitak=k2*350;
		ide="You have Two Pairs";
	}else if(provera_pair(brojevi)){
		dobitak=k*100;
		ide="You have a Pair";
	}else{
		ide="Highest card is "+ruka[4].reprezent();
		prikaz_rezultata(ide);
		if(ruka[4].vrednost>=13){
			dobitak=50*k;
			return true; // Ako ima K ili A
		}
		return false; // Ako nema nista
	}
	prikaz_rezultata(ide);
	return true; // Ako je bilo sta vece od K ili A bilo
}

function _par(brojevi){ //Vraca niz [1,1,1,1,1] ako nema ni jedan par; [1,2,2,1,1] ako ima JEDAN PAR; [2,2,1,2,2] ako ima DVA PARA; [1,3,3,3,1] ako ima TRILING; [1,4,4,4,4] ako ima POKER
	var koliko=[];
	brojevi.forEach(function(karta){
		let b=0;
		for(let i=0;i<brojevi.length;i++){
			if(karta===brojevi[i]){
				b++;
			}
		}
		koliko.push(b);
	});
	//console.log(koliko)
	return koliko;
}

function provera_royal_flush(brojevi,znakovi){
	// if(brojevi[0]===10 && provera_straight_flush(brojevi,znakovi)){
	// 	return true
	// }
	return brojevi[0]===10 && provera_straight_flush(brojevi,znakovi);
}

function provera_straight_flush(brojevi,znakovi){
	return provera_flush(znakovi) && provera_straight(brojevi);
}

function provera_poker(brojevi){
	skup=_par(brojevi);
	return skup.includes(4);
}

function provera_full_hause(brojevi){
	return provera_triling(brojevi) && provera_pair(brojevi);
}

function provera_flush(znakovi){
	let z=znakovi[0];
	return znakovi.every(x => x===z);
}

function provera_straight(brojevi){
	if(brojevi[0]===2 && brojevi[1]===3 && brojevi[2]===4 && brojevi[3]===5 && brojevi[4]===14){
		return true;
	}
	if(brojevi[0]===brojevi[1]-1 && brojevi[0]===brojevi[2]-2 && brojevi[0]===brojevi[3]-3 && brojevi[0]===brojevi[4]-4){
		return true;
	}
}

function provera_triling(brojevi){
	skup=_par(brojevi);
	return skup.includes(3);
}

function provera_two_pair(brojevi){
	skup=_par(brojevi);
	let dva=0;
	skup.forEach(function(x){
		if(x===2){
			dva++;
		}
	});
	return dva===4;
}

function provera_pair(brojevi){
	skup=_par(brojevi);
	return skup.includes(2);
}