require './constants'
require 'json'
require 'yaml'

style = JSON.load(File.open(BASE_STYLE_PATH))

style['sources']['plateau'] = YAML.load(
<<EOS
type: vector
tiles:
  - https://indigo-lab.github.io/plateau-tokyo23ku-building-mvt-2020/{z}/{x}/{y}.pbf
minzoom: 10
maxzoom: 16
attribution: "<a href='https://github.com/indigo-lab/plateau-tokyo23ku-building-mvt-2020'>plateau-tokyo23ku-building-mvt-2020 by indigo-lab</a> (<a href='https://www.mlit.go.jp/plateau/'>国土交通省 Project PLATEAU</a> のデータを加工して作成)"
EOS
)

style['sources']['h'] = YAML.load(
<<EOS
type: raster-dem
tiles:
  - https://x.optgeo.org/et10b/et512/{z}/{x}/{y}.webp
tileSize: 512
minzoom: 3
maxzoom: 13
EOS
)

style['terrain'] = YAML.load(
<<EOS
source: h
EOS
)

style['layers'].unshift(YAML.load(
<<EOS
type: sky
id: sky
paint: 
  sky-type: atmosphere
EOS
))

style['layers'].unshift(YAML.load(
<<EOS
type: background
id: background
paint:
  background-color: '#fff'
EOS
))

style['layers'].insert(
  style['layers'].find_index {|layer|
    layer['type'] == 'symbol'
  },
  YAML.load(
<<EOS
type: fill-extrusion
id: bldg
source: plateau
source-layer: bldg
minzoom: 10
maxzoom: 20
paint:
  fill-extrusion-color: rgba(255, 187, 153, 1)
  fill-extrusion-height:
    - get
    - measuredHeight
EOS
))


JSON.dump(style, File.open(STYLE_JSON_PATH, 'w'))
YAML.dump(style, File.open(STYLE_YAML_PATH, 'w'))

