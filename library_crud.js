const fs = require('fs');
const ask = require('readline-sync')
const filePath = './dataBase.json'
var booksStoreObj;

var d = {
  TheHolyBible: 5, TheHolyQuran: 10, TheHarryPotterSeries: 8, TheQuotationsFromChairmanMaoTseTung: 20, TheLordoftheRings: 5,
  TheAlchemist: 10, TheDiary: 10, TheTwilightSagA: 8, TheGreatGatsby: 5, Ulysses: 5, TheCatcherintheRye: 5,
  PrideandPrejudice: 5, AdventuresofHuckleberryFinn: 5, AdventureinWonderland: 5, TotheLighthouse: 10
}

!fs.existsSync('./bookStoreObj.json') ? (fs.writeFileSync('./bookStoreObj.json',JSON.stringify(d,null,2)),console.log('done!!')):console.log('\n -Hello!,Wel-come-!! library');
try{
  booksStoreObj = fs.readFileSync('./bookStoreObj.json','utf-8')
  booksStoreObj = JSON.parse(booksStoreObj)
}catch{console.log('error.message');}

let dataBase ;
let arr = ['username','pin','phoneNumber']
let a = []
!fs.existsSync(filePath) ? (writeDataInJsonFile(a),dataBase = readDataInJson(filePath)):(dataBase = readDataInJson(filePath));

let T = true
while (T){
  let c = ask.question('\n\t1) create account \n\t2) log-in \n\t3) exit\n\n enter: ');
  (c==1)?creatAccount():(c==2) ? loginAccount():(c==3)?(console.log('bye--'),T=false):(console.log('---Invalid input---'))
}

function readDataInJson(fileName){
  try{
    dataBase = fs.readFileSync(fileName,'utf-8')
    return  JSON.parse(dataBase)
  }catch{console.error('error.message2');}
}

function writeDataInJsonFile(data,filePath ='./dataBase.json'){
  try{
    fs.writeFileSync(filePath,JSON.stringify(data,null,2))
  }catch{console.error(error.message);}
}

function booksReturnFunction(ind){ 
  let temArr = []
  let n      = 1

  if (dataBase[ind]['booksData'].length > 0){

    for (const b of dataBase[ind]['booksData']){
      temArr.push(b)
      console.log(n,') "',b[0],'" no of books: ',b[1]);
      n++
      }
    const bookName = ask.questionInt('\nchose the book num : ')-1;
    let T          = true
    console.log('return book: ',temArr[bookName]);
    while(T){
      const bookNo = ask.questionInt('how many book you return : ');
      let [bn,noofBook]= dataBase[ind]['booksData'][bookName]
      console.log(bn,'   noofBook :',noofBook );
      (noofBook >= bookNo)?(T = false,noofBook-=bookNo,booksStoreObj[temArr[bookName][0]]+=bookNo,noofBook==0 ? (dataBase[ind]['booksData'].splice(bookName,1),writeDataInJsonFile(dataBase),writeDataInJsonFile(booksStoreObj,'./bookStoreObj.json'),console.log('\n\tsuccesfull took the book!!')):(writeDataInJsonFile(dataBase),writeDataInJsonFile(booksStoreObj,'./bookStoreObj.json'),console.log('\n\tsuccesfull took the book!!'))):console.log('you enter more then you take!!')
    }
  }else{console.log('you not took the book, with this account!!');}
}

function creatAccount(){
  let ind    = 0;
  let temObj = {};
    while (ind < arr.length){
      const propertyOfOdjValue = ask.question(`enter the ${arr[ind]}: `)
      if (propertyOfOdjValue.length>0){
        temObj[arr[ind]]=propertyOfOdjValue;
        if (arr[ind] == 'username'){
          for (let ele of dataBase){
            if (ele.username == propertyOfOdjValue){
              console.log('\n!!you have account with the name :',propertyOfOdjValue);
              ind = arr.length
              break
            }
          }
        }
        ind++;
      }else{console.log('enter something!!');}
    }
    temObj["booksData"] = []
    dataBase.push(temObj)
    writeDataInJsonFile(dataBase)
}

function booksTakingFunction(ind,temArray){
  let num    = 1
  const hold = []

  for (const book in booksStoreObj){
    temArray.push(book)
    console.log(num,')  ',book);
    num++
    }
  const c = ask.questionInt('enter the number :')-1
  console.log(`\nyou chose this book "${temArray[c]}",this noof books we have "${booksStoreObj[temArray[c]]}"\n`);

  let T = true
  while (T){
    const numOfbooks = ask.questionInt('enter the number of books you want :');
    (booksStoreObj[temArray[c]] >= numOfbooks && dataBase[ind][1] != 0 ) ? (hold.push(temArray[c], numOfbooks),T = false, dataBase[ind]['booksData'][dataBase[ind]['booksData'].length] = hold, booksStoreObj[temArray[c]] -= numOfbooks, writeDataInJsonFile(dataBase), writeDataInJsonFile(booksStoreObj,'./bookStoreObj.json'),console.log('successfull complated!!')):console.log('ente the num lessthen or equal');
  }return ind = dataBase.length;
};

function loginAccount(){
  const name = ask.question('enter the username: ');
  let ind    = 0;

  while (ind < dataBase.length){
    const obj = dataBase[ind];
    let c2;
    (name == obj.username)?(pin = ask.question('enter the pin: '),(pin ==obj.pin) ? (console.log('\n\t 1) taking books  \n\t 2) return books \n'),temArray = [],c2= ask.question('enter the number: '),c2 == '1' ? ind = booksTakingFunction(ind,temArray):ind = booksReturnFunction(ind)) :console.log('your pin is wrong')):(ind > dataBase.length-2) ? (console.log('this name not in the dataBase!!'),ind=dataBase.length):
    ind++;
}};