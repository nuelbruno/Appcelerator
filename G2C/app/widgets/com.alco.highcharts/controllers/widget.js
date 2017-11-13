if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function PixelsToDPUnits(ThePixels) {
	return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
}

function DPUnitsToPixels(TheDPUnits) {
	return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
}

var preDict = {};

function loadChart(type, data, arrXAxis, xAxisLabel, yAxisLabel, marginLeft, isBreak, direction, isPredictionary) {// data argument must be properly designed so it can work in different situations
	preDict = {
		type : type,
		data : data,
		arrXAxis : arrXAxis,
		xAxisLabel : xAxisLabel,
		yAxisLabel : yAxisLabel,
		marginLeft : marginLeft,
		isBreak : isBreak,
		direction : direction
	};

	var templateURL;
	var totalTitle;
	if (isPredictionary == undefined) {
		if (isBreak == undefined) {
			for (var i = 0; i < data.length; i++) {
				var preCount = 0,
				    nextCount = 0;
				var name = "";
				while (preCount < data[i].name.length) {
					if (preCount + 35 >= data[i].name.length) {
						name += data[i].name.substr(preCount);
						break;
					} else {
						nextCount = data[i].name.substr(preCount, 35).lastIndexOf(" ");
					}
					if (nextCount != -1) {
						name += data[i].name.substr(preCount, nextCount) + "<br/>";
						preCount += nextCount;
					} else {
						name += data[i].name.substr(preCount, 35) + "<br/>";
						preCount += 35;
					}
				}
				data[i].name = name;
				// Ti.API.info('>>>>>>>>>>>' + data[i].name);
			}
		} else if (isBreak == true) {
			for (var k = 0; k < data.length; k++) {
				var arrdata = data[k].data;
				for (var i = 0; i < arrdata.length; i++) {
					var preCount = 0,
					    nextCount = 0;
					var name = "";
					while (preCount < arrdata[i].name.length) {
						if (preCount + 35 >= arrdata[i].name.length) {
							name += arrdata[i].name.substr(preCount);
							break;
						} else {
							nextCount = arrdata[i].name.substr(preCount, 35).lastIndexOf(" ");
						}
						if (nextCount != -1) {
							name += arrdata[i].name.substr(preCount, nextCount) + "<br/>";
							preCount += nextCount;
						} else {
							name += arrdata[i].name.substr(preCount, 35) + "<br/>";
							preCount += 35;
						}
					}
					arrdata[i].name = name;
					// Ti.API.info('>>>>>>>>>>>' + arrdata[i].name);
				}
			}
		}
	}
	var region = data;
	// = data.region;
	// pre-define different HTML files for different types of charts and different algorithms to interpret the data values
	switch (type) {
	case "PIE":

		$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);

		templateURL = WPATH('/html/pie.html');
		break;

	case "BAR":

		//$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		$.chartWebView.height = Ti.UI.FILL;
		templateURL = WPATH('/html/normalBar.html');
		break;

	case "STACKED BAR":

		$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/stackedBar.html');
		break;

	case "COFOG_YEARS BAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/CofogByYearBar.html');
		totalTitle = Alloy.Globals.selectedLanguage.value;

		break;

	case "REV_EXP BAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/RevAndExpBar.html');

		break;

	case "COFOG_GROUPS BAR":
		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/CofogByGroupBar.html');
		totalTitle = Alloy.Globals.selectedLanguage.value;

		break;

	case "GFS ASSE_LIA BAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//$.chartWebView.height = (Alloy.Globals.GetHeight(210) + density);
		templateURL = WPATH('/html/GFS_Asse_Lia.html');
		totalTitle = Alloy.Globals.selectedLanguage.value;

		break;

	case "BUDGET SINGLE YEAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		// $.chartWebView.height = (Alloy.Globals.GetHeight(210) + density);
		templateURL = WPATH('/html/BudgetReports_SingleYearBar.html');
		totalTitle = Alloy.Globals.selectedLanguage.total;
		break;

	case "BUDGET MULTIPLE YEAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//$.chartWebView.height = (Alloy.Globals.GetHeight(210) + density);
		templateURL = WPATH('/html/BudgetReports_MultipleYearStacked.html');
		totalTitle = Alloy.Globals.selectedLanguage.total;
		break;

	case "GFS REV_EXP BAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//$.chartWebView.height = (Alloy.Globals.GetHeight(250) + density);
		templateURL = WPATH('/html/GFS_Rev_Exp.html');
		totalTitle = Alloy.Globals.selectedLanguage.value;

		break;

	case "GFS_INDICIES PIE":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/GFS_IndiciesPie.html');

		break;

	case "GFS_FEDERAL PIE":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/GFS_FederalPie.html');

		break;

	case "BUDGET_GROUP BAR":

		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;

		//	$.chartWebView.height = (Alloy.Globals.GetHeight(180) + density);
		templateURL = WPATH('/html/BudgetGroupBar.html');

		break;
	//
	case "PIE_DONUT":

		$.chartWebView.width = "100%";
		$.chartWebView.top = 0;
		$.chartWebView.bottom = 0;
		if (OS_IOS) {
			templateURL = WPATH('/html/pie_donut_IOS.html');
		} else {
			templateURL = WPATH('/html/pie_donut.html');
		}

		break;
	}

	$.chartWebView.url = templateURL;
	function loadDataInWebView() {
		var height,isArabic = !Alloy.Globals.isEnglish;
		var font_Size;

		//	height = Alloy.Globals.platformHeight - (Alloy.Globals.GetHeight(200));
		if (OS_IOS) {
			if (Alloy.isTablet) {
				font_Size = 19;
				if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
					height = Alloy.Globals.platformWidth - (Alloy.Globals.GetHeight(30) + 100);
				} else {
					height = Alloy.Globals.platformHeight - (Alloy.Globals.GetHeight(30) + 100);
				}
			} else {
				font_Size = 14;
				height = Alloy.Globals.platformHeight - (Alloy.Globals.GetHeight(30) + 100);
			}
		} else {

			if (Alloy.isTablet) {
				font_Size = 19;
				if (Ti.Gesture.orientation == 2) {
					height = PixelsToDPUnits(Alloy.Globals.platformWidth - Alloy.Globals.GetHeight(30));
					//800 //1025;
				} else {
					height = PixelsToDPUnits(Alloy.Globals.platformHeight - Alloy.Globals.GetHeight(30));


				}
				height -= 125;
				
			} else {
				height = 500;
				font_Size = 14;
			}

		}
		if (type == "PIE_DONUT") {
			if (Alloy.isTablet) {
				height = 215;
			} else {
				height = 150;
			}
		}
		// = data.s2;
		var s3;
		// = data.s3;

		Ti.API.info('region ' + JSON.stringify(region));
		//	Ti.API.info('arrXAxis '+JSON.stringify(arrXAxis));

		var delay = setTimeout(function(e) {
			$.chartWebView.evalJS('plotChart(' + JSON.stringify(region) + ',' + JSON.stringify(arrXAxis) + ',' + JSON.stringify(height) + ',' + JSON.stringify(xAxisLabel) + ',' + JSON.stringify(yAxisLabel) + ',' + JSON.stringify(totalTitle) + ',' + JSON.stringify(font_Size) + ',' + JSON.stringify(marginLeft) + ',' + JSON.stringify(direction) +',' + JSON.stringify(isArabic) + ')');
			$.chartWebView.removeEventListener('load', loadDataInWebView);
			clearTimeout(delay);
			delay = null;
		}, 600);

	};
	$.chartWebView.addEventListener('load', loadDataInWebView);
}

function reloadChart() {
	loadChart(preDict.type, preDict.data, preDict.arrXAxis, preDict.xAxisLabel, preDict.yAxisLabel, preDict.marginLeft, preDict.isBreak, preDict.direction, true);
}

exports.reloadChart = reloadChart;
exports.loadChart = loadChart;
