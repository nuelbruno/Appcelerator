Ti.App.TitleBarColor = '8a2006';

Ti.App.TitleBarBackImage = Ti.App.ResourcePath + L('top_bar');
Ti.App.BackButtonImage = Ti.App.ResourcePath + L('btn_back');
Ti.App.DefaultBackGroundColor = '#fbfcf7';

Ti.App.TitleFontColor = '#333333';
Ti.App.DescriptionFontColor = '#555555';
Ti.App.RedColor = '#8b1f05';

Ti.App.BigFontSize ='18dp';
Ti.App.MediumFontSize ='15dp';
Ti.App.SmallFontSize ='13dp';

//Contact 
Ti.App.ContactNo = '80022220';

//cms default values
Ti.App.WebsiteId = 1;
//Ti.App.LanguageId = 1;


Ti.App.ServiceCentersFindUsGenericContentCategoryUniqueName = 'servicescenter';
Ti.App.ServiceDirectoryGenericContentCategoryUniqueName = 'servicescenter';
Ti.App.AboutUsDetailsGenericContentCategoryUniqueName = 'about.us.mobile';

Ti.App.TermsAndConditionsGenericContentUniqueName = 'terms.and.conditions';
Ti.App.FaqsGenericContentCategoryUniqueName = 'faq';
Ti.App.FaqsGenericContentCategoryUniqueNameArabic = 'faq.ar';
//URLS

Ti.App.CMSDataFolderDomainPath ='http://csskiosk/ADMWebsite/';
//Ti.App.CMSServicesDomainPath = 'http://csskiosk/ADMTacsoft/Services/'; //'http://demoserver.tacme.net:3030/DmcaTacsofth3/services/'; 
Ti.App.CMSServicesDomainPath = 'http://demoserver.tacme.net:3030/MOITacsoft/Services/';

Ti.App.NewsServiceURL = Ti.App.CMSServicesDomainPath + 'NewsService.svc';
Ti.App.GenericContentServiceURL = Ti.App.CMSServicesDomainPath + 'GenericContentService.svc';
Ti.App.HelperserviceURL = Ti.App.CMSServicesDomainPath + 'Helperservice.svc';
Ti.App.MediaGalleryServiceURL = Ti.App.CMSServicesDomainPath + 'MediaGalleryService.svc';
Ti.App.MunicipalServicesURL =Ti.App.CMSServicesDomainPath + 'MunicipalServicesService.svc';


Ti.App.webserviceURL = 'http://gis.adm.gov.ae/';

//THird party URLS
Ti.App.ADMFaceBookURL = 'https://www.facebook.com/ad.municipality?v=wal';
Ti.App.ADMTwitterURL = 'https://twitter.com/admarabic';
Ti.App.ADMYoutubeURL = 'http://www.youtube.com/user/ADMunicipality';




//Lists


Ti.App.PreferredLanguagesList = [{
	name : 'English'
}];


var arr = new Array();

var p1 = {
name : "Abu Dhabi city municipality announces the Soft Launch of the Six Continents At Lhalifa Park - Abu Dhabi From 12/12/2013 to 31/3/2014 ",
date : "12/12/2013",
desc : "The Soft Launch of the Six Continents At Lhalifa Park - Abu Dhabi From 12/12/2013 to 31/3/2014. ",
image : "http://adm.gov.ae/En/projects/ZoomImages/117201061542123300000.jpg"
};
var p2 = {
name : "Abu Dhabi City Municipality engages in final preparations to fulfill requirements of ISO 50001 Energy Management System Certification ",
date : "10/12/2013",
desc : "The Environment, Health and Safety Division, Abu Dhabi City Municipality has embarked on obtaining the ISO 50001 Energy Management System ",
image : "http://adm.gov.ae/En/projects/ZoomImages/45201021306598160000.jpg"
};
var p3 = {
name : "Abu Dhabi City Municipality starts implementing Abu Dhabi emirate 3D Model Project ",
date : "08/12/2013",
desc : "Abu Dhabi City Municipality, in collaboration with the Department of Municipal Affairs, Al Ain Municipality, Western Region Municipality, ",
image : "http://adm.gov.ae/En/projects/ZoomImages/18201321615453543750.jpg"
};
var p4 = {
name : "Municipality of Abu Dhabi City participates in ‘Clean Up UAE’ campaign ",
date : "05/12/2013",
desc : "Abu Dhabi City Municipality has recently participated in the 12th edition of “Clean Up UAE” campaign, organized by the Emirates Environmen ",
image : "http://adm.gov.ae/En/projects/ZoomImages/117201061542123300000.jpg"
};

