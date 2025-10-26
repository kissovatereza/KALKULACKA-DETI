const meds = [
  {
    name: "Paralen 100 mg čípek",
    type: "cip",
    dosePerKg: 15,
    maxDose: 100,
  },
  {
    name: "Paralen 250 mg čípek",
    type: "cip",
    dosePerKg: 15,
    maxDose: 250,
  },
  {
    name: "Paracetamol sirup 24 mg/ml (Panadol)",
    type: "sirup",
    dosePerKg: 15,
    maxDose: 1000,
  },
  {
    name: "Ibalgin sirup 20 mg/ml",
    type: "sirup",
    dosePerKg: 7,
    maxDose: 400,
    minAgeMonths: 3
  },
  {
    name: "Ibalgin čípek 60 mg",
    type: "cip",
    dosePerKg: 7,
    maxDose: 60,
    minAgeMonths: 3
  },
  {
    name: "Ibalgin čípek 125 mg",
    type: "cip",
    dosePerKg: 7,
    maxDose: 125,
    minAgeMonths: 3
  }
];

function showMeds() {
  const weight = parseFloat(document.getElementById("weight").value);
  const output = document.getElementById("output");
  output.innerHTML = '';

  if (!weight || weight <= 0) {
    output.innerHTML = "<p>Zadej platnou hmotnost dítěte.</p>";
    return;
  }

  const ul = document.createElement("ul");

  meds.forEach(med => {
    const calculatedDose = Math.round(weight * med.dosePerKg);
    let doseToShow = calculatedDose > med.maxDose ? med.maxDose : calculatedDose;

    // logika pro čípky: pokud dávka menší než čípek, nedoporučovat
    if(med.type === "cip" && doseToShow < med.maxDose - 20) {
      doseToShow = med.maxDose; // zaokrouhlení orientační
    }

    // pokud by čípek překročil max, nedoporučovat
    if(med.type === "cip" && calculatedDose > med.maxDose) return;

    const li = document.createElement("li");
    li.textContent = `${med.name}: doporučená dávka cca ${doseToShow} mg`;
    ul.appendChild(li);
  });

  // upozornění k nurofenu
  const note = document.createElement("p");
  note.innerHTML = "⚠️ Nurofen (ibuprofen) se podává od 3 měsíců. Můžete střídat paracetamol a ibuprofen po 3–4 hodinách.";
  output.appendChild(note);
  output.appendChild(ul);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
