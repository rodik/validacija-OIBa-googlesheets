function onEdit(event) 
{
  /*****   postavke lokacije OIB-a u tablici    *****/
  
  var validation_column_header = "OIB"; // ime stupca u kojem radimo validaciju
  var oib_column = 2;                   // broj stupca u kojem radimo validaciju
  var first_oib_row = 2;                // broj reda u kojem se nalazi prva vrijednost za validaciju
  
  /*****   postavke za feedback o validaciji    *****/
  
  var change_background_color = true;                        // farba u crveno ako je kriv OIB
  var write_validation_status_in_neighbour_column = false;   // pise TRUE/FALSE u kolonu desno od OIB-a
  
  
  // dohvati trenutni cell
  var cell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  
  var current_col = cell.getColumn();
  var current_row = cell.getRowIndex();
  // provjeri header kolone
  var header_val = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(1, current_col).getValue();
  
  // provjeri nalazi li se u koloni koju validiramo
  if(current_col == oib_column & current_row >= first_oib_row & header_val == validation_column_header){
    // dohvati vrijednost iz kolone
    var value = cell.getDisplayValue();
    // izracunaj je li OIB iz cella validan
    var is_oib_valid = ValidirajOIB(value);
    // farbanje
    if(change_background_color)
      PostaviPozadinu(cell, is_oib_valid);
    if(write_validation_status_in_neighbour_column)
      UpisiVrijednostSusjednojCeliji(cell, is_oib_valid);
    // ...
  }  
}


function ValidirajOIB(oib){
  // provjeri prvo duljinu
  var oib_len = oib.length;
  if(oib_len != 11) return(false);
  
  // provjeri OIB prema ISO7046(MOD 11, 10)
    var zbroj = 0;
    var ostatak_10 = 0;
    var umnozak = 0;
    var ostatak_11 = 10;
    
    for (i = 0; i<10; i++) {
        var digit = parseInt(oib.substring(i, i+1));
        
        zbroj = digit + ostatak_11
        
        if(zbroj % 10 !== 0)
          ostatak_10 = zbroj % 10;
        else 
          ostatak_10 = 10;
      
        umnozak = ostatak_10 * 2;
        ostatak_11 = umnozak % 11;
    }
    var kontrolna = 11 - ostatak_11;
  
    if(kontrolna !== 10)
      kontrolna = kontrolna;
    else
      kontrolna = 0;
  
    // ako je zadnja kontrolna znamenka jednaka jedanaestoj, vrati TRUE
    return (kontrolna === parseInt(oib.substring(10, 11)));
}

function PostaviPozadinu(cell, is_valid) {
  if(!is_valid)
    cell.setBackground("red");
  else
    cell.setBackground(null);
}

function UpisiVrijednostSusjednojCeliji(cell, is_valid) {
  
  var current_col = cell.getColumn();
  var current_row = cell.getRowIndex();
  // dohvati trenutni range zajedno sa susjednom (desnom) kolonom 
  var rng = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(current_row, current_col, 1, 2);
  // dohvati susjednu kolonu
  var next_cell = rng.getCell(1, 2);
  // postavi joj vrijednost ovisno o validaciji
  next_cell.setValue(is_valid);
}