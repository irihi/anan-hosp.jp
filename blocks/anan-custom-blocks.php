<?php
/*
Plugin Name: Anan Custom Blocks
Description: Custom Gutenberg blocks for Anan Hospital.
Version: 1.0.0
*/
if ( ! defined('ABSPATH')) exit;

add_action( 'init', function() {
    $build_dir = __DIR__ . '/build';
    foreach (glob($build_dir . '/*', GLOB_ONLYDIR) as $block_dir) {
        if (file_exists($block_dir . '/block.json')) {
            register_block_type($block_dir);
        }
    }
});

