<?php
/**
 * mailgo, a different mailto
 *
 * @link              https://mailgo.js.org
 * @since             0.6.7
 * @package           mailgo
 *
 * @wordpress-plugin
 * Plugin Name:       mailgo
 * Plugin URI:        https://mailgo.js.org
 * Text Domain:       mailgo
 * Description:       a different mailto: more possibilities, less spam
 * Version:           0.6.7
 * Author:            Matteo Manzinello
 * Author URI:        https://matteomanzinello.com
 * License:           MIT
 * License URI:       https://github.com/manzinello/mailgo-wp-plugin/blob/master/LICENSE
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

function mailgo_adding_scripts()
{
    wp_register_script('mailgo_script', plugins_url('dist/mailgo.min.js', __FILE__), array(), '0.6.7', true);
    wp_enqueue_script('mailgo_script');
}

add_action('wp_enqueue_scripts', 'mailgo_adding_scripts');
