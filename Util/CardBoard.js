const CardBoard = {
  getBoardRuns(cardOne, cardTwo, aceAce, aceWicket, twoTwo, twoWicket, threeThree, threeWicket, fourFour, fourWicket, fiveFive, fiveWicket, sixSix, sixWicket, sevenSeven, sevenWicket, batterId, aggBoard) {

    if (aceAce === "W") {
      aceAce = '0';
    }

    if (twoTwo === "W") {
      twoTwo = '0';
    }

    if (threeThree === "W") {
      threeThree = '0';
    }

    if (fourFour === "W") {
      fourFour = '0';
    }

    if (fiveFive === "W") {
      fiveFive = '0';
    }

    if (sixSix === "W") {
      sixSix = '0';
    }

    if (sevenSeven === "W") {
      sevenSeven = '0';
    }

    console.log(aceAce);
    aceAce = Number(aceAce)
    console.log(aceAce);
    twoTwo = Number(twoTwo)
    console.log(twoTwo);

    threeThree = Number(threeThree)
    fourFour = Number(fourFour)
    fiveFive = Number(fiveFive)
    sixSix = Number(sixSix)
    sevenSeven = Number(sevenSeven)


    console.log(cardOne);
    console.log(cardTwo);




    switch(cardOne) {
      case 0:
      cardOne = 1;
      break;
      case 1:
      cardOne = 2;
      break;
      case 2:
      cardOne = 3;
      break;
      case 3:
      cardOne = 4;
      break;
      case 4:
      cardOne = 5;
      break;
      case 5:
      cardOne = 6;
      break;
      case 6:
      cardOne = 7;
      break;
      case 7:
      cardOne = 1;
      break;
    case 8:
    cardOne = 2;
    break;
    case 9:
    cardOne = 3;
    break;
    case 10:
    cardOne = 4;
    break;
    case 11:
    cardOne = 5;
    break;
    case 12:
    cardOne = 6;
    break;
    case 13:
    cardOne = 7;
    break;
    case 14:
    cardOne = 1;
    break;
    case 15:
    cardOne = 2;
    break;
    case 16:
    cardOne = 3;
    break;
    case 17:
    cardOne = 4;
    break;
    case 18:
    cardOne = 5;
    break;
    case 19:
    cardOne = 6;
    break;
    case 20:
    cardOne = 7;
    break;
    case 21:
    cardOne = 1;
    break;
    case 22:
    cardOne = 2;
    break;
    case 23:
    cardOne = 3;
    break;
    case 24:
    cardOne = 4;
    break;
    case 25:
    cardOne = 5;
    break;
    case 26:
    cardOne = 6;
    break;
    case 27:
    cardOne = 7;
    break;
    default:
    console.log('hit?')
      break;
  }

  switch(cardTwo) {
    case 0:
    cardTwo = 1;
    break;
    case 1:
    cardTwo = 2;
    break;
    case 2:
    cardTwo = 3;
    break;
    case 3:
    cardTwo = 4;
    break;
    case 4:
    cardTwo = 5;
    break;
    case 5:
    cardTwo = 6;
    break;
    case 6:
    cardTwo = 7;
    break;
    case 7:
    cardTwo = 1;
    break;
  case 8:
  cardTwo = 2;
  break;
  case 9:
  cardTwo = 3;
  break;
  case 10:
  cardTwo = 4;
  break;
  case 11:
  cardTwo = 5;
  break;
  case 12:
  cardTwo = 6;
  break;
  case 13:
  cardTwo = 7;
  break;
  case 14:
  cardTwo = 1;
  break;
  case 15:
  cardTwo = 2;
  break;
  case 16:
  cardTwo = 3;
  break;
  case 17:
  cardTwo = 4;
  break;
  case 18:
  cardTwo = 5;
  break;
  case 19:
  cardTwo = 6;
  break;
  case 20:
  cardTwo = 7;
  break;
  case 21:
  cardTwo = 1;
  break;
  case 22:
  cardTwo = 2;
  break;
  case 23:
  cardTwo = 3;
  break;
  case 24:
  cardTwo = 4;
  break;
  case 25:
  cardTwo = 5;
  break;
  case 26:
  cardTwo = 6;
  break;
  case 27:
  cardTwo = 7;
  break;
  default:
    break;
}

console.log(cardOne);
console.log(cardTwo);

if ((aggBoard === 1 && batterId <= 5) || (aggBoard === 4 && batterId <= 5)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 2 && batterId <= 5) || (aggBoard === 5 && batterId <= 5)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [2,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 3 && batterId <= 5) || (aggBoard === 6 && batterId <= 5)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 1 && batterId <= 8) || (aggBoard === 4 && batterId <= 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 2 && batterId <= 8) || (aggBoard === 5 && batterId <= 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 3 && batterId <= 8) || (aggBoard === 6 && batterId <= 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [2,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 1 && batterId > 8) || (aggBoard === 4 && batterId > 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [0,true];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 2 && batterId > 8) || (aggBoard === 5 && batterId > 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [0,true];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else if ((aggBoard === 3 && batterId > 8) || (aggBoard === 6 && batterId > 8)) {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [2,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
}
else {
  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [aceAce,aceWicket];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [twoTwo,twoWicket];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [threeThree,threeWicket];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [fourFour,fourWicket];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [fiveFive,fiveWicket];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [sixSix,sixWicket];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [sevenSeven,sevenWicket];
  }
  else {
    return [10,10];
  }
  }

},

getBoardRunsAllRounderAttack(cardOne, cardTwo) {
  console.log(cardOne);
  console.log(cardTwo);

  switch(cardOne) {
    case 0:
    cardOne = 1;
    break;
    case 1:
    cardOne = 2;
    break;
    case 2:
    cardOne = 3;
    break;
    case 3:
    cardOne = 4;
    break;
    case 4:
    cardOne = 5;
    break;
    case 5:
    cardOne = 6;
    break;
    case 6:
    cardOne = 7;
    break;
    case 7:
    cardOne = 1;
    break;
  case 8:
  cardOne = 2;
  break;
  case 9:
  cardOne = 3;
  break;
  case 10:
  cardOne = 4;
  break;
  case 11:
  cardOne = 5;
  break;
  case 12:
  cardOne = 6;
  break;
  case 13:
  cardOne = 7;
  break;
  case 14:
  cardOne = 1;
  break;
  case 15:
  cardOne = 2;
  break;
  case 16:
  cardOne = 3;
  break;
  case 17:
  cardOne = 4;
  break;
  case 18:
  cardOne = 5;
  break;
  case 19:
  cardOne = 6;
  break;
  case 20:
  cardOne = 7;
  break;
  case 21:
  cardOne = 1;
  break;
  case 22:
  cardOne = 2;
  break;
  case 23:
  cardOne = 3;
  break;
  case 24:
  cardOne = 4;
  break;
  case 25:
  cardOne = 5;
  break;
  case 26:
  cardOne = 6;
  break;
  case 27:
  cardOne = 7;
  break;
  default:
  console.log('hit?')
    break;
}

switch(cardTwo) {
  case 0:
  cardTwo = 1;
  break;
  case 1:
  cardTwo = 2;
  break;
  case 2:
  cardTwo = 3;
  break;
  case 3:
  cardTwo = 4;
  break;
  case 4:
  cardTwo = 5;
  break;
  case 5:
  cardTwo = 6;
  break;
  case 6:
  cardTwo = 7;
  break;
  case 7:
  cardTwo = 1;
  break;
case 8:
cardTwo = 2;
break;
case 9:
cardTwo = 3;
break;
case 10:
cardTwo = 4;
break;
case 11:
cardTwo = 5;
break;
case 12:
cardTwo = 6;
break;
case 13:
cardTwo = 7;
break;
case 14:
cardTwo = 1;
break;
case 15:
cardTwo = 2;
break;
case 16:
cardTwo = 3;
break;
case 17:
cardTwo = 4;
break;
case 18:
cardTwo = 5;
break;
case 19:
cardTwo = 6;
break;
case 20:
cardTwo = 7;
break;
case 21:
cardTwo = 1;
break;
case 22:
cardTwo = 2;
break;
case 23:
cardTwo = 3;
break;
case 24:
cardTwo = 4;
break;
case 25:
cardTwo = 5;
break;
case 26:
cardTwo = 6;
break;
case 27:
cardTwo = 7;
break;
default:
  break;
}

console.log(cardOne);
console.log(cardTwo);


  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [4,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [6,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [0,false];
  }
  else {
    return [10,10];
  }
},

getBoardRunsBowlersAttack(cardOne, cardTwo) {
  console.log(cardOne);
  console.log(cardTwo);

  switch(cardOne) {
    case 0:
    cardOne = 1;
    break;
    case 1:
    cardOne = 2;
    break;
    case 2:
    cardOne = 3;
    break;
    case 3:
    cardOne = 4;
    break;
    case 4:
    cardOne = 5;
    break;
    case 5:
    cardOne = 6;
    break;
    case 6:
    cardOne = 7;
    break;
    case 7:
    cardOne = 1;
    break;
  case 8:
  cardOne = 2;
  break;
  case 9:
  cardOne = 3;
  break;
  case 10:
  cardOne = 4;
  break;
  case 11:
  cardOne = 5;
  break;
  case 12:
  cardOne = 6;
  break;
  case 13:
  cardOne = 7;
  break;
  case 14:
  cardOne = 1;
  break;
  case 15:
  cardOne = 2;
  break;
  case 16:
  cardOne = 3;
  break;
  case 17:
  cardOne = 4;
  break;
  case 18:
  cardOne = 5;
  break;
  case 19:
  cardOne = 6;
  break;
  case 20:
  cardOne = 7;
  break;
  case 21:
  cardOne = 1;
  break;
  case 22:
  cardOne = 2;
  break;
  case 23:
  cardOne = 3;
  break;
  case 24:
  cardOne = 4;
  break;
  case 25:
  cardOne = 5;
  break;
  case 26:
  cardOne = 6;
  break;
  case 27:
  cardOne = 7;
  break;
  default:
  console.log('hit?')
    break;
}

switch(cardTwo) {
  case 0:
  cardTwo = 1;
  break;
  case 1:
  cardTwo = 2;
  break;
  case 2:
  cardTwo = 3;
  break;
  case 3:
  cardTwo = 4;
  break;
  case 4:
  cardTwo = 5;
  break;
  case 5:
  cardTwo = 6;
  break;
  case 6:
  cardTwo = 7;
  break;
  case 7:
  cardTwo = 1;
  break;
case 8:
cardTwo = 2;
break;
case 9:
cardTwo = 3;
break;
case 10:
cardTwo = 4;
break;
case 11:
cardTwo = 5;
break;
case 12:
cardTwo = 6;
break;
case 13:
cardTwo = 7;
break;
case 14:
cardTwo = 1;
break;
case 15:
cardTwo = 2;
break;
case 16:
cardTwo = 3;
break;
case 17:
cardTwo = 4;
break;
case 18:
cardTwo = 5;
break;
case 19:
cardTwo = 6;
break;
case 20:
cardTwo = 7;
break;
case 21:
cardTwo = 1;
break;
case 22:
cardTwo = 2;
break;
case 23:
cardTwo = 3;
break;
case 24:
cardTwo = 4;
break;
case 25:
cardTwo = 5;
break;
case 26:
cardTwo = 6;
break;
case 27:
cardTwo = 7;
break;
default:
  break;
}

console.log(cardOne);
console.log(cardTwo);


  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [0,true];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [0,false];
  }
  else {
    return [10,10];
  }
},

getBoardRunsTopOrderConsolidate(cardOne, cardTwo) {
  console.log(cardOne);
  console.log(cardTwo);

  switch(cardOne) {
    case 0:
    cardOne = 1;
    break;
    case 1:
    cardOne = 2;
    break;
    case 2:
    cardOne = 3;
    break;
    case 3:
    cardOne = 4;
    break;
    case 4:
    cardOne = 5;
    break;
    case 5:
    cardOne = 6;
    break;
    case 6:
    cardOne = 7;
    break;
    case 7:
    cardOne = 1;
    break;
  case 8:
  cardOne = 2;
  break;
  case 9:
  cardOne = 3;
  break;
  case 10:
  cardOne = 4;
  break;
  case 11:
  cardOne = 5;
  break;
  case 12:
  cardOne = 6;
  break;
  case 13:
  cardOne = 7;
  break;
  case 14:
  cardOne = 1;
  break;
  case 15:
  cardOne = 2;
  break;
  case 16:
  cardOne = 3;
  break;
  case 17:
  cardOne = 4;
  break;
  case 18:
  cardOne = 5;
  break;
  case 19:
  cardOne = 6;
  break;
  case 20:
  cardOne = 7;
  break;
  case 21:
  cardOne = 1;
  break;
  case 22:
  cardOne = 2;
  break;
  case 23:
  cardOne = 3;
  break;
  case 24:
  cardOne = 4;
  break;
  case 25:
  cardOne = 5;
  break;
  case 26:
  cardOne = 6;
  break;
  case 27:
  cardOne = 7;
  break;
  default:
  console.log('hit?')
    break;
}

switch(cardTwo) {
  case 0:
  cardTwo = 1;
  break;
  case 1:
  cardTwo = 2;
  break;
  case 2:
  cardTwo = 3;
  break;
  case 3:
  cardTwo = 4;
  break;
  case 4:
  cardTwo = 5;
  break;
  case 5:
  cardTwo = 6;
  break;
  case 6:
  cardTwo = 7;
  break;
  case 7:
  cardTwo = 1;
  break;
case 8:
cardTwo = 2;
break;
case 9:
cardTwo = 3;
break;
case 10:
cardTwo = 4;
break;
case 11:
cardTwo = 5;
break;
case 12:
cardTwo = 6;
break;
case 13:
cardTwo = 7;
break;
case 14:
cardTwo = 1;
break;
case 15:
cardTwo = 2;
break;
case 16:
cardTwo = 3;
break;
case 17:
cardTwo = 4;
break;
case 18:
cardTwo = 5;
break;
case 19:
cardTwo = 6;
break;
case 20:
cardTwo = 7;
break;
case 21:
cardTwo = 1;
break;
case 22:
cardTwo = 2;
break;
case 23:
cardTwo = 3;
break;
case 24:
cardTwo = 4;
break;
case 25:
cardTwo = 5;
break;
case 26:
cardTwo = 6;
break;
case 27:
cardTwo = 7;
break;
default:
  break;
}

console.log(cardOne);
console.log(cardTwo);


  if (cardOne === 1 && cardTwo === 1) {
  console.log('0,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 2) {
  console.log('3,false');
    return [3,false];
  }
  else if (cardOne === 1 && cardTwo === 3) {
  console.log('3,false');
    return [0,false];
  }
  else if (cardOne === 1 && cardTwo === 4) {
    console.log('0,true');
    return [0,true];
  }
  else if (cardOne === 1 && cardTwo === 5) {
    console.log('2,false');
    return [2,false];
  }
  else if (cardOne === 1 && cardTwo === 6) {
    console.log('1,false');
    return [1,false];
  }
  else if (cardOne === 1 && cardTwo === 7) {
    console.log('6,false');
    return [6,false];
  }
  else if (cardOne === 2 && cardTwo === 1) {
    return [1,false];
  }
  else if (cardOne === 2 && cardTwo === 2) {
    return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 3) {
    return [2,false];
  }
  else if (cardOne === 2 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 2 && cardTwo === 5) {
      return [0,true];
  }
  else if (cardOne === 2 && cardTwo === 6) {
      return [4,false];
  }
  else if (cardOne === 2 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 3 && cardTwo === 2) {
      return [0,true];
  }
  else if (cardOne === 3 && cardTwo === 3) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 4) {
      return [1,false];
  }
  else if (cardOne === 3 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 3 && cardTwo === 6) {
      return [2,false];
  }
  else if (cardOne === 3 && cardTwo === 7) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 3) {
      return [0,true];
  }
  else if (cardOne === 4 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 4 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 4 && cardTwo === 7) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 1) {
      return [4,false];
  }
  else if (cardOne === 5 && cardTwo === 2) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 3) {
      return [2,false];
  }
  else if (cardOne === 5 && cardTwo === 4) {
      return [6,false];
  }
  else if (cardOne === 5 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 5 && cardTwo === 6) {
      return [1,false];
  }
  else if (cardOne === 5 && cardTwo === 7) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 1) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 2) {
      return [4,false];
  }
  else if (cardOne === 6 && cardTwo === 3) {
      return [1,false];
  }
  else if (cardOne === 6 && cardTwo === 4) {
      return [0,true];
  }
  else if (cardOne === 6 && cardTwo === 5) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 6) {
      return [0,false];
  }
  else if (cardOne === 6 && cardTwo === 7) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 1) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 2) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 3) {
      return [4,false];
  }
  else if (cardOne === 7 && cardTwo === 4) {
      return [0,false];
  }
  else if (cardOne === 7 && cardTwo === 5) {
      return [1,false];
  }
  else if (cardOne === 7 && cardTwo === 6) {
      return [0,true];
  }
  else if (cardOne === 7 && cardTwo === 7) {
      return [0,false];
  }
  else {
    return [10,10];
  }
},

