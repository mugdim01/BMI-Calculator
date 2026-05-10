const button = document.getElementById('calculate-btn');
const errorMessage = document.getElementById('error-message');

const muskispol = document.getElementById('muskispol');
const zenskispol = document.getElementById('zenskispol');
const godine = document.getElementById('godine');
const visina = document.getElementById('visina');
const tjelesnaMasa = document.getElementById('tjelesnaMasa');
const obimLjudskogStruka = document.getElementById('obimStruka');
const unosVode = document.getElementById('unos-vode-broj');

const ljudskeGodine = document.getElementById('godine');
const maxGodine = 100;

const sjedilackaBtn = document.getElementById('sjedilacka-btn');
const laganaBtn = document.getElementById('lagana-btn');
const umjerenaBtn = document.getElementById('umjerena-btn');        // BUTTONI ZA RAZINU AKTIVNOSTI
const aktivnaBtn = document.getElementById('aktivna-btn');
const intenzivnaBtn = document.getElementById('intenzivna-btn');

const izabraniBtn = document.querySelectorAll('.aktivnost-btn');

let izabranaAktivnostBtn;

izabraniBtn.forEach(izabraniAktivnostBtn => {                            
    izabraniAktivnostBtn.addEventListener('click', () => {
        document.querySelector('.active')?.classList.remove('active'); // uklanjamo classu "active" ako je ima 
        izabraniAktivnostBtn.classList.add('active');                           // a zatim dodajemo
    })
})


for (let i = 1; i <= maxGodine; i++) {                  // za godine u <select>
    let option = document.createElement('option');
    option.innerHTML = i;
    option.value = i;
    ljudskeGodine.appendChild(option);
} 

sjedilackaBtn.addEventListener('click', function() {
    izabranaAktivnostBtn = 1.2;
})

laganaBtn.addEventListener('click', function() {
    izabranaAktivnostBtn = 1.375;
})

umjerenaBtn.addEventListener('click', function() {
    izabranaAktivnostBtn = 1.55;
})

aktivnaBtn.addEventListener('click', function() {
    izabranaAktivnostBtn = 1.725;
})

intenzivnaBtn.addEventListener('click', function() {
    izabranaAktivnostBtn = 1.9;
})

