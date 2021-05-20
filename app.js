//Variables
const btnSubmit = document.getElementById("btn");
const selector = document.querySelector("#dino-compare");
const compare = document.getElementById("dino-compare");
const grid = document.getElementById("grid");

const data = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];
//Dinosaurs array
const dinos = [];
// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact, facts) {
    (this.species = species),
      (this.weight = weight),
      (this.height = height),
      (this.diet = diet),
      (this.where = where),
      (this.when = when),
      (this.fact = fact);
    this.facts = [];
  }
}
// Create Dino Objects
data.map((dino) => {
  dinos.push(
    new Dino(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact
    )
  );
});

// Create Human Object
const human = {};

// Use IIFE to get human data from form
document.addEventListener("DOMContentLoaded", () => {
  btnSubmit.addEventListener("click", function () {
    const formData = new FormData(selector);
    Name = formData.get("name");
    Inches = formData.get("feet * 12") + parseInt(formData.get("inches"));
    Weight = formData.get("weight");
    Diet = formData.get("diet");

    // On button click, prepare and display infographic
    TilesToDom();
  });
});

// Generate Tiles for each Dino in Array
class Tiles {
  constructor(dino) {
    (this.animal = dino.species), (this.dino = dino);
    this.image =
      "./images/" + dino.species.toLowerCase().split(" ").join(" ") + ".png";
  }
  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareHeight() {
    if (Inches < this.dino.height) {
      return `You are ${this.dino.height - Inches} inches shorter than the ${
        this.animal
      }.`;
    } else if (Inches > this.dino.height) {
      return `You are ${
        this.inches - this.dino.height
      } inches taller than the ${this.animal}.`;
    } else {
      return `You are equal in height`;
    }
  }
  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareName() {
    if (Name < this.dino.species) {
      return `Your name  is shorter than ${this.animal}.`;
    } else if (Name == this.dino.species) {
      return `Your name is equal with ${this.animal}.`;
    } else {
      return `Your name is ${Name.toLowerCase()} and the animal's name is ${
        this.animal
      }.`;
    }
  }
  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareWeight() {
    if (Weight < this.dino.weight) {
      const percentage = 100 - (Weight * 100) / this.dino.weight;
      return `You weigh ${percentage.toFixed(1)} % less than the ${
        this.animal
      }.`;
    } else if (Weight > this.dino.weight) {
      const percentage = (Weight * 100) / this.dino.weight;
      return `You weigh ${percentage.toFixed(1)} % more than the ${
        this.animal
      }.`;
    } else {
      return `You are equal in weight`;
    }
  }
}

tiles = [];

dinos.map((dino) => {
  tiles.push(new Tiles(dino));
});

// Add tiles to DOM

function TilesToDom() {
  tiles.splice(4, 0, { title: Name, image: "./images/human.png" });
  tiles.map((tile) => {
    // Check if the object is a human else setup the messages
    if (tile.title == Name) {
    } else {
     weightFact = tile.compareWeight.call(tile, human);
     heightFact = tile.compareHeight.call(tile, human);
     nameFact = tile.compareName.call(tile, human);
    }

    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const div = document.createElement("div");

    //Add elements to the DOM
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(img);

    //Add the right styling
    grid.appendChild(div).className = "grid-item";

    h3.textContent = tile.animal || tile.title;

    //Add the right content to the paragraph
    if (tile.title == Name){
        p.textContent = ""
    } else if (tile.animal == "Pigeon") {
      p.textContent = "All birds are dinosaurs";
    } else {
      switch (Math.floor(Math.random() * 2)) {
        case 0:
          p.textContent = nameFact;
          break;
        case 1:
          p.textContent = heightFact;
          break;
        case 2:
          p.textContent = weightFact;
          break;
        default:
          p.textContent = "dinosaurs are cool";
      }
    }
    //Add the image to the DOM
    img.src = tile.image;
  });
  //Remove form from DOM
  compare.style.display = "none";
}
