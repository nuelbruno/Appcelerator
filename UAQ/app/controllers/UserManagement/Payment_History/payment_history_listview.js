var utilities = require("utilities");

var isMoreRow = false;
var selectedIndex;
Ti.API.info('VIEW DEPARTMENT LIST');
var arrSection = [];
// var numberOfRecords = 5;
// var currentListPage = null;
// var totalListPages = null;
var count = 0;  
// var funeralDetails = [];

function loadServices(arr) {
	for (var j = 0; j < arr.length; j++) 
	{
		// Ti.API.info('PRCHASE ID: '+arr[j].purchaseId);
		var lstSection = Ti.UI.createListSection();
		arrSection.push(lstSection);
		var headerView = Ti.UI.createView({
			height : 65,
			width : "100%",
			backgroundColor : "transparent",
			//lSection : lstSection,
			isExpanded : false,
			tiemIndex : j,
			lIndex : count,
		});
		lstSection.headerView = headerView;

		var view = Ti.UI.createView({
			height : 55,
			width : "100%",
			top : 0,
			//lSection : lstSection,
			isExpanded : false,
			backgroundImage : Alloy.Globals.path.imgNormalRow,
			lIndex : count,
			tiemIndex : j,
			layout : "vertical",
		});
		headerView.add(view);

		var labelSectionTitle = Ti.UI.createLabel({
			backgroundColor : "transparent",
			height : 25,
			touchEnabled : false,
			// borderColor:'red',
			// color : (arr[j].purchaseStatus=="Failed"?"#cc0000":Alloy.Globals.path.whiteColor),
			color:Alloy.Globals.path.whiteColor,
			font : Alloy.Globals.path.font15Bold,
			text : Alloy.Globals.selectedLanguage.transID+" "+(arr[j].originalTransactionID?arr[j].originalTransactionID:arr[j].transId),
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			top : 3,
			width : "100%"
		});
		// var labelReceiptNo = Ti.UI.createLabel({
			// backgroundColor : "transparent",
			// height : 25,
			// touchEnabled : false,
			// // borderColor:'red',
			// // color : (arr[j].purchaseStatus=="Failed"?"#cc0000":Alloy.Globals.path.whiteColor),
			// color:Alloy.Globals.path.whiteColor,
			// font : Alloy.Globals.path.font15Bold,
			// text : Alloy.Globals.selectedLanguage.receiptID+" "+arr[j].confirmationId,
			// textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			// top : 30,
			// width : "100%"
		// });
		// view.add(labelReceiptNo);
		view.add(labelSectionTitle);
		
		/*var imageArrow = Ti.UI.createView({
			backgroundImage:Alloy.Globals.path.icnArrow,
			right:25,
			zIndex:234523,
			width:33,
			height:18
		});
		view.add(imageArrow);*/
		var dateView = Ti.UI.createView({
			top : 3,
			height : 30,
			width : Titanium.UI.SIZE,
			bottom : 0,
			touchEnabled : false,
			backgroundColor : "transparent",
			layout : "horizontal",
		});
		
		// var dateImage = Ti.UI.createImageView({
			// height : 15,
			// width : 15,
			// touchEnabled : false,
			// backgroundColor : "transparent",
			// image : Alloy.Globals.path.icnCalenderWhite,
		// });
		
		var labelDate = Ti.UI.createLabel({
			backgroundColor : "transparent",
			height : Titanium.UI.SIZE,
			width : Titanium.UI.SIZE,
			touchEnabled : false,
			color : Alloy.Globals.path.whiteColor,
			font : Alloy.Globals.path.font12,
			// text : arr[j].funeralDate,
			text : Alloy.Globals.selectedLanguage.receiptID+arr[j].confirmationId,
			left :2 
		});
		
		// var labelPrayerTime = Ti.UI.createLabel({
			// backgroundColor : "transparent",
			// height : Titanium.UI.SIZE,
			// width : Titanium.UI.SIZE,
			// left:6,
			// right:6,
			// touchEnabled : false,
			// color : Alloy.Globals.path.whiteColor,
			// font : Alloy.Globals.path.font12,
			// text : arr[j].prayerTime,
		// });
		
		
		if (Alloy.Globals.isEnglish) {
		   // dateView.add(dateImage);
		   dateView.add(labelDate);
		   // dateView.add(labelPrayerTime);
		} else {
		   // dateView.add(labelPrayerTime);
		   dateView.add(labelDate);
		   // dateView.add(dateImage); 
		}
		view.add(dateView);
		
		view.addEventListener("click", function(e) {
			Ti.API.info('PAYMENT DATA @ CLICKED RECORDS: '+JSON.stringify(arr[e.source.tiemIndex]));
			// Ti.API.info('userdata:'+JSON.stringify(Ti.App.Properties.getObject("LoginDetaisObj")));
			var align = (Alloy.Globals.isEnglish?Titanium.UI.TEXT_ALIGNMENT_LEFT:Titanium.UI.TEXT_ALIGNMENT_RIGHT);
		   /*var location = arr[e.source.tiemIndex].locations;
		   var funeralDate = arr[e.source.tiemIndex].funeralDate;
		   var prayerTime = arr[e.source.tiemIndex].prayerTime;
		   var deceasedName = arr[e.source.tiemIndex].deceasedName;
		   var motherName = arr[e.source.tiemIndex].motherName;
		   var fatherName = arr[e.source.tiemIndex].fatherName;
		   var place = arr[e.source.tiemIndex].place;
		   var symmetry = arr[e.source.tiemIndex].cemetry;
		   var description = arr[e.source.tiemIndex].description;*/
		  
		  
		   var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		   var modifiedDate1 = arr[e.source.tiemIndex].transdate;
		   var arrqQ = modifiedDate1.split(/[- :T]/); 
		   var day = arrqQ[2];
		   var year = arrqQ[0];
		   var month = monthNames[arrqQ[1]-1]; //date.getMonth()+1;
		   var hours = arrqQ[3];
		   var ampm = (hours >= 12) ? "PM" : "AM";
		   var hourMinR = (hours > 12) ? hours -12 : hours;
		   var hourMin = (hourMinR<10?'':'') + hourMinR;
		   var minitues = (arrqQ[4]<10?'':'') + arrqQ[4]; //date.getMinutes();
		   var modifiedDate = day+"-"+month+"-"+year+ "  "+ hourMin + ":"+ minitues + " "+ ampm;
		   // var funeralDetails = [];	
			   // funeralDetails.push(Alloy.Globals.selectedLanguage.reminder);
			   // funeralDetails.push(utilities.cleanFuneralHtml(description));
		   
			if (e.source.isExpanded) 
			{
				arrSection[e.source.lIndex].setItems([]);
				e.source.backgroundImage = Alloy.Globals.path.imgNormalRow;
			}
			else 
			{
				if(selectedIndex)
				{
					arrSection[selectedIndex.lIndex].setItems([]);
					selectedIndex.backgroundImage = Alloy.Globals.path.imgNormalRow;
				    selectedIndex.isExpanded = false; 
				}
				selectedIndex = e.source;
				
				var TransAmnt = arr[e.source.tiemIndex].transAmount;
					TransAmnt = (TransAmnt/100);
					
				var eDirhFeees = arr[e.source.tiemIndex].eDirhFees;
					eDirhFeees = (eDirhFeees/100);
					
				var purchStatusMain = arr[e.source.tiemIndex].transStatus.toLowerCase(); 
				var transactionStatusMsg = null;
				var purchaseStatusMsg = null;
				
				if (purchStatusMain =="0000"){
					transactionStatusMsg = Alloy.Globals.selectedLanguage.transSuccessMSG;
					purchaseStatusMsg = Alloy.Globals.selectedLanguage.purchaseCompletedMSG;
				}
				else{
					transactionStatusMsg = Alloy.Globals.selectedLanguage.transFailMSG; 
					purchaseStatusMsg = Alloy.Globals.selectedLanguage.purchaseFailedMSG;
				}
				
					
				var arrData = [];
					arrData.push({
						template : "paymentDetailView",
						
						lblPurchaseIDLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.purchaseID
						},
						lblPurchaseIDValue:{
							text:arr[e.source.tiemIndex].purchaseId,
							textAlign:align
						},
						
						lblPurchaseStatusLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.purchaseStatus
						},
						lblPurchaseStatusValue:{
							text:purchaseStatusMsg,
							color:(purchStatusMain =="0000"?"#0047b3":"#cc0000"),
							textAlign:align
						},
						
						lblTransactionMsgLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.transMSG
						},
						
						lblTransactionMsgValue:{							
							// right:(Alloy.Globals.isEnglish?undefined:'10dp'),
							// left:(Alloy.Globals.isEnglish?'10dp':undefined),
							font : Alloy.Globals.path.font13,
							// text:arr[e.source.tiemIndex].transStatusMsg.split('+').join(' '),
							text:transactionStatusMsg,
							textAlign:align,
						},
						
						lblTransactionDateLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.transDate
						},
						lblTransactionDateValue:{
							// text:arr[e.source.tiemIndex].transdate,
							text:modifiedDate,
							textAlign:align
						},
						
						/*lblAmountLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.amnt
						},
						
						lblAmountValue:{
							text:(arr[e.source.tiemIndex].amount?arr[e.source.tiemIndex].amount:"0"),
							textAlign:align
						},*/
						
						lblEDirhaFeesLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.eDirhamFee
						},
						lblEDirhaFeesValue:{
							text:eDirhFeees,
							textAlign:align
						},
						
						lblTransactionAmountLabel:{
							textAlign:align,
							text:Alloy.Globals.selectedLanguage.transAmnt
						},
						lblTransactionAmountValue:{
							// text:arr[e.source.tiemIndex].transAmount,
							text:TransAmnt,
							textAlign:align
						},
						properties : {
							doc : arr[e.source.tiemIndex],
							backgroundColor : 'transparent'
						}
					});
				arrData.push({
							labelFuneralTitle : {
								backgroundColor : 'transparent'
							},
							properties : {
								backgroundColor : 'transparent'
							}
					});
				
				e.source.backgroundImage = Alloy.Globals.path.imgSelectedRow;
				arrSection[e.source.lIndex].setItems(arrData);
			}
			e.source.isExpanded = !e.source.isExpanded;
		});
	   count++;
	}
	 $.listviewServices.sections = arrSection;
	// $.listviewDepartment.sections[0].setItems(arrData);
	Alloy.Globals.hideLoading();
}

