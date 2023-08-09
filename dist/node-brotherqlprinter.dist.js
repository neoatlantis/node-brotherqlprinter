!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jimp")):"function"==typeof define&&define.amd?define(["jimp"],t):"object"==typeof exports?exports.BrotherQLPrinter=t(require("jimp")):e.BrotherQLPrinter=t(e.jimp)}(global,(e=>(()=>{var t={227:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let s=0,n=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(s++,"%c"===e&&(n=s))})),t.splice(n,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(447)(t);const{formatters:s}=e.exports;s.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},447:(e,t,r)=>{e.exports=function(e){function t(e){let r,n,o,i=null;function a(...e){if(!a.enabled)return;const s=a,n=Number(new Date),o=n-(r||n);s.diff=o,s.prev=r,s.curr=n,r=n,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((r,n)=>{if("%%"===r)return"%";i++;const o=t.formatters[n];if("function"==typeof o){const t=e[i];r=o.call(s,t),e.splice(i,1),i--}return r})),t.formatArgs.call(s,e),(s.log||t.log).apply(s,e)}return a.namespace=e,a.useColors=t.useColors(),a.color=t.selectColor(e),a.extend=s,a.destroy=t.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==i?i:(n!==t.namespaces&&(n=t.namespaces,o=t.enabled(e)),o),set:e=>{i=e}}),"function"==typeof t.init&&t.init(a),a}function s(e,r){const s=t(this.namespace+(void 0===r?":":r)+e);return s.log=this.log,s}function n(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names.map(n),...t.skips.map(n).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let r;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const s=("string"==typeof e?e:"").split(/[\s,]+/),n=s.length;for(r=0;r<n;r++)s[r]&&("-"===(e=s[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.slice(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let r,s;for(r=0,s=t.skips.length;r<s;r++)if(t.skips[r].test(e))return!1;for(r=0,s=t.names.length;r<s;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(824),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},158:(e,t,r)=>{"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?e.exports=r(227):e.exports=r(39)},39:(e,t,r)=>{const s=r(224),n=r(837);t.init=function(e){e.inspectOpts={};const r=Object.keys(t.inspectOpts);for(let s=0;s<r.length;s++)e.inspectOpts[r[s]]=t.inspectOpts[r[s]]},t.log=function(...e){return process.stderr.write(n.format(...e)+"\n")},t.formatArgs=function(r){const{namespace:s,useColors:n}=this;if(n){const t=this.color,n="[3"+(t<8?t:"8;5;"+t),o=`  ${n};1m${s} [0m`;r[0]=o+r[0].split("\n").join("\n"+o),r.push(n+"m+"+e.exports.humanize(this.diff)+"[0m")}else r[0]=(t.inspectOpts.hideDate?"":(new Date).toISOString()+" ")+s+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):s.isatty(process.stderr.fd)},t.destroy=n.deprecate((()=>{}),"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1];try{const e=r(130);e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter((e=>/^debug_/i.test(e))).reduce(((e,t)=>{const r=t.substring(6).toLowerCase().replace(/_([a-z])/g,((e,t)=>t.toUpperCase()));let s=process.env[t];return s=!!/^(yes|on|true|enabled)$/i.test(s)||!/^(no|off|false|disabled)$/i.test(s)&&("null"===s?null:Number(s)),e[r]=s,e}),{}),e.exports=r(447)(t);const{formatters:o}=e.exports;o.o=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts).split("\n").map((e=>e.trim())).join(" ")},o.O=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts)}},560:e=>{"use strict";e.exports=(e,t=process.argv)=>{const r=e.startsWith("-")?"":1===e.length?"-":"--",s=t.indexOf(r+e),n=t.indexOf("--");return-1!==s&&(-1===n||s<n)}},824:e=>{var t=1e3,r=60*t,s=60*r,n=24*s;function o(e,t,r,s){var n=t>=1.5*r;return Math.round(e/r)+" "+s+(n?"s":"")}e.exports=function(e,i){i=i||{};var a,c,l=typeof e;if("string"===l&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var o=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(o){var i=parseFloat(o[1]);switch((o[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"weeks":case"week":case"w":return 6048e5*i;case"days":case"day":case"d":return i*n;case"hours":case"hour":case"hrs":case"hr":case"h":return i*s;case"minutes":case"minute":case"mins":case"min":case"m":return i*r;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}}}(e);if("number"===l&&isFinite(e))return i.long?(a=e,(c=Math.abs(a))>=n?o(a,c,n,"day"):c>=s?o(a,c,s,"hour"):c>=r?o(a,c,r,"minute"):c>=t?o(a,c,t,"second"):a+" ms"):function(e){var o=Math.abs(e);return o>=n?Math.round(e/n)+"d":o>=s?Math.round(e/s)+"h":o>=r?Math.round(e/r)+"m":o>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},130:(e,t,r)=>{"use strict";const s=r(37),n=r(224),o=r(560),{env:i}=process;let a;function c(e,t={}){return 0!==(r=function(e,{streamIsTTY:t,sniffFlags:r=!0}={}){const n=function(){if("FORCE_COLOR"in i)return"true"===i.FORCE_COLOR?1:"false"===i.FORCE_COLOR?0:0===i.FORCE_COLOR.length?1:Math.min(Number.parseInt(i.FORCE_COLOR,10),3)}();void 0!==n&&(a=n);const c=r?a:n;if(0===c)return 0;if(r){if(o("color=16m")||o("color=full")||o("color=truecolor"))return 3;if(o("color=256"))return 2}if(e&&!t&&void 0===c)return 0;const l=c||0;if("dumb"===i.TERM)return l;if("win32"===process.platform){const e=s.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in i)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE","DRONE"].some((e=>e in i))||"codeship"===i.CI_NAME?1:l;if("TEAMCITY_VERSION"in i)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION)?1:0;if("truecolor"===i.COLORTERM)return 3;if("TERM_PROGRAM"in i){const e=Number.parseInt((i.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(i.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(i.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM)||"COLORTERM"in i?1:l}(e,{streamIsTTY:e&&e.isTTY,...t}))&&{level:r,hasBasic:!0,has256:r>=2,has16m:r>=3};var r}o("no-color")||o("no-colors")||o("color=false")||o("color=never")?a=0:(o("color")||o("colors")||o("color=true")||o("color=always"))&&(a=1),e.exports={supportsColor:c,stdout:c({isTTY:n.isatty(1)}),stderr:c({isTTY:n.isatty(2)})}},37:e=>{"use strict";e.exports=require("os")},224:e=>{"use strict";e.exports=require("tty")},837:e=>{"use strict";e.exports=require("util")},393:t=>{"use strict";t.exports=e}},r={};function s(e){var n=r[e];if(void 0!==n)return n.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,s),o.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{"use strict";s.r(n),s.d(n,{Job:()=>I,PrinterConsoleDebug:()=>p,PrinterIOLinuxKernel:()=>f});const e=require("fs/promises");var t=s(393),r=s.n(t);const o=require("fs");var i=s.n(o);class a{toBuffer(){throw new Error("Must override this.")}toString(){return`[BrotherESCPCommand: ${this.constructor.name}]`}}class c extends a{constructor(e){super(),this.leadingBytes=e}compile(){throw new Error("Must override this.")}toBuffer(){let e=this.compile();if(!(e instanceof Buffer))throw new Error("Compile method must return a Buffer.");let t=Buffer.concat([Buffer.from([27]),this.leadingBytes,e]);return console.log(this.toString(),"\t",t.toString("hex").match(/.{1,2}/g).join(" ")),t}}class l{write(e){throw Error("Must extend this.")}}const u=s(158)("node-brotherqlprinter:PrinterIOLinuxKernel");class f extends l{constructor(e){super(),this.dev_path=e,u("Device path: ",this.dev_path)}static async list(){let t=await(0,e.readdir)("/dev/usb/");return t=t.filter((e=>"lp"==e.slice(0,2))),t.map((e=>"/dev/usb/"+e))}async open(){return this.dev=i().openSync(this.dev_path,"r+"),this}close(){try{i().closeSync(this.dev)}catch(e){}}read({timeout:e=5,length:t=1024}){let r=Buffer.alloc(0),s=Date.now();for(;!r.length&&Date.now()-s<1e3*e;){let e=Buffer.alloc(t),s=i().readSync(this.dev,e,0,t,null);if(s>0&&(r=Buffer.concat([r,e.slice(0,s)])),r.length)break}if(r.length)return r;{let e=Buffer.alloc(t),s=i().readSync(this.dev,e,0,t,null);return s>0&&(r=Buffer.concat([r,e.slice(0,s)])),r}}write(e){e instanceof a&&(e=e.toBuffer()),u("write to printer",e.length,"bytes"),i().writeSync(this.dev,e)}}const d=require("buffer");class p extends l{constructor(){super()}read(){return d.Buffer.from([128,32,0,52,67,0,0,0,0,0,104,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])}write(e){console.log(e)}}class h extends a{toBuffer(){return Buffer.alloc(200)}}class m extends c{constructor(){super(Buffer.from("@"))}compile(){return Buffer.alloc(0)}}class C extends c{constructor(){super(Buffer.from("iS"))}compile(){return Buffer.alloc(0)}}class g{constructor(e){if(!d.Buffer.isBuffer(e)||32!==e.length||128!==e[0]||32!==e[1])throw new Error("Invalid raw input.");this._printerTypeCode=e.slice(3,5).toString("ascii"),this._error1=e[8],this._error2=e[9],this._mediaWidth=e[10],this._mediaType=e[11],this._mediaLength=e[17],this._statusType=e[18]}get printerCode(){return this._printerTypeCode}get mediaWidth(){return this._mediaWidth}get mediaLength(){return this._mediaLength}get mediaPresent(){return 0!==this._mediaType}get isContinuousMedia(){return 10===this._mediaType}get isLabelMedia(){return 11===this._mediaType}get error1Code(){return this._error1}get error2Code(){return this._error2}get errors(){let e=[];function t(t,r){t&&e.push(r)}return t(1&this._error1,"No media when printing."),t(2&this._error1,"End of media (labels)."),t(4&this._error1,"Tape cutter jam."),t(16&this._error1,"Main unit in use."),t(128&this._error1,"Fan failure."),t(4&this._error2,"Transmission error."),t(16&this._error2,"Cover opened while printing."),t(64&this._error2,"Cannot feed paper."),t(128&this._error2,"System error."),e}toString(){var e;return["Printer status:",` - printer type code: ${this.printerCode}`," - media present: "+(e=this.mediaPresent,e?"Yes":"No"),` - media size: ${this.mediaWidth}mm x ${this.isContinuousMedia?"Continuous":this.mediaLength+"mm"}`," - errors:",this.errors.length>0?"   * "+this.errors.join("\n   * "):"   None"].join("\n")}}class w extends c{static MODE_ESCP=0;static MODE_RASTER=1;constructor(e){super(Buffer.from("ia")),this.mode=e}compile(){return Buffer.from([this.mode])}}class y extends c{constructor(e=!0){super(Buffer.from("iM")),this.mode=e?64:0}compile(){return Buffer.from([this.mode])}}class b extends c{constructor(e=!0,t=!1){super(Buffer.from("iK")),this.mode=Number(e)<<3|Number(t)<<6|0}compile(){return Buffer.from([this.mode])}}class F extends c{constructor(e=35){super(Buffer.from("id")),this.feed=e}compile(){let e=Buffer.alloc(2);return e.writeUInt16LE(this.feed),e}}class v{constructor(e,t,r,s,n,o,i){this.name=e,this.size=t,this.formFactor=r,this.dotsTotal=s,this.dotsPrintable=n,this.offsetRight=o,this.feedMargin=i}toString(){return`<Label ${this.name}>`}}const x=[new v("12",[12,0],2,[142,0],[106,0],29,35),new v("29",[29,0],2,[342,0],[306,0],6,35),new v("38",[38,0],2,[449,0],[413,0],12,35),new v("50",[50,0],2,[590,0],[554,0],12,35),new v("54",[54,0],2,[636,0],[590,0],0,35),new v("62",[62,0],2,[732,0],[696,0],12,35),new v("102",[102,0],2,[1200,0],[1164,0],12,35),new v("103",[104,0],2,[1224,0],[1200,0],12,35),new v("17x54",[17,54],1,[201,636],[165,566],0),new v("17x87",[17,87],1,[201,1026],[165,956],0),new v("23x23",[23,23],1,[272,272],[202,202],42),new v("29x42",[29,42],1,[342,495],[306,425],6),new v("29x90",[29,90],1,[342,1061],[306,991],6),new v("39x90",[38,90],1,[449,1061],[413,991],12),new v("39x48",[39,48],1,[461,565],[425,495],6),new v("52x29",[52,29],1,[614,341],[578,271],0),new v("62x29",[62,29],1,[732,341],[696,271],12),new v("62x100",[62,100],1,[732,1179],[696,1109],12),new v("102x51",[102,51],1,[1200,596],[1164,526],12),new v("102x152",[102,153],1,[1200,1804],[1164,1660],12),new v("103x164",[104,164],1,[1224,1941],[1200,1822],12),new v("d12",[12,12],3,[142,142],[94,94],113),new v("d24",[24,24],3,[284,284],[236,236],42),new v("d58",[58,58],3,[688,688],[618,618],51)];class E extends c{constructor(e,t,r=!0){super(Buffer.from("iz"));let s=2===e.formFactor?10:11,n=e.size[0],o=e.size[1],i=Buffer.alloc(4);i.writeUInt32LE(t.bitmap.height);let a=r?0:1;this._data=Buffer.concat([Buffer.from([14,s,n,o]),i,Buffer.from([a,0])])}compile(){return this._data}}class O extends a{constructor(e,t,r){if(super(),!(t instanceof v))throw new Error("labelType must be an instance of Label.");if(e.bitmap.width!==8*r.bytesPerRow)throw new Error("Invalid image width.");this.image=e,this.bytesPerRow=r.bytesPerRow}imageToInstructions(e){e.flip(!0,!1),e.invert();let t=function(e){e.grayscale().contrast(1);let t=Buffer.from(e.bitmap.data),r=Buffer.alloc(Math.floor(t.length/32)),s=e=>e>127?255:0;for(let e=0;e<r.length;e++)r[e]=128&s(t[32*e+0])|64&s(t[32*e+4])|32&s(t[32*e+8])|16&s(t[32*e+12])|8&s(t[32*e+16])|4&s(t[32*e+20])|2&s(t[32*e+24])|1&s(t[32*e+28]);return r}(e),r=Buffer.alloc(0);for(let e=0;e<t.length;e+=this.bytesPerRow){let s=t.slice(e,e+this.bytesPerRow),n=s.length;r=Buffer.concat([r,Buffer.from([103,0,n]),s])}return r}toBuffer(){return this.imageToInstructions(this.image)}}class B extends a{constructor(e=!0){super(),this.isLastPage=e}toBuffer(){return this.isLastPage?Buffer.from([26]):Buffer.from([12])}}class _{constructor(e,t,r,s=0){this.name=e,this.code=t,this.bytesPerRow=r,this.offsetRightAdjust=s}}const R=[new _("QL-1100","4C",162,44)],T=s(393),M=s(158)("node-brotherqlprinter:Job");class I{constructor(e){this.printer=e,this.printer.open(),e.write(new h),e.write(new m),e.write(new C);let t=e.read({timeout:3});if(this.printer.close(),!t)throw new Error("No response from printer.");t=new g(t),M("Printer status read:",t.toString());let r=function(e){const t=R.filter((t=>t.code===e));return t.length>0?t[0]:null}(t.printerCode),s=function({width:e=null,length:t=null,formFactor:r=null}){let s=x;return r&&(s=s.filter((e=>e.formFactor===r))),e&&(s=s.filter((t=>t.size[0]===e))),t&&(s=s.filter((e=>e.size[1]===t))),s}({width:t.mediaWidth,formFactor:t.isContinuousMedia?2:null,length:t.mediaLength});if(1!==s.length)throw new Error("Cannot determine label type.");this.labelType=s[0],this.printerModel=r}async print(e){let t=null;this.printer.open();try{e=await async function(e,t,s){if(!(t instanceof _))throw new Error("printerModel must be an instance of PrinterModel.");if(!(s instanceof v))throw new Error("label must be an instance of Label.");if(2!==s.formFactor)throw new Error("Not implemented yet.");{if(e.bitmap.width!==s.dotsPrintable[0]){let t=Math.floor(s.dotsPrintable[0]/e.bitmap.width*e.bitmap.height);e=await e.resize(s.dotsPrintable[0],t,r().RESIZE_BILINEAR)}let n=8*t.bytesPerRow;if(e.bitmap.width<n){let s=await new(r())(n,e.bitmap.height,4294967295);s.composite(e,n-e.bitmap.width-t.offsetRightAdjust,0),e=s}}return e}(e,this.printerModel,this.labelType);let t=[new w(w.MODE_RASTER),new E(this.labelType,e,!0),new y(!0),new b(!0,!1),new F(this.labelType.feedMargin),new O(e,this.labelType,this.printerModel),new B];for(let e of t)this.printer.write(e)}catch(e){t=e}if(t)throw this.printer.close(),t;try{let e=this.printer.read({timeout:3});return e?(e=new g(e),console.log(e.toString()),this.printer.close(),e):(this.printer.close(),null)}finally{return this.printer.close(),null}}async readAndPrint(){let e=await T.read.apply(this,[...arguments]);return await this.print(e)}}s(158)("node-brotherqlprinter:index")})(),n})()));