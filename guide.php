<?php

/**
 * Plugin Name: Guide
 * Plugin URI: http://reinvdwoerd.herokuapp.com
 * Description: description
 * Version: 0.1
 * Author: Rein van der Woerd
 * Author URI: http://reinvdwoerd.herokuapp.com
 * License: -
 */
class Guide
{
    function __construct()
    {
        if (!is_admin()) {
            add_action('wp_enqueue_scripts', [$this, 'guide_load']);
        }
    }

    function guide_load()
    {
        wp_enqueue_style('guide.css', plugin_dir_url(__FILE__) . 'guide.css');
        wp_enqueue_script('guide.js', plugin_dir_url(__FILE__) . 'guide.js');
    }
}

new Guide();