getCardColor(cardOne) {
  let cardColor = '';
  switch(cardOne) {
    case 0:
    return cardColor = 'red';
    break;
    case 1:
    return cardColor = 'red';
    break;
    case 2:
    return cardColor = 'red';
    break;
    case 3:
    return cardColor = 'red';
    break;
    case 4:
    return cardColor = 'red';
    break;
    case 5:
    return cardColor = 'red';
    break;
    case 6:
    return cardColor = 'red';
    break;
    case 7:
    return cardColor = 'red';
    break;
  case 8:
  return cardColor = 'red';
  break;
  case 9:
  return cardColor = 'red';
  break;
  case 10:
  return cardColor = 'red';
  break;
  case 11:
  return cardColor = 'red';
  break;
  case 12:
  return cardColor = 'red';
  break;
  case 13:
  return cardColor = 'red';
  break;
  case 14:
  return cardColor = 'black';
  break;
  case 15:
  return cardColor = 'black';
  break;
  case 16:
  return cardColor = 'black';
  break;
  case 17:
  return cardColor = 'black';
  break;
  case 18:
  return cardColor = 'black';
  break;
  case 19:
  return cardColor = 'black';
  break;
  case 20:
  return cardColor = 'black';
  break;
  case 21:
  return cardColor = 'black';
  break;
  case 22:
  return cardColor = 'black';
  break;
  case 23:
  return cardColor = 'black';
  break;
  case 24:
  return cardColor = 'black';
  break;
  case 25:
  return cardColor = 'black';
  break;
  case 26:
  return cardColor = 'black';
  break;
  case 27:
  return cardColor = 'black';
  break;
  default:
  return cardColor = 'too close to call';
    break;
}
},

