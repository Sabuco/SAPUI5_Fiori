sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("seidorZUI5_FLIGHT_AGS.controller.View1", {
		onPress: function() {
			this.getView().setModel(new sap.ui.model.json.JSONModel());
			this.getView().getModel().setProperty("/modelCall", new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZFLIGHT_LIST_AGS_SRV",
				true));

			var that = this;
			this.getView().getModel().getProperty("/modelCall").read("/sflightSet", null, null, false,
				function _OnSuccess(oData) {
					var i = 0;
					for (i = 0; i < oData.results.length; i++) {
						var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
							pattern: "KK:mm:ss a"
						});
						var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
						var timeStr = timeFormat.format(new Date(oData.results[i].Deptime.ms + TZOffsetMs)); //11:00 AM
						var parsedTime = new Date(timeFormat.parse(timeStr).getTime() - TZOffsetMs); //39600000
						    oData.results[i].Deptime= parsedTime ;
					}

					that.getView().getModel().setProperty("/sflight", oData.results);
					//console.log(oData.results);
				},
				function _OnError(error) {
					// console.log(error);
				}

			);
			//console.log(this.getView().getModel());
		},
		onPressGoToDetail: function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("vista2");
		}

	});
});