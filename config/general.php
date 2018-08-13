<?php

return [
  '*' => [

    'cpTrigger'									=> 'publisering',

    'securityKey'								=> getenv('CRAFTENV_SECURITY_KEY'),

    'defaultWeekStartDay'				=> 1, // 1 = Monday

    'userSessionDuration'				=> 'PT1H',

    'enableCsrfProtection'			=> true,

    'maxUploadFileSize'         => 16777216,

    'convertFilenamesToAscii' 	=> true,

    'limitAutoSlugsToAscii'     => true,

    'omitScriptNameInUrls'      => true,

    'errorTemplatePrefix'				=> "_errors/",

    // Search
    'defaultSearchTermOptions'  => array(
      'subLeft'  => true,
      'subRight' => true
    ),

    'siteUrl' => getenv('CRAFTENV_SITE_URL'),

    // Home-made variables
    'custom' => [
      'basePath' => getenv('CRAFTENV_BASE_PATH'),
      'baseUrl' => getenv('CRAFTENV_BASE_URL'),
      'craftEnv' => CRAFT_ENVIRONMENT,
      'staticAssetsVersion' => 1,
    ]
  ],

  // Dev environment settings
  'dev' => [
    'devMode'										=> true,
    'enableTemplateCaching'			=> false,
    'userSessionDuration'				=> false,
    'custom' => [
      'staticAssetsVersion'				=> time(),
    ]
  ],

  // Staging environment settings
  'staging' => [
    'custom' => [
      'staticAssetsVersion'				=> time(),
    ]
  ],

  // Production environment settings
  'production' => [
  ],
];
