<?php
add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style('style', get_stylesheet_uri('style.css'));
});
add_action('wp_footer', function () {
	wp_enqueue_script('main', get_theme_file_uri('app.js'));
	wp_localize_script('main', 'WPURLS', require __DIR__.'/jsVars.php');
	wp_enqueue_script('axios', 'https://unpkg.com/axios/dist/axios.min.js');
});
