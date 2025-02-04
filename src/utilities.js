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

// Randomize the letters shown in the visualization
const letters =
  'a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(
    ' '
  )

export function randomLetter() {
  const i = Math.floor(Math.random() * letters.length)
  return letters[i]
}
