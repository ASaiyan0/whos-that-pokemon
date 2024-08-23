import { nameArray } from "./nameArray.js";
export class Pokemon {
  constructor(pokedexNum) {
    this.pokedexNum = pokedexNum;
    this.name = nameArray[pokedexNum];
  }

  async getHeight() {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokedexNum}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${this.pokedexNum}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then(async (jsonResponse) => {
        let height = jsonResponse.height / 10;
        return `Height: ${height} m`;
      });
  }

  async getSpecies() {
    return await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${this.pokedexNum}/`
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${this.pokedexNum}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then((jsonResponse) => {
        let species = jsonResponse.genera.find(
          (species) => species.language.name == "en"
        );
        return `${species.genus}`;
      });
  }

  async getType1() {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokedexNum}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${this.pokedexNum}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then(async (jsonResponse) => {
        let type1 = jsonResponse.types[0].type.name;
        type1 = type1.charAt(0).toUpperCase() + type1.slice(1);
        return `Type 1: ${type1}`;
      });
  }

  async getType2() {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokedexNum}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${this.pokedexNum}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then(async (jsonResponse) => {
        if (jsonResponse.types.length == 2) {
          let type2 = jsonResponse.types[1].type.name;
          type2 = type2.charAt(0).toUpperCase() + type2.slice(1);
          return `Type 2: ${type2}`;
        } else {
          return `Type 2: None`;
        }
      });
  }

  async getWeight() {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokedexNum}/`)
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`API call failed for #${this.pokedexNum}}.`);
        },
        (networkError) => console.log(networkError.message)
      )
      .then(async (jsonResponse) => {
        let height = jsonResponse.weight / 10;
        return `Height: ${height} kg`;
      });
  }

  getAudioUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${this.pokedexNum}.ogg`;
  }

  getBulbapediaLink() {
    return `https://bulbapedia.bulbagarden.net/wiki/${this.name}_(Pok%C3%A9mon)`;
  }

  getGeneration() {
    if (this.pokedexNum <= 151) {
      return "Generation I";
    } else if (this.pokedexNum <= 251) {
      return "Generation II";
    } else if (this.pokedexNum <= 386) {
      return "Generation III";
    } else if (this.pokedexNum <= 493) {
      return "Generation IV";
    } else if (this.pokedexNum <= 649) {
      return "Generation V";
    } else if (this.pokedexNum <= 721) {
      return "Generation VI";
    } else if (this.pokedexNum <= 809) {
      return "Generation VII";
    } else if (this.pokedexNum <= 905) {
      return "Generation VIII";
    } else {
      return "Generation IX";
    }
  }

  getImageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokedexNum}.png`;
  }
}
