export function genericFilter ($query, items) {
    if(!items)
      return;
    var matchedOptions = [];
    for(var i=0; i!=items.length; ++i)
      if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
        matchedOptions.push(items[i]);

    return matchedOptions;
  };

  export function genericMapping (item) {
    return {identifier: item.identifier};
  };