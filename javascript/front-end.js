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
			if ( typeof tggrData === 'undefined' ) {
				return;
			}
			
			tggr.prefix             = 'tggr_';
			tggr.cssPrefix          = 'tggr-';
			tggr.mediaItemContainer = '#' + tggr.cssPrefix + 'media-item-container';
			tggr.mediaItem          = '.' + tggr.cssPrefix + 'media-item';
			tggr.existingItemIDs    = tggr.getExistingItemIDs();
			tggr.retrievingNewItems = false;

			/*
			 * Enable Masonry for multi-column layouts
			 *
			 * The initial HTML/CSS layout that exists before masonry is enabled is designed to match the Masonry
			 * layout as closely as possible, so that when Masonry is enabled there won't be a dramatic visual
			 * shift that would disorient the user.
			 *
			 * There are still differences between the two layouts, though, so we initialize Masonry as soon as
			 * the DOM is ready, in order to hopefully switch to Masonry before the user has scrolled down far
			 * enough to notice the differences.
			 *
			 * That happens before images have fully loaded, though, which creates a problem. As the images load,
			 * they change the height of each item container, which causes the containers to overlap. So, we refresh
			 * the layout once more after all the images have loaded.
			 */
			if ( ! $( tggr.mediaItemContainer ).hasClass( 'one-column' ) ) {
				$( tggr.mediaItemContainer ).masonry( {
					itemSelector: tggr.mediaItem
				} );

				$( tggr.mediaItemContainer ).imagesLoaded( function() {
					$( tggr.mediaItemContainer ).masonry( 'reloadItems' );
					$( tggr.mediaItemContainer ).masonry( 'layout' );
				} );

				$( tggr.mediaItemContainer ).on( 'tggr-rendered', tggr.refreshLayout );
			}

			tggr.retrieveNewItems();
			setInterval( tggr.retrieveNewItems, tggrData.refreshInterval * 1000 );	// convert to milliseconds
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
			if ( tggr.retrievingNewItems ) {
				return;
			}

			tggr.retrievingNewItems = true;

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

					tggr.retrievingNewItems = false;
				}
			);
		},

		/**
		 * Updates the DOM with new items that were retrieved during the last check
		 */
		refreshContent : function( new_items_markup ) {
			var $newItems;

			$newItems = $( new_items_markup ).prependTo( tggr.mediaItemContainer );
			$( tggr.mediaItemContainer ).trigger( 'tggr-rendered', { items: $newItems } );

			$( '#' + tggr.cssPrefix + 'no-posts-available' ).hide();
			tggr.existingItemIDs = tggr.getExistingItemIDs();
		},

		/**
		 * Refresh Masonry's layout after we add new elements to the DOM.
		 */
		refreshLayout: function( event, data ) {
			$( tggr.mediaItemContainer ).masonry( 'prepended', data.items.get() );

			$( tggr.mediaItemContainer ).imagesLoaded( function() {
				$( tggr.mediaItemContainer ).masonry( 'reloadItems' );
				$( tggr.mediaItemContainer ).masonry( 'layout' );
			} );
		}
	}; // end tggr

	$( document ).ready( tggr.init );

} // end tggr_wrapper()

tggrWrapper( jQuery );