var p5 = {
name : "Abu Dhabi City Municipality completes construction of Al Mina Road Project ",
date : "05/12/2013",
desc : "Marking the 42nd UAE National Day celebrations, the Abu Dhabi City Municipality has completed the construction of Al Mina Road Project; wh",
image : "http://adm.gov.ae/En/projects/ZoomImages/45201021306598160000.jpg"
};
var p6 = {
name : "ADM launches online planning approvals of infrastructure and road routes and approvals of work start notifications ",
date : "04/12/2013",
desc : "In a further boost to its galaxy of e-services, Abu Dhabi City Municipality has launched a service enabling applying for planning approval ",
image : "http://adm.gov.ae/En/projects/ZoomImages/18201321615453543750.jpg"
};
var p7 = {
name : "INVITATION ",
date : "04/12/2013",
desc : "Abu Dhabi City Municipality takes the pleasure of inviting all entities, developers, consultants, and contractors involved in infrastructu ",
image : "http://adm.gov.ae/En/projects/ZoomImages/117201061542123300000.jpg"
};

arr.push(p1);
arr.push(p2);
arr.push(p3);
arr.push(p4);
arr.push(p5);
arr.push(p6);
arr.push(p7);

Ti.App.TempArray = arr;

//temp Faq list
Ti.App.TempFqList=[
{
	question:'What are the services provided by the Municipality?',
	answer:'Please click here to review the Service Directory of the Municipality of Abu Dhabi City'
},
{
	question:'Where can I access the municipality services?',
	answer:'You can access the services provided by the Municipality of Abu Dhabi City through the following customer service centers'
}
];


Ti.App.TempFqList1=[
{
	question:'What are the services',
	answer:'Please click'
},
{
	question:'Where can',
	answer:'You can access  centers'
}
];
//TEmp Photo galery images
Ti.App.TempPhotoGalleryImages = [{
	  path:Ti.App.ResourcePath + 'temp_gallery/image1.jpg',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image1.jpg',
	  caption: 'My beautiful picture!'
	}, {
	  path:Ti.App.ResourcePath + 'temp_gallery/image2.jpg',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image2.jpg',
	  caption: 'My other beautiful picture!'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/image3.jpg',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image3.jpg',
	  caption: 'My beautiful picture!'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/image4.jpg',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image4.jpg',
	  caption: 'My beautiful picture!'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/image5.jpg',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image5.jpg',
	  caption: 'My beautiful picture!'
	}];

//TEmp Video galery videos
Ti.App.TempVideoGalleryVideos = [{
	  path:Ti.App.ResourcePath + 'temp_gallery/testVideo1.mp4',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image1.jpg',
	  caption: 'Video1'
	}, {
	  path:Ti.App.ResourcePath + 'temp_gallery/testVideo2.mp4',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image2.jpg',
	  caption: 'Video 2'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/testVideo1.mp4',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image3.jpg',
	  caption: 'Video 3'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/testVideo2.mp4',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image4.jpg',
	  caption: 'Video 4'
	},
	{
	  path:Ti.App.ResourcePath + 'temp_gallery/testVideo1.mp4',
	  thumbPath:Ti.App.ResourcePath + 'temp_gallery/image5.jpg',
	  caption: 'Video 5'
	}];
// Temp Find us locations
Ti.App.TempFindUsLocations = [{
	  title:'ADM Headquarter',
	  content:'Phone: 02-6788888\nFor enquiries please fill in the Online Contact Form\nWorking Hours: All days of the week from 7:30 to 3:30\nThursday 7:30 am - 5:00 pm\nNo Work on Saturday'
	  
	}, {
	  title:'AL Bateen Center',
	  content:'Phone: 02-6788888\nEmail: bateen_office@adm.abudhabi.ae\nWorking Hours: All days of the week from 7:30 to 3:30\nSaturday 8:00 am - 2:00 pm '
	  
	},
	{
	  title:'Al Zaafaranah Center',
	  content:'Phone: 02-6788888\nEmail: zaafaranah_office@adm.abudhabi.ae\nWorking Hours: Sunday - Thursday: 7:30 am - 3:30 pm '
	  
	}];

