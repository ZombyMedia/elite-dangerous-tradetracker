var needle = require('request');
var args = process.argv.slice(2);

function getMarketId(nameOfSystem, nameOfStation) {
  var requestUrl = "https://www.edsm.net/api-system-v1/stations?systemName=" + modifyNameSlice;
  var request = require('sync-request');
  var res = request('GET', requestUrl);

  var marketId = JSON.parse(res.body, "utf-8");
  var objectLength = Object.keys(marketId.stations).length;
  for (var i = 0; i < objectLength; i++) {
    if (marketId.stations[i].name == nameOfStation) {
      var result = marketId.stations[i].marketId;
      return result;
    }
  }
}

function getMarkedData(nameOfSystem, markedId, searchedProduct) {
  if (!markedId) {
    console.log("This market returned no values");
  } else {
    var requestUrl = "https://www.edsm.net/api-system-v1/stations/market?marketId=" + markedId + "&systemName=" + nameOfSystem;
    var request = require('sync-request');
    var res = request('GET', requestUrl);

    var marketData = JSON.parse(res.body, "utf-8");
    var marketDataAdc = "";

    var objectLength = Object.keys(marketData.commodities).length;
    var allProducts = "";

    for (var i = 0; i < objectLength; i++) {
      marketDataAdc = marketData.commodities[i];
      allProducts += marketDataAdc.name + ", ";

      if (marketDataAdc.name == searchedProduct) {
        var productId = marketDataAdc.id;
        var productName = marketDataAdc.name;
        var productStock = marketDataAdc.stock;
        var productBuyPrice = marketDataAdc.buyPrice;
        var productSellPrice = marketDataAdc.sellPrice;
        var productDemand = marketDataAdc.demand;

      }
    }
    if (!allProducts.includes(searchedProduct)) {
      console.log("Market does not stock the product");
    }
  }
}

function getAllStations(nameOfSystem) {
  if (!nameOfSystem) {
    console.log("No Systemname provided");
  } else {
    var requestUrl = "https://www.edsm.net/api-system-v1/stations?systemName=" + nameOfSystem;
    var request = require('sync-request');
    var res = request('GET', requestUrl);

    var marketData = JSON.parse(res.body, "utf-8");
    var marketDataAdc = "";

    return marketData;
  }
}


if (args[0]) {
  var nameOfSystem = args[0];
  var nameOfStation = args[1];
  var nameOfProduct = args[2];

  var modifyNameSpace = nameOfSystem.replace(/\s+/g, '%20');
  var modifyNameSlice = modifyNameSpace.replace(/\'/g, '%27');

  // var marketId = getMarketId(modifyNameSlice, nameOfStation);
  // var marketData = getMarkedData(modifyNameSlice, marketId, nameOfProduct);
  var allSystems = getAllStations(modifyNameSlice);
  console.log(allSystems);
} else {
  console.log("Can't find any arguments");
}
