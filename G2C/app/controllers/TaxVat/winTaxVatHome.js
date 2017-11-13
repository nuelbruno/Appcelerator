var args = arguments[0] || undefined;

var loginDetailsObj_VatTax;
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}
$.imgTheme.isDefaultTheme = true;
var htmlContent = "",
    htmlStep = "";
function setHtmlContent(isFromVAT) {
	htmlContent = "",
	htmlStep = "";
	if (Alloy.Globals.VATTAXisEnglish) {
		if (isFromVAT) {
			htmlContent += '<h1>What is the Value Added Tax (VAT) Certificate?</h1><p>It is a certificate issued for institutions or individuals to exempt them from value added tax in various countries, regardless of the existence of an agreement.</p>';
			htmlContent += '<h1>COMPANIES</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Request Letter From the company</li><li>Trade License</li>';
			htmlContent += '</ol><h2>Fees:</h2><p>500 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div>';

			htmlStep += '<h1>Requesting the Service</h1><ol><li>Create a new account</li><li>Fill all required fields and attach required documents</li><li>Submit the Request</li>';
			htmlStep += '<li>Review and Approve the Request</li><li>Pay the fees through e-Dirham Card</li><li>Send the Certificate to the user via Currier</li>';
			htmlStep += '</ol><h1>Processing Duration</h1><p>3 days</p><h1>Responsible Department</h1><p>Customer Services Center</p><h1>Responsible Officer</h1>';
			htmlStep += '<p>Mohamed Hendawy</p><h1>Direct Number</h1><p>02-6987521 / 050-7728133</p>';

		} else {
			htmlContent += '<h1>What is Residence TAX Certificate?</h1><p>It is a certificate issued to take advantage of double taxation avoidance agreements signed by the UAE.</p>';
			htmlContent += '<h1>COMPANIES</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Trade License</li><li>Lease Contract</li><li> Copy of the passport and residence of company director</li>';
			htmlContent += '<li>Request Letter from the company</li><li>Bank statement for the last 6 months</li><li>Audited financial accounts</li></ol><h2>Fees:</h2><p>5000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p>';
			htmlContent += '</div><h1>PERSONAL</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Passport copy and valid visa copy</li><li>Request Letter from the person</li>';
			htmlContent += '<li>Bank statement for the last 6 months</li><li>Source of income with attested certificate</li><li>Certificate from the sponsor stating the individual activity and source of income</li>';
			htmlContent += '</ol><h2>Fees:</h2><p>1000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div>';

			htmlStep += '<h1>Requesting the Service</h1><ol><li>Create a new account</li><li>Fill all required fields and attach required documents</li><li>Submit the Request</li>';
			htmlStep += '<li>Review and Approve the Request</li><li>Pay the fees through e-Dirham Card</li><li>Send the Certificate to the user via Currier</li>';
			htmlStep += '</ol><h1>Processing Duration</h1><p>3 days</p><h1>Responsible Department</h1><p>Customer Services Center</p><h1>Responsible Officer</h1>';
			htmlStep += '<p>Mohamed Hendawy</p><h1>Direct Number</h1><p>02-6987521 / 050-7728133</p>';

		}

	} else {
		if (isFromVAT) {
			htmlContent += '<h1>ما هي شـهادة القيمة المضافة؟</h1><p>هي شهادة تصدر للشركات أو الأفراد للإعفاءات من ضرائب القيمة المضافة في مختلف الدول بغض النظر عن وجود اتفاقية من عدمه.</p><h1>للشـركات</h1>';
			htmlContent += '<div class="certDetails"><h2 class="redPadd">الوثائق المطلوبة:</h2><ol><li>رسالة طلب شهادة من الشركة</li><li>الرخصة التجارية</li></ol><h2>رسـوم الإصـدار:</h2><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p>';
			htmlContent += '</div><h1>للأفـراد</h1><div class="certDetails"><h2 class="redPadd">الوثائق المطلوبة:</h2><ol><li>صورة جواز السفر + إقامة سارية المفعول</li><li>رسالة طلب شهادة موقعة من الشخص</li>';
			htmlContent += '</ol><h2>رسـوم الإصـدار:</h2><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div>';

			htmlStep += '<h1>خـطوات تنفـيذ الخـدمة</h1><ol><li>فتح حساب للمتعامل</li><li>تعبئة كافة البيانات المطلوبة وإرفاق الوثائق الضرورية</li><li>إرسال طلب إصدار الشهادة</li><li>مراجعة واعتماد طلب الإصدار</li>';
			htmlStep += '<li>دفع الرسوم ببطاقة الدرهم الالكتروني</li><li>إرسال الشهادة بالبريد للمتعامل</li></ol><h1>الجـهة المسـتفيدة من الخـدمة</h1><p>قطاع خاص / الشركات / الأفراد / الهيئات</p><h1>زمن تقديم الخـدمة</h1>';
			htmlStep += '<p>3 أيام</p><h1>الإدارة المسـؤولة</h1><p>إدارة العلاقات المالية الاقليمية والدولية</p><h1>الموظـف المسـؤول</h1><p>محمد هـنداوي</p><h1>الرقم المباشـر</h1><p>02-6987521</p>';
		} else {
			htmlContent += '<h1>ما هي شـهادة الموطن الضريبي؟</h1><p>هي شهادة تصدر للاستفادة من اتفاقيات تجنب الازدواج الضريبي التي تبرمها الدولة.</p><h1>للشـركات</h1><p>يشترط للتقدم بطلب لاصدار شهادات الموطن الضريبي للشركات ان تكون الشركة قد مارست نشاطها في الدولة لفترة ثلاث سنوات على الأقل.</p>';
			htmlContent += '<div class="certDetails"><h2>الوثائق المطلوبة:</h2><ol><li>الرخصة التجارية</li><li>عقد الإيجار</li><li>صورة جواز السفر والإقامة لملاك الشركة</li><li>رسالة طلب شهادة من الشركة</li>';
			htmlContent += '<li>حساب بنكي لآخر 6 اشهر</li><li>الحسابات الختامية المدققة</li></ol><h2>رسـوم الإصـدار:</h2><p>5000 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div><h1>للأفـراد</h1><p>يشترط للتقدم بطلب لاصدار شهادات الموطن الضريبي للافراد أن:</p>';
			htmlContent += '<ul><li>يكون المتقدم قد مارس عملا في الدولة لمدة عام واحد على الأقل.</li><li>لا يسمح لغير العاملين التقدم للحصول على الشهادة.</li></ul><div class="certDetails"><h2>الوثائق المطلوبة:</h2>';
			htmlContent += '<ol><li>صورة جواز السفر + إقامة سارية المفعول</li><li>رسالة طلب شهادة موقعة من الشخص</li><li>كشف حساب من البنك لآخر 6 اشهر مصدقة</li><li>مصدر الدخل بشهادة مصدقة</li><li>شهادة من الكفيل تفيد بنشاط الفرد ومصدر الدخل</li>';
			htmlContent += '</ol><h2>رسـوم الإصـدار:</h2><p>1000 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p></div>';

			htmlStep += '<h1>خـطوات تنفـيذ الخـدمة</h1><ol><li>فتح حساب للمتعامل</li><li>تعبئة كافة البيانات المطلوبة وإرفاق الوثائق الضرورية</li><li>إرسال طلب إصدار الشهادة</li><li>مراجعة واعتماد طلب الإصدار</li>';
			htmlStep += '<li>دفع الرسوم ببطاقة الدرهم الالكتروني</li><li>إرسال الشهادة بالبريد للمتعامل</li></ol><h1>الجـهة المسـتفيدة من الخـدمة</h1><p>قطاع خاص / الشركات / الأفراد / الهيئات</p><h1>زمن تقديم الخـدمة</h1>';
			htmlStep += '<p>3 أيام</p><h1>الإدارة المسـؤولة</h1><p>إدارة العلاقات المالية الاقليمية والدولية</p><h1>الموظـف المسـؤول</h1><p>محمد هـنداوي</p><h1>الرقم المباشـر</h1><p>02-6987521</p>';
		}
	}
}

