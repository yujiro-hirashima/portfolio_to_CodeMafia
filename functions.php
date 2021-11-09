<?php  

add_theme_support('post-thumbnails');

function add_my_scripts(){
  wp_enqueue_style( 'ochiba', get_theme_file_uri('/css/ochiba.css'), array());

  wp_enqueue_script(
    "autumn",
    get_theme_file_uri( 'js/main.js' ),
    array(),
  '20111106',
  false);
}


function add_single_style(){
  wp_enqueue_style( 'contact', get_theme_file_uri('/css/single.css'), array());

}




?>