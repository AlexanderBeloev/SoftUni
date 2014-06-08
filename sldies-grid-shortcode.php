<?php
	/*
	 * Shortcode - Slider combined with 3 side posts
	 */
class WPBakeryShortCode_home_slider_grid_posts extends WPBakeryShortCode {
	protected static $pretty_photo_loaded = false;
	protected function resetTaxonomies() {
		$this->taxonomies = false;
	}
	protected function getTaxonomies() {
		if ( $this->taxonomies === false ) {
			$this->taxonomies = get_object_taxonomies( ! empty( $this->loop_args['post_type'] ) ? $this->loop_args['post_type'] : get_post_types( array( 'public' => false, 'name' => 'attachment' ), 'names', 'NOT' ) );
		}
		return $this->taxonomies;
	}
	protected function getLoop( $loop ) {
		require_once vc_path_dir( 'PARAMS_DIR', 'loop/loop.php' );
		list( $this->loop_args, $this->query ) = vc_build_loop_query( $loop, get_the_ID() );
	}
	protected function getPostThumbnail( $post_id, $grid_thumb_size ) {
		return wpb_getImageBySize( array( 'post_id' => $post_id, 'thumb_size' => $grid_thumb_size ) );
	}
 	protected function getPostExcerpt() {
		remove_filter('the_excerpt', 'wpautop');
		$content = apply_filters( 'the_excerpt', get_the_excerpt() );
		return $content;
	}
	protected function getLinked( $post, $content, $type, $css_class ) {
		$output = '';
		if ( $type === 'link_post' || empty($type) ) {
			$url = get_permalink( $post->id );
			$title = sprintf( esc_attr__( 'Permalink to %s', "x-mag" ), $post->title_attribute );
			$output .= '<a href="' . $url . '" class="' . $css_class . '"' . $this->link_target . ' title="' . $title . '">' . $content . '</a>';
		} elseif ( $type === 'link_image' && isset( $post->image_link ) && ! empty( $post->image_link ) ) {
			$this->loadPrettyPhoto();
			$output .= '<a href="' . $post->image_link . '" class="' . $css_class . ' prettyphoto"' . $this->link_target . ' title="' . $post->title_attribute . '">' . $content . '</a>';
		} else {
			$output .= $content;
		}
		return $output;
	}
	protected function loadPrettyPhoto() {
		if ( true !== self::$pretty_photo_loaded ) {
			wp_enqueue_script( 'prettyphoto' );
			wp_enqueue_style( 'prettyphoto' );
			self::$pretty_photo_loaded = true;
		}
	}
	protected function setLinkTarget( $grid_link_target = '' ) {
		$this->link_target = $grid_link_target == '_blank' ? ' target="_blank"' : '';
	}

