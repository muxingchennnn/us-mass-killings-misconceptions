shuffleLetters(document.querySelector('.shuffle-letters'), {
  iterations: 3,
  fps: 10,
})

document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('background-video')
  video.playbackRate = 0.8 // Set the playback speed to 1.5x
})

const schoolDataLength = 14
const publicDataLength = 123
const familyDataLength = 295
const overallDataLength = 613

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
      highlightSchoolData()
    }
    if (response.index === 1 && response.direction === 'down') {
      highlightOtherData()
    }
  })
  .onStepExit((response) => {
    // { element, index, direction }
    console.log('exit', response)

    if (response.index === 0 && response.direction === 'up') {
      unhighlightSchoolData()
    }
    if (response.index === 1 && response.direction === 'up') {
      unhighlightOtherData()
    }
  })

function highlightSchoolData() {
  d3.selectAll('.school-rect')
    .transition()
    .duration(500)
    .delay((d, i) => i * 100)
    .attr('fill', 'var(--color-catagory-orange-foreground)')

  d3.selectAll('.school-weepeople')
    .transition()
    .duration(500)
    .delay((d, i) => i * 100)
    .attr('fill', 'var(--color-catagory-orange-foreground)')
}

function unhighlightSchoolData() {
  d3.selectAll('.rect')
    .transition()
    .duration(500)
    .attr('fill', 'var(--color-catagory-gray-background)')

  d3.selectAll('.weepeople')
    .transition()
    .duration(500)
    .attr('fill', 'var(--color-catagory-gray-background)')
}

function highlightOtherData() {
  const grayColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-catagory-gray-background')
    .trim()
  const blueColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-catagory-blue-foreground')
    .trim()

  console.log(grayColor, blueColor)
  console.log(
    d3.interpolateRgb(d3.select('.public-rect').attr('fill'), blueColor)
  )

  d3.selectAll('.public-rect')
    .transition()
    .duration(5000)
    // .delay((d, i) => i * 10)
    .attr('fill', 'var(--color-catagory-blue-background)')

  d3.selectAll('.public-weepeople')
    .transition()
    .duration(500)
    // .delay((d, i) => i * 10)
    .attr('fill', 'var(--color-catagory-blue-foreground)')

  d3.selectAll('.family-rect')
    .transition()
    .duration(500)
    // .delay((d, i) => i * 10)
    .attr('fill', 'var(--color-catagory-green-foreground)')

  d3.selectAll('.family-weepeople')
    .transition()
    .duration(500)
    // .delay((d, i) => i * 10)
    .attr('fill', 'var(--color-catagory-green-foreground)')
}

function unhighlightOtherData() {
  d3.selectAll('.public-rect')
    .transition()
    .duration(1000)
    .attr('fill', 'var(--color-catagory-gray-background)')
  d3.selectAll('.public-weepeople')
    .transition()
    .duration(1000)
    .attr('fill', 'var(--color-catagory-gray-background)')
  d3.selectAll('.family-rect')
    .transition()
    .duration(1000)
    .attr('fill', 'var(--color-catagory-gray-background)')
  d3.selectAll('.family-weepeople')
    .transition()
    .duration(1000)
    .attr('fill', 'var(--color-catagory-gray-background)')
}

function step1() {
  // d3.select('#backdrop-img')
  //   .transition()
  //   .duration(500)
  //   .attr(
  //     'src',
  //     'https://cdn.glitch.global/491aea1a-adab-4f9f-8b46-547793d4b648/activeshooterdrill.jpg?v=1738262554073'
  //   )
  //   .attr('style', 'filter: brightness(0.2);')
}

function reverseStep1() {
  // d3.select('#backdrop-img')
  //   .transition()
  //   .duration(500)
  //   .attr('style', 'opacity: 0')
}

function step2() {
  // d3.select('#backdrop-img')
  //   .transition()
  //   .duration(750)
  //   .attr('style', 'opacity: 0')
}

function reverseStep2() {
  // d3.select('#backdrop-img')
  //   .transition()
  //   .duration(750)
  //   .attr('style', 'opacity: 0.6')
  // d3.select('#viz').transition().duration(750).attr('opacity', '0')
}
