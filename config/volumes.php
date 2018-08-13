<?php

return [
	'*' => [
		// assets is the name of the handle in Craft
		'assets' => [
			'path' => getenv('CRAFTENV_BASE_PATH') . 'ASSET_PATH',
			'url' => getenv('CRAFTENV_BASE_URL') . 'ASSET_PATH',
		],
	],
	'live'  => [ ],
	'staging'  => [ ],
	'dev'  => [ ],
];