getFilteredKey(games, gameId) {

  let sum = a => a.reduce((acc, item) => acc + item);

  console.log(games);
  console.log(gameId);

let currentKey = games.map(acc => {
  console.log(acc);
  console.log(acc.gameId);
  console.log(gameId);
  if (acc.gameId === gameId) {
    console.log(acc.gameId);
    console.log(acc.key);
    return acc.key;
  }
  });
  console.log(currentKey);

  let filtered = currentKey.filter(t=>t != undefined);
  console.log(filtered);
  //console.log(filtered[0]);


  let filterCount = -1
  //let filterIndex = filtered[0].map(acc => {

  const filterLength = filtered.length;
  console.log(filterLength);

  if (filterLength === 1) {
    return filtered;
  }
  else {

    console.log(' is this the bug thats happening?');

  let filterIndex = filtered[0].map(acc => {
    console.log(acc);
    filterCount++;
    console.log(filterCount);
    if (acc === null || acc === undefined) {
      return 0;
    }
    else {
        return filterCount;
      }
    });

    console.log(filterIndex);


    let filterIndexTotal = sum(filterIndex.map(acc => Number(acc)));
    //let filterIndexTotal = sum(filtered.map(acc => Number(acc)));
    console.log(filterIndexTotal);
    //filterIndexTotal--;

  console.log(filtered);
  console.log(filtered[0]);
  console.log(filtered[0][filterIndexTotal]);
  console.log(filtered[filterIndexTotal]);
  return filtered[0][filterIndexTotal];
  //return filtered;
  }
},


