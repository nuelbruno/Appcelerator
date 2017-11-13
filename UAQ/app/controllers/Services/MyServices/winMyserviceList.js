var utilities = require("utilities");
var httpManager = require("httpManager");

Ti.API.info('View my services LIST');
var arrSection = [];
var cameSecondTime = false;
var preSelectedIndex;

var myRequestDetails = [];
var itemIndexToScroll = 0;
var arrActionList = [
	{
		id : 33,
		text :  Alloy.Globals.selectedLanguage.proApplicationFee, 
	},
	{
		id : 18,
		text :  Alloy.Globals.selectedLanguage.procServiceFeep, 
	},
	{
		id : 5,
		text :  Alloy.Globals.selectedLanguage.resubmit, 
	},
	{
		id : 21,
		text :  Alloy.Globals.selectedLanguage.proReviewer, 
	},
	{
		id : 26,
		text :  Alloy.Globals.selectedLanguage.subNOC, 
	},
	{
		id : 31,
		text :  Alloy.Globals.selectedLanguage.subLicense, 
	},
	{
		id : 34,
		text :  Alloy.Globals.selectedLanguage.toissueSiteplan, 
	},
	];

var arrReviewerOperation = [
	{
		id : 403,
		text :  Alloy.Globals.selectedLanguage.proCardRequest, 
	},
	{
		id : 302,
		text :  Alloy.Globals.selectedLanguage.landDemarkation, 
	},
	{
		id : 301,
		text :  Alloy.Globals.selectedLanguage.extenGrandLand, 
	},
	{
		id : 303,
		text :  Alloy.Globals.selectedLanguage.addLand, 
	},
	];


