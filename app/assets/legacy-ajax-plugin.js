
function GenerateRecords(_type, _country, _locale)
{
	if(!_type)
		return;
	var placeHolderID = "A447572CB9704152810667EBDCB151E7"; //Default behaviour

	if(document.getElementById(placeHolderID)==null)
		document.writeln('<div id="'+placeHolderID+'"></div>');
		
	document.writeln("<script type='text/javascript' charset='utf-8' src='https://bch.cbd.int/widgets.js'></script>");
	const iframePlaceholder = document.getElementById(placeHolderID);

	if(iframePlaceholder){
		
		var code = "<div class='scbd-chm-embed' data-type='chm-search-result'"
		if(_type)
			code += ` data-legacy-schema='${_type}'`;
		if(_country && _country!= '*'){
			//since legacy bch is only has countries configured, if more then 3 means its a region and not iso country code
			if(_country?.length > 3)			
				code += ` data-legacy-regions='${_country}'`
			else
				code += ` data-legacy-countries='${_country}'`
		}

		code += ` data-locale='${_locale}' "width='100%' ></div>`;
		
		iframePlaceholder.innerHTML = code;
	}

}

window.GenerateRecords = GenerateRecords;