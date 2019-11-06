var dobitak=0, 	// Winnings of current game
	cena=100, 	// Price of current game
	k=1,		// For adjusting difficulty, factor for winnings
	k2=1;		// For adjusting difficulty, factor for winnings

var money=Number(document.getElementById("credit-user").value);			// Starting credit
var brojac_partija=Number(document.getElementById("count-user").value);	// Game counter
var spil= new Deck();	// New deck of 52 cards
var ruka;				// Player's hand

// Instructions
$(document).ready(function () {
    $(function() {
        $("#wrapper").dialog({
            autoOpen: false,
            maxWidth:750,
            maxHeight: 550,
            width: 500,
            height: 550,
            modal: true,
            title: 'Instructions',
            close: function() {
            }
        });
    });

    $("#uputstva").click(function() {
        $("#wrapper").dialog("open");
    });
});

// Save game dialog box
$(document).ready(function () {
    $(function() {
        $("#wrapper-save").dialog({
            autoOpen: false,
            maxWidth:400,
            maxHeight: 400,
            width: 400,
            height: 300,
            modal: true,
            title: 'Save Game',
            close: function() {
            }
        });
    });

    $("#save-pop").click(function() {
        $("#wrapper-save").dialog("open");
    });
});
/* Custom function for disabling and enabling buttons */
function dugme(identifikacija='button',atribut='disabled',vrednost='true'){
	return $(identifikacija).attr(atribut,vrednost);
}

/* Showing credit in upper left corner */
function prikaz_kredita(money){
	$('#kredit span').text(money);
	$('#cena span').text(cena);
	$('#credit-user').val(money)
	$('#credit-user-put').val(money)
}

/* Showing of current winnings */
function prikaz_dobitka(dobitak){
	$('#dobitak p').text('');
	$('#dobitak p').text('You won: '+dobitak+ " credits");
}

/* When game is over, buttons are disabled, showing message how many games are played */
function game_over(){
	prikaz_prve_igre();
	$('#dobitak p').text("You don't have any more credits, game is over! You played "+brojac_partija+" times!");
	dugme();
 	dugme('.ui-button','disabled',false);
}

/* Button for new game */
$('#nova_igra').on('click',function(){
	if(money<=0){
		game_over();
	}else{
		brojac_partija++;
		$('#count-user').val(brojac_partija);
		$('#count-user-put').val(brojac_partija);
		prilagodjavanje_igre(brojac_partija);
		nova_igra();
		dugme('button','disabled',false);
		dugme('button[name=druga_igra_button]');
		$(this).attr('disabled',true);
		$("#rezultat p").text('');
		$('#dobitak p').text('');
		provera_dugmadi=true;
		prikaz_kredita(money);
	}
});

/* Showing table for first game */
function prikaz_prve_igre(){
	$('img').show();
	$('button').show();
	dugme('#nova_igra','disabled',false);
	$('button[name=druga_igra]').hide();
	$('button[name=0a]').hide();
	$('button[name=0]').removeClass('btn-success');
	$('#jos_druge_igre').hide();
	$('#dalje').show();
	$('button[name=pitanje]').hide();
}

/* Difficulty increases - price for new game, but also winnings */
function prilagodjavanje_igre(brojac){
	if(brojac>=130){
		k2=6; k=7; cena=3800;
	}else if(brojac>=100){
		k2=4; k=5; cena=2200;
	}else if(brojac>=75){
		k2=3; k=4; cena=1500;
	}else if(brojac>=55){
		k2=2; k=3; cena=800;
	}else if(brojac>=40){
		cena=500;
	}else if(brojac>=30){
		k=2; cena=400;
	}else if(brojac>=20){
		cena=300;
	}else if(brojac>=10){
		cena=200;
	}
}

/* Game beggining and paying for dealing hand */
function nova_igra(){
	spil.restart();
	spil.shuffle();
	prikaz_kredita(money);
	money-=cena;
	ruka=spil.deal_hand(5);
	prikaz_karata(ruka);
}

