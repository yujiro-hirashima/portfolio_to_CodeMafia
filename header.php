<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yujiro Hirashima's Portfolio</title>
  
  <?php 
    if(is_front_page(  )){
      add_action('wp_enqueue_scripts','add_my_scripts');
    }
    if(is_single() || is_page('blog')){
      add_action('wp_enqueue_scripts','add_single_style');
    }
  ?>
  <?php wp_head(); ?>
</head>
<body>
