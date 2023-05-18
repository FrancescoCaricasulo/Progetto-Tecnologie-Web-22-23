//Al caricamento della pagina verifico tramite richiesta se c'è già una sessione avviata, caricando i dati relativi
window.onload = function (){
	$.ajax({
		url: "getData.php",
		type: "GET",
		data:{ 
			ric: "ric"
		},
		dataType: "json",
		success: start,
		error: error
	});
}
function start(json){
	if (Object.keys(json).length != 0) successLogin(json);
	else banner();
}

//Funzioni per il banner
function banner(){
	var childDivs = document.getElementById('bannerArea').getElementsByTagName('a');

	for(var i = 0; i < childDivs.length; i++) {
		if(childDivs[i].innerHTML == "Accedi"){
            childDivs[i].onclick = loginClick;
        }
        if(childDivs[i].innerHTML == "Registrati"){
            childDivs[i].onclick = regiClick;
        }
        if(childDivs[i].innerHTML == "Informazioni"){
            childDivs[i].onclick = infoClick;
        }
		if(childDivs[i].innerHTML == "Home"){
            childDivs[i].onclick = homeClick;
        }
        childDivs[i].onmouseover = bannerMouseOver;
        childDivs[i].onmouseleave = bannerMouseLeave;
	}

	return childDivs;
}
//Cambia classe quando il mouse ci passa sopra
function bannerMouseOver(){
	var div = document.querySelectorAll('div:hover');
	this.className += " banner_ok";	
	
}
//Ritorna alla classe originaria quando il mouse lascia
function bannerMouseLeave(){
	this.className = "banner";
}

