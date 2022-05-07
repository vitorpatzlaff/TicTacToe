const cssRoot = document.querySelector(':root')
const width = document.querySelector('body').offsetWidth
const { type } = screen.orientation

cssRoot.style.setProperty('--stage-size', `${type.match(/landscape/g) ? width / 4 : width / 1.2}px`)