// Selectors
var main_card = document.getElementById('main_card')
var counter = document.getElementById("counter")
var settings_panel = document.getElementById("settings-panel")
var cog = document.getElementById("settings")
var winner_audio = document.getElementById("winner")
var loser_audio = document.getElementById("loser")
var right_cards = document.getElementsByClassName("right-cards")
var backdrop = document.getElementById("backdrop")
var body = document.querySelector("body")
var timercount = 0
var newFactorArray = []
var timer = document.getElementById("timer")
var instruction = "\n\n         ------------  READY?  ------------"


// Prevent direct entry of values into the counter and avoiding "cheating"
counter.onfocus = function(){
  this.disabled = true
}

// Disable the timer from being edited
timer.onfocus = function(){
  this.disabled = true
}

// Function to reset the state of the game - start another round or migrate away from the page
var flipCard = function(){
  for (var index = 0; index < right_cards.length; index++){
    if(parseInt(main_card.innerHTML) % parseInt(right_cards[index].innerHTML) === 0){
      right_cards[index].style.boxShadow = "15px 15px 15px orange"
      right_cards[index].style.webkitBoxShadow = "15px 15px 15px orange"
      right_cards[index].innerHTML = "Missed"
      right_cards[index].innerText = "Missed"
      right_cards[index].style.fontSize = "15px"
      newFactorArray.push(parseInt(right_cards[index].innerHTML))
    }
  }

  // Message to display the score and confirm if the player wants to play again
  if(confirm("Your raw score this round was: "
      + counter.value + "\n (Your grade is "
      + Math.round((counter.value/newFactorArray.length * 100))
      + "%.)") === true){
    if(counter.value !== 0){
      counter.value = 0
    }
    window.location.reload()
    main_card.innerHTML = Math.round(Math.random() * 2000)
  // If the player cancels the message box, they will be redirected to the index.php page
  }else{
    window.location.href = "home.html"
  }
}

// Timer setup and seconds ticker
var clock = function(){
  timer.value = (timercount = timercount + 1)
  timeticker.play()
  if(timercount > 20){
    timer.value = 0
  }
}

// Timing the duration of each round of the game
if(confirm(instruction) === true){
  counter.value = 0
  counter.style.color = "orange"
  main_card.style.color = "lightseagreen"
  main_card.innerHTML = Math.round(Math.random() * 2000)
  setInterval(clock, 1000)
  setInterval(flipCard, 20000)

}else{
  window.location.href = "home.html"
}

// Dealing with each element of the class "right-cards" when it is clicked
for (var index = 0; index < right_cards.length; index++)
{
  right_cards[index].onclick = function(){
    if(parseInt(main_card.innerHTML) % parseInt(this.innerHTML) === 0){
      this.style.boxShadow = "5px 5px 5px green"
      this.style.webkitBoxShadow = "5px 5px 5px green"
      winner_audio.play()
      this.onmouseout = function(){
        this.style.boxShadow = ""
      }
      this.style.visibility = "hidden"
      counter.value = parseInt(counter.value) + 1

    }else{
      this.style.boxShadow = "5px 5px 5px red"
      this.style.webkitBoxShadow = "5px 5px 5px red"
      loser_audio.play()
      this.onmouseout = function(){
        this.style.boxShadow = ""
      }
      counter.value = parseInt(counter.value) - 1
    }
  }
}

// Change the background theme of the game
var backdrop_change = function(){
  if(backdrop.value === "Wooden Table"){
    body.style.backgroundImage = "url('images/hardwood.png')"
  }else if(backdrop.value === "Green Table"){
    body.style.backgroundImage = "url('images/green_table.png')"
  }else{
    body.style.backgroundImage = "url('images/dark_table.png')"
  }
}

setInterval(backdrop_change, 500)
