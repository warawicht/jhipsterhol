(function() {
    'use strict';

    angular
        .module('jhipsterholApp')
        .controller('TypeDialogController', TypeDialogController);

    TypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Type', 'HipsterPoi'];

    function TypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Type, HipsterPoi) {
        var vm = this;
        vm.type = entity;
        vm.hipsterpois = HipsterPoi.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('jhipsterholApp:typeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.type.id !== null) {
                Type.update(vm.type, onSaveSuccess, onSaveError);
            } else {
                Type.save(vm.type, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
