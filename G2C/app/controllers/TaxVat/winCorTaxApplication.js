/*
 *
 * VAT Corporate
 */

var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
var userTypeId = userInfo.userTypeId;

var appId = -1;
var args = arguments[0] || {};
var httpManager = require("httpManager");
var serviceDescription = null;

var htmlContent = "";
var htmlContent = "",
    htmlStep = "";
if (Alloy.Globals.VATTAXisEnglish) {
	htmlContent += '<h1>What is the Value Added Tax (VAT) Certificate?</h1><p>It is a certificate issued for institutions or individuals to exempt them from value added tax in various countries, regardless of the existence of an agreement.</p>';
	htmlContent += '<h1>COMPANIES</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Request Letter From the company</li><li>Trade License</li>';
	htmlContent += '</ol><h2>Fees:</h2><p>500 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div>';

	htmlStep += '<h1>Service Request</h1><ol><li>Create a new account</li><li>Fill all required fields and attach required documents</li><li>Submit the Request</li>';
	htmlStep += '<li>Review and Approve the Request</li><li>Pay the fees through e-Dirham Card</li><li>Send the Certificate to the user via Currier</li></ol><h1>Responsible Department</h1>';
	htmlStep += '<p>Customer Services Center</p><h1>Processing Duration</h1><p>3 days</p>';
} else {
	htmlContent += '<h1>ما هي شـهادة القيمة المضافة؟</h1><p>هي شهادة تصدر للشركات أو الأفراد للإعفاءات من ضرائب القيمة المضافة في مختلف الدول بغض النظر عن وجود اتفاقية من عدمه.</p><h1>للشـركات</h1>';
	htmlContent += '<div class="certDetails"><h2 class="redPadd">الوثائق المطلوبة:</h2><ol><li>رسالة طلب شهادة من الشركة</li><li>الرخصة التجارية</li></ol><h2>رسـوم الإصـدار:</h2><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p>';
	htmlContent += '</div><h1>للأفـراد</h1><div class="certDetails"><h2 class="redPadd">الوثائق المطلوبة:</h2><ol><li>صورة جواز السفر + إقامة سارية المفعول</li><li>رسالة طلب شهادة موقعة من الشخص</li>';
	htmlContent += '</ol><h2>رسـوم الإصـدار:</h2><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div>';

	htmlStep += '<h1>خـطوات تنفـيذ الخـدمة</h1><ol><li>فتح حساب للمتعامل</li><li>تعبئة كافة البيانات المطلوبة وإرفاق الوثائق الضرورية</li><li>إرسال طلب إصدار الشهادة</li><li>مراجعة واعتماد طلب الإصدار</li><li>دفع الرسوم ببطاقة الدرهم الالكتروني</li>';
	htmlStep += '<li>إرسال الشهادة بالبريد للمتعامل</li></ol><h1>الإدارة المسـؤولة</h1><p>إدارة العلاقات المالية الاقليمية والدولية</p><h1>الجـهة المسـتفيدة من الخـدمة</h1><p>قطاع خاص / الشركات / الأفراد / الهيئات</p><h1>زمن تقديم الخـدمة</h1><p>3 أيام</p>';
}

//Alloy.createController('common/httpManager');
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}
var colorCode;
if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}

function cancelTaxForm() {
	var win = Alloy.createController("TaxVat/winVatTaxWeb", {
		callBack : closeWindow,
	}).getView();
	Alloy.Globals.openWindow(win);
}

