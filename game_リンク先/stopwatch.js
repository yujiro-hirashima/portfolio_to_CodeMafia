let countTime = 0;
let setTime = null;

// $(()=> {
     // スタートボタン
     $(".start-btn").on('click',()=> {
          empty = 16;
          $("#target-wrap").children().addClass("border");
          $("#target-16").css({"transform":"translate(80px) ","opacity":"0"});
          PositionInitial();
          xyInitial();
          InitialMove();
          MovingConfig();

          countTime = 0;
          if(setTime == null) { setTime = setInterval("timerView()",100); }
          $(".start-btn").addClass("d-none");
          $(".stop-btn ").removeClass("d-none");
          $(".change-btn").addClass("d-none");
          $(".complete-btn").removeClass("d-none");
          $("#imgComplete").addClass("d-none");
          $("#clear").addClass("d-none");
     });
     // ストップボタン
     $(".stop-btn").on('click',()=> {
          let res = confirm("諦めますか？");
          if(res === true){
               clearInterval(setTime); setTime = null;
               $(".stop-btn ").addClass("d-none");
               $(".start-btn").removeClass("d-none");
               $(".complete-btn").addClass("d-none");
               $(".change-btn").removeClass("d-none");
     
               $("#target-wrap").children().removeClass("border");
               $("#timer").text("00'00''0");
               $("#target-16").css({"transform":"translate(0) ","opacity":"1"});

               empty = 99;

               for(i=0;i<15;i++){
                    position[i] = i+1;
               }

               xyInitial();
               InitialMove();
               MovingConfig();     
          }
          
     });
     // 完成図ボタン
     let reset = 0;
     $(".complete-btn").on('click',()=> {
          if(reset === 0){
               $(".complete-btn").children("button").html("戻る");
               $("#imgComplete").removeClass("d-none");
               reset = 1;
          }else{
               $(".complete-btn").children("button").html("完成図");
               $("#imgComplete").addClass("d-none");
               reset = 0;
          }
     });

     //画像変更ボタン
     let setImg = 1;
     $(".change-btn").on('click',()=>{
          if(setTime === null){
               $("#imgComplete").children("img").attr("src",imgComp[setImg]);
               for (let i = 0; i < 16; i++) {
                    $(element[i]).children('img').attr('src',images[setImg][i]);
               }
               if(setImg+1 === images.length){
                    setImg  = 0;
               }else{setImg ++}
          }else{
               alert("ゲーム中は画像変更できません。");
          }
     });
// });

function timerView() {
     countTime += 1;
     let decimal = countTime % 10;
     let seconds = Math.floor(countTime / 10) % 60;
     let minutes = Math.floor(countTime / 600) % 60;

     // 時間の表示を更新している部分
     $("#timer").text(('00' + minutes).slice(-2) + "'" + ('00' + seconds).slice(-2) + "''" + decimal);
}