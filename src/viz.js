import { randomLetter } from './utilities.js'

let width = window.innerWidth
let height = window.innerHeight

let numberOfSquaresRow = getNumberOfSquares()
let schoolData
let publicData
let familyData
let overallData
let resizeTimeout

// Function to determine number of squares
function getNumberOfSquares() {
  return window.innerWidth > 576 ? 25 : 20
}

window.addEventListener('resize', () => {
  // Clear the previous timeout
  clearTimeout(resizeTimeout)

  // Set a new timeout to redraw the SVG after resizing ends
  resizeTimeout = setTimeout(() => {
    // Clear the SVG content at the start of the resize
    d3.select('#viz').selectAll('*').remove()
    numberOfSquaresRow = getNumberOfSquares()
    draw(overallData, numberOfSquaresRow)
  }, 100)
})

// Load data
d3.csv('./dataset/mass_killing_incidents.csv').then((data) => {
  data.forEach(function (d) {
    d.date = +d.date.split('-')[0]
    d.num_victims_killed = +d.num_victims_killed
  })

  schoolData = data.filter((d) => d.location_type === 'School/College')
  publicData = data.filter((d) => d.type === 'Public')
  familyData = data.filter((d) => d.type === 'Family')
  overallData = data

  draw(overallData, numberOfSquaresRow)
})

// Function to draw the visualization
function draw(data, numberOfSquaresRow) {
  const margin = { top: 10, left: 10, right: 10, bottom: 10 }
  const numberOfSquaresCol = Math.ceil(overallData.length / numberOfSquaresRow)
  // Calculate the size of the squares based on the screen size, and the number of squares per row/column
  const squareSize = Math.min(
    (height - margin.top - margin.bottom) /
      (Math.ceil(overallData.length / numberOfSquaresRow) + 2),
    (width - margin.left - margin.right) / (numberOfSquaresRow + 2)
  )
  const gap = 0

  // Determine the width and height of the svg
  const waffleWidth =
    squareSize * numberOfSquaresRow + numberOfSquaresRow * gap + squareSize
  const waffleHeight =
    squareSize * numberOfSquaresCol + numberOfSquaresCol * gap + squareSize

  const svg = d3
    .select('#viz')
    .attr('width', waffleWidth)
    .attr('height', waffleHeight)
    .attr('viewBox', `0, 0, ${waffleWidth}, ${waffleHeight}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .style('margin', '0 auto')

  // Create a <g> element to translate the whole chart according to margins
  const waffleChart = svg
    .append('g')
    .attr('transform', `translate( ${margin.left}, ${margin.top} )`)

  // Draw the rectangle shading for each cell
  const cellShade = waffleChart
    .append('g')
    .attr('class', 'rects')
    .selectAll('.rect')
    .data(overallData)
    .join('rect')
    .attr('class', (d, i) => {
      if (i < schoolData.length) {
        return 'rect school-rect'
      } else if (
        i >= schoolData.length &&
        i < schoolData.length + publicData.length
      ) {
        return 'rect public-rect'
      } else if (
        i >= schoolData.length + publicData.length &&
        i < schoolData.length + publicData.length + familyData.length
      ) {
        return 'rect family-rect'
      } else {
        return 'rect'
      }
    })
    .attr('width', squareSize)
    .attr('height', squareSize)
    .attr('y', (d, i) => {
      //Group n squares by row
      const row = Math.floor(i / numberOfSquaresRow)
      return waffleHeight - 2 * squareSize - (row * squareSize + row * gap)
    })
    .attr('x', function (d, i) {
      const col = i % numberOfSquaresRow
      return col * squareSize + col * gap
    })
    .attr('fill', 'var(--color-catagory-gray-background)')
    .attr('opacity', '0.2')
    .attr('stroke', 'var(--color-bg)')
    .attr('stroke-width', '4px')

  // Add people icons (a font in essence) into each cell
  const cellSymbol = waffleChart
    .append('g')
    .attr('transform', `translate( ${squareSize / 2}, ${squareSize / 2} )`)
    .attr('class', 'icons')
    .selectAll('text')
    .data(overallData)
    .join('text')
    .attr('class', (d, i) => {
      if (i < schoolData.length) {
        return 'weepeople school-weepeople'
      } else if (
        i >= schoolData.length &&
        i < schoolData.length + publicData.length
      ) {
        return 'weepeople public-weepeople'
      } else if (
        i >= schoolData.length + publicData.length &&
        i < schoolData.length + publicData.length + familyData.length
      ) {
        return 'weepeople family-weepeople'
      } else {
        return 'weepeople'
      }
    })
    .text((d) => randomLetter())
    .attr('y', (d, i) => {
      //Group n squares by row
      const row = Math.floor(i / numberOfSquaresRow)
      return waffleHeight - 2 * squareSize - (row * squareSize + row * gap)
    })
    .attr('x', function (d, i) {
      const col = i % numberOfSquaresRow
      return col * squareSize + col * gap
    })
    .attr('font-size', squareSize)
    .attr('dominant-baseline', 'central')
    .attr('text-anchor', 'middle')
    .attr('fill', 'var(--color-catagory-gray-foreground)')
    .on('mouseover', (e, d) => {
      console.log(d)
    })
}