var alignment = "";
function changeLanguage() {

	$.txtEmail.editable = false;
	$.txtEmail.value = userInfo.email;

	$.lblNavTitle.text = Alloy.Globals.VTaxSelectedLanguage.vatApplication;
	$.lblApplicationDetail.text = Alloy.Globals.VTaxSelectedLanguage.applicationDetail;

	// $.lblCertificateType.text = "Certificate Type";
	$.lblCertificateDMethod.text = Alloy.Globals.VTaxSelectedLanguage.certificateDelivery;
	$.lblFinancialYear.text = Alloy.Globals.VTaxSelectedLanguage.financialYear;
	$.txtFinancialYear.value = Alloy.Globals.moment().format("YYYY-MM-DD");
	$.lblCompanyName.text = Alloy.Globals.VTaxSelectedLanguage.companyName;
	$.lblChamberOfCom.text = Alloy.Globals.VTaxSelectedLanguage.chamberOfCommerce;
	$.lblLicenseNo.text = Alloy.Globals.VTaxSelectedLanguage.tradeLicenseNo;
	$.lblEmirate.text = Alloy.Globals.VTaxSelectedLanguage.emirate;
	$.lblAddress.text = Alloy.Globals.VTaxSelectedLanguage.address;
	$.lblMobileNo.text = Alloy.Globals.VTaxSelectedLanguage.mobileNoNormal;
	// $.lblSecondaryMNo.text = Alloy.Globals.VTaxSelectedLanguage.seconadryMobile;
	$.lblPhoneNo.text = Alloy.Globals.VTaxSelectedLanguage.telNo;
	$.lblFaxNo.text = Alloy.Globals.VTaxSelectedLanguage.faxNo;
	$.lblPOBox.text = Alloy.Globals.VTaxSelectedLanguage.POBox;
	$.lblEmail.text = Alloy.Globals.VTaxSelectedLanguage.emailTitle;
	$.lblCountryIssued.text = Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor;
	$.lblPlaceOfIssuing.text = Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate;
	$.lblcLanguage.text = Alloy.Globals.VTaxSelectedLanguage.certificateLanguage;
	$.lblNatureOfBusiness.text = Alloy.Globals.VTaxSelectedLanguage.natureOfBusiness;
	$.lblAttachment.text = Alloy.Globals.VTaxSelectedLanguage.attachments;

	$.lblTradeLicense.text = Alloy.Globals.VTaxSelectedLanguage.validTradeLicense;
	$.lblSignedLetter.text = Alloy.Globals.VTaxSelectedLanguage.signedLetter;
	$.lblOfficialLetter.text = "Official Letter";
	$.lblEstablishment.text = "Establishment";
	$.lblAuditCopy.text = Alloy.Globals.VTaxSelectedLanguage.copyAuditFinancialAccounts;
	$.lblLeaseCopy.text = Alloy.Globals.VTaxSelectedLanguage.leaseCopy;

	// $.txtMobileNo.hintText = $.txtPhoneNo.hintText = $.txtFaxNo.hintText = "971xxxxxxxxx";
	$.lblComments.text = Alloy.Globals.VTaxSelectedLanguage.comments;
	$.btnSave.title = Alloy.Globals.VTaxSelectedLanguage.submitTitle;
	$.btnCancel.title = Alloy.Globals.VTaxSelectedLanguage.cancel;
	/*$.txtLicenseNo.keyboardType = */
	$.txtPOBox.keyboardType = Ti.UI.KEYBOARD_NUMBER_PAD;
	$.txtMobileNo.keyboardType = /*$.txtSecondaryMNo.keyboardType =*/
	$.txtPhoneNo.keyboardType = $.txtFaxNo.keyboardType = Ti.UI.KEYBOARD_PHONE_PAD;
	$.txtEmail.keyboardType = Ti.UI.KEYBOARD_EMAIL;

	$.txtCertificateDMethod.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.certificateDelivery;

	$.txtFinancialYear.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.financialYear;
	$.txtCompanyName.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.companyName;
	$.txtchamberOfCom.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.chamberOfCommerce;
	$.txtLicenseNo.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.tradeLicenseNo;
	$.txtEmirate.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.emirate;
	$.txtAddress.value = ($.txtAddress.value.length == 0) ? Alloy.Globals.VTaxSelectedLanguage.enterAddressHint : $.txtAddress.value;
	$.txtAddress.color = ($.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) ? colorCode : $.txtAddress.color;
	$.txtMobileNo.hintText = $.txtPhoneNo.hintText = $.txtFaxNo.hintText = $.txtPOBox.hintText = "XXXXXXXXXX";
	$.txtEmail.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.emailAddress;
	$.txtCountryIssued.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor;
	$.txtPlaceOfIssuing.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate;
	$.txtcLanguage.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.certificateLanguage;
	$.txtNatureOfBusiness.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.natureOfBusiness;
	$.lblTradeLicenseValue.text = $.lblSignedLetterValue.text = $.lblOfficialLetterValue.text = $.lblEstablishmentValue.text = $.lblAuditCopyValue.text = $.lblLeaseCopyValue.text = Alloy.Globals.VTaxSelectedLanguage.selectAttachment;

	$.lblAttacmentNote.text = Alloy.Globals.VTaxSelectedLanguage.attachmentNote;

	$.lblTradeLicenseValue.color = $.lblSignedLetterValue.color = $.lblOfficialLetterValue.color = $.lblEstablishmentValue.color = colorCode;

	if (Alloy.Globals.VATTAXisEnglish) {

		$.txtcLanguage.value = "English";
		$.txtcLanguage.custId = 2;

		$.lblCertificateDMethod.left = $.lblFinancialYear.left = $.lblCompanyName.left = $.lblChamberOfCom.left = $.lblLicenseNo.left = $.lblEmirate.left = $.lblAddress.left = 17;
		$.lblMobileNo.left = $.lblPhoneNo.left = $.lblFaxNo.left = $.lblPOBox.left = $.lblEmail.left = $.lblCountryIssued.left = $.lblPlaceOfIssuing.left = $.lblcLanguage.left = $.lblNatureOfBusiness.left = 17;

		$.lblCertificateDAstrik.left = $.lblFinancialYearAstrik.left = $.lblCompanyNameAstrik.left = /*$.lblChamberOfComAstrik.left =*/
		$.lblLicenseNoAstrik.left = $.lblEmirateAstrik.left = $.lblAddressAstrik.left = 8;
		$.lblMobileNoAstrik.left = $.lblPOBoxAstrik.left = $.lblEmailAstrik.left = $.lblCountryIssuedAstrik.left = $.lblPlaceOfIssueingAstrik.left = $.lblcLanguageAstrik.left = /*$.lblNatureOfBusinessAstrik.left =*/8;

		$.lblAttacmentNoteAstrik.left = 0;
		$.lblAttacmentNote.left = 9;
		$.lblAttacmentNote.right = 0;

		$.cDMethodColon.left = $.financialYearColon.left = $.companyNameColon.left = $.chamberOfComColon.left = $.licenseNoColon.left = $.emirateColon.left = $.addressColon.left = (Alloy.isTablet) ? 210 : 140;
		$.mobileNoColon.left = $.phoneNoColon.left = $.faxNoColon.left = $.POBoxColon.left = $.emailColon.left = $.countryIssuedColon.left = $.placeOfIssuingColon.left = $.cLanguageColon.left = $.natureOfBusinessColon.left = $.natureOfBusinessColon.left = (Alloy.isTablet) ? 210 : 140;

		$.txtCertificateDMethod.left = $.txtFinancialYear.left = $.txtCompanyName.left = $.txtchamberOfCom.left = $.txtLicenseNo.left = $.txtEmirate.left = $.txtAddress.left = (Alloy.isTablet) ? 225 : 155;
		$.txtMobileNo.left = $.txtPhoneNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtEmail.left = $.txtCountryIssued.left = $.txtPlaceOfIssuing.left = $.txtcLanguage.left = $.txtNatureOfBusiness.left = (Alloy.isTablet) ? 225 : 155;

		$.txtCertificateDMethod.right = $.txtFinancialYear.right = $.txtEmirate.right = $.txtCountryIssued.right = $.txtPlaceOfIssuing.right = $.txtcLanguage.right = 25;
		$.txtCompanyName.right = $.txtchamberOfCom.right = $.txtLicenseNo.right = $.txtAddress.right = $.txtMobileNo.right = $.txtPhoneNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtEmail.right = $.txtNatureOfBusiness.right = 10;

		$.imgcDMethodArrow.right = $.imgFinancialYearArrow.right = $.imgEmirate.right = $.imgCountryIssued.right = $.imgPlaceOfIssuing.right = $.imgcLanguage.right = 10;

		//Attachment
		$.lblOfficialLetter.left = $.lblEstablishment.left = $.lblTradeLicense.left = $.lblSignedLetter.left = $.lblLeaseCopy.left = $.lblAuditCopy.left = 17;
		$.lblOfficialLetterAstrik.left = $.lblTradeLicenseAstrik.left = $.lblSignedLetterAstrik.left = $.lblLeaseCopyAstrik.left = $.lblEstablishmentAstrik.left = $.lblAuditCopyAstrik.left = 8;

		$.officialLetterColon.left = $.tradeLicenseColon.left = $.signedLetterColon.left = $.leaseCopyColon.left = $.establishmentColon.left = $.auditCopyColon.left = (Alloy.isTablet) ? 210 : 140;
		$.lblOfficialLetterValue.left = $.lblTradeLicenseValue.left = $.lblSignedLetterValue.left = $.lblLeaseCopyValue.left = $.lblEstablishmentValue.left = $.lblAuditCopyValue.left = (Alloy.isTablet) ? 225 : 155;
		$.lblOfficialLetterValue.right = $.lblTradeLicenseValue.right = $.lblSignedLetterValue.right = $.lblLeaseCopyValue.right = $.lblEstablishmentValue.right = $.lblAuditCopyValue.right = 25;
		$.imgOfficialLetter.right = $.imgTradeLicense.right = $.imgSignedLetter.right = $.imgLeaseCopy.right = $.imgEstablishment.right = $.imgAuditCopy.right = 10;

		$.tradeLicenseAttachmentView.left = $.signedLetterAttachmentView.left = 7;
		//(Alloy.isTablet) ? 225 : 155;
		$.tradeLicenseAttachmentView.right = $.signedLetterAttachmentView.right = 0;

		$.btnSave.left = $.btnCancel.right = 0;

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		$.txtcLanguage.value = "عربي";
		$.txtcLanguage.custId = 1;

		$.lblCertificateDMethod.right = $.lblFinancialYear.right = $.lblCompanyName.right = $.lblChamberOfCom.right = $.lblLicenseNo.right = $.lblEmirate.right = $.lblAddress.right = 17;
		$.lblMobileNo.right = $.lblPhoneNo.right = $.lblFaxNo.right = $.lblPOBox.right = $.lblEmail.right = $.lblCountryIssued.right = $.lblPlaceOfIssuing.right = $.lblcLanguage.right = $.lblNatureOfBusiness.right = 17;

		$.lblCertificateDAstrik.right = $.lblFinancialYearAstrik.right = $.lblCompanyNameAstrik.right = /*$.lblChamberOfComAstrik.right = */
		$.lblLicenseNoAstrik.right = $.lblEmirateAstrik.right = $.lblAddressAstrik.right = 8;
		$.lblMobileNoAstrik.right = $.lblPOBoxAstrik.right = $.lblEmailAstrik.right = $.lblCountryIssuedAstrik.right = $.lblPlaceOfIssueingAstrik.right = $.lblcLanguageAstrik.right = /*$.lblNatureOfBusinessAstrik.right =*/8;

		$.lblAttacmentNoteAstrik.right = 0;
		$.lblAttacmentNote.right = 9;
		$.lblAttacmentNote.left = 0;

		$.cDMethodColon.right = $.financialYearColon.right = $.companyNameColon.right = $.chamberOfComColon.right = $.licenseNoColon.right = $.emirateColon.right = $.addressColon.right = (Alloy.isTablet) ? 210 : 140;
		$.mobileNoColon.right = $.phoneNoColon.right = $.faxNoColon.right = $.POBoxColon.right = $.emailColon.right = $.countryIssuedColon.right = $.placeOfIssuingColon.right = $.cLanguageColon.right = $.natureOfBusinessColon.right = (Alloy.isTablet) ? 210 : 140;
		$.txtCertificateDMethod.left = $.txtEmirate.left = $.txtCountryIssued.left = $.txtPlaceOfIssuing.left = $.txtcLanguage.left = 25;
		$.txtCompanyName.left = $.txtchamberOfCom.left = $.txtLicenseNo.left = $.txtAddress.left = $.txtMobileNo.left = $.txtPhoneNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtEmail.left = $.txtNatureOfBusiness.left = 10;

		$.txtCertificateDMethod.left = $.txtFinancialYear.left = $.txtCompanyName.left = $.txtchamberOfCom.left = $.txtLicenseNo.left = $.txtEmirate.left = $.txtAddress.left = 25;
		$.txtMobileNo.left = $.txtPhoneNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtEmail.left = $.txtCountryIssued.left = $.txtPlaceOfIssuing.left = $.txtcLanguage.left = $.txtNatureOfBusiness.left = 10;

		$.txtCertificateDMethod.right = $.txtFinancialYear.right = $.txtEmirate.right = $.txtCountryIssued.right = $.txtPlaceOfIssuing.right = $.txtcLanguage.right = (Alloy.isTablet) ? 225 : 155;
		$.txtCompanyName.right = $.txtchamberOfCom.right = $.txtLicenseNo.right = $.txtAddress.right = $.txtMobileNo.right = $.txtPhoneNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtEmail.right = $.txtNatureOfBusiness.right = (Alloy.isTablet) ? 225 : 155;

		$.imgcDMethodArrow.left = $.imgFinancialYearArrow.left = $.imgEmirate.left = $.imgCountryIssued.left = $.imgPlaceOfIssuing.left = $.imgcLanguage.left = 10;

		//Attachment
		$.lblOfficialLetter.right = $.lblTradeLicense.right = $.lblSignedLetter.right = $.lblLeaseCopy.right = $.lblEstablishment.right = $.lblAuditCopy.right = 17;
		$.lblOfficialLetterAstrik.right = $.lblTradeLicenseAstrik.right = $.lblSignedLetterAstrik.right = $.lblLeaseCopyAstrik.right = $.lblEstablishmentAstrik.right = $.lblAuditCopyAstrik.right = 8;

		$.officialLetterColon.right = $.tradeLicenseColon.right = $.signedLetterColon.right = $.leaseCopyColon.right = $.establishmentColon.right = $.auditCopyColon.right = (Alloy.isTablet) ? 210 : 140;
		$.lblOfficialLetterValue.left = $.lblTradeLicenseValue.left = $.lblSignedLetterValue.left = $.lblLeaseCopyValue.left = $.lblEstablishmentValue.left = $.lblAuditCopyValue.left = 25;
		$.lblOfficialLetterValue.right = $.lblTradeLicenseValue.right = $.lblSignedLetterValue.right = $.lblLeaseCopyValue.right = $.lblEstablishmentValue.right = $.lblAuditCopyValue.right = (Alloy.isTablet) ? 225 : 155;
		$.imgOfficialLetter.left = $.imgTradeLicense.left = $.imgSignedLetter.left = $.imgLeaseCopy.left = $.imgEstablishment.left = $.imgAuditCopy.left = 10;

		$.btnSave.right = $.btnCancel.left = 0;

		$.tradeLicenseAttachmentView.right = $.signedLetterAttachmentView.right = 0;
		//(Alloy.isTablet) ? 225 : 155;
		$.tradeLicenseAttachmentView.left = $.signedLetterAttachmentView.left = 20;

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

	$.lblApplicationDetail.textAlign = $.lblAttachment.textAlign = $.lblComments.textAlign = $.lblAttacmentNote.textAlign = alignment;

	$.lblCertificateDMethod.textAlign = $.lblFinancialYear.textAlign = $.lblCompanyName.textAlign = $.lblChamberOfCom.textAlign = $.lblLicenseNo.textAlign = $.lblEmirate.textAlign = $.lblAddress.textAlign = $.lblNatureOfBusiness.textAlign = alignment;
	$.lblMobileNo.textAlign = /*$.lblSecondaryMNo.textAlign =*/
	$.lblPhoneNo.textAlign = $.lblFaxNo.textAlign = $.lblPOBox.textAlign = $.lblEmail.textAlign = $.lblCountryIssued.textAlign = $.lblPlaceOfIssuing.textAlign = $.lblcLanguage.textAlign = alignment;

	$.txtCertificateDMethod.textAlign = $.txtFinancialYear.textAlign = $.txtCompanyName.textAlign = $.txtchamberOfCom.textAlign = $.txtLicenseNo.textAlign = $.txtEmirate.textAlign = $.txtAddress.textAlign = $.txtNatureOfBusiness.textAlign = alignment;
	$.txtMobileNo.textAlign = /*$.txtSecondaryMNo.textAlign =*/
	$.txtPhoneNo.textAlign = $.txtFaxNo.textAlign = $.txtPOBox.textAlign = $.txtEmail.textAlign = $.txtCountryIssued.textAlign = $.txtPlaceOfIssuing.textAlign = $.txtcLanguage.textAlign = alignment;
	$.txtComments.textAlign = $.lblFiniacialNote.textAlign = alignment;

	//Attachment

	$.lblOfficialLetter.textAlign = $.lblTradeLicense.textAlign = $.lblSignedLetter.textAlign = $.lblLeaseCopy.textAlign = $.lblEstablishment.textAlign = $.lblAuditCopy.textAlign = alignment;
	$.lblOfficialLetterValue.textAlign = $.lblTradeLicenseValue.textAlign = $.lblSignedLetterValue.textAlign = $.lblLeaseCopyValue.textAlign = $.lblEstablishmentValue.textAlign = $.lblAuditCopyValue.textAlign = alignment;

	hideController();
}

function disableController() {
	var arrChildren = $.scrollView.children;
	for (var i = 0; i < arrChildren.length; i++) {
		arrChildren[i].touchEnabled = false;
	}
}

var objDetail = undefined;
function setContent() {
	$.txtCompanyName.value = objDetail.companyName;
	$.txtchamberOfCom.value = objDetail.chamberOfCommerce;
	$.txtLicenseNo.value = objDetail.tradeLicenseNo;
	$.txtEmirate.value = (Alloy.Globals.VATTAXisEnglish) ? objDetail.emirate_en : objDetail.emirate_ar;
	$.txtEmirate.custId = objDetail.emirateId;
	$.txtAddress.value = objDetail.address;
	$.txtMobileNo.value = objDetail.mobileNo;
	$.txtPhoneNo.value = objDetail.phoneNumber;
	$.txtFaxNo.value = objDetail.faxNo;
	$.txtPOBox.value = objDetail.POBox;
	$.txtEmail.value = objDetail.email;
	$.txtCountryIssued.value = (Alloy.Globals.VATTAXisEnglish) ? objDetail.countryIssuedFor_en : objDetail.countryIssuedFor_ar;
	$.txtCountryIssued.custId = objDetail.countryIssuedForId;
	$.txtPlaceOfIssuing.value = (Alloy.Globals.VATTAXisEnglish) ? objDetail.placeOfIssuingCertificate_en : objDetail.placeOfIssuingCertificate_ar;
	$.txtPlaceOfIssuing.custId = objDetail.placeOfIssuingCertificateID;
	$.txtcLanguage.value = (Alloy.Globals.VATTAXisEnglish) ? objDetail.certificateLanguage_en : objDetail.certificateLanguage_ar;
	$.txtcLanguage.custId = objDetail.certificateLanguageId;
	$.txtNatureOfBusiness.value = objDetail.natureOfBusiness;
	$.txtComments.value = objDetail.comments;

	$.txtAddress.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;

	if (!args.isEdit) {
		disableController();
	}

}

if (args.data != undefined) {
	objDetail = args.data;
	setContent();

	if (!args.isEdit) {
		$.buttonBackView.height = 0;
	}
}

var multilineTextBoxFocus = function(e) {
	Ti.API.info("Focus");
	if (e.source.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
		e.source.value = "";
		e.source.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
};
var multilineTextBoxBlur = function(e) {
	if (e.source.value == "") {
		e.source.value = Alloy.Globals.VTaxSelectedLanguage.enterAddressHint;
		e.source.color = colorCode;
	} else {
		e.source.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
};

function setTokenData(e) {
	Ti.App.Properties.setObject("LoginDetaisObj_VatTax", e);

	Ti.App.Properties.setInt("authenticationCode_VatTax", e.tokenDetails.tokenCode);
	Ti.App.Properties.setString("emailID_VatTax", e.tokenDetails.emailId);
	Ti.App.Properties.setString("createdDate_VatTax", e.tokenDetails.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_VatTax", e.tokenDetails.lastUpdatedDate);
	Ti.App.Properties.setString("status_VatTax", e.tokenDetails.tokenStatus);
	Ti.App.Properties.setString("roleType_VatTax", e.tokenDetails.roleType);
	Ti.App.Properties.setString("groupType_VatTax", e.tokenDetails.groupType);
}

function initializeAttachmentImage() {
	$.imgTradeLicense.lblValue = $.lblTradeLicenseValue;
	$.imgSignedLetter.lblValue = $.lblSignedLetterValue;
	$.imgOfficialLetter.lblValue = $.lblOfficialLetterValue;
	$.imgEstablishment.lblValue = $.lblEstablishmentValue;
	$.imgAuditCopy.lblValue = $.lblAuditCopyValue;
	$.imgLeaseCopy.lblValue = $.lblLeaseCopyValue;

	$.imgTradeLicense.isFromDropbox = undefined;
	$.imgSignedLetter.isFromDropbox = undefined;

	$.tradeLicenseAttachmentView.currentIndex = $.signedLetterAttachmentView.currentIndex = 1;

}

function hideController() {

	if (userTypeId == 3) {
		$.chamberOfComView.height = $.chamberOfComView.top = 0;
		$.licenseNoView.height = $.licenseNoView.top = 0;
		// $.tradeLicenseView.height = $.tradeLicenseView.top = 0;
		// $.signedLetterView.height = $.signedLetterView.top = 0;
	} else {
		// $.officialLetterView.height = $.officialLetterView.top = 0;
		// $.establishmentView.height = $.establishmentView.top = 0;
	}

}

var arrTradeLicenseAttachment = [];
var arrSignedLetterAttachment = [];
var arrOffialLetterAttachment = [];
var arrEstablishmentAttachment = [];

initializeAttachmentImage();

var arrLanguage = [{
	id : 2,
	title : "English",
	titleAr : "English",
}/*, {
 id : 1,
 title : "عربي",
 titleAr : "عربي",
 }*/];
var arrDeliveryMethod = [];
var isClicked = false;
function selectDeliveryMethod(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrDeliveryMethod.length > 0) {
		openSelectionScreen(arrDeliveryMethod, Alloy.Globals.VTaxSelectedLanguage.certificateDeliveryMethod, $.txtCertificateDMethod);
	} else {
		httpManager.getCertificateDeliveryMethod(function(arr) {
			if (arr.length > 0) {
				arrDeliveryMethod = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.certificateDeliveryMethod, $.txtCertificateDMethod);
			} else {
				isClicked = false;
			}
		});
	}
}

function selectYear(e) {
	Ti.API.info('SELECT YEAR');
	Alloy.Globals.VATTAXDatePicker($.txtFinancialYear, $.winCorTaxApplication);
}

var arrEmirate = [];
function selectEmirate(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrEmirate.length > 0) {
		openSelectionScreen(arrEmirate, Alloy.Globals.VTaxSelectedLanguage.emirate, $.txtEmirate);
	} else {
		httpManager.getEmirateList(function(arr) {
			if (arr.length > 0) {
				arrEmirate = arr;
				//arrCountryList = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.emirate, $.txtEmirate);
			} else {
				isClicked = false;
			}
		});
	}
}

var arrCountryList = [];
function selectContryIssuedFor(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrCountryList.length > 0) {
		openSelectionScreen(arrCountryList, Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor, $.txtCountryIssued);
	} else {
		httpManager.getCountryList(function(arr) {
			if (arr.length > 0) {
				arrCountryList = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor, $.txtCountryIssued);
			} else {
				isClicked = false;
			}
		});
	}

}

