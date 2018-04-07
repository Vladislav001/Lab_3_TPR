
function addTable(row, column) {
    while(document.getElementById('name_columns').firstChild) {
      document.getElementById('name_columns').removeChild(document.getElementById('name_columns').firstChild);
    }
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('inputi').firstChild) {
      document.getElementById('inputi').removeChild(document.getElementById('inputi').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }

    var newElem=document.createElement("table");
    newElem.setAttribute('id','name_tab');
    var newRow=newElem.insertRow(newElem.rows.length);
    for(var i=0; i<column; i++) {
      var newCell = newRow.insertCell(i);
      newCell.width="200";
      newCell.innerHTML="Критерий "+(i*1+1);
    }
    document.getElementById('name_columns').appendChild(newElem);

    var newElem=document.createElement("table");
    newElem.setAttribute('id','tab');
    for(var i=0; i<row; i++) {
      var newRow=newElem.insertRow(i);
      for(var j=0; j<column; j++) {
        var newCell = newRow.insertCell(j);
        newCell.width="200";
        newCell.innerHTML="<input type='text' class='form-control' value='"+(i+j)+"' id='elem_"+i+"_"+j+"'/>";
      }
    }
    document.getElementById('inputi').appendChild(newElem);
  }
  function addRow() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }
    var newElem=document.getElementById('tab');
    var newRow=newElem.insertRow(newElem.rows.length);
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    for(var i=0; i<newElem.rows[0].cells.length; i++) {
      var newCell = newRow.insertCell(i);
      newCell.width="200";
      newCell.innerHTML="<input type='text' class='form-control' value='"+(i+newElem.rows.length-1)+"' id='elem_"+(newElem.rows.length-1)+"_"+i+"'/>";
    }
    document.getElementById('inputi').appendChild(newElem);
  }
  function delRow() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }
    var newElem=document.getElementById('tab');
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    newElem.deleteRow(newElem.rows.length-1);
    document.getElementById('inputi').appendChild(newElem);
  }
  function addColumn() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }

    var newElem=document.getElementById('name_tab');
    var newCell = newElem.rows[0].insertCell(newElem.rows[0].cells.length);
    newCell.width="200";
    newCell.innerHTML="Критерий "+newElem.rows[0].cells.length;
    document.getElementById('name_columns').appendChild(newElem);

    var newElem=document.getElementById('tab');
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    for(var i=0; i<newElem.rows.length; i++) {
      var newCell = newElem.rows[i].insertCell(newElem.rows[i].cells.length);
      newCell.width="200";
      newCell.innerHTML="<input type='text' class='form-control' value='"+(i+newElem.rows[i].cells.length-1)+"' id='elem_"+i+"_"+(newElem.rows[i].cells.length-1)+"'/>";
    }
    document.getElementById('inputi').appendChild(newElem);
    changeInput();
  }
  function delColumn() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }

    var newElem=document.getElementById('name_tab');
    newElem.rows[0].deleteCell(newElem.rows[0].cells.length-1);
    document.getElementById('name_columns').appendChild(newElem);

    var newElem=document.getElementById('tab');
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].deleteCell(newElem.rows[i].cells.length-1)
    }
    document.getElementById('inputi').appendChild(newElem);
    changeInput();
  }
  function getMatrix() {
    var newElem=document.getElementById('tab');
    var matrix = new Array();
    for(var i=0; i<newElem.rows.length; i++) {
      matrix[i] = new Array();
      for(var j=0; j<newElem.rows[i].cells.length; j++) {
        matrix[i][j]=document.getElementById('elem_'+i+'_'+j+'').value;
      }
    }
    return matrix;
  }
  function calculate() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }
    var newElem=document.getElementById('tab');
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    var select = document.getElementById('method');
    var value = select.options[select.selectedIndex].value;
    switch (value) {
      case 'sevidg':
        var matrix=getMatrix();
        var max = maxInColumn(matrix);
        for(var i=0; i<matrix.length; i++) {
          for(var j=0; j<matrix[i].length; j++) {
            matrix[i][j]=max[j]*1-matrix[i][j]*1;
          }
        }
        for(var j=0; j<matrix[0].length; j++) {
          insertNameResults('F'+j+'\'');
        }
        insertTable(matrix);
        insertNameResults('min(Eir)');
        insertColumn(maxInRow(matrix));
        var eir = [];
        for(var i=0; i<matrix.length; i++) {
          eir[i]='-';
        }
        eir[minInMassive(maxInRow(matrix))]='E_'+(minInMassive(maxInRow(matrix))+1);
        insertNameResults('min(Eir)');
        insertColumn(eir);
        document.getElementById('tab').rows[minInMassive(maxInRow(matrix))].setAttribute('bgcolor','#1B5E20');
        break;
      case 'gurvits':
        var matrix=getMatrix();
        var c=document.getElementById('c').value;
        var min = minInRow(matrix);
        for(var i=0; i<min.length; i++) {
          min[i] = c*min[i];
        }
        insertNameResults('c*min(Eij)');
        insertColumn(min);
        var max = maxInRow(matrix);
        for(var i=0; i<max.length; i++) {
          max[i] = (1-c)*max[i];
        }
        insertNameResults('(1-c)*max(Eij)');
        insertColumn(max);
        var sum = [];
        for(var i=0; i<min.length; i++) {
          sum[i] = min[i]+max[i];
        }
        insertNameResults('c*min(Eij)+(1-c)*max(Eij)');
        insertColumn(sum);
        var eir = [];
        for(var i=0; i<matrix.length; i++) {
          eir[i]='-';
        }
        eir[maxInMassive(sum)]='E_'+(maxInMassive(sum)+1);
        insertNameResults('max(Eir)');
        insertColumn(eir);
        document.getElementById('tab').rows[maxInMassive(sum)].setAttribute('bgcolor','#1B5E20');
        break;
      default:
        alert('Неизвестный метод');
    }
  }
  function saveFile() {
    var matrix=getMatrix();
    var select=document.getElementById('method');
    var value = select.options[select.selectedIndex].value;
    var str=String(document.getElementById('method').selectedIndex);
    switch (value) {
      case 'sevidg':
        var str=str[0]+','+String(matrix.length)+','+String(matrix[0].length)+','+matrix.toString();
        break;
      case 'gurvits':
        var str=str[0]+','+String(matrix.length)+','+String(matrix[0].length)+','+matrix.toString()+','+document.getElementById('c').value;
        break;
      default:
        alert('Неизвестный метод');
    }
    var pom=document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(str));
    pom.setAttribute('download', 'example.txt');
    pom.click();
  }
  function loadFile(files) {
    var file = files[0];
    if(file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var text = e.target.result;
        var arr = text.split(',');
        document.getElementById('method').selectedIndex = arr[0];
        addTable(arr[1],arr[2]);
        changeInput();
        for(var i=0; i<arr[1]; i++) {
          for(var j=0; j<arr[2]; j++) {
            document.getElementById('elem_'+i+'_'+j+'').value=arr[i*arr[2]+j+3];
          }
        }
        var select=document.getElementById('method');
        var value = select.options[select.selectedIndex].value;
        switch (value) {
          case 'sevidg':
            break;
          case 'gurvits':
            document.getElementById('c').value=arr[arr[1]*arr[2]+3];
            break;
          default:
            alert('Неизвестный метод');
        }
      };
      reader.readAsText(file);
    }
  }
  function changeInput() {
    while(document.getElementById('name_results').firstChild) {
      document.getElementById('name_results').removeChild(document.getElementById('name_results').firstChild);
    }
    while(document.getElementById('results').firstChild) {
      document.getElementById('results').removeChild(document.getElementById('results').firstChild);
    }
    var newElem=document.getElementById('tab');
    for(var i=0; i<newElem.rows.length; i++) {
      newElem.rows[i].setAttribute('bgcolor','#90CAF9');
    }
    while(document.getElementById('param').firstChild) {
      document.getElementById('param').removeChild(document.getElementById('param').firstChild);
    }
    var select=document.getElementById('method');
    var value = select.options[select.selectedIndex].value;
    switch (value) {
      case 'sevidg':
        break;
      case 'gurvits':
        insertInput('c', 1/getMatrix().length, 0, 1);
        break;

      default:
        alert('Неизвестный метод');
    }
  }
  function insertInput(id, value, min, max) {
    var txtNode=document.createTextNode(' ' + id + ' ');
    document.getElementById('param').appendChild(txtNode);
    var newInput=document.createElement("input");
    newInput.setAttribute('type','text');
    newInput.setAttribute('id',id);
    newInput.setAttribute('value', value);
    newInput.setAttribute('min', min);
    newInput.setAttribute('max', max);
    document.getElementById('param').appendChild(newInput);
  }
  function insertColumn(matrix) {
    if(document.getElementById('res')) {
      var newElem=document.getElementById('res');
      for(var i=0; i<newElem.rows.length; i++) {
        var newCell = newElem.rows[i].insertCell(newElem.rows[i].cells.length);
        newCell.width="200";
        newCell.innerHTML="<input type='text' class='form-control' value='"+matrix[i]+"'/>";
      }
      document.getElementById('results').appendChild(newElem);
    }
    else {
      var newElem=document.createElement('table');
      newElem.setAttribute('id','res');
      for(var i=0; i<matrix.length; i++) {
        var newRow=newElem.insertRow(i);
        var newCell = newRow.insertCell(0);
        newCell.width="200";
        newCell.innerHTML="<input type='text' class='form-control' value='"+matrix[i]+"'/>";
      }
      document.getElementById('results').appendChild(newElem);
    }
  }
  function insertTable(matrix) {
    var column = [];
    for(var i=0; i<matrix[0].length; i++) {
      for(var j=0; j<matrix.length; j++) {
        column[j]=matrix[j][i];
      }
      insertColumn(column);
    }
  }

  function openInfo() {
    var select=document.getElementById('method');
    var value = select.options[select.selectedIndex].value;
    document.location="info.html?id="+value;
  }

  //minimax
  function minInRow(matrix) {
    var min = [];
    for(var i=0; i<matrix.length; i++) {
      min[i]=matrix[i][0];
      for(var j=0; j<matrix[i].length; j++) {
        if(min[i]*1>matrix[i][j]*1) {
          min[i]=matrix[i][j];
        }
      }
    }
    return min;
  }
  function maxInMassive(matrix) {
    var max=matrix[0];
    var line=0;
    for(var i=0; i<matrix.length; i++) {
      if(max*1<matrix[i]*1) {
        max=matrix[i];
        line=i;
      }
    }
    return line;
  }
  //sevidg
  function maxInColumn(matrix) {
    var max = [];
    for(var i=0; i<matrix[0].length; i++) {
      max[i]=matrix[0][i];
      for(var j=0; j<matrix.length; j++) {
        if(max[i]*1<matrix[j][i]*1) {
          max[i]=matrix[j][i];
        }
      }
    }
    return max;
  }
  function maxInRow(matrix) {
    var max = [];
    for(var i=0; i<matrix.length; i++) {
      max[i]=matrix[i][0];
      for(var j=0; j<matrix[i].length; j++) {
        if(max[i]*1<matrix[i][j]*1) {
          max[i]=matrix[i][j];
        }
      }
    }
    return max;
  }
  function minInMassive(matrix) {
    var min=matrix[0];
    var line=0;
    for(var i=0; i<matrix.length; i++) {
      if(min*1>matrix[i]*1) {
        min=matrix[i];
        line=i;
      }
    }
    return line;
  }

  function insertNameResults(name) {
    if(document.getElementById('name_res')) {
      var newElem=document.getElementById('name_res');
      var newCell = newElem.rows[0].insertCell(newElem.rows[0].cells.length);
      newCell.width="200";
      newCell.innerHTML=' ' + name + ' ';
      document.getElementById('name_results').appendChild(newElem);
    }
    else {
      var newElem=document.createElement("table");
      newElem.setAttribute('id','name_res');
      var newRow=newElem.insertRow(newElem.rows.length);
      var newCell = newRow.insertCell(newElem.rows[0].cells.length);
      newCell.width="200";
      newCell.innerHTML=' ' + name + ' ';
      document.getElementById('name_results').appendChild(newElem);
    }
  }
  function maxInMatrix() {
    var matrix = getMatrix();
    var max = matrix[0][0];
    for(var i=0; i<matrix.length; i++) {
      for(var j=0; j<matrix[i].length; j++) {
        if(max<matrix[i][j]) {
          max=matrix[i][j];
        }
      }
    }
    if(max>0) {
      return max;
    } else {
      return 0;
    }
  }
  function minInMatrix() {
    var matrix = getMatrix();
    var min = matrix[0][0];
    for(var i=0; i<matrix.length; i++) {
      for(var j=0; j<matrix[i].length; j++) {
        if(1*min>1*matrix[i][j]) {
          min=matrix[i][j];
        }
      }
    }
    if(min<0) {
      return -min;
    } else {
      return 0;
    }
  }
  function sumQ() {
    var matrix=getMatrix();
    var q = [];
    for(var i=0; i<matrix[0].length; i++) {
      q[i]=document.getElementById('q_'+(i+1)).value;
    }
    var sum = 0;
    for(var i=0; i<q.length; i++) {
      sum = 1*sum + 1*q[i];
    }
    if((sum*1)>0.999 & (sum*1)<1.001) {
      return true;
    } else {
      return false;
    }
  }
