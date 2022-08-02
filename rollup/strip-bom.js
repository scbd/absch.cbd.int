export default function stripBom(options = {}) {

  return {
    name: 'stripBom',

    transform(code) {

      if (typeof (code) == "string")
        code = code.replace(/^\uFEFF/gm, "").replace(/^\u00BB\u00BF/gm,"");

      return { code, map: this.getCombinedSourcemap() };
    }
  };
}
