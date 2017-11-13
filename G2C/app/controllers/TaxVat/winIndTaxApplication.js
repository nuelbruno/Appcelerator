/*
 *
 *TAX
 *
 */
var args = arguments[0] || {};
var appId = -1;
var httpManager = require("httpManager");
var serviceDescription = null;

var htmlContent = "",
    htmlStep = "";
if (Alloy.Globals.VATTAXisEnglish) {
	htmlContent += '<h1>What is Residence TAX Certificate?</h1><p>It is a certificate issued to take advantage of double taxation avoidance agreements signed by the UAE.</p>';
	htmlContent += '<h1>COMPANIES</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Trade License</li><li>Lease Contract</li><li> Copy of the passport and residence of company director</li>';
	htmlContent += '<li>Request Letter from the company</li><li>Bank statement for the last 6 months</li><li>Audited financial accounts</li></ol><h2>Fees:</h2><p>5000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p>';
	htmlContent += '</div><h1>PERSONAL</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Passport copy and valid visa copy</li><li>Request Letter from the person</li>';
	htmlContent += '<li>Bank statement for the last 6 months</li><li>Source of income with attested certificate</li><li>Certificate from the sponsor stating the individual activity and source of income</li>';
	htmlContent += '</ol><h2>Fees:</h2><p>1000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div>';

	htmlStep += '<h1>Service Request</h1><ol><li>Create a new account</li><li>Fill all required fields and attach required documents</li><li>Submit the Request</li>';
	htmlStep += '<li>Review and Approve the Request</li><li>Pay the fees through e-Dirham Card</li><li>Send the Certificate to the user via Currier</li></ol><h1>Responsible Department</h1>';
	htmlStep += '<p>Customer Services Center</p><h1>Processing Duration</h1><p>3 days</p>';

} else {
	htmlContent += '<h1>ما هي شـهادة الموطن الضريبي؟</h1><p>هي شهادة تصدر للاستفادة من اتفاقيات تجنب الازدواج الضريبي التي تبرمها الدولة.</p><h1>للشـركات</h1><p>يشترط للتقدم بطلب لاصدار شهادات الموطن الضريبي للشركات ان تكون الشركة قد مارست نشاطها في الدولة لفترة ثلاث سنوات على الأقل.</p>';
	htmlContent += '<div class="certDetails"><h2>الوثائق المطلوبة:</h2><ol><li>الرخصة التجارية</li><li>عقد الإيجار</li><li>صورة جواز السفر والإقامة لملاك الشركة</li><li>رسالة طلب شهادة من الشركة</li>';
	htmlContent += '<li>حساب بنكي لآخر 6 اشهر</li><li>الحسابات الختامية المدققة</li></ol><h2>رسـوم الإصـدار:</h2><p>5000 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div><h1>للأفـراد</h1><p>يشترط للتقدم بطلب لاصدار شهادات الموطن الضريبي للافراد أن:</p>';
	htmlContent += '<ul><li>يكون المتقدم قد مارس عملا في الدولة لمدة عام واحد على الأقل.</li><li>لا يسمح لغير العاملين التقدم للحصول على الشهادة.</li></ul><div class="certDetails"><h2>الوثائق المطلوبة:</h2>';
	htmlContent += '<ol><li>صورة جواز السفر + إقامة سارية المفعول</li><li>رسالة طلب شهادة موقعة من الشخص</li><li>كشف حساب من البنك لآخر 6 اشهر مصدقة</li><li>مصدر الدخل بشهادة مصدقة</li><li>شهادة من الكفيل تفيد بنشاط الفرد ومصدر الدخل</li>';
	htmlContent += '</ol><h2>رسـوم الإصـدار:</h2><p>1000 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div>';

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

var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
var userTypeId = userInfo.userTypeId;

/*
 *
 * 1 Individual
 * 2 Corporate
 */

var selectedAttachment = undefined;

var alignment = "";

function cancelTaxForm() {
	var win = Alloy.createController("TaxVat/winVatTaxWeb", {
		callBack : closeWindow,
	}).getView();
	Alloy.Globals.openWindow(win);
}

function changeLanguage() {

	$.txtEmail.editable = false;
	$.txtEmail.value = userInfo.email;

	$.lblNavTitle.text = Alloy.Globals.VTaxSelectedLanguage.taxApplication;

	$.lblApplicationDetail.text = Alloy.Globals.VTaxSelectedLanguage.applicationDetail;

	$.lblCertificateType.text = Alloy.Globals.VTaxSelectedLanguage.certificateType;
	$.lblCertificateDMethod.text = Alloy.Globals.VTaxSelectedLanguage.certificateDeliveryMethod;
	$.lblFinancialYear.text = Alloy.Globals.VTaxSelectedLanguage.financialYear;
	$.txtFinancialYear.value = Alloy.Globals.moment().format("YYYY-MM-DD");
	$.lblCompanyName.text = Alloy.Globals.VTaxSelectedLanguage.companyName;
	$.lblChamberOfCom.text = Alloy.Globals.VTaxSelectedLanguage.chamberOfCommerce;
	$.lblName.text = Alloy.Globals.VTaxSelectedLanguage.nameTitle;
	$.lblLicenseNo.text = Alloy.Globals.VTaxSelectedLanguage.tradeLicenseNo;
	$.lblPassportNo.text = Alloy.Globals.VTaxSelectedLanguage.passportNo;
	$.lblNationality.text = Alloy.Globals.VTaxSelectedLanguage.nationality;
	$.lblVisaNo.text = Alloy.Globals.VTaxSelectedLanguage.visNo;
	$.lblNationalId.text = Alloy.Globals.VTaxSelectedLanguage.nationalId;
	$.lblEmirate.text = Alloy.Globals.VTaxSelectedLanguage.emirate;
	$.lblAddress.text = Alloy.Globals.VTaxSelectedLanguage.address;
	$.lblMobileNo.text = Alloy.Globals.VTaxSelectedLanguage.mobileNoNormal;
	// $.lblSecondaryMNo.text = Alloy.Globals.VTaxSelectedLanguage.seconadryMobile;
	$.lblPhoneNo.text = Alloy.Globals.VTaxSelectedLanguage.telNo;
	$.lblFaxNo.text = Alloy.Globals.VTaxSelectedLanguage.faxNo;
	$.lblPOBox.text = Alloy.Globals.VTaxSelectedLanguage.POBox;
	$.lblWorkFor.text = Alloy.Globals.VTaxSelectedLanguage.workFor;
	$.lblEmail.text = Alloy.Globals.VTaxSelectedLanguage.emailTitle;
	$.lblCountryIssued.text = Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor;
	$.lblPlaceOfIssuing.text = Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate;
	$.lblcLanguage.text = Alloy.Globals.VTaxSelectedLanguage.certificateLanguage;

	$.lblAttachment.text = Alloy.Globals.VTaxSelectedLanguage.attachments;

	$.lblOfficialLetter.text = Alloy.Globals.VTaxSelectedLanguage.officialLetter;
	$.lblEstablishment.text = Alloy.Globals.VTaxSelectedLanguage.establishmentDecree;

	$.lblTradeLicense.text = Alloy.Globals.VTaxSelectedLanguage.validTradeLicense;
	$.lblSignedLetter.text = Alloy.Globals.VTaxSelectedLanguage.signedLetter;
	$.lblSignedLetterCor.text = Alloy.Globals.VTaxSelectedLanguage.signedLetter;
	if (userTypeId == 1) {
		$.lblPassportCopy.text = Alloy.Globals.VTaxSelectedLanguage.passportCopy;
	} else {
		$.lblPassportCopy.text = Alloy.Globals.VTaxSelectedLanguage.passportCopyOwners;
	}
	$.lblVisaCopy.text = Alloy.Globals.VTaxSelectedLanguage.visaCopyOwners;
	$.lblAuditCopy.text = Alloy.Globals.VTaxSelectedLanguage.copyAuditFinancialAccounts;
	$.lblResidenceCopy.text = Alloy.Globals.VTaxSelectedLanguage.validResidenceCopy;
	$.lblSignedLetter.text = Alloy.Globals.VTaxSelectedLanguage.letterSignedCustomer;
	$.lblLeaseCopy.text = Alloy.Globals.VTaxSelectedLanguage.leaseCopy;
	$.lblEmployerLetter.text = Alloy.Globals.VTaxSelectedLanguage.letterFromEmployer;
	$.lblBankStatement.text = Alloy.Globals.VTaxSelectedLanguage.certifiedBankAccount;
	$.lblSalaryCertificate.text = Alloy.Globals.VTaxSelectedLanguage.validSalaryCertiFicate;
	$.lblEmployementContract.text = Alloy.Globals.VTaxSelectedLanguage.employementContract;

	// $.txtMobileNo.hintText = $.txtPhoneNo.hintText = $.txtFaxNo.hintText = "971xxxxxxxxx";

	$.lblComments.text = Alloy.Globals.VTaxSelectedLanguage.comments;

	$.btnSave.title = Alloy.Globals.VTaxSelectedLanguage.submitTitle;
	$.btnCancel.title = Alloy.Globals.VTaxSelectedLanguage.cancel;

	$.txtCertificateType.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.certificateType;
	$.txtCertificateDMethod.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.certificateDeliveryMethod;
	$.txtFinancialYear.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.financialYear;
	$.txtCompanyName.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.companyName;
	$.txtchamberOfCom.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.chamberOfCommerce;
	$.txtName.hintText = Alloy.Globals.VTaxSelectedLanguage.enterNameHint;
	$.txtLicenseNo.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.tradeLicenseNo;
	$.txtPassportNo.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.passportNo;
	$.txtNationality.hintText = Alloy.Globals.VTaxSelectedLanguage.mSupSelectNationality;
	$.txtVisaNo.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.visNo;
	$.txtNationalId.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.nationalId;
	$.txtEmirate.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.emirate;
	$.txtAddress.value = ($.txtAddress.value.length == 0) ? Alloy.Globals.VTaxSelectedLanguage.enterAddressHint : $.txtAddress.value;
	$.txtAddress.color = ($.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) ? colorCode : $.txtAddress.color;
	$.txtMobileNo.hintText = $.txtPhoneNo.hintText = $.txtFaxNo.hintText = $.txtPOBox.hintText = "XXXXXXXXXX";
	$.txtWorkFor.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.workFor;
	$.txtEmail.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.emailAddress;
	$.txtCountryIssued.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.countryIssuedFor;
	$.txtPlaceOfIssuing.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.placeIssuingCertificate;
	$.txtcLanguage.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.certificateLanguage;
	$.lblOfficialLetterValue.text = $.lblEstablishmentValue.text = $.lblTradeLicenseValue.text = $.lblSignedLetterCorValue.text = $.lblPassportCopyValue.text = $.lblVisaCopyValue.text = $.lblAuditCopyValue.text = $.lblResidenceCopyValue.text = $.lblSignedLetterValue.text = $.lblLeaseCopyValue.text = $.lblEmployerLetterValue.text = $.lblBankStatementValue.text = $.lblSalaryCertificateValue.text = $.lblEmployementContractValue.text = Alloy.Globals.VTaxSelectedLanguage.selectAttachment;
	$.lblOfficialLetterValue.color = $.lblEstablishmentValue.color = $.lblTradeLicenseValue.color = $.lblSignedLetterCorValue.color = $.lblPassportCopyValue.color = $.lblVisaCopyValue.color = $.lblAuditCopyValue.color = $.lblResidenceCopyValue.color = $.lblSignedLetterValue.color = $.lblLeaseCopyValue.color = $.lblEmployerLetterValue.color = $.lblBankStatementValue.color = $.lblSalaryCertificateValue.color = $.lblEmployementContractValue.color = colorCode;

	$.lblAttacmentNote.text = Alloy.Globals.VTaxSelectedLanguage.attachmentNote;

	/*$.txtSecondaryMNo.keyboardType =*/
	$.txtMobileNo.keyboardType = $.txtPhoneNo.keyboardType = $.txtFaxNo.keyboardType = Ti.UI.KEYBOARD_PHONE_PAD;
	$.txtPOBox.keyboardType = Ti.UI.KEYBOARD_NUMBER_PAD;
	$.txtEmail.keyboardType = Ti.UI.KEYBOARD_EMAIL;

	$.txtNationality.isGCCCountry = false;

	if (Alloy.Globals.VATTAXisEnglish) {

		$.txtcLanguage.value = "English";
		$.txtcLanguage.custId = 2;

		$.lblCertificateType.left = $.lblCertificateDMethod.left = $.lblFinancialYear.left = $.lblName.left = $.lblPassportNo.left = $.lblNationality.left = $.lblVisaNo.left = $.lblNationalId.left = $.lblEmirate.left = $.lblAddress.left = $.lblCompanyName.left = $.lblChamberOfCom.left = $.lblLicenseNo.left = 17;
		$.lblMobileNo.left = $.lblPhoneNo.left = $.lblFaxNo.left = $.lblPOBox.left = $.lblWorkFor.left = $.lblEmail.left = $.lblCountryIssued.left = $.lblPlaceOfIssuing.left = $.lblcLanguage.left = 17;

		$.lblCertificateTypeAstrik.left = $.lblFinancialYearAstrik.left = $.lblCertificateDAstrik.left = $.lblPassportNoAstrik.left = $.lblNationalityAstrik.left = $.lblVisaNoAstrik.left = $.lblNationalIdAstrik.left = $.lblEmirateAstrik.left = $.lblAddressAstrik.left = $.lblCompanyNameAstrik.left = /*$.lblChamberOfComAstrik.left =*/
		$.lblLicenseNoAstrik.left = 8;
		$.lblNameAstrik.left = $.lblMobileNoAstrik.left = $.lblPOBoxAstrik.left = $.lblWorkForAstrik.left = $.lblEmailAstrik.left = $.lblCountryIssuedAstrik.left = $.lblPlaceOfIssuingAstrik.left = $.lblcLanguageAstrik.left = 8;

		$.lblAttacmentNoteAstrik.left = 0;
		$.lblAttacmentNote.left = 9;
		$.lblAttacmentNote.right = 0;

		$.cTypeColon.left = $.cDMethodColon.left = $.financialYearColon.left = $.nameColon.left = $.passportNoColon.left = $.nationalityColon.left = $.visaNoColon.left = $.nationalIdColon.left = $.emirateColon.left = $.addressColon.left = $.companyNameColon.left = $.chamberOfComColon.left = $.licenseNoColon.left = (Alloy.isTablet) ? 210 : 140;
		$.mobileNoColon.left = $.phoneNoColon.left = $.faxNoColon.left = $.POBoxColon.left = $.workForColon.left = $.emailColon.left = $.countryIssuedColon.left = $.placeOfIssuingColon.left = $.cLanguageColon.left = (Alloy.isTablet) ? 210 : 140;

		$.txtCertificateType.left = $.txtCertificateDMethod.left = $.txtFinancialYear.left = $.txtName.left = $.txtPassportNo.left = $.txtNationality.left = $.txtVisaNo.left = $.txtNationalId.left = $.txtEmirate.left = $.txtAddress.left = $.txtCompanyName.left = $.txtchamberOfCom.left = $.txtLicenseNo.left = (Alloy.isTablet) ? 225 : 155;
		$.txtMobileNo.left = $.txtPhoneNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtWorkFor.left = $.txtEmail.left = $.txtCountryIssued.left = $.txtPlaceOfIssuing.left = $.txtcLanguage.left = (Alloy.isTablet) ? 225 : 155;

		$.txtCertificateType.right = $.txtCertificateDMethod.right = $.txtFinancialYear.right = $.txtNationality.right = $.txtEmirate.right = $.txtCountryIssued.right = $.txtPlaceOfIssuing.right = $.txtcLanguage.right = 25;
		$.txtName.right = $.txtPassportNo.right = $.txtVisaNo.right = $.txtNationalId.right = $.txtAddress.right = $.txtMobileNo.right = $.txtPhoneNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtWorkFor.right = $.txtEmail.right = $.txtCompanyName.right = $.txtchamberOfCom.right = $.txtLicenseNo.right = 10;

		$.imgcTypeArrow.right = $.imgcDMethodArrow.right = $.imgFinancialYearArrow.right = $.imgNationality.right = $.imgEmirate.right = $.imgCountryIssued.right = $.imgPlaceOfIssuing.right = $.imgcLanguage.right = 10;

		//Attachment
		$.lblOfficialLetter.left = $.lblEstablishment.left = $.lblPassportCopy.left = $.lblResidenceCopy.left = $.lblSignedLetter.left = $.lblLeaseCopy.left = $.lblEmployerLetter.left = $.lblBankStatement.left = $.lblSalaryCertificate.left = $.lblEmployementContract.left = $.lblTradeLicense.left = $.lblSignedLetterCor.left = $.lblVisaCopy.left = $.lblAuditCopy.left = 17;
		$.lblOfficialLetterAstrik.left = $.lblEstablishmentAstrik.left = $.lblPassportCopyAstrik.left = $.lblResidencyCopyAstrik.left = $.lblSignedLetterAstrik.left = $.lblLeaseCopyAstrik.left = $.lblEmployerLetterAstrik.left = $.lblBankStatementAstrik.left = $.lblSalaryCertificateAstrik.left = $.lblEmployementContractAstrik.left = $.lblTradeLicenseAstrik.left = $.lblSignedLetterCorAstrik.left = $.lblVisaCopyAstrik.left = $.lblAuditCopyAstrik.left = 8;

		$.officialLetterColon.left = $.establishmentColon.left = $.passportCopyColon.left = $.residenceCopyColon.left = $.signedLetterColon.left = $.leaseCopyColon.left = $.employerLetterColon.left = $.bankStatementColon.left = $.salaryCertificateColon.left = $.employementContractColon.left = $.tradeLicenseColon.left = $.signedLetterCorColon.left = $.visaCopyColon.left = $.auditCopyColon.left = (Alloy.isTablet) ? 210 : 140;
		$.lblOfficialLetterValue.left = $.lblEstablishmentValue.left = $.lblPassportCopyValue.left = $.lblResidenceCopyValue.left = $.lblSignedLetterValue.left = $.lblLeaseCopyValue.left = $.lblEmployerLetterValue.left = $.lblBankStatementValue.left = $.lblSalaryCertificateValue.left = $.lblEmployementContractValue.left = $.lblTradeLicenseValue.left = $.lblSignedLetterCorValue.left = $.lblVisaCopyValue.left = $.lblAuditCopyValue.left = (Alloy.isTablet) ? 225 : 155;
		$.lblOfficialLetterValue.right = $.lblEstablishmentValue.right = $.lblPassportCopyValue.right = $.lblResidenceCopyValue.right = $.lblSignedLetterValue.right = $.lblLeaseCopyValue.right = $.lblEmployerLetterValue.right = $.lblBankStatementValue.right = $.lblSalaryCertificateValue.right = $.lblEmployementContractValue.right = $.lblTradeLicenseValue.right = $.lblSignedLetterCorValue.right = $.lblVisaCopyValue.right = $.lblAuditCopyValue.right = 25;
		$.imgOfficialLetter.right = $.imgEstablishment.right = $.imgPassportCopy.right = $.imgResidenceCopy.right = $.imgSignedLetter.right = $.imgLeaseCopy.right = $.imgEmployerLetter.right = $.imgBankStatement.right = $.imgSalaryCertificate.right = $.imgEmployementContract.right = $.imgTradeLicense.right = $.imgSignedLetterCor.right = $.imgVisaCopy.right = $.imgAuditCopy.right = 10;

		$.btnSave.left = $.btnCancel.right = 0;

		$.officialLetterAttachmentView.left = $.establishmentAttachmentView.left = $.tradeLicenseAttachmentView.left = $.signedLetterCorAttachmentView.left = $.passportCompyAttachmentView.left = $.visaCopyAttachmentView.left = $.auditCopyAttachmentView.left = $.residencyCopyAttachmentView.left = $.signedLetterAttachmentView.left = $.leaseCopyAttachmentView.left = $.employerLetterAttachmentView.left = $.bankStatementAttachmentView.left = $.salaryCertiAttachmentView.left = $.employementContractAttachmentView.left = 7;
		//(Alloy.isTablet) ? 225 : 155;
		$.officialLetterAttachmentView.right = $.establishmentAttachmentView.right = $.tradeLicenseAttachmentView.right = $.signedLetterCorAttachmentView.right = $.passportCompyAttachmentView.right = $.visaCopyAttachmentView.right = $.auditCopyAttachmentView.right = $.residencyCopyAttachmentView.right = $.signedLetterAttachmentView.right = $.leaseCopyAttachmentView.right = $.employerLetterAttachmentView.right = $.bankStatementAttachmentView.right = $.salaryCertiAttachmentView.right = $.employementContractAttachmentView.right = 0;

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		$.txtcLanguage.value = "عربي";
		$.txtcLanguage.custId = 1;

		$.lblCertificateType.right = $.lblCertificateDMethod.right = $.lblFinancialYear.right = $.lblName.right = $.lblPassportNo.right = $.lblNationality.right = $.lblVisaNo.right = $.lblNationalId.right = $.lblEmirate.right = $.lblAddress.right = $.lblCompanyName.right = $.lblChamberOfCom.right = $.lblLicenseNo.right = 17;
		$.lblMobileNo.right = $.lblPhoneNo.right = $.lblFaxNo.right = $.lblPOBox.right = $.lblWorkFor.right = $.lblEmail.right = $.lblCountryIssued.right = $.lblPlaceOfIssuing.right = $.lblcLanguage.right = 17;

		$.lblCertificateTypeAstrik.right = $.lblFinancialYearAstrik.right = $.lblCertificateDAstrik.right = $.lblPassportNoAstrik.right = $.lblNationalityAstrik.right = $.lblVisaNoAstrik.right = $.lblNationalIdAstrik.right = $.lblEmirateAstrik.right = $.lblAddressAstrik.right = $.lblCompanyNameAstrik.right = /*$.lblChamberOfComAstrik.right =*/
		$.lblLicenseNoAstrik.right = 8;
		$.lblNameAstrik.right = $.lblMobileNoAstrik.right = $.lblPOBoxAstrik.right = $.lblWorkForAstrik.right = $.lblEmailAstrik.right = $.lblCountryIssuedAstrik.right = $.lblPlaceOfIssuingAstrik.right = $.lblcLanguageAstrik.right = 8;

		$.lblAttacmentNoteAstrik.right = 0;
		$.lblAttacmentNote.right = 9;
		$.lblAttacmentNote.left = 0;

		$.cTypeColon.right = $.cDMethodColon.right = $.financialYearColon.right = $.nameColon.right = $.passportNoColon.right = $.nationalityColon.right = $.visaNoColon.right = $.nationalIdColon.right = $.emirateColon.right = $.addressColon.right = $.companyNameColon.right = $.chamberOfComColon.right = $.licenseNoColon.right = (Alloy.isTablet) ? 210 : 140;
		$.mobileNoColon.right = $.phoneNoColon.right = $.faxNoColon.right = $.POBoxColon.right = $.workForColon.right = $.emailColon.right = $.countryIssuedColon.right = $.placeOfIssuingColon.right = $.cLanguageColon.right = (Alloy.isTablet) ? 210 : 140;

		$.txtCertificateType.left = $.txtCertificateDMethod.left = $.txtFinancialYear.left = $.txtName.left = $.txtPassportNo.left = $.txtNationality.left = $.txtVisaNo.left = $.txtNationalId.left = $.txtEmirate.left = $.txtAddress.left = $.txtCompanyName.left = $.txtchamberOfCom.left = $.txtLicenseNo.left = 25;
		$.txtMobileNo.left = $.txtPhoneNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtWorkFor.left = $.txtEmail.left = $.txtCountryIssued.left = $.txtPlaceOfIssuing.left = $.txtcLanguage.left = 10;

		$.txtCertificateType.right = $.txtCertificateDMethod.right = $.txtFinancialYear.right = $.txtNationality.right = $.txtEmirate.right = $.txtCountryIssued.right = $.txtPlaceOfIssuing.right = $.txtcLanguage.right = (Alloy.isTablet) ? 225 : 155;
		$.txtName.right = $.txtPassportNo.right = $.txtVisaNo.right = $.txtNationalId.right = $.txtAddress.right = $.txtMobileNo.right = $.txtPhoneNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtWorkFor.right = $.txtEmail.right = $.txtCompanyName.right = $.txtchamberOfCom.right = $.txtLicenseNo.right = (Alloy.isTablet) ? 225 : 155;

		$.imgcTypeArrow.left = $.imgcDMethodArrow.left = $.imgFinancialYearArrow.left = $.imgNationality.left = $.imgEmirate.left = $.imgCountryIssued.left = $.imgPlaceOfIssuing.left = $.imgcLanguage.left = 10;

		//Attachment
		$.lblOfficialLetter.right = $.lblEstablishment.right = $.lblPassportCopy.right = $.lblResidenceCopy.right = $.lblSignedLetter.right = $.lblLeaseCopy.right = $.lblEmployerLetter.right = $.lblBankStatement.right = $.lblSalaryCertificate.right = $.lblEmployementContract.right = $.lblTradeLicense.right = $.lblSignedLetterCor.right = $.lblVisaCopy.right = $.lblAuditCopy.right = 17;
		$.lblOfficialLetterAstrik.right = $.lblEstablishmentAstrik.right = $.lblPassportCopyAstrik.right = $.lblResidencyCopyAstrik.right = $.lblSignedLetterAstrik.right = $.lblLeaseCopyAstrik.right = $.lblEmployerLetterAstrik.right = $.lblBankStatementAstrik.right = $.lblSalaryCertificateAstrik.right = $.lblEmployementContractAstrik.right = $.lblTradeLicenseAstrik.right = $.lblSignedLetterCorAstrik.right = $.lblVisaCopyAstrik.right = $.lblAuditCopyAstrik.right = 8;

		$.officialLetterColon.right = $.establishmentColon.right = $.passportCopyColon.right = $.residenceCopyColon.right = $.signedLetterColon.right = $.leaseCopyColon.right = $.employerLetterColon.right = $.bankStatementColon.right = $.salaryCertificateColon.right = $.employementContractColon.right = $.tradeLicenseColon.right = $.signedLetterCorColon.right = $.visaCopyColon.right = $.auditCopyColon.right = (Alloy.isTablet) ? 210 : 140;
		$.lblOfficialLetterValue.left = $.lblEstablishmentValue.left = $.lblPassportCopyValue.left = $.lblResidenceCopyValue.left = $.lblSignedLetterValue.left = $.lblLeaseCopyValue.left = $.lblEmployerLetterValue.left = $.lblBankStatementValue.left = $.lblSalaryCertificateValue.left = $.lblEmployementContractValue.left = $.lblTradeLicenseValue.left = $.lblSignedLetterCorValue.left = $.lblVisaCopyValue.left = $.lblAuditCopyValue.left = 25;

		$.lblOfficialLetterValue.right = $.lblEstablishmentValue.right = $.lblPassportCopyValue.right = $.lblResidenceCopyValue.right = $.lblSignedLetterValue.right = $.lblLeaseCopyValue.right = $.lblEmployerLetterValue.right = $.lblBankStatementValue.right = $.lblSalaryCertificateValue.right = $.lblEmployementContractValue.right = $.lblTradeLicenseValue.right = $.lblSignedLetterCorValue.right = $.lblVisaCopyValue.right = $.lblAuditCopyValue.right = (Alloy.isTablet) ? 225 : 155;
		$.imgOfficialLetter.left = $.imgEstablishment.left = $.imgPassportCopy.left = $.imgResidenceCopy.left = $.imgSignedLetter.left = $.imgLeaseCopy.left = $.imgEmployerLetter.left = $.imgBankStatement.left = $.imgSalaryCertificate.left = $.imgEmployementContract.left = $.imgTradeLicense.left = $.imgSignedLetterCor.left = $.imgVisaCopy.left = $.imgAuditCopy.left = 10;

		$.btnSave.right = $.btnCancel.left = 0;

		$.officialLetterAttachmentView.right = $.establishmentAttachmentView.right = $.tradeLicenseAttachmentView.right = $.signedLetterCorAttachmentView.right = $.passportCompyAttachmentView.right = $.visaCopyAttachmentView.right = $.auditCopyAttachmentView.right = $.residencyCopyAttachmentView.right = $.signedLetterAttachmentView.right = $.leaseCopyAttachmentView.right = $.employerLetterAttachmentView.right = $.bankStatementAttachmentView.right = $.salaryCertiAttachmentView.right = $.employementContractAttachmentView.right = 0;
		//(Alloy.isTablet) ? 225 : 155;
		$.officialLetterAttachmentView.left = $.establishmentAttachmentView.left = $.tradeLicenseAttachmentView.left = $.signedLetterCorAttachmentView.left = $.passportCompyAttachmentView.left = $.visaCopyAttachmentView.left = $.auditCopyAttachmentView.left = $.residencyCopyAttachmentView.left = $.signedLetterAttachmentView.left = $.leaseCopyAttachmentView.left = $.employerLetterAttachmentView.left = $.bankStatementAttachmentView.left = $.salaryCertiAttachmentView.left = $.employementContractAttachmentView.left = 20;

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

	$.lblApplicationDetail.textAlign = $.lblAttachment.textAlign = $.lblComments.textAlign = $.lblAttacmentNote.textAlign = alignment;

	$.lblCertificateType.textAlign = $.lblCertificateDMethod.textAlign = $.lblFinancialYear.textAlign = $.lblName.textAlign = $.lblPassportNo.textAlign = $.lblNationality.textAlign = $.lblVisaNo.textAlign = $.lblNationalId.textAlign = $.lblEmirate.textAlign = $.lblAddress.textAlign = $.lblCompanyName.textAlign = $.lblChamberOfCom.textAlign = $.lblLicenseNo.textAlign = alignment;
	$.lblMobileNo.textAlign = $.lblPhoneNo.textAlign = $.lblFaxNo.textAlign = $.lblPOBox.textAlign = $.lblWorkFor.textAlign = $.lblEmail.textAlign = $.lblCountryIssued.textAlign = $.lblPlaceOfIssuing.textAlign = $.lblcLanguage.textAlign = alignment;

	$.txtCertificateType.textAlign = $.txtCertificateDMethod.textAlign = $.txtFinancialYear.textAlign = $.txtName.textAlign = $.txtPassportNo.textAlign = $.txtNationality.textAlign = $.txtVisaNo.textAlign = $.txtNationalId.textAlign = $.txtEmirate.textAlign = $.txtAddress.textAlign = $.txtCompanyName.textAlign = $.txtchamberOfCom.textAlign = $.txtLicenseNo.textAlign = alignment;
	$.txtMobileNo.textAlign = $.txtPhoneNo.textAlign = $.txtFaxNo.textAlign = $.txtPOBox.textAlign = $.txtWorkFor.textAlign = $.txtEmail.textAlign = $.txtCountryIssued.textAlign = $.txtPlaceOfIssuing.textAlign = $.txtcLanguage.textAlign = alignment;
	$.txtComments.textAlign = $.lblFiniacialNote.textAlign = alignment;

	//Attachment

	$.lblOfficialLetter.textAlign = $.lblEstablishment.textAlign = $.lblPassportCopy.textAlign = $.lblResidenceCopy.textAlign = $.lblSignedLetter.textAlign = $.lblLeaseCopy.textAlign = $.lblEmployerLetter.textAlign = $.lblBankStatement.textAlign = $.lblSalaryCertificate.textAlign = $.lblEmployementContract.textAlign = $.lblTradeLicense.textAlign = $.lblSignedLetterCor.textAlign = $.lblVisaCopy.textAlign = $.lblAuditCopy.textAlign = alignment;
	$.lblOfficialLetterValue.textAlign = $.lblEstablishmentValue.textAlign = $.lblPassportCopyValue.textAlign = $.lblResidenceCopyValue.textAlign = $.lblSignedLetterValue.textAlign = $.lblLeaseCopyValue.textAlign = $.lblEmployerLetterValue.textAlign = $.lblBankStatementValue.textAlign = $.lblSalaryCertificateValue.textAlign = $.lblEmployementContractValue.textAlign = $.lblTradeLicenseValue.textAlign = $.lblSignedLetterCorValue.textAlign = $.lblVisaCopyValue.textAlign = $.lblAuditCopyValue.textAlign = alignment;

	hideController();

	if (args.data != undefined) {
		objDetail = args.data;
		setContent();

		if (!args.isEdit) {
			$.buttonBackView.height = 0;
		}
	}
}

function disableController() {
	var arrChildren = $.scrollView.children;
	for (var i = 0; i < arrChildren.length; i++) {
		arrChildren[i].touchEnabled = false;
	}
}

function hideNationalID(e) {
	Ti.API.info('e.isGCCCountry === ' + e.isGCCCountry);
	if (e.isGCCCountry && e.nationalityId != "") {
		Ti.API.info('ENTER');
		$.nationalIdView.height = Titanium.UI.SIZE;
		$.nationalIdView.top = 12;

		$.visaNoView.height = $.visaNoView.top = 0;
		$.txtVisaNo.value = "";

		$.txtNationality.isGCCCountry = true;
	} else {
		$.nationalIdView.height = $.nationalIdView.top = 0;
		$.txtNationalId.value = "";
		$.txtNationality.isGCCCountry = false;

		if (userTypeId == 1) {
			$.visaNoView.height = Titanium.UI.SIZE;
			$.visaNoView.top = 12;
		}

	}
}

var objDetail = undefined;
function setContent() {
	if (userTypeId == 1) {
		$.txtName.value = objDetail.companyName;
		$.txtPassportNo.value = objDetail.passportNumber;
		$.txtNationality.value = (Alloy.Globals.VATTAXisEnglish) ? objDetail.nationality_en : objDetail.nationality_ar;
		$.txtNationality.custId = objDetail.nationalityId;
		$.txtVisaNo.value = objDetail.visaNumber;
		$.txtWorkFor.value = objDetail.workFor;

		hideNationalID(objDetail);
	} else {
		$.txtCompanyName.value = objDetail.companyName;
		$.txtchamberOfCom.value = objDetail.chamberOfCommerce;
		$.txtLicenseNo.value = objDetail.tradeLicenseNo;
	}
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
	$.txtComments.value = objDetail.comments;

	$.txtAddress.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;

	if (!args.isEdit) {
		disableController();
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

function hideController() {

	if (userTypeId == 2) {
		$.nameView.height = $.passportNoView.height = $.nationalityView.height = $.visaNoView.height = $.workForView.height = 0;
		$.nameView.top = $.passportNoView.top = $.nationalityView.top = $.visaNoView.top = $.workForView.top = 0;

		// attachment
		$.officialLetterView.height = $.establishmentView.height = $.residenceCopyView.height = $.signedLetterView.height = $.employerLetterView.height = $.bankStatementView.height = $.salaryCertificateView.height = $.employementContractView.height = 0;
		$.officialLetterView.top = $.establishmentView.top = $.residenceCopyView.top = $.signedLetterView.top = $.employerLetterView.top = $.bankStatementView.top = $.salaryCertificateView.top = $.employementContractView.top = 0;
	} else if (userTypeId == 1) {
		$.companyNameView.height = $.chamberOfComView.height = $.licenseNoView.height = 0;
		$.companyNameView.top = $.chamberOfComView.top = $.licenseNoView.top = 0;

		// attachment
		$.officialLetterView.height = $.establishmentView.height = $.tradeLicenseView.height = $.signedLetterCorView.height = $.visaCopyView.height = $.auditCopyView.height = 0;
		$.officialLetterView.top = $.establishmentView.top = $.tradeLicenseView.top = $.signedLetterCorView.top = $.visaCopyView.top = $.auditCopyView.top = 0;
	} else if (userTypeId == 3) {
		$.chamberOfComView.height = $.licenseNoView.height = $.nameView.height = $.passportNoView.height = $.nationalityView.height = $.visaNoView.height = $.workForView.height = 0;
		$.chamberOfComView.top = $.licenseNoView.top = $.nameView.top = $.passportNoView.top = $.nationalityView.top = $.visaNoView.top = $.workForView.top = 0;

		$.tradeLicenseView.height = $.signedLetterCorView.height = $.passportCopyView.height = $.visaCopyView.height = $.auditCopyView.height = $.residenceCopyView.height = $.signedLetterView.height = $.leaseCopyView.height = $.employerLetterView.height = $.bankStatementView.height = $.salaryCertificateView.height = $.employementContractView.height = 0;
		$.tradeLicenseView.top = $.signedLetterCorView.top = $.passportCopyView.top = $.visaCopyView.top = $.auditCopyView.top = $.residenceCopyView.top = $.signedLetterView.top = $.leaseCopyView.top = $.employerLetterView.top = $.bankStatementView.top = $.salaryCertificateView.top = $.employementContractView.top = 0;
	}
	$.nationalIdView.height = $.nationalIdView.top = 0;

}

function initializeAttachmentImage() {
	$.imgOfficialLetter.lblValue = $.lblOfficialLetterValue;
	$.imgEstablishment.lblValue = $.lblEstablishmentValue;
	$.imgTradeLicense.lblValue = $.lblTradeLicenseValue;
	$.imgSignedLetterCor.lblValue = $.lblSignedLetterCorValue;
	$.imgPassportCopy.lblValue = $.lblPassportCopyValue;
	$.imgVisaCopy.lblValue = $.lblVisaCopyValue;
	$.imgAuditCopy.lblValue = $.lblAuditCopyValue;
	$.imgResidenceCopy.lblValue = $.lblResidenceCopyValue;
	$.imgSignedLetter.lblValue = $.lblSignedLetterValue;
	$.imgLeaseCopy.lblValue = $.lblLeaseCopyValue;
	$.imgEmployerLetter.lblValue = $.lblEmployerLetterValue;
	$.imgBankStatement.lblValue = $.lblBankStatementValue;
	$.imgSalaryCertificate.lblValue = $.lblSalaryCertificateValue;
	$.imgEmployementContract.lblValue = $.lblEmployementContractValue;

	$.imgOfficialLetter.customTitle = "";
	$.imgEstablishment.customTitle = "";
	$.imgTradeLicense.customTitle = "";
	$.imgSignedLetterCor.customTitle = "";
	$.imgPassportCopy.customTitle = "";
	$.imgVisaCopy.customTitle = "";
	$.imgAuditCopy.customTitle = "";
	$.imgResidenceCopy.customTitle = "";
	$.imgSignedLetter.customTitle = "";
	$.imgLeaseCopy.customTitle = "";
	$.imgEmployerLetter.customTitle = "";
	$.imgBankStatement.customTitle = "";
	$.imgSalaryCertificate.customTitle = "";
	$.imgEmployementContract.customTitle = "";

	$.imgOfficialLetter.isFromDropbox = undefined;
	$.imgEstablishment.isFromDropbox = undefined;
	$.imgTradeLicense.isFromDropbox = undefined;
	$.imgSignedLetterCor.isFromDropbox = undefined;
	$.imgPassportCopy.isFromDropbox = undefined;
	$.imgVisaCopy.isFromDropbox = undefined;
	$.imgAuditCopy.isFromDropbox = undefined;
	$.imgResidenceCopy.isFromDropbox = undefined;
	$.imgSignedLetter.isFromDropbox = undefined;
	$.imgLeaseCopy.isFromDropbox = undefined;
	$.imgEmployerLetter.isFromDropbox = undefined;
	$.imgBankStatement.isFromDropbox = undefined;
	$.imgSalaryCertificate.isFromDropbox = undefined;
	$.imgEmployementContract.isFromDropbox = undefined;

	$.imgOfficialLetter.isDownloaded = false;
	$.imgEstablishment.isDownloaded = false;
	$.imgTradeLicense.isDownloaded = false;
	$.imgSignedLetterCor.isDownloaded = false;
	$.imgPassportCopy.isDownloaded = false;
	$.imgVisaCopy.isDownloaded = false;
	$.imgAuditCopy.isDownloaded = false;
	$.imgResidenceCopy.isDownloaded = false;
	$.imgSignedLetter.isDownloaded = false;
	$.imgLeaseCopy.isDownloaded = false;
	$.imgEmployerLetter.isDownloaded = false;
	$.imgBankStatement.isDownloaded = false;
	$.imgSalaryCertificate.isDownloaded = false;
	$.imgEmployementContract.isDownloaded = false;

	$.officialLetterAttachmentView.currentIndex = $.establishmentAttachmentView.currentIndex = $.tradeLicenseAttachmentView.currentIndex = $.signedLetterCorAttachmentView.currentIndex = $.passportCompyAttachmentView.currentIndex = $.visaCopyAttachmentView.currentIndex = $.auditCopyAttachmentView.currentIndex = $.residencyCopyAttachmentView.currentIndex = $.signedLetterAttachmentView.currentIndex = $.leaseCopyAttachmentView.currentIndex = $.employerLetterAttachmentView.currentIndex = $.bankStatementAttachmentView.currentIndex = $.salaryCertiAttachmentView.currentIndex = $.employementContractAttachmentView.currentIndex = 1;

}

var arrOfficialLetterAttachment = [];
var arrEstablishmentAttachment = [];
var arrTradeLicenseAttachment = [];
var arrSignedLetterCorAttachment = [];
var arrPassportCopyAttachment = [];
var arrVisaCopyAttachment = [];
var arrAudityCopyAttachment = [];
var arrResidenceCopyAttachment = [];
var arrSignedLetterAttachment = [];
var arrLeaseCopyAttachment = [];
var arrEmploerLetterAttachment = [];
var arrBankStatementAttachment = [];
var arrSalaryCertiAttachment = [];
var arrEmployementContAttachment = [];

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
var arrCertificateType = [{
	id : 4,
	title : "Corporate",
	titleAr : "Corporate",
}, {
	id : 2,
	title : "Individual",
	titleAr : "Individual",
}];

var isClicked = false;
function selectCertificateType(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrCertificateType.length > 0) {
		openSelectionScreen(arrCertificateType, Alloy.Globals.VTaxSelectedLanguage.certificateType, $.txtCertificateType);
	} else {
		httpManager.getCertificateType(function(arr) {
			if (arr.length > 0) {
				arrCertificateType = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.certificateType, $.txtCertificateType);
			} else {
				isClicked = false;
			}
		});
	}
}

var arrDeliveryMethod = [];
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
	Alloy.Globals.VATTAXDatePicker($.txtFinancialYear, $.winIndTaxApplication);
}

var arrNationalityList = [];
function selectNationality(e) {
	if (isClicked) {
		return;
	}
	isClicked = true;

	if (arrNationalityList.length > 0) {
		openSelectionScreen(arrNationalityList, Alloy.Globals.VTaxSelectedLanguage.nationality, $.txtNationality);
	} else {
		httpManager.getNationalityList(function(arr) {
			if (arr.length > 0) {
				arrNationalityList = arr;
				openSelectionScreen(arr, Alloy.Globals.VTaxSelectedLanguage.nationality, $.txtNationality);
			} else {
				isClicked = false;
			}
		});
	}
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
	Ti.API.info('E.OBJ == ' + JSON.stringify(e));

	if (e.label.id == "txtNationality") {

		if (e.obj.isGCCCountry) {
			Ti.API.info('ENTER');
			$.nationalIdView.height = Titanium.UI.SIZE;
			$.nationalIdView.top = 12;

			$.visaNoView.height = $.visaNoView.top = 0;
			$.txtVisaNo.value = "";

			$.txtNationality.isGCCCountry = true;
		} else {
			$.nationalIdView.height = $.nationalIdView.top = 0;
			$.txtNationalId.value = "";
			$.txtNationality.isGCCCountry = false;

			if (userTypeId == 1) {
				$.visaNoView.height = Titanium.UI.SIZE;
				$.visaNoView.top = 12;
			}

		}
	}

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
			originalColor : Alloy.Globals.path.grayColor,
			layout : "vertical"
		});
		$.adminCommentView.add(commentView);
		var lblComment = Ti.UI.createLabel({
			top : 5,
			left : 5,
			right : 5,
			height : Ti.UI.SIZE,
			color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : "black",
			font : (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font13,
			originalColor : "#000",
			text : arr[i].commentedBody
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
			text : "-By : " + arr[i].commentedBy
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

/*
 *
 *  PHOTO
 *
 */

function photoFattchSuccess(e) {
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
						width : 400, //widthOfImage,
						height : 480, // newHeight,
						quality : ImageFactory.QUALITY_LOW
					});

					heightOfImage = selected_Image.height;
					widthOfImage = selected_Image.width;
				} else {
					selected_Image.imageAsResized(400, 480);
				}

				// Alloy.Globals.hideLoading();
			}

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
				color : Alloy.Globals.path.borderColor
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

				if (e.source.selectedImageAttachment == $.imgOfficialLetter) {
					arrOfficialLetterAttachment.splice(arrOfficialLetterAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('PAss ID = ' + e.source.imageIndex + 'Official DELETE inFO = ' + JSON.stringify(arrOfficialLetterAttachment));
				} else if (e.source.selectedImageAttachment == $.imgEstablishment) {
					arrEstablishmentAttachment.splice(arrEstablishmentAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('REsi ID = ' + e.source.imageIndex + 'Establishment DELETE inFO = ' + JSON.stringify(arrEstablishmentAttachment));
				} else if (e.source.selectedImageAttachment == $.imgPassportCopy) {
					arrPassportCopyAttachment.splice(arrPassportCopyAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('PAss ID = ' + e.source.imageIndex + 'Pass DELETE inFO = ' + JSON.stringify(arrPassportCopyAttachment));
				} else if (e.source.selectedImageAttachment == $.imgResidenceCopy) {
					arrResidenceCopyAttachment.splice(arrResidenceCopyAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('REsi ID = ' + e.source.imageIndex + 'RES DELETE inFO = ' + JSON.stringify(arrResidenceCopyAttachment));
				} else if (e.source.selectedImageAttachment == $.imgSignedLetter) {
					arrSignedLetterAttachment.splice(arrSignedLetterAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Sign ID = ' + e.source.imageIndex + 'Signed DELETE inFO = ' + JSON.stringify(arrSignedLetterAttachment));
				} else if (e.source.selectedImageAttachment == $.imgLeaseCopy) {
					arrLeaseCopyAttachment.splice(arrLeaseCopyAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('lease ID = ' + e.source.imageIndex + 'lease DELETE inFO = ' + JSON.stringify(arrLeaseCopyAttachment));
				} else if (e.source.selectedImageAttachment == $.imgEmployerLetter) {
					arrEmploerLetterAttachment.splice(arrEmploerLetterAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Employer ID = ' + e.source.imageIndex + 'Employer DELETE inFO = ' + JSON.stringify(arrEmploerLetterAttachment));
				} else if (e.source.selectedImageAttachment == $.imgBankStatement) {
					arrBankStatementAttachment.splice(arrBankStatementAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Bank ID = ' + e.source.imageIndex + 'Bank DELETE inFO = ' + JSON.stringify(arrBankStatementAttachment));
				} else if (e.source.selectedImageAttachment == $.imgSalaryCertificate) {
					arrSalaryCertiAttachment.splice(arrSalaryCertiAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Salary ID = ' + e.source.imageIndex + 'Salary DELETE inFO = ' + JSON.stringify(arrSalaryCertiAttachment));
				} else if (e.source.selectedImageAttachment == $.imgEmployementContract) {
					arrEmployementContAttachment.splice(arrEmployementContAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Employemnet ID = ' + e.source.imageIndex + 'Employemnet DELETE inFO = ' + JSON.stringify(arrEmployementContAttachment));
				} else if (e.source.selectedImageAttachment == $.imgTradeLicense) {
					arrTradeLicenseAttachment.splice(arrTradeLicenseAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Trade ID = ' + e.source.imageIndex + 'Trade DELETE inFO = ' + JSON.stringify(arrTradeLicenseAttachment));
				} else if (e.source.selectedImageAttachment == $.imgSignedLetterCor) {
					arrSignedLetterCorAttachment.splice(arrSignedLetterCorAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Signed C ID = ' + e.source.imageIndex + 'Signed C DELETE inFO = ' + JSON.stringify(arrSignedLetterCorAttachment));
				} else if (e.source.selectedImageAttachment == $.imgVisaCopy) {
					arrVisaCopyAttachment.splice(arrVisaCopyAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Visa ID = ' + e.source.imageIndex + 'Visa DELETE inFO = ' + JSON.stringify(arrVisaCopyAttachment));
				} else if (e.source.selectedImageAttachment == $.imgAuditCopy) {
					arrAudityCopyAttachment.splice(arrAudityCopyAttachment.indexOf(e.source.imageIndex), 1);
					Ti.API.info('Audit ID = ' + e.source.imageIndex + 'audit DELETE inFO = ' + JSON.stringify(arrAudityCopyAttachment));
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
				view.left = 0;
				view.right = 0;
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

			if (selectedAttachment != undefined) {

				switch(selectedAttachment) {
				case $.imgOfficialLetter:

					lblTitle.text = "OfficialLetter" + $.officialLetterAttachmentView.currentIndex + extension;
					$.officialLetterAttachmentView.currentIndex++;
					$.officialLetterAttachmentView.mainImageView = $.imgOfficialLetter;

					imgDelete.gParentView = $.officialLetterAttachmentView;

					objUploadAttachment.typeId = 5;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Official Letter";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							//$.tradeLicenseAttachmentView.currentIndex;
							arrOfficialLetterAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' PASS ADD inFO = ' + JSON.stringify(arrOfficialLetterAttachment));
							$.officialLetterAttachmentView.add(view);
						}
					});
					break;
				case $.imgEstablishment:

					lblTitle.text = "Establishment" + $.establishmentAttachmentView.currentIndex + extension;
					$.establishmentAttachmentView.currentIndex++;
					$.establishmentAttachmentView.mainImageView = $.imgEstablishment;

					imgDelete.gParentView = $.establishmentAttachmentView;

					objUploadAttachment.typeId = 15;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Passport Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							//$.tradeLicenseAttachmentView.currentIndex;
							arrEstablishmentAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' PASS ADD inFO = ' + JSON.stringify(arrEstablishmentAttachment));
							$.establishmentAttachmentView.add(view);
						}
					});
					break;
				case $.imgPassportCopy:

					lblTitle.text = "PassportCopy" + $.passportCompyAttachmentView.currentIndex + extension;
					$.passportCompyAttachmentView.currentIndex++;
					$.passportCompyAttachmentView.mainImageView = $.imgPassportCopy;

					imgDelete.gParentView = $.passportCompyAttachmentView;

					objUploadAttachment.typeId = 1;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Passport Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							//$.tradeLicenseAttachmentView.currentIndex;
							arrPassportCopyAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' PASS ADD inFO = ' + JSON.stringify(arrPassportCopyAttachment));
							$.passportCompyAttachmentView.add(view);
						}
					});
					break;
				case $.imgResidenceCopy:

					lblTitle.text = "ResidenceCopy" + $.residencyCopyAttachmentView.currentIndex + extension;

					$.residencyCopyAttachmentView.currentIndex++;
					$.residencyCopyAttachmentView.mainImageView = $.imgResidenceCopy;
					imgDelete.gParentView = $.residencyCopyAttachmentView;
					// $.residencyCopyAttachmentView.add(view);

					objUploadAttachment.typeId = 2;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Residence Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrResidenceCopyAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' REs ADD inFO = ' + JSON.stringify(arrResidenceCopyAttachment));
							$.residencyCopyAttachmentView.add(view);
						}
					});
					break;
				case $.imgSignedLetter:

					lblTitle.text = "SignedLetter" + $.signedLetterAttachmentView.currentIndex + extension;

					$.signedLetterAttachmentView.currentIndex++;
					$.signedLetterAttachmentView.mainImageView = $.imgSignedLetter;

					imgDelete.gParentView = $.signedLetterAttachmentView;

					objUploadAttachment.typeId = 3;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Signed Letter";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrSignedLetterAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Signed ADD inFO = ' + JSON.stringify(arrSignedLetterAttachment));
							$.signedLetterAttachmentView.add(view);
						}
					});
					break;
				case $.imgLeaseCopy:

					lblTitle.text = "LeaseCopy" + $.leaseCopyAttachmentView.currentIndex + extension;

					$.leaseCopyAttachmentView.currentIndex++;

					$.leaseCopyAttachmentView.mainImageView = $.imgLeaseCopy;
					imgDelete.gParentView = $.leaseCopyAttachmentView;

					objUploadAttachment.typeId = 8;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Lease Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrLeaseCopyAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Lease ADD inFO = ' + JSON.stringify(arrLeaseCopyAttachment));
							$.leaseCopyAttachmentView.add(view);
						}
					});
					break;
				case $.imgEmployerLetter:

					lblTitle.text = "EmployerLetter" + $.employerLetterAttachmentView.currentIndex + extension;

					$.employerLetterAttachmentView.currentIndex++;
					$.employerLetterAttachmentView.mainImageView = $.imgEmployerLetter;
					imgDelete.gParentView = $.employerLetterAttachmentView;

					objUploadAttachment.typeId = 16;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Employer Letter";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrEmploerLetterAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Employer ADD inFO = ' + JSON.stringify(arrEmploerLetterAttachment));
							$.employerLetterAttachmentView.add(view);
						}
					});

					break;
				case $.imgBankStatement:

					lblTitle.text = "BankStatement" + $.bankStatementAttachmentView.currentIndex + extension;

					$.bankStatementAttachmentView.currentIndex++;
					$.bankStatementAttachmentView.mainImageView = $.imgBankStatement;
					imgDelete.gParentView = $.bankStatementAttachmentView;

					objUploadAttachment.typeId = 14;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Bank Statement";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrBankStatementAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Bank ADD inFO = ' + JSON.stringify(arrBankStatementAttachment));
							$.bankStatementAttachmentView.add(view);
						}
					});
					break;
				case $.imgSalaryCertificate:

					lblTitle.text = "SalaryCertificate" + $.salaryCertiAttachmentView.currentIndex + extension;

					$.salaryCertiAttachmentView.currentIndex++;
					$.salaryCertiAttachmentView.mainImageView = $.imgSalaryCertificate;
					imgDelete.gParentView = $.salaryCertiAttachmentView;

					objUploadAttachment.typeId = 11;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Salary Certificate";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrSalaryCertiAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Salary ADD inFO = ' + JSON.stringify(arrSalaryCertiAttachment));
							$.salaryCertiAttachmentView.add(view);
						}
					});
					break;
				case $.imgEmployementContract:

					lblTitle.text = "EmployementContract" + $.employementContractAttachmentView.currentIndex + extension;

					$.employementContractAttachmentView.currentIndex++;
					$.employementContractAttachmentView.mainImageView = $.imgEmployementContract;
					imgDelete.gParentView = $.employementContractAttachmentView;

					objUploadAttachment.typeId = 17;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Employement Contract";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrEmployementContAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Employement ADD inFO = ' + JSON.stringify(arrEmployementContAttachment));
							$.employementContractAttachmentView.add(view);
						}
					});
					break;
				case $.imgTradeLicense:

					lblTitle.text = "TradeLicense" + $.tradeLicenseAttachmentView.currentIndex + extension;

					$.tradeLicenseAttachmentView.currentIndex++;
					$.tradeLicenseAttachmentView.mainImageView = $.imgTradeLicense;
					imgDelete.gParentView = $.tradeLicenseAttachmentView;

					objUploadAttachment.typeId = 5;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Trade License";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrTradeLicenseAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Trade ADD inFO = ' + JSON.stringify(arrTradeLicenseAttachment));
							$.tradeLicenseAttachmentView.add(view);
						}
					});
					break;
				case $.imgSignedLetterCor:

					lblTitle.text = "SignedLetter" + $.signedLetterCorAttachmentView.currentIndex + extension;

					$.signedLetterCorAttachmentView.currentIndex++;
					$.signedLetterCorAttachmentView.mainImageView = $.imgSignedLetterCor;
					imgDelete.gParentView = $.signedLetterCorAttachmentView;

					objUploadAttachment.typeId = 6;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Signed Letter";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrSignedLetterCorAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Signed C ADD inFO = ' + JSON.stringify(arrSignedLetterCorAttachment));
							$.signedLetterCorAttachmentView.add(view);
						}
					});
					break;
				case $.imgVisaCopy:

					lblTitle.text = "VisaCopy" + $.visaCopyAttachmentView.currentIndex + extension;

					$.visaCopyAttachmentView.currentIndex++;
					$.visaCopyAttachmentView.mainImageView = $.imgVisaCopy;
					imgDelete.gParentView = $.visaCopyAttachmentView;

					objUploadAttachment.typeId = 2;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Visa Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrVisaCopyAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Visa ADD inFO = ' + JSON.stringify(arrVisaCopyAttachment));
							$.visaCopyAttachmentView.add(view);
						}
					});
					break;
				case $.imgAuditCopy:

					lblTitle.text = "AuditCopy" + $.auditCopyAttachmentView.currentIndex + extension;

					$.auditCopyAttachmentView.currentIndex++;
					$.auditCopyAttachmentView.mainImageView = $.imgAuditCopy;
					imgDelete.gParentView = $.auditCopyAttachmentView;

					objUploadAttachment.typeId = 13;
					objUploadAttachment.name = lblTitle.text;
					httpManager.uploadAttachment(objUploadAttachment, function(fileId) {
						if (fileId != null) {
							selectedAttachment.lblValue.text = "";
							selectedAttachment.customTitle = "Audit Copy";

							if (e.mediaType == "dropbox") {
								selectedAttachment.isFromDropbox = true;
								selectedAttachment.height = 0;
								selectedAttachment.width = 0;
							} else {
								selectedAttachment.isFromDropbox = false;
							}

							// selectedAttachment.image = Alloy.Globals.path.icnDone;
							selectedAttachment.selectedImage = selected_Image;
							imgDelete.imageIndex = fileId;
							arrAudityCopyAttachment.push(imgDelete.imageIndex);
							Ti.API.info(' INDEX == ' + imgDelete.imageIndex + ' Audit ADD inFO = ' + JSON.stringify(arrAudityCopyAttachment));
							$.auditCopyAttachmentView.add(view);
						}
					});
					break;

				}

			}

		} catch(exx) {
			Alloy.Globals.hideLoading();
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
				success : photoFattchSuccess,
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
			success : photoFattchSuccess, // end of success block
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

var arrOptions = [Alloy.Globals.VTaxSelectedLanguage.useCamera, Alloy.Globals.VTaxSelectedLanguage.selectFromGallery, Alloy.Globals.VTaxSelectedLanguage.useDropbox];
// Modified for dropbox
if (OS_IOS) {
	arrOptions.push(Alloy.Globals.VTaxSelectedLanguage.cancel);
}

var isCanceled = false;

function dropBoxSuccess(byteData) {
	photoFattchSuccess({
		mediaType : "dropbox",
		media : byteData
	});
}

function addImageAttachment(arg) {

	isCanceled = false;
	arrMediaTypes = [Ti.Media.MEDIA_TYPE_PHOTO];
	mediaOptionDialog = Titanium.UI.createOptionDialog({
		options : arrOptions,
		cancel : 3, // Modified for dropbox
	});

	mediaOptionDialog.addEventListener('click', function(e) {
		Ti.API.info('e.index  = ' + e.index);
		if (isCanceled) {
			return;
		}
		var ind = e.index;
		if (ind == 0) {
			if (arg.source.isFromDropbox) {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
				return;
			}

			selectedAttachment = arg.source;
			showCamera(arg);
		} else if (ind == 1) {
			if (arg.source.isFromDropbox) {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
				return;
			}

			selectedAttachment = arg.source;
			choosePhotoGallery(arg);
		} else if (ind == 2) {
			if (arg.source.isFromDropbox == false && arg.source.isFromDropbox != undefined) {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.attachments, Alloy.Globals.VTaxSelectedLanguage.notAccessDropbox);
				return;
			}
			selectedAttachment = arg.source;
			Alloy.Globals.openWindow(Alloy.createController('common/dropbox/winFilesAndFoldersList', {
				callback : dropBoxSuccess
			}).getView());
		} else {
			isCanceled = true;
			selectedAttachment = undefined;
		}
	});
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
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectCertificateDMethod);
	 return false;
	 } else*/
	if ($.txtFinancialYear.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.vatApplication, Alloy.Globals.VTaxSelectedLanguage.selectFinancialYear);
		return false;
	}

	if (userTypeId == 2 || userTypeId == 3) {
		if ($.txtCompanyName.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterCompanyName);
			return false;
		}/* else if (isLetter($.txtCompanyName.value.trim())) {
		 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidCompanyName);
		 return false;
		 } else if ($.txtchamberOfCom.value.trim() == "") {
		 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterChamberOfCom);
		 return false;
		 } else if (isLetter($.txtchamberOfCom.value.trim())) {
		 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidChamberOfCom);
		 return false;
		 } */else if ($.txtLicenseNo.value.trim() == "" && userTypeId != 3) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterTradeLicenseNo);
			return false;
		} else if ($.txtEmirate.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.plsSelectEmirate);
			return false;
		} else if ($.txtAddress.value.trim() == "" || $.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterAddress);
			return false;
		} else if ($.txtMobileNo.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterMobile);
			return false;
		} else if (!validatePhone($.txtMobileNo.value.trim()) || $.txtMobileNo.value.trim().length < 10) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidMobileNo);
			return false;
		} else if (($.txtPhoneNo.value.trim().length > 0 && $.txtPhoneNo.value.trim().length < 8) || !validatePhone($.txtPhoneNo.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPhoneNo);
			return false;
		} else if (($.txtFaxNo.value.trim().length > 0 && $.txtFaxNo.value.trim().length < 8) || !validatePhone($.txtFaxNo.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidFaxNo);
			return false;
		} else if ($.txtPOBox.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterPOBox);
			return false;
		} else if (!($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 10)) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
			return false;
		} else if (!validatePhone($.txtPOBox.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
			return false;
		} else if ($.txtEmail.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterEmail);
			return false;
		} else if (!Alloy.Globals.validateEmail($.txtEmail.value)) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidEmail);
			return false;
		} else if ($.txtCountryIssued.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectCountryIssued);
			return false;
		} else if ($.txtPlaceOfIssuing.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectPlaceOfIssue);
			return false;
		} else if ($.txtcLanguage.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectLanguage);
			return false;
		}
		if (userTypeId == 2) {
			if ($.imgTradeLicense.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachTradeLicense);
				return false;
			} else if ($.imgSignedLetterCor.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachSignedLetterCor);
				return false;
			} else if ($.imgPassportCopy.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachPassportCopy);
				return false;
			} else if ($.imgVisaCopy.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachVisaCopy);
				return false;
			} else if ($.imgAuditCopy.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachAuditCopy);
				return false;
			} else if ($.imgLeaseCopy.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachLeaseCopy);
				return false;
			}
		} else {
			if ($.imgOfficialLetter.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachOfficialLetter);
				return false;
			} else if ($.imgEstablishment.customTitle == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachEstablishment);
				return false;
			}
		}
	} else if (userTypeId == 1) {
		if ($.txtName.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterTaxName);
			return false;
		} else if ($.txtPassportNo.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterPassportNumber);
			return false;
		} else if ($.txtNationality.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectNationality);
			return false;
		} else if ($.txtVisaNo.value.trim() == "" && $.txtNationality.isGCCCountry == false) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterVisaNumber);
			return false;
		}/* else if ($.txtNationalId.value.trim() == ""  && $.txtNationality.isGCCCountry == true) {
		 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterNationalId);
		 return false;
		 } */else if ($.txtEmirate.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.plsSelectEmirate);
			return false;
		} else if ($.txtAddress.value.trim() == "" || $.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterAddress);
			return false;
		} else if ($.txtMobileNo.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterMobile);
			return false;
		} else if (!validatePhone($.txtMobileNo.value.trim()) || $.txtMobileNo.value.trim().length < 10) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidMobileNo);
			return false;
		} else if (($.txtPhoneNo.value.trim().length > 0 && $.txtPhoneNo.value.trim().length < 8) || !validatePhone($.txtPhoneNo.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPhoneNo);
			return false;
		} else if (($.txtFaxNo.value.trim().length > 0 && $.txtFaxNo.value.trim().length < 8) || !validatePhone($.txtFaxNo.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidFaxNo);
			return false;
		} else if ($.txtPOBox.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterPOBox);
			return false;
		} else if (!($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 10)) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
			return false;
		} else if (!validatePhone($.txtPOBox.value.trim())) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
			return false;
		} else if ($.txtWorkFor.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterWorkFor);
			return false;
		} else if ($.txtEmail.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.enterEmail);
			return false;
		} else if (!Alloy.Globals.validateEmail($.txtEmail.value)) {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.invalidEmail);
			return false;
		} else if ($.txtCountryIssued.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectCountryIssued);
			return false;
		} else if ($.txtPlaceOfIssuing.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectPlaceOfIssue);
			return false;
		} else if ($.txtcLanguage.value.trim() == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.selectLanguage);
			return false;
		} else if ($.imgPassportCopy.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachPassportCopy);
			return false;
		} else if ($.imgResidenceCopy.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachResidencyCopy);
			return false;
		} else if ($.imgSignedLetter.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachSignedLetterCustomer);
			return false;
		} else if ($.imgLeaseCopy.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachLeaseCopy);
			return false;
		} else if ($.imgEmployerLetter.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachEmployerLetter);
			return false;
		} else if ($.imgBankStatement.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachBankStatement);
			return false;
		} else if ($.imgSalaryCertificate.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachSalaryCertificate);
			return false;
		} else if ($.imgEmployementContract.customTitle == "") {
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, Alloy.Globals.VTaxSelectedLanguage.attachEmployementContract);
			return false;
		}

	}

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
	title : Alloy.Globals.VTaxSelectedLanguage.taxApplication,
	message : Alloy.Globals.VTaxSelectedLanguage.vatTaxSuccess,
	buttonNames : [Alloy.Globals.VTaxSelectedLanguage.ok],
});
successAlert.addEventListener("click", function(e) {
	closeWindow();
});