function loadServices(arr, idToMatch) { 
	Ti.API.info('+++++++++View my services myRequestDetails'+ JSON.stringify(arr));
	


	//if($.listviewServices.getSectionCount() > 0){
	  //$.listviewServices.sections[0].setItems([]); 
	  $.listviewServices.setSections([]);
	  arrSection = [];
	try{  
     if(arr.length > 0)
     {	
     for (var j = 0; j < arr.length; j++) {
		
		var lstSection = Ti.UI.createListSection();
		var headerView = Ti.UI.createView({
			height : 60,
			width : "100%",
			backgroundColor : "transparent",
			//borderColor : "blue",  // to do
			//lSection : lstSection,
			isExpanded : false,
			lIndex : j
		});
		lstSection.headerView = headerView;
		
		var view = Ti.UI.createView({
			height : 45,
			//width : "100%",
			left : 30,
			right : 30,
			top : 0,
			//lSection : lstSection,
			isExpanded : false,
			//borderColor : "red",  // to do
			backgroundImage : Alloy.Globals.path.imgNormalRow,
			lIndex : j
		});
		headerView.add(view);
		
		var labelSectionTitle = Ti.UI.createLabel({
			left : 30,
			right : 30,
			backgroundColor : "transparent",
			height : Titanium.UI.SIZE,
			touchEnabled : false,
			color : Alloy.Globals.path.whiteColor,
			font : Alloy.Globals.path.font14,
			text :   arr[j].requestNo,  //arr.funerals[j].name,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER	
		});
		view.add(labelSectionTitle); 
		Ti.API.info('title list'+ arr[j].requestNo);
		
		var sectionSpace = Ti.UI.createView({
			height : 10,
			width : "100%",
			bottom : 0,
			//borderColor : "yellow",  // to do
			touchEnabled : false,
			backgroundColor : "transparent"
		}); 
		headerView.add(sectionSpace);
		view.sectionSpace = sectionSpace;
			
		view.addEventListener("click", function(e) {
			//var d1 = moment (datestr);
           Ti.API.debug ("d1------: " + arr[e.source.lIndex].createdDate);
           
           var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                         ];	
           var sourceType = arr[e.source.lIndex].source;               	
		   var statusId = arr[e.source.lIndex].statusId;
		   var serviceId = arr[e.source.lIndex].serviceId;
		   var createdDate1 = arr[e.source.lIndex].createdDate;
		   Ti.API.info('CRAEATED DATE:1 '+createdDate1);
		   Ti.API.info('MODIFIED  DATE:1 '+arr[e.source.lIndex].modifiedDate);
		   var arrq = createdDate1.split(/[- :T]/); // from your example var date = "2012-11-14T06:57:36+0000";
           //var dateddd = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], 00);
           //var dateqq = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], 00);
           Ti.API.info(arrq[0]+'DAY-YEAR-MONTH: '+JSON.stringify(arrq));
		   //var cretDate = new Date(createdDate1);
		   //Ti.API.info('CRAEATED DATE: '+cretDate);
		   var crDay = arrq[2];
		   var cryear = arrq[0];
		   var crmonth =  monthNames[arrq[1]-1]; //cretDate.getMonth()+1;
		   Ti.API.info('DAY-YEAR-MONTH: '+crDay+cryear+crmonth);
		   var crhours = arrq[3];
		   var crampm = (crhours >= 12) ? "PM" : "AM";
		   var cHoursminR = (crhours > 12) ? crhours -12 : crhours;
		   var cHoursmin = (cHoursminR<10?'':'') + cHoursminR;
		   var crminitues = (arrq[4]<10?'':'') + arrq[4]; //cretDate.getMinutes();
		   var createdDate = crDay+"-"+crmonth+"-"+cryear+ "  "+ cHoursmin + ":"+ crminitues + " "+ crampm;
		   
		   var modifiedDate1 = arr[e.source.lIndex].modifiedDate;
		   var arrqQ = modifiedDate1.split(/[- :T]/); 
		  // var date = new Date(modifiedDate1);
		   var day = arrqQ[2];
		   var year = arrqQ[0];
		   var month = monthNames[arrqQ[1]-1]; //date.getMonth()+1;
		   var hours = arrqQ[3];
		   var ampm = (hours >= 12) ? "PM" : "AM";
		   var hourMinR = (hours > 12) ? hours -12 : hours;
		   var hourMin = (hourMinR<10?'':'') + hourMinR;
		   var minitues = (arrqQ[4]<10?'':'') + arrqQ[4]; //date.getMinutes();
		   var modifiedDate = day+"-"+month+"-"+year+ "  "+ hourMin + ":"+ minitues + " "+ ampm;
		   
		  
		   var requestno = arr[e.source.lIndex].requestNo;
		   var requestId = arr[e.source.lIndex].requestid;


		   
		   Ti.API.info(e.source.isExpanded+'status id after click event' + statusId); //statusId = 5;
		   
		   var serviceName;
		   if(e.source.isExpanded == false){
		   	   if(preSelectedIndex)
				{
					arrSection[preSelectedIndex.lIndex].setItems([]);
					preSelectedIndex.backgroundImage = Alloy.Globals.path.imgNormalRow;
					preSelectedIndex.sectionSpace.backgroundColor = "transparent"; 
				    preSelectedIndex.isExpanded = false; 
				}
				preSelectedIndex = e.source;
			   httpManager.getServiceLookUpcall(serviceId, function(response) {
					if(response == null)
						return;
						
	   					serviceName = response[0].serviceNme;
	   					callStatusid();
			   });
			    var statusText;
			   function callStatusid(){
			   	  httpManager.getServiceStatusIdLookUp(statusId, function(response) {
					if(response == null)
						return;
						
	   					statusText = response[0].statusNm;
	   					var obj = {
	   						statusId : statusId,
	   						serviceId : serviceId,
	   						requestno : requestno,
	   						requestId : requestId,
	   						//statusText : statusText,
	   						serviceName : serviceName,
	   					};
	   					showDropDownView(obj);
			      });
			   }
		   }else{
		   	                arrSection[e.source.lIndex].setItems([]);
							e.source.backgroundImage = Alloy.Globals.path.imgNormalRow;
							e.source.sectionSpace.backgroundColor = "transparent"; 
		   }
		   function showDropDownView(obj){ 
		   
					   var myRequestDetails = [];	
					   
					   
					  					   
					   if(serviceName)
					   myRequestDetails.push(serviceName);
					   
					   if(createdDate)
					   //myRequestDetails.push(createdDate);
					   
					   if(modifiedDate)
					   //myRequestDetails.push(modifiedDate);
					   
					    if(statusText)
					   myRequestDetails.push(statusText);

					  
			
						if (!e.source.isExpanded) {  
							arrSection[e.source.lIndex].setItems([]);
							e.source.backgroundImage = Alloy.Globals.path.imgNormalRow;
							e.source.sectionSpace.backgroundColor = "transparent"; 
						} else {
							
							var arrData = [];
							for (var i = 0,
							    len = myRequestDetails.length; i < len; i++) {
							    	
								if (i == 0) {
									arrData.push({
										labelMyRequestTitle : {
											text : myRequestDetails[i],
											
											textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER	
										},
										backgroundColor : 'transparent',
										properties : {
											doc : myRequestDetails[i],
											height : 40,
											backgroundColor : 'transparent'
										}
									});
								}
								else
								{
									arrData.push({
										labelMyRequestTitle : {
											text : myRequestDetails[i],
											textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER	
										},
										backgroundColor : 'transparent',
										properties : {
											doc : myRequestDetails[i],
											height : 40,
											backgroundColor : 'transparent'
										}
									});
									
								}
			
							}
							Ti.API.info('status id==='+ statusId + "-- service id==="+ serviceId + "source type ==="+ sourceType);
						   if(statusId != 7 && statusId != 8 && statusId != 4 && sourceType == 1){	
							     /*if(serviceId == 101 && statusId != 1 && statusId != 21 && statusId != 7 && statusId != 6){
							     	actionButton(statusId);
							     }else if(serviceId == 301 && statusId != 1 && statusId != 6){
							     	actionButton(statusId);
							     }else if(serviceId == 302 && statusId != 1 && statusId != 6 && statusId != 39 && statusId != 23){
							     	actionButton(statusId);
							     }else if(serviceId == 303 && statusId != 1 && statusId != 6 && statusId != 39 && statusId != 40 && statusId != 23 && statusId != 4){
							     	actionButton(statusId);
							     }else if(serviceId == 304 && statusId != 1 && statusId != 6 && statusId != 39 && statusId != 20){
							     	actionButton(statusId);
							     }else if(serviceId == 501 && statusId != 1 && statusId != 6 && statusId != 28 && statusId != 39){
							     	actionButton(statusId);
							     }else if(serviceId == 101 && statusId != 1 && statusId != 6 && statusId != 28 && statusId != 39){
							     	actionButton(statusId);
							     }else if(serviceId == 405 && statusId != 1 && statusId != 6 && statusId != 28 && statusId != 39 && statusId != 11){
							     	actionButton(statusId);
							     }*/
							    
							    //302 id===25
							     
							     if(serviceId == 101 && (statusId == 5 || statusId == 6)){
							     	actionButton(statusId);
							     }else if(serviceId == 301  && (statusId == 33 || statusId == 5 || statusId == 6 || statusId == 18)){
							     	actionButton(statusId);
							     }else if(serviceId == 302 && (statusId == 5 || statusId == 33 || statusId == 6)){
							     	actionButton(statusId);
							     }else if(serviceId == 303 && (statusId == 5 || statusId == 26 || statusId == 18 || statusId == 33 ||  statusId == 6)){
							     	actionButton(statusId);
							     }else if(serviceId == 304 && (statusId == 5 || statusId == 33 ||  statusId == 6)){
							     	actionButton(statusId);
							     }else if(serviceId == 501 && ( statusId == 18 || statusId == 41 || statusId == 5 || statusId == 6)){
							     	actionButton(statusId);
							     }else if(serviceId == 502 && ( statusId == 18 || statusId == 41 || statusId == 5 || statusId == 6)){
							     	actionButton(statusId);
							     }
							     else if(serviceId == 405 && (statusId == 33 || statusId == 5 || statusId == 6 || statusId == 18)){
							     	actionButton(statusId);
							     }
							     else if(serviceId == 403 && (statusId == 33 || statusId == 5 || statusId == 6 || statusId == 18)){
							     	actionButton(statusId);
							     }
							     else if(serviceId == 401 && (statusId == 33 || statusId == 5 || statusId == 6 || statusId == 18)){
							     	actionButton(statusId);
							     }
							     else if(serviceId == 404 && (statusId == 33 || statusId == 5 || statusId == 6 || statusId == 18)){
							     	actionButton(statusId);
							     }
							}
							
							function actionButton(statusId) {
								var actionText = statusText;//Alloy.Globals.selectedLanguage.actionBtn;
		                         if(statusId == 5){
		                         	actionText = Alloy.Globals.selectedLanguage.resubmit;
		                         } //viewMore
		                         if(statusId == 26){
		                         	actionText = Alloy.Globals.selectedLanguage.subNOC;
		                         }
		                         if(statusId == 6){
		                         	actionText = Alloy.Globals.selectedLanguage.viewMore;
		                         }
		                         if(statusId == 33 || statusId == 18){
		                         	actionText = Alloy.Globals.selectedLanguage.paynowMyreq;
		                         }
		                         
								/*for (var p = 0; p < arrActionList.length; p++) {
									Ti.API.info(arrActionList[p].id + ' images type in array match: ' + statusId);
									if (arrActionList[p].id == statusId) {
										actionText = arrActionList[p].text;
									}
								}*/
		                        if(actionText != ""){
									arrData.push({
										template : "itemButton",
										btnActionMyRequest : {
											typeOfaction : statusId,
											serviceId : serviceId,
											requestno : requestno,
											title : actionText,
											data : obj
										},
									
										properties : { backgroundColor : '#80FFFFFF' }
									});
								}
							}

							
							e.source.backgroundImage = Alloy.Globals.path.imgSelectedRow;
							e.source.sectionSpace.backgroundColor = "#80FFFFFF";
							arrSection[e.source.lIndex].setItems(arrData);
						  
						}
			}
			e.source.isExpanded = !e.source.isExpanded;
			if (cameSecondTime == false){
				scrollToPosition();
				cameSecondTime = true;
			}
		});
							
		arrSection.push(lstSection);
		//itemIndexToScroll = j;
		// Ti.API.info('REQ. No:  '+ arr[j].requestNo +"	WITH ID TO MATCH=== "+idToMatch); PWS-101-15-76727
		//if (arr[j].requestNo == idToMatch){
		if (arr[j].requestNo == idToMatch){	
			itemIndexToScroll = j;
			view.fireEvent("click");	
		} 
		
	}
	//alert("test");  <ListItem info:text="Apple" es_info:text="Manzana" pic:image="/apple.png" />
	 }
	}catch(e){
		Ti.API.info('no record count ');
	}
	//itemIndexToScroll = 20;
	$.listviewServices.sections = arrSection;
	//alert("LIST COUNT-----"+$.listviewServices.getSectionCount());
	//Ti.API.info('section count'+ $.listviewServices.sectionCount );
	// $.listviewDepartment.sections[0].setItems(arrData);
	//$.listviewServices.setMarker({sectionIndex:0,itemIndex:5}); 
	//$.listviewServices.scrollToItem(itemIndexToScroll,itemIndexToScroll);
	
}
exports.loadServices = loadServices;
function scrollToPosition(){
	setTimeout(function(){
	    Ti.API.info('scoll to item called');
		$.listviewServices.scrollToItem(itemIndexToScroll, 0);
	},2500);
}

