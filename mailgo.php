<?php
/**
 * mailgo, a new concept of mailto and tel links
 *
 * @link              https://mailgo.dev
 * @since             0.9.18
 * @package           mailgo
 *
 * @wordpress-plugin
 * Plugin Name:       mailgo
 * Plugin URI:        https://mailgo.dev
 * Text Domain:       mailgo
 * Description:       a new concept of mailto and tel links
 * Version:           0.9.18
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
    wp_register_script('mailgo_script', plugins_url('dist/mailgo.min.js', __FILE__), array(), '0.9.18', true);
    wp_enqueue_script('mailgo_script');
}

add_action('wp_enqueue_scripts', 'mailgo_adding_scripts');
