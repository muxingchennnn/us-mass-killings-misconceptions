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
  console.log(schoolData)

  const margin = { top: 10, left: 10, right: 10, bottom: 10 }
  const numberOfSquaresRow = 15
  const numberOfSquaresCol = Math.ceil(schoolData.length / numberOfSquaresRow)
  const squareSize = Math.min(
    (height - margin.top - margin.bottom) /
      (Math.ceil(overallData.length / numberOfSquaresRow) + 2),
    (width - margin.left - margin.right) / (numberOfSquaresRow * 4 + 3)
  )

  console.log(Math.ceil(publicData.length / numberOfSquaresRow))
  console.log(
    (height - margin.top - margin.bottom) /
      Math.ceil(publicData.length / numberOfSquaresRow)
  )
  console.log(
    (width - margin.left - margin.right) / (numberOfSquaresRow * 4 + 3)
  )
  const gap = 0
  const gapBetweenSections = squareSize * 1

  const waffleWidth =
    squareSize * numberOfSquaresRow + numberOfSquaresRow * gap + squareSize
  const waffleHeight =
    squareSize * numberOfSquaresCol + numberOfSquaresCol * gap + squareSize

  const svg = d3
    .select('#viz')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0, 0, ${width}, ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .style('margin', '0 auto')

  // School Section
  const schoolSection = svg
    .append('g')
    .attr(
      'transform',
      `translate( ${margin.left}, ${height - margin.bottom - 2 * squareSize} )`
    )

  const schoolShade = schoolSection
    .append('g')
    .attr('class', 'rects')
    .selectAll('.rect')
    .data(schoolData)
    .join('rect')
    .attr('class', 'rect school-rect')
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
    .attr('fill', 'var(--color-catagory-yellow-background)')
    .attr('opacity', '0.2')
    .attr('stroke', 'var(--color-bg)')
    .attr('stroke-width', '4px')

  const schoolGrid = schoolSection
    .append('g')
    .attr('transform', `translate( ${squareSize / 2}, ${squareSize / 2} )`)
    .attr('class', 'icons')
    .selectAll('text')
    .data(schoolData)
    .join('text')
    .attr('class', 'weepeople')
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
    .attr('fill', 'var(--color-catagory-yellow-foreground)')
    .on('mouseover', (e, d) => {
      console.log(d)
    })

  // Public Section
  const publicSection = svg
    .append('g')
    .attr(
      'transform',
      `translate( ${
        margin.left + (gapBetweenSections + numberOfSquaresRow * squareSize)
      }, ${height - margin.bottom - 2 * squareSize} )`
    )

  const publicShade = publicSection
    .append('g')
    .attr('class', 'rects')
    .selectAll('.rect')
    .data(publicData)
    .join('rect')
    .attr('class', 'rect')
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
    .attr('fill', 'var(--color-catagory-blue-background)')
    .attr('opacity', '0.2')
    .attr('stroke', 'var(--color-bg)')
    .attr('stroke-width', '4px')

  const publicGrid = publicSection
    .append('g')
    .attr('transform', `translate( ${squareSize / 2}, ${squareSize / 2} )`)
    .attr('class', 'icons')
    .selectAll('text')
    .data(publicData)
    .join('text')
    .attr('class', 'weepeople')
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
    .attr('fill', 'var(--color-catagory-blue-foreground)')
    .on('mouseover', (e, d) => {
      console.log(d)
    })

  // Family Section
  const familySection = svg
    .append('g')
    .attr(
      'transform',
      `translate( ${
        margin.left + (gapBetweenSections + numberOfSquaresRow * squareSize) * 2
      }, ${height - margin.bottom - 2 * squareSize} )`
    )

  const familyShade = familySection
    .append('g')
    .attr('class', 'rects')
    .selectAll('.rect')
    .data(familyData)
    .join('rect')
    .attr('class', 'rect')
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
    .attr('fill', 'var(--color-catagory-green-background)')
    .attr('opacity', '0.2')
    .attr('stroke', 'var(--color-bg)')
    .attr('stroke-width', '4px')

  const familyGrid = familySection
    .append('g')
    .attr('transform', `translate( ${squareSize / 2}, ${squareSize / 2} )`)
    .attr('class', 'icons')
    .selectAll('text')
    .data(familyData)
    .join('text')
    .attr('class', 'weepeople')
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
    .attr('fill', 'var(--color-catagory-green-foreground)')
    .on('mouseover', (e, d) => {
      console.log(d)
    })

  // Overall Section
  const overallSection = svg
    .append('g')
    .attr(
      'transform',
      `translate( ${
        margin.left + (gapBetweenSections + numberOfSquaresRow * squareSize) * 3
      }, ${height - margin.bottom - 2 * squareSize} )`
    )

  const overallShade = overallSection
    .append('g')
    .attr('class', 'rects')
    .selectAll('.rect')
    .data(overallData)
    .join('rect')
    .attr('class', 'rect')
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
    .attr('fill', 'var(--color-catagory-orange-background)')
    .attr('opacity', '0.2')
    .attr('stroke', 'var(--color-bg)')
    .attr('stroke-width', '4px')

  const overallGrid = overallSection
    .append('g')
    .attr('transform', `translate( ${squareSize / 2}, ${squareSize / 2} )`)
    .attr('class', 'icons')
    .selectAll('text')
    .data(overallData)
    .join('text')
    .attr('class', 'weepeople')
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
    .attr('fill', (d, i) => {
      return i < 10
        ? 'var(--color-catagory-orange-foreground)'
        : 'var(--color-catagory-blue-background)'
    })
    .on('mouseover', (e, d) => {
      console.log(d)
    })
})
