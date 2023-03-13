import './style.css'
import { BoxGeometry, Mesh, MeshNormalMaterial, WebGLRenderer, GridHelper, PerspectiveCamera, Scene } from 'three.js'

const canvas = document.querySelector('#webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new Scene()

const gridHelper = new GridHelper(30, 30)
scene.add(gridHelper)

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const geometry = new BoxGeometry(5, 5, 5, 10)
const material = new MeshNormalMaterial()

const torus = new Mesh(geometry, material)
torus.position.set(0, 0.5, -15)
torus.rotation.set(1, 1, 0)
scene.add(torus)

/**
 * 線形補間
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
const lerp = (x, y, a) => (1 - a) * x + a * y

const scalePercent = (start, end) => (scrollPercent - start) / (end - start)

const animationScripts = []

animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(torus.position)
    camera.position.set(0, 1, 10)
    torus.position.z = lerp(-10, 2, scalePercent(0, 40))
  }
})

animationScripts.push({
  start: 40,
  end: 60,
  function() {
    camera.lookAt(torus.position)
    camera.position.set(0, 1, 10)
    torus.rotation.z = lerp(0, Math.PI, scalePercent(40, 60))
  }
})

animationScripts.push({
  start: 60,
  end: 80,
  function() {
    camera.lookAt(torus.position)
    camera.position.x = lerp(0, 10, scalePercent(60, 80))
    camera.position.y = lerp(1, 12, scalePercent(60, 80))
    camera.position.z = lerp(10, 20, scalePercent(60, 80))
  }
})

animationScripts.push({
  start: 80,
  end: 101,
  function() {
    camera.lookAt(torus.position)
    torus.rotation.x += 0.02
    torus.rotation.y += 0.02
  }
})

const playScrollAnimation = () => {
  animationScripts.forEach((animation) => {
    if (scrollPercent >= animation.start && scrollPercent < animation.end) {
      animation.function()
    }
  })
}

let scrollPercent = 0

document.body.onscroll = () => {
  scrollPercent =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
    100
}

const tick = () => {
  window.requestAnimationFrame(tick)
  playScrollAnimation()
  renderer.render(scene, camera)
}

tick()

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.scrollTo({ top: 0, behavior: 'smooth' })
