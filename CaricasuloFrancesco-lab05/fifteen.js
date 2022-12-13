var emptyTile = {
    id: "empty_tile",
    x: 3,
    y: 3
};

var childDivs = [];

window.onload = function (){
	createPuzzle();
	var shuffleButton = document.getElementById('shufflebutton');
	shuffleButton.onclick = shuffle;
}

function createPuzzle(){
	var childDivs = document.getElementById('puzzlearea').getElementsByTagName('div');
	var moveX = -1;
	var moveY = 0;

	for(var i = 0; i < childDivs.length; i++) {
		childDivs[i].className = "tile";
		if(i % 4 == 0 && i > 0){
			moveY += 1;
			moveX = 0;	
			childDivs[i].style.left = moveX * 100 + "px";
			childDivs[i].style.top = moveY * 100 +"px";
			childDivs[i].style.backgroundPosition = -moveX * 100 + "px" + " " + moveY * -100 + "px";
		}else{
			moveX += 1;
			childDivs[i].style.left = moveX * 100 +"px";	
			childDivs[i].style.top = moveY * 100 +"px";
			childDivs[i].style.backgroundPosition = -moveX * 100 + "px" + " " + moveY * -100 + "px";
		}	

		childDivs[i].id = `${moveX}_${moveY}`;
		/* Dollaro si usa quando ci si vuole riferire ad una varaibile dentro una stringa.
		La strin in questo caso non può essere indicata con ' o ", ma devono essere degli apici di 
		questo tipo: ` */

		childDivs[i].onclick = tileClick;
        childDivs[i].onmouseover = tileMouseOver;
        childDivs[i].onmouseleave = tileMouseLeave;
	}

	return childDivs;
	
}

function shuffle(){
	var divs = document.getElementById('puzzlearea').getElementsByTagName('div');

	var tileArrX = [];
	var tileArrY = [];

	var x; 
	var y;
	var tempID;
	var max = 4;

	for(var j = 0; j < 4; j++){
		x = Math.floor(Math.random() * max);
		if(tileArrX.length == 0){
			tileArrX.push(x);
		}else{
			var i = 0;
			while(i < tileArrX.length){
				if(tileArrX[i] != x){
					i++;
				}else{
					x = Math.floor(Math.random() * max);
					i = 0;
				}
			}
			if(i == tileArrX.length){
				tileArrX.push(x);
			}
		}
	}

	for(j = 0; j < 4; j++){
		y = Math.floor(Math.random() * max);
		if(tileArrY.length == 0){
			tileArrY.push(y);
		}else{
			i = 0;
			while(i < tileArrY.length){
				if(tileArrY[i] != y){
					i++;
				}else{
					y = Math.floor(Math.random() * max);
					i = 0;
				}
			}
			if(i == tileArrY.length){
				tileArrY.push(y);
			}
		}
	}

	var z = 0;
	while(z < divs.length){
		for(i = 0; i < 4; i++){
			for(j = 0; j < 4; j++){
				if(i == 3 && j == 3){
					emptyTile.x = tileArrX[i];
					emptyTile.y = tileArrY[j];
					emptyTile.id = `${tileArrX[i]}_${tileArrY[j]}`;
				}else{
					divs[z].style.left = tileArrX[i] * 100 + "px";	
					divs[z].style.top = tileArrY[j] * 100 + "px";
					divs[z].id = `${tileArrX[i]}_${tileArrY[j]}`;
					z++;
				}
			}
		}
	}
}

function tileClick(){
	if(nextTileIsEmpty(this)){
		var tempX;
		var tempY;

		var top = parseInt(this.style.top)/100;
		var left = parseInt(this.style.left)/100;
		var tempID = this.id;

		tempX = left;
		tempY = top;
		
		this.style.left = emptyTile.x * 100 + "px";
		this.style.top = emptyTile.y * 100 + "px";
		this.id = emptyTile.id;

		emptyTile.x = tempX;
		emptyTile.y = tempY;
		emptyTile.id = tempID;

		if(checkPuzzle())
			alert("Puzzle Completed");
	}
}

function tileMouseOver(){
	var div = document.querySelectorAll('div:hover');
	if(nextTileIsEmpty(this)){
		this.className += " tile_ok";	
	}
}

function tileMouseLeave(){
	this.className = "tile";
}

function nextTileIsEmpty(div){
	var left = parseInt(div.style.left)/100;
	var top = parseInt(div.style.top)/100;

	if(Math.abs(emptyTile.y - top) == 1 && emptyTile.x - left == 0 || Math.abs(emptyTile.x - left) == 1 && emptyTile.y - top == 0) {
		/* Se la differenza in valore assoluto tra la coordinata y dell'elemento col cursore puntato con quella dell'elemento 
		vuoto è 1 e invece la differenza tra la coordinata x dell'elemento col cursore puntato con quelle dell'elemento vuoto
		è nulla vuol dire che posso spostarmi verso sopra/sotto.
		Se invece la differenza in valore assoluto tra la coordinata y dell'elemento puntato col cursore con quella 
		dell'elemento vuoto è nulla e la differenza tra la coordinata x dell'elemento puntato col cursore con quella
		dell'elemento vuoto è 1 vuol dire che possono spostarmi verso destra/sinistra.
		*/		
        return(true);
    }
    
    return(false);
}

function checkPuzzle() {

	divs = document.getElementById('puzzlearea').getElementsByTagName('div');

	var z = 0;
	while(z < divs.length){
		for(var i = 0; i < 4; i++){ // riga
			for(var j = 0; j < 4; j++){ // elemento
				if(i == 3 && j == 3) {
					if(emptyTile.x == j && emptyTile.y == i)
						return true;
					else return false;
				}
					
				if(divs[z].id === `${j}_${i}`)
					z++;
				else
					return false;
			}
		}
	}
}