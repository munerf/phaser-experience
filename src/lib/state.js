// Constructor
function State(numberOfRehersals, condition, conditionProbability, playerName, maxTime, lagn) {

    this.numberOfRehersals = numberOfRehersals;
    this.maxTime = maxTime;
    this.numberOfAnswers = 8;
    this.condition = condition;
    this.keyPresses = new Array(numberOfRehersals);
    this.score = 0;
    this.playerName = playerName;
    this.lagn = lagn;

    this.startTime = new Date();
    this.endTime = "fim";

    this.currentRehersal = 1;
    this.currentAnswer = 0;

    if(!conditionProbability){
        this.conditionProbability = 0;
    } else {
        this.conditionProbability = conditionProbability;
    }

    for (var i = 0; i < this.numberOfRehersals; i++) {
        this.keyPresses[i] = new Array(this.numberOfAnswers);
    }

    this.scoreByRehersal = new Array(this.numberOfRehersals);

    for (var i = 0; i < this.numberOfRehersals; i++) {
        this.scoreByRehersal[i] = false;
    }

}

State.prototype.getPlayerName = function () {
    return this.playerName;
};

State.prototype.setPlayerName = function (name) {
    this.playerName = name;
};

State.prototype.setEndTime = function () {
    this.endTime = new Date();
};

State.prototype.getScore = function () {
    return this.score;
};

State.prototype.incrementScore = function () {
    this.score++;
    this.scoreByRehersal[this.currentRehersal-1] = true;
};

State.prototype.getCurrentRehersal = function () {
    return this.currentRehersal;
};

State.prototype.resetAnswer = function () {
    this.currentAnswer = 0;
};

State.prototype.getCurrentAnswer = function () {
    return this.currentAnswer;
};

State.prototype.nextRehersal = function () {
    this.currentRehersal++;
};

State.prototype.nextAnswer = function () {
    this.currentAnswer++;
};

// class methods
State.prototype.logKeyPress = function (key) {
    this.keyPresses[this.currentRehersal - 1][this.currentAnswer] = key;
};

State.prototype.toString = function () {
    return this.keyPresses;
};

State.prototype.checkCondition = function () {
    if (this.condition == 'I') {
        return this.checkCondition1(this.currentRehersal);
    }
    if (this.condition == 'II') {
        return this.checkCondition2(this.currentRehersal);
    } 
    if (this.condition == 'III') {
        return this.checkCondition3(this.currentRehersal);
    }
};

State.prototype.checkConditionWithBounds = function (min,max) {
    rehersal = this.currentRehersal - 1;
    if (rehersal < this.lagn) {
        return false;
    }

    var rehersals = [];
    for (var i = 0; i <= this.lagn; i++) {
        var rehersalData = this.keyPresses[rehersal - i];
        rehersalData = rehersalData.slice(min,max+1);
        rehersals.unshift(rehersalData);

        console.log("Ensaio a comparar " + (rehersal - i));
        console.log(rehersalData);
        console.log(rehersals);
    };

    var result = checkAllDifferent(rehersals);
    console.log("Resultado: "  + result);
    
    return result;
};

State.prototype.checkConditionWithBoundsOld = function (min,max) {
    rehersal = this.currentRehersal;
    if (rehersal <= 4) {
        return false;
    }

    console.log("Ensaio " + rehersal);

    var fstRehersalData = this.keyPresses[rehersal-5];
    var fst = fstRehersalData.slice(min,max+1);
    
    console.log("Ensaio a comparar " + (rehersal - 5));
    console.log(fst);

    var sndRehersalData = this.keyPresses[rehersal-4];
    var snd = sndRehersalData.slice(min,max+1);

    console.log("Ensaio a comparar " + (rehersal - 4));
    console.log(snd);

    var thrdRehersalData = this.keyPresses[rehersal-3];
    var thrd = thrdRehersalData.slice(min,max+1);

    console.log("Ensaio a comparar " + (rehersal - 3));
    console.log(thrd);

    var fourthRehersalData = this.keyPresses[rehersal-2];
    var fourth = fourthRehersalData.slice(min,max+1);

    console.log("Ensaio a comparar " + (rehersal - 2));
    console.log(fourth);

    var fifthRehersalData = this.keyPresses[rehersal-1];
    var fifth = fifthRehersalData.slice(min,max+1);

    console.log("Ensaio a comparar " + (rehersal - 1));
    console.log(fifth);


    var result = checkAllDifferent([fst, snd, thrd, fourth, fifth]);
    console.log("Resultado: "  + result);
    
    return result;
};

