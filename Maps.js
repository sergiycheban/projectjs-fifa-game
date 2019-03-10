var map = AmCharts.makeChart("chartdiv", {
  type: "map",
  theme: "light",
  projection: "eckert3",
  dataProvider: {
    map: "worldLow",
    getAreasFromMap: true
  },
  areasSettings: {
    selectedColor: "#CC0000",
    selectable: true
  },

  listeners: [
    {
      event: "clickMapObject",
      method: function(e) {
        if (e.mapObject.objectType !== "MapArea") return;

        var area = e.mapObject;

        area.showAsSelected = !area.showAsSelected;
        e.chart.returnInitialColor(area);

        document.getElementById("selected").innerHTML = JSON.stringify(
          Maps.getSelectedCountries()
        );
      }
    }
  ]
});

var Maps = {
  getSelectedCountries() {
    var selected = [];
    for (var i = 0; i < map.dataProvider.areas.length; i++) {
      if (map.dataProvider.areas[i].showAsSelected) {
        selected.push(map.dataProvider.areas[i].enTitle);
      }
    }
    return selected;
  }
};