getHighestScorers(gameRunEvents, allPlayers) {

  console.log(allPlayers);
  console.log(gameRunEvents);
  let sum = a => a.reduce((acc, item) => acc + item);

  // ****** workout the hihgest scorer & second highest scorer ****** //:
  let ballCountDB = 0;
  let batterId = 1;
  let batterRunsOne = 0;
  let batterRunsTwo = 0;
  let batterRunsThree = 0;
  let batterRunsFour = 0;
  let batterRunsFive = 0;
  let batterRunsSix = 0;
  let batterRunsSeven = 0;
  let batterRunsEight = 0;
  let batterRunsNine = 0;
  let batterRunsTen = 0;
  let batterRunsEleven = 0;
  let batterRunsCount = gameRunEvents.map(acc => {
    console.log(acc.runsValue);
    console.log(acc);
    let runsValue = acc.runsValue;
    let numberRunsValue = Number(runsValue);
    if (acc.batterID === 1) {
      batterRunsOne = batterRunsOne + numberRunsValue;
      return [batterRunsOne, acc.batterID];
    }
    else if ( acc.batterID === 2 ) {
      batterRunsTwo = batterRunsTwo + numberRunsValue;
      return [batterRunsTwo, acc.batterID];
    }
    else if ( acc.batterID === 3 ) {
      batterRunsThree = batterRunsThree + numberRunsValue;
      return [batterRunsThree, acc.batterID];
    }
    else if ( acc.batterID === 4 ) {
      batterRunsFour = batterRunsFour + numberRunsValue;
      return [batterRunsFour, acc.batterID];
    }
    else if ( acc.batterID === 5 ) {
      batterRunsFive = batterRunsFive + numberRunsValue;
      return [batterRunsFive, acc.batterID];
    }
    else if ( acc.batterID === 6 ) {
      batterRunsSix = batterRunsSix + numberRunsValue;
      return [batterRunsSix, acc.batterID];
    }
    else if ( acc.batterID === 7 ) {
      batterRunsSeven = batterRunsSeven + numberRunsValue;
      return [batterRunsSeven, acc.batterID];
    }
    else if ( acc.batterID === 8 ) {
      batterRunsEight = batterRunsEight + numberRunsValue;
      return [batterRunsEight, acc.batterID];
    }
    else if ( acc.batterID === 9 ) {
      batterRunsNine = batterRunsNine + numberRunsValue;
      return [batterRunsNine, acc.batterID];
    }
    else if ( acc.batterID === 10 ) {
      batterRunsTen = batterRunsTen + numberRunsValue;
      return [batterRunsTen, acc.batterID];
    }
    else if ( acc.batterID === 11 ) {
      batterRunsEleven = batterRunsEleven + numberRunsValue;
      return [batterRunsEleven, acc.batterID];
    }
    else {
      return [-2, 0];
    }
  });

  console.log(batterRunsCount);

  let highestScore = -1;
  let recordPlayerId = 100;
  let letbatterRunsCountLength = batterRunsCount.length;
  console.log(letbatterRunsCountLength);
  let countLength = 0;
  let batterRunsCountHighest = batterRunsCount.map(acc => {
    console.log(acc);
    console.log(acc[0]);
    console.log(acc[1]);
    if (acc[0] > highestScore) {
      highestScore = acc[0];
      recordPlayerId = acc[1]
    }
    countLength++
    if (countLength === letbatterRunsCountLength) {
    return [highestScore, recordPlayerId];
    }
    else {
      return [0, 100];
    }

  })

  console.log(batterRunsCountHighest);

  let battersHighestScore = batterRunsCountHighest.filter( batter => batter[1] != 100)

  console.log(battersHighestScore);
  //console.log(battersHighestScore[0][0]);
  console.log(battersHighestScore[0][1]);
  console.log(allPlayers);

  //with the id get the player name.
  console.log(allPlayers);
  let battersNameHighestScore = allPlayers.filter( batter => batter.id === battersHighestScore[0][1])

  console.log(battersNameHighestScore);
  //console.log(battersNameHighestScore[0][2]);
  //console.log(battersNameHighestScore.player);
  console.log(battersNameHighestScore[0].player);

  let highestBatterBallCount = gameRunEvents.map(acc => {
    console.log(acc.batterID);
    console.log(battersHighestScore[0][1]);
    if (acc.batterID === battersHighestScore[0][1]) {
      return 1;
    }
    else {
      return 0;
    }
  })

  console.log(highestBatterBallCount);

  let highestScoreBallCount = sum(highestBatterBallCount.map(acc => Number(acc)));

  console.log(highestScoreBallCount);

  // *** get second highest score *** //

  let batterSecondRunsCount = batterRunsCount.filter( batter => batter[1] != battersHighestScore[0][1])

  console.log(batterSecondRunsCount);

  let secondHighestScore = 0;
  let recordSecondPlayerId = 100;
  let secondBatterRunsCountLength = batterSecondRunsCount.length;
  console.log(secondBatterRunsCountLength);
  let countSecondLength = 0;
  let batterRunsCountSecondHighest = batterSecondRunsCount.map(acc => {
    console.log(acc);
    console.log(acc[0]);
    console.log(acc[1]);
    if (acc[0] > secondHighestScore) {
      secondHighestScore = acc[0];
      recordSecondPlayerId = acc[1]
    }
    countSecondLength++
    if (countSecondLength === secondBatterRunsCountLength) {
    return [secondHighestScore, recordSecondPlayerId];
    }
    else {
      return [0, 100];
    }
  })

  let battersSecondHighestScore = batterRunsCountSecondHighest.filter( batter => batter[1] != 100)
  //let battersNameSecondHighestScore = '';
  //let secondHighestScoreBallCount = 0;
  let battersSecondHighestScoreRuns = 0;

  console.log(battersSecondHighestScore);
  console.log(battersSecondHighestScore.length);
  if (battersSecondHighestScore.length === 0) {
    console.log(battersSecondHighestScore.length + ' = equals 0');
    battersSecondHighestScoreRuns = 0;
  }
  else {
  console.log(battersSecondHighestScore[0][1]);
  battersSecondHighestScoreRuns = battersSecondHighestScore[0][1];
  }

  let battersNameSecondHighestScore = '';

  if (battersSecondHighestScore === undefined) {
  battersNameSecondHighestScore = allPlayers.filter( batter => batter.id === 2)
  }
  else {
  battersNameSecondHighestScore = allPlayers.filter( batter => batter.id === battersSecondHighestScoreRuns)
}

  console.log(battersNameSecondHighestScore[0].player);

  let secondHighestBatterBallCount = gameRunEvents.map(acc => {
    console.log(acc.batterID);
    console.log(battersSecondHighestScoreRuns);
    if (acc.batterID === battersSecondHighestScoreRuns) {
      return 1;
    }
    else {
      return 0;
    }
  })

  console.log(secondHighestBatterBallCount);

  let secondHighestScoreBallCount = sum(secondHighestBatterBallCount.map(acc => Number(acc)));

  console.log(secondHighestScoreBallCount)


  // *** find highest & second highest score ends  **

  console.log('battersHighestScore ' + battersHighestScore);
  console.log('battersNameHighestScore ' + battersNameHighestScore);
  console.log('highestScoreBallCount ' + highestScoreBallCount);
  console.log('battersSecondHighestScore ' + battersSecondHighestScore);
  console.log('battersNameSecondHighestScore ' + battersNameSecondHighestScore);
  console.log('secondHighestScoreBallCount ' + secondHighestScoreBallCount);

  return [battersHighestScore, battersNameHighestScore, highestScoreBallCount, battersSecondHighestScore, battersNameSecondHighestScore, secondHighestScoreBallCount]

},