var arrPlaceOfIssue = [];
function selectPlaceOfIssuing(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrPlaceOfIssue.length > 0) {
		openSelectionScreen(arrPlaceOfIssue, Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate, $.txtPlaceOfIssuing);
	} else {
		httpManager.getPlaceIssueList(function(arr) {
			if (arr.length > 0) {
				arrPlaceOfIssue = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate, $.txtPlaceOfIssuing);
			} else {
				isClicked = false;
			}
		});
	}
}

function selectCertificateLanguage(e) {
	return;
	openSelectionScreen(arrLanguage, Alloy.Globals.VTaxSelectedLanguage.certificateLanguage, $.txtcLanguage);
}

var setDropDownLabel = function(e) {
	e.label.value = e.labelTitle;
	e.label.custId = e.obj.id;
};
function openSelectionScreen(arr, title, txtField) {
	var payload = {
		data : arr,
		title : title,
		lbl : txtField,
		callBackFunction : setDropDownLabel
	};
	var winSelection = Alloy.createController("winSelection", payload).getView();
	winSelection.open();

}

function ShowAdmistratorComments(arr) {
	for (var i = 0,
	    len = arr.length; i < len; i++) {
		var commentView = Ti.UI.createView({
			top : 10,
			left : 0,
			right : 0,
			borderColor : Alloy.Globals.path.grayColor,
			borderWidth : 1,
			height : Titanium.UI.SIZE,
			layout : "vertical",
			originalColor : Alloy.Globals.path.grayColor,
		});
		$.adminCommentView.add(commentView);
		var lblComment = Ti.UI.createLabel({
			top : 5,
			left : 5,
			right : 5,
			height : Ti.UI.SIZE,
			color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : "black",
			font : (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font13,
			text : arr[i].commentedBody,
			originalColor : "#000",
		});
		commentView.add(lblComment);

		var lblBy = Ti.UI.createLabel({
			top : 3,
			bottom : 5,
			left : 5,
			right : 5,
			height : Ti.UI.SIZE,
			font : (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font13,
			color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor,
			originalColor : Alloy.Globals.path.borderColor,
			text : "-" + Alloy.Globals.VTaxSelectedLanguage.by + ": " + arr[i].commentedBy
		});
		commentView.add(lblBy);

		if (Alloy.Globals.VATTAXisEnglish) {
			lblComment.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
			lblBy.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		} else {
			lblComment.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
			lblBy.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		}
	}

}

/*
 *
 *  PHOTO
 *
 */

var objAttachment = {
	tradeLicense : {
		data : undefined,
		title : "trade License"
	},
	signedLetter : {
		data : undefined,
		title : "Signed Letter from corporate"
	},
	officialLetter : {
		data : undefined,
		title : "Official Letter"
	},
	establishment : {
		data : undefined,
		title : "Establishment"
	},
	auditCopy : {
		data : undefined,
		title : "Audit Copy"
	},
	leaseCopy : {
		data : undefined,
		title : "Lease Copy"
	}
};

function showAttachment(parentObj, obj) {
	Ti.API.info('PARENT OBJ == ' + parentObj);
	var view = Ti.UI.createView({
		top : 0,
		left : 0,
		right : 0,
		height : Ti.UI.SIZE,
		backgroundColor : "transparent",
		horizontalWrap : false,
	});
	var lblTitle = Ti.UI.createLabel({
		top : 10,
		height : Titanium.UI.SIZE,
		font : (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font13,
		editable : false,
		backgroundColor : "transparent",
		color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor,
		text : obj.attachmentFileName,
		attachmentUrl : obj.attachmentUrl,
		originalColor : Alloy.Globals.path.borderColor,
		isUrl : true
	});
	view.add(lblTitle);

	var imgDelete = Ti.UI.createImageView({
		top : 10,
		bottom : 10,
		width : 20,
		height : 20,
		image : Alloy.Globals.path.icnMinusGreen,
		selectedImage : undefined,
		parentView : view,
		selectedImageAttachment : obj.selectedAttachment,
		gParentView : parentObj
	});
	view.add(imgDelete);
	parentObj.add(view);

	if (Alloy.Globals.VATTAXisEnglish) {
		view.left = 0;
		view.right = 0;
		lblTitle.right = 0;
		lblTitle.left = 36;
		lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		imgDelete.left = 10;
	} else {
		view.right = 0;
		view.left = 0;
		lblTitle.right = 0;
		lblTitle.left = 36;
		lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		imgDelete.left = 10;
	}

	imgDelete.addEventListener("click", function(e) {
		e.source.gParentView.remove(e.source.parentView);
		e.source.selectedImageAttachment.isDownloaded = false;
		e.source.selectedImageAttachment.customTitle = "";

		e.source.selectedImageAttachment.height = (Alloy.Globals.isTablet) ? 35 : 30;
		e.source.selectedImageAttachment.width = (Alloy.Globals.isTablet) ? 35 : 30;
		e.source.selectedImageAttachment.lblValue.text = Alloy.Globals.VTaxSelectedLanguage.selectAttachment;
	});

	lblTitle.addEventListener("click", function(e) {
		Ti.Platform.openURL(e.source.attachmentUrl);
	});

}

$.imgTradeLicense.customTitle = "";
$.imgSignedLetter.customTitle = "";

$.imgOfficialLetter.customeTitle = "";
$.imgEstablishment.customeTitle = "";

$.imgAuditCopy.customTitle = "";
$.imgLeaseCopy.customTitle = "";

$.imgTradeLicense.isDownloaded = false;
$.imgSignedLetter.isDownloaded = false;

$.imgOfficialLetter.isDownloaded = false;
$.imgEstablishment.isDownloaded = false;

var objUploadAttachment = {};
function photoSuccess(e) {
	if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO || e.mediaType == "dropbox") {
		var selected_Image = e.media;

		var heightOfImage = (e.mediaTyp == "dropbox") ? 0 : selected_Image.height;
		var widthOfImage = selected_Image.width;

		var newHeight = 500;
		try {
			if (heightOfImage > newHeight) {
				// Alloy.Globals.showLoading(Alloy.Globals.VTaxSelectedLanguage.loading, false);

				if (OS_IOS) {
					var ImageFactory = require('ti.imagefactory');
					widthOfImage = (newHeight * widthOfImage) / heightOfImage;
					selected_Image = ImageFactory.imageAsResized(selected_Image, {
						width : 400,
						height : 480,
						quality : ImageFactory.QUALITY_LOW
					});
					heightOfImage = selected_Image.height;
					widthOfImage = selected_Image.width;
				} else {
					selected_Image.imageAsResized(400, 480);
				}

				// Alloy.Globals.hideLoading();
			}
			Ti.API.info('ATTACHMENT + ' + selectedAttachment);
			if (selectedAttachment != undefined) {

				var view = Ti.UI.createView({
					top : 0,
					left : 0,
					right : 0,
					height : Ti.UI.SIZE,
					backgroundColor : "transparent",
					horizontalWrap : false,
				});
				var lblTitle = Ti.UI.createLabel({
					top : 10,
					height : Titanium.UI.SIZE,
					font : (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font13,
					editable : false,
					backgroundColor : "transparent",
					color : Alloy.Globals.path.borderColor,
					isUrl : false
				});
				view.add(lblTitle);

				var imgDelete = Ti.UI.createImageView({
					top : 10,
					bottom : 10,
					width : 20,
					height : 20,
					image : Alloy.Globals.path.icnMinusGreen,
					selectedImage : undefined,
					parentView : view,
					selectedImageAttachment : selectedAttachment
				});
				view.add(imgDelete);

				imgDelete.addEventListener("click", function(e) {
					e.source.gParentView.remove(e.source.parentView);
					Ti.API.info('e.source.gPARENT = ' + e.source.gParentView.children.length);

					if (e.source.selectedImageAttachment == $.imgTradeLicense) {
						arrTradeLicenseAttachment.splice(arrTradeLicenseAttachment.indexOf(e.source.imageIndex), 1);
						Ti.API.info('D ID = ' + e.source.imageIndex + 'T DELETE inFO = ' + JSON.stringify(arrTradeLicenseAttachment));
					} else if (e.source.selectedImageAttachment == $.imgSignedLetter) {
						arrSignedLetterAttachment.splice(arrSignedLetterAttachment.indexOf(e.source.imageIndex), 1);
						Ti.API.info('D ID = ' + e.source.imageIndex + 'S DELETE inFO = ' + JSON.stringify(arrSignedLetterAttachment));
					} else if (e.source.selectedImageAttachment == $.imgOfficialLetter) {
						arrOffialLetterAttachment.splice(arrOffialLetterAttachment.indexOf(e.source.imageIndex), 1);
						Ti.API.info('D ID = ' + e.source.imageIndex + 'S DELETE inFO = ' + JSON.stringify(arrOffialLetterAttachment));
					} else if (e.source.selectedImageAttachment == $.imgEstablishment) {
						arrEstablishmentAttachment.splice(arrEstablishmentAttachment.indexOf(e.source.imageIndex), 1);
						Ti.API.info('D ID = ' + e.source.imageIndex + 'S DELETE inFO = ' + JSON.stringify(arrEstablishmentAttachment));
					}

					if (e.source.gParentView.children.length == 0) {
						e.source.gParentView.currentIndex = 1;

						e.source.gParentView.mainImageView.image = Alloy.Globals.path.icnAttachBlack;

						e.source.gParentView.mainImageView.height = (Alloy.Globals.isTablet) ? 35 : 30;
						e.source.gParentView.mainImageView.width = (Alloy.Globals.isTablet) ? 35 : 30;
						e.source.gParentView.mainImageView.isFromDropbox = undefined;

						e.source.gParentView.mainImageView.selectedImage = "";
						e.source.gParentView.mainImageView.customTitle = "";
						e.source.gParentView.mainImageView.lblValue.text = Alloy.Globals.VTaxSelectedLanguage.selectAttachment;

					}
				});

				if (Alloy.Globals.VATTAXisEnglish) {
					view.left = 0;
					view.right = 0;
					lblTitle.right = 0;
					lblTitle.left = 36;
					lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
					imgDelete.left = 10;
				} else {
					view.right = 0;
					view.left = 0;
					lblTitle.right = 0;
					lblTitle.left = 36;
					lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
					imgDelete.left = 10;
				}

				objUploadAttachment = {
					userName : userInfo.userName,
					data : Ti.Utils.base64encode(selected_Image)
				};

				var extension = ((e.mediaType == "dropbox") ? ".pdf" : ".png");
				switch(selectedAttachment) {
				case $.imgTradeLicense:
					lblTitle.text = "TradeLicense" + $.tradeLicenseAttachmentView.currentIndex + extension;
					$.tradeLicenseAttachmentView.mainImageView = $.imgTradeLicense;
					imgDelete.gParentView = $.tradeLicenseAttachmentView;

					objUploadAttachment.typeId = 5;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							Ti.API.info('e.mediaType == ' + e.mediaType);

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Trade License";

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;

							imgDelete.imageIndex = fileId;
							//$.tradeLicenseAttachmentView.currentIndex;
							arrTradeLicenseAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' T ADD inFO = ' + JSON.stringify(arrTradeLicenseAttachment));
							$.tradeLicenseAttachmentView.add(view);
						}
					});
					$.tradeLicenseAttachmentView.currentIndex++;
					break;
				case $.imgSignedLetter:
					lblTitle.text = "SignedLetter" + $.signedLetterAttachmentView.currentIndex + extension;
					$.signedLetterAttachmentView.mainImageView = $.imgSignedLetter;
					imgDelete.gParentView = $.signedLetterAttachmentView;

					objUploadAttachment.typeId = 6;
					objUploadAttachment.name = lblTitle.text;

					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Signed Letter";

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;

							imgDelete.imageIndex = fileId;
							//$.signedLetterAttachmentView.currentIndex;
							arrSignedLetterAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + 'S ADD inFO = ' + JSON.stringify(arrSignedLetterAttachment));
							$.signedLetterAttachmentView.add(view);
						}
					});

					$.signedLetterAttachmentView.currentIndex++;
					break;
				case $.imgOfficialLetter:
					lblTitle.text = "Official_Letter" + $.officialLetterAttachmentView.currentIndex + extension;
					$.officialLetterAttachmentView.mainImageView = $.imgOfficialLetter;
					imgDelete.gParentView = $.officialLetterAttachmentView;

					objUploadAttachment.typeId = 6;
					objUploadAttachment.name = lblTitle.text;

					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Official Letter";

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;

							imgDelete.imageIndex = fileId;
							//$.signedLetterAttachmentView.currentIndex;
							arrOffialLetterAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + 'S ADD inFO = ' + JSON.stringify(arrOffialLetterAttachment));
							$.officialLetterAttachmentView.add(view);
						}
					});

					$.officialLetterAttachmentView.currentIndex++;
					break;
				case $.imgEstablishment:
					lblTitle.text = "Official_Letter" + $.establishmentAttachmentView.currentIndex + extension;
					$.establishmentAttachmentView.mainImageView = $.imgEstablishment;
					imgDelete.gParentView = $.establishmentAttachmentView;

					objUploadAttachment.typeId = 6;
					objUploadAttachment.name = lblTitle.text;

					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Establishment Law";

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;

							imgDelete.imageIndex = fileId;
							//$.signedLetterAttachmentView.currentIndex;
							arrEstablishmentAttachment.push(imgDelete.imageIndex);

							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + 'S ADD inFO = ' + JSON.stringify(arrEstablishmentAttachment));
							$.establishmentAttachmentView.add(view);
						}
					});

					$.establishmentAttachmentView.currentIndex++;
					break;
				case $.imgAuditCopy:
					selectedAttachment.lblValue.text = "AuditedCopy.png";
					selectedAttachment.customTitle = "Audit Copy";
					break;
				case $.imgLeaseCopy:
					selectedAttachment.lblValue.text = "LeaseCopy.png";
					selectedAttachment.customTitle = "Lease Copy";
					break;
				}
				Ti.API.info('ATTACHMENT + ' + selectedAttachment.lblValue);

			}

		} catch(exx) {
			Alloy.Globals.hideLoading();
			Ti.API.info('EXCEPTIOn = ' + JSON.stringify(exx));
			return;
		}

	}
}

