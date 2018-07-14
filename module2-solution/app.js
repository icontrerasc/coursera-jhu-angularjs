(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyViewModel = this;

  toBuyViewModel.toBuyList = ShoppingListCheckOffService.getToBuyList();

  toBuyViewModel.removeItemAndAddToBought = function (itemIndex) {
    ShoppingListCheckOffService.removeItemAndAddToBought(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtViewModel = this;

  alreadyBoughtViewModel.boughtList = ShoppingListCheckOffService.getBoughtList();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = initializeToBuyList();
  var boughtList = [];

  service.removeItemAndAddToBought = function (itemIndex) {
    var item = toBuyList[itemIndex];
    boughtList.push(item);
    toBuyList.splice(itemIndex, 1);
  };

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getBoughtList = function () {
    return boughtList;
  };

  function initializeToBuyList() {
    return [
      {
        name: "Cookies",
        quantity: 5
      },
      {
        name: "Cakes",
        quantity: 2
      },
      {
        name: "Pastries",
        quantity: 3
      },
      {
        name: "Fruits",
        quantity: 4
      },
      {
        name: "Nuts",
        quantity: 10
      },
      {
        name: "Sandwiches",
        quantity: 7
      }
    ];
  }
}

})();