battingStrikeRate(gameRunEvents, players, facingBall) {

  let sum = a => a.reduce((acc, item) => acc + item);

  let countCurrentBatter = 0;
  let ballCount = 0;

  const playerFacingRunsArray = players.map(player => {
    console.log(player.batterFlag);
    console.log(player.id);
    console.log(player.player);

    if (player.batterFlag === 0 && facingBall === 1 && countCurrentBatter === 0) {
      countCurrentBatter++
      console.log(countCurrentBatter);
      console.log('batter flag === 0 hit');


      let batterRunsCount = gameRunEvents.map(acc => {
        //console.log(acc);
        if (acc.batterID === player.id) {
          console.log(acc.runsValue);
          ballCount++
          return acc.runsValue;
        }
        else {
            console.log(acc.runsValue);
            return 0;
          }
        });
        console.log(batterRunsCount);
        //console.log(batterRunsCount[0]);
        //console.log(batterRunsCount[1]);

        const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));
        //const batterBalls = sum(batterRunsCount[1].map(acc => Number(acc)));

        console.log(batterRuns);
        //console.log(batterBalls);

        //this.setState({ ballCount: ballCount });

      return batterRuns
    }
    else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 0) {
      countCurrentBatter = countCurrentBatter + 2;
      return 0;
    }
    else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 2) {
      //let ballCount = 0;
      let batterRunsCount = gameRunEvents.map(acc => {
        //console.log(acc);
        if (acc.batterID === player.id) {
          console.log(acc.runsValue);
          ballCount++
          return acc.runsValue;
        }
        else {
            console.log(acc.runsValue);
            return 0;
          }
        });
        console.log(batterRunsCount);
        //console.log(batterRunsCount[0]);
        //console.log(batterRunsCount[1]);

        const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));
        //const batterBalls = sum(batterRunsCount[1].map(acc => Number(acc)));

        console.log(batterRuns);
        //console.log(batterBalls);

        //this.setState({ ballCount: ballCount });

      return batterRuns
    }
    else {
      return 0;
    }
  });

  console.log(playerFacingRunsArray);
  //console.log(playerFacingRunsArray[0]);
  //console.log(playerFacingRunsArray[1]);
  //console.log(playerFacingRunsArray[1][0]);

  /*
  let playerFacingRunsArrayFilter = [];
  if (playerFacingRunsArray < 1 || playerFacingRunsArray === [] || playerFacingRunsArray === undefined || playerFacingRunsArray === null || playerFacingRunsArray === '') {
    console.log('filter not hit');
  }
  else {
  playerFacingRunsArrayFilter = playerFacingRunsArray.filter( runs => runs != 0);
  //console.log(playerFacingRunsArrayFilter);
  //console.log(playerFacingRunsArrayFilter[0]);
  //console.log(playerFacingRunsArrayFilter[0][0]);
  }
  */

  //console.log(playerFacingRunsArrayFilter);
  //console.log(playerFacingRunsArrayFilter[0]);
  //console.log(playerFacingRunsArrayFilter[1]);
  //console.log(playerFacingRunsArrayFilter[0][1]);

  let playerFacingRuns = 0;
  let playerFacingBalls = 0;


  if (playerFacingRunsArray < 1 || playerFacingRunsArray === [] || playerFacingRunsArray === undefined || playerFacingRunsArray === null || playerFacingRunsArray === '') {
    console.log('playerFacingRunsArray sum not hit');
  }
  else {
    console.log('playerFacingRunsArray hit!!');
    playerFacingRuns = sum(playerFacingRunsArray.map(acc => Number(acc)));
    //playerFacingBalls = sum(playerFacingRunsArrayFilter[0][1].map(acc => Number(acc)));
  }

  console.log(playerFacingRuns);
  console.log(ballCount);

  const battingStrikeRateRaw = (playerFacingRuns / ballCount) * 100;
  console.log(battingStrikeRateRaw);

  const battingStrikeRate = battingStrikeRateRaw.toFixed(0);
  console.log(battingStrikeRate);

  let aceAce = 0;
  if (battingStrikeRate <= 30 ) {
    aceAce = "W";
    twoTwo = '0'
  }
  else if (battingStrikeRate <= 60 ) {
    aceAce = "0";
    twoTwo = '0'
  }
  else if (battingStrikeRate <= 99 ) {
    aceAce = "1";
    twoTwo = '1'
  }
  else if (battingStrikeRate <= 120 ) {
    aceAce = "1";
    twoTwo = '2'
  }
  else if (battingStrikeRate <= 140 ) {
    aceAce = "2";
    twoTwo = '4'
  }
  else if (battingStrikeRate > 140 ) {
    aceAce = "4";
    twoTwo = '6'
  }
  else {
    aceAce = "W";
    twoTwo = "0"
  }

  return [aceAce, twoTwo, battingStrikeRate]

},

