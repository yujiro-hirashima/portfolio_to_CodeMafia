<?php
  session_start();

  $mode         = 'input';
  $err_name    = "";
  $err_company = "";
  $err_email   = "";
  $err_tell    = "";
  $err_message = "";



  if(isset($_POST['back']) && $_POST['back']){
    //入力画面
  }

  //確認画面
  else if(isset($_POST['confirm']) && $_POST['confirm']){
    //名前が未入力の時
    if(!$_POST['name']){
      $err_name = "※お名前を入力してください"; }
    //名前が100文字を超えた時
    else if(mb_strlen($_POST['name']) > 100){
      $err_name = "※名前は100文字以内にしてください";
    }

    //会社名が100文字を超えた時
    if(mb_strlen($_POST['company']) > 100){
      $err_company = "※会社名は100文字以内にしてください";
    }
    
    //emailが未入力の時
    if(!$_POST['email']){
      $err_email = "※emailを入力してください";}
    //emailが100文字を超えた時
    else if(mb_strlen($_POST['email']) > 200){
      $err_email = "※名前は200文字以内にしてください";}
    //email形式でなかったら
    else if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
      $err_email = "※メールアドレスをお間違えではありませんか？";
    }

    //電話番号が未入力の時
    if(!$_POST['tell']){}
    //tellが20文字を超えた時
    else if(mb_strlen($_POST['tell']) > 20){
      $err_tell = "※電話番号をお間違えではないでしょうか";}
    //電話番号形式でなかったら
    else if(!preg_match("/^[0-9]{6,11}$|^[0-9-]{13}$/",$_POST['tell'])){
      $err_tell = "※電話番号をお間違えではありませんか？";
    }

    //お問い合わせが未入力の時
    if(!$_POST['message']){
      $err_message = "※お問い合わせ内容を入力してください";}
    //お問い合わせが500文字を超えた時
    else if(mb_strlen($_POST['message']) > 500){
      $err_message = "※名前は500文字以内にしてください";
    }


    ///////////////////////サニタイズ  XSS対策/////////////////////////////
    $_SESSION['name']       = htmlspecialchars($_POST['name'],    ENT_QUOTES);
    $_SESSION['company']    = htmlspecialchars($_POST['company'], ENT_QUOTES);
    $_SESSION['email']      = htmlspecialchars($_POST['email'],   ENT_QUOTES);
    $_SESSION['tell']       = htmlspecialchars($_POST['tell'],    ENT_QUOTES);
    $_SESSION['message']    = htmlspecialchars($_POST['message'], ENT_QUOTES);
    ///////////////////////////////////////////////////////////////////////

    if(!$err_name && !$err_company && !$err_email && !$err_tell && !$err_message){
      $token = bin2hex(random_bytes(32));
      $_SESSION['token']  = $token;
      $mode = 'confirm';
    } 
  }
  
  //送信完了画面
  else if(isset($_POST['send']) && $_POST['send']){

    

    //CSRF対策/////////////////////////////////////////////////////////
    if(!$_POST['token'] || !$_SESSION['token'] || !$_SESSION['email']||
        $_POST['token'] != $_SESSION['token']){
      $err_message = "※不正な処理が行われました";
      $mode = 'input';
      $_SESSION['name']    = "";
      $_SESSION['company'] = "";
      $_SESSION['email']   = "";
      $_SESSION['tell']    = "";
      $_SESSION['message'] = "";
    }
    ///////////////////////////////////////////////////////////////////

    else{
      $message = "お問い合わせを受け付けました。\r\n"
      . "名前："  . $_SESSION['name']    . "\r\n"
      . "会社名：". $_SESSION['company'] . "\r\n"
      . "email：" . $_SESSION['email']   . "\r\n"
      . "tell："  . $_SESSION['tell']    . "\r\n"
      . "お問い合わせ内容\r\n"
      . preg_replace("/\r\n|\r|\n/","\r\n",$_SESSION['message']);
      mb_language("ja");
      mb_internal_encoding("UTF-8");
      mb_send_mail($_SESSION['email'],"お問い合わせありがとうございます",$message);
      mb_send_mail('unmejjapip@gmail.com',"問い合わせが来ましたよ",$message);
      
      $_SESSION['company']    = "";
      $_SESSION['email']   = "";
      $_SESSION['tell']    = "";
      $_SESSION['message'] = "";
      
      $mode = 'send'; 
    }
  }

  //初期設定
  else{
    $_SESSION['name'] = "";
    $_SESSION['company'] = "";
    $_SESSION['email'] = "";
    $_SESSION['tell'] = "";
    $_SESSION['message'] = "";
  }