var alignment,
    nextScreenObj;

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.VTaxSelectedLanguage.taxVatTitle;

	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
		var userTypeId = userInfo.userTypeId;
		if (userTypeId == 1) {
			$.vApplicationView.height = 0;
			$.vatSeparator.visible = false;
		}

		$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.logout;
		if (Alloy.Globals.VATTAXisEnglish) {
			$.helpBackView.right = (Alloy.isTablet) ? 80 : 65;
		} else {
			$.helpBackView.right = (Alloy.isTablet) ? 70 : 60;
		}
		$.lblUserProfile.text = Alloy.Globals.VTaxSelectedLanguage.profile;
		$.changePasswordView.visible = true;

	} else {
		$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.login;
		if (Alloy.Globals.VATTAXisEnglish) {
			$.helpBackView.right = (Alloy.isTablet) ? 85 : 65;
		} else {
			$.helpBackView.right = (Alloy.isTablet) ? 70 : 60;
		}
		$.lblUserProfile.text = Alloy.Globals.VTaxSelectedLanguage.userRegistration;
		$.changePasswordView.visible = false;
		$.changePasswordView.height = 0;
		$.lastSeparator.height = 0;

		$.vApplicationView.height = (Alloy.isTablet) ? 65 : 55;
		$.vatSeparator.visible = true;
	}
	$.btnLogin.title = Alloy.Globals.VTaxSelectedLanguage.login;
	$.btnRegistrationBig.title = Alloy.Globals.VTaxSelectedLanguage.createNewAccount;
	$.btnCancel.title = Alloy.Globals.VTaxSelectedLanguage.cancel;
	$.lblLoginDesc.text = Alloy.Globals.VTaxSelectedLanguage.loginDescription;
	$.btnLoginBig.title = Alloy.Globals.VTaxSelectedLanguage.login;
	$.lblForgotPassword.text = Alloy.Globals.VTaxSelectedLanguage.forgotPassword;
	$.txtUsername.hintText = Alloy.Globals.VTaxSelectedLanguage.emailAddress;
	$.txtPassword.hintText = Alloy.Globals.VTaxSelectedLanguage.password;
	$.btnChangePwd.title = Alloy.Globals.VTaxSelectedLanguage.changePassword;
	$.btnChangePwdCancel.title = Alloy.Globals.VTaxSelectedLanguage.cancel;
	$.btnChangePwdBig.title = Alloy.Globals.VTaxSelectedLanguage.submitTitle;

	$.btnForgotPwd.title = Alloy.Globals.VTaxSelectedLanguage.lblForgotPassword;
	$.btnForgotPwdCancel.title = Alloy.Globals.VTaxSelectedLanguage.cancel;
	$.btnForgotPwdBig.title = Alloy.Globals.VTaxSelectedLanguage.submitTitle;

	$.lblvApplication.text = Alloy.Globals.VTaxSelectedLanguage.newVApplication;

	$.lbltApplication.text = Alloy.Globals.VTaxSelectedLanguage.newTApplication;
	$.lblTaskList.text = Alloy.Globals.VTaxSelectedLanguage.taskList;
	$.lblApplication.text = Alloy.Globals.VTaxSelectedLanguage.applicationList;
	$.lblChangePassword.text = Alloy.Globals.VTaxSelectedLanguage.changePassword;
	// $.lblChangePassword.text = Alloy.Globals.VTaxSelectedLanguage.changePassword;

	// if (!Alloy.isTablet) {
	// $.lblNavTitle.left = $.lblNavTitle.right = 90;
	// } else {
	// $.lblNavTitle.left = $.lblNavTitle.right = 100;
	// }

	if (Alloy.Globals.VATTAXisEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

		$.imgvApplication.left = $.imgtApplication.left = $.imgTaskList.left = $.imgApplication.left = $.imgUserProfile.left = $.imgChangePassword.left = 20;
		$.lblvApplication.left = $.lbltApplication.left = $.lblTaskList.left = $.lblApplication.left = $.lblUserProfile.left = $.lblChangePassword.left = 65;
		$.lblvApplication.right = $.lbltApplication.right = $.lblTaskList.right = $.lblApplication.right = $.lblUserProfile.right = $.lblChangePassword.right = 15;

		$.btnLogin.left = $.btnCancel.right = $.btnForgotPwd.left = $.btnForgotPwdCancel.right = 10;
		$.imgUserName.left = $.imgPassword.left = 10;
		$.txtUsername.left = $.txtPassword.left = 35;
		$.txtUsername.right = $.txtPassword.right = 5;
		$.lblForgotPassword.left = $.lblChangePwd.left = $.lblChangeConfirmPwd.left = $.lblOldPwd.left = 10;

		$.btnApply.left = $.btnNo.right = 0;

		$.btnChangePwd.left = $.btnChangePwdCancel.right = 10;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgvApplication.right = $.imgtApplication.right = $.imgTaskList.right = $.imgApplication.right = $.imgUserProfile.right = $.imgChangePassword.right = 20;
		$.lblvApplication.left = $.lbltApplication.left = $.lblTaskList.left = $.lblApplication.left = $.lblUserProfile.left = $.lblChangePassword.left = 15;
		$.lblvApplication.right = $.lbltApplication.right = $.lblTaskList.right = $.lblApplication.right = $.lblUserProfile.right = $.lblChangePassword.right = 65;

		$.btnLogin.right = $.btnCancel.left = $.btnForgotPwd.right = $.btnForgotPwdCancel.left = 10;
		$.imgUserName.right = $.imgPassword.right = 10;
		$.txtUsername.left = $.txtPassword.left = 5;
		$.txtUsername.right = $.txtPassword.right = 35;
		$.lblForgotPassword.right = $.lblChangePwd.right = $.lblChangeConfirmPwd.right = $.lblOldPwd.right = 10;
		$.btnChangePwd.right = $.btnChangePwdCancel.left = 10;

		$.btnApply.right = $.btnNo.left = 0;
		$.btnApply.width = (Alloy.isTablet) ? 100 : 80;
		$.btnNo.width = 40;

		/*$.helpBackView.right = (Alloy.isTablet) ? 100 : 85;
		 $.lblNavTitle.right = (Alloy.isTablet) ? 135 : 120;
		 */
	}
	$.lblvApplication.textAlign = $.lbltApplication.textAlign = $.lblTaskList.textAlign = $.lblApplication.textAlign = $.lblUserProfile.textAlign = alignment;
	$.lblLoginDesc.textAlign = $.txtUsername.textAlign = $.txtPassword.textAlign = $.lblForgotPassword.textAlign = $.lblChangePassword.textAlign = alignment;
	$.lblChangePwd.textAlign = $.lblChangeConfirmPwd.textAlign = $.lblOldPwd.textAlign = $.txtNewPwd.textAlign = $.txtOldPwd.textAlign = $.txtNewConfirmPwd.textAlign = $.txtForgotUserName.textAlign = $.lblForgotUserName.textAlign = alignment;
}

