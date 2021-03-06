var serverUrl = "http://194.170.30.187:7777/soa-infra/services/UAT-TEST/";
//Function for check the internet connection

function hasConnection() {
	if (Ti.Network.online == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
		return false;
	}
	return true;
}

//Create soap envelop header for all web service depends on requirement
/*function getHeaderEnvelop(userName, password, appKey) {
 if (userName == undefined) {
 userName = Alloy.Globals.userProfile.userName;
 }
 if (password == undefined) {
 password = Alloy.Globals.userProfile.password;
 }
 if (appKey == undefined) {
 appKey = Alloy.Globals.appKey;
 }
 var headerMessage = '<soap:Header><UserCredentials xmlns="http://tempuri.org/">';
 headerMessage += "<userName>" + userName + "</userName>";
 headerMessage += "<password>" + password + "</password>";
 headerMessage += "<IPhoneAppKey>" + appKey + "</IPhoneAppKey>";
 headerMessage += "</UserCredentials></soap:Header>";
 return headerMessage;
 }*/

function getHeaderEnvelop() {

	var headerMessage = "";

	headerMessage += '<soapenv:Header>';
	headerMessage += '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
	// headerMessage += '<wsse:UsernameToken wsu:Id="UsernameToken-8131CC54615234D6BD14162045641341">';
	headerMessage += '<wsse:UsernameToken wsu:Id="UsernameToken">';
	if (Alloy.Globals.isProduction) {
		headerMessage += '<wsse:Username>weblogic</wsse:Username>';
		headerMessage += '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">web10g1cs0a</wsse:Password>';

	} else {

		headerMessage += '<wsse:Username>weblogic</wsse:Username>';
		headerMessage += '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">weblogic123</wsse:Password>';

	}
	headerMessage += '<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">rq5kDimmwOQRDFYt3Msgvg==</wsse:Nonce>';
	headerMessage += '<wsu:Created>2014-11-17T06:09:24.118Z</wsu:Created>';
	headerMessage += '</wsse:UsernameToken>';
	headerMessage += '</wsse:Security>';
	headerMessage += '</soapenv:Header>';

	return headerMessage;

}

function getHeaderEnvelop_VatTax() {

	var headerMessage = "";

	headerMessage += '<soapenv:Header>';
	headerMessage += '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
	// headerMessage += '<wsse:UsernameToken wsu:Id="UsernameToken-A3023CA6E49FEB03D414164694676323">';
	headerMessage += '<wsse:UsernameToken wsu:Id="UsernameToken">';
	if (Alloy.Globals.isProduction) {
		headerMessage += '<wsse:Username>weblogic</wsse:Username>';
		headerMessage += '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">web10g1cs0a</wsse:Password>';

	} else {

		headerMessage += '<wsse:Username>weblogic</wsse:Username>';
		headerMessage += '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">weblogic123</wsse:Password>';

	}
	headerMessage += '<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">ZIL/L09vl6eubsdAa5wbMA==</wsse:Nonce>';
	headerMessage += '<wsu:Created>2014-11-20T07:44:27.632Z</wsu:Created>';
	headerMessage += '</wsse:UsernameToken>';
	headerMessage += '</wsse:Security>';
	headerMessage += '</soapenv:Header>';

	return headerMessage;

}

function getVatTax_UserEntity(oldPassword) {
	var vatTax_message = "";
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;

	var param = ["vatx:UserId", "vatx:Username", "vatx:Password", "vatx:EmailId", "vatx:userType", "vatx:UserAddress", "vatx:MobileNo", "vatx:PhoneNo", "vatx:FaxNo", "vatx:POBox"];

	var values = [vatTax_userObj.id, vatTax_userObj.userName, oldPassword, /*vatTax_userObj.password,*/
	vatTax_userObj.email, vatTax_userObj.userTypeId, vatTax_userObj.address, vatTax_userObj.mobileNumber, vatTax_userObj.phoneNumber, vatTax_userObj.faxNumber, vatTax_userObj.pOBox];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		vatTax_message += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return vatTax_message;
}

function getBodyEnvelop_TokenRecord_VatTax() {
	var param = ["vatx:TokenCode", "vatx:EmailID", "vatx:CreatedDate", "vatx:LastUpdatedDate", "vatx:Status", "vatx:RoleType", "vatx:GroupType"];
	var values = [Ti.App.Properties.getString("authenticationCode_VatTax"), Ti.App.Properties.getString("emailID_VatTax"), Ti.App.Properties.getString("createdDate_VatTax"), Ti.App.Properties.getString("lastUpdatedDate_VatTax"), Ti.App.Properties.getString("status_VatTax"), Ti.App.Properties.getString("roleType_VatTax"), Ti.App.Properties.getString("groupType_VatTax")];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		bodyMessage += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return bodyMessage;
}

function getCommonTokenForG2CReports() {

	var param = ["mof:TokenCode", "mof:EmailID", "mof:CreatedDate", "mof:LastUpdatedDate", "mof:Status", "mof:RoleType", "mof:GroupType"];
	var values = [-1, "DummyG2CToken", "2015-02-19T16:15:00", "2015-02-19T16:15:00", "Active", "G2CUser", "C"];

	var bodyMessage = "";
	for (var i = 0; i < param.length; i++) {
		bodyMessage += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return bodyMessage;
}

//Create soap envelop body for all web service depends on requirement
function getBodyEnvelop(arrKeys, arrValues) {
	var bodyMessage = "";

	for (var i = 0; i < arrKeys.length; i++) {
		bodyMessage += "<" + arrKeys[i] + ">" + arrValues[i] + "</" + arrKeys[i] + ">";
	}
	return bodyMessage;
}

//Utility function for formating xml data if need to change (Some times Web service return &lt for < for need to replace it with correct sign)
var getXMLFormate = function(str) {
	if (str == undefined || str == null) {
		str = "";
	}
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/> </g, "><");
	str = str.replace(/>  </g, "><");
	str = str.replace(/>   </g, "><");
	return str;
};
// This method is not using confirmed with Ramesh
exports.userRegistration = function(emailID, empID, entityCode, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["sch:EmaiID", "sch:EmployeeID", "sch:DeviceId", "sch:DeviceType", "sch:Appversion"];
	var values = [emailID, empID, Alloy.Globals.deviceID, Alloy.Globals.deviceType, Alloy.Globals.appVersion];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService!1.0*soa_07296f29-71e7-4ce0-8ded-52efaeabd0f4/centralauthenticationauthorizationservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService!1.0*soa_07296f29-71e7-4ce0-8ded-52efaeabd0f4/centralauthenticationauthorizationservice_client_ep';

	//	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:sch="http://UserRegistration/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:UserRegistrationRequestMessage>';
	message += '<sch:DataPayload>';
	message += getBodyEnvelop(param, values);
	message += '<sch:UserEntity>';
	message += '<sch:EntityCode>' + entityCode + '</sch:EntityCode>';
	message += '<sch:EntityName>' + Alloy.Globals.entityName + '</sch:EntityName>';
	message += '</sch:UserEntity>';
	message += '</sch:DataPayload>';
	message += '</sch:UserRegistrationRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("User Registration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("User Registration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("DataPayload");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var emailId = result.getElementsByTagName("EmaiID").item(0).text;
			var employeeId = result.getElementsByTagName("EmployeeID").item(0).text;
			var statusCode = result.getElementsByTagName("StatusCode").item(0).text;

			var registration = {
				emailId : emailId,
				employeeId : employeeId,
				statusCode : statusCode,
			};
			callBackFunction(registration);
		} else {
			//callback(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.verifyEmail = function(emailID, OTPCode, entityCode, empID, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["sch:EmailId", "sch:OTP", "sch:EntityID", "sch:EmployeeID"];
	var values = [emailID, OTPCode, entityCode, empID];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService/centralauthenticationauthorizationservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService!1.0*soa_07296f29-71e7-4ce0-8ded-52efaeabd0f4/centralauthenticationauthorizationservice_client_ep';

	//	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://UserRegistration/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:VerifyEmailRequestMessage>';
	message += '<sch:VerifyEmailRecordPayload>';
	message += getBodyEnvelop(param, values);
	message += '</sch:VerifyEmailRecordPayload>';
	message += '</sch:VerifyEmailRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Verify Email = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Verify Email = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("VerifyEmailResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var accountStatus = result.getElementsByTagName("AccountStatus").item(0).text;
			var description = result.getElementsByTagName("Description").item(0).text;
			var operationStatus = result.getElementsByTagName("OperationStatus").item(0).text;

			var registration = {
				accountStatus : accountStatus,
				description : description,
				operationStatus : operationStatus,
			};
			callBackFunction(registration);
		} else {
			//callback(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
// This method is not using confirmed with Ramesh
exports.loginUser = function(emailID, encryptedPassword, entityCode, empID, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["sch:Email", "sch:EncreptedPassword", "sch:EntityCode", "sch:EmpID"];
	var values = [emailID, encryptedPassword, entityCode, empID];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService/centralauthenticationauthorizationservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService!1.0*soa_07296f29-71e7-4ce0-8ded-52efaeabd0f4/centralauthenticationauthorizationservice_client_ep';

	//	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://UserRegistration/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:LoginUserRequestMessage>';
	message += '<sch:LoginUserRequestPayload>';
	message += getBodyEnvelop(param, values);
	message += '</sch:LoginUserRequestPayload>';
	message += '</sch:LoginUserRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Login User = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Login User = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("LoginUserResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var accountStatus = result.getElementsByTagName("AccountStatus").item(0).text;
			var loginStatus = result.getElementsByTagName("LoginStatus").item(0).text;
			var description = result.getElementsByTagName("Description").item(0).text;
			/*var tokenCode = result.getElementsByTagName("TOKENCODE").item(0).text;
			 var status = result.getElementsByTagName("STATUS").item(0).text;
			 var roleType = result.getElementsByTagName("ROLEYPE").item(0).text;
			 var groupType = result.getElementsByTagName("GROUPTYPE").item(0).text;
			 var createdDate = result.getElementsByTagName("CREATEDDATE").item(0).text;
			 var lastUdpatedDate = result.getElementsByTagName("LASTUPDATEDATE").item(0).text;*/

			var login = {
				accountStatus : accountStatus,
				loginStatus : loginStatus,
				description : description,
				/*tokenCode : tokenCode,
				 status : status,
				 roleType : roleType,
				 groupType : groupType,
				 createdDate : createdDate,
				 lastUdpatedDate : lastUdpatedDate*/
			};
			callBackFunction(login);
		} else {
			//callback(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
// This method is not using confirmed with Ramesh
exports.changePassword = function(empID, emailID, entityCode, oldEncrytedPassword, newdEncrytedPassword, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["sch:EmpId", "sch:EmailId", "sch:OldEncreptedPassword", "sch:EmpID"];
	var values = [emailID, encryptedPassword, entityCode, empID];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService/centralauthenticationauthorizationservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/MoF_CentralAuthenticationAuthorizationService!1.0*soa_07296f29-71e7-4ce0-8ded-52efaeabd0f4/centralauthenticationauthorizationservice_client_ep';

	//	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://UserRegistration/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:ChangePasswordRequestMessage>';

	message += '<sch:EmpId>' + empID + '</sch:EmpId>';
	message += '<sch:EmailId>' + emailID + '</sch:EmailId>';

	message += '<sch:Entitypayload>';
	message += '<sch:EntityCode>' + entityCode + '</sch:EntityCode>';
	message += '<sch:EntityName>' + Alloy.Globals.entityName + '</sch:EntityName>';
	message += '</sch:Entitypayload>';

	message += '<sch:OldEncreptedPassword>' + oldEncrytedPassword + '</sch:OldEncreptedPassword>';
	message += '<sch:NewEncreptedPassword>' + newdEncrytedPassword + '</sch:NewEncreptedPassword>';

	message += '</sch:ChangePasswordRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Change Password = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Change Password = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ChangePasswordResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("Status").item(0).text;
			var description = result.getElementsByTagName("Description").item(0).text;

			var changePassword = {
				status : status,
				description : description,
			};
			callBackFunction(changePassword);
		} else {
			//callback(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.SalarySlipRequest = function(token_code, email_id, created_date, last_updated_date, status, role_type, group_type, service_id, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["exam:TokenCOde", "exam:EmailID", "exam:CreatedDate", "exam:LastUpdatedDate", "exam:Status", "exam:RoleType", "exam:GroupType"];
	var values = [token_code, email_id, created_date, last_updated_date, status, role_type, group_type];

	//var soapAction = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/G2G_PaySlip_Request/g2g_payslip_request_bpel_client_ep';
	var soapAction = "";
	if (Alloy.Globals.isProduction)
		soapAction = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/G2G_PaySlip_Request/g2g_payslip_request_bpel_client_ep';
	else
		soapAction = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/G2G_PaySlip_Request/g2g_payslip_request_bpel_client_ep';
	var methodName = 'tem:PaySlip_Request';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/G2G_PaySlip_Request/g2g_payslip_request_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/G2G_PaySlip_Request/g2g_payslip_request_bpel_client_ep';

	//	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:exam="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<exam:PaySlip_Request>';
	message += '<exam:EMPID>265785</exam:EMPID>';
	message += '<exam:PERIOD>31-07-2014,31-08-2014</exam:PERIOD>';
	message += '<exam:TokenReq>';
	message += '<exam:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop(param, values);
	message += ' </exam:AuthenticationTokenInpRecord>';
	message += '<exam:ServiceID>30</exam:ServiceID>';
	message += ' </exam:TokenReq>';
	message += ' </exam:PaySlip_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("PaySlipRequest Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		Alloy.Globals.hideLoading();

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Salaryslip Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
		}

		rootNode = result.getElementsByTagName("ns3:PayslipResponse");

		var arrList = [];

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			arrList = JSON.parse(rootNode.item(0).textContent);
		}

		Ti.API.info('List = ' + JSON.stringify(arrList));

		callBackFunction(arrList);

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

//ISupplier Login
var currentAttempt = 0;
function ISupplierLogin_old(userName, passWord, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	currentAttempt++;
	Ti.API.info('ISupplier Login Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["isup:User_NAME", "isup:Password"];
	var values = [userName, passWord];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/Login_iSupplier_System/login_isupplier_systembpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/Login_iSupplier_System/login_isupplier_systembpel_client_ep';

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += getBodyEnvelop(param, values);
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Login Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier Login Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("iSupplierProfileResponse");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			if (result.getElementsByTagName("iSup:Status").item(0).textContent == "Failure") {
				if (Alloy.Globals.isEnglish) {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:Description_EN").item(0).textContent);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:Description_AR").item(0).textContent);
				}
				callBackFunction(null);
				Alloy.Globals.hideLoading();
			} else {
				var tokenData = result.getElementsByTagName("iSup:TokenResp").item(0);
				var tokenAuth = result.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
				var tokenOject = {
					status : tokenData.getElementsByTagName("iSup:Status").item(1).textContent,
					description_En : tokenData.getElementsByTagName("iSup:Description_EN").item(0).textContent,
					description_Ar : tokenData.getElementsByTagName("iSup:Description_AR").item(0).textContent,
					tokenCode : tokenAuth.getElementsByTagName("iSup:TokenCode").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("iSup:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("iSup:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("iSup:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("iSup:GroupType").item(0).textContent
				};

				if (tokenOject.status == "Expired" || tokenOject.status == "InActive") {
					Ti.App.Properties.setInt("isLoggedIn_mSupplier", false);
				}

				var userInfoObject = {
					userName : tokenOject.emailId,
					password : passWord
				};

				var isupplierProfile = result.getElementsByTagName("iSup:iSupplierProfile").item(0);
				var isupplierGeneralProfile = isupplierProfile.getElementsByTagName("iSup:Genaral_Profile").item(0);
				var isupplierGeneralProfileObj = {
					vendor_id : isupplierGeneralProfile.getElementsByTagName("iSup:Vendor_id").item(0).textContent,
					supplier_Name : isupplierGeneralProfile.getElementsByTagName("iSup:SUPPLIER_NAME").item(0).textContent,
					supplier_Number : isupplierGeneralProfile.getElementsByTagName("iSup:SUPPLIER_NUMBER").item(0).textContent,
					registration_Date : isupplierGeneralProfile.getElementsByTagName("iSup:REGISTRATION_DATE").item(0).textContent,
					renewal_Date : isupplierGeneralProfile.getElementsByTagName("iSup:RENEWAL_DATE").item(0).textContent,
					payment_Id : isupplierGeneralProfile.getElementsByTagName("iSup:PAYMENT_ID").item(0).textContent,
				};
				var attachments = isupplierGeneralProfile.getElementsByTagName("iSup:ATTACHMENTS");
				var arrAttachments = [];
				//if(attachments.item(0) != null){
				for (var i = 0; i < attachments.length; i++) {
					arrAttachments.push({
						title : attachments.item(i).getElementsByTagName("iSup:Title").item(0).textContent,
						description : attachments.item(i).getElementsByTagName("iSup:DESCRIPTION").item(0).textContent,
						type : attachments.item(i).getElementsByTagName("iSup:Type").item(0).textContent,
						category_Name : attachments.item(i).getElementsByTagName("iSup:Category_name").item(0).textContent,
						last_Updatedby : attachments.item(i).getElementsByTagName("iSup:Last_updatedby").item(0).textContent,
						last_Updated : attachments.item(i).getElementsByTagName("iSup:Last_updated").item(0).textContent,
						usagetype : attachments.item(i).getElementsByTagName("iSup:Usagetype").item(0).textContent,
					});
				}
				//}
				isupplierGeneralProfileObj.attachments = arrAttachments;

				isupplierGeneralProfileObj.isupplierMappingId = (result.getElementsByTagName("iSup:MAPPING_ID").length > 0) ? result.getElementsByTagName("iSup:MAPPING_ID").item(0).textContent : -1;
				isupplierGeneralProfileObj.isupplierRegisterId = (result.getElementsByTagName("iSup:REG_ID").length > 0) ? result.getElementsByTagName("iSup:REG_ID").item(0).textContent : -1;

				var companyProfile = isupplierProfile.getElementsByTagName("iSup:Company_Profile").item(0);
				var organization = companyProfile.getElementsByTagName("iSup:ORGANIZATION").item(0);
				var organizationObject = {
					legal_entity : organization.getElementsByTagName("iSup:legal_entity").item(0).textContent,
					general_director_Name : organization.getElementsByTagName("iSup:General_Director_Name").item(0).textContent,
					general_director_nationality : organization.getElementsByTagName("iSup:General_director_nationality").item(0).textContent,
				};
				var activity = organization.getElementsByTagName("iSup:Activity");
				var strActivity = "";
				for (var i = 0,
				    length = activity.length; i < length; i++) {
					if (i == (length - 1)) {
						strActivity += activity.item(i).textContent;
					} else {
						strActivity += activity.item(i).textContent + " , ";
					}

				}
				organizationObject.activity = strActivity;
				var partnerList = organization.getElementsByTagName("iSup:PARTNERS");
				var arrPartnersList = [];
				//if(partnerList.item(0) != null){
				for (var i = 0; i < partnerList.length; i++) {
					arrPartnersList.push({
						owner_Name : partnerList.item(i).getElementsByTagName("iSup:Owner_name").item(0).textContent,
						owner_nationality : partnerList.item(i).getElementsByTagName("iSup:Owner_nationality").item(0).textContent,
						partnership : partnerList.item(i).getElementsByTagName("iSup:Partnership").item(0).textContent,
						citizen_partner_work : partnerList.item(i).getElementsByTagName("iSup:Ctitzen_partner_work").item(0).textContent,
					});
				}
				//}
				organizationObject.partners = arrPartnersList;
				var buss_Class_List = result.getElementsByTagName("iSup:BUSINESS_CLASSIFICATIONS");
				var arrbuss_Class_List = [];
				//if(buss_Class_List.item(0) != null){
				for (var i = 0; i < buss_Class_List.length; i++) {
					arrbuss_Class_List.push({
						classification : buss_Class_List.item(i).getElementsByTagName("iSup:Classification").item(0).textContent,
						certificate_Number : buss_Class_List.item(i).getElementsByTagName("iSup:Certificatenumber").item(0).textContent,
						expiration_Date : buss_Class_List.item(i).getElementsByTagName("iSup:Expiration_Date").item(0).textContent,
					});
				}
				//}
				var contact_List = result.getElementsByTagName("iSup:CONTACTS");
				var arrContacts_List = [];
				//if(contact_List.item(0) != null){
				for (var i = 0; i < contact_List.length; i++) {
					arrContacts_List.push({
						name : contact_List.item(i).getElementsByTagName("iSup:Name").item(0).textContent,
						phone_Number : contact_List.item(i).getElementsByTagName("iSup:phone_number").item(0).textContent,
						email_ID : contact_List.item(i).getElementsByTagName("iSup:Email_ID").item(0).textContent,
						status : contact_List.item(i).getElementsByTagName("iSup:Status").item(0).textContent,
						userAcc : contact_List.item(i).getElementsByTagName("iSup:UserACC").item(0).textContent,
						remove : contact_List.item(i).getElementsByTagName("iSup:Remove").item(0).textContent,
					});
				}
				//}
				var banking_Details_List = result.getElementsByTagName("iSup:BANKING_DETAILS");
				var arrBanking_Details = [];
				//if(banking_Details_List.item(0) != null){
				for (var i = 0; i < banking_Details_List.length; i++) {
					arrBanking_Details.push({
						account_Number : banking_Details_List.item(i).getElementsByTagName("iSup:Account_number").item(0).textContent,
						IBAN : banking_Details_List.item(i).getElementsByTagName("iSup:IBAN").item(0).textContent,
						currency : banking_Details_List.item(i).getElementsByTagName("iSup:Currency").item(0).textContent,
						bankName : banking_Details_List.item(i).getElementsByTagName("iSup:BankName").item(0).textContent,
						status : banking_Details_List.item(i).getElementsByTagName("iSup:Status").item(0).textContent,
						start_Date : banking_Details_List.item(i).getElementsByTagName("iSup:Start_Date").item(0).textContent,
						end_Date : banking_Details_List.item(i).getElementsByTagName("iSup:End_date").item(0).textContent
					});
				}
				//}
				var companyProfileObject = {
					organization : organizationObject,
					bussiness_Classification : arrbuss_Class_List,
					contactList : arrContacts_List,
					banking_Detail : arrBanking_Details
				};
				var login = {
					tokenDetails : tokenOject,
					general_Profile : isupplierGeneralProfileObj,
					company_profile : companyProfileObject,
					userInfo : userInfoObject,
				};
				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}
		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierLogin(userName, passWord, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.ISupplierLogin_old = ISupplierLogin_old;

function ISupplierLogin(userName, passWord, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	currentAttempt++;
	Ti.API.info('ISupplier Login Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["isup:User_NAME", "isup:Password"];
	var values = [userName, passWord];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_INITIAL_LOGIN/msupplier_initial_login_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_INITIAL_LOGIN/msupplier_initial_login_client_ep';

	var message = '<soapenv:Envelope xmlns:isup="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:InputParameters>';
	message += '<isup:SOAP_Headers>';
	message += '<isup:Responsibility>SYSTEM_ADMINISTRATOR</isup:Responsibility>';
	message += '<isup:RespApplication>SYSADMIN</isup:RespApplication>';
	message += '<isup:SecurityGroup>STANDARD</isup:SecurityGroup>';
	message += '<isup:NLSLanguage>AMERICAN</isup:NLSLanguage>';
	message += '<isup:Org_Id>6135</isup:Org_Id>';
	message += '</isup:SOAP_Headers>';
	message += '<isup:LOGIN_SERVICE>';
	message += getBodyEnvelop(param, values);
	message += '</isup:LOGIN_SERVICE>';
	message += '</isup:InputParameters></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Login Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier Login Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			if (result.getElementsByTagName("iSup:STATUS").item(0).textContent == "F") {
				if (Alloy.Globals.isEnglish) {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:DESC_EN").item(0).textContent);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:DESC_AR").item(0).textContent);
				}
				callBackFunction(null);
				Alloy.Globals.hideLoading();
			} else {
				//var userInfo = result.getElementsByTagName("vatx:UserInfoRecord").item(0);

				var questionListNode = result.getElementsByTagName("iSup:QuestionList");
				var arrQuestion = [];
				for (var i = 0; i < questionListNode.length; i++) {

					var childNodes = questionListNode.item(i).getChildNodes();
					var questionId,
					    questionAR,
					    questionEN;

					var index = 0;
					Ti.API.info('appResult = ' + childNodes.length);
					while (index < childNodes.length) {

						if (childNodes.item(index) && childNodes.item(index).nodeName == "iSup:id") {
							questionId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "iSup:Ques_AR") {
							questionAR = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "iSup:Ques_EN") {
							questionEN = childNodes.item(index).textContent;
							index += 1;
						} else {
							index += 1;
						}
					}

					arrQuestion.push({
						questionId : questionId,
						question_Ar : questionAR,
						question_En : questionEN
					});
				}
				var login = {
					arrQuestion : arrQuestion
				};
				/*
				 var tokenData = result.getElementsByTagName("iSup:TokenResp").item(0);
				 var tokenAuth = result.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
				 var tokenOject = {
				 status : tokenData.getElementsByTagName("iSup:Status").item(1).textContent,
				 description_En : tokenData.getElementsByTagName("iSup:Description_EN").item(0).textContent,
				 description_Ar : tokenData.getElementsByTagName("iSup:Description_AR").item(0).textContent,
				 tokenCode : tokenAuth.getElementsByTagName("iSup:TokenCode").item(0).textContent,
				 emailId : tokenAuth.getElementsByTagName("iSup:EmailID").item(0).textContent,
				 createdDate : tokenAuth.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
				 lastUpdatedDate : tokenAuth.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
				 tokenStatus : tokenAuth.getElementsByTagName("iSup:Status").item(0).textContent,
				 roleType : tokenAuth.getElementsByTagName("iSup:RoleType").item(0).textContent,
				 groupType : tokenAuth.getElementsByTagName("iSup:GroupType").item(0).textContent
				 };

				 if (tokenOject.status == "Expired") {
				 Ti.App.Properties.setInt("isLoggedIn_mSupplier", false);
				 }

				 var userInfoObject = {
				 userName : tokenOject.emailId,
				 password : passWord
				 };

				 var isupplierProfile = result.getElementsByTagName("iSup:iSupplierProfile").item(0);
				 var isupplierGeneralProfile = isupplierProfile.getElementsByTagName("iSup:Genaral_Profile").item(0);
				 var isupplierGeneralProfileObj = {
				 vendor_id : isupplierGeneralProfile.getElementsByTagName("iSup:Vendor_id").item(0).textContent,
				 supplier_Name : isupplierGeneralProfile.getElementsByTagName("iSup:SUPPLIER_NAME").item(0).textContent,
				 supplier_Number : isupplierGeneralProfile.getElementsByTagName("iSup:SUPPLIER_NUMBER").item(0).textContent,
				 registration_Date : isupplierGeneralProfile.getElementsByTagName("iSup:REGISTRATION_DATE").item(0).textContent,
				 renewal_Date : isupplierGeneralProfile.getElementsByTagName("iSup:RENEWAL_DATE").item(0).textContent,
				 payment_Id : isupplierGeneralProfile.getElementsByTagName("iSup:PAYMENT_ID").item(0).textContent,
				 };

				 var attachments = isupplierGeneralProfile.getElementsByTagName("iSup:ATTACHMENTS");
				 var arrAttachments = [];

				 for (var i = 0; i < attachments.length; i++) {
				 arrAttachments.push({
				 title : attachments.item(i).getElementsByTagName("iSup:Title").item(0).textContent,
				 description : attachments.item(i).getElementsByTagName("iSup:DESCRIPTION").item(0).textContent,
				 type : attachments.item(i).getElementsByTagName("iSup:Type").item(0).textContent,
				 category_Name : attachments.item(i).getElementsByTagName("iSup:Category_name").item(0).textContent,
				 last_Updatedby : attachments.item(i).getElementsByTagName("iSup:Last_updatedby").item(0).textContent,
				 last_Updated : attachments.item(i).getElementsByTagName("iSup:Last_updated").item(0).textContent,
				 usagetype : attachments.item(i).getElementsByTagName("iSup:Usagetype").item(0).textContent,
				 });
				 }

				 isupplierGeneralProfileObj.attachments = arrAttachments;

				 isupplierGeneralProfileObj.isupplierMappingId = (result.getElementsByTagName("iSup:MAPPING_ID").length > 0) ? result.getElementsByTagName("iSup:MAPPING_ID").item(0).textContent : -1;
				 isupplierGeneralProfileObj.isupplierRegisterId = (result.getElementsByTagName("iSup:REG_ID").length > 0) ? result.getElementsByTagName("iSup:REG_ID").item(0).textContent : -1;

				 var companyProfile = isupplierProfile.getElementsByTagName("iSup:Company_Profile").item(0);
				 var organization = companyProfile.getElementsByTagName("iSup:ORGANIZATION").item(0);
				 var organizationObject = {
				 legal_entity : organization.getElementsByTagName("iSup:legal_entity").item(0).textContent,
				 general_director_Name : organization.getElementsByTagName("iSup:General_Director_Name").item(0).textContent,
				 general_director_nationality : organization.getElementsByTagName("iSup:General_director_nationality").item(0).textContent,
				 };
				 var activity = organization.getElementsByTagName("iSup:Activity");
				 var strActivity = "";
				 for (var i = 0,
				 length = activity.length; i < length; i++) {
				 if (i == (length - 1)) {
				 strActivity += activity.item(i).textContent;
				 } else {
				 strActivity += activity.item(i).textContent + " , ";
				 }

				 }
				 organizationObject.activity = strActivity;
				 var partnerList = organization.getElementsByTagName("iSup:PARTNERS");
				 var arrPartnersList = [];
				 //if(partnerList.item(0) != null){
				 for (var i = 0; i < partnerList.length; i++) {
				 arrPartnersList.push({
				 owner_Name : partnerList.item(i).getElementsByTagName("iSup:Owner_name").item(0).textContent,
				 owner_nationality : partnerList.item(i).getElementsByTagName("iSup:Owner_nationality").item(0).textContent,
				 partnership : partnerList.item(i).getElementsByTagName("iSup:Partnership").item(0).textContent,
				 citizen_partner_work : partnerList.item(i).getElementsByTagName("iSup:Ctitzen_partner_work").item(0).textContent,
				 });
				 }
				 //}
				 organizationObject.partners = arrPartnersList;
				 var buss_Class_List = result.getElementsByTagName("iSup:BUSINESS_CLASSIFICATIONS");
				 var arrbuss_Class_List = [];
				 //if(buss_Class_List.item(0) != null){
				 for (var i = 0; i < buss_Class_List.length; i++) {
				 arrbuss_Class_List.push({
				 classification : buss_Class_List.item(i).getElementsByTagName("iSup:Classification").item(0).textContent,
				 certificate_Number : buss_Class_List.item(i).getElementsByTagName("iSup:Certificatenumber").item(0).textContent,
				 expiration_Date : buss_Class_List.item(i).getElementsByTagName("iSup:Expiration_Date").item(0).textContent,
				 });
				 }
				 //}
				 var contact_List = result.getElementsByTagName("iSup:CONTACTS");
				 var arrContacts_List = [];
				 //if(contact_List.item(0) != null){
				 for (var i = 0; i < contact_List.length; i++) {
				 arrContacts_List.push({
				 name : contact_List.item(i).getElementsByTagName("iSup:Name").item(0).textContent,
				 phone_Number : contact_List.item(i).getElementsByTagName("iSup:phone_number").item(0).textContent,
				 email_ID : contact_List.item(i).getElementsByTagName("iSup:Email_ID").item(0).textContent,
				 status : contact_List.item(i).getElementsByTagName("iSup:Status").item(0).textContent,
				 userAcc : contact_List.item(i).getElementsByTagName("iSup:UserACC").item(0).textContent,
				 remove : contact_List.item(i).getElementsByTagName("iSup:Remove").item(0).textContent,
				 });
				 }
				 //}
				 var banking_Details_List = result.getElementsByTagName("iSup:BANKING_DETAILS");
				 var arrBanking_Details = [];
				 //if(banking_Details_List.item(0) != null){
				 for (var i = 0; i < banking_Details_List.length; i++) {
				 arrBanking_Details.push({
				 account_Number : banking_Details_List.item(i).getElementsByTagName("iSup:Account_number").item(0).textContent,
				 IBAN : banking_Details_List.item(i).getElementsByTagName("iSup:IBAN").item(0).textContent,
				 currency : banking_Details_List.item(i).getElementsByTagName("iSup:Currency").item(0).textContent,
				 bankName : banking_Details_List.item(i).getElementsByTagName("iSup:BankName").item(0).textContent,
				 status : banking_Details_List.item(i).getElementsByTagName("iSup:Status").item(0).textContent,
				 start_Date : banking_Details_List.item(i).getElementsByTagName("iSup:Start_Date").item(0).textContent,
				 end_Date : banking_Details_List.item(i).getElementsByTagName("iSup:End_date").item(0).textContent
				 });
				 }
				 //}
				 var companyProfileObject = {
				 organization : organizationObject,
				 bussiness_Classification : arrbuss_Class_List,
				 contactList : arrContacts_List,
				 banking_Detail : arrBanking_Details
				 };
				 var login = {
				 tokenDetails : tokenOject,
				 general_Profile : isupplierGeneralProfileObj,
				 company_profile : companyProfileObject,
				 userInfo : userInfoObject,
				 };
				 */
				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}
		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierLogin(userName, passWord, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.ISupplierLogin = ISupplierLogin;

function ISupplierLogin_SubmitAnswer(objQuestion, password, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	currentAttempt++;
	Ti.API.info('ISupplierLogin_SubmitAnswer Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideModelLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideModelLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showModelLoading(Alloy.Globals.selectedLanguage.loading);

	Ti.API.info('ISupplierLogin_SubmitAnswer params == ' + JSON.stringify(objQuestion));
	var param = ["isup:username", "isup:Password", "isup:TypeOfService"];
	var values = [objQuestion.userName, objQuestion.password, objQuestion.typeOfService];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_ValidateSecurityQuestion/validatesecurityquestionbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MoF_ValidateSecurityQuestion/validatesecurityquestionbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:isup="http://xmlns.oracle.com/VATAndTAX_System/MoF_ValidateSecurityQuestion/ValidateSecurityQuestionBPEL">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:process>';
	message += getBodyEnvelop(param, values);
	message += '<isup:SOAP_Headers>';
	message += '<isup:Responsibility>SYSTEM_ADMINISTRATOR</isup:Responsibility>';
	message += '<isup:RespApplication>SYSADMIN</isup:RespApplication>';
	message += '<isup:SecurityGroup>STANDARD</isup:SecurityGroup>';
	message += '<isup:NLSLanguage>AMERICAN</isup:NLSLanguage>';
	message += '<isup:Org_Id>6135</isup:Org_Id>';
	message += '</isup:SOAP_Headers>';
	message += '<isup:QuestionsList>';
	message += '<isup:QuestionRec>';
	message += '<isup:QuestionId>' + objQuestion.arrQuestion[0].questionId + '</isup:QuestionId>';
	message += '<isup:Answer>' + objQuestion.arrQuestion[0].answer + '</isup:Answer>';
	message += '</isup:QuestionRec>';
	message += '</isup:QuestionsList>';

	message += '</isup:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplierLogin_SubmitAnswer Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplierLogin_SubmitAnswer Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideModelLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			if (result.getElementsByTagName("iSup:Status").item(0).textContent == "Failure") {
				if (Alloy.Globals.isEnglish) {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:Desc_EN").item(0).textContent);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, result.getElementsByTagName("iSup:Desc_AR").item(0).textContent);
				}
				callBackFunction(null);
				Alloy.Globals.hideModelLoading();
			} else {
				var tokenAuth = result.getElementsByTagName("iSup:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("iSup:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("iSup:Status").item(0).textContent,
					//description_EN : result.getElementsByTagName("iSup:Desc_EN").item(0).textContent,
					//description_AR : result.getElementsByTagName("iSup:Desc_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("iSup:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("iSup:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("iSup:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("iSup:GroupType").item(0).textContent,
				};

				var userInfoObject = {
					userName : tokenOject.emailId,
					password : objQuestion.password
				};

				var isupplierGeneralProfile = result.getElementsByTagName("iSup:mSuppProfile").item(0);
				var isupplierGeneralProfileObj = {
					status : isupplierGeneralProfile.getElementsByTagName("iSup:STATUS").item(0).textContent,
					isupplierMappingId : isupplierGeneralProfile.getElementsByTagName("iSup:P_MAPPING_ID").item(0).textContent,
					isupplierRegisterId : isupplierGeneralProfile.getElementsByTagName("iSup:O_SUPPLIER_REG_ID").item(0).textContent,
					registrationType : isupplierGeneralProfile.getElementsByTagName("iSup:REGISTRATION_TYPE").item(0).textContent,
					supplierName : isupplierGeneralProfile.getElementsByTagName("iSup:SUPPLIER_NAME").item(0).textContent,
					registrationStatus : isupplierGeneralProfile.getElementsByTagName("iSup:REGISTRATION_STATUS").item(0).textContent,
					vendor_id : isupplierGeneralProfile.getElementsByTagName("iSup:VENDOR_ID").item(0).textContent,
					paymentStatus : isupplierGeneralProfile.getElementsByTagName("iSup:PAYMENT_STATUS").item(0).textContent,
					isRenewalAllowed : isupplierGeneralProfile.getElementsByTagName("iSup:RENEWAL").item(0).textContent,

				};

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject,
					general_Profile : isupplierGeneralProfileObj,
				};
				Ti.API.info('User info object  ==>> ' + JSON.stringify(login));
				Alloy.Globals.hideModelLoading();
				callBackFunction(login);
			}
		} else {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierLogin_SubmitAnswer(objQuestion, password, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.ISupplierLogin_SubmitAnswer = ISupplierLogin_SubmitAnswer;

/*function ISupplierLogin(userName, passWord, callBackFunction) {
if (hasConnection() == false) {
return;
}

currentAttempt++;
Ti.API.info('ISupplier Login Attempt == ' + currentAttempt);
if (currentAttempt > Alloy.Globals.maxAttempt) {
Alloy.Globals.hideLoading();
currentAttempt = 0;
callBackFunction(null);
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
return;
}

Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

//var param = ["isup:User_NAME", "isup:Password"];
//var values = [userName, passWord];
var url = "";
if (Alloy.Globals.isProduction)
url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/Login_iSupplier_System/login_isupplier_systembpel_client_ep';
else
url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/Login_iSupplier_System/login_isupplier_systembpel_client_ep';

var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
message += getHeaderEnvelop();
message += '<soapenv:Body>';
message += '<mof:InputParameters>';
messagee += '<mof:SOAP_Headers></mof:SOAP_Headers>';
//message += getBodyEnvelop(param, values);
message += '<mof:LOGIN_SERVICE>';
message += '<mof:User_NAME>' + userName +'</mof:User_NAME>';
message += '<mof:Password>' + passWord +'</mof:Password>';
message += '</mof:LOGIN_SERVICE>';
message += '</mof:InputParameters>';
message += '</soapenv:Body></soapenv:Envelope>';

Ti.API.info("ISupplier Login Envelope = " + message);

var request = Titanium.Network.createHTTPClient();

request.timeout = 30000;

request.onload = function(e) {
currentAttempt = 0;
var responseText = getXMLFormate(this.responseText);
Ti.API.info("ISupplier Login Response = " + responseText);

var result;
try {
result = Ti.XML.parseString(responseText);
} catch(e) {
callBackFunction(null);
Alloy.Globals.hideLoading();
}

var rootNode = result.getElementsByTagName("OutputParameters");

Ti.API.info('RootNode ==>> ' + rootNode.item.length);
if (rootNode.length > 0) {
var error = rootNode.item(0).getElementsByTagName("Error_message");
if (error.length > 0) {
callBackFunction(null);
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
return;
}
var status = result.getElementsByTagName("Sup:X_RETURN_STATUS").item(0).textContent;
var msgData = result.getElementsByTagName("iSup:X_MSG_DATA_ENG").item(0).textContent;
var questionList = result.getElementsByTagName("iSup:QuestionList");
var arrQuestion = [];
for(var i=0,length = questionList.length;i<length;i++){
arrQuestion.push({

})

}
Alloy.Globals.hideLoading();
callBackFunction(login);
}
} else {
callBackFunction(null);
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
}

};
request.onerror = function(e) {
Titanium.API.error('Status: ' + this.status);
Titanium.API.error('ResponseText: ' + this.responseText);
Titanium.API.error('connectionType: ' + this.connectionType);
Titanium.API.error('location: ' + this.location);

//Alloy.Globals.hideLoading();

//callBackFunction(null);

if (request.status != 200) {
//Alloy.Globals.hideLoading();
//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
ISupplierLogin(userName, passWord, callBackFunction);
return;
}
};
request.open("POST", url);
request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
request.send(message);
};

exports.ISupplierLogin = ISupplierLogin;*/

//ISupplier Purchase Order

function ISupplierPurchaseOrder(venderID, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var param = ["isup:TokenCode", "isup:EmailID", "isup:CreatedDate", "isup:LastUpdatedDate", "isup:Status", "isup:RoleType", "isup:GroupType"];
	var values = [Ti.App.Properties.getInt("authenticationCode"), Ti.App.Properties.getString("emailID"), Ti.App.Properties.getString("createdDate"), Ti.App.Properties.getString("lastUpdatedDate"), Ti.App.Properties.getString("status"), Ti.App.Properties.getString("roleType"), Ti.App.Properties.getString("groupType")];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/iSupplier_Get_PurchaseOrders/get_purchaseorders_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/iSupplier_Get_PurchaseOrders/get_purchaseorders_bpel_client_ep';

	currentAttempt++;
	Ti.API.info('ISupplier purchase Order Login Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += '<isup:TokenReq>';
	message += '<isup:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop(param, values);
	message += '</isup:AuthenticationTokenInpRecord>';
	message += ' <isup:ServiceID>' + '130' + '</isup:ServiceID>';
	message += '</isup:TokenReq>';
	message += '<isup:VENDOR_ID>' + venderID + '</isup:VENDOR_ID>';
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier purchase Order Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier purchase order Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Get_Purchase_Orders");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenResponse = result.getElementsByTagName("iSup:TokenResp").item(0);
			var tokenRecords = tokenResponse.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
			var purchaseOrderList = result.getElementsByTagName("iSup:Purchase_Orders");
			var arrPurchaseOrderList = [];
			//if(purchaseOrderList.item(0) != null){
			for (var i = 0; i < purchaseOrderList.length; i++) {
				arrPurchaseOrderList.push({
					po_Number : purchaseOrderList.item(i).getElementsByTagName("iSup:PO_NUMBER").item(0).textContent,
					event_Name : purchaseOrderList.item(i).getElementsByTagName("iSup:EVENT_NAME").item(0).textContent,
					description : purchaseOrderList.item(i).getElementsByTagName("iSup:Description").item(0).textContent,
					order_Date : purchaseOrderList.item(i).getElementsByTagName("iSup:ORDER_DATE").item(0).textContent,
					currency_Code : purchaseOrderList.item(i).getElementsByTagName("iSup:CURRENCY_CODE").item(0).textContent,
					amount : purchaseOrderList.item(i).getElementsByTagName("iSup:AMOUNT").item(0).textContent,
					status : purchaseOrderList.item(i).getElementsByTagName("iSup:STATUS").item(0).textContent,
					poHeaderId : purchaseOrderList.item(i).getElementsByTagName("iSup:PO_HEADERID").item(0).textContent,
					invoiceCount : purchaseOrderList.item(i).getElementsByTagName("iSup:INVOICE_COUNT").item(0).textContent,
				});
			}
			//}
			var tokenObject = {
				tokenCode : tokenRecords.getElementsByTagName("iSup:TokenCode").item(0).textContent,
				emailId : tokenRecords.getElementsByTagName("iSup:EmailID").item(0).textContent,
				createdDate : tokenRecords.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenRecords.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenRecords.getElementsByTagName("iSup:Status").item(0).textContent,
				roleType : tokenRecords.getElementsByTagName("iSup:RoleType").item(0).textContent,
				groupType : tokenRecords.getElementsByTagName("iSup:GroupType").item(0).textContent,
				tokenResponseStatus : tokenResponse.getElementsByTagName("iSup:Status").item(1).textContent,
				tokenResponseDescription_En : tokenResponse.getElementsByTagName("iSup:Description_EN").item(0).textContent,
				tokenResponseDescription_Ar : tokenResponse.getElementsByTagName("iSup:Description_AR").item(0).textContent,
			};
			var iSupplierPurchaseOrder = {
				tokenDetails : tokenObject,
				purchaseOrderList : arrPurchaseOrderList
			};
			Alloy.Globals.hideLoading();
			callBackFunction(iSupplierPurchaseOrder);

		} else {
			Alloy.Globals.hideLoading();
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierPurchaseOrder(venderID, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.ISupplierPurchaseOrder = ISupplierPurchaseOrder;
//ISupplier Invoices

function ISupplierInvoices_By_PurchaseOrderNumber(venderID, pur_Order_Number, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["isup:TokenCode", "isup:EmailID", "isup:CreatedDate", "isup:LastUpdatedDate", "isup:Status", "isup:RoleType", "isup:GroupType"];
	var values = [Ti.App.Properties.getInt("authenticationCode"), Ti.App.Properties.getString("emailID"), Ti.App.Properties.getString("createdDate"), Ti.App.Properties.getString("lastUpdatedDate"), Ti.App.Properties.getString("status"), Ti.App.Properties.getString("roleType"), Ti.App.Properties.getString("groupType")];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/iSupplier_Get_Invoices/get_invoices_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/iSupplier_Get_Invoices/get_invoices_bpel_client_ep';

	currentAttempt++;
	Ti.API.info('ISupplier Invoices By Purchase Order Number Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += '<isup:PO_NUMBER_Request>';
	message += '<isup:PO_NUMBER>' + pur_Order_Number/*'1221420000011'*/ + '</isup:PO_NUMBER>';
	message += '<isup:VENDOR_ID>' + venderID + '</isup:VENDOR_ID>';
	message += '</isup:PO_NUMBER_Request>';
	message += '<isup:TokenReq>';
	message += '<isup:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop(param, values);
	message += '</isup:AuthenticationTokenInpRecord>';
	message += ' <isup:ServiceID>' + '110' + '</isup:ServiceID>';
	message += '</isup:TokenReq>';
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Invoices By Purchase Order Number Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 90000;
	//1.5min //30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier Invoices By Purchase Order Number Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Get_Invoices");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var invoicesList = result.getElementsByTagName("iSup:Invoices");
			var tokenResponse = result.getElementsByTagName("iSup:TokenReq").item(0);
			var tokenRecords = tokenResponse.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
			var arrInvoiceList = [];
			//if(invoicesList.item(0) != null){
			for (var i = 0; i < invoicesList.length; i++) {
				arrInvoiceList.push({
					invoice_Number : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_NUM").item(0).textContent,
					invoice_Id : invoicesList.item(i).getElementsByTagName("iSup:invoice_ID").item(0).textContent,
					event_Name : invoicesList.item(i).getElementsByTagName("iSup:EVENT_NAME").item(0).textContent,
					currency : invoicesList.item(i).getElementsByTagName("iSup:CURRENCY").item(0).textContent,
					amount : invoicesList.item(i).getElementsByTagName("iSup:AMOUNT").item(0).textContent,
					invoice_Date : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_DATE").item(0).textContent,
					due_amount : invoicesList.item(i).getElementsByTagName("iSup:DUE_AMOUNT").item(0).textContent,
					invoice_Status : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_STATUS").item(0).textContent,
					payment_Status : invoicesList.item(i).getElementsByTagName("iSup:PAYMENT_STATUS").item(0).textContent,
					due_Date : invoicesList.item(i).getElementsByTagName("iSup:DUE_DATE").item(0).textContent,
					paymentCount : invoicesList.item(i).getElementsByTagName("iSup:PAYMENT_COUNT").item(0).textContent,
					vendorId : invoicesList.item(i).getElementsByTagName("iSup:VENDOR_ID").item(0).textContent
				});
			}
			//}
			var tokenObject = {
				tokenCode : tokenRecords.getElementsByTagName("iSup:TokenCode").item(0).textContent,
				emailId : tokenRecords.getElementsByTagName("iSup:EmailID").item(0).textContent,
				createdDate : tokenRecords.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenRecords.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenRecords.getElementsByTagName("iSup:Status").item(0).textContent,
				roleType : tokenRecords.getElementsByTagName("iSup:RoleType").item(0).textContent,
				groupType : tokenRecords.getElementsByTagName("iSup:GroupType").item(0).textContent,
				tokenResponseStatus : tokenResponse.getElementsByTagName("iSup:Status").item(1).textContent,
				tokenResponseDescription_En : tokenResponse.getElementsByTagName("iSup:Description_EN").item(0).textContent,
				tokenResponseDescription_Ar : tokenResponse.getElementsByTagName("iSup:Description_AR").item(0).textContent,
			};
			var invoiceObject = {
				tokenDetails : tokenObject,
				invoiceList : arrInvoiceList
			};
			Alloy.Globals.hideLoading();
			callBackFunction(invoiceObject);
		} else {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
			callBackFunction(null);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierInvoices(pur_Order_Number, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.ISupplierInvoices_By_PurchaseOrderNumber = ISupplierInvoices_By_PurchaseOrderNumber;

function ISupplierInvoices_By_InvoiceNumber(venderID, invoice_Number, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["isup:TokenCode", "isup:EmailID", "isup:CreatedDate", "isup:LastUpdatedDate", "isup:Status", "isup:RoleType", "isup:GroupType"];
	var values = [Ti.App.Properties.getInt("authenticationCode"), Ti.App.Properties.getString("emailID"), Ti.App.Properties.getString("createdDate"), Ti.App.Properties.getString("lastUpdatedDate"), Ti.App.Properties.getString("status"), Ti.App.Properties.getString("roleType"), Ti.App.Properties.getString("groupType")];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/iSupplier_Get_Invoices/get_invoices_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/iSupplier_Get_Invoices/get_invoices_bpel_client_ep';

	currentAttempt++;
	Ti.API.info('ISupplier Invoices By Invoice Number Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += '<isup:INVOICE_NUM_Request>';
	message += '<isup:INVOICE_NUM>' + invoice_Number + '</isup:INVOICE_NUM>';
	message += '<isup:VENDOR_ID>' + venderID + '</isup:VENDOR_ID>';
	message += '</isup:INVOICE_NUM_Request>';
	message += '<isup:TokenReq>';
	message += '<isup:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop(param, values);
	message += '</isup:AuthenticationTokenInpRecord>';
	message += ' <isup:ServiceID>' + '110' + '</isup:ServiceID>';
	message += '</isup:TokenReq>';
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Invoices By Invoice Number Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 90000;
	//1.5min //30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier Invoices By Invoice Number Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Get_Invoices");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var invoicesList = result.getElementsByTagName("iSup:Invoices");
			var tokenResponse = result.getElementsByTagName("iSup:TokenReq").item(0);
			var tokenRecords = tokenResponse.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
			var arrInvoiceList = [];
			//if(invoicesList.item(0) != null){
			for (var i = 0; i < invoicesList.length; i++) {
				arrInvoiceList.push({
					invoice_Number : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_NUM").item(0).textContent,
					invoice_Id : invoicesList.item(i).getElementsByTagName("iSup:invoice_ID").item(0).textContent,
					event_Name : invoicesList.item(i).getElementsByTagName("iSup:EVENT_NAME").item(0).textContent,
					currency : invoicesList.item(i).getElementsByTagName("iSup:CURRENCY").item(0).textContent,
					amount : invoicesList.item(i).getElementsByTagName("iSup:AMOUNT").item(0).textContent,
					invoice_Date : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_DATE").item(0).textContent,
					due_amount : invoicesList.item(i).getElementsByTagName("iSup:DUE_AMOUNT").item(0).textContent,
					invoice_Status : invoicesList.item(i).getElementsByTagName("iSup:INVOICE_STATUS").item(0).textContent,
					payment_Status : invoicesList.item(i).getElementsByTagName("iSup:PAYMENT_STATUS").item(0).textContent,
					due_Date : invoicesList.item(i).getElementsByTagName("iSup:DUE_DATE").item(0).textContent,
					paymentCount : invoicesList.item(i).getElementsByTagName("iSup:PAYMENT_COUNT").item(0).textContent,
					vendorId : invoicesList.item(i).getElementsByTagName("iSup:VENDOR_ID").item(0).textContent
				});
			}
			//}
			var tokenObject = {
				tokenCode : tokenRecords.getElementsByTagName("iSup:TokenCode").item(0).textContent,
				emailId : tokenRecords.getElementsByTagName("iSup:EmailID").item(0).textContent,
				createdDate : tokenRecords.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenRecords.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenRecords.getElementsByTagName("iSup:Status").item(0).textContent,
				roleType : tokenRecords.getElementsByTagName("iSup:RoleType").item(0).textContent,
				groupType : tokenRecords.getElementsByTagName("iSup:GroupType").item(0).textContent,
				tokenResponseStatus : tokenResponse.getElementsByTagName("iSup:Status").item(1).textContent,
				tokenResponseDescription_En : tokenResponse.getElementsByTagName("iSup:Description_EN").item(0).textContent,
				tokenResponseDescription_Ar : tokenResponse.getElementsByTagName("iSup:Description_AR").item(0).textContent,
			};
			var invoiceObject = {
				tokenDetails : tokenObject,
				invoiceList : arrInvoiceList
			};
			Alloy.Globals.hideLoading();
			callBackFunction(invoiceObject);
		} else {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
			callBackFunction(null);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierInvoices(pur_Order_Number, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.ISupplierInvoices_By_InvoiceNumber = ISupplierInvoices_By_InvoiceNumber;
//ISupplier Payments Service

function ISupplierPayments(venderID, invoiceID, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["isup:TokenCode", "isup:EmailID", "isup:CreatedDate", "isup:LastUpdatedDate", "isup:Status", "isup:RoleType", "isup:GroupType"];
	var values = [Ti.App.Properties.getInt("authenticationCode"), Ti.App.Properties.getString("emailID"), Ti.App.Properties.getString("createdDate"), Ti.App.Properties.getString("lastUpdatedDate"), Ti.App.Properties.getString("status"), Ti.App.Properties.getString("roleType"), Ti.App.Properties.getString("groupType")];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/iSupplier_Get_Payments/get_payments_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/iSupplier_Get_Payments/get_payments_bpel_client_ep';

	currentAttempt++;
	Ti.API.info('ISupplier Payment Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += '<isup:TokenReq>';
	message += '<isup:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop(param, values);
	message += '</isup:AuthenticationTokenInpRecord>';
	message += '<isup:ServiceID>' + '120' + '</isup:ServiceID>';
	message += '</isup:TokenReq>';
	message += '<isup:INVOICE_NUM>' + invoiceID/*'286554'*/ + '</isup:INVOICE_NUM>';
	message += '<isup:VENDOR_ID>' + venderID + '</isup:VENDOR_ID>';
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Payment Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier payment Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			Alloy.Globals.hideLoading();
			callBackFunction(null);
		}

		var rootNode = result.getElementsByTagName("Get_Payments");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var paymentResult = result.getElementsByTagName("iSup:Payments");
			var tokenResponse = result.getElementsByTagName("iSup:TokenReq").item(0);
			var tokenRecords = tokenResponse.getElementsByTagName("iSup:AuthenticationTokenOutRecord").item(0);
			var arrPaymentList = [];
			//if(paymentResult.item(0) != null){
			for (var i = 0; i < paymentResult.length; i++) {
				arrPaymentList.push({
					payment_Number : paymentResult.item(i).getElementsByTagName("iSup:PAYMENT_NUMBER").item(0).textContent,
					event_Name : paymentResult.item(i).getElementsByTagName("iSup:EVENT_NAME").item(0).textContent,
					payment_Date : paymentResult.item(i).getElementsByTagName("iSup:PAYMENT_DATE").item(0).textContent,
					currency : paymentResult.item(i).getElementsByTagName("iSup:CURRENCY").item(0).textContent,
					amout_Number : paymentResult.item(i).getElementsByTagName("iSup:AMOUNT_NUMBER").item(0).textContent,
					payment_Method : paymentResult.item(i).getElementsByTagName("iSup:PAYMENT_METHOD_DISPLAYED").item(0).textContent,
					bank_Account_Name : paymentResult.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NAME").item(0).textContent,
					po_Number : paymentResult.item(i).getElementsByTagName("iSup:PO_NUMBER").item(0).textContent,
				});
			}
			//}
			var tokenObject = {
				tokenCode : tokenRecords.getElementsByTagName("iSup:TokenCode").item(0).textContent,
				emailId : tokenRecords.getElementsByTagName("iSup:EmailID").item(0).textContent,
				createdDate : tokenRecords.getElementsByTagName("iSup:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenRecords.getElementsByTagName("iSup:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenRecords.getElementsByTagName("iSup:Status").item(0).textContent,
				roleType : tokenRecords.getElementsByTagName("iSup:RoleType").item(0).textContent,
				groupType : tokenRecords.getElementsByTagName("iSup:GroupType").item(0).textContent,
				tokenResponseStatus : tokenResponse.getElementsByTagName("iSup:Status").item(1).textContent,
				tokenResponseDescription_En : tokenResponse.getElementsByTagName("iSup:Description_EN").item(0).textContent,
				tokenResponseDescription_Ar : tokenResponse.getElementsByTagName("iSup:Description_AR").item(0).textContent,
			};
			var paymentObject = {
				tokenDetails : tokenObject,
				paymentList : arrPaymentList
			};
			Alloy.Globals.hideLoading();
			callBackFunction(paymentObject);
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
			Alloy.Globals.hideLoading();
			callBackFunction(null);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierPayments(venderID, invoiceID, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.ISupplierPayments = ISupplierPayments;
// ISupplier tenders & RFQ
function ISupplierTenders(TenderNumber, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/iSupplier_Get_RFQ/get_rfqs_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/iSupplier_Get_RFQ/get_rfqs_bpel_client_ep';

	currentAttempt++;
	Ti.API.info('ISupplier Teders Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:isup="http://www.mof.gov.ae/iSupplier.system" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<isup:Input_Request>';
	message += '<isup:Tender>' + TenderNumber + '</isup:Tender>';
	message += '</isup:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("ISupplier Teders request = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("ISupplier Tender Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			Alloy.Globals.hideLoading();
			callBackFunction([]);
		}

		var rootNode = result.getElementsByTagName("Output_response");

		Ti.API.info('RootNode ==>> ' + rootNode.length);

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("mof:Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noDataAvailableAtTheMoment);
				return;
			}
			var rfqResponse = result.getElementsByTagName("iSup:RFQ_Reponse");
			var arrRfqList = [];
			//if(rfqResponse.item(0) != null){
			for (var i = 0; i < rfqResponse.length; i++) {
				arrRfqList.push({
					event_Name : rfqResponse.item(i).getElementsByTagName("iSup:EVENT_NAME").item(0).textContent,
					title : rfqResponse.item(i).getElementsByTagName("iSup:Title").item(0).textContent,
					description : rfqResponse.item(i).getElementsByTagName("iSup:Description").item(0).textContent,
					open_Date : rfqResponse.item(i).getElementsByTagName("iSup:OPEN_DATE").item(0).textContent,
					close_Date : rfqResponse.item(i).getElementsByTagName("iSup:CLOSE_DATE").item(0).textContent,
					price : rfqResponse.item(i).getElementsByTagName("iSup:PRICE").item(0).textContent,
					Number : rfqResponse.item(i).getElementsByTagName("iSup:NUMBER").item(0).textContent
				});
			}
			//}
			Alloy.Globals.hideLoading();
			callBackFunction(arrRfqList);
		} else {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
			callBackFunction([]);
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction([]);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			ISupplierTenders(TenderNumber, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.ISupplierTenders = ISupplierTenders;

function getAllFMISTickets(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Support_TicketDetails/getticketdetailsservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Support_TicketDetails/getticketdetailsservice_client_ep';

	currentAttempt++;
	Ti.API.info('AllFMISTickets Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://TicketDetails/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetAllFMISTicketsRequestMessage>';
	message += '<sch:EmailID>' + Ti.App.Properties.getString("emailID") + '</sch:EmailID>';
	message += '<sch:EntityCode>' + 31/*Ti.App.Properties.getString("entityCode")*/ + '</sch:EntityCode>';
	message += '</sch:GetAllFMISTicketsRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("AllFMISTickets Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("AllFMISTickets Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAllFMISTicketsResponsetMessage");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var ticket = result.getElementsByTagName("mof:FMISTicketRecord");
			if (ticket.length > 0) {
				for (var i = 0; i < ticket.length; i++) {
					var requestNo = ticket.item(i).getElementsByTagName("mof:RequestNo").item(0).textContent;
					var requestId = ticket.item(i).getElementsByTagName("mof:RequestID").item(0).textContent;
					var submitDate = ticket.item(i).getElementsByTagName("mof:SubmitDate").item(0).textContent;
					var status = ticket.item(i).getElementsByTagName("mof:Status").item(0).textContent;

					arrList.push({
						requestNo : requestNo,
						requestId : requestId,
						submitDate : Alloy.Globals.moment(submitDate).format('DD/MM/YYYY'), //submitDate,
						status : status,
					});
				}
			}

			var status = result.getElementsByTagName("mof:OperationStatus").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:OperationDescription_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:OperationDescription_AR").item(0).textContent;

			var data = {
				arrData : arrList,
				status : status,
				description_En : description_En,
				description_Ar : description_Ar
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			getAllFMISTickets(callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getAllFMISTickets = getAllFMISTickets;

function getFMISTicketDetails(requestNo, requestId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Support_TicketDetails/getticketdetailsservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Support_TicketDetails/getticketdetailsservice_client_ep';
	currentAttempt++;
	Ti.API.info('FMISTicketDetails Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://TicketDetails/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetFMISTicketDetailsRequestMessage>';
	message += '<sch:EmailID>' + Ti.App.Properties.getString("emailID") + '</sch:EmailID>';
	message += '<sch:EntityCode>' + 31/*Ti.App.Properties.getString("entityCode")*/ + '</sch:EntityCode>';
	message += '<sch:RequestNo>' + requestNo + '</sch:RequestNo>';
	message += '<sch:RequestId>' + requestId + '</sch:RequestId>';
	message += '</sch:GetFMISTicketDetailsRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("FMISTicketDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("FMISTicketDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetFMISTicketDetailsResponseMessage");

		var arrAttachements = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var requestNo = result.getElementsByTagName("mof:RequestNo").item(0).textContent;
			var requestId = result.getElementsByTagName("mof:RequestID").item(0).textContent;
			var submitDate = result.getElementsByTagName("mof:SubmitDate").item(0).textContent;
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var federalDepartmentId = result.getElementsByTagName("mof:ApplicantFederalDepartmentID").item(0).textContent;
			var federalDepartmentName = result.getElementsByTagName("mof:ApplicantFederalDepartmentName").item(0).textContent;
			var applicantName = result.getElementsByTagName("mof:ApplicantName").item(0).textContent;
			var category = result.getElementsByTagName("mof:IssueCategory").item(0).textContent;
			var subCategory = result.getElementsByTagName("mof:IssueSubCategory").item(0).textContent;
			var issueDescription = result.getElementsByTagName("mof:IssueDescription").item(0).textContent;
			var federalEntityId = result.getElementsByTagName("mof:ApplicantFederalEntitiyID").item(0).textContent;
			var attachmentFlag = result.getElementsByTagName("mof:AttachmentFlag").item(0).textContent;

			var arr = result.getElementsByTagName("mof:AttachmentRecord");
			if (arr.length > 0) {
				for (var i = 0; i < arr.length; i++) {

					var attachmentTitle = arr.item(i).getElementsByTagName("mof:AttachmentTitle").item(0).textContent;
					var attachmentFileName = arr.item(i).getElementsByTagName("mof:AttachmentFileName").item(0).textContent;
					var attachmentSourceType = arr.item(i).getElementsByTagName("mof:AttachmentSourceType").item(0).textContent;

					arrAttachements.push({
						attachmentTitle : attachmentTitle,
						attachmentFileName : attachmentFileName,
						attachmentSourceType : attachmentSourceType,
					});
				}
			}

			var status = result.getElementsByTagName("mof:OperationStatus").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:OperationDescription_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:OperationDescription_AR").item(0).textContent;

			var data = {
				requestNo : requestNo,
				requestId : requestId,
				submitDate : submitDate,
				status : status,
				federalDepartmentId : federalDepartmentId,
				federalDepartmentName : federalDepartmentName,
				applicantName : applicantName,
				category : category,
				subCategory : subCategory,
				issueDescription : issueDescription,
				federalEntityId : federalEntityId,
				attachmentFlag : attachmentFlag,
				arrAttachements : arrAttachements, // attachments
				status : status,
				description_En : description_En,
				description_Ar : description_Ar
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			getFMISTicketDetails(requestNo, requestId, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getFMISTicketDetails = getFMISTicketDetails;

function getAttachmentBodyEnvelope(arrKeys, arrValues) {
	var bodyMessage = "";

	for (var i = 0; i < arrKeys.length; i++) {
		if (arrKeys[i] == "sch:AttachmentList") {
			bodyMessage += "<" + arrKeys[i] + ">";
			Ti.API.info('arrValues === ' + arrValues[i]);
			var arrAttachment = arrValues[i];
			for ( j = 0,
			len = arrAttachment.length; j < len; j++) {
				bodyMessage += "<sch:AttachmentList><sch:AttachmentRecord><sch:FileName>" + arrAttachment[j].fileName + "</sch:FileName>";
				bodyMessage += "<sch:FileTitle>" + arrAttachment[j].fileTitle + "</sch:FileTitle>";
				bodyMessage += "<sch:FileSize>" + arrAttachment[j].fileSize + "</sch:FileSize>";
				bodyMessage += "<sch:Base64Content>" + arrAttachment[j].byteData + "</sch:Base64Content></sch:AttachmentRecord></sch:AttachmentList>";
			}
			bodyMessage += "</" + arrKeys[i] + ">";
		} else {
			bodyMessage += "<" + arrKeys[i] + ">" + arrValues[i] + "</" + arrKeys[i] + ">";
		}

	}
	return bodyMessage;
}

function createTicket(obj, arrMedia, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var param = ["sch:ArabicLanguage", "sch:ApplicantName", "sch:ApplicantTitle", "sch:ApplicantEmail", "sch:ApplicantMobile", "sch:ApplicantPhone", "sch:ApplicantFederalEntitiyID", "sch:ApplicantFederalEntitiyName", "sch:ApplicantFederalDepartmentID", "sch:ApplicantFederalDepartmentName", "sch:ApplicantSubCategoryID", "sch:ApplicantSubCategoryName", "sch:ApplicantMainCategoryName", "sch:ApplicantIssueDescription", "sch:Status", "sch:SubmitDate", "sch:CurrentTeamID", "sch:CurrentSupportSubCategoryID", "sch:ClosureDate", "sch:RequestNo", "sch:FOElapsedMinutes", "sch:ElapsedMinutes", "sch:AttachmentList"];
	var values = [obj.language, obj.applicantName, obj.applicantTitle, obj.applicantEmail, obj.applicantMobile, obj.applicantPhone, obj.federalEntityId, obj.federalEntityName, obj.departmentId, obj.departmentName, obj.subCatgoryId, obj.subCatgoryName, obj.categoryName, obj.description, obj.status, obj.submitData, obj.currentTeamId, obj.currentSupportSubCategoryId, obj.closureDate, obj.requestNo, obj.foElapsedMins, obj.elapsedMins, arrMedia];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Support_CreateTicket/createfmisticketservicebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Support_CreateTicket/createfmisticketservicebpel_client_ep';
	currentAttempt++;
	Ti.API.info('Create Ticket Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://CreateTicket/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:CreateTicketRequestMessage>';
	message += '<sch:TicketRecord>';

	message += getAttachmentBodyEnvelope(param, values);

	message += '</sch:TicketRecord>';
	message += '</sch:CreateTicketRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Create Ticket Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 50000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Create Ticket Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("CreateTicketResponseMessage");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");

			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:OperationStatus").item(0).textContent;
			var description_EN = result.getElementsByTagName("mof:OperationDescription_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:OperationDescription_AR").item(0).textContent;

			var data = {
				status : status,
				description_EN : description_EN,
				description_Ar : description_Ar
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		//Alloy.Globals.hideLoading();

		//callBackFunction(null);

		if (request.status != 200) {
			//Alloy.Globals.hideLoading();
			//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			createTicket(obj, arrMedia, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.createTicket = createTicket;

exports.getFederalEntityList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fmis="http://www.mof.gov.ae/FMIS.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fmis:FederalEntities_Request>';
	message += '<fmis:Entity>' + '12' + '</fmis:Entity>';
	message += '</fmis:FederalEntities_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Federal Entity Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 20000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Federal Entity Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("FederalEntities_Response");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("mof:FederalEntities_Recordtype");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var id = data.item(i).getElementsByTagName("mof:FederalEntiyID").item(0).text;
					var enName = data.item(i).getElementsByTagName("mof:Englishname").item(0).text;
					var arName = data.item(i).getElementsByTagName("mof:ArabicName").item(0).text;

					arrList.push({
						id : id,
						enName : enName,
						arName : arName,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getDepartmentList = function(federalEntityId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fmis="http://www.mof.gov.ae/FMIS.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fmis:Department_Request>';
	message += '<fmis:Entity>' + federalEntityId + '</fmis:Entity>';
	message += '</fmis:Department_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("DepartmentList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 20000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("DepartmentList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Department_Response");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("mof:Department_Recordtype");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var id = data.item(i).getElementsByTagName("mof:FederalDepartmentID").item(0).text;
					var enName = data.item(i).getElementsByTagName("mof:Englishname").item(0).text;
					var arName = data.item(i).getElementsByTagName("mof:ArabicName").item(0).text;

					arrList.push({
						id : id,
						enName : enName,
						arName : arName,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getCategoryList = function(callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fmis="http://www.mof.gov.ae/FMIS.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fmis:IssueCategory_Request>';
	message += '<fmis:Entity>' + '12' + '</fmis:Entity>';
	message += '</fmis:IssueCategory_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("CategoryList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 20000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("CategoryList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("IssueCategory_Response");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("mof:IssueCategory_Recordtype");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var id = data.item(i).getElementsByTagName("mof:MaincategoryID").item(0).text;
					var enName = data.item(i).getElementsByTagName("mof:Englishname").item(0).text;
					var arName = data.item(i).getElementsByTagName("mof:ArabicName").item(0).text;

					arrList.push({
						id : id,
						enName : enName,
						arName : arName,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getSubCategoryList = function(categoryId, callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'FMIS_Support/FMIS_Get_All_Parameters/FMIS_support_get_all_request_parameters_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fmis="http://www.mof.gov.ae/FMIS.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fmis:IssueSubCategory_Request>';
	message += '<fmis:MaincategoryID>' + categoryId + '</fmis:MaincategoryID>';
	message += '</fmis:IssueSubCategory_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("SubCategoryList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 20000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("SubCategoryList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("IssueSubCategory_Response");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("mof:IssueSubCategory_Recordtype");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var id = data.item(i).getElementsByTagName("mof:SubCategoryID").item(0).text;
					var enName = data.item(i).getElementsByTagName("mof:Englishname").item(0).text;
					var categoryId = data.item(i).getElementsByTagName("mof:MaincategoryID").item(0).text;
					var teamId = data.item(i).getElementsByTagName("mof:TeamID").item(0).text;
					var arName = data.item(i).getElementsByTagName("mof:ArabicName").item(0).text;

					arrList.push({
						id : id,
						enName : enName,
						categoryId : categoryId,
						teamId : teamId,
						arName : arName,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

// Manu  works  News webservice

exports.getNewsWebservices = function(lowerCount, upperCount, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var langcode = (Alloy.Globals.isEnglish) ? 1 : 2;
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/News/News_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/News/News_client_ep';
	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:news="http://www.mof.gov.ae/News.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<news:Input_Request>';
	message += '<news:Lower>' + lowerCount + '</news:Lower>';
	message += '<news:Upper>' + upperCount + '</news:Upper>';
	message += '<news:Language>' + langcode + '</news:Language>';
	message += '</news:Input_Request>';
	message += '</soapenv:Body>';
	message += '</soapenv:Envelope>';
	var request = Titanium.Network.createHTTPClient();
	Ti.API.info('news webservice request >>' + message);
	request.timeout = 25000;
	request.onload = function(e) {
		var responseText = getXMLFormate(this.responseText);
		//responseText = responseText.replace(/&/g, "_");
		Ti.API.info('news webservice response >>' + responseText);
		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_Response");
		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var news = result.getElementsByTagName("mof:NewsList");
			var newsList = [];
			for (var i = 0; i < news.length; i++) {
				newsList.push({
					title : news.item(i).getElementsByTagName("mof:NewsTitle").item(0).textContent,
					date : news.item(i).getElementsByTagName("mof:Date").item(0).textContent,
					teaser : news.item(i).getElementsByTagName("mof:Teaser").item(0).textContent,
					body : news.item(i).getElementsByTagName("mof:Body").item(0).textContent,
					thumbnail : news.item(i).getElementsByTagName("mof:Thumbnail").item(0).textContent,
					bigImage : news.item(i).getElementsByTagName("mof:MainNewsImage").item(0).textContent
				});
			}

			Alloy.Globals.hideLoading();
			callBackFunction({
				totalCount : result.getElementsByTagName("mof:TotalCount").item(0).textContent,
				newsList : newsList
			});
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);

};

function getSecurityQuestionTag(arrQuestion) {
	var message = "";
	message += "<vatx:SequrityQuestionsList>";
	for (var i = 0; i < arrQuestion.length; i++) {
		if (arrQuestion[i].answer.length == 0) {
			continue;
		}
		message += "<vatx:SequrityQuestionsRec>";
		message += '<vatx:question>' + arrQuestion[i].id + '</vatx:question>';
		message += '<vatx:questionAR/>';
		message += '<vatx:questionEN/>';
		message += '<vatx:answer>' + arrQuestion[i].answer + '</vatx:answer>';
		message += '</vatx:SequrityQuestionsRec>';
	}
	message += "</vatx:SequrityQuestionsList>";
	return message;
}

/* VatTax Services Start */
//vat tax user login
exports.vatTaxUserRegister = function(user, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:UserId", "vatx:Username", "vatx:Password", "vatx:EmailId", "vatx:userType", "vatx:UserTitle", "vatx:UserAddress", "vatx:MobileNo", "vatx:PhoneNo", "vatx:FaxNo", "vatx:POBox"];
	var values = [user.UserId, user.Username, user.Password, user.EmailId, user.userType, user.UserTitle, user.UserAddress, user.MobileNo, user.PhoneNo, user.FaxNo, user.POBox];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:UserRegistrationRequestMessage>';
	message += getBodyEnvelop(param, values);
	message += getSecurityQuestionTag(user.arrSecurityQue);
	message += '</vatx:UserRegistrationRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax User Registration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax User Registration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("UserRegistrationResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.registration, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {

				Alloy.Globals.hideLoading();
				callBackFunction(true);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.vatTaxUser_Update = function(user, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	Ti.API.info("==>Vat tax user update : user obj :" + JSON.stringify(user));
	var param = ["vatx:UserTypeId", "vatx:UserName", "vatx:EmailId", "vatx:UserTitle", "vatx:UserAddress", "vatx:MobileNo", "vatx:TelephoneNo", "vatx:FaxNo", "vatx:POBoxNo"];
	var values = [user.userType, user.Username, user.EmailId, user.UserTitle, user.UserAddress, user.MobileNo, user.PhoneNo, user.FaxNo, user.POBox];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><vatx:EditUserProfileRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTax();
	message += '</vatx:AuthenticationTokenRecord>';
	message += '<vatx:UpdateUserEntityRecord>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:UpdateUserEntityRecord>';
	message += getSecurityQuestionTag(user.arrSecurityQue);
	message += '</vatx:EditUserProfileRequestMessage></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax User Update profile Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax User Update Profile Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("EditUserProfileResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.profile, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {
				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};
				var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject,
				};
				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

function vatTaxUserLogin(userName, passWord, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	currentAttempt++;
	Ti.API.info('Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction(null);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:UserName", "vatx:Password"];
	var values = [userName, passWord];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Authenticator_Service/vatandtaxauthenticatorbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Authenticator_Service/vatandtaxauthenticatorbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXAuthenticator/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:ValidateUserRequestMessage>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:ValidateUserRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax User Login Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax User Login Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ValidateUserResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (result.getElementsByTagName("vatx:Status").item(0).textContent != "Success") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.login, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {
				/*var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				 var tokenOject = {
				 tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
				 status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				 description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				 description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				 emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
				 createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
				 lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
				 tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
				 roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
				 groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				 };
				 */
				var userInfo = result.getElementsByTagName("vatx:UserInfoRecord").item(0);

				var questionListNode = result.getElementsByTagName("vatx:QuestionRec");
				var arrQuestion = [];
				for (var i = 0; i < questionListNode.length; i++) {

					var childNodes = questionListNode.item(i).getChildNodes();
					var questionId,
					    questionAR,
					    questionEN;

					var index = 0;
					Ti.API.info('appResult = ' + childNodes.length);
					while (index < childNodes.length) {

						if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:id") {
							questionId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Ques_AR") {
							questionAR = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Ques_EN") {
							questionEN = childNodes.item(index).textContent;
							index += 1;
						} else {
							index += 1;
						}
					}

					arrQuestion.push({
						questionId : questionId,
						question_Ar : questionAR,
						question_En : questionEN
					});
				}

				/*var userInfoObject = {
				 id : userInfo.getElementsByTagName("vatx:Id").item(0).textContent,
				 address : userInfo.getElementsByTagName("vatx:Address").item(0).textContent,
				 email : userInfo.getElementsByTagName("vatx:Email").item(0).textContent,
				 faxNumber : userInfo.getElementsByTagName("vatx:FaxNumber").item(0).textContent,
				 fullName : userInfo.getElementsByTagName("vatx:FullName").item(0).textContent,
				 mobileNumber : userInfo.getElementsByTagName("vatx:MobileNumber").item(0).textContent,
				 pOBox : userInfo.getElementsByTagName("vatx:POBox").item(0).textContent,
				 phoneNumber : userInfo.getElementsByTagName("vatx:PhoneNumber").item(0).textContent,
				 userID : userInfo.getElementsByTagName("vatx:UserID").item(0).textContent,
				 userName : userInfo.getElementsByTagName("vatx:UserName").item(0).textContent,
				 userTypeId : userInfo.getElementsByTagName("vatx:UserTypeId").item(0).textContent,
				 password : passWord
				 };*/
				var login = {
					// tokenDetails : tokenOject,
					// userInfo : userInfoObject
					arrQuestion : arrQuestion
				};
				Ti.API.info('Vat Tax User Login returning object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		// Alloy.Globals.hideLoading();
		// callBackFunction(null);

		if (request.status != 200) {
			// Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			vatTaxUserLogin(userName, passWord, callBackFunction);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.vatTaxUserLogin = vatTaxUserLogin;

exports.vatTaxUser_GetUserProfile = function(userName, canAlertShow, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:Username"];
	var values = [userName];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:GetUserInfoRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTax();
	message += '</vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:GetUserInfoRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax Get  User Profile Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax Get  User Profile Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetUserInfoResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";

			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (result.getElementsByTagName("vatx:Status").item(0).textContent != "Success") {
				if (canAlertShow) {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.login, serviceDescription);
				}

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}
				if (isExpired == true) {
					Ti.App.Properties.setInt("isLoggedIn_VatTax", false);
				}

				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {
				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				//result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};

				var userInfo = result.getElementsByTagName("vatx:UserInfoRecord").item(0);
				var userInfoObject = {
					id : userInfo.getElementsByTagName("vatx:Id").item(0).textContent,
					address : userInfo.getElementsByTagName("vatx:Address").item(0).textContent,
					email : userInfo.getElementsByTagName("vatx:Email").item(0).textContent,
					faxNumber : userInfo.getElementsByTagName("vatx:FaxNumber").item(0).textContent,
					fullName : userInfo.getElementsByTagName("vatx:FullName").item(0).textContent,
					mobileNumber : userInfo.getElementsByTagName("vatx:MobileNumber").item(0).textContent,
					pOBox : userInfo.getElementsByTagName("vatx:POBox").item(0).textContent,
					phoneNumber : userInfo.getElementsByTagName("vatx:PhoneNumber").item(0).textContent,
					userID : userInfo.getElementsByTagName("vatx:UserID").item(0).textContent,
					userName : userInfo.getElementsByTagName("vatx:UserName").item(0).textContent,
					userTypeId : userInfo.getElementsByTagName("vatx:UserTypeId").item(0).textContent,

				};
				Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject
				};
				Ti.API.info('Vat Tax Get  User Profile returning object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.vatTaxUser_ChangePassword = function(oldPassword, newPassword, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:NewPassword"];
	var values = [newPassword];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:ChangePasswordRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTax();
	message += '</vatx:AuthenticationTokenRecord>';
	message += '<vatx:UserEntityRec>';
	message += getVatTax_UserEntity(oldPassword);
	message += '</vatx:UserEntityRec>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:ChangePasswordRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax Get  User Change Password Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax Get  User Change Password Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ChangePasswordResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (result.getElementsByTagName("vatx:Status").item(0).textContent != "Success") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {
				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				//result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};
				var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
				userInfoObject.password = newPassword;

				Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject
				};
				Ti.API.info('Vat Tax Get  User Profile returning object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.vatTaxForgotPassword = function(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXUserManagement/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<sch:ForgotPasswordRequestMessage>';
	//<sch:AuthenticationTokenRecord>
	//message += getBodyEnvelop_TokenRecord_VatTaxForms();
	//message += '</sch:AuthenticationTokenRecord>';
	message += '<sch:UserEntityRec><sch:Username>' + userName + '</sch:Username></sch:UserEntityRec>';
	message += '</sch:ForgotPasswordRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax Forgot Password Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Forgot Password Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ForgotPasswordResponseMessage");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.lblForgotPassword, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {

				/*var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				 var tokenOject = {
				 tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
				 status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				 description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				 description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				 emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
				 createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
				 lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
				 tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
				 roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
				 groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				 };
				 var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;

				 Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));*/

				var login = {
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					operationId : result.getElementsByTagName("vatx:OperationId").item(0).textContent,
					//tokenDetails : tokenOject,
					//userInfo : userInfoObject
				};
				Ti.API.info('Vat Tax Get  User Profile returning object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

/* VAT Tax Services end */
/* Reports start */

exports.getGFS_Reports = function(lastYear, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/GFS_GovOP_Report_Revenue_Expense/gfs_govop_report_rev_expsbpel_client_ep';
	else
		url = serverUrl + 'GFS_GovOP_Report_Revenue_Expense/gfs_govop_report_rev_expsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:gfs="http://www.mof.gov.ae/gfs" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<gfs:Input_Request>';
	message += '<gfs:Current_Year>' + lastYear + '</gfs:Current_Year>';
	message += '</gfs:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getGFS_Reports Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getGFS_Reports Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("mof:Report_Reponses");

		var arrRev = [];
		var arrExp = [];
		var arrAsse_Lia = [];
		var arrIndicies = [];

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var rev = result.getElementsByTagName("mof:GFS_Rev");
			if (rev.length > 0) {
				for (var i = 0; i < rev.length; i++) {
					var code = rev.item(i).getElementsByTagName("mof:CODE").item(0).textContent;
					var arDesc = rev.item(i).getElementsByTagName("mof:ARABIC_DESCRIPTION").item(0).textContent;
					var enDesc = rev.item(i).getElementsByTagName("mof:ENGISH_DESCRIPTION").item(0).textContent;
					var year1 = rev.item(i).getElementsByTagName("mof:YEAR1").item(0).textContent;
					var year2 = rev.item(i).getElementsByTagName("mof:YEAR2").item(0).textContent;
					var year3 = rev.item(i).getElementsByTagName("mof:YEAR3").item(0).textContent;

					arrRev.push({
						code : code,
						arDesc : arDesc,
						enDesc : enDesc,
						year1 : year1,
						year2 : year2,
						year3 : year3,
					});
				}
			}

			var exp = result.getElementsByTagName("mof:GFS_Exp");
			if (exp.length > 0) {
				for (var i = 0; i < exp.length; i++) {
					var code = exp.item(i).getElementsByTagName("mof:CODE").item(0).textContent;
					var arDesc = exp.item(i).getElementsByTagName("mof:ARABIC_DESCRIPTION").item(0).textContent;
					var enDesc = exp.item(i).getElementsByTagName("mof:ENGISH_DESCRIPTION").item(0).textContent;
					var year1 = exp.item(i).getElementsByTagName("mof:YEAR1").item(0).textContent;
					var year2 = exp.item(i).getElementsByTagName("mof:YEAR2").item(0).textContent;
					var year3 = exp.item(i).getElementsByTagName("mof:YEAR3").item(0).textContent;

					arrExp.push({
						code : code,
						arDesc : arDesc,
						enDesc : enDesc,
						year1 : year1,
						year2 : year2,
						year3 : year3,
					});
				}
			}

			var asse_lia = result.getElementsByTagName("mof:GFS_Assets_Lia");
			if (asse_lia.length > 0) {
				for (var i = 0; i < asse_lia.length; i++) {
					var code = asse_lia.item(i).getElementsByTagName("mof:CODE").item(0).textContent;
					var arDesc = asse_lia.item(i).getElementsByTagName("mof:ARABIC_DESCRIPTION").item(0).textContent;
					var enDesc = asse_lia.item(i).getElementsByTagName("mof:ENGISH_DESCRIPTION").item(0).textContent;
					var year1 = asse_lia.item(i).getElementsByTagName("mof:YEAR1").item(0).textContent;
					var year2 = asse_lia.item(i).getElementsByTagName("mof:YEAR2").item(0).textContent;
					var year3 = asse_lia.item(i).getElementsByTagName("mof:YEAR3").item(0).textContent;

					arrAsse_Lia.push({
						code : code,
						arDesc : arDesc,
						enDesc : enDesc,
						year1 : year1,
						year2 : year2,
						year3 : year3,
					});
				}
			}

			var indicies = result.getElementsByTagName("mof:GFS_Ind");
			if (indicies.length > 0) {
				for (var i = 0; i < indicies.length; i++) {
					var code = indicies.item(i).getElementsByTagName("mof:CODE").item(0).textContent;
					var arDesc = indicies.item(i).getElementsByTagName("mof:ARABIC_DESCRIPTION").item(0).textContent;
					var enDesc = indicies.item(i).getElementsByTagName("mof:ENGISH_DESCRIPTION").item(0).textContent;
					var year1 = indicies.item(i).getElementsByTagName("mof:YEAR1").item(0).textContent;
					var year2 = indicies.item(i).getElementsByTagName("mof:YEAR2").item(0).textContent;
					var year3 = indicies.item(i).getElementsByTagName("mof:YEAR3").item(0).textContent;

					arrIndicies.push({
						code : code,
						arDesc : arDesc,
						enDesc : enDesc,
						year1 : year1,
						year2 : year2,
						year3 : year3,
					});
				}
			}

			var data = {
				arrRev : arrRev,
				arrExp : arrExp,
				arrAsse_Lia : arrAsse_Lia,
				arrIndicies : arrIndicies,
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getGFS_Reports_Outlays = function(nextYear, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/GFS_Outlays_Report_Cofog/gfs_outlays_report_cofogbpel_client_ep';
	else
		url = serverUrl + 'GFS_Outlays_Report_Cofog/gfs_outlays_report_cofogbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:gfs="http://www.mof.gov.ae/gfs" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<gfs:Input_Request>';
	message += '<gfs:Current_Year>' + nextYear + '</gfs:Current_Year>';
	message += '</gfs:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getGFS_Reports_Outlays Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getGFS_Reports_Outlays Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Report_response");

		var arrList = [];
		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var reports = result.getElementsByTagName("mof:GFS_GovOP_Report_Rev_exp");
			if (reports.length > 0) {
				for (var i = 0; i < reports.length; i++) {
					var code = reports.item(i).getElementsByTagName("mof:CODE").item(0).textContent;
					var arDesc = reports.item(i).getElementsByTagName("mof:ARABIC_DESCRIPTION").item(0).textContent;
					var enDesc = reports.item(i).getElementsByTagName("mof:ENGISH_DESCRIPTION").item(0).textContent;
					var year1 = reports.item(i).getElementsByTagName("mof:YEAR1").item(0).textContent;
					var year2 = reports.item(i).getElementsByTagName("mof:YEAR2").item(0).textContent;
					var year3 = reports.item(i).getElementsByTagName("mof:YEAR3").item(0).textContent;

					arrList.push({
						code : code,
						arDesc : arDesc,
						enDesc : enDesc,
						year1 : year1,
						year2 : year2,
						year3 : year3,
					});
				}
			}

			var data = {
				arrData : arrList
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getFederalUnion_ExpCategory = function(catId, type, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//	var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep';
	else
		url = serverUrl + 'Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fin="http://www.mof.gov.ae/final_account_union_subctid" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fin:Input_Request>';
	message += '<fin:CatId>' + catId + '</fin:CatId>';
	message += '<fin:Type_Of_Report>' + type + '</fin:Type_Of_Report>';
	message += '</fin:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalUnion_Reports Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalUnion_Reports Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).textContent;
			var categories = result.getElementsByTagName("mof:EXPvalue_list_type");
			Ti.API.info("==>categories length :" + categories);

			var arrCategories = [];
			for (var i = 0; i < categories.length; i++) {
				var catNode = categories.item(i);

				var id,
				    subId,
				    enTitle,
				    arTitle,
				    total = "";

				id = catNode.getElementsByTagName("mof:catid").item(0).textContent;
				subId = catNode.getElementsByTagName("mof:subcatid").item(0).textContent;
				enTitle = catNode.getElementsByTagName("mof:Desc_en").item(0).textContent;
				arTitle = catNode.getElementsByTagName("mof:Desc_ar").item(0).textContent;
				total = catNode.getElementsByTagName("mof:EXPvalue_total").item(0).textContent;

				arrCategories.push({
					id : id,
					subId : subId,
					enTitle : enTitle,
					arTitle : arTitle,
					total : total,
				});

			}

			callBackFunction(arrCategories);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getFederalUnion_AsseCategory = function(catId, type, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//	var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep";
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep';
	else
		url = serverUrl + 'Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:fin="http://www.mof.gov.ae/final_account_union_subctid" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fin:Input_Request>';
	message += '<fin:CatId>' + catId + '</fin:CatId>';
	message += '<fin:Type_Of_Report>' + type + '</fin:Type_Of_Report>';
	message += '</fin:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalUnion_Reports Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalUnion_Reports Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).textContent;
			var categories = result.getElementsByTagName("mof:Asset_list");
			Ti.API.info("==>categories length :" + categories);

			var arrCategories = [];
			for (var i = 0; i < categories.length; i++) {
				var catNode = categories.item(i);

				var id,
				    subId,
				    enTitle,
				    arTitle,
				    total = "";

				id = catNode.getElementsByTagName("mof:catid").item(0).textContent;
				subId = catNode.getElementsByTagName("mof:subcatid").item(0).textContent;
				enTitle = catNode.getElementsByTagName("mof:Desc_en").item(0).textContent;
				arTitle = catNode.getElementsByTagName("mof:Desc_ar").item(0).textContent;
				total = catNode.getElementsByTagName("mof:AssetValue_Total").item(0).textContent;

				arrCategories.push({
					id : id,
					subId : subId,
					enTitle : enTitle,
					arTitle : arTitle,
					total : total,
				});

			}

			callBackFunction(arrCategories);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 *
 * =====================
 *
 *
 */

exports.budgetCeilingSummaryReports = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-120_R200_Budget_Ceiling_Summary_Report/budget_ceiling_summary_report_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-120_R200_Budget_Ceiling_Summary_Report/budget_ceiling_summary_report_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.mof.gov.ae" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '170' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:Entity_Code>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:Entity_Code>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetCeilingSummaryReports Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetCeilingSummaryReports Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrBudgetData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:Report_Reponse");
			if (cofogData.length > 0) {
				for (var i = 0; i < cofogData.length; i++) {
					var entity = cofogData.item(i).getElementsByTagName("mof:Federal_Entity").item(0).text;
					var accounts = cofogData.item(i).getElementsByTagName("mof:Accounts").item(0).text;
					var data = cofogData.item(i).getElementsByTagName("mof:Data").item(0).text;
					var year = cofogData.item(i).getElementsByTagName("mof:Year").item(0).text;

					arrBudgetData.push({
						entity : entity,
						accounts : accounts,
						data : data,
						year : year,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;

			var budget = {
				arrData : arrBudgetData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				enDescription : enDescription,
				arDescription : arDescription,
			};
			callBackFunction(budget);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.expenditureByFunctionAndMinistry = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-115_R01Government_Expenditure_by_function_and_ministry/expenditure_by_function_and_ministry_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-115_R01Government_Expenditure_by_function_and_ministry/expenditure_by_function_and_ministry_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.mof.gov.ae" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '160' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:Entity_Code>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:Entity_Code>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("expenditureByFunctionAndMinistry Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("expenditureByFunctionAndMinistry Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrBudgetData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:Cofog_Group");
			if (cofogData.length > 0) {
				for (var i = 0; i < cofogData.length; i++) {
					var cofogId = cofogData.item(i).getElementsByTagName("mof:COFOG_ID").item(0).text;
					var arDesc = cofogData.item(i).getElementsByTagName("mof:Arabic_Description").item(0).text;
					var data = cofogData.item(i).getElementsByTagName("mof:Data").item(0).text;
					var year = cofogData.item(i).getElementsByTagName("mof:Year").item(0).text;

					arrBudgetData.push({
						code : cofogId,
						desc : arDesc,
						total : data,
						year : year,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;

			var budget = {
				arrData : arrBudgetData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				enDescription : enDescription,
				arDescription : arDescription,
			};
			callBackFunction(budget);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.BudgetReportsBySingleYear = function(year, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-100_A190_Budget_by_Activity_by_Account_Group_Report/a190_budget_by_activity_by_account_group_reportbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-100_A190_Budget_by_Activity_by_Account_Group_Report/a190_budget_by_activity_by_account_group_reportbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.mof.gov.ae" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '150' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:Entity_Code>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:Entity_Code>';
	message += '<mof:Current_Year>' + year + '</mof:Current_Year>';
	message += '<mof:Multiple_Years>';
	message += '<mof:Year1>' + '' + '</mof:Year1>';
	message += '<mof:Year2>' + '' + '</mof:Year2>';
	message += '<mof:Year3>' + '' + '</mof:Year3>';
	message += '</mof:Multiple_Years>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("BudgetReportsBySingleYear Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("BudgetReportsBySingleYear Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Report_response");

		var arrBudgetData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var budget = result.getElementsByTagName("mof:A190_Budget_Activity_Group");
			if (budget.length > 0) {
				for (var i = 0; i < budget.length; i++) {
					var ministry = budget.item(i).getElementsByTagName("mof:Ministry").item(0).text;
					var year = budget.item(i).getElementsByTagName("mof:Year").item(0).text;
					var strategicObjective = budget.item(i).getElementsByTagName("mof:Strategic_Objective").item(0).text;
					var group21 = budget.item(i).getElementsByTagName("mof:Group21").item(0).text;
					var group22 = budget.item(i).getElementsByTagName("mof:Group22").item(0).text;
					var group31 = budget.item(i).getElementsByTagName("mof:Group31").item(0).text;
					var total = budget.item(i).getElementsByTagName("mof:Total").item(0).text;

					arrBudgetData.push({
						ministry : ministry,
						year : year,
						strategicObjective : strategicObjective,
						group21 : group21,
						group22 : group22,
						group31 : group31,
						total : total,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;

			var budget = {
				arrData : arrBudgetData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				enDescription : enDescription,
				arDescription : arDescription,
			};
			callBackFunction(budget);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.BudgetReportsByMultipleYear = function(year1, year2, year3, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-100_A190_Budget_by_Activity_by_Account_Group_Report/a190_budget_by_activity_by_account_group_reportbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-100_A190_Budget_by_Activity_by_Account_Group_Report/a190_budget_by_activity_by_account_group_reportbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.mof.gov.ae" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '150' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:Entity_Code>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:Entity_Code>';
	message += '<mof:Current_Year>' + '' + '</mof:Current_Year>';
	message += '<mof:Multiple_Years>';
	message += '<mof:Year1>' + year1 + '</mof:Year1>';
	message += '<mof:Year2>' + year2 + '</mof:Year2>';
	message += '<mof:Year3>' + year3 + '</mof:Year3>';
	message += '</mof:Multiple_Years>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("BudgetReportsByMultipleYear Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("BudgetReportsByMultipleYear Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Report_response");

		var arrBudgetData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var budget = result.getElementsByTagName("mof:Budget_Activity_All_years");
			if (budget.length > 0) {
				for (var i = 0; i < budget.length; i++) {
					var ministry = budget.item(i).getElementsByTagName("mof:Ministry").item(0).text;
					var strategicObjective = budget.item(i).getElementsByTagName("mof:Strategic_Objective").item(0).text;
					var year1 = budget.item(i).getElementsByTagName("mof:YearValue1").item(0).text;
					var year2 = budget.item(i).getElementsByTagName("mof:YearValue2").item(0).text;
					var year3 = budget.item(i).getElementsByTagName("mof:YearValue3").item(0).text;
					var total = budget.item(i).getElementsByTagName("mof:Total").item(0).text;

					arrBudgetData.push({
						ministry : ministry,
						strategicObjective : strategicObjective,
						year1 : year1,
						year2 : year2,
						year3 : year3,
						total : total,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;

			var budget = {
				arrData : arrBudgetData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				enDescription : enDescription,
				arDescription : arDescription,
			};
			callBackFunction(budget);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getAllYearsForRevenueKPI_COFOG_G2C = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'default/Budget_execution_Cofog_Years/budget_execution_cofog_years_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Budget_execution_Cofog_Years/budget_execution_cofog_years_client_ep';
	else
		url = serverUrl + 'Budget_execution_Cofog_Years/budget_execution_cofog_years_client_ep';

	Ti.API.info("getAllYearsForRevenueKPI_COFOG_G2C Url = " + url);

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.mof.gov.ae.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:Tokenreq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + Alloy.Globals.G2C_CommonServiceCode + '</mof:ServiceID>';
	message += '</mof:Tokenreq>';

	message += '<mof:Input>' + 'YEARS' + '</mof:Input>';

	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getAllYearsForRevenueKPI_COFOG_G2C Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getAllYearsForRevenueKPI_COFOG_G2C Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrYearsData_Cofog = [];
		var arrYearsData_RevenueKPI = [];
		var arrYearsData_ExpenditureKPI = [];

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:Cofog_OutputResponse");
			if (cofogData.length > 0) {
				var cofogData_Years = cofogData.item(0).getElementsByTagName("mof:Year");
				for (var i = 0; i < cofogData_Years.length; i++) {

					var year = cofogData_Years.item(i).text;

					arrYearsData_Cofog.push({
						year : year,
					});
				}
			}

			var RevenueKPIData = result.getElementsByTagName("mof:RevenueKPI_OutputResponse");
			if (RevenueKPIData.length > 0) {
				var RevenueKPIData_Years = RevenueKPIData.item(0).getElementsByTagName("mof:Year");
				for (var i = 0; i < RevenueKPIData_Years.length; i++) {

					var year = RevenueKPIData_Years.item(i).text;

					arrYearsData_RevenueKPI.push({
						year : year,
					});
				}
			}

			var ExpenditureKPIData = result.getElementsByTagName("mof:ExpenditureKPI_OutputResponse");
			if (ExpenditureKPIData.length > 0) {
				var ExpenditureKPIData_Years = ExpenditureKPIData.item(0).getElementsByTagName("mof:Year");
				for (var i = 0; i < ExpenditureKPIData_Years.length; i++) {

					var year = ExpenditureKPIData_Years.item(i).text;

					arrYearsData_ExpenditureKPI.push({
						year : year,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var years = {
				arrYearsData_Cofog : arrYearsData_Cofog,
				arrYearsData_RevenueKPI : arrYearsData_RevenueKPI,
				arrYearsData_ExpenditureKPI : arrYearsData_ExpenditureKPI,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			Ti.API.info("getAllYearsForRevenueKPI_COFOG_G2C JSON Output" + JSON.stringify(years));
			callBackFunction(years);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.budgetExecutionByCofog_Avg_YearWise_G2C = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	else
		url = serverUrl + 'R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';

	Ti.API.info("budgetExecutionByCofog Avg_YearWise_G2C Url = " + url);

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:Tokenreq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + Alloy.Globals.G2C_CommonServiceCode + '</mof:ServiceID>';
	message += '</mof:Tokenreq>';
	/* 999.00 should be passed to this method..00 is must */
	message += '<mof:Cofog_ID>' + Alloy.Globals.G2C_CommonEntityCode + '.00</mof:Cofog_ID>';
	message += '<mof:Year_Code></mof:Year_Code>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionByCofog Avg_YearWise_G2C Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionByCofog Avg_YearWise_G2C Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrCofogData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:YEARS_VALUES");
			if (cofogData.length > 0) {
				for (var i = 0; i < cofogData.length; i++) {

					var year = cofogData.item(i).getElementsByTagName("mof:Year").item(0).text;
					var value = cofogData.item(i).getElementsByTagName("mof:Year_Value").item(0).text;

					arrCofogData.push({
						year : year,
						value : value,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var cofog = {
				arrData : arrCofogData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			Ti.API.info("budgetExecutionByCofog Avg_YearWise_G2C JSON Output" + JSON.stringify(cofog));
			callBackFunction(cofog);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.budgetExecutionByCofogByYear = function(year, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	else
		url = serverUrl + 'R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	Ti.API.info("budgetExecutionByCofogByYear Url = " + url);

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:Tokenreq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '50' + '</mof:ServiceID>';
	message += '</mof:Tokenreq>';
	message += '<mof:Cofog_ID>' + '' + '</mof:Cofog_ID>';
	message += '<mof:Year_Code>' + year + '</mof:Year_Code>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionByCofogByYear Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionByCofogByYear Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrCofogData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:Budget_Execution_by_Cofog_Output");
			if (cofogData.length > 0) {
				for (var i = 0; i < cofogData.length; i++) {
					var id = cofogData.item(i).getElementsByTagName("mof:cofog_id").item(0).text;
					var name = cofogData.item(i).getElementsByTagName("mof:cofog").item(0).text;
					var year = cofogData.item(i).getElementsByTagName("mof:Year_Code").item(0).text;
					var value = cofogData.item(i).getElementsByTagName("mof:Year_value").item(0).text;

					arrCofogData.push({
						id : id,
						name : name,
						year : year,
						value : value,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var cofog = {
				arrData : arrCofogData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(cofog);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.budgetExecutionByCofogByGroup = function(group, callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';
	else
		url = serverUrl + 'R-205_Budget_Execution_by_Cofog/r_205_budget_execution_by_cofog_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:Tokenreq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '50' + '</mof:ServiceID>';
	message += '</mof:Tokenreq>';
	message += '<mof:Cofog_ID>' + group + '</mof:Cofog_ID>';
	message += '<mof:Year_Code>' + '' + '</mof:Year_Code>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionByCofogByGroup Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionByCofogByGroup Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:OutputResponse");
			if (cofogData.length > 0) {

				var id = cofogData.item(0).getElementsByTagName("mof:Cofog_ID").item(0).text;
				var name = cofogData.item(0).getElementsByTagName("mof:Cofog").item(0).text;
				var year1 = cofogData.item(0).getElementsByTagName("mof:YEAR1").item(0).text;
				var year2 = cofogData.item(0).getElementsByTagName("mof:YEAR2").item(0).text;
				var year3 = cofogData.item(0).getElementsByTagName("mof:YEAR3").item(0).text;
				var year4 = cofogData.item(0).getElementsByTagName("mof:YEAR4").item(0).text;
				var year5 = cofogData.item(0).getElementsByTagName("mof:YEAR5").item(0).text;

			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var cofog = {
				id : id,
				name : name,
				year1 : year1,
				year2 : year2,
				year3 : year3,
				year4 : year4,
				year5 : year5,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(cofog);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.budgetExecutionGroup_Expenditure = function(year, groupType, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	else
		url = serverUrl + 'R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + 40 + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += ' <mof:YEAR>' + year + '</mof:YEAR>';
	message += '<mof:Type_Of_report>' + groupType + '</mof:Type_Of_report>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionGroup_Expenditure Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionGroup_Expenditure Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrExpenditure = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var revenue = result.getElementsByTagName("mof:Expenditure");
			if (revenue.length > 0) {
				for (var i = 0; i < revenue.length; i++) {
					var groupCode = revenue.item(i).getElementsByTagName("mof:Group_CODE").item(0).text;
					var groupDesc = revenue.item(i).getElementsByTagName("mof:Group_description").item(0).text;
					var allocatedBudget = revenue.item(i).getElementsByTagName("mof:Expenditure_allocated_budget").item(0).text;
					var executedBudget = revenue.item(i).getElementsByTagName("mof:Expenditure_executed_budget").item(0).text;

					arrExpenditure.push({
						groupCode : groupCode,
						groupDesc : groupDesc,
						allocatedBudget : allocatedBudget,
						executedBudget : executedBudget,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var expenditure = {
				arrData : arrExpenditure,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(expenditure);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.revenueExpenditureKPI_Avg_for3Years_G2C = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/MoF_G2G_Avg_Kpis/avg_kpi_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/MoF_G2G_Avg_Kpis/avg_kpi_bpel_client_ep';
	else
		url = serverUrl + 'MoF_G2G_Avg_Kpis/avg_kpi_bpel_client_ep';
	Ti.API.info("revenueExpenditureKPI_Avg_for3Years_G2C Url = " + url);

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.mof.gov.ae">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:MINISTRY_CODE>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:MINISTRY_CODE>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + Alloy.Globals.G2C_CommonServiceCode + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("revenueExpenditureKPI_Avg_for3Years_G2C Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("revenueExpenditureKPI_Avg_for3Years_G2C Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var revenueData = result.getElementsByTagName("mof:OutputResponse");
			var yearsData = result.getElementsByTagName("mof:OutputResponse");
			if (revenueData.length > 0) {

				var id = revenueData.item(0).getElementsByTagName("mof:MINISTER_CODE").item(0).text;

				var name = "";
				//revenueData.item(0).getElementsByTagName("mof:Minitry_Name").item(0).text;
				//var year1 = revenueData.item(0).getElementsByTagName("mof:YEAR1").item(0).text;
				//var year2 = revenueData.item(0).getElementsByTagName("mof:YEAR2").item(0).text;
				//var year3 = revenueData.item(0).getElementsByTagName("mof:YEAR3").item(0).text;
			}
			var arrRevenueExpenditureKPIAvg = [];
			var revenueExpenditureKPIAvgData = result.getElementsByTagName("mof:YEAR_VALUES");
			if (revenueExpenditureKPIAvgData.length > 0) {
				for (var i = 0; i < revenueExpenditureKPIAvgData.length; i++) {
					var year = revenueExpenditureKPIAvgData.item(i).getElementsByTagName("mof:Year").item(0).text;
					var revenue_avg = revenueExpenditureKPIAvgData.item(i).getElementsByTagName("mof:Revenue_Avg").item(0).text;
					var expenditure_avg = revenueExpenditureKPIAvgData.item(i).getElementsByTagName("mof:Expindeture_Avg").item(0).text;

					arrRevenueExpenditureKPIAvg.push({
						year : year,
						revenue_avg : revenue_avg,
						expenditure_avg : expenditure_avg,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var revenueExpenditureAvgKPI = {
				id : id,
				name : name,
				arrData : arrRevenueExpenditureKPIAvg,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			Ti.API.info("revenueExpenditureKPI_Avg_for3Years_G2C JSON Response = " + JSON.stringify(revenueExpenditureAvgKPI));
			callBackFunction(revenueExpenditureAvgKPI);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.revenueKPIfor3Years = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-215_Revenue_KPI_3years/r_215_revenue_kpi_3years_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-215_Revenue_KPI_3years/r_215_revenue_kpi_3years_bpel_client_ep';
	else
		url = serverUrl + 'R-215_Revenue_KPI_3years/r_215_revenue_kpi_3years_bpel_client_ep';
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:MINISTRY_CODE>' + '07' + '</mof:MINISTRY_CODE>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '80' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("revenueKPIfor3Years Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("revenueKPIfor3Years Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var revenueData = result.getElementsByTagName("mof:OutputResponse");
			if (revenueData.length > 0) {

				var id = revenueData.item(0).getElementsByTagName("mof:MINISTER_CODE").item(0).text;
				var name = revenueData.item(0).getElementsByTagName("mof:Minitry_Name").item(0).text;
				var year1 = revenueData.item(0).getElementsByTagName("mof:YEAR1").item(0).text;
				var year2 = revenueData.item(0).getElementsByTagName("mof:YEAR2").item(0).text;
				var year3 = revenueData.item(0).getElementsByTagName("mof:YEAR3").item(0).text;
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var revenueKPI = {
				id : id,
				name : name,
				year1 : year1,
				year2 : year2,
				year3 : year3,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(revenueKPI);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.expenditureKPIfor3Years = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-215_Expindeture_KPI_3years/r215_expindeture_kpi_3years_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-215_Expindeture_KPI_3years/r215_expindeture_kpi_3years_bpel_client_ep';
	else
		url = serverUrl + 'R-215_Expindeture_KPI_3years/r215_expindeture_kpi_3years_bpel_client_ep';
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:MINISTRY_CODE>' + '07' + '</mof:MINISTRY_CODE>';
	message += '<mof:Tokenreq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '70' + '</mof:ServiceID>';
	message += '</mof:Tokenreq>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("expenditureKPIfor3Years Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("expenditureKPIfor3Years Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var expData = result.getElementsByTagName("mof:OutputResponse");
			if (expData.length > 0) {

				var id = expData.item(0).getElementsByTagName("mof:MINISTER_CODE").item(0).text;
				var name = expData.item(0).getElementsByTagName("mof:MINISTRY_NAME").item(0).text;
				var year1 = expData.item(0).getElementsByTagName("mof:YEAR1").item(0).text;
				var year2 = expData.item(0).getElementsByTagName("mof:YEAR2").item(0).text;
				var year3 = expData.item(0).getElementsByTagName("mof:YEAR3").item(0).text;
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var expenditureKPI = {
				id : id,
				name : name,
				year1 : year1,
				year2 : year2,
				year3 : year3,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(expenditureKPI);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.budgetExecutionWithRevenueAndExpenditure = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-210_Budget_Execution_Rev_Exp/r200_budget_execution_rev_exp_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-210_Budget_Execution_Rev_Exp/r200_budget_execution_rev_exp_bpel_client_ep';
	else
		url = serverUrl + 'R-210_Budget_Execution_Rev_Exp/r200_budget_execution_rev_exp_bpel_client_ep';
	Ti.API.info("budgetExecutionWithRevenueAndExpenditure Url = " + url);

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + Alloy.Globals.G2C_CommonServiceCode + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:MINISTRY_CODE>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:MINISTRY_CODE>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionWithRevenueAndExpenditure Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionWithRevenueAndExpenditure Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrYearData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var yearData = result.getElementsByTagName("mof:YearWise");
			if (yearData.length > 0) {
				for (var i = 0; i < yearData.length; i++) {
					var year = yearData.item(i).getElementsByTagName("mof:Year").item(0).text;
					var ministerName = yearData.item(i).getElementsByTagName("mof:Ministry_Name").item(0).text;
					var revenueAllocated = yearData.item(i).getElementsByTagName("mof:REVENUE_ALLOCATED_BUDGET").item(0).text;
					var revenueExecuted = yearData.item(i).getElementsByTagName("mof:REVENUE_EXECUTED_BUDGET").item(0).text;
					var expenditureAllocated = yearData.item(i).getElementsByTagName("mof:EXPENDITURE_ALLOCATED_BUDGET").item(0).text;
					var expenditureExecuted = yearData.item(i).getElementsByTagName("mof:EXPENDITURE_EXECUTED_BUDGET").item(0).text;

					arrYearData.push({
						year : year,
						ministerName : ministerName,
						revenueAllocated : revenueAllocated,
						revenueExecuted : revenueExecuted,
						expenditureAllocated : expenditureAllocated,
						expenditureExecuted : expenditureExecuted,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var revenueAndExpenditure = {
				arrData : arrYearData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(revenueAndExpenditure);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.budgetExecutionGroup_Revenue = function(year, groupType, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//var url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	else
		url = serverUrl + 'MoF_G2G_App/R-200_Budget_Execution_by_Group/r_200_budget_execution_by_group_bpel_client_ep';
	Ti.API.info("budgetExecutionGroup_Revenue Url = " + url);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + 40 + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += ' <mof:YEAR>' + year + '</mof:YEAR>';
	message += '<mof:Type_Of_report>' + groupType + '</mof:Type_Of_report>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetExecutionGroup_Revenue Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetExecutionGroup_Revenue Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("Output_response");

		var arrRevenue = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var revenue = result.getElementsByTagName("mof:Revenue");
			if (revenue.length > 0) {
				for (var i = 0; i < revenue.length; i++) {
					var groupCode = revenue.item(i).getElementsByTagName("mof:Group_CODE").item(0).text;
					var groupDesc = revenue.item(i).getElementsByTagName("mof:Group_description").item(0).text;
					var allocatedBudget = revenue.item(i).getElementsByTagName("mof:Revenue_allocated_budget").item(0).text;
					var executedBudget = revenue.item(i).getElementsByTagName("mof:Revenue_executed_budget").item(0).text;

					arrRevenue.push({
						groupCode : groupCode,
						groupDesc : groupDesc,
						allocatedBudget : allocatedBudget,
						executedBudget : executedBudget,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(1).text;
			var arDescription = rootNode.item(0).getElementsByTagName("mof:Description_AR").item(0).text;
			var enDescription = rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).text;

			var revenue = {
				arrData : arrRevenue,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				arDescription : arDescription,
				enDescription : enDescription,
			};
			callBackFunction(revenue);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
var getXMLFormate = function(str) {
	if (str == undefined || str == null) {
		str = "";
	}
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&/g, "and");
	str = str.replace(/> </g, "><");
	str = str.replace(/>  </g, "><");
	str = str.replace(/>   </g, "><");
	return str;
};

exports.budgetProgramStructureByEntity = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/A140_Authorities_by_SO_PC_AC/authorities_by_so_pc_ac_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2G_App/A140_Authorities_by_SO_PC_AC/authorities_by_so_pc_ac_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.mof.gov.ae">';
	//	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:TokenReq>';
	message += '<mof:AuthenticationTokenInpRecord>';
	message += getCommonTokenForG2CReports();
	message += '</mof:AuthenticationTokenInpRecord>';
	message += '<mof:ServiceID>' + '270' + '</mof:ServiceID>';
	message += '</mof:TokenReq>';
	message += '<mof:Entity_Code>' + Alloy.Globals.G2C_CommonEntityCode + '</mof:Entity_Code>';
	// temporary entity code...
	message += '</mof:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("budgetProgramStructureByEntity Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	//	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("budgetProgramStructureByEntity Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:Report_Reponse");

		var arrBudgetData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var cofogData = result.getElementsByTagName("mof:Authorities_Group");
			if (cofogData.length > 0) {
				for (var i = 0; i < cofogData.length; i++) {
					var code = cofogData.item(i).getElementsByTagName("mof:CODE").item(0).text;
					var arDesc = cofogData.item(i).getElementsByTagName("mof:CODEDESC_ARABIC").item(0).text;
					var codeType = cofogData.item(i).getElementsByTagName("mof:CODE_TYPE").item(0).text;

					arrBudgetData.push({
						code : code,
						arDesc : arDesc,
						codeType : codeType,
					});
				}
			}

			var authenticationRecord = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");
			if (authenticationRecord.length > 0) {
				var tokenStatus = authenticationRecord.item(0).getElementsByTagName("mof:Status").item(0).text;
				var createdDate = authenticationRecord.item(0).getElementsByTagName("mof:CreatedDate").item(0).text;
				var lastUpdatedDate = authenticationRecord.item(0).getElementsByTagName("mof:LastUpdatedDate").item(0).text;
			}

			var status = result.getElementsByTagName("mof:Status").item(1).text;
			var enDescription = result.getElementsByTagName("mof:Description_EN").item(0).text;
			var arDescription = result.getElementsByTagName("mof:Description_AR").item(0).text;

			var budget = {
				arrData : arrBudgetData,
				tokenStatus : tokenStatus,
				createdDate : createdDate,
				lastUpdatedDate : lastUpdatedDate,
				status : status,
				enDescription : enDescription,
				arDescription : arDescription,
			};
			callBackFunction(budget);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*Reports End */

/* Contact MOF Start */
exports.saveContactMOF = function(name, email, phoneNumber, notes, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/contactMof/contactmof_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/contactMof/contactmof_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://xmlns.oracle.com/profileWebservice/contactMof/contactMof">';
	//message += getHeaderEnvelop();
	message += '<soapenv:Header>';
	message += '<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">';
	// message += '<wsse:UsernameToken wsu:Id="UsernameToken-27EC66CA7AA169B1CA14188016801061">';
	message += '<wsse:UsernameToken wsu:Id="UsernameToken">';
	message += '<wsse:Username>weblogic</wsse:Username>';
	message += '<wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">weblogic123</wsse:Password>';
	message += '<wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">6BDI24KCV5WUa/HtWtMGjg==</wsse:Nonce>';
	message += '<wsu:Created>2014-12-17T07:34:40.096Z</wsu:Created>';
	message += '</wsse:UsernameToken></wsse:Security></soapenv:Header>';
	message += '<soapenv:Body>';
	message += '<con:process>';
	message += '<con:name>' + name + '</con:name>';
	message += '<con:email>' + email + '</con:email>';
	message += '<con:phone_number>' + phoneNumber + '</con:phone_number>';
	message += '<con:comments>' + notes + '</con:comments>';
	message += '</con:process>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Contact MOF  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Contact MOF Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("result").item(0).text;
			callBackFunction(status);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("Contact submission failed");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
/* Contact MOF End */

/* Budget Expense Categories Start */
exports.getBudgetExpenseCategories = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/Category_Location_Service/category_location_service_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/Category_Location_Service/category_location_service_client_ep';
	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://www.mof.gov.ae/Category/Location">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:Input_Request>';
	message += '<mof:Input>c</mof:Input>';
	message += '<mof:Option>Category</mof:Option>';
	message += '</mof:Input_Request>';
	message += '</soapenv:Body>';
	message += '</soapenv:Envelope>';

	var request = Titanium.Network.createHTTPClient();
	Ti.API.info("Budget Expense Categories Envelop request  =============> " + message);
	//    request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);

		responseText = responseText.replace(/&/g, "_");

		Ti.API.info("Budget Expense Categories  Response  =============> " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			Alloy.Globals.hideLoading();
			callBackFunction([]);
		}

		var rootNode = result.getElementsByTagName("Output_Response");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//var subNodesRoot = result.getElementsByTagName("mof:SubNodes");
			//var subNodes = subNodesRoot.item(0).getElementsByTagName("mof:SubNode");

			var categories = result.getElementsByTagName("mof:CategoryResponse");
			Ti.API.info("==>categories length :" + categories);

			var arrCategories = [];
			for (var i = 0; i < categories.length; i++) {
				var catNode = categories.item(i);

				var category_id,
				    category_code,
				    name_en,
				    name_ar,
				    description_en,
				    description_ar,
				    icon_url,
				    background_url = "";

				category_id = catNode.getElementsByTagName("mof:ID").item(0).textContent;
				category_code = catNode.getElementsByTagName("mof:CATEGORY_CODE").item(0).textContent;

				name_en = catNode.getElementsByTagName("mof:CATEGORY_NAME_EN").item(0).textContent;
				description_en = catNode.getElementsByTagName("mof:CATEGORY_DESCRIPTION_EN").item(0).textContent;

				name_ar = catNode.getElementsByTagName("mof:CATEGORY_NAME_AR").item(0).textContent;
				description_ar = catNode.getElementsByTagName("mof:CATEGORY_DESCRIPTION_AR").item(0).textContent;

				icon_url = catNode.getElementsByTagName("mof:CATEGORY_ICON").item(0).textContent;
				background_url = catNode.getElementsByTagName("mof:CATEGORY_BACKGROUND").item(0).textContent;

				arrCategories.push({
					category_id : category_id,
					category_code : category_code,
					name_en : name_en,
					name_ar : name_ar,
					description_en : description_en,
					description_ar : description_ar,
					icon_url : icon_url,
					background_url : background_url
				});

			}
			Alloy.Globals.hideLoading();
			callBackFunction(arrCategories);

		} else {
			callBackFunction([]);

		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Alloy.Globals.hideLoading();
		callBackFunction([]);

	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/* Budget Expense Categories End */
// manu About us
exports.getAboutUs = function(uniqueName, callBackFunction) {
	if (hasConnection() == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/AboutMOF/aboutmof_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/AboutMOF/aboutmof_client_ep';
	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exam="http://www.example.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<exam:Request>';
	message += '<exam:Uniquename>' + uniqueName + '</exam:Uniquename>';
	message += '</exam:Request>';
	message += '</soapenv:Body>';
	message += '</soapenv:Envelope>';

	var request = Titanium.Network.createHTTPClient();
	Ti.API.info("request  =============> " + message);
	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);

		responseText = responseText.replace(/&/g, "_");

		Ti.API.info("Response  =============> " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			Alloy.Globals.hideLoading();
			callBackFunction(null);
		}

		var rootNode = result.getElementsByTagName("Response");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var primary_title = primary_content = primary_image = primary_uniqueName = primary_designType = "";

			if (Alloy.Globals.isEnglish) {
				primary_title = result.getElementsByTagName("mof:PrimaryTitle_EN").item(0).textContent;
				primary_content = result.getElementsByTagName("mof:PrimaryContent_EN").item(0).textContent;
			} else {
				primary_title = result.getElementsByTagName("mof:PrimaryTitle_AR").item(0).textContent;
				primary_content = result.getElementsByTagName("mof:PrimaryContent_AR").item(0).textContent;
			}
			primary_image = result.getElementsByTagName("mof:PrimaryImageURL").item(0).textContent;
			primary_uniqueName = result.getElementsByTagName("mof:PrimaryUniquename").item(0).textContent;
			primary_designType = result.getElementsByTagName("mof:PrimaryDesignType").item(0).textContent;

			var parentNode = {
				title : primary_title,
				content : primary_content,
				image : primary_image,
				uniqueName : primary_uniqueName,
				designType : primary_designType
			};

			var subNodesRoot = result.getElementsByTagName("mof:SubNodes");
			var subNodes = subNodesRoot.item(0).getElementsByTagName("mof:SubNode");
			Ti.API.info("==>sub nodes length :" + subNodes);

			var arrSubNodes = [];
			for (var i = 0; i < subNodes.length; i++) {
				var subNode = subNodes.item(i);

				var subNode_title = subNode_content = subNode_image = subNode_uniqueName = subNode_designType = "";
				if (Alloy.Globals.isEnglish) {

					subNode_title = subNode.getElementsByTagName("mof:SubnodeTitle_EN").item(0).textContent;
					subNode_content = subNode.getElementsByTagName("mof:SubNodeContent_EN").item(0).textContent;
				} else {
					subNode_title = subNode.getElementsByTagName("mof:SubNodeTitle_AR").item(0).textContent;
					subNode_content = subNode.getElementsByTagName("mof:SubNodeContent_AR").item(0).textContent;
				}
				subNode_image = subNode.getElementsByTagName("mof:SubNodeImageURL").item(0).textContent;
				subNode_uniqueName = subNode.getElementsByTagName("mof:SubNodeUniquename").item(0).textContent;
				subNode_designType = subNode.getElementsByTagName("mof:SubNodeDesignType").item(0).textContent;

				arrSubNodes.push({
					title : subNode_title,
					content : subNode_content,
					image : subNode_image,
					uniqueName : subNode_uniqueName,
					designType : subNode_designType
				});

			}

			var genericContent = {
				parentNode : parentNode,
				subNodes : arrSubNodes
			};

			Alloy.Globals.hideLoading();
			callBackFunction(genericContent);

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

//Banners Webservice

exports.getBanners = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/AboutMOF/aboutmof_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/AboutMOF/aboutmof_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:exam="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<exam:Request>';
	message += '<exam:Uniquename>' + 'Banners' + '</exam:Uniquename>';
	// Static
	message += '</exam:Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getBanners Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getBanners Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:SubNodes");

		var arrBanner = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var banner = result.getElementsByTagName("mof:SubNode");
			if (banner.length > 0) {
				for (var i = 0; i < banner.length; i++) {
					var url = banner.item(i).getElementsByTagName("mof:SubNodeImageURL").item(0).textContent;

					arrBanner.push({
						url : url,
					});
				}
			}

			callBackFunction(arrBanner);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 *
 * LOOK UP WEB SERVICES
 *
 *
 */

exports.getCertificateLanguage = function(callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetCertificateLangRequestMessage>';
	message += '<sch:Input>' + "GetCertificateLanguageReqMessage" + '</sch:Input>';
	message += '</sch:GetCertificateLangRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Certificate Language Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Certificate Language Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:CertificateLanguageList");

		var arrTypes = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var types = result.getElementsByTagName("mof:CertificateLanguageRec");
			if (types.length > 0) {
				for (var i = 0; i < types.length; i++) {
					var idNode = types.item(i).getElementsByTagName("mof:ID");
					Ti.API.info('LENGTH == ' + idNode.length);
					var id = types.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var title = types.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var titleAr = types.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					arrTypes.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			/*var arrTypes = [{
				id : 1,
				title : "Arabic",
				titleAr : "Arabic"
			}, {
				id : 2,
				title : "English",
				titleAr : "English"
			}];*/

			callBackFunction(arrTypes);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getCertificateType = function(callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetCertificateTypeReqMessage>';
	message += '<sch:Input>' + "GetCertificateTypeReqMessage" + '</sch:Input>';
	message += '</sch:GetCertificateTypeReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Certificate Type Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Certificate Type Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:CertificateTypeList");

		var arrTypes = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var types = result.getElementsByTagName("mof:CertificateTypeRec");
			if (types.length > 0) {
				for (var i = 0; i < types.length; i++) {
					var idNode = types.item(i).getElementsByTagName("mof:ID");
					Ti.API.info('LENGTH == ' + idNode.length);
					var id = types.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var title = types.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var titleAr = types.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					arrTypes.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			callBackFunction(arrTypes);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getCertificateDeliveryMethod = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetCertiDelMethodsReqMessage>';
	message += '<sch:Input>' + "Del Method" + '</sch:Input>';
	message += '</sch:GetCertiDelMethodsReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Del Method Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Del Method Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:CertiDelMethodsList");

		var arrMethods = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var listNode = result.getElementsByTagName("mof:CertiDelMethodRec");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var title = listNode.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var titleAr = listNode.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					arrMethods.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			callBackFunction(arrMethods);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getEmirateList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetEmiritesIDReqMessage>';
	message += '<sch:Input>' + "Emirate List" + '</sch:Input>';
	message += '</sch:GetEmiritesIDReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Emirate Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Emirate Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:EmiritesIDList");

		var arrEmirate = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var listNode = result.getElementsByTagName("mof:EmiritesIDRec");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var title = listNode.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var titleAr = listNode.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					arrEmirate.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			callBackFunction(arrEmirate);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getPlaceIssueList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetPlaceOfIssueRequestMessage>';
	message += '<sch:Input>' + "Emirate List" + '</sch:Input>';
	message += '</sch:GetPlaceOfIssueRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Place of Issue Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Place of Issue Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:PlaceOfIssuesList");

		var arrPlaceOfIssue = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var listNode = result.getElementsByTagName("mof:PlaceOfIssueRec");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var title = listNode.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var titleAr = listNode.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					arrPlaceOfIssue.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			callBackFunction(arrPlaceOfIssue);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getCountryList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetAgreementCountries></sch:GetAgreementCountries>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Country List Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Country List Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAgreementCountriesResponse");

		var arrCountry = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			var listNode = result.getElementsByTagName("vatx:CountryEntities");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("vatx:ID").item(0).textContent;
					var titleAr = listNode.item(i).getElementsByTagName("vatx:CountryNameAR").item(0).textContent;
					var title = listNode.item(i).getElementsByTagName("vatx:CountryNameEN").item(0).textContent;

					arrCountry.push({
						id : id,
						title : title,
						titleAr : titleAr
					});
				}
			}

			callBackFunction(arrCountry);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getNationalityList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetLookUps/vatandtaxgetlookupsbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXGetLookups/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetNationalityReqMessage>';
	message += '<sch:Input>Nationality</sch:Input>';
	message += '</sch:GetNationalityReqMessage></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Nationality List Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Nationality List Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetNationalityRespMessage");

		var arrCountry = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			var listNode = result.getElementsByTagName("mof:NationalityRec");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("mof:Id").item(0).textContent;
					var titleAr = listNode.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent;
					var title = listNode.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent;
					var isGCCCountry = listNode.item(i).getElementsByTagName("mof:IsGCCCountry").item(0).textContent;

					arrCountry.push({
						id : id,
						title : title,
						titleAr : titleAr,
						isGCCCountry : (isGCCCountry == 1) ? true : false
					});
				}
			}
			Ti.API.info('BEFORE SORT = ' + JSON.stringify(arrCountry));
			arrCountry.sort(function(a, b) {
				return a.title - b.title;

			});
			Ti.API.info('AFTER SORT = ' + JSON.stringify(arrCountry));
			callBackFunction(arrCountry);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 *
 * TAX & VAT
 *
 */

/*function taxApplicationBody(arrKey, arrValue) {
 var bodyMessage = "";

 bodyMessage += "<soapenv:Body><sch:SubmitTAXApplication>";
 for (var i = 0,
 len = arrKey.length; i < len; i++) {
 if (arrKey[i] == "sch:AuthenticationTokenRecord") {
 bodyMessage += "<" + arrKey[i] + ">";
 var arrAuthTokenKey = arrValue[i].arrKey;
 var arrAuthTokenValue = arrValue[i].arrValue;
 for (var j = 0,
 jLen = arrAuthTokenKey.length; j < jLen; j++) {
 bodyMessage += "<" + arrAuthTokenKey[j] + ">";
 bodyMessage += arrAuthTokenValue[j];
 bodyMessage += "</" + arrAuthTokenKey[j] + ">";
 }
 bodyMessage += "</" + arrKey[i] + ">";
 bodyMessage += "<sch:SubmitTAXApplicationRecord>";
 }
 }

 bodyMessage += "</sch:SubmitTAXApplicationRecord></sch:SubmitTAXApplication></soapenv:Body>";
 return bodyMessage;
 }*/

function getBodyEnvelop_TokenRecord_VatTaxForms() {
	var param = ["sch:TokenCode", "sch:EmailID", "sch:CreatedDate", "sch:LastUpdatedDate", "sch:Status", "sch:RoleType", "sch:GroupType"];
	var values = [Ti.App.Properties.getString("authenticationCode_VatTax"), Ti.App.Properties.getString("emailID_VatTax"), Ti.App.Properties.getString("createdDate_VatTax"), Ti.App.Properties.getString("lastUpdatedDate_VatTax"), Ti.App.Properties.getString("status_VatTax"), Ti.App.Properties.getString("roleType_VatTax"), Ti.App.Properties.getString("groupType_VatTax")];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		bodyMessage += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return bodyMessage;
}

function getAttachments(arr) {
	var message = "";
	for (var i = 0,
	    len = arr.length; i < len; i++) {
		Ti.API.info('arr[i].isDownloaded == ' + arr[i].isDownloaded);
		if (arr[i].isDownloaded == true) {
			continue;
		}
		var isPdf = false;
		var arrAttchment = arr[i].arr;
		message += "<sch:AttachmentRec>";
		message += "<sch:AttachmentSequenceNo>" + ((arr[i].sequenceId == -1) ? (i + 1) : arr[i].sequenceId) + "</sch:AttachmentSequenceNo>";
		message += "<sch:TypeID>" + arr[i].typeId + "</sch:TypeID>";

		if (arrAttchment.length == 1) {
			if (arrAttchment[0].split('.')[1] == "pdf") {
				message += "<sch:Name></sch:Name>";
				message += "<sch:FileBytes></sch:FileBytes>";
				message += "<sch:PdfFileName>" + arrAttchment[0] + "</sch:PdfFileName>";
				isPdf = true;
			} else {
				message += "<sch:Name>" + ((arr[i].appId == -1) ? arr[i].name : arr[i].appId) + "</sch:Name>";
				message += "<sch:FileBytes></sch:FileBytes>";
				message += "<sch:PdfFileName></sch:PdfFileName>";
			}
		} else {
			message += "<sch:Name>" + ((arr[i].appId == -1) ? arr[i].name : arr[i].appId) + "</sch:Name>";
			message += "<sch:FileBytes></sch:FileBytes>";
			message += "<sch:PdfFileName></sch:PdfFileName>";
		}
		message += "<sch:FileIDList>";
		if (!isPdf) {
			for (var j = 0; j < arrAttchment.length; j++) {
				message += "<sch:FileIDRec>" + arrAttchment[j] + "</sch:FileIDRec>";
			}
		}
		message += "</sch:FileIDList>";
		message += "</sch:AttachmentRec>";
	}
	return message;
}

exports.submitCorporateTax = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var param = [];
	var values = [];

	if (obj.applicationWFTypeID == 3) {//Corporate Vat
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:CompanyName", "sch:EmirateID", "sch:ChamberOfCommerce", "sch:TradeLicenseNo", "sch:Address", "sch:Email", "sch:MobileNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:NationalityID", "sch:NatureOfBusiness", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [0, obj.financialYear, false, obj.companyName, obj.emirateId, obj.chamberOfCommerce, obj.tradeLicenseNo, obj.address, obj.email, obj.mobileNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.nationalityId, obj.natureOfBusiness, obj.submittedByUserId, obj.certificateTypeId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
		if (obj.phoneNo.trim().length > 0) {
			param.push("sch:PhoneNo");
			values.push(obj.phoneNo);
		}
		if (obj.faxNo.trim().length > 0) {
			param.push("sch:FaxNo");
			values.push(obj.faxNo);
		}
	} else if (obj.applicationWFTypeID == 2) {//individual Tax
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:CompanyName", "sch:EmirateID", "sch:Address", "sch:Email", "sch:MobileNo", "sch:PhoneNo", "sch:FaxNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:PassportNo", "sch:NationalityID", "sch:VisaNo", "sch:WorkFor", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [0, obj.financialYear, false, obj.name, obj.emirateId, obj.address, obj.email, obj.mobileNo, obj.phoneNo, obj.faxNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.passportNumber, obj.nationalityId, obj.visaNumber, obj.workFor, obj.submittedByUserId, obj.certificateTypeId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
	} else if (obj.applicationWFTypeID == 4 || obj.applicationWFTypeID == 6) {//Corporate Tax
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:CompanyName", "sch:EmirateID", "sch:ChamberOfCommerce", "sch:TradeLicenseNo", "sch:Address", "sch:Email", "sch:MobileNo", "sch:PhoneNo", "sch:FaxNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:NationalityID", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [0, obj.financialYear, false, obj.companyName, obj.emirateId, obj.chamberOfCommerce, obj.tradeLicenseNo, obj.address, obj.email, obj.mobileNo, obj.phoneNo, obj.faxNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.nationalityId, obj.submittedByUserId, obj.certificateTypeId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
	}
	var arrAttachment = obj.arrAttachment;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:SubmitTAXApplication>';
	message += '<sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTaxForms();
	message += '</sch:AuthenticationTokenRecord>';
	message += '<sch:SubmitTAXApplicationRecord><sch:NewApplication>';
	message += getBodyEnvelop(param, values);
	message += '</sch:NewApplication>';
	message += '<sch:EDirhamCardCode>' + obj.eDhirhamCardCode + '</sch:EDirhamCardCode>';
	message += '<sch:MOBReturnURLPage>http://194.170.30.187:7777/Mobipay/Redirect.html</sch:MOBReturnURLPage>';
	message += '<sch:AttachmentList>';
	message += getAttachments(arrAttachment);
	message += '</sch:AttachmentList></sch:SubmitTAXApplicationRecord>';
	message += '</sch:SubmitTAXApplication></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Submit Corporate Tax Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 145000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Submit Corporate Tax Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null, false, "");
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("SubmitTAXApplicationResponse");

		var arrPlaceOfIssue = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null, false, "");
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				// Alloy.Globals.ShowAlert(serviceDescription);

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}
				if (!isExpired) {
					if (obj.applicationWFTypeID == 2 || obj.applicationWFTypeID == 4) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.taxApplication, serviceDescription);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.vatApplication, serviceDescription);
					}
				}

				Alloy.Globals.hideLoading();
				callBackFunction(null, isExpired, serviceDescription);
			} else {

				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};
				var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;

				Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));

				var applicationId = result.getElementsByTagName("vatx:ApplicaitonID").item(0).textContent;
				var bankUrl = result.getElementsByTagName("vatx:BankURL").item(0).textContent;

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject,
					applicationId : applicationId,
					bankUrl : bankUrl
				};
				Ti.API.info('Vat Tax Get  User Profile returning object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login, false, serviceDescription);
			}
		} else {
			callBackFunction(null, false, "");
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null, false, "");

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.updateCorporateTax = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var param = [];
	var values = [];

	if (obj.applicationWFTypeID == 3) {//Corporate Vat
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:CompanyName", "sch:EmirateID", "sch:ChamberOfCommerce", "sch:TradeLicenseNo", "sch:Address", "sch:Email", "sch:MobileNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:NationalityID", "sch:NatureOfBusiness", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:ApplicationBusinessID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [obj.vTaxId, obj.financialYear, false, obj.companyName, obj.emirateId, obj.chamberOfCommerce, obj.tradeLicenseNo, obj.address, obj.email, obj.mobileNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.nationalityId, obj.natureOfBusiness, obj.submittedByUserId, obj.certificateTypeId, obj.applicationBusinessId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
		if (obj.phoneNo.trim().length > 0) {
			param.push("sch:PhoneNo");
			values.push(obj.phoneNo);
		}
		if (obj.faxNo.trim().length > 0) {
			param.push("sch:FaxNo");
			values.push(obj.faxNo);
		}
	} else if (obj.applicationWFTypeID == 2) {//individual Tax
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:EmirateID", "sch:Address", "sch:Email", "sch:MobileNo", "sch:PhoneNo", "sch:FaxNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:PassportNo", "sch:NationalityID", "sch:VisaNo", "sch:WorkFor", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:ApplicationBusinessID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [obj.vTaxId, obj.financialYear, false, obj.emirateId, obj.address, obj.email, obj.mobileNo, obj.phoneNo, obj.faxNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.passportNumber, obj.nationalityId, obj.visaNumber, obj.workFor, obj.submittedByUserId, obj.certificateTypeId, obj.applicationBusinessId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
	} else if (obj.applicationWFTypeID == 4) {//Corporate Tax
		param = ["sch:ID", "sch:RetroactiveYear", "sch:IsRetroactive", "sch:CompanyName", "sch:EmirateID", "sch:ChamberOfCommerce", "sch:TradeLicenseNo", "sch:Address", "sch:Email", "sch:MobileNo", "sch:PhoneNo", "sch:FaxNo", "sch:POBox", "sch:CountryIssuedForID", "sch:PlaceOfIssuingCertificateID", "sch:CertificateLanguageID", "sch:Comments", "sch:NationalityID", "sch:SubmittedByUserID", "sch:CertificateTypeID", "sch:ApplicationBusinessID", "sch:InitiatorName", "sch:InitiatorUserName", "sch:StatusID", "sch:ApplicationWFTypeID", "sch:FormSubmitDate", "sch:IsPrinted", "sch:CertificateDeliveryMethodID"];
		values = [obj.vTaxId, obj.financialYear, false, obj.companyName, obj.emirateId, obj.chamberOfCommerce, obj.tradeLicenseNo, obj.address, obj.email, obj.mobileNo, obj.phoneNo, obj.faxNo, obj.POBox, obj.countryIssuedForId, obj.placeOfIssuingCertificateID, obj.certificateLanguageId, obj.comments, obj.nationalityId, obj.submittedByUserId, obj.certificateTypeId, obj.applicationBusinessId, obj.initiatorName, obj.initiatorUserName, 3, obj.applicationWFTypeID, obj.formSubmitDate, false, obj.certificateDeliveryMethodId];
	}
	var arrAttachment = obj.arrAttachment;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:SubmitTask>';
	message += '<sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTaxForms();
	message += '</sch:AuthenticationTokenRecord><sch:SubmitTaskRec>';
	message += '<sch:FinishedTask>';

	message += '<sch:ActionTakenByUserID>' + obj.submittedByUserId + '</sch:ActionTakenByUserID>';
	message += '<sch:ActionTakenByFullNameName>' + obj.initiatorUserName + '</sch:ActionTakenByFullNameName>';
	message += '<sch:comment>' + obj.comments + '</sch:comment>';

	message += '<sch:ApplicationForm>';
	message += getBodyEnvelop(param, values);
	message += '</sch:ApplicationForm>';
	message += '</sch:FinishedTask><sch:AttachmentList>';
	message += getAttachments(arrAttachment);
	message += '</sch:AttachmentList></sch:SubmitTaskRec>';
	message += '</sch:SubmitTask></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("update Corporate Tax Envelope = " + message);
	var request = Titanium.Network.createHTTPClient();

	request.timeout = 145000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Update Tax/VAT Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null, false, "");
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("SubmitTaskResponse");

		var arrPlaceOfIssue = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null, false, "");
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				// Alloy.Globals.ShowAlert(serviceDescription);

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}
				if (!isExpired) {
					if (obj.applicationWFTypeID == 2 || obj.applicationWFTypeID == 4) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.taxApplication, serviceDescription);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.vatApplication, serviceDescription);
					}
				}

				Alloy.Globals.hideLoading();
				callBackFunction(null, isExpired, serviceDescription);
			} else {

				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};
				var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject,
				};
				Ti.API.info('Vat Tax Updated object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideLoading();
				callBackFunction(login, false, serviceDescription);
			}
		} else {
			callBackFunction(null, false, "");
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null, false, "");

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getVatTaxApplication = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var param = ["sch:ID", "sch:UserName"];
	var values = [obj.appId, obj.userName];

	var url = "";
	if (Alloy.Globals.isProduction) {
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	} else {
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	}

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetTaxApplication>';
	message += '<sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTaxForms();
	message += '</sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop(param, values);
	message += '</sch:GetTaxApplication></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Tax Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 145000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Tax Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null, false, "");
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetTaxApplicationResponse");

		var arrPlaceOfIssue = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null, false, "");
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";

			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				// Alloy.Globals.ShowAlert(serviceDescription);

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}

				Alloy.Globals.hideLoading();
				callBackFunction(null, isExpired, serviceDescription);
			} else {

				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};
				var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;

				Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));

				var appResult = result.getElementsByTagName("vatx:GetTaxApplicationResult");
				Ti.API.info('appResult  LENGTH = ' + appResult.length);
				if (appResult.length > 0) {
					var childNodes = appResult.item(0).getChildNodes();

					var vTaxId = "",
					    retroactiveYear = "",
					    companyName = "",
					    emirateId = "",
					    emirate_en = "",
					    emirate_ar = "",
					    chamberOfCommerce = "",
					    tradeLicenseNo = "",
					    address = "",
					    email = "",
					    mobileNo = "",
					    POBoxNo = "",
					    countryIssuedId = "",
					    countryIssued_en = "",
					    countryIssued_ar = "",
					    placeOfIssuingId = "",
					    placeOfIssuing_en = "",
					    placeOfIssuing_ar = "",
					    languageId = "",
					    language_en = "",
					    language_ar = "",
					    comments = "",
					    passportNo = "",
					    nationalityId = "",
					    nationality_en = "",
					    nationality_ar = "",
					    visaNo = "",
					    workFor = "",
					    natureOfBusiness = "",
					    certificateTypeId = "",
					    certificateType_en = "",
					    certificateType_ar = "",
					    applicationBusinessId = "",
					    statusId = "",
					    applicationWFTypeId = "",
					    isGCCCountry = false;
					var arrAttachment = [];

					var doc = {};
					var index = 0;
					Ti.API.info('appResult = ' + childNodes.length);
					while (index < childNodes.length) {
						if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ID") {
							vTaxId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:RetroactiveYear") {
							retroactiveYear = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CompanyName") {
							companyName = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:EmirateID") {
							emirateId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:EmirateID_EN") {
							emirate_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:EmirateID_AR") {
							emirate_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ChamberOfCommerce") {
							chamberOfCommerce = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:TradeLicenseNo") {
							tradeLicenseNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Address") {
							address = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Email") {
							email = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:MobileNo") {
							mobileNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PhoneNo") {
							phoneNumber = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:FaxNo") {
							faxNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:POBox") {
							POBoxNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CountryIssuedForID") {
							countryIssuedId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CountryIssuedForID_EN") {
							countryIssued_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:IsGCCCountry") {
							isGCCCountry = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CountryIssuedForID_AR") {
							countryIssued_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PlaceOfIssuingCertificateID") {
							placeOfIssuingId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PlaceOfIssuingCertificateID_EN") {
							placeOfIssuing_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PlaceOfIssuingCertificateID_AR") {
							placeOfIssuing_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateLanguageID") {
							languageId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateLanguageID_EN") {
							language_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateLanguageID_AR") {
							language_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Comments") {
							comments = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PassportNo") {
							passportNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NationalityID") {
							nationalityId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NationalityID_EN") {
							nationality_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NationalityID_AR") {
							nationality_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:VisaNo") {
							visaNo = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:WorkFor") {
							workFor = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NatureOfBusiness") {
							natureOfBusiness = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateTypeID") {
							certificateTypeId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateTypeID_EN") {
							certificateType_en = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:CertificateTypeID_AR") {
							certificateType_ar = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ApplicationBusinessID") {
							applicationBusinessId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StatusID") {
							statusId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ApplicationWFTypeID") {
							applicationWFTypeId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Attachments") {
							var attachment = result.getElementsByTagName("vatx:Attachments");
							if (attachment.length > 0) {
								var attachmentEntities = result.getElementsByTagName("vatx:AttachmentEntities");
								for (var j = 0; j < attachmentEntities.length; j++) {
									var attachmentID,
									    attachmentUrl,
									    attachmentTypeId,
									    attachmentAppId,
									    attachmentFileName;
									var attachmentIndex = 0;

									var attachmentChild = attachmentEntities.item(j).getChildNodes();
									while (attachmentIndex < attachmentChild.length) {
										if (attachmentChild.item(attachmentIndex) && attachmentChild.item(attachmentIndex).nodeName == "vatx:ID") {
											attachmentID = attachmentChild.item(attachmentIndex).textContent;
											attachmentIndex += 1;
										} else if (attachmentChild.item(attachmentIndex) && attachmentChild.item(attachmentIndex).nodeName == "vatx:AttachmentPathURL") {
											attachmentUrl = attachmentChild.item(attachmentIndex).textContent;
											attachmentIndex += 1;
										} else if (attachmentChild.item(attachmentIndex) && attachmentChild.item(attachmentIndex).nodeName == "vatx:AttachmentTypeID") {
											attachmentTypeId = attachmentChild.item(attachmentIndex).textContent;
											attachmentIndex += 1;
										} else if (attachmentChild.item(attachmentIndex) && attachmentChild.item(attachmentIndex).nodeName == "vatx:ApplicationID") {
											attachmentAppId = attachmentChild.item(attachmentIndex).textContent;
											attachmentIndex += 1;
										} else if (attachmentChild.item(attachmentIndex) && attachmentChild.item(attachmentIndex).nodeName == "vatx:FileName") {
											attachmentFileName = attachmentChild.item(attachmentIndex).textContent;
											attachmentIndex += 1;
										} else {
											attachmentIndex += 1;
										}
									}

									arrAttachment.push({
										attachmentID : attachmentID,
										attachmentUrl : attachmentUrl,
										attachmentTypeId : attachmentTypeId,
										attachmentAppId : attachmentAppId,
										attachmentFileName : attachmentFileName
									});
								}
							}
							index += 1;
						} else {
							index += 1;
						}

					}

					var commentsNode = result.getElementsByTagName("vatx:ApplicationComments");
					var arrComments = [];
					for (var k = 0; k < commentsNode.length; k++) {

						var commentOrder,
						    commentedDate,
						    commentedBy,
						    commentedBody;

						var commetsIndex = 0;

						var childCommetNodes = commentsNode.item(k).getChildNodes();

						while (commetsIndex < childCommetNodes.length) {
							if (childCommetNodes.item(commetsIndex) && childCommetNodes.item(commetsIndex).nodeName == "vatx:Order") {
								commentOrder = childCommetNodes.item(commetsIndex).textContent;
								commetsIndex += 1;
							} else if (childCommetNodes.item(commetsIndex) && childCommetNodes.item(commetsIndex).nodeName == "vatx:CommentDate") {
								commentedDate = childCommetNodes.item(commetsIndex).textContent;
								commetsIndex += 1;
							} else if (childCommetNodes.item(commetsIndex) && childCommetNodes.item(commetsIndex).nodeName == "vatx:CommentedBy") {
								commentedBy = childCommetNodes.item(commetsIndex).textContent;
								commetsIndex += 1;
							} else if (childCommetNodes.item(commetsIndex) && childCommetNodes.item(commetsIndex).nodeName == "vatx:CommentedBody") {
								commentedBody = childCommetNodes.item(commetsIndex).textContent;
								commetsIndex += 1;
							} else {
								commetsIndex += 1;
							}
						}

						arrComments.push({
							commentOrder : commentOrder,
							commentedDate : commentedDate,
							commentedBy : commentedBy,
							commentedBody : commentedBody,
						});

					}

					var objDetail = {
						tokenDetails : tokenOject,
						vTaxId : vTaxId,
						financialYear : retroactiveYear,
						companyName : companyName,
						emirateId : emirateId,
						emirate_en : emirate_en,
						emirate_ar : emirate_ar,
						chamberOfCommerce : chamberOfCommerce,
						tradeLicenseNo : tradeLicenseNo,
						address : address,
						email : email,
						mobileNo : mobileNo,
						phoneNumber : phoneNumber,
						faxNo : faxNo,
						POBox : POBoxNo,
						countryIssuedForId : countryIssuedId,
						countryIssuedFor_en : countryIssued_en,
						countryIssuedFor_ar : countryIssued_ar,
						isGCCCountry : (isGCCCountry == 1) ? true : false,
						placeOfIssuingCertificateID : placeOfIssuingId,
						placeOfIssuingCertificate_en : placeOfIssuing_en,
						placeOfIssuingCertificate_ar : placeOfIssuing_ar,
						certificateLanguageId : languageId,
						certificateLanguage_en : language_en,
						certificateLanguage_ar : language_ar,
						comments : comments,
						passportNumber : passportNo,
						nationalityId : nationalityId,
						nationality_en : nationality_en,
						nationality_ar : nationality_ar,
						visaNumber : visaNo,
						workFor : workFor,
						natureOfBusiness : natureOfBusiness,
						certificateTypeId : certificateTypeId,
						certificateType_en : certificateType_en,
						certificateType_ar : certificateType_ar,
						applicationBusinessId : applicationBusinessId,
						statusId : statusId,
						applicationWFTypeID : applicationWFTypeId,
						arrAttachment : arrAttachment,
						arrComments : arrComments
					};
					Ti.API.info('Vat Tax Get  User object  ==>> ' + JSON.stringify(objDetail));
					Alloy.Globals.hideLoading();
					callBackFunction(objDetail, false, serviceDescription);
					Alloy.Globals.hideLoading();
				} else {
					callBackFunction(null, false, "");
					Alloy.Globals.hideLoading();
				}
			}
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null, false, "");

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.uploadAttachment = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	// var url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/MoF_Mobipay_SaveVTaxPaymentDetails/savevtaxpaymentdetailsbpel_client_ep';

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_Mobipay_SaveVTaxPaymentDetails/savevtaxpaymentdetailsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/MoF_MergeImagesIntoSignglePdf/mergeimageintosignlepdfbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:vatx="http://xmlns.oracle.com/MoF_Application/MoF_MergeImagesIntoSignglePdf/MergeImageIntoSignlePdfBPEL" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><vatx:process>';
	message += '<vatx:AttachmentId>' + obj.typeId + '</vatx:AttachmentId>';
	message += '<vatx:Username>' + obj.userName + '</vatx:Username>';
	message += '<vatx:Filename>' + obj.name + '</vatx:Filename>';
	message += '<vatx:FileContent>' + obj.data + '</vatx:FileContent>';
	message += '</vatx:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Upload Attachment Envelope = " + message);
	
	
	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Upload Attachment Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");
		var data = null;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = rootNode.item(0).getElementsByTagName("vatx:Desc_EN").item(0).textContent;
			else
				serviceDescription = rootNode.item(0).getElementsByTagName("vatx:Desc_AR").item(0).textContent;

			if (!(rootNode.item(0).getElementsByTagName("vatx:Status").item(0).textContent == "Success" || rootNode.item(0).getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.paymentDetails, serviceDescription);

				var statusNode = rootNode.item(0).getElementsByTagName("vatx:Status");
				var isExpired = (statusNode.item(0).textContent == "Expired" || statusNode.item(0).textContent == "InActive") ? true : false;

				Alloy.Globals.hideLoading();
				callBackFunction(null);
				return;
			}

			var fileId = result.getElementsByTagName("vatx:FileId").item(0).textContent;

			callBackFunction(fileId);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getVatTaxPaymentTransactionDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	// var url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/MoF_Mobipay_SaveVTaxPaymentDetails/savevtaxpaymentdetailsbpel_client_ep';

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_Mobipay_SaveVTaxPaymentDetails/savevtaxpaymentdetailsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/MoF_Mobipay_SaveVTaxPaymentDetails/savevtaxpaymentdetailsbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sav="http://xmlns.oracle.com/MoF_Application/MoF_Mobipay_SaveVTaxPaymentDetails/SaveVTaxPaymentDetailsBPEL" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><sav:process>';
	message += '<sav:Applicationid>' + obj.appId + '</sav:Applicationid>';
	message += '</sav:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get VAT TAX Transaction Detail Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get VAT TAX  Transaction Detail Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");
		var data = null;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = rootNode.item(0).getElementsByTagName("vatx:Desc_EN").item(0).textContent;
			else
				serviceDescription = rootNode.item(0).getElementsByTagName("vatx:Desc_AR").item(0).textContent;

			if (!(rootNode.item(0).getElementsByTagName("vatx:Status").item(0).textContent == "Success" || rootNode.item(0).getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.paymentDetails, serviceDescription);

				var statusNode = rootNode.item(0).getElementsByTagName("vatx:Status");
				var isExpired = (statusNode.item(0).textContent == "Expired" || statusNode.item(0).textContent == "InActive") ? true : false;

				Alloy.Globals.hideLoading();
				callBackFunction(null);
				return;
			}

			var classification = result.getElementsByTagName("vatx:TransactionDetails");
			if (classification.length > 0) {

				var operationCode = classification.item(0).getElementsByTagName("vatx:Operationcode").item(0).textContent;
				var operationMessage = classification.item(0).getElementsByTagName("vatx:Operationmessage").item(0).textContent;
				var transactionId = classification.item(0).getElementsByTagName("vatx:PreAuthTransaction_Id").item(0).textContent;
				var transactionAmount = classification.item(0).getElementsByTagName("vatx:TRANSACTION_AMOUNT").item(0).textContent;
				var confirmationId = classification.item(0).getElementsByTagName("vatx:CONFIRMATION_ID").item(0).textContent;
				var transactionDate = classification.item(0).getElementsByTagName("vatx:authDate").item(0).textContent;
				var serviceCode = classification.item(0).getElementsByTagName("vatx:Servicecode").item(0).textContent;
				var enDesc = rootNode.item(0).getElementsByTagName("vatx:Desc_EN").item(0).textContent;
				var arDesc = rootNode.item(0).getElementsByTagName("vatx:Desc_AR").item(0).textContent;

				data = {
					operationCode : operationCode,
					operationMessage : operationMessage,
					transactionId : transactionId,
					transactionAmount : (transactionAmount != "" && transactionAmount != null) ? (parseInt(transactionAmount) / 100) : 0,
					confirmationId : confirmationId,
					transactionDate : transactionDate,
					serviceCode : serviceCode,
					enDesc : enDesc,
					arDesc : arDesc,
				};
			}

			callBackFunction(data);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getTransactionId = function(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_GetTransactionDetails/gettransactiondetailsbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTaxGetTransactionDetails/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetTransactionDetailsReqMessage>';
	message += '<sch:InquiryID>' + userName + '</sch:InquiryID>';
	message += '</sch:GetTransactionDetailsReqMessage></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Transaction Detail Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Transaction Detail Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetTransactionDetailsRespMessage");

		var objTransactionDetail = null;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			objTransactionDetail = {
				operationStatus : rootNode.item(0).getElementsByTagName("vatx:OperationStatus").item(0).textContent,
				desc_en : rootNode.item(0).getElementsByTagName("vatx:Desc_EN").item(0).textContent,
				desc_ar : rootNode.item(0).getElementsByTagName("vatx:Desc_AR").item(0).textContent,
			};

			var objDetail = null;
			var detailNode = rootNode.item(0).getElementsByTagName("vatx:TransactionDetailsRec");
			if (detailNode.length > 0) {
				objDetail = {
					inquiryID : (detailNode.item(0).getElementsByTagName("vatx:InquiryID").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:InquiryID").item(0).textContent : -1,
					receiptID : (detailNode.item(0).getElementsByTagName("vatx:ReceiptID").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:ReceiptID").item(0).textContent : -1,
					totalAmount : (detailNode.item(0).getElementsByTagName("vatx:TotalAmount").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:TotalAmount").item(0).textContent : -1,
					transactionID : (detailNode.item(0).getElementsByTagName("vatx:TransactionID").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:TransactionID").item(0).textContent : -1,
					currentMessage : (detailNode.item(0).getElementsByTagName("vatx:CurrentMessage").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:CurrentMessage").item(0).textContent : "",
					createdDate : (detailNode.item(0).getElementsByTagName("vatx:CreatedDate").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:CreatedDate").item(0).textContent : null,
					status : (detailNode.item(0).getElementsByTagName("vatx:Status").length > 0) ? detailNode.item(0).getElementsByTagName("vatx:Status").item(0).textContent : "",
				};
			}

			objTransactionDetail.objDetail = objDetail;

			callBackFunction(objTransactionDetail);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getMyTasks = function(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetUserTasksRequest>';
	message += '<sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTaxForms();
	message += '</sch:AuthenticationTokenRecord>';
	message += '<sch:UserName>' + userName + '</sch:UserName>';
	message += '</sch:GetUserTasksRequest></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get User Task Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get User Task Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([], false, "");
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetUserTasksResponse");

		var arrTasks = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([], false, "");
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				// Alloy.Globals.ShowAlert(serviceDescription);

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}

				Alloy.Globals.hideLoading();
				callBackFunction([], isExpired, serviceDescription);
			} else {

				var authNode = result.getElementsByTagName("vatx:AuthenticationTokenRecord");
				if (authNode.length > 0) {
					Ti.App.Properties.setString("createdDate_VatTax", authNode.item(0).getElementsByTagName("vatx:CreatedDate").item(0).textContent);
					Ti.App.Properties.setString("lastUpdatedDate_VatTax", authNode.item(0).getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent);
					Ti.API.info('LAST UPDATED DATE = ' + authNode.item(0).getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent);
				}

				var listNode = result.getElementsByTagName("vatx:ApplicationFormMetaEntity");
				if (listNode.length > 0) {
					for (var i = 0; i < listNode.length; i++) {
						/*var vId = listNode.item(i).getElementsByTagName("vatx:ID").item(0).textContent;
						 var businessID = listNode.item(i).getElementsByTagName("vatx:BusinessID").item(0).textContent;
						 var state = listNode.item(i).getElementsByTagName("vatx:StateEN").item(0).textContent;
						 var stateAr = listNode.item(i).getElementsByTagName("vatx:StateAR").item(0).textContent;
						 var startDate = listNode.item(i).getElementsByTagName("vatx:StartDate").item(0).textContent;
						 var endDate = listNode.item(i).getElementsByTagName("vatx:EndDate").item(0).textContent;
						 var needInitiatorAction = listNode.item(i).getElementsByTagName("vatx:NeedInitiatorAction").item(0).textContent;
						 var statusID = listNode.item(i).getElementsByTagName("vatx:StatusID").item(0).textContent;
						 var typeOfApplication = listNode.item(i).getElementsByTagName("vatx:TypeofApplication").item(0).textContent;
						 var paymentServiceCode = listNode.item(i).getElementsByTagName("vatx:PaymentServicecode").item(0).textContent;*/

						var childNodes = listNode.item(i).getChildNodes();

						var vId = "",
						    businessID = -1,
						    state = "",
						    stateAr = "",
						    startDate = "",
						    endDate = "",
						    needInitiatorAction = "",
						    statusID = "",
						    typeOfApplication = "",
						    paymentServiceCode = "000000-0162";

						var index = 0;
						Ti.API.info('appResult = ' + childNodes.length);
						while (index < childNodes.length) {
							Ti.API.info('Index = ' + index + " NODE NAME = " + childNodes.item(index).nodeName);
							if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ID") {
								vId = childNodes.item(index).textContent;
								index += 1;
							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:BusinessID") {
								businessID = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StateEN") {
								state = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StateAR") {
								stateAr = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StartDate") {
								startDate = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:EndDate") {
								endDate = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NeedInitiatorAction") {
								needInitiatorAction = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StatusID") {
								statusID = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:TypeofApplication") {
								typeOfApplication = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PaymentServicecode") {
								paymentServiceCode = childNodes.item(index).textContent;
								index += 1;

							} else {
								index += 1;
							}
						}

						arrTasks.push({
							id : vId,
							businessID : businessID,
							state : state,
							stateAr : stateAr,
							startDate : startDate,
							endDate : endDate,
							needInitiatorAction : needInitiatorAction,
							statusID : statusID,
							typeOfApplication : typeOfApplication,
							paymentServiceCode : paymentServiceCode
						});
					}

					if (arrTasks.length == 1) {
						if (arrTasks[0].id == "") {
							arrTasks = [];
						}
					}
				}
				Ti.API.info('TASK LIST = ' + JSON.stringify(arrTasks));
				callBackFunction(arrTasks, false, "");
			}
		} else {
			callBackFunction([], false, "");
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([], false, "");

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

var currentAttempt = 0;
function getMyApplicationList(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	currentAttempt++;
	Ti.API.info('Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		currentAttempt = 0;
		callBackFunction([], false, "");
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Interface_Service/vatandtaxinterfacebpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXInterface/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><sch:GetAllTaxApplication>';
	message += '<sch:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_VatTaxForms();
	message += '</sch:AuthenticationTokenRecord>';
	message += '<sch:UserName>' + userName + '</sch:UserName>';
	message += '</sch:GetAllTaxApplication></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get My Application List Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get My Application List Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([], false, "");
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAllTaxApplicationResponse");

		var arrApplicationList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([], false, "");
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (!(result.getElementsByTagName("vatx:Status").item(0).textContent == "Success" || result.getElementsByTagName("vatx:Status").item(0).textContent == "true")) {
				// Alloy.Globals.ShowAlert(serviceDescription);

				var statusNode = result.getElementsByTagName("vatx:Status");
				var isExpired = false;
				if (statusNode.length >= 2) {
					isExpired = (statusNode.item(1).textContent == "Expired" || statusNode.item(1).textContent == "InActive") ? true : false;
				}

				Alloy.Globals.hideLoading();
				callBackFunction([], isExpired, serviceDescription);
			} else {

				var authNode = result.getElementsByTagName("vatx:AuthenticationTokenRecord");
				if (authNode.length > 0) {
					Ti.App.Properties.setString("createdDate_VatTax", authNode.item(0).getElementsByTagName("vatx:CreatedDate").item(0).textContent);
					Ti.App.Properties.setString("lastUpdatedDate_VatTax", authNode.item(0).getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent);
					Ti.API.info('LAST UPDATED DATE = ' + authNode.item(0).getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent);
				}

				var listNode = result.getElementsByTagName("vatx:ApplicationFormMetaEntity");
				if (listNode.length > 0) {
					for (var i = 0; i < listNode.length; i++) {
						/*var vId = listNode.item(i).getElementsByTagName("vatx:ID").item(0).textContent;
						 var businessID = listNode.item(i).getElementsByTagName("vatx:BusinessID").item(0).textContent;
						 var state = listNode.item(i).getElementsByTagName("vatx:StateEN").item(0).textContent;
						 var stateAr = listNode.item(i).getElementsByTagName("vatx:StateAR").item(0).textContent;
						 var startDate = listNode.item(i).getElementsByTagName("vatx:StartDate").item(0).textContent;
						 var endDate = listNode.item(i).getElementsByTagName("vatx:EndDate").item(0).textContent;
						 var needInitiatorAction = listNode.item(i).getElementsByTagName("vatx:NeedInitiatorAction").item(0).textContent;
						 var statusID = listNode.item(i).getElementsByTagName("vatx:StatusID").item(0).textContent;
						 var typeOfApplication = listNode.item(i).getElementsByTagName("vatx:TypeofApplication").item(0).textContent;
						 var paymentServiceCode = listNode.item(i).getElementsByTagName("vatx:PaymentServicecode").item(0).textContent;*/

						var childNodes = listNode.item(i).getChildNodes();

						var vId = "",
						    businessID = -1,
						    state = "",
						    stateAr = "",
						    startDate = "",
						    endDate = "",
						    needInitiatorAction = "",
						    statusID = "",
						    typeOfApplication = "",
						    paymentServiceCode = "000000-0162";

						var index = 0;
						Ti.API.info('appResult = ' + childNodes.length);
						while (index < childNodes.length) {
							Ti.API.info('Index = ' + index + " NODE NAME = " + childNodes.item(index).nodeName);
							if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:ID") {
								vId = childNodes.item(index).textContent;
								index += 1;
							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:BusinessID") {
								businessID = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StateEN") {
								state = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StateAR") {
								stateAr = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StartDate") {
								startDate = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:EndDate") {
								endDate = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:NeedInitiatorAction") {
								needInitiatorAction = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:StatusID") {
								statusID = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:TypeofApplication") {
								typeOfApplication = childNodes.item(index).textContent;
								index += 1;

							} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:PaymentServicecode") {
								paymentServiceCode = childNodes.item(index).textContent;
								index += 1;

							} else {
								index += 1;
							}
						}

						arrApplicationList.push({
							id : vId,
							businessID : businessID,
							state : state,
							stateAr : stateAr,
							startDate : startDate,
							endDate : endDate,
							needInitiatorAction : needInitiatorAction,
							statusID : statusID,
							typeOfApplication : typeOfApplication,
							paymentServiceCode : paymentServiceCode
						});
					}

					if (arrApplicationList.length == 1) {
						if (arrApplicationList[0].id == "") {
							arrApplicationList = [];
						}
					}

				}

				callBackFunction(arrApplicationList, false, "");
			}
		} else {
			callBackFunction([], false, "");
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		// Alloy.Globals.hideLoading();
		// callBackFunction([]);

		if (this.status != 200) {
			getMyApplicationList(userName, callBackFunction);
			// Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getMyApplicationList = getMyApplicationList;
/*
 *
 *
 * takamul Services Start
 *
 *
 * */
function getTakamul_UserEntity(oldPassword) {
	var vatTax_message = "";
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul").userInfo;

	var param = ["vatx:UserId", "vatx:Username", "vatx:Password", "vatx:EmailId", "vatx:userType", "vatx:UserAddress", "vatx:MobileNo", "vatx:PhoneNo", "vatx:FaxNo", "vatx:POBox"];

	var values = [vatTax_userObj.id, vatTax_userObj.userName, oldPassword/*vatTax_userObj.password*/, vatTax_userObj.email, vatTax_userObj.userTypeId, vatTax_userObj.address, vatTax_userObj.mobileNumber, vatTax_userObj.phoneNumber, vatTax_userObj.faxNumber, vatTax_userObj.pOBox];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		vatTax_message += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return vatTax_message;
}

function getBodyEnvelop_TokenRecord_Takamul(isVattax) {
	if (isVattax) {
		var param = ["vatx:TokenCode", "vatx:EmailID", "vatx:CreatedDate", "vatx:LastUpdatedDate", "vatx:Status", "vatx:RoleType", "vatx:GroupType"];
	} else {
		var param = ["sch:TokenCode", "sch:EmailID", "sch:CreatedDate", "sch:LastUpdatedDate", "sch:Status", "sch:RoleType", "sch:GroupType"];
	}
	var values = [Ti.App.Properties.getString("authenticationCode_Takamul"), Ti.App.Properties.getString("emailID_Takamul"), Ti.App.Properties.getString("createdDate_Takamul"), Ti.App.Properties.getString("lastUpdatedDate_Takamul"), Ti.App.Properties.getString("status_Takamul"), Ti.App.Properties.getString("roleType_Takamul"), Ti.App.Properties.getString("groupType_Takamul")];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		bodyMessage += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return bodyMessage;
}

exports.takamulUserRegister = function(user, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	var param = ["vatx:UserId", "vatx:Username", "vatx:Password", "vatx:EmailId", "vatx:userType", "vatx:UserTitle", "vatx:UserAddress", "vatx:MobileNo", "vatx:PhoneNo", "vatx:FaxNo", "vatx:POBox"];
	var values = [user.UserId, user.Username, user.Password, user.EmailId, user.userType, user.UserTitle, user.UserAddress, user.MobileNo, user.PhoneNo, user.FaxNo, user.POBox];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:UserRegistrationRequestMessage>';
	message += getBodyEnvelop(param, values);
	message += getSecurityQuestionTag(user.arrSecurityQue);
	message += '</vatx:UserRegistrationRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("takamul User Registration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("takamul User Registration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("UserRegistrationResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			callBackFunction({
				status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				//operation_Id : result.getElementsByTagName("vatx:OperationID").item(0).textContent,

			});
			Alloy.Globals.hideLoading();
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};
exports.takamulUser_Update = function(user, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:UserTypeId", "vatx:UserName", "vatx:EmailId", "vatx:UserTitle", "vatx:UserAddress", "vatx:MobileNo", "vatx:TelephoneNo", "vatx:FaxNo", "vatx:POBoxNo"];
	var values = [user.userType, user.Username, user.EmailId, user.UserTitle, user.UserAddress, user.MobileNo, user.PhoneNo, user.FaxNo, user.POBox];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><vatx:EditUserProfileRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul(true);
	message += '</vatx:AuthenticationTokenRecord>';
	message += '<vatx:UpdateUserEntityRecord>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:UpdateUserEntityRecord>';
	message += getSecurityQuestionTag(user.arrSecurityQue);
	message += '</vatx:EditUserProfileRequestMessage></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax User Update profile Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax User Update Profile Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("EditUserProfileResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			callBackFunction({
				tokenDetails : {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				}
			});
			Alloy.Globals.hideLoading();
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.takamulUserLogin = function(userName, passWord, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:UserName", "vatx:Password"];
	var values = [userName, passWord];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_Authenticator_Service/vatandtaxauthenticatorbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_Authenticator_Service/vatandtaxauthenticatorbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXAuthenticator/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:ValidateUserRequestMessage>';
	message += getBodyEnvelop(param, values);
	message += '</vatx:ValidateUserRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax User Login Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Tax User Login Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ValidateUserResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Description_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Description_AR").item(0).textContent;

			if (result.getElementsByTagName("vatx:Status").item(0).textContent != "Success") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.takamulTitle, serviceDescription);
				Alloy.Globals.hideLoading();
				callBackFunction(null);
			} else {
				var userInfo = result.getElementsByTagName("vatx:UserInfoRecord").item(0);

				var questionListNode = result.getElementsByTagName("vatx:QuestionRec");
				var arrQuestion = [];
				for (var i = 0; i < questionListNode.length; i++) {

					var childNodes = questionListNode.item(i).getChildNodes();
					var questionId,
					    questionAR,
					    questionEN;

					var index = 0;
					Ti.API.info('appResult = ' + childNodes.length);
					while (index < childNodes.length) {

						if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:id") {
							questionId = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Ques_AR") {
							questionAR = childNodes.item(index).textContent;
							index += 1;
						} else if (childNodes.item(index) && childNodes.item(index).nodeName == "vatx:Ques_EN") {
							questionEN = childNodes.item(index).textContent;
							index += 1;
						} else {
							index += 1;
						}
					}

					arrQuestion.push({
						questionId : questionId,
						question_Ar : questionAR,
						question_En : questionEN
					});
				}
				var login = {
					arrQuestion : arrQuestion
				};
				Alloy.Globals.hideLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.takamulUser_GetUserProfile = function(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:GetUserInfoRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul(true);
	message += '</vatx:AuthenticationTokenRecord>';
	message += '<vatx:Username>' + userName + '</vatx:Username>';
	message += '</vatx:GetUserInfoRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax Get  User Profile Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Takamul Get  User Profile Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetUserInfoResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			//result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
			};
			var userInfoObject = {};
			if (tokenOject.status == "Success") {
				var userInfo = result.getElementsByTagName("vatx:UserInfoRecord").item(0);
				userInfoObject = {
					id : userInfo.getElementsByTagName("vatx:Id").item(0).textContent,
					address : userInfo.getElementsByTagName("vatx:Address").item(0).textContent,
					email : userInfo.getElementsByTagName("vatx:Email").item(0).textContent,
					faxNumber : userInfo.getElementsByTagName("vatx:FaxNumber").item(0).textContent,
					fullName : userInfo.getElementsByTagName("vatx:FullName").item(0).textContent,
					mobileNumber : userInfo.getElementsByTagName("vatx:MobileNumber").item(0).textContent,
					pOBox : userInfo.getElementsByTagName("vatx:POBox").item(0).textContent,
					phoneNumber : userInfo.getElementsByTagName("vatx:PhoneNumber").item(0).textContent,
					userID : userInfo.getElementsByTagName("vatx:UserID").item(0).textContent,
					userName : userInfo.getElementsByTagName("vatx:UserName").item(0).textContent,
					userTypeId : userInfo.getElementsByTagName("vatx:UserTypeId").item(0).textContent,

				};
				Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));
			}
			var login = {
				tokenDetails : tokenOject,
				userInfo : userInfoObject
			};
			Ti.API.info('Vat Tax Get  User Profile returning object  ==>> ' + JSON.stringify(login));

			Alloy.Globals.hideLoading();
			callBackFunction(login);

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.takamulUser_ChangePassword = function(oldPassword, newPassword, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");
	Ti.API.info('>>>>>>' + vatTax_userObj);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var param = ["vatx:NewPassword"];
	var values = [newPassword];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://VATAndTAXUserManagement/soa/xsd/schema">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<vatx:ChangePasswordRequestMessage>';
	message += '<vatx:AuthenticationTokenRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul(true);
	message += '</vatx:AuthenticationTokenRecord>';
	message += '<vatx:UserEntityRec>';
	message += getTakamul_UserEntity(oldPassword);
	message += '</vatx:UserEntityRec>';
	message += '<vatx:NewPassword>' + newPassword + '</vatx:NewPassword>';
	message += '</vatx:ChangePasswordRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Vat Tax Get  User Change Password Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Takamul User Change Password Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ChangePasswordResponseMessage");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			//result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
			};
			var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");
			if (tokenOject.status == "Success") {
				userInfoObject.password = newPassword;
			}
			Ti.API.info('user obj==>> ' + JSON.stringify(userInfoObject));

			var login = {
				tokenDetails : tokenOject,
				userInfo : userInfoObject
			};
			Ti.API.info('Takamul  User Profile returning object  ==>> ' + JSON.stringify(login));

			Alloy.Globals.hideLoading();
			callBackFunction(login);

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.takamulForgotPassword = function(userName, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/VATAndTAX_UserManagement_Service/usermanagementbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:sch="http://VATAndTAXUserManagement/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body>';
	message += '<sch:ForgotPasswordRequestMessage>';
	//<sch:AuthenticationTokenRecord>
	//message += getBodyEnvelop_TokenRecord_Takamul();
	//message += '</sch:AuthenticationTokenRecord>';
	message += '<sch:UserEntityRec><sch:Username>' + userName + '</sch:Username></sch:UserEntityRec>';
	message += '</sch:ForgotPasswordRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Takamul Forgot Password Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Vat Forgot Password Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ForgotPasswordResponseMessage");

		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			/*var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
			 var tokenOject = {
			 tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
			 status : result.getElementsByTagName("vatx:Status").item(0).textContent,
			 description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
			 description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
			 emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
			 createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
			 lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
			 tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
			 roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
			 groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
			 };
			 var userInfoObject = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");*/
			var login = {
				status : result.getElementsByTagName("vatx:Status").item(0).textContent,
				description_EN : result.getElementsByTagName("vatx:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("vatx:Description_AR").item(0).textContent,
				operationId : result.getElementsByTagName("vatx:OperationId").item(0).textContent,
			};
			Ti.API.info('takamul Get  User Profile returning object  ==>> ' + JSON.stringify(login));

			Alloy.Globals.hideLoading();
			callBackFunction(login);

		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getTakamulRequestType = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	//var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GCCTakamulGetAllParameter/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetRequestTypesReqMessage>';
	message += '<sch:ServiceId>' + "1" + '</sch:ServiceId>';
	message += '</sch:GetRequestTypesReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Request Type Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Request Type Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetRequestTypesRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:Description_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:Description_AR").item(0).textContent;
			var requestList = result.getElementsByTagName("mof:RequestTypeRecord");
			var arrRequestList = [];
			for (var i = 0,
			    length = requestList.length; i < length; i++) {
				arrRequestList.push({
					id : requestList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					title : requestList.item(i).getElementsByTagName("mof:RequestType_EN").item(0).textContent,
					titleAr : requestList.item(i).getElementsByTagName("mof:RequestType_AR").item(0).textContent
				});
			}

			callBackFunction({
				status : status,
				description_En : description_En,
				description_Ar : description_Ar,
				arrRequestList : arrRequestList
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getTakamulCategory = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	//var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GCCTakamulGetAllParameter/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetRequestSubjectsReqMessage>';
	message += '<sch:ServiceId>' + "1" + '</sch:ServiceId>';
	//message += '<sch:RequestTypeID>' + requestId + '</sch:RequestTypeID>';
	message += '</sch:GetRequestSubjectsReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Request Type Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Request Type Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetRequestSubjectsRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:Description_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:Description_AR").item(0).textContent;
			var subjectList = result.getElementsByTagName("mof:RequestSubjectRecord");
			var arrSubjectList = [];
			for (var i = 0,
			    length = subjectList.length; i < length; i++) {
				arrSubjectList.push({
					id : subjectList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					serviceId : subjectList.item(i).getElementsByTagName("mof:ServiceID").item(0).textContent,
					title : subjectList.item(i).getElementsByTagName("mof:SubjectDesc_EN").item(0).textContent,
					titleAr : subjectList.item(i).getElementsByTagName("mof:SubjectDesc_AR").item(0).textContent
				});
			}

			callBackFunction({
				status : status,
				description_En : description_En,
				description_Ar : description_Ar,
				arrSubjectList : arrSubjectList
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getTakamulCountry = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	//var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GCCTakamulGetAllParameter/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetCountriesReqMessage>';
	message += '<sch:input>' + "abc" + '</sch:input>';
	//message += '<sch:RequestTypeID>' + requestId + '</sch:RequestTypeID>';
	message += '</sch:GetCountriesReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("country Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("country Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetCountriesResponseMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:Description_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:Description_AR").item(0).textContent;
			var subjectList = result.getElementsByTagName("mof:CountryRecord");
			var arrSubjectList = [];
			for (var i = 0,
			    length = subjectList.length; i < length; i++) {
				arrSubjectList.push({
					id : subjectList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					title : subjectList.item(i).getElementsByTagName("mof:Country_EN").item(0).textContent,
					titleAr : subjectList.item(i).getElementsByTagName("mof:Country_Ar").item(0).textContent
				});
			}

			callBackFunction({
				status : status,
				description_En : description_En,
				description_Ar : description_Ar,
				arrSubjectList : arrSubjectList
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getTakamulAttachmentType = function(subjectID, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	//var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GCCTakamulGetAllParameter/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetAttachmentTypesReqMessage>';
	message += '<sch:ServiceID>' + "1" + '</sch:ServiceID>';
	message += '<sch:RequestSubjectID>' + subjectID + '</sch:RequestSubjectID>';
	message += '</sch:GetAttachmentTypesReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("attachment type Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("attachment type Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAttachmentTypesRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:Description_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:Description_AR").item(0).textContent;
			var subjectList = result.getElementsByTagName("mof:AttachmentTypeRecord");
			var arrSubjectList = [];
			for (var i = 0,
			    length = subjectList.length; i < length; i++) {
				arrSubjectList.push({
					id : subjectList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					title : subjectList.item(i).getElementsByTagName("mof:Name_EN").item(0).textContent,
					titleAr : subjectList.item(i).getElementsByTagName("mof:Name_AR").item(0).textContent,
					serviceID : subjectList.item(i).getElementsByTagName("mof:ServiceID").item(0).textContent,
					subjectID : subjectList.item(i).getElementsByTagName("mof:RequestSubjectID").item(0).textContent,
				});
			}

			callBackFunction({
				status : status,
				description_En : description_En,
				description_Ar : description_Ar,
				arrSubjectList : arrSubjectList
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

function getAttachmentBodyTakamul(arrImages, attachmentType) {
	var bodyMessage = "";
	for (var i = 0; i < arrImages.length; i++) {
		bodyMessage += "<sch:AttachmentRecord>";
		bodyMessage += "<sch:Filename>" + arrImages[i].fileName + "</sch:Filename>";
		bodyMessage += "<sch:AttachmentTyeId>" + attachmentType + "</sch:AttachmentTyeId>";
		bodyMessage += "<sch:Base64Filecontent>" + arrImages[i].byteData + "</sch:Base64Filecontent>";
		bodyMessage += "</sch:AttachmentRecord>";
	}
	return bodyMessage;
}

exports.createTakamulRequest = function(requestId, subjectId, subject, countryID, descirption, arrImages, attachmentType, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");

	Ti.API.info('vatTax_userObj create methos===' + JSON.stringify(vatTax_userObj));

	var name = ["sch:ServcieId", "sch:RequestTypeId", "sch:RequestSubjectId", "sch:Subject", "sch:WFStateID", "sch:InitiatorUserName", "sch:Description", "sch:InitiatorName", "sch:InitiatorEmail", "sch:POBox", "sch:Address", "sch:Telephone", "sch:MobileNumber", "sch:CountryId", "sch:Comment", "sch:PublicIP"];
	var value = ["1", requestId, subjectId, subject, "1", vatTax_userObj.userInfo.userName, descirption, vatTax_userObj.userInfo.userName, vatTax_userObj.userInfo.email, vatTax_userObj.userInfo.pOBox, vatTax_userObj.userInfo.address, vatTax_userObj.userInfo.phoneNumber, vatTax_userObj.userInfo.mobileNumber, countryID, descirption, ""];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://CreateGCCTakamulReq/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:CreateGCCTakamulRequestMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul();
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += getBodyEnvelop(name, value);
	message += "<sch:AttachmentList>" + getAttachmentBodyTakamul(arrImages, attachmentType) + "</sch:AttachmentList>";
	message += '</sch:CreateGCCTakamulRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("CreateGCCTakamulResponseMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("mof:TokenResp").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("mof:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_EN : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("mof:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("mof:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("mof:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("mof:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("mof:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("mof:GroupType").item(0).textContent,
			};
			if (tokenOject.status == "Success") {
				tokenOject.requestId = result.getElementsByTagName("mof:RequestID").item(0).textContent;
				tokenOject.requestBusID = result.getElementsByTagName("mof:RequestBusinessID").item(0).textContent;
			}
			callBackFunction({
				tokenDetails : tokenOject
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getTakamulRequestInfoByID = function(requestId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GetGCCTakamulRequestDetails/getgcctakamulrequestdetailsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GetGCCTakamulRequestDetails/getgcctakamulrequestdetailsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GetGCCtakamulReqDetails/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetGCCTakamulRequestDetailsReqMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul();
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += '<sch:ServiceID>' + "1" + '</sch:ServiceID>';
	message += '<sch:RequestID>' + requestId + '</sch:RequestID>';
	message += '<sch:InitiatoruserName>' + vatTax_userObj.userInfo.userName + '</sch:InitiatoruserName>';
	message += '</sch:GetGCCTakamulRequestDetailsReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetGCCTakamulRequestDetailsRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("mof:TokenResp").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("mof:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_EN : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("mof:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("mof:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("mof:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("mof:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("mof:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("mof:GroupType").item(0).textContent,
			};
			if (tokenOject.status == "Success") {
				var taskList = result.getElementsByTagName("mof:Taskrec");
				var arrTaskList = [];
				for (var i = 0,
				    length = taskList.length; i < length; i++) {
					arrTaskList.push({
						statusId : taskList.item(i).getElementsByTagName("mof:StatusID").item(0).textContent,
						status_En : taskList.item(i).getElementsByTagName("mof:Status_EN").item(0).textContent,
						status_Ar : taskList.item(i).getElementsByTagName("mof:Status_AR").item(0).textContent,
						assignRoleId : taskList.item(i).getElementsByTagName("mof:AssignedToRoleID").item(0).textContent,
						assignRole_En : taskList.item(i).getElementsByTagName("mof:AssignedToRole_EN").item(0).textContent,
						assingRole_Ar : taskList.item(i).getElementsByTagName("mof:AssignedToRole_AR").item(0).textContent,
						initiatorName : taskList.item(i).getElementsByTagName("mof:InitiatorUsername").item(0).textContent,
						ownerName : taskList.item(i).getElementsByTagName("mof:TaskOwnerUsername").item(0).textContent,
						entityID : taskList.item(i).getElementsByTagName("mof:AssignedToEntityID").item(0).textContent,
						entityName_En : taskList.item(i).getElementsByTagName("mof:AssignedToEntity_EN").item(0).textContent,
						entityName_Ar : taskList.item(i).getElementsByTagName("mof:AssignedToEntity_AR").item(0).textContent,
						comment : taskList.item(i).getElementsByTagName("mof:Comment").item(0).textContent,
						startDate : taskList.item(i).getElementsByTagName("mof:StartDate").item(0).textContent,
						endDate : taskList.item(i).getElementsByTagName("mof:EndDate").item(0).textContent,
						isMobile : taskList.item(i).getElementsByTagName("mof:isMobile").item(0).textContent,
					});
				}

				var attachmentList = result.getElementsByTagName("mof:AttachmentRec");
				var arrAttachmenList = [];
				for (var i = 0,
				    length = attachmentList.length; i < length; i++) {
					arrAttachmenList.push({
						path : attachmentList.item(i).getElementsByTagName("mof:Pathurl").item(0).textContent,
						typeId : attachmentList.item(i).getElementsByTagName("mof:AttachmentTypeID").item(0).textContent,
						type_En : attachmentList.item(i).getElementsByTagName("mof:AttachmentType_EN").item(0).textContent,
						type_Ar : attachmentList.item(i).getElementsByTagName("mof:AttachmentType_AR").item(0).textContent,
						submitDate : attachmentList.item(i).getElementsByTagName("mof:AttachmentSubmitDate").item(0).textContent,
					});
				}
				callBackFunction({
					initiatorName : result.getElementsByTagName("mof:InitiatorUsername").item(0).textContent,
					requestBusID : result.getElementsByTagName("mof:RequestBusinessID").item(0).textContent,
					requestTypeId : result.getElementsByTagName("mof:RequestTypeID").item(0).textContent,
					requestType_En : result.getElementsByTagName("mof:RequestType_EN").item(0).textContent,
					requestType_Ar : result.getElementsByTagName("mof:RequestType_AR").item(0).textContent,
					CategoryId : result.getElementsByTagName("mof:RequestSubjectID").item(0).textContent,
					Category_En : result.getElementsByTagName("mof:RequestSubject_EN").item(0).textContent,
					Category_Ar : result.getElementsByTagName("mof:RequestSubject_AR").item(0).textContent,
					subject : result.getElementsByTagName("mof:SubjectText").item(0).textContent,
					wfStateId : result.getElementsByTagName("mof:WFStateID").item(0).textContent,
					wfState_En : result.getElementsByTagName("mof:WFState_EN").item(0).textContent,
					wfState_Ar : result.getElementsByTagName("mof:WFState_AR").item(0).textContent,
					description : result.getElementsByTagName("mof:Description").item(0).textContent,
					countryId : result.getElementsByTagName("mof:CountryID").item(0).textContent,
					country_En : result.getElementsByTagName("mof:Countryname_EN").item(0).textContent,
					country_Ar : result.getElementsByTagName("mof:Countryname_AR").item(0).textContent,
					requestKey : result.getElementsByTagName("mof:RequestKey").item(0).textContent,
					submitDate : result.getElementsByTagName("mof:ReqSubmitDate").item(0).textContent,
					closeDate : result.getElementsByTagName("mof:CloseDate").item(0).textContent,
					arrTaskList : arrTaskList,
					arrAttachmenList : arrAttachmenList,
					tokenDetails : tokenOject
				});
			} else {
				callBackFunction({
					tokenDetails : tokenOject
				});
			}
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getAllTakamulRequest = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");
	Ti.API.info('>>>>>>' + JSON.stringify(vatTax_userObj));
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GetAllGCCTakamulRequestsForUser/getallgcctakamulrequestsforuserbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GetAllGCCTakamulRequestsForUser/getallgcctakamulrequestsforuserbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GetAllGCCtakamulRequestsForUser/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetAllGCCtakamulRequestsForUserReqMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul();
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += '<sch:Username>' + vatTax_userObj.userInfo.userName + '</sch:Username>';
	message += '<sch:ServiceID>' + "1" + '</sch:ServiceID>';
	message += '</sch:GetAllGCCtakamulRequestsForUserReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAllGCCtakamulRequestsForUserRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("mof:TokenResp").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("mof:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_EN : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("mof:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("mof:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("mof:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("mof:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("mof:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("mof:GroupType").item(0).textContent,
			};
			var requestList = result.getElementsByTagName("mof:RequestRec");
			var arrRequestList = [];
			for (var i = 0,
			    length = requestList.length; i < length; i++) {
				arrRequestList.push({
					requestId : requestList.item(i).getElementsByTagName("mof:RequestID").item(0).textContent,
					businessId : requestList.item(i).getElementsByTagName("mof:RequestBusinessID").item(0).textContent,
					requestKey : requestList.item(i).getElementsByTagName("mof:RequestKey").item(0).textContent,
					wfStateId : requestList.item(i).getElementsByTagName("mof:WFStateID").item(0).textContent,
					wfStateDes_En : requestList.item(i).getElementsByTagName("mof:WFStateDesc_EN").item(0).textContent,
					wfStateDes_Ar : requestList.item(i).getElementsByTagName("mof:WFStateDesc_AR").item(0).textContent,
					submitDate : requestList.item(i).getElementsByTagName("mof:Submitdate").item(0).textContent,
					subject : requestList.item(i).getElementsByTagName("mof:Subject").item(0).textContent,
					needUserAction : requestList.item(i).getElementsByTagName("mof:NeedUserAction").item(0).textContent,
				});
			}
			callBackFunction({
				tokenDetails : tokenOject,
				arrRequestList : arrRequestList

			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.updateTakamulRequest = function(requestNo, descirption, businessId, arrImages, attachmentType, requestType, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var vatTax_userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");

	var name = ["sch:RequestNo", "sch:InitiatorUserName", "sch:InitiatorName", "sch:InitiatorEmailID", "sch:Comment", "sch:ServiceID", "sch:RequestBusinessId", "sch:GCCRequestTypeID"];
	var value = [requestNo, vatTax_userObj.userInfo.userName, vatTax_userObj.userInfo.userName, vatTax_userObj.userInfo.email, descirption, "1", businessId, requestType];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_UpdateGCCTakamulRequest/updategcctakamulreqbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_UpdateGCCTakamulRequest/updategcctakamulreqbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://UpdateGCCTakamulReq/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:UpdateGCCTakamulRequestMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop_TokenRecord_Takamul();
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += getBodyEnvelop(name, value);
	message += "<sch:AttachmentList>" + getAttachmentBodyTakamul(arrImages, attachmentType) + "</sch:AttachmentList>";
	message += '</sch:UpdateGCCTakamulRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("UpdateGCCTakamulResponseMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var tokenAuth = result.getElementsByTagName("mof:TokenResp").item(0);
			var tokenOject = {
				tokenCode : tokenAuth.getElementsByTagName("mof:TokenCode").item(0).textContent,
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_EN : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_AR : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				emailId : tokenAuth.getElementsByTagName("mof:EmailID").item(0).textContent,
				createdDate : tokenAuth.getElementsByTagName("mof:CreatedDate").item(0).textContent,
				lastUpdatedDate : tokenAuth.getElementsByTagName("mof:LastUpdatedDate").item(0).textContent,
				tokenStatus : tokenAuth.getElementsByTagName("mof:Status").item(0).textContent,
				roleType : tokenAuth.getElementsByTagName("mof:RoleType").item(0).textContent,
				groupType : tokenAuth.getElementsByTagName("mof:GroupType").item(0).textContent,
			};
			callBackFunction({
				tokenDetails : tokenOject
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getUserFeedbackRequestType = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';
	//var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2C_App/G2C_GCCTakamulGetAllParameter/gcctakamulgetallparameterbpel_client_ep';

	Alloy.Globals.showModelLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://GCCTakamulGetAllParameter/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:GetRequestTypesReqMessage>';
	message += '<sch:ServiceId>' + "3" + '</sch:ServiceId>';
	message += '</sch:GetRequestTypesReqMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Request Type Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Request Type Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
		}

		var rootNode = result.getElementsByTagName("GetRequestTypesRespMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideModelLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var status = result.getElementsByTagName("mof:Status").item(0).textContent;
			var description_En = result.getElementsByTagName("mof:Description_EN").item(0).textContent;
			var description_Ar = result.getElementsByTagName("mof:Description_AR").item(0).textContent;
			var requestList = result.getElementsByTagName("mof:RequestTypeRecord");
			var arrRequestList = [];
			for (var i = 0,
			    length = requestList.length; i < length; i++) {
				arrRequestList.push({
					id : requestList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					title : requestList.item(i).getElementsByTagName("mof:RequestType_EN").item(0).textContent,
					titleAr : requestList.item(i).getElementsByTagName("mof:RequestType_AR").item(0).textContent
				});
			}

			callBackFunction({
				status : status,
				description_En : description_En,
				description_Ar : description_Ar,
				arrRequestList : arrRequestList
			});
			Alloy.Globals.hideModelLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideModelLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideModelLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.createUserFeedbackRequest = function(requestId, subject, description, initiatorName, email, telephone, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var name = ["sch:ServcieId", "sch:RequestTypeId", "sch:Subject", "sch:WFStateID", "sch:Description", "sch:InitiatorName", "sch:InitiatorEmail", "sch:POBox", "sch:Address", "sch:Telephone", "sch:MobileNumber", "sch:Comment", "sch:PublicIP"];
	var value = ["3", requestId, subject, "21", description, initiatorName, email, "", "", telephone, "", description, ""];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://CreateGCCTakamulReq/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:CreateGCCTakamulRequestMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += '<sch:TokenCode>-1</sch:TokenCode>';
	message += '<sch:EmailID>DummyG2CToken</sch:EmailID>';
	message += '<sch:CreatedDate>2015-02-19T16:15:00</sch:CreatedDate>';
	message += '<sch:LastUpdatedDate>2015-02-19T16:15:00</sch:LastUpdatedDate>';
	message += '<sch:Status>Active</sch:Status>';
	message += '<sch:RoleType>G2CUser</sch:RoleType>';
	message += '<sch:GroupType>C</sch:GroupType>';
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += getBodyEnvelop(name, value);
	message += "<sch:AttachmentList/>";
	message += '</sch:CreateGCCTakamulRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("CreateGCCTakamulResponseMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			callBackFunction({
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_En : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_Ar : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				requestId : result.getElementsByTagName("mof:RequestID").item(0).textContent,
				requestBusID : result.getElementsByTagName("mof:RequestBusinessID").item(0).textContent
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.createCustomerInquiryRequest = function(subject, description, initiatorName, email, telephone, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	var name = ["sch:ServcieId", "sch:RequestTypeId", "sch:Subject", "sch:WFStateID", "sch:Description", "sch:InitiatorName", "sch:InitiatorEmail", "sch:POBox", "sch:Address", "sch:Telephone", "sch:MobileNumber", "sch:Comment", "sch:PublicIP"];
	var value = ["2", "4", subject, "11", description, initiatorName, email, "", "", telephone, "", description, ""];
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_CreateGCCTakamulRequest/creategcctakamulreqservice_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://CreateGCCTakamulReq/soa/xsd/schema">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:CreateGCCTakamulRequestMessage>';
	message += '<sch:TokenReq><sch:AuthenticationTokenInpRecord>';
	message += '<sch:TokenCode>-1</sch:TokenCode>';
	message += '<sch:EmailID>DummyG2CToken</sch:EmailID>';
	message += '<sch:CreatedDate>2015-02-19T16:15:00</sch:CreatedDate>';
	message += '<sch:LastUpdatedDate>2015-02-19T16:15:00</sch:LastUpdatedDate>';
	message += '<sch:Status>Active</sch:Status>';
	message += '<sch:RoleType>G2CUser</sch:RoleType>';
	message += '<sch:GroupType>C</sch:GroupType>';
	message += '</sch:AuthenticationTokenInpRecord></sch:TokenReq>';
	message += getBodyEnvelop(name, value);
	message += "<sch:AttachmentList/>";
	message += '</sch:CreateGCCTakamulRequestMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("create Takamul Request  Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("create takamul Request Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("CreateGCCTakamulResponseMessage");
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			callBackFunction({
				status : result.getElementsByTagName("mof:Status").item(1).textContent,
				description_En : result.getElementsByTagName("mof:Description_EN").item(0).textContent,
				description_Ar : result.getElementsByTagName("mof:Description_AR").item(0).textContent,
				requestId : result.getElementsByTagName("mof:RequestID").item(0).textContent,
				requestBusID : result.getElementsByTagName("mof:RequestBusinessID").item(0).textContent
			});
			Alloy.Globals.hideLoading();

		} else {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			// Alloy.Globals.ShowAlert("No Records found.");
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 *
 * mParticipation
 *
 *
 */
exports.getmParticipationList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mPart_getAllObj/mof_g2c_mpart_getallobj_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mPart_getAllObj/mof_g2c_mpart_getallobj_client_ep';

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/MoF_G2C/MoF_G2C_mPart_getAllObj/MoF_G2C_mPart_getAllObj" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><mof:getAllObjReq>';
	message += '<mof:input>' + "getAll" + '</mof:input>';
	// static
	message += '</mof:getAllObjReq></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getmParticipationList = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getmParticipationList = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("getAllObjRespColl");

		var arrData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var listNode = result.getElementsByTagName("client:getAllObjResp");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var id = listNode.item(i).getElementsByTagName("client:SUB_ID").item(0).textContent;
					var enTitle = listNode.item(i).getElementsByTagName("client:SUB_TITLE_ENG").item(0).textContent;
					var arTitle = listNode.item(i).getElementsByTagName("client:SUB_TITLE_ARB").item(0).textContent;
					var enIncentive = listNode.item(i).getElementsByTagName("client:INCENTIVE_EN").item(0).textContent;
					var arIncentive = listNode.item(i).getElementsByTagName("client:INCENTIVE_AR").item(0).textContent;
					var startDate = listNode.item(i).getElementsByTagName("client:SUB_ST_DATE").item(0).textContent;
					var endDate = listNode.item(i).getElementsByTagName("client:SUB_ED_DATE").item(0).textContent;
					var commentsCount = listNode.item(i).getElementsByTagName("client:No_Of_Comments").item(0).textContent;
					var duration = listNode.item(i).getElementsByTagName("client:Duration").item(0).textContent;

					arrData.push({
						id : id,
						enTitle : enTitle,
						arTitle : arTitle,
						enIncentive : enIncentive,
						arIncentive : arIncentive,
						startDate : startDate,
						endDate : endDate,
						commentsCount : commentsCount,
						duration : duration
					});
				}

			}

			callBackFunction(arrData);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getmParticipationDetails = function(id, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mPart_SubjDetails/mof_g2c_mpart_subjdetails_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mPart_SubjDetails/mof_g2c_mpart_subjdetails_client_ep';

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/MoF_G2C/MoF_G2C_mPart_SubjDetails/MoF_G2C_mPart_SubjDetails" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><mof:getSubDetailsReq>';
	message += '<mof:SUB_ID>' + id + '</mof:SUB_ID>';
	message += '</mof:getSubDetailsReq></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getmParticipationDetails = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getmParticipationDetails = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			alert(JSON.stringify(e));
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("getSubDetailsResp");

		var arrData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var data = result.getElementsByTagName("client:SUB_DETAILS");
			var id = data.item(0).getElementsByTagName("client:SUB_ID").item(0).textContent;
			var enTitle = data.item(0).getElementsByTagName("client:SUB_TITLE_ENG").item(0).textContent;
			var arTitle = data.item(0).getElementsByTagName("client:SUB_TITLE_ARB").item(0).textContent;
			var enDesc = data.item(0).getElementsByTagName("client:SUB_DES_ENG").item(0).textContent;
			var arDesc = data.item(0).getElementsByTagName("client:SUB_DES_ARB").item(0).textContent;
			var startDate = data.item(0).getElementsByTagName("client:SUB_ST_DATE").item(0).textContent;
			var endDate = data.item(0).getElementsByTagName("client:SUB_ED_DATE").item(0).textContent;
			var enIncentive = data.item(0).getElementsByTagName("client:INCENTIVE_EN").item(0).textContent;
			var arIncentive = data.item(0).getElementsByTagName("client:INCENTIVE_AR").item(0).textContent;
			var subDuration = data.item(0).getElementsByTagName("client:Sub_Duration").item(0).textContent;

			var commentNode = result.getElementsByTagName("client:ALL_COMMENTS");
			var listNode = commentNode.item(0).getElementsByTagName("client:USER_COMMENTS");

			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {

					var userId = listNode.item(i).getElementsByTagName("client:USERID").item(0).textContent;
					var comments = listNode.item(i).getElementsByTagName("client:COMMENTS").item(0).textContent;
					var lang = listNode.item(i).getElementsByTagName("client:LANGUAGE").item(0).textContent;
					var date = listNode.item(i).getElementsByTagName("client:SUBMITTED_DATE").item(0).textContent;
					//    var userDetails = listNode.item(i).getElementsByTagName("client:SUBMITTED_DATE");
					var userName = listNode.item(i).getElementsByTagName("client:USER_Name").item(0).textContent;
					var duration = listNode.item(i).getElementsByTagName("client:Duration").item(0).textContent;

					arrData.push({
						userId : userId,
						comments : comments,
						arTitle : arTitle,
						lang : lang,
						date : date,
						userName : userName,
						duration : duration,
					});
				}

			}

			var details = {
				id : id,
				enTitle : enTitle,
				arTitle : arTitle,
				enDesc : enDesc,
				arDesc : arDesc,
				startDate : startDate,
				endDate : endDate,
				enIncentive : enIncentive,
				arIncentive : arIncentive,
				subDuration : subDuration,
				arrData : arrData,
			};

			callBackFunction(details);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.addmParticipationComment = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var param = ["mof:USER_ID", "mof:USER_EMAIL", "mof:PHONE", "mof:LANGUAGE", "mof:AGE_GRP", "mof:FIRST_NAME", "mof:LAST_NAME", "mof:NATIONALITY", "mof:SEX", "mof:AGE_GRP_ID", "mof:NATIONALITY_ID"];
	var values = ["", "", "", obj.language, obj.ageGroup, obj.firstName, obj.lastName, obj.nationality, "", "", ""];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mParticipation_UserComments/mof_g2c_mparticipation_usercomments_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/MoF_G2C_mParticipation_UserComments/mof_g2c_mparticipation_usercomments_client_ep';

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/MoF_G2C/MoF_G2C_mParticipation_UserComments/MoF_G2C_mParticipation_UserComments" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><mof:userCommentsRequest>';
	message += '<mof:userDetails>';
	message += getBodyEnvelop(param, values);
	message += '</mof:userDetails>';
	message += '<mof:userComments>';
	message += '<mof:Comm_ID>' + "" + '</mof:Comm_ID>';
	message += '<mof:SUB_ID>' + obj.subId + '</mof:SUB_ID>';
	message += '<mof:LANGUAGE>' + obj.language + '</mof:LANGUAGE>';
	message += '<mof:COMMENTS>' + obj.comment + '</mof:COMMENTS>';
	message += '</mof:userComments>';
	message += '</mof:userCommentsRequest></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addmParticipationComment = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addmParticipationComment = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("userCommentsResponse");

		var arrData = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var status = rootNode.item(0).getElementsByTagName("STATUS").item(0).textContent;
			var msg = "";
			if (Alloy.Globals.isEnglish) {
				msg = rootNode.item(0).getElementsByTagName("ENGLISH_MSG").item(0).textContent;
			} else {
				msg = rootNode.item(0).getElementsByTagName("ARABIC_MSG").item(0).textContent;
			}

			var data = {
				status : status,
				msg : msg,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 *
 * User Satisfaction
 *
 */

exports.getUserSatisfactionQuestions = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//    var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//    var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//    var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.G2C/MoF/UserSatisfaction.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<user:SatisfactionQuestionInput>';
	message += '<user:Question_Input>' + "" + '</user:Question_Input>';
	message += '</user:SatisfactionQuestionInput>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getUserSatisfactionQuestions Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getUserSatisfactionQuestions Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("SatisfactionQuestionOutput");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).textContent;
			var questions = result.getElementsByTagName("mof:QuestionType");

			var arrQuestions = [];
			for (var i = 0; i < questions.length; i++) {
				var catNode = questions.item(i);

				var arQuestion = catNode.getElementsByTagName("mof:Question_Ar").item(0).textContent;
				var enQuestion = catNode.getElementsByTagName("mof:Question_En").item(0).textContent;
				var id = catNode.getElementsByTagName("mof:ID").item(0).textContent;

				arrQuestions.push({
					arQuestion : arQuestion,
					enQuestion : enQuestion,
					id : id,
				});

			}

			callBackFunction(arrQuestions);
		} else {
			callBackFunction([]);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getUserSatisfactionAnswersType = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//    var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//    var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//    var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.G2C/MoF/UserSatisfaction.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<user:Satisfaction_Input>';
	message += '<user:Satisfaction_Input>' + "" + '</user:Satisfaction_Input>';
	message += '</user:Satisfaction_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getUserSatisfactionAnswersType Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getUserSatisfactionAnswersType Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Satisfaction_Output");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).textContent;
			var answers = result.getElementsByTagName("mof:OutputType");

			var arrAnswers = [];
			for (var i = 0; i < answers.length; i++) {
				var catNode = answers.item(i);

				var enAnswer = catNode.getElementsByTagName("mof:SatisfactionType_EN").item(0).textContent;
				var arAnswer = catNode.getElementsByTagName("mof:SatisfactionType_AR").item(0).textContent;
				var id = catNode.getElementsByTagName("mof:ID").item(0).textContent;

				arrAnswers.push({
					arAnswer : arAnswer,
					enAnswer : enAnswer,
					id : id,
				});

			}

			callBackFunction(arrAnswers);
		} else {
			callBackFunction([]);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.submitUserSatisfaction = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//    var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//    var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//    var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_union_subcatids/federal_budget_union_subcatidbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/G2C_UserSatisfaction/g2c_usersatisfaction_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:user="http://www.G2C/MoF/UserSatisfaction.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<user:Submit_Input>';
	message += '<user:SubmitList>';
	message += '<user:InitiatorEmail>' + "" + '</user:InitiatorEmail>';
	message += '<user:ID>' + "" + '</user:ID>';
	message += '<user:SatisfactionSubjectID>' + obj.questionData + '</user:SatisfactionSubjectID>';
	message += '<user:SatisfactionInputID>' + obj.answerData + '</user:SatisfactionInputID>';
	message += '<user:Comment>' + "" + '</user:Comment>';
	message += '<user:ServiceID>' + obj.serviceID + '</user:ServiceID>';
	message += '<user:ExtApplicationID>' + "" + '</user:ExtApplicationID>';
	message += '<user:InitiatorUserName>' + "" + '</user:InitiatorUserName>';
	message += '<user:InitiatorName>' + obj.userName + '</user:InitiatorName>';
	message += '<user:POBox>' + "" + '</user:POBox>';
	message += '<user:MobileNumber>' + "" + '</user:MobileNumber>';
	message += '<user:Telephone>' + "" + '</user:Telephone>';
	message += '<user:Address>' + "" + '</user:Address>';
	message += '<user:SubmitDate>' + "" + '</user:SubmitDate>';
	message += '<user:isMobile>' + "" + '</user:isMobile>';
	message += '<user:ExtParameterString>' + "" + '</user:ExtParameterString>';
	message += '<user:ExtApplicationSubCategoryID>' + "" + '</user:ExtApplicationSubCategoryID>';
	message += '<user:ExtApplicationCategoryID>' + "" + '</user:ExtApplicationCategoryID>';
	message += '</user:SubmitList>';
	message += '</user:Submit_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("submitUserSatisfaction Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("submitUserSatisfaction Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Submit_Output");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var submit = rootNode.item(0).getElementsByTagName("Submit_Status").item(0).textContent;
			;

			callBackFunction(submit);
		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 * FederalEntities
 *
 *
 */
exports.getFederalLocation = function(Location, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';

	//	var url = 'http://194.170.30.187:7777/soa-infra/services/default/Category_Location_Service/category_location_service_client_ep';

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/Category_Location_Service/category_location_service_client_ep';
	else
		url = serverUrl + 'Category_Location_Service/category_location_service_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:loc="http://www.mof.gov.ae/Category/Location" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<loc:Input_Request>';
	message += '<loc:Input>' + 'abc' + '</loc:Input>';
	// anything Input Parameter
	message += '<loc:Option>' + Location + '</loc:Option>';
	message += '</loc:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalLocation Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalLocation Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_Response");

		var arrList = [];
		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var location = result.getElementsByTagName("mof:LocationResponse");
			if (location.length > 0) {
				for (var i = 0; i < location.length; i++) {
					var id = location.item(i).getElementsByTagName("mof:ID").item(0).textContent;
					var enName = location.item(i).getElementsByTagName("mof:LOCATION_NAME_EN").item(0).textContent;
					var arName = location.item(i).getElementsByTagName("mof:LOCATION_NAME_AR").item(0).textContent;
					var enAddress = location.item(i).getElementsByTagName("mof:LOCATION_ADDRESS_EN").item(0).textContent;
					var arAddress = location.item(i).getElementsByTagName("mof:LOCATION_ADDRESS_AR").item(0).textContent;
					var number = location.item(i).getElementsByTagName("mof:CONTACT_NUMBER").item(0).textContent;
					var url = location.item(i).getElementsByTagName("mof:URL").item(0).textContent;
					var urlAr = location.item(i).getElementsByTagName("mof:URL_AR").item(0).textContent;
					var latitude = location.item(i).getElementsByTagName("mof:LATITUDE").item(0).textContent;
					var longitude = location.item(i).getElementsByTagName("mof:LONGITUDE").item(0).textContent;
					var image = location.item(i).getElementsByTagName("mof:CONTACT_IMAGE").item(0).textContent;

					arrList.push({
						id : id,
						enName : enName,
						arName : arName,
						enAddress : enAddress,
						arAddress : arAddress,
						number : number,
						url : url,
						urlAr : urlAr,
						latitude : latitude,
						longitude : longitude,
						image : image,
					});
				}
			}

			var data = {
				arrData : arrList,
			};
			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getGFSReportsYear = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	//	var url = 'http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/GFS_Years_Data/gfs_data_years_bpel_client_ep';

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/GFS_Years_Data/gfs_data_years_bpel_client_ep';
	else
		url = serverUrl + 'GFS_Years_Data/gfs_data_years_bpel_client_ep';
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gfs="http://www.mof.gov.ae/gfs">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<gfs:Input_Request>';
	message += '<gfs:Any_Value>' + '000' + '</gfs:Any_Value>';
	message += '</gfs:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getGFSReportsYear Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getGFSReportsYear  Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Report_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var year = result.getElementsByTagName("mof:YEAR3").item(0).textContent;
			callBackFunction(year);

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getGuidesPageCount = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	var request = Titanium.Network.createHTTPClient();
	request.timeout = 25000;
	request.onload = function(e) {

		//var responseText = getXMLFormate(this.responseText);
		//Ti.API.info("Profile information Response = " + responseText);
		Ti.API.info('>>>>>>>' + this.responseText);
		var result;
		try {
			result = Ti.XML.parseString(this.responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}
		var countObj = [result.getElementsByTagName("GCC_Report").item(0).textContent];
		callBackFunction(countObj);
		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("GET", "http://demoserver.tacme.net:3030/MOFDIGI/count.xml");
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send();
};

exports.getFederalUnion_Reports = function(id, type, callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction(null);
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//	var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep';
	else
		url = serverUrl + 'Federal_Budget_Union/federal_budget_unionbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fin="http://www.mof.gov.ae/final_account_union">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fin:Input_Request>';
	message += '<fin:Input_value>' + id + '</fin:Input_value>';
	message += '<fin:Type_Of_Report>' + type + '</fin:Type_Of_Report>';
	message += '</fin:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalUnion_Reports Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalUnion_Reports Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}

		var arr = [];
		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			//rootNode.item(0).getElementsByTagName("mof:Description_EN").item(0).textContent;
			var year = result.getElementsByTagName("mof:Year_value").item(0).textContent;

			var expTotal = result.getElementsByTagName("mof:Exp_total_Value").item(0).textContent;
			var arExpDesc = result.getElementsByTagName("mof:Exp_total_Desc_ar").item(0).textContent;
			var enExpDesc = result.getElementsByTagName("mof:Exp_total_Desc_en").item(0).textContent;

			arr.push({
				total : expTotal,
				arDesc : arExpDesc,
				enDesc : enExpDesc,
			});

			var asseTotal = result.getElementsByTagName("mof:Asset_total_Value").item(0).textContent;
			var arAsseDesc = result.getElementsByTagName("mof:Asset_total_Desc_ar").item(0).textContent;
			var enAsseDesc = result.getElementsByTagName("mof:Asset_total_Desc_en").item(0).textContent;

			arr.push({
				total : asseTotal,
				arDesc : arAsseDesc,
				enDesc : enAsseDesc,
			});

			var grandTotal = result.getElementsByTagName("mof:Grand_Total").item(1).textContent;
			var arTotalDesc = result.getElementsByTagName("mof:Grand_Total_Desc_ar").item(0).textContent;
			var enTotalDesc = result.getElementsByTagName("mof:Grand_Total_Desc_en").item(0).textContent;

			arr.push({
				total : grandTotal,
				arDesc : arTotalDesc,
				enDesc : enTotalDesc,
			});

			var data = {
				year : year,
				arrData : arr,
				/*expTotal : expTotal,
				 arExpDesc : arExpDesc,
				 enExpDesc : enExpDesc,
				 asseTotal : asseTotal,
				 arAsseDesc : arAsseDesc,
				 enAsseDesc : enAsseDesc,
				 grandTotal : grandTotal,
				 arTotalDesc : arTotalDesc,
				 enTotalDesc : enTotalDesc,*/
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getFederalUnion_ExpSubCategory = function(id, type, callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//	var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep';
	else
		url = serverUrl + 'Federal_Budget_Union/federal_budget_unionbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fin="http://www.mof.gov.ae/final_account_union">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fin:Input_Request>';
	message += '<fin:Input_value>' + id + '</fin:Input_value>';
	message += '<fin:Type_Of_Report>' + type + '</fin:Type_Of_Report>';
	message += '</fin:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalUnion_ExpSubCategory Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalUnion_ExpSubCategory Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var categories = result.getElementsByTagName("mof:EXPvalue_list_type");
			Ti.API.info("==>categories length :" + categories);

			if (categories.length == 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noItemsFound);
				return;
			}

			var arrCategories = [];
			for (var i = 0; i < categories.length; i++) {
				var catNode = categories.item(i);

				var code,
				    arName,
				    enName,
				    total,

				    code = catNode.getElementsByTagName("mof:catid").item(0).textContent;
				arName = catNode.getElementsByTagName("mof:Desc_ar").item(0).textContent;
				enName = catNode.getElementsByTagName("mof:Desc_en").item(0).textContent;
				total = catNode.getElementsByTagName("mof:EXPvalue_total").item(0).textContent;

				arrCategories.push({
					code : code,
					arName : arName,
					enName : enName,
					total : total,
				});

			}

			callBackFunction(arrCategories);

		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getFederalUnion_AsseSubCategory = function(id, type, callBackFunction) {
	if (hasConnection() == false) {
		callBackFunction([]);
		return;
	}

	//	var soapAction = 'http://tempuri.org/IMediaGalleryVadService/GetMediaGalleryByCategoryUniqueName_JSON';
	//	var methodName = 'tem:GetMediaGalleryByCategoryUniqueName_JSON';
	//	var url = "http://194.170.30.187:7777/soa-infra/services/MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2G_App/Federal_Budget_Union/federal_budget_unionbpel_client_ep';
	else
		url = serverUrl + 'Federal_Budget_Union/federal_budget_unionbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:fin="http://www.mof.gov.ae/final_account_union">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<fin:Input_Request>';
	message += '<fin:Input_value>' + id + '</fin:Input_value>';
	message += '<fin:Type_Of_Report>' + type + '</fin:Type_Of_Report>';
	message += '</fin:Input_Request>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFederalUnion_AsseSubCategory Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFederalUnion_AsseSubCategory Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("Output_response");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var categories = result.getElementsByTagName("mof:Asset_list");
			Ti.API.info("==>categories length :" + categories);

			if (categories.length == 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noItemsFound);
				return;
			}

			var arrCategories = [];
			for (var i = 0; i < categories.length; i++) {
				var catNode = categories.item(i);

				var code,
				    arName,
				    enName,
				    total,

				    code = catNode.getElementsByTagName("mof:catid").item(0).textContent;
				arName = catNode.getElementsByTagName("mof:Desc_ar").item(0).textContent;
				enName = catNode.getElementsByTagName("mof:Desc_en").item(0).textContent;
				total = catNode.getElementsByTagName("mof:AssetValue_Total").item(0).textContent;

				arrCategories.push({
					code : code,
					arName : arName,
					enName : enName,
					total : total,
				});

			}

			callBackFunction(arrCategories);

		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

function shuffleArray(o) {//v1.0
	for (var j,
	    x,
	    i = o.length; i; j = Math.floor(Math.random() * i),
	x = o[--i], o[i] = o[j], o[j] =
	x);

	return o;
};

function getSecurityQuestionList(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	currentAttempt++;
	Ti.API.info('Question Attempt == ' + currentAttempt);
	if (currentAttempt > Alloy.Globals.maxAttempt) {
		Alloy.Globals.hideLoading();
		currentAttempt = 0;
		callBackFunction([]);
		Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		return;
	}
	if (currentAttempt == 1) {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	}

	var param = [];
	var value = [];
	if (obj.serviceID == 1) {
		param = ["get:ServiceId", "get:Username"];
		value = [obj.serviceID, obj.userName];
	} else if (obj.serviceID == 2) {
		param = ["get:ServiceId", "get:Username", "get:Password"];
		value = [obj.serviceID, obj.userName, obj.password];
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/G2C_GetRandomSecurityQuestion/getrandomsecurityquestionbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'UAT-TEST/G2C_GetRandomSecurityQuestion/getrandomsecurityquestionbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:get="http://xmlns.oracle.com/MoF_Application/G2C_GetRandomSecurityQuestion/GetRandomSecurityQuestionBpel" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><get:process>';
	message += getBodyEnvelop(param, value);
	message += '</get:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Security Qus List Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 45000;
	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Security Qus List Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		var arrQuestionList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = rootNode.item(0).getElementsByTagName("mof:Desc_EN").item(0).textContent;
			else
				serviceDescription = rootNode.item(0).getElementsByTagName("mof:Desc_AR").item(0).textContent;

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(0).textContent;
			if (status != "Success") {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, serviceDescription);
				return;
			}

			var listNode = result.getElementsByTagName("mof:QuestionRec");
			if (listNode.length > 0) {
				for (var i = 0; i < listNode.length; i++) {
					var serviceId = listNode.item(i).getElementsByTagName("mof:Serviceid").item(0).textContent;
					var questionId = listNode.item(i).getElementsByTagName("mof:QuestionId").item(0).textContent;
					var question_En = listNode.item(i).getElementsByTagName("mof:Ques_EN").item(0).textContent;
					var question_Ar = listNode.item(i).getElementsByTagName("mof:Ques_AR").item(0).textContent;
					var answer = listNode.item(i).getElementsByTagName("mof:Answer").item(0).textContent;

					arrQuestionList.push({
						serviceId : serviceId,
						questionId : questionId,
						question_En : question_En,
						question_Ar : question_Ar,
						answer : answer
					});
				}

				if (arrQuestionList.length > 0) {
					arrQuestionList = shuffleArray(arrQuestionList);
				}
				var arr = [];
				for (var k = 0; k < arrQuestionList.length; k++) {
					if (arrQuestionList[k].answer == "") {
						Ti.API.info('SKIP');
						continue;
					}
					arr.push(arrQuestionList[k]);
				}
				// arrQuestionList = arr.slice(0, 1);
			}

			callBackFunction(arr);
		} else {
			callBackFunction([]);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		// Alloy.Globals.hideLoading();
		//
		// callBackFunction([]);

		if (request.status != 200) {
			// Alloy.Globals.hideLoading();
			getSecurityQuestionList(obj, callBackFunction);
			// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};
exports.getSecurityQuestionList = getSecurityQuestionList;

exports.userLogout = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var param = ["mof:TokenCode", "mof:EmailID", "mof:Role", "mof:Group"];
	var value = [obj.tokenCode, obj.emailId, obj.roleType, obj.groupType];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'default/MoF_CAAS_Logout/mof_caas_logoutbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'UAT-TEST/MoF_CAAS_Logout/mof_caas_logoutbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/MoF_Application/MoF_CAAS_Logout/MoF_CAAS_LogoutBPEL" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop_VatTax();
	message += '<soapenv:Body><mof:process>';
	message += getBodyEnvelop(param, value);
	message += '</mof:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Logout Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 25000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Logout Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		var arrQuestionList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var serviceDescription = "";
			var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
			if (isEnglish)
				serviceDescription = rootNode.item(0).getElementsByTagName("mof:Desc_EN").item(0).textContent;
			else
				serviceDescription = rootNode.item(0).getElementsByTagName("mof:Desc_AR").item(0).textContent;

			var status = rootNode.item(0).getElementsByTagName("mof:OperationStatus").item(0).textContent;
			Alloy.Globals.hideLoading();
			if (status != "Success") {
				callBackFunction({
					status : false,
					serviceAlert : serviceDescription
				});
			} else {
				callBackFunction({
					status : true,
					serviceAlert : serviceDescription
				});
			}

		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

/*
 * mSupplier
 */

exports.registerFirstStep = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var companyParam = ["mof:COMPANY_NAME_ARABIC", "mof:COMPANY_NAME_ENGLISH", "mof:COMPANY_REGISTER_NUMBER", "mof:P_NOTE_FROM_SUPPLIER", "mof:P_NOTE_TO_SUPPLIER", "mof:P_SM_NOTE_TO_SUPPLIER", "mof:P_SM_NOTE_TO_BUYER", "mof:P_NI_NUMBER", "mof:P_STANDARD_INDUSTRY_CLASS", "mof:P_SM_BUYER_INTERNAL_NOTES", "mof:P_REGISTRATION_PURPOSE", "mof:P_SUPPLIER_TYPE", "mof:P_REGISTRATION_TYPE", "mof:P_REGISTRATION_STATUS", "mof:P_ACTION", "mof:O_SUPPLIER_REG_ID"];
	var companyValues = [obj.companyNameAr, obj.companyNameEn, obj.companyRegNo, "", "", "", "", "", "", "", "", "", "PROSPECTIVE", "DRAFT", obj.actionCompany, obj.registerId];

	var contactParam = ["mof:P_MAPPING_ID", "mof:P_REQUEST_STATUS", "mof:P_REQUEST_TYPE", "mof:CONTACT_TITLE", "mof:P_FIRST_NAME", "mof:CONTACT_NAME", "mof:P_MIDDLE_NAME", "mof:P_JOB_TITLE", "mof:EMAIL_ADDRESS", "mof:PHONE_AREA_CODE", "mof:MOBILE_NUMBER", "mof:PHONE_NUMBER", "mof:P_FAX_AREA_CODE", "mof:P_FAX_NUMBER", "mof:P_DEPARTMENT", "mof:P_ACTION", "mof:O_CONTACT_REQUEST_ID"];
	var contactValues = [obj.mappingId, "PENDING", "ADD", "", obj.firstName, obj.contactName, "", "", obj.contactEmail, "+971", obj.mobileNo, obj.telPhoneNo, "", "", "", obj.actionContact, obj.contactRequestId];

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_BASIC_INFORMATION/msupplier_basic_informationbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_BASIC_INFORMATION/msupplier_basic_informationbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';

	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:REGISTRATION_REQUEST>';
	message += getBodyEnvelop(companyParam, companyValues);
	message += '</mof:REGISTRATION_REQUEST>';

	message += '<mof:CONTACT_REQUEST>';
	message += getBodyEnvelop(contactParam, contactValues);
	message += '</mof:CONTACT_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("registerFirstStep Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("registerFirstStep Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var registrationOutput = result.getElementsByTagName("iSup:SUPPLIER_REGISTRATIONS_OUTPUT");
			var data;
			if (registrationOutput.length > 0) {

				var registrationStatus = registrationOutput.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;

				if (registrationStatus == "E") {
					var registerId = registrationOutput.item(0).getElementsByTagName("iSup:O_SUPPLIER_REG_ID").item(0).textContent;
					var mappingId = registrationOutput.item(0).getElementsByTagName("iSup:O_MAPPING_ID").item(0).textContent;
					var registrationMsg = registrationOutput.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

					data = {
						registerId : registerId,
						mappingId : mappingId,
						registrationStatus : registrationStatus,
						registrationMsg : registrationMsg,
					};

					callBackFunction(data);
					Alloy.Globals.hideLoading();
					return;
				} else {

					var registerId = registrationOutput.item(0).getElementsByTagName("iSup:O_SUPPLIER_REG_ID").item(0).textContent;
					var mappingId = registrationOutput.item(0).getElementsByTagName("iSup:O_MAPPING_ID").item(0).textContent;
					var registrationMsg = registrationOutput.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

					var contactOutput = result.getElementsByTagName("iSup:CONTACT_RESPONSE_ID");

					var contactId = contactOutput.item(0).getElementsByTagName("iSup:O_CONTACT_REQUEST_ID").item(0).textContent;
					var contactStatus = contactOutput.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
					var contactMsg = contactOutput.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

					data = {
						registerId : registerId,
						mappingId : mappingId,
						registrationStatus : registrationStatus,
						registrationMsg : registrationMsg,
						contactId : contactId,
						contactStatus : contactStatus,
						contactMsg : contactMsg,
					};

					callBackFunction(data);

				}

			}

		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

// Old method...
/*
exports.registerSecondStep = function(obj, callBackFunction) {
if (hasConnection() == false) {
return;
}

var url = "";
if (Alloy.Globals.isProduction)
url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_BUSINESS_CLASS_REQS/msupplier_soa_business_class_reqabpel_client_ep';
else
url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_BUSINESS_CLASS_REQS/msupplier_soa_business_class_reqabpel_client_ep';

Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
message += getHeaderEnvelop();
message += '<soapenv:Body>';
message += '<mof:InputParameters>';
message += '<mof:SOAP_Headers>';
message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
message += '</mof:SOAP_Headers>';
message += '<mof:BUSINESS_CLASIFICATION_REQUEST>';

message += '<mof:P_MAPPING_ID>' + obj.mappingId + '</mof:P_MAPPING_ID>';
message += '<mof:P_REQUEST_STATUS>' + "PENDING" + '</mof:P_REQUEST_STATUS>';
message += '<mof:P_REQUEST_TYPE>' + "ADD" + '</mof:P_REQUEST_TYPE>';

message += '<mof:CLASIFICASTION_TYPEList>';

message += '<mof:CLASIFICASTION_TYPE>';
message += '<mof:TYPE>' + "CHAMBER_OF_COMMERCE_NUMBER" + '</mof:TYPE>';
message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo1 + '</mof:CERTIFICATE_NUMBER>';
message += '<mof:EXP_DATE>' + obj.expiryDate1 + '</mof:EXP_DATE>';
message += '</mof:CLASIFICASTION_TYPE>';

message += '<mof:CLASIFICASTION_TYPE>';
message += '<mof:TYPE>' + "TRADE_LICENSE_NUMBER" + '</mof:TYPE>';
message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo3 + '</mof:CERTIFICATE_NUMBER>';
message += '<mof:EXP_DATE>' + obj.expiryDate3 + '</mof:EXP_DATE>';
message += '</mof:CLASIFICASTION_TYPE>';

message += '<mof:CLASIFICASTION_TYPE>';
message += '<mof:TYPE>' + "COMMERCIAL_REGISTRATION_NUMBER" + '</mof:TYPE>';
message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo2 + '</mof:CERTIFICATE_NUMBER>';
message += '<mof:EXP_DATE>' + obj.expiryDate2 + '</mof:EXP_DATE>';
message += '</mof:CLASIFICASTION_TYPE>';

message += '</mof:CLASIFICASTION_TYPEList>';

message += '<mof:P_CERTIFYING_AGENCY>' + "" + '</mof:P_CERTIFYING_AGENCY>';
message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
message += '<mof:O_BUS_CLASS_REQUEST_ID>' + "" + '</mof:O_BUS_CLASS_REQUEST_ID>';

message += '</mof:BUSINESS_CLASIFICATION_REQUEST>';
message += '</mof:InputParameters>';
message += '</soapenv:Body></soapenv:Envelope>';

Ti.API.info("registerSecondStep Envelope = " + message);

var request = Titanium.Network.createHTTPClient();

request.timeout = 30000;
request.onload = function(e) {

var responseText = getXMLFormate(this.responseText);
Ti.API.info("registerSecondStep Response = " + responseText);

var result;
try {
result = Ti.XML.parseString(responseText);
} catch(e) {
callBackFunction(null);
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
}

var rootNode = result.getElementsByTagName("OutputParameters");

if (rootNode.length > 0) {

var error = rootNode.item(0).getElementsByTagName("Error_message");
if (error.length > 0) {
callBackFunction(null);
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
return;
}

var data;
var classification1 = result.getElementsByTagName("iSup:CHAMBER_OF_COMMERCE_NUMBER");
if (classification1.length > 0) {

var type1 = classification1.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
var requestId1 = classification1.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
var status1 = classification1.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
var msg1 = classification1.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

}
var classification2 = result.getElementsByTagName("iSup:TRADE_LICENSE_NUMBER");
if (classification2.length > 0) {

var type2 = classification2.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
var requestId2 = classification2.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
var status2 = classification2.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
var msg2 = classification2.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

}

var classification3 = result.getElementsByTagName("iSup:COMMERCIAL_REGISTRATION_NUMBER");
if (classification3.length > 0) {

var type3 = classification3.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
var requestId3 = classification3.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
var status3 = classification3.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
var msg3 = classification3.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

}

data = {
type1 : type1,
requestId1 : requestId1,
status1 : status1,
msg1 : msg1,
type2 : type2,
requestId2 : requestId2,
status2 : status2,
msg2 : msg2,
type3 : type3,
requestId3 : requestId3,
status3 : status3,
msg3 : msg3,
};

callBackFunction(data);

} else {
callBackFunction(null);
//    Alloy.Globals.ShowAlert("No Records found.");
}
Alloy.Globals.hideLoading();
};
request.onerror = function(e) {
Titanium.API.error('Status: ' + this.status);
Titanium.API.error('ResponseText: ' + this.responseText);
Titanium.API.error('connectionType: ' + this.connectionType);
Titanium.API.error('location: ' + this.location);

Alloy.Globals.hideLoading();

callBackFunction(null);

if (request.status != 200) {
Alloy.Globals.hideLoading();
Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
return;
}
};
request.open("POST", url);
request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
//    request.setRequestHeader('SOAPAction', soapAction);
request.send(message);
};
*/

// New Method...

exports.registerSecondStep = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_BUSINESS_CLASS_REQS/msupplier_soa_business_class_reqabpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_BUSINESS_CLASS_REQS/msupplier_soa_business_class_reqabpel_client_ep';

	//	url = "http://194.170.30.187:7777/soa-infra/services/TEST/MSUPPLIER_SOA_BUSINESS_CLASS_REQS/msupplier_soa_business_class_reqabpel_client_ep";

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:BUSINESS_CLASIFICATION_REQUEST>';

	message += '<mof:P_MAPPING_ID>' + obj.mappingId + '</mof:P_MAPPING_ID>';

	message += '<mof:CLASIFICASTION_TYPEList>';

	message += '<mof:CHAMBER_OF_COMMERCE_NUMBER>';
	message += '<mof:TYPE>' + "CHAMBER_OF_COMMERCE_NUMBER" + '</mof:TYPE>';
	message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo1 + '</mof:CERTIFICATE_NUMBER>';
	message += '<mof:EXP_DATE>' + obj.expiryDate1 + '</mof:EXP_DATE>';
	message += '<mof:O_BUS_CLASS_REQUEST_ID>' + obj.busReqId1 + '</mof:O_BUS_CLASS_REQUEST_ID>';
	message += '</mof:CHAMBER_OF_COMMERCE_NUMBER>';

	message += '<mof:COMMERCIAL_REGISTRATION_NUMBER>';
	message += '<mof:TYPE>' + "COMMERCIAL_REGISTRATION_NUMBER" + '</mof:TYPE>';
	message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo2 + '</mof:CERTIFICATE_NUMBER>';
	message += '<mof:EXP_DATE>' + obj.expiryDate2 + '</mof:EXP_DATE>';
	message += '<mof:O_BUS_CLASS_REQUEST_ID>' + obj.busReqId2 + '</mof:O_BUS_CLASS_REQUEST_ID>';
	message += '</mof:COMMERCIAL_REGISTRATION_NUMBER>';

	message += '<mof:TRADE_LICENSE_NUMBER>';
	message += '<mof:TYPE>' + "TRADE_LICENSE_NUMBER" + '</mof:TYPE>';
	message += '<mof:CERTIFICATE_NUMBER>' + obj.certificateNo3 + '</mof:CERTIFICATE_NUMBER>';
	message += '<mof:EXP_DATE>' + obj.expiryDate3 + '</mof:EXP_DATE>';
	message += '<mof:O_BUS_CLASS_REQUEST_ID>' + obj.busReqId3 + '</mof:O_BUS_CLASS_REQUEST_ID>';
	message += '</mof:TRADE_LICENSE_NUMBER>';

	message += '</mof:CLASIFICASTION_TYPEList>';

	message += '<mof:P_REQUEST_STATUS>' + "PENDING" + '</mof:P_REQUEST_STATUS>';
	message += '<mof:P_REQUEST_TYPE>' + obj.requestType + '</mof:P_REQUEST_TYPE>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:P_CERTIFYING_AGENCY>' + "" + '</mof:P_CERTIFYING_AGENCY>';

	message += '</mof:BUSINESS_CLASIFICATION_REQUEST>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("registerSecondStep Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("registerSecondStep Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var data;
			var classification1 = result.getElementsByTagName("iSup:CHAMBER_OF_COMMERCE_NUMBER");
			if (classification1.length > 0) {

				var type1 = classification1.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
				var requestId1 = classification1.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
				var status1 = classification1.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg1 = classification1.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}
			var classification2 = result.getElementsByTagName("iSup:TRADE_LICENSE_NUMBER");
			if (classification2.length > 0) {

				var type2 = classification2.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
				var requestId2 = classification2.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
				var status2 = classification2.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg2 = classification2.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}

			var classification3 = result.getElementsByTagName("iSup:COMMERCIAL_REGISTRATION_NUMBER");
			if (classification3.length > 0) {

				var type3 = classification3.item(0).getElementsByTagName("iSup:CLASIFICATION_TYPE").item(0).textContent;
				var requestId3 = classification3.item(0).getElementsByTagName("iSup:O_BUS_CLASS_REQUEST_ID").item(0).textContent;
				var status3 = classification3.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg3 = classification3.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}

			data = {
				type1 : type1,
				requestId1 : requestId1,
				status1 : status1,
				msg1 : msg1,
				type2 : type2,
				requestId2 : requestId2,
				status2 : status2,
				msg2 : msg2,
				type3 : type3,
				requestId3 : requestId3,
				status3 : status3,
				msg3 : msg3,
			};

			callBackFunction(data);

		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.addMSupplierContactDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_CONTACT_REQUESTS/msupplier_soa_contacts_requestsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_CONTACT_REQUESTS/msupplier_soa_contacts_requestsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_MAPPING_ID>' + obj.mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:P_REQUEST_STATUS>' + "PENDING" + '</mof:P_REQUEST_STATUS>';
	message += '<mof:P_REQUEST_TYPE>' + "ADD" + '</mof:P_REQUEST_TYPE>';
	message += '<mof:CONTACT_TITLE>' + obj.contactTitle + '</mof:CONTACT_TITLE>';
	message += '<mof:P_FIRST_NAME>' + obj.firstName + '</mof:P_FIRST_NAME>';
	message += '<mof:CONTACT_NAME>' + obj.contactName + '</mof:CONTACT_NAME>';
	message += '<mof:P_MIDDLE_NAME>' + obj.middleName + '</mof:P_MIDDLE_NAME>';
	message += '<mof:P_JOB_TITLE>' + obj.jobTitle + '</mof:P_JOB_TITLE>';
	message += '<mof:EMAIL_ADDRESS>' + obj.email + '</mof:EMAIL_ADDRESS>';
	message += '<mof:PHONE_AREA_CODE>' + "+971" + '</mof:PHONE_AREA_CODE>';
	message += '<mof:MOBILE_NUMBER>' + obj.mobileNo + '</mof:MOBILE_NUMBER>';
	message += '<mof:PHONE_NUMBER>' + obj.phoneNo + '</mof:PHONE_NUMBER>';
	message += '<mof:P_FAX_AREA_CODE>' + "" + '</mof:P_FAX_AREA_CODE>';
	message += '<mof:P_FAX_NUMBER>' + "" + '</mof:P_FAX_NUMBER>';
	message += '<mof:P_DEPARTMENT>' + obj.department + '</mof:P_DEPARTMENT>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:O_CONTACT_REQUEST_ID>' + obj.contactId + '</mof:O_CONTACT_REQUEST_ID>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addMSupplierContactDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addMSupplierContactDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var requestId = result.getElementsByTagName("iSup:O_CONTACT_REQUEST_ID").item(0).textContent;
			var requestStatus = result.getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
			var requestMsg = result.getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			var data = {
				requestId : requestId,
				requestStatus : requestStatus,
				requestMsg : requestMsg,
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.addMSupplierAddressDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_ADDRESS_REQUESTS/msupplier_address_requestsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_ADDRESS_REQUESTS/msupplier_address_requestsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_MAPPING_ID>' + obj.mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:P_REQUEST_STATUS>' + "PENDING" + '</mof:P_REQUEST_STATUS>';
	message += '<mof:P_REQUEST_TYPE>' + "ADD" + '</mof:P_REQUEST_TYPE>';
	message += '<mof:ADDRESS_NAME>' + obj.addressName + '</mof:ADDRESS_NAME>';
	message += '<mof:ADDRESS_LINE1>' + obj.addressLine1 + '</mof:ADDRESS_LINE1>';
	message += '<mof:ADDRESS_LINE2>' + obj.addressLine2 + '</mof:ADDRESS_LINE2>';
	message += '<mof:EMIRATE>' + obj.emirate + '</mof:EMIRATE>';
	message += '<mof:PO_Box>' + obj.poBox + '</mof:PO_Box>';
	message += '<mof:CITY>' + obj.city + '</mof:CITY>';
	message += '<mof:P_COUNTY>' + "" + '</mof:P_COUNTY>';
	message += '<mof:COUNTRY>' + obj.country + '</mof:COUNTRY>';
	message += '<mof:P_FAX_AREA_CODE>' + "" + '</mof:P_FAX_AREA_CODE>';
	message += '<mof:P_FAX_NUMBER>' + "" + '</mof:P_FAX_NUMBER>';
	message += '<mof:P_PHONE_AREA_CODE>' + "" + '</mof:P_PHONE_AREA_CODE>';
	message += '<mof:P_PHONE_NUMBER>' + "" + '</mof:P_PHONE_NUMBER>';
	message += '<mof:EMAIL_ADDRESS>' + "" + '</mof:EMAIL_ADDRESS>';
	message += '<mof:AREA>' + "" + '</mof:AREA>';
	message += '<mof:P_RFQ_FLAG>' + "N" + '</mof:P_RFQ_FLAG>';
	message += '<mof:P_PAY_FLAG>' + "Y" + '</mof:P_PAY_FLAG>';
	message += '<mof:P_PUR_FLAG>' + "Y" + '</mof:P_PUR_FLAG>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:O_ADDRESS_REQUEST_ID>' + obj.requestId + '</mof:O_ADDRESS_REQUEST_ID>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addMSupplierAddressDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addMSupplierAddressDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");
		var data;

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var requestId = result.getElementsByTagName("iSup:O_ADDRESS_REQUEST_ID").item(0).textContent;
			var requestStatus = result.getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
			var requestMsg = result.getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			var data = {
				requestId : requestId,
				requestStatus : requestStatus,
				requestMsg : requestMsg,
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.addMSupplierBankDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_BANK_ACC_GEN_REQ/msupplier_bank_acc_gen_reqbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_BANK_ACC_GEN_REQ/msupplier_bank_acc_gen_reqbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_MAPPING_ID>' + obj.mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:P_REQUEST_STATUS>' + "PENDING" + '</mof:P_REQUEST_STATUS>';
	message += '<mof:P_REQUEST_TYPE>' + "ADD" + '</mof:P_REQUEST_TYPE>';
	message += '<mof:COUNTRY>' + obj.country + '</mof:COUNTRY>';
	message += '<mof:BRANCH_NUMBER>' + obj.branchId + '</mof:BRANCH_NUMBER>';
	//
	message += '<mof:BANK_NUMBER>' + obj.bankId + '</mof:BANK_NUMBER>';
	//
	message += '<mof:BANK_NAME>' + obj.bankName + '</mof:BANK_NAME>';
	message += '<mof:BANK>' + "BANK" + '</mof:BANK>';
	message += '<mof:P_BRANCH_TYPE>' + "OTHER" + '</mof:P_BRANCH_TYPE>';
	message += '<mof:BRANCH_NAME>' + obj.branchName + '</mof:BRANCH_NAME>';
	message += '<mof:P_OWNER_PRIMARY_FLAG>' + "Y" + '</mof:P_OWNER_PRIMARY_FLAG>';
	message += '<mof:ACCOUNT_NAME>' + obj.accountName + '</mof:ACCOUNT_NAME>';
	message += '<mof:BANK_ACCOUNT_NUMBER>' + obj.bankAccNo + '</mof:BANK_ACCOUNT_NUMBER>';
	message += '<mof:CURRENCY_CODE>' + obj.currency + '</mof:CURRENCY_CODE>';
	message += '<mof:IBAN>' + obj.iban + '</mof:IBAN>';
	message += '<mof:P_PAYMENT_FACTOR_FLAG>' + "N" + '</mof:P_PAYMENT_FACTOR_FLAG>';
	message += '<mof:P_FOREIGN_PAYMENT_USE_FLAG>' + "Y" + '</mof:P_FOREIGN_PAYMENT_USE_FLAG>';
	message += '<mof:P_START_DATE>' + "" + '</mof:P_START_DATE>';
	message += '<mof:P_NOTE>' + "" + '</mof:P_NOTE>';
	message += '<mof:P_STATUS>' + "NEW" + '</mof:P_STATUS>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:O_TEMP_EXT_BANK_ACCT_ID>' + obj.requestId + '</mof:O_TEMP_EXT_BANK_ACCT_ID>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addMSupplierBankDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addMSupplierBankDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");
		var data;

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var requestId = result.getElementsByTagName("iSup:O_TEMP_EXT_BANK_ACCT_ID").item(0).textContent;
			var requestStatus = result.getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
			var requestMsg = result.getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			var data = {
				requestId : requestId,
				requestStatus : requestStatus,
				requestMsg : requestMsg,
			};
			callBackFunction(data);
		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getMSupplierCountryList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lan;
	if (Alloy.Globals.isEnglish) {
		lan = "1";
	} else {
		lan = "2";
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:COUNTRY_LIST_Input>';
	message += '<msup:AnyValue>' + lan + '</msup:AnyValue>';
	message += '</msup:COUNTRY_LIST_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierCountryList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierCountryList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("COUNTRY_LIST_Output");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:COUNTRY_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var name = data.item(i).getElementsByTagName("iSupp:COUNTRY_NAME").item(0).text;
					var code = data.item(i).getElementsByTagName("iSupp:COUNTRY_CODE").item(0).text;

					arrList.push({
						name : name,
						code : code,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierBankNameList = function(countryCode, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:BANK_NAME_LIST_Input>';
	message += '<msup:COUNTRY_CODE>' + countryCode + '</msup:COUNTRY_CODE>';
	message += '</msup:BANK_NAME_LIST_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierBankNameList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierBankNameList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("BANK_NAME_LIST_Output");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:BANK_NAME_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var name = data.item(i).getElementsByTagName("iSupp:BANK_NAME").item(0).text;
					var id = data.item(i).getElementsByTagName("iSupp:BANK_PARTY_ID").item(0).text;
					var number = data.item(i).getElementsByTagName("iSupp:BANK_NUMBER").item(0).text;

					arrList.push({
						name : name,
						id : id,
						number : number,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierBranchNameList = function(id, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:BANK_BRANCHES_LIST_Input>';
	message += '<msup:BANK_PARTY_ID>' + id + '</msup:BANK_PARTY_ID>';
	message += '</msup:BANK_BRANCHES_LIST_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierBranchNameList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierBranchNameList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("BANK_BRANCHES_LIST_Output");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:BANK_BRANCHES_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var type = data.item(i).getElementsByTagName("iSupp:BANK_BRANCH_TYPE").item(0).text;
					var name = data.item(i).getElementsByTagName("iSupp:BANK_BRANCH_NAME").item(0).text;
					var id = data.item(i).getElementsByTagName("iSupp:BRANCH_PARTY_ID").item(0).text;
					var number = data.item(i).getElementsByTagName("iSupp:BRANCH_NUMBER").item(0).text;

					arrList.push({
						type : type,
						name : name,
						id : id,
						number : number
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierCurrencyCodeList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lan;
	if (Alloy.Globals.isEnglish) {
		lan = "1";
	} else {
		lan = "2";
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_BANK_INFO/msupplier_soa_get_bank_info_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:CURRENCY_CODE_LIST_Input>';
	message += '<msup:AnyValue>' + lan + '</msup:AnyValue>';
	message += '</msup:CURRENCY_CODE_LIST_Input>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierCurrencyCodeList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierCurrencyCodeList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("CURRENCY_CODE_LIST_Output");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:CURRENCY_CODE_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var code = data.item(i).getElementsByTagName("iSupp:CURRENCY_CODE").item(0).text;
					var desc = data.item(i).getElementsByTagName("iSupp:DESCRIPTION").item(0).text;

					arrList.push({
						code : code,
						desc : desc,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierLegalEntityList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_COMPANY_ADDL_DETAILS/msupplier_soa_get_company_addl_details_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_COMPANY_ADDL_DETAILS/msupplier_soa_get_company_addl_details_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:LEGAL_ENTITY_LIST_INPUT>';
	message += '<msup:AnyValue>' + '1' + '</msup:AnyValue>';
	message += '<msup:IS_LANG>' + lang + '</msup:IS_LANG>';
	message += '</msup:LEGAL_ENTITY_LIST_INPUT>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierLegalEntityList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierLegalEntityList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("LEGAL_ENTITY_LIST_OUTPUT");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:LEGAL_ENTITY_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var title = data.item(i).getElementsByTagName("iSupp:DESCRIPTION").item(0).text;
					//	var titleEn = data.item(i).getElementsByTagName("iSupp:DISPLAY_NAME").item(0).text;

					arrList.push({
						title : title,
						//	titleEn : titleEn,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierDirectorNationalityList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_COMPANY_ADDL_DETAILS/msupplier_soa_get_company_addl_details_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_COMPANY_ADDL_DETAILS/msupplier_soa_get_company_addl_details_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:NATIOLILITY_LIST_INPUT>';
	message += '<msup:AnyValue>' + '1' + '</msup:AnyValue>';
	message += '<msup:IS_LANG>' + lang + '</msup:IS_LANG>';
	message += '</msup:NATIOLILITY_LIST_INPUT>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierDirectorNationalityList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierDirectorNationalityList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("NATIONALITY_LIST_OUTPUT");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:NATIONALITY_LIST");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					var title = data.item(i).getElementsByTagName("iSupp:DESCRIPTION").item(0).text;
					//	var titleEn = data.item(i).getElementsByTagName("iSupp:DISPLAY_NAME").item(0).text;

					arrList.push({
						title : title,
						//	titleEn : titleEn,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierActivityList = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_ACTIVITY_LIST/msupplier_soa_activity_list_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_ACTIVITY_LIST/msupplier_soa_activity_list_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msup="http://www.mSupp_SOA.org">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<msup:ACTIVITY_LIST_INPUT>';
	message += '<msup:AnyValue>' + '' + '</msup:AnyValue>';
	message += '<msup:IS_LANG>' + lang + '</msup:IS_LANG>';
	message += '</msup:ACTIVITY_LIST_INPUT>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierActivityList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierActivityList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("ACTIVITY_LIST_OUTPUT");

		var arrList = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var data = result.getElementsByTagName("iSupp:ACTIVITY_LIST_TYPE");
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					//	var titleAr = data.item(i).getElementsByTagName("iSupp:DISPLAY_NAME").item(0).text;
					var title = data.item(i).getElementsByTagName("iSupp:DESCRIPTION").item(0).text;

					arrList.push({
						//	titleAr : titleAr,
						title : title,
					});
				}
			}

			callBackFunction(arrList);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

function getActivityBodyEnvelope(arrValues) {

	var bodyMessage = "";
	for (var i = 0; i < arrValues.length; i++) {
		bodyMessage += "<mof:ActivityRec>";
		bodyMessage += "<mof:P_C_EXT_ATTR1>" + arrValues[i] + "</mof:P_C_EXT_ATTR1>";
		bodyMessage += "</mof:ActivityRec>";
	}
	return bodyMessage;
}

exports.registerThirdStep = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_ADDITI_INFO_EXT/msupplier_soa_additi_info_ext_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_ADDITI_INFO_EXT/msupplier_soa_additi_info_ext_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';

	message += '<mof:CompanyAdditionalDetailsRec>';

	message += '<mof:P_C_EXT_ATTR1>' + obj.legalEntity + '</mof:P_C_EXT_ATTR1>';
	message += '<mof:P_C_EXT_ATTR2>' + obj.directorNationality + '</mof:P_C_EXT_ATTR2>';
	message += '<mof:P_C_EXT_ATTR3>' + obj.directorName + '</mof:P_C_EXT_ATTR3>';

	message += '</mof:CompanyAdditionalDetailsRec>';

	//	message += getActivityBodyEnvelope(obj.arrActivitySelectedValues);

	message += '<mof:IS_PROFILE>' + obj.isProfile + '</mof:IS_PROFILE>';
	message += '<mof:IS_LANG>' + obj.lang + '</mof:IS_LANG>';
	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("registerThirdStep Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("registerThirdStep Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var data;
			var classification = result.getElementsByTagName("iSup:VALIDATIONS_RESPONSE");
			if (classification.length > 0) {

				//	var extensionId = classification.item(0).getElementsByTagName("iSup:O_EXTENSION_ID").item(0).textContent;
				var status = classification.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg = classification.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}

			data = {
				//	extensionId : extensionId,
				status : status,
				msg : msg,
			};

			callBackFunction(data);

		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getMSupplierContactList = function(mappingId, registeredId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_CONTACTS/msupplier_soa_get_contact_requestsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_CONTACTS/msupplier_soa_get_contact_requestsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:CONTACT_REQUEST>';
	message += '<mof:P_MAPPING_ID>' + mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:O_CONTACT_REQUEST_ID>' + registeredId + '</mof:O_CONTACT_REQUEST_ID>';
	message += '</mof:CONTACT_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierContactList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierContactList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var response = result.getElementsByTagName("iSup:CONTACTS_REQUESTS_RESPONSE");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var mappingId = response.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0).text;
					var requestStatus = response.item(i).getElementsByTagName("iSup:REQUEST_STATUS").item(0).text;
					var requestType = response.item(i).getElementsByTagName("iSup:REQUEST_TYPE").item(0).text;
					var contactTitle = response.item(i).getElementsByTagName("iSup:CONTACT_TITLE").item(0).text;
					var firstName = response.item(i).getElementsByTagName("iSup:FIRST_NAME").item(0).text;
					var contactName = response.item(i).getElementsByTagName("iSup:CONTACT_NAME").item(0).text;
					//
					var middleName = response.item(i).getElementsByTagName("iSup:MIDDLE_NAME").item(0).text;
					var jobTitle = response.item(i).getElementsByTagName("iSup:JOB_TITLE").item(0).text;
					var emailId = response.item(i).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0).text;
					var phoneAreaCode = response.item(i).getElementsByTagName("iSup:PHONE_AREA_CODE").item(0).text;
					var mobileNumber = response.item(i).getElementsByTagName("iSup:MOBILE_NUMBER").item(0).text;
					//
					var telPhoneNumber = response.item(i).getElementsByTagName("iSup:TELEPHONE_NUMBER").item(0).text;
					//
					var faxAreaCode = response.item(i).getElementsByTagName("iSup:FAX_AREA_CODE").item(0).text;
					var faxNumber = response.item(i).getElementsByTagName("iSup:FAX_NUMBER").item(0).text;
					var department = response.item(i).getElementsByTagName("iSup:DEPARTMENT").item(0).text;
					var contactId = response.item(i).getElementsByTagName("iSup:CONTACT_REQUEST_ID").item(0).text;

					data.push({
						mappingId : mappingId,
						requestStatus : requestStatus,
						requestType : requestType,
						contactTitle : contactTitle,
						firstName : firstName,
						contactName : contactName,
						middleName : middleName,
						jobTitle : jobTitle,
						emailId : emailId,
						phoneAreaCode : phoneAreaCode,
						mobileNumber : mobileNumber,
						telPhoneNumber : telPhoneNumber,
						faxAreaCode : faxAreaCode,
						faxNumber : faxNumber,
						department : department,
						contactId : contactId,
					});
				}
			}
			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierBankList = function(mappingId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_BANK_DETAILS/msupplier_soa_get_bank_detailsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_BANK_DETAILS/msupplier_soa_get_bank_detailsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:BANK_ACC_REQUEST>';
	message += '<mof:P_MAPPING_ID>' + mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:O_TEMP_EXT_BANK_ACCT_ID>' + "" + '</mof:O_TEMP_EXT_BANK_ACCT_ID>';
	message += '</mof:BANK_ACC_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierBankList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierBankList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var response = result.getElementsByTagName("iSup:BANK_ACC_REQUESTS");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var mappingId = response.item(i).getElementsByTagName("iSup:P_MAPPING_ID").item(0).text;
					var requestStatus = response.item(i).getElementsByTagName("iSup:REQUEST_STATUS").item(0).text;
					var requestType = response.item(i).getElementsByTagName("iSup:REQUEST_TYPE").item(0).text;
					var countryDescription = response.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0).text;
					var countryCode = response.item(i).getElementsByTagName("iSup:COUNTRY_CODE").item(0).text;
					var branchId = response.item(i).getElementsByTagName("iSup:BRANCH_ID").item(0).text;
					var bankId = response.item(i).getElementsByTagName("iSup:BANK_ID").item(0).text;
					var bankName = response.item(i).getElementsByTagName("iSup:BANK_NAME").item(0).text;
					var bankInstitutionType = response.item(i).getElementsByTagName("iSup:BANK_INSTITUTION_TYPE").item(0).text;
					var branchType = response.item(i).getElementsByTagName("iSup:BRANCH_TYPE").item(0).text;
					var branchName = response.item(i).getElementsByTagName("iSup:BRANCH_NAME").item(0).text;
					var ownerPrimaryFlag = response.item(i).getElementsByTagName("iSup:OWNER_PRIMARY_FLAG").item(0).text;
					var bankAccName = response.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NAME").item(0).text;
					var bankAccNo = response.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NUM").item(0).text;
					var currencyDescription = response.item(i).getElementsByTagName("iSup:CURRENCY_DESCRIPTION").item(0).text;
					var currencyCode = response.item(i).getElementsByTagName("iSup:CURRENCY_CODE").item(0).text;
					var iban = response.item(i).getElementsByTagName("iSup:IBAN").item(0).text;
					var paymentFactorFlag = response.item(i).getElementsByTagName("iSup:PAYMENT_FACTOR_FLAG").item(0).text;
					var foreignPaymentFlag = response.item(i).getElementsByTagName("iSup:FOREIGN_PAYMENT_USE_FLAG").item(0).text;
					var startDate = response.item(i).getElementsByTagName("iSup:START_DATE").item(0).text;
					var note = response.item(i).getElementsByTagName("iSup:NOTE").item(0).text;
					var status = response.item(i).getElementsByTagName("iSup:STATUS").item(0).text;
					var bankAccId = response.item(i).getElementsByTagName("iSup:TEMP_EXT_BANK_ACCT_ID").item(0).text;

					data.push({
						mappingId : mappingId,
						requestStatus : requestStatus,
						requestType : requestType,
						countryDescription : countryDescription,
						countryCode : countryCode,
						branchId : branchId,
						bankId : bankId,
						bankName : bankName,
						bankInstitutionType : bankInstitutionType,
						branchType : branchType,
						branchName : branchName,
						ownerPrimaryFlag : ownerPrimaryFlag,
						bankAccName : bankAccName,
						bankAccNo : bankAccNo,
						currencyDescription : currencyDescription,
						currencyCode : currencyCode,
						iban : iban,
						paymentFactorFlag : paymentFactorFlag,
						foreignPaymentFlag : foreignPaymentFlag,
						startDate : startDate,
						note : note,
						status : status,
						bankAccId : bankAccId,
					});
				}
			}

			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.addMSupplierAttachments = function(obj, media, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_ATTACHMENTS_FILES/msupplier_attachments_filesbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_ATTACHMENTS_FILES/msupplier_attachments_filesbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:ATTACHMENTS_REQUEST>';
	message += '<mof:TITLE>' + obj.title + '</mof:TITLE>';
	message += '<mof:P_MIME_TYPE>' + "DESC" + '</mof:P_MIME_TYPE>';
	message += '<mof:P_FILE_CONTENT_TYPE>' + "application/x-png" + '</mof:P_FILE_CONTENT_TYPE>';
	message += '<mof:P_FILE_DATA>' + media[0].byteData + '</mof:P_FILE_DATA>';
	message += '<mof:CATEGORY_NAME>' + obj.category + '</mof:CATEGORY_NAME>';
	message += '<mof:DOCUMENT_DESCRIPTION>' + obj.desc + '</mof:DOCUMENT_DESCRIPTION>';
	message += '<mof:P_TEXT>' + obj.text + '</mof:P_TEXT>';
	message += '<mof:REGISTRATION_ID>' + obj.registerId + '</mof:REGISTRATION_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:X_FILE_ID>' + obj.fileId + '</mof:X_FILE_ID>';
	message += '</mof:ATTACHMENTS_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addMSupplierAttachments Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addMSupplierAttachments Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var response = result.getElementsByTagName("iSup:ATTACHMENTS_OUTPUT");
			if (response.length > 0) {

				var accessId = response.item(0).getElementsByTagName("iSup:X_ACCESS_ID").item(0).text;
				var fileId = response.item(0).getElementsByTagName("iSup:X_FILE_ID").item(0).text;
				var status = response.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).text;
				var msg = response.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).text;

				data = {
					accessId : accessId,
					fileId : fileId,
					status : status,
					msg : msg,
				};
			}

			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierAttachmentList = function(registerId, title, text, isFromProfile, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_ATTACHMENTS/msupplier_soa_get_attachmentsbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_ATTACHMENTS/msupplier_soa_get_attachmentsbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	// message += '<mof:SOAP_Headers>';
	// message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	// message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	// message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	// message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	// message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	// message += '</mof:SOAP_Headers>';

	message += '<mof:ATTACHMENT_REQUEST>';
	message += '<mof:REGISTRATION_ID>' + registerId + '</mof:REGISTRATION_ID>';
	message += '<mof:TITLE>' + title + '</mof:TITLE>';
	message += '<mof:TEXT>' + text + '</mof:TEXT>';
	message += '</mof:ATTACHMENT_REQUEST>';
	message += '<mof:IS_PROFILE>' + isFromProfile + '</mof:IS_PROFILE>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierAttachmentList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierAttachmentList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var response = result.getElementsByTagName("ns1:ATTACHMENT_RESPONSE");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {
					/*    var length = response.item(i).getElementsByTagName("ns1:ATTACHMENT_RESPONSE").length;
					 for (var j = 0; j < length; j++) {
					 var nodeValue = response.item(i).getElementsByTagName("ns1:ATTACHMENT_RESPONSE").item(j).attributes.getNamedItem("name").nodeValue;
					 var nodeTextContent = response.item(i).getElementsByTagName("ns1:ATTACHMENT_RESPONSE").item(j).textContent;
					 Ti.API.info('nodeValue==' + nodeValue);
					 Ti.API.info('nodeTextContent' + nodeTextContent);

					 var fileId;
					 var entityName;
					 var desc;
					 var fileName;
					 var dataObject;
					 var categoryName;
					 var status;
					 var url;
					 var title;
					 var text;
					 if (nodeValue == "FILE_ID") {
					 fileId = nodeTextContent;
					 } else if (nodeValue == "ENTITY_NAME") {
					 entityName = nodeTextContent;
					 } else if (nodeValue == "DOCUMENT_DESCRIPTION") {
					 desc = nodeTextContent;
					 } else if (nodeValue == "FILE_NAME") {
					 fileName = nodeTextContent;
					 } else if (nodeValue == "DATA_OBJECT_CODE") {
					 dataObject = nodeTextContent;
					 } else if (nodeValue == "CATEGORY_NAME") {
					 categoryName = nodeTextContent;
					 } else if (nodeValue == "STATUS") {
					 status = nodeTextContent;
					 } else if (nodeValue == "URL") {
					 url = nodeTextContent;
					 } else if (nodeValue == "TITLE") {
					 title = nodeTextContent;
					 } else if (nodeValue == "P_TEXT") {
					 text = nodeTextContent;
					 }
					 */

					var title = response.item(i).getElementsByTagName("ns1:TITLE").item(0).textContent;
					var mimeType = response.item(i).getElementsByTagName("ns1:P_MIME_TYPE").item(0).textContent;
					var fileContentType = response.item(i).getElementsByTagName("ns1:P_FILE_CONTENT_TYPE").item(0).textContent;
					var imageData = response.item(i).getElementsByTagName("ns1:P_FILE_DATA").item(0).textContent;
					var categoryName = response.item(i).getElementsByTagName("ns1:CATEGORY_NAME").item(0).textContent;
					var desc = response.item(i).getElementsByTagName("ns1:DOCUMENT_DESCRIPTION").item(0).textContent;
					var dataType = response.item(i).getElementsByTagName("ns1:P_DATATYPE").item(0).textContent;
					var text = response.item(i).getElementsByTagName("ns1:P_TEXT").item(0).textContent;
					var functionName = response.item(i).getElementsByTagName("ns1:P_FUNCTION_NAME").item(0).textContent;
					var entityName = response.item(i).getElementsByTagName("ns1:P_ENTITY_NAME").item(0).textContent;
					var registerId = response.item(i).getElementsByTagName("ns1:REGISTRATION_ID").item(0).textContent;
					var sourceId = response.item(i).getElementsByTagName("ns1:P_SOURCE").item(0).textContent;
					var fileId = response.item(i).getElementsByTagName("ns1:X_FILE_ID").item(0).textContent;
					//item(i).attributes.getNamedItem("name").nodeValue;
					var url = response.item(i).getElementsByTagName("ns1:URL").item(0).textContent;

					//    }

					data.push({
						title : title,
						mimeType : mimeType,
						fileContentType : fileContentType,
						imageData : imageData,
						categoryName : categoryName,
						desc : desc,
						dataType : dataType,
						text : text,
						functionName : functionName,
						entityName : entityName,
						registerId : registerId,
						sourceId : sourceId,
						fileId : fileId,
						url : url,
					});

				}

			}

			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getMSupplierAddressList = function(mappingId, registeredId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_ADDRESS_REQUESTS/msupplier_soa_get_address_requests_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_ADDRESS_REQUESTS/msupplier_soa_get_address_requests_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:ADDRESS_REQUEST>';
	message += '<mof:P_MAPPING_ID>' + mappingId + '</mof:P_MAPPING_ID>';
	message += '<mof:O_ADDRESS_REQUEST_ID>' + "" + '</mof:O_ADDRESS_REQUEST_ID>';
	message += '</mof:ADDRESS_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierAddressList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierAddressList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var response = result.getElementsByTagName("iSup:ADDRESS_REQUESTS");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var mappingId = response.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0).text;
					var requestStatus = response.item(i).getElementsByTagName("iSup:REQUEST_STATUS").item(0).text;
					var requestType = response.item(i).getElementsByTagName("iSup:REQUEST_TYPE").item(0).text;
					var addressName = response.item(i).getElementsByTagName("iSup:ADDRESS_NAME").item(0).text;
					var addressLine1 = response.item(i).getElementsByTagName("iSup:ADDRESS_LINE1").item(0).text;
					var addressLine2 = response.item(i).getElementsByTagName("iSup:ADDRESS_LINE2").item(0).text;
					var emirate = response.item(i).getElementsByTagName("iSup:EMIRATE").item(0).text;
					var postalCode = response.item(i).getElementsByTagName("iSup:POSTAL_CODE").item(0).text;
					var city = response.item(i).getElementsByTagName("iSup:CITY").item(0).text;
					var country = response.item(i).getElementsByTagName("iSup:COUNTRY").item(0).text;
					var countryDesc = response.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0).text;
					var faxAreaCode = response.item(i).getElementsByTagName("iSup:FAX_AREA_CODE").item(0).text;
					var faxNo = response.item(i).getElementsByTagName("iSup:FAX_NUMBER").item(0).text;
					var phoneAreaCode = response.item(i).getElementsByTagName("iSup:PHONE_AREA_CODE").item(0).text;
					var phoneNo = response.item(i).getElementsByTagName("iSup:PHONE_NUMBER").item(0).text;
					var emailId = response.item(i).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0).text;
					//	var paymentFactorFlag = response.item(i).getElementsByTagName("iSup:PROVINCE").item(0).text;
					//	var foreignPaymentFlag = response.item(i).getElementsByTagName("iSup:RFQ_FLAG").item(0).text;
					//	var startDate = response.item(i).getElementsByTagName("iSup:PAY_FLAG").item(0).text;
					//	var note = response.item(i).getElementsByTagName("iSup:PUR_FLAG").item(0).text;
					var addressReqId = response.item(i).getElementsByTagName("iSup:ADDRESS_REQUEST_ID").item(0).text;

					data.push({
						mappingId : mappingId,
						requestStatus : requestStatus,
						requestType : requestType,
						addressName : addressName,
						addressLine1 : addressLine1,
						addressLine2 : addressLine2,
						emirate : emirate,
						postalCode : postalCode,
						city : city,
						country : country,
						countryDesc : countryDesc,
						faxAreaCode : faxAreaCode,
						faxNo : faxNo,
						phoneAreaCode : phoneAreaCode,
						phoneNo : phoneNo,
						emailId : emailId,
						addressReqId : addressReqId,
					});
				}
			}

			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.addMSupplierPartnersDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_PARTNERS/msupplier_soa_partnersbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_PARTNERS/msupplier_soa_partnersbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registerId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:O_EXTENSION_ID>' + obj.extension + '</mof:O_EXTENSION_ID>';
	message += '<mof:PartnersRec>';

	message += '<mof:P_C_EXT_ATTR1>' + obj.ownerName + '</mof:P_C_EXT_ATTR1>';
	message += '<mof:P_C_EXT_ATTR2>' + obj.nationality + '</mof:P_C_EXT_ATTR2>';
	message += '<mof:P_C_EXT_ATTR4>' + obj.citizenPartner + '</mof:P_C_EXT_ATTR4>';
	message += '<mof:P_N_EXT_ATTR3>' + obj.partnership + '</mof:P_N_EXT_ATTR3>';

	message += '</mof:PartnersRec>';
	message += '<mof:IS_LANG>' + lang + '</mof:IS_LANG>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addMSupplierPartnersDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addMSupplierPartnersDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var data;
			var classification = result.getElementsByTagName("iSup:PartnersRec");
			if (classification.length > 0) {

				var extensionId = classification.item(0).getElementsByTagName("iSup:O_EXTENSION_ID").item(0).textContent;
				var status = classification.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg = classification.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}

			data = {
				extensionId : extensionId,
				status : status,
				msg : msg,
			};

			callBackFunction(data);

		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getMSupplierPartnersList = function(registeredId, isFromProfile, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_PARTNERS/muspplier_soa_get_partner_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_PARTNERS/muspplier_soa_get_partner_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/MoF_Application/MSUPPLIER_SOA_GetAdditional_Info_Ext/MSupplier_Soa_GetAdditional_Info_Ext">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:Input_Registrations_request>';
	message += '<mof:P_SUPPLIER_REG_ID>' + registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:O_EXTENSION_ID>' + "" + '</mof:O_EXTENSION_ID>';
	message += '<mof:IS_PROFILE>' + isFromProfile + '</mof:IS_PROFILE>';
	message += '</mof:Input_Registrations_request>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getMSupplierPartnersList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getMSupplierPartnersList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var response = result.getElementsByTagName("iSup:Partner_ElementRec");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var registerId = response.item(i).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0).text;
					//	var groupId = response.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0).text;
					//	var dataLevelId = response.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0).text;
					//	var prospect = response.item(i).getElementsByTagName("iSup:IS_PROSPECT").item(0).text;
					var ownerName = response.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0).text;
					var nationality = response.item(i).getElementsByTagName("iSup:C_EXT_ATTR2").item(0).text;
					var citizen = response.item(i).getElementsByTagName("iSup:C_EXT_ATTR4").item(0).text;
					var partnership = response.item(i).getElementsByTagName("iSup:N_EXT_ATTR3").item(0).text;
					var extension = response.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0).text;

					data.push({
						registerId : registerId,
						ownerName : ownerName,
						nationality : nationality,
						citizen : citizen,
						partnership : partnership,
						extension : extension,
					});
				}
			}

			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getPaymentTransactionDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	var vendor;

	Ti.API.info('obj.vendorId' + obj.vendorId);

	/*if(obj.vendorId == null){
	 Ti.API.info('if');
	 vendor = "";
	 }else{
	 Ti.API.info('else');
	 vendor = obj.vendor_id;
	 }*/

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_MobiPay_GetTransactionStatus/mof_mobipay_gettransactionstatusbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MoF_MobiPay_GetTransactionStatus/mof_mobipay_gettransactionstatusbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/VATAndTAX_System/MoF_MobiPay_GetTransactionStatus/MoF_MobiPay_GetTransactionStatusBPEL">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><mof:process>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:ParchaseID>' + obj.paymentId + '</mof:ParchaseID>';
	message += '<mof:PAYMENT_TYPE>' + obj.paymentType + '</mof:PAYMENT_TYPE>';
	message += '<mof:SUPPLIER_NAME>' + obj.supplierName + '</mof:SUPPLIER_NAME>';
	message += '<mof:REG_ID>' + obj.registerId + '</mof:REG_ID>';
	message += '<mof:VENDOR_ID>' + obj.vendorId + '</mof:VENDOR_ID>';
	message += '</mof:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Transaction Detail Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Transaction Detail Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");
		var data = null;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var classification = result.getElementsByTagName("mof:record");
			if (classification.length > 0) {

				var operationCode = classification.item(0).getElementsByTagName("mof:Operationcode").item(0).textContent;
				var operationMessage = classification.item(0).getElementsByTagName("mof:OperationMessage").item(0).textContent;
				var transactionId = classification.item(0).getElementsByTagName("mof:Transaction_Id").item(0).textContent;
				var transactionAmount = classification.item(0).getElementsByTagName("mof:Transaction_Amount").item(0).textContent;
				var confirmationId = classification.item(0).getElementsByTagName("mof:Confirmation_Id").item(0).textContent;
				var transactionDate = classification.item(0).getElementsByTagName("mof:Transaction_Date").item(0).textContent;
				var serviceCode = classification.item(0).getElementsByTagName("mof:Servicecode").item(0).textContent;
				var enDesc = classification.item(0).getElementsByTagName("mof:Engdesc").item(0).textContent;
				var arDesc = classification.item(0).getElementsByTagName("mof:Arbdesc").item(0).textContent;

				data = {
					operationCode : operationCode,
					operationMessage : operationMessage,
					transactionId : transactionId,
					transactionAmount : (transactionAmount != "" && transactionAmount != null) ? (parseInt(transactionAmount) / 100) : 0,
					confirmationId : confirmationId,
					transactionDate : transactionDate,
					serviceCode : serviceCode,
					enDesc : enDesc,
					arDesc : arDesc,
				};
			}

			callBackFunction(data);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getPaymentId = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_Mobipay_GetPaymentID/mof_mobipay_getpaymentidbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MoF_Mobipay_GetPaymentID/mof_mobipay_getpaymentidbpel_client_ep';

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/MoF_Application/MoF_Mobipay_GetPaymentID/MoF_Mobipay_GetPaymentIdBPEL" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body><mof:process>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:ServiceName>' + obj.serviceName + '</mof:ServiceName>';
	message += '<mof:ReqId>' + obj.registerId + '</mof:ReqId>';
	message += '</mof:process></soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getPaymentId Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getPaymentId Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var paymentId = rootNode.item(0).getElementsByTagName("mof:PaymentID").item(0).textContent;
			var serviceCode = rootNode.item(0).getElementsByTagName("mof:ServiceCode").item(0).textContent;
			var validation = rootNode.item(0).getElementsByTagName("mof:VALIDATIONS");
			if (validation.length > 0) {
				errorCode = validation.item(0).getElementsByTagName("mof:ERROR_CODE").item(0).textContent;
				status = validation.item(0).getElementsByTagName("mof:STATUS").item(0).textContent;
				errorMsg = validation.item(0).getElementsByTagName("mof:ERROR_MSG").item(0).textContent;

				data = {
					paymentId : paymentId,
					serviceCode : serviceCode,
					errorCode : errorCode,
					status : status,
					errorMsg : errorMsg,
				};

			} else {

				data = {
					paymentId : paymentId,
					serviceCode : serviceCode,
				};

			}

			callBackFunction(data);
		} else {
			callBackFunction(null);
			// Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//	request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.submitMSupplierPayment = function(registeredId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_SUBMIT_APPLICATION/msupplier_soa_submit_applicationbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_SUBMIT_APPLICATION/msupplier_soa_submit_applicationbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:SUBMIT_APPLICATION>';
	message += '<mof:SUPPLIER_REG_ID>' + registeredId + '</mof:SUPPLIER_REG_ID>';
	message += '</mof:SUBMIT_APPLICATION>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("submitMSupplierPayment Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("submitMSupplierPayment Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var response = result.getElementsByTagName("iSup:SUBMIT_APPLICATION_RESPONSE");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var registerId = response.item(i).getElementsByTagName("iSup:P_SUPPLIER_REG_ID").item(0).text;
					//	var groupId = response.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0).text;
					//	var dataLevelId = response.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0).text;
					//	var prospect = response.item(i).getElementsByTagName("iSup:IS_PROSPECT").item(0).text;
					var status = response.item(i).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).text;
					var msgCount = response.item(i).getElementsByTagName("iSup:X_MSG_COUNT").item(0).text;
					var msgData = response.item(i).getElementsByTagName("iSup:X_MSG_DATA").item(0).text;
					//	var extension = response.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0).text;

					data.push({
						registerId : registerId,
						status : status,
						msgCount : msgCount,
						msgData : msgData,
					});
				}
			}

			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.checkEmailRegistration = function(emailId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SAVE_FOR_LATER/msupplier_soa_save_for_laterbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SAVE_FOR_LATER/msupplier_soa_save_for_laterbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:REGISTER_EMAIL_ID>';
	message += '<mof:EMAIL_ID>' + emailId + '</mof:EMAIL_ID>';
	message += '</mof:REGISTER_EMAIL_ID>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("checkEmailRegistration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("checkEmailRegistration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var registeredId = rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0).text;
			var mappingId = rootNode.item(0).getElementsByTagName("iSup:MAPPING_ID").item(0).text;
			var status = rootNode.item(0).getElementsByTagName("iSup:RETURN_STATUS").item(0).text;
			var noteToSupplier = rootNode.item(0).getElementsByTagName("iSup:NOTE_TO_SUPPLIER").item(0).text;
			var paymentStatus = rootNode.item(0).getElementsByTagName("iSup:PAYMENT_STATUS").item(0).text;
			var enMsg = rootNode.item(0).getElementsByTagName("iSup:MSG_DATA_ENG").item(0).text;
			var arMsg = rootNode.item(0).getElementsByTagName("iSup:MSG_DATA_AR").item(0).text;

			data = {
				registeredId : registeredId,
				mappingId : mappingId,
				status : status,
				noteToSupplier : noteToSupplier,
				paymentStatus : paymentStatus,
				enMsg : enMsg,
				arMsg : arMsg,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

// Resume Registration...

exports.getFirstStepRegistration = function(registerId, mappingId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_STEP1_GET_SERVICES/msupplier_soa_step1_get_servicesbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_STEP1_GET_SERVICES/msupplier_soa_step1_get_servicesbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:REGISTRATION_REQUEST>';
	message += '<mof:SUPPLIER_REG_ID>' + registerId + '</mof:SUPPLIER_REG_ID>';
	message += '<mof:MAPPING_ID>' + mappingId + '</mof:MAPPING_ID>';
	message += '</mof:REGISTRATION_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getFirstStepRegistration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getFirstStepRegistration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var mappingID = (rootNode.item(0).getElementsByTagName("iSup:P_MAPPING_ID").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:P_MAPPING_ID").item(0).textContent : "";
			var status = (rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent : "";
			var supplierNameAr = (rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_NAME").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_NAME").item(0).textContent : "";
			var supplierNameEn = (rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_NAME_ALT").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_NAME_ALT").item(0).textContent : "";
			var registrationNumber = (rootNode.item(0).getElementsByTagName("iSup:TAX_REGISTRATION_NUMBER").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:TAX_REGISTRATION_NUMBER").item(0).textContent : "";
			var registeredID = (rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0).textContent : "";

			var firstName = (rootNode.item(0).getElementsByTagName("iSup:FIRST_NAME").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:FIRST_NAME").item(0).textContent : "";
			var contactName = (rootNode.item(0).getElementsByTagName("iSup:LAST_NAME").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:LAST_NAME").item(0).textContent : "";
			var emailId = (rootNode.item(0).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0).textContent : "";
			var mobileNo = (rootNode.item(0).getElementsByTagName("iSup:PHONE_NUMBER").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:PHONE_NUMBER").item(0).textContent : "";
			var telPhoneNo = (rootNode.item(0).getElementsByTagName("iSup:PHONE_EXTENSION").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:PHONE_EXTENSION").item(0).textContent : "";
			var contactReqId = (rootNode.item(0).getElementsByTagName("iSup:CONTACT_REQUEST_ID").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:CONTACT_REQUEST_ID").item(0).textContent : "";

			data = {
				mappingID : mappingID,
				status : status,
				supplierNameAr : supplierNameAr,
				supplierNameEn : supplierNameEn,
				registrationNumber : registrationNumber,
				registeredID : registeredID,
				firstName : firstName,
				contactName : contactName,
				emailId : emailId,
				mobileNo : mobileNo,
				telPhoneNo : telPhoneNo,
				contactReqId : contactReqId,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getSecondStepRegistration = function(mappingId, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_STEP2_GET_SERVICES/msupplier_soa_step2_get_services_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_STEP2_GET_SERVICES/msupplier_soa_step2_get_services_bpel_client_ep';

	// Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_get_step2/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:INPUT_STEP2_REQUEST>';
	message += '<mof:MAPPING_ID>' + mappingId + '</mof:MAPPING_ID>';
	message += '</mof:INPUT_STEP2_REQUEST>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getSecondStepRegistration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getSecondStepRegistration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			// Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		var arrAddress = [];
		var arrBank = [];
		var arrContact = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var status = (rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent : "";
			var certificate1 = (rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(0).textContent : "";
			var expDate1 = (rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(0).textContent : "";
			var busReqId1 = (rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(0).textContent : "";
			var certificate2 = (rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(1) != null) ? rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(1).textContent : "";
			var expDate2 = (rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(1) != null) ? rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(1).textContent : "";
			var busReqId2 = (rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(1) != null) ? rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(1).textContent : "";
			var certificate3 = (rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(2) != null) ? rootNode.item(0).getElementsByTagName("iSup:CERTIFICATE_NUMBER").item(2).textContent : "";
			var expDate3 = (rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(2) != null) ? rootNode.item(0).getElementsByTagName("iSup:EXP_DATE").item(2).textContent : "";
			var busReqId3 = (rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(2) != null) ? rootNode.item(0).getElementsByTagName("iSup:BUS_CLASS_REQUEST_ID").item(2).textContent : "";

			var address = result.getElementsByTagName("iSup:ADDRESS_REQUESTS");
			if (address.item(0) != null && address.length > 0) {
				for (var i = 0; i < address.length; i++) {
					var mappingId = (address.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0) != null) ? address.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0).text : "";
					var addressName = (address.item(i).getElementsByTagName("iSup:ADDRESS_NAME").item(0) != null) ? address.item(i).getElementsByTagName("iSup:ADDRESS_NAME").item(0).text : "";
					var addressLine1 = (address.item(i).getElementsByTagName("iSup:ADDRESS_LINE1").item(0) != null) ? address.item(i).getElementsByTagName("iSup:ADDRESS_LINE1").item(0).text : "";
					var addressLine2 = (address.item(i).getElementsByTagName("iSup:ADDRESS_LINE2").item(0) != null) ? address.item(i).getElementsByTagName("iSup:ADDRESS_LINE2").item(0).text : "";
					var emirate = (address.item(i).getElementsByTagName("iSup:EMIRATE").item(0) != null) ? address.item(i).getElementsByTagName("iSup:EMIRATE").item(0).text : "";
					var postalCode = (address.item(i).getElementsByTagName("iSup:POSTAL_CODE").item(0) != null) ? address.item(i).getElementsByTagName("iSup:POSTAL_CODE").item(0).text : "";
					var city = (address.item(i).getElementsByTagName("iSup:CITY").item(0) != null) ? address.item(i).getElementsByTagName("iSup:CITY").item(0).text : "";
					var country = (address.item(i).getElementsByTagName("iSup:COUNTRY").item(0) != null) ? address.item(i).getElementsByTagName("iSup:COUNTRY").item(0).text : "";
					var countryDesc = (address.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0) != null) ? address.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0).text : "";
					/*	var faxAreaCode = response.item(i).getElementsByTagName("iSup:FAX_AREA_CODE").item(0).text;
					 var faxNo = response.item(i).getElementsByTagName("iSup:FAX_NUMBER").item(0).text;
					 var phoneAreaCode = response.item(i).getElementsByTagName("iSup:PHONE_AREA_CODE").item(0).text;
					 var phoneNo = response.item(i).getElementsByTagName("iSup:PHONE_NUMBER").item(0).text;
					 var emailId = response.item(i).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0).text;
					 //	var paymentFactorFlag = response.item(i).getElementsByTagName("iSup:PROVINCE").item(0).text;
					 //	var foreignPaymentFlag = response.item(i).getElementsByTagName("iSup:RFQ_FLAG").item(0).text;
					 //	var startDate = response.item(i).getElementsByTagName("iSup:PAY_FLAG").item(0).text;
					 //	var note = response.item(i).getElementsByTagName("iSup:PUR_FLAG").item(0).text;
					 var addressReqId = response.item(i).getElementsByTagName("iSup:ADDRESS_REQUEST_ID").item(0).text;
					 */
					var addressReqId = (address.item(i).getElementsByTagName("iSup:ADDRESS_REQUEST_ID").item(0) != null) ? address.item(i).getElementsByTagName("iSup:ADDRESS_REQUEST_ID").item(0).text : "";

					arrAddress.push({
						mappingId : mappingId,
						addressName : addressName,
						addressLine1 : addressLine1,
						addressLine2 : addressLine2,
						emirate : emirate,
						postalCode : postalCode,
						city : city,
						country : country,
						countryDesc : countryDesc,
						/*	faxAreaCode : faxAreaCode,
						 faxNo : faxNo,
						 phoneAreaCode : phoneAreaCode,
						 phoneNo : phoneNo,
						 emailId : emailId,*/
						addressReqId : addressReqId,
					});

				}

			}

			var bank = result.getElementsByTagName("iSup:BANK_ACC_REQUESTS");
			if (bank.item(0) != null && bank.length > 0) {
				for (var i = 0; i < bank.length; i++) {

					var mappingId = (bank.item(i).getElementsByTagName("iSup:P_MAPPING_ID").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:P_MAPPING_ID").item(0).text : "";
					var countryDescription = (bank.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:COUNTRY_DESCRIPTION").item(0).text : "";
					var countryCode = (bank.item(i).getElementsByTagName("iSup:COUNTRY_CODE").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:COUNTRY_CODE").item(0).text : "";
					var branchId = (bank.item(i).getElementsByTagName("iSup:BRANCH_ID").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BRANCH_ID").item(0).text : "";
					var bankId = (bank.item(i).getElementsByTagName("iSup:BANK_ID").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BANK_ID").item(0).text : "";
					var bankName = (bank.item(i).getElementsByTagName("iSup:BANK_NAME").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BANK_NAME").item(0).text : "";
					var bankInstitutionType = (bank.item(i).getElementsByTagName("iSup:BANK_INSTITUTION_TYPE").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BANK_INSTITUTION_TYPE").item(0).text : "";
					var branchType = (bank.item(i).getElementsByTagName("iSup:BRANCH_TYPE").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BRANCH_TYPE").item(0).text : "";
					var branchName = (bank.item(i).getElementsByTagName("iSup:BRANCH_NAME").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BRANCH_NAME").item(0).text : "";
					//		var ownerPrimaryFlag = bank.item(i).getElementsByTagName("iSup:OWNER_PRIMARY_FLAG").item(0).text;
					var bankAccName = (bank.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NAME").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NAME").item(0).text : "";
					var bankAccNo = (bank.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NUM").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:BANK_ACCOUNT_NUM").item(0).text : "";
					var currencyDescription = (bank.item(i).getElementsByTagName("iSup:CURRENCY_DESCRIPTION").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:CURRENCY_DESCRIPTION").item(0).text : "";
					var currencyCode = (bank.item(i).getElementsByTagName("iSup:CURRENCY_CODE").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:CURRENCY_CODE").item(0).text : "";
					var iban = (bank.item(i).getElementsByTagName("iSup:IBAN").item(0) != null) ? bank.item(i).getElementsByTagName("iSup:IBAN").item(0).text : "";
					/*	var paymentFactorFlag = bank.item(i).getElementsByTagName("iSup:PAYMENT_FACTOR_FLAG").item(0).text;
					 var foreignPaymentFlag = bank.item(i).getElementsByTagName("iSup:FOREIGN_PAYMENT_USE_FLAG").item(0).text;
					 var startDate = bank.item(i).getElementsByTagName("iSup:START_DATE").item(0).text;
					 var note = bank.item(i).getElementsByTagName("iSup:NOTE").item(0).text;
					 var status = bank.item(i).getElementsByTagName("iSup:STATUS").item(0).text;
					 */
					var bankAccId = bank.item(i).getElementsByTagName("iSup:TEMP_EXT_BANK_ACCT_ID").item(0).text;

					arrBank.push({
						mappingId : mappingId,
						countryDescription : countryDescription,
						countryCode : countryCode,
						branchId : branchId,
						bankId : bankId,
						bankName : bankName,
						bankInstitutionType : bankInstitutionType,
						branchType : branchType,
						branchName : branchName,
						//	ownerPrimaryFlag : ownerPrimaryFlag,
						bankAccName : bankAccName,
						bankAccNo : bankAccNo,
						currencyDescription : currencyDescription,
						currencyCode : currencyCode,
						iban : iban,
						/*	paymentFactorFlag : paymentFactorFlag,
						 foreignPaymentFlag : foreignPaymentFlag,
						 startDate : startDate,
						 note : note,
						 status : status,*/
						bankAccId : bankAccId,
					});
				}

			}

			var contact = result.getElementsByTagName("iSup:CONTACTS_REQUESTS_RESPONSE");
			if (contact.item(0) != null && contact.length > 0) {
				for (var i = 0; i < contact.length; i++) {
					var mappingId = (contact.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:MAPPING_ID").item(0).text : "";
					var contactTitle = (contact.item(i).getElementsByTagName("iSup:CONTACT_TITLE").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:CONTACT_TITLE").item(0).text : "";
					var firstName = (contact.item(i).getElementsByTagName("iSup:FIRST_NAME").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:FIRST_NAME").item(0).text : "";
					var contactName = (contact.item(i).getElementsByTagName("iSup:CONTACT_NAME").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:CONTACT_NAME").item(0).text : "";
					var middleName = (contact.item(i).getElementsByTagName("iSup:MIDDLE_NAME").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:MIDDLE_NAME").item(0).text : "";
					var jobTitle = (contact.item(i).getElementsByTagName("iSup:JOB_TITLE").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:JOB_TITLE").item(0).text : "";
					var emailId = (contact.item(i).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:EMAIL_ADDRESS").item(0).text : "";
					var phoneAreaCode = (contact.item(i).getElementsByTagName("iSup:PHONE_AREA_CODE").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:PHONE_AREA_CODE").item(0).text : "";
					var mobileNumber = (contact.item(i).getElementsByTagName("iSup:MOBILE_NUMBER").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:MOBILE_NUMBER").item(0).text : "";
					var telPhoneNumber = (contact.item(i).getElementsByTagName("iSup:TELEPHONE_NUMBER").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:TELEPHONE_NUMBER").item(0).text : "";
					/*	var faxAreaCode = contact.item(0).getElementsByTagName("iSup:FAX_AREA_CODE").item(0).text;
					 var faxNumber = contact.item(0).getElementsByTagName("iSup:FAX_NUMBER").item(0).text;*/
					var department = (contact.item(i).getElementsByTagName("iSup:DEPARTMENT").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:DEPARTMENT").item(0).text : "";
					var contactId = (contact.item(i).getElementsByTagName("iSup:CONTACT_REQUEST_ID").item(0) != null) ? contact.item(i).getElementsByTagName("iSup:CONTACT_REQUEST_ID").item(0).text : "";

					arrContact.push({
						mappingId : mappingId,
						contactTitle : contactTitle,
						firstName : firstName,
						contactName : contactName,
						middleName : middleName,
						jobTitle : jobTitle,
						emailId : emailId,
						phoneAreaCode : phoneAreaCode,
						mobileNumber : mobileNumber,
						telPhoneNumber : telPhoneNumber,
						/*	faxAreaCode : faxAreaCode,
						 faxNumber : faxNumber,*/
						department : department,
						contactId : contactId,
					});
				}
			}

			data = {
				status : status,
				certificate1 : certificate1,
				expDate1 : (expDate1 == "") ? "" : Alloy.Globals.moment(expDate1).format('YYYY-MM-DD'), //expDate1,
				busReqId1 : busReqId1,
				certificate2 : certificate2,
				expDate2 : (expDate2 == "") ? "" : Alloy.Globals.moment(expDate2).format('YYYY-MM-DD'), //expDate2,
				busReqId2 : busReqId2,
				certificate3 : certificate3,
				expDate3 : (expDate3 == "") ? "" : Alloy.Globals.moment(expDate3).format('YYYY-MM-DD'), //expDate3,
				busReqId3 : busReqId3,
				arrAddress : arrAddress,
				arrBank : arrBank,
				arrContact : arrContact,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		// Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		// Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			// Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.getThirdStepRegistration = function(registeredId, isFromProfile, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GetAdditional_Info_Ext/msupplier_soa_getadditional_info_ext_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GetAdditional_Info_Ext/msupplier_soa_getadditional_info_ext_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/MoF_Application/MSUPPLIER_SOA_GetAdditional_Info_Ext/MSupplier_Soa_GetAdditional_Info_Ext">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:Input_Registrations_request>';
	message += '<mof:P_SUPPLIER_REG_ID>' + registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:COMPANY_ADDITIONAL_INFO>' + "" + '</mof:COMPANY_ADDITIONAL_INFO>';
	message += '<mof:ACTIVITY>' + "" + '</mof:ACTIVITY>';
	message += '<mof:PARTNERS>' + "" + '</mof:PARTNERS>';
	message += '<mof:O_EXTENSION_ID>' + "" + '</mof:O_EXTENSION_ID>';
	message += '</mof:Input_Registrations_request>';

	message += '<mof:IS_PROFILE>' + isFromProfile + '</mof:IS_PROFILE>';
	message += '<mof:IS_LANG>' + lang + '</mof:IS_LANG>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getThirdStepRegistration Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getThirdStepRegistration Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		var arrActivity = [];
		var arrPartners = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var status = (rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0) != null) ? rootNode.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent : "";

			var additionalDetails = result.getElementsByTagName("iSup:Comp_ElementRec");
			var legalEntity = (additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR1").item(0) != null) ? additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR1").item(0).textContent : "";
			var generalDirector = (additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR2").item(0) != null) ? additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR2").item(0).textContent : "";
			var directorName = (additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR3").item(0) != null) ? additionalDetails.item(0).getElementsByTagName("iSup:C_EXT_ATTR3").item(0).textContent : "";

			var activityData = result.getElementsByTagName("iSup:Actity_ElementRec");
			if (activityData.item(0) != null && activityData.length > 0) {
				for (var i = 0; i < activityData.length; i++) {
					var groupId = (activityData.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0) != null) ? activityData.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0).text : "";
					var levelId = (activityData.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0) != null) ? activityData.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0).text : "";
					var title = (activityData.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0) != null) ? activityData.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0).text : "";
					var code = (activityData.item(i).getElementsByTagName("iSup:CLASSIFICATION_CODE").item(0) != null) ? activityData.item(i).getElementsByTagName("iSup:CLASSIFICATION_CODE").item(0).text : "";
					var extension = (activityData.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0) != null) ? activityData.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0).text : "";

					arrActivity.push({
						groupId : groupId,
						levelId : levelId,
						title : title,
						code : code,
						extension : extension,
					});

				}
			}

			var partnerData = result.getElementsByTagName("iSup:Partner_ElementRec");
			if (partnerData.length > 0) {
				for (var i = 0; i < partnerData.length; i++) {

					var registerId = (partnerData.item(i).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:SUPPLIER_REG_ID").item(0).text : "";
					//	var groupId = response.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0).text : "";
					//	var dataLevelId = response.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0).text : "";
					//	var prospect = response.item(i).getElementsByTagName("iSup:IS_PROSPECT").item(0).text : "";
					var ownerName = (partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0).text : "";
					var nationality = (partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR2").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR2").item(0).text : "";
					var citizen = (partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR4").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:C_EXT_ATTR4").item(0).text : "";
					var partnership = (partnerData.item(i).getElementsByTagName("iSup:N_EXT_ATTR3").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:N_EXT_ATTR3").item(0).text : "";
					var extension = (partnerData.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0) != null) ? partnerData.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0).text : "";

					arrPartners.push({
						legalEntity : legalEntity,
						ownerName : ownerName,
						nationality : nationality,
						citizen : citizen,
						partnership : partnership,
						extension : extension,
					});
				}

			}

			data = {
				status : status,
				legalEntity : legalEntity,
				generalDirector : generalDirector,
				directorName : directorName,
				arrActivity : arrActivity,
				arrPartners : arrPartners,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

function getBodyEnvelop_DeviceTokenInfo(objDeviceToken) {
	var param = ["sch:TokenCode", "sch:EmailID", "sch:CreatedDate", "sch:LastUpdatedDate", "sch:Status", "sch:RoleType", "sch:GroupType"];
	var values = [objDeviceToken.tokenCode, objDeviceToken.emailId, objDeviceToken.createdDate, objDeviceToken.lastUpdatedDate, objDeviceToken.status, objDeviceToken.roleType, objDeviceToken.groupType];

	var bodyMessage = "";

	for (var i = 0; i < param.length; i++) {
		bodyMessage += "<" + param[i] + ">" + values[i] + "</" + param[i] + ">";
	}
	return bodyMessage;
}

exports.getDeviceTokenInfo = function(objDeviceToken, serviceCode, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/G2C_TOKEN_SERVICE/g2c_token_service_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/G2C_TOKEN_SERVICE/g2c_token_service_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:sch="http://ValidateUserToken/soa/xsd/schema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<sch:ValidateUserTokenInputMessage>';
	message += '<sch:AuthenticationTokenInpRecord>';
	message += getBodyEnvelop_DeviceTokenInfo(objDeviceToken);
	message += '</sch:AuthenticationTokenInpRecord>';
	message += '<sch:ServiceID>' + 120 + '</sch:ServiceID>';
	message += '</sch:ValidateUserTokenInputMessage>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get Device Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Device Token Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("mof:AuthenticationTokenOutRecord");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {

			var status = rootNode.item(0).getElementsByTagName("mof:Status").item(0).textContent;

			if (status == "Expired" || status == "InActive") {
				if (serviceCode == 1) {
					Ti.App.Properties.setInt("isLoggedIn_mSupplier", false);
				} else if (serviceCode == 2) {
					Ti.App.Properties.setInt("isLoggedIn_VatTax", false);
				}
			}

			callBackFunction();
		} else {
			callBackFunction();
		}

		Alloy.Globals.hideLoading();

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getAllSecurityQuestion = function(callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	// prodcution url yet to be put
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/G2C_TOKEN_SERVICE/g2c_token_service_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'MoF_G2C_App/Get_All_SecurityQuestions/getall_securityquestions_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:get="http://xmlns.oracle.com/pcbpel/adapter/db/GetAll_SecurityQuestions" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<get:GetAll_SecurityQuestionsInput>';
	message += '<get:AnyValue>' + "abc" + '</get:AnyValue>';
	message += '</get:GetAll_SecurityQuestionsInput>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get All Security Question Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get All Security Question Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("GetAll_SecurityQuestionsOutputCollection");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {

			var questionList = result.getElementsByTagName("mof:GetAll_SecurityQuestionsOutput");
			var arrQuestionList = [];
			for (var i = 0,
			    length = questionList.length; i < length; i++) {
				arrQuestionList.push({
					id : questionList.item(i).getElementsByTagName("mof:ID").item(0).textContent,
					questionAr : questionList.item(i).getElementsByTagName("mof:QuestionAR").item(0).textContent,
					questionEn : questionList.item(i).getElementsByTagName("mof:QuestionEN").item(0).textContent,
					answer : ""
				});
			}
			callBackFunction(arrQuestionList);
		} else {
			callBackFunction([]);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getServiceDescription = function(code, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}
	// prodcution url yet to be put
	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/G2C_TOKEN_SERVICE/g2c_token_service_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'default/SERVICE_DESCRIPTION/service_description_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:exam="http://www.example.org" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<exam:SERVICE_CODE_INPUT>';
	message += '<exam:SERVICE_CODE>' + code + '</exam:SERVICE_CODE>';
	message += '<exam:AnyValue></exam:AnyValue>';
	message += '</exam:SERVICE_CODE_INPUT>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Get service Description Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Get Service description Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}
		Ti.API.info("Get Service description Response = " + result);
		var rootNode = result.getElementsByTagName("SERVICE_DESC_OUTPUT");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {

			var objServiceDesc = {
				stepsAr : result.getElementsByTagName("mof:STEPS_AR").item(0).textContent,
				stepsEn : result.getElementsByTagName("mof:STEPS_EN").item(0).textContent,
				descriptionAr : result.getElementsByTagName("mof:DESCRIPTION_AR").item(0).textContent,
				descriptionEn : result.getElementsByTagName("mof:DESCRIPTION_EN").item(0).textContent,
				serviceNameAr : result.getElementsByTagName("mof:SERVICE_NAME_AR").item(0).textContent,
				serviceNameEn : result.getElementsByTagName("mof:SERVICE_NAME_EN").item(0).textContent
			};
			callBackFunction(objServiceDesc);
		} else {
			callBackFunction(null);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

function questionAnwerList(arr) {
	var message = "";
	for (var i = 0; i < arr.length; i++) {
		message += "<vatx:QuestionRec>";
		message += "<vatx:QuestionId>" + arr[i].questionId + "</vatx:QuestionId>";
		message += "<vatx:Answer>" + arr[i].answer + "</vatx:Answer>";
		message += "</vatx:QuestionRec>";
	}
	return message;
}

exports.submitLoginAnswer = function(obj, password, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//Production Url panding

	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MoF_ValidateSecurityQuestion/validatesecurityquestionbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'VATAndTAX/MoF_ValidateSecurityQuestion/validatesecurityquestionbpel_client_ep';

	Alloy.Globals.showModelLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vatx="http://xmlns.oracle.com/VATAndTAX_System/MoF_ValidateSecurityQuestion/ValidateSecurityQuestionBPEL">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<vatx:process>';
	message += '<vatx:username>' + obj.userName + '</vatx:username>';
	message += '<vatx:TypeOfService>' + obj.typeOfService + '</vatx:TypeOfService>';
	message += '<vatx:QuestionsList>';
	message += questionAnwerList(obj.arrQuestion);
	message += '</vatx:QuestionsList>';
	message += '</vatx:process>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Submit Question Answer Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Submit Question Answer Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
		}

		var rootNode = result.getElementsByTagName("processResponse");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideModelLoading();
				Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
				return;
			}
			var serviceDescription = "";
			if (Alloy.Globals.isEnglish)
				serviceDescription = result.getElementsByTagName("vatx:Desc_EN").item(0).textContent;
			else
				serviceDescription = result.getElementsByTagName("vatx:Desc_AR").item(0).textContent;

			if (result.getElementsByTagName("vatx:Status").item(0).textContent != "Success") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.login, serviceDescription);
				Alloy.Globals.hideModelLoading();
				callBackFunction(null);
			} else {

				var tokenAuth = result.getElementsByTagName("vatx:AuthenticationTokenRecord").item(0);
				var tokenOject = {
					tokenCode : tokenAuth.getElementsByTagName("vatx:TokenCode").item(0).textContent,
					status : result.getElementsByTagName("vatx:Status").item(0).textContent,
					description_EN : result.getElementsByTagName("vatx:Desc_EN").item(0).textContent,
					description_AR : result.getElementsByTagName("vatx:Desc_AR").item(0).textContent,
					emailId : tokenAuth.getElementsByTagName("vatx:EmailID").item(0).textContent,
					createdDate : tokenAuth.getElementsByTagName("vatx:CreatedDate").item(0).textContent,
					lastUpdatedDate : tokenAuth.getElementsByTagName("vatx:LastUpdatedDate").item(0).textContent,
					tokenStatus : tokenAuth.getElementsByTagName("vatx:Status").item(0).textContent,
					roleType : tokenAuth.getElementsByTagName("vatx:RoleType").item(0).textContent,
					groupType : tokenAuth.getElementsByTagName("vatx:GroupType").item(0).textContent,
				};

				var userInfo = result.getElementsByTagName("vatx:VTAXProfile").item(0);
				var userInfoObject = {
					id : userInfo.getElementsByTagName("vatx:Id").item(0).textContent,
					address : userInfo.getElementsByTagName("vatx:Address").item(0).textContent,
					email : userInfo.getElementsByTagName("vatx:Email").item(0).textContent,
					faxNumber : userInfo.getElementsByTagName("vatx:FaxNumber").item(0).textContent,
					fullName : userInfo.getElementsByTagName("vatx:FullName").item(0).textContent,
					mobileNumber : userInfo.getElementsByTagName("vatx:MobileNumber").item(0).textContent,
					pOBox : userInfo.getElementsByTagName("vatx:POBox").item(0).textContent,
					phoneNumber : userInfo.getElementsByTagName("vatx:PhoneNumber").item(0).textContent,
					userID : userInfo.getElementsByTagName("vatx:UserID").item(0).textContent,
					userName : userInfo.getElementsByTagName("vatx:UserName").item(0).textContent,
					userTypeId : userInfo.getElementsByTagName("vatx:UserTypeId").item(0).textContent,
					password : password
				};

				var login = {
					tokenDetails : tokenOject,
					userInfo : userInfoObject
				};
				Ti.API.info('User info object  ==>> ' + JSON.stringify(login));

				Alloy.Globals.hideModelLoading();
				callBackFunction(login);
			}

		} else {
			callBackFunction(null);
			Alloy.Globals.hideModelLoading();
		}

	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideModelLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideModelLoading();
			Alloy.Globals.ShowAlert(selectedLanguage.error, selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

function getSecurityQuestionTagISupp(registerId, emailAddress, arrQuestion) {
	var message = "";
	for (var i = 0; i < arrQuestion.length; i++) {
		/*if (arrQuestion[i].answer.length == 0) {
		 continue;
		 }*/
		message += "<mof:UpdateSecurityAnswers>";
		//	message += '<mof:REG_ID>' + registerId + '</mof:REG_ID>';
		message += '<mof:Answer>' + arrQuestion[i].answer + '</mof:Answer>';
		message += '<mof:QuestionID>' + arrQuestion[i].id + '</mof:QuestionID>';
		//	message += '<mof:UserName>' + emailAddress + '</mof:UserName>';
		message += "</mof:UpdateSecurityAnswers>";
	}
	return message;
}

exports.IsuppSecurityAnsSubmit = function(registerId, emailAddress, arrquestionList, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Ti.API.info('arrquestionList' + JSON.stringify(arrquestionList));

	//check once in Production url

	var url = "";
	/*	if (Alloy.Globals.isProduction)
	 url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSupplier_Sequrity_QandA/msupplier_reg_questions_answersbpel_client_ep';
	 else
	 url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSupplier_Sequrity_QandA/msupplier_reg_questions_answersbpel_client_ep';
	 */

	url = "http://194.170.30.187:7777/soa-infra/services/TEST/MSupplier_Sequrity_QandA/msupplier_reg_questions_answersbpel_client_ep";

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SEQURITY_QUESTIONS_ANS>';
	message += '<mof:REG_ID>' + registerId + '</mof:REG_ID>';
	message += '<mof:Answer>' + "" + '</mof:Answer>';
	message += '<mof:QuestionID>' + "" + '</mof:QuestionID>';
	message += '<mof:UserName>' + emailAddress + '</mof:UserName>';
	message += '<mof:UpdateSecuirtyAnswersList>';
	message += getSecurityQuestionTagISupp(registerId, emailAddress, arrquestionList);
	message += '</mof:UpdateSecuirtyAnswersList>';
	message += '</mof:SEQURITY_QUESTIONS_ANS>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("Submit Isupplier Question Answer Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("Submit Isupplier Question Answer Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}
			var responseObj = {
				registerType : result.getElementsByTagName("REGISTRATION_TYPE").item(0).textContent,
				registerStatus : result.getElementsByTagName("REGISTRATION_STATUS").item(0).textContent,
			};
			callBackFunction(responseObj);

		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getSecurityAnswerForMSupplier = function(emailAddress, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	//check once in Production url

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_Get_SecurityAnswers/msupplier_soa_getsecurityanswers_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_Get_SecurityAnswers/msupplier_soa_getsecurityanswers_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);

	var message = '<soapenv:Envelope xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_get_step2/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:Get_Security_Answers>';
	message += '<mof:MAPPING_ID>' + "" + '</mof:MAPPING_ID>';
	message += '<mof:SUPPLIER_RED_ID>' + "" + '</mof:SUPPLIER_RED_ID>';
	message += '<mof:UserName>' + emailAddress + '</mof:UserName>';
	message += '<mof:QuestionID>' + "" + '</mof:QuestionID>';
	message += '<mof:Answer>' + "" + '</mof:Answer>';
	message += '</mof:Get_Security_Answers>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getSecurityAnswerForMSupplier Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 15000;

	request.onload = function(e) {
		currentAttempt = 0;
		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getSecurityAnswerForMSupplier Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
		}

		var data;
		var rootNode = result.getElementsByTagName("OutputParameters");

		Ti.API.info('RootNode ==>> ' + rootNode.item.length);

		if (rootNode.length > 0) {

			var status = result.getElementsByTagName("iSup:REGISTRATION_STATUS").item(0).textContent;

			var answerList = result.getElementsByTagName("iSup:Get_SecurityAnswers");
			var arrQuestionAnswer = [];
			for (var i = 0,
			    length = answerList.length; i < length; i++) {
				arrQuestionAnswer.push({
					id : answerList.item(i).getElementsByTagName("iSup:QuestionID").item(0).textContent,
					answer : answerList.item(i).getElementsByTagName("iSup:Answer").item(0).textContent,
					username : answerList.item(i).getElementsByTagName("iSup:UserName").item(0).textContent,
				});
			}

			data = {
				status : status,
				arrData : arrQuestionAnswer,
			};

			callBackFunction(data);
		} else {
			callBackFunction(null);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

exports.getParticularMSupplierActivityList = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_GET_ACTIVITIES/msupplier_soa_get_activitiesbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_GET_ACTIVITIES/msupplier_soa_get_activitiesbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/MoF_Application/MSUPPLIER_SOA_GetAdditional_Info_Ext/MSupplier_Soa_GetAdditional_Info_Ext">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:Input_Registrations_request>';
	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:O_EXTENSION_ID>' + "" + '</mof:O_EXTENSION_ID>';
	message += '</mof:Input_Registrations_request>';
	message += '<mof:IS_PROFILE>' + obj.isProfile + '</mof:IS_PROFILE>';
	message += '<mof:IS_LANG>' + obj.lang + '</mof:IS_LANG>';

	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("getParticularMSupplierActivityList Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("getParticularMSupplierActivityList Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data = [];
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction([]);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var resgisterId = result.getElementsByTagName("iSup:P_SUPPLIER_REG_ID").item(0).textContent;
			var status = result.getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;

			var response = result.getElementsByTagName("iSup:Actity_ElementRec");
			if (response.length > 0) {

				for (var i = 0; i < response.length; i++) {

					var groupId = response.item(i).getElementsByTagName("iSup:ATTR_GROUP_ID").item(0).text;
					var levelId = response.item(i).getElementsByTagName("iSup:DATA_LEVEL_ID").item(0).text;
					var title = response.item(i).getElementsByTagName("iSup:C_EXT_ATTR1").item(0).text;
					var code = response.item(i).getElementsByTagName("iSup:CLASSIFICATION_CODE").item(0).text;
					var extension = response.item(i).getElementsByTagName("iSup:EXTENSION_ID").item(0).text;

					data.push({
						groupId : groupId,
						levelId : levelId,
						title : title,
						code : code,
						extension : extension,
					});
				}
			}
			callBackFunction(data);
		} else {
			callBackFunction([]);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction([]);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.addParticularMSupplierActivity = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Ti.API.info('obj====' + JSON.stringify(obj));

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_ACTIVITIES/msupplier_soa_activities_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_ACTIVITIES/msupplier_soa_activities_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:Input_Registrations_request>';
	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:ActivityRec>';
	message += '<mof:P_C_EXT_ATTR1>' + obj.title + '</mof:P_C_EXT_ATTR1>';
	message += '<mof:P_C_EXT_ATTR2>' + "" + '</mof:P_C_EXT_ATTR2>';
	message += '<mof:P_C_EXT_ATTR3>' + "" + '</mof:P_C_EXT_ATTR3>';
	message += '<mof:P_C_EXT_ATTR4>' + "" + '</mof:P_C_EXT_ATTR4>';
	message += '<mof:P_N_EXT_ATTR3>' + "" + '</mof:P_N_EXT_ATTR3>';
	message += '<mof:O_EXTENSION_ID>' + obj.extensionId + '</mof:O_EXTENSION_ID>';
	message += '</mof:ActivityRec>';
	message += '<mof:IS_PROFILE>' + obj.isProfile + '</mof:IS_PROFILE>';
	message += '<mof:IS_LANG>' + obj.lang + '</mof:IS_LANG>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("addParticularMSupplierActivity Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("addParticularMSupplierActivity Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var response = result.getElementsByTagName("iSup:ActivityRec");
			if (response.length > 0) {

				var extensionId = response.item(0).getElementsByTagName("iSup:O_EXTENSION_ID").item(0).text;
				var status = response.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).text;
				var msg = response.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).text;

				data = {
					extensionId : extensionId,
					status : status,
					msg : msg,
				};
			}
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.deleteParticularMSupplierActivity = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	Ti.API.info('obj====' + JSON.stringify(obj));

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_ACTIVITIES/msupplier_soa_activities_bpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_ACTIVITIES/msupplier_soa_activities_bpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';

	message += '<mof:Input_Registrations_request>';
	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registeredId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:ActivityRec>';
	message += '<mof:P_C_EXT_ATTR1>' + obj.title + '</mof:P_C_EXT_ATTR1>';
	message += '<mof:P_C_EXT_ATTR2>' + "" + '</mof:P_C_EXT_ATTR2>';
	message += '<mof:P_C_EXT_ATTR3>' + "" + '</mof:P_C_EXT_ATTR3>';
	message += '<mof:P_C_EXT_ATTR4>' + "" + '</mof:P_C_EXT_ATTR4>';
	message += '<mof:P_N_EXT_ATTR3>' + "" + '</mof:P_N_EXT_ATTR3>';
	message += '<mof:O_EXTENSION_ID>' + obj.extensionId + '</mof:O_EXTENSION_ID>';
	message += '</mof:ActivityRec>';
	message += '<mof:IS_PROFILE>' + obj.isProfile + '</mof:IS_PROFILE>';
	message += '<mof:IS_LANG>' + obj.lang + '</mof:IS_LANG>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("deleteParticularMSupplierActivity Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;

	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("deleteParticularMSupplierActivity Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction([]);
			Alloy.Globals.hideLoading();
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		var data;
		if (rootNode.length > 0) {
			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var response = result.getElementsByTagName("iSup:ActivityRec");
			if (response.length > 0) {

				var extensionId = response.item(0).getElementsByTagName("iSup:O_EXTENSION_ID").item(0).text;
				var status = response.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).text;
				var msg = response.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).text;

				data = {
					extensionId : extensionId,
					status : status,
					msg : msg,
				};
			}
			callBackFunction(data);
		} else {
			callBackFunction(null);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.noRecordFound);
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	request.send(message);
};

exports.deleteMSupplierPartnersDetails = function(obj, callBackFunction) {
	if (hasConnection() == false) {
		return;
	}

	var lang = (Alloy.Globals.isEnglish) ? "ENG" : "";

	var url = "";
	if (Alloy.Globals.isProduction)
		url = Alloy.Globals.SOAProductionDomainServiceUrl + 'MoF_G2B_App/MSUPPLIER_SOA_PARTNERS/msupplier_soa_partnersbpel_client_ep';
	else
		url = Alloy.Globals.SOADomainServiceUrl + 'iSupplier_System/MSUPPLIER_SOA_PARTNERS/msupplier_soa_partnersbpel_client_ep';

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var message = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mof="http://xmlns.oracle.com/SOA/soaprovider/mof_supplier_registrations/">';
	message += getHeaderEnvelop();
	message += '<soapenv:Body>';
	message += '<mof:InputParameters>';
	message += '<mof:SOAP_Headers>';
	message += '<mof:Responsibility>' + "SYSTEM_ADMINISTRATOR" + '</mof:Responsibility>';
	message += '<mof:RespApplication>' + "SYSADMIN" + '</mof:RespApplication>';
	message += '<mof:SecurityGroup>' + "STANDARD" + '</mof:SecurityGroup>';
	message += '<mof:NLSLanguage>' + "AMERICAN" + '</mof:NLSLanguage>';
	message += '<mof:Org_Id>' + "6135" + '</mof:Org_Id>';
	message += '</mof:SOAP_Headers>';
	message += '<mof:Input_Registrations_request>';

	message += '<mof:P_SUPPLIER_REG_ID>' + obj.registerId + '</mof:P_SUPPLIER_REG_ID>';
	message += '<mof:P_ACTION>' + obj.action + '</mof:P_ACTION>';
	message += '<mof:O_EXTENSION_ID>' + obj.extension + '</mof:O_EXTENSION_ID>';
	message += '<mof:PartnersRec>';

	message += '<mof:P_C_EXT_ATTR1>' + obj.ownerName + '</mof:P_C_EXT_ATTR1>';
	message += '<mof:P_C_EXT_ATTR2>' + obj.nationality + '</mof:P_C_EXT_ATTR2>';
	message += '<mof:P_C_EXT_ATTR4>' + obj.citizenPartner + '</mof:P_C_EXT_ATTR4>';
	message += '<mof:P_N_EXT_ATTR3>' + obj.partnership + '</mof:P_N_EXT_ATTR3>';

	message += '</mof:PartnersRec>';
	message += '<mof:IS_LANG>' + lang + '</mof:IS_LANG>';

	message += '</mof:Input_Registrations_request>';
	message += '</mof:InputParameters>';
	message += '</soapenv:Body></soapenv:Envelope>';

	Ti.API.info("deleteMSupplierPartnersDetails Envelope = " + message);

	var request = Titanium.Network.createHTTPClient();

	request.timeout = 30000;
	request.onload = function(e) {

		var responseText = getXMLFormate(this.responseText);
		Ti.API.info("deleteMSupplierPartnersDetails Response = " + responseText);

		var result;
		try {
			result = Ti.XML.parseString(responseText);
		} catch(e) {
			callBackFunction(null);
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
		}

		var rootNode = result.getElementsByTagName("OutputParameters");

		if (rootNode.length > 0) {

			var error = rootNode.item(0).getElementsByTagName("Error_message");
			if (error.length > 0) {
				callBackFunction(null);
				Alloy.Globals.hideLoading();
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
				return;
			}

			var data;
			var classification = result.getElementsByTagName("iSup:PartnersRec");
			if (classification.length > 0) {

				var extensionId = classification.item(0).getElementsByTagName("iSup:O_EXTENSION_ID").item(0).textContent;
				var status = classification.item(0).getElementsByTagName("iSup:X_RETURN_STATUS").item(0).textContent;
				var msg = classification.item(0).getElementsByTagName("iSup:X_MSG_DATA").item(0).textContent;

			}

			data = {
				extensionId : extensionId,
				status : status,
				msg : msg,
			};

			callBackFunction(data);

		} else {
			callBackFunction(null);
			//    Alloy.Globals.ShowAlert("No Records found.");
		}
		Alloy.Globals.hideLoading();
	};
	request.onerror = function(e) {
		Titanium.API.error('Status: ' + this.status);
		Titanium.API.error('ResponseText: ' + this.responseText);
		Titanium.API.error('connectionType: ' + this.connectionType);
		Titanium.API.error('location: ' + this.location);

		Alloy.Globals.hideLoading();

		callBackFunction(null);

		if (request.status != 200) {
			Alloy.Globals.hideLoading();
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.error, Alloy.Globals.selectedLanguage.serviceError);
			return;
		}
	};
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	//    request.setRequestHeader('SOAPAction', soapAction);
	request.send(message);
};

