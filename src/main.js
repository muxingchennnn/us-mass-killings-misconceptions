const typewritter = document.querySelector('#typewriter')
tinyTypewriter(typewritter, {
  // items: ['say', 'tell'],
})

// instantiate the scrollama
const scroller = scrollama()

// setup the instance, pass callback functions
scroller
  .setup({
    step: '.step',
  })
  .onStepEnter((response) => {
    // { element, index, direction }
    console.log('enter', response)

    if (response.index === 0 && response.direction === 'down') {
    }
    if (response.index === 1 && response.direction === 'down') {
      step1()
    }
    if (response.index === 2 && response.direction === 'down') {
      step2()
    }
    if (response.index === 3 && response.direction === 'down') {
    }
    if (response.index === 4 && response.direction === 'down') {
    }
    if (response.index === 5 && response.direction === 'down') {
    }
  })
  .onStepExit((response) => {
    // { element, index, direction }
    console.log('exit', response)

    if (response.index === 1 && response.direction === 'up') {
      reverseStep1()
    }
    if (response.index === 2 && response.direction === 'up') {
      reverseStep2()
    }
  })

function step0() {}

function step1() {
  d3.select('#backdrop-img')
    .transition()
    .duration(500)
    .attr(
      'src',
      'https://cdn.glitch.global/491aea1a-adab-4f9f-8b46-547793d4b648/activeshooterdrill.jpg?v=1738262554073'
    )
    .attr('style', 'filter: brightness(0.2);')
}

function reverseStep1() {
  d3.select('#backdrop-img')
    .transition()
    .duration(500)
    .attr('style', 'opacity: 0')
}

function step2() {
  d3.select('#backdrop-img')
    .transition()
    .duration(750)
    .attr('style', 'opacity: 0')

  d3.select('#viz').transition().duration(750).attr('opacity', '1')
}

function reverseStep2() {
  d3.select('#backdrop-img')
    .transition()
    .duration(750)
    .attr('style', 'opacity: 0.6')

  d3.select('#viz').transition().duration(750).attr('opacity', '0')
}
