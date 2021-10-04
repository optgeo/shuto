let $map = null
let $mapgl = null

const CENTER = [139.729, 35.680]
const PERIOD = 40000 //ms
const R = 0.062 //degrees
const HEIGHT = 877

const style = href => {
  const e = document.createElement('link')
  e.href = href
  e.rel = 'stylesheet'
  document.head.appendChild(e)
}

const script = src => {
  const e = document.createElement('script')
  e.src = src
  document.head.appendChild(e)
}

const init = () => {
  style('style.css')
  style('https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.css')
  script('https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.js')
  const map = document.createElement('div')
  map.id = 'map'
  document.body.appendChild(map)
}
init()


const frame = (time) => {
  const theta = 2 * Math.PI * (time % PERIOD) / PERIOD
  const camera = $map.getFreeCameraOptions()
  camera.position = $mapgl.MercatorCoordinate.fromLngLat(
    [
      CENTER[0] + R * Math.cos(theta),
      CENTER[1] + R * Math.sin(theta)
    ],
    HEIGHT
  )
  camera.lookAtPoint(CENTER)
  $map.setFreeCameraOptions(camera)
  window.requestAnimationFrame(frame)
}

const showMap = async (texts) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGZ1IiwiYSI6ImlRSGJVUTAifQ.rTx380smyvPc1gUfZv1cmw'
  $mapgl = mapboxgl
  $map = new $mapgl.Map({
    container: 'map',
    hash: true,
    style: 'style.json',
    center: CENTER,
    zoom: 11.77,
    maxZoom: 18
  })
  $map.addControl(new $mapgl.NavigationControl())
  $map.addControl(new $mapgl.ScaleControl({
    maxWidth: 200, unit: 'metric'
  }))

  $map.on('load', () => {
  })

  $map.once('idle', () => {
    window.requestAnimationFrame(frame)    
  })
}

window.onload = () => {
  showMap()
}
