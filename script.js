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
let favorites = [];
//get length
let length = $(".pokemons50, .pokemons100, .pokemons150").click(
  $(this).data("value")
);
$(".pokemons50, .pokemons100, .pokemons150").click(function () {
  length = $(this).data("value");
  getPokemons();
});
//fetching pokemons

for (let i = 0; i < length; i++) {
  $(`.favorite1${i}`).click(function () {
    console.log("success");
  });
}

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
// getPokemons();
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
      console.log("pokemon");
      console.log(pokemon);
      displayPokemons(pokemon);
    });
  });
});
// dispay pokemons

const displayPokemons = (pokemon) => {
  pokedex.html("");

  const p = JSON.parse(localStorage.getItem("pokemons"));
  console.log("p[0][0].id");
  console.log(p[0][0].id);
  for (let i = 0; i < pokemon.length; i++) {
    for (let j = i; j < pokemon.length; j++) {
      if (pokemon[i].id != p[j][0].id) {
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
      } else {
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
          <p class ="p${poke.id}"><i class="fas fa-check-square"></i> <a onClick="DisplayFavouritePokemons();" href="./favourites.html">Added to favourites</a></p>
          </div>
        
          </li>
          
          `
          )
          .join("");
        pokedex.html(htmlCode);
      }
    }
  }
};

//display favourite pokemons
const DisplayFavouritePokemons = () => {
  const pokemon = JSON.parse(localStorage.getItem("pokemons"));
  let velicina = pokemon.length - 1;
  console.log(pokemon);
  pokedexFavorite.html("");
  const htmlCode = pokemon[velicina]
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
DisplayFavouritePokemons();
//Add favourite pokemons
let addToFav = (value) => {
  Promise.all(pokemons).then((result) => {
    const pokemon = result.map((res) => ({
      name: res.name,
      id: res.id,
      image: res.sprites["front_default"],
      type: res.types.map((type) => type.type.name).join(", "),
      items: res.held_items.map((item) => item.item.name).join(", "),
    }));
    favorites.push(pokemon[parseInt(value)]);
    saveFavouritePokemons(favorites);
    console.log("favorites");
    $(`.p${value}`).html(
      '<i class="fas fa-check-square"></i> <a onClick="DisplayFavouritePokemons();" href="./favourites.html">Added to favourites</a>'
    );
  });

  console.log(favorites);
};
function saveFavouritePokemons(pokemon) {
  let pokemons;
  if (localStorage.getItem("pokemons") === null) {
    pokemons = [];
  } else {
    pokemons = JSON.parse(localStorage.getItem("pokemons"));
  }
  console.log(typeof pokemons);
  pokemons.push(pokemon);
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
}