/*
 * Instruction
 */

var density;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.lblInstTitle.text = "DESCRIPTION The standard Lorem Ipsum passage";
$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";

/*function getServiceDescription() {
 if (serviceDescription == null) {
 httpManager.getServiceDescription(106, function(e) {
 Ti.API.info('>>>>>>>'+JSON.stringify(e))
 if (e == null) {
 return;
 }
 serviceDescription = e;
 });
 } else {
 openHelpScreen();
 }
 }*/

$.btnApply.addEventListener("click", function(arg) {
	openHelpScreen();
	var e = arg.source.detailWindowInfo;

	if (e.source.path == "TaxVat/winUserProfile") {
		gotoProfileScreen();
	} else {
		if (Ti.App.Properties.hasProperty("isLoggedIn_VatTax")) {
			if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
				gotoNextWindow(e);
			} else {
				isFromNavBar = false;
				nextScreenObj = e;
				$.backView.show();
				$.loginView.show();
			}
		} else {
			nextScreenObj = e;
			isFromNavBar = false;
			$.backView.show();
			$.loginView.show();
		}
	}
});
$.btnNo.addEventListener("click", function(arg) {
	openHelpScreen();
});

function openHelpScreen() {

	if ($.instructionView.isOpen) {
		// $.instructionView.opacity = 0;
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			showDescription();
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});

	} else {
		$.instructionView.visible = true;
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100, !$.imgTheme.isDefaultTheme);
		$.instructionView.animate({
			opacity : 1,
			duration : 300
		});

	}
	$.instructionView.isOpen = !$.instructionView.isOpen;
}

