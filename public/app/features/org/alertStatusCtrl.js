define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('AlertStatusCtrl', function($scope, alertMgrSrv) {
    var alertRows = [];
    alertMgrSrv.loadTriggeredAlerts().then(function onSuccess(response) {
      for (var i = 0; i < response.data.length; i++) {
        alertRows.push({ height: '250px', panels:[], triggeredAlert: response.data[i]});
      }

      $scope.initDashboard({
        meta: { canStar: false, canShare: false, canEdit: false },
        dashboard: {
          title: "alert-name",
          rows: alertRows,
          time: {from: "now-2h", to: "now"}
        },
      }, $scope);
    });

/*
    _.each(datasourceSrv.getAll(), function(ds) {
      if (ds.type === 'opentsdb') {
        datasourceSrv.get(ds.name).then(function(datasource) {
          self.queryMetrics(datasource);
        });
      }
    });

    this.queryMetrics = function(datasource) {
      $scope.refreshData(datasource);
    };*/

  });
});
