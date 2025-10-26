function vypocitejDavku() {
  const weight = parseFloat(document.getElementById("weight").value);
  const vysledekDiv = document.getElementById("vysledek");

  if (isNaN(weight) || weight <= 0) {
    vysledekDiv.innerHTML = "<p>Zadejte prosím platnou hmotnost dítěte v kilogramech.</p>";
    return;
  }

  let html = `<h2>Výpočet pro ${weight} kg</h2>`;

  // --- PARACETAMOL ---
  const paracetamolMg = Math.round(weight * 15);
  const paracetamolMin = Math.round(weight * 10);
  const paracetamolMax = Math.round(weight * 15);

  html += `
  <div class="lek">
    <h3>Paracetamol</h3>
    <p><strong>Dávka:</strong> ${paracetamolMin}–${paracetamolMax} mg (obvykle ${paracetamolMg} mg)</p>
    <p><strong>Interval:</strong> každých 6 hodin, max 4× denně</p>
    <ul>
      <li><strong>Paralen / Panadol sirup</strong> (120 mg/5 ml): ${(paracetamolMg / 120 * 5).toFixed(1)} ml</li>
      <li><strong>Paralen sirup</strong> (24 mg/ml): ${(paracetamolMg / 24).toFixed(1)} ml</li>
      <li><strong>Paralen čípek 100 mg</strong> – pro děti cca do 8 kg</li>
      <li><strong>Paralen čípek 125 mg</strong> – pro děti cca do 12 kg</li>
      <li><strong>Paralen čípek 250 mg</strong> – pro děti cca 13–20 kg</li>
      <li><strong>Paralen čípek 500 mg</strong> – pro větší děti cca nad 25 kg</li>
    </ul>
  </div>
  `;

  // --- IBUPROFEN ---
  const ibuMg = Math.round(weight * 10);
  const ibuMin = Math.round(weight * 5);
  const ibuMax = Math.round(weight * 10);

  html += `
  <div class="lek">
    <h3>Ibuprofen</h3>
    <p><strong>Dávka:</strong> ${ibuMin}–${ibuMax} mg (obvykle ${ibuMg} mg)</p>
    <p><strong>Interval:</strong> každých 6–8 hodin, max 3–4× denně</p>
    <ul>
      <li><strong>Nurofen sirup</strong> (100 mg/5 ml): ${(ibuMg / 100 * 5).toFixed(1)} ml</li>
      <li><strong>Nurofen čípek 60 mg</strong> – pro děti cca do 12 kg</li>
      <li><strong>Nurofen čípek 125 mg</strong> – pro děti cca 12–20 kg</li>
    </ul>
    <p><em>Lze podávat od věku 3 měsíců.</em></p>
  </div>
  `;

  html += `
  <div class="dopln">
    <p><strong>Doporučení:</strong> Antipyretika se podávají při teplotě ≥ 38 °C. 
    Paracetamol a ibuprofen je možné střídat po 3–4 hodinách, pokud horečka přetrvává. 
    Vždy dodržujte pokyny lékaře a příbalový leták.</p>
  </div>
  `;

  vysledekDiv.innerHTML = html;
}