function changeTheme() {
	if ($.imgTheme.isDefaultTheme) {
		$.sliderView.backgroundColor = "black";
		$.imgTheme.image = Alloy.Globals.path.icnThemeLight;
		$.imgFontSize.image = Alloy.Globals.path.icnFontChangeWhite;
		$.lblAMinus.color = $.lblAPlus.color = $.instructionSeparator.backgroundColor = "white";
		$.wb.backgroundColor = "#000";
		if (OS_ANDROID) {
			$.instructionPopup.backgroundColor = "black";
		} else {
			$.instructionPopup.animate({
				backgroundColor : "black",
				duration : 600
			});
		}
		$.lblInstTitle.color = $.lblInstContent.color = "white";
	} else {
		$.sliderView.backgroundColor = "white";
		$.imgTheme.image = Alloy.Globals.path.icnThemeDark;
		$.imgFontSize.image = Alloy.Globals.path.icnFontChangeDark;
		$.lblAMinus.color = $.lblAPlus.color = $.instructionSeparator.backgroundColor = Alloy.Globals.path.grayColor;
		$.wb.backgroundColor = "#FFF";

		if (OS_ANDROID) {
			$.instructionPopup.backgroundColor = "white";
		} else {

			$.instructionPopup.animate({
				backgroundColor : "white",
				duration : 600
			});
		}
		$.lblInstTitle.color = $.lblInstContent.color = "black";
	}
	if ($.lblSteps.isSelected) {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlStep, parseInt($.fontSlider.value) / 100, $.imgTheme.isDefaultTheme);
	} else {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100, $.imgTheme.isDefaultTheme);
	}
	$.imgTheme.isDefaultTheme = !$.imgTheme.isDefaultTheme;
}

function showSlider() {
	if ($.sliderView.isOpen) {
		$.sliderView.animate({
			bottom : -60,
			duration : 500
		});
	} else {
		$.sliderView.animate({
			bottom : 0,
			duration : 500
		});
	}
	$.sliderView.isOpen = !$.sliderView.isOpen;
}

