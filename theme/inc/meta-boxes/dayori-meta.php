<?php
/**
 * 病院だよりメタボックス
 * 
 * @package YourTheme
 */

// 直接アクセスを防ぐ
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 病院だより用のカスタムフィールドを追加
 */
function add_dayori_meta_boxes() {
    add_meta_box(
        'dayori_details',
        '病院だより詳細情報',
        'dayori_meta_box_callback',
        'dayori',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'add_dayori_meta_boxes' );

/**
 * REST APIにカスタムフィールドを登録
 */
function register_dayori_meta_fields() {
    register_post_meta( 'dayori', '_dayori_publication_date', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );

    register_post_meta( 'dayori', '_dayori_pdf_file', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
}
add_action( 'init', 'register_dayori_meta_fields' );

/**
 * メタボックスのコールバック関数
 */
function dayori_meta_box_callback( $post ) {
    // ナンスフィールドを追加してセキュリティを確保
    wp_nonce_field( 'dayori_meta_box', 'dayori_meta_box_nonce' );

    // 既存の値を取得
    $issue_number = get_post_meta( $post->ID, '_dayori_issue_number', true );
    $publication_date = get_post_meta( $post->ID, '_dayori_publication_date', true );
    $pdf_file = get_post_meta( $post->ID, '_dayori_pdf_file', true );
    
    echo '<table class="form-table">';
    echo '<tr>';
    echo '<th><label for="dayori_issue_number">号数</label></th>';
    echo '<td><input type="number" id="dayori_issue_number" name="dayori_issue_number" value="' . esc_attr( $issue_number ) . '" class="regular-text" placeholder="例: 1" /></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="dayori_publication_date">発行日</label></th>';
    echo '<td><input type="date" id="dayori_publication_date" name="dayori_publication_date" value="' . esc_attr( $publication_date ) . '" class="regular-text" /></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="dayori_pdf_file">PDFファイル</label></th>';
    echo '<td>';
    echo '<input type="url" id="dayori_pdf_file" name="dayori_pdf_file" value="' . esc_attr( $pdf_file ) . '" class="regular-text" placeholder="PDFファイルのURL" />';
    echo '<input type="button" id="upload_pdf_button" class="button" value="PDFをアップロード" />';
    echo '<p class="description">病院だよりのPDFファイルをアップロードしてください。</p>';
    echo '</td>';
    echo '</tr>';
    echo '</table>';
    
    // メディアアップローダー用のスクリプト
    ?>
    <script>
    jQuery(document).ready(function($) {
        $('#upload_pdf_button').click(function(e) {
            e.preventDefault();
            var mediaUploader = wp.media({
                title: 'PDFファイルを選択',
                button: {
                    text: 'このPDFを使用'
                },
                library: {
                    type: 'application/pdf'
                },
                multiple: false
            });
            
            mediaUploader.on('select', function() {
                var attachment = mediaUploader.state().get('selection').first().toJSON();
                $('#dayori_pdf_file').val(attachment.url);
            });
            
            mediaUploader.open();
        });
    });
    </script>
    <?php
}

/**
 * カスタムフィールドの保存処理
 */
function save_dayori_meta_box( $post_id ) {
    // ナンスの確認
    if ( ! isset( $_POST['dayori_meta_box_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['dayori_meta_box_nonce'], 'dayori_meta_box' ) ) {
        return;
    }

    // 自動保存の場合は何もしない
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // 権限チェック
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // データの保存
    if ( isset( $_POST['dayori_issue_number'] ) ) {
        update_post_meta( $post_id, '_dayori_issue_number', sanitize_text_field( $_POST['dayori_issue_number'] ) );
    }
    if ( isset( $_POST['dayori_publication_date'] ) ) {
        update_post_meta( $post_id, '_dayori_publication_date', sanitize_text_field( $_POST['dayori_publication_date'] ) );
    }
    if ( isset( $_POST['dayori_pdf_file'] ) ) {
        update_post_meta( $post_id, '_dayori_pdf_file', esc_url_raw( $_POST['dayori_pdf_file'] ) );
    }
}
add_action( 'save_post', 'save_dayori_meta_box' );

/**
 * カスタムフィールドの値を取得するヘルパー関数
 */
function get_dayori_issue_number( $post_id = null ) {
    if ( ! $post_id ) {
        $post_id = get_the_ID();
    }
    return get_post_meta( $post_id, '_dayori_issue_number', true );
}

function get_dayori_publication_date( $post_id = null ) {
    if ( ! $post_id ) {
        $post_id = get_the_ID();
    }
    return get_post_meta( $post_id, '_dayori_publication_date', true );
}

function get_dayori_pdf_file( $post_id = null ) {
    if ( ! $post_id ) {
        $post_id = get_the_ID();
    }
    return get_post_meta( $post_id, '_dayori_pdf_file', true );
}

/**
 * 管理画面でメディアアップローダーを有効にする
 */
function dayori_admin_scripts( $hook ) {
    global $post;
    
    if ( $hook == 'post-new.php' || $hook == 'post.php' ) {
        if ( 'dayori' === $post->post_type ) {
            wp_enqueue_media();
        }
    }
}
add_action( 'admin_enqueue_scripts', 'dayori_admin_scripts' );