State.prototype.checkCondition1 = function () {

    return this.checkConditionWithBounds(0,3);
    /*
    rehersal = this.currentRehersal;
    if (rehersal <= 4) {
        return false;
    }
    var fst = [this.keyPresses[rehersal - 2][0], this.keyPresses[rehersal - 2][1], this.keyPresses[rehersal - 2][2], this.keyPresses[rehersal - 2][3]];
    var snd = [this.keyPresses[rehersal - 3][0], this.keyPresses[rehersal - 3][1], this.keyPresses[rehersal - 3][2], this.keyPresses[rehersal - 3][3]];
    var thrd = [this.keyPresses[rehersal - 4][0], this.keyPresses[rehersal - 4][1], this.keyPresses[rehersal - 4][2], this.keyPresses[rehersal - 4][3]];
    var fourth = [this.keyPresses[rehersal - 5][0], this.keyPresses[rehersal - 5][1], this.keyPresses[rehersal - 5][2], this.keyPresses[rehersal - 5][3]];

    return !(fst.equals(snd) && snd.equals(thrd) && thrd.equals(fourth));
    */
};

State.prototype.checkCondition2 = function () {
    return this.checkConditionWithBounds(4,7);
    /*
    rehersal = this.currentRehersal;

    if (rehersal <= 4) {
        return false;
    }
    var fst = [this.keyPresses[rehersal - 2][4], this.keyPresses[rehersal - 2][5], this.keyPresses[rehersal - 2][6], this.keyPresses[rehersal - 2][7]];
    var snd = [this.keyPresses[rehersal - 3][4], this.keyPresses[rehersal - 3][5], this.keyPresses[rehersal - 3][6], this.keyPresses[rehersal - 3][7]];
    var thrd = [this.keyPresses[rehersal - 4][4], this.keyPresses[rehersal - 4][5], this.keyPresses[rehersal - 4][6], this.keyPresses[rehersal - 4][7]];
    var fourth = [this.keyPresses[rehersal - 5][4], this.keyPresses[rehersal - 5][5], this.keyPresses[rehersal - 5][6], this.keyPresses[rehersal - 5][7]];

    return !(fst.equals(snd) && snd.equals(thrd) && thrd.equals(fourth));
    */

};

State.prototype.checkCondition3 = function () {
    var randomInt = getRandomInt(1,100);
    //console.log('Probability: ' + this.conditionProbability + ' Random int: ' + randomInt);
    if(randomInt <= this.conditionProbability * 100){
        return true;
    } else {
        return false;
    }
};

State.prototype.exportToCsv = function(filename) {
        
        var csvFile = this.generateCSV();

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
}

State.prototype.generateCSV = function(){
    var header = 'ensaio,condicao,probabilidade,participante,hora inicio,hora fim,numero de ensaios,lagn,resposta 1,resposta 2,resposta 3,resposta 4,resposta 5,resposta 6,resposta 7,resposta 8,pontuou\n';
    var ac = header; 
    for(i=0; i<this.numberOfRehersals;i++){
            ac+=(i+1)
                 + ',' + this.condition
                 + ',' + this.conditionProbability
                 + ',' + this.playerName
                 + ',' + this.startTime.toTimeString()  
                 + ',' + this.endTime.toTimeString() 
                 + ',' + this.numberOfRehersals 
                 + ',' + this.lagn 
                 + ',' + this.keyPresses[i][0] 
                 + ',' + this.keyPresses[i][1] 
                 + ',' + this.keyPresses[i][2] 
                 + ',' + this.keyPresses[i][3] 
                 + ',' + this.keyPresses[i][4] 
                 + ',' + this.keyPresses[i][5] 
                 + ',' + this.keyPresses[i][6] 
                 + ',' + this.keyPresses[i][7] 
                 + ',' + this.scoreByRehersal[i]
                 + "\n";
    }
    return ac;
}

function checkAllDifferent(values){
    var ac = new Set();
    for(i=0; i<values.length; i++){
        var str = values[i].toString();
        ac.add(str);
    }
    if(ac.size == values.length){
        return true;
    } else {
        return false;
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

