let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

guessBtn.addEventListener('click', function (e) {
  let guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Por favor insira um número entre ${min} and ${max}`, 'red')
  }

  if (guess === winningNum) {
    gameOver(true, `${winningNum} está correto, VOCÊ VENCEU!`)
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false, `Jogo terminado, você perdeu. O número correto era ${winningNum}`)
    } else {
      guessInput.style.borderColor = 'red'
      guessInput.value = ''
      setMessage(`${guess} não está correto, ${guessesLeft} tentativas restantes.`, 'red')
    }
  }
})

function gameOver(won, msg) {
  const color = won === true ? 'green' : 'red '
  guessInput.disabled = true;
  guessInput.style.borderColor = color
  setMessage(msg, color)

  guessBtn.value = 'Jogar de novo?'
  guessBtn.className += 'play-again'
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}