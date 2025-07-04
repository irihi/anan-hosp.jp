<?php
/**
 * This file is intended to be used within the 'core/post-template' block.
 * It inherits the post context from the parent 'core/query' block.
 */
global $post;

$pdf_file         = get_post_meta( get_the_ID(), '_dayori_pdf_file', true );
$publication_date = get_post_meta( get_the_ID(), '_dayori_publication_date', true );
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<a href="<?php echo esc_url( $pdf_file ); ?>" target="_blank" rel="noopener noreferrer">
        <div class="thumbnail">
            <?php if ( has_post_thumbnail() ) : ?>
                <?php the_post_thumbnail( 'thumbnail' ); ?>
            <?php endif; ?>
        </div>
		
		<div class="content">
			<p><?php _e(date('Y年n月', strtotime($publication_date))); ?>号</p>
		</div>
	</a>
</div>
