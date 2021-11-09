<?php get_header(); ?>

  <div class="maple-container">
      <h2 class="textAnimation"><?php the_title(); ?></h2>
      <p class="textAnimation">2021年秋、あなたにとって素敵な季節となりますように</p>
      <div class="contents">
        <a href="<?php echo home_url('blog'); ?>">
          <h2 class="content co1" style="left: 10vw;">
            BLOG
          </h2>
        </a> 
        <a href="https://yuziro.net">
          <h2 class="content co2" style="left: 40vw;">
            GAME
          </h2>
        </a>
        <a " href="https://yuziro.net/contact/contact.php">
          <h2 class="content co3" style="left: 70vw;">
            CONTACT
          </h2>
        </a>
      </div>
      <h1>Yujiro-Hirashima's Portfolio Site</h1>
  </div>
  
  <?php wp_footer(); ?>

</body>
</html>