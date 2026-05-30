const recommendations = {
  home: {
    title: "Hemmaträning",
    text: "Ett smart val när du vill komma igång utan kostnad eller gymkort. Kroppsvikt räcker långt i början.",
    href: "#schema-home",
  },
  machines: {
    title: "Endast gymmaskiner",
    text: "Maskiner gör det lättare att hitta rätt rörelsebana och bygga trygghet innan fria vikter.",
    href: "#schema-machines",
  },
  fullbody: {
    title: "Helkropp 3 dagar",
    text: "Bästa startpunkten för styrka och muskler. Du tränar hela kroppen ofta men får bra återhämtning.",
    href: "#schema-fullbody",
  },
  upper: {
    title: "Upper/Lower Split",
    text: "Ett stabilt upplägg för dig som kan träna fyra dagar och vill ha mer volym utan att tappa struktur.",
    href: "#schema-upper",
  },
  ppl: {
    title: "Push/Pull/Legs",
    text: "Passar dig som är van, vill träna ofta och kan återhämta dig med sömn och mat.",
    href: "#schema-ppl",
  },
  conditioning: {
    title: "Kondition och fettförbränning",
    text: "Kombinerar intervaller, lugnare kondition och cirkelpass för bättre ork och energiförbrukning.",
    href: "#schema-conditioning",
  },
  mobility: {
    title: "Mobilitet och yoga",
    text: "Ett lugnare schema för rörlighet, hälsa och bättre kontroll i grundläggande positioner.",
    href: "#schema-mobility",
  },
  gvt: {
    title: "German Volume Training",
    text: "Ett avancerat högvolymsupplägg för muskelmassa. Använd bara om du redan har teknik och återhämtning på plats.",
    href: "#schema-gvt",
  },
};

const form = document.querySelector("#plannerForm");
const title = document.querySelector("#recommendationTitle");
const text = document.querySelector("#recommendationText");
const link = document.querySelector("#recommendationLink");

function getValue(name) {
  return new FormData(form).get(name);
}

function chooseRecommendation() {
  const goal = getValue("goal");
  const level = getValue("level");
  const days = getValue("days");
  const equipment = getValue("equipment");

  let key = "fullbody";

  if (goal === "mobility") key = "mobility";
  else if (goal === "fatloss") key = "conditioning";
  else if (equipment === "home") key = "home";
  else if (equipment === "machines" && level === "beginner") key = "machines";
  else if (level === "advanced" && days === "5") key = "ppl";
  else if (level === "advanced") key = "gvt";
  else if (days === "4") key = "upper";
  else key = "fullbody";

  const selected = recommendations[key];
  title.textContent = selected.title;
  text.textContent = selected.text;
  link.href = selected.href;
}

form.addEventListener("change", chooseRecommendation);

const filters = document.querySelectorAll(".filter");
const plans = document.querySelectorAll(".plan-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    plans.forEach((plan) => {
      const tags = plan.dataset.tags;
      plan.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});

chooseRecommendation();
