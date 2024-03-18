const prompt = require("prompt-sync")();  //To get user input 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT ={
    A:2,
    B:4,          //objects in JS
    C:6,
    D:8
};

const SYMBOLS_VALUES ={
    A:5,
    B:4,          //objects in JS
    C:3,
    D:2
};


function deposit(){
  while(true){ //To go loop asking for deposite untill valid transaction is done.
    const deposite_amount = prompt("Enter a demposit amount: "); //This is actually accepting as string.
    const numberDepositamount= parseFloat(deposite_amount); //converted a number into float

    if(isNaN(numberDepositamount) || numberDepositamount<= 0){      //isNan checks if the number is not number.
        console.log("INvalid deposite deposite_amount...");
    }
    else{
        return numberDepositamount;
    }
  }
};

function getnumberoflines(){
    while(true){
        const lines = prompt("Enter the number of lines: "); //This is actually accepting as string.
        const numberoflines= parseFloat(lines); //converted a number into float
    
        if(isNaN(numberoflines) || numberoflines<= 0 || numberoflines >3){      //isNan checks if the number is not number.
            console.log("INvalid number of lines...");
        }
        else{
            return numberoflines;
        }
      }
};

function  getBet(balance,lines){
    while(true){
        const bet = prompt("Enter the bet per line: "); //This is actually accepting as string.
        const numberbet= parseFloat(bet); //converted a number into float
    
        if(isNaN(numberbet) || numberbet<= 0 || numberbet > (balance/lines)){      //isNan checks if the number is not number.
            console.log("INvalid bet...");
        }
        else{
            return numberbet;
        }
      }
};

function spin(){
    const symbols=[]; //you can add to array even if array is constant.
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0;i<count;i++){
            symbols.push(symbol);
        }

    }
    
    const reels =[[],[],[]]; //each list inside the main list indicates the reels in a slot machine 
    for(let i =0 ;i<COLS;i++){
        const reelsymbols = [...symbols];//copied symbols into reel symbols in oder to show only one key in a reel at a time other wise for ex,the reel cannot show 2 a on the same
        for(let j=0;j<ROWS;j++){
            const randomIndex =Math.floor(Math.random() * reelsymbols.length); //math.random generate value between 0 and 1.
            const selectedsymbol = reelsymbols[randomIndex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomIndex,1);//1 means remove one elemanet,


        }
    }
    return reels;

};

function transpose(reels){
    const rows =[];
    for(let i=0; i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

function printRows(rows){
    for(const row of rows){
        let rowstring = "";
        for(const [i,symbol] of row.entries()){
            rowstring += symbol;    //concatnation
            if(i != row.length-1){
                rowstring +="|";
            }
        }
        console.log(rowstring);
    }
};

function getWinnings(rows,bet,lines){
    let winnins=0;
    for(let row=0;row<lines;row++){
        const symbols =rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        }
        if (allSame){
            winnins += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnins;
};

function game(){

    let balance = deposit();   
       //let allows youto cange values,const is fixed 
    while (true){
        console.log("You have a $ "+balance); 
    const numberoflines = getnumberoflines();
    const bet =getBet(balance,numberoflines);
    balance -= bet*numberoflines;
    const reels =spin();
    console.log(reels);         // [ 'C', 'C', 'B' ], [ 'D', 'D', 'C' ], [ 'D', 'B', 'D' ] ] this is how we get ,we need to transpose
    const rows =transpose(reels);
    console.log(rows);
    printRows(rows);
    const winnins=getWinnings(rows,bet,numberoflines);
    balance += winnins;
    console.log("You won $"+winnins.toString());
    if(balance <=0){
        console.log("You ran out of money:");
    }
    const playAgain =prompt("Do you want to play again (Y/N)");
    if(playAgain != "y") break;
    };

};

game();