/* Showing cards pictures */
function prikaz_karata(ruka){
	$('#0').attr('src',ruka[0].slika);
	$('#1').attr('src',ruka[1].slika);
	$('#2').attr('src',ruka[2].slika);
	$('#3').attr('src',ruka[3].slika);
	$('#4').attr('src',ruka[4].slika);
}

/* Show result as text message */
function prikaz_rezultata(text){
	$("#rezultat p").append(text);
}

/* Changes card buttons when pressed */
function pritisnuto_dugme(dugme){
	$(dugme).text(function(i,v){
		return v === 'Stay' ? "Change" : "Stay";
	});
	if($(dugme).hasClass("btn-primary")){
		$(dugme).addClass("btn-warning");
		$(dugme).removeClass("btn-primary");
	}else{
		$(dugme).addClass("btn-primary");
		$(dugme).removeClass("btn-warning");
	}
}

/* Pressing card buttons on mouse click */ 
$('.dugmad').on('click',function(){
	pritisnuto_dugme(this);
});

/* Pressing card buttons for mause click on picture */
$('img').on('click',function(){
	let sta=this.id; // Id od slike koji je broj a to je ujedno i name od buttona
	let check_buttons=$('button[name=0]').attr('disabled'); // Provera da li su buttoni disabled
	if(!check_buttons){
		pritisnuto_dugme($('button[name='+sta+']'));
	}
});

/* Pressing card buttons over keyboard numbers 1-5*/
var provera_dugmadi=false; // For disabling keyboard pressing when inactive
$("body").keypress(function(event){
	if(provera_dugmadi){
		for(let i=0;i<5;i++){
			if(event.which===49+i){
				let dugme=$('button[name='+i+']');
				pritisnuto_dugme(dugme);
			}
		}
	}
});

/* Red button 'Game on', mouse click */
$('#dalje').on('click',function(){
	dugme_dalje();
});

/* Red button 'Game on', keyboard press 'enter' */
$('body').keypress(function(event){
	if(provera_dugmadi){
		if(event.which===13){
			dugme_dalje();
		}
	}
});	

/* 'Game on!' button function for changing selected cards */
function dugme_dalje(){
	var mesto_zamena=[];
	for(let i=0;i<5;i++){
		if($('button[name='+i+']').hasClass("btn-warning")){
			mesto_zamena.push(i);
		}
	}
	menjanje_karata(mesto_zamena);
	mesto_zamena=[];
	ruka.sort((a,b) => a.vrednost-b.vrednost);
	dugme();
	dugme('.ui-button','disabled',false);
	if(provera(ruka)){
		dugme('button[name=druga_igra_button]','disabled',false);
		prikaz_dobitka(dobitak);
	}else{
		dugme('button[id=gotovo]','disabled',false);
	}
	provera_dugmadi=false;
}
	
/* 'End' button, show winnings */
$('#gotovo').on('click',function(){
	dobitak*=brojac_druga;
	prikaz_dobitka(dobitak);
	money+=dobitak;
	dobitak=0;
	dugme('#nova_igra','disabled',false);
	dugme('button[name=druga_igra_button]');
	prikaz_kredita(money);
	prikaz_prve_igre();
	prikaz_karata_posle_druge_igre();
	brojac_druga=1;
	$("#rezultat p").text('');
	$('#dobitak p').text('');
});

/* 'Second game' button, if player want to play second game */
$('#druga_igra_button').on('click',function(){
	prikaz_druge_igre();
	druga_igra();
});

/* Changing selected cards */
function menjanje_karata(mesto_zamena){
	for(let i=0;i<5;i++){
		if(mesto_zamena.includes(i)){
			ruka[i]=spil.deal_card();
		}
	}
	prikaz_karata(ruka) ;		// Showing unsorted cards after switching them
	reset_dugmadi();
	return ruka;
}

/* Changing card buttons to defaults */
function reset_dugmadi(){
	$('.dugmad').addClass('btn-primary');
	$('.dugmad').removeClass("btn-warning");
	$('.dugmad').text('Stay');
}