// This is open camera and attached capture image
function showCamera(arg) {

	try {
		var success = true;
		if (OS_IOS) {
			var success = Titanium.Media.isCameraAccessible();
		}
		if (success) {
			Titanium.Media.showCamera({
				success : photoSuccess,
				cancel : function() {
					Ti.API.info(' Cancelled ');
				},
				error : function(error) {
					if (error.code == 2) {
						Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachMedia, Alloy.Globals.VTaxSelectedLanguage.cameraNotAvail);
					}
				},
				allowEditing : true,
				saveToPhotoGallery : true,
				mediaTypes : arrMediaTypes,
			});
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.camera, Alloy.Globals.VTaxSelectedLanguage.cameraNotAccess);
		}
	} catch(ex) {
	}

}

// This function is open device gallery for select image to attached
function choosePhotoGallery(arg) {
	try {
		Titanium.Media.openPhotoGallery({
			success : photoSuccess, // end of success block
			cancel : function() {
				Ti.API.info(' Cancelled ');
			},
			error : function(error) {
				Ti.API.info(' An error occurred!! ');
			},
			allowEditing : true,
			mediaTypes : arrMediaTypes,

		});
	} catch(ex) {
	}

}

function dropBoxSuccess(byteData) {
	photoSuccess({
		mediaType : "dropbox",
		media : byteData
	});
}

