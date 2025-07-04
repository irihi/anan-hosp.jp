<?php
/**
 * 病院だよりカスタム投稿タイプ
 * 
 * @package YourTheme
 */

// 直接アクセスを防ぐ
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 病院だよりカスタム投稿タイプを作成する関数
 */
function create_dayori_post_type() {
    $labels = array(
        'name'                  => '病院だより',
        'singular_name'         => '病院だより',
        'menu_name'             => '病院だより',
        'name_admin_bar'        => '病院だより',
        'archives'              => '病院だよりアーカイブ',
        'attributes'            => '病院だより属性',
        'parent_item_colon'     => '親記事:',
        'all_items'             => '全ての病院だより',
        'add_new_item'          => '新しい病院だよりを追加',
        'add_new'               => '新規追加',
        'new_item'              => '新しい病院だより',
        'edit_item'             => '病院だよりを編集',
        'update_item'           => '病院だよりを更新',
        'view_item'             => '病院だよりを表示',
        'view_items'            => '病院だよりを表示',
        'search_items'          => '病院だよりを検索',
        'not_found'             => '見つかりませんでした',
        'not_found_in_trash'    => 'ゴミ箱に見つかりませんでした',
        'featured_image'        => 'アイキャッチ画像',
        'set_featured_image'    => 'アイキャッチ画像を設定',
        'remove_featured_image' => 'アイキャッチ画像を削除',
        'use_featured_image'    => 'アイキャッチ画像として使用',
        'insert_into_item'      => '病院だよりに挿入',
        'uploaded_to_this_item' => 'この病院だよりにアップロード',
        'items_list'            => '病院だよりリスト',
        'items_list_navigation' => '病院だよりリストナビゲーション',
        'filter_items_list'     => '病院だよりリストをフィルター',
    );

    $args = array(
        'label'                 => '病院だより',
        'description'           => '病院からのお知らせや情報を投稿',
        'labels'                => $labels,
        'supports'              => array( 'title', 'thumbnail' ),
        'taxonomies'            => array(),
        'hierarchical'          => true,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-plus-alt',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rewrite'               => array(
            'slug' => 'dayori',
            'with_front' => false,
        ),
    );

    register_post_type( 'dayori', $args );
}

// フックに関数を追加
add_action( 'init', 'create_dayori_post_type', 0 );

/**
 * カスタム投稿タイプ用のフラッシュリライトルール
 */
function dayori_flush_rewrite_rules() {
    create_dayori_post_type();
    flush_rewrite_rules();
}

// テーマ有効化時にリライトルールをフラッシュ
add_action( 'after_switch_theme', 'dayori_flush_rewrite_rules' );