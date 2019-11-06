var spil2,karta1,karta2,brojac_druga=1;

/* Shows second game play table */
function prikaz_druge_igre(){
	$('img[id=2]').hide();
	$('img[id=3]').hide();
	$('img[id=4]').hide();
	$('button[name=0]').hide();
	$('button[name=1]').hide();
	$('button[name=2]').hide();
	$('button[name=3]').hide();
	$('button[name=4]').hide();
	$('button[name=druga_igra]').show();
	dugme('button[name=druga_igra]','disabled',false);
	dugme('#jos_druge_igre','disabled',false);
	$('button[name=0a]').show();
	dugme('#nova_igra');
	dugme('#dalje');
	$('#jos_druge_igre').show();
	$('#dalje').hide();
	$("#rezultat p").text('');
	$('#druga_igra_button').hide();
	$('img[id=1]').attr("src",'https://watermarked.cutcaster.com/cutcaster-vector-800994090-playing-card-back-side-62x90-mm.jpg');
}

/* Changing cards images to default */
function prikaz_karata_posle_druge_igre(){
	for(let i=0;i<5;i++){
		$('#'+i).attr('src','https://watermarked.cutcaster.com/cutcaster-vector-800994090-playing-card-back-side-62x90-mm.jpg');
	}
}

/* Dealing cards for second game */
function druga_igra(){
	dugme('#gotovo');
	dugme('#jos_druge_igre');
	spil2=new Deck();
	spil2.shuffle();
	karta1=spil2.deal_card();
	$('#0').attr('src',karta1.slika);
	karta2=spil2.deal_card();
}

/* Checking if dealt card is higher or lower than previous, and checking if player guessed correctly */
function vise_manje(rec){
	dugme('#gotovo','disabled',false);
	dugme('#jos_druge_igre','disabled',false);
	$('#1').attr('src',karta2.slika);
	let izraz;
	rec==='higher' ? izraz=karta2.vrednost>karta1.vrednost : izraz=karta2.vrednost<karta1.vrednost;
	if(izraz){
		brojac_druga++;
		karta1=karta2;
		karta2=spil2.deal_card();
	}else{
		brojac_druga=0;
		dugme('#jos_druge_igre');
	}
	let a=brojac_druga*dobitak;
	prikaz_dobitka(a);
	dugme('#vise');
	dugme('#manje');
}
/* Higher button */
$('#vise').on('click',function(){
	vise_manje('higher');
});

/* Lower button */
$('#manje').on('click',function(){
	vise_manje('lower');
});

/* Button for continuing second game */
$('#jos_druge_igre').on('click',function(){
	dugme('#vise','disabled',false);
	dugme('#manje','disabled',false);
	dugme('#jos_druge_igre');
	$('#0').attr('src',karta1.slika);
	$('#1').attr('src','https://watermarked.cutcaster.com/cutcaster-vector-800994090-playing-card-back-side-62x90-mm.jpg');
});