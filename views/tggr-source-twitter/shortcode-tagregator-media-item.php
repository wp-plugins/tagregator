<?php global $post; ?>

<div id="<?php echo esc_attr( Tagregator::CSS_PREFIX . get_the_ID() ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>media-item <?php echo get_post_type(); ?>">
	<div class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-meta">
		<?php if ( $author_image_url ) : ?>
			<img src="<?php echo esc_attr( $author_image_url ); ?>" alt="<?php echo esc_attr( $author_name ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-avatar" />
		<?php endif; ?>

		<p class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-name">
			<?php echo esc_html( $author_name ); ?>
		</p>

		<a href="http://twitter.com/<?php echo esc_attr( $author_username ); ?>" class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>author-profile">@<?php echo esc_html( $author_username ); ?></a>
	</div>

	<?php // follow ?>


	<div class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>item-content">
		<?php the_content(); ?>
	</div>


	<p class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>timestamp"><?php echo human_time_diff( get_the_time('U'), current_time('timestamp') ) . ' ago'; ?></p>
		<?php // permalink url ?>

	<p class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>source twitter"></p>

	<?php
	/*
		<div class="<?php echo esc_attr( Tagregator::CSS_PREFIX ); ?>actions">
			reply
			<a href="">retweet</a>
			favorite
		</div>
 	*/
	?>
</div>