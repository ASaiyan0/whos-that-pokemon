import { nameArray } from "./nameArray.js";
import { Pokemon } from "./Pokemon.js";
export class Game {
  constructor() {
    this.pokemon = new Pokemon(1025);

    this.hintCount = 0;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.userGuess = "";

    this.datalist = document.getElementById("pokeList");
    this.displayedName = document.getElementById("name");
    this.inputBox = document.getElementById("inputBox");
    this.pokemonImage = document.getElementsByTagName("img")[1];

    this.correctGuesses = document.getElementById("correct");
    this.wrongGuesses = document.getElementById("wrong");

    this.form = document.getElementById("form");
    this.hintButton = document.getElementById("hint");
    this.quitNextButton = document.getElementById("quitNext");
    this.submitButton = document.getElementById("submit");

    this.type1Hint = document.getElementById("hint1");
    this.type2Hint = document.getElementById("hint2");
    this.heightHint = document.getElementById("hint3");
    this.weightHint = document.getElementById("hint4");
    this.generationHint = document.getElementById("hint5");
    this.speciesHint = document.getElementById("hint6");

    this.newPokemon(this.randomNum());
    this.populateAutofill();

    this.hintButton.addEventListener("click", () => {
      this.getHint();
    });

    this.pokemonImage.addEventListener("click", () => {
      let audio = new Audio(this.pokemon.getAudioUrl());
      audio.play();
    });

    this.quitNextButton.addEventListener("click", () => {
      if (this.quitNextButton.textContent == "Give Up") {
        this.pokemonImage.style.filter = "brightness(100%)";
        this.revealName();
        this.revealAllHints();
        this.numWrong++;
        this.wrongGuesses.textContent = "Wrong Guesses: " + this.numWrong;
        this.quitNextButton.textContent = "Next Pokémon";
      } else if (this.quitNextButton.textContent == "Next Pokémon") {
        this.newPokemon(this.randomNum());
        this.quitNextButton.textContent = "Give Up";
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        this.displayedName.textContent == "???" ||
        this.displayedName.textContent == "Try again."
      ) {
        this.userGuess = this.inputBox.value;
        this.inputBox.value = "";
        this.checkAnswer();
      } else {
        return;
      }
    });
  }

  async getHint() {
    if (this.hintCount == 0) {
      this.type1Hint.innerText = await this.pokemon.getType1();
      this.hintCount++;
    } else if (this.hintCount == 1) {
      this.type2Hint.innerText = await this.pokemon.getType2();
      this.hintCount++;
    } else if (this.hintCount == 2) {
      this.heightHint.innerText = await this.pokemon.getHeight();
      this.hintCount++;
    } else if (this.hintCount == 3) {
      this.weightHint.innerText = await this.pokemon.getWeight();
      this.hintCount++;
    } else if (this.hintCount == 4) {
      this.generationHint.innerText = this.pokemon.getGeneration();
      this.hintCount++;
    } else if (this.hintCount == 5) {
      this.speciesHint.innerText = await this.pokemon.getSpecies();
      this.hintCount++;
    } else {
      return;
    }
  }

  checkAnswer() {
    if (this.userGuess == "") {
      return;
    } else if (this.userGuess == this.pokemon.name) {
      this.pokemonImage.style.filter = "brightness(100%)";
      this.revealName();
      this.revealAllHints();
      this.numCorrect++;
      this.correctGuesses.textContent = "Correct Guesses: " + this.numCorrect;
      this.quitNextButton.textContent = "Next Pokémon";
    } else if (this.userGuess != this.pokemon.name) {
      this.getHint();
      this.displayedName.textContent = "Try again.";
      this.numWrong++;
      this.wrongGuesses.textContent = "Wrong Guesses: " + this.numWrong;
    }
  }

  newPokemon() {
    this.pokemon = new Pokemon(this.randomNum());
    this.pokemonImage.src = this.pokemon.getImageUrl();
    this.pokemonImage.style.filter = "brightness(0%)";
    this.displayedName.innerHTML = "???";

    this.type1Hint.innerText = "";
    this.type2Hint.innerText = "";
    this.heightHint.innerText = "";
    this.weightHint.innerText = "";
    this.generationHint.innerText = "";
    this.speciesHint.innerText = "";
    this.hintCount = 0;
  }

  populateAutofill() {
    for (let n = 1; n <= 1025; n++) {
      let option = document.createElement("option");
      option.value = nameArray[n];
      this.datalist.appendChild(option);
    }
  }

  randomNum() {
    return Math.floor(Math.random() * 1025) + 1;
  }

 async revealAllHints() {
    for (let n = 0; n <= 5; n++) {
      this.hintCount = n;
      await this.getHint();
    }
    this.hintCount = 0;
  }

  revealName() {
    this.displayedName.textContent = "";
    let link = document.createElement("a");
    let linkText = document.createTextNode(`${this.pokemon.name}`);
    link.appendChild(linkText);
    link.setAttribute("href", this.pokemon.getBulbapediaLink());
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    this.displayedName.appendChild(link);
  }
}