var arrOptions = [Alloy.Globals.VTaxSelectedLanguage.useCamera, Alloy.Globals.VTaxSelectedLanguage.selectFromGallery, Alloy.Globals.VTaxSelectedLanguage.useDropbox];
if (OS_IOS) {
	arrOptions.push(Alloy.Globals.VTaxSelectedLanguage.cancel);
}

mediaOptionDialog = Titanium.UI.createOptionDialog({
	options : arrOptions,
	cancel : 3,
});

mediaOptionDialog.addEventListener('click', function(e) {
	if (isCanceled) {
		return;
	}
	Ti.API.info('e,index = ' + e.index + "e.source.imgSource.isFromDropbox" + e.source.imgSource.source.isFromDropbox);
	var ind = e.index;
	if (ind == 0) {
		if (e.source.imgSource.source.isFromDropbox) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
			return;
		}
		selectedAttachment = e.source.imgSource.source;
		//arg.source;
		showCamera(e.source.imgSource);
	} else if (ind == 1) {
		if (e.source.imgSource.source.isFromDropbox) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
			return;
		}
		selectedAttachment = e.source.imgSource.source;
		//arg.source;
		choosePhotoGallery(e.source.imgSource);
	} else if (ind == 2) {
		if (e.source.imgSource.source.isFromDropbox == false && e.source.imgSource.source.isFromDropbox != undefined) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
			return;
		}
		selectedAttachment = e.source.imgSource.source;
		Alloy.Globals.openWindow(Alloy.createController('common/dropbox/winFilesAndFoldersList', {
			callback : dropBoxSuccess
		}).getView());
	} else {
		isCanceled = true;
		selectedAttachment = undefined;
	}
});

