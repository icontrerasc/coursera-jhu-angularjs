(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsTemplate.html',
    scope: {
      foundList: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemsViewModel',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItemsViewModel = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDownViewModel = this;

  narrowItDownViewModel.foundList = null;
  narrowItDownViewModel.searchTerm = "";

  narrowItDownViewModel.getMatchedMenuItems = function () {
    if (narrowItDownViewModel.searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDownViewModel.searchTerm);
      promise.then(function (response) {
        narrowItDownViewModel.foundList = response;
      })
      .catch(function (error) {
        console.log("Error! Try again!");
      });
    }
  };

  narrowItDownViewModel.removeItem = function (itemIndex) {
    narrowItDownViewModel.foundList.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response =
    $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        var foundItems = [];
        result.data.menu_items.forEach(function(item) {
          if (item.description.includes(searchTerm))
            foundItems.push(item);
        });
        return foundItems;
    });

    return response;
  };
}

})();
