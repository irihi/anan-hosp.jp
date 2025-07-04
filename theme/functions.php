<?php
require_once get_theme_file_path('inc/post-types/dayori.php');
require_once get_theme_file_path('inc/meta-boxes/dayori-meta.php');
require_once get_theme_file_path('inc/admin/dayori-columns.php');

add_action('init', function () {
  /** テーマサポートの追加 */
  add_theme_support('editor-styles');
  add_theme_support('wp-block-styles');
  add_theme_support('align-wide');

  /** head の削除 */
  remove_action('wp_head', 'wp_resource_hints', 2);
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
  remove_action('wp_head', 'wp_oembed_add_host_js');
  remove_action('wp_head', 'rest_output_link_wp_head');
  remove_action('wp_head', 'wp_shortlink_wp_head');
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
  remove_action('wp_head', 'xmlrpc_rsd_apis');
  remove_action('wp_head', 'xmlrpc_pingback_ping');
}, 10);

// フロントエンドとブロックエディタで dist/style.css を読み込む
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style(
    'anan-theme-style',
    get_template_directory_uri() . '/dist/style.css',
    [],
    filemtime(get_template_directory() . '/dist/style.css')
  );
  wp_enqueue_script(
    'anan-theme-script',
    get_template_directory_uri() . '/dist/main.js',
    [],
    filemtime(get_template_directory() . '/dist/main.js'),
    true
  );
});

add_action('enqueue_block_editor_assets', function () {
  wp_enqueue_style(
    'anan-theme-style-editor',
    get_template_directory_uri() . '/dist/style.css',
    [],
    filemtime(get_template_directory() . '/dist/style.css')
  );

  wp_enqueue_script(
    'anan-theme-script-editor',
    get_template_directory_uri() . '/dist/editor.js',
    [],
    filemtime(get_template_directory()) . '/dist/editor.js',
    true
  );
});