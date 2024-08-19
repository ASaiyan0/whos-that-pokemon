import { pokeName, getGen } from "./helpers.js";

window.addEventListener("load", () => {
  const button = document.getElementsByClassName("button");
  const hintBox = document.getElementsByClassName("stbox");
  const pokeImg = document.getElementsByTagName("img")[1];
  const name = document.getElementById("name");
  const guessBox = document.getElementById("guess");
  const numRight = document.getElementById("right");
  const numWrong = document.getElementById("wrong");
  const datalist = document.getElementById("pokeList");
  let num = 0;
  let hintCount = 0;
  let userGuess = "";
  let rightGuesses = 0;
  let wrongGuesses = 0;
  randomPoke();
  autoFill();

  function autoFill() {
    for (let n = 1; n <= 1025; n++) {
      let option = document.createElement("option");
      option.value = pokeName[n];
      datalist.appendChild(option);
    }
  }

  function checkAnswer() {
    if (userGuess == "") {
      return;
    } else if (userGuess == pokeName[num]) {
      whosThat();
      revealName();
      revealAllHints();
      rightGuesses++;
      numRight.textContent = "Right Guesses: " + rightGuesses;
      button[2].textContent = "Next Pokémon";
    } else if (userGuess != pokeName[num]) {
      getHint();
      name.textContent = "Try again.";
      wrongGuesses++;
      numWrong.textContent = "Wrong Guesses: " + wrongGuesses;
    }
  }

  function getHint() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${num}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        if (hintCount == 0) {
          let type1 = titleCase(jsonResponse.types[0].type.name);
          hintBox[0].textContent = `Type 1: ${type1}`;
          hintCount++;
        } else if (hintCount == 1) {
          if (jsonResponse.types.length == 2) {
            let type2 = titleCase(jsonResponse.types[1].type.name);
            hintBox[1].textContent = `Type 2: ${type2}`;
            hintCount++;
          } else {
            hintBox[1].textContent = `Type 2: None`;
            hintCount++;
          }
        } else if (hintCount == 2) {
          let height = jsonResponse.height / 10;
          hintBox[3].textContent = `Height: ${height}m`;
          hintCount++;
        } else if (hintCount == 3) {
          let weight = jsonResponse.weight / 10;
          hintBox[4].textContent = `Weight: ${weight}kg`;
          hintCount++;
        } else if (hintCount == 4) {
          hintBox[2].textContent = getGen(num);
          hintCount++;
        } else if (hintCount == 5) {
          getSpecies();
          hintCount++;
        } else {
          return;
        }
      });
  }

  function getSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${num}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
          if (num <= 898) {
          hintBox[5].textContent = jsonResponse.genera[7].genus;
        } else if (num <= 905) {
          hintBox[5].textContent = jsonResponse.genera[5].genus;
        } else if (num <= 908) {
          hintBox[5].textContent = jsonResponse.genera[2].genus;
        }  else if (num <= 1010) {
          hintBox[5].textContent = jsonResponse.genera[3].genus;
        } else if (num <= 1017) {
          hintBox[5].textContent = jsonResponse.genera[0].genus;
        } else if (num <= 1025) {
          hintBox[5].textContent = jsonResponse.genera[1].genus;
        }
      });
  }

  function randomPoke() {
    num = Math.floor(Math.random() * 1025);
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${num}.png`;
    pokeImg.style.filter = "brightness(0%)";
  }

  function resetHints() {
    for (let n = 0; n <= 5; n++) {
      hintBox[n].textContent = "";
    }
    hintCount = 0;
  }

  function revealName() {
    name.textContent = "";
    let link = document.createElement("a");
    let linkText = document.createTextNode(`${pokeName[num]}`);
    link.appendChild(linkText);
    link.setAttribute(
      "href",
      `https://bulbapedia.bulbagarden.net/wiki/${pokeName[num]}_(Pok%C3%A9mon)`
    );
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    name.appendChild(link);
  }

  function revealAllHints() {
    for (let n = 0; n <= 5; n++) {
      hintCount = n;
      getHint();
    }
    hintCount = 0;
  }

  function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function whosThat() {
    if (pokeImg.style.filter == "brightness(0%)") {
      pokeImg.style.filter = "brightness(100%)";
    } else {
      pokeImg.style.filter = "brightness(0%)";
    }
  }

  button[0].addEventListener("click", () => {
    userGuess = guessBox.value;
    guessBox.value = "";
    checkAnswer();
  });

  button[1].addEventListener("click", () => {
    getHint();
  });

  button[2].addEventListener("click", () => {
    if (button[2].textContent == "Give Up") {
      whosThat();
      revealName();
      revealAllHints();
      wrongGuesses++;
      numWrong.textContent = "Wrong Guesses: " + wrongGuesses;
      button[2].textContent = "Next Pokémon";
    } else if (button[2].textContent == "Next Pokémon") {
      whosThat();
      randomPoke();
      name.innerHTML = "???";
      resetHints();
      button[2].textContent = "Give Up";
    }
  });

  pokeImg.addEventListener("click", () => {
    let audio = new Audio(
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${num}.ogg`
    );
    audio.play();
  });
});
