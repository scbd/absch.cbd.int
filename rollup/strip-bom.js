import stripBom from 'strip-bom';


export default function (options = {}) {

  return {
    name: 'stripBom',

    transform(code) {
      
      if (typeof (code) == "string") {
        code = stripBom(code).replace(/^\u00BB\u00BF/gm,"");
      }

      return { code, map: this.getCombinedSourcemap() };
    }
  };
}
