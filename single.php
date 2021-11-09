<?php get_header(); ?>


<div class="thumbnail">
  <?php 
  the_post_thumbnail('thumbnail');
  ?>
<h1>
  <?php 
  the_title(); ?>
</h1>
</div>
<div class="content">
  <?php the_content(); ?>
  <div>
    <a href="<?php echo get_home_url(); ?>/blog"=>戻る
    </a>
  </div>
</div>


<?php  get_footer(); ?>