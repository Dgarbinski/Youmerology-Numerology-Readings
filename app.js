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

document.getElementById("year").textContent = new Date().getFullYear();

const lifePathMeanings = {
  1: ["The Initiator", "Independence, initiative and learning to trust your own direction."],
  2: ["The Diplomat", "Cooperation, sensitivity, patience and the ability to work with others."],
  3: ["The Communicator", "Creativity, expression, optimism and bringing ideas into the open."],
  4: ["The Builder", "Structure, discipline, dependability and creating strong foundations."],
  5: ["The Explorer", "Freedom, adaptability, change and learning through direct experience."],
  6: ["The Nurturer", "Responsibility, care, harmony and balancing service with your own needs."],
  7: ["The Seeker", "Analysis, introspection, intuition and a drive to understand what lies beneath the surface."],
  8: ["The Executive", "Ambition, organization, material mastery and learning to use influence responsibly."],
  9: ["The Humanitarian", "Compassion, completion, perspective and contributing to something larger than yourself."],
  11: ["The Intuitive", "A master-number path associated with heightened sensitivity, inspiration and vision."],
  22: ["The Master Builder", "A master-number path associated with translating large ideas into practical form."],
  33: ["The Teacher", "A master-number path traditionally associated with service, compassion and uplifting others."]
};

function reduceNumber(value) {
  let n = Number(value);
  while (n > 9 && ![11, 22, 33].includes(n)) {
    n = String(n).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

function calculateLifePath(dateString) {
  const digits = dateString.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  const total = digits.split("").reduce((sum, digit) => sum + Number(digit), 0);
  return reduceNumber(total);
}

document.getElementById("calculateButton")?.addEventListener("click", () => {
  const input = document.getElementById("birthDate");
  const result = document.getElementById("calculatorResult");
  const value = input.value;

  if (!value) {
    result.innerHTML = '<div class="result-placeholder">Choose your birth date first.</div>';
    return;
  }

  const number = calculateLifePath(value);
  const meaning = lifePathMeanings[number] || ["Your Life Path", "Open Youmerology for your complete personalized interpretation."];

  result.innerHTML = `
    <div>
      <div class="result-number">${number}</div>
      <div class="result-title">${meaning[0]}</div>
      <div class="result-copy">${meaning[1]}</div>
      <a class="result-cta" href="https://apps.apple.com/us/app/youmerology/id6758997549" target="_blank" rel="noopener">
        Get the full reading in Youmerology →
      </a>
    </div>
  `;
});
