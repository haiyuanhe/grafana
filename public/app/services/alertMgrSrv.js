define([
  'angular',
  'lodash',
  'config',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.services');

  module.service('alertMgrSrv', function($http, alertSrv/*, backendSrv*/) {
    this.alertDefMap = {};
    var self = this;
    var alertUrlRoot = "http://0.0.0.0:5001/alert/";
    var alertDefUrl = alertUrlRoot + "definition";
    var alertStatusUrl = alertUrlRoot + "status";

    this.init = function() {
    /*
      backendSrv.get('/api/alertsource').then(function(result) {
        alertDefUrl = result.alert.alert_url || "http://0.0.0.0:5001/alert/definition";
      });*/
    };

    this.load = function() {
      return $http({
        method: "get",
        url: alertDefUrl,
      }).then(function onSuccess(response) {
        for (var i = 0; i < response.data.length; i++) {
          var theAlertDef = response.data[i];
          self.alertDefMap[theAlertDef.id] = theAlertDef;
        }
        return response;
      }, function onFailed(response) {
        alertSrv.set("error", response.status + " " + (response.data || "Request failed"), response.severity, 5000);
        return response;
      });
    };

    this.save = function(alertDef) {
      return $http({
        method: "post",
        url: alertDefUrl,
        data: angular.toJson(alertDef),
        headers: {'Content-Type': 'text/plain'},
      });
    };

    this.remove = function(alertId) {
      return $http({
        method: "delete",
        url: alertDefUrl,
        params: {id: alertId},
        headers: {'Content-Type': 'text/plain'},
      });
    };

    this.get = function(id) {
      return self.alertDefMap[id];
    };

    this.loadTriggeredAlerts = function() {
      return $http({
        method: "get",
        url: alertStatusUrl,
        params: {service: "com.test"}
      });
    };

    this.init();

  });
});
