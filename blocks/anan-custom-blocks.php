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

add_action('enqueue_block_editor_assets', function () {
  // assets.php から依存情報の抽出
  $assets_path = plugin_dir_path(__FILE__) . 'build/assets.php';
  $assets = file_exists($assets_path) ? require($assets_path) : null;
  

  wp_enqueue_script(
    'anan-block-script-editor',
    plugin_dir_url(__FILE__) . 'build/editor.js',
    ($assets && $assets['editor.js'] && $assets['editor.js']['dependencies']) ? $assets['editor.js']['dependencies'] : [],
    filemtime(plugin_dir_path(__FILE__) . 'build/editor.js'),
    true
  );
});
