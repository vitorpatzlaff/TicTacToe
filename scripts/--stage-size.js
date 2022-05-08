const cssRoot = document.querySelector(':root')
const body = document.querySelector('body')
const { type } = screen.orientation

setStageSize()

window.addEventListener('resize', setStageSize)

function setStageSize () {
  const width = body.offsetWidth
  cssRoot.style.setProperty('--stage-size', `${type.match(/landscape/g) ? width / 4 : width / 1.2}px`)
}
