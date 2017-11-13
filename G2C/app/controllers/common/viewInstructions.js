var args = arguments[0] || {};

/*
 * Instruction
 */
var density;
var httpManager = require("httpManager");
var serviceDescription = null;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.lblInstTitle.text = "DESCRIPTION The standard Lorem Ipsum passage";
$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";

var htmlContent = "",
    htmlStep = "";
if (Alloy.Globals.isEnglish) {
	htmlContent += '<h1>Renew Supplier Registration</h1><p>Renew the registration of suppliers wishing to provide the federal government with their services after the end of their registration in the federal Suppliers’ record.</p>';
	htmlContent += '<h1>Renewal Fees</h1><p>500 Dirhams + 3 Dirhams, paid through e-Dirham Card</p>';


	htmlStep += '<h1>Requesting the Service</h1><ol><li>Login to Supplier account</li><li>Pay the fees through e-Dirham Card</li><li>In case a License is expired, renew it through uploading the new License and update its Expiry Date</li>';
	htmlStep += '</ol><h1>Beneficiary of the Service</h1><p>Federal Ministries and Bodies/Companies/Private Sector</p><h1>Responsible Department</h1><p>Support Desk Office</p>';
	htmlStep += '<h1>Responsible Officer</h1><p>Mr. Maadhad Ghanaim Al-Hamli / Mrs. Huda Mohammed Al-Hamadi</p><h1>Direct Number</h1><p>02-6987575</p>';

} else {
	htmlContent += '<h1>التجـديد في سـجـل الموردين</h1><p>تجديد تسجيل الموردين الراغبين في تقديم خدمات توريد للحكومة الاتحادية بعد انتهاء تسجيلهم في سجل الموردين الاتحادي.<br/><br/>ويتم التجديد بعد مرور سنة من التسجيل أو آخر تجديد.</p>';
	htmlContent += '<h1>رسـوم التجـديد</h1><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p>';


	htmlStep += '<h1>خـطوات تنفـيذ الخـدمة</h1><ol><li>الدخول إلى حساب المورد</li><li>دفع رسوم التجديد عن طريق بطاقة الدرهم الالكتروني</li><li>في حال انتهاء صلاحية المرفقات، يجب تحديث المرفقات وتاريخ الانتهاء</li></ol>';
	htmlStep += '<h1>الإدارة المسـؤولة</h1><p>مكتب الدعم الفني</p><h1>الجـهة المسـتفيدة من الخـدمة</h1><p>الوزارات / الهيئات الاتحادية / الشركات / قطاع خاص</p><h1>الموظـف المسـؤول</h1><p>السيد معضد عبيد الهاملي / السيدة هدى محمد الحمادي</p>';
	htmlStep += '<h1>الرقم المباشـر</h1><p>02-6987332 / 04-3110141</p>';	

}

function setServiceDescription () {
	
	if ($.instructionView.isOpen) {
		// $.instructionView.opacity = 0;
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});

	} else {
		$.instructionView.visible = true;
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr, 0);
		$.instructionView.animate({
			opacity : 1,
			duration : 300
		});
	}
	$.instructionView.isOpen = !$.instructionView.isOpen;	
};


/**
 * Open the help screen
 */
exports.openHelpScreen = function(e,code) {
	if ($.instructionView.isOpen) {
		// $.instructionView.opacity = 0;
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});

	} else {
		$.instructionView.visible = true;
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr, 0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt(value) / 100);
		$.instructionView.animate({
			opacity : 1,
			duration : 300
		});
	}
	$.instructionView.isOpen = !$.instructionView.isOpen;	
	/*if (serviceDescription == null) {
		Ti.API.info('>>> code '+ code);
		httpManager.getServiceDescription(102, function(e) {
			Ti.API.info('>>>>>>>' + JSON.stringify(e));
			if (e == null) {
				return;
			}
			serviceDescription = e;
			setServiceDescription();
		});
	} else {
		setServiceDescription();
	}*/
};

/**
 * Close the instruction view on click of back button on android
 *
 * @param {Object} e
 */
exports.closeHelpScreen = function(e) {
	if ($.instructionView.opacity == 1) {
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});
		$.instructionView.isOpen = false;
	}
};

/**
 * Show the slider for font resize
 *
 * @param {Object} e
 */
var showSlider = function(e) {
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
};

$.imgTheme.isDefaultTheme = true;


$.fontSlider.addEventListener("change", function(e) {
	var value = e.value;
	Ti.API.info('>>>>>>>>' + value / 10);
	//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, parseInt(value) / 100);
	//if (serviceDescription != null) {
		if ($.lblSteps.isSelected) {
			//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.stepsEn : serviceDescription.stepsAr, parseInt(value) / 100);
			$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlStep, parseInt(value) / 100);
		} else {
			//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr, parseInt(value) / 100);
			$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt(value) / 100);
		}
	//}
	// $.lblInstTitle.font = {
	// fontSize : (parseFloat(value) + 3) + "sp"
	// };
	// $.lblInstContent.font = {
	// fontSize : parseFloat(value) + "sp"
	// };
});

/**
 * Change the theme for the instruction view
 *
 * @param {Object} e
 */
var changeTheme = function(e) {
	if ($.imgTheme.isDefaultTheme) {
		$.sliderView.backgroundColor = "black";
		$.imgTheme.image = Alloy.Globals.path.icnThemeLight;
		$.imgFontSize.image = Alloy.Globals.path.icnFontChangeWhite;
		$.lblAMinus.color = $.lblAPlus.color = $.instructionSeparator.backgroundColor = "white";

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
	$.imgTheme.isDefaultTheme = !$.imgTheme.isDefaultTheme;
};

/**
 * Show the description
 *
 * @param {Object}e
 */
var showDescription = function(e) {
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
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr, 0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt(value) / 100);
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
};

/**
 * Show the steps to follow
 *
 * @param {Object} e
 */
var showSteps = function(e) {
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
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, (Alloy.Globals.isEnglish) ? serviceDescription.stepsEn : serviceDescription.stepsAr, 0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlStep, parseInt(value) / 100);
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
};

/**
 * Resize the font size on slide of the slider
 *
 * @param {Object} e
 */
var fontResize = function(e) {
	var value = e.value;
	$.lblInstTitle.font = {
		fontSize : (parseFloat(value) + 3) + "sp"
	};
	$.lblInstContent.font = {
		fontSize : parseFloat(value) + "sp"
	};
};

exports.changeLanguage = function(param) {
	$.buttonView.applyProperties(param);
};