function onActionRequest(e){
	//Ti.API.info(e.section.items.btnActionMyRequest +"action button clicked"+JSON.stringify(e.section.items) +""); //section.items.btnActionMyRequest.serviceId
	//Ti.API.info("action button clicked"+JSON.stringify(e.section.items[2].btnActionMyRequest) +"");
	//Ti.API.info("action button clicked"+JSON.stringify(e.section.items[4].btnActionMyRequest.typeOfaction) +"");
	//if(e.source.typeOfaction == 21){
		//reviewerWebServiceCall(e);
	//}else{
		// if (Ti.Platform.osname == "android"){
			// var serviceId = e.section.items[4].btnActionMyRequest.serviceId;
			// var requestno = e.section.items[4].btnActionMyRequest.requestno;
			// var statusId = e.section.items[4].btnActionMyRequest.typeOfaction;
		// }else
		// {
			// var serviceId = e.source.serviceId;
			// var requestno = e.source.requestno;
			// var statusId = e.source.typeOfaction;
		// }
		
	httpManager.userValidation(function(response) {
		if (response == "Active") 
		{
			var serviceId = (OS_IOS?e.source.serviceId:e.section.items[2].btnActionMyRequest.serviceId);
			var requestno = (OS_IOS?e.source.requestno:e.section.items[2].btnActionMyRequest.requestno);
			var statusId  = (OS_IOS?e.source.typeOfaction:e.section.items[2].btnActionMyRequest.typeOfaction);
			var langCode = (Alloy.Globals.isEnglish)? "/en": "/ar";
			var urlDetailsPass = "serviceId="+serviceId+"&requestNo="+requestno+"&statusId="+statusId+"&acountId="+ Ti.App.Properties.getObject("LoginDetaisObj").accountID+"&token="+Ti.App.Properties.getObject("LoginDetaisObj").tokenCode+"&typeOfUser="+Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser+"&status="+Ti.App.Properties.getObject("LoginDetaisObj").status +"&username="+Ti.App.Properties.getObject("LoginDetaisObj").userName;
	        var payLoad = {url :  ""};
			var urlEmpty = false;			
 
			switch (statusId) {
				case '33':
				if (OS_IOS) {
				httpManager.getMyreqFeesValues(requestno, function(response) {
					if (response != null) 
		            {
						var letterTo = response[0].addressto;
						Ti.API.info('letter to value'+ letterTo);
						payLoad = {
							url : Alloy.Globals.webserviceUrl+langCode + "/proceedpayment.html?isNative=true&letter="+letterTo+"&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
					}else{
						 urlEmpty = true;
						 loadurlRequest();
					}
				});
				}else {
				        var letterTo;
						Ti.API.info('letter to value'+ letterTo);
						payLoad = {
							url : Alloy.Globals.webserviceUrl+langCode + "/proceedpayment.html?isNative=true&letter="+letterTo+"&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
				}		
				
				break;
	
				case '18':
				
				if (OS_IOS) {
				httpManager.getMyreqFeesValues(requestno, function(response) {
					if (response != null) 
		            {
						var letterTo = response[0].addressto;
						Ti.API.info('letter to value'+ letterTo);
						payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/proceedpayment.html?isNative=true&letter="+letterTo+"&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
					}else{
						 urlEmpty = true;
						 loadurlRequest();
					}
				});
				}else {
				        var letterTo;
						Ti.API.info('letter to value'+ letterTo);						
						payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/proceedpayment.html?isNative=true&letter="+letterTo+"&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
				}		
					 
						break;
				case '5':
					  payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/myrequestresubmit.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
					  loadurlRequest();	
						break;
				case '6':
					  payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/myrequestresubmit.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
						break;		
				case '21':
					payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/myrequestreview.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
					break;
				case '26':
					 payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/submitnoc.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
					loadurlRequest();	
					break;
				case '31':
				      payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/submitlicense.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
						break;
				case '34':
				       payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/toissuesiteplan.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
						break;
				case '11':
					 payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/delever.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
						break;
				case '41':
					 payLoad = {
							url :  Alloy.Globals.webserviceUrl+langCode +"/initiateaccountactivate.html?isNative=true&"+urlDetailsPass,
							statusId : statusId,
						};
						loadurlRequest();
					  break;		
			   default:
			   urlEmpty = true;
			   //alert("test"); http://demoserver.tacme.net:15100/
			   break;			
			}
			function loadurlRequest(){
			 if(urlEmpty == false){
			   Ti.API.info('url passed========'+ payLoad.url + "url"+ JSON.stringify(payLoad));
		       Alloy.Globals.openWindow(Alloy.createController("Services/MyServices/myServicesWebView", payLoad).getView());
		      }
		    }
		}else{
			Alloy.Globals.openWindow(Alloy.createController("UserManagement/winLogin", {
				isFromLeftPanel : true
			}).getView());
		}
	});
}

Ti.App.addEventListener('paymentSucessEvent', function(e) {
	payLoad = {
		url : Alloy.Globals.url,
		statusId : 1,
	};
	//Alloy.Globals.openWindow(Alloy.createController("Services/MyServices/myServicesWebView", payLoad).getView());
	//$.webViewMyservice.url = Alloy.Globals.url;
}); 

function reviewerWebServiceCall(e){
	httpManager.getReviewerService(e.source.data, function(response) {
					if(response == null)
						return;
						var alertTExt;
						for(var p=0; p < arrReviewerOperation.length; p++){
								Ti.API.info(arrReviewerOperation[p].id+ ' images type in array match: '+response);
								if(arrReviewerOperation[p].id == response)
								{
									alertTExt = arrReviewerOperation[p].text;
								}
							}
					utilities.showAlert(Alloy.Globals.selectedLanguage.appTitle, Alloy.Globals.selectedLanguage.alertTExt);		     
	 });
}

function onItemClick(e) {
	// utilities.disableMultiTouch(e.source);
	// var section = $.listviewServices.sections[e.sectionIndex];
	// var item = section.getItemAt(e.itemIndex);
	// Alloy.Globals.openWindow(Alloy.createController("Services/winServices").getView());	
}

/*setTimeout(function(){
	 //Ti.API.info("LIST COUNT-----"+$.listviewServices.getSectionCount());
	 // Ti.API.info('section count'+ $.listviewServices.sectionCount);
	 // Ti.API.info('SCROLL TO ITEM INDEX:'+ itemIndexToScroll);
	// $.listviewServices.scrollToItem($.listviewServices.getSectionCount()-1,itemIndexToScroll,true);
	
	    Ti.API.info('scoll to item called');
		$.listviewServices.scrollToItem(itemIndexToScroll, 0);
        
},2000);*/