exports.loadServices = loadServices;


/*function webviewLoad(){
	Ti.API.info('web view load==============');
}*/

/*function getResponseData() {
	httpManager.getFuneralDetails(function(response) {
		if (response == null)
			return;
			
		if (response.count > 0) {
			currentListPage++;
			totalListPages = Math.ceil((response.count / numberOfRecords));
			if (Object.prototype.toString.call(response.funerals) == "[object Array]") {
				loadServices(response.funerals, " ",currentListPage,totalListPages);
			} else {
				loadServices([response.funerals], " ",currentListPage,totalListPages);
			}
		} 

	}, currentListPage, numberOfRecords);
}*/


function onItemClick(e) {
	Ti.API.info('On Item click event....');
	 /*utilities.disableMultiTouch(e.source);
	 var section = $.listviewServices.sections[e.sectionIndex];
	 var item = section.getItemAt(e.itemIndex);
	 if(item.properties.isLink)
	 {
	 if(Ti.Platform.osname == 'android')
	   Ti.Platform.openURL('Maps://http://maps.google.com/maps?q='+item.properties.doc.latitude +','+ item.properties.doc.longitude);
	  else
	   Ti.Platform.openURL('Maps://http://maps.google.com/maps?q='+item.properties.doc.latitude +','+ item.properties.doc.longitude);
	 }*/
}
function removeData() {
	arrSection = [];
	count = 0;
}
exports.removeData = removeData;
