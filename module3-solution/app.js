(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    //templateUrl: 'foundItemsTemplate.html',
    template:
   '<h3>Title: </h3>\
   <ol>\
      <li ng-repeat="item in foundItemsViewModel.foundList">\
        {{ item.short_name }} of {{ item.description }}\
      </li>\
    </ol>',
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

  narrowItDownViewModel.foundList = [];
  narrowItDownViewModel.searchTerm = "";

  narrowItDownViewModel.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(narrowItDownViewModel.searchTerm);

    promise.then(function (response) {
      narrowItDownViewModel.foundList = response;
    })
    .catch(function (error) {
      console.log("Error! Try again!");
    });
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
