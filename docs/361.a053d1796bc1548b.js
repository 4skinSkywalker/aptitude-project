(self.webpackChunkmulti_layout=self.webpackChunkmulti_layout||[]).push([[361],{60338:(ee,O,e)=>{"use strict";e.d(O,{QA:()=>s,hd:()=>i});var o=e(94650),f=e(90433),d=e(36895),c=e(27574);const p={provide:f.JU,useExisting:(0,o.Gpc)(()=>i),multi:!0};class i{constructor(t,a,u){this._renderer=t,this._elementRef=a,this._compositionMode=u,this.textMaskConfig={mask:[],guide:!0,placeholderChar:"_",pipe:void 0,keepCharPositions:!1},this.onChange=C=>{},this.onTouched=()=>{},this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function r(){const n=(0,d.q)()?(0,d.q)().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}())}ngOnChanges(t){this._setupMask(!0),void 0!==this.textMaskInputElement&&this.textMaskInputElement.update(this.inputElement.value)}writeValue(t){this._setupMask(),this._renderer.setProperty(this.inputElement,"value",t??""),void 0!==this.textMaskInputElement&&this.textMaskInputElement.update(t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&(this._setupMask(),void 0!==this.textMaskInputElement&&(this.textMaskInputElement.update(t),this.onChange(t=this.inputElement.value)))}_setupMask(t=!1){this.inputElement||(this.inputElement="INPUT"===this._elementRef.nativeElement.tagName.toUpperCase()?this._elementRef.nativeElement:this._elementRef.nativeElement.getElementsByTagName("INPUT")[0]),this.inputElement&&t&&(this.textMaskInputElement=(0,c.createTextMaskInputElement)(Object.assign({inputElement:this.inputElement},this.textMaskConfig)))}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this._handleInput(t)}}i.\u0275fac=function(t){return new(t||i)(o.Y36(o.Qsj),o.Y36(o.SBq),o.Y36(f.ve,8))},i.\u0275dir=o.lG2({type:i,selectors:[["","textMask",""]],hostBindings:function(t,a){1&t&&o.NdJ("input",function(C){return a._handleInput(C.target.value)})("blur",function(){return a.onTouched()})("compositionstart",function(){return a._compositionStart()})("compositionend",function(C){return a._compositionEnd(C.target.value)})},inputs:{textMaskConfig:["textMask","textMaskConfig"]},exportAs:["textMask"],features:[o._Bn([p]),o.TTD]});class s{}s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({})},44466:(ee,O,e)=>{"use strict";e.d(O,{m:()=>r});var o=e(36895),f=e(12682),d=e(90433),c=e(80529),M=e(15127),v=e(60338),p=e(94650);class r{}r.\u0275fac=function(s){return new(s||r)},r.\u0275mod=p.oAB({type:r}),r.\u0275inj=p.cJS({imports:[o.ez,c.JF,M.Bz,d.u5,d.UX,f.IJ,v.QA,c.JF,M.Bz,d.u5,d.UX,f.IJ,v.QA]})},78372:(ee,O,e)=>{"use strict";e.d(O,{b:()=>c});var o=e(11566),f=e(54482),d=e(25403);function c(M,v=o.z){return(0,f.e)((p,r)=>{let i=null,s=null,n=null;const t=()=>{if(i){i.unsubscribe(),i=null;const u=s;s=null,r.next(u)}};function a(){const u=n+M,C=v.now();if(C<u)return i=this.schedule(void 0,u-C),void r.add(i);t()}p.subscribe((0,d.x)(r,u=>{s=u,n=v.now(),i||(i=v.schedule(a,M),r.add(i))},()=>{t(),r.complete()},void 0,()=>{s=i=null}))})}},27574:function(ee){ee.exports=function(O){function e(f){if(o[f])return o[f].exports;var d=o[f]={exports:{},id:f,loaded:!1};return O[f].call(d.exports,d,d.exports,e),d.loaded=!0,d.exports}var o={};return e.m=O,e.c=o,e.p="",e(0)}([function(O,e,o){"use strict";function f(v){return v&&v.__esModule?v:{default:v}}Object.defineProperty(e,"__esModule",{value:!0});var d=o(3);Object.defineProperty(e,"conformToMask",{enumerable:!0,get:function(){return f(d).default}});var c=o(2);Object.defineProperty(e,"adjustCaretPosition",{enumerable:!0,get:function(){return f(c).default}});var M=o(5);Object.defineProperty(e,"createTextMaskInputElement",{enumerable:!0,get:function(){return f(M).default}})},function(O,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.placeholderChar="_",e.strFunction="function"},function(O,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function o(c){var M=c.previousConformedValue,v=void 0===M?d:M,p=c.previousPlaceholder,r=void 0===p?d:p,i=c.currentCaretPosition,s=void 0===i?0:i,n=c.conformedValue,t=c.rawValue,a=c.placeholderChar,u=c.placeholder,C=c.indexesOfPipedChars,I=void 0===C?f:C,z=c.caretTrapIndexes,A=void 0===z?f:z;if(0===s||!t.length)return 0;var _=v.length,T=u.length,E=n.length,S=t.length-_,m=S>0;if(S>1&&!m&&0!==_)return s;var g=0,j=void 0,D=void 0;if(!m||v!==n&&n!==u){var L=n.toLowerCase(),h=t.toLowerCase().substr(0,s).split(d).filter(function(k){return-1!==L.indexOf(k)});D=h[h.length-1];var K=r.substr(0,h.length).split(d).filter(function(k){return k!==a}).length,x=u.substr(0,h.length).split(d).filter(function(k){return k!==a}).length;!m&&(x!==K||void 0!==r[h.length-1]&&void 0!==u[h.length-2]&&r[h.length-1]!==a&&r[h.length-1]!==u[h.length-1]&&r[h.length-1]===u[h.length-2])&&K>0&&u.indexOf(D)>-1&&void 0!==t[s]&&(j=!0,D=t[s]);for(var Z=I.map(function(k){return L[k]}).filter(function(k){return k===D}).length,H=h.filter(function(k){return k===D}).length,$=u.substr(0,u.indexOf(a)).split(d).filter(function(k,q){return k===D&&t[q]!==k}).length+H+Z+(j?1:0),Y=0,B=0;B<E&&(g=B+1,L[B]===D&&Y++,!(Y>=$));B++);}else g=s-S;if(m){for(var b=g,P=g;P<=T;P++)if(u[P]===a&&(b=P),u[P]===a||-1!==A.indexOf(P)||P===T)return b}else if(j){for(var w=g-1;w>=0;w--)if(n[w]===D||-1!==A.indexOf(w)||0===w)return w}else for(var V=g;V>=0;V--)if(u[V-1]===a||-1!==A.indexOf(V)||0===V)return V};var f=[],d=""},function(O,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r};e.default=function f(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,c.isArray)(i)){if((typeof i>"u"?"undefined":d(i))!==M.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");i=i(r,s),i=(0,c.processCaretTraps)(i).maskWithoutCaretTraps}var n=s.guide,t=void 0===n||n,a=s.previousConformedValue,u=void 0===a?p:a,C=s.placeholderChar,I=void 0===C?M.placeholderChar:C,z=s.placeholder,A=void 0===z?(0,c.convertMaskToPlaceholder)(i,I):z,_=s.keepCharPositions,T=!1===t&&void 0!==u,E=r.length,S=u.length,m=A.length,Q=i.length,U=E-S,W=U>0,g=s.currentCaretPosition+(W?-U:0),j=g+Math.abs(U);if(!0===_&&!W){for(var D=p,L=g;L<j;L++)A[L]===I&&(D+=I);r=r.slice(0,g)+D+r.slice(g,E)}for(var R=r.split(p).map(function(w,V){return{char:w,isNew:V>=g&&V<j}}),y=E-1;y>=0;y--){var h=R[y].char;h!==I&&h===A[y>=g&&S===Q?y-U:y]&&R.splice(y,1)}var x=p,F=!1;e:for(var N=0;N<m;N++){var J=A[N];if(J===I){if(R.length>0)for(;R.length>0;){var Z=R.shift(),H=Z.char,G=Z.isNew;if(H===I&&!0!==T){x+=I;continue e}if(i[N].test(H)){if(!0===_&&!1!==G&&u!==p&&!1!==t&&W){for(var $=R.length,Y=null,B=0;B<$;B++){var X=R[B];if(X.char!==I&&!1===X.isNew)break;if(X.char===I){Y=B;break}}null!==Y?(x+=H,R.splice(Y,1)):N--}else x+=H;continue e}F=!0}!1===T&&(x+=A.substr(N,m));break}x+=J}if(T&&!1===W){for(var b=null,P=0;P<x.length;P++)A[P]===I&&(b=P);x=null!==b?x.substr(0,b+1):p}return{conformedValue:x,meta:{someCharsRejected:F}}};var c=o(4),M=o(1),v=[],p=""},function(O,e,o){"use strict";function d(n){return Array.isArray&&Array.isArray(n)||n instanceof Array}Object.defineProperty(e,"__esModule",{value:!0}),e.convertMaskToPlaceholder=function f(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.placeholderChar;if(!d(n))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(-1!==n.indexOf(t))throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\nThe placeholder character that was received is: "+JSON.stringify(t)+"\n\nThe mask that was received is: "+JSON.stringify(n));return n.map(function(a){return a instanceof RegExp?t:a}).join("")},e.isArray=d,e.isString=function c(n){return"string"==typeof n||n instanceof String},e.isNumber=function M(n){return"number"==typeof n&&void 0===n.length&&!isNaN(n)},e.isNil=function v(n){return typeof n>"u"||null===n},e.processCaretTraps=function p(n){for(var t=[],a=void 0;-1!==(a=n.indexOf(s));)t.push(a),n.splice(a,1);return{maskWithoutCaretTraps:n,indexes:t}};var r=o(1),i=[],s="[]"},function(O,e,o){"use strict";function f(l){return l&&l.__esModule?l:{default:l}}Object.defineProperty(e,"__esModule",{value:!0});var v=Object.assign||function(l){for(var _=1;_<arguments.length;_++){var T=arguments[_];for(var E in T)Object.prototype.hasOwnProperty.call(T,E)&&(l[E]=T[E])}return l},p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(l){return typeof l}:function(l){return l&&"function"==typeof Symbol&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l};e.default=function d(l){var _={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:_,update:function(T){var E=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l,S=E.inputElement,m=E.mask,Q=E.guide,U=E.pipe,W=E.placeholderChar,g=void 0===W?a.placeholderChar:W,j=E.keepCharPositions,D=void 0!==j&&j,L=E.showMask,R=void 0!==L&&L;if(typeof T>"u"&&(T=S.value),T!==_.previousConformedValue){(typeof m>"u"?"undefined":p(m))===I&&void 0!==m.pipe&&void 0!==m.mask&&(U=m.pipe,m=m.mask);var y=void 0,h=void 0;if(m instanceof Array&&(y=(0,t.convertMaskToPlaceholder)(m,g)),!1!==m){var K=function M(l){if((0,t.isString)(l))return l;if((0,t.isNumber)(l))return String(l);if(null==l)return u;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(l))}(T),x=S.selectionEnd,F=_.previousConformedValue,N=_.previousPlaceholder,J=void 0;if((typeof m>"u"?"undefined":p(m))===a.strFunction){if(!1===(h=m(K,{currentCaretPosition:x,previousConformedValue:F,placeholderChar:g})))return;var Z=(0,t.processCaretTraps)(h);J=Z.indexes,y=(0,t.convertMaskToPlaceholder)(h=Z.maskWithoutCaretTraps,g)}else h=m;var $={previousConformedValue:F,guide:Q,placeholderChar:g,pipe:U,placeholder:y,currentCaretPosition:x,keepCharPositions:D},B=(0,n.default)(K,h,$).conformedValue,X=(typeof U>"u"?"undefined":p(U))===a.strFunction,b={};X&&(!1===(b=U(B,v({rawValue:K},$)))?b={value:F,rejected:!0}:(0,t.isString)(b)&&(b={value:b}));var P=X?b.value:B,w=(0,i.default)({previousConformedValue:F,previousPlaceholder:N,conformedValue:P,placeholder:y,rawValue:K,currentCaretPosition:x,placeholderChar:g,indexesOfPipedChars:b.indexesOfPipedChars,caretTrapIndexes:J}),q=P===y&&0===w?R?y:u:P;_.previousConformedValue=q,_.previousPlaceholder=y,S.value!==q&&(S.value=q,function c(l,_){document.activeElement===l&&(z?A(function(){return l.setSelectionRange(_,_,C)},0):l.setSelectionRange(_,_,C))}(S,w))}}}}};var i=f(o(2)),n=f(o(3)),t=o(4),a=o(1),u="",C="none",I="object",z=typeof navigator<"u"&&/Android/i.test(navigator.userAgent),A=typeof requestAnimationFrame<"u"?requestAnimationFrame:setTimeout}])}}]);