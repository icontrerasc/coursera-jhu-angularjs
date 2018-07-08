(function () {
'use strict';

angular.module('LunchCheckApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.lunchMessage = "";
  $scope.lunchMessageColor = "";
  $scope.textBoxColor = "";

  $scope.checkIfTooMuch = function () {
    var total = calculatNumerOfDishes($scope.lunchMenu);
    var message, messageColor, textBoxColor = "";

    if (total == 0) {
      message = "Please enter data first";
      messageColor = textBoxColor = "red";
    } else if (total <= 3) {
      message = "Enjoy!";
      messageColor = textBoxColor = "green";
    } else if (total > 3) {
      message = "Too much!";
      messageColor = textBoxColor = "green";
    }

    $scope.lunchMessageColor = messageColor;
    $scope.textBoxColor = textBoxColor;
    $scope.lunchMessage = message;
  };

  function calculatNumerOfDishes(dishesString) {
    var dishes = dishesString.split(",");
    var total = 0;

    for (var i = 0; i < dishes.length; i++) {
      if (dishes[i].trim() != "") {
        total++;
      }
    }

    return total;
  }
}

})();
