var getAboutUsView = function(){
	var backView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		backgroundColor:'white'
	});
	
	var imageView = Ti.UI.createImageView({
		width:'92%',
		height:Ti.Platform.displayCaps.platformWidth*92/100*203/675,
		image : Titanium.Filesystem.resourcesDirectory+'images/AboutBG.png',
		top:Ti.Platform.displayCaps.platformWidth*4/100,
		left:'4%',
		borderRadius : '4dp'
	});
	
	var text = Ti.UI.createTextArea({
		width:'92%',
		height:Ti.UI.FILL,
		top:Ti.Platform.displayCaps.platformWidth*8/100 + imageView.height,
		left:'4%',
		textAlign:Ti.UI. TEXT_ALIGNMENT_CENTER,
		editable : false
	});
	var str;
	if(Ti.App.LangID==1)
		str = 'Founded in 2007, Dubai Maritime City Authority (DMCA) has brought about a radical change in the local maritime sector through an extensive range of industry initiatives and regulations which support its ambitious approach to creating a safe investment environment for industry leaders from all over the world, while reaffirming Dubai’s position as a first-class international maritime hub. Established to monitor, develop and promote maritime activities, DMCA provides a platform of excellence and quality as it develops world-class regulations and guidelines to raise the bar on the maritime industry and boost its infrastructure, operations and logistics services while offering investment opportunities to boost Dubai’s competitiveness at the regional and international levels.\n\n\tDMCA aims to build effective and strategic partnerships with relevant government agencies, private businesses and stakeholders in line with its vision to create a safe and vibrant maritime sector and therefore drive economic sustainability and growth in the emirate. The Authority is keen on expanding its scope of work and laying down effective policies under the highest standards of maritime safety and best environmental practices, in adherence with the local and international laws to develop a safe maritime environment for maritime operations and businesses.';
	else str = 'بدأت "سلطة مدينة دبي الملاحية" مسيرة الريادة في العام 2007 محدثةً نقلة جذرية على مستوى القطاع البحري المحلي عبر إطلاق مجموعة من المبادرات واللوائح التنظيمية التي تدعم النهج الطموح في تهيئة البيئة الاستثمارية المناسبة لاستقطاب روّاد الصناعات البحرية من مختلف أنحاء العالم وترسيخ مكانة دبي الطليعية كمركز بحري عالمي من الطراز الأوّل. وتوفر السلطة البحرية، التي تأسست كجهة حكومية مستقلة ومعنية بتنظيم وتعزيز وتطوير القطاع البحري، قاعدة متينة قائمة على أعلى معايير التميز والجودة لتطوير لوائح تنظيمية وتشريعات عالمية المستوى للإرتقاء بمكوّنات القطاع البحري وتحديث البنى التحتية والعمليات التشغيلية والخدمات اللوجستية وتنويع الفرص الاستثمارية التي من شأنها تعزيز المزايا التنافسية لإمارة دبي على الصعيد البحري إقليمياً وعالمياً.\n\n\tويستند نطاق عمل السلطة البحرية إلى بناء شراكات إستراتيجية فاعلة مع الهيئات الحكومية ومؤسسات القطاع الخاص وكافة الجهات المعنية بالشأن البحري في إمارة دبي في سبيل تجسيد رؤيتها الطموحة والمتمثلة في خلق قطاع بحري متجدد وآمن وقادر على تلبية متطلبات التنمية الاقتصادية المستدامة في دبي. ويتمحور تركيز السلطة حول توسيع الأطر العملية ووضع السياسات الفاعلة التي تسهم في تطبيق أعلى معايير السلامة البحرية وأفضل المبادرات البحرية الخضراء بما ينسجم مع القوانين المحلية والدولية من أجل إيجاد بيئة بحرية آمنة ومناسبة لإدارة العمليات التشغيلية وإنجاح الأعمال التجارية البحرية بأنواعها.';
	text.setValue(str);
	backView.add(imageView);
	backView.add(text);
	
	return backView;
};

module.exports = getAboutUsView;