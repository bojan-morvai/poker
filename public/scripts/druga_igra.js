var spil2,karta1,karta2,brojac_druga=1;

function prikaz_druge_igre(){
	/* Kako treba da izgleda sto za drugu igru */
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

function prikaz_karata_posle_druge_igre(){
	/* Vracanje na pocetak slika od karata */
	for(let i=0;i<5;i++){
		$('#'+i).attr('src','https://watermarked.cutcaster.com/cutcaster-vector-800994090-playing-card-back-side-62x90-mm.jpg');
	}
}

function druga_igra(){
	/* Pocetak druge igre */
	dugme('#gotovo');
	dugme('#jos_druge_igre');
	spil2=new Deck();
	spil2.shuffle();
	karta1=spil2.deal_card();
	$('#0').attr('src',karta1.slika);
	karta2=spil2.deal_card();
}

function vise_manje(rec){
	/* Provera da li je nova karta veca ili manja i da li je igrac u pravu */
	dugme('#gotovo','disabled',false);
	dugme('#jos_druge_igre','disabled',false);
	$('#1').attr('src',karta2.slika);
	var izraz;
	rec==='vise' ? izraz=karta2.vrednost>karta1.vrednost : izraz=karta2.vrednost<karta1.vrednost;
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

$('#vise').on('click',function(){
	/* Dugme za vise */
	vise_manje('vise');
});

$('#manje').on('click',function(){
	/* Dugme za manje */
	vise_manje('manje');
});

$('#jos_druge_igre').on('click',function(){
	/* Dugme za nastavak druge igre, ukoliko je prethodno bio pogodak */
	dugme('#vise','disabled',false);
	dugme('#manje','disabled',false);
	dugme('#jos_druge_igre');
	$('#0').attr('src',karta1.slika);
	$('#1').attr('src','https://watermarked.cutcaster.com/cutcaster-vector-800994090-playing-card-back-side-62x90-mm.jpg');
});