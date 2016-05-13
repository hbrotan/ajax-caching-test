(function () {
    'use strict';
	
    angular
        .module('app', [])
        .controller('controller', controller);
                
        controller.$inject = ['$q','$http'];    
                
        function controller($q, $http) {
            var vm = this;
            
            vm.click = click;     
            vm.response = [];
            vm.select = select;
            
            vm.getOnce = _.once(getData);
            vm.getMemoize = _.memoize(getData);
            
            function click(id){  
                if(vm.cacheMethod === 'Once'){
                    vm.getOnce(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }
                
                if(vm.cacheMethod === 'Memoize'){
                    vm.getMemoize(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }
                
                if(vm.cacheMethod === 'Angular cache'){
                    getDataWithCache(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }                                      
            }
                       
            function getData(id){     
                return $q(function(resolve, reject) {                        
                    $http.get("http://localhost:3000/" + id)
                        .then(function(response){                        
                            resolve(response.data);
                        });
                });
            }
            
            function getDataWithCache(id){     
                return $q(function(resolve, reject) {                        
                    $http.get("http://localhost:3000/" + id, { cache:true})
                        .then(function(response){                        
                            resolve(response.data);
                        });
                });
            }
            
            function select(cacheMethod){
                vm.response = [];
                switch(cacheMethod){
                    case 1 :
                        vm.cacheMethod = 'Once';
                        return;
                    case 2: 
                        vm.cacheMethod = 'Memoize';
                        return;
                    case 3:
                        vm.cacheMethod = 'Angular cache';
                        return;
                    default:
                        return;
                }
            }
        }
})();