//Tasto Login
function loginClick(){
    $('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);

	var legend = "<legend>Nuovo Accesso</legend>";
	var user1 = "<tr><td><strong>"+"Username: "+"</strong></td><td><input id='user1' type='text' name='user' width='16' maxlength='12'> </td></tr>";
	var pass1 = "<tr><td><strong>"+"Password: "+"</strong></td><td><input id='pass1' type='password' name='pass' width='16' maxlength='12'> </td></tr>";
	
	var table =  "<table>"+user1+pass1+"</table>";
	var sub = "<button id ='accedi'> Accedi </button>";
	var field = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>"
	$('#corpoTesto').append(field);
	$('#accedi').click(login);

	banner();
}

function login(){
	if(!$('#user1').val() || !isNaN(document.getElementById('user1').value)){document.getElementById('user1').classList.add("nope");}
	else{ document.getElementById('user1').classList.remove("nope") }

	if(!$('#pass1').val() || !isNaN(document.getElementById('pass1').value)){document.getElementById('pass1').classList.add("nope");}
	else{ document.getElementById('pass1').classList.remove("nope") }

	if($('#user1').val() && $('#pass1').val()){
		var us = $('#user1').val();
		var pas = $('#pass1').val();
		$.ajax({
			type: "POST",
			url: "getData.php",
			data: "user1="+ us + "&pass1="+ pas,
			dataType: "json",
			success: successLogin,
			error: error
			});
	}
}

//Funzione successo login
function successLogin(json){

	// Verifica se json è pieno
	if (Object.keys(json).length == 1) {
		json.sol.forEach(element =>{
			$('#corpoTesto').empty();
			document.getElementById('login').remove();
			document.getElementById('register').remove();
			if(document.getElementById('home')!= null){document.getElementById('home').remove();}
			document.getElementById('info').remove();
			var name = element.Username;
			var gest = element.Gestore;
			var b1 = "<li><a id='LogOut' class='banner'>"+"Logout"+ "</a></li>";
			var user = "<li id='name' class='banner'>" + name +  "</li>";
			$('ul').append(b1);
			$('#LogOut').click(logoutClick);
			$('ul').append(user);
			if(gest == "Si"){ 
				var b2 = "<li><a id='register2' class='banner'> Registra Percorso </a></li>"; 
				$('ul').append(b2);
				$('#register2').click(regi2Click);
			}
		})
			var lbtn = "<li><a id='lbtn' class='banner'> Percorsi Piaciuti </a></li>"; 
			var title = "<h3> Digita una Regione o una Provincia per iniziare a cercare i percorsi a te vicini </h3>"
			var nome = "<input id='find' type='text' name='find' width='16' maxlength='16'>";
			var sub = "<label id ='cerca'><button > Cerca </button></label>";

			$('ul').append(lbtn);
			$('#corpoTesto').append(title);
			$('#corpoTesto').append(nome);
			$('#corpoTesto').append(sub);
			$('#cerca').click(cercaP);
			$('#lbtn').click(likedP);

	//Se json vuoto aggiungo schermata di errore
	}else{
		$('#corpoTesto').empty();
		var legend = "<legend><strong>Errore</strong></legend>";
		var user = "<label><strong> Username e/o Password Errati</strong></label>";
		var field1 = "<fieldset id='err'>"+ legend + user + "</fieldset>";
		$('#corpoTesto').append(field1);

		if(document.getElementById('home')!= null){document.getElementById('home').remove();}

		var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
		$('ul').append(btn);

		var legend = "<legend>Nuovo Accesso</legend>";
		var user = "<tr><label><td><strong>"+"Username: "+"</strong></td><td><input id='user1' type='text' name='user' width='16' maxlength='12' required></td></label></tr>";
		var pass = "<tr><label><td><strong>"+"Password: "+"</strong></td><td><input id='pass1' type='password' name='pass' width='16' maxlength='12' required></td></label></tr>";
		
		var table =  "<table>"+user+pass+"</table>";
		var sub = "<button id ='accedi'> Accedi </button>";
		var field2 = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>"
		$('#corpoTesto').append(field2);
		$('#accedi').click(login);

		banner();	
	}
}

//Tasto Logout 
function logoutClick(){
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	$('#corpoTesto').empty();
	var info = "<h1>Sei sicuro di voler uscire?</h1>";
	var b1 = "<button id ='si'> Si </button>";
	var b2 = "<button id ='no'> No </button>";
	$('#corpoTesto').append(info);
	$('#corpoTesto').append(b1);
	$('#corpoTesto').append(b2);

	$('#si').click(siClick);
	$('#no').click(noClick);

}

//Torno alla schermata precedente
function noClick(){
	$('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var title = "<h3> Digita una Regione o una Provincia per iniziare a cercare i percorsi a te vicini </h3>"
	var nome = "<input id='find' type='text' name='find' width='16' maxlength='16'>";
	var sub = "<label id ='cerca'><button > Cerca </button></label>";

	$('#corpoTesto').append(title);
	$('#corpoTesto').append(nome);
	$('#corpoTesto').append(sub);
	$('#cerca').click(cercaP);

}

//Chiude la sessione
function siClick(){
	$.ajax({
		url: "getData.php",
		type: "GET",
		data:{ 
			tipo: "esc"
		},
		success: homeClick,
		error: error
	});
}

//Tasto Registrazione
function regiClick(){
    $('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);

	var legend = "<legend>Nuovo Utente</legend>";
    var nome = "<tr><label><td><strong>"+"Nome: "+"</strong></td><td><input id='nome' type='text' name='name' width='16' maxlength='12'></td></label></tr>";
	var cognome = "<tr><label><td><strong>"+"Cognome: "+"</strong></td><td><input id='cognome' type='text' name='surname' width='16' maxlength='12'></td></label></tr>";
	var user2 = "<tr><label><td><strong>"+"Username: "+"</strong></td><td><input id='user2' type='text' name='user' width='16' maxlength='12'></td></label></tr>";
	var pass2 = "<tr><label><td><strong>"+"Password: "+"</strong></td><td><input id='pass2' type='password' name='password' width='16' maxlength='12'></td></label></tr>";
	var gestore = "<tr><label><td><strong>"+"Gestore: "+"</strong></td><td><select id = 'gest' name='gest'> <option value='Si'> Si </option> <option value='No'> No </option> </select></td></label></tr>";
	
	var table =  "<table>"+nome+cognome+user2+pass2+gestore+"</table>";
	var sub = "<button id ='registra'> Registrati </button>";
	var field = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>";
	$('#corpoTesto').append(field);
	$('#registra').click(register1);
	banner();
}

//Tasto Registrazione Percorso
function regi2Click(){
    $('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);
	var legend = "<legend>Nuovo Percorso</legend>";
	var region = "<tr><label><td><strong>"+"Regione: "+"</strong></td><td><input id='region' type='text' name='region' width='16' maxlength='16'></td></label></tr>";
    var prov = "<tr><label><td><strong>"+"Provincia: "+"</strong></td><td><input id='prov' type='text' name='prov' width='16' maxlength='16'></td></label></tr>";
	var start = "<tr><label><td><strong>"+"Partenza da: "+"</strong></td><td><input id='start' type='text' name='start' width='25' maxlength='25'></td></label></tr>";
	var arrive = "<tr><label><td><strong>"+"Arrivo a: "+"</strong></td><td><input id='arrive' type='text' name='arrive' width='25' maxlength='25'></td></label></tr>";
	var leng = "<tr><label><td><strong>"+"Lunghezza (km): "+"</strong></td><td><input id='leng' type='text' name='leng' width='16' maxlength='10'></td></label></tr>";
	var diff = "<tr><label><td><strong>"+"Difficoltà: "+"</strong></td><td><select id = 'diff' name='diff' width='16'> <option value='famiglie'> Per Famiglie </option> <option value='facile'> Facile </option> <option value='impegnativo'> Impegnativo </option> <option value='esperto'> Per Esperti </option> </select></td></label></tr>";
	
	var table =  "<table>"+region+prov+start+arrive+leng+diff+"</table>";
	var sub = "<button id ='registra'> Registra </button>";
	var field = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>";
	$('#corpoTesto').append(field);
	$('#registra').click(register2);
	$('#home').click(noClick);
	
}

//Funzione di registrazione nuovo utente
function register1(){
	if(!$('#nome').val() || !isNaN(document.getElementById('nome').value)){document.getElementById('nome').classList.add("nope");}
	else{ document.getElementById('nome').classList.remove("nope") }
	if(!$('#cognome').val() || !isNaN(document.getElementById('cognome').value)){document.getElementById('cognome').classList.add("nope");}
	else{ document.getElementById('cognome').classList.remove("nope") }
	if(!$('#user2').val() || !isNaN(document.getElementById('user2').value)){document.getElementById('user2').classList.add("nope");}
	else{ document.getElementById('user2').classList.remove("nope") }
	if(!$('#pass2').val() || !isNaN(document.getElementById('pass2').value)){document.getElementById('pass2').classList.add("nope");}
	else{ document.getElementById('pass2').classList.remove("nope") }
	if(!$('#gest').val() || !isNaN(document.getElementById('gest').value)){document.getElementById('gest').classList.add("nope");}
	else{ document.getElementById('gest').classList.remove("nope") }

	if($('#nome').val() && $('#cognome').val() && $('#user2').val() && $('#pass2').val() && $('#gest').val()){
		var nom = $('#nome').val();
		var cog =  $('#cognome').val();
		var us = $('#user2').val();
		var pas = $('#pass2').val();
		var ges = $('#gest').val();

		$.ajax({
			type: "POST",
			url: "getData.php",
			data: "nome="+ nom +"&cognome="+ cog +"&user2="+ us +"&pass2="+ pas +"&gest="+ ges,
			dataType: "json",
			success: successRegister,
			error: error
		});
	}
}

//Funzione di registrazione nuovo percorso
function register2(){
	
	if(!$('#region').val() || !isNaN(document.getElementById('region').value)){document.getElementById('region').classList.add("nope");}
	else{ document.getElementById('region').classList.remove("nope") }
	if(!$('#prov').val() || !isNaN(document.getElementById('prov').value)){document.getElementById('prov').classList.add("nope");}
	else{ document.getElementById('prov').classList.remove("nope") }
	if(!$('#start').val() || !isNaN(document.getElementById('start').value)){document.getElementById('start').classList.add("nope");}
	else{ document.getElementById('start').classList.remove("nope") }
	if(!$('#arrive').val() || !isNaN(document.getElementById('arrive').value)){document.getElementById('arrive').classList.add("nope");}
	else{ document.getElementById('arrive').classList.remove("nope") }
	if(!$('#leng').val() || isNaN(document.getElementById('leng').value)){document.getElementById('leng').classList.add("nope");}
	else{ document.getElementById('leng').classList.remove("nope") }

	if($('#region').val() && $('#prov').val() && $('#start').val() && $('#arrive').val() && $('#leng').val()){
		$.ajax({
			type: "GET",
			url: "getData.php",
			data: {
				region: $('#region').val(),
				prov: $('#prov').val(),
				start: $('#start').val(),
				arrive: $('#arrive').val(),
				leng: $('#leng').val(),
				diff: $('#diff').val()
			},
			dataType: "JSON",
			contentType: "application/json",
			success: successRegister,
			error: error
		});
	}
}

function successRegister(json){
	//Controllo che l'operazione sia andata a buon fine
	if (Object.keys(json).length != 0) {
		json.sol.forEach(element =>{
			var name = element.Username;

			//Utente aggiunto con successo
			if(name == "Successo1"){
				$('#corpoTesto').empty();
				var legend = "<legend>Nuovo Utente</legend>";
				var nome = "<tr><label><td><strong>Nome: </strong></td><td><input id='nome' type='text' name='name' width='16' maxlength='12'></td></label></tr>";
				var cognome = "<tr><label><td><strong>"+"Cognome: "+"</strong></td><td><input id='cognome' type='text' name='surname' width='16' maxlength='12'></td></label></tr>";
				var user2 = "<tr><label><td><strong>"+"Username: "+"</strong></td><td><input id='user2' type='text' name='user' width='16' maxlength='12'></td></label></tr>";
				var pass2 = "<tr><label><td><strong>"+"Password: "+"</strong></td><td><input id='pass2' type='password' name='password' width='16' maxlength='12'></td></label></tr>";
				var gestore = "<tr><label><td><strong>"+"Gestore: "+"</strong></td><td><select id = 'gest' name='gest'> <option value='Si'> Si </option> <option value='No'> No </option> </select></td></label></tr>";
				
				var table =  "<table>"+nome+cognome+user2+pass2+gestore+"</table>";
				var sub = "<button id ='registra'> Registrati </button>";
				var field1 = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>";
				
				if(document.getElementById('succ1')!= null){document.getElementById('succ1').remove();}
				if(document.getElementById('err')!= null){document.getElementById('err').remove();}
				var user = "<label><strong> Utente Registrato con Successo </strong></label>";
				var field2 = "<fieldset id='succ1'>"+ user + "</fieldset>";
				var space = "<br>";
				$('#corpoTesto').append(field1);
				$('#corpoTesto').append(space);
				$('#corpoTesto').append(field2);
				$('#registra').click(register1);
			}

			//Percorso aggiunto con successo
			if(name == "Successo2"){
				$('#corpoTesto').empty();
				if(document.getElementById('home')!= null){document.getElementById('home').remove();}
				var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
				$('ul').append(btn);

				var legend = "<legend>Nuovo Percorso</legend>";
				var region = "<tr><label><td><strong>"+"Regione: "+"</strong></td><td><input id='region' type='text' name='region' width='16' maxlength='16'></td></label></tr>";
				var prov = "<tr><label><td><strong>"+"Provincia: "+"</strong></td><td><input id='prov' type='text' name='prov' width='16' maxlength='16'></td></label></tr>";
				var start = "<tr><label><td><strong>"+"Partenza da: "+"</strong></td><td><input id='start' type='text' name='start' width='25' maxlength='25'></td></label></tr>";
				var arrive = "<tr><label><td><strong>"+"Arrivo a: "+"</strong></td><td><input id='arrive' type='text' name='arrive' width='30' maxlength='30'></td></label></tr>";
				var leng = "<tr><label><td><strong>"+"Lunghezza (km): "+"</strong></td><td><input id='leng' type='text' name='leng' width='16' maxlength='10'></td></label></tr>";
				var diff = "<tr><label><td><strong>"+"Difficoltà: "+"</strong></td><td><select id = 'diff' name='diff' width='16'> <option value='famiglie'> Per Famiglie </option> <option value='facile'> Facile </option> <option value='impegnativo'> Impegnativo </option> <option value='esperto'> Per Esperti </option> </select></td></label></tr>";

				var table =  "<table>"+region+prov+start+arrive+leng+diff+"</table>";
				var sub = "<button id ='registra'> Registra </button>";
				var field1 = "<fieldset>"+ legend + table + "<br>" + sub + "</fieldset>";

				if(document.getElementById('succ2')!= null){document.getElementById('succ2').remove();}
				if(document.getElementById('err')!= null){document.getElementById('err').remove();}
				var user = "<label><strong> Percorso Registrato con Successo </strong></label>";
				var field2 = "<fieldset id='succ2'>"+ user + "</fieldset>";
				var space = "<br>";
				$('#corpoTesto').append(field1);
				$('#corpoTesto').append(space);
				$('#corpoTesto').append(field2);
				$('#registra').click(register2);
				$('#home').click(noClick);
			}

			//Errore durante l'inserimento dati
			if(name =="Errore") {

				if(document.getElementById('succ1')!= null){document.getElementById('succ1').remove();}
				if(document.getElementById('succ2')!= null){document.getElementById('succ2').remove();}
				if(document.getElementById('err')!= null){document.getElementById('err').remove();}

				var legend = "<legend><strong>Errore</strong></legend>";
				var user = "<label><strong> Errore durante l'inserimento </strong></label>";
				var field2 = "<fieldset id='err'>"+ legend + user + "</fieldset>";
				$('#corpoTesto').append(field2);
				$('#registra').click(register1);
			}
		})
	} else { //Dati inseriti già presenti
		if(document.getElementById('succ1')!= null){document.getElementById('succ1').remove();}
		if(document.getElementById('succ2')!= null){document.getElementById('succ2').remove();}
		if(document.getElementById('err')!= null){document.getElementById('err').remove();}

		var legend = "<legend><strong>Errore</strong></legend>";
		var user = "<label><strong> Dati Già Presenti </strong></label>";
		var field2 = "<fieldset id='err'>"+ legend + user + "</fieldset>";

		$('#corpoTesto').append(field2);
	}
}

//Funzione per cercare percorso
function cercaP(){
	if(!$('#find').val()){ 
		document.getElementById('find').classList.add("nope");
		var user = "<label><strong> Campo mancante </strong></label>";
		var space = "<br>";

		$('#corpoTesto').append(space);
		$('#corpoTesto').append(user);

	}
	else{ document.getElementById('find').classList.remove("nope") }

	if($('#find').val()){
		$.ajax({
			type: "GET",
			url: "getData.php",
			data: {
				find: $('#find').val()
			},
			dataType: "json",
			success: visualizzaP,
			error: error
		});
	}
}

//Visualizzo percorsi trovati
function visualizzaP(json){
	$('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);

	//Nessun Percorso Trovato
	if (Object.keys(json).length == 0) {
		var title = "<h2> Ci dispiace, ma non è presente alcun percorso per la località da lei cercata </h2>";
		var field = "<h3> Provi a cercare una nuova località </h3>";
		var nome = "<label><input id='find' type='text' name='find' width='16' maxlength='16'></label>";
		var sub = "<label id ='cerca'><button > Cerca </button></label>";

		$('#corpoTesto').append(title);
		$('#corpoTesto').append(field);
		$('#corpoTesto').append(nome);
		$('#corpoTesto').append(sub);
	
	}else{
		var i = 0;
		json.rows.forEach(element =>{

			var reg = element.Regione;
			var prov = element.Provincia;
			var start = element.Partenza;
			var arrive = element.Arrivo;
			var leng = element.Lunghezza;
			var diff = element.Difficoltà;
			var num = element.NumLikes;
			var lik = "lik"+i;
			var ris = "ris"+i;

			var regione = "<tr><td><strong>"+"Regione: </strong></td><td>"+ reg +"</td></tr>";
			var provincia = "<tr><td><strong>"+"Provincia: </strong></td><td>"+ prov +"</td></tr>";
			var inizio = "<tr><td><strong>"+"Partenza da: </strong></td><td>"+ start +"</td></tr>";
			var fine = "<tr><td><strong>"+"Arrivo a: </strong></td><td>"+ arrive +"</td></tr>";
			var lunghezza = "<tr><td><strong>"+"Lunghezza (km): </strong></td><td>"+ leng +"</td></tr>";
			var diffic = "<tr><td><strong>"+"Difficoltà: </strong></td><td>"+ diff +"</td></tr>";
			var numero = "<tr><td><strong>"+"Numero Like: </strong></td><td>"+ num +"</td></tr>";
			var table =  "<table id="+ris+" class="+ris+">"+regione+provincia+inizio+fine+lunghezza+diffic+numero+"</table>";

			$.ajax({
				type: "GET",
				url: "getData.php",
				data: {
					type: "btn",
					part: start,
					arr: arrive,
					lung: leng,
					user: document.getElementById("name").textContent
				},
				dataType: "json",
				success: function(json){
					json.sol.forEach(element =>{
						if(element.Username == "false"){ 
							var sub = "<tr><td><label id="+lik+" class="+ris+"><button>Like</button></label></td></tr>"; 
							$('#'+ris).append(sub);
							var btn = document.getElementById(""+lik);
							btn.addEventListener("click", likeClick);
						}else{ 
							var sub = "<tr><td><label id="+lik+" class="+ris+"><button>Dislike</button></label></td></tr>"; 
							$('#'+ris).append(sub);
							var btn = document.getElementById(""+lik);
							btn.addEventListener("click", likeClick);
						}
					})
				}
			  });

			var field = "<fieldset>"+ table + "</fieldset>";
			var space = "<br>";

			
			$('#corpoTesto').append(field);
			$('#corpoTesto').append(space);

			i = i+1;
			
		});
			var nome = "<label><input id='find' type='text' name='find' width='16' maxlength='16'></label>";
			var sub = "<label id ='cerca'><button> Cerca </button></label>";

			
			$('#corpoTesto').append(nome);
			$('#corpoTesto').append(sub);
	}
	$('#cerca').click(cercaP);
	$('#home').click(noClick);
}

//Funzione per aggiungere/rimuovere like ai percorsi
function likeClick(){
	var l = document.getElementById(""+this.id);
	var id = this.id;
	var cla = this.className;
	if(l.innerText == "Like"){
		var table = document.getElementsByClassName(""+cla);
		var body = table[0].childNodes;
		var tr = body[0].childNodes;

		document.getElementById(""+this.id).remove();
		
		$.ajax({
			type: "GET",
			url: "getData.php",
			data: {
				type: "like",
				part: tr[2].childNodes[1].innerText,
				arr: tr[3].childNodes[1].innerText,
				lung: tr[4].childNodes[1].innerText,
				user: document.getElementById("name").textContent
			},
			dataType: "json",
			success: function(json){
				json.sol.forEach(element =>{
					var num = element.Username;
					var riga = tr[6].childNodes
					riga[1].innerHTML = ""+num;
				})
			}
	  	});
		
		var sub = "<label id="+id+" class="+cla+"><button>Dislike</button></label>";
		$('#'+cla).append(sub);
	}
	else{
		var table = document.getElementsByClassName(""+this.className);
		var body = table[0].childNodes;
		var tr = body[0].childNodes;

		document.getElementById(""+this.id).remove();

		$.ajax({
			type: "GET",
			url: "getData.php",
			data: {
				type: "dislike",
				part: tr[2].childNodes[1].innerText,
				arr: tr[3].childNodes[1].innerText,
				lung: tr[4].childNodes[1].innerText,
				user: document.getElementById("name").textContent
			},
			dataType: "json",
			success: function(json){
				json.sol.forEach(element =>{
					var num = element.Username;
					var riga = tr[6].childNodes
					riga[1].innerHTML = ""+num;
				})
			}
	  	});
		var sub = "<label id="+id+" class="+cla+"><button>Like</button></label>";
		$('#'+cla).append(sub);
	}

	var btn = document.getElementById(""+id);
	btn.addEventListener("click", likeClick);
}

//Funzione per visualizzare percorsi a cui si è messo Like
function likedP(){
	$.ajax({
		url: "getData.php",
		type: "GET",
		data:{
			lkd: "true",
			user: document.getElementById("name").textContent
		},
		dataType: "json",
		success: visualizzaLiked,
		error: error
	  });
}
function visualizzaLiked(json){

	$('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}

	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);
	$('#home').click(noClick);

	if (Object.keys(json).length == 0) {
		var title = "<h2> Ci dispiace, ma non ha messo like ancora a nessun percorso </h2>";
		var field = "<h3> Inizi Subito </h3>";
		var nome = "<label><input id='find' type='text' name='find' width='16' maxlength='16'></label>";
		var sub = "<label id ='cerca'><button > Cerca </button></label>";

		$('#corpoTesto').append(title);
		$('#corpoTesto').append(field);
		$('#corpoTesto').append(nome);
		$('#corpoTesto').append(sub);
		$('#cerca').click(cercaP);

	}else{
		var i = 0;
		json.rows.forEach(element =>{

			$.ajax({
				type: "GET",
				url: "getData.php",
				data: {
					id: element.Id_Percorso
				},
				dataType: "json",
				success: function(json){
					json.rows.forEach(element =>{
						var reg = element.Regione;
						var prov = element.Provincia;
						var start = element.Partenza;
						var arrive = element.Arrivo;
						var leng = element.Lunghezza;
						var diff = element.Difficoltà;
						var num = element.NumLikes;
						var ris = "ris"+i;
						var lik = "lik"+i;

						var regione = "<tr><td><strong>"+"Regione: </strong></td><td>"+ reg +"</td></tr>";
						var provincia = "<tr><td><strong>"+"Provincia: </strong></td><td>"+ prov +"</td></tr>";
						var inizio = "<tr><td><strong>"+"Partenza da: </strong></td><td>"+ start +"</td></tr>";
						var fine = "<tr><td><strong>"+"Arrivo a: </strong></td><td>"+ arrive +"</td></tr>";
						var lunghezza = "<tr><td><strong>"+"Lunghezza (km): </strong></td><td>"+ leng +"</td></tr>";
						var diffic = "<tr><td><strong>"+"Difficoltà: </strong></td><td>"+ diff +"</td></tr>";
						var numero = "<tr><td><strong>"+"Numero Like: </strong></td><td>"+ num +"</td></tr>";
						var sub = "<tr><td><label id="+lik+" class="+ris+"><button>Dislike</button></label></td></tr>"; 

						var table =  "<table id="+ris+" class="+ris+">"+regione+provincia+inizio+fine+lunghezza+diffic+numero+sub+"</table>";
						
						var field = "<fieldset>"+ table + "</fieldset>";
						var space = "<br>";

						
						$('#corpoTesto').append(space);
						$('#corpoTesto').append(field);
						var btn1 = document.getElementById(""+lik);
						var btn2 = document.getElementById(""+lik);
						btn1.addEventListener("click", likeClick);
						btn2.addEventListener("click", likedP);
						i = i+1;
					});
				},
				error: error
			  });
		});

		var title2 = "<h2> Aggiungi nuovi percorsi </h2>";
		var nome = "<label><input id='find' type='text' name='find' width='16' maxlength='16'></label>";
		var sub = "<label id ='cerca'><button> Cerca </button></label>";
		var space = "<br>";
			
		$('#corpoTesto').append(title2);
		$('#corpoTesto').append(nome);
		$('#corpoTesto').append(sub);
		$('#corpoTesto').append(space);
		
		$('#cerca').click(cercaP);
	}
}

//Tasto info
function infoClick(){
	$.ajax({
		url: "json/info3.json",
		type: 'GET',
		dataType: 'JSON', 
		success: successJson,
		error: error
	})
}
//Funzione successo info
function successJson(json){
	$('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}
	

	json.info.forEach(element => {
		var title = element.title;
		var body = element.body;
		var btn = element.btn;

		var info = "<h1>"+title+"</h1>";
		info += "<p>"+body+"</p>";
		var b = "<li><a id='home' class='banner'>"+btn+"</a></li>";
		
		$('ul').append(b);
		$('#corpoTesto').append(info);
	});

	banner();
}



//Tasto Home
function homeClick(){
	$.ajax({
		url: "json/info3.json",
		type: 'GET',
		dataType: 'JSON', 
		success: back,
		error: error
	})
}
function back(json){
	$('#corpoTesto').empty();
	$('ul').empty();
	json.home.forEach(element => {
		var title = element.title;
		var body = element.body;
		var btn1 = element.btn1;
		var btn2 = element.btn2;
		var btn3 = element.btn3;

		var info = "<h1>"+title+"</h1>";
		info += "<p>"+body+"</p>";
		var b1 = "<li><a id='login' class='banner'>"+btn1+"</a></li>";
		var b2 = "<li><a id='register' class='banner'>"+btn2+"</a></li>";
		var b3 = "<li><a id='info' class='banner'>"+btn3+"</a></li>";
		
		$('ul').append(b1);
		$('ul').append(b2);
		$('ul').append(b3);
		$('#corpoTesto').append(info);
	});
	banner();
}

//Gestisco errore di accesso al Json
function error(){
	$('#corpoTesto').empty();
	if(document.getElementById('home')!= null){document.getElementById('home').remove();}
	var btn = "<li><a id='home' class='banner'>"+"Home"+"</a></li>";
	$('ul').append(btn);
	$('#home').click(noClick);

	var info = "<h3>Si è verificato un errore. Riprova più tardi.</h3>";

	$('#corpoTesto').append(info);
}