$.fontSlider.addEventListener("change", function(e) {
	var value = e.value;
	Ti.API.info('>>>>>>>>' + value / 10);
	//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, parseInt(value) / 100);
	if ($.lblSteps.isSelected) {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlStep, parseInt(value) / 100, !$.imgTheme.isDefaultTheme);
	} else {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlContent, parseInt(value) / 100, !$.imgTheme.isDefaultTheme);
	}
	// $.lblInstTitle.font = {
	// fontSize : (parseFloat(value) + 3) + "sp"
	// };
	// $.lblInstContent.font = {
	// fontSize : parseFloat(value) + "sp"
	// };
});

function showDescription() {
	if ($.lblDescription.isSelected) {
		return;
	}
	$.lblDescription.isSelected = true;
	$.lblDescription.color = Alloy.Globals.path.navBarColor;

	$.scrInstruction.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		$.lblInstTitle.text = "DESCRIPTION The standard Lorem Ipsum passage";
		$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100, !$.imgTheme.isDefaultTheme);
		$.scrInstruction.animate({
			opacity : 1,
			duration : 300
		});
	});

	$.lblSteps.isSelected = false;
	$.lblSteps.color = Alloy.Globals.path.darkGrayColor;

	$.tabSeparator.animate({
		left : 0,
		duration : 300
	});
}

function showSteps() {
	if ($.lblSteps.isSelected) {
		return;
	}
	$.lblDescription.isSelected = false;
	$.lblDescription.color = Alloy.Globals.path.darkGrayColor;

	$.lblSteps.isSelected = true;
	$.lblSteps.color = Alloy.Globals.path.navBarColor;

	$.scrInstruction.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		$.lblInstTitle.text = "STEPS The standard Lorem Ipsum passage";
		$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2,(Alloy.Globals.VATTAXisEnglish) ? serviceDescription.stepsEn : serviceDescription.stepsAr ,0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.VATTAXisEnglish) ? 1 : 2, htmlStep, parseInt($.fontSlider.value) / 100, !$.imgTheme.isDefaultTheme);
		$.scrInstruction.animate({
			opacity : 1,
			duration : 300
		});
	});

	var separatorLeft;
	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
			separatorLeft = ((Alloy.Globals.platformHeight - 10) / 2);
		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
			separatorLeft = ((Alloy.Globals.platformWidth - 10) / 2);
		}
	} else {
		if (Ti.Gesture.orientation == 2) {
			separatorLeft = ((Alloy.Globals.platformHeight - 10) / 2);
		} else if (Ti.Gesture.orientation == 1) {
			separatorLeft = ((Alloy.Globals.platformWidth - 10) / 2);
		}
	}
	if (Alloy.isTablet) {
		separatorLeft = 300;
	} else {
		separatorLeft += density;
	}

	$.tabSeparator.animate({
		left : separatorLeft,
		duration : 300
	});
}

/*
 *
 *
 */

var animateLeftPanelToRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 300,
});

var animateLeftPanelToLeft = Ti.UI.createAnimation({
	left : -$.leftView.width,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	//	transform : Ti.UI.create2DMatrix().scale(1.0, 1.0),
	duration : 300,
});

function showLeftPanel() {
	if (!isLeftPanelOpened) {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToRight);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(1.0, 1.0, 0.9, 0.8);
			var a = Ti.UI.createAnimation({
				left : $.leftView.width,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = true;
		isLeftPanelOpened = true;

	} else {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToLeft);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(0.9, 0.8, 1.0, 1.0);
			var a = Ti.UI.createAnimation({
				left : 0,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = false;
		isLeftPanelOpened = false;

	}
}

function gotoNextWindow(e) {

	var payload = {
		title : e.source.viewTitle,
	};

	// Ti.API.info('EEEE = ' + e.source.path);
	if (e.source.path == "TaxVat/winCorTaxApplication" || e.source.path == "TaxVat/winApplicationList" || e.source.path == "TaxVat/winIndTaxApplication") {
		payload.callBack = changeLanguage;
		payload.data = undefined;
		payload.isEdit = false;
	}

	var win = Alloy.createController(e.source.path, payload).getView();
	Alloy.Globals.openWindow(win);
	if (Alloy.isTablet && OS_IOS) {
		isOpen = false;
	}
}

function gotoProfileScreen() {
	if (Ti.App.Properties.hasProperty("isLoggedIn_VatTax")) {
		if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
			httpManager.vatTaxUser_GetUserProfile(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails.emailId, true, function(data) {
				if (data != null) {
					var win = Alloy.createController("TaxVat/winUserProfile", data).getView();
					Alloy.Globals.openWindow(win);
					if (Alloy.isTablet && OS_IOS) {
						isOpen = false;
					}
				} else if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == false) {
					isOpen = false;
					$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.login;
					if (Alloy.Globals.VATTAXisEnglish) {
						$.helpBackView.right = (Alloy.isTablet) ? 80 : 65;
					} else {
						$.helpBackView.right = (Alloy.isTablet) ? 70 : 60;
					}
					$.lblUserProfile.text = Alloy.Globals.VTaxSelectedLanguage.userRegistration;
					$.changePasswordView.visible = false;
					$.changePasswordView.height = 0;
					$.lastSeparator.height = 0;

					$.vApplicationView.height = (Alloy.isTablet) ? 65 : 55;
					$.vatSeparator.visible = true;
				}
			});
		} else {
			var win = Alloy.createController("TaxVat/winUserProfile").getView();
			Alloy.Globals.openWindow(win);
			if (Alloy.isTablet && OS_IOS) {
				isOpen = false;
			}
		}
	} else {
		var win = Alloy.createController("TaxVat/winUserProfile").getView();
		Alloy.Globals.openWindow(win);
		if (Alloy.isTablet && OS_IOS) {
			isOpen = false;
		}
	}
}