getPressureScore(runRate, wickets) {

  console.log(runRate);
  console.log(wickets);

  if (runRate <= 1 && wickets === 0) {
    return [1];
  }
  else if (runRate <= 1 && wickets === 1) {
    return [2];
  }
  else if (runRate <= 1 && wickets === 2) {
    return [3];
  }
  else if (runRate <= 1 && wickets === 3) {
    return [5];
  }
  else if (runRate <= 1 && wickets === 4) {
    return [7];
  }
  else if (runRate <= 1 && wickets === 5) {
    return [9];
  }
  else if (runRate <= 1 && wickets === 6) {
    return [12];
  }
  else if (runRate <= 1 && wickets === 7) {
    return [15];
  }
  else if (runRate <= 1 && wickets === 8) {
    return [30];
  }
  else if (runRate <= 1 && wickets === 9) {
    return [80];
  }
  else if (runRate <= 2 && wickets === 0) {
      return [2];
  }
  else if (runRate <= 2 && wickets === 1) {
      return [4];
  }
  else if (runRate <= 2 && wickets === 2) {
      return [6];
  }
  else if (runRate <= 2 && wickets === 3) {
      return [8];
  }
  else if (runRate <= 2 && wickets === 4) {
      return [10];
  }
  else if (runRate <= 2 && wickets === 5) {
      return [13];
  }
  else if (runRate <= 2 && wickets === 6) {
      return [15];
  }
  else if (runRate <= 2 && wickets === 7) {
      return [20];
  }
  else if (runRate <= 2 && wickets === 8) {
      return [50];
  }
  else if (runRate <= 2 && wickets === 9) {
      return [85];
  }
  else if (runRate <= 3 && wickets === 0) {
      return [3];
  }
  else if (runRate <= 3 && wickets === 1) {
      return [5];
  }
  else if (runRate <= 3 && wickets === 2) {
      return [8];
  }
  else if (runRate <= 3 && wickets === 3) {
      return [10];
  }
  else if (runRate <= 3 && wickets === 4) {
      return [13];
  }
  else if (runRate <= 3 && wickets === 5) {
      return [16];
  }
  else if (runRate <= 3 && wickets === 6) {
      return [22];
  }
  else if (runRate <= 3 && wickets === 7) {
      return [30];
  }
  else if (runRate <= 3 && wickets === 8) {
      return [65];
  }
  else if (runRate <= 3 && wickets === 9) {
      return [90];
  }
  else if (runRate <= 4 && wickets === 0) {
      return [10];
  }
  else if (runRate <= 4 && wickets === 1) {
      return [15];
  }
  else if (runRate <= 4 && wickets === 2) {
      return [18];
  }
  else if (runRate <= 4 && wickets === 3) {
      return [21];
  }
  else if (runRate <= 4 && wickets === 4) {
      return [25];
  }
  else if (runRate <= 4 && wickets === 5) {
      return [31];
  }
  else if (runRate <= 4 && wickets === 6) {
      return [38];
  }
  else if (runRate <= 4 && wickets === 7) {
      return [50];
  }
  else if (runRate <= 4 && wickets === 8) {
      return [75];
  }
  else if (runRate <= 4 && wickets === 9) {
      return [92];
  }
  else if (runRate <= 5 && wickets === 0) {
      return [20];
  }
  else if (runRate <= 5 && wickets === 1) {
      return [22];
  }
  else if (runRate <= 5 && wickets === 2) {
      return [25];
  }
  else if (runRate <= 5 && wickets === 3) {
      return [30];
  }
  else if (runRate <= 5 && wickets === 4) {
      return [36];
  }
  else if (runRate <= 5 && wickets === 5) {
      return [46];
  }
  else if (runRate <= 5 && wickets === 6) {
      return [61];
  }
  else if (runRate <= 5 && wickets === 7) {
      return [73];
  }
  else if (runRate <= 5 && wickets === 8) {
      return [83];
  }
  else if (runRate <= 5 && wickets === 9) {
      return [94];
  }
  else if (runRate <= 6 && wickets === 0) {
      return [30];
  }
  else if (runRate <= 6 && wickets === 1) {
      return [33];
  }
  else if (runRate <= 6 && wickets === 2) {
      return [37];
  }
  else if (runRate <= 6 && wickets === 3) {
      return [45];
  }
  else if (runRate <= 6 && wickets === 4) {
      return [53];
  }
  else if (runRate <= 6 && wickets === 5) {
      return [60];
  }
  else if (runRate <= 6 && wickets === 6) {
      return [72];
  }
  else if (runRate <= 6 && wickets === 7) {
      return [85];
  }
  else if (runRate <= 6 && wickets === 8) {
      return [92];
  }
  else if (runRate <= 6 && wickets === 9) {
      return [95];
  }
  else if (runRate <= 7 && wickets === 0) {
      return [35];
  }
  else if (runRate <= 7 && wickets === 1) {
      return [40];
  }
  else if (runRate <= 7 && wickets === 2) {
      return [45];
  }
  else if (runRate <= 7 && wickets === 3) {
      return [50];
  }
  else if (runRate <= 7 && wickets === 4) {
      return [60];
  }
  else if (runRate <= 7 && wickets === 5) {
      return [70];
  }
  else if (runRate <= 7 && wickets === 6) {
      return [80];
  }
  else if (runRate <= 7 && wickets === 7) {
      return [85];
  }
  else if (runRate <= 7 && wickets === 8) {
      return [94];
  }
  else if (runRate <= 7 && wickets === 9) {
      return [96];
  }
  else if (runRate <= 8 && wickets === 0) {
      return [40];
  }
  else if (runRate <= 8 && wickets === 1) {
      return [45];
  }
  else if (runRate <= 8 && wickets === 2) {
      return [50];
  }
  else if (runRate <= 8 && wickets === 3) {
      return [55];
  }
  else if (runRate <= 8 && wickets === 4) {
      return [63];
  }
  else if (runRate <= 8 && wickets === 5) {
      return [72];
  }
  else if (runRate <= 8 && wickets === 6) {
      return [82];
  }
  else if (runRate <= 8 && wickets === 7) {
      return [88];
  }
  else if (runRate <= 8 && wickets === 8) {
      return [95];
  }
  else if (runRate <= 8 && wickets === 9) {
      return [97];
  }
  else if (runRate <= 9 && wickets === 0) {
      return [50];
  }
  else if (runRate <= 9 && wickets === 1) {
      return [55];
  }
  else if (runRate <= 9 && wickets === 2) {
      return [60];
  }
  else if (runRate <= 9 && wickets === 3) {
      return [65];
  }
  else if (runRate <= 9 && wickets === 4) {
      return [70];
  }
  else if (runRate <= 9 && wickets === 5) {
      return [74];
  }
  else if (runRate <= 9 && wickets === 6) {
      return [84];
  }
  else if (runRate <= 9 && wickets === 7) {
      return [90];
  }
  else if (runRate <= 9 && wickets === 8) {
      return [96];
  }
  else if (runRate <= 9 && wickets === 9) {
      return [98];
  }
  else if (runRate <= 10 && wickets === 0) {
      return [55];
  }
  else if (runRate <= 10 && wickets === 1) {
      console.log('hit? ' + runRate);
      return [60];
  }
  else if (runRate <= 10 && wickets === 2) {
      return [65];
  }
  else if (runRate <= 10 && wickets === 3) {
      return [70];
  }
  else if (runRate <= 10 && wickets === 4) {
      return [75];
  }
  else if (runRate <= 10 && wickets === 5) {
      return [77];
  }
  else if (runRate <= 10 && wickets === 6) {
      return [86];
  }
  else if (runRate <= 10 && wickets === 7) {
      return [92];
  }
  else if (runRate <= 10 && wickets === 8) {
      return [97];
  }
  else if (runRate <= 10 && wickets === 9) {
      return [99];
  }
  else if (runRate <= 11 && wickets === 0) {
      return [60];
  }
  else if (runRate <= 11 && wickets === 1) {
      return [65];
  }
  else if (runRate <= 11 && wickets === 2) {
      return [70];
  }
  else if (runRate <= 11 && wickets === 3) {
      return [75];
  }
  else if (runRate <= 11 && wickets === 4) {
      return [80];
  }
  else if (runRate <= 11 && wickets === 5) {
      return [82];
  }
  else if (runRate <= 11 && wickets === 6) {
      return [89];
  }
  else if (runRate <= 11 && wickets === 7) {
      return [94];
  }
  else if (runRate <= 11 && wickets === 8) {
      return [98];
  }
  else if (runRate <= 11 && wickets === 9) {
      return [100];
  }
  else if (runRate > 11 && wickets === 0) {
      return [65];
  }
  else if (runRate > 11 && wickets === 1) {
      return [70];
  }
  else if (runRate > 11 && wickets === 2) {
      return [75];
  }
  else if (runRate > 11 && wickets === 3) {
      return [80];
  }
  else if (runRate > 11 && wickets === 4) {
      return [82];
  }
  else if (runRate > 11 && wickets === 5) {
      return [84];
  }
  else if (runRate > 11 && wickets === 6) {
      return [90];
  }
  else if (runRate > 11 && wickets === 7) {
      return [95];
  }
  else if (runRate > 11 && wickets === 8) {
      return [98];
  }
  else if (runRate > 11 && wickets === 9) {
      return [100];
  }
  else {
    return [0];
  }
},

