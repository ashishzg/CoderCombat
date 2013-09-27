angular.module('CoderCombatApp.services', [])
    .factory('socket', function($rootScope){
      var socket = io.connect(); //should be io.connect(http://localhost)?
      return {
        on: function(eventName, callback){
          socket.on(eventName, function(){
            var args = arguments;
            $rootScope.safeApply(function(){
              callback.apply(socket, args);
            });
          });
        },
        emit: function(eventName, data, callback){
          socket.emit(eventName, data, function(){
            var args = arguments;
          });
          $rootScope.safeApply(function(){
            if(callback){
              callback.apply(socket, args);
            }
          });
        }
      }
    })
    .factory('countdown', function(){
      return {
        count: function(){
          var count = 10;
          var counter = setInterval(timer, 1000);
            function timer(){
              count -= 1;
              if(count <= 0){
                clearInterval(counter);
                return;
              }
              document.getElementById('timer').innerHTML = count;
            }
        }
      }
    })
    .factory('httpConnect', ['$http', function($http){
      var makeRequest = function(){
        return $http({
            method: 'GET',
            url: 'http://10.1.1.84:3000/getQuestion'
            // url: 'http://localhost:3000/getQuestion' 
        });
      }
      return {
        connect : function(){return makeRequest()}
      }
    }]);