function submitTax(e) {

	/*	if (appId != -1) {
	 var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=000000-0162";
	 Ti.API.info('payment URL = ' + paymentUrl);
	 Ti.Platform.openURL(paymentUrl);
	 return;
	 }*/

	if (!validateData()) {
		return;
	}

	var arrAttachment = [];

	if (userTypeId == 2) {

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
			name : "CorporateSignedLetter.png", //$.lblSignedLetterCorValue.text,
			data : ($.imgSignedLetterCor.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgSignedLetterCor.selectedImage),
			arr : arrSignedLetterCorAttachment,
			isDownloaded : $.imgSignedLetterCor.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[2].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[2].attachmentAppId : -1,
			typeId : 1,
			name : "PassportCopy.png", //$.lblPassportCopyValue.text,
			data : ($.imgPassportCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgPassportCopy.selectedImage),
			arr : arrPassportCopyAttachment,
			isDownloaded : $.imgPassportCopy.isDownloaded

		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[3].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[3].attachmentAppId : -1,
			typeId : 2,
			name : "VisaCopy.png", //$.lblVisaCopyValue.text,
			data : ($.imgVisaCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgVisaCopy.selectedImage),
			arr : arrVisaCopyAttachment,
			isDownloaded : $.imgVisaCopy.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[4].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[4].attachmentAppId : -1,
			typeId : 13,
			name : "AuditCopy.png", //$.lblAuditCopyValue.text,
			data : ($.imgAuditCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgAuditCopy.selectedImage),
			arr : arrAudityCopyAttachment,
			isDownloaded : $.imgAuditCopy.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[5].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[5].attachmentAppId : -1,
			typeId : 8,
			name : "LeaseCopy.png", //$.lblLeaseCopyValue.text,
			data : ($.imgLeaseCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgLeaseCopy.selectedImage),
			arr : arrLeaseCopyAttachment,
			isDownloaded : $.imgLeaseCopy.isDownloaded
		}];
	} else if (userTypeId == 1) {
		arrAttachment = [{
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentAppId : -1,
			typeId : 1,
			name : "PassportCopy.png", //$.lblPassportCopyValue.text,
			data : ($.imgPassportCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgPassportCopy.selectedImage),
			arr : arrPassportCopyAttachment,
			isDownloaded : $.imgPassportCopy.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentAppId : -1,
			typeId : 2,
			name : "ResidenceCopy.png", //$.lblResidenceCopyValue.text,
			data : ($.imgResidenceCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgResidenceCopy.selectedImage),
			arr : arrResidenceCopyAttachment,
			isDownloaded : $.imgResidenceCopy.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[2].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[2].attachmentAppId : -1,
			typeId : 3,
			name : "SignedLetter.png", //$.lblSignedLetterValue.text,
			data : ($.imgSignedLetter.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgSignedLetter.selectedImage),
			arr : arrSignedLetterAttachment,
			isDownloaded : $.imgSignedLetter.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[3].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[3].attachmentAppId : -1,
			typeId : 8,
			name : "LeaseCopy.png", //$.lblLeaseCopyValue.text,
			data : ($.imgLeaseCopy.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgLeaseCopy.selectedImage),
			arr : arrLeaseCopyAttachment,
			isDownloaded : $.imgLeaseCopy.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[4].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[4].attachmentAppId : -1,
			typeId : 16,
			name : "EmployerLetter.png", //$.lblEmployerLetterValue.text,
			data : ($.imgEmployerLetter.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgEmployerLetter.selectedImage),
			arr : arrEmploerLetterAttachment,
			isDownloaded : $.imgEmployerLetter.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[5].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[5].attachmentAppId : -1,
			typeId : 14,
			name : "BankStatement.png", //$.lblBankStatementValue.text,
			data : ($.imgBankStatement.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgBankStatement.selectedImage),
			arr : arrBankStatementAttachment,
			isDownloaded : $.imgBankStatement.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[6].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[6].attachmentAppId : -1,
			typeId : 11,
			name : "SalaryCertificate.png", //$.lblSalaryCertificateValue.text,
			data : ($.imgSalaryCertificate.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgSalaryCertificate.selectedImage),
			arr : arrSalaryCertiAttachment,
			isDownloaded : $.imgSalaryCertificate.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[7].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[7].attachmentAppId : -1,
			typeId : 17,
			name : "EmployementContract.png", //$.lblEmployementContractValue.text,
			data : ($.imgEmployementContract.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgEmployementContract.selectedImage),
			arr : arrEmployementContAttachment,
			isDownloaded : $.imgEmployementContract.isDownloaded
		}];
	} else if (userTypeId == 3) {
		arrAttachment = [{
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[0].attachmentAppId : -1,
			typeId : 5,
			name : "OfficialLetter.png", //$.lblTradeLicenseValue.text,
			data : ($.imgOfficialLetter.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgOfficialLetter.selectedImage),
			arr : arrOfficialLetterAttachment,
			isDownloaded : $.imgOfficialLetter.isDownloaded
		}, {
			sequenceId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentID : -1,
			appId : (objDetail != undefined) ? objDetail.arrAttachment[1].attachmentAppId : -1,
			typeId : 15,
			name : "Establishment.png", //$.lblSignedLetterValue.text,
			data : ($.imgEstablishment.isDownloaded == true) ? "" : Ti.Utils.base64encode($.imgEstablishment.selectedImage),
			arr : arrEstablishmentAttachment,
			isDownloaded : $.imgEstablishment.isDownloaded
		}];
	}

	var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
	var objDate = new Date();
	var curerntDate = objDate.getFullYear() + "-" + (objDate.getMonth() + 1) + "-" + objDate.getDate();
	var obj = {
		financialYear : $.txtFinancialYear.value,
		emirateId : $.txtEmirate.custId,
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
		certificateTypeId : 1,
		// initiatorName : userInfo.userName, //userInfo.fullName,
		initiatorUserName : userInfo.userName,
		formSubmitDate : Alloy.Globals.moment().format("YYYY-MM-DD"),
		comments : $.txtComments.value,

		certificateDeliveryMethodId : 1,
		eDhirhamCardCode : "1-9",
		arrAttachment : arrAttachment,
		// natureOfBusiness : $.txtNatureOfBusiness.value
	};

	if (userTypeId == 2 || userTypeId == 3) {//Corporate TAX 2 || Government == 3
		obj.companyName = $.txtCompanyName.value;
		obj.initiatorName = $.txtCompanyName.value;
		obj.chamberOfCommerce = ($.txtchamberOfCom.value.length == 0) ? "" : $.txtchamberOfCom.value;
		obj.tradeLicenseNo = $.txtLicenseNo.value;
		obj.applicationWFTypeID = (userTypeId == 3) ? 4 : 4;
		obj.nationalityId = 0;
	} else if (userTypeId == 1) {//Ind TAX
		obj.applicationWFTypeID = 2;
		obj.name = $.txtName.value;
		obj.initiatorName = $.txtName.value;
		obj.passportNumber = $.txtPassportNo.value;
		obj.nationalityId = $.txtNationality.custId;
		obj.visaNumber = ($.txtVisaNo.value.length == 0) ? "" : $.txtVisaNo.value;
		obj.nationalId = ($.txtNationalId.value.length == 0) ? "" : $.txtNationalId.value;
		obj.workFor = $.txtWorkFor.value;
	}
	if (objDetail == undefined) {
		httpManager.submitCorporateTax(obj, function(e, isExpired, alertMessage) {
			if (e == null && isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
				return;
			} else if (e != null) {
				setTokenData(e);
				Ti.API.info('APP ID = ' + e.applicationId);
				// Ti.API.info('Bank Url= ' + e.bankUrl);
				appId = e.applicationId;
				successAlert.show();
				/*var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + e.applicationId + "&serviceCode=000000-0162";
				 Ti.API.info('payment URL = ' + paymentUrl);
				 Ti.Platform.openURL(paymentUrl);*/
			}
		});
	} else {
		Ti.API.info('OBJDETAIL == ' + JSON.stringify(objDetail));
		obj.vTaxId = objDetail.vTaxId;
		obj.applicationBusinessId = objDetail.applicationBusinessId;
		httpManager.updateCorporateTax(obj, function(e, isExpired, alertMessage) {
			if (e == null && isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
				return;
			} else if (e != null) {
				setTokenData(e);
				Ti.API.info('APP ID = ' + e.applicationId);
				// Ti.API.info('Bank Url= ' + e.bankUrl);
				appId = e.applicationId;
				successAlert.show();

			}
		});
	}
}