//Temp Services
Ti.App.TempServiceTypes = [{
	  title:'Community Services',
	  id : 26
	}, {
	  title:'Construction Permits',
	  id : 30
	},
	{
	  title:'Customer Service',
	  id : 39
	}];	

Ti.App.OpenWindow = null;
Ti.App.Counter = 0;

//Media Services
Ti.App.NewsServices = 1;
Ti.App.ImagesServices = 2;
Ti.App.VideosServices = 3;


//Media Type
Ti.App.MediaTypeImage = 1;
Ti.App.MediaTypeVideo = 2;

if (Ti.Platform.osname == 'android') {
Ti.App.MaxVideoDuration = 20;
// 20 seconds
} else {
Ti.App.MaxVideoDuration = 20000;
// 20 seconds
}

//Templates
//more list template




//News List Template
Ti.App.NewsListTemplate = {
    childTemplates: [
       
        {                            // Title 
            type: 'Ti.UI.Label',     // Use a label for the title 
            bindId: 'date',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                color: Ti.App.DescriptionFontColor,
                font: { fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
                left: '0dp', top: 5,
            }
        },
        {                            // Title 
            type: 'Ti.UI.Label',     // Use a label for the title 
            bindId: 'info',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                color: Ti.App.TitleFontColor,
                font: { fontSize:Ti.App.MediumFontSize },
                left: '0dp', top: '20dp',height:'40dp'
            }
        },
        {                            // Subtitle
            type: 'Ti.UI.Label',     // Use a label for the subtitle
            bindId: 'es_info',       // Maps to a custom es_info property of the item data
            properties: {            // Sets the label properties
                color: Ti.App.DescriptionFontColor,
                font: {  fontSize: Ti.App.SmallFontSize },
                left: '0dp', top: '55dp',height:'40dp'
            }
        }
    ],
    properties : {
        height : '100dp',
        //height : Ti.UI.SIZE
    }
};
//Faq list template
Ti.App.ExpandCollapseTemplate={
	 properties: {
            height:Ti.UI.SIZE, //'130dp',
            selectedBackgroundColor:''
    },
	childTemplates :[
	{
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			top:0,
			left:0,
			color : Ti.App.TitleFontColor,
			font : {fontSize:Ti.App.MediumFontSize}
		}
		
	},
	{
		type : 'Ti.UI.Label',
		bindId : 'desc',
		properties : {
			top:15,
			left:0,
			
			color : Ti.App.TitleFontColor,
			font : {fontSize:Ti.App.SmallFontSize}
		}
		
	},
	{
		type:'Ti.UI.ImageView',
		bindId: 'arrow',
		properties:{
			image:Ti.App.ResourcePath + L('MoreArrow'),
			right:5
		}
	}
	]
};

// Ti.App.ExpandCollapseTemplateWithView={
	// childTemplates :[
	// {
		// type : 'Ti.UI.View',
		// bindId : 'questionView',
		// properties : {
			// layout:'vertical',
			// left:0,
			// width: 320
            // //height: 70
		// },
		// childTemplates:[
			// {
				// type : 'Ti.UI.Label',
				// bindId : 'title',
				// properties : {
					// top:0,
					// left:0,
					// color : Ti.App.TitleFontColor,
					// font : {fontSize:Ti.App.MediumFontSize}
				// }
// 				
			// },
			// {
				// type : 'Ti.UI.Label',
				// bindId : 'description',
				// properties : {
					// top:20,
					// left:0,
					// color : Ti.App.TitleFontColor,
					// font : {fontSize:Ti.App.MediumFontSize}
				// }
// 				
			// },
			// {
				// type:'Ti.UI.ImageView',
				// bindId: 'arrow',
				// properties:{
					// top:5,
					// image:Ti.App.ResourcePath + L('MoreArrow'),
					// right:5
				// }
			// }
	     // ]
// 		
	// },
// 	
	// // {
		// // type:'Ti.UI.View',
		// // bindId: 'answerView',
		// // properties:{
			// // top:20,
			// // left:0,
			// // width: 320,
            // // //height: 120,
            // // //layout:'vertical'
		// // },
		// // childTemplates:[
		// // {
			// // type : 'Ti.UI.Label',
			// // bindId : 'description',
			// // properties : {
				// // top:0,
				// // left:0,
				// // color : Ti.App.TitleFontColor,
				// // font : {fontSize:Ti.App.SmallFontSize}
			// // }
		// // }
		// // ]
	// // }
	// ]
// };