var isOpen = false;
function openDetailWindow(e) {

	if (isOpen) {
		return;
	}
	if ((e.source.path == "TaxVat/winCorTaxApplication" || e.source.path == "TaxVat/winIndTaxApplication") && (!Ti.App.Properties.hasProperty("isLoggedIn_VatTax") || Ti.App.Properties.getInt("isLoggedIn_VatTax") == false)) {

		if (e.source.path == "TaxVat/winCorTaxApplication") {
			setHtmlContent(true);
		} else {
			setHtmlContent(false);
		}
		openHelpScreen();
		$.btnApply.detailWindowInfo = e;
		return;
	}
	isOpen = true;

	if (e.source.path == "TaxVat/winUserProfile") {
		gotoProfileScreen();
	} else {
		if (Ti.App.Properties.hasProperty("isLoggedIn_VatTax")) {
			if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
				gotoNextWindow(e);
			} else {
				isFromNavBar = false;
				nextScreenObj = e;
				$.backView.show();
				$.loginView.show();
				isOpen = false;
			}
		} else {
			nextScreenObj = e;
			isFromNavBar = false;
			$.backView.show();
			$.loginView.show();
			isOpen = false;
		}
	}
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winTaxVatHome);
}

var logoutAlert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.VTaxSelectedLanguage.logout,
	message : Alloy.Globals.VTaxSelectedLanguage.logOutMessage,
	buttonNames : (OS_IOS) ? [Alloy.Globals.VTaxSelectedLanguage.ok, Alloy.Globals.VTaxSelectedLanguage.cancel] : [Alloy.Globals.VTaxSelectedLanguage.cancel, Alloy.Globals.VTaxSelectedLanguage.ok]
});

if (Alloy.Globals.VATTAXisEnglish) {
	logoutAlert.buttonNames = (OS_IOS) ? [Alloy.Globals.VTaxSelectedLanguage.ok, Alloy.Globals.VTaxSelectedLanguage.cancel] : [Alloy.Globals.VTaxSelectedLanguage.cancel, Alloy.Globals.VTaxSelectedLanguage.ok];
} else {
	logoutAlert.buttonNames = (OS_IOS) ? [Alloy.Globals.VTaxSelectedLanguage.cancel, Alloy.Globals.VTaxSelectedLanguage.ok] : [Alloy.Globals.VTaxSelectedLanguage.ok, Alloy.Globals.VTaxSelectedLanguage.cancel];
}

logoutAlert.addEventListener('click', function(e) {
	Ti.API.info('E>INDEX = ' + e.index);
	var successIndex = (Alloy.Globals.VATTAXisEnglish) ? 0 : 1;
	if (OS_ANDROID) {
		successIndex = (Alloy.Globals.VATTAXisEnglish) ? 1 : 0;
	}
	if (e.index == successIndex) {

		httpManager.userLogout(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails, function(obj) {

			if (obj != null) {
				Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.logout, obj.serviceAlert);
				if (obj.status) {
					$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.login;
					if (Alloy.Globals.VATTAXisEnglish) {
						$.helpBackView.right = (Alloy.isTablet) ? 80 : 65;
					} else {
						$.helpBackView.right = (Alloy.isTablet) ? 70 : 60;
					}
					$.changePasswordView.visible = false;
					$.changePasswordView.height = 0;
					$.lastSeparator.height = 0;
					$.lblUserProfile.text = Alloy.Globals.VTaxSelectedLanguage.userRegistration;

					$.vApplicationView.height = (Alloy.isTablet) ? 65 : 55;
					$.vatSeparator.visible = true;

					Ti.App.Properties.setInt("isLoggedIn_VatTax", false);
				}
			}
		});

	} else {
		logoutAlert.hide();
	}
});