/*function getServiceDescription() {
 if (serviceDescription == null) {
 httpManager.getServiceDescription(106, function(e) {
 if (e == null) {
 return;
 }
 serviceDescription = e;
 });
 } else {
 openHelpScreen();
 }
 }*/

/*
 *
 *
 */

function closeWindow() {
	Alloy.Globals.closeWindow($.winIndTaxApplication);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

$.winIndTaxApplication.addEventListener("focus", function(e) {
	isClicked = false;
	$.viewBottomToolbar.setDefaultTheme($.winIndTaxApplication);
});
$.viewBottomToolbar.setDefaultTheme($.winIndTaxApplication);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winIndTaxApplication);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winIndTaxApplication);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winIndTaxApplication);
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
			if (userTypeId == 3) {
				if (arrAttachedAttacment[i].attachmentTypeId == 5) {
					arrAttachedAttacment[i].selectedAttachment = $.imgOfficialLetter;
					showAttachment($.officialLetterAttachmentView, arrAttachedAttacment[i]);
					$.imgOfficialLetter.isDownloaded = true;
					$.imgOfficialLetter.customTitle = "Official Letter";
					$.imgOfficialLetter.height = $.imgOfficialLetter.width = 0;
					$.imgOfficialLetter.lblValue.text = "";

				} else if (arrAttachedAttacment[i].attachmentTypeId == 15) {
					arrAttachedAttacment[i].selectedAttachment = $.imgEstablishment;
					showAttachment($.establishmentAttachmentView, arrAttachedAttacment[i]);
					$.imgEstablishment.isDownloaded = true;
					$.imgEstablishment.customTitle = "Establishment";
					$.imgEstablishment.height = $.imgEstablishment.width = 0;
					$.imgEstablishment.lblValue.text = "";
				}
			} else if (userTypeId == 2) {
				if (arrAttachedAttacment[i].attachmentTypeId == 5) {
					arrAttachedAttacment[i].selectedAttachment = $.imgTradeLicense;
					showAttachment($.tradeLicenseAttachmentView, arrAttachedAttacment[i]);
					$.imgTradeLicense.isDownloaded = true;
					$.imgTradeLicense.customTitle = "Trade License";
					$.imgTradeLicense.height = $.imgTradeLicense.width = 0;
					$.imgTradeLicense.lblValue.text = "";

				} else if (arrAttachedAttacment[i].attachmentTypeId == 6) {
					arrAttachedAttacment[i].selectedAttachment = $.imgSignedLetterCor;
					showAttachment($.signedLetterCorAttachmentView, arrAttachedAttacment[i]);
					$.imgSignedLetterCor.isDownloaded = true;
					$.imgSignedLetterCor.customTitle = "Signed Letter Of corporate";
					$.imgSignedLetterCor.height = $.imgSignedLetterCor.width = 0;
					$.imgSignedLetterCor.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 1) {
					arrAttachedAttacment[i].selectedAttachment = $.imgPassportCopy;
					showAttachment($.passportCompyAttachmentView, arrAttachedAttacment[i]);
					$.imgPassportCopy.isDownloaded = true;
					$.imgPassportCopy.customTitle = "Passport Copy";
					$.imgPassportCopy.height = $.imgPassportCopy.width = 0;
					$.imgPassportCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 2) {
					arrAttachedAttacment[i].selectedAttachment = $.imgVisaCopy;
					showAttachment($.visaCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgVisaCopy.isDownloaded = true;
					$.imgVisaCopy.customTitle = "Visa Copy";
					$.imgVisaCopy.height = $.imgVisaCopy.width = 0;
					$.imgVisaCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 13) {
					arrAttachedAttacment[i].selectedAttachment = $.imgAuditCopy;
					showAttachment($.auditCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgAuditCopy.isDownloaded = true;
					$.imgAuditCopy.customTitle = "Audit Copy";
					$.imgAuditCopy.height = $.imgAuditCopy.width = 0;
					$.imgAuditCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 8) {
					arrAttachedAttacment[i].selectedAttachment = $.imgLeaseCopy;
					showAttachment($.leaseCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgLeaseCopy.isDownloaded = true;
					$.imgLeaseCopy.customTitle = "Audit Copy";
					$.imgLeaseCopy.height = $.imgLeaseCopy.width = 0;
					$.imgLeaseCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 8) {
					arrAttachedAttacment[i].selectedAttachment = $.imgLeaseCopy;
					showAttachment($.leaseCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgLeaseCopy.isDownloaded = true;
					$.imgLeaseCopy.customTitle = "Lease Copy";
					$.imgLeaseCopy.height = $.imgLeaseCopy.width = 0;
					$.imgLeaseCopy.lblValue.text = "";
				}
			} else {
				if (arrAttachedAttacment[i].attachmentTypeId == 1) {
					arrAttachedAttacment[i].selectedAttachment = $.imgPassportCopy;
					showAttachment($.passportCompyAttachmentView, arrAttachedAttacment[i]);
					$.imgPassportCopy.isDownloaded = true;
					$.imgPassportCopy.customTitle = "Passport Copy";
					$.imgPassportCopy.height = $.imgPassportCopy.width = 0;
					$.imgPassportCopy.lblValue.text = "";

				} else if (arrAttachedAttacment[i].attachmentTypeId == 2) {
					arrAttachedAttacment[i].selectedAttachment = $.imgResidenceCopy;
					showAttachment($.residencyCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgResidenceCopy.isDownloaded = true;
					$.imgResidenceCopy.customTitle = "Residence Copy";
					$.imgResidenceCopy.height = $.imgResidenceCopy.width = 0;
					$.imgResidenceCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 3) {
					arrAttachedAttacment[i].selectedAttachment = $.imgSignedLetter;
					showAttachment($.signedLetterAttachmentView, arrAttachedAttacment[i]);
					$.imgSignedLetter.isDownloaded = true;
					$.imgSignedLetter.customTitle = "Residence Copy";
					$.imgSignedLetter.height = $.imgSignedLetter.width = 0;
					$.imgSignedLetter.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 8) {
					arrAttachedAttacment[i].selectedAttachment = $.imgLeaseCopy;
					showAttachment($.leaseCopyAttachmentView, arrAttachedAttacment[i]);
					$.imgLeaseCopy.isDownloaded = true;
					$.imgLeaseCopy.customTitle = "Lease Copy";
					$.imgLeaseCopy.height = $.imgLeaseCopy.width = 0;
					$.imgLeaseCopy.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 16) {
					arrAttachedAttacment[i].selectedAttachment = $.imgEmployerLetter;
					showAttachment($.employerLetterAttachmentView, arrAttachedAttacment[i]);
					$.imgEmployerLetter.isDownloaded = true;
					$.imgEmployerLetter.customTitle = "Employer Letter";
					$.imgEmployerLetter.height = $.imgEmployerLetter.width = 0;
					$.imgEmployerLetter.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 14) {
					arrAttachedAttacment[i].selectedAttachment = $.imgBankStatement;
					showAttachment($.bankStatementAttachmentView, arrAttachedAttacment[i]);
					$.imgBankStatement.isDownloaded = true;
					$.imgBankStatement.customTitle = "Bank Statement";
					$.imgBankStatement.height = $.imgBankStatement.width = 0;
					$.imgBankStatement.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 11) {
					arrAttachedAttacment[i].selectedAttachment = $.imgSalaryCertificate;
					showAttachment($.salaryCertiAttachmentView, arrAttachedAttacment[i]);
					$.imgSalaryCertificate.isDownloaded = true;
					$.imgSalaryCertificate.customTitle = "Salary Certificate";
					$.imgSalaryCertificate.height = $.imgSalaryCertificate.width = 0;
					$.imgSalaryCertificate.lblValue.text = "";
				} else if (arrAttachedAttacment[i].attachmentTypeId == 17) {
					arrAttachedAttacment[i].selectedAttachment = $.imgEmployementContract;
					showAttachment($.employementContractAttachmentView, arrAttachedAttacment[i]);
					$.imgEmployementContract.isDownloaded = true;
					$.imgEmployementContract.customTitle = "Employement Contract";
					$.imgEmployementContract.height = $.imgEmployementContract.width = 0;
					$.imgEmployementContract.lblValue.text = "";
				}

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
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};
changeLanguage();
