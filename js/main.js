  var data = [
    //   {id: 1, name: 'Ted', isActive: true, color: 'orange', date: '2015-01-01'},
    //   {id: 2, name: 'John', isActive: false, color: 'black', date: null},
    //   {id: 3, name: 'Al', isActive: true, color: 'red', date: null},
    //   {id: 4, name: 'Ben', isActive: false, color: 'blue', date: null}
    ],
    container = document.getElementById('example'),
    hot,
    yellowRenderer,
    greenRenderer,
    colors = ["yellow", "red", "orange", "green", "blue", "gray", "black", "white"];
    
    var obj = {
        id: 1234,
        name: 'Joe',
        isActive: false,
        color: 'purple',
        date: new Date()
    };

  yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
      
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'yellow';

  };

  greenRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.backgroundColor = 'green';

  };
  
  for(var i=0; i<500; i++) {
      data.push({id: 1, 
                 name: (Math.floor(Math.random() * 1024) + 1), 
                 isActive: (Math.floor(Math.random() * 2) + 0) === 1 ? true : false, 
                 color: colors[(Math.floor(Math.random() * (colors.length - 1)) + 0)], 
                 date: '2015-01-01'});
  }

  hot = new Handsontable(container, {
    data: data,
    startRows: 5,
    colHeaders: true,
    minSpareRows: 1,
    columns: [
      {data: "id", type: 'text'},
      // 'text' is default, you don't actually need to declare it
      {data: "name", renderer: yellowRenderer},
      // use default 'text' cell type but overwrite its renderer with yellowRenderer
      {data: "isActive", type: 'checkbox'},
      {data: "date", type: 'date', dateFormat: 'YYYY-MM-DD'},
      {data: "color",
        type: 'autocomplete',
        source: colors
      }
    ],
    colWidths: [window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5],
    // cell: [
    //   {row: 1, col: 0, renderer: greenRenderer}
    // ],
    cells: function (row, col, prop) {
      if (col === 2) {
        this.renderer = greenRenderer;
      }
    }
  });
  
  
  window.onresize = function(ev){
    hot.updateSettings({
       colWidths: [window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5, window.innerWidth / 5]
    });
  };