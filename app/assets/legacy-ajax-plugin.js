
function GenerateRecords(_type, _country, _locale)
{
	if(!_type)
		return;
	var placeHolderID = "A447572CB9704152810667EBDCB151E7"; //Default behaviour

	if(document.getElementById(placeHolderID)==null)
		document.writeln('<div id="'+placeHolderID+'"></div>');
		
	document.writeln("<script type='text/javascript' charset='utf-8' src='/widgets.js'></script>");
	const iframePlaceholder = document.getElementById(placeHolderID);

	if(iframePlaceholder){
	iframePlaceholder.innerHTML = "<div class='scbd-chm-embed' data-type='chm-search-result' data-legacy-schema='" + _type + "' " +
									"data-legacy-countries='" + _country + "' data-locale='" + _locale + "' " + 
									"width='100%' ></div>";
	}

}

window.GenerateRecords = GenerateRecords;