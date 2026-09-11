const themeLink = document.createElement("link");
themeLink.rel = "stylesheet";
themeLink.href = "theme.css?v=20260911-1";
document.head.appendChild(themeLink);

document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#15101f");

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function setupBirthDatePicker() {
  const oldInput = document.getElementById("birthDate");
  if (!oldInput) return;

  const label = document.querySelector('label[for="birthDate"]');
  if (label) {
    label.textContent = "Birth date";
    label.htmlFor = "birthMonth";
  }

  const picker = document.createElement("div");
  picker.className = "birthdate-picker";
  picker.setAttribute("role", "group");
  picker.setAttribute("aria-label", "Birth date: month, day and year");

  const monthSelect = document.createElement("select");
  monthSelect.id = "birthMonth";
  monthSelect.name = "bday-month";
  monthSelect.setAttribute("aria-label", "Birth month");
  monthSelect.innerHTML = `
    <option value="">Month</option>
    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
  `;

  const daySelect = document.createElement("select");
  daySelect.id = "birthDay";
  daySelect.name = "bday-day";
  daySelect.setAttribute("aria-label", "Birth day");
  daySelect.innerHTML = '<option value="">Day</option>';

  const yearSelect = document.createElement("select");
  yearSelect.id = "birthYear";
  yearSelect.name = "bday-year";
  yearSelect.setAttribute("aria-label", "Birth year");
  yearSelect.innerHTML = '<option value="">Year</option>';

  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year -= 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  }

  function updateDays() {
    const month = Number(monthSelect.value);
    const year = Number(yearSelect.value) || 2000;
    const previousDay = Number(daySelect.value);

    daySelect.innerHTML = '<option value="">Day</option>';

    const daysInMonth = month ? new Date(year, month, 0).getDate() : 31;
    for (let day = 1; day <= daysInMonth; day += 1) {
      const option = document.createElement("option");
      option.value = String(day);
      option.textContent = String(day);
      daySelect.appendChild(option);
    }

    if (previousDay && previousDay <= daysInMonth) {
      daySelect.value = String(previousDay);
    }
  }

  updateDays();
  monthSelect.addEventListener("change", updateDays);
  yearSelect.addEventListener("change", updateDays);

  picker.append(monthSelect, daySelect, yearSelect);
  oldInput.replaceWith(picker);

  const style = document.createElement("style");
  style.textContent = `
    .birthdate-picker {
      display: grid;
      grid-template-columns: 1.35fr .8fr 1fr;
      gap: 10px;
      margin-bottom: 14px;
    }

    .birthdate-picker select {
      width: 100%;
      height: 56px;
      padding: 0 38px 0 14px;
      border: 1px solid rgba(255,255,255,.13);
      border-radius: 14px;
      outline: none;
      color: #fff;
      background-color: #120d20;
      font: inherit;
      color-scheme: dark;
      appearance: auto;
    }

    .birthdate-picker select:focus {
      border-color: rgba(242,201,116,.55);
      box-shadow: 0 0 0 3px rgba(242,201,116,.08);
    }

    .result-calculation {
      margin: 10px auto 2px;
      color: #8f859e;
      font-size: 11px;
      line-height: 1.5;
    }

    @media (max-width: 440px) {
      .birthdate-picker {
        grid-template-columns: 1fr 1fr;
      }

      #birthYear {
        grid-column: 1 / -1;
      }
    }
  `;
  document.head.appendChild(style);
}

setupBirthDatePicker();

const vibrationMeaningsPromise = fetch("personal_vibrations_1-78.json?v=20260911-3", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("Unable to load vibration descriptions.");
    return response.json();
  })
  .catch((error) => {
    console.error(error);
    return {};
  });

function reduceNumber(value) {
  let n = Number(value);
  while (n > 9 && ![11, 22, 33].includes(n)) {
    n = String(n)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

// Exact Youmerology Life Path method:
// MONTH + DAY + each individual digit of the YEAR.
// Example: 4/27/1986 = 4 + 27 + 1 + 9 + 8 + 6 = 55, then 55 -> 10 -> 1.
function calculateLifePath(month, day, year) {
  const yearDigits = String(year).padStart(4, "0").split("").map(Number);
  const compound =
    Number(month) +
    Number(day) +
    yearDigits[0] +
    yearDigits[1] +
    yearDigits[2] +
    yearDigits[3];

  return {
    compound,
    root: reduceNumber(compound),
    yearDigits
  };
}

function formatLifePath(compound, root) {
  return compound === root ? String(root) : `${compound}/${root}`;
}

document.getElementById("calculateButton")?.addEventListener("click", async () => {
  const month = Number(document.getElementById("birthMonth")?.value);
  const day = Number(document.getElementById("birthDay")?.value);
  const year = Number(document.getElementById("birthYear")?.value);
  const result = document.getElementById("calculatorResult");

  if (!result) return;

  if (!month || !day || !year) {
    result.innerHTML = '<div class="result-placeholder">Choose your birth month, day and year first.</div>';
    return;
  }

  const validDay = new Date(year, month - 1, day);
  if (
    validDay.getFullYear() !== year ||
    validDay.getMonth() !== month - 1 ||
    validDay.getDate() !== day
  ) {
    result.innerHTML = '<div class="result-placeholder">Please choose a valid birth date.</div>';
    return;
  }

  const { compound, root, yearDigits } = calculateLifePath(month, day, year);
  const displayNumber = formatLifePath(compound, root);
  const vibrationMeanings = await vibrationMeaningsPromise;
  const meaning = vibrationMeanings[String(compound)];
  const calculation = `${month} + ${day} + ${yearDigits.join(" + ")} = ${compound}`;

  if (!meaning) {
    result.innerHTML = `
      <div>
        <div class="result-number">${displayNumber}</div>
        <div class="result-title">Life Path ${displayNumber}</div>
        <div class="result-calculation">${calculation}</div>
        <div class="result-copy">Your compound vibration is ${compound}, reducing to ${root}. Open Youmerology for the complete interpretation.</div>
        <a class="result-cta" href="https://apps.apple.com/us/app/youmerology/id6758997549" target="_blank" rel="noopener">
          Explore your complete numerology profile in Youmerology →
        </a>
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div>
      <div class="result-number">${displayNumber}</div>
      <div class="result-title">Life Path ${displayNumber}</div>
      <div class="result-calculation">${calculation}</div>
      <div class="result-copy">${meaning}</div>
      <a class="result-cta" href="https://apps.apple.com/us/app/youmerology/id6758997549" target="_blank" rel="noopener">
        Explore your complete numerology profile in Youmerology →
      </a>
    </div>
  `;
});
