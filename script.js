//Nav animation
const navSlide = () => {
  const burger = $(".burger");
  const nav = $(".nav-links");

  burger.click(() => {
    nav.toggleClass("nav-active");

    burger.toggleClass("burger-anim");
  });
};
navSlide();

const pokeSlide = () => {
  const poke = $(".view-poke");
  const pokemon = $(".poke");
  pokemon.click(() => {
    poke.toggleClass("view-poke-slide");
  });
};
pokeSlide();
//velicina main sekcije
// const size = window.outerWidth;
// $(document).ready(function () {
//   $("main").css("width", size);
// });
//SIGN UP SHOW
const popup = $(".popup");
const register = $(".register");
$(document).ready(function () {
  $(".signup, .link-reg").click(function () {
    login.css("display", "none");
    popup.css("display", "flex");
    register.css("display", "flex");
  });
});
//SIGN UP CLOSE
$(".close-reg").click(function () {
  popup.css("display", "none");
  register.css("display", "none");
});

//SIGN IN SHOW

const login = $(".login");
$(document).ready(function () {
  $(".signin, .signin-link").click(function () {
    register.css("display", "none");
    popup.css("display", "flex");
    login.css("display", "flex");
  });
});
//SIGN IN CLOSE
$(".close-log").click(function () {
  popup.css("display", "none");
  login.css("display", "none");
});
//FORM VALIDATION
$(function () {
  $("#dtmrodj").datepicker();
});
const passValidate = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
);

const emailValidate = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
//validation of register form
$(".btn-reg").click(function () {
  let fname = $(".fname").val();
  let lname = $(".lname").val();
  let dtmrodj = $("#dtmrodj").datepicker("getDate");
  let email = $(".email-reg").val();
  let pass = $(".pass-reg").val();
  let cpass = $(".cpass").val();
  let brojac = 0;
  if (
    fname == "" &&
    lname == "" &&
    dtmrodj == null &&
    email == "" &&
    pass == "" &&
    cpass == ""
  ) {
    $(".labels label").css("border", "1px solid red");
    brojac++;
  } else {
    //ime
    if (fname != "") $(".label-fname").css("border", "transparent");
    else {
      $(".label-fname").css("border", "1px solid red");
      brojac++;
    }
    //prezime
    if (lname != "") $(".label-lname").css("border", "transparent");
    else {
      $(".label-lname").css("border", "1px solid red");
      brojac++;
    }
    //dtmrodj
    if (dtmrodj != "") $(".label-date").css("border", "transparent");
    else {
      $(".label-date").css("border", "1px solid red");
      brojac++;
    }
    //email
    if (email != "" && emailValidate.test(email))
      $(".label-email").css("border", "transparent");
    else {
      $(".label-email").css("border", "1px solid red");
      brojac++;
    }
    //password
    if (pass != "" && passValidate.test(pass))
      $(".label-pass").css("border", "transparent");
    else {
      {
        $(".label-pass").css("border", "1px solid red");
        brojac++;
      }
      alert(
        "Vaša lozinka mora da sadrzi najmanje 6 karaktera(brojeve, velika i mala slova i najmanje 1 specijalni karakter)!"
      );
    }
    //confirm password
    if (cpass != "" && cpass === pass)
      $(".label-cpass").css("border", "transparent");
    else {
      $(".label-cpass").css("border", "1px solid red");
      brojac++;
    }
  }
  if (brojac === 0) {
    popup.css("display", "none");
    register.css("display", "none");
    await;
    alert("You are registered");
  }
});
//validation of login form
$(".btn-log").click(function () {
  let emailLog = $(".email").val();
  let passLog = $(".pass").val();

  let brojac = 0;
  if (emailLog == "" && passLog == "") {
    $(".labels label").css("border", "1px solid red");
    brojac++;
  } else {
    //email
    if (emailLog != "" && emailValidate.test(emailLog))
      $(".label-email").css("border", "transparent");
    else {
      $(".label-email").css("border", "1px solid red");
      brojac++;
    }
    //password
    if (passLog != "" && passValidate.test(passLog))
      $(".label-pass").css("border", "transparent");
    else {
      $(".label-pass").css("border", "1px solid red");
      brojac++;
    }
  }
  if (brojac === 0) alert("You are logged in!");
});
//POKEMONS VARIABLES
const pokedex = $("#pokedex");
const pokedexFavorite = $("#pokedex-favorite");
let pokemons = [];
//get length
let length = $(".pokemons50, .pokemons100, .pokemons150").click(
  $(this).data("value")
);
$(".pokemons50, .pokemons100, .pokemons150").click(function () {
  length = $(this).data("value");
  getPokemons();
});
//fetching pokemons

