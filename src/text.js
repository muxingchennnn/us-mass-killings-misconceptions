// using d3 for convenience
const main = d3.select('main')
const scrolly = main.select('#scrolly')
const figure = scrolly.select('figure')
const article = scrolly.select('article')
const step = article.selectAll('.step-text')

// initialize the scrollama
const scroller = scrollama()

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  const stepH = Math.floor(window.innerHeight * 0.75)
  step.style('height', stepH + 'px')

  const figureHeight = window.innerHeight / 2
  const figureMarginTop = (window.innerHeight - figureHeight) / 2

  figure
    .style('height', figureHeight + 'px')
    .style('top', figureMarginTop + 'px')

  // 3. tell scrollama to update new element dimensions
  scroller.resize()
}

// scrollama event handlers
function handleStepEnter(response) {
  console.log(response)
  // response = { element, direction, index }

  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index
  })

  // update graphic based on step
  figure.select('p').text(response.index + 1)
}

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize()

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: '#scrolly article .step',
      offset: 0.33,
      debug: false,
    })
    .onStepEnter(handleStepEnter)
}

// kick things off
init()