	// shortcode
	protected function content($atts, $content = null) {

		global $vc_teaser_box;
		$grid_link = '';
		$posts = array();
		extract( shortcode_atts( array(
			'grid_columns_count' => 4,
			'grid_link' => 'link_post', // link_post, link_image, link_image_post, link_no
			'grid_link_target' => '_self',
			'el_class' => '',
			'loop' => '',
		), $atts ) );
		
		wp_enqueue_style( 'flexslider' );
		wp_enqueue_script( 'flexslider' );
		
		$this->resetTaxonomies();
		if ( empty( $loop ) ) return;
		$this->getLoop( $loop );
		$my_query = $this->query;
		$args = $this->loop_args;
		while ( $my_query->have_posts() ) {
			$my_query->the_post(); // Get post from query
			$post = new stdClass(); // Creating post object.
			$post->id = get_the_ID();
			$post->link = get_permalink( $post->id );
			$post->title = the_title( "", "", false );
			$post->title_attribute = the_title_attribute( 'echo=0' );
			$post->post_type = get_post_type();
		    $post->excerpt = $this->getPostExcerpt();
			$post->thumbnail_data = $this->getPostThumbnail( $post->id, 'x_medium' );
			$post->thumbnail = $post->thumbnail_data && isset( $post->thumbnail_data['thumbnail'] ) ? $post->thumbnail_data['thumbnail'] : '';
			$post->image_link = empty( $video ) && $post->thumbnail && isset( $post->thumbnail_data['p_img_large'][0] ) ? $post->thumbnail_data['p_img_large'][0] : $video;

			$posts[] = $post;
		}
		wp_reset_query();
		
		$el_class = $this->getExtraClass( $el_class );

		$css_class = 'x-shortcode-slider-grid wpb_content_element ' .
		  $el_class; // Custom css class from shortcode attributes

		$this->setLinktarget( $grid_link_target );
		
		$link_setting = $grid_link;
		

		?>
		<?php $count = 0; ?>
		<div class="<?php echo apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, $css_class, $this->settings['base'], $atts ) ?>">
			<div class="vc_span9">	
				<div class="wpb_gallery_slides wpb_flexslider flexslider_slide flexslider" data-interval="10" data-flex_fx="slide">
					<ul class="slides">
						<?php foreach ( $posts as $post ): ?>
							<?php $count++;
							if ($count <= 5) : // display only the first five posts of the query ?>
								<li>
									<?php echo empty($link_setting) || $link_setting!='no_link' ? $this->getLinked($post, $post->thumbnail, $link_setting, 'link_image') : $post->thumbnail ?>
									<div class="flex-caption">
										<h2 class="post-title"><?php echo empty($link_setting) || $link_setting!='no_link' ? $this->getLinked($post, $post->title, $link_setting, 'link_title') : $post->title ?></h2>
										<div class="post-excerpt">
											<?php echo $post->excerpt ?>
										</div> <?php echo $this->endBlockComment( 'post-excerpt' ); ?>
									</div> <?php echo $this->endBlockComment( 'flex-caption' ); ?>
								</li>
							<?php endif; ?>
						<?php endforeach; ?>
					</ul>
				</div> <?php echo $this->endBlockComment( 'wpb_gallery_slides wpb_flexslider flexslider_slide flexslider' ); ?>
			</div> <?php echo $this->endBlockComment( 'vc_span9' ); ?>	
			<?php $count = 0; // restart the count ?>
			<div class="vc_span3">
				<ul class="grid-block">				
					<?php if ( count( $posts ) > 0 ): ?>
					<?php foreach ( $posts as $post ): ?>
						<?php $count++; ?>
						<?php if ($count > 5 && $count <= 8) : // display the next 3 posts of the query (those after the first five) ?>
							<li>
								<div class="post-thumbnail-wrapper">
									<?php echo empty($link_setting) || $link_setting!='no_link' ? $this->getLinked($post, $post->thumbnail, $link_setting, 'link_image') : $post->thumbnail ?>
								</div> <?php echo $this->endBlockComment( 'post-thumbnail-wrapper' ); ?>	
								<div class="post-box-inner">
									<div class="post-meta header-font">
										<?php $post_date = get_the_time(get_option('date_format')); ?>
										<?php echo get_avatar( get_the_author_meta('user_email'), 32 ); ?>
										<i class="icon-user"></i><a class="author-name" href="<?php echo get_author_posts_url(get_the_author_meta( 'ID' )); ?>" title="<?php _e('View all posts by', 'x-mag'); ?> <?php the_author(); ?>"><?php the_author(); ?></a>,
										<a href="<?php the_permalink(); ?>" class="post-date" title="<?php printf( esc_attr__('Permalink to %s', 'x-mag'), the_title_attribute('echo=0') ); ?>" rel="bookmark"><?php echo $post_date; ?></a>
									</div> <?php echo $this->endBlockComment( 'post-meta header-font' ); ?>
								</div> <?php echo $this->endBlockComment( 'post-box-inner' ); ?>
								<div class="post-box-title">
									<h3 class="title"><?php echo empty($link_setting) || $link_setting!='no_link' ? $this->getLinked($post, $post->title, $link_setting, 'link_title') : $post->title ?></h3>
								</div> <?php echo $this->endBlockComment( 'post-box-title' ); ?>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
					<?php else: ?>
					<li><?php _e( "Nothing found.", "x-mag" ) ?></li>
					<?php endif; ?>
				</ul>
			</div> <?php echo $this->endBlockComment( 'vc_span3' ); ?>
		</div> <?php echo $this->endBlockComment( 'x-shortcode-slider-grid' ); ?>
	<?php }
}	
add_shortcode( 'home_slider_grid_posts', 'content'  );

function x_mag_two_integrateWithVC() {

	$vc_layout_sub_controls = array(
		array( 'link_post', __( 'Link to post', 'x-mag' ) ),
		array( 'no_link', __( 'No link', 'x-mag' ) ),
		array( 'link_image', __( 'Link to bigger image', 'x-mag' ) )
	);
	vc_map( array(
		'name' => __( 'Posts Grid New', 'x-mag' ),
		'base' => 'home_slider_grid_posts',
		'icon' => 'icon-wpb-application-icon-large',
		'description' => __( 'Posts in grid view', 'x-mag' ),
		'params' => array(
			array(
				'type' => 'loop',
				'heading' => __( 'Grids content', 'x-mag' ),
				'param_name' => 'loop',
				'settings' => array(
					'size' => array( 'hidden' => true, 'value' => 8 ),
					'order_by' => array( 'value' => 'date' ),
				),
				'description' => __( 'Create WordPress loop, to populate content from your site.', 'x-mag' )
			),
			array(
				'type' => 'dropdown',
				'heading' => __( 'Link', 'js_composer' ),
				'param_name' => 'grid_link',
				'value' => array(
					__( 'Link to post', 'js_composer' ) => 'link_post',
					__( 'Link to bigger image', 'js_composer' ) => 'link_image',
					__( 'No link', 'js_composer' ) => 'link_no'
				),
				'description' => __( 'Link type.', 'js_composer' )
			),
			array(
				'type' => 'dropdown',
				'heading' => __( 'Link target', 'js_composer' ),
				'param_name' => 'grid_link_target',
				'value' => array(
					__( 'Same window', 'js_composer' ) => '_self',
					__( 'New window', 'js_composer' ) => "_blank"
				),
				'dependency' => array(
					'element' => 'grid_link',
					'value' => array( 'link_post', 'link_image_post' )
				)
			),			
			array(
				'type' => 'textfield',
				'heading' => __( 'Extra class name', 'x-mag' ),
				'param_name' => 'el_class',
				'description' => __( 'If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.', 'x-mag' )
			)
		)
	) );
}
add_action( 'init', 'x_mag_two_integrateWithVC' );
?>
