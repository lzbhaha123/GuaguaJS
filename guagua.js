class Prize{
		constructor(id,possibility,img){
			this.id = id;
			this.possibility = possibility;
			this.img = img;
		}
	}
function LottoGenerator(lottoWidth,lottoHeight,prizes,color="#696969"){
	class Lotto{
		constructor(div = null){
			this.div = div;
		}
		getSelectedPrize(){}
	}
	var lotto = new Lotto(); 
	var prizeList = [];
	for(var j = 0;j<prizes.length;j++){
		for(var i = 0;i<prizes[j].possibility;i++){
			prizeList.push(prizes[j]);
		}
	}
	var getResultOnce = true;
	var finalPrize = prizeList[Math.round(Math.random()*100)];

	var lottoDiv = document.createElement("div");

	lottoDiv.style.width = lottoWidth+'px';lottoDiv.style.height = lottoHeight+'px';
	lottoDiv.style.overflow = "hidden";lottoDiv.style.position = "relative";


	var prizeImg = document.createElement("img");
	prizeImg.style.width = lottoWidth+'px';prizeImg.style.height = lottoHeight+'px';
	prizeImg.style.position = "absolute"; 
	prizeImg.src = finalPrize.img;
	lottoDiv.appendChild(prizeImg);


	var coatCanvas = document.createElement("canvas");
	coatCanvas.style.width = lottoWidth+'px';coatCanvas.style.height = lottoHeight+'px';
	coatCanvas.style.position = "absolute";
	lottoDiv.appendChild(coatCanvas);


	var coatCtx = coatCanvas.getContext('2d');
	coatCtx.beginPath();
	coatCtx.fillStyle = color;
	coatCtx.fillRect(0, 0, lottoWidth*2, lottoHeight*4);
	var mEvent = new CustomEvent("getPrize");
	lotto.bindPrizeAction = function(prizeMethod){
		lottoDiv.addEventListener("getPrize",prizeMethod);
		
	}


	coatCanvas.onmousedown = function(){
		coatCanvas.onmousemove = function(){
			var x = event.clientX;
			var y = event.clientY;
			coatCtx.globalCompositeOperation = "destination-out";
			coatCtx.beginPath();
			coatCtx.arc(x*2,y*4,30,0,Math.PI*2);
			coatCtx.fill(); 
		}
	}
	coatCanvas.onmouseup = function(){coatCanvas.onmousemove = function(){
		var imageDate = coatCtx.getImageData(0, 0,lottoWidth*2, lottoHeight*4);
		var pxNumber = imageDate.width * imageDate.height;
		var cleanedPoint = 0;
		for (var i = 0; i < pxNumber; i++) {
            if (imageDate.data[i] == 0) {
                cleanedPoint++;
            }
        }
		if (cleanedPoint >= pxNumber * 1 / 3) {
			if(getResultOnce){
				lottoDiv.dispatchEvent(mEvent);
				getResultOnce = false;
			}
		}
		
	}}
	lotto.div = lottoDiv;
	lotto.getSelectedPrize = function (){
		return finalPrize;
	}
	
	return lotto;
}