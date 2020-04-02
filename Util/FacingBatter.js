const FacingBatter = {
  getFacingBatter(batters, facingBall, totalWickets) {

    let findCurrentBatters = batters.map(acc => {
      console.log(acc);
      if (acc.batterFlag === 0) {
        console.log(acc.batterFlag);
        return {id: [acc.id]};
      }
        else {
          console.log(acc.batterFlag);
          return {id: [100]};
        }
      });
    console.log(findCurrentBatters);

    let idBatter = 0;
    let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
    console.log(currentBatters);


    if (totalWickets >= 10) {
      if (currentBatters[0] != null || currentBatters[0] != 'undefined') {
        console.log('totalWickets >= 10 0');
        facingBatter = currentBatters[0].id
      }
      else if (currentBatters[1] != null || currentBatters[1] != 'undefined') {
      console.log('totalWickets >= 10 1');
      facingBatter = currentBatters[1].id
      }
      else {
        console.log('totalWickets >= 10 12');
        facingBatter = 12;
      }
    }
    else {
      console.log('total wickets less than 10.');
      let idBatterOne = currentBatters[0].id;
      console.log(idBatterOne);
      let idBatterTwo = currentBatters[1].id
      console.log(idBatterTwo);


    let idBatterOneNumber = Number(idBatterOne);
    console.log(idBatterOneNumber);
    let idBatterTwoNumber = Number(idBatterTwo);
    console.log(idBatterTwoNumber);

    //worout who is facing.
    console.log(facingBall);
    if (facingBall === 1) {
      facingBatter = idBatterOneNumber;
    }
    else {
      facingBatter = idBatterTwoNumber;
    }
  }

    return [facingBatter, currentBatters]

  },
}

export default FacingBatter;