getPressureScorePercentage(pressureScore) {

  if (pressureScore > 90) {
    return ['W', '6', 'W']
  }
  else if (pressureScore > 80) {
    return ['W', '1', '1']
  }
  else if (pressureScore > 60) {
    return ['0', '4', 'W']
  }
  else if (pressureScore > 45) {
    return ['2', '0', '1']
  }
  else if (pressureScore > 30) {
    return ['4', '4', '0']
  }
  else if (pressureScore > 15) {
    return ['4', '0', '6']
  }
  else if (pressureScore > 0) {
    return ['1', '0', '4']
  }
  else {
    return ['0', '0', '0']
  }
},

getFormScore(allPlayers, facingBall, gameRunEvents) {

console.log(gameRunEvents);
//allPlayers = this.props.players.players;
let sum = a => a.reduce((acc, item) => acc + item);

let formScore = 0
let formScoreOne = 0
let formScoreTwo = 0
let batterRuns = 0;
let countCurrentBatter = 0;

allPlayers.map(player => {
  console.log(player);
  console.log(player.scoreOne);
  console.log(player.scoreTwo);
  console.log(player.scoreThree);
  console.log(player.batterFlag);
  console.log(facingBall);
  console.log(countCurrentBatter);



  if (player.batterFlag === 0) {
    let batterRunsCount = gameRunEvents.map(acc => {
      console.log(player.id);
      console.log(acc.batterID);
      console.log(acc);
      if (acc.batterID === player.id) {
        console.log(acc.runsValue);
        return [acc.runsValue];
      }
      else {
          console.log(acc.runsValue);
          return 0;
        }
      });

      console.log(batterRunsCount);

      batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

      console.log(batterRuns);
    }

  if (player.batterFlag === 0 && facingBall === 1 && countCurrentBatter === 0) {
    countCurrentBatter++
    const scoreOne = allPlayers[player.id].scoreOne;
    const scoreTwo = allPlayers[player.id].scoreTwo;
    const scoreThree = allPlayers[player.id].scoreThree;
    const outs = allPlayers[player.id].outs;
    console.log(allPlayers);
    console.log(batterRuns);

    const formScoreTotal = scoreOne + scoreTwo + scoreThree + batterRuns;
    console.log(formScoreTotal);
    console.log(outs);
    if (outs === 0) {
      formScore = formScoreTotal;
      console.log(formScore);
    }
    else {
    formScore = formScoreTotal / outs;
    console.log(formScore);
    }
    formScoreOne = formScore.toFixed(0);
    console.log(formScoreOne);

  }
  else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 0) {
    countCurrentBatter = countCurrentBatter + 2;
  }
  else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 2) {

    const scoreOne = allPlayers[player.id].scoreOne;
    const scoreTwo = allPlayers[player.id].scoreTwo;
    const scoreThree = allPlayers[player.id].scoreThree;
    const outs = allPlayers[player.id].outs;
    console.log(allPlayers);
    console.log(batterRuns);

    const formScoreTotal = scoreOne + scoreTwo + scoreThree + batterRuns;
    console.log(formScoreTotal);
    console.log(outs);
    if (outs === 0) {
      formScore = formScoreTotal;
      console.log(formScore);
    }
    else {
    formScore = formScoreTotal / outs;
    console.log(formScore);
    }
    formScoreTwo = formScore.toFixed(0);
    console.log(formScoreTwo);
}
})