var isCanceled = false;
function addImageAttachment(arg) {
	Ti.API.info('isCanceled = ' + isCanceled);
	isCanceled = false;
	arrMediaTypes = [Ti.Media.MEDIA_TYPE_PHOTO];
	mediaOptionDialog.imgSource = arg;
	if (OS_IOS && Alloy.isTablet) {
		mediaOptionDialog.show({
			view : arg.source
		});
	} else {
		mediaOptionDialog.show();
	}

}

function isNumber(nolNo) {
	return !nolNo.match(/[^0-9]/g);
}

function validatePhone(str) {
	/*//var regex=/^[0-9]+$/;
	 var regex = /^[0-9]+$/;
	 // return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 4) == "9715"));
	 return (regex.test(phone));*/

	var result;
	result = str.match(/^[\u0660-\u0669\u06F0-\u06F9]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
		return true;
	}
	var regex = /^[0-9]+$/;
	return (regex.test(str));

}

function validateOptionalPhone(phone) {
	if (phone.length == 0)
		return true;
	var regex = /^[0-9]+$/;
	// return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 3) == "971"));
	return (regex.test(phone));
}

function isLetter(str) {
	var result;
	result = str.match(/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\u0020]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
		return false;
	}
	return str.match(/[^a-zA-Z ]/g);
}

