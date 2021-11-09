
//////////////////////////////////////ランダム風初期配置設定
function PositionInitial(){

  const randomImitation =[
    [12,5,7,10,6,8,3,9,2,4,15,1,14,11,13],
    [6,3,13,1,9,4,10,2,7,12,5,15,8,11,14],
    [15,10,6,13,5,4,3,9,2,7,11,8,14,1,12],
    [14,13,3,11,10,6,8,1,5,15,7,4,9,2,12],
    [10,7,6,12,15,11,8,14,2,5,13,4,9,3,1],
    [7,14,15,9,13,6,5,4,3,10,8,12,2,1,11],
    [3,13,8,9,14,12,1,7,4,5,11,15,10,2,6]
    // 完成テスト用簡単配置
    // [1,2,3,4,5,6,7,8,9,10,12,15,13,14,11]
  ];
  
  const randomPosition = Math.floor(Math.random() * 7);

    for(i=0;i<15;i++){
      position[i] = (randomImitation[randomPosition][i]);
    }
}


//////////////////////////////////////ｘ値、ｙ値のセット
function xySet(n){
  switch(position[n]){
    case 1 : x[n] = 1;  y[n] = 1;  break;
    case 2 : x[n] = 2;  y[n] = 1;  break;
    case 3 : x[n] = 3;  y[n] = 1;  break;
    case 4 : x[n] = 4;  y[n] = 1;  break;
    case 5 : x[n] = 1;  y[n] = 2;  break;
    case 6 : x[n] = 2;  y[n] = 2;  break;
    case 7 : x[n] = 3;  y[n] = 2;  break;
    case 8 : x[n] = 4;  y[n] = 2;  break;
    case 9 : x[n] = 1;  y[n] = 3;  break;
    case 10: x[n] = 2;  y[n] = 3;  break;
    case 11: x[n] = 3;  y[n] = 3;  break;
    case 12: x[n] = 4;  y[n] = 3;  break;
    case 13: x[n] = 1;  y[n] = 4;  break;
    case 14: x[n] = 2;  y[n] = 4;  break;
    case 15: x[n] = 3;  y[n] = 4;  break;
    case 16: x[n] = 4;  y[n] = 4;  break;
    default:                       break;
  }
}

function xyInitial(){
  for(i=0;i<15;i++){
    xySet(i);
  }
}


//////////////////////////////////////初期配置実行
function InitialMove(){
  
  for(i=0;i<15;i++){
    let target    = element[i];
    let target_id = "#"+$(target).attr('id');
    let target_answer = $(target).attr('data-answer');

    const position_difference = position[i] - target_answer;
    let position_x = (position_difference % 4);
    let position_y = (parseInt(position_difference / 4));

    for(j=1;j<15;j++){
      if(position_difference === j){
        switch(j){
          case 13 : break;
          case 14 : break;
          default : 
            switch(j % 4){
              case 0 : break;
              case 1 : if(Number(target_answer) % 4 === 0){
                          position_x -= 4;
                          position_y ++;
                        }
                        break;
              case 2 : if(Number(target_answer) % 4 === 0 || Number(target_answer) % 4 === 3){
                          position_x -= 4;
                          position_y ++;
                        }
                        break;
              case 3 : if(Number(target_answer) % 4 === 0 || Number(target_answer) % 4 === 2 || Number(target_answer) % 4 === 3){
                          position_x -= 4;
                          position_y ++;
                        }
                        break;
              default : break;
            }
      }
    }
  }
    for(j=-1;j>-15;j--){
      if(position_difference === j){
        switch(j){
          case -13 : break;
          case -14 : break;
          default : 
          switch(j % 4){
            case -0 : break;
            case -1 : if(Number(target_answer) % 4 === 1){
              position_x += 4;
              position_y --;
            }
            break;
            case -2 : if(Number(target_answer) % 4 === 1 || Number(target_answer) % 4 === 2){
              position_x += 4;
              position_y --;
            }
            break;
            case -3 : if(Number(target_answer) % 4 === 1 || Number(target_answer) % 4 === 2 || Number(target_answer) % 4 === 3){
              position_x += 4;
              position_y --;
            }
            break;
            default : break;
          }
        }
        
      }
    }
    position_y *= 90;
    position_x *= 90;

    xMove[i] = position_x;
    yMove[i] = position_y;
    
    $(target_id).css('transform',`translate(${xMove[i]}px,${yMove[i]}px)`);

  }
}


//////////////////////////////////////動ける方向の判定
function MovingConfig(){
  for(i=0;i<16;i++){
    
    if(x[i] === 1){
      goRight[i] = true;
      goLeft[i]  = false;
    } else if(x[i] === 2 || x[i] === 3){
      goRight[i] = true;
      goLeft[i]  = true;
    } else if(x[i] === 4){
      goRight[i] = false;
      goLeft[i]  = true;
    }
    if(y[i] === 1){
      goTop[i] = false;
      goBottom[i]  = true;
    } else if(y[i] === 2 || y[i] === 3){
      goTop[i] = true;
      goBottom[i]  = true;
    } else if(y[i] === 4){
      goTop[i] = true;
      goBottom[i]  = false;
    }
  }
}
    

//////////////////////////////////////移動先の設定
function MovingJudge(p){

  if(goRight[p] && empty === position[p] + 1){
    xMove[p] += 90;
    judge = true;
  }
  if(goLeft[p] && empty === position[p] - 1){
    xMove[p] -= 90;
    judge = true;

  }
  if(goTop[p] && empty === position[p] - 4){
    yMove[p] -= 90;
    judge = true;
  }
  if(goBottom[p] && empty === position[p] + 4){
    yMove[p] += 90;
    judge = true;
  }
}


//////////////////////////////////////クリック時の移動処理
function MovingConfig2(){
  
  for(i=0;i<15;i++){
    let target = element[i];
    let target_id = "#"+$(target).attr('id');
    let now = Number($(target).attr('data-answer')) - 1;
       
    $(target_id).on('click',()=>{

      MovingJudge(now);
      if(judge){

        $(target_id).css('transform',`translate(${xMove[now]}px,${yMove[now]}px)`);
        [position[now],empty] = [empty,position[now]];
        judge = false;

        completeCheck();
        //////////////////////////////クリア処理
        if(complete === true){
          clearInterval(setTime); setTime = null;

          $(".stop-btn ").addClass("d-none");
          $(".start-btn").removeClass("d-none");
          $(".complete-btn").addClass("d-none");
          $(".change-btn").removeClass("d-none");

          $("#target-wrap").children().removeClass("border");
          $("#clear").removeClass("d-none");
          $("#target-16").css({"transform":"translate(0) ","opacity":"1"});
          empty = 99;
        }else{
          xySet(now);
          MovingConfig();
        }


      }
    });
  }
}


//////////////////////////////////////完成チェック
function completeCheck(){
  for (i = 0; i < 15; i++) {
     if(i + 1 === position[i]){
       check[i] = true;
     }else{
       check[i] = false;
     }
   }
  complete = check.every((val)=>{
    return val === true;
  });
}
