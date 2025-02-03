// Shuffle the letters of 'different' in title
shuffleLetters(document.querySelector('.shuffle-letters'), {
  iterations: 3,
  fps: 10,
})

// Slow down the background video
document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('background-video')
  video.playbackRate = 0.8 // Set the playback speed to 1.5x
})

// Typewriter effect for the subtitle
let typewriter = new Typewriter('#typewriter', {
  // loop: true,
  delay: 75,
})

typewriter
  .pauseFor(2000)
  .typeString('But what does the data actually say?')
  .start()
