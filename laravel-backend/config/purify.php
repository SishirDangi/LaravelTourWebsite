<?php

use Stevebauman\Purify\Definitions\Html5Definition;

return [
    'default' => 'default',

    'configs' => [
        'default' => [
            'Core.Encoding' => 'utf-8',
            'HTML.Doctype' => 'HTML 4.01 Transitional',
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,b,u,strong,i,em,s,del,a[href|title],ul,ol,li,p[style],br,span,img[width|height|alt|src],blockquote',
            'HTML.ForbiddenElements' => '',
            'CSS.AllowedProperties' => 'font,font-size,font-weight,font-style,font-family,text-decoration,padding-left,color,background-color,text-align',
            'AutoFormat.AutoParagraph' => false,
            'AutoFormat.RemoveEmpty' => false,
        ],

        'maps_embed' => [
            'Core.Encoding' => 'utf-8',
            'HTML.Doctype' => 'XHTML 1.1',
            'HTML.Allowed' => 'iframe[src|width|height|frameborder|style|allowfullscreen|loading|referrerpolicy]',
            'HTML.SafeIframe' => true,
            'URI.SafeIframeRegexp' => '%^https://(www\.google\.com/maps/embed|maps\.google\.com/maps/embed)%',
            'URI.AllowedSchemes' => [
                'https' => true,
            ],
            'Attr.AllowedFrameTargets' => ['_blank'],
            'AutoFormat.AutoParagraph' => false,
            'AutoFormat.RemoveEmpty' => false,
            'HTML.Trusted' => true,
            'HTML.DefinitionID' => 'maps-embed-iframe',
            'HTML.DefinitionRev' => 2, // Increment to force cache refresh
        ],
    ],

    'definitions' => function ($config) {
        $def = $config->getHTMLDefinition(true);
        $def->addElement(
            'iframe',
            'Block',
            'Flow',
            'Common',
            [
                'src' => 'URI',
                'width' => 'Length',
                'height' => 'Length',
                'frameborder' => 'Text',
                'style' => 'Text',
                'allowfullscreen' => 'Bool', // Boolean attribute for HTML5
                'loading' => 'Enum#lazy,eager,auto', // Explicitly allow loading attribute
                'referrerpolicy' => 'Enum#no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,same-origin,strict-origin,strict-origin-when-cross-origin,unsafe-url',
            ]
        );
    },

    'serializer' => [
        'driver' => env('CACHE_STORE', env('CACHE_DRIVER', 'file')),
        'cache' => \Stevebauman\Purify\Cache\CacheDefinitionCache::class,
    ],
];