console.log(formScore);
console.log(formScoreOne);
console.log(formScoreTwo);

  return [formScoreOne, formScoreTwo, formScore];
},

getFormScoreRuns(formScore, players, facingBall) {

  let playerOne = 0;
  let playerTwo = 0;
  let batterId = 0;
  let countCurrentBatter = 0;
  let aggBoardOne = 0;
  let aggBoardTwo = 0;

  players.map(player => {
    console.log(player);
    console.log(facingBall);


    if (player.batterFlag === 0 && facingBall === 1 && countCurrentBatter === 0) {
      countCurrentBatter++
      playerOne = player.id;
      aggBoardOne = player.aggBoard;

    }
    else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 0) {
      countCurrentBatter = countCurrentBatter + 2;
    }
    else if (player.batterFlag === 0 && facingBall === 2 && countCurrentBatter === 2) {

      playerTwo = player.id;
      aggBoardTwo = player.aggBoard;
  }
  })

  if (facingBall === 1) {
    batterId = playerOne;
    aggBoard = aggBoardOne;
  }
  else {
    batterId = playerTwo;
    aggBoard = aggBoardTwo;
  }

  console.log(aggBoard);

  if ((formScore <= 10 && batterId <= 5) || (formScore <= 7 && batterId <= 8) || (formScore <= 5 && batterId > 8)) {
    return ['W', '0', batterId, aggBoard]
  }
  else if (formScore <= 20) {
    return ['1', '1', batterId, aggBoard]
  }
  else if (formScore <= 30) {
    return ['1', '2', batterId, aggBoard]
  }
  else if (formScore <= 40) {
    return ['2', '4', batterId, aggBoard]
  }
  else if (formScore > 40) {
    return ['4', '6', batterId, aggBoard]
  }
  else {
    return ['0', '0', batterId, aggBoard]
  }
},

getMomentum(gameRunEvents, momentum) {

  let sum = a => a.reduce((acc, item) => acc + item);

  const arrayLength = gameRunEvents.length - 1
  const thisBallStringRuns = gameRunEvents[arrayLength].runsValue;
  const thisBallWicket = gameRunEvents[arrayLength].wicketEvent;
  console.log(thisBallStringRuns);
  const thisBall = Number(thisBallStringRuns);
  console.log(thisBall);

  let momentumThisBall = 0;

  if (thisBall === 4 || thisBall === 6) {
    const lastSixBalls = gameRunEvents.slice(Math.max(gameRunEvents.length - 6, 0))
    console.log(lastSixBalls);

    const boundaryCount = lastSixBalls.map(acc => {
      console.log(acc.runsValue);
      console.log(acc);
      let runsValue = acc.runsValue;
      let numberRunsValue = Number(runsValue);
      if (numberRunsValue === 4 || numberRunsValue === 6) {
        return [1];
      }
      else {
        return [0];
      }
    });

    const boundaryCountTotal = sum(boundaryCount.map(acc => Number(acc)));
    console.log(boundaryCountTotal);

    if (boundaryCountTotal === 1) {
      momentumThisBall = 2;
    }
    else {
      momentumThisBall = 2;
    }

  }
  else if (thisBallWicket === true) {

    const lastTweleveBalls = gameRunEvents.slice(Math.max(gameRunEvents.length - 6, 0))
    console.log(lastTweleveBalls);


    const wicketCount = lastTweleveBalls.map(acc => {
      console.log(acc.wicketEvent);
      console.log(acc);
      if (acc.wicketEvent === true) {
        return [1];
      }
      else {
        return [0];
      }
    });

    let wicketCountTotal = sum(wicketCount.map(acc => Number(acc)));
    console.log(wicketCount);

    if (wicketCountTotal === 1) {
      momentumThisBall = 6;
    }
    else {
      momentumThisBall = 10;
    }

  }
  else {
    momentumThisBall = 0;
  }

  return [momentumThisBall]

},

getMomentumEndOfOver(requiredRunRate, gameRunEvents, momentum) {

  let sum = a => a.reduce((acc, item) => acc + item);

  //const arrayLength = gameRunEvents.length
  const lastSixBalls = gameRunEvents.slice(Math.max(gameRunEvents.length - 6, 0))

  const runsCount = lastSixBalls.map(acc => {
    console.log(acc.runsValue);
    console.log(acc);
    let runsValue = acc.runsValue;
    let numberRunsValue = Number(runsValue);
    return [numberRunsValue]
  });

  console.log(runsCount);

  const runsCountTotal = sum(runsCount.map(acc => Number(acc)));
  console.log(runsCountTotal);

  if (runsCountTotal >= requiredRunRate) {
    momentum = 5;
    momentumRRR = true;
  }
  else {
    momentum = 5;
    momentumRRR = false;
  }

  console.log(momentum);
  return [momentum, momentumRRR]

},

getMomentumScore(momentumScore) {

  console.log(momentumScore + 'M-score');

  if (momentumScore <= -26) {
    console.log('w,6,w');
    return ['W', '6', 'W']
  }
  else if (momentumScore <= -16) {
    console.log('w,1,1');
    return ['W', '1', '1']
  }
  else if (momentumScore <= -6) {
    console.log('0,4,w');
    return ['0', '4', 'W']
  }
  else if (momentumScore <= 5) {
    console.log('0,4,w');
    return ['2', '0', '1']
  }
  else if (momentumScore <= 15) {
    return ['4', '3', '0']
  }
  else if (momentumScore <= 25) {
    return ['4', '0', '6']
  }
  else if (momentumScore >= 26) {
    return ['6', '4', '4']
  }
  else {
    return ['0', '0', '0']
  }
},

}

export default CardBoard;