function validateData() {
	/*if ($.txtCertificateDMethod.value.trim() == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectCertificateDMethod);
	 return false;
	 } else */
	if ($.txtFinancialYear.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectFinancialYear);
		return false;
	} else if ($.txtCompanyName.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterCompanyName);
		return false;
	}/* else if (isLetter($.txtCompanyName.value.trim())) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidCompanyName);
	 return false;
	 } /else if ($.txtchamberOfCom.value.trim() == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterChamberOfCom);
	 return false;
	 } else if (isLetter($.txtchamberOfCom.value.trim())) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidChamberOfCom);
	 return false;
	 }*/ else if ($.txtLicenseNo.value.trim() == "" && userTypeId != 3) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterTradeLicenseNo);
		return false;
	} else if ($.txtEmirate.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.plsSelectEmirate);
		return false;
	} else if ($.txtAddress.value.trim() == "" || $.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterAddress);
		return false;
	} else if ($.txtMobileNo.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterMobile);
		return false;
	} else if (!validatePhone($.txtMobileNo.value.trim()) || $.txtMobileNo.value.trim().length < 10) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidMobileNo);
		return false;
	} else if (($.txtPhoneNo.value.trim().length > 0 && $.txtPhoneNo.value.trim().length < 8) || !validatePhone($.txtPhoneNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPhoneNo);
		return false;
	} else if (($.txtFaxNo.value.trim().length > 0 && $.txtFaxNo.value.trim().length < 8) || !validatePhone($.txtFaxNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidFaxNo);
		return false;
	} else if ($.txtPOBox.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterPOBox);
		return false;
	} else if (!($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 10)) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
		return false;
	} else if (!validatePhone($.txtPOBox.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
		return false;
	} else if ($.txtEmail.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterEmail);
		return false;
	} else if (!Alloy.Globals.validateEmail($.txtEmail.value)) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.invalidEmail);
		return false;
	} else if ($.txtCountryIssued.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectCountryIssued);
		return false;
	} else if ($.txtPlaceOfIssuing.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectPlaceOfIssue);
		return false;
	} else if ($.txtcLanguage.value.trim() == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectLanguage);
		return false;
	} else if ($.imgTradeLicense.customTitle == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.attachTradeLicense);
		return false;
	} else if ($.imgSignedLetter.customTitle == "") {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.attachSignedLetterCor);
		return false;
	}
	/* else if ($.txtNatureOfBusiness.value.trim() == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.enterNatureOfBusiness);
	 return;
	 } */
	/*if (userTypeId == 3) {
	 if ($.imgOfficialLetter.customTitle == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, "Official Letter missing");
	 return false;
	 } else if ($.imgEstablishment.customTitle == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, "Estalishment law and decre missing");
	 return false;
	 }
	 } else {
	 if ($.imgTradeLicense.customTitle == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.attachTradeLicense);
	 return false;
	 } else if ($.imgSignedLetter.customTitle == "") {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.attachSignedLetterCor);
	 return false;
	 }
	 }*/

	return true;
}

var expireAlert = Ti.UI.createAlertDialog({
	title : "",
	buttonNames : [Alloy.Globals.VTaxSelectedLanguage.ok]
});
expireAlert.addEventListener("click", function(e) {
	Ti.App.Properties.setInt("isLoggedIn_VatTax", false);
	args.callBack();
	closeWindow();
});

function openWebsite(url) {
	url = url.toLowerCase();
	url = (url.indexOf("http") == -1) ? ("http://" + url) : url;
	if (OS_IOS) {
		if (Ti.Platform.canOpenURL(url)) {
			Ti.Platform.openURL(url);
		}
	} else {
		Ti.Platform.openURL(url);
	}
}

var successAlert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.VTaxSelectedLanguage.vatApplication,
	message : Alloy.Globals.VTaxSelectedLanguage.vatTaxSuccess,
	buttonNames : [Alloy.Globals.VTaxSelectedLanguage.ok],
});
successAlert.addEventListener("click", function(e) {
	closeWindow();
	// args.updateCallBack();
});