/* user login section */
var isFromNavBar = false;
function PopUPLoginForm() {

	isFromNavBar = true;
	var isLoggedIn = Ti.App.Properties.getInt("isLoggedIn_VatTax");
	if (isLoggedIn) {
		logoutAlert.show();
	} else {
		$.backView.visible = true;
		$.loginView.visible = true;
	}

}

function setTokenData(e) {
	Ti.App.Properties.setObject("LoginDetaisObj_VatTax", e);

	Ti.App.Properties.setInt("authenticationCode_VatTax", e.tokenDetails.tokenCode);
	Ti.App.Properties.setString("emailID_VatTax", e.tokenDetails.emailId);
	Ti.App.Properties.setString("createdDate_VatTax", e.tokenDetails.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_VatTax", e.tokenDetails.lastUpdatedDate);
	Ti.App.Properties.setString("status_VatTax", e.tokenDetails.tokenStatus);
	Ti.App.Properties.setString("roleType_VatTax", e.tokenDetails.roleType);
	Ti.App.Properties.setString("groupType_VatTax", e.tokenDetails.groupType);

	/*if (OS_IOS) {
		var taxvatUserDefault = Ti.App.iOS.createUserDefaults({
			suiteName : Alloy.Globals.suiteName,
		});

		taxvatUserDefault.setString("TAX_VAT_TOKEN_KEY", e.tokenDetails.tokenCode);
		taxvatUserDefault.setString("TAX_VAT_USERNAME_KEY", e.tokenDetails.emailId);
		taxvatUserDefault.setString("TAX_VAT_STARTDATE_KEY", e.tokenDetails.createdDate);
		taxvatUserDefault.setString("TAX_VAT_UPDATEDATE_KEY", e.tokenDetails.lastUpdatedDate);
	}*/

}

var currentToken = undefined;
var winQuestion = undefined;

function questionCallBack(e) {
	if (winQuestion != undefined) {
		winQuestion.close();
	}
	Ti.App.Properties.setInt("isLoggedIn_VatTax", true);
	// setTokenData(currentToken);

	setTokenData(e);
	closeLoginView();

	$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.logout;
	if (Alloy.Globals.VATTAXisEnglish) {
		$.helpBackView.right = (Alloy.isTablet) ? 80 : 65;
	} else {
		$.helpBackView.right = (Alloy.isTablet) ? 70 : 60;
	}
	$.btnNavLogin.width = Ti.UI.SIZE;

	var userTypeId = e.userInfo.userTypeId;
	if (userTypeId == 1) {
		$.vApplicationView.height = 0;
		$.vatSeparator.visible = false;
	} else {
		$.vApplicationView.height = (Alloy.isTablet) ? 65 : 55;
		$.vatSeparator.visible = true;
	}

	$.changePasswordView.visible = true;
	$.changePasswordView.height = (Alloy.isTablet) ? 65 : 55;
	$.lastSeparator.height = (Alloy.isTablet) ? 1 : 0.5;

	$.lblUserProfile.text = Alloy.Globals.VTaxSelectedLanguage.profile;

	if (!isFromNavBar) {
		if (userTypeId == 1 && nextScreenObj.source.path == "TaxVat/winCorTaxApplication") {

		} else {
			gotoNextWindow(nextScreenObj);
		}
	}
}

function askForQuestion(e) {
	var payload = {};

	/*httpManager.getSecurityQuestionList({
	 serviceID : 1,
	 userName : e.userInfo.userName
	 }, function(arr) {
	 Ti.API.info('JSON ARR = ' + JSON.stringify(arr));*/

	payload.arrQuestion = e.arrQuestion;
	payload.callBack = questionCallBack;
	payload.pageTitle = Alloy.Globals.VTaxSelectedLanguage.TaxAndVat;

	payload.obj = {
		password : $.txtPassword.value.trim(),
		userName : $.txtUsername.value.trim(),
		typeOfService : "VTAX"
	};

	payload.serviceId = 5;
	winQuestion = Alloy.createController("TaxVat/winQuestion", payload).getView();
	// Alloy.Globals.openWindow(win);

	if (OS_IOS) {
		winQuestion.open({
			modal : true
		});
	} else {
		winQuestion.open();
	}

	// });
}

function doLogin(e) {
	/*if (!Alloy.Globals.validateEmail($.txtUsername.value)) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.login, Alloy.Globals.VTaxSelectedLanguage.invalidEmail);
	 return false;
	 } else */
	if ($.txtUsername.value.trim().length == 0 || $.txtPassword.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.login, Alloy.Globals.VTaxSelectedLanguage.enterLoginPassword);
		return;
	}

	//"rameshtacme2","P@ssw0rd"
	httpManager.vatTaxUserLogin($.txtUsername.value.trim(), $.txtPassword.value.trim(), function(e) {
		if (e != null) {
			Ti.API.info(">>>>>Vat tax user object" + JSON.stringify(e));

			var questionTimeout = setTimeout(function() {
				askForQuestion(e);
				clearTimeout(questionTimeout);
			}, 400);
			// currentToken = e;
			return;

		}

	});

}