const getPokemons = () => {
  pokemons = [];
  for (let i = 1; i <= length; i++) {
    pokemons.push(
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${i}`,
        type: "GET",
      })
    );
  }
};
//save pokemons in local storage
function savePokemon(pokemon) {
  let id;
  let name;
  let image;
  let type;
  let items;
  if (localStorage.getItem("id") === null) {
    id = [];
  } else {
    id = JSON.parse(localStorage.getItem("id"));
  }
  //name
  if (localStorage.getItem("name") === null) {
    name = [];
  } else {
    name = JSON.parse(localStorage.getItem("name"));
  }
  //image
  if (localStorage.getItem("image") === null) {
    image = [];
  } else {
    image = JSON.parse(localStorage.getItem("image"));
  }
  //type
  if (localStorage.getItem("type") === null) {
    type = [];
  } else {
    type = JSON.parse(localStorage.getItem("type"));
  }
  //items
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  id.push(pokemon.id);
  localStorage.setItem("id", JSON.stringify(id));
  name.push(pokemon.name);
  localStorage.setItem("name", JSON.stringify(name));
  image.push(pokemon.image);
  localStorage.setItem("image", JSON.stringify(image));
  type.push(pokemon.type);
  localStorage.setItem("type", JSON.stringify(type));
  items.push(pokemon.items);
  localStorage.setItem("items", JSON.stringify(items));
}
//get pokemons from local storage
function getpokemonFromLocal(pokemon) {}

$(document).ready(function () {
  $(".pokemons50, .pokemons100, .pokemons150").click(function () {
    $(".view-poke").toggleClass("view-poke-slide");
    Promise.all(pokemons).then((result) => {
      const pokemon = result.map((res) => ({
        name: res.name,
        id: res.id,
        image: res.sprites["front_default"],
        type: res.types.map((type) => type.type.name).join(", "),
        items: res.held_items.map((item) => item.item.name).join(", "),
      }));
      // console.log(pokemon);
      localStorage.clear();
      pokemon.forEach(function (pokeman) {
        savePokemon(pokeman);
      });
      displayPokemons(pokemon);
    });
  });
});
// dispay pokemons

const displayPokemons = (pokemon) => {
  pokedex.html("");

  const htmlCode = pokemon
    .map(
      (poke) =>
        `
          <li class ="card">
          <img src="${poke.image}">
          <div style="margin-left:20px">
          <h2 class="card-title">Name: ${poke.name}</h2>
          <h3>Id: ${poke.id}</h2>
          <p class="card-desc">Type: ${poke.type}</p>
          <p class="card-desc">Items: ${poke.items}</p>
          <p class ="p${poke.id}"><button value=${poke.id} style ="width:100%;" onClick="addToFav(value);" class = "favorite${poke.id} btn"><i class="fas fa-heart"></i>  Add to favourites</button></p>
          </div
        
          </li>
          
          `
    )
    .join("");
  pokedex.html(htmlCode);
};

//display favourite pokemons
const DisplayFavouritePokemons = () => {
  let id;
  let name;
  let image;
  let type;
  let items;
  let velicina;
  const pokemon = [];
  if (localStorage.getItem("idf") == null) {
    id = [];
    name = [];
    image = [];
    type = [];
    items = [];
    velicina = 0;
  } else {
    id = JSON.parse(localStorage.getItem("idf"));
    name = JSON.parse(localStorage.getItem("namef"));
    image = JSON.parse(localStorage.getItem("imagef"));
    type = JSON.parse(localStorage.getItem("typef"));
    items = JSON.parse(localStorage.getItem("itemsf"));
    velicina = id.length;
    for (let i = 0; i < velicina; i++) {
      pokemon[i] = {
        name: name[i],
        id: id[i],
        image: image[i],
        type: type[i],
        items: items[i],
      };
    }
  }

  // console.log(velicina);
  // console.log(id);
  pokedexFavorite.html("");
  const htmlCode = pokemon
    .map(
      (poke) => `
<li class ="card">
<img src="${poke.image}">
<div style="margin-left:20px">
<h2 class="card-title">Name: ${poke.name}</h2>
<h3>Id: ${poke.id}</h2>
<p class="card-desc">Type: ${poke.type}</p>
<p class="card-desc">Items: ${poke.items}</p>
<p class ="pRemove${poke.id}"><button value=${poke.id} style ="width:100%;" onClick="removeFromFav(value);" class = "remove${poke.id} btn"><i class="fas fa-trash-alt"></i>  Remove from favourites</button></p>
</div

</li>

`
    )
    .join("");

  pokedexFavorite.html(htmlCode);
};
$("a").click(DisplayFavouritePokemons());

//Add favourite pokemons
const addToFav = (value) => {
  console.log(value);
  Promise.all(pokemons).then((result) => {
    const pokemon = result.map((res) => ({
      name: res.name,
      id: res.id,
      image: res.sprites["front_default"],
      type: res.types.map((type) => type.type.name).join(", "),
      items: res.held_items.map((item) => item.item.name).join(", "),
    }));
    const index = parseInt(value - 1);
    saveFavouritePokemons(pokemon[index]);
    $(`.p${value}`).html(
      '<i class="fas fa-check-square"></i> <a onClick="DisplayFavouritePokemons()" href="./favourites.html">Added to favourites</a>'
    );
  });
};

//save favourite pokemons

function saveFavouritePokemons(pokemon) {
  let id;
  let name;
  let image;
  let type;
  let items;
  if (localStorage.getItem("idf") === null) {
    id = [];
  } else {
    id = JSON.parse(localStorage.getItem("idf"));
  }
  //name
  if (localStorage.getItem("namef") === null) {
    name = [];
  } else {
    name = JSON.parse(localStorage.getItem("namef"));
  }
  //image
  if (localStorage.getItem("imagef") === null) {
    image = [];
  } else {
    image = JSON.parse(localStorage.getItem("imagef"));
  }
  //type
  if (localStorage.getItem("typef") === null) {
    type = [];
  } else {
    type = JSON.parse(localStorage.getItem("typef"));
  }
  //items
  if (localStorage.getItem("itemsf") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("itemsf"));
  }
  id.push(pokemon.id);
  localStorage.setItem("idf", JSON.stringify(id));
  name.push(pokemon.name);
  localStorage.setItem("namef", JSON.stringify(name));
  image.push(pokemon.image);
  localStorage.setItem("imagef", JSON.stringify(image));
  type.push(pokemon.type);
  localStorage.setItem("typef", JSON.stringify(type));
  items.push(pokemon.items);
  localStorage.setItem("itemsf", JSON.stringify(items));
}

function removeFromFav(value) {
  let id;
  let name;
  let image;
  let type;
  let items;
  if (localStorage.getItem("idf") === null) {
    id = [];
  } else {
    id = JSON.parse(localStorage.getItem("idf"));
  }
  //name
  if (localStorage.getItem("namef") === null) {
    name = [];
  } else {
    name = JSON.parse(localStorage.getItem("namef"));
  }
  //image
  if (localStorage.getItem("imagef") === null) {
    image = [];
  } else {
    image = JSON.parse(localStorage.getItem("imagef"));
  }
  //type
  if (localStorage.getItem("typef") === null) {
    type = [];
  } else {
    type = JSON.parse(localStorage.getItem("typef"));
  }
  //items
  if (localStorage.getItem("itemsf") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("itemsf"));
  }
  let index;
  for (let i = 0; i < id.length; i++) {
    if (id[i] == value) {
      index = i;
      break;
    }
  }
  console.log("index");
  console.log(index);
  id.splice(index, 1);
  localStorage.setItem("idf", JSON.stringify(id));
  name.splice(index, 1);
  localStorage.setItem("namef", JSON.stringify(name));
  image.splice(index, 1);
  localStorage.setItem("imagef", JSON.stringify(image));
  type.splice(index, 1);
  localStorage.setItem("typef", JSON.stringify(type));
  items.splice(index, 1);
  localStorage.setItem("itemsf", JSON.stringify(items));
  DisplayFavouritePokemons();
}
