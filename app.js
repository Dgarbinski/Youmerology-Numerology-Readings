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

// These descriptions match the Life Path / personal vibration text used in Youmerology.
const lifePathMeanings = {
  1: "Independence is your core drive, and you need room to act without feeling boxed in. You naturally step into leadership because people sense your will and direction. New experiences and first-time ventures energize you, and you do best when you can pioneer. Your lesson is to lead without isolating yourself or dismissing other viewpoints. At your best you are original, inventive, and decisive, turning ideas into bold action. At your worst you can become domineering, stubborn, or self-centered and push people away. Choose roles where initiative matters—builder, founder, inventor, captain—and practice steady humility.",
  2: "Cooperation shapes your life, and you’re tuned in to other people’s needs and moods. You excel as a mediator because you can see both sides and calm conflict. Your imagination is strong, and you notice details and hidden beauty others miss. Decisions can feel heavy, so your growth comes from choosing clearly instead of avoiding choices. At your best you are tactful, sincere, and quietly influential—the power behind the scenes. At your worst you may doubt yourself, become overly sensitive, or slip into two-faced behavior. Seek partnerships and settings that reward diplomacy, listening, and fairness.",
  3: "Expression is your gift, and you thrive when you can communicate, perform, or entertain. People are drawn to your warmth, humor, and social sparkle. Travel and variety feed your creativity and widen your perspective. Recognition matters to you, so learn to ground your confidence in mastery rather than applause. At your best you’re lucky through friends and opportunities because your optimism invites support. At your worst you can exaggerate, overindulge, gossip, or avoid responsibility. Pick one or two talents to develop deeply so your brilliance doesn’t scatter.",
  4: "Structure and security guide you, and you want solid foundations in work and life. You are a natural builder who turns plans into tangible results through patience and effort. Others trust your honesty, reliability, and respect for rules and tradition. Money is handled carefully, and you’re strongest when you budget, plan, and proceed step by step. At your best you are practical, inventive, and steady—someone society can lean on. At your worst you can become rigid, joyless, stingy, or trapped behind self-made walls. Balance duty with warmth so your stability supports relationships as well as projects.",
  5: "Freedom and change are essential for you, and routine drains your energy quickly. You learn through experience, experimentation, and constant curiosity. Versatility is your advantage, letting you adapt, negotiate, and solve problems fast. Your lesson is to channel nervous energy into purposeful exploration rather than impulsive indulgence. At your best you are witty, progressive, and fearless, using reason to guide daring moves. At your worst you can chase sensation—excess, distraction, or irresponsibility—until life destabilizes. Choose work with variety and movement, and practice self-control to keep your gifts sharp.",
  6: "Harmony, beauty, and responsibility shape your path, and you often become the caretaker. You’re drawn to art, music, and creating a peaceful home environment. People trust your fairness and seek you out for counsel because you see the heart of a problem. Your generosity builds strong friendships, and you feel other people’s joys and pains deeply. At your best you are loving, patient, and principled, willing to stand up for what is right. At your worst you may become stubborn, martyr-like, jealous, or too enmeshed in others’ needs. Keep boundaries while serving, so your giving remains joyful instead of exhausting.",
  7: "Your destiny is the mind, and you’re pulled toward mystery, analysis, and spiritual depth. Solitude restores you, and your inner world can be richer than any crowd. Intuition is strong, and you often read motives quickly beneath outer appearances. You may question orthodox beliefs and build your own philosophy through study and experience. At your best you become a wise seeker—methodical, cultured, and quietly masterful. At your worst you can turn gloomy, isolated, or frustrated when the world fails your ideals. Use meditation, disciplined learning, and compassion to keep your brilliance connected to people.",
  8: "Power, discipline, and material mastery are your themes, and you’re built to organize big outcomes. You think in terms of strategy, resources, and results, often rising into executive roles. Ambition is strong and setbacks push you to work harder rather than quit. Money and influence come more easily when you pair drive with ethics and balance. At your best you are a capable builder of prosperity who shares and supports worthwhile causes. At your worst you can become ruthless, controlling, or obsessed with winning at any cost. Develop your spiritual and philanthropic side so success feels meaningful, not just impressive.",
  9: "You’re a humanitarian with broad vision, drawn to wisdom, service, and spiritual growth. Your empathy is deep, and people come to you for understanding and perspective. Life may test you more as you evolve, pushing you to practice mercy and tolerance. Intuition and foresight are strong, sometimes arriving as clear premonitions. You often move through intense friendships, learning to release ties when the lesson is complete. At your worst you can become self-serving, quick-tempered, or stressed by the high standards you carry. At your best you become a beacon—generous, idealistic, and able to inspire whole communities.",
  11: "As a master number, you amplify intuition and inspiration, and people feel your ‘signal’ strongly. You’re meant to serve through teaching, speaking, writing, or visionary leadership. Justice and ethics matter, and you want ideas to become real improvements in society. Spiritual and mystical studies can strengthen your creativity and keep you aligned. At your best you uplift others with insight, fairness, and courageous conviction. If you ignore the higher call, you may drop into the quieter 2 pattern and feel stuck in details. Use your power gently, because misuse can create sharp consequences and inner unrest.",
  22: "As a master builder, you can think globally while executing practical plans step by step. Leadership with ethics is your key, because people and resources gather around your vision. Your potential includes large wealth and influence used best through philanthropy and world improvement. You work hard and often make policy, shaping institutions through steady authority. Overwork and control cravings can distort the gift, so balance is non-negotiable. At your best you solve ‘impossible’ problems and direct others without exploiting them. Let your legacy be what you build for many, not what you control for yourself.",
  33: "As a master of compassion, you’re called to teach, heal, and inspire by selfless example. Responsibility can feel heavy, and emotional ‘crucifixions’ may refine your character. Creativity, resourcefulness, and discipline combine with a desire to reform what’s unjust. You may prefer quiet spaces and nature to crowds, needing peace to hold your vibration. If you can’t meet the high standard, life may fall back into the domestic 6 pattern. At your worst you become anxious, indecisive, or sacrifice for unworthy causes. At your best your light becomes leadership that elevates many, often without applause."
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
  const meaning = lifePathMeanings[number] || "Open Youmerology for your complete personalized interpretation.";
  const title = [11, 22, 33].includes(number) ? `Life Path ${number} · Master Number` : `Life Path ${number}`;

  result.innerHTML = `
    <div>
      <div class="result-number">${number}</div>
      <div class="result-title">${title}</div>
      <div class="result-copy">${meaning}</div>
      <a class="result-cta" href="https://apps.apple.com/us/app/youmerology/id6758997549" target="_blank" rel="noopener">
        Explore your complete numerology profile in Youmerology →
      </a>
    </div>
  `;
});
