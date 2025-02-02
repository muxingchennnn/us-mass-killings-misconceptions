import { randomLetter } from './randomLetter.js'

const width = window.innerWidth
const height = window.innerHeight

d3.csv('../dataset/mass_killing_incidents.csv').then((data) => {
  data.forEach(function (d) {
    d.date = +d.date.split('-')[0]
    d.num_victims_killed = +d.num_victims_killed
  })

  const schoolData = data.filter((d) => d.location_type === 'School/College')
  const publicData = data.filter((d) => d.type === 'Public')
  const familyData = data.filter((d) => d.type === 'Family')
  const overallData = data
  console.log(data)
  console.log(
    schoolData.length,
    publicData.length,
    familyData.length,
    overallData.length
  )

  const margin = { top: 10, left: 10, right: 10, bottom: 10 }
  const numberOfSquaresRow = 20
  const numberOfSquaresCol = Math.ceil(overallData.length / numberOfSquaresRow)
  const squareSize = Math.min(
    (height - margin.top - margin.bottom) /
      (Math.ceil(overallData.length / numberOfSquaresRow) + 2),
    (width - margin.left - margin.right) / (numberOfSquaresRow + 2)
  )
  const gap = 0
  // const gapBetweenSections = squareSize * 1

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

  // School Section
  const schoolSection = svg
    .append('g')
    .attr('transform', `translate( ${margin.left}, ${margin.top} )`)

  const schoolShade = schoolSection
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

  const schoolGrid = schoolSection
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
})
