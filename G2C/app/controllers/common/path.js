exports.path = function() {

	var resourcePath = '';
	var isIpad = false;
	var isAndroid = false;

	var path;

	if (Ti.Platform.osname == 'iphone') {
		resourcePath = Ti.Filesystem.resourcesDirectory + 'images/iPhoneImages/';
	} else if (Ti.Platform.osname == 'ipad') {
		resourcePath = Ti.Filesystem.resourcesDirectory + 'images/iPadImages/';
	} else if (Ti.Platform.osname == "android") {
		isAndroid = true;
		resourcePath = Ti.Filesystem.resourcesDirectory + 'images/iPhoneImages/';
	}

	path = {
		font26 : {
			fontSize : (Alloy.Globals.isEnglish) ? "26sp" : "27sp",
			fontFamily : "Helvetica Regular"
		},
		font25 : {
			fontSize : (Alloy.Globals.isEnglish) ? "25sp" : "26sp",
			fontFamily : "Helvetica Regular"
		},
		font24 : {
			fontSize : (Alloy.Globals.isEnglish) ? "24sp" : "25sp",
			fontFamily : "Helvetica Regular",
		},
		font23 : {
			fontSize : (Alloy.Globals.isEnglish) ? "23sp" : "24sp",
			fontFamily : "Helvetica Regular"
		},
		font22 : {
			fontSize : (Alloy.Globals.isEnglish) ? "22sp" : "23sp",
			fontFamily : "Helvetica Regular",
		},
		font21 : {
			fontSize : (Alloy.Globals.isEnglish) ? "21sp" : "22sp",
			fontFamily : "Helvetica Regular",
		},
		font20 : {
			fontSize : (Alloy.Globals.isEnglish) ? "20sp" : "21sp",
			fontFamily : "Helvetica Regular",
		},
		font19 : {
			fontSize : (Alloy.Globals.isEnglish) ? "19sp" : "20sp",
			fontFamily : "Helvetica Regular",
		},
		font18Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "18sp" : "19sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font18 : {
			fontSize : (Alloy.Globals.isEnglish) ? "18sp" : "19sp",
			fontFamily : "Helvetica Regular",
		},
		font17Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "17sp" : "18sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font17 : {
			fontSize : (Alloy.Globals.isEnglish) ? "17sp" : "18sp",
			fontFamily : "Helvetica Regular"
		},
		font16Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "16sp" : "17sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font16 : {
			fontSize : (Alloy.Globals.isEnglish) ? "16sp" : "17sp",
			fontFamily : "Helvetica Regular"
		},
		font15Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "15sp" : "16sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font15 : {
			fontSize : (Alloy.Globals.isEnglish) ? "15sp" : "16sp",
			fontFamily : "Helvetica Regular"
		},
		font14Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "14sp" : "15sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font14 : {
			fontSize : (Alloy.Globals.isEnglish) ? "14sp" : "15sp",
			fontFamily : "Helvetica Regular"
		},
		font13Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "13sp" : "14sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},

		font13 : {
			fontSize : (Alloy.Globals.isEnglish) ? "13sp" : "14sp",
			fontFamily : "Helvetica Regular"
		},
		font12 : {
			fontSize : (Alloy.Globals.isEnglish) ? "12sp" : "13sp",
			fontFamily : "Helvetica Regular"
		},
		font12Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "12sp" : "13sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font11Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "11sp" : "12sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font11Tablet : {
			fontSize : (Alloy.Globals.isEnglish) ? "11sp" : "12sp",
			fontFamily : "Helvetica Regular"
		},
		font11 : {
			fontSize : (Alloy.Globals.isEnglish) ? "11sp" : "12sp",
			fontFamily : "Helvetica Regular"
		},
		font10Bold : {
			fontSize : (Alloy.Globals.isEnglish) ? "10sp" : "11sp",
			fontFamily : "Helvetica Regular",
			fontWeight : "bold"
		},
		font10 : {
			fontSize : (Alloy.Globals.isEnglish) ? "10sp" : "11sp",
			fontFamily : "Helvetica Regular"
		},
		font9 : {
			fontSize : (Alloy.Globals.isEnglish) ? "9sp" : "10sp",
			fontSize : "9sp",
			fontFamily : "Helvetica Regular"
		},
		font8 : {
			fontSize : (Alloy.Globals.isEnglish) ? "8sp" : "9sp",
			fontFamily : "Helvetica Regular"
		},

		navBarColor : "#c00702",
		statusBarBgColor : '#c00702',
		goldColor : "#976e33",
		grayColor : "#999999",
		darkGrayColor : "#777777",
		blackColor : "black",
		whiteColor : "white",
		// bgColor : "#f6f6f6",
		bgColor : "#FFFFFF",
		buttonBackgroundColor : "#cf1611",
		buttonTextColor : "#FFF",
		formFieldsColor : '#4cae7b',
		//circleButtonsTextColor:"#976e33",
		//separatorColor : "#959283",
		circleButtonsTextColor : "black",

		selectedRowColor : "#E9E4DE",
		viewBgColor : "#E3E3E3",
		lblGrayColor : "#B6B6B6",
		newsRowColor : "#d9c6aa",
		vatButtonTitleColor : "#443618",
		vatButtonTitleColor_disabled : "#685e3e",
		lightGrayColor : "#ededed",

		borderColor : "#555555",
		redColor : "#a32300",
		greenColor : "#5d7900",
		blueColor : "#0190d2",
		orangeColor : "#c39700",
		availableAmount_GraphColor : '#8cc73e',
		spentAmount_GraphColor : '#ed1d25',
		rowDropDownBgColor : "#C4A338",
		valueSeparatorColor : "#E5E5E5",
		SeparatorColor : "#7B6416",
		tblBorderColor : "#C3C3C3",
		isupDDBgColor : "#F5F5F5",
		searchBoxColor : "#c2c1c6",
		searchHintColor : "#E6E6E6",
		graphTableSelectionColor : "#E7DFD8",
		graphTableAlterBackColor : "#f1f1f1",

		lblBlackColor : "#333",
		
	//	headerBgColor : "#917841",
		headerBorderColor : "#917841",//"#694619",

		hintColor : "green",
		icnBack : resourcePath + "icnBack.png",
		icnSearch : resourcePath + "icnSearch.png",
		//home
		bgMain : resourcePath + "common/appBg.png",
		icnTaxVat : resourcePath + "dashboard/icnTax.png",
		icnTakamul : resourcePath + "dashboard/icnTakamul.png",
		icnMyBudget : resourcePath + "dashboard/icnMybudget.png",
		icnSuppliers : resourcePath + "dashboard/icnSuppliers.png",
		icnReports : resourcePath + "dashboard/icnReports.png",
		icnNotification : resourcePath + "dashboard/icnNotification.png",
		icnAbout : resourcePath + "dashboard/icnAbout.png",
		icnContact : resourcePath + "dashboard/icnContact.png",
		icnNews : resourcePath + "dashboard/icnNews.png",
		icnSettings : resourcePath + "dashboard/icnSettings.png",
		icnCustomerInteraction : resourcePath + "dashboard/icnCustomerInteraction.png",
		icnFederalEntity : resourcePath + "dashboard/icnFederalEntity.png",
		icnGCCBook : resourcePath + "dashboard/icnGCCBook.png",
		icnmChatting : resourcePath + "dashboard/icnmChatting.png",
		icnmParticipation : resourcePath + "dashboard/icnmParticipation.png",
		icnOpenFinacialData : resourcePath + "dashboard/icnOpenFinacialData.png",
		icnUserFeedback : resourcePath + "dashboard/icnUserFeedback.png",

		//login
		icnUsername : resourcePath + "icnUsername.png",
		icnPassword : resourcePath + "icnPassword.png",

		//Budget
		icnCreateNewBudget : resourcePath + "budget/icnCreateNewBudget.png",
		icnExistingBudget : resourcePath + "budget/icnExistingBudgets.png",
		icnAddBudget : resourcePath + "budget/icn_newBudget.png",
		icnPlusBlack : resourcePath + "budget/iconAdd.png",
		icnPlusGreen : resourcePath + "common/iconAttachGreen.png",
		icnMinusGreen : resourcePath + "common/iconMinusGreen.png",
		bgHeaderTitle : resourcePath + "budget/titleBg.png",
		bgBudgetContentArea : resourcePath + "budget/contentBg.png",
		bgBudgetContentAreaCount : resourcePath + "budget/titleBgRight.png",
		icnName : resourcePath + "common/iconName.png",
		icnAmount : resourcePath + "common/iconAmount.png",
		icnDate : resourcePath + "common/icnTime.png",
		icnNote : resourcePath + "common/iconNote.png",
		icnCategory : resourcePath + "common/iconCategory.png",
		icnSelect : resourcePath + "common/iconAttachGreen.png",
		icnCalendar : resourcePath + "common/iconDate.png",

		icnReport : resourcePath + "budget/icn_graph.png",
		icnCompose_black : resourcePath + "budget/icnCompose.png",
		icnCompose_white : resourcePath + "budget/icon_compose.png",
		imgAnnotation : resourcePath + "imgAnnotation.png",

		//ISupplier

		icnProfile : resourcePath + "ISupplier/icnProfile.png",
		iconFmisSupport : resourcePath + "ISupplier/iconFmisSupport.png",
		iconInvoices : resourcePath + "ISupplier/iconInvoices.png",
		iconPayments : resourcePath + "ISupplier/iconPayments.png",
		iconPurchaseOrder : resourcePath + "ISupplier/iconPurchaseOrder.png",
		iconTenderBidsProcurements : resourcePath + "ISupplier/iconTenderBidsProcurements.png",
		ISupplierRowBG : resourcePath + "ISupplier/ISupplierRowBG.png",
		icnRowDetail : resourcePath + "ISupplier/icnRowDetail.png",
		icnComposeWhite : resourcePath + "ISupplier/icnComposeWhite.png",
		icnArrowDown : resourcePath + "common/arrowDown.png",
		icnPhoto : resourcePath + "ISupplier/icnPhoto.png",
		icnRowDetailRight : resourcePath + "ISupplier/icnRowDetailRight.png",
		icnChecked : resourcePath + "ISupplier/icnChecked.png",
		icnUnChecked : resourcePath + "ISupplier/icnUnChecked.png",
		icnDraft : resourcePath + "ISupplier/icnDraft.png",
		icnStepEditFirst : resourcePath + "ISupplier/icnStepEditFirst.png",
		icnStepFirstDone : resourcePath + "ISupplier/icnStepFirstDone.png",

		icnStepInactiveMiddle : resourcePath + "ISupplier/icnStepInactiveMiddle.png",
		icnStepEditMiddle : resourcePath + "ISupplier/icnStepEditMiddle.png",
		icnStepDoneMiddle : resourcePath + "ISupplier/icnStepDoneMiddle.png",

		icnStepEditLast : resourcePath + "ISupplier/icnStepEditLast.png",
		icnStepInactiveLast : resourcePath + "ISupplier/icnStepInactiveLast.png",

		iconRegisterSupplier : resourcePath + "ISupplier/iconRegisterSupplier.png",
		iconRenewal : resourcePath + "ISupplier/iconRenewal.png",
		iconAddNewUser : resourcePath + "ISupplier/iconAddNewUser.png",
		iconDraft : resourcePath + "ISupplier/iconDraft.png",
		icnSave : resourcePath + "ISupplier/icnSave.png",

		//Common
		iconArrow2Down : resourcePath + "common/iconArrow2Down.png",
		iconArrow2Up : resourcePath + "common/iconArrow2Up.png",

		iconEnglish : resourcePath + "common/iconEnglish.png",
		iconArabic : resourcePath + "common/iconArabic.png",

		icnArrowDown : resourcePath + "common/arrow2Down.png",
		icnArrowUp : resourcePath + "common/arrow2Up.png",
		// news
		defaultImageBanner : resourcePath + "news/defaultImageBanner.png",
		defaultImageThumb : resourcePath + "news/defaultImageThumb.png",
		bgNewsDateRight : resourcePath + "news/bgNewsDateRight.png",
		bgNewsDateLeft : resourcePath + "news/bgNewsDateLeft.png",
		//Tax & Vat
		arrowDown : resourcePath + "common/arrowDown.png",

		icnNewVatCertificate : resourcePath + "taxVat/icnNewVat.png",
		icnNewTaxCertificate : resourcePath + "taxVat/icnNewTax.png",
		icnMyTask : resourcePath + "taxVat/icnTasklist.png",
		icnMyApplications : resourcePath + "taxVat/icnApplicationList.png",
		icnProfile : resourcePath + "taxVat/icnProfile.png",
		icnChangePwd : resourcePath + "taxVat/icnChangePassword.png",
		icnAttachBlack : resourcePath + "common/icnAttachBlack.png",
		icnDone : resourcePath + "common/icnDone.png",

		icnTag : resourcePath + "mParticipation/icnTag.png",
		icnAddComment : resourcePath + "mParticipation/icnAddComment.png",
		bgRowmParticipation_left : resourcePath + "mParticipation/bgRowmParticipation_left.png",
		bgRowmParticipation_right : resourcePath + "mParticipation/bgRowmParticipation_right.png",
		icnTagArticle : resourcePath + "mParticipation/icnTagArticle.png",
		imgDoneUserSatisfaction : resourcePath + "mParticipation/imgDoneUserSatisfaction.png",
		imgFailUserSatisfaction : resourcePath + "mParticipation/imgFailUserSatisfaction.png",
		icnCloseMParticipation : resourcePath + "mParticipation/icnCloseMParticipation.png",

		icnHome : resourcePath + "icn_home.png",
		toolTipBg  :resourcePath + "common/toolTipBg.png",
		
		//Location Federal
		icnPhoneCall : resourcePath + "icnPhoneCall.png",
		icnMapLocation : resourcePath + "icnMapLocation.png",
		icnBrowser : resourcePath + "icnBrowser.png",
		icnCar : resourcePath + "icnCar.png",
		icnNav : resourcePath + "icnNav.png",

		//Open Financial Data
		icnArrowLeftBlack : resourcePath + "FinancialData/icnArrowLeftBlack.png",
		icnArrowRightBlack : resourcePath + "FinancialData/icnArrowRightBlack.png",

		//GovLogo UserFeedback
		myGovLogo : resourcePath + "common/myGovLogo.png",

		//takamul
		icnRequestTakamul : resourcePath + "takamul/icnRequestTakamul.png",
		icnCreateTakamul : resourcePath + "takamul/icnAttach.png",

		// contactMOF
		icnEmail : resourcePath + "contactMOF/icnEmail.png",
		icnFacebook : resourcePath + "contactMOF/icnFacebook.png",
		icnFax : resourcePath + "contactMOF/icnFax.png",
		icnInstagram : resourcePath + "contactMOF/icnInstagram.png",
		icnMapPin : resourcePath + "contactMOF/icnMapPin.png",
		icnPhoneSmall : resourcePath + "contactMOF/icnPhoneSmall.png",
		icnPOBox : resourcePath + "contactMOF/icnPOBox.png",
		icnTwitter : resourcePath + "contactMOF/icnTwitter.png",
		icnWeb : resourcePath + "contactMOF/icnWeb.png",
		icnYoutube : resourcePath + "contactMOF/icnYoutube.png",

		icnHelp : resourcePath + "icnHelp.png",
		icnNext : resourcePath + "icnNext.png",
		icnInfoDone : resourcePath + "icnInfoDone.png",
		icnThemeDark : resourcePath + "icnThemeDark.png",
		icnThemeLight : resourcePath + "icnThemeLight.png",
		icnFontChangeDark : resourcePath + "icnFontChangeDark.png",
		icnFontChangeWhite : resourcePath + "icnFontChangeWhite.png",

		imgDeleteNew : resourcePath + "imgDeleteNew.png",
		icnArrowDownWhite : resourcePath + "icnArrowDown.png",
		icnArrowUPWhite : resourcePath + "icnArrowUP.png",
		icnToolBarFeedback : resourcePath + "icnToolBarFeedback.png",
		icnToolBarFont : resourcePath + "icnToolBarFont.png",
		icnToolBarInstruction : resourcePath + "icnToolBarInstruction.png",
		
		
		icnCross : resourcePath + "icnCross.png",
		icnDelete : resourcePath + "icnDelete.png",
	};

	return path;

};