button.addEventListener('click', function() {
    /*const muskispol = document.getElementById('muskispol');
    const zenskispol = document.getElementById('zenskispol');
    const godine = document.getElementById('godine');
    const visina = document.getElementById('visina');
    const tjelesnaMasa = document.getElementById('tjelesnaMasa');
    const obimStruka = document.getElementById('obimStruka');*/

    if (visina.value.trim() === '' || tjelesnaMasa.value.trim() === '' || obimLjudskogStruka.value.trim() === '' || (!muskispol.checked && !zenskispol.checked)) {
        errorMessage.textContent = 'Nisi odabrao spol ili unio svoje podatke.';
    }  else {
        calculateBmi();
        bazalniMetabolizam();
        obimStruka();
        dnevniUnosVode();
        errorMessage.textContent = '';
    }
    })


    function calculateBmi() {
        const centimetersToMeters = visina.value / 100;
        const visinaToNumber = Number(centimetersToMeters);
        const tjelesnaMasaToNumber = Number(tjelesnaMasa.value);
        const BMI = tjelesnaMasaToNumber / (visinaToNumber ** 2);
        const removingBMIdecimals = Number(BMI.toFixed(1));
        document.getElementById('tjelesna-masa-broj').innerText = `${removingBMIdecimals}`;

        if (removingBMIdecimals < 18.5) {

            document.getElementById('tjelesna-masa-komentar').innerText = 'POTHRANJENOST! POSJETI DOKTORA';

            document.getElementById('tjelesna-masa-tekst').innerHTML = 'Tvoja tjelesna masa je ispod zdravog raspona. Pokušaj povećati <br> unos hranjivih namirnica i obratiti pažnju na uravnoteženu ishranu.';
            
        } else if (removingBMIdecimals >= 18.5 && removingBMIdecimals < 25) {

            document.getElementById('tjelesna-masa-komentar').innerText = 'NORMALNA TJELESNA MASA';

            document.getElementById('tjelesna-masa-tekst').innerHTML = 'Tvoja tjelesna masa je u zdravom rasponu. Nastavi <br> održavati uravnoteženu ishranu i fizičku aktivnost.';

        } else if (removingBMIdecimals >= 25 && removingBMIdecimals < 30) {

            document.getElementById('tjelesna-masa-komentar').innerText = 'POVIŠENA TJELESNA MASA';

            document.getElementById('tjelesna-masa-tekst').innerHTML = 'Tvoja tjelesna masa je iznad idealnog raspona. Obrati pažnju <br> na ishranu i povećaj fizičku aktivnost kako bi vratio balans.';

        } else if (removingBMIdecimals >= 30) {

            document.getElementById('tjelesna-masa-komentar').innerText = 'GOJAZNOST! POSJETI DOKTORA';

            document.getElementById('tjelesna-masa-tekst').innerHTML = 'Tvoja tjelesna masa ukazuje na gojaznost. Preporučuje se promjena <br> prehrambenih navika i redovna fizička aktivnost uz stručni savjet';

        }

            function idealnaMasa() {
                const minBMI = 18.5 * (visinaToNumber ** 2);
                const maxBMI = 24.9 * (visinaToNumber ** 2);
                const removeMinBMIdecimals = Number(minBMI.toFixed(1));
                const removeMaxBMIdecimals = Number(maxBMI.toFixed(1));
                document.getElementById('idealna-masa-broj').innerText = `${removeMinBMIdecimals} - ${removeMaxBMIdecimals}`;

                    function doZdravogRaspona() {
                        const tjelesnaMasaUBroj = Number(tjelesnaMasa.value);
                        
                        if (tjelesnaMasaUBroj < minBMI) {
                            const ispodGranice = minBMI - tjelesnaMasaUBroj;

                            document.getElementById('do-zdravog-raspona-broj').innerText = `${ispodGranice.toFixed(1)}`;
                            document.getElementById('do-zdravog-raspona-komentar').innerText = `Do zdravog raspona nedostaje: ${ispodGranice.toFixed(1)} kg`;
                        } else if (tjelesnaMasaUBroj > maxBMI) {
                            const prekoGranice = tjelesnaMasaUBroj - maxBMI;

                            document.getElementById('do-zdravog-raspona-broj').innerText = `${prekoGranice.toFixed(1)}`;
                            document.getElementById('do-zdravog-raspona-komentar').innerText = `Do zdravog raspona morate smršati: ${prekoGranice.toFixed(1)} kg`;
                        }
                    }

                    doZdravogRaspona();
            }

       idealnaMasa();

    }

    function bazalniMetabolizam() {
        const visinaToNumber = Number(visina.value);
        const tjelesnaMasaInNumber = Number(tjelesnaMasa.value);
        const formula = (10 * tjelesnaMasaInNumber) + (6.25 * visinaToNumber) - (5 * ljudskeGodine.value) + 5;

        document.getElementById('bazalni-metabolizam-broj').innerText = `${formula}`;

            function dnevneKalorije() {
                const dnevneKalorijeFormula = formula * izabranaAktivnostBtn;

                document.getElementById('dnevne-kalorije-broj').innerText = `${dnevneKalorijeFormula}`;
            }

        dnevneKalorije();
    }

  function obimStruka() {
    const obimStrukaToNumber = Number(obimLjudskogStruka.value);
    const visinaToNewNumber = Number(visina.value);
    const obimStrukaFormula = obimStrukaToNumber / visinaToNewNumber;
    const removeObimStrukaDecimals = Number(obimStrukaFormula.toFixed(2));


    document.getElementById('omjer-struk-broj').innerText = `${removeObimStrukaDecimals}`;

    if (removeObimStrukaDecimals >= 0.6) {
        document.getElementById('omjer-struk-komentar').innerText = `Loš omjer`;
    }
    
   } 



   function dnevniUnosVode() {
        const ljudskaMasaInNumber = Number(tjelesnaMasa.value);
        const unosVodeFormula = 0.033 * ljudskaMasaInNumber;
        const unosVodeDecimals = unosVodeFormula.toFixed(2);

        document.getElementById('unos-vode-broj').innerText = `${unosVodeDecimals}`;
   }



    


