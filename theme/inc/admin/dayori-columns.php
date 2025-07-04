<?php
/**
 * 病院だより管理画面カラムカスタマイズ
 * 
 * @package YourTheme
 */

// 直接アクセスを防ぐ
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 管理画面のカラムカスタマイズ
 */
function dayori_custom_columns( $columns ) {
    // 日付の前に新しいカラムを挿入
    $new_columns = array();
    foreach ( $columns as $key => $value ) {
        if ( $key === 'date' ) {
            $new_columns['issue_number'] = '号数';
            $new_columns['publication_date'] = '発行日';
            $new_columns['pdf_file'] = 'PDFファイル';
        }
        $new_columns[$key] = $value;
    }
    return $new_columns;
}
add_filter( 'manage_dayori_posts_columns', 'dayori_custom_columns' );

/**
 * カスタムカラムの内容を表示
 */
function dayori_custom_column_content( $column, $post_id ) {
    switch ( $column ) {
        case 'issue_number':
            $issue_number = get_post_meta( $post_id, '_dayori_issue_number', true );
            echo $issue_number ? esc_html( $issue_number ) . '号' : '—';
            break;
        case 'publication_date':
            $publication_date = get_post_meta( $post_id, '_dayori_publication_date', true );
            if ( $publication_date ) {
                echo esc_html( date( 'Y年m月d日', strtotime( $publication_date ) ) );
            } else {
                echo '—';
            }
            break;
        case 'pdf_file':
            $pdf_file = get_post_meta( $post_id, '_dayori_pdf_file', true );
            if ( $pdf_file ) {
                echo '<a href="' . esc_url( $pdf_file ) . '" target="_blank" title="PDFを表示">📄 PDF</a>';
            } else {
                echo '—';
            }
            break;
    }
}
add_action( 'manage_dayori_posts_custom_column', 'dayori_custom_column_content', 10, 2 );

/**
 * カスタムカラムをソート可能にする
 */
function dayori_sortable_columns( $columns ) {
    $columns['issue_number'] = 'issue_number';
    $columns['publication_date'] = 'publication_date';
    return $columns;
}
add_filter( 'manage_edit-dayori_sortable_columns', 'dayori_sortable_columns' );

/**
 * カスタムカラムのソート処理
 */
function dayori_column_orderby( $query ) {
    if ( ! is_admin() || ! $query->is_main_query() ) {
        return;
    }

    $orderby = $query->get( 'orderby' );

    if ( 'issue_number' === $orderby ) {
        $query->set( 'meta_key', '_dayori_issue_number' );
        $query->set( 'orderby', 'meta_value_num' );
    }

    if ( 'publication_date' === $orderby ) {
        $query->set( 'meta_key', '_dayori_publication_date' );
        $query->set( 'orderby', 'meta_value' );
    }
}
add_action( 'pre_get_posts', 'dayori_column_orderby' );