(function () {
    'use strict';
	
    angular
        .module('app', [])
        .controller('controller', controller)
        .factory('dataservice', dataservice);
                
        controller.$inject = ['dataservice'];
        dataservice.$inject = ['$q','$http'];    
                                           
        function controller(dataservice) {
            var vm = this;
            
            vm.click = click;     
            vm.response = [];
            vm.select = select;
            
            function click(id){  
                if(vm.cacheMethod === 'Once'){
                    dataservice.getDataOnce(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }
                
                if(vm.cacheMethod === 'Memoize'){
                    dataservice.getDataMemoize(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }
                
                if(vm.cacheMethod === 'AngularCache'){
                    dataservice.getDataWithCache(id).then(function(data){
                        vm.response.push(data);    
                    });        
                }                                      
            }                                   
            
            function select(cacheMethod){
                vm.response = [];
                vm.cacheMethod = cacheMethod;
            }                      
        }
        
        function dataservice($q, $http){
            return {
		        getDataOnce : _.once(getData),
                getDataMemoize : _.memoize(getData),
                getDataWithCache : getDataWithCache
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
        }    
})();