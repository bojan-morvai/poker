var dobitak=0,
	cena=100,
	k=1,
	k2=1;

var money=1000;
var brojac_partija=0;
var spil= new Deck();
var ruka;

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

function dugme(identifikacija='button',atribut='disabled',vrednost='true'){
/* Custom funkcija da se gase i pale dugmad! */
	return $(identifikacija).attr(atribut,vrednost);
}

function prikaz_kredita(money){
/* Funkcija za prikaz kredita u gornjem levom uglu */
	$('#kredit span').text(money);
	$('#cena span').text(cena);
}

function prikaz_dobitka(dobitak){
/* Brojcani prikaz trenutnog dobitka */
	$('#dobitak p').text('');
	$('#dobitak p').text('You won: '+dobitak+ " credits");
}

function game_over(){
/* Kada nema vise kredita, dugmad se iskljucuju, a ispisuje se koliko je igrac partija odigrao */
	prikaz_prve_igre();
	$('#dobitak p').text("You don't have any more credits, game is over! You played"+brojac_partija+" times!");
	dugme();
 	dugme('.ui-button','disabled',false);

}

$('#nova_igra').on('click',function(){
	/* Dugme za novu igru */
	if(money<=0){
		game_over();
	}else{
		brojac_partija++;
		//console.log(brojac_partija)
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

function prikaz_prve_igre(){
/* Prikaz stola za prvu igru */
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

function prilagodjavanje_igre(brojac){
/* Kako se sve duze igra, igra postaje teza - cena se povecava, ali i dobici */
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

function nova_igra(){
/* Pocetak igre i placanje deljenja */
	spil.restart();
	spil.shuffle();
	prikaz_kredita(money);
	money-=cena;
	ruka=spil.deal_hand(5);
	prikaz_karata(ruka);
}

function prikaz_karata(ruka){
/* Prikazuje slike karata */
	$('#0').attr('src',ruka[0].slika);
	$('#1').attr('src',ruka[1].slika);
	$('#2').attr('src',ruka[2].slika);
	$('#3').attr('src',ruka[3].slika);
	$('#4').attr('src',ruka[4].slika);
}

function prikaz_rezultata(text){
/* Tekstualni prikaz rezultata */
	$("#rezultat p").append(text);
}

function pritisnuto_dugme(dugme){
/*  Menja se izgled dugmadi za karte kada se ne njih pritisne */
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

$('.dugmad').on('click',function(){
/* Pritiskanje dugmadi za menjanje karata putem misa */ 
	pritisnuto_dugme(this);
});

$('img').on('click',function(){
/* Da moze da se kada se klikne na sliku aktivira dugme za nju */
	let sta=this.id; // Id od slike koji je broj a to je ujedno i name od buttona
	t=$('button[name=0]').attr('disabled'); // Provera da li su buttoni disabled
	if(!t){
		//pritisnuto_dugme(document.querySelector('button[name="'+sta+'"]'));
		pritisnuto_dugme($('button[name='+sta+']'));
	}
});

var provera_dugmadi=false;
$("body").keypress(function(event){
/* Unos karte koja se menja preko tastature */
	if(provera_dugmadi){
		for(let i=0;i<5;i++){
			if(event.which===49+i){
				var dugme=$('button[name='+i+']');
				pritisnuto_dugme(dugme);
			}
		}
	}
});

function dugme_dalje(){
/*	Dugme za menjanje karata - crveno na kome pise 'dalje' */
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

$('#dalje').on('click',function(){
/* Klik na dugme 'dalje' */
	dugme_dalje();
});

$('body').keypress(function(event){
/* Kada se pritisne 'enter' na tastaturi da se ide kao da je kliknuto da dugme 'dalje' */
	if(provera_dugmadi){
		if(event.which===13){
			dugme_dalje();
		}
	}
});		



$('#gotovo').on('click',function(){
	/* Dugme za kraj igre i eventualni dobitak - info na kome pise 'kraj' */
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

$('#druga_igra_button').on('click',function(){
	/* Ukoliko igrac hoce da igra drugu igru dugme */
	prikaz_druge_igre();
	druga_igra();
});

function menjanje_karata(mesto_zamena){
	/* Zamena karata na datim mestima */
	for(let i=0;i<5;i++){
		if(mesto_zamena.includes(i)){
			ruka[i]=spil.deal_card();
		}
	}
	prikaz_karata(ruka) ;		// Prikaz nesortiranih karata posle menjanja
	reset_dugmadi();
	return ruka;
}

function reset_dugmadi(){
	/* Povratak dugmadi za karte u prvobitno stanje */
	$('.dugmad').addClass('btn-primary');
	$('.dugmad').removeClass("btn-warning");
	$('.dugmad').text('Ostaje');
}