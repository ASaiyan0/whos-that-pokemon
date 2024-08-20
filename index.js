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

  async function getHint() {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${num}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then(async (jsonResponse) => {
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
          hintBox[5].textContent = await getSpecies();
          hintCount++;
        } else {
          return;
        }
      });
  }

  async function getSpecies() {
    return await fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}/`)
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
        let species = jsonResponse.genera.find(
          (species) => species.language.name == "en"
        );
        return species.genus;
      });
  }

  function randomPoke() {
    num = Math.floor(Math.random() * 1025) + 1;
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

  async function revealAllHints() {
    for (let n = 0; n <= 5; n++) {
      hintCount = n;
      await getHint();
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
    if (name.textContent == "???" || name.textContent == "Try again.") {
      userGuess = guessBox.value;
      guessBox.value = "";
      checkAnswer();
    } else {
      return;
    }
  });

  button[1].addEventListener("click", async () => {
    await getHint();
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
