# Google Sheets Validacija OIB-a


Google Apps Script funkcije za automatiziranu validaciju OIB-a prilikom unosa u tablicu. Provjera ISO7046(MOD 11, 10).

Više o matematičkoj provjeri točnosti OIB-a i koristan alat za generiranje i provjeru OIB-a: http://oib.itcentrala.com/oib-generator/

Za početnike: 
- [Getting started](https://developers.google.com/apps-script/articles/tutorials) with Google Apps Script. 
- Dodatno - https://zapier.com/learn/google-sheets/google-apps-script-tutorial/.

Upute za korištenje:
+ Tools -> Script editor. [Sadržaj](https://raw.githubusercontent.com/rodik/validacija-OIBa-googlesheets/master/Funkcije.gs) fajla Funkcije.gs kopirati u otvoreni dokument.
+ Modificirati parametre po potrebi. Spremiti izmjene.
+ Kreirati kolonu s nazivom "OIB". Naziv je moguće konfigurirati u parametrima skripte.

Postoje dvije mogućnosti prikaza rezultata validacije.
1. Bojanje cellova s krivim OIB-om u crveno.
2. Pisanje TRUE/FALSE u susjednu (desnu) kolonu.

Navedene opcije moguće je uključiti ili isključiti promjenom ovih postavki u kôdu:
```javascript
// farba u crveno ako je kriv OIB
var change_background_color = true;                        
// pise TRUE/FALSE u kolonu desno od OIB-a
var write_validation_status_in_neighbour_column = false;
```

Dodatni parametri:
```javascript
// ime stupca u kojem radimo validaciju
var validation_column_header = "OIB";
// broj stupca u kojem radimo validaciju (A=1, B=2, C=3, ...)
var oib_column = 2;
// broj reda u kojem se nalazi prva vrijednost za validaciju  (1, 2, 3, ...)
var first_oib_row = 2;
```
Primjer podataka u sheetu:

| Naziv                     | OIB       |    Komentar  | ...  |
| --------------------------|:---------:|-------------:|-----:|
| Firma Krstić              |63915366313|ispravan OIB  |      |
| Stranka opasnih namjera   |10739306512|neispravan OIB|      |
| Obrt za usluge čekanja    |00708172183|ispravan OIB  |      |

Ako je `write_validation_status_in_neighbour_column == true`, strukturu treba pripremiti na ovaj način:

| Naziv                     | OIB       |OIB_validan|    Komentar   | ...  |
| --------------------------|:---------:|-----------:|-------------:|------|
| Firma Krstić              |63915366313| TRUE       |ispravan OIB  |      |
| Stranka opasnih namjera   |10739306512| FALSE      |neispravan OIB|      |
| Obrt za usluge čekanja    |00708172183| TRUE       |ispravan OIB  |      |

Kolona _OIB_validan_ automatski se popunjava promjenom vrijednosti u koloni _OIB_.