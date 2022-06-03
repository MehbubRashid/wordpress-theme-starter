<?php 

define('LEXX_ASSETS_URL', get_template_directory_uri(  ) . '/assets/');
define('LEXX_URL', get_template_directory_uri(  ) . '/');
define('LEXX_PATH', get_template_directory(  ) . '/');

function lexx_scripts() {
    $version = time();
    wp_enqueue_style( 'lexx-main', LEXX_ASSETS_URL . 'css/main.min.css', array(), $version );
    wp_enqueue_style( 'lexx', get_stylesheet_uri(  ), array(), $version );
}
add_action( 'wp_enqueue_scripts', 'lexx_scripts' );