function closeLoginView() {
	$.backView.visible = false;
	$.loginView.visible = false;
	$.txtUsername.value = $.txtPassword.value = "";
	$.txtUsername.blur();
	$.txtPassword.blur();
}

function showForgotPasswordView() {
	$.forgotPasswordView.visible = true;
	$.loginView.visible = false;
}

function closeForgotPasswordView() {
	$.loginView.visible = true;
	$.forgotPasswordView.visible = false;
}

function callForgotPwd() {
	if ($.txtForgotUserName.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.lblForgotPassword, Alloy.Globals.VTaxSelectedLanguage.enterEmail);
		return;
	}

	httpManager.vatTaxForgotPassword($.txtForgotUserName.value.trim(), function(e) {

		if (e != null) {
			//setTokenData(e);
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.lblForgotPassword, (Alloy.Globals.VATTAXisEnglish) ? e.description_EN : e.description_AR);
			closeForgotPasswordView();
		}

	});

}

function openRegistration() {
	var winRegistration = Alloy.createController("winRegistration").getView();
	if (OS_IOS) {
		winRegistration.open({
			modal : true
		});
	} else {
		winRegistration.open();
	}
}

function gotoRegistration(e) {
	gotoProfileScreen();
}

function openChangePassword() {
	$.backView.visible = true;
	$.changePwdPopupView.visible = true;

}

function validatePassword(password) {
	Ti.API.info('password>>>' + password);
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{5,}$/;
	Ti.API.info('>>>>>>' + re.test(password));
	return !(re.test(password));
}

function closeChangePwdView() {
	$.backView.visible = false;
	$.changePwdPopupView.visible = false;
	$.txtNewPwd.value = "";
	$.txtNewConfirmPwd.value = "";
	$.txtOldPwd.value = "";
	$.txtNewPwd.blur();
	$.txtNewConfirmPwd.blur();
}

function callChangePwd() {

	if ($.txtOldPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.enterOldPassword);
		return false;
	} else if ($.txtNewPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.enterNewPassword);
		return false;
	} else if (validatePassword($.txtNewPwd.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.PasswordValidMsg);
		return false;
	} else if ($.txtNewConfirmPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.enterConfirmPassword);
		return false;
	} else if ($.txtNewConfirmPwd.value != $.txtNewPwd.value) {
		Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.confirmNewPassMsg);
		return false;
	}

	httpManager.vatTaxUser_ChangePassword($.txtOldPwd.value.trim(), $.txtNewPwd.value.trim(), function(e) {
		Ti.API.info("Change pwd out put :" + JSON.stringify(e));
		if (e != null) {
			Ti.API.info(">>>>>Vat tax user object" + JSON.stringify(e));
			setTokenData(e);
			Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.changePassword, Alloy.Globals.VTaxSelectedLanguage.changePasswordSuccessMsg);
			closeChangePwdView();

		}

	});

}

//VAT 102
//TAX 103
//REnew 101

function getServiceDescription(code) {
	httpManager.getServiceDescription(code, function(e) {

	});
}

$.winTaxVatHome.addEventListener("androidback", function(e) {
	if ($.forgotPasswordView.visible) {
		$.loginView.visible = true;
		$.forgotPasswordView.visible = false;
		return;
	} else if ($.loginView.visible) {
		$.loginView.visible = false;
		$.backView.visible = false;
		return;
	} else if ($.changePwdPopupView.visible) {
		$.changePwdPopupView.visible = false;
		$.backView.visible = false;
		return;
	} else if ($.instructionView.visible == true) {
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});
		$.instructionView.isOpen = false;
		return;
	}
	/* else if($.viewInstructions.opacity == 1){
	 $.viewInstructions.closeHelpScreen(e);
	 return;
	 } */
	closeWindow();

});

$.winTaxVatHome.addEventListener("focus", function(e) {
	Ti.API.info('WIN TEXVAT HOME FOCUS');
	isOpen = false;
	$.viewBottomToolbar.setDefaultTheme($.winTaxVatHome);
});
$.viewBottomToolbar.setDefaultTheme($.winTaxVatHome);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winTaxVatHome);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winTaxVatHome);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Ti.API.info('WIN TEXVAT HOME Open = ' + Alloy.Globals.VATTAXisEnglish);
	Alloy.Globals.arrWindows.push($.winTaxVatHome);
	// $.btnFontChange.contentFontSize = "M";

	// getServiceDescription(102); // VAT
	// getServiceDescription(103); //TAX

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
	if (args != undefined) {
		args.callback();
	}
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};

changeLanguage();
