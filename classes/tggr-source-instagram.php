<?php

if ( $_SERVER['SCRIPT_FILENAME'] == __FILE__ )
	die( 'Access denied.' );

if ( ! class_exists( 'TGGRSourceInstagram' ) ) {
	/**
	 * Creates a custom post type and associated taxonomies
	 * @package Tagregator
	 */
	class TGGRSourceInstagram extends TGGRMediaSource {
		protected static $readable_properties  = array();
		protected static $writeable_properties = array();
		protected $setting_names, $default_settings, $view_folder;

		const POST_TYPE_NAME_SINGULAR = 'Instagram Post';
		const POST_TYPE_NAME_PLURAL   = 'Instagram Posts';
		const POST_TYPE_SLUG          = 'tggr-instagram';
		const SETTINGS_TITLE          = 'Instagram';
		const SETTINGS_PREFIX         = 'tggr_instagram_';


		/**
		 * Constructor
		 * @mvc Controller
		 */
		protected function __construct() {
			$this->setting_names = array( 'Client ID' );
			foreach ( $this->setting_names as $key ) {
				$this->default_settings[ strtolower( str_replace( ' ', '_', $key ) ) ] = '';
			}
			$this->view_folder = dirname( __DIR__ ) . '/views/'. str_replace( '.php', '', basename( __FILE__ ) );

			$this->register_hook_callbacks();
		}

		/**
		 * Prepares site to use the plugin during activation
		 * @mvc Controller
		 *
		 * @param bool $network_wide
		 */
		public function activate( $network_wide ) {
			$this->init();
		}

		/**
		 * Rolls back activation procedures when de-activating the plugin
		 * @mvc Controller
		 */
		public function deactivate() {}

		/**
		 * Register callbacks for actions and filters
		 * @mvc Controller
		 */
		public function register_hook_callbacks() {
			add_action( 'init',                     array( $this, 'init' ) );
			add_action( 'admin_init',               array( $this, 'register_settings' ) );

			add_filter( Tagregator::PREFIX . 'default_settings', __CLASS__ . '::register_default_settings' );
		}

		/**
		 * Initializes variables
		 * @mvc Controller
		 */
		public function init() {
			$this->register_post_type( self::POST_TYPE_SLUG, $this->get_post_type_params( self::POST_TYPE_SLUG, self::POST_TYPE_NAME_SINGULAR, self::POST_TYPE_NAME_PLURAL ) );
		}

		/**
		 * Executes the logic of upgrading from specific older versions of the plugin to the current version
		 * @mvc Model
		 *
		 * @param string $db_version
		 */
		public function upgrade( $db_version = 0 ) {}

		/**
		 * Validates submitted setting values before they get saved to the database. Invalid data will be overwritten with defaults.
		 * @mvc Model
		 *
		 * @param array $new_settings
		 * @return array
		 */
		public function validate_settings( $new_settings ) {
			foreach ( $new_settings as $setting => $value ) {
				if ( ! is_string( $value ) ) {
					$new_settings[ $setting ] = $this->default_settings[ $setting ];
				}
			}

			return $new_settings;
		}
	} // end TGGRSourceInstagram
}