?>



<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>お問合せフォーム</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <?php 
    switch($mode){
      case 'input': ?>
        <h1>お問い合わせ</h1> <?php ;
        break;
      case 'confirm': ?>
        <h1>お問い合わせ内容をご確認ください</h1> <?php ;
        break;
      case 'send': ?>
        <h1>送信完了</h1> <?php ;
        break;
      default: break;
    }
  ?>
  <div class="container">
    <div class="wrap">
      <?php if($mode == 'input'){?>

        <!-- 入力画面 -->
        <div class="form">
          <form action="./contact.php" method="post">
            <h3 class="input-name">お名前<span class="mandatory">必須</span>
              <?php  
                if($err_name){
                  echo '<span class="err">'.$err_name.'</span>';
                }
              ?>
            </h3>
            <input class="focus" type="text"   name="name"  value="<?php echo $_SESSION['name'] ?>"/>

            <h3>会社名
              <?php  
                if($err_company){
                  echo '<span class="err">'.$err_company.'</span>';
                }
              ?>
            </h3>
            <input class="focus" type="text"   name="company"  value="<?php echo $_SESSION['company'] ?>"/>

            <h3>Eメール<span class="mandatory">必須</span>
                <?php  
                  if($err_email){
                    echo '<span class="err">'.$err_email.'</span>';
                  }
              ?>
            </h3>
            <input class="focus" type="email"  name="email" value="<?php echo $_SESSION['email'] ?>" autocomplete="email"/>

            <h3>電話番号
              <?php  
                if($err_tell){
                  echo '<span class="err">'.$err_tell.'</span>';
                }
              ?>
            </h3>
            <input class="focus" type="tell"   name="tell"  value="<?php echo $_SESSION['tell']?>">

            <h3>お問い合わせ内容<span class="mandatory">必須</span>
              <?php  
                if($err_message){
                  echo '<span class="err">'.$err_message.'</span>';
                }
              ?>
            </h3>
            <textarea class="focus" name="message" cols="40" rows="10" ><?php echo $_SESSION['message'] ?></textarea>

          <input class="submit" type="submit" name="confirm"  value="確認"/>
          <a href="<?php echo home_url(); ?>">
            <input class="submit back" style="text-align: center;" value="戻る"/>
          </a>
          </form>
        </div>

      <?php }else if($mode == 'confirm'){ ?>

        <!-- 確認画面 -->
        <div class="form">
          <form action="./contact.php" method="post">
            <input type="hidden" name="token" value="<?php echo $_SESSION['token']; ?>">
            <h3 class="confirm-name border-bottom">お名前</h3>
            <p><?php echo $_SESSION['name']  ?><span class="mr">様</span></p>
            <?php 
              if($_SESSION['company']){ ?>
              <h3 class="border-bottom">会社名</h3>
              <p><?php echo $_SESSION['company']  ?><span class="mr">様</span></p>
            <?php } ?>  
            <h3 class="border-bottom">Eメール</h3>
            <p><?php echo $_SESSION['email'] ?></p>
            <?php 
              if($_SESSION['tell']){ ?>
              <h3 class="border-bottom">電話番号</h3>
              <p><?php echo $_SESSION['tell']  ?></p>
            <?php } ?>  
            <h3 class="border-bottom">お問い合わせ内容</h3>
            <p><?php echo nl2br($_SESSION['message']) ?></p>
            <div class="confirm-btn">
              <input class="submit" type="submit" name="back" value="戻る">
              <input class="submit" type="submit" name="send" value="送信">
            </div>
          </form>
        </div>

      <?php } else{ ?>

        <!-- 送信完了画面 -->
        <div class="form">
          <p><?php echo $_SESSION['name']; $_SESSION['name']    = "";?>
            様、お問い合わせありがとうございます。</p>
          <br>
          <p>ご入力いただいたEメールアドレス宛に確認用メールを送信いたしました。</p>
          <p>お問い合わせ内容につきまして確認出来次第返信させていただきます。</p>
          <br>
          <p>今後ともよろしくお願い申し上げます。</p>
          <br>
          <p>平島 裕司郎</p>
          <form action="./contact.php" method="post">
            <input class="submit" type="submit" name="back" value="戻る">
          </form>
        </div>

      <?php } ?>
    </div>
  </div>

  
</body>
</html>