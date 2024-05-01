
import ApiBase  from '~/api/api-base';
import L from 'leaflet';
import _  from 'lodash';

export default class mapAPI extends ApiBase
{
    constructor(options) {
        super(options);
    }
    // async query(link){  
    //   const result = await this.http.get(link.url,)
    //                        // .then(function(res) {  return res.data })   //L.geoJson(res.data) })  
    //                         .then(function(res) {  return L.geoJson(res.data) })  
    //                         // .catch(tryCastToApiError);  
    //   return result;
    // }
  
    query(qLinks){  
    
      var qGis = _.map(qLinks, function(link) {   
        return  this.http.get(link.url).then(function(res) {
            return L.geoJson(res.data);
        });
      });   

      Promise.all(qGis).then(function (layers) {
          console.log("layers")
          console.log(layers)
          return layers; 
      });   
}
}

    