var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	//	$.winHome.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winRegistration.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	$.winRegistration.close({
		animate : true
	});
}

function doRegister() {

	httpManager.userRegistration($.txtEmail.value.trim(), $.txtEmployeeId.value.trim(), "09", function(e) {
		alert(e);

		if (e.statusCode == "Success") {

			Ti.App.Properties.setString("emailID", e.emailId);
			Ti.App.Properties.setInt("employeeID", e.employeeId);
			
			Ti.App.Properties.setString("isEmailVerified", "Register");

			$.backView.visible = true;
			$.OTPView.visible = true;
		} else {
			alert(e.statusCode);
		}

	});

}

function doSubmitOTPCode() {

	httpManager.verifyEmail(Ti.App.Properties.getString("emailID"), $.txtOTP.value, "09", Ti.App.Properties.getInt("employeeID"), function(e) {

		if (e.operationStatus == "Success") {
			alert(e.description);

			Ti.App.Properties.setString("isEmailVerified", "Verified");

			closeWindow();
		} else {
			alert(e.description);
		}

	});
}

function changeLanguage() {

	var isVerified = Ti.App.Properties.getString("isEmailVerified");
	
	if (isVerified == "Register") {
		$.backView.visible = true;
		$.OTPView.visible = true;
	}

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.register;
	//	$.lblName.text = Alloy.Globals.selectedLanguage.name;
	$.lblFederal.text = Alloy.Globals.selectedLanguage.federalEntity;
	//	$.lblDepartment.text = Alloy.Globals.selectedLanguage.department;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.email;
	$.lblEmployeeId.text = Alloy.Globals.selectedLanguage.emloyeeId;
	//	$.lblNationalId.text = Alloy.Globals.selectedLanguage.nationalIdCard;
	$.txtOTP.hintText = Alloy.Globals.selectedLanguage.otpCode;
	$.lblRegister.text = Alloy.Globals.selectedLanguage.register;
	$.lblSubmit.text = Alloy.Globals.selectedLanguage.submit;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgArrowFederal.backgroundImage = /*$.imgArrowDepartment.backgroundImage = */
		Alloy.Globals.path.icnArrowBrownRight;

		$.txtFederal.left = /*$.txtDepartment.left = */10;
		$.txtFederal.right = /*$.txtDepartment.right = */30;

		$.imgArrowFederal.right = /*$.imgArrowDepartment.right = */5;
		$.imgArrowFederal.left = /*$.imgArrowDepartment.left = */undefined;

		//	/*$.lblName.textAlign = */$.lblFederal.textAlign = /*$.lblDepartment.textAlign = */$.lblEmail.textAlign = $.lblEmployeeId.textAlign = /*$.lblNationalId.textAlign = */alignment;
		//	/*$.txtFldName.textAlign = */$.txtFederal.textAlign = /*$.txtDepartment.textAlign = */$.txtEmail.textAlign = $.txtEmployeeId.textAlign = $.txtOTP.textAlign = /*$.txtNationalId.textAlign = */alignment;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.imgArrowFederal.backgroundImage = /*$.imgArrowDepartment.backgroundImage = */
		Alloy.Globals.path.icnArrowBrownLeft;

		$.txtFederal.right = /*$.txtDepartment.right = */10;
		$.txtFederal.left = /*$.txtDepartment.left = */30;

		$.imgArrowFederal.left = /*$.imgArrowDepartment.left =*/5;
		$.imgArrowFederal.right = /*$.imgArrowDepartment.right = */undefined;

		//	/*$.lblName.textAlign = */$.lblFederal.textAlign = /*$.lblDepartment.textAlign = */$.lblEmail.textAlign = $.lblEmployeeId.textAlign = /*$.lblNationalId.textAlign = */alignment;
		//	/*$.txtFldName.textAlign = */$.txtFederal.textAlign = /*$.txtDepartment.textAlign = */$.txtEmail.textAlign = $.txtEmployeeId.textAlign = $.txtOTP.textAlign = /* $.txtNationalId.textAlign = */alignment;
	}
	/*$.lblName.textAlign = */
	$.lblFederal.textAlign = /*$.lblDepartment.textAlign = */
	$.lblEmail.textAlign = $.lblEmployeeId.textAlign = /*$.lblNationalId.textAlign = */alignment;
	/*$.txtFldName.textAlign = */
	$.txtFederal.textAlign = /*$.txtDepartment.textAlign = */
	$.txtEmail.textAlign = $.txtEmployeeId.textAlign = $.txtOTP.textAlign = /* $.txtNationalId.textAlign = */alignment;
}

changeLanguage();