function submitTax() {
	/*if (appId != -1) {
	 var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=000000-0162";
	 Ti.API.info('payment URL = ' + paymentUrl);
	 Ti.Platform.openURL(paymentUrl);
	 return;
	 }*/

	if (!validateData()) {
		return;
	}
	var arrAttachment = [];
	// if (userTypeId != 3) {
	arrAttachment = [{
		sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentID : -1,
		appId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentAppId : -1,
		typeId : 5,
		name : "TradeLicense.png", //$.lblTradeLicenseValue.text,
		data : ($.imgTradeLicense.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgTradeLicense.selectedImage),
		arr : arrTradeLicenseAttachment,
		isDownloaded : $.imgTradeLicense.isDownloaded
	}, {
		sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentID : -1,
		appId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentAppId : -1,
		typeId : 6,
		name : "SignedLetter.png", //$.lblSignedLetterValue.text,
		data : ($.imgSignedLetter.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgSignedLetter.selectedImage),
		arr : arrSignedLetterAttachment,
		isDownloaded : $.imgSignedLetter.isDownloaded
	}];
	/* } else {
	 arrAttachment = [{
	 sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentID : -1,
	 appId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentAppId : -1,
	 typeId : 5,
	 name : "OfficialLetter.png", //$.lblTradeLicenseValue.text,
	 data : ($.imgOfficialLetter.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgOfficialLetter.selectedImage),
	 arr : arrOffialLetterAttachment,
	 isDownloaded : $.imgOfficialLetter.isDownloaded
	 }, {
	 sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentID : -1,
	 appId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentAppId : -1,
	 typeId : 15,
	 name : "EstablishmentLaw.png", //$.lblSignedLetterValue.text,
	 data : ($.imgEstablishment.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgEstablishment.selectedImage),
	 arr : arrEstablishmentAttachment,
	 isDownloaded : $.imgEstablishment.isDownloaded
	 }];
	 }*/
	/*, {
	 typeId : 1,
	 name : $.lblPassportCopyValue.text,
	 data : Ti.Utils.base64encode($.imgPassportCopy.selectedImage)

	 }, {
	 typeId : 2,
	 name : $.lblVisaCopyValue.text,
	 data : Ti.Utils.base64encode($.imgVisaCopy.selectedImage)
	 }, {
	 typeId : 13,
	 name : $.lblAuditCopyValue.text,
	 data : Ti.Utils.base64encode($.imgAuditCopy.selectedImage)
	 }, {
	 typeId : 8,
	 name : $.lblLeaseCopyValue.text,
	 data : Ti.Utils.base64encode($.imgLeaseCopy.selectedImage)
	 }*/

	var objDate = new Date();
	var curerntDate = objDate.getFullYear() + "-" + (objDate.getMonth() + 1) + "-" + objDate.getDate();
	var obj = {
		financialYear : $.txtFinancialYear.value,
		companyName : $.txtCompanyName.value,
		emirateId : $.txtEmirate.custId,
		chamberOfCommerce : ($.txtchamberOfCom.value.length == 0) ? "" : $.txtchamberOfCom.value,
		tradeLicenseNo : $.txtLicenseNo.value,
		address : $.txtAddress.value,
		email : $.txtEmail.value,
		mobileNo : $.txtMobileNo.value,
		phoneNo : $.txtPhoneNo.value,
		faxNo : $.txtFaxNo.value,
		POBox : $.txtPOBox.value,
		countryIssuedForId : $.txtCountryIssued.custId,
		placeOfIssuingCertificateID : $.txtPlaceOfIssuing.custId,
		certificateLanguageId : $.txtcLanguage.custId,
		submittedByUserId : userInfo.userID,
		certificateTypeId : 2,
		initiatorName : $.txtCompanyName.value, //userInfo.userName, //userInfo.fullName,
		initiatorUserName : userInfo.userName,
		applicationWFTypeID : 3,
		formSubmitDate : Alloy.Globals.moment().format("YYYY-MM-DD"),
		comments : $.txtComments.value,
		nationalityId : 0,
		certificateDeliveryMethodId : 1, //$.txtCertificateDMethod.custId,
		eDhirhamCardCode : "1-9",
		arrAttachment : arrAttachment,
		natureOfBusiness : ($.txtNatureOfBusiness.value.length == 0) ? "" : $.txtNatureOfBusiness.value
	};

	if (objDetail == undefined) {
		httpManager.submitCorporateTax(obj, function(e, isExpired, alertMessage) {
			if (e == null && isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
				return;
			} else if (e != null) {
				setTokenData(e);
				// Ti.API.info('APP ID = ' + e.applicationId);
				// Ti.API.info('Bank Url= ' + e.bankUrl);
				appId = e.applicationId;
				successAlert.show();
				/*var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=000000-0162";
				 Ti.API.info('payment URL = ' + paymentUrl);
				 Ti.Platform.openURL(paymentUrl);*/

			}
		});
	} else {
		obj.vTaxId = objDetail.vTaxId;
		obj.applicationBusinessId = objDetail.applicationBusinessId;
		httpManager.updateCorporateTax(obj, function(e, isExpired, alertMessage) {
			if (e == null && isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
				return;
			} else if (e != null) {
				setTokenData(e);
				// Ti.API.info('APP ID = ' + e.applicationId);
				// Ti.API.info('Bank Url= ' + e.bankUrl);
				appId = e.applicationId;
				successAlert.show();
				/*var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=000000-0162";
				 Ti.API.info('payment URL = ' + paymentUrl);
				 Ti.Platform.openURL(paymentUrl);*/

			}
		});
	}
}

var openHelpScreen = $.viewInstructions.openHelpScreen;

$.winCorTaxApplication.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winCorTaxApplication);
});
$.viewBottomToolbar.setDefaultTheme($.winCorTaxApplication);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCorTaxApplication);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winCorTaxApplication);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Ti.API.info('WIN TEXVAT HOME Open');
	Alloy.Globals.arrWindows.push($.winCorTaxApplication);
	// $.btnFontChange.contentFontSize = "M";
	if (OS_ANDROID) {
		$.txtCompanyName.focus();
		$.txtCompanyName.blur();
	}
	if (objDetail != undefined) {
		ShowAdmistratorComments(objDetail.arrComments);
		var arrAttachedAttacment = objDetail.arrAttachment;
		for (var i = 0,
		    len = arrAttachedAttacment.length; i < len; i++) {
			Ti.API.info('arrAttachedAttacment[i].attachmentTypeId = ' + arrAttachedAttacment[i].attachmentTypeId);
			if (arrAttachedAttacment[i].attachmentTypeId == 5) {
				arrAttachedAttacment[i].selectedAttachment = $.imgTradeLicense;
				showAttachment($.tradeLicenseAttachmentView, arrAttachedAttacment[i]);
				$.imgTradeLicense.isDownloaded = true;
				$.imgTradeLicense.customTitle = "Trade License";
				$.imgTradeLicense.height = $.imgTradeLicense.width = 0;
				$.imgTradeLicense.lblValue.text = "";

			} else if (arrAttachedAttacment[i].attachmentTypeId == 6) {
				arrAttachedAttacment[i].selectedAttachment = $.imgSignedLetter;
				showAttachment($.signedLetterAttachmentView, arrAttachedAttacment[i]);
				$.imgSignedLetter.isDownloaded = true;
				$.imgSignedLetter.customTitle = "Signed Letter";
				$.imgSignedLetter.height = $.imgSignedLetter.width = 0;
				$.imgSignedLetter.lblValue.text = "";
			}
		}
	}

	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};

$.winCorTaxApplication.addEventListener("focus", function(e) {
	isClicked = false;
});

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCorTaxApplication);
}

changeLanguage();

