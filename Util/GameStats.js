const GameStats = {
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
    else if (battingStrikeRate <= 100 ) {
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
      aceAce = "0";
      twoTwo = '0'
    }

    return [aceAce, twoTwo, battingStrikeRate]

  },
}

export default GameStats;
