<?php get_header() ?>


<div id="app" class="content-area grid-container center">
    <?php
    while (have_posts()) {
        the_post();
        the_content();
    }
    ?>
</div>
<?php
get_footer();
?>