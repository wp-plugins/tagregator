/**
 * @package Tagregator
 */


/**
 * Wrapper function to safely use $
 */
function tggrWrapper( $ ) {
	var tggr = {

		/**
		 * Initialization
		 */
		init : function() {
			if( typeof tggrData === 'undefined' ) {
				return;
			}
			
			tggr.prefix             = 'tggr_';
			tggr.cssPrefix          = 'tggr-';
			tggr.mediaItemContainer = '#' + tggr.cssPrefix + 'media-item-container';
			tggr.mediaItem          = '.' + tggr.cssPrefix + 'media-item';
			tggr.existingItemIDs    = tggr.getExistingItemIDs();

			$( tggr.mediaItemContainer ).masonry( {
				//columnWidth:        tggr.calculateMediaItemWidth(), // todo temp b/c method is broken
				itemSelector:       tggr.mediaItem,
				transitionDuration: '1s'
			} );

			// The layout is drawn immediately after the page has rendered to setup the initial layout, then again once all images have finished loading to account for the changing element sizes
			$( tggr.mediaItemContainer ).imagesLoaded( function() {
				$( tggr.mediaItemContainer ).masonry( 'reloadItems' );
				$( tggr.mediaItemContainer ).masonry( 'layout' );
			} );

			setInterval( tggr.retrieveNewItems, tggrData.refreshInterval * 1000 );	// convert to milliseconds
		},

		/**
		 * Determines how wide each media item container element should be
		 *
		 * @return int
		 */
		calculateMediaItemWidth : function() {
			var mediaItemWidth,
				mediaItemPaddingBorderMargin = 0;

			mediaItemPaddingBorderMargin = parseInt( $( tggr.mediaItem ).css( 'padding-left' ) ) + parseInt( $( tggr.mediaItem).css( 'padding-right' ) );
			mediaItemPaddingBorderMargin += parseInt( $( tggr.mediaItem ).css( 'border-left' ) ) + parseInt( $( tggr.mediaItem).css( 'border-right' ) );
			mediaItemPaddingBorderMargin += parseInt( $( tggr.mediaItem ).css( 'margin-left' ) ) + parseInt( $( tggr.mediaItem).css( 'margin-right' ) );
			//console.log(mediaItemPaddingBorderMargin);
			mediaItemPaddingBorderMargin *= tggrData.numberOfColumns;
			//console.log(mediaItemPaddingBorderMargin);

			mediaItemWidth = ( $( tggr.mediaItemContainer ).width() - mediaItemPaddingBorderMargin ) / tggrData.numberOfColumns;
			//console.log(mediaItemWidth);

			return mediaItemWidth;
		},

		/**
		 * Builds an array of which item IDs are already present in the DOM
		 *
		 * @return array
		 */
		getExistingItemIDs : function() {
			var itemIDs = [];

			$( tggr.mediaItemContainer ).children( tggr.mediaItem ).each( function() {
				itemIDs.push( parseInt( $( this ).attr( 'id' ).replace( tggr.cssPrefix, '' ) ) );
			} );

			return itemIDs;
		},

		/**
		 * Makes an AJAX call to the server to get any new items that have been imported since the last check
		 */
		retrieveNewItems : function() {
			$.post(
				tggrData.ajaxPostURL, {
					'action'          : tggr.prefix + 'render_latest_media_items',
					'hashtag'         : tggrData.hashtag,
					'existingItemIDs' :	tggr.existingItemIDs
				},

				function( response ) {
					if ( '-1' != response && '0' != response ) {  // WordPress successfully processed request and found new items
						tggr.refreshContent( $.parseJSON( response ) );
					}
				}
			);
		},

		/**
		 * Updates the DOM with new items that were retrieved during the last check
		 */
		refreshContent : function( new_items_markup ) {
			$( tggr.mediaItemContainer ).prepend( new_items_markup );
			$( tggr.mediaItemContainer ).masonry( 'reloadItems' );
			$( tggr.mediaItemContainer ).masonry( 'layout' );
			
			// The layout is redrawn immediately after adding the new elements to avoid overlapping elements, then again once all images have finished loading to account for the changing element sizes
			$( tggr.mediaItemContainer ).imagesLoaded( function() {
				$( tggr.mediaItemContainer ).masonry( 'reloadItems' );
				$( tggr.mediaItemContainer ).masonry( 'layout' );
			} );

			$( '#' + tggr.cssPrefix + 'no-posts-available' ).hide();
			tggr.existingItemIDs = tggr.getExistingItemIDs();
		}
	}; // end tggr

	$( document ).ready( tggr.init );

} // end tggr_wrapper()

tggrWrapper( jQuery );