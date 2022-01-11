class DbService{
  list;
  constructor(){
    this.list = JSON.parse(localStorage.getItem('items'));
    this.list == null? localStorage.setItem('items', '[]') : "";
  }
  GetItems(){
      let list = JSON.parse(localStorage.getItem('items'));
      console.log(`trying to return list \n ${list}\n`);
      return list;
  }

  AddItem(name){
      let list = this.GetItems();
      console.log(`trying to add {${name}} to \n ${list}\n`);
      list.push(name);

      localStorage.setItem('items', JSON.stringify(list));

  }
  DeleteItem(name){
      let list = this.GetItems();
      console.log(`trying to delete {${name}} from \n ${list}\n`);
      var index = list.indexOf(name);
      if (index !== -1) {
        list.splice(index, 1);
      }

      localStorage.setItem('items', JSON.stringify(list));


  }
}

var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
      .when('/',
          {
              controller: 'myCtrl',
              templateUrl: "Partials/v_index.html"
          })
      .when('/favourite',
          {
              controller: 'itmCtrl',
              templateUrl: 'Partials/v_wishlist.html'
          })
      .otherwise({ redirectTo: '/' });
});
//routing in AngularJS


app.controller('myCtrl', function($scope) {
  $scope.count = 0;
  $scope.doSomething = function(){alert("something")};
  $scope.reset = function(){$scope.count=0;}
  $scope.add = function(value){
    $scope.count = $scope.count + value;;
  }
  $scope.setName = function(name){
    localStorage.removeItem('username');
    localStorage.setItem('username', name);
  }

});


app.controller('itmCtrl', function($scope, $window) {

  $scope.dbservice =  new DbService();
  $scope.items =  $scope.dbservice.GetItems()

  $scope.name = localStorage.getItem('username');
  if($scope.name == null ){
      console.log($scope.name);
        $window.location.href = '/index.html';
  }
/* 
     $scope.addItem = function(obj){
         $scope.items.push(obj);
     }
     $scope.removeItem = function(obj){
         var index = $scope.items.indexOf(obj);
         if (index !== -1) {
             $scope.items.splice(index, 1);
         }
     }
*/
    $scope.addItem = (name)=>{
      $scope.dbservice.AddItem(name);
      $scope.items =  $scope.dbservice.GetItems()
    };

    $scope.removeItem =(name)=>{
      $scope.dbservice.DeleteItem(name);
      $scope.items =  $scope.dbservice.GetItems()
    };
    
});



app.controller('weatherCtrl', function($scope) {
  $scope.IsForecastNotHiden = false;
  $scope.search = (name)=>{
    //api call mock
    if(name.length >5 ){
      $scope.IsForecastHiden = true;
    }  
  }

});


