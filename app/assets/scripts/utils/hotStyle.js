export default {
  version: 8,
  name: 'Imagery Coordination Basemap',
  metadata: {
    'mapbox:autocomposite': true,
    'mapbox:type': 'default',
    'mapbox:groups': {
      '1444934828655.3389': {
        name: 'Aeroways',
        collapsed: true
      },
      '1444933322393.2852': {
        name: 'POI labels  (scalerank 1)',
        collapsed: true
      },
      '1444862578782.6787': {
        name: 'Road labels',
        collapsed: true
      },
      '1444855786460.0557': {
        name: 'Roads',
        collapsed: true
      },
      '1444934295202.7542': {
        name: 'Admin boundaries',
        collapsed: true
      },
      '1444856151690.9143': {
        name: 'State labels',
        collapsed: true
      },
      '1444933721429.3076': {
        name: 'Road labels',
        collapsed: true
      },
      '1444933358918.2366': {
        name: 'POI labels (scalerank 2)',
        collapsed: true
      },
      '1444933808272.805': {
        name: 'Water labels',
        collapsed: true
      },
      '1444933372896.5967': {
        name: 'POI labels (scalerank 3)',
        collapsed: true
      },
      '1444855799204.86': {
        name: 'Bridges',
        collapsed: true
      },
      '1444856087950.3635': {
        name: 'Marine labels',
        collapsed: true
      },
      '1456969573402.7817': {
        name: 'Hillshading',
        collapsed: true
      },
      '1444862510685.128': {
        name: 'City labels',
        collapsed: true
      },
      '1444855769305.6016': {
        name: 'Tunnels',
        collapsed: true
      },
      '1456970288113.8113': {
        name: 'Landcover',
        collapsed: true
      },
      '1444856144497.7825': {
        name: 'Country labels',
        collapsed: true
      }
    }
  },
  center: [
    0,
    -1.1368683772161603e-13
  ],
  zoom: 0.9068904822413326,
  bearing: 0,
  pitch: 0,
  sources: {
    composite: {
      url: 'mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7',
      type: 'vector'
    }
  },
  sprite: 'mapbox://sprites/hot/cividbt4w00ax2jn8517i2nc9',
  glyphs: 'mapbox://fonts/hot/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      layout: {},
      paint: {
        'background-color': 'hsl(55, 11%, 96%)'
      }
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456970288113.8113'
      },
      maxzoom: 14,
      filter: [
        '==',
        'class',
        'wood'
      ],
      type: 'fill',
      source: 'composite',
      id: 'landcover_wood',
      paint: {
        'fill-color': 'hsl(0, 0%, 89%)',
        'fill-opacity': 0.1,
        'fill-antialias': false
      },
      'source-layer': 'landcover'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456970288113.8113'
      },
      maxzoom: 14,
      filter: [
        '==',
        'class',
        'scrub'
      ],
      type: 'fill',
      source: 'composite',
      id: 'landcover_scrub',
      paint: {
        'fill-color': 'hsl(0, 0%, 89%)',
        'fill-opacity': 0.1,
        'fill-antialias': false
      },
      'source-layer': 'landcover'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456970288113.8113'
      },
      maxzoom: 14,
      filter: [
        '==',
        'class',
        'grass'
      ],
      type: 'fill',
      source: 'composite',
      id: 'landcover_grass',
      paint: {
        'fill-color': 'hsl(0, 0%, 89%)',
        'fill-opacity': 0.1,
        'fill-antialias': false
      },
      'source-layer': 'landcover'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456970288113.8113'
      },
      maxzoom: 14,
      filter: [
        '==',
        'class',
        'crop'
      ],
      type: 'fill',
      source: 'composite',
      id: 'landcover_crop',
      paint: {
        'fill-color': 'hsl(0, 0%, 89%)',
        'fill-opacity': 0.1,
        'fill-antialias': false
      },
      'source-layer': 'landcover'
    },
    {
      layout: {},
      filter: [
        '==',
        'class',
        'national_park'
      ],
      type: 'fill',
      source: 'composite',
      id: 'national_park',
      paint: {
        'fill-color': 'hsl(150, 6%, 93%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [
              5,
              0
            ],
            [
              6,
              0.5
            ]
          ]
        }
      },
      'source-layer': 'landuse_overlay'
    },
    {
      layout: {},
      filter: [
        '==',
        'class',
        'park'
      ],
      type: 'fill',
      source: 'composite',
      id: 'parks',
      paint: {
        'fill-color': 'hsl(150, 6%, 93%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [
              5,
              0
            ],
            [
              6,
              0.75
            ]
          ]
        }
      },
      'source-layer': 'landuse'
    },
    {
      layout: {},
      filter: [
        '==',
        'class',
        'pitch'
      ],
      type: 'fill',
      source: 'composite',
      id: 'pitch',
      paint: {
        'fill-color': 'hsl(150, 6%, 93%)'
      },
      'source-layer': 'landuse'
    },
    {
      layout: {},
      filter: [
        '==',
        'class',
        'industrial'
      ],
      type: 'fill',
      source: 'composite',
      id: 'industrial',
      paint: {
        'fill-color': 'hsl(150, 6%, 93%)'
      },
      'source-layer': 'landuse'
    },
    {
      layout: {},
      filter: [
        '==',
        'class',
        'sand'
      ],
      type: 'fill',
      source: 'composite',
      id: 'sand',
      paint: {
        'fill-color': 'hsl(150, 6%, 93%)'
      },
      'source-layer': 'landuse'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        94
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_highlight_bright',
      paint: {
        'fill-color': '#fff',
        'fill-opacity': {
          stops: [
            [
              14,
              0.08
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        90
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_highlight_med',
      paint: {
        'fill-color': '#fff',
        'fill-opacity': {
          stops: [
            [
              14,
              0.08
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        89
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_shadow_faint',
      paint: {
        'fill-color': 'hsl(0, 0%, 35%)',
        'fill-opacity': {
          stops: [
            [
              14,
              0.033
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        78
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_shadow_med',
      paint: {
        'fill-color': 'hsl(0, 0%, 35%)',
        'fill-opacity': {
          stops: [
            [
              14,
              0.033
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        67
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_shadow_dark',
      paint: {
        'fill-color': 'hsl(0, 0%, 35%)',
        'fill-opacity': {
          stops: [
            [
              14,
              0.06
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      layout: {},
      metadata: {
        'mapbox:group': '1456969573402.7817'
      },
      maxzoom: 16,
      filter: [
        '==',
        'level',
        56
      ],
      type: 'fill',
      source: 'composite',
      id: 'hillshade_shadow_extreme',
      paint: {
        'fill-color': 'hsl(0, 0%, 35%)',
        'fill-opacity': {
          stops: [
            [
              14,
              0.06
            ],
            [
              16,
              0
            ]
          ]
        },
        'fill-antialias': false
      },
      'source-layer': 'hillshade'
    },
    {
      minzoom: 8,
      layout: {
        'line-cap': {
          base: 1,
          stops: [
            [
              0,
              'butt'
            ],
            [
              11,
              'round'
            ]
          ]
        },
        'line-join': 'round'
      },
      filter: [
        'any',
        [
          '==',
          'class',
          'canal'
        ],
        [
          '==',
          'class',
          'river'
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'waterway-river-canal',
      paint: {
        'line-color': '#cbd3d4',
        'line-width': {
          base: 1.3,
          stops: [
            [
              8.5,
              0.1
            ],
            [
              20,
              8
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              8,
              0
            ],
            [
              8.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'waterway'
    },
    {
      id: 'water shadow',
      type: 'fill',
      source: 'composite',
      'source-layer': 'water',
      layout: {},
      paint: {
        'fill-color': 'hsl(185, 7%, 73%)',
        'fill-translate': {
          base: 1.2,
          stops: [
            [
              7,
              [
                0,
                0
              ]
            ],
            [
              16,
              [
                -1,
                -1
              ]
            ]
          ]
        },
        'fill-translate-anchor': 'viewport',
        'fill-opacity': 1
      }
    },
    {
      id: 'water',
      paint: {
        'fill-color': 'hsl(185, 9%, 81%)'
      },
      layout: {},
      type: 'fill',
      source: 'composite',
      'source-layer': 'water'
    },
    {
      layout: {},
      filter: [
        'all',
        [
          '==',
          '$type',
          'Polygon'
        ],
        [
          '==',
          'class',
          'land'
        ]
      ],
      type: 'fill',
      source: 'composite',
      id: 'barrier_line-land-polygon',
      paint: {
        'fill-color': '#f0f5f3'
      },
      'source-layer': 'barrier_line'
    },
    {
      layout: {
        'line-cap': 'round'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'class',
          'land'
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'barrier_line-land-line',
      paint: {
        'line-width': {
          base: 1.99,
          stops: [
            [
              14,
              0.75
            ],
            [
              20,
              40
            ]
          ]
        },
        'line-color': '#f0f5f3'
      },
      'source-layer': 'barrier_line'
    },
    {
      minzoom: 11,
      layout: {},
      metadata: {
        'mapbox:group': '1444934828655.3389'
      },
      filter: [
        'all',
        [
          '!=',
          'type',
          'apron'
        ],
        [
          '==',
          '$type',
          'Polygon'
        ]
      ],
      type: 'fill',
      source: 'composite',
      id: 'aeroway-polygon',
      paint: {
        'fill-color': 'hsl(0, 0%, 97%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [
              11,
              0
            ],
            [
              11.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'aeroway'
    },
    {
      minzoom: 9,
      layout: {},
      metadata: {
        'mapbox:group': '1444934828655.3389'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'type',
          'runway'
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'aeroway-runway',
      paint: {
        'line-color': 'hsl(0, 0%, 95%)',
        'line-width': {
          base: 1.5,
          stops: [
            [
              9,
              1
            ],
            [
              18,
              80
            ]
          ]
        }
      },
      'source-layer': 'aeroway'
    },
    {
      minzoom: 9,
      layout: {},
      metadata: {
        'mapbox:group': '1444934828655.3389'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'type',
          'taxiway'
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'aeroway-taxiway',
      paint: {
        'line-color': 'hsl(0, 0%, 95%)',
        'line-width': {
          base: 1.5,
          stops: [
            [
              10,
              0.5
            ],
            [
              18,
              20
            ]
          ]
        }
      },
      'source-layer': 'aeroway'
    },
    {
      minzoom: 15,
      layout: {},
      filter: [
        'all',
        [
          '!=',
          'type',
          'building:part'
        ],
        [
          '==',
          'underground',
          'false'
        ]
      ],
      type: 'fill',
      source: 'composite',
      id: 'building',
      paint: {
        'fill-color': 'hsl(55, 5%, 91%)',
        'fill-opacity': {
          base: 1,
          stops: [
            [
              15.5,
              0
            ],
            [
              16,
              1
            ]
          ]
        },
        'fill-outline-color': 'hsl(55, 3%, 87%)',
        'fill-antialias': true
      },
      'source-layer': 'building'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': {
          stops: [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street_limited-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': {
          stops: [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-service-link-track-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street_limited-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ],
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ],
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            'in',
            'class',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-secondary-tertiary-case',
      paint: {
        'line-width': {
          base: 1.2,
          stops: [
            [
              10,
              0.75
            ],
            [
              18,
              2
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ],
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'primary'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-primary-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ],
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-trunk_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-dasharray': [
          3,
          3
        ]
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            '==',
            'type',
            'trunk'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-trunk-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-opacity': 1,
        'line-dasharray': [
          3,
          3
        ]
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': 'hsl(185, 12%, 89%)',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-opacity': 1,
        'line-dasharray': [
          3,
          3
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'miter'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'construction'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-construction',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                0.4,
                0.8
              ]
            ],
            [
              15,
              [
                0.3,
                0.6
              ]
            ],
            [
              16,
              [
                0.2,
                0.3
              ]
            ],
            [
              17,
              [
                0.2,
                0.25
              ]
            ],
            [
              18,
              [
                0.15,
                0.15
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'steps'
          ],
          [
            '==',
            'class',
            'path'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-path',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                1,
                0.5
              ]
            ]
          ]
        },
        'line-color': 'hsl(0, 0%, 85%)',
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            '==',
            'type',
            'steps'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-steps',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': 'hsl(0, 0%, 85%)',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                0.3,
                0.3
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-trunk_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': 1,
        'line-dasharray': [
          1,
          0
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': 1,
        'line-dasharray': [
          1,
          0
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'pedestrian'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-pedestrian',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': 1,
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.5,
                0.4
              ]
            ],
            [
              16,
              [
                1,
                0.2
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-service-link-track',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-dasharray': [
          1,
          0
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street_limited',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'tunnel'
          ],
          [
            'in',
            'class',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-secondary-tertiary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': 1,
        'line-dasharray': [
          1,
          0
        ],
        'line-blur': 0
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'primary'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-primary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)',
        'line-opacity': 1,
        'line-dasharray': [
          1,
          0
        ],
        'line-blur': 0
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'trunk'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-trunk',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': 'hsl(187, 7%, 88%)'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855769305.6016'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'tunnel'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-dasharray': [
          1,
          0
        ],
        'line-opacity': 1,
        'line-color': 'hsl(187, 7%, 88%)',
        'line-blur': 0
      },
      'source-layer': 'road'
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'pedestrian'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-pedestrian-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              2
            ],
            [
              18,
              14.5
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': 0,
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          stops: [
            [
              11,
              0
            ],
            [
              11.25,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street_limited-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          stops: [
            [
              11,
              0
            ],
            [
              11.25,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-service-link-track-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street_limited-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'class',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-main-case',
      paint: {
        'line-width': {
          base: 1.2,
          stops: [
            [
              10,
              0.75
            ],
            [
              18,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'primary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-primary-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 10,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-motorway_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-trunk_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              7,
              0.4
            ],
            [
              9,
              0.5
            ],
            [
              10,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 5,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'trunk'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-trunk-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              7,
              0.5
            ],
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.5
            ],
            [
              9,
              1.4
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              6,
              0
            ],
            [
              6.1,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-motorway-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              7,
              0.5
            ],
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              9,
              'hsl(156, 7%, 87%)'
            ],
            [
              11,
              '#e8edeb'
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'miter'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'construction'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-construction',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                0.4,
                0.8
              ]
            ],
            [
              15,
              [
                0.3,
                0.6
              ]
            ],
            [
              16,
              [
                0.2,
                0.3
              ]
            ],
            [
              17,
              [
                0.2,
                0.25
              ]
            ],
            [
              18,
              [
                0.15,
                0.15
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 16,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'type',
            'crossing',
            'sidewalk'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-sidewalks',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': '#fff',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                1,
                0.5
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              16,
              0
            ],
            [
              16.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '!in',
            'type',
            'crossing',
            'sidewalk',
            'steps'
          ],
          [
            '==',
            'class',
            'path'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-path',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': '#fff',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                1,
                0.5
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'type',
            'steps'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-steps',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': '#fff',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                0.3,
                0.3
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-trunk_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      minzoom: 10,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-motorway_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'pedestrian'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-pedestrian',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1,
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.5,
                0.4
              ]
            ],
            [
              16,
              [
                1,
                0.2
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-service-link-track',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street_limited',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'none'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'class',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-secondary-tertiary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1.2,
          stops: [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'primary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-primary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1.2,
          stops: [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 5,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'trunk'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-trunk',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.5
            ],
            [
              9,
              1.4
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            '==',
            'class',
            'motorway'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-motorway',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855786460.0557'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'structure',
            'bridge',
            'tunnel'
          ],
          [
            'in',
            'class',
            'major_rail',
            'minor_rail'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'road-rail',
      paint: {
        'line-color': '#e8edeb',
        'line-width': {
          base: 1,
          stops: [
            [
              14,
              0.75
            ],
            [
              20,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'pedestrian'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-pedestrian-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              2
            ],
            [
              18,
              14.5
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': 0,
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          stops: [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street_limited-low',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          stops: [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ],
            [
              14,
              1
            ],
            [
              14.01,
              0
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-service-link-track-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street_limited-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              13,
              0
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            'in',
            'class',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-secondary-tertiary-case',
      paint: {
        'line-width': {
          base: 1.2,
          stops: [
            [
              10,
              0.75
            ],
            [
              18,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-translate': [
          0,
          0
        ]
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'primary'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-primary-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-translate': [
          0,
          0
        ]
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              10.99,
              0
            ],
            [
              11,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '<=',
            'layer',
            1
          ],
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway_link-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'trunk'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              7,
              0.5
            ],
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'miter'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'construction'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-construction',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        },
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                0.4,
                0.8
              ]
            ],
            [
              15,
              [
                0.3,
                0.6
              ]
            ],
            [
              16,
              [
                0.2,
                0.3
              ]
            ],
            [
              17,
              [
                0.2,
                0.25
              ]
            ],
            [
              18,
              [
                0.15,
                0.15
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'steps'
          ],
          [
            '==',
            'class',
            'path'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-path',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': '#fff',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                1,
                0.5
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'steps'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-steps',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        },
        'line-color': '#fff',
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.75,
                1
              ]
            ],
            [
              16,
              [
                1,
                0.75
              ]
            ],
            [
              17,
              [
                0.3,
                0.3
              ]
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              14,
              0
            ],
            [
              14.25,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'layer',
            2,
            3,
            4,
            5
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'layer',
            2,
            3,
            4,
            5
          ],
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway_link',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'pedestrian'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-pedestrian',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': 1,
        'line-dasharray': {
          base: 1,
          stops: [
            [
              14,
              [
                1,
                0
              ]
            ],
            [
              15,
              [
                1.5,
                0.4
              ]
            ],
            [
              16,
              [
                1,
                0.2
              ]
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 14,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!=',
            'type',
            'trunk_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            'in',
            'class',
            'link',
            'service',
            'track'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-service-link-track',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street_limited'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street_limited',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'street'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1,
          stops: [
            [
              13.99,
              0
            ],
            [
              14,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            'in',
            'type',
            'secondary',
            'tertiary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-secondary-tertiary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              8.5,
              0.5
            ],
            [
              10,
              0.75
            ],
            [
              18,
              26
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1.2,
          stops: [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'primary'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-primary',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff',
        'line-opacity': {
          base: 1.2,
          stops: [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'layer',
            2,
            3,
            4,
            5
          ],
          [
            '==',
            'class',
            'trunk'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '!in',
            'layer',
            2,
            3,
            4,
            5
          ],
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'bridge'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            'in',
            'class',
            'major_rail',
            'minor_rail'
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-rail',
      paint: {
        'line-color': '#e8edeb',
        'line-width': {
          base: 1,
          stops: [
            [
              14,
              0.75
            ],
            [
              20,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk_link-2-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              10.99,
              0
            ],
            [
              11,
              1
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway_link-2-case copy',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.75
            ],
            [
              20,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-opacity': 1
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'trunk'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk-2-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-2-case',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              7,
              0.5
            ],
            [
              10,
              1
            ],
            [
              16,
              2
            ]
          ]
        },
        'line-color': '#e8edeb',
        'line-gap-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        }
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '==',
            'type',
            'trunk_link'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk_link-2',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway_link'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway_link-2',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              12,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'trunk'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-trunk-2',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444855799204.86'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'all',
          [
            '==',
            'class',
            'motorway'
          ],
          [
            '==',
            'structure',
            'bridge'
          ],
          [
            '>=',
            'layer',
            2
          ]
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-2',
      paint: {
        'line-width': {
          base: 1.5,
          stops: [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        'line-color': '#fff'
      },
      'source-layer': 'road'
    },
    {
      layout: {
        'line-join': 'bevel'
      },
      metadata: {
        'mapbox:group': '1444934295202.7542'
      },
      filter: [
        'all',
        [
          '==',
          'maritime',
          0
        ],
        [
          '>=',
          'admin_level',
          3
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-3-4-boundaries-bg',
      paint: {
        'line-color': 'hsl(0, 0%, 84%)',
        'line-width': {
          base: 1,
          stops: [
            [
              3,
              3.5
            ],
            [
              10,
              8
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              4,
              0
            ],
            [
              7,
              0.5
            ],
            [
              8,
              0.75
            ]
          ]
        },
        'line-dasharray': [
          1,
          0
        ],
        'line-translate': [
          0,
          0
        ],
        'line-blur': {
          base: 1,
          stops: [
            [
              3,
              0
            ],
            [
              8,
              3
            ]
          ]
        }
      },
      'source-layer': 'admin'
    },
    {
      minzoom: 1,
      layout: {
        'line-join': 'miter'
      },
      metadata: {
        'mapbox:group': '1444934295202.7542'
      },
      filter: [
        'all',
        [
          '==',
          'admin_level',
          2
        ],
        [
          '==',
          'maritime',
          0
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-2-boundaries-bg',
      paint: {
        'line-width': {
          base: 1,
          stops: [
            [
              3,
              3.5
            ],
            [
              10,
              10
            ]
          ]
        },
        'line-color': 'hsl(0, 0%, 84%)',
        'line-opacity': {
          base: 1,
          stops: [
            [
              3,
              0
            ],
            [
              4,
              0.5
            ]
          ]
        },
        'line-translate': [
          0,
          0
        ],
        'line-blur': {
          base: 1,
          stops: [
            [
              3,
              0
            ],
            [
              10,
              2
            ]
          ]
        }
      },
      'source-layer': 'admin'
    },
    {
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      metadata: {
        'mapbox:group': '1444934295202.7542'
      },
      filter: [
        'all',
        [
          '==',
          'maritime',
          0
        ],
        [
          '>=',
          'admin_level',
          3
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-3-4-boundaries',
      paint: {
        'line-dasharray': {
          base: 1,
          stops: [
            [
              6,
              [
                2,
                0
              ]
            ],
            [
              7,
              [
                2,
                2,
                6,
                2
              ]
            ]
          ]
        },
        'line-width': {
          base: 1,
          stops: [
            [
              7,
              0.75
            ],
            [
              12,
              1.5
            ]
          ]
        },
        'line-opacity': {
          base: 1,
          stops: [
            [
              2,
              0
            ],
            [
              3,
              1
            ]
          ]
        },
        'line-color': {
          base: 1,
          stops: [
            [
              4,
              'hsl(0, 0%, 80%)'
            ],
            [
              5,
              'hsl(0, 0%, 70%)'
            ]
          ]
        }
      },
      'source-layer': 'admin'
    },
    {
      minzoom: 1,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      metadata: {
        'mapbox:group': '1444934295202.7542'
      },
      filter: [
        'all',
        [
          '==',
          'admin_level',
          2
        ],
        [
          '==',
          'disputed',
          0
        ],
        [
          '==',
          'maritime',
          0
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-2-boundaries',
      paint: {
        'line-color': {
          base: 1,
          stops: [
            [
              3,
              'hsl(0, 0%, 70%)'
            ],
            [
              4,
              'hsl(0, 0%, 62%)'
            ]
          ]
        },
        'line-width': {
          base: 1,
          stops: [
            [
              3,
              0.5
            ],
            [
              10,
              2
            ]
          ]
        }
      },
      'source-layer': 'admin'
    },
    {
      minzoom: 1,
      layout: {
        'line-join': 'round'
      },
      metadata: {
        'mapbox:group': '1444934295202.7542'
      },
      filter: [
        'all',
        [
          '==',
          'admin_level',
          2
        ],
        [
          '==',
          'disputed',
          1
        ],
        [
          '==',
          'maritime',
          0
        ]
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-2-boundaries-dispute',
      paint: {
        'line-dasharray': [
          1.5,
          1.5
        ],
        'line-color': {
          base: 1,
          stops: [
            [
              3,
              'hsl(0, 0%, 70%)'
            ],
            [
              4,
              'hsl(0, 0%, 62%)'
            ]
          ]
        },
        'line-width': {
          base: 1,
          stops: [
            [
              3,
              0.5
            ],
            [
              10,
              2
            ]
          ]
        }
      },
      'source-layer': 'admin'
    },
    {
      minzoom: 12,
      layout: {
        'text-field': '{name_en}',
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-max-angle': 30,
        'text-size': {
          base: 1,
          stops: [
            [
              13,
              12
            ],
            [
              18,
              16
            ]
          ]
        }
      },
      filter: [
        'in',
        'class',
        'canal',
        'river'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'waterway-label',
      paint: {
        'text-halo-width': 0,
        'text-halo-blur': 0,
        'text-color': '#78888a'
      },
      'source-layer': 'waterway_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              16,
              11
            ],
            [
              20,
              13
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 1,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933372896.5967'
      },
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ],
        [
          '==',
          'scalerank',
          3
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-scalerank3',
      paint: {
        'text-color': '#949494',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'poi_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              16,
              11
            ],
            [
              20,
              12
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933372896.5967'
      },
      filter: [
        'all',
        [
          '==',
          'scalerank',
          3
        ],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-parks-scalerank3',
      paint: {
        'text-halo-blur': 0,
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-color': '#949494'
      },
      'source-layer': 'poi_label'
    },
    {
      minzoom: 15,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              15,
              10
            ],
            [
              20,
              13
            ]
          ]
        },
        'text-max-angle': 30,
        'symbol-spacing': 500,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01
      },
      metadata: {
        'mapbox:group': '1444933721429.3076'
      },
      filter: [
        'all',
        [
          '!in',
          'class',
          '',
          'ferry',
          'link',
          'motorway',
          'path',
          'pedestrian',
          'primary',
          'secondary',
          'street',
          'street_limited',
          'tertiary',
          'track',
          'trunk'
        ],
        [
          '==',
          '$type',
          'LineString'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-label-small',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.25,
        'text-halo-blur': 0
      },
      'source-layer': 'road_label'
    },
    {
      minzoom: 13,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              11,
              10
            ],
            [
              20,
              14
            ]
          ]
        },
        'text-max-angle': 30,
        'symbol-spacing': 500,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01
      },
      metadata: {
        'mapbox:group': '1444933721429.3076'
      },
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'class',
          '',
          'link',
          'pedestrian',
          'street',
          'street_limited'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-label-medium',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'road_label'
    },
    {
      minzoom: 12,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              9,
              10
            ],
            [
              20,
              16
            ]
          ]
        },
        'text-max-angle': 30,
        'symbol-spacing': 400,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01
      },
      metadata: {
        'mapbox:group': '1444933721429.3076'
      },
      filter: [
        'in',
        'class',
        'motorway',
        'primary',
        'secondary',
        'tertiary',
        'trunk'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-label-large',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': 'rgba(255,255,255, 0.75)',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'road_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              14,
              11
            ],
            [
              20,
              12
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933358918.2366'
      },
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ],
        [
          '==',
          'scalerank',
          2
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-scalerank2',
      paint: {
        'text-color': '#949494',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'poi_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              14,
              11
            ],
            [
              20,
              12
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933358918.2366'
      },
      filter: [
        'all',
        [
          '==',
          'scalerank',
          2
        ],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-parks-scalerank2',
      paint: {
        'text-color': '#949494',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'poi_label'
    },
    {
      minzoom: 5,
      layout: {
        'text-field': '{name_en}',
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [
            [
              13,
              13
            ],
            [
              18,
              18
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444933808272.805'
      },
      filter: [
        '>',
        'area',
        10000
      ],
      type: 'symbol',
      source: 'composite',
      id: 'water-label',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'water_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              11
            ],
            [
              18,
              12
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933322393.2852'
      },
      filter: [
        'all',
        [
          '<=',
          'scalerank',
          1
        ],
        [
          'in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-parks-scalerank1',
      paint: {
        'text-color': 'hsl(0, 0%, 58%)',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'poi_label'
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              11
            ],
            [
              18,
              12
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      metadata: {
        'mapbox:group': '1444933322393.2852'
      },
      filter: [
        'all',
        [
          '!in',
          'maki',
          'campsite',
          'cemetery',
          'dog-park',
          'garden',
          'golf',
          'park',
          'picnic-site',
          'playground',
          'zoo'
        ],
        [
          '<=',
          'scalerank',
          1
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-scalerank1',
      paint: {
        'text-color': 'hsl(0, 0%, 58%)',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'poi_label'
    },
    {
      minzoom: 10,
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              12
            ],
            [
              18,
              18
            ]
          ]
        },
        'icon-image': {
          stops: [
            [
              12,
              '{maki}-11'
            ],
            [
              13,
              '{maki}-15'
            ]
          ]
        },
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0.75
        ],
        'text-anchor': 'top',
        'text-field': {
          stops: [
            [
              11,
              '{ref}'
            ],
            [
              14,
              '{name_en}'
            ]
          ]
        },
        'text-letter-spacing': 0.01,
        'text-max-width': 9
      },
      filter: [
        '<=',
        'scalerank',
        2
      ],
      type: 'symbol',
      source: 'composite',
      id: 'airport-label',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': '#ffffff',
        'text-halo-width': 0.5,
        'text-halo-blur': 0
      },
      'source-layer': 'airport_label'
    },
    {
      layout: {
        'text-line-height': 1.2,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              11
            ],
            [
              18,
              16
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8
      },
      maxzoom: 16,
      filter: [
        'in',
        'type',
        'aboriginal_lands',
        'archipelago',
        'islet'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-islets-archipelago-aboriginal',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 12,
      layout: {
        'text-field': '{name_en}',
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.1,
        'text-max-width': 7,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 3,
        'text-size': {
          base: 1,
          stops: [
            [
              12,
              11
            ],
            [
              16,
              16
            ]
          ]
        }
      },
      maxzoom: 16,
      filter: [
        '==',
        'type',
        'neighbourhood'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-neighbourhood',
      paint: {
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
        'text-color': 'hsl(0, 0%, 62%)',
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 11,
      layout: {
        'text-field': '{name_en}',
        'text-transform': 'uppercase',
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-letter-spacing': 0.15,
        'text-max-width': 7,
        'text-padding': 3,
        'text-size': {
          base: 1,
          stops: [
            [
              11,
              11
            ],
            [
              15,
              18
            ]
          ]
        }
      },
      maxzoom: 16,
      filter: [
        '==',
        'type',
        'suburb'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-suburb',
      paint: {
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
        'text-color': 'hsl(0, 0%, 62%)',
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 10,
      layout: {
        'text-field': '{name_en}',
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              12,
              11.5
            ],
            [
              15,
              16
            ]
          ]
        }
      },
      maxzoom: 16,
      filter: [
        '==',
        'type',
        'hamlet'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-hamlet',
      paint: {
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.25,
        'text-color': 'hsl(0, 0%, 62%)',
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 11,
      layout: {
        'text-field': '{name_en}',
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              11.5
            ],
            [
              16,
              18
            ]
          ]
        },
        'text-offset': [
          0,
          0
        ]
      },
      maxzoom: 15,
      filter: [
        '==',
        'type',
        'village'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-village',
      paint: {
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.25,
        'text-color': {
          base: 1,
          stops: [
            [
              10,
              'hsl(0, 0%, 62%)'
            ],
            [
              11,
              'hsl(0, 0%, 55%)'
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 7,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              7,
              11.5
            ],
            [
              15,
              20
            ]
          ]
        },
        'text-font': {
          base: 1,
          stops: [
            [
              11,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              12,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-max-width': 7
      },
      maxzoom: 15,
      filter: [
        '==',
        'type',
        'town'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-town',
      paint: {
        'text-color': {
          base: 1,
          stops: [
            [
              10,
              'hsl(0, 0%, 62%)'
            ],
            [
              11,
              'hsl(0, 0%, 55%)'
            ]
          ]
        },
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.25,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      layout: {
        'text-line-height': 1.2,
        'text-size': {
          base: 1,
          stops: [
            [
              10,
              11
            ],
            [
              18,
              16
            ]
          ]
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular'
        ],
        'text-padding': 2,
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-letter-spacing': 0.01,
        'text-max-width': 7
      },
      maxzoom: 16,
      filter: [
        '==',
        'type',
        'island'
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-islands',
      paint: {
        'text-color': '#6B6B6B',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              6,
              12
            ],
            [
              14,
              22
            ]
          ]
        },
        'text-font': {
          base: 1,
          stops: [
            [
              7,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              8,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'text-offset': [
          0,
          0
        ],
        'text-field': '{name_en}',
        'text-max-width': 7
      },
      metadata: {
        'mapbox:group': '1444862510685.128'
      },
      maxzoom: 14,
      filter: [
        'all',
        [
          '!in',
          'scalerank',
          0,
          1,
          2,
          3,
          4,
          5
        ],
        [
          '==',
          'type',
          'city'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-city-sm',
      paint: {
        'text-color': 'hsl(0, 0%, 42%)',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1.25,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      layout: {
        'text-field': '{name_en}',
        'text-size': {
          base: 0.9,
          stops: [
            [
              5,
              12
            ],
            [
              12,
              22
            ]
          ]
        },
        'text-anchor': 'top',
        'text-offset': {
          base: 1,
          stops: [
            [
              7.99,
              [
                0,
                0.1
              ]
            ],
            [
              8,
              [
                0,
                0
              ]
            ]
          ]
        },
        'text-font': {
          base: 1,
          stops: [
            [
              7,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              8,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'icon-image': 'dot-10'
      },
      metadata: {
        'mapbox:group': '1444862510685.128'
      },
      maxzoom: 14,
      filter: [
        'all',
        [
          '==',
          'type',
          'city'
        ],
        [
          'in',
          'ldir',
          'E',
          'S',
          'SE',
          'SW'
        ],
        [
          'in',
          'scalerank',
          3,
          4,
          5
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-city-md-s',
      paint: {
        'text-halo-width': 1,
        'text-halo-color': '#ffffff',
        'text-color': 'hsl(0, 0%, 42%)',
        'text-halo-blur': 0,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        }
      },
      'source-layer': 'place_label'
    },
    {
      layout: {
        'text-size': {
          base: 0.9,
          stops: [
            [
              5,
              12
            ],
            [
              12,
              22
            ]
          ]
        },
        'text-font': {
          base: 1,
          stops: [
            [
              7,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              8,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'text-offset': {
          base: 1,
          stops: [
            [
              7.99,
              [
                0,
                -0.25
              ]
            ],
            [
              8,
              [
                0,
                0
              ]
            ]
          ]
        },
        'text-anchor': 'bottom',
        'text-field': '{name_en}',
        'text-max-width': 7,
        'icon-image': 'dot-10'
      },
      metadata: {
        'mapbox:group': '1444862510685.128'
      },
      maxzoom: 14,
      filter: [
        'all',
        [
          '==',
          'type',
          'city'
        ],
        [
          'in',
          'ldir',
          'N',
          'NE',
          'NW',
          'W'
        ],
        [
          'in',
          'scalerank',
          3,
          4,
          5
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-city-md-n',
      paint: {
        'text-color': 'hsl(0, 0%, 42%)',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-size': {
          base: 0.9,
          stops: [
            [
              4,
              12
            ],
            [
              10,
              22
            ]
          ]
        },
        'icon-image': 'dot-11',
        'text-font': {
          base: 1,
          stops: [
            [
              7,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              8,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'text-offset': {
          base: 1,
          stops: [
            [
              7.99,
              [
                0,
                0.15
              ]
            ],
            [
              8,
              [
                0,
                0
              ]
            ]
          ]
        },
        'icon-size': 1,
        'text-anchor': {
          base: 1,
          stops: [
            [
              7,
              'top'
            ],
            [
              8,
              'center'
            ]
          ]
        },
        'text-field': '{name_en}',
        'text-max-width': 7
      },
      metadata: {
        'mapbox:group': '1444862510685.128'
      },
      maxzoom: 14,
      filter: [
        'all',
        [
          '<=',
          'scalerank',
          2
        ],
        [
          '==',
          'type',
          'city'
        ],
        [
          'in',
          'ldir',
          'E',
          'S',
          'SE',
          'SW'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-city-lg-s',
      paint: {
        'text-color': 'hsl(0, 0%, 42%)',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-size': {
          base: 0.9,
          stops: [
            [
              4,
              12
            ],
            [
              10,
              22
            ]
          ]
        },
        'icon-image': 'dot-11',
        'text-font': {
          base: 1,
          stops: [
            [
              7,
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular'
              ]
            ],
            [
              8,
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular'
              ]
            ]
          ]
        },
        'text-offset': {
          base: 1,
          stops: [
            [
              7.99,
              [
                0,
                -0.25
              ]
            ],
            [
              8,
              [
                0,
                0
              ]
            ]
          ]
        },
        'icon-size': 1,
        'text-anchor': {
          base: 1,
          stops: [
            [
              7,
              'bottom'
            ],
            [
              8,
              'center'
            ]
          ]
        },
        'text-field': '{name_en}',
        'text-max-width': 7
      },
      metadata: {
        'mapbox:group': '1444862510685.128'
      },
      maxzoom: 14,
      filter: [
        'all',
        [
          '<=',
          'scalerank',
          2
        ],
        [
          '==',
          'type',
          'city'
        ],
        [
          'in',
          'ldir',
          'N',
          'NE',
          'NW',
          'W'
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'place-city-lg-n',
      paint: {
        'text-color': 'hsl(0, 0%, 42%)',
        'text-opacity': 1,
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [
            [
              7.99,
              1
            ],
            [
              8,
              0
            ]
          ]
        },
        'text-halo-blur': 0
      },
      'source-layer': 'place_label'
    },
    {
      minzoom: 3,
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [
            [
              3,
              12
            ],
            [
              6,
              16
            ]
          ]
        },
        'symbol-spacing': {
          base: 1,
          stops: [
            [
              4,
              100
            ],
            [
              6,
              400
            ]
          ]
        },
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.1,
        'text-max-width': 5
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 10,
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '>=',
          'labelrank',
          4
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-sm-ln',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 3,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 5,
        'text-letter-spacing': 0.1,
        'text-line-height': 1.5,
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              3,
              12
            ],
            [
              6,
              16
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 10,
      filter: [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '>=',
          'labelrank',
          4
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-sm-pt',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 2,
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1.1,
          stops: [
            [
              2,
              12
            ],
            [
              5,
              20
            ]
          ]
        },
        'symbol-spacing': 250,
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'symbol-placement': 'line',
        'text-field': '{name_en}',
        'text-letter-spacing': 0.15,
        'text-max-width': 5
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 8,
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          'in',
          'labelrank',
          2,
          3
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-md-ln',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 2,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 5,
        'text-letter-spacing': 0.15,
        'text-line-height': 1.5,
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1.1,
          stops: [
            [
              2,
              14
            ],
            [
              5,
              20
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 8,
      filter: [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          'in',
          'labelrank',
          2,
          3
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-md-pt',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 4,
        'text-letter-spacing': 0.25,
        'text-line-height': 1.1,
        'symbol-placement': 'line',
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              1,
              14
            ],
            [
              4,
              30
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 4,
      filter: [
        'all',
        [
          '==',
          '$type',
          'LineString'
        ],
        [
          '==',
          'labelrank',
          1
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-lg-ln',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 4,
        'text-letter-spacing': 0.25,
        'text-line-height': 1.5,
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              1,
              14
            ],
            [
              4,
              30
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856087950.3635'
      },
      maxzoom: 4,
      filter: [
        'all',
        [
          '==',
          '$type',
          'Point'
        ],
        [
          '==',
          'labelrank',
          1
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'marine-label-lg-pt',
      paint: {
        'text-color': '#78888a',
        'text-halo-blur': 0
      },
      'source-layer': 'marine_label'
    },
    {
      minzoom: 3,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              6,
              10
            ],
            [
              9,
              14
            ]
          ]
        },
        'text-transform': 'uppercase',
        'text-font': [
          'DIN Offc Pro Bold',
          'Arial Unicode MS Bold'
        ],
        'text-field': {
          base: 1,
          stops: [
            [
              0,
              '{abbr}'
            ],
            [
              6,
              '{name_en}'
            ]
          ]
        },
        'text-letter-spacing': 0.15,
        'text-max-width': 5
      },
      metadata: {
        'mapbox:group': '1444856151690.9143'
      },
      maxzoom: 9,
      filter: [
        '<',
        'area',
        20000
      ],
      type: 'symbol',
      source: 'composite',
      id: 'state-label-sm',
      paint: {
        'text-opacity': 1,
        'text-color': '#a8a8a8',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'state_label'
    },
    {
      minzoom: 3,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              5,
              10
            ],
            [
              8,
              16
            ]
          ]
        },
        'text-transform': 'uppercase',
        'text-font': [
          'DIN Offc Pro Bold',
          'Arial Unicode MS Bold'
        ],
        'text-field': {
          base: 1,
          stops: [
            [
              0,
              '{abbr}'
            ],
            [
              5,
              '{name_en}'
            ]
          ]
        },
        'text-letter-spacing': 0.15,
        'text-max-width': 6
      },
      metadata: {
        'mapbox:group': '1444856151690.9143'
      },
      maxzoom: 8,
      filter: [
        'all',
        [
          '<',
          'area',
          80000
        ],
        [
          '>=',
          'area',
          20000
        ]
      ],
      type: 'symbol',
      source: 'composite',
      id: 'state-label-md',
      paint: {
        'text-opacity': 1,
        'text-color': '#a8a8a8',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'state_label'
    },
    {
      minzoom: 3,
      layout: {
        'text-size': {
          base: 1,
          stops: [
            [
              4,
              10
            ],
            [
              7,
              18
            ]
          ]
        },
        'text-transform': 'uppercase',
        'text-font': [
          'DIN Offc Pro Bold',
          'Arial Unicode MS Bold'
        ],
        'text-padding': 1,
        'text-field': {
          base: 1,
          stops: [
            [
              0,
              '{abbr}'
            ],
            [
              4,
              '{name_en}'
            ]
          ]
        },
        'text-letter-spacing': 0.15,
        'text-max-width': 6
      },
      metadata: {
        'mapbox:group': '1444856151690.9143'
      },
      maxzoom: 7,
      filter: [
        '>=',
        'area',
        80000
      ],
      type: 'symbol',
      source: 'composite',
      id: 'state-label-lg',
      paint: {
        'text-opacity': 1,
        'text-color': '#a8a8a8',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1,
        'text-halo-blur': 0
      },
      'source-layer': 'state_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': 6,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 0.9,
          stops: [
            [
              5,
              14
            ],
            [
              9,
              22
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856144497.7825'
      },
      maxzoom: 10,
      filter: [
        '>=',
        'scalerank',
        5
      ],
      type: 'symbol',
      source: 'composite',
      id: 'country-label-sm',
      paint: {
        'text-halo-width': 1.25,
        'text-halo-color': {
          base: 1,
          stops: [
            [
              2,
              'rgba(255,255,255,0.75)'
            ],
            [
              3,
              '#fff'
            ]
          ]
        },
        'text-color': '#6b6b6b',
        'text-halo-blur': 0
      },
      'source-layer': 'country_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-field': {
          base: 1,
          stops: [
            [
              0,
              '{code}'
            ],
            [
              2,
              '{name_en}'
            ]
          ]
        },
        'text-max-width': 6,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              3,
              10
            ],
            [
              8,
              24
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856144497.7825'
      },
      maxzoom: 8,
      filter: [
        'in',
        'scalerank',
        3,
        4
      ],
      type: 'symbol',
      source: 'composite',
      id: 'country-label-md',
      paint: {
        'text-halo-width': 1.25,
        'text-halo-color': {
          base: 1,
          stops: [
            [
              2,
              'rgba(255,255,255,0.75)'
            ],
            [
              3,
              '#fff'
            ]
          ]
        },
        'text-color': '#6b6b6b',
        'text-halo-blur': 0
      },
      'source-layer': 'country_label'
    },
    {
      minzoom: 1,
      layout: {
        'text-field': '{name_en}',
        'text-max-width': {
          base: 1,
          stops: [
            [
              0,
              5
            ],
            [
              3,
              6
            ]
          ]
        },
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular'
        ],
        'text-size': {
          base: 1,
          stops: [
            [
              1,
              10
            ],
            [
              6,
              24
            ]
          ]
        }
      },
      metadata: {
        'mapbox:group': '1444856144497.7825'
      },
      maxzoom: 7,
      filter: [
        'in',
        'scalerank',
        1,
        2
      ],
      type: 'symbol',
      source: 'composite',
      id: 'country-label-lg',
      paint: {
        'text-halo-width': 1.25,
        'text-halo-color': {
          base: 1,
          stops: [
            [
              2,
              'rgba(255,255,255,0.75)'
            ],
            [
              3,
              '#fff'
            ]
          ]
        },
        'text-color': '#6b6b6b',
        'text-halo-blur': 0
      },
      'source-layer': 'country_label'
    }
  ],
  created: '2016-11-14T17:53:03.305Z',
  id: 'cividbt4w00ax2jn8517i2nc9',
  modified: '2017-07-31T11:34:50.685Z',
  owner: 'hot',
  visibility: 'private',
  draft: false
};
