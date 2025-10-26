const meds = [
  // Paracetamol
  { name: "125 mg čípek (Panadol)", type: "cip", dosePerKg: 15, maxDose: 125 },
  { name: "250 mg čípek (Panadol)", type: "cip", dosePerKg: 15, maxDose: 250 },
  { name: "24 mg/ml sirup (Panadol)", type: "sirup", dosePerKg: 15, maxDose: 1000, conc: 24 },
  { name: "125 mg tableta (Panadol)", type: "tableta", dosePerKg: 15, maxDose: 125 },
  { name: "500 mg tableta (Paralen)", type: "tableta", dosePerKg: 15, maxDose: 500 },

  // Ibuprofen
  { name: "60 mg čípek (Nurofen)", type: "cip", dosePerKg: 7, maxDose: 60, minKg: 3 },
  { name: "125 mg čípek (Nurofen)", type: "cip", dosePerKg: 7, maxDose: 125, minKg: 3 },
  { name: "20 mg/ml sirup (Nurofen)", type: "sirup", dosePerKg: 7, maxDose: 400, conc: 20, minKg: 3 },
  { name: "40 mg/ml sirup (Ibalgin)", type: "sirup", dosePerKg: 7, maxDose: 400, conc: 40, minKg: 3 },
  { name: "200 mg tableta (Ibalgin)", type: "tableta", dosePerKg: 7, maxDose: 200, minKg: 3 },
  { name: "400 mg tableta (Ibalgin)", type: "tableta", dosePerKg: 7, maxDose: 400, minKg: 3 },
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
    if(med.minKg && weight < med.minKg) return; // Ibuprofen od 3 kg

    let dose = Math.round(weight * med.dosePerKg);
    if(dose > med.maxDose) dose = med.maxDose;

    if(med.type === "cip" && dose < med.maxDose) return; // čípky se nedoporučí, pokud dávka menší

    const li = document.createElement("li");

    if(med.type === "sirup") {
      const ml = (dose / med.conc).toFixed(2);
      li.textContent = `${med.name}: ${dose} mg → ${ml} ml`;
    } else if(med.type === "tableta") {
      li.textContent = `${med.name}: cca ${dose} mg (lze dělit)`;
    } else { // čípek
      li.textContent = `${med.name}: doporučeno ${dose} mg`;
    }

    ul.appendChild(li);
  });

  const note = document.createElement("p");
  note.className = "note";
  note.textContent = "⚠️ Ibuprofen se podává od 3 měsíců (~3 kg). Střídat paracetamol a ibuprofen po 3–4 hodinách.";
  
  output.appendChild(note);
  output.appendChild(ul);
}
