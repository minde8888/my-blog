<?php
// includes PHP variables to JS with wp_localize_script
return 
[   'pluginUrl' => PLUGIN_DIR_URL,
    'apiUrl' => PLUGIN_DIR_URL.'api/?route=',
    'themeUrl' => get_template_directory_uri()

];