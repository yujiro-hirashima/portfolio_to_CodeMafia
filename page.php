<?php get_header(); ?>


<div class="thumbnail">
  <?php 
  the_post_thumbnail('thumbnail');
  ?>
<h1 style="color: #555; font-size:5rem;">
  <?php 
  the_title(); ?>
</h1>
</div>

<?php
global $post;
$args = array( 'posts_per_page');
$posts = get_posts( $args );?>


<div class="container">

    <?php
    foreach( $posts as $post ) {
      setup_postdata($post);
    ?>
    <div class="item">
      <div class="img">
          <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('thumbnail'); ?></a>
      </div>
      <div class="title">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
      </div>
      <div class="time">
          <?php the_time('Y.m.d') ?>    
      </div>
    </div>
    <?php
    }

    wp_reset_postdata();
    ?>
</div>


<?php  get_footer(); ?>