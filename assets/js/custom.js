// LD11 - kontaktų forma

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");
const fields = form.querySelectorAll("input");
const phone = document.getElementById("phone");
const clearBtn = document.getElementById("clearBtn");

// Papildoma 1: grąžina klaidos tekstą arba "", jei laukas geras
function getError(field) {
  const value = field.value.trim();

  if (value === "") {
    return "Laukas negali būti tuščias";
  }
  if ((field.id === "firstName" || field.id === "lastName") && !/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)) {
    return "Galima naudoti tik raides";
  }
  if (field.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Neteisingas el. pašto formatas";
  }
  if (field.id === "phone" && !/^\+370 6\d{2} \d{5}$/.test(value)) {
    return "Numeris turi būti +370 6xx xxxxx";
  }
  if (field.type === "number" && (value < 1 || value > 10)) {
    return "Vertė turi būti nuo 1 iki 10";
  }
  return "";
}

// raudonas rėmelis ir klaidos tekstas po lauku
function showError(field) {
  const message = getError(field);
  field.classList.toggle("is-invalid", message !== "");
  field.nextElementSibling.textContent = message;
}

// Papildoma 2: telefono formatas +370 6xx xxxxx ("+370 6" jau įrašyta lauke)
phone.addEventListener("input", function () {
  const digits = phone.value.replace(/\D/g, "").slice(4, 11);

  if (digits.length <= 2) {
    phone.value = "+370 6" + digits;
  } else {
    phone.value = "+370 6" + digits.slice(0, 2) + " " + digits.slice(2);
  }
});

// 6 punktas: "Siųsti" aktyvus tik kai visi laukai užpildyti ir be klaidų
form.addEventListener("input", function (event) {
  showError(event.target);

  let allValid = true;
  fields.forEach(function (field) {
    if (getError(field) !== "") {
      allValid = false;
    }
  });
  submitBtn.disabled = !allValid;
});

// Papildoma 3: "Išvalyti" grąžina formą į pradinę būseną
clearBtn.addEventListener("click", function () {
  form.reset();
  result.innerHTML = "";
  fields.forEach(function (field) {
    field.classList.remove("is-invalid");
    field.nextElementSibling.textContent = "";
  });
  submitBtn.disabled = true;
});

// 4 ir 5 punktai: paspaudus "Siųsti"
form.addEventListener("submit", function (event) {
  event.preventDefault(); // puslapis neperkraunamas

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    q1: Number(document.getElementById("q1").value),
    q2: Number(document.getElementById("q2").value),
    q3: Number(document.getElementById("q3").value)
  };

  console.log(data);

  const average = (data.q1 + data.q2 + data.q3) / 3;

  result.innerHTML =
    "<h4>Pateikti duomenys</h4>" +
    "Vardas: " + data.firstName + "<br>" +
    "Pavardė: " + data.lastName + "<br>" +
    "El. paštas: " + data.email + "<br>" +
    "Tel. numeris: " + data.phone + "<br>" +
    "Adresas: " + data.address + "<br>" +
    "Dizainas: " + data.q1 + "<br>" +
    "Informacijos paieška: " + data.q2 + "<br>" +
    "Rekomendacija: " + data.q3 + "<br><br>" +
    "<strong>" + data.firstName + " " + data.lastName + ": " + average.toFixed(1) + "</strong>";
});
