(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var Jm={exports:{}},uc={},eg={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var co=Symbol.for("react.element"),r0=Symbol.for("react.portal"),s0=Symbol.for("react.fragment"),a0=Symbol.for("react.strict_mode"),o0=Symbol.for("react.profiler"),l0=Symbol.for("react.provider"),c0=Symbol.for("react.context"),u0=Symbol.for("react.forward_ref"),d0=Symbol.for("react.suspense"),f0=Symbol.for("react.memo"),h0=Symbol.for("react.lazy"),Fh=Symbol.iterator;function p0(t){return t===null||typeof t!="object"?null:(t=Fh&&t[Fh]||t["@@iterator"],typeof t=="function"?t:null)}var tg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ng=Object.assign,ig={};function ia(t,e,n){this.props=t,this.context=e,this.refs=ig,this.updater=n||tg}ia.prototype.isReactComponent={};ia.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ia.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function rg(){}rg.prototype=ia.prototype;function Cf(t,e,n){this.props=t,this.context=e,this.refs=ig,this.updater=n||tg}var Rf=Cf.prototype=new rg;Rf.constructor=Cf;ng(Rf,ia.prototype);Rf.isPureReactComponent=!0;var Oh=Array.isArray,sg=Object.prototype.hasOwnProperty,bf={current:null},ag={key:!0,ref:!0,__self:!0,__source:!0};function og(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)sg.call(e,i)&&!ag.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:co,type:t,key:s,ref:a,props:r,_owner:bf.current}}function m0(t,e){return{$$typeof:co,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Pf(t){return typeof t=="object"&&t!==null&&t.$$typeof===co}function g0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var kh=/\/+/g;function Dc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?g0(""+t.key):e.toString(36)}function dl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case co:case r0:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Dc(a,0):i,Oh(r)?(n="",t!=null&&(n=t.replace(kh,"$&/")+"/"),dl(r,e,n,"",function(c){return c})):r!=null&&(Pf(r)&&(r=m0(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(kh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Oh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Dc(s,o);a+=dl(s,e,n,l,r)}else if(l=p0(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Dc(s,o++),a+=dl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Eo(t,e,n){if(t==null)return t;var i=[],r=0;return dl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function v0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nn={current:null},fl={transition:null},_0={ReactCurrentDispatcher:nn,ReactCurrentBatchConfig:fl,ReactCurrentOwner:bf};function lg(){throw Error("act(...) is not supported in production builds of React.")}$e.Children={map:Eo,forEach:function(t,e,n){Eo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Eo(t,function(){e++}),e},toArray:function(t){return Eo(t,function(e){return e})||[]},only:function(t){if(!Pf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};$e.Component=ia;$e.Fragment=s0;$e.Profiler=o0;$e.PureComponent=Cf;$e.StrictMode=a0;$e.Suspense=d0;$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_0;$e.act=lg;$e.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=ng({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=bf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)sg.call(e,l)&&!ag.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:co,type:t.type,key:r,ref:s,props:i,_owner:a}};$e.createContext=function(t){return t={$$typeof:c0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:l0,_context:t},t.Consumer=t};$e.createElement=og;$e.createFactory=function(t){var e=og.bind(null,t);return e.type=t,e};$e.createRef=function(){return{current:null}};$e.forwardRef=function(t){return{$$typeof:u0,render:t}};$e.isValidElement=Pf;$e.lazy=function(t){return{$$typeof:h0,_payload:{_status:-1,_result:t},_init:v0}};$e.memo=function(t,e){return{$$typeof:f0,type:t,compare:e===void 0?null:e}};$e.startTransition=function(t){var e=fl.transition;fl.transition={};try{t()}finally{fl.transition=e}};$e.unstable_act=lg;$e.useCallback=function(t,e){return nn.current.useCallback(t,e)};$e.useContext=function(t){return nn.current.useContext(t)};$e.useDebugValue=function(){};$e.useDeferredValue=function(t){return nn.current.useDeferredValue(t)};$e.useEffect=function(t,e){return nn.current.useEffect(t,e)};$e.useId=function(){return nn.current.useId()};$e.useImperativeHandle=function(t,e,n){return nn.current.useImperativeHandle(t,e,n)};$e.useInsertionEffect=function(t,e){return nn.current.useInsertionEffect(t,e)};$e.useLayoutEffect=function(t,e){return nn.current.useLayoutEffect(t,e)};$e.useMemo=function(t,e){return nn.current.useMemo(t,e)};$e.useReducer=function(t,e,n){return nn.current.useReducer(t,e,n)};$e.useRef=function(t){return nn.current.useRef(t)};$e.useState=function(t){return nn.current.useState(t)};$e.useSyncExternalStore=function(t,e,n){return nn.current.useSyncExternalStore(t,e,n)};$e.useTransition=function(){return nn.current.useTransition()};$e.version="18.3.1";eg.exports=$e;var Dt=eg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x0=Dt,y0=Symbol.for("react.element"),S0=Symbol.for("react.fragment"),M0=Object.prototype.hasOwnProperty,E0=x0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,T0={key:!0,ref:!0,__self:!0,__source:!0};function cg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)M0.call(e,i)&&!T0.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:y0,type:t,key:s,ref:a,props:r,_owner:E0.current}}uc.Fragment=S0;uc.jsx=cg;uc.jsxs=cg;Jm.exports=uc;var M=Jm.exports,ug={exports:{}},wn={},dg={exports:{}},fg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,Q){var se=U.length;U.push(Q);e:for(;0<se;){var ue=se-1>>>1,Ae=U[ue];if(0<r(Ae,Q))U[ue]=Q,U[se]=Ae,se=ue;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var Q=U[0],se=U.pop();if(se!==Q){U[0]=se;e:for(var ue=0,Ae=U.length,Fe=Ae>>>1;ue<Fe;){var Z=2*(ue+1)-1,ce=U[Z],ge=Z+1,ye=U[ge];if(0>r(ce,se))ge<Ae&&0>r(ye,ce)?(U[ue]=ye,U[ge]=se,ue=ge):(U[ue]=ce,U[Z]=se,ue=Z);else if(ge<Ae&&0>r(ye,se))U[ue]=ye,U[ge]=se,ue=ge;else break e}}return Q}function r(U,Q){var se=U.sortIndex-Q.sortIndex;return se!==0?se:U.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],d=1,h=null,f=3,m=!1,v=!1,_=!1,p=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(U){for(var Q=n(c);Q!==null;){if(Q.callback===null)i(c);else if(Q.startTime<=U)i(c),Q.sortIndex=Q.expirationTime,e(l,Q);else break;Q=n(c)}}function T(U){if(_=!1,x(U),!v)if(n(l)!==null)v=!0,H(P);else{var Q=n(c);Q!==null&&re(T,Q.startTime-U)}}function P(U,Q){v=!1,_&&(_=!1,u(N),N=-1),m=!0;var se=f;try{for(x(Q),h=n(l);h!==null&&(!(h.expirationTime>Q)||U&&!A());){var ue=h.callback;if(typeof ue=="function"){h.callback=null,f=h.priorityLevel;var Ae=ue(h.expirationTime<=Q);Q=t.unstable_now(),typeof Ae=="function"?h.callback=Ae:h===n(l)&&i(l),x(Q)}else i(l);h=n(l)}if(h!==null)var Fe=!0;else{var Z=n(c);Z!==null&&re(T,Z.startTime-Q),Fe=!1}return Fe}finally{h=null,f=se,m=!1}}var b=!1,R=null,N=-1,Y=5,S=-1;function A(){return!(t.unstable_now()-S<Y)}function G(){if(R!==null){var U=t.unstable_now();S=U;var Q=!0;try{Q=R(!0,U)}finally{Q?V():(b=!1,R=null)}}else b=!1}var V;if(typeof g=="function")V=function(){g(G)};else if(typeof MessageChannel<"u"){var te=new MessageChannel,ee=te.port2;te.port1.onmessage=G,V=function(){ee.postMessage(null)}}else V=function(){p(G,0)};function H(U){R=U,b||(b=!0,V())}function re(U,Q){N=p(function(){U(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){v||m||(v=!0,H(P))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(f){case 1:case 2:case 3:var Q=3;break;default:Q=f}var se=f;f=Q;try{return U()}finally{f=se}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,Q){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var se=f;f=U;try{return Q()}finally{f=se}},t.unstable_scheduleCallback=function(U,Q,se){var ue=t.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?ue+se:ue):se=ue,U){case 1:var Ae=-1;break;case 2:Ae=250;break;case 5:Ae=1073741823;break;case 4:Ae=1e4;break;default:Ae=5e3}return Ae=se+Ae,U={id:d++,callback:Q,priorityLevel:U,startTime:se,expirationTime:Ae,sortIndex:-1},se>ue?(U.sortIndex=se,e(c,U),n(l)===null&&U===n(c)&&(_?(u(N),N=-1):_=!0,re(T,se-ue))):(U.sortIndex=Ae,e(l,U),v||m||(v=!0,H(P))),U},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(U){var Q=f;return function(){var se=f;f=Q;try{return U.apply(this,arguments)}finally{f=se}}}})(fg);dg.exports=fg;var w0=dg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A0=Dt,Tn=w0;function he(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var hg=new Set,ja={};function Yr(t,e){Hs(t,e),Hs(t+"Capture",e)}function Hs(t,e){for(ja[t]=e,t=0;t<e.length;t++)hg.add(e[t])}var Li=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=Object.prototype.hasOwnProperty,C0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Bh={},zh={};function R0(t){return zu.call(zh,t)?!0:zu.call(Bh,t)?!1:C0.test(t)?zh[t]=!0:(Bh[t]=!0,!1)}function b0(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function P0(t,e,n,i){if(e===null||typeof e>"u"||b0(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function rn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var zt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){zt[t]=new rn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];zt[e]=new rn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){zt[t]=new rn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){zt[t]=new rn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){zt[t]=new rn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){zt[t]=new rn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){zt[t]=new rn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){zt[t]=new rn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){zt[t]=new rn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Lf=/[\-:]([a-z])/g;function Nf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Lf,Nf);zt[e]=new rn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Lf,Nf);zt[e]=new rn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Lf,Nf);zt[e]=new rn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){zt[t]=new rn(t,1,!1,t.toLowerCase(),null,!1,!1)});zt.xlinkHref=new rn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){zt[t]=new rn(t,1,!1,t.toLowerCase(),null,!0,!0)});function If(t,e,n,i){var r=zt.hasOwnProperty(e)?zt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(P0(e,n,r,i)&&(n=null),i||r===null?R0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Fi=A0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,To=Symbol.for("react.element"),_s=Symbol.for("react.portal"),xs=Symbol.for("react.fragment"),Df=Symbol.for("react.strict_mode"),Hu=Symbol.for("react.profiler"),pg=Symbol.for("react.provider"),mg=Symbol.for("react.context"),Uf=Symbol.for("react.forward_ref"),Vu=Symbol.for("react.suspense"),Gu=Symbol.for("react.suspense_list"),Ff=Symbol.for("react.memo"),Ki=Symbol.for("react.lazy"),gg=Symbol.for("react.offscreen"),Hh=Symbol.iterator;function ha(t){return t===null||typeof t!="object"?null:(t=Hh&&t[Hh]||t["@@iterator"],typeof t=="function"?t:null)}var _t=Object.assign,Uc;function ba(t){if(Uc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Uc=e&&e[1]||""}return`
`+Uc+t}var Fc=!1;function Oc(t,e){if(!t||Fc)return"";Fc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Fc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ba(t):""}function L0(t){switch(t.tag){case 5:return ba(t.type);case 16:return ba("Lazy");case 13:return ba("Suspense");case 19:return ba("SuspenseList");case 0:case 2:case 15:return t=Oc(t.type,!1),t;case 11:return t=Oc(t.type.render,!1),t;case 1:return t=Oc(t.type,!0),t;default:return""}}function Wu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case xs:return"Fragment";case _s:return"Portal";case Hu:return"Profiler";case Df:return"StrictMode";case Vu:return"Suspense";case Gu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case mg:return(t.displayName||"Context")+".Consumer";case pg:return(t._context.displayName||"Context")+".Provider";case Uf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ff:return e=t.displayName||null,e!==null?e:Wu(t.type)||"Memo";case Ki:e=t._payload,t=t._init;try{return Wu(t(e))}catch{}}return null}function N0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Wu(e);case 8:return e===Df?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function fr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function vg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function I0(t){var e=vg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function wo(t){t._valueTracker||(t._valueTracker=I0(t))}function _g(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=vg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ju(t,e){var n=e.checked;return _t({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Vh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=fr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function xg(t,e){e=e.checked,e!=null&&If(t,"checked",e,!1)}function Xu(t,e){xg(t,e);var n=fr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?$u(t,e.type,n):e.hasOwnProperty("defaultValue")&&$u(t,e.type,fr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function $u(t,e,n){(e!=="number"||Nl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Pa=Array.isArray;function Ls(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+fr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Yu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(he(91));return _t({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Wh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(he(92));if(Pa(n)){if(1<n.length)throw Error(he(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:fr(n)}}function yg(t,e){var n=fr(e.value),i=fr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function jh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Sg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ku(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Sg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ao,Mg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ao=Ao||document.createElement("div"),Ao.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ao.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Xa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Fa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},D0=["Webkit","ms","Moz","O"];Object.keys(Fa).forEach(function(t){D0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Fa[e]=Fa[t]})});function Eg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Fa.hasOwnProperty(t)&&Fa[t]?(""+e).trim():e+"px"}function Tg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Eg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var U0=_t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qu(t,e){if(e){if(U0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(he(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(he(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(he(61))}if(e.style!=null&&typeof e.style!="object")throw Error(he(62))}}function Zu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qu=null;function Of(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ju=null,Ns=null,Is=null;function Xh(t){if(t=ho(t)){if(typeof Ju!="function")throw Error(he(280));var e=t.stateNode;e&&(e=mc(e),Ju(t.stateNode,t.type,e))}}function wg(t){Ns?Is?Is.push(t):Is=[t]:Ns=t}function Ag(){if(Ns){var t=Ns,e=Is;if(Is=Ns=null,Xh(t),e)for(t=0;t<e.length;t++)Xh(e[t])}}function Cg(t,e){return t(e)}function Rg(){}var kc=!1;function bg(t,e,n){if(kc)return t(e,n);kc=!0;try{return Cg(t,e,n)}finally{kc=!1,(Ns!==null||Is!==null)&&(Rg(),Ag())}}function $a(t,e){var n=t.stateNode;if(n===null)return null;var i=mc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(he(231,e,typeof n));return n}var ed=!1;if(Li)try{var pa={};Object.defineProperty(pa,"passive",{get:function(){ed=!0}}),window.addEventListener("test",pa,pa),window.removeEventListener("test",pa,pa)}catch{ed=!1}function F0(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Oa=!1,Il=null,Dl=!1,td=null,O0={onError:function(t){Oa=!0,Il=t}};function k0(t,e,n,i,r,s,a,o,l){Oa=!1,Il=null,F0.apply(O0,arguments)}function B0(t,e,n,i,r,s,a,o,l){if(k0.apply(this,arguments),Oa){if(Oa){var c=Il;Oa=!1,Il=null}else throw Error(he(198));Dl||(Dl=!0,td=c)}}function Kr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Pg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function $h(t){if(Kr(t)!==t)throw Error(he(188))}function z0(t){var e=t.alternate;if(!e){if(e=Kr(t),e===null)throw Error(he(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return $h(r),t;if(s===i)return $h(r),e;s=s.sibling}throw Error(he(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(he(189))}}if(n.alternate!==i)throw Error(he(190))}if(n.tag!==3)throw Error(he(188));return n.stateNode.current===n?t:e}function Lg(t){return t=z0(t),t!==null?Ng(t):null}function Ng(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Ng(t);if(e!==null)return e;t=t.sibling}return null}var Ig=Tn.unstable_scheduleCallback,Yh=Tn.unstable_cancelCallback,H0=Tn.unstable_shouldYield,V0=Tn.unstable_requestPaint,Mt=Tn.unstable_now,G0=Tn.unstable_getCurrentPriorityLevel,kf=Tn.unstable_ImmediatePriority,Dg=Tn.unstable_UserBlockingPriority,Ul=Tn.unstable_NormalPriority,W0=Tn.unstable_LowPriority,Ug=Tn.unstable_IdlePriority,dc=null,di=null;function j0(t){if(di&&typeof di.onCommitFiberRoot=="function")try{di.onCommitFiberRoot(dc,t,void 0,(t.current.flags&128)===128)}catch{}}var Zn=Math.clz32?Math.clz32:Y0,X0=Math.log,$0=Math.LN2;function Y0(t){return t>>>=0,t===0?32:31-(X0(t)/$0|0)|0}var Co=64,Ro=4194304;function La(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Fl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=La(o):(s&=a,s!==0&&(i=La(s)))}else a=n&~r,a!==0?i=La(a):s!==0&&(i=La(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Zn(e),r=1<<n,i|=t[n],e&=~r;return i}function K0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function q0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Zn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=K0(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function nd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Fg(){var t=Co;return Co<<=1,!(Co&4194240)&&(Co=64),t}function Bc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function uo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Zn(e),t[e]=n}function Z0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Zn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Bf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Zn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function Og(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var kg,zf,Bg,zg,Hg,id=!1,bo=[],nr=null,ir=null,rr=null,Ya=new Map,Ka=new Map,Zi=[],Q0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Kh(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":ir=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":Ya.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ka.delete(e.pointerId)}}function ma(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ho(e),e!==null&&zf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function J0(t,e,n,i,r){switch(e){case"focusin":return nr=ma(nr,t,e,n,i,r),!0;case"dragenter":return ir=ma(ir,t,e,n,i,r),!0;case"mouseover":return rr=ma(rr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ya.set(s,ma(Ya.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ka.set(s,ma(Ka.get(s)||null,t,e,n,i,r)),!0}return!1}function Vg(t){var e=Dr(t.target);if(e!==null){var n=Kr(e);if(n!==null){if(e=n.tag,e===13){if(e=Pg(n),e!==null){t.blockedOn=e,Hg(t.priority,function(){Bg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=rd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Qu=i,n.target.dispatchEvent(i),Qu=null}else return e=ho(n),e!==null&&zf(e),t.blockedOn=n,!1;e.shift()}return!0}function qh(t,e,n){hl(t)&&n.delete(e)}function ex(){id=!1,nr!==null&&hl(nr)&&(nr=null),ir!==null&&hl(ir)&&(ir=null),rr!==null&&hl(rr)&&(rr=null),Ya.forEach(qh),Ka.forEach(qh)}function ga(t,e){t.blockedOn===e&&(t.blockedOn=null,id||(id=!0,Tn.unstable_scheduleCallback(Tn.unstable_NormalPriority,ex)))}function qa(t){function e(r){return ga(r,t)}if(0<bo.length){ga(bo[0],t);for(var n=1;n<bo.length;n++){var i=bo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(nr!==null&&ga(nr,t),ir!==null&&ga(ir,t),rr!==null&&ga(rr,t),Ya.forEach(e),Ka.forEach(e),n=0;n<Zi.length;n++)i=Zi[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Zi.length&&(n=Zi[0],n.blockedOn===null);)Vg(n),n.blockedOn===null&&Zi.shift()}var Ds=Fi.ReactCurrentBatchConfig,Ol=!0;function tx(t,e,n,i){var r=it,s=Ds.transition;Ds.transition=null;try{it=1,Hf(t,e,n,i)}finally{it=r,Ds.transition=s}}function nx(t,e,n,i){var r=it,s=Ds.transition;Ds.transition=null;try{it=4,Hf(t,e,n,i)}finally{it=r,Ds.transition=s}}function Hf(t,e,n,i){if(Ol){var r=rd(t,e,n,i);if(r===null)Kc(t,e,i,kl,n),Kh(t,i);else if(J0(r,t,e,n,i))i.stopPropagation();else if(Kh(t,i),e&4&&-1<Q0.indexOf(t)){for(;r!==null;){var s=ho(r);if(s!==null&&kg(s),s=rd(t,e,n,i),s===null&&Kc(t,e,i,kl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Kc(t,e,i,null,n)}}var kl=null;function rd(t,e,n,i){if(kl=null,t=Of(i),t=Dr(t),t!==null)if(e=Kr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Pg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return kl=t,null}function Gg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(G0()){case kf:return 1;case Dg:return 4;case Ul:case W0:return 16;case Ug:return 536870912;default:return 16}default:return 16}}var er=null,Vf=null,pl=null;function Wg(){if(pl)return pl;var t,e=Vf,n=e.length,i,r="value"in er?er.value:er.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return pl=r.slice(t,1<i?1-i:void 0)}function ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Po(){return!0}function Zh(){return!1}function An(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Po:Zh,this.isPropagationStopped=Zh,this}return _t(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Po)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Po)},persist:function(){},isPersistent:Po}),e}var ra={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gf=An(ra),fo=_t({},ra,{view:0,detail:0}),ix=An(fo),zc,Hc,va,fc=_t({},fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==va&&(va&&t.type==="mousemove"?(zc=t.screenX-va.screenX,Hc=t.screenY-va.screenY):Hc=zc=0,va=t),zc)},movementY:function(t){return"movementY"in t?t.movementY:Hc}}),Qh=An(fc),rx=_t({},fc,{dataTransfer:0}),sx=An(rx),ax=_t({},fo,{relatedTarget:0}),Vc=An(ax),ox=_t({},ra,{animationName:0,elapsedTime:0,pseudoElement:0}),lx=An(ox),cx=_t({},ra,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ux=An(cx),dx=_t({},ra,{data:0}),Jh=An(dx),fx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},px={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=px[t])?!!e[t]:!1}function Wf(){return mx}var gx=_t({},fo,{key:function(t){if(t.key){var e=fx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?hx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wf,charCode:function(t){return t.type==="keypress"?ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),vx=An(gx),_x=_t({},fc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ep=An(_x),xx=_t({},fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wf}),yx=An(xx),Sx=_t({},ra,{propertyName:0,elapsedTime:0,pseudoElement:0}),Mx=An(Sx),Ex=_t({},fc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Tx=An(Ex),wx=[9,13,27,32],jf=Li&&"CompositionEvent"in window,ka=null;Li&&"documentMode"in document&&(ka=document.documentMode);var Ax=Li&&"TextEvent"in window&&!ka,jg=Li&&(!jf||ka&&8<ka&&11>=ka),tp=" ",np=!1;function Xg(t,e){switch(t){case"keyup":return wx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $g(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ys=!1;function Cx(t,e){switch(t){case"compositionend":return $g(e);case"keypress":return e.which!==32?null:(np=!0,tp);case"textInput":return t=e.data,t===tp&&np?null:t;default:return null}}function Rx(t,e){if(ys)return t==="compositionend"||!jf&&Xg(t,e)?(t=Wg(),pl=Vf=er=null,ys=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return jg&&e.locale!=="ko"?null:e.data;default:return null}}var bx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ip(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!bx[t.type]:e==="textarea"}function Yg(t,e,n,i){wg(i),e=Bl(e,"onChange"),0<e.length&&(n=new Gf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ba=null,Za=null;function Px(t){sv(t,0)}function hc(t){var e=Es(t);if(_g(e))return t}function Lx(t,e){if(t==="change")return e}var Kg=!1;if(Li){var Gc;if(Li){var Wc="oninput"in document;if(!Wc){var rp=document.createElement("div");rp.setAttribute("oninput","return;"),Wc=typeof rp.oninput=="function"}Gc=Wc}else Gc=!1;Kg=Gc&&(!document.documentMode||9<document.documentMode)}function sp(){Ba&&(Ba.detachEvent("onpropertychange",qg),Za=Ba=null)}function qg(t){if(t.propertyName==="value"&&hc(Za)){var e=[];Yg(e,Za,t,Of(t)),bg(Px,e)}}function Nx(t,e,n){t==="focusin"?(sp(),Ba=e,Za=n,Ba.attachEvent("onpropertychange",qg)):t==="focusout"&&sp()}function Ix(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return hc(Za)}function Dx(t,e){if(t==="click")return hc(e)}function Ux(t,e){if(t==="input"||t==="change")return hc(e)}function Fx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ti=typeof Object.is=="function"?Object.is:Fx;function Qa(t,e){if(ti(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!zu.call(e,r)||!ti(t[r],e[r]))return!1}return!0}function ap(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function op(t,e){var n=ap(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ap(n)}}function Zg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Zg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Qg(){for(var t=window,e=Nl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Nl(t.document)}return e}function Xf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Ox(t){var e=Qg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Zg(n.ownerDocument.documentElement,n)){if(i!==null&&Xf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=op(n,s);var a=op(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var kx=Li&&"documentMode"in document&&11>=document.documentMode,Ss=null,sd=null,za=null,ad=!1;function lp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ad||Ss==null||Ss!==Nl(i)||(i=Ss,"selectionStart"in i&&Xf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),za&&Qa(za,i)||(za=i,i=Bl(sd,"onSelect"),0<i.length&&(e=new Gf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ss)))}function Lo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ms={animationend:Lo("Animation","AnimationEnd"),animationiteration:Lo("Animation","AnimationIteration"),animationstart:Lo("Animation","AnimationStart"),transitionend:Lo("Transition","TransitionEnd")},jc={},Jg={};Li&&(Jg=document.createElement("div").style,"AnimationEvent"in window||(delete Ms.animationend.animation,delete Ms.animationiteration.animation,delete Ms.animationstart.animation),"TransitionEvent"in window||delete Ms.transitionend.transition);function pc(t){if(jc[t])return jc[t];if(!Ms[t])return t;var e=Ms[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Jg)return jc[t]=e[n];return t}var ev=pc("animationend"),tv=pc("animationiteration"),nv=pc("animationstart"),iv=pc("transitionend"),rv=new Map,cp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vr(t,e){rv.set(t,e),Yr(e,[t])}for(var Xc=0;Xc<cp.length;Xc++){var $c=cp[Xc],Bx=$c.toLowerCase(),zx=$c[0].toUpperCase()+$c.slice(1);vr(Bx,"on"+zx)}vr(ev,"onAnimationEnd");vr(tv,"onAnimationIteration");vr(nv,"onAnimationStart");vr("dblclick","onDoubleClick");vr("focusin","onFocus");vr("focusout","onBlur");vr(iv,"onTransitionEnd");Hs("onMouseEnter",["mouseout","mouseover"]);Hs("onMouseLeave",["mouseout","mouseover"]);Hs("onPointerEnter",["pointerout","pointerover"]);Hs("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Na="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Na));function up(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,B0(i,e,void 0,t),t.currentTarget=null}function sv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;up(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;up(r,o,c),s=l}}}if(Dl)throw t=td,Dl=!1,td=null,t}function ct(t,e){var n=e[dd];n===void 0&&(n=e[dd]=new Set);var i=t+"__bubble";n.has(i)||(av(e,t,2,!1),n.add(i))}function Yc(t,e,n){var i=0;e&&(i|=4),av(n,t,i,e)}var No="_reactListening"+Math.random().toString(36).slice(2);function Ja(t){if(!t[No]){t[No]=!0,hg.forEach(function(n){n!=="selectionchange"&&(Hx.has(n)||Yc(n,!1,t),Yc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[No]||(e[No]=!0,Yc("selectionchange",!1,e))}}function av(t,e,n,i){switch(Gg(e)){case 1:var r=tx;break;case 4:r=nx;break;default:r=Hf}n=r.bind(null,e,n,t),r=void 0,!ed||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Dr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}bg(function(){var c=s,d=Of(n),h=[];e:{var f=rv.get(t);if(f!==void 0){var m=Gf,v=t;switch(t){case"keypress":if(ml(n)===0)break e;case"keydown":case"keyup":m=vx;break;case"focusin":v="focus",m=Vc;break;case"focusout":v="blur",m=Vc;break;case"beforeblur":case"afterblur":m=Vc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Qh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=sx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=yx;break;case ev:case tv:case nv:m=lx;break;case iv:m=Mx;break;case"scroll":m=ix;break;case"wheel":m=Tx;break;case"copy":case"cut":case"paste":m=ux;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=ep}var _=(e&4)!==0,p=!_&&t==="scroll",u=_?f!==null?f+"Capture":null:f;_=[];for(var g=c,x;g!==null;){x=g;var T=x.stateNode;if(x.tag===5&&T!==null&&(x=T,u!==null&&(T=$a(g,u),T!=null&&_.push(eo(g,T,x)))),p)break;g=g.return}0<_.length&&(f=new m(f,v,null,n,d),h.push({event:f,listeners:_}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",f&&n!==Qu&&(v=n.relatedTarget||n.fromElement)&&(Dr(v)||v[Ni]))break e;if((m||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,m?(v=n.relatedTarget||n.toElement,m=c,v=v?Dr(v):null,v!==null&&(p=Kr(v),v!==p||v.tag!==5&&v.tag!==6)&&(v=null)):(m=null,v=c),m!==v)){if(_=Qh,T="onMouseLeave",u="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(_=ep,T="onPointerLeave",u="onPointerEnter",g="pointer"),p=m==null?f:Es(m),x=v==null?f:Es(v),f=new _(T,g+"leave",m,n,d),f.target=p,f.relatedTarget=x,T=null,Dr(d)===c&&(_=new _(u,g+"enter",v,n,d),_.target=x,_.relatedTarget=p,T=_),p=T,m&&v)t:{for(_=m,u=v,g=0,x=_;x;x=Jr(x))g++;for(x=0,T=u;T;T=Jr(T))x++;for(;0<g-x;)_=Jr(_),g--;for(;0<x-g;)u=Jr(u),x--;for(;g--;){if(_===u||u!==null&&_===u.alternate)break t;_=Jr(_),u=Jr(u)}_=null}else _=null;m!==null&&dp(h,f,m,_,!1),v!==null&&p!==null&&dp(h,p,v,_,!0)}}e:{if(f=c?Es(c):window,m=f.nodeName&&f.nodeName.toLowerCase(),m==="select"||m==="input"&&f.type==="file")var P=Lx;else if(ip(f))if(Kg)P=Ux;else{P=Ix;var b=Nx}else(m=f.nodeName)&&m.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(P=Dx);if(P&&(P=P(t,c))){Yg(h,P,n,d);break e}b&&b(t,f,c),t==="focusout"&&(b=f._wrapperState)&&b.controlled&&f.type==="number"&&$u(f,"number",f.value)}switch(b=c?Es(c):window,t){case"focusin":(ip(b)||b.contentEditable==="true")&&(Ss=b,sd=c,za=null);break;case"focusout":za=sd=Ss=null;break;case"mousedown":ad=!0;break;case"contextmenu":case"mouseup":case"dragend":ad=!1,lp(h,n,d);break;case"selectionchange":if(kx)break;case"keydown":case"keyup":lp(h,n,d)}var R;if(jf)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else ys?Xg(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(jg&&n.locale!=="ko"&&(ys||N!=="onCompositionStart"?N==="onCompositionEnd"&&ys&&(R=Wg()):(er=d,Vf="value"in er?er.value:er.textContent,ys=!0)),b=Bl(c,N),0<b.length&&(N=new Jh(N,t,null,n,d),h.push({event:N,listeners:b}),R?N.data=R:(R=$g(n),R!==null&&(N.data=R)))),(R=Ax?Cx(t,n):Rx(t,n))&&(c=Bl(c,"onBeforeInput"),0<c.length&&(d=new Jh("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:c}),d.data=R))}sv(h,e)})}function eo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Bl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=$a(t,n),s!=null&&i.unshift(eo(t,s,r)),s=$a(t,e),s!=null&&i.push(eo(t,s,r))),t=t.return}return i}function Jr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function dp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=$a(n,s),l!=null&&a.unshift(eo(n,l,o))):r||(l=$a(n,s),l!=null&&a.push(eo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Vx=/\r\n?/g,Gx=/\u0000|\uFFFD/g;function fp(t){return(typeof t=="string"?t:""+t).replace(Vx,`
`).replace(Gx,"")}function Io(t,e,n){if(e=fp(e),fp(t)!==e&&n)throw Error(he(425))}function zl(){}var od=null,ld=null;function cd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ud=typeof setTimeout=="function"?setTimeout:void 0,Wx=typeof clearTimeout=="function"?clearTimeout:void 0,hp=typeof Promise=="function"?Promise:void 0,jx=typeof queueMicrotask=="function"?queueMicrotask:typeof hp<"u"?function(t){return hp.resolve(null).then(t).catch(Xx)}:ud;function Xx(t){setTimeout(function(){throw t})}function qc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),qa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);qa(e)}function sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function pp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var sa=Math.random().toString(36).slice(2),ci="__reactFiber$"+sa,to="__reactProps$"+sa,Ni="__reactContainer$"+sa,dd="__reactEvents$"+sa,$x="__reactListeners$"+sa,Yx="__reactHandles$"+sa;function Dr(t){var e=t[ci];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ni]||n[ci]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=pp(t);t!==null;){if(n=t[ci])return n;t=pp(t)}return e}t=n,n=t.parentNode}return null}function ho(t){return t=t[ci]||t[Ni],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Es(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(he(33))}function mc(t){return t[to]||null}var fd=[],Ts=-1;function _r(t){return{current:t}}function dt(t){0>Ts||(t.current=fd[Ts],fd[Ts]=null,Ts--)}function ot(t,e){Ts++,fd[Ts]=t.current,t.current=e}var hr={},Yt=_r(hr),dn=_r(!1),Hr=hr;function Vs(t,e){var n=t.type.contextTypes;if(!n)return hr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function fn(t){return t=t.childContextTypes,t!=null}function Hl(){dt(dn),dt(Yt)}function mp(t,e,n){if(Yt.current!==hr)throw Error(he(168));ot(Yt,e),ot(dn,n)}function ov(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(he(108,N0(t)||"Unknown",r));return _t({},n,i)}function Vl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||hr,Hr=Yt.current,ot(Yt,t),ot(dn,dn.current),!0}function gp(t,e,n){var i=t.stateNode;if(!i)throw Error(he(169));n?(t=ov(t,e,Hr),i.__reactInternalMemoizedMergedChildContext=t,dt(dn),dt(Yt),ot(Yt,t)):dt(dn),ot(dn,n)}var Ti=null,gc=!1,Zc=!1;function lv(t){Ti===null?Ti=[t]:Ti.push(t)}function Kx(t){gc=!0,lv(t)}function xr(){if(!Zc&&Ti!==null){Zc=!0;var t=0,e=it;try{var n=Ti;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ti=null,gc=!1}catch(r){throw Ti!==null&&(Ti=Ti.slice(t+1)),Ig(kf,xr),r}finally{it=e,Zc=!1}}return null}var ws=[],As=0,Gl=null,Wl=0,bn=[],Pn=0,Vr=null,wi=1,Ai="";function Rr(t,e){ws[As++]=Wl,ws[As++]=Gl,Gl=t,Wl=e}function cv(t,e,n){bn[Pn++]=wi,bn[Pn++]=Ai,bn[Pn++]=Vr,Vr=t;var i=wi;t=Ai;var r=32-Zn(i)-1;i&=~(1<<r),n+=1;var s=32-Zn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,wi=1<<32-Zn(e)+r|n<<r|i,Ai=s+t}else wi=1<<s|n<<r|i,Ai=t}function $f(t){t.return!==null&&(Rr(t,1),cv(t,1,0))}function Yf(t){for(;t===Gl;)Gl=ws[--As],ws[As]=null,Wl=ws[--As],ws[As]=null;for(;t===Vr;)Vr=bn[--Pn],bn[Pn]=null,Ai=bn[--Pn],bn[Pn]=null,wi=bn[--Pn],bn[Pn]=null}var En=null,Sn=null,ht=!1,Xn=null;function uv(t,e){var n=Nn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function vp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,En=t,Sn=sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,En=t,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Vr!==null?{id:wi,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Nn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,En=t,Sn=null,!0):!1;default:return!1}}function hd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function pd(t){if(ht){var e=Sn;if(e){var n=e;if(!vp(t,e)){if(hd(t))throw Error(he(418));e=sr(n.nextSibling);var i=En;e&&vp(t,e)?uv(i,n):(t.flags=t.flags&-4097|2,ht=!1,En=t)}}else{if(hd(t))throw Error(he(418));t.flags=t.flags&-4097|2,ht=!1,En=t}}}function _p(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;En=t}function Do(t){if(t!==En)return!1;if(!ht)return _p(t),ht=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!cd(t.type,t.memoizedProps)),e&&(e=Sn)){if(hd(t))throw dv(),Error(he(418));for(;e;)uv(t,e),e=sr(e.nextSibling)}if(_p(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(he(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Sn=sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Sn=null}}else Sn=En?sr(t.stateNode.nextSibling):null;return!0}function dv(){for(var t=Sn;t;)t=sr(t.nextSibling)}function Gs(){Sn=En=null,ht=!1}function Kf(t){Xn===null?Xn=[t]:Xn.push(t)}var qx=Fi.ReactCurrentBatchConfig;function _a(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(he(309));var i=n.stateNode}if(!i)throw Error(he(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(he(284));if(!n._owner)throw Error(he(290,t))}return t}function Uo(t,e){throw t=Object.prototype.toString.call(e),Error(he(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function xp(t){var e=t._init;return e(t._payload)}function fv(t){function e(u,g){if(t){var x=u.deletions;x===null?(u.deletions=[g],u.flags|=16):x.push(g)}}function n(u,g){if(!t)return null;for(;g!==null;)e(u,g),g=g.sibling;return null}function i(u,g){for(u=new Map;g!==null;)g.key!==null?u.set(g.key,g):u.set(g.index,g),g=g.sibling;return u}function r(u,g){return u=cr(u,g),u.index=0,u.sibling=null,u}function s(u,g,x){return u.index=x,t?(x=u.alternate,x!==null?(x=x.index,x<g?(u.flags|=2,g):x):(u.flags|=2,g)):(u.flags|=1048576,g)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,g,x,T){return g===null||g.tag!==6?(g=ru(x,u.mode,T),g.return=u,g):(g=r(g,x),g.return=u,g)}function l(u,g,x,T){var P=x.type;return P===xs?d(u,g,x.props.children,T,x.key):g!==null&&(g.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Ki&&xp(P)===g.type)?(T=r(g,x.props),T.ref=_a(u,g,x),T.return=u,T):(T=Ml(x.type,x.key,x.props,null,u.mode,T),T.ref=_a(u,g,x),T.return=u,T)}function c(u,g,x,T){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=su(x,u.mode,T),g.return=u,g):(g=r(g,x.children||[]),g.return=u,g)}function d(u,g,x,T,P){return g===null||g.tag!==7?(g=zr(x,u.mode,T,P),g.return=u,g):(g=r(g,x),g.return=u,g)}function h(u,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=ru(""+g,u.mode,x),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case To:return x=Ml(g.type,g.key,g.props,null,u.mode,x),x.ref=_a(u,null,g),x.return=u,x;case _s:return g=su(g,u.mode,x),g.return=u,g;case Ki:var T=g._init;return h(u,T(g._payload),x)}if(Pa(g)||ha(g))return g=zr(g,u.mode,x,null),g.return=u,g;Uo(u,g)}return null}function f(u,g,x,T){var P=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return P!==null?null:o(u,g,""+x,T);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case To:return x.key===P?l(u,g,x,T):null;case _s:return x.key===P?c(u,g,x,T):null;case Ki:return P=x._init,f(u,g,P(x._payload),T)}if(Pa(x)||ha(x))return P!==null?null:d(u,g,x,T,null);Uo(u,x)}return null}function m(u,g,x,T,P){if(typeof T=="string"&&T!==""||typeof T=="number")return u=u.get(x)||null,o(g,u,""+T,P);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case To:return u=u.get(T.key===null?x:T.key)||null,l(g,u,T,P);case _s:return u=u.get(T.key===null?x:T.key)||null,c(g,u,T,P);case Ki:var b=T._init;return m(u,g,x,b(T._payload),P)}if(Pa(T)||ha(T))return u=u.get(x)||null,d(g,u,T,P,null);Uo(g,T)}return null}function v(u,g,x,T){for(var P=null,b=null,R=g,N=g=0,Y=null;R!==null&&N<x.length;N++){R.index>N?(Y=R,R=null):Y=R.sibling;var S=f(u,R,x[N],T);if(S===null){R===null&&(R=Y);break}t&&R&&S.alternate===null&&e(u,R),g=s(S,g,N),b===null?P=S:b.sibling=S,b=S,R=Y}if(N===x.length)return n(u,R),ht&&Rr(u,N),P;if(R===null){for(;N<x.length;N++)R=h(u,x[N],T),R!==null&&(g=s(R,g,N),b===null?P=R:b.sibling=R,b=R);return ht&&Rr(u,N),P}for(R=i(u,R);N<x.length;N++)Y=m(R,u,N,x[N],T),Y!==null&&(t&&Y.alternate!==null&&R.delete(Y.key===null?N:Y.key),g=s(Y,g,N),b===null?P=Y:b.sibling=Y,b=Y);return t&&R.forEach(function(A){return e(u,A)}),ht&&Rr(u,N),P}function _(u,g,x,T){var P=ha(x);if(typeof P!="function")throw Error(he(150));if(x=P.call(x),x==null)throw Error(he(151));for(var b=P=null,R=g,N=g=0,Y=null,S=x.next();R!==null&&!S.done;N++,S=x.next()){R.index>N?(Y=R,R=null):Y=R.sibling;var A=f(u,R,S.value,T);if(A===null){R===null&&(R=Y);break}t&&R&&A.alternate===null&&e(u,R),g=s(A,g,N),b===null?P=A:b.sibling=A,b=A,R=Y}if(S.done)return n(u,R),ht&&Rr(u,N),P;if(R===null){for(;!S.done;N++,S=x.next())S=h(u,S.value,T),S!==null&&(g=s(S,g,N),b===null?P=S:b.sibling=S,b=S);return ht&&Rr(u,N),P}for(R=i(u,R);!S.done;N++,S=x.next())S=m(R,u,N,S.value,T),S!==null&&(t&&S.alternate!==null&&R.delete(S.key===null?N:S.key),g=s(S,g,N),b===null?P=S:b.sibling=S,b=S);return t&&R.forEach(function(G){return e(u,G)}),ht&&Rr(u,N),P}function p(u,g,x,T){if(typeof x=="object"&&x!==null&&x.type===xs&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case To:e:{for(var P=x.key,b=g;b!==null;){if(b.key===P){if(P=x.type,P===xs){if(b.tag===7){n(u,b.sibling),g=r(b,x.props.children),g.return=u,u=g;break e}}else if(b.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Ki&&xp(P)===b.type){n(u,b.sibling),g=r(b,x.props),g.ref=_a(u,b,x),g.return=u,u=g;break e}n(u,b);break}else e(u,b);b=b.sibling}x.type===xs?(g=zr(x.props.children,u.mode,T,x.key),g.return=u,u=g):(T=Ml(x.type,x.key,x.props,null,u.mode,T),T.ref=_a(u,g,x),T.return=u,u=T)}return a(u);case _s:e:{for(b=x.key;g!==null;){if(g.key===b)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(u,g.sibling),g=r(g,x.children||[]),g.return=u,u=g;break e}else{n(u,g);break}else e(u,g);g=g.sibling}g=su(x,u.mode,T),g.return=u,u=g}return a(u);case Ki:return b=x._init,p(u,g,b(x._payload),T)}if(Pa(x))return v(u,g,x,T);if(ha(x))return _(u,g,x,T);Uo(u,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(n(u,g.sibling),g=r(g,x),g.return=u,u=g):(n(u,g),g=ru(x,u.mode,T),g.return=u,u=g),a(u)):n(u,g)}return p}var Ws=fv(!0),hv=fv(!1),jl=_r(null),Xl=null,Cs=null,qf=null;function Zf(){qf=Cs=Xl=null}function Qf(t){var e=jl.current;dt(jl),t._currentValue=e}function md(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Us(t,e){Xl=t,qf=Cs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(cn=!0),t.firstContext=null)}function Un(t){var e=t._currentValue;if(qf!==t)if(t={context:t,memoizedValue:e,next:null},Cs===null){if(Xl===null)throw Error(he(308));Cs=t,Xl.dependencies={lanes:0,firstContext:t}}else Cs=Cs.next=t;return e}var Ur=null;function Jf(t){Ur===null?Ur=[t]:Ur.push(t)}function pv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Jf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ii(t,i)}function Ii(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var qi=!1;function eh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function mv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Pi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ar(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ii(t,n)}return r=i.interleaved,r===null?(e.next=e,Jf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ii(t,n)}function gl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Bf(t,n)}}function yp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function $l(t,e,n,i){var r=t.updateQueue;qi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==a&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,d=c=l=null,o=s;do{var f=o.lane,m=o.eventTime;if((i&f)===f){d!==null&&(d=d.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,_=o;switch(f=e,m=n,_.tag){case 1:if(v=_.payload,typeof v=="function"){h=v.call(m,h,f);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=_.payload,f=typeof v=="function"?v.call(m,h,f):v,f==null)break e;h=_t({},h,f);break e;case 2:qi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[o]:f.push(o))}else m={eventTime:m,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=m,l=h):d=d.next=m,a|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;f=o,o=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(d===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Wr|=a,t.lanes=a,t.memoizedState=h}}function Sp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(he(191,r));r.call(i)}}}var po={},fi=_r(po),no=_r(po),io=_r(po);function Fr(t){if(t===po)throw Error(he(174));return t}function th(t,e){switch(ot(io,e),ot(no,t),ot(fi,po),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ku(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ku(e,t)}dt(fi),ot(fi,e)}function js(){dt(fi),dt(no),dt(io)}function gv(t){Fr(io.current);var e=Fr(fi.current),n=Ku(e,t.type);e!==n&&(ot(no,t),ot(fi,n))}function nh(t){no.current===t&&(dt(fi),dt(no))}var mt=_r(0);function Yl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Qc=[];function ih(){for(var t=0;t<Qc.length;t++)Qc[t]._workInProgressVersionPrimary=null;Qc.length=0}var vl=Fi.ReactCurrentDispatcher,Jc=Fi.ReactCurrentBatchConfig,Gr=0,gt=null,Rt=null,Ut=null,Kl=!1,Ha=!1,ro=0,Zx=0;function Ht(){throw Error(he(321))}function rh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ti(t[n],e[n]))return!1;return!0}function sh(t,e,n,i,r,s){if(Gr=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,vl.current=t===null||t.memoizedState===null?ty:ny,t=n(i,r),Ha){s=0;do{if(Ha=!1,ro=0,25<=s)throw Error(he(301));s+=1,Ut=Rt=null,e.updateQueue=null,vl.current=iy,t=n(i,r)}while(Ha)}if(vl.current=ql,e=Rt!==null&&Rt.next!==null,Gr=0,Ut=Rt=gt=null,Kl=!1,e)throw Error(he(300));return t}function ah(){var t=ro!==0;return ro=0,t}function ai(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ut===null?gt.memoizedState=Ut=t:Ut=Ut.next=t,Ut}function Fn(){if(Rt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Rt.next;var e=Ut===null?gt.memoizedState:Ut.next;if(e!==null)Ut=e,Rt=t;else{if(t===null)throw Error(he(310));Rt=t,t={memoizedState:Rt.memoizedState,baseState:Rt.baseState,baseQueue:Rt.baseQueue,queue:Rt.queue,next:null},Ut===null?gt.memoizedState=Ut=t:Ut=Ut.next=t}return Ut}function so(t,e){return typeof e=="function"?e(t):e}function eu(t){var e=Fn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=Rt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var d=c.lane;if((Gr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,gt.lanes|=d,Wr|=d}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,ti(i,e.memoizedState)||(cn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,gt.lanes|=s,Wr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function tu(t){var e=Fn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);ti(s,e.memoizedState)||(cn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function vv(){}function _v(t,e){var n=gt,i=Fn(),r=e(),s=!ti(i.memoizedState,r);if(s&&(i.memoizedState=r,cn=!0),i=i.queue,oh(Sv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ut!==null&&Ut.memoizedState.tag&1){if(n.flags|=2048,ao(9,yv.bind(null,n,i,r,e),void 0,null),Ft===null)throw Error(he(349));Gr&30||xv(n,e,r)}return r}function xv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yv(t,e,n,i){e.value=n,e.getSnapshot=i,Mv(e)&&Ev(t)}function Sv(t,e,n){return n(function(){Mv(e)&&Ev(t)})}function Mv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ti(t,n)}catch{return!0}}function Ev(t){var e=Ii(t,1);e!==null&&Qn(e,t,1,-1)}function Mp(t){var e=ai();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:so,lastRenderedState:t},e.queue=t,t=t.dispatch=ey.bind(null,gt,t),[e.memoizedState,t]}function ao(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Tv(){return Fn().memoizedState}function _l(t,e,n,i){var r=ai();gt.flags|=t,r.memoizedState=ao(1|e,n,void 0,i===void 0?null:i)}function vc(t,e,n,i){var r=Fn();i=i===void 0?null:i;var s=void 0;if(Rt!==null){var a=Rt.memoizedState;if(s=a.destroy,i!==null&&rh(i,a.deps)){r.memoizedState=ao(e,n,s,i);return}}gt.flags|=t,r.memoizedState=ao(1|e,n,s,i)}function Ep(t,e){return _l(8390656,8,t,e)}function oh(t,e){return vc(2048,8,t,e)}function wv(t,e){return vc(4,2,t,e)}function Av(t,e){return vc(4,4,t,e)}function Cv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Rv(t,e,n){return n=n!=null?n.concat([t]):null,vc(4,4,Cv.bind(null,e,t),n)}function lh(){}function bv(t,e){var n=Fn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&rh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Pv(t,e){var n=Fn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&rh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Lv(t,e,n){return Gr&21?(ti(n,e)||(n=Fg(),gt.lanes|=n,Wr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,cn=!0),t.memoizedState=n)}function Qx(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=Jc.transition;Jc.transition={};try{t(!1),e()}finally{it=n,Jc.transition=i}}function Nv(){return Fn().memoizedState}function Jx(t,e,n){var i=lr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Iv(t))Dv(e,n);else if(n=pv(t,e,n,i),n!==null){var r=en();Qn(n,t,i,r),Uv(n,e,i)}}function ey(t,e,n){var i=lr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Iv(t))Dv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,ti(o,a)){var l=e.interleaved;l===null?(r.next=r,Jf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=pv(t,e,r,i),n!==null&&(r=en(),Qn(n,t,i,r),Uv(n,e,i))}}function Iv(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function Dv(t,e){Ha=Kl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Uv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Bf(t,n)}}var ql={readContext:Un,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useInsertionEffect:Ht,useLayoutEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useMutableSource:Ht,useSyncExternalStore:Ht,useId:Ht,unstable_isNewReconciler:!1},ty={readContext:Un,useCallback:function(t,e){return ai().memoizedState=[t,e===void 0?null:e],t},useContext:Un,useEffect:Ep,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,_l(4194308,4,Cv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return _l(4194308,4,t,e)},useInsertionEffect:function(t,e){return _l(4,2,t,e)},useMemo:function(t,e){var n=ai();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ai();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Jx.bind(null,gt,t),[i.memoizedState,t]},useRef:function(t){var e=ai();return t={current:t},e.memoizedState=t},useState:Mp,useDebugValue:lh,useDeferredValue:function(t){return ai().memoizedState=t},useTransition:function(){var t=Mp(!1),e=t[0];return t=Qx.bind(null,t[1]),ai().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=gt,r=ai();if(ht){if(n===void 0)throw Error(he(407));n=n()}else{if(n=e(),Ft===null)throw Error(he(349));Gr&30||xv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Ep(Sv.bind(null,i,s,t),[t]),i.flags|=2048,ao(9,yv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ai(),e=Ft.identifierPrefix;if(ht){var n=Ai,i=wi;n=(i&~(1<<32-Zn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ro++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Zx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},ny={readContext:Un,useCallback:bv,useContext:Un,useEffect:oh,useImperativeHandle:Rv,useInsertionEffect:wv,useLayoutEffect:Av,useMemo:Pv,useReducer:eu,useRef:Tv,useState:function(){return eu(so)},useDebugValue:lh,useDeferredValue:function(t){var e=Fn();return Lv(e,Rt.memoizedState,t)},useTransition:function(){var t=eu(so)[0],e=Fn().memoizedState;return[t,e]},useMutableSource:vv,useSyncExternalStore:_v,useId:Nv,unstable_isNewReconciler:!1},iy={readContext:Un,useCallback:bv,useContext:Un,useEffect:oh,useImperativeHandle:Rv,useInsertionEffect:wv,useLayoutEffect:Av,useMemo:Pv,useReducer:tu,useRef:Tv,useState:function(){return tu(so)},useDebugValue:lh,useDeferredValue:function(t){var e=Fn();return Rt===null?e.memoizedState=t:Lv(e,Rt.memoizedState,t)},useTransition:function(){var t=tu(so)[0],e=Fn().memoizedState;return[t,e]},useMutableSource:vv,useSyncExternalStore:_v,useId:Nv,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=_t({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function gd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:_t({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var _c={isMounted:function(t){return(t=t._reactInternals)?Kr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=en(),r=lr(t),s=Pi(i,r);s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&(Qn(e,t,r,i),gl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=en(),r=lr(t),s=Pi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=ar(t,s,r),e!==null&&(Qn(e,t,r,i),gl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=en(),i=lr(t),r=Pi(n,i);r.tag=2,e!=null&&(r.callback=e),e=ar(t,r,i),e!==null&&(Qn(e,t,i,n),gl(e,t,i))}};function Tp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Qa(n,i)||!Qa(r,s):!0}function Fv(t,e,n){var i=!1,r=hr,s=e.contextType;return typeof s=="object"&&s!==null?s=Un(s):(r=fn(e)?Hr:Yt.current,i=e.contextTypes,s=(i=i!=null)?Vs(t,r):hr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=_c,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function wp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&_c.enqueueReplaceState(e,e.state,null)}function vd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},eh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Un(s):(s=fn(e)?Hr:Yt.current,r.context=Vs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(gd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&_c.enqueueReplaceState(r,r.state,null),$l(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Xs(t,e){try{var n="",i=e;do n+=L0(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function nu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function _d(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var ry=typeof WeakMap=="function"?WeakMap:Map;function Ov(t,e,n){n=Pi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ql||(Ql=!0,Rd=i),_d(t,e)},n}function kv(t,e,n){n=Pi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){_d(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){_d(t,e),typeof i!="function"&&(or===null?or=new Set([this]):or.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Ap(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new ry;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=_y.bind(null,t,e,n),e.then(t,t))}function Cp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Rp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Pi(-1,1),e.tag=2,ar(n,e,1))),n.lanes|=1),t)}var sy=Fi.ReactCurrentOwner,cn=!1;function Qt(t,e,n,i){e.child=t===null?hv(e,null,n,i):Ws(e,t.child,n,i)}function bp(t,e,n,i,r){n=n.render;var s=e.ref;return Us(e,r),i=sh(t,e,n,i,s,r),n=ah(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(ht&&n&&$f(e),e.flags|=1,Qt(t,e,i,r),e.child)}function Pp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!gh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Bv(t,e,s,i,r)):(t=Ml(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qa,n(a,i)&&t.ref===e.ref)return Di(t,e,r)}return e.flags|=1,t=cr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Bv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Qa(s,i)&&t.ref===e.ref)if(cn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(cn=!0);else return e.lanes=t.lanes,Di(t,e,r)}return xd(t,e,n,i,r)}function zv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ot(bs,yn),yn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ot(bs,yn),yn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ot(bs,yn),yn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ot(bs,yn),yn|=i;return Qt(t,e,r,n),e.child}function Hv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function xd(t,e,n,i,r){var s=fn(n)?Hr:Yt.current;return s=Vs(e,s),Us(e,r),n=sh(t,e,n,i,s,r),i=ah(),t!==null&&!cn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Di(t,e,r)):(ht&&i&&$f(e),e.flags|=1,Qt(t,e,n,r),e.child)}function Lp(t,e,n,i,r){if(fn(n)){var s=!0;Vl(e)}else s=!1;if(Us(e,r),e.stateNode===null)xl(t,e),Fv(e,n,i),vd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Un(c):(c=fn(n)?Hr:Yt.current,c=Vs(e,c));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&wp(e,a,i,c),qi=!1;var f=e.memoizedState;a.state=f,$l(e,i,a,r),l=e.memoizedState,o!==i||f!==l||dn.current||qi?(typeof d=="function"&&(gd(e,n,d,i),l=e.memoizedState),(o=qi||Tp(e,n,o,i,f,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,mv(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Wn(e.type,o),a.props=c,h=e.pendingProps,f=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Un(l):(l=fn(n)?Hr:Yt.current,l=Vs(e,l));var m=n.getDerivedStateFromProps;(d=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||f!==l)&&wp(e,a,i,l),qi=!1,f=e.memoizedState,a.state=f,$l(e,i,a,r);var v=e.memoizedState;o!==h||f!==v||dn.current||qi?(typeof m=="function"&&(gd(e,n,m,i),v=e.memoizedState),(c=qi||Tp(e,n,c,i,f,v,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return yd(t,e,n,i,s,r)}function yd(t,e,n,i,r,s){Hv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&gp(e,n,!1),Di(t,e,s);i=e.stateNode,sy.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ws(e,t.child,null,s),e.child=Ws(e,null,o,s)):Qt(t,e,o,s),e.memoizedState=i.state,r&&gp(e,n,!0),e.child}function Vv(t){var e=t.stateNode;e.pendingContext?mp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&mp(t,e.context,!1),th(t,e.containerInfo)}function Np(t,e,n,i,r){return Gs(),Kf(r),e.flags|=256,Qt(t,e,n,i),e.child}var Sd={dehydrated:null,treeContext:null,retryLane:0};function Md(t){return{baseLanes:t,cachePool:null,transitions:null}}function Gv(t,e,n){var i=e.pendingProps,r=mt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ot(mt,r&1),t===null)return pd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Sc(a,i,0,null),t=zr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Md(n),e.memoizedState=Sd,t):ch(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return ay(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=cr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=cr(o,s):(s=zr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Md(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Sd,i}return s=t.child,t=s.sibling,i=cr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function ch(t,e){return e=Sc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Fo(t,e,n,i){return i!==null&&Kf(i),Ws(e,t.child,null,n),t=ch(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ay(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=nu(Error(he(422))),Fo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Sc({mode:"visible",children:i.children},r,0,null),s=zr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ws(e,t.child,null,a),e.child.memoizedState=Md(a),e.memoizedState=Sd,s);if(!(e.mode&1))return Fo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(he(419)),i=nu(s,i,void 0),Fo(t,e,a,i)}if(o=(a&t.childLanes)!==0,cn||o){if(i=Ft,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ii(t,r),Qn(i,t,r,-1))}return mh(),i=nu(Error(he(421))),Fo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=xy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Sn=sr(r.nextSibling),En=e,ht=!0,Xn=null,t!==null&&(bn[Pn++]=wi,bn[Pn++]=Ai,bn[Pn++]=Vr,wi=t.id,Ai=t.overflow,Vr=e),e=ch(e,i.children),e.flags|=4096,e)}function Ip(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),md(t.return,e,n)}function iu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Wv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Qt(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ip(t,n,e);else if(t.tag===19)Ip(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ot(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Yl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),iu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Yl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}iu(e,!0,n,null,s);break;case"together":iu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function xl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Di(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Wr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(he(153));if(e.child!==null){for(t=e.child,n=cr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=cr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function oy(t,e,n){switch(e.tag){case 3:Vv(e),Gs();break;case 5:gv(e);break;case 1:fn(e.type)&&Vl(e);break;case 4:th(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ot(jl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ot(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?Gv(t,e,n):(ot(mt,mt.current&1),t=Di(t,e,n),t!==null?t.sibling:null);ot(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Wv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ot(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,zv(t,e,n)}return Di(t,e,n)}var jv,Ed,Xv,$v;jv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ed=function(){};Xv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Fr(fi.current);var s=null;switch(n){case"input":r=ju(t,r),i=ju(t,i),s=[];break;case"select":r=_t({},r,{value:void 0}),i=_t({},i,{value:void 0}),s=[];break;case"textarea":r=Yu(t,r),i=Yu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=zl)}qu(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ja.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ja.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};$v=function(t,e,n,i){n!==i&&(e.flags|=4)};function xa(t,e){if(!ht)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function ly(t,e,n){var i=e.pendingProps;switch(Yf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return fn(e.type)&&Hl(),Vt(e),null;case 3:return i=e.stateNode,js(),dt(dn),dt(Yt),ih(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Do(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Xn!==null&&(Ld(Xn),Xn=null))),Ed(t,e),Vt(e),null;case 5:nh(e);var r=Fr(io.current);if(n=e.type,t!==null&&e.stateNode!=null)Xv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(he(166));return Vt(e),null}if(t=Fr(fi.current),Do(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ci]=e,i[to]=s,t=(e.mode&1)!==0,n){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<Na.length;r++)ct(Na[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":Vh(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Wh(i,s),ct("invalid",i)}qu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Io(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Io(i.textContent,o,t),r=["children",""+o]):ja.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&ct("scroll",i)}switch(n){case"input":wo(i),Gh(i,s,!0);break;case"textarea":wo(i),jh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=zl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Sg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ci]=e,t[to]=i,jv(t,e,!1,!1),e.stateNode=t;e:{switch(a=Zu(n,i),n){case"dialog":ct("cancel",t),ct("close",t),r=i;break;case"iframe":case"object":case"embed":ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<Na.length;r++)ct(Na[r],t);r=i;break;case"source":ct("error",t),r=i;break;case"img":case"image":case"link":ct("error",t),ct("load",t),r=i;break;case"details":ct("toggle",t),r=i;break;case"input":Vh(t,i),r=ju(t,i),ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=_t({},i,{value:void 0}),ct("invalid",t);break;case"textarea":Wh(t,i),r=Yu(t,i),ct("invalid",t);break;default:r=i}qu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Tg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Mg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Xa(t,l):typeof l=="number"&&Xa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ja.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",t):l!=null&&If(t,s,l,a))}switch(n){case"input":wo(t),Gh(t,i,!1);break;case"textarea":wo(t),jh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+fr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ls(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ls(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=zl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Vt(e),null;case 6:if(t&&e.stateNode!=null)$v(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(he(166));if(n=Fr(io.current),Fr(fi.current),Do(e)){if(i=e.stateNode,n=e.memoizedProps,i[ci]=e,(s=i.nodeValue!==n)&&(t=En,t!==null))switch(t.tag){case 3:Io(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Io(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=e,e.stateNode=i}return Vt(e),null;case 13:if(dt(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ht&&Sn!==null&&e.mode&1&&!(e.flags&128))dv(),Gs(),e.flags|=98560,s=!1;else if(s=Do(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(he(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(he(317));s[ci]=e}else Gs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),s=!1}else Xn!==null&&(Ld(Xn),Xn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?bt===0&&(bt=3):mh())),e.updateQueue!==null&&(e.flags|=4),Vt(e),null);case 4:return js(),Ed(t,e),t===null&&Ja(e.stateNode.containerInfo),Vt(e),null;case 10:return Qf(e.type._context),Vt(e),null;case 17:return fn(e.type)&&Hl(),Vt(e),null;case 19:if(dt(mt),s=e.memoizedState,s===null)return Vt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)xa(s,!1);else{if(bt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Yl(t),a!==null){for(e.flags|=128,xa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ot(mt,mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Mt()>$s&&(e.flags|=128,i=!0,xa(s,!1),e.lanes=4194304)}else{if(!i)if(t=Yl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),xa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!ht)return Vt(e),null}else 2*Mt()-s.renderingStartTime>$s&&n!==1073741824&&(e.flags|=128,i=!0,xa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Mt(),e.sibling=null,n=mt.current,ot(mt,i?n&1|2:n&1),e):(Vt(e),null);case 22:case 23:return ph(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?yn&1073741824&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),null;case 24:return null;case 25:return null}throw Error(he(156,e.tag))}function cy(t,e){switch(Yf(e),e.tag){case 1:return fn(e.type)&&Hl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return js(),dt(dn),dt(Yt),ih(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return nh(e),null;case 13:if(dt(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(he(340));Gs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return dt(mt),null;case 4:return js(),null;case 10:return Qf(e.type._context),null;case 22:case 23:return ph(),null;case 24:return null;default:return null}}var Oo=!1,$t=!1,uy=typeof WeakSet=="function"?WeakSet:Set,be=null;function Rs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){yt(t,e,i)}else n.current=null}function Td(t,e,n){try{n()}catch(i){yt(t,e,i)}}var Dp=!1;function dy(t,e){if(od=Ol,t=Qg(),Xf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,d=0,h=t,f=null;t:for(;;){for(var m;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(m=h.firstChild)!==null;)f=h,h=m;for(;;){if(h===t)break t;if(f===n&&++c===r&&(o=a),f===s&&++d===i&&(l=a),(m=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(ld={focusedElem:t,selectionRange:n},Ol=!1,be=e;be!==null;)if(e=be,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,be=t;else for(;be!==null;){e=be;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var _=v.memoizedProps,p=v.memoizedState,u=e.stateNode,g=u.getSnapshotBeforeUpdate(e.elementType===e.type?_:Wn(e.type,_),p);u.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(he(163))}}catch(T){yt(e,e.return,T)}if(t=e.sibling,t!==null){t.return=e.return,be=t;break}be=e.return}return v=Dp,Dp=!1,v}function Va(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Td(e,n,s)}r=r.next}while(r!==i)}}function xc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function wd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Yv(t){var e=t.alternate;e!==null&&(t.alternate=null,Yv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ci],delete e[to],delete e[dd],delete e[$x],delete e[Yx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Kv(t){return t.tag===5||t.tag===3||t.tag===4}function Up(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Kv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ad(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=zl));else if(i!==4&&(t=t.child,t!==null))for(Ad(t,e,n),t=t.sibling;t!==null;)Ad(t,e,n),t=t.sibling}function Cd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Cd(t,e,n),t=t.sibling;t!==null;)Cd(t,e,n),t=t.sibling}var kt=null,jn=!1;function Vi(t,e,n){for(n=n.child;n!==null;)qv(t,e,n),n=n.sibling}function qv(t,e,n){if(di&&typeof di.onCommitFiberUnmount=="function")try{di.onCommitFiberUnmount(dc,n)}catch{}switch(n.tag){case 5:$t||Rs(n,e);case 6:var i=kt,r=jn;kt=null,Vi(t,e,n),kt=i,jn=r,kt!==null&&(jn?(t=kt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):kt.removeChild(n.stateNode));break;case 18:kt!==null&&(jn?(t=kt,n=n.stateNode,t.nodeType===8?qc(t.parentNode,n):t.nodeType===1&&qc(t,n),qa(t)):qc(kt,n.stateNode));break;case 4:i=kt,r=jn,kt=n.stateNode.containerInfo,jn=!0,Vi(t,e,n),kt=i,jn=r;break;case 0:case 11:case 14:case 15:if(!$t&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Td(n,e,a),r=r.next}while(r!==i)}Vi(t,e,n);break;case 1:if(!$t&&(Rs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){yt(n,e,o)}Vi(t,e,n);break;case 21:Vi(t,e,n);break;case 22:n.mode&1?($t=(i=$t)||n.memoizedState!==null,Vi(t,e,n),$t=i):Vi(t,e,n);break;default:Vi(t,e,n)}}function Fp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new uy),e.forEach(function(i){var r=yy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function zn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:kt=o.stateNode,jn=!1;break e;case 3:kt=o.stateNode.containerInfo,jn=!0;break e;case 4:kt=o.stateNode.containerInfo,jn=!0;break e}o=o.return}if(kt===null)throw Error(he(160));qv(s,a,r),kt=null,jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){yt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Zv(e,t),e=e.sibling}function Zv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(zn(e,t),si(t),i&4){try{Va(3,t,t.return),xc(3,t)}catch(_){yt(t,t.return,_)}try{Va(5,t,t.return)}catch(_){yt(t,t.return,_)}}break;case 1:zn(e,t),si(t),i&512&&n!==null&&Rs(n,n.return);break;case 5:if(zn(e,t),si(t),i&512&&n!==null&&Rs(n,n.return),t.flags&32){var r=t.stateNode;try{Xa(r,"")}catch(_){yt(t,t.return,_)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&xg(r,s),Zu(o,a);var c=Zu(o,s);for(a=0;a<l.length;a+=2){var d=l[a],h=l[a+1];d==="style"?Tg(r,h):d==="dangerouslySetInnerHTML"?Mg(r,h):d==="children"?Xa(r,h):If(r,d,h,c)}switch(o){case"input":Xu(r,s);break;case"textarea":yg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Ls(r,!!s.multiple,m,!1):f!==!!s.multiple&&(s.defaultValue!=null?Ls(r,!!s.multiple,s.defaultValue,!0):Ls(r,!!s.multiple,s.multiple?[]:"",!1))}r[to]=s}catch(_){yt(t,t.return,_)}}break;case 6:if(zn(e,t),si(t),i&4){if(t.stateNode===null)throw Error(he(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(_){yt(t,t.return,_)}}break;case 3:if(zn(e,t),si(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{qa(e.containerInfo)}catch(_){yt(t,t.return,_)}break;case 4:zn(e,t),si(t);break;case 13:zn(e,t),si(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(fh=Mt())),i&4&&Fp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?($t=(c=$t)||d,zn(e,t),$t=c):zn(e,t),si(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(be=t,d=t.child;d!==null;){for(h=be=d;be!==null;){switch(f=be,m=f.child,f.tag){case 0:case 11:case 14:case 15:Va(4,f,f.return);break;case 1:Rs(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(_){yt(i,n,_)}}break;case 5:Rs(f,f.return);break;case 22:if(f.memoizedState!==null){kp(h);continue}}m!==null?(m.return=f,be=m):kp(h)}d=d.sibling}e:for(d=null,h=t;;){if(h.tag===5){if(d===null){d=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Eg("display",a))}catch(_){yt(t,t.return,_)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(_){yt(t,t.return,_)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:zn(e,t),si(t),i&4&&Fp(t);break;case 21:break;default:zn(e,t),si(t)}}function si(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Kv(n)){var i=n;break e}n=n.return}throw Error(he(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Xa(r,""),i.flags&=-33);var s=Up(t);Cd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Up(t);Ad(t,o,a);break;default:throw Error(he(161))}}catch(l){yt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function fy(t,e,n){be=t,Qv(t)}function Qv(t,e,n){for(var i=(t.mode&1)!==0;be!==null;){var r=be,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Oo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||$t;o=Oo;var c=$t;if(Oo=a,($t=l)&&!c)for(be=r;be!==null;)a=be,l=a.child,a.tag===22&&a.memoizedState!==null?Bp(r):l!==null?(l.return=a,be=l):Bp(r);for(;s!==null;)be=s,Qv(s),s=s.sibling;be=r,Oo=o,$t=c}Op(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,be=s):Op(t)}}function Op(t){for(;be!==null;){var e=be;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:$t||xc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!$t)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Sp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Sp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&qa(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(he(163))}$t||e.flags&512&&wd(e)}catch(f){yt(e,e.return,f)}}if(e===t){be=null;break}if(n=e.sibling,n!==null){n.return=e.return,be=n;break}be=e.return}}function kp(t){for(;be!==null;){var e=be;if(e===t){be=null;break}var n=e.sibling;if(n!==null){n.return=e.return,be=n;break}be=e.return}}function Bp(t){for(;be!==null;){var e=be;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{xc(4,e)}catch(l){yt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){yt(e,r,l)}}var s=e.return;try{wd(e)}catch(l){yt(e,s,l)}break;case 5:var a=e.return;try{wd(e)}catch(l){yt(e,a,l)}}}catch(l){yt(e,e.return,l)}if(e===t){be=null;break}var o=e.sibling;if(o!==null){o.return=e.return,be=o;break}be=e.return}}var hy=Math.ceil,Zl=Fi.ReactCurrentDispatcher,uh=Fi.ReactCurrentOwner,Dn=Fi.ReactCurrentBatchConfig,Qe=0,Ft=null,At=null,Bt=0,yn=0,bs=_r(0),bt=0,oo=null,Wr=0,yc=0,dh=0,Ga=null,on=null,fh=0,$s=1/0,Ei=null,Ql=!1,Rd=null,or=null,ko=!1,tr=null,Jl=0,Wa=0,bd=null,yl=-1,Sl=0;function en(){return Qe&6?Mt():yl!==-1?yl:yl=Mt()}function lr(t){return t.mode&1?Qe&2&&Bt!==0?Bt&-Bt:qx.transition!==null?(Sl===0&&(Sl=Fg()),Sl):(t=it,t!==0||(t=window.event,t=t===void 0?16:Gg(t.type)),t):1}function Qn(t,e,n,i){if(50<Wa)throw Wa=0,bd=null,Error(he(185));uo(t,n,i),(!(Qe&2)||t!==Ft)&&(t===Ft&&(!(Qe&2)&&(yc|=n),bt===4&&Qi(t,Bt)),hn(t,i),n===1&&Qe===0&&!(e.mode&1)&&($s=Mt()+500,gc&&xr()))}function hn(t,e){var n=t.callbackNode;q0(t,e);var i=Fl(t,t===Ft?Bt:0);if(i===0)n!==null&&Yh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Yh(n),e===1)t.tag===0?Kx(zp.bind(null,t)):lv(zp.bind(null,t)),jx(function(){!(Qe&6)&&xr()}),n=null;else{switch(Og(i)){case 1:n=kf;break;case 4:n=Dg;break;case 16:n=Ul;break;case 536870912:n=Ug;break;default:n=Ul}n=a_(n,Jv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Jv(t,e){if(yl=-1,Sl=0,Qe&6)throw Error(he(327));var n=t.callbackNode;if(Fs()&&t.callbackNode!==n)return null;var i=Fl(t,t===Ft?Bt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=ec(t,i);else{e=i;var r=Qe;Qe|=2;var s=t_();(Ft!==t||Bt!==e)&&(Ei=null,$s=Mt()+500,Br(t,e));do try{gy();break}catch(o){e_(t,o)}while(!0);Zf(),Zl.current=s,Qe=r,At!==null?e=0:(Ft=null,Bt=0,e=bt)}if(e!==0){if(e===2&&(r=nd(t),r!==0&&(i=r,e=Pd(t,r))),e===1)throw n=oo,Br(t,0),Qi(t,i),hn(t,Mt()),n;if(e===6)Qi(t,i);else{if(r=t.current.alternate,!(i&30)&&!py(r)&&(e=ec(t,i),e===2&&(s=nd(t),s!==0&&(i=s,e=Pd(t,s))),e===1))throw n=oo,Br(t,0),Qi(t,i),hn(t,Mt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(he(345));case 2:br(t,on,Ei);break;case 3:if(Qi(t,i),(i&130023424)===i&&(e=fh+500-Mt(),10<e)){if(Fl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){en(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=ud(br.bind(null,t,on,Ei),e);break}br(t,on,Ei);break;case 4:if(Qi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Zn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Mt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*hy(i/1960))-i,10<i){t.timeoutHandle=ud(br.bind(null,t,on,Ei),i);break}br(t,on,Ei);break;case 5:br(t,on,Ei);break;default:throw Error(he(329))}}}return hn(t,Mt()),t.callbackNode===n?Jv.bind(null,t):null}function Pd(t,e){var n=Ga;return t.current.memoizedState.isDehydrated&&(Br(t,e).flags|=256),t=ec(t,e),t!==2&&(e=on,on=n,e!==null&&Ld(e)),t}function Ld(t){on===null?on=t:on.push.apply(on,t)}function py(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ti(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Qi(t,e){for(e&=~dh,e&=~yc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Zn(e),i=1<<n;t[n]=-1,e&=~i}}function zp(t){if(Qe&6)throw Error(he(327));Fs();var e=Fl(t,0);if(!(e&1))return hn(t,Mt()),null;var n=ec(t,e);if(t.tag!==0&&n===2){var i=nd(t);i!==0&&(e=i,n=Pd(t,i))}if(n===1)throw n=oo,Br(t,0),Qi(t,e),hn(t,Mt()),n;if(n===6)throw Error(he(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,br(t,on,Ei),hn(t,Mt()),null}function hh(t,e){var n=Qe;Qe|=1;try{return t(e)}finally{Qe=n,Qe===0&&($s=Mt()+500,gc&&xr())}}function jr(t){tr!==null&&tr.tag===0&&!(Qe&6)&&Fs();var e=Qe;Qe|=1;var n=Dn.transition,i=it;try{if(Dn.transition=null,it=1,t)return t()}finally{it=i,Dn.transition=n,Qe=e,!(Qe&6)&&xr()}}function ph(){yn=bs.current,dt(bs)}function Br(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Wx(n)),At!==null)for(n=At.return;n!==null;){var i=n;switch(Yf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Hl();break;case 3:js(),dt(dn),dt(Yt),ih();break;case 5:nh(i);break;case 4:js();break;case 13:dt(mt);break;case 19:dt(mt);break;case 10:Qf(i.type._context);break;case 22:case 23:ph()}n=n.return}if(Ft=t,At=t=cr(t.current,null),Bt=yn=e,bt=0,oo=null,dh=yc=Wr=0,on=Ga=null,Ur!==null){for(e=0;e<Ur.length;e++)if(n=Ur[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Ur=null}return t}function e_(t,e){do{var n=At;try{if(Zf(),vl.current=ql,Kl){for(var i=gt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Kl=!1}if(Gr=0,Ut=Rt=gt=null,Ha=!1,ro=0,uh.current=null,n===null||n.return===null){bt=1,oo=e,At=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Bt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=o,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=Cp(a);if(m!==null){m.flags&=-257,Rp(m,a,o,s,e),m.mode&1&&Ap(s,c,e),e=m,l=c;var v=e.updateQueue;if(v===null){var _=new Set;_.add(l),e.updateQueue=_}else v.add(l);break e}else{if(!(e&1)){Ap(s,c,e),mh();break e}l=Error(he(426))}}else if(ht&&o.mode&1){var p=Cp(a);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Rp(p,a,o,s,e),Kf(Xs(l,o));break e}}s=l=Xs(l,o),bt!==4&&(bt=2),Ga===null?Ga=[s]:Ga.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=Ov(s,l,e);yp(s,u);break e;case 1:o=l;var g=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(or===null||!or.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var T=kv(s,o,e);yp(s,T);break e}}s=s.return}while(s!==null)}i_(n)}catch(P){e=P,At===n&&n!==null&&(At=n=n.return);continue}break}while(!0)}function t_(){var t=Zl.current;return Zl.current=ql,t===null?ql:t}function mh(){(bt===0||bt===3||bt===2)&&(bt=4),Ft===null||!(Wr&268435455)&&!(yc&268435455)||Qi(Ft,Bt)}function ec(t,e){var n=Qe;Qe|=2;var i=t_();(Ft!==t||Bt!==e)&&(Ei=null,Br(t,e));do try{my();break}catch(r){e_(t,r)}while(!0);if(Zf(),Qe=n,Zl.current=i,At!==null)throw Error(he(261));return Ft=null,Bt=0,bt}function my(){for(;At!==null;)n_(At)}function gy(){for(;At!==null&&!H0();)n_(At)}function n_(t){var e=s_(t.alternate,t,yn);t.memoizedProps=t.pendingProps,e===null?i_(t):At=e,uh.current=null}function i_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=cy(n,e),n!==null){n.flags&=32767,At=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{bt=6,At=null;return}}else if(n=ly(n,e,yn),n!==null){At=n;return}if(e=e.sibling,e!==null){At=e;return}At=e=t}while(e!==null);bt===0&&(bt=5)}function br(t,e,n){var i=it,r=Dn.transition;try{Dn.transition=null,it=1,vy(t,e,n,i)}finally{Dn.transition=r,it=i}return null}function vy(t,e,n,i){do Fs();while(tr!==null);if(Qe&6)throw Error(he(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(he(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Z0(t,s),t===Ft&&(At=Ft=null,Bt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ko||(ko=!0,a_(Ul,function(){return Fs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Dn.transition,Dn.transition=null;var a=it;it=1;var o=Qe;Qe|=4,uh.current=null,dy(t,n),Zv(n,t),Ox(ld),Ol=!!od,ld=od=null,t.current=n,fy(n),V0(),Qe=o,it=a,Dn.transition=s}else t.current=n;if(ko&&(ko=!1,tr=t,Jl=r),s=t.pendingLanes,s===0&&(or=null),j0(n.stateNode),hn(t,Mt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ql)throw Ql=!1,t=Rd,Rd=null,t;return Jl&1&&t.tag!==0&&Fs(),s=t.pendingLanes,s&1?t===bd?Wa++:(Wa=0,bd=t):Wa=0,xr(),null}function Fs(){if(tr!==null){var t=Og(Jl),e=Dn.transition,n=it;try{if(Dn.transition=null,it=16>t?16:t,tr===null)var i=!1;else{if(t=tr,tr=null,Jl=0,Qe&6)throw Error(he(331));var r=Qe;for(Qe|=4,be=t.current;be!==null;){var s=be,a=s.child;if(be.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(be=c;be!==null;){var d=be;switch(d.tag){case 0:case 11:case 15:Va(8,d,s)}var h=d.child;if(h!==null)h.return=d,be=h;else for(;be!==null;){d=be;var f=d.sibling,m=d.return;if(Yv(d),d===c){be=null;break}if(f!==null){f.return=m,be=f;break}be=m}}}var v=s.alternate;if(v!==null){var _=v.child;if(_!==null){v.child=null;do{var p=_.sibling;_.sibling=null,_=p}while(_!==null)}}be=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,be=a;else e:for(;be!==null;){if(s=be,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Va(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,be=u;break e}be=s.return}}var g=t.current;for(be=g;be!==null;){a=be;var x=a.child;if(a.subtreeFlags&2064&&x!==null)x.return=a,be=x;else e:for(a=g;be!==null;){if(o=be,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:xc(9,o)}}catch(P){yt(o,o.return,P)}if(o===a){be=null;break e}var T=o.sibling;if(T!==null){T.return=o.return,be=T;break e}be=o.return}}if(Qe=r,xr(),di&&typeof di.onPostCommitFiberRoot=="function")try{di.onPostCommitFiberRoot(dc,t)}catch{}i=!0}return i}finally{it=n,Dn.transition=e}}return!1}function Hp(t,e,n){e=Xs(n,e),e=Ov(t,e,1),t=ar(t,e,1),e=en(),t!==null&&(uo(t,1,e),hn(t,e))}function yt(t,e,n){if(t.tag===3)Hp(t,t,n);else for(;e!==null;){if(e.tag===3){Hp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(or===null||!or.has(i))){t=Xs(n,t),t=kv(e,t,1),e=ar(e,t,1),t=en(),e!==null&&(uo(e,1,t),hn(e,t));break}}e=e.return}}function _y(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=en(),t.pingedLanes|=t.suspendedLanes&n,Ft===t&&(Bt&n)===n&&(bt===4||bt===3&&(Bt&130023424)===Bt&&500>Mt()-fh?Br(t,0):dh|=n),hn(t,e)}function r_(t,e){e===0&&(t.mode&1?(e=Ro,Ro<<=1,!(Ro&130023424)&&(Ro=4194304)):e=1);var n=en();t=Ii(t,e),t!==null&&(uo(t,e,n),hn(t,n))}function xy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),r_(t,n)}function yy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(he(314))}i!==null&&i.delete(e),r_(t,n)}var s_;s_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||dn.current)cn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return cn=!1,oy(t,e,n);cn=!!(t.flags&131072)}else cn=!1,ht&&e.flags&1048576&&cv(e,Wl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;xl(t,e),t=e.pendingProps;var r=Vs(e,Yt.current);Us(e,n),r=sh(null,e,i,t,r,n);var s=ah();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,fn(i)?(s=!0,Vl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,eh(e),r.updater=_c,e.stateNode=r,r._reactInternals=e,vd(e,i,t,n),e=yd(null,e,i,!0,s,n)):(e.tag=0,ht&&s&&$f(e),Qt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(xl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=My(i),t=Wn(i,t),r){case 0:e=xd(null,e,i,t,n);break e;case 1:e=Lp(null,e,i,t,n);break e;case 11:e=bp(null,e,i,t,n);break e;case 14:e=Pp(null,e,i,Wn(i.type,t),n);break e}throw Error(he(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),xd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Lp(t,e,i,r,n);case 3:e:{if(Vv(e),t===null)throw Error(he(387));i=e.pendingProps,s=e.memoizedState,r=s.element,mv(t,e),$l(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Xs(Error(he(423)),e),e=Np(t,e,i,n,r);break e}else if(i!==r){r=Xs(Error(he(424)),e),e=Np(t,e,i,n,r);break e}else for(Sn=sr(e.stateNode.containerInfo.firstChild),En=e,ht=!0,Xn=null,n=hv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gs(),i===r){e=Di(t,e,n);break e}Qt(t,e,i,n)}e=e.child}return e;case 5:return gv(e),t===null&&pd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,cd(i,r)?a=null:s!==null&&cd(i,s)&&(e.flags|=32),Hv(t,e),Qt(t,e,a,n),e.child;case 6:return t===null&&pd(e),null;case 13:return Gv(t,e,n);case 4:return th(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ws(e,null,i,n):Qt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),bp(t,e,i,r,n);case 7:return Qt(t,e,e.pendingProps,n),e.child;case 8:return Qt(t,e,e.pendingProps.children,n),e.child;case 12:return Qt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,ot(jl,i._currentValue),i._currentValue=a,s!==null)if(ti(s.value,a)){if(s.children===r.children&&!dn.current){e=Di(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Pi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),md(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(he(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),md(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Qt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Us(e,n),r=Un(r),i=i(r),e.flags|=1,Qt(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),Pp(t,e,i,r,n);case 15:return Bv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),xl(t,e),e.tag=1,fn(i)?(t=!0,Vl(e)):t=!1,Us(e,n),Fv(e,i,r),vd(e,i,r,n),yd(null,e,i,!0,t,n);case 19:return Wv(t,e,n);case 22:return zv(t,e,n)}throw Error(he(156,e.tag))};function a_(t,e){return Ig(t,e)}function Sy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nn(t,e,n,i){return new Sy(t,e,n,i)}function gh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function My(t){if(typeof t=="function")return gh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Uf)return 11;if(t===Ff)return 14}return 2}function cr(t,e){var n=t.alternate;return n===null?(n=Nn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ml(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")gh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case xs:return zr(n.children,r,s,e);case Df:a=8,r|=8;break;case Hu:return t=Nn(12,n,e,r|2),t.elementType=Hu,t.lanes=s,t;case Vu:return t=Nn(13,n,e,r),t.elementType=Vu,t.lanes=s,t;case Gu:return t=Nn(19,n,e,r),t.elementType=Gu,t.lanes=s,t;case gg:return Sc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case pg:a=10;break e;case mg:a=9;break e;case Uf:a=11;break e;case Ff:a=14;break e;case Ki:a=16,i=null;break e}throw Error(he(130,t==null?t:typeof t,""))}return e=Nn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function zr(t,e,n,i){return t=Nn(7,t,i,e),t.lanes=n,t}function Sc(t,e,n,i){return t=Nn(22,t,i,e),t.elementType=gg,t.lanes=n,t.stateNode={isHidden:!1},t}function ru(t,e,n){return t=Nn(6,t,null,e),t.lanes=n,t}function su(t,e,n){return e=Nn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Ey(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bc(0),this.expirationTimes=Bc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function vh(t,e,n,i,r,s,a,o,l){return t=new Ey(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Nn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},eh(s),t}function Ty(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:_s,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function o_(t){if(!t)return hr;t=t._reactInternals;e:{if(Kr(t)!==t||t.tag!==1)throw Error(he(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(fn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(he(171))}if(t.tag===1){var n=t.type;if(fn(n))return ov(t,n,e)}return e}function l_(t,e,n,i,r,s,a,o,l){return t=vh(n,i,!0,t,r,s,a,o,l),t.context=o_(null),n=t.current,i=en(),r=lr(n),s=Pi(i,r),s.callback=e??null,ar(n,s,r),t.current.lanes=r,uo(t,r,i),hn(t,i),t}function Mc(t,e,n,i){var r=e.current,s=en(),a=lr(r);return n=o_(n),e.context===null?e.context=n:e.pendingContext=n,e=Pi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=ar(r,e,a),t!==null&&(Qn(t,r,a,s),gl(t,r,a)),a}function tc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Vp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function _h(t,e){Vp(t,e),(t=t.alternate)&&Vp(t,e)}function wy(){return null}var c_=typeof reportError=="function"?reportError:function(t){console.error(t)};function xh(t){this._internalRoot=t}Ec.prototype.render=xh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(he(409));Mc(t,e,null,null)};Ec.prototype.unmount=xh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;jr(function(){Mc(null,t,null,null)}),e[Ni]=null}};function Ec(t){this._internalRoot=t}Ec.prototype.unstable_scheduleHydration=function(t){if(t){var e=zg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Zi.length&&e!==0&&e<Zi[n].priority;n++);Zi.splice(n,0,t),n===0&&Vg(t)}};function yh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Tc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gp(){}function Ay(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=tc(a);s.call(c)}}var a=l_(e,i,t,0,null,!1,!1,"",Gp);return t._reactRootContainer=a,t[Ni]=a.current,Ja(t.nodeType===8?t.parentNode:t),jr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=tc(l);o.call(c)}}var l=vh(t,0,!1,null,null,!1,!1,"",Gp);return t._reactRootContainer=l,t[Ni]=l.current,Ja(t.nodeType===8?t.parentNode:t),jr(function(){Mc(e,l,n,i)}),l}function wc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=tc(a);o.call(l)}}Mc(e,a,t,r)}else a=Ay(n,e,t,r,i);return tc(a)}kg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=La(e.pendingLanes);n!==0&&(Bf(e,n|1),hn(e,Mt()),!(Qe&6)&&($s=Mt()+500,xr()))}break;case 13:jr(function(){var i=Ii(t,1);if(i!==null){var r=en();Qn(i,t,1,r)}}),_h(t,1)}};zf=function(t){if(t.tag===13){var e=Ii(t,134217728);if(e!==null){var n=en();Qn(e,t,134217728,n)}_h(t,134217728)}};Bg=function(t){if(t.tag===13){var e=lr(t),n=Ii(t,e);if(n!==null){var i=en();Qn(n,t,e,i)}_h(t,e)}};zg=function(){return it};Hg=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};Ju=function(t,e,n){switch(e){case"input":if(Xu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=mc(i);if(!r)throw Error(he(90));_g(i),Xu(i,r)}}}break;case"textarea":yg(t,n);break;case"select":e=n.value,e!=null&&Ls(t,!!n.multiple,e,!1)}};Cg=hh;Rg=jr;var Cy={usingClientEntryPoint:!1,Events:[ho,Es,mc,wg,Ag,hh]},ya={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ry={bundleType:ya.bundleType,version:ya.version,rendererPackageName:ya.rendererPackageName,rendererConfig:ya.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Lg(t),t===null?null:t.stateNode},findFiberByHostInstance:ya.findFiberByHostInstance||wy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bo.isDisabled&&Bo.supportsFiber)try{dc=Bo.inject(Ry),di=Bo}catch{}}wn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cy;wn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!yh(e))throw Error(he(200));return Ty(t,e,null,n)};wn.createRoot=function(t,e){if(!yh(t))throw Error(he(299));var n=!1,i="",r=c_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=vh(t,1,!1,null,null,n,!1,i,r),t[Ni]=e.current,Ja(t.nodeType===8?t.parentNode:t),new xh(e)};wn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(he(188)):(t=Object.keys(t).join(","),Error(he(268,t)));return t=Lg(e),t=t===null?null:t.stateNode,t};wn.flushSync=function(t){return jr(t)};wn.hydrate=function(t,e,n){if(!Tc(e))throw Error(he(200));return wc(null,t,e,!0,n)};wn.hydrateRoot=function(t,e,n){if(!yh(t))throw Error(he(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=c_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=l_(e,null,t,1,n??null,r,!1,s,a),t[Ni]=e.current,Ja(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ec(e)};wn.render=function(t,e,n){if(!Tc(e))throw Error(he(200));return wc(null,t,e,!1,n)};wn.unmountComponentAtNode=function(t){if(!Tc(t))throw Error(he(40));return t._reactRootContainer?(jr(function(){wc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ni]=null})}),!0):!1};wn.unstable_batchedUpdates=hh;wn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Tc(n))throw Error(he(200));if(t==null||t._reactInternals===void 0)throw Error(he(38));return wc(t,e,n,!1,i)};wn.version="18.3.1-next-f1338f8080-20240426";function u_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u_)}catch(t){console.error(t)}}u_(),ug.exports=wn;var by=ug.exports,d_,Wp=by;d_=Wp.createRoot,Wp.hydrateRoot;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sh="169",Py=0,jp=1,Ly=2,f_=1,Ny=2,Mi=3,pr=0,pn=1,ui=2,ur=0,Os=1,Xp=2,$p=3,Yp=4,Iy=5,Nr=100,Dy=101,Uy=102,Fy=103,Oy=104,ky=200,By=201,zy=202,Hy=203,Nd=204,Id=205,Vy=206,Gy=207,Wy=208,jy=209,Xy=210,$y=211,Yy=212,Ky=213,qy=214,Dd=0,Ud=1,Fd=2,Ys=3,Od=4,kd=5,Bd=6,zd=7,h_=0,Zy=1,Qy=2,dr=0,Jy=1,eS=2,tS=3,nS=4,iS=5,rS=6,sS=7,p_=300,Ks=301,qs=302,Hd=303,Vd=304,Ac=306,Gd=1e3,Or=1001,Wd=1002,In=1003,aS=1004,zo=1005,$n=1006,au=1007,kr=1008,Ui=1009,m_=1010,g_=1011,lo=1012,Mh=1013,Xr=1014,Ci=1015,mo=1016,Eh=1017,Th=1018,Zs=1020,v_=35902,__=1021,x_=1022,Kn=1023,y_=1024,S_=1025,ks=1026,Qs=1027,M_=1028,wh=1029,E_=1030,Ah=1031,Ch=1033,El=33776,Tl=33777,wl=33778,Al=33779,jd=35840,Xd=35841,$d=35842,Yd=35843,Kd=36196,qd=37492,Zd=37496,Qd=37808,Jd=37809,ef=37810,tf=37811,nf=37812,rf=37813,sf=37814,af=37815,of=37816,lf=37817,cf=37818,uf=37819,df=37820,ff=37821,Cl=36492,hf=36494,pf=36495,T_=36283,mf=36284,gf=36285,vf=36286,oS=3200,lS=3201,cS=0,uS=1,Ji="",oi="srgb",yr="srgb-linear",Rh="display-p3",Cc="display-p3-linear",nc="linear",ut="srgb",ic="rec709",rc="p3",es=7680,Kp=519,dS=512,fS=513,hS=514,w_=515,pS=516,mS=517,gS=518,vS=519,qp=35044,Zp="300 es",Ri=2e3,sc=2001;class aa{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ou=Math.PI/180,_f=180/Math.PI;function go(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[t&255]+Gt[t>>8&255]+Gt[t>>16&255]+Gt[t>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[n&63|128]+Gt[n>>8&255]+"-"+Gt[n>>16&255]+Gt[n>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function ln(t,e,n){return Math.max(e,Math.min(n,t))}function _S(t,e){return(t%e+e)%e}function lu(t,e,n){return(1-n)*t+n*e}function Sa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function an(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,n=0){rt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ln(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,n,i,r,s,a,o,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],m=i[5],v=i[8],_=r[0],p=r[3],u=r[6],g=r[1],x=r[4],T=r[7],P=r[2],b=r[5],R=r[8];return s[0]=a*_+o*g+l*P,s[3]=a*p+o*x+l*b,s[6]=a*u+o*T+l*R,s[1]=c*_+d*g+h*P,s[4]=c*p+d*x+h*b,s[7]=c*u+d*T+h*R,s[2]=f*_+m*g+v*P,s[5]=f*p+m*x+v*b,s[8]=f*u+m*T+v*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*a*d-n*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,f=o*l-d*s,m=c*s-a*l,v=n*h+i*f+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=h*_,e[1]=(r*c-d*i)*_,e[2]=(o*i-r*a)*_,e[3]=f*_,e[4]=(d*n-r*l)*_,e[5]=(r*s-o*n)*_,e[6]=m*_,e[7]=(i*l-c*n)*_,e[8]=(a*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(cu.makeScale(e,n)),this}rotate(e){return this.premultiply(cu.makeRotation(-e)),this}translate(e,n){return this.premultiply(cu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const cu=new Xe;function A_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ac(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function xS(){const t=ac("canvas");return t.style.display="block",t}const Qp={};function Rl(t){t in Qp||(Qp[t]=!0,console.warn(t))}function yS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function SS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function MS(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Jp=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),em=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ma={[yr]:{transfer:nc,primaries:ic,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[oi]:{transfer:ut,primaries:ic,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Cc]:{transfer:nc,primaries:rc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(em),fromReference:t=>t.applyMatrix3(Jp)},[Rh]:{transfer:ut,primaries:rc,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(em),fromReference:t=>t.applyMatrix3(Jp).convertLinearToSRGB()}},ES=new Set([yr,Cc]),et={enabled:!0,_workingColorSpace:yr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!ES.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Ma[e].toReference,r=Ma[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Ma[t].primaries},getTransfer:function(t){return t===Ji?nc:Ma[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(Ma[e].luminanceCoefficients)}};function Bs(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function uu(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let ts;class TS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=ac("canvas")),ts.width=e.width,ts.height=e.height;const i=ts.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ts}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ac("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Bs(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Bs(n[i]/255)*255):n[i]=Bs(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wS=0;class C_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=go(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(du(r[a].image)):s.push(du(r[a]))}else s=du(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function du(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?TS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let AS=0;class mn extends aa{constructor(e=mn.DEFAULT_IMAGE,n=mn.DEFAULT_MAPPING,i=Or,r=Or,s=$n,a=kr,o=Kn,l=Ui,c=mn.DEFAULT_ANISOTROPY,d=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:AS++}),this.uuid=go(),this.name="",this.source=new C_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==p_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gd:e.x=e.x-Math.floor(e.x);break;case Or:e.x=e.x<0?0:1;break;case Wd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gd:e.y=e.y-Math.floor(e.y);break;case Or:e.y=e.y<0?0:1;break;case Wd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=p_;mn.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,n=0,i=0,r=1){Et.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],m=l[5],v=l[9],_=l[2],p=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-_)<.01&&Math.abs(v-p)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+_)<.1&&Math.abs(v+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,T=(m+1)/2,P=(u+1)/2,b=(d+f)/4,R=(h+_)/4,N=(v+p)/4;return x>T&&x>P?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=b/i,s=R/i):T>P?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=b/r,s=N/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=R/s,r=N/s),this.set(i,r,s,n),this}let g=Math.sqrt((p-v)*(p-v)+(h-_)*(h-_)+(f-d)*(f-d));return Math.abs(g)<.001&&(g=1),this.x=(p-v)/g,this.y=(h-_)/g,this.z=(f-d)/g,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class CS extends aa{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Et(0,0,e,n),this.scissorTest=!1,this.viewport=new Et(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new mn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new C_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends CS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class R_ extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class RS extends mn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=In,this.minFilter=In,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3];const f=s[a+0],m=s[a+1],v=s[a+2],_=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h;return}if(o===1){e[n+0]=f,e[n+1]=m,e[n+2]=v,e[n+3]=_;return}if(h!==_||l!==f||c!==m||d!==v){let p=1-o;const u=l*f+c*m+d*v+h*_,g=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const P=Math.sqrt(x),b=Math.atan2(P,u*g);p=Math.sin(p*b)/P,o=Math.sin(o*b)/P}const T=o*g;if(l=l*p+f*T,c=c*p+m*T,d=d*p+v*T,h=h*p+_*T,p===1-o){const P=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=P,c*=P,d*=P,h*=P}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=s[a],f=s[a+1],m=s[a+2],v=s[a+3];return e[n]=o*v+d*h+l*m-c*f,e[n+1]=l*v+d*f+c*h-o*m,e[n+2]=c*v+d*m+o*f-l*h,e[n+3]=d*v-o*h-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),h=o(s/2),f=l(i/2),m=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=f*d*h+c*m*v,this._y=c*m*h-f*d*v,this._z=c*d*v+f*m*h,this._w=c*d*h-f*m*v;break;case"YXZ":this._x=f*d*h+c*m*v,this._y=c*m*h-f*d*v,this._z=c*d*v-f*m*h,this._w=c*d*h+f*m*v;break;case"ZXY":this._x=f*d*h-c*m*v,this._y=c*m*h+f*d*v,this._z=c*d*v+f*m*h,this._w=c*d*h-f*m*v;break;case"ZYX":this._x=f*d*h-c*m*v,this._y=c*m*h+f*d*v,this._z=c*d*v-f*m*h,this._w=c*d*h+f*m*v;break;case"YZX":this._x=f*d*h+c*m*v,this._y=c*m*h+f*d*v,this._z=c*d*v-f*m*h,this._w=c*d*h-f*m*v;break;case"XZY":this._x=f*d*h-c*m*v,this._y=c*m*h-f*d*v,this._z=c*d*v+f*m*h,this._w=c*d*h+f*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],f=i+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ln(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-n)*d)/c,f=Math.sin(n*d)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(e=0,n=0,i=0){j.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(tm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(tm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*d,this.y=i+l*d+o*c-s*h,this.z=r+l*h+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fu.copy(this).projectOnVector(e),this.sub(fu)}reflect(e){return this.sub(fu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ln(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fu=new j,tm=new vo;class _o{constructor(e=new j(1/0,1/0,1/0),n=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(s,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ho.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ho.copy(i.boundingBox)),Ho.applyMatrix4(e.matrixWorld),this.union(Ho)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ea),Vo.subVectors(this.max,Ea),ns.subVectors(e.a,Ea),is.subVectors(e.b,Ea),rs.subVectors(e.c,Ea),Gi.subVectors(is,ns),Wi.subVectors(rs,is),Mr.subVectors(ns,rs);let n=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-Mr.z,Mr.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,Mr.z,0,-Mr.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-Mr.y,Mr.x,0];return!hu(n,ns,is,rs,Vo)||(n=[1,0,0,0,1,0,0,0,1],!hu(n,ns,is,rs,Vo))?!1:(Go.crossVectors(Gi,Wi),n=[Go.x,Go.y,Go.z],hu(n,ns,is,rs,Vo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new j,new j,new j,new j,new j,new j,new j,new j],Hn=new j,Ho=new _o,ns=new j,is=new j,rs=new j,Gi=new j,Wi=new j,Mr=new j,Ea=new j,Vo=new j,Go=new j,Er=new j;function hu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Er.fromArray(t,s);const o=r.x*Math.abs(Er.x)+r.y*Math.abs(Er.y)+r.z*Math.abs(Er.z),l=e.dot(Er),c=n.dot(Er),d=i.dot(Er);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const bS=new _o,Ta=new j,pu=new j;class xo{constructor(e=new j,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):bS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ta.subVectors(e,this.center);const n=Ta.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ta,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ta.copy(e.center).add(pu)),this.expandByPoint(Ta.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _i=new j,mu=new j,Wo=new j,ji=new j,gu=new j,jo=new j,vu=new j;class Rc{constructor(e=new j,n=new j(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=_i.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,n),_i.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){mu.copy(e).add(n).multiplyScalar(.5),Wo.copy(n).sub(e).normalize(),ji.copy(this.origin).sub(mu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Wo),o=ji.dot(this.direction),l=-ji.dot(Wo),c=ji.lengthSq(),d=Math.abs(1-a*a);let h,f,m,v;if(d>0)if(h=a*l-o,f=a*o-l,v=s*d,h>=0)if(f>=-v)if(f<=v){const _=1/d;h*=_,f*=_,m=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(mu).addScaledVector(Wo,f),m}intersectSphere(e,n){_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),r=_i.dot(_i)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,n,i,r,s){gu.subVectors(n,e),jo.subVectors(i,e),vu.crossVectors(gu,jo);let a=this.direction.dot(vu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ji.subVectors(this.origin,e);const l=o*this.direction.dot(jo.crossVectors(ji,jo));if(l<0)return null;const c=o*this.direction.dot(gu.cross(ji));if(c<0||l+c>a)return null;const d=-o*ji.dot(vu);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,n,i,r,s,a,o,l,c,d,h,f,m,v,_,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,d,h,f,m,v,_,p)}set(e,n,i,r,s,a,o,l,c,d,h,f,m,v,_,p){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=m,u[7]=v,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ss.setFromMatrixColumn(e,0).length(),s=1/ss.setFromMatrixColumn(e,1).length(),a=1/ss.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*d,m=a*h,v=o*d,_=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=m+v*c,n[5]=f-_*c,n[9]=-o*l,n[2]=_-f*c,n[6]=v+m*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*d,m=l*h,v=c*d,_=c*h;n[0]=f+_*o,n[4]=v*o-m,n[8]=a*c,n[1]=a*h,n[5]=a*d,n[9]=-o,n[2]=m*o-v,n[6]=_+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*d,m=l*h,v=c*d,_=c*h;n[0]=f-_*o,n[4]=-a*h,n[8]=v+m*o,n[1]=m+v*o,n[5]=a*d,n[9]=_-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*d,m=a*h,v=o*d,_=o*h;n[0]=l*d,n[4]=v*c-m,n[8]=f*c+_,n[1]=l*h,n[5]=_*c+f,n[9]=m*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,v=o*l,_=o*c;n[0]=l*d,n[4]=_-f*h,n[8]=v*h+m,n[1]=h,n[5]=a*d,n[9]=-o*d,n[2]=-c*d,n[6]=m*h+v,n[10]=f-_*h}else if(e.order==="XZY"){const f=a*l,m=a*c,v=o*l,_=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=f*h+_,n[5]=a*d,n[9]=m*h-v,n[2]=v*h-m,n[6]=o*d,n[10]=_*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(PS,e,LS)}lookAt(e,n,i){const r=this.elements;return _n.subVectors(e,n),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Xi.crossVectors(i,_n),Xi.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Xi.crossVectors(i,_n)),Xi.normalize(),Xo.crossVectors(_n,Xi),r[0]=Xi.x,r[4]=Xo.x,r[8]=_n.x,r[1]=Xi.y,r[5]=Xo.y,r[9]=_n.y,r[2]=Xi.z,r[6]=Xo.z,r[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],m=i[13],v=i[2],_=i[6],p=i[10],u=i[14],g=i[3],x=i[7],T=i[11],P=i[15],b=r[0],R=r[4],N=r[8],Y=r[12],S=r[1],A=r[5],G=r[9],V=r[13],te=r[2],ee=r[6],H=r[10],re=r[14],U=r[3],Q=r[7],se=r[11],ue=r[15];return s[0]=a*b+o*S+l*te+c*U,s[4]=a*R+o*A+l*ee+c*Q,s[8]=a*N+o*G+l*H+c*se,s[12]=a*Y+o*V+l*re+c*ue,s[1]=d*b+h*S+f*te+m*U,s[5]=d*R+h*A+f*ee+m*Q,s[9]=d*N+h*G+f*H+m*se,s[13]=d*Y+h*V+f*re+m*ue,s[2]=v*b+_*S+p*te+u*U,s[6]=v*R+_*A+p*ee+u*Q,s[10]=v*N+_*G+p*H+u*se,s[14]=v*Y+_*V+p*re+u*ue,s[3]=g*b+x*S+T*te+P*U,s[7]=g*R+x*A+T*ee+P*Q,s[11]=g*N+x*G+T*H+P*se,s[15]=g*Y+x*V+T*re+P*ue,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],m=e[14],v=e[3],_=e[7],p=e[11],u=e[15];return v*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*m-i*l*m)+_*(+n*l*m-n*c*f+s*a*f-r*a*m+r*c*d-s*l*d)+p*(+n*c*h-n*o*m-s*a*h+i*a*m+s*o*d-i*c*d)+u*(-r*o*d-n*l*h+n*o*f+r*a*h-i*a*f+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],m=e[11],v=e[12],_=e[13],p=e[14],u=e[15],g=h*p*c-_*f*c+_*l*m-o*p*m-h*l*u+o*f*u,x=v*f*c-d*p*c-v*l*m+a*p*m+d*l*u-a*f*u,T=d*_*c-v*h*c+v*o*m-a*_*m-d*o*u+a*h*u,P=v*h*l-d*_*l-v*o*f+a*_*f+d*o*p-a*h*p,b=n*g+i*x+r*T+s*P;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return e[0]=g*R,e[1]=(_*f*s-h*p*s-_*r*m+i*p*m+h*r*u-i*f*u)*R,e[2]=(o*p*s-_*l*s+_*r*c-i*p*c-o*r*u+i*l*u)*R,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*m-i*l*m)*R,e[4]=x*R,e[5]=(d*p*s-v*f*s+v*r*m-n*p*m-d*r*u+n*f*u)*R,e[6]=(v*l*s-a*p*s-v*r*c+n*p*c+a*r*u-n*l*u)*R,e[7]=(a*f*s-d*l*s+d*r*c-n*f*c-a*r*m+n*l*m)*R,e[8]=T*R,e[9]=(v*h*s-d*_*s-v*i*m+n*_*m+d*i*u-n*h*u)*R,e[10]=(a*_*s-v*o*s+v*i*c-n*_*c-a*i*u+n*o*u)*R,e[11]=(d*o*s-a*h*s-d*i*c+n*h*c+a*i*m-n*o*m)*R,e[12]=P*R,e[13]=(d*_*r-v*h*r+v*i*f-n*_*f-d*i*p+n*h*p)*R,e[14]=(v*o*r-a*_*r-v*i*l+n*_*l+a*i*p-n*o*p)*R,e[15]=(a*h*r-d*o*r+d*i*l-n*h*l-a*i*f+n*o*f)*R,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,d=a+a,h=o+o,f=s*c,m=s*d,v=s*h,_=a*d,p=a*h,u=o*h,g=l*c,x=l*d,T=l*h,P=i.x,b=i.y,R=i.z;return r[0]=(1-(_+u))*P,r[1]=(m+T)*P,r[2]=(v-x)*P,r[3]=0,r[4]=(m-T)*b,r[5]=(1-(f+u))*b,r[6]=(p+g)*b,r[7]=0,r[8]=(v+x)*R,r[9]=(p-g)*R,r[10]=(1-(f+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=ss.set(r[0],r[1],r[2]).length();const a=ss.set(r[4],r[5],r[6]).length(),o=ss.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vn.copy(this);const c=1/s,d=1/a,h=1/o;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=d,Vn.elements[5]*=d,Vn.elements[6]*=d,Vn.elements[8]*=h,Vn.elements[9]*=h,Vn.elements[10]*=h,n.setFromRotationMatrix(Vn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Ri){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),h=(n+e)/(n-e),f=(i+r)/(i-r);let m,v;if(o===Ri)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===sc)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Ri){const l=this.elements,c=1/(n-e),d=1/(i-r),h=1/(a-s),f=(n+e)*c,m=(i+r)*d;let v,_;if(o===Ri)v=(a+s)*h,_=-2*h;else if(o===sc)v=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ss=new j,Vn=new vt,PS=new j(0,0,0),LS=new j(1,1,1),Xi=new j,Xo=new j,_n=new j,nm=new vt,im=new vo;class hi{constructor(e=0,n=0,i=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(ln(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ln(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ln(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ln(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ln(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-ln(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return im.setFromEuler(this),this.setFromQuaternion(im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class bh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let NS=0;const rm=new j,as=new vo,xi=new vt,$o=new j,wa=new j,IS=new j,DS=new vo,sm=new j(1,0,0),am=new j(0,1,0),om=new j(0,0,1),lm={type:"added"},US={type:"removed"},os={type:"childadded",child:null},_u={type:"childremoved",child:null};class tn extends aa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:NS++}),this.uuid=go(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new j,n=new hi,i=new vo,r=new j(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new Xe}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return as.setFromAxisAngle(e,n),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,n){return as.setFromAxisAngle(e,n),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(sm,e)}rotateY(e){return this.rotateOnAxis(am,e)}rotateZ(e){return this.rotateOnAxis(om,e)}translateOnAxis(e,n){return rm.copy(e).applyQuaternion(this.quaternion),this.position.add(rm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(sm,e)}translateY(e){return this.translateOnAxis(am,e)}translateZ(e){return this.translateOnAxis(om,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?$o.copy(e):$o.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),wa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(wa,$o,this.up):xi.lookAt($o,wa,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),as.setFromRotationMatrix(xi),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lm),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(US),_u.child=e,this.dispatchEvent(_u),_u.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lm),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,e,IS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,DS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}tn.DEFAULT_UP=new j(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new j,yi=new j,xu=new j,Si=new j,ls=new j,cs=new j,cm=new j,yu=new j,Su=new j,Mu=new j,Eu=new Et,Tu=new Et,wu=new Et;class Yn{constructor(e=new j,n=new j,i=new j){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Gn.subVectors(e,n),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Gn.subVectors(r,n),yi.subVectors(i,n),xu.subVectors(e,n);const a=Gn.dot(Gn),o=Gn.dot(yi),l=Gn.dot(xu),c=yi.dot(yi),d=yi.dot(xu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,m=(c*l-o*d)*f,v=(a*d-o*l)*f;return s.set(1-m-v,v,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Si.x),l.addScaledVector(a,Si.y),l.addScaledVector(o,Si.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Eu.setScalar(0),Tu.setScalar(0),wu.setScalar(0),Eu.fromBufferAttribute(e,n),Tu.fromBufferAttribute(e,i),wu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Eu,s.x),a.addScaledVector(Tu,s.y),a.addScaledVector(wu,s.z),a}static isFrontFacing(e,n,i,r){return Gn.subVectors(i,n),yi.subVectors(e,n),Gn.cross(yi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Gn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Yn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Yn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ls.subVectors(r,i),cs.subVectors(s,i),yu.subVectors(e,i);const l=ls.dot(yu),c=cs.dot(yu);if(l<=0&&c<=0)return n.copy(i);Su.subVectors(e,r);const d=ls.dot(Su),h=cs.dot(Su);if(d>=0&&h<=d)return n.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),n.copy(i).addScaledVector(ls,a);Mu.subVectors(e,s);const m=ls.dot(Mu),v=cs.dot(Mu);if(v>=0&&m<=v)return n.copy(s);const _=m*c-l*v;if(_<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(cs,o);const p=d*v-m*h;if(p<=0&&h-d>=0&&m-v>=0)return cm.subVectors(s,r),o=(h-d)/(h-d+(m-v)),n.copy(r).addScaledVector(cm,o);const u=1/(p+_+f);return a=_*u,o=f*u,n.copy(i).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const b_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Yo={h:0,s:0,l:0};function Au(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class tt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=oi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=et.workingColorSpace){if(e=_S(e,1),n=ln(n,0,1),i=ln(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Au(a,s,e+1/3),this.g=Au(a,s,e),this.b=Au(a,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,n=oi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=oi){const i=b_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}copyLinearToSRGB(e){return this.r=uu(e.r),this.g=uu(e.g),this.b=uu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=oi){return et.fromWorkingColorSpace(Wt.copy(this),e),Math.round(ln(Wt.r*255,0,255))*65536+Math.round(ln(Wt.g*255,0,255))*256+Math.round(ln(Wt.b*255,0,255))}getHexString(e=oi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=et.workingColorSpace){return et.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=oi){et.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==oi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL($i),this.setHSL($i.h+e,$i.s+n,$i.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL($i),e.getHSL(Yo);const i=lu($i.h,Yo.h,n),r=lu($i.s,Yo.s,n),s=lu($i.l,Yo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new tt;tt.NAMES=b_;let FS=0;class oa extends aa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:FS++}),this.uuid=go(),this.name="",this.type="Material",this.blending=Os,this.side=pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nd,this.blendDst=Id,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(i.blending=this.blending),this.side!==pr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Nd&&(i.blendSrc=this.blendSrc),this.blendDst!==Id&&(i.blendDst=this.blendDst),this.blendEquation!==Nr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(i.stencilFail=this.stencilFail),this.stencilZFail!==es&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class oc extends oa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=h_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new j,Ko=new rt;class Jt{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=qp,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ko.fromBufferAttribute(this,n),Ko.applyMatrix3(e),this.setXY(n,Ko.x,Ko.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix3(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyMatrix4(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.applyNormalMatrix(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)wt.fromBufferAttribute(this,n),wt.transformDirection(e),this.setXYZ(n,wt.x,wt.y,wt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Sa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=an(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Sa(n,this.array)),n}setX(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Sa(n,this.array)),n}setY(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Sa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Sa(n,this.array)),n}setW(e,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=an(n,this.array),i=an(i,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qp&&(e.usage=this.usage),e}}class P_ extends Jt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class L_ extends Jt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Jn extends Jt{constructor(e,n,i){super(new Float32Array(e),n,i)}}let OS=0;const Rn=new vt,Cu=new tn,us=new j,xn=new _o,Aa=new _o,It=new j;class un extends aa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=go(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(A_(e)?L_:P_)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,n,i){return Rn.makeTranslation(e,n,i),this.applyMatrix4(Rn),this}scale(e,n,i){return Rn.makeScale(e,n,i),this.applyMatrix4(Rn),this}lookAt(e){return Cu.lookAt(e),Cu.updateMatrix(),this.applyMatrix4(Cu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Jn(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _o);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Aa.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(xn.min,Aa.min),xn.expandByPoint(It),It.addVectors(xn.max,Aa.max),xn.expandByPoint(It)):(xn.expandByPoint(Aa.min),xn.expandByPoint(Aa.max))}xn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)It.fromBufferAttribute(o,c),l&&(us.fromBufferAttribute(e,c),It.add(us)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<i.count;N++)o[N]=new j,l[N]=new j;const c=new j,d=new j,h=new j,f=new rt,m=new rt,v=new rt,_=new j,p=new j;function u(N,Y,S){c.fromBufferAttribute(i,N),d.fromBufferAttribute(i,Y),h.fromBufferAttribute(i,S),f.fromBufferAttribute(s,N),m.fromBufferAttribute(s,Y),v.fromBufferAttribute(s,S),d.sub(c),h.sub(c),m.sub(f),v.sub(f);const A=1/(m.x*v.y-v.x*m.y);isFinite(A)&&(_.copy(d).multiplyScalar(v.y).addScaledVector(h,-m.y).multiplyScalar(A),p.copy(h).multiplyScalar(m.x).addScaledVector(d,-v.x).multiplyScalar(A),o[N].add(_),o[Y].add(_),o[S].add(_),l[N].add(p),l[Y].add(p),l[S].add(p))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let N=0,Y=g.length;N<Y;++N){const S=g[N],A=S.start,G=S.count;for(let V=A,te=A+G;V<te;V+=3)u(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const x=new j,T=new j,P=new j,b=new j;function R(N){P.fromBufferAttribute(r,N),b.copy(P);const Y=o[N];x.copy(Y),x.sub(P.multiplyScalar(P.dot(Y))).normalize(),T.crossVectors(b,Y);const A=T.dot(l[N])<0?-1:1;a.setXYZW(N,x.x,x.y,x.z,A)}for(let N=0,Y=g.length;N<Y;++N){const S=g[N],A=S.start,G=S.count;for(let V=A,te=A+G;V<te;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Jt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new j,s=new j,a=new j,o=new j,l=new j,c=new j,d=new j,h=new j;if(e)for(let f=0,m=e.count;f<m;f+=3){const v=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,p),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=n.count;f<m;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)It.fromBufferAttribute(e,n),It.normalize(),e.setXYZ(n,It.x,It.y,It.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let m=0,v=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*d;for(let u=0;u<d;u++)f[v++]=c[m++]}return new Jt(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new un,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],m=e(f,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];d.push(m.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let f=0,m=h.length;f<m;f++)d.push(h[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const um=new vt,Tr=new Rc,qo=new xo,dm=new j,Zo=new j,Qo=new j,Jo=new j,Ru=new j,el=new j,fm=new j,tl=new j;class qn extends tn{constructor(e=new un,n=new oc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){el.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Ru.fromBufferAttribute(h,e),a?el.addScaledVector(Ru,d):el.addScaledVector(Ru.sub(n),d))}n.add(el)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qo.copy(i.boundingSphere),qo.applyMatrix4(s),Tr.copy(e.ray).recast(e.near),!(qo.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(qo,dm)===null||Tr.origin.distanceToSquared(dm)>(e.far-e.near)**2))&&(um.copy(s).invert(),Tr.copy(e.ray).applyMatrix4(um),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Tr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,_=f.length;v<_;v++){const p=f[v],u=a[p.materialIndex],g=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let T=g,P=x;T<P;T+=3){const b=o.getX(T),R=o.getX(T+1),N=o.getX(T+2);r=nl(this,u,e,i,c,d,h,b,R,N),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const v=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=v,u=_;p<u;p+=3){const g=o.getX(p),x=o.getX(p+1),T=o.getX(p+2);r=nl(this,a,e,i,c,d,h,g,x,T),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,_=f.length;v<_;v++){const p=f[v],u=a[p.materialIndex],g=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let T=g,P=x;T<P;T+=3){const b=T,R=T+1,N=T+2;r=nl(this,u,e,i,c,d,h,b,R,N),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const v=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=v,u=_;p<u;p+=3){const g=p,x=p+1,T=p+2;r=nl(this,a,e,i,c,d,h,g,x,T),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function kS(t,e,n,i,r,s,a,o){let l;if(e.side===pn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===pr,o),l===null)return null;tl.copy(o),tl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(tl);return c<n.near||c>n.far?null:{distance:c,point:tl.clone(),object:t}}function nl(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,Zo),t.getVertexPosition(l,Qo),t.getVertexPosition(c,Jo);const d=kS(t,e,n,i,Zo,Qo,Jo,fm);if(d){const h=new j;Yn.getBarycoord(fm,Zo,Qo,Jo,h),r&&(d.uv=Yn.getInterpolatedAttribute(r,o,l,c,h,new rt)),s&&(d.uv1=Yn.getInterpolatedAttribute(s,o,l,c,h,new rt)),a&&(d.normal=Yn.getInterpolatedAttribute(a,o,l,c,h,new j),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new j,materialIndex:0};Yn.getNormal(Zo,Qo,Jo,f.normal),d.face=f,d.barycoord=h}return d}class yo extends un{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],h=[];let f=0,m=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Jn(c,3)),this.setAttribute("normal",new Jn(d,3)),this.setAttribute("uv",new Jn(h,2));function v(_,p,u,g,x,T,P,b,R,N,Y){const S=T/R,A=P/N,G=T/2,V=P/2,te=b/2,ee=R+1,H=N+1;let re=0,U=0;const Q=new j;for(let se=0;se<H;se++){const ue=se*A-V;for(let Ae=0;Ae<ee;Ae++){const Fe=Ae*S-G;Q[_]=Fe*g,Q[p]=ue*x,Q[u]=te,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[p]=0,Q[u]=b>0?1:-1,d.push(Q.x,Q.y,Q.z),h.push(Ae/R),h.push(1-se/N),re+=1}}for(let se=0;se<N;se++)for(let ue=0;ue<R;ue++){const Ae=f+ue+ee*se,Fe=f+ue+ee*(se+1),Z=f+(ue+1)+ee*(se+1),ce=f+(ue+1)+ee*se;l.push(Ae,Fe,ce),l.push(Fe,Z,ce),U+=6}o.addGroup(m,U,Y),m+=U,f+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Zt(t){const e={};for(let n=0;n<t.length;n++){const i=Js(t[n]);for(const r in i)e[r]=i[r]}return e}function BS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function N_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const zS={clone:Js,merge:Zt};var HS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mr extends oa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=HS,this.fragmentShader=VS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=BS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class I_ extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Ri}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new j,hm=new rt,pm=new rt;class Ln extends I_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=_f*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ou*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _f*2*Math.atan(Math.tan(ou*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,n){return this.getViewBounds(e,hm,pm),n.subVectors(pm,hm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(ou*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ds=-90,fs=1;class GS extends tn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ln(ds,fs,e,n);r.layers=this.layers,this.add(r);const s=new Ln(ds,fs,e,n);s.layers=this.layers,this.add(s);const a=new Ln(ds,fs,e,n);a.layers=this.layers,this.add(a);const o=new Ln(ds,fs,e,n);o.layers=this.layers,this.add(o);const l=new Ln(ds,fs,e,n);l.layers=this.layers,this.add(l);const c=new Ln(ds,fs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===Ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(h,f,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class D_ extends mn{constructor(e,n,i,r,s,a,o,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:Ks,super(e,n,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class WS extends $r{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new D_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:$n}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new yo(5,5,5),s=new mr({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:ur});s.uniforms.tEquirect.value=n;const a=new qn(r,s),o=n.minFilter;return n.minFilter===kr&&(n.minFilter=$n),new GS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const bu=new j,jS=new j,XS=new Xe;class Pr{constructor(e=new j(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=bu.subVectors(i,n).cross(jS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(bu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||XS.getNormalMatrix(e),r=this.coplanarPoint(bu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wr=new xo,il=new j;class U_{constructor(e=new Pr,n=new Pr,i=new Pr,r=new Pr,s=new Pr,a=new Pr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ri){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],h=r[6],f=r[7],m=r[8],v=r[9],_=r[10],p=r[11],u=r[12],g=r[13],x=r[14],T=r[15];if(i[0].setComponents(l-s,f-c,p-m,T-u).normalize(),i[1].setComponents(l+s,f+c,p+m,T+u).normalize(),i[2].setComponents(l+a,f+d,p+v,T+g).normalize(),i[3].setComponents(l-a,f-d,p-v,T-g).normalize(),i[4].setComponents(l-o,f-h,p-_,T-x).normalize(),n===Ri)i[5].setComponents(l+o,f+h,p+_,T+x).normalize();else if(n===sc)i[5].setComponents(o,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wr)}intersectsSprite(e){return wr.center.set(0,0,0),wr.radius=.7071067811865476,wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(wr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(il.x=r.normal.x>0?e.max.x:e.min.x,il.y=r.normal.y>0?e.max.y:e.min.y,il.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(il)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function F_(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function $S(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,d);else{h.sort((m,v)=>m.start-v.start);let f=0;for(let m=1;m<h.length;m++){const v=h[f],_=h[m];_.start<=v.start+v.count+1?v.count=Math.max(v.count,_.start+_.count-v.start):(++f,h[f]=_)}h.length=f+1;for(let m=0,v=h.length;m<v;m++){const _=h[m];t.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class bc extends un{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,h=e/o,f=n/l,m=[],v=[],_=[],p=[];for(let u=0;u<d;u++){const g=u*f-a;for(let x=0;x<c;x++){const T=x*h-s;v.push(T,-g,0),_.push(0,0,1),p.push(x/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<o;g++){const x=g+c*u,T=g+c*(u+1),P=g+1+c*(u+1),b=g+1+c*u;m.push(x,T,b),m.push(T,P,b)}this.setIndex(m),this.setAttribute("position",new Jn(v,3)),this.setAttribute("normal",new Jn(_,3)),this.setAttribute("uv",new Jn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bc(e.width,e.height,e.widthSegments,e.heightSegments)}}var YS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,KS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ZS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,JS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,iM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,oM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_M=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,SM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,MM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,EM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TM="gl_FragColor = linearToOutputTexel( gl_FragColor );",wM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,CM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,RM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,PM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,LM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,IM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,DM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,FM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,OM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,BM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,VM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,GM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,WM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$M=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,YM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,KM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ZM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,JM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,iE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,aE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_E=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,SE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ME=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,EE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,PE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,LE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,NE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,DE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,UE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,FE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,OE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,BE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,HE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,VE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,GE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,XE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $E=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,YE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,QE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,e1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,t1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,n1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,l1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,f1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,p1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,m1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,M1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,w1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:YS,alphahash_pars_fragment:KS,alphamap_fragment:qS,alphamap_pars_fragment:ZS,alphatest_fragment:QS,alphatest_pars_fragment:JS,aomap_fragment:eM,aomap_pars_fragment:tM,batching_pars_vertex:nM,batching_vertex:iM,begin_vertex:rM,beginnormal_vertex:sM,bsdfs:aM,iridescence_fragment:oM,bumpmap_pars_fragment:lM,clipping_planes_fragment:cM,clipping_planes_pars_fragment:uM,clipping_planes_pars_vertex:dM,clipping_planes_vertex:fM,color_fragment:hM,color_pars_fragment:pM,color_pars_vertex:mM,color_vertex:gM,common:vM,cube_uv_reflection_fragment:_M,defaultnormal_vertex:xM,displacementmap_pars_vertex:yM,displacementmap_vertex:SM,emissivemap_fragment:MM,emissivemap_pars_fragment:EM,colorspace_fragment:TM,colorspace_pars_fragment:wM,envmap_fragment:AM,envmap_common_pars_fragment:CM,envmap_pars_fragment:RM,envmap_pars_vertex:bM,envmap_physical_pars_fragment:zM,envmap_vertex:PM,fog_vertex:LM,fog_pars_vertex:NM,fog_fragment:IM,fog_pars_fragment:DM,gradientmap_pars_fragment:UM,lightmap_pars_fragment:FM,lights_lambert_fragment:OM,lights_lambert_pars_fragment:kM,lights_pars_begin:BM,lights_toon_fragment:HM,lights_toon_pars_fragment:VM,lights_phong_fragment:GM,lights_phong_pars_fragment:WM,lights_physical_fragment:jM,lights_physical_pars_fragment:XM,lights_fragment_begin:$M,lights_fragment_maps:YM,lights_fragment_end:KM,logdepthbuf_fragment:qM,logdepthbuf_pars_fragment:ZM,logdepthbuf_pars_vertex:QM,logdepthbuf_vertex:JM,map_fragment:eE,map_pars_fragment:tE,map_particle_fragment:nE,map_particle_pars_fragment:iE,metalnessmap_fragment:rE,metalnessmap_pars_fragment:sE,morphinstance_vertex:aE,morphcolor_vertex:oE,morphnormal_vertex:lE,morphtarget_pars_vertex:cE,morphtarget_vertex:uE,normal_fragment_begin:dE,normal_fragment_maps:fE,normal_pars_fragment:hE,normal_pars_vertex:pE,normal_vertex:mE,normalmap_pars_fragment:gE,clearcoat_normal_fragment_begin:vE,clearcoat_normal_fragment_maps:_E,clearcoat_pars_fragment:xE,iridescence_pars_fragment:yE,opaque_fragment:SE,packing:ME,premultiplied_alpha_fragment:EE,project_vertex:TE,dithering_fragment:wE,dithering_pars_fragment:AE,roughnessmap_fragment:CE,roughnessmap_pars_fragment:RE,shadowmap_pars_fragment:bE,shadowmap_pars_vertex:PE,shadowmap_vertex:LE,shadowmask_pars_fragment:NE,skinbase_vertex:IE,skinning_pars_vertex:DE,skinning_vertex:UE,skinnormal_vertex:FE,specularmap_fragment:OE,specularmap_pars_fragment:kE,tonemapping_fragment:BE,tonemapping_pars_fragment:zE,transmission_fragment:HE,transmission_pars_fragment:VE,uv_pars_fragment:GE,uv_pars_vertex:WE,uv_vertex:jE,worldpos_vertex:XE,background_vert:$E,background_frag:YE,backgroundCube_vert:KE,backgroundCube_frag:qE,cube_vert:ZE,cube_frag:QE,depth_vert:JE,depth_frag:e1,distanceRGBA_vert:t1,distanceRGBA_frag:n1,equirect_vert:i1,equirect_frag:r1,linedashed_vert:s1,linedashed_frag:a1,meshbasic_vert:o1,meshbasic_frag:l1,meshlambert_vert:c1,meshlambert_frag:u1,meshmatcap_vert:d1,meshmatcap_frag:f1,meshnormal_vert:h1,meshnormal_frag:p1,meshphong_vert:m1,meshphong_frag:g1,meshphysical_vert:v1,meshphysical_frag:_1,meshtoon_vert:x1,meshtoon_frag:y1,points_vert:S1,points_frag:M1,shadow_vert:E1,shadow_frag:T1,sprite_vert:w1,sprite_frag:A1},Ee={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},li={basic:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Zt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Zt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Zt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new tt(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Zt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Zt([Ee.points,Ee.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Zt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Zt([Ee.common,Ee.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Zt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Zt([Ee.sprite,Ee.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Zt([Ee.common,Ee.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Zt([Ee.lights,Ee.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};li.physical={uniforms:Zt([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const rl={r:0,b:0,g:0},Ar=new hi,C1=new vt;function R1(t,e,n,i,r,s,a){const o=new tt(0);let l=s===!0?0:1,c,d,h=null,f=0,m=null;function v(g){let x=g.isScene===!0?g.background:null;return x&&x.isTexture&&(x=(g.backgroundBlurriness>0?n:e).get(x)),x}function _(g){let x=!1;const T=v(g);T===null?u(o,l):T&&T.isColor&&(u(T,1),x=!0);const P=t.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function p(g,x){const T=v(x);T&&(T.isCubeTexture||T.mapping===Ac)?(d===void 0&&(d=new qn(new yo(1,1,1),new mr({name:"BackgroundCubeMaterial",uniforms:Js(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Ar.copy(x.backgroundRotation),Ar.x*=-1,Ar.y*=-1,Ar.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ar.y*=-1,Ar.z*=-1),d.material.uniforms.envMap.value=T,d.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(C1.makeRotationFromEuler(Ar)),d.material.toneMapped=et.getTransfer(T.colorSpace)!==ut,(h!==T||f!==T.version||m!==t.toneMapping)&&(d.material.needsUpdate=!0,h=T,f=T.version,m=t.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new qn(new bc(2,2),new mr({name:"BackgroundMaterial",uniforms:Js(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:pr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=et.getTransfer(T.colorSpace)!==ut,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||f!==T.version||m!==t.toneMapping)&&(c.material.needsUpdate=!0,h=T,f=T.version,m=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function u(g,x){g.getRGB(rl,N_(t)),i.buffers.color.setClear(rl.r,rl.g,rl.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(g,x=1){o.set(g),l=x,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,u(o,l)},render:_,addToRenderList:p}}function b1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(S,A,G,V,te){let ee=!1;const H=h(V,G,A);s!==H&&(s=H,c(s.object)),ee=m(S,V,G,te),ee&&v(S,V,G,te),te!==null&&e.update(te,t.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,T(S,A,G,V),te!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(te).buffer))}function l(){return t.createVertexArray()}function c(S){return t.bindVertexArray(S)}function d(S){return t.deleteVertexArray(S)}function h(S,A,G){const V=G.wireframe===!0;let te=i[S.id];te===void 0&&(te={},i[S.id]=te);let ee=te[A.id];ee===void 0&&(ee={},te[A.id]=ee);let H=ee[V];return H===void 0&&(H=f(l()),ee[V]=H),H}function f(S){const A=[],G=[],V=[];for(let te=0;te<n;te++)A[te]=0,G[te]=0,V[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:G,attributeDivisors:V,object:S,attributes:{},index:null}}function m(S,A,G,V){const te=s.attributes,ee=A.attributes;let H=0;const re=G.getAttributes();for(const U in re)if(re[U].location>=0){const se=te[U];let ue=ee[U];if(ue===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),se===void 0||se.attribute!==ue||ue&&se.data!==ue.data)return!0;H++}return s.attributesNum!==H||s.index!==V}function v(S,A,G,V){const te={},ee=A.attributes;let H=0;const re=G.getAttributes();for(const U in re)if(re[U].location>=0){let se=ee[U];se===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(se=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(se=S.instanceColor));const ue={};ue.attribute=se,se&&se.data&&(ue.data=se.data),te[U]=ue,H++}s.attributes=te,s.attributesNum=H,s.index=V}function _(){const S=s.newAttributes;for(let A=0,G=S.length;A<G;A++)S[A]=0}function p(S){u(S,0)}function u(S,A){const G=s.newAttributes,V=s.enabledAttributes,te=s.attributeDivisors;G[S]=1,V[S]===0&&(t.enableVertexAttribArray(S),V[S]=1),te[S]!==A&&(t.vertexAttribDivisor(S,A),te[S]=A)}function g(){const S=s.newAttributes,A=s.enabledAttributes;for(let G=0,V=A.length;G<V;G++)A[G]!==S[G]&&(t.disableVertexAttribArray(G),A[G]=0)}function x(S,A,G,V,te,ee,H){H===!0?t.vertexAttribIPointer(S,A,G,te,ee):t.vertexAttribPointer(S,A,G,V,te,ee)}function T(S,A,G,V){_();const te=V.attributes,ee=G.getAttributes(),H=A.defaultAttributeValues;for(const re in ee){const U=ee[re];if(U.location>=0){let Q=te[re];if(Q===void 0&&(re==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),re==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),Q!==void 0){const se=Q.normalized,ue=Q.itemSize,Ae=e.get(Q);if(Ae===void 0)continue;const Fe=Ae.buffer,Z=Ae.type,ce=Ae.bytesPerElement,ge=Z===t.INT||Z===t.UNSIGNED_INT||Q.gpuType===Mh;if(Q.isInterleavedBufferAttribute){const ye=Q.data,Ie=ye.stride,Re=Q.offset;if(ye.isInstancedInterleavedBuffer){for(let Ve=0;Ve<U.locationSize;Ve++)u(U.location+Ve,ye.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let Ve=0;Ve<U.locationSize;Ve++)p(U.location+Ve);t.bindBuffer(t.ARRAY_BUFFER,Fe);for(let Ve=0;Ve<U.locationSize;Ve++)x(U.location+Ve,ue/U.locationSize,Z,se,Ie*ce,(Re+ue/U.locationSize*Ve)*ce,ge)}else{if(Q.isInstancedBufferAttribute){for(let ye=0;ye<U.locationSize;ye++)u(U.location+ye,Q.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ye=0;ye<U.locationSize;ye++)p(U.location+ye);t.bindBuffer(t.ARRAY_BUFFER,Fe);for(let ye=0;ye<U.locationSize;ye++)x(U.location+ye,ue/U.locationSize,Z,se,ue*ce,ue/U.locationSize*ye*ce,ge)}}else if(H!==void 0){const se=H[re];if(se!==void 0)switch(se.length){case 2:t.vertexAttrib2fv(U.location,se);break;case 3:t.vertexAttrib3fv(U.location,se);break;case 4:t.vertexAttrib4fv(U.location,se);break;default:t.vertexAttrib1fv(U.location,se)}}}}g()}function P(){N();for(const S in i){const A=i[S];for(const G in A){const V=A[G];for(const te in V)d(V[te].object),delete V[te];delete A[G]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const A=i[S.id];for(const G in A){const V=A[G];for(const te in V)d(V[te].object),delete V[te];delete A[G]}delete i[S.id]}function R(S){for(const A in i){const G=i[A];if(G[S.id]===void 0)continue;const V=G[S.id];for(const te in V)d(V[te].object),delete V[te];delete G[S.id]}}function N(){Y(),a=!0,s!==r&&(s=r,c(s.object))}function Y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:N,resetDefaultState:Y,dispose:P,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:g}}function P1(t,e,n){let i;function r(c){i=c}function s(c,d){t.drawArrays(i,c,d),n.update(d,i,1)}function a(c,d,h){h!==0&&(t.drawArraysInstanced(i,c,d,h),n.update(d,i,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let m=0;for(let v=0;v<h;v++)m+=d[v];n.update(m,i,1)}function l(c,d,h,f){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<c.length;v++)a(c[v],d[v],f[v]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let v=0;for(let _=0;_<h;_++)v+=d[_];for(let _=0;_<f.length;_++)n.update(v,i,f[_])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function L1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Kn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const N=R===mo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ui&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ci&&!N)}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const R=e.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),T=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),P=v>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:v,maxTextureSize:_,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:g,maxVaryings:x,maxFragmentUniforms:T,vertexTextures:P,maxSamples:b}}function N1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Pr,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,m){const v=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,u=t.get(h);if(!r||v===null||v.length===0||s&&!p)s?d(null):c();else{const g=s?0:i,x=g*4;let T=u.clippingState||null;l.value=T,T=d(v,f,x,m);for(let P=0;P!==x;++P)T[P]=n[P];u.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,m,v){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=l.value,v!==!0||p===null){const u=m+_*4,g=f.matrixWorldInverse;o.getNormalMatrix(g),(p===null||p.length<u)&&(p=new Float32Array(u));for(let x=0,T=m;x!==_;++x,T+=4)a.copy(h[x]).applyMatrix4(g,o),a.normal.toArray(p,T),p[T+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function I1(t){let e=new WeakMap;function n(a,o){return o===Hd?a.mapping=Ks:o===Vd&&(a.mapping=qs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Hd||o===Vd)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new WS(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class D1 extends I_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ps=4,mm=[.125,.215,.35,.446,.526,.582],Ir=20,Pu=new D1,gm=new tt;let Lu=null,Nu=0,Iu=0,Du=!1;const Lr=(1+Math.sqrt(5))/2,hs=1/Lr,vm=[new j(-Lr,hs,0),new j(Lr,hs,0),new j(-hs,0,Lr),new j(hs,0,Lr),new j(0,Lr,-hs),new j(0,Lr,hs),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class _m{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Lu=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ym(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lu,Nu,Iu),this._renderer.xr.enabled=Du,e.scissorTest=!1,sl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ks||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lu=this._renderer.getRenderTarget(),Nu=this._renderer.getActiveCubeFace(),Iu=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:mo,format:Kn,colorSpace:yr,depthBuffer:!1},r=xm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=U1(s)),this._blurMaterial=F1(s,e,n)}return r}_compileMaterial(e){const n=new qn(this._lodPlanes[0],e);this._renderer.compile(n,Pu)}_sceneToCubeUV(e,n,i,r){const o=new Ln(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(gm),d.toneMapping=dr,d.autoClear=!1;const m=new oc({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),v=new qn(new yo,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(gm),_=!0);for(let u=0;u<6;u++){const g=u%3;g===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):g===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const x=this._cubeSize;sl(r,g*x,u>2?x:0,x,x),d.setRenderTarget(r),_&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ks||e.mapping===qs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ym());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new qn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;sl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Pu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=vm[(r-s-1)%vm.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new qn(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Ir-1),_=s/v,p=isFinite(s)?1+Math.floor(d*_):Ir;p>Ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ir}`);const u=[];let g=0;for(let R=0;R<Ir;++R){const N=R/_,Y=Math.exp(-N*N/2);u.push(Y),R===0?g+=Y:R<p&&(g+=2*Y)}for(let R=0;R<u.length;R++)u[R]=u[R]/g;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=v,f.mipInt.value=x-i;const T=this._sizeLods[r],P=3*T*(r>x-Ps?r-x+Ps:0),b=4*(this._cubeSize-T);sl(n,P,b,3*T,2*T),l.setRenderTarget(n),l.render(h,Pu)}}function U1(t){const e=[],n=[],i=[];let r=t;const s=t-Ps+1+mm.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-Ps?l=mm[a-t+Ps-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],m=6,v=6,_=3,p=2,u=1,g=new Float32Array(_*v*m),x=new Float32Array(p*v*m),T=new Float32Array(u*v*m);for(let b=0;b<m;b++){const R=b%3*2/3-1,N=b>2?0:-1,Y=[R,N,0,R+2/3,N,0,R+2/3,N+1,0,R,N,0,R+2/3,N+1,0,R,N+1,0];g.set(Y,_*v*b),x.set(f,p*v*b);const S=[b,b,b,b,b,b];T.set(S,u*v*b)}const P=new un;P.setAttribute("position",new Jt(g,_)),P.setAttribute("uv",new Jt(x,p)),P.setAttribute("faceIndex",new Jt(T,u)),e.push(P),r>Ps&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function xm(t,e,n){const i=new $r(t,e,n);return i.texture.mapping=Ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function sl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function F1(t,e,n){const i=new Float32Array(Ir),r=new j(0,1,0);return new mr({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function ym(){return new mr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Sm(){return new mr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ph(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ur,depthTest:!1,depthWrite:!1})}function Ph(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function O1(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Hd||l===Vd,d=l===Ks||l===qs;if(c||d){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new _m(t)),h=c?n.fromEquirectangular(o,h):n.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(n===null&&(n=new _m(t)),h=c?n.fromEquirectangular(o):n.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function k1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Rl("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function B1(t,e,n,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const _=f.morphAttributes[v];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const v in f)e.update(f[v],t.ARRAY_BUFFER);const m=h.morphAttributes;for(const v in m){const _=m[v];for(let p=0,u=_.length;p<u;p++)e.update(_[p],t.ARRAY_BUFFER)}}function c(h){const f=[],m=h.index,v=h.attributes.position;let _=0;if(m!==null){const g=m.array;_=m.version;for(let x=0,T=g.length;x<T;x+=3){const P=g[x+0],b=g[x+1],R=g[x+2];f.push(P,b,b,R,R,P)}}else if(v!==void 0){const g=v.array;_=v.version;for(let x=0,T=g.length/3-1;x<T;x+=3){const P=x+0,b=x+1,R=x+2;f.push(P,b,b,R,R,P)}}else return;const p=new(A_(f)?L_:P_)(f,1);p.version=_;const u=s.get(h);u&&e.remove(u),s.set(h,p)}function d(h){const f=s.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function z1(t,e,n){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,m){t.drawElements(i,m,s,f*a),n.update(m,i,1)}function c(f,m,v){v!==0&&(t.drawElementsInstanced(i,m,s,f*a,v),n.update(m,i,v))}function d(f,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,f,0,v);let p=0;for(let u=0;u<v;u++)p+=m[u];n.update(p,i,1)}function h(f,m,v,_){if(v===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)c(f[u]/a,m[u],_[u]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,_,0,v);let u=0;for(let g=0;g<v;g++)u+=m[g];for(let g=0;g<_.length;g++)n.update(u,i,_[g])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function H1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function V1(t,e,n){const i=new WeakMap,r=new Et;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let S=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var m=S;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let T=0;v===!0&&(T=1),_===!0&&(T=2),p===!0&&(T=3);let P=o.attributes.position.count*T,b=1;P>e.maxTextureSize&&(b=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const R=new Float32Array(P*b*4*h),N=new R_(R,P,b,h);N.type=Ci,N.needsUpdate=!0;const Y=T*4;for(let A=0;A<h;A++){const G=u[A],V=g[A],te=x[A],ee=P*b*4*A;for(let H=0;H<G.count;H++){const re=H*Y;v===!0&&(r.fromBufferAttribute(G,H),R[ee+re+0]=r.x,R[ee+re+1]=r.y,R[ee+re+2]=r.z,R[ee+re+3]=0),_===!0&&(r.fromBufferAttribute(V,H),R[ee+re+4]=r.x,R[ee+re+5]=r.y,R[ee+re+6]=r.z,R[ee+re+7]=0),p===!0&&(r.fromBufferAttribute(te,H),R[ee+re+8]=r.x,R[ee+re+9]=r.y,R[ee+re+10]=r.z,R[ee+re+11]=te.itemSize===4?r.w:1)}}f={count:h,texture:N,size:new rt(P,b)},i.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let p=0;p<c.length;p++)v+=c[p];const _=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function G1(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}class O_ extends mn{constructor(e,n,i,r,s,a,o,l,c,d=ks){if(d!==ks&&d!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===ks&&(i=Xr),i===void 0&&d===Qs&&(i=Zs),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:In,this.minFilter=l!==void 0?l:In,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const k_=new mn,Mm=new O_(1,1),B_=new R_,z_=new RS,H_=new D_,Em=[],Tm=[],wm=new Float32Array(16),Am=new Float32Array(9),Cm=new Float32Array(4);function la(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Em[r];if(s===void 0&&(s=new Float32Array(r),Em[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Pt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Lt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Pc(t,e){let n=Tm[e];n===void 0&&(n=new Int32Array(e),Tm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function W1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function j1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2fv(this.addr,e),Lt(n,e)}}function X1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Pt(n,e))return;t.uniform3fv(this.addr,e),Lt(n,e)}}function $1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4fv(this.addr,e),Lt(n,e)}}function Y1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Cm.set(i),t.uniformMatrix2fv(this.addr,!1,Cm),Lt(n,i)}}function K1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;Am.set(i),t.uniformMatrix3fv(this.addr,!1,Am),Lt(n,i)}}function q1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Pt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Lt(n,e)}else{if(Pt(n,i))return;wm.set(i),t.uniformMatrix4fv(this.addr,!1,wm),Lt(n,i)}}function Z1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Q1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2iv(this.addr,e),Lt(n,e)}}function J1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3iv(this.addr,e),Lt(n,e)}}function eT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4iv(this.addr,e),Lt(n,e)}}function tT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function nT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Pt(n,e))return;t.uniform2uiv(this.addr,e),Lt(n,e)}}function iT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Pt(n,e))return;t.uniform3uiv(this.addr,e),Lt(n,e)}}function rT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Pt(n,e))return;t.uniform4uiv(this.addr,e),Lt(n,e)}}function sT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Mm.compareFunction=w_,s=Mm):s=k_,n.setTexture2D(e||s,r)}function aT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||z_,r)}function oT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||H_,r)}function lT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||B_,r)}function cT(t){switch(t){case 5126:return W1;case 35664:return j1;case 35665:return X1;case 35666:return $1;case 35674:return Y1;case 35675:return K1;case 35676:return q1;case 5124:case 35670:return Z1;case 35667:case 35671:return Q1;case 35668:case 35672:return J1;case 35669:case 35673:return eT;case 5125:return tT;case 36294:return nT;case 36295:return iT;case 36296:return rT;case 35678:case 36198:case 36298:case 36306:case 35682:return sT;case 35679:case 36299:case 36307:return aT;case 35680:case 36300:case 36308:case 36293:return oT;case 36289:case 36303:case 36311:case 36292:return lT}}function uT(t,e){t.uniform1fv(this.addr,e)}function dT(t,e){const n=la(e,this.size,2);t.uniform2fv(this.addr,n)}function fT(t,e){const n=la(e,this.size,3);t.uniform3fv(this.addr,n)}function hT(t,e){const n=la(e,this.size,4);t.uniform4fv(this.addr,n)}function pT(t,e){const n=la(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function mT(t,e){const n=la(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function gT(t,e){const n=la(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function vT(t,e){t.uniform1iv(this.addr,e)}function _T(t,e){t.uniform2iv(this.addr,e)}function xT(t,e){t.uniform3iv(this.addr,e)}function yT(t,e){t.uniform4iv(this.addr,e)}function ST(t,e){t.uniform1uiv(this.addr,e)}function MT(t,e){t.uniform2uiv(this.addr,e)}function ET(t,e){t.uniform3uiv(this.addr,e)}function TT(t,e){t.uniform4uiv(this.addr,e)}function wT(t,e,n){const i=this.cache,r=e.length,s=Pc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||k_,s[a])}function AT(t,e,n){const i=this.cache,r=e.length,s=Pc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||z_,s[a])}function CT(t,e,n){const i=this.cache,r=e.length,s=Pc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||H_,s[a])}function RT(t,e,n){const i=this.cache,r=e.length,s=Pc(n,r);Pt(i,s)||(t.uniform1iv(this.addr,s),Lt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||B_,s[a])}function bT(t){switch(t){case 5126:return uT;case 35664:return dT;case 35665:return fT;case 35666:return hT;case 35674:return pT;case 35675:return mT;case 35676:return gT;case 5124:case 35670:return vT;case 35667:case 35671:return _T;case 35668:case 35672:return xT;case 35669:case 35673:return yT;case 5125:return ST;case 36294:return MT;case 36295:return ET;case 36296:return TT;case 35678:case 36198:case 36298:case 36306:case 35682:return wT;case 35679:case 36299:case 36307:return AT;case 35680:case 36300:case 36308:case 36293:return CT;case 36289:case 36303:case 36311:case 36292:return RT}}class PT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=cT(n.type)}}class LT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=bT(n.type)}}class NT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Uu=/(\w+)(\])?(\[|\.)?/g;function Rm(t,e){t.seq.push(e),t.map[e.id]=e}function IT(t,e,n){const i=t.name,r=i.length;for(Uu.lastIndex=0;;){const s=Uu.exec(i),a=Uu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Rm(n,c===void 0?new PT(o,t,e):new LT(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new NT(o),Rm(n,h)),n=h}}}class bl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);IT(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function bm(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const DT=37297;let UT=0;function FT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function OT(t){const e=et.getPrimaries(et.workingColorSpace),n=et.getPrimaries(t);let i;switch(e===n?i="":e===rc&&n===ic?i="LinearDisplayP3ToLinearSRGB":e===ic&&n===rc&&(i="LinearSRGBToLinearDisplayP3"),t){case yr:case Cc:return[i,"LinearTransferOETF"];case oi:case Rh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Pm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+FT(t.getShaderSource(e),a)}else return r}function kT(t,e){const n=OT(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function BT(t,e){let n;switch(e){case Jy:n="Linear";break;case eS:n="Reinhard";break;case tS:n="Cineon";break;case nS:n="ACESFilmic";break;case rS:n="AgX";break;case sS:n="Neutral";break;case iS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const al=new j;function zT(){et.getLuminanceCoefficients(al);const t=al.x.toFixed(4),e=al.y.toFixed(4),n=al.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ia).join(`
`)}function VT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function GT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ia(t){return t!==""}function Lm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const WT=/^[ \t]*#include +<([\w\d./]+)>/gm;function xf(t){return t.replace(WT,XT)}const jT=new Map;function XT(t,e){let n=je[e];if(n===void 0){const i=jT.get(e);if(i!==void 0)n=je[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return xf(n)}const $T=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Im(t){return t.replace($T,YT)}function YT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Dm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function KT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===f_?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Ny?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function qT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ks:case qs:e="ENVMAP_TYPE_CUBE";break;case Ac:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ZT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case qs:e="ENVMAP_MODE_REFRACTION";break}return e}function QT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case h_:e="ENVMAP_BLENDING_MULTIPLY";break;case Zy:e="ENVMAP_BLENDING_MIX";break;case Qy:e="ENVMAP_BLENDING_ADD";break}return e}function JT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function ew(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=KT(n),c=qT(n),d=ZT(n),h=QT(n),f=JT(n),m=HT(n),v=VT(s),_=r.createProgram();let p,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ia).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ia).join(`
`),u.length>0&&(u+=`
`)):(p=[Dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ia).join(`
`),u=[Dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==dr?"#define TONE_MAPPING":"",n.toneMapping!==dr?je.tonemapping_pars_fragment:"",n.toneMapping!==dr?BT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,kT("linearToOutputTexel",n.outputColorSpace),zT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ia).join(`
`)),a=xf(a),a=Lm(a,n),a=Nm(a,n),o=xf(o),o=Lm(o,n),o=Nm(o,n),a=Im(a),o=Im(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",n.glslVersion===Zp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Zp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const x=g+p+a,T=g+u+o,P=bm(r,r.VERTEX_SHADER,x),b=bm(r,r.FRAGMENT_SHADER,T);r.attachShader(_,P),r.attachShader(_,b),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(A){if(t.debug.checkShaderErrors){const G=r.getProgramInfoLog(_).trim(),V=r.getShaderInfoLog(P).trim(),te=r.getShaderInfoLog(b).trim();let ee=!0,H=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ee=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,P,b);else{const re=Pm(r,P,"vertex"),U=Pm(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+G+`
`+re+`
`+U)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(V===""||te==="")&&(H=!1);H&&(A.diagnostics={runnable:ee,programLog:G,vertexShader:{log:V,prefix:p},fragmentShader:{log:te,prefix:u}})}r.deleteShader(P),r.deleteShader(b),N=new bl(r,_),Y=GT(r,_)}let N;this.getUniforms=function(){return N===void 0&&R(this),N};let Y;this.getAttributes=function(){return Y===void 0&&R(this),Y};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,DT)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=UT++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=b,this}let tw=0;class nw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new iw(e),n.set(e,i)),i}}class iw{constructor(e){this.id=tw++,this.code=e,this.usedTimes=0}}function rw(t,e,n,i,r,s,a){const o=new bh,l=new nw,c=new Set,d=[],h=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,m=r.vertexTextures;let v=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function u(S,A,G,V,te){const ee=V.fog,H=te.geometry,re=S.isMeshStandardMaterial?V.environment:null,U=(S.isMeshStandardMaterial?n:e).get(S.envMap||re),Q=U&&U.mapping===Ac?U.image.height:null,se=_[S.type];S.precision!==null&&(v=r.getMaxPrecision(S.precision),v!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",v,"instead."));const ue=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ae=ue!==void 0?ue.length:0;let Fe=0;H.morphAttributes.position!==void 0&&(Fe=1),H.morphAttributes.normal!==void 0&&(Fe=2),H.morphAttributes.color!==void 0&&(Fe=3);let Z,ce,ge,ye;if(se){const lt=li[se];Z=lt.vertexShader,ce=lt.fragmentShader}else Z=S.vertexShader,ce=S.fragmentShader,l.update(S),ge=l.getVertexShaderID(S),ye=l.getFragmentShaderID(S);const Ie=t.getRenderTarget(),Re=te.isInstancedMesh===!0,Ve=te.isBatchedMesh===!0,Ye=!!S.map,ze=!!S.matcap,O=!!U,Tt=!!S.aoMap,He=!!S.lightMap,Ge=!!S.bumpMap,De=!!S.normalMap,oe=!!S.displacementMap,q=!!S.emissiveMap,E=!!S.metalnessMap,y=!!S.roughnessMap,I=S.anisotropy>0,C=S.clearcoat>0,L=S.dispersion>0,F=S.iridescence>0,J=S.sheen>0,z=S.transmission>0,ne=I&&!!S.anisotropyMap,_e=C&&!!S.clearcoatMap,ie=C&&!!S.clearcoatNormalMap,ae=C&&!!S.clearcoatRoughnessMap,ve=F&&!!S.iridescenceMap,me=F&&!!S.iridescenceThicknessMap,fe=J&&!!S.sheenColorMap,Se=J&&!!S.sheenRoughnessMap,Ce=!!S.specularMap,Ne=!!S.specularColorMap,D=!!S.specularIntensityMap,de=z&&!!S.transmissionMap,W=z&&!!S.thicknessMap,K=!!S.gradientMap,le=!!S.alphaMap,xe=S.alphaTest>0,ke=!!S.alphaHash,We=!!S.extensions;let nt=dr;S.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(nt=t.toneMapping);const Be={shaderID:se,shaderType:S.type,shaderName:S.name,vertexShader:Z,fragmentShader:ce,defines:S.defines,customVertexShaderID:ge,customFragmentShaderID:ye,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:v,batching:Ve,batchingColor:Ve&&te._colorsTexture!==null,instancing:Re,instancingColor:Re&&te.instanceColor!==null,instancingMorph:Re&&te.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Ie===null?t.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:yr,alphaToCoverage:!!S.alphaToCoverage,map:Ye,matcap:ze,envMap:O,envMapMode:O&&U.mapping,envMapCubeUVHeight:Q,aoMap:Tt,lightMap:He,bumpMap:Ge,normalMap:De,displacementMap:m&&oe,emissiveMap:q,normalMapObjectSpace:De&&S.normalMapType===uS,normalMapTangentSpace:De&&S.normalMapType===cS,metalnessMap:E,roughnessMap:y,anisotropy:I,anisotropyMap:ne,clearcoat:C,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:L,iridescence:F,iridescenceMap:ve,iridescenceThicknessMap:me,sheen:J,sheenColorMap:fe,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:Ne,specularIntensityMap:D,transmission:z,transmissionMap:de,thicknessMap:W,gradientMap:K,opaque:S.transparent===!1&&S.blending===Os&&S.alphaToCoverage===!1,alphaMap:le,alphaTest:xe,alphaHash:ke,combine:S.combine,mapUv:Ye&&p(S.map.channel),aoMapUv:Tt&&p(S.aoMap.channel),lightMapUv:He&&p(S.lightMap.channel),bumpMapUv:Ge&&p(S.bumpMap.channel),normalMapUv:De&&p(S.normalMap.channel),displacementMapUv:oe&&p(S.displacementMap.channel),emissiveMapUv:q&&p(S.emissiveMap.channel),metalnessMapUv:E&&p(S.metalnessMap.channel),roughnessMapUv:y&&p(S.roughnessMap.channel),anisotropyMapUv:ne&&p(S.anisotropyMap.channel),clearcoatMapUv:_e&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:ie&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:me&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:Se&&p(S.sheenRoughnessMap.channel),specularMapUv:Ce&&p(S.specularMap.channel),specularColorMapUv:Ne&&p(S.specularColorMap.channel),specularIntensityMapUv:D&&p(S.specularIntensityMap.channel),transmissionMapUv:de&&p(S.transmissionMap.channel),thicknessMapUv:W&&p(S.thicknessMap.channel),alphaMapUv:le&&p(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(De||I),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:te.isPoints===!0&&!!H.attributes.uv&&(Ye||le),fog:!!ee,useFog:S.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:te.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:Fe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&G.length>0,shadowMapType:t.shadowMap.type,toneMapping:nt,decodeVideoTexture:Ye&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===ut,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ui,flipSided:S.side===pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:We&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&S.extensions.multiDraw===!0||Ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const G in S.defines)A.push(G),A.push(S.defines[G]);return S.isRawShaderMaterial===!1&&(x(A,S),T(A,S),A.push(t.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function x(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function T(S,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reverseDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.alphaToCoverage&&o.enable(20),S.push(o.mask)}function P(S){const A=_[S.type];let G;if(A){const V=li[A];G=zS.clone(V.uniforms)}else G=S.uniforms;return G}function b(S,A){let G;for(let V=0,te=d.length;V<te;V++){const ee=d[V];if(ee.cacheKey===A){G=ee,++G.usedTimes;break}}return G===void 0&&(G=new ew(t,A,S,s),d.push(G)),G}function R(S){if(--S.usedTimes===0){const A=d.indexOf(S);d[A]=d[d.length-1],d.pop(),S.destroy()}}function N(S){l.remove(S)}function Y(){l.dispose()}return{getParameters:u,getProgramCacheKey:g,getUniforms:P,acquireProgram:b,releaseProgram:R,releaseShaderCache:N,programs:d,dispose:Y}}function sw(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function aw(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Um(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Fm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(h,f,m,v,_,p){let u=t[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:m,groupOrder:v,renderOrder:h.renderOrder,z:_,group:p},t[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=m,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=_,u.group=p),e++,u}function o(h,f,m,v,_,p){const u=a(h,f,m,v,_,p);m.transmission>0?i.push(u):m.transparent===!0?r.push(u):n.push(u)}function l(h,f,m,v,_,p){const u=a(h,f,m,v,_,p);m.transmission>0?i.unshift(u):m.transparent===!0?r.unshift(u):n.unshift(u)}function c(h,f){n.length>1&&n.sort(h||aw),i.length>1&&i.sort(f||Um),r.length>1&&r.sort(f||Um)}function d(){for(let h=e,f=t.length;h<f;h++){const m=t[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function ow(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Fm,t.set(i,[a])):r>=s.length?(a=new Fm,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function lw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new j,color:new tt};break;case"SpotLight":n={position:new j,direction:new j,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new j,color:new tt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new j,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":n={color:new tt,position:new j,halfWidth:new j,halfHeight:new j};break}return t[e.id]=n,n}}}function cw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let uw=0;function dw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function fw(t){const e=new lw,n=cw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new j);const r=new j,s=new vt,a=new vt;function o(c){let d=0,h=0,f=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let m=0,v=0,_=0,p=0,u=0,g=0,x=0,T=0,P=0,b=0,R=0;c.sort(dw);for(let Y=0,S=c.length;Y<S;Y++){const A=c[Y],G=A.color,V=A.intensity,te=A.distance,ee=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=G.r*V,h+=G.g*V,f+=G.b*V;else if(A.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(A.sh.coefficients[H],V);R++}else if(A.isDirectionalLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const re=A.shadow,U=n.get(A);U.shadowIntensity=re.intensity,U.shadowBias=re.bias,U.shadowNormalBias=re.normalBias,U.shadowRadius=re.radius,U.shadowMapSize=re.mapSize,i.directionalShadow[m]=U,i.directionalShadowMap[m]=ee,i.directionalShadowMatrix[m]=A.shadow.matrix,g++}i.directional[m]=H,m++}else if(A.isSpotLight){const H=e.get(A);H.position.setFromMatrixPosition(A.matrixWorld),H.color.copy(G).multiplyScalar(V),H.distance=te,H.coneCos=Math.cos(A.angle),H.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),H.decay=A.decay,i.spot[_]=H;const re=A.shadow;if(A.map&&(i.spotLightMap[P]=A.map,P++,re.updateMatrices(A),A.castShadow&&b++),i.spotLightMatrix[_]=re.matrix,A.castShadow){const U=n.get(A);U.shadowIntensity=re.intensity,U.shadowBias=re.bias,U.shadowNormalBias=re.normalBias,U.shadowRadius=re.radius,U.shadowMapSize=re.mapSize,i.spotShadow[_]=U,i.spotShadowMap[_]=ee,T++}_++}else if(A.isRectAreaLight){const H=e.get(A);H.color.copy(G).multiplyScalar(V),H.halfWidth.set(A.width*.5,0,0),H.halfHeight.set(0,A.height*.5,0),i.rectArea[p]=H,p++}else if(A.isPointLight){const H=e.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),H.distance=A.distance,H.decay=A.decay,A.castShadow){const re=A.shadow,U=n.get(A);U.shadowIntensity=re.intensity,U.shadowBias=re.bias,U.shadowNormalBias=re.normalBias,U.shadowRadius=re.radius,U.shadowMapSize=re.mapSize,U.shadowCameraNear=re.camera.near,U.shadowCameraFar=re.camera.far,i.pointShadow[v]=U,i.pointShadowMap[v]=ee,i.pointShadowMatrix[v]=A.shadow.matrix,x++}i.point[v]=H,v++}else if(A.isHemisphereLight){const H=e.get(A);H.skyColor.copy(A.color).multiplyScalar(V),H.groundColor.copy(A.groundColor).multiplyScalar(V),i.hemi[u]=H,u++}}p>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const N=i.hash;(N.directionalLength!==m||N.pointLength!==v||N.spotLength!==_||N.rectAreaLength!==p||N.hemiLength!==u||N.numDirectionalShadows!==g||N.numPointShadows!==x||N.numSpotShadows!==T||N.numSpotMaps!==P||N.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=p,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=T+P-b,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,N.directionalLength=m,N.pointLength=v,N.spotLength=_,N.rectAreaLength=p,N.hemiLength=u,N.numDirectionalShadows=g,N.numPointShadows=x,N.numSpotShadows=T,N.numSpotMaps=P,N.numLightProbes=R,i.version=uw++)}function l(c,d){let h=0,f=0,m=0,v=0,_=0;const p=d.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){const x=c[u];if(x.isDirectionalLight){const T=i.directional[h];T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),h++}else if(x.isSpotLight){const T=i.spot[m];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),m++}else if(x.isRectAreaLight){const T=i.rectArea[v];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){const T=i.point[f];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const T=i.hemi[_];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:i}}function Om(t){const e=new fw(t),n=[],i=[];function r(d){c.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function a(d){i.push(d)}function o(){e.setup(n)}function l(d){e.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function hw(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Om(t),e.set(r,[o])):s>=a.length?(o=new Om(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class pw extends oa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mw extends oa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const gw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _w(t,e,n){let i=new U_;const r=new rt,s=new rt,a=new Et,o=new pw({depthPacking:lS}),l=new mw,c={},d=n.maxTextureSize,h={[pr]:pn,[pn]:pr,[ui]:ui},f=new mr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:gw,fragmentShader:vw}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const v=new un;v.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qn(v,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=f_;let u=this.type;this.render=function(b,R,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const Y=t.getRenderTarget(),S=t.getActiveCubeFace(),A=t.getActiveMipmapLevel(),G=t.state;G.setBlending(ur),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const V=u!==Mi&&this.type===Mi,te=u===Mi&&this.type!==Mi;for(let ee=0,H=b.length;ee<H;ee++){const re=b[ee],U=re.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const Q=U.getFrameExtents();if(r.multiply(Q),s.copy(U.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/Q.x),r.x=s.x*Q.x,U.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/Q.y),r.y=s.y*Q.y,U.mapSize.y=s.y)),U.map===null||V===!0||te===!0){const ue=this.type!==Mi?{minFilter:In,magFilter:In}:{};U.map!==null&&U.map.dispose(),U.map=new $r(r.x,r.y,ue),U.map.texture.name=re.name+".shadowMap",U.camera.updateProjectionMatrix()}t.setRenderTarget(U.map),t.clear();const se=U.getViewportCount();for(let ue=0;ue<se;ue++){const Ae=U.getViewport(ue);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),G.viewport(a),U.updateMatrices(re,ue),i=U.getFrustum(),T(R,N,U.camera,re,this.type)}U.isPointLightShadow!==!0&&this.type===Mi&&g(U,N),U.needsUpdate=!1}u=this.type,p.needsUpdate=!1,t.setRenderTarget(Y,S,A)};function g(b,R){const N=e.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new $r(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(R,null,N,f,_,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(R,null,N,m,_,null)}function x(b,R,N,Y){let S=null;const A=N.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)S=A;else if(S=N.isPointLight===!0?l:o,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const G=S.uuid,V=R.uuid;let te=c[G];te===void 0&&(te={},c[G]=te);let ee=te[V];ee===void 0&&(ee=S.clone(),te[V]=ee,R.addEventListener("dispose",P)),S=ee}if(S.visible=R.visible,S.wireframe=R.wireframe,Y===Mi?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:h[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,N.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const G=t.properties.get(S);G.light=N}return S}function T(b,R,N,Y,S){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Mi)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,b.matrixWorld);const V=e.update(b),te=b.material;if(Array.isArray(te)){const ee=V.groups;for(let H=0,re=ee.length;H<re;H++){const U=ee[H],Q=te[U.materialIndex];if(Q&&Q.visible){const se=x(b,Q,Y,S);b.onBeforeShadow(t,b,R,N,V,se,U),t.renderBufferDirect(N,null,V,se,b,U),b.onAfterShadow(t,b,R,N,V,se,U)}}}else if(te.visible){const ee=x(b,te,Y,S);b.onBeforeShadow(t,b,R,N,V,ee,null),t.renderBufferDirect(N,null,V,ee,b,null),b.onAfterShadow(t,b,R,N,V,ee,null)}}const G=b.children;for(let V=0,te=G.length;V<te;V++)T(G[V],R,N,Y,S)}function P(b){b.target.removeEventListener("dispose",P);for(const N in c){const Y=c[N],S=b.target.uuid;S in Y&&(Y[S].dispose(),delete Y[S])}}}const xw={[Dd]:Ud,[Fd]:Bd,[Od]:zd,[Ys]:kd,[Ud]:Dd,[Bd]:Fd,[zd]:Od,[kd]:Ys};function yw(t){function e(){let D=!1;const de=new Et;let W=null;const K=new Et(0,0,0,0);return{setMask:function(le){W!==le&&!D&&(t.colorMask(le,le,le,le),W=le)},setLocked:function(le){D=le},setClear:function(le,xe,ke,We,nt){nt===!0&&(le*=We,xe*=We,ke*=We),de.set(le,xe,ke,We),K.equals(de)===!1&&(t.clearColor(le,xe,ke,We),K.copy(de))},reset:function(){D=!1,W=null,K.set(-1,0,0,0)}}}function n(){let D=!1,de=!1,W=null,K=null,le=null;return{setReversed:function(xe){de=xe},setTest:function(xe){xe?ge(t.DEPTH_TEST):ye(t.DEPTH_TEST)},setMask:function(xe){W!==xe&&!D&&(t.depthMask(xe),W=xe)},setFunc:function(xe){if(de&&(xe=xw[xe]),K!==xe){switch(xe){case Dd:t.depthFunc(t.NEVER);break;case Ud:t.depthFunc(t.ALWAYS);break;case Fd:t.depthFunc(t.LESS);break;case Ys:t.depthFunc(t.LEQUAL);break;case Od:t.depthFunc(t.EQUAL);break;case kd:t.depthFunc(t.GEQUAL);break;case Bd:t.depthFunc(t.GREATER);break;case zd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}K=xe}},setLocked:function(xe){D=xe},setClear:function(xe){le!==xe&&(t.clearDepth(xe),le=xe)},reset:function(){D=!1,W=null,K=null,le=null}}}function i(){let D=!1,de=null,W=null,K=null,le=null,xe=null,ke=null,We=null,nt=null;return{setTest:function(Be){D||(Be?ge(t.STENCIL_TEST):ye(t.STENCIL_TEST))},setMask:function(Be){de!==Be&&!D&&(t.stencilMask(Be),de=Be)},setFunc:function(Be,lt,Ct){(W!==Be||K!==lt||le!==Ct)&&(t.stencilFunc(Be,lt,Ct),W=Be,K=lt,le=Ct)},setOp:function(Be,lt,Ct){(xe!==Be||ke!==lt||We!==Ct)&&(t.stencilOp(Be,lt,Ct),xe=Be,ke=lt,We=Ct)},setLocked:function(Be){D=Be},setClear:function(Be){nt!==Be&&(t.clearStencil(Be),nt=Be)},reset:function(){D=!1,de=null,W=null,K=null,le=null,xe=null,ke=null,We=null,nt=null}}}const r=new e,s=new n,a=new i,o=new WeakMap,l=new WeakMap;let c={},d={},h=new WeakMap,f=[],m=null,v=!1,_=null,p=null,u=null,g=null,x=null,T=null,P=null,b=new tt(0,0,0),R=0,N=!1,Y=null,S=null,A=null,G=null,V=null;const te=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,H=0;const re=t.getParameter(t.VERSION);re.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(re)[1]),ee=H>=1):re.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ee=H>=2);let U=null,Q={};const se=t.getParameter(t.SCISSOR_BOX),ue=t.getParameter(t.VIEWPORT),Ae=new Et().fromArray(se),Fe=new Et().fromArray(ue);function Z(D,de,W,K){const le=new Uint8Array(4),xe=t.createTexture();t.bindTexture(D,xe),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ke=0;ke<W;ke++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,K,0,t.RGBA,t.UNSIGNED_BYTE,le):t.texImage2D(de+ke,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,le);return xe}const ce={};ce[t.TEXTURE_2D]=Z(t.TEXTURE_2D,t.TEXTURE_2D,1),ce[t.TEXTURE_CUBE_MAP]=Z(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[t.TEXTURE_2D_ARRAY]=Z(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ce[t.TEXTURE_3D]=Z(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ge(t.DEPTH_TEST),s.setFunc(Ys),He(!1),Ge(jp),ge(t.CULL_FACE),O(ur);function ge(D){c[D]!==!0&&(t.enable(D),c[D]=!0)}function ye(D){c[D]!==!1&&(t.disable(D),c[D]=!1)}function Ie(D,de){return d[D]!==de?(t.bindFramebuffer(D,de),d[D]=de,D===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=de),D===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=de),!0):!1}function Re(D,de){let W=f,K=!1;if(D){W=h.get(de),W===void 0&&(W=[],h.set(de,W));const le=D.textures;if(W.length!==le.length||W[0]!==t.COLOR_ATTACHMENT0){for(let xe=0,ke=le.length;xe<ke;xe++)W[xe]=t.COLOR_ATTACHMENT0+xe;W.length=le.length,K=!0}}else W[0]!==t.BACK&&(W[0]=t.BACK,K=!0);K&&t.drawBuffers(W)}function Ve(D){return m!==D?(t.useProgram(D),m=D,!0):!1}const Ye={[Nr]:t.FUNC_ADD,[Dy]:t.FUNC_SUBTRACT,[Uy]:t.FUNC_REVERSE_SUBTRACT};Ye[Fy]=t.MIN,Ye[Oy]=t.MAX;const ze={[ky]:t.ZERO,[By]:t.ONE,[zy]:t.SRC_COLOR,[Nd]:t.SRC_ALPHA,[Xy]:t.SRC_ALPHA_SATURATE,[Wy]:t.DST_COLOR,[Vy]:t.DST_ALPHA,[Hy]:t.ONE_MINUS_SRC_COLOR,[Id]:t.ONE_MINUS_SRC_ALPHA,[jy]:t.ONE_MINUS_DST_COLOR,[Gy]:t.ONE_MINUS_DST_ALPHA,[$y]:t.CONSTANT_COLOR,[Yy]:t.ONE_MINUS_CONSTANT_COLOR,[Ky]:t.CONSTANT_ALPHA,[qy]:t.ONE_MINUS_CONSTANT_ALPHA};function O(D,de,W,K,le,xe,ke,We,nt,Be){if(D===ur){v===!0&&(ye(t.BLEND),v=!1);return}if(v===!1&&(ge(t.BLEND),v=!0),D!==Iy){if(D!==_||Be!==N){if((p!==Nr||x!==Nr)&&(t.blendEquation(t.FUNC_ADD),p=Nr,x=Nr),Be)switch(D){case Os:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xp:t.blendFunc(t.ONE,t.ONE);break;case $p:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Os:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case $p:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Yp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}u=null,g=null,T=null,P=null,b.set(0,0,0),R=0,_=D,N=Be}return}le=le||de,xe=xe||W,ke=ke||K,(de!==p||le!==x)&&(t.blendEquationSeparate(Ye[de],Ye[le]),p=de,x=le),(W!==u||K!==g||xe!==T||ke!==P)&&(t.blendFuncSeparate(ze[W],ze[K],ze[xe],ze[ke]),u=W,g=K,T=xe,P=ke),(We.equals(b)===!1||nt!==R)&&(t.blendColor(We.r,We.g,We.b,nt),b.copy(We),R=nt),_=D,N=!1}function Tt(D,de){D.side===ui?ye(t.CULL_FACE):ge(t.CULL_FACE);let W=D.side===pn;de&&(W=!W),He(W),D.blending===Os&&D.transparent===!1?O(ur):O(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),r.setMask(D.colorWrite);const K=D.stencilWrite;a.setTest(K),K&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),oe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ge(t.SAMPLE_ALPHA_TO_COVERAGE):ye(t.SAMPLE_ALPHA_TO_COVERAGE)}function He(D){Y!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),Y=D)}function Ge(D){D!==Py?(ge(t.CULL_FACE),D!==S&&(D===jp?t.cullFace(t.BACK):D===Ly?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ye(t.CULL_FACE),S=D}function De(D){D!==A&&(ee&&t.lineWidth(D),A=D)}function oe(D,de,W){D?(ge(t.POLYGON_OFFSET_FILL),(G!==de||V!==W)&&(t.polygonOffset(de,W),G=de,V=W)):ye(t.POLYGON_OFFSET_FILL)}function q(D){D?ge(t.SCISSOR_TEST):ye(t.SCISSOR_TEST)}function E(D){D===void 0&&(D=t.TEXTURE0+te-1),U!==D&&(t.activeTexture(D),U=D)}function y(D,de,W){W===void 0&&(U===null?W=t.TEXTURE0+te-1:W=U);let K=Q[W];K===void 0&&(K={type:void 0,texture:void 0},Q[W]=K),(K.type!==D||K.texture!==de)&&(U!==W&&(t.activeTexture(W),U=W),t.bindTexture(D,de||ce[D]),K.type=D,K.texture=de)}function I(){const D=Q[U];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function C(){try{t.compressedTexImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function L(){try{t.compressedTexImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{t.texSubImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{t.texSubImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(){try{t.texStorage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{t.texStorage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{t.texImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{t.texImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(D){Ae.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),Ae.copy(D))}function fe(D){Fe.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),Fe.copy(D))}function Se(D,de){let W=l.get(de);W===void 0&&(W=new WeakMap,l.set(de,W));let K=W.get(D);K===void 0&&(K=t.getUniformBlockIndex(de,D.name),W.set(D,K))}function Ce(D,de){const K=l.get(de).get(D);o.get(de)!==K&&(t.uniformBlockBinding(de,K,D.__bindingPointIndex),o.set(de,K))}function Ne(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},U=null,Q={},d={},h=new WeakMap,f=[],m=null,v=!1,_=null,p=null,u=null,g=null,x=null,T=null,P=null,b=new tt(0,0,0),R=0,N=!1,Y=null,S=null,A=null,G=null,V=null,Ae.set(0,0,t.canvas.width,t.canvas.height),Fe.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ge,disable:ye,bindFramebuffer:Ie,drawBuffers:Re,useProgram:Ve,setBlending:O,setMaterial:Tt,setFlipSided:He,setCullFace:Ge,setLineWidth:De,setPolygonOffset:oe,setScissorTest:q,activeTexture:E,bindTexture:y,unbindTexture:I,compressedTexImage2D:C,compressedTexImage3D:L,texImage2D:ae,texImage3D:ve,updateUBOMapping:Se,uniformBlockBinding:Ce,texStorage2D:_e,texStorage3D:ie,texSubImage2D:F,texSubImage3D:J,compressedTexSubImage2D:z,compressedTexSubImage3D:ne,scissor:me,viewport:fe,reset:Ne}}function km(t,e,n,i){const r=Sw(i);switch(n){case __:return t*e;case y_:return t*e;case S_:return t*e*2;case M_:return t*e/r.components*r.byteLength;case wh:return t*e/r.components*r.byteLength;case E_:return t*e*2/r.components*r.byteLength;case Ah:return t*e*2/r.components*r.byteLength;case x_:return t*e*3/r.components*r.byteLength;case Kn:return t*e*4/r.components*r.byteLength;case Ch:return t*e*4/r.components*r.byteLength;case El:case Tl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case wl:case Al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Xd:case Yd:return Math.max(t,16)*Math.max(e,8)/4;case jd:case $d:return Math.max(t,8)*Math.max(e,8)/2;case Kd:case qd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Zd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Qd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Jd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case ef:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case tf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case nf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case rf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case sf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case af:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case of:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case lf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case cf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case uf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case df:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case ff:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Cl:case hf:case pf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case T_:case mf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case gf:case vf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Sw(t){switch(t){case Ui:case m_:return{byteLength:1,components:1};case lo:case g_:case mo:return{byteLength:2,components:1};case Eh:case Th:return{byteLength:2,components:4};case Xr:case Mh:case Ci:return{byteLength:4,components:1};case v_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function Mw(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,d=new WeakMap;let h;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,y){return m?new OffscreenCanvas(E,y):ac("canvas")}function _(E,y,I){let C=1;const L=q(E);if((L.width>I||L.height>I)&&(C=I/Math.max(L.width,L.height)),C<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const F=Math.floor(C*L.width),J=Math.floor(C*L.height);h===void 0&&(h=v(F,J));const z=y?v(F,J):h;return z.width=F,z.height=J,z.getContext("2d").drawImage(E,0,0,F,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+F+"x"+J+")."),z}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),E;return E}function p(E){return E.generateMipmaps&&E.minFilter!==In&&E.minFilter!==$n}function u(E){t.generateMipmap(E)}function g(E,y,I,C,L=!1){if(E!==null){if(t[E]!==void 0)return t[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let F=y;if(y===t.RED&&(I===t.FLOAT&&(F=t.R32F),I===t.HALF_FLOAT&&(F=t.R16F),I===t.UNSIGNED_BYTE&&(F=t.R8)),y===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(F=t.R8UI),I===t.UNSIGNED_SHORT&&(F=t.R16UI),I===t.UNSIGNED_INT&&(F=t.R32UI),I===t.BYTE&&(F=t.R8I),I===t.SHORT&&(F=t.R16I),I===t.INT&&(F=t.R32I)),y===t.RG&&(I===t.FLOAT&&(F=t.RG32F),I===t.HALF_FLOAT&&(F=t.RG16F),I===t.UNSIGNED_BYTE&&(F=t.RG8)),y===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(F=t.RG8UI),I===t.UNSIGNED_SHORT&&(F=t.RG16UI),I===t.UNSIGNED_INT&&(F=t.RG32UI),I===t.BYTE&&(F=t.RG8I),I===t.SHORT&&(F=t.RG16I),I===t.INT&&(F=t.RG32I)),y===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(F=t.RGB8UI),I===t.UNSIGNED_SHORT&&(F=t.RGB16UI),I===t.UNSIGNED_INT&&(F=t.RGB32UI),I===t.BYTE&&(F=t.RGB8I),I===t.SHORT&&(F=t.RGB16I),I===t.INT&&(F=t.RGB32I)),y===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(F=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(F=t.RGBA16UI),I===t.UNSIGNED_INT&&(F=t.RGBA32UI),I===t.BYTE&&(F=t.RGBA8I),I===t.SHORT&&(F=t.RGBA16I),I===t.INT&&(F=t.RGBA32I)),y===t.RGB&&I===t.UNSIGNED_INT_5_9_9_9_REV&&(F=t.RGB9_E5),y===t.RGBA){const J=L?nc:et.getTransfer(C);I===t.FLOAT&&(F=t.RGBA32F),I===t.HALF_FLOAT&&(F=t.RGBA16F),I===t.UNSIGNED_BYTE&&(F=J===ut?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(F=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(F=t.RGB5_A1)}return(F===t.R16F||F===t.R32F||F===t.RG16F||F===t.RG32F||F===t.RGBA16F||F===t.RGBA32F)&&e.get("EXT_color_buffer_float"),F}function x(E,y){let I;return E?y===null||y===Xr||y===Zs?I=t.DEPTH24_STENCIL8:y===Ci?I=t.DEPTH32F_STENCIL8:y===lo&&(I=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Xr||y===Zs?I=t.DEPTH_COMPONENT24:y===Ci?I=t.DEPTH_COMPONENT32F:y===lo&&(I=t.DEPTH_COMPONENT16),I}function T(E,y){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==In&&E.minFilter!==$n?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function P(E){const y=E.target;y.removeEventListener("dispose",P),R(y),y.isVideoTexture&&d.delete(y)}function b(E){const y=E.target;y.removeEventListener("dispose",b),Y(y)}function R(E){const y=i.get(E);if(y.__webglInit===void 0)return;const I=E.source,C=f.get(I);if(C){const L=C[y.__cacheKey];L.usedTimes--,L.usedTimes===0&&N(E),Object.keys(C).length===0&&f.delete(I)}i.remove(E)}function N(E){const y=i.get(E);t.deleteTexture(y.__webglTexture);const I=E.source,C=f.get(I);delete C[y.__cacheKey],a.memory.textures--}function Y(E){const y=i.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let C=0;C<6;C++){if(Array.isArray(y.__webglFramebuffer[C]))for(let L=0;L<y.__webglFramebuffer[C].length;L++)t.deleteFramebuffer(y.__webglFramebuffer[C][L]);else t.deleteFramebuffer(y.__webglFramebuffer[C]);y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer[C])}else{if(Array.isArray(y.__webglFramebuffer))for(let C=0;C<y.__webglFramebuffer.length;C++)t.deleteFramebuffer(y.__webglFramebuffer[C]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&t.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let C=0;C<y.__webglColorRenderbuffer.length;C++)y.__webglColorRenderbuffer[C]&&t.deleteRenderbuffer(y.__webglColorRenderbuffer[C]);y.__webglDepthRenderbuffer&&t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const I=E.textures;for(let C=0,L=I.length;C<L;C++){const F=i.get(I[C]);F.__webglTexture&&(t.deleteTexture(F.__webglTexture),a.memory.textures--),i.remove(I[C])}i.remove(E)}let S=0;function A(){S=0}function G(){const E=S;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),S+=1,E}function V(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function te(E,y){const I=i.get(E);if(E.isVideoTexture&&De(E),E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){const C=E.image;if(C===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(C.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Fe(I,E,y);return}}n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+y)}function ee(E,y){const I=i.get(E);if(E.version>0&&I.__version!==E.version){Fe(I,E,y);return}n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+y)}function H(E,y){const I=i.get(E);if(E.version>0&&I.__version!==E.version){Fe(I,E,y);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+y)}function re(E,y){const I=i.get(E);if(E.version>0&&I.__version!==E.version){Z(I,E,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+y)}const U={[Gd]:t.REPEAT,[Or]:t.CLAMP_TO_EDGE,[Wd]:t.MIRRORED_REPEAT},Q={[In]:t.NEAREST,[aS]:t.NEAREST_MIPMAP_NEAREST,[zo]:t.NEAREST_MIPMAP_LINEAR,[$n]:t.LINEAR,[au]:t.LINEAR_MIPMAP_NEAREST,[kr]:t.LINEAR_MIPMAP_LINEAR},se={[dS]:t.NEVER,[vS]:t.ALWAYS,[fS]:t.LESS,[w_]:t.LEQUAL,[hS]:t.EQUAL,[gS]:t.GEQUAL,[pS]:t.GREATER,[mS]:t.NOTEQUAL};function ue(E,y){if(y.type===Ci&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===$n||y.magFilter===au||y.magFilter===zo||y.magFilter===kr||y.minFilter===$n||y.minFilter===au||y.minFilter===zo||y.minFilter===kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(E,t.TEXTURE_WRAP_S,U[y.wrapS]),t.texParameteri(E,t.TEXTURE_WRAP_T,U[y.wrapT]),(E===t.TEXTURE_3D||E===t.TEXTURE_2D_ARRAY)&&t.texParameteri(E,t.TEXTURE_WRAP_R,U[y.wrapR]),t.texParameteri(E,t.TEXTURE_MAG_FILTER,Q[y.magFilter]),t.texParameteri(E,t.TEXTURE_MIN_FILTER,Q[y.minFilter]),y.compareFunction&&(t.texParameteri(E,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(E,t.TEXTURE_COMPARE_FUNC,se[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===In||y.minFilter!==zo&&y.minFilter!==kr||y.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Ae(E,y){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",P));const C=y.source;let L=f.get(C);L===void 0&&(L={},f.set(C,L));const F=V(y);if(F!==E.__cacheKey){L[F]===void 0&&(L[F]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,I=!0),L[F].usedTimes++;const J=L[E.__cacheKey];J!==void 0&&(L[E.__cacheKey].usedTimes--,J.usedTimes===0&&N(y)),E.__cacheKey=F,E.__webglTexture=L[F].texture}return I}function Fe(E,y,I){let C=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(C=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(C=t.TEXTURE_3D);const L=Ae(E,y),F=y.source;n.bindTexture(C,E.__webglTexture,t.TEXTURE0+I);const J=i.get(F);if(F.version!==J.__version||L===!0){n.activeTexture(t.TEXTURE0+I);const z=et.getPrimaries(et.workingColorSpace),ne=y.colorSpace===Ji?null:et.getPrimaries(y.colorSpace),_e=y.colorSpace===Ji||z===ne?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let ie=_(y.image,!1,r.maxTextureSize);ie=oe(y,ie);const ae=s.convert(y.format,y.colorSpace),ve=s.convert(y.type);let me=g(y.internalFormat,ae,ve,y.colorSpace,y.isVideoTexture);ue(C,y);let fe;const Se=y.mipmaps,Ce=y.isVideoTexture!==!0,Ne=J.__version===void 0||L===!0,D=F.dataReady,de=T(y,ie);if(y.isDepthTexture)me=x(y.format===Qs,y.type),Ne&&(Ce?n.texStorage2D(t.TEXTURE_2D,1,me,ie.width,ie.height):n.texImage2D(t.TEXTURE_2D,0,me,ie.width,ie.height,0,ae,ve,null));else if(y.isDataTexture)if(Se.length>0){Ce&&Ne&&n.texStorage2D(t.TEXTURE_2D,de,me,Se[0].width,Se[0].height);for(let W=0,K=Se.length;W<K;W++)fe=Se[W],Ce?D&&n.texSubImage2D(t.TEXTURE_2D,W,0,0,fe.width,fe.height,ae,ve,fe.data):n.texImage2D(t.TEXTURE_2D,W,me,fe.width,fe.height,0,ae,ve,fe.data);y.generateMipmaps=!1}else Ce?(Ne&&n.texStorage2D(t.TEXTURE_2D,de,me,ie.width,ie.height),D&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie.width,ie.height,ae,ve,ie.data)):n.texImage2D(t.TEXTURE_2D,0,me,ie.width,ie.height,0,ae,ve,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ce&&Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,me,Se[0].width,Se[0].height,ie.depth);for(let W=0,K=Se.length;W<K;W++)if(fe=Se[W],y.format!==Kn)if(ae!==null)if(Ce){if(D)if(y.layerUpdates.size>0){const le=km(fe.width,fe.height,y.format,y.type);for(const xe of y.layerUpdates){const ke=fe.data.subarray(xe*le/fe.data.BYTES_PER_ELEMENT,(xe+1)*le/fe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,W,0,0,xe,fe.width,fe.height,1,ae,ke,0,0)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,W,0,0,0,fe.width,fe.height,ie.depth,ae,fe.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,W,me,fe.width,fe.height,ie.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?D&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,W,0,0,0,fe.width,fe.height,ie.depth,ae,ve,fe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,W,me,fe.width,fe.height,ie.depth,0,ae,ve,fe.data)}else{Ce&&Ne&&n.texStorage2D(t.TEXTURE_2D,de,me,Se[0].width,Se[0].height);for(let W=0,K=Se.length;W<K;W++)fe=Se[W],y.format!==Kn?ae!==null?Ce?D&&n.compressedTexSubImage2D(t.TEXTURE_2D,W,0,0,fe.width,fe.height,ae,fe.data):n.compressedTexImage2D(t.TEXTURE_2D,W,me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?D&&n.texSubImage2D(t.TEXTURE_2D,W,0,0,fe.width,fe.height,ae,ve,fe.data):n.texImage2D(t.TEXTURE_2D,W,me,fe.width,fe.height,0,ae,ve,fe.data)}else if(y.isDataArrayTexture)if(Ce){if(Ne&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,me,ie.width,ie.height,ie.depth),D)if(y.layerUpdates.size>0){const W=km(ie.width,ie.height,y.format,y.type);for(const K of y.layerUpdates){const le=ie.data.subarray(K*W/ie.data.BYTES_PER_ELEMENT,(K+1)*W/ie.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,K,ie.width,ie.height,1,ae,ve,le)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ae,ve,ie.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,me,ie.width,ie.height,ie.depth,0,ae,ve,ie.data);else if(y.isData3DTexture)Ce?(Ne&&n.texStorage3D(t.TEXTURE_3D,de,me,ie.width,ie.height,ie.depth),D&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ae,ve,ie.data)):n.texImage3D(t.TEXTURE_3D,0,me,ie.width,ie.height,ie.depth,0,ae,ve,ie.data);else if(y.isFramebufferTexture){if(Ne)if(Ce)n.texStorage2D(t.TEXTURE_2D,de,me,ie.width,ie.height);else{let W=ie.width,K=ie.height;for(let le=0;le<de;le++)n.texImage2D(t.TEXTURE_2D,le,me,W,K,0,ae,ve,null),W>>=1,K>>=1}}else if(Se.length>0){if(Ce&&Ne){const W=q(Se[0]);n.texStorage2D(t.TEXTURE_2D,de,me,W.width,W.height)}for(let W=0,K=Se.length;W<K;W++)fe=Se[W],Ce?D&&n.texSubImage2D(t.TEXTURE_2D,W,0,0,ae,ve,fe):n.texImage2D(t.TEXTURE_2D,W,me,ae,ve,fe);y.generateMipmaps=!1}else if(Ce){if(Ne){const W=q(ie);n.texStorage2D(t.TEXTURE_2D,de,me,W.width,W.height)}D&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ae,ve,ie)}else n.texImage2D(t.TEXTURE_2D,0,me,ae,ve,ie);p(y)&&u(C),J.__version=F.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function Z(E,y,I){if(y.image.length!==6)return;const C=Ae(E,y),L=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,E.__webglTexture,t.TEXTURE0+I);const F=i.get(L);if(L.version!==F.__version||C===!0){n.activeTexture(t.TEXTURE0+I);const J=et.getPrimaries(et.workingColorSpace),z=y.colorSpace===Ji?null:et.getPrimaries(y.colorSpace),ne=y.colorSpace===Ji||J===z?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const _e=y.isCompressedTexture||y.image[0].isCompressedTexture,ie=y.image[0]&&y.image[0].isDataTexture,ae=[];for(let K=0;K<6;K++)!_e&&!ie?ae[K]=_(y.image[K],!0,r.maxCubemapSize):ae[K]=ie?y.image[K].image:y.image[K],ae[K]=oe(y,ae[K]);const ve=ae[0],me=s.convert(y.format,y.colorSpace),fe=s.convert(y.type),Se=g(y.internalFormat,me,fe,y.colorSpace),Ce=y.isVideoTexture!==!0,Ne=F.__version===void 0||C===!0,D=L.dataReady;let de=T(y,ve);ue(t.TEXTURE_CUBE_MAP,y);let W;if(_e){Ce&&Ne&&n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Se,ve.width,ve.height);for(let K=0;K<6;K++){W=ae[K].mipmaps;for(let le=0;le<W.length;le++){const xe=W[le];y.format!==Kn?me!==null?Ce?D&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le,0,0,xe.width,xe.height,me,xe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le,Se,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ce?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le,0,0,xe.width,xe.height,me,fe,xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le,Se,xe.width,xe.height,0,me,fe,xe.data)}}}else{if(W=y.mipmaps,Ce&&Ne){W.length>0&&de++;const K=q(ae[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Se,K.width,K.height)}for(let K=0;K<6;K++)if(ie){Ce?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ae[K].width,ae[K].height,me,fe,ae[K].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Se,ae[K].width,ae[K].height,0,me,fe,ae[K].data);for(let le=0;le<W.length;le++){const ke=W[le].image[K].image;Ce?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le+1,0,0,ke.width,ke.height,me,fe,ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le+1,Se,ke.width,ke.height,0,me,fe,ke.data)}}else{Ce?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,me,fe,ae[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Se,me,fe,ae[K]);for(let le=0;le<W.length;le++){const xe=W[le];Ce?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le+1,0,0,me,fe,xe.image[K]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+K,le+1,Se,me,fe,xe.image[K])}}}p(y)&&u(t.TEXTURE_CUBE_MAP),F.__version=L.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ce(E,y,I,C,L,F){const J=s.convert(I.format,I.colorSpace),z=s.convert(I.type),ne=g(I.internalFormat,J,z,I.colorSpace);if(!i.get(y).__hasExternalTextures){const ie=Math.max(1,y.width>>F),ae=Math.max(1,y.height>>F);L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?n.texImage3D(L,F,ne,ie,ae,y.depth,0,J,z,null):n.texImage2D(L,F,ne,ie,ae,0,J,z,null)}n.bindFramebuffer(t.FRAMEBUFFER,E),Ge(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,C,L,i.get(I).__webglTexture,0,He(y)):(L===t.TEXTURE_2D||L>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&L<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,C,L,i.get(I).__webglTexture,F),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ge(E,y,I){if(t.bindRenderbuffer(t.RENDERBUFFER,E),y.depthBuffer){const C=y.depthTexture,L=C&&C.isDepthTexture?C.type:null,F=x(y.stencilBuffer,L),J=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,z=He(y);Ge(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,z,F,y.width,y.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,z,F,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,F,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,E)}else{const C=y.textures;for(let L=0;L<C.length;L++){const F=C[L],J=s.convert(F.format,F.colorSpace),z=s.convert(F.type),ne=g(F.internalFormat,J,z,F.colorSpace),_e=He(y);I&&Ge(y)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,ne,y.width,y.height):Ge(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,_e,ne,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,ne,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ye(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),te(y.depthTexture,0);const C=i.get(y.depthTexture).__webglTexture,L=He(y);if(y.depthTexture.format===ks)Ge(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,C,0,L):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,C,0);else if(y.depthTexture.format===Qs)Ge(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,C,0,L):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,C,0);else throw new Error("Unknown depthTexture format")}function Ie(E){const y=i.get(E),I=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const C=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),C){const L=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,C.removeEventListener("dispose",L)};C.addEventListener("dispose",L),y.__depthDisposeCallback=L}y.__boundDepthTexture=C}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");ye(y.__webglFramebuffer,E)}else if(I){y.__webglDepthbuffer=[];for(let C=0;C<6;C++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[C]),y.__webglDepthbuffer[C]===void 0)y.__webglDepthbuffer[C]=t.createRenderbuffer(),ge(y.__webglDepthbuffer[C],E,!1);else{const L=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,F=y.__webglDepthbuffer[C];t.bindRenderbuffer(t.RENDERBUFFER,F),t.framebufferRenderbuffer(t.FRAMEBUFFER,L,t.RENDERBUFFER,F)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),ge(y.__webglDepthbuffer,E,!1);else{const C=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,L=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,L),t.framebufferRenderbuffer(t.FRAMEBUFFER,C,t.RENDERBUFFER,L)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Re(E,y,I){const C=i.get(E);y!==void 0&&ce(C.__webglFramebuffer,E,E.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&Ie(E)}function Ve(E){const y=E.texture,I=i.get(E),C=i.get(y);E.addEventListener("dispose",b);const L=E.textures,F=E.isWebGLCubeRenderTarget===!0,J=L.length>1;if(J||(C.__webglTexture===void 0&&(C.__webglTexture=t.createTexture()),C.__version=y.version,a.memory.textures++),F){I.__webglFramebuffer=[];for(let z=0;z<6;z++)if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer[z]=[];for(let ne=0;ne<y.mipmaps.length;ne++)I.__webglFramebuffer[z][ne]=t.createFramebuffer()}else I.__webglFramebuffer[z]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer=[];for(let z=0;z<y.mipmaps.length;z++)I.__webglFramebuffer[z]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(J)for(let z=0,ne=L.length;z<ne;z++){const _e=i.get(L[z]);_e.__webglTexture===void 0&&(_e.__webglTexture=t.createTexture(),a.memory.textures++)}if(E.samples>0&&Ge(E)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let z=0;z<L.length;z++){const ne=L[z];I.__webglColorRenderbuffer[z]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[z]);const _e=s.convert(ne.format,ne.colorSpace),ie=s.convert(ne.type),ae=g(ne.internalFormat,_e,ie,ne.colorSpace,E.isXRRenderTarget===!0),ve=He(E);t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,ae,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+z,t.RENDERBUFFER,I.__webglColorRenderbuffer[z])}t.bindRenderbuffer(t.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),ge(I.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(F){n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture),ue(t.TEXTURE_CUBE_MAP,y);for(let z=0;z<6;z++)if(y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ce(I.__webglFramebuffer[z][ne],E,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+z,ne);else ce(I.__webglFramebuffer[z],E,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);p(y)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(J){for(let z=0,ne=L.length;z<ne;z++){const _e=L[z],ie=i.get(_e);n.bindTexture(t.TEXTURE_2D,ie.__webglTexture),ue(t.TEXTURE_2D,_e),ce(I.__webglFramebuffer,E,_e,t.COLOR_ATTACHMENT0+z,t.TEXTURE_2D,0),p(_e)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let z=t.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(z=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(z,C.__webglTexture),ue(z,y),y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ce(I.__webglFramebuffer[ne],E,y,t.COLOR_ATTACHMENT0,z,ne);else ce(I.__webglFramebuffer,E,y,t.COLOR_ATTACHMENT0,z,0);p(y)&&u(z),n.unbindTexture()}E.depthBuffer&&Ie(E)}function Ye(E){const y=E.textures;for(let I=0,C=y.length;I<C;I++){const L=y[I];if(p(L)){const F=E.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,J=i.get(L).__webglTexture;n.bindTexture(F,J),u(F),n.unbindTexture()}}}const ze=[],O=[];function Tt(E){if(E.samples>0){if(Ge(E)===!1){const y=E.textures,I=E.width,C=E.height;let L=t.COLOR_BUFFER_BIT;const F=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,J=i.get(E),z=y.length>1;if(z)for(let ne=0;ne<y.length;ne++)n.bindFramebuffer(t.FRAMEBUFFER,J.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,J.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let ne=0;ne<y.length;ne++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(L|=t.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(L|=t.STENCIL_BUFFER_BIT)),z){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,J.__webglColorRenderbuffer[ne]);const _e=i.get(y[ne]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,_e,0)}t.blitFramebuffer(0,0,I,C,0,0,I,C,L,t.NEAREST),l===!0&&(ze.length=0,O.length=0,ze.push(t.COLOR_ATTACHMENT0+ne),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ze.push(F),O.push(F),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,O)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ze))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),z)for(let ne=0;ne<y.length;ne++){n.bindFramebuffer(t.FRAMEBUFFER,J.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.RENDERBUFFER,J.__webglColorRenderbuffer[ne]);const _e=i.get(y[ne]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,J.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.TEXTURE_2D,_e,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const y=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function He(E){return Math.min(r.maxSamples,E.samples)}function Ge(E){const y=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function De(E){const y=a.render.frame;d.get(E)!==y&&(d.set(E,y),E.update())}function oe(E,y){const I=E.colorSpace,C=E.format,L=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==yr&&I!==Ji&&(et.getTransfer(I)===ut?(C!==Kn||L!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),y}function q(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=A,this.setTexture2D=te,this.setTexture2DArray=ee,this.setTexture3D=H,this.setTextureCube=re,this.rebindTextures=Re,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Ge}function Ew(t,e){function n(i,r=Ji){let s;const a=et.getTransfer(r);if(i===Ui)return t.UNSIGNED_BYTE;if(i===Eh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Th)return t.UNSIGNED_SHORT_5_5_5_1;if(i===v_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===m_)return t.BYTE;if(i===g_)return t.SHORT;if(i===lo)return t.UNSIGNED_SHORT;if(i===Mh)return t.INT;if(i===Xr)return t.UNSIGNED_INT;if(i===Ci)return t.FLOAT;if(i===mo)return t.HALF_FLOAT;if(i===__)return t.ALPHA;if(i===x_)return t.RGB;if(i===Kn)return t.RGBA;if(i===y_)return t.LUMINANCE;if(i===S_)return t.LUMINANCE_ALPHA;if(i===ks)return t.DEPTH_COMPONENT;if(i===Qs)return t.DEPTH_STENCIL;if(i===M_)return t.RED;if(i===wh)return t.RED_INTEGER;if(i===E_)return t.RG;if(i===Ah)return t.RG_INTEGER;if(i===Ch)return t.RGBA_INTEGER;if(i===El||i===Tl||i===wl||i===Al)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===El)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Tl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===El)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Tl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Al)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jd||i===Xd||i===$d||i===Yd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$d)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Kd||i===qd||i===Zd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Kd||i===qd)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qd||i===Jd||i===ef||i===tf||i===nf||i===rf||i===sf||i===af||i===of||i===lf||i===cf||i===uf||i===df||i===ff)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Jd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ef)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===af)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===of)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===lf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===uf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===df)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ff)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cl||i===hf||i===pf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Cl)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===hf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===T_||i===mf||i===gf||i===vf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===mf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===gf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class Tw extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Da extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ww={type:"move"};class Fu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Da,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Da,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Da,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=n.getJointPose(_,i),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),m=.02,v=.005;c.inputState.pinching&&f>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ww)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Da;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Aw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Rw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new mn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new mr({vertexShader:Aw,fragmentShader:Cw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new qn(new bc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bw extends aa{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,m=null,v=null;const _=new Rw,p=n.getContextAttributes();let u=null,g=null;const x=[],T=[],P=new rt;let b=null;const R=new Ln;R.layers.enable(1),R.viewport=new Et;const N=new Ln;N.layers.enable(2),N.viewport=new Et;const Y=[R,N],S=new Tw;S.layers.enable(1),S.layers.enable(2);let A=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ce=x[Z];return ce===void 0&&(ce=new Fu,x[Z]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(Z){let ce=x[Z];return ce===void 0&&(ce=new Fu,x[Z]=ce),ce.getGripSpace()},this.getHand=function(Z){let ce=x[Z];return ce===void 0&&(ce=new Fu,x[Z]=ce),ce.getHandSpace()};function V(Z){const ce=T.indexOf(Z.inputSource);if(ce===-1)return;const ge=x[ce];ge!==void 0&&(ge.update(Z.inputSource,Z.frame,c||a),ge.dispatchEvent({type:Z.type,data:Z.inputSource}))}function te(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",ee);for(let Z=0;Z<x.length;Z++){const ce=T[Z];ce!==null&&(T[Z]=null,x[Z].disconnect(ce))}A=null,G=null,_.reset(),e.setRenderTarget(u),m=null,f=null,h=null,r=null,g=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",te),r.addEventListener("inputsourceschange",ee),p.xrCompatible!==!0&&await n.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ce),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),g=new $r(m.framebufferWidth,m.framebufferHeight,{format:Kn,type:Ui,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ce=null,ge=null,ye=null;p.depth&&(ye=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ce=p.stencil?Qs:ks,ge=p.stencil?Zs:Xr);const Ie={colorFormat:n.RGBA8,depthFormat:ye,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(Ie),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),g=new $r(f.textureWidth,f.textureHeight,{format:Kn,type:Ui,depthTexture:new O_(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Fe.setContext(r),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ee(Z){for(let ce=0;ce<Z.removed.length;ce++){const ge=Z.removed[ce],ye=T.indexOf(ge);ye>=0&&(T[ye]=null,x[ye].disconnect(ge))}for(let ce=0;ce<Z.added.length;ce++){const ge=Z.added[ce];let ye=T.indexOf(ge);if(ye===-1){for(let Re=0;Re<x.length;Re++)if(Re>=T.length){T.push(ge),ye=Re;break}else if(T[Re]===null){T[Re]=ge,ye=Re;break}if(ye===-1)break}const Ie=x[ye];Ie&&Ie.connect(ge)}}const H=new j,re=new j;function U(Z,ce,ge){H.setFromMatrixPosition(ce.matrixWorld),re.setFromMatrixPosition(ge.matrixWorld);const ye=H.distanceTo(re),Ie=ce.projectionMatrix.elements,Re=ge.projectionMatrix.elements,Ve=Ie[14]/(Ie[10]-1),Ye=Ie[14]/(Ie[10]+1),ze=(Ie[9]+1)/Ie[5],O=(Ie[9]-1)/Ie[5],Tt=(Ie[8]-1)/Ie[0],He=(Re[8]+1)/Re[0],Ge=Ve*Tt,De=Ve*He,oe=ye/(-Tt+He),q=oe*-Tt;if(ce.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(q),Z.translateZ(oe),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ie[10]===-1)Z.projectionMatrix.copy(ce.projectionMatrix),Z.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const E=Ve+oe,y=Ye+oe,I=Ge-q,C=De+(ye-q),L=ze*Ye/y*E,F=O*Ye/y*E;Z.projectionMatrix.makePerspective(I,C,L,F,E,y),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Q(Z,ce){ce===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ce.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let ce=Z.near,ge=Z.far;_.texture!==null&&(_.depthNear>0&&(ce=_.depthNear),_.depthFar>0&&(ge=_.depthFar)),S.near=N.near=R.near=ce,S.far=N.far=R.far=ge,(A!==S.near||G!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),A=S.near,G=S.far);const ye=Z.parent,Ie=S.cameras;Q(S,ye);for(let Re=0;Re<Ie.length;Re++)Q(Ie[Re],ye);Ie.length===2?U(S,R,N):S.projectionMatrix.copy(R.projectionMatrix),se(Z,S,ye)};function se(Z,ce,ge){ge===null?Z.matrix.copy(ce.matrixWorld):(Z.matrix.copy(ge.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ce.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ce.projectionMatrix),Z.projectionMatrixInverse.copy(ce.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=_f*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let ue=null;function Ae(Z,ce){if(d=ce.getViewerPose(c||a),v=ce,d!==null){const ge=d.views;m!==null&&(e.setRenderTargetFramebuffer(g,m.framebuffer),e.setRenderTarget(g));let ye=!1;ge.length!==S.cameras.length&&(S.cameras.length=0,ye=!0);for(let Re=0;Re<ge.length;Re++){const Ve=ge[Re];let Ye=null;if(m!==null)Ye=m.getViewport(Ve);else{const O=h.getViewSubImage(f,Ve);Ye=O.viewport,Re===0&&(e.setRenderTargetTextures(g,O.colorTexture,f.ignoreDepthValues?void 0:O.depthStencilTexture),e.setRenderTarget(g))}let ze=Y[Re];ze===void 0&&(ze=new Ln,ze.layers.enable(Re),ze.viewport=new Et,Y[Re]=ze),ze.matrix.fromArray(Ve.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ve.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Re===0&&(S.matrix.copy(ze.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ye===!0&&S.cameras.push(ze)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){const Re=h.getDepthInformation(ge[0]);Re&&Re.isValid&&Re.texture&&_.init(e,Re,r.renderState)}}for(let ge=0;ge<x.length;ge++){const ye=T[ge],Ie=x[ge];ye!==null&&Ie!==void 0&&Ie.update(ye,ce,c||a)}ue&&ue(Z,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),v=null}const Fe=new F_;Fe.setAnimationLoop(Ae),this.setAnimationLoop=function(Z){ue=Z},this.dispose=function(){}}}const Cr=new hi,Pw=new vt;function Lw(t,e){function n(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,N_(t)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,g,x,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),h(p,u)):u.isMeshPhongMaterial?(s(p,u),d(p,u)):u.isMeshStandardMaterial?(s(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,T)):u.isMeshMatcapMaterial?(s(p,u),v(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),_(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,g,x):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,n(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,n(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===pn&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,n(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===pn&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,n(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,n(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const g=e.get(u),x=g.envMap,T=g.envMapRotation;x&&(p.envMap.value=x,Cr.copy(T),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),p.envMapRotation.value.setFromMatrix4(Pw.makeRotationFromEuler(Cr)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,n(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,g,x){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*g,p.scale.value=x*.5,u.map&&(p.map.value=u.map,n(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,n(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function h(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,g){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===pn&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const g=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(g.matrixWorld),p.nearDistance.value=g.shadow.camera.near,p.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Nw(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,x){const T=x.program;i.uniformBlockBinding(g,T)}function c(g,x){let T=r[g.id];T===void 0&&(v(g),T=d(g),r[g.id]=T,g.addEventListener("dispose",p));const P=x.program;i.updateUBOMapping(g,P);const b=e.render.frame;s[g.id]!==b&&(f(g),s[g.id]=b)}function d(g){const x=h();g.__bindingPointIndex=x;const T=t.createBuffer(),P=g.__size,b=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,T),t.bufferData(t.UNIFORM_BUFFER,P,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,T),T}function h(){for(let g=0;g<o;g++)if(a.indexOf(g)===-1)return a.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(g){const x=r[g.id],T=g.uniforms,P=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let b=0,R=T.length;b<R;b++){const N=Array.isArray(T[b])?T[b]:[T[b]];for(let Y=0,S=N.length;Y<S;Y++){const A=N[Y];if(m(A,b,Y,P)===!0){const G=A.__offset,V=Array.isArray(A.value)?A.value:[A.value];let te=0;for(let ee=0;ee<V.length;ee++){const H=V[ee],re=_(H);typeof H=="number"||typeof H=="boolean"?(A.__data[0]=H,t.bufferSubData(t.UNIFORM_BUFFER,G+te,A.__data)):H.isMatrix3?(A.__data[0]=H.elements[0],A.__data[1]=H.elements[1],A.__data[2]=H.elements[2],A.__data[3]=0,A.__data[4]=H.elements[3],A.__data[5]=H.elements[4],A.__data[6]=H.elements[5],A.__data[7]=0,A.__data[8]=H.elements[6],A.__data[9]=H.elements[7],A.__data[10]=H.elements[8],A.__data[11]=0):(H.toArray(A.__data,te),te+=re.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,G,A.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(g,x,T,P){const b=g.value,R=x+"_"+T;if(P[R]===void 0)return typeof b=="number"||typeof b=="boolean"?P[R]=b:P[R]=b.clone(),!0;{const N=P[R];if(typeof b=="number"||typeof b=="boolean"){if(N!==b)return P[R]=b,!0}else if(N.equals(b)===!1)return N.copy(b),!0}return!1}function v(g){const x=g.uniforms;let T=0;const P=16;for(let R=0,N=x.length;R<N;R++){const Y=Array.isArray(x[R])?x[R]:[x[R]];for(let S=0,A=Y.length;S<A;S++){const G=Y[S],V=Array.isArray(G.value)?G.value:[G.value];for(let te=0,ee=V.length;te<ee;te++){const H=V[te],re=_(H),U=T%P,Q=U%re.boundary,se=U+Q;T+=Q,se!==0&&P-se<re.storage&&(T+=P-se),G.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=T,T+=re.storage}}}const b=T%P;return b>0&&(T+=P-b),g.__size=T,g.__cache={},this}function _(g){const x={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(x.boundary=4,x.storage=4):g.isVector2?(x.boundary=8,x.storage=8):g.isVector3||g.isColor?(x.boundary=16,x.storage=12):g.isVector4?(x.boundary=16,x.storage=16):g.isMatrix3?(x.boundary=48,x.storage=48):g.isMatrix4?(x.boundary=64,x.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),x}function p(g){const x=g.target;x.removeEventListener("dispose",p);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const g in r)t.deleteBuffer(r[g]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class Iw{constructor(e={}){const{canvas:n=xS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let _=null,p=null;const u=[],g=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=oi,this.toneMapping=dr,this.toneMappingExposure=1;const x=this;let T=!1,P=0,b=0,R=null,N=-1,Y=null;const S=new Et,A=new Et;let G=null;const V=new tt(0);let te=0,ee=n.width,H=n.height,re=1,U=null,Q=null;const se=new Et(0,0,ee,H),ue=new Et(0,0,ee,H);let Ae=!1;const Fe=new U_;let Z=!1,ce=!1;const ge=new vt,ye=new vt,Ie=new j,Re=new Et,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function ze(){return R===null?re:1}let O=i;function Tt(w,k){return n.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Sh}`),n.addEventListener("webglcontextlost",K,!1),n.addEventListener("webglcontextrestored",le,!1),n.addEventListener("webglcontextcreationerror",xe,!1),O===null){const k="webgl2";if(O=Tt(k,w),O===null)throw Tt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let He,Ge,De,oe,q,E,y,I,C,L,F,J,z,ne,_e,ie,ae,ve,me,fe,Se,Ce,Ne,D;function de(){He=new k1(O),He.init(),Ce=new Ew(O,He),Ge=new L1(O,He,e,Ce),De=new yw(O),Ge.reverseDepthBuffer&&De.buffers.depth.setReversed(!0),oe=new H1(O),q=new sw,E=new Mw(O,He,De,q,Ge,Ce,oe),y=new I1(x),I=new O1(x),C=new $S(O),Ne=new b1(O,C),L=new B1(O,C,oe,Ne),F=new G1(O,L,C,oe),me=new V1(O,Ge,E),ie=new N1(q),J=new rw(x,y,I,He,Ge,Ne,ie),z=new Lw(x,q),ne=new ow,_e=new hw(He),ve=new R1(x,y,I,De,F,f,l),ae=new _w(x,F,Ge),D=new Nw(O,oe,Ge,De),fe=new P1(O,He,oe),Se=new z1(O,He,oe),oe.programs=J.programs,x.capabilities=Ge,x.extensions=He,x.properties=q,x.renderLists=ne,x.shadowMap=ae,x.state=De,x.info=oe}de();const W=new bw(x,O);this.xr=W,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=He.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=He.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(w){w!==void 0&&(re=w,this.setSize(ee,H,!1))},this.getSize=function(w){return w.set(ee,H)},this.setSize=function(w,k,X=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=w,H=k,n.width=Math.floor(w*re),n.height=Math.floor(k*re),X===!0&&(n.style.width=w+"px",n.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(ee*re,H*re).floor()},this.setDrawingBufferSize=function(w,k,X){ee=w,H=k,re=X,n.width=Math.floor(w*X),n.height=Math.floor(k*X),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(S)},this.getViewport=function(w){return w.copy(se)},this.setViewport=function(w,k,X,$){w.isVector4?se.set(w.x,w.y,w.z,w.w):se.set(w,k,X,$),De.viewport(S.copy(se).multiplyScalar(re).round())},this.getScissor=function(w){return w.copy(ue)},this.setScissor=function(w,k,X,$){w.isVector4?ue.set(w.x,w.y,w.z,w.w):ue.set(w,k,X,$),De.scissor(A.copy(ue).multiplyScalar(re).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(w){De.setScissorTest(Ae=w)},this.setOpaqueSort=function(w){U=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor.apply(ve,arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha.apply(ve,arguments)},this.clear=function(w=!0,k=!0,X=!0){let $=0;if(w){let B=!1;if(R!==null){const pe=R.texture.format;B=pe===Ch||pe===Ah||pe===wh}if(B){const pe=R.texture.type,Me=pe===Ui||pe===Xr||pe===lo||pe===Zs||pe===Eh||pe===Th,Te=ve.getClearColor(),we=ve.getClearAlpha(),Ue=Te.r,Oe=Te.g,Pe=Te.b;Me?(m[0]=Ue,m[1]=Oe,m[2]=Pe,m[3]=we,O.clearBufferuiv(O.COLOR,0,m)):(v[0]=Ue,v[1]=Oe,v[2]=Pe,v[3]=we,O.clearBufferiv(O.COLOR,0,v))}else $|=O.COLOR_BUFFER_BIT}k&&($|=O.DEPTH_BUFFER_BIT,O.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),X&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",K,!1),n.removeEventListener("webglcontextrestored",le,!1),n.removeEventListener("webglcontextcreationerror",xe,!1),ne.dispose(),_e.dispose(),q.dispose(),y.dispose(),I.dispose(),F.dispose(),Ne.dispose(),D.dispose(),J.dispose(),W.dispose(),W.removeEventListener("sessionstart",On),W.removeEventListener("sessionend",Oi),gn.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const w=oe.autoReset,k=ae.enabled,X=ae.autoUpdate,$=ae.needsUpdate,B=ae.type;de(),oe.autoReset=w,ae.enabled=k,ae.autoUpdate=X,ae.needsUpdate=$,ae.type=B}function xe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ke(w){const k=w.target;k.removeEventListener("dispose",ke),We(k)}function We(w){nt(w),q.remove(w)}function nt(w){const k=q.get(w).programs;k!==void 0&&(k.forEach(function(X){J.releaseProgram(X)}),w.isShaderMaterial&&J.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,X,$,B,pe){k===null&&(k=Ve);const Me=B.isMesh&&B.matrixWorld.determinant()<0,Te=gi(w,k,X,$,B);De.setMaterial($,Me);let we=X.index,Ue=1;if($.wireframe===!0){if(we=L.getWireframeAttribute(X),we===void 0)return;Ue=2}const Oe=X.drawRange,Pe=X.attributes.position;let Je=Oe.start*Ue,st=(Oe.start+Oe.count)*Ue;pe!==null&&(Je=Math.max(Je,pe.start*Ue),st=Math.min(st,(pe.start+pe.count)*Ue)),we!==null?(Je=Math.max(Je,0),st=Math.min(st,we.count)):Pe!=null&&(Je=Math.max(Je,0),st=Math.min(st,Pe.count));const ft=st-Je;if(ft<0||ft===1/0)return;Ne.setup(B,$,Te,X,we);let Nt,Ke=fe;if(we!==null&&(Nt=C.get(we),Ke=Se,Ke.setIndex(Nt)),B.isMesh)$.wireframe===!0?(De.setLineWidth($.wireframeLinewidth*ze()),Ke.setMode(O.LINES)):Ke.setMode(O.TRIANGLES);else if(B.isLine){let Le=$.linewidth;Le===void 0&&(Le=1),De.setLineWidth(Le*ze()),B.isLineSegments?Ke.setMode(O.LINES):B.isLineLoop?Ke.setMode(O.LINE_LOOP):Ke.setMode(O.LINE_STRIP)}else B.isPoints?Ke.setMode(O.POINTS):B.isSprite&&Ke.setMode(O.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ke.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ke.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Le=B._multiDrawStarts,St=B._multiDrawCounts,qe=B._multiDrawCount,Kt=we?C.get(we).bytesPerElement:1,Bn=q.get($).currentProgram.getUniforms();for(let qt=0;qt<qe;qt++)Bn.setValue(O,"_gl_DrawID",qt),Ke.render(Le[qt]/Kt,St[qt])}else if(B.isInstancedMesh)Ke.renderInstances(Je,ft,B.count);else if(X.isInstancedBufferGeometry){const Le=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,St=Math.min(X.instanceCount,Le);Ke.renderInstances(Je,ft,St)}else Ke.render(Je,ft)};function Be(w,k,X){w.transparent===!0&&w.side===ui&&w.forceSinglePass===!1?(w.side=pn,w.needsUpdate=!0,Cn(w,k,X),w.side=pr,w.needsUpdate=!0,Cn(w,k,X),w.side=ui):Cn(w,k,X)}this.compile=function(w,k,X=null){X===null&&(X=w),p=_e.get(X),p.init(k),g.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==X&&w.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const $=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const pe=B.material;if(pe)if(Array.isArray(pe))for(let Me=0;Me<pe.length;Me++){const Te=pe[Me];Be(Te,X,B),$.add(Te)}else Be(pe,X,B),$.add(pe)}),g.pop(),p=null,$},this.compileAsync=function(w,k,X=null){const $=this.compile(w,k,X);return new Promise(B=>{function pe(){if($.forEach(function(Me){q.get(Me).currentProgram.isReady()&&$.delete(Me)}),$.size===0){B(w);return}setTimeout(pe,10)}He.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let lt=null;function Ct(w){lt&&lt(w)}function On(){gn.stop()}function Oi(){gn.start()}const gn=new F_;gn.setAnimationLoop(Ct),typeof self<"u"&&gn.setContext(self),this.setAnimationLoop=function(w){lt=w,W.setAnimationLoop(w),w===null?gn.stop():gn.start()},W.addEventListener("sessionstart",On),W.addEventListener("sessionend",Oi),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(k),k=W.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,k,R),p=_e.get(w,g.length),p.init(k),g.push(p),ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Fe.setFromProjectionMatrix(ye),ce=this.localClippingEnabled,Z=ie.init(this.clippingPlanes,ce),_=ne.get(w,u.length),_.init(),u.push(_),W.enabled===!0&&W.isPresenting===!0){const pe=x.xr.getDepthSensingMesh();pe!==null&&kn(pe,k,-1/0,x.sortObjects)}kn(w,k,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(U,Q),Ye=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ye&&ve.addToRenderList(_,w),this.info.render.frame++,Z===!0&&ie.beginShadows();const X=p.state.shadowsArray;ae.render(X,w,k),Z===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=_.opaque,B=_.transmissive;if(p.setupLights(),k.isArrayCamera){const pe=k.cameras;if(B.length>0)for(let Me=0,Te=pe.length;Me<Te;Me++){const we=pe[Me];pi($,B,w,we)}Ye&&ve.render(w);for(let Me=0,Te=pe.length;Me<Te;Me++){const we=pe[Me];ni(_,w,we,we.viewport)}}else B.length>0&&pi($,B,w,k),Ye&&ve.render(w),ni(_,w,k);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,k),Ne.resetDefaultState(),N=-1,Y=null,g.pop(),g.length>0?(p=g[g.length-1],Z===!0&&ie.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function kn(w,k,X,$){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Fe.intersectsSprite(w)){$&&Re.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ye);const Me=F.update(w),Te=w.material;Te.visible&&_.push(w,Me,Te,X,Re.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Fe.intersectsObject(w))){const Me=F.update(w),Te=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Re.copy(w.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Re.copy(Me.boundingSphere.center)),Re.applyMatrix4(w.matrixWorld).applyMatrix4(ye)),Array.isArray(Te)){const we=Me.groups;for(let Ue=0,Oe=we.length;Ue<Oe;Ue++){const Pe=we[Ue],Je=Te[Pe.materialIndex];Je&&Je.visible&&_.push(w,Me,Je,X,Re.z,Pe)}}else Te.visible&&_.push(w,Me,Te,X,Re.z,null)}}const pe=w.children;for(let Me=0,Te=pe.length;Me<Te;Me++)kn(pe[Me],k,X,$)}function ni(w,k,X,$){const B=w.opaque,pe=w.transmissive,Me=w.transparent;p.setupLightsView(X),Z===!0&&ie.setGlobalState(x.clippingPlanes,X),$&&De.viewport(S.copy($)),B.length>0&&xt(B,k,X),pe.length>0&&xt(pe,k,X),Me.length>0&&xt(Me,k,X),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function pi(w,k,X,$){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new $r(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?mo:Ui,minFilter:kr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const pe=p.state.transmissionRenderTarget[$.id],Me=$.viewport||S;pe.setSize(Me.z,Me.w);const Te=x.getRenderTarget();x.setRenderTarget(pe),x.getClearColor(V),te=x.getClearAlpha(),te<1&&x.setClearColor(16777215,.5),x.clear(),Ye&&ve.render(X);const we=x.toneMapping;x.toneMapping=dr;const Ue=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),Z===!0&&ie.setGlobalState(x.clippingPlanes,$),xt(w,X,$),E.updateMultisampleRenderTarget(pe),E.updateRenderTargetMipmap(pe),He.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let Pe=0,Je=k.length;Pe<Je;Pe++){const st=k[Pe],ft=st.object,Nt=st.geometry,Ke=st.material,Le=st.group;if(Ke.side===ui&&ft.layers.test($.layers)){const St=Ke.side;Ke.side=pn,Ke.needsUpdate=!0,sn(ft,X,$,Nt,Ke,Le),Ke.side=St,Ke.needsUpdate=!0,Oe=!0}}Oe===!0&&(E.updateMultisampleRenderTarget(pe),E.updateRenderTargetMipmap(pe))}x.setRenderTarget(Te),x.setClearColor(V,te),Ue!==void 0&&($.viewport=Ue),x.toneMapping=we}function xt(w,k,X){const $=k.isScene===!0?k.overrideMaterial:null;for(let B=0,pe=w.length;B<pe;B++){const Me=w[B],Te=Me.object,we=Me.geometry,Ue=$===null?Me.material:$,Oe=Me.group;Te.layers.test(X.layers)&&sn(Te,k,X,we,Ue,Oe)}}function sn(w,k,X,$,B,pe){w.onBeforeRender(x,k,X,$,B,pe),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(x,k,X,$,w,pe),B.transparent===!0&&B.side===ui&&B.forceSinglePass===!1?(B.side=pn,B.needsUpdate=!0,x.renderBufferDirect(X,k,$,B,w,pe),B.side=pr,B.needsUpdate=!0,x.renderBufferDirect(X,k,$,B,w,pe),B.side=ui):x.renderBufferDirect(X,k,$,B,w,pe),w.onAfterRender(x,k,X,$,B,pe)}function Cn(w,k,X){k.isScene!==!0&&(k=Ve);const $=q.get(w),B=p.state.lights,pe=p.state.shadowsArray,Me=B.state.version,Te=J.getParameters(w,B.state,pe,k,X),we=J.getProgramCacheKey(Te);let Ue=$.programs;$.environment=w.isMeshStandardMaterial?k.environment:null,$.fog=k.fog,$.envMap=(w.isMeshStandardMaterial?I:y).get(w.envMap||$.environment),$.envMapRotation=$.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Ue===void 0&&(w.addEventListener("dispose",ke),Ue=new Map,$.programs=Ue);let Oe=Ue.get(we);if(Oe!==void 0){if($.currentProgram===Oe&&$.lightsStateVersion===Me)return ii(w,Te),Oe}else Te.uniforms=J.getUniforms(w),w.onBeforeCompile(Te,x),Oe=J.acquireProgram(Te,we),Ue.set(we,Oe),$.uniforms=Te.uniforms;const Pe=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pe.clippingPlanes=ie.uniform),ii(w,Te),$.needsLights=Bi(w),$.lightsStateVersion=Me,$.needsLights&&(Pe.ambientLightColor.value=B.state.ambient,Pe.lightProbe.value=B.state.probe,Pe.directionalLights.value=B.state.directional,Pe.directionalLightShadows.value=B.state.directionalShadow,Pe.spotLights.value=B.state.spot,Pe.spotLightShadows.value=B.state.spotShadow,Pe.rectAreaLights.value=B.state.rectArea,Pe.ltc_1.value=B.state.rectAreaLTC1,Pe.ltc_2.value=B.state.rectAreaLTC2,Pe.pointLights.value=B.state.point,Pe.pointLightShadows.value=B.state.pointShadow,Pe.hemisphereLights.value=B.state.hemi,Pe.directionalShadowMap.value=B.state.directionalShadowMap,Pe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pe.spotShadowMap.value=B.state.spotShadowMap,Pe.spotLightMatrix.value=B.state.spotLightMatrix,Pe.spotLightMap.value=B.state.spotLightMap,Pe.pointShadowMap.value=B.state.pointShadowMap,Pe.pointShadowMatrix.value=B.state.pointShadowMatrix),$.currentProgram=Oe,$.uniformsList=null,Oe}function mi(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=bl.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function ii(w,k){const X=q.get(w);X.outputColorSpace=k.outputColorSpace,X.batching=k.batching,X.batchingColor=k.batchingColor,X.instancing=k.instancing,X.instancingColor=k.instancingColor,X.instancingMorph=k.instancingMorph,X.skinning=k.skinning,X.morphTargets=k.morphTargets,X.morphNormals=k.morphNormals,X.morphColors=k.morphColors,X.morphTargetsCount=k.morphTargetsCount,X.numClippingPlanes=k.numClippingPlanes,X.numIntersection=k.numClipIntersection,X.vertexAlphas=k.vertexAlphas,X.vertexTangents=k.vertexTangents,X.toneMapping=k.toneMapping}function gi(w,k,X,$,B){k.isScene!==!0&&(k=Ve),E.resetTextureUnits();const pe=k.fog,Me=$.isMeshStandardMaterial?k.environment:null,Te=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:yr,we=($.isMeshStandardMaterial?I:y).get($.envMap||Me),Ue=$.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Oe=!!X.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Pe=!!X.morphAttributes.position,Je=!!X.morphAttributes.normal,st=!!X.morphAttributes.color;let ft=dr;$.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ft=x.toneMapping);const Nt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ke=Nt!==void 0?Nt.length:0,Le=q.get($),St=p.state.lights;if(Z===!0&&(ce===!0||w!==Y)){const Ot=w===Y&&$.id===N;ie.setState($,w,Ot)}let qe=!1;$.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==St.state.version||Le.outputColorSpace!==Te||B.isBatchedMesh&&Le.batching===!1||!B.isBatchedMesh&&Le.batching===!0||B.isBatchedMesh&&Le.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Le.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Le.instancing===!1||!B.isInstancedMesh&&Le.instancing===!0||B.isSkinnedMesh&&Le.skinning===!1||!B.isSkinnedMesh&&Le.skinning===!0||B.isInstancedMesh&&Le.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Le.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Le.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Le.instancingMorph===!1&&B.morphTexture!==null||Le.envMap!==we||$.fog===!0&&Le.fog!==pe||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ie.numPlanes||Le.numIntersection!==ie.numIntersection)||Le.vertexAlphas!==Ue||Le.vertexTangents!==Oe||Le.morphTargets!==Pe||Le.morphNormals!==Je||Le.morphColors!==st||Le.toneMapping!==ft||Le.morphTargetsCount!==Ke)&&(qe=!0):(qe=!0,Le.__version=$.version);let Kt=Le.currentProgram;qe===!0&&(Kt=Cn($,k,B));let Bn=!1,qt=!1,zi=!1;const at=Kt.getUniforms(),vn=Le.uniforms;if(De.useProgram(Kt.program)&&(Bn=!0,qt=!0,zi=!0),$.id!==N&&(N=$.id,qt=!0),Bn||Y!==w){Ge.reverseDepthBuffer?(ge.copy(w.projectionMatrix),SS(ge),MS(ge),at.setValue(O,"projectionMatrix",ge)):at.setValue(O,"projectionMatrix",w.projectionMatrix),at.setValue(O,"viewMatrix",w.matrixWorldInverse);const Ot=at.map.cameraPosition;Ot!==void 0&&Ot.setValue(O,Ie.setFromMatrixPosition(w.matrixWorld)),Ge.logarithmicDepthBuffer&&at.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&at.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),Y!==w&&(Y=w,qt=!0,zi=!0)}if(B.isSkinnedMesh){at.setOptional(O,B,"bindMatrix"),at.setOptional(O,B,"bindMatrixInverse");const Ot=B.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),at.setValue(O,"boneTexture",Ot.boneTexture,E))}B.isBatchedMesh&&(at.setOptional(O,B,"batchingTexture"),at.setValue(O,"batchingTexture",B._matricesTexture,E),at.setOptional(O,B,"batchingIdTexture"),at.setValue(O,"batchingIdTexture",B._indirectTexture,E),at.setOptional(O,B,"batchingColorTexture"),B._colorsTexture!==null&&at.setValue(O,"batchingColorTexture",B._colorsTexture,E));const Hi=X.morphAttributes;if((Hi.position!==void 0||Hi.normal!==void 0||Hi.color!==void 0)&&me.update(B,X,Kt),(qt||Le.receiveShadow!==B.receiveShadow)&&(Le.receiveShadow=B.receiveShadow,at.setValue(O,"receiveShadow",B.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(vn.envMap.value=we,vn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&k.environment!==null&&(vn.envMapIntensity.value=k.environmentIntensity),qt&&(at.setValue(O,"toneMappingExposure",x.toneMappingExposure),Le.needsLights&&ki(vn,zi),pe&&$.fog===!0&&z.refreshFogUniforms(vn,pe),z.refreshMaterialUniforms(vn,$,re,H,p.state.transmissionRenderTarget[w.id]),bl.upload(O,mi(Le),vn,E)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(bl.upload(O,mi(Le),vn,E),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&at.setValue(O,"center",B.center),at.setValue(O,"modelViewMatrix",B.modelViewMatrix),at.setValue(O,"normalMatrix",B.normalMatrix),at.setValue(O,"modelMatrix",B.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Ot=$.uniformsGroups;for(let qr=0,Nc=Ot.length;qr<Nc;qr++){const ca=Ot[qr];D.update(ca,Kt),D.bind(ca,Kt)}}return Kt}function ki(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Bi(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,k,X){q.get(w.texture).__webglTexture=k,q.get(w.depthTexture).__webglTexture=X;const $=q.get(w);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=X===void 0,$.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const X=q.get(w);X.__webglFramebuffer=k,X.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,X=0){R=w,P=k,b=X;let $=!0,B=null,pe=!1,Me=!1;if(w){const we=q.get(w);if(we.__useDefaultFramebuffer!==void 0)De.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(we.__webglFramebuffer===void 0)E.setupRenderTarget(w);else if(we.__hasExternalTextures)E.rebindTextures(w,q.get(w.texture).__webglTexture,q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Pe=w.depthTexture;if(we.__boundDepthTexture!==Pe){if(Pe!==null&&q.has(Pe)&&(w.width!==Pe.image.width||w.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(w)}}const Ue=w.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Me=!0);const Oe=q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Oe[k])?B=Oe[k][X]:B=Oe[k],pe=!0):w.samples>0&&E.useMultisampledRTT(w)===!1?B=q.get(w).__webglMultisampledFramebuffer:Array.isArray(Oe)?B=Oe[X]:B=Oe,S.copy(w.viewport),A.copy(w.scissor),G=w.scissorTest}else S.copy(se).multiplyScalar(re).floor(),A.copy(ue).multiplyScalar(re).floor(),G=Ae;if(De.bindFramebuffer(O.FRAMEBUFFER,B)&&$&&De.drawBuffers(w,B),De.viewport(S),De.scissor(A),De.setScissorTest(G),pe){const we=q.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,we.__webglTexture,X)}else if(Me){const we=q.get(w.texture),Ue=k||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,we.__webglTexture,X||0,Ue)}N=-1},this.readRenderTargetPixels=function(w,k,X,$,B,pe,Me){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){De.bindFramebuffer(O.FRAMEBUFFER,Te);try{const we=w.texture,Ue=we.format,Oe=we.type;if(!Ge.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ge.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-$&&X>=0&&X<=w.height-B&&O.readPixels(k,X,$,B,Ce.convert(Ue),Ce.convert(Oe),pe)}finally{const we=R!==null?q.get(R).__webglFramebuffer:null;De.bindFramebuffer(O.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(w,k,X,$,B,pe,Me){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){const we=w.texture,Ue=we.format,Oe=we.type;if(!Ge.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ge.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-$&&X>=0&&X<=w.height-B){De.bindFramebuffer(O.FRAMEBUFFER,Te);const Pe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Pe),O.bufferData(O.PIXEL_PACK_BUFFER,pe.byteLength,O.STREAM_READ),O.readPixels(k,X,$,B,Ce.convert(Ue),Ce.convert(Oe),0);const Je=R!==null?q.get(R).__webglFramebuffer:null;De.bindFramebuffer(O.FRAMEBUFFER,Je);const st=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await yS(O,st,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Pe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,pe),O.deleteBuffer(Pe),O.deleteSync(st),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,X=0){w.isTexture!==!0&&(Rl("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const $=Math.pow(2,-X),B=Math.floor(w.image.width*$),pe=Math.floor(w.image.height*$),Me=k!==null?k.x:0,Te=k!==null?k.y:0;E.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,X,0,0,Me,Te,B,pe),De.unbindTexture()},this.copyTextureToTexture=function(w,k,X=null,$=null,B=0){w.isTexture!==!0&&(Rl("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,w=arguments[1],k=arguments[2],B=arguments[3]||0,X=null);let pe,Me,Te,we,Ue,Oe;X!==null?(pe=X.max.x-X.min.x,Me=X.max.y-X.min.y,Te=X.min.x,we=X.min.y):(pe=w.image.width,Me=w.image.height,Te=0,we=0),$!==null?(Ue=$.x,Oe=$.y):(Ue=0,Oe=0);const Pe=Ce.convert(k.format),Je=Ce.convert(k.type);E.setTexture2D(k,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const st=O.getParameter(O.UNPACK_ROW_LENGTH),ft=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Nt=O.getParameter(O.UNPACK_SKIP_PIXELS),Ke=O.getParameter(O.UNPACK_SKIP_ROWS),Le=O.getParameter(O.UNPACK_SKIP_IMAGES),St=w.isCompressedTexture?w.mipmaps[B]:w.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,St.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,St.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Te),O.pixelStorei(O.UNPACK_SKIP_ROWS,we),w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,B,Ue,Oe,pe,Me,Pe,Je,St.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,B,Ue,Oe,St.width,St.height,Pe,St.data):O.texSubImage2D(O.TEXTURE_2D,B,Ue,Oe,pe,Me,Pe,Je,St),O.pixelStorei(O.UNPACK_ROW_LENGTH,st),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ft),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Nt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ke),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Le),B===0&&k.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),De.unbindTexture()},this.copyTextureToTexture3D=function(w,k,X=null,$=null,B=0){w.isTexture!==!0&&(Rl("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,$=arguments[1]||null,w=arguments[2],k=arguments[3],B=arguments[4]||0);let pe,Me,Te,we,Ue,Oe,Pe,Je,st;const ft=w.isCompressedTexture?w.mipmaps[B]:w.image;X!==null?(pe=X.max.x-X.min.x,Me=X.max.y-X.min.y,Te=X.max.z-X.min.z,we=X.min.x,Ue=X.min.y,Oe=X.min.z):(pe=ft.width,Me=ft.height,Te=ft.depth,we=0,Ue=0,Oe=0),$!==null?(Pe=$.x,Je=$.y,st=$.z):(Pe=0,Je=0,st=0);const Nt=Ce.convert(k.format),Ke=Ce.convert(k.type);let Le;if(k.isData3DTexture)E.setTexture3D(k,0),Le=O.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)E.setTexture2DArray(k,0),Le=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const St=O.getParameter(O.UNPACK_ROW_LENGTH),qe=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Kt=O.getParameter(O.UNPACK_SKIP_PIXELS),Bn=O.getParameter(O.UNPACK_SKIP_ROWS),qt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ft.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ft.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,we),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ue),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Oe),w.isDataTexture||w.isData3DTexture?O.texSubImage3D(Le,B,Pe,Je,st,pe,Me,Te,Nt,Ke,ft.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(Le,B,Pe,Je,st,pe,Me,Te,Nt,ft.data):O.texSubImage3D(Le,B,Pe,Je,st,pe,Me,Te,Nt,Ke,ft),O.pixelStorei(O.UNPACK_ROW_LENGTH,St),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,qe),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Kt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Bn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,qt),B===0&&k.generateMipmaps&&O.generateMipmap(Le),De.unbindTexture()},this.initRenderTarget=function(w){q.get(w).__webglFramebuffer===void 0&&E.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?E.setTextureCube(w,0):w.isData3DTexture?E.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?E.setTexture2DArray(w,0):E.setTexture2D(w,0),De.unbindTexture()},this.resetState=function(){P=0,b=0,R=null,De.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Rh?"display-p3":"srgb",n.unpackColorSpace=et.workingColorSpace===Cc?"display-p3":"srgb"}}class Dw extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class yf extends oa{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const lc=new j,cc=new j,Bm=new vt,Ca=new Rc,ol=new xo,Ou=new j,zm=new j;class V_ extends tn{constructor(e=new un,n=new yf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)lc.fromBufferAttribute(n,r-1),cc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=lc.distanceTo(cc);e.setAttribute("lineDistance",new Jn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ol.copy(i.boundingSphere),ol.applyMatrix4(r),ol.radius+=s,e.ray.intersectsSphere(ol)===!1)return;Bm.copy(r).invert(),Ca.copy(e.ray).applyMatrix4(Bm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let _=m,p=v-1;_<p;_+=c){const u=d.getX(_),g=d.getX(_+1),x=ll(this,e,Ca,l,u,g);x&&n.push(x)}if(this.isLineLoop){const _=d.getX(v-1),p=d.getX(m),u=ll(this,e,Ca,l,_,p);u&&n.push(u)}}else{const m=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let _=m,p=v-1;_<p;_+=c){const u=ll(this,e,Ca,l,_,_+1);u&&n.push(u)}if(this.isLineLoop){const _=ll(this,e,Ca,l,v-1,m);_&&n.push(_)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ll(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(lc.fromBufferAttribute(a,r),cc.fromBufferAttribute(a,s),n.distanceSqToSegment(lc,cc,Ou,zm)>i)return;Ou.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Ou);if(!(l<e.near||l>e.far))return{distance:l,point:zm.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}class Uw extends V_{constructor(e,n){super(e,n),this.isLineLoop=!0,this.type="LineLoop"}}class G_ extends oa{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hm=new vt,Sf=new Rc,cl=new xo,ul=new j;class Fw extends tn{constructor(e=new un,n=new G_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),cl.copy(i.boundingSphere),cl.applyMatrix4(r),cl.radius+=s,e.ray.intersectsSphere(cl)===!1)return;Hm.copy(r).invert(),Sf.copy(e.ray).applyMatrix4(Hm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let v=f,_=m;v<_;v++){const p=c.getX(v);ul.fromBufferAttribute(h,p),Vm(ul,p,l,r,e,n,this)}}else{const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=f,_=m;v<_;v++)ul.fromBufferAttribute(h,v),Vm(ul,v,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vm(t,e,n,i,r,s,a){const o=Sf.distanceSqToPoint(t);if(o<n){const l=new j;Sf.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Lh extends un{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new j,f=new j,m=[],v=[],_=[],p=[];for(let u=0;u<=i;u++){const g=[],x=u/i;let T=0;u===0&&a===0?T=.5/n:u===i&&l===Math.PI&&(T=-.5/n);for(let P=0;P<=n;P++){const b=P/n;h.x=-e*Math.cos(r+b*s)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(r+b*s)*Math.sin(a+x*o),v.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),p.push(b+T,1-x),g.push(c++)}d.push(g)}for(let u=0;u<i;u++)for(let g=0;g<n;g++){const x=d[u][g+1],T=d[u][g],P=d[u+1][g],b=d[u+1][g+1];(u!==0||a>0)&&m.push(x,T,b),(u!==i-1||l<Math.PI)&&m.push(T,P,b)}this.setIndex(m),this.setAttribute("position",new Jn(v,3)),this.setAttribute("normal",new Jn(_,3)),this.setAttribute("uv",new Jn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}const Gm=new vt;class Ow{constructor(e,n,i=0,r=1/0){this.ray=new Rc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new bh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Gm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gm),this}intersectObject(e,n=!0,i=[]){return Mf(e,this,i,n),i.sort(Wm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Mf(e[r],this,i,n);return i.sort(Wm),i}}function Wm(t,e){return t.distance-e.distance}function Mf(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)Mf(s[a],e,n,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sh);function Ua(t,e,n){return Math.min(n,Math.max(e,t))}function Xt(t){return Ua(t,0,1)}function Ef(t){return t>=1048576?(t/1048576).toFixed(1)+" MB":(t/1024).toFixed(0)+" KB"}function Mn(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function bi(t,e=1){return t.toFixed(e)}function jm(t){requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(t,0)})})}const ps=[{name:"Y-UP",rx:0},{name:"Y-DOWN",rx:Math.PI},{name:"Z-UP",rx:-Math.PI/2},{name:"Z-DOWN",rx:Math.PI/2}];function kw(t){var e=t.length/3,n=512,i=Math.max(1,Math.floor(e/6e4)),r=[1/0,1/0,1/0],s=[-1/0,-1/0,-1/0],a,o,l;for(a=0;a<e;a+=i)for(o=0;o<3;o++)l=t[a*3+o],l<r[o]&&(r[o]=l),l>s[o]&&(s[o]=l);var c=[new Int32Array(n),new Int32Array(n),new Int32Array(n)],d=0;for(a=0;a<e;a+=i){for(o=0;o<3;o++){var h=s[o]-r[o];if(h>0){var f=Math.floor((t[a*3+o]-r[o])/h*n);c[o][f<0?0:f>=n?n-1:f]++}}d++}if(!d)return{index:2,confident:!1,score:0,runnerUp:0,name:"Z-UP"};var m=Math.max(1,Math.round(n*.03)),v=d*.02;function _(T,P){var b=c[T],R=0,N,Y,S=-1;for(Y=0;Y<n;Y++)if(N=P?Y:n-1-Y,R+=b[N],R>=v){S=Y;break}if(S<0)return 0;var A=0;for(Y=S;Y<Math.min(n,S+m);Y++)A+=b[P?Y:n-1-Y];return A/d}var p=[{axis:1,low:!0,idx:0,name:"Y-UP",score:0},{axis:1,low:!1,idx:1,name:"Y-DOWN",score:0},{axis:2,low:!0,idx:2,name:"Z-UP",score:0},{axis:2,low:!1,idx:3,name:"Z-DOWN",score:0},{axis:0,low:!0,idx:-1,name:"X-UP",score:0},{axis:0,low:!1,idx:-1,name:"X-DOWN",score:0}],u=null,g=0;for(a=0;a<p.length;a++)p[a].score=_(p[a].axis,p[a].low),!u||p[a].score>u.score?(u&&(g=u.score),u=p[a]):p[a].score>g&&(g=p[a].score);if(!u)return{index:2,confident:!1,score:0,runnerUp:0,name:"Z-UP"};var x=u.idx>=0&&u.score>.1&&u.score>g*1.5;return{index:u.idx>=0?u.idx:2,confident:x,score:u.score,runnerUp:g,name:u.idx>=0?u.name:u.name+" — no usable floor"}}const ku={x:0,y:1,z:0},jt={MAX_PLANES:16,ITER:420,SCORE_N:12e3,K_SIGMA:1,MIN_SUPPORT:.006,MIN_INLIERS:60,CLAIM:2.5,WORK_CAP:16e4,GRID_DIV:20,BUDGET_MS:12},Ra=[{max:.005,name:"COSMETIC",hex:8226966,css:"#7d8896"},{max:.01,name:"MINOR",hex:16761375,css:"#ffc21f"},{max:.02,name:"MODERATE",hex:16747039,css:"#ff8a1f"},{max:1/0,name:"SEVERE",hex:16726832,css:"#ff3b30"}];function Bw(t){for(var e=0;e<Ra.length;e++)if(t<Ra[e].max)return Ra[e];return Ra[Ra.length-1]}const zw={slab:4890367,incline:3526848},W_={slab:"#4a9eff",incline:"#35d0c0"};function Hw(t){for(var e=[[t[0],t[1],t[2]],[t[1],t[3],t[4]],[t[2],t[4],t[5]]],n=[[1,0,0],[0,1,0],[0,0,1]],i=0;i<12&&!(Math.abs(e[0][1])+Math.abs(e[0][2])+Math.abs(e[1][2])<1e-16);i++)for(var r=0;r<2;r++)for(var s=r+1;s<3;s++)if(!(Math.abs(e[r][s])<1e-20)){var a=(e[s][s]-e[r][r])/(2*e[r][s]),o=a>=0?1:-1,l=o/(Math.abs(a)+Math.sqrt(a*a+1)),c=1/Math.sqrt(l*l+1),d=l*c,h;for(h=0;h<3;h++){var f=e[h][r],m=e[h][s];e[h][r]=c*f-d*m,e[h][s]=d*f+c*m}for(h=0;h<3;h++){var v=e[r][h],_=e[s][h];e[r][h]=c*v-d*_,e[s][h]=d*v+c*_}for(h=0;h<3;h++){var p=n[h][r],u=n[h][s];n[h][r]=c*p-d*u,n[h][s]=d*p+c*u}}return{vals:[e[0][0],e[1][1],e[2][2]],vecs:n}}function Vw(t){for(var e=t.positions,n=e.length/3,i=Math.max(1,Math.ceil(n/jt.WORK_CAP)),r=Math.ceil(n/i),s=new Float32Array(r*3),a=new Float32Array(r),o=t.cov?new Float32Array(r*6):null,l=t.matrixWorld,c=l[0],d=l[4],h=l[8],f=l[1],m=l[5],v=l[9],_=l[2],p=l[6],u=l[10],g=l[12],x=l[13],T=l[14],P=0,b=0;b<n&&P<r;b+=i){var R=b*3,N=e[R],Y=e[R+1],S=e[R+2],A=P*3;if(s[A]=c*N+d*Y+h*S+g,s[A+1]=f*N+m*Y+v*S+x,s[A+2]=_*N+p*Y+u*S+T,a[P]=t.alphas?t.alphas[b]:1,o){var G=t.cov,V=b*6,te=G[V],ee=G[V+1],H=G[V+2],re=G[V+3],U=G[V+4],Q=G[V+5],se=c*te+d*ee+h*H,ue=c*ee+d*re+h*U,Ae=c*H+d*U+h*Q,Fe=f*te+m*ee+v*H,Z=f*ee+m*re+v*U,ce=f*H+m*U+v*Q,ge=_*te+p*ee+u*H,ye=_*ee+p*re+u*U,Ie=_*H+p*U+u*Q,Re=P*6;o[Re]=se*c+ue*d+Ae*h,o[Re+1]=se*f+ue*m+Ae*v,o[Re+2]=se*_+ue*p+Ae*u,o[Re+3]=Fe*f+Z*m+ce*v,o[Re+4]=Fe*_+Z*p+ce*u,o[Re+5]=ge*_+ye*p+Ie*u}P++}return{P:s,A:a,C:o,n:P,step:i}}function Gw(t,e,n){var i,r,s;Math.abs(e)<.9?(i=n,r=0,s=-t):(i=1-t*t,r=-t*e,s=-t*n);var a=Math.sqrt(i*i+r*r+s*s);a>1e-9||(i=1,r=0,s=0,a=1),i/=a,r/=a,s/=a;var o=e*s-n*r,l=n*i-t*s,c=t*r-e*i;return[i,r,s,o,l,c]}function Ww(t,e,n,i){var r=2654435769;function s(){r|=0,r=r+1831565813|0;var oe=Math.imul(r^r>>>15,1|r);return oe=oe+Math.imul(oe^oe>>>7,61|oe)^oe,((oe^oe>>>14)>>>0)/4294967296}var a=Vw(t);if(a.n<200){i(new Error("only "+a.n+" points in the working set — too few to fit anything"));return}for(var o=a.P,l=a.A,c=a.C,d=t.radius||10,h=jt.K_SIGMA*jt.K_SIGMA,f=Math.pow(.004*d,2),m=Math.pow(.0015*d,2),v=Math.pow(.02*d,2),_=new Int32Array(a.n),p=0;p<a.n;p++)_[p]=p;var u=a.n,g=new Int32Array(a.n),x=0;for(p=0;p<a.n;p++)x+=l[p];var T=[],P=0,b=null,R=0,N="ransac",Y=!0,S=null,A=performance.now();function G(oe,q,E,y){if(!c)return f;var I=oe*6,C=q*(c[I]*q+c[I+1]*E+c[I+2]*y)+E*(c[I+1]*q+c[I+3]*E+c[I+4]*y)+y*(c[I+2]*q+c[I+4]*E+c[I+5]*y),L=h*C;return L<m?m:L>v?v:L}function V(oe,q,E,y){for(var I=Math.max(1,Math.floor(u/jt.SCORE_N)),C=s()*I|0,L=0,F=C;F<u;F+=I){var J=_[F],z=J*3,ne=oe*o[z]+q*o[z+1]+E*o[z+2]-y;ne*ne<G(J,oe,q,E)&&(L+=l[J])}return L*I}function te(oe,q,E,y,I){for(var C=I?I*I:1,L=0,F=0,J=0;J<u;J++){var z=_[J],ne=z*3,_e=oe*o[ne]+q*o[ne+1]+E*o[ne+2]-y;_e*_e<G(z,oe,q,E)*C&&(g[L++]=z,F+=l[z])}return{count:L,weight:F}}var ee=0,H=1,re=1,U=1,Q=0,se=0,ue=0,Ae=null,Fe=null;function Z(){Q=1/0,se=1/0,ue=1/0;var oe=-1/0,q=-1/0,E=-1/0,y,I,C;for(y=0;y<u;y++)I=_[y],C=I*3,o[C]<Q&&(Q=o[C]),o[C]>oe&&(oe=o[C]),o[C+1]<se&&(se=o[C+1]),o[C+1]>q&&(q=o[C+1]),o[C+2]<ue&&(ue=o[C+2]),o[C+2]>E&&(E=o[C+2]);var L=Math.max(oe-Q,q-se,E-ue,1e-6);ee=L/jt.GRID_DIV,H=Math.min(48,Math.max(1,Math.ceil((oe-Q)/ee)+1)),re=Math.min(48,Math.max(1,Math.ceil((q-se)/ee)+1)),U=Math.min(48,Math.max(1,Math.ceil((E-ue)/ee)+1));var F=H*re*U;for(Ae=new Int32Array(F+1),Fe=new Int32Array(u),y=0;y<u;y++)Ae[ce(_[y])+1]++;for(y=0;y<F;y++)Ae[y+1]+=Ae[y];var J=new Int32Array(F);for(y=0;y<u;y++){var z=ce(_[y]);Fe[Ae[z]+J[z]++]=_[y]}}function ce(oe){var q=oe*3,E=Math.min(H-1,Math.max(0,(o[q]-Q)/ee|0)),y=Math.min(re-1,Math.max(0,(o[q+1]-se)/ee|0)),I=Math.min(U-1,Math.max(0,(o[q+2]-ue)/ee|0));return(I*re+y)*H+E}function ge(oe){var q=Ae[oe],E=Ae[oe+1];return E>q?Fe[q+(s()*(E-q)|0)]:-1}function ye(oe){var q=oe*3,E=Math.min(H-1,Math.max(0,(o[q]-Q)/ee|0)),y=Math.min(re-1,Math.max(0,(o[q+1]-se)/ee|0)),I=Math.min(U-1,Math.max(0,(o[q+2]-ue)/ee|0)),C=Math.min(H-1,Math.max(0,E+(s()*3|0)-1)),L=Math.min(re-1,Math.max(0,y+(s()*3|0)-1)),F=Math.min(U-1,Math.max(0,I+(s()*3|0)-1));return ge((F*re+L)*H+C)}function Ie(){var oe=_[s()*u|0],q=ce(oe),E=ge(q),y=ge(q);if((E<0||y<0||E===oe||y===oe||E===y)&&(E=ye(oe),y=ye(oe)),(E<0||y<0)&&(E=_[s()*u|0],y=_[s()*u|0]),oe===E||E===y||oe===y)return null;var I=oe*3,C=E*3,L=y*3,F=o[I],J=o[I+1],z=o[I+2],ne=o[C]-F,_e=o[C+1]-J,ie=o[C+2]-z,ae=o[L]-F,ve=o[L+1]-J,me=o[L+2]-z,fe=_e*me-ie*ve,Se=ie*ae-ne*me,Ce=ne*ve-_e*ae,Ne=Math.sqrt(fe*fe+Se*Se+Ce*Ce),D=Math.sqrt(ne*ne+_e*_e+ie*ie),de=Math.sqrt(ae*ae+ve*ve+me*me);return Ne<1e-6*D*de||Ne<1e-12?null:[fe/Ne,Se/Ne,Ce/Ne,(fe*F+Se*J+Ce*z)/Ne]}function Re(oe){for(var q=oe[0],E=oe[1],y=oe[2],I=oe[3],C=null,L=0,F=0,J=0,z=0;z<2;z++){if(C=te(q,E,y,I),C.count<jt.MIN_INLIERS)return null;var ne=0,_e,ie,ae,ve;for(L=0,F=0,J=0,_e=0;_e<C.count;_e++)ie=g[_e],ae=ie*3,ve=l[ie],ne+=ve,L+=ve*o[ae],F+=ve*o[ae+1],J+=ve*o[ae+2];if(!(ne>0))return null;L/=ne,F/=ne,J/=ne;var me=0,fe=0,Se=0,Ce=0,Ne=0,D=0;for(_e=0;_e<C.count;_e++){ie=g[_e],ae=ie*3,ve=l[ie];var de=o[ae]-L,W=o[ae+1]-F,K=o[ae+2]-J;me+=ve*de*de,fe+=ve*de*W,Se+=ve*de*K,Ce+=ve*W*W,Ne+=ve*W*K,D+=ve*K*K}var le=Hw([me,fe,Se,Ce,Ne,D]),xe=0;le.vals[1]<le.vals[xe]&&(xe=1),le.vals[2]<le.vals[xe]&&(xe=2);var ke=le.vecs[0][xe],We=le.vecs[1][xe],nt=le.vecs[2][xe],Be=Math.sqrt(ke*ke+We*We+nt*nt);if(!(Be>1e-9))return null;q=ke/Be,E=We/Be,y=nt/Be,I=q*L+E*F+y*J}return C=te(q,E,y,I),C.count<jt.MIN_INLIERS?null:{nx:q,ny:E,nz:y,d:I,cx:L,cy:F,cz:J,res:C}}function Ve(oe){var q=oe.nx,E=oe.ny,y=oe.nz,I=oe.d,C=oe.res.count;E<0&&(q=-q,E=-E,y=-y,I=-I);var L=Gw(q,E,y),F=L[0],J=L[1],z=L[2],ne=L[3],_e=L[4],ie=L[5],ae=0,ve=0,me=0,fe=0,Se,Ce,Ne,D;for(Se=0;Se<C;Se++)Ce=g[Se],Ne=Ce*3,D=l[Ce],ae+=D,ve+=D*o[Ne],me+=D*o[Ne+1],fe+=D*o[Ne+2];ve/=ae,me/=ae,fe/=ae;var de=1/0,W=-1/0,K=1/0,le=-1/0,xe=0,ke=new Float32Array(C),We=new Float32Array(C);for(Se=0;Se<C;Se++){Ce=g[Se],Ne=Ce*3;var nt=o[Ne]-ve,Be=o[Ne+1]-me,lt=o[Ne+2]-fe,Ct=nt*F+Be*J+lt*z,On=nt*ne+Be*_e+lt*ie;ke[Se]=Ct,We[Se]=On,Ct<de&&(de=Ct),Ct>W&&(W=Ct),On<K&&(K=On),On>le&&(le=On);var Oi=nt*q+Be*E+lt*y;xe+=l[Ce]*Oi*Oi}var gn=Math.sqrt(xe/ae),kn=Math.max(W-de,1e-6),ni=Math.max(le-K,1e-6),pi=Math.max(Math.sqrt(kn*ni)/48,1e-6),xt=Math.min(256,Math.max(1,Math.ceil(kn/pi))),sn=Math.min(256,Math.max(1,Math.ceil(ni/pi))),Cn=new Uint8Array(xt*sn),mi=new Int32Array(xt),ii=new Int32Array(sn);for(Se=0;Se<C;Se++){var gi=Math.min(xt-1,Math.max(0,Math.floor((ke[Se]-de)/kn*xt))),ki=Math.min(sn-1,Math.max(0,Math.floor((We[Se]-K)/ni*sn)));Cn[ki*xt+gi]=1,mi[gi]++,ii[ki]++}function Bi(Qr,i0){var So=0,Mo=Qr.length-1,fa=0,Uh=i0*.01,ri;for(ri=0;ri<Qr.length;ri++)if(fa+=Qr[ri],fa>=Uh){So=ri;break}for(fa=0,ri=Qr.length-1;ri>=0;ri--)if(fa+=Qr[ri],fa>=Uh){Mo=ri;break}return Mo<So&&(So=0,Mo=Qr.length-1),[So,Mo]}for(var w=Bi(mi,C),k=Bi(ii,C),X=kn/xt,$=ni/sn,B=new Int32Array(xt*sn).fill(-1),pe=[],Me=[],Te=k[0];Te<=k[1];Te++)for(var we=w[0];we<=w[1];we++){var Ue=Te*xt+we;if(!(!Cn[Ue]||B[Ue]>=0)){var Oe=pe.length,Pe=0;for(Me.length=0,Me.push(Ue),B[Ue]=Oe;Me.length;){var Je=Me.pop();Pe++;for(var st=Je%xt,ft=Je/xt|0,Nt=-1;Nt<=1;Nt++)for(var Ke=-1;Ke<=1;Ke++)if(!(!Nt&&!Ke)){var Le=st+Nt,St=ft+Ke;if(!(Le<w[0]||Le>w[1]||St<k[0]||St>k[1])){var qe=St*xt+Le;!Cn[qe]||B[qe]>=0||(B[qe]=Oe,Me.push(qe))}}}pe.push(Pe)}}for(var Kt=0,Bn=0;Bn<pe.length;Bn++)pe[Bn]>Kt&&(Kt=pe[Bn]);var qt=Kt*.2,zi=0,at=1/0,vn=-1/0,Hi=1/0,Ot=-1/0;for(Te=k[0];Te<=k[1];Te++)for(we=w[0];we<=w[1];we++){var qr=Te*xt+we;B[qr]<0||pe[B[qr]]<qt||(zi++,we<at&&(at=we),we>vn&&(vn=we),Te<Hi&&(Hi=Te),Te>Ot&&(Ot=Te))}zi===0&&(at=w[0],vn=w[1],Hi=k[0],Ot=k[1],zi=1);var Nc=X*$,ca=zi*Nc,J_=de+at*X,e0=de+(vn+1)*X,t0=K+Hi*$,n0=K+(Ot+1)*$;de=J_,W=e0,K=t0,le=n0;var Ih=Math.max((W-de)*(le-K),1e-9),ua=Math.abs(q*ku.x+E*ku.y+y*ku.z),Zr,da,Ic=null,Dh=null;return ua>=.906?(Zr="slab",da=Math.acos(Math.min(1,ua))):ua<=.423?(Zr="wall",da=Math.asin(Math.min(1,ua)),Ic=Math.tan(da),Dh=Bw(Ic)):(Zr="incline",da=Math.acos(Math.min(1,ua))),{id:T.length+1,label:(Zr==="wall"?"W":Zr==="slab"?"S":"I")+(T.length+1),n:[q,E,y],d:I,centroid:[ve,me,fe],u:[F,J,z],v:[ne,_e,ie],umin:de,umax:W,vmin:K,vmax:le,count:C,weight:ae,support:ae/x,area:ca,bboxArea:Ih,fill:Math.min(1,ca/Ih),rms:gn,cls:Zr,tilt:da,drift:Ic,band:Dh}}function Ye(oe,q,E,y){for(var I=te(oe,q,E,y,jt.CLAIM),C=0,L=0,F=0;F<I.count;F++){var J=g[F],z=J*3,ne=l[J];C+=ne,L+=ne*(oe*o[z]+q*o[z+1]+E*o[z+2]-y)}return C>0&&(I=te(oe,q,E,y+L/C,jt.CLAIM)),I}var ze=2*jt.CLAIM*Math.sqrt(f);function O(oe){for(var q=0;q<T.length;q++){var E=T[q];if(!(Math.abs(oe.nx*E.n[0]+oe.ny*E.n[1]+oe.nz*E.n[2])<.995)&&!(Math.abs(oe.nx*E.centroid[0]+oe.ny*E.centroid[1]+oe.nz*E.centroid[2]-oe.d)>ze)){var y=oe.cx-E.centroid[0],I=oe.cy-E.centroid[1],C=oe.cz-E.centroid[2],L=y*E.u[0]+I*E.u[1]+C*E.u[2],F=y*E.v[0]+I*E.v[1]+C*E.v[2],J=(E.umax-E.umin)*.25,z=(E.vmax-E.vmin)*.25;if(!(L<E.umin-J||L>E.umax+J||F<E.vmin-z||F>E.vmax+z))return E}}return null}function Tt(oe){for(var q=new Uint8Array(a.n),E=0;E<oe;E++)q[g[E]]=1;for(var y=0,I=0;I<u;I++){var C=_[I];q[C]||(_[y++]=C)}u=y}function He(){for(var oe=null,q=null,E=0;E<T.length;E++){var y=T[E];y.cls!=="slab"||y.support<.03||(oe===null||y.centroid[1]<oe)&&(oe=y.centroid[1],q=y)}if(oe===null){var I=[];for(E=0;E<a.n;E+=Math.max(1,Math.floor(a.n/5e3)))I.push(o[E*3+1]);I.sort(function(ki,Bi){return ki-Bi}),oe=I[Math.floor(I.length*.02)]||0}if(u<50)return{groundY:oe,groundPlane:q?q.label:null,clusters:[],totalVolume:0,cell:0};var C=1/0,L=-1/0,F=1/0,J=-1/0,z,ne,_e;for(z=0;z<u;z++)ne=_[z],_e=ne*3,o[_e]<C&&(C=o[_e]),o[_e]>L&&(L=o[_e]),o[_e+2]<F&&(F=o[_e+2]),o[_e+2]>J&&(J=o[_e+2]);var ie=Math.max((L-C+J-F)/2/96,d/400),ae=Math.min(400,Math.max(2,Math.ceil((L-C)/ie)+1)),ve=Math.min(400,Math.max(2,Math.ceil((J-F)/ie)+1)),me=(L-C)/ae||ie,fe=(J-F)/ve||ie,Se=new Float32Array(ae*ve);for(z=0;z<u;z++){ne=_[z],_e=ne*3;var Ce=o[_e+1]-oe;if(!(Ce<=0)){var Ne=Math.min(ae-1,Math.max(0,Math.floor((o[_e]-C)/me))),D=Math.min(ve-1,Math.max(0,Math.floor((o[_e+2]-F)/fe))),de=D*ae+Ne;Ce>Se[de]&&(Se[de]=Ce)}}for(var W=.02*d,K=new Uint8Array(ae*ve),le=[],xe=me*fe,ke=0,We=[],nt=0;nt<ae*ve;nt++)if(!(K[nt]||Se[nt]<=W)){We.length=0,We.push(nt),K[nt]=1;for(var Be=0,lt=0,Ct=0,On=0,Oi=0;We.length;){var gn=We.pop(),kn=gn%ae,ni=gn/ae|0,pi=Se[gn];Be+=pi*xe,lt++,pi>Ct&&(Ct=pi),On+=C+(kn+.5)*me,Oi+=F+(ni+.5)*fe;for(var xt=-1;xt<=1;xt++)for(var sn=-1;sn<=1;sn++)if(!(!xt&&!sn)){var Cn=kn+xt,mi=ni+sn;if(!(Cn<0||mi<0||Cn>=ae||mi>=ve)){var ii=mi*ae+Cn;K[ii]||Se[ii]<=W||(K[ii]=1,We.push(ii))}}}ke+=Be,lt>=4&&le.push({id:0,volume:Be,footprint:lt*xe,maxHeight:Ct,centre:[On/lt,oe,Oi/lt],cells:lt})}le.sort(function(ki,Bi){return Bi.volume-ki.volume}),le=le.slice(0,10);for(var gi=0;gi<le.length;gi++)le[gi].id=gi+1;return{groundY:oe,groundPlane:q?q.label:null,clusters:le,totalVolume:ke,cell:ie}}function Ge(){if(N==="ransac"){if(Y)return Z(),Y=!1,!1;for(var oe=40;oe-- >0&&P<jt.ITER;){P++;var q=Ie();if(q){var E=V(q[0],q[1],q[2],q[3]);E>R&&(R=E,b=q)}}return P>=jt.ITER&&(N="commit"),!1}if(N==="commit"){var y=!1;if(!b||R<jt.MIN_SUPPORT*x)y=!0;else{var I=Re(b);if(!I||I.res.weight<jt.MIN_SUPPORT*x)y=!0;else{var C=O(I);if(C){var L=Ye(I.nx,I.ny,I.nz,I.d);C.claimed=(C.claimed||C.count)+L.count,Tt(L.count)}else{var F=Ve(I);T.push(F);var J=Ye(F.n[0],F.n[1],F.n[2],F.d);F.claimed=J.count,Tt(J.count)}Y=!0}}return y||T.length>=jt.MAX_PLANES||u<Math.max(400,a.n*.02)?N="debris":(P=0,b=null,R=0,N="ransac"),!1}if(N==="debris"){for(var z=He(),ne=0,_e=0;_e<u;_e++)ne+=l[_[_e]];return S={planes:T,debris:z,workingSet:a.n,sampleStep:a.step,radius:d,usedCovariance:!!c,totalWeight:x,residualPoints:u,residualFrac:ne/x,ms:Math.round(performance.now()-A)},N="done",!0}return!0}function De(){var oe=performance.now();try{for(;performance.now()-oe<jt.BUDGET_MS;)if(Ge()){n(S);return}}catch(q){i(q instanceof Error?q:new Error(String(q)));return}e(T.length,N,1-u/a.n),setTimeout(De,0)}setTimeout(De,0)}function jw(t){return t.filter(e=>e.support>=.01&&e.fill>=.25)}function Nh(t,e){if(!e)return null;for(var n=null,i=1/0,r=0;r<e.planes.length;r++){var s=e.planes[r],a=t.pos.x-s.centroid[0],o=t.pos.y-s.centroid[1],l=t.pos.z-s.centroid[2],c=Math.abs(a*s.n[0]+o*s.n[1]+l*s.n[2]),d=a*s.u[0]+o*s.u[1]+l*s.u[2],h=a*s.v[0]+o*s.v[1]+l*s.v[2],f=(s.umax-s.umin)*.12,m=(s.vmax-s.vmin)*.12;d<s.umin-f||d>s.umax+f||h<s.vmin-m||h>s.vmax+m||c<i&&(i=c,n={plane:s,index:r,dist:c})}return!n||i>.05*e.radius?null:n}function Xw(t,e,n,i){const r=new Iw({canvas:t,antialias:!1});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setClearColor(0,0);const s=new Dw,a=new Ln(55,1,.01,4e3),o=new Ow,l={target:new j(0,0,0),radius:24,theta:.7,phi:1.15},c={radius:24,theta:.7,phi:1.15,target:new j(0,0,0)};let d=null;const h={A:null,B:null};let f="A";const m=new Lh(1,12,10),v=new Map;let _=!1,p=null;const u=new Da;s.add(u);let g=!0,x=[],T=0,P=!1;function b(){const C=Math.max(1,e.clientWidth),L=Math.max(1,e.clientHeight);r.setSize(C,L,!1),a.aspect=C/L,a.updateProjectionMatrix()}function R(){const C=Math.sin(l.phi),L=Math.cos(l.phi);a.position.set(l.target.x+l.radius*C*Math.sin(l.theta),l.target.y+l.radius*L,l.target.z+l.radius*C*Math.cos(l.theta)),a.lookAt(l.target)}const N=new j,Y=new j;function S(C,L){a.updateMatrixWorld(),N.setFromMatrixColumn(a.matrix,0),Y.setFromMatrixColumn(a.matrix,1);const F=l.radius*.0016;l.target.addScaledVector(N,-C*F),l.target.addScaledVector(Y,L*F),d=null}function A(){l.target.copy(c.target),l.radius=c.radius,l.theta=c.theta,l.phi=c.phi,d=null}const G=new Map;let V=null,te=0,ee=0;function H(){let C=null,L=null;if(G.forEach(z=>{C?L||(L=z):C=z}),!C||!L)return 0;const F=C,J=L;return Math.hypot(F.x-J.x,F.y-J.y)}const re=C=>{try{t.setPointerCapture(C.pointerId)}catch{}if(G.set(C.pointerId,{x:C.clientX,y:C.clientY}),G.size===2){ee=H(),V=null,te=999;return}V={id:C.pointerId,pan:C.button===2||C.shiftKey},te=0},U=C=>{const L=G.get(C.pointerId);if(!L)return;const F=C.clientX-L.x,J=C.clientY-L.y;if(L.x=C.clientX,L.y=C.clientY,G.size>=2){const z=H();ee>0&&z>0&&(l.radius=Ua(l.radius*(ee/z),.3,600)),ee=z,te=999;return}!V||V.id!==C.pointerId||(te+=Math.abs(F)+Math.abs(J),V.pan?S(F,J):(l.theta-=F*.006,l.phi=Ua(l.phi-J*.006,.05,Math.PI-.05)))},Q=C=>{const L=V&&V.id===C.pointerId;G.delete(C.pointerId),G.size<2&&(ee=0),L&&(V=null,te<5&&Fe(C))},se=C=>C.preventDefault(),ue=C=>{C.preventDefault(),l.radius=Ua(l.radius*(1+Math.sign(C.deltaY)*.11),.3,600)};t.addEventListener("pointerdown",re),t.addEventListener("pointermove",U),t.addEventListener("pointerup",Q),t.addEventListener("pointercancel",Q),t.addEventListener("contextmenu",se),t.addEventListener("wheel",ue,{passive:!1}),window.addEventListener("resize",b);function Ae(){const C=[];return Object.keys(h).forEach(L=>{const F=h[L];F&&F.obj.visible&&C.push(F.obj)}),C}function Fe(C){if(!_)return;const L=Ae();if(!L.length){i.onStatus("nothing loaded — click SYNTHETIC SCENE or LOAD .PLY first");return}const F=t.getBoundingClientRect(),J=new rt((C.clientX-F.left)/F.width*2-1,-((C.clientY-F.top)/F.height)*2+1);o.setFromCamera(J,a),o.params.Points.threshold=Math.max(.02,l.radius*.012);const z=o.intersectObjects(L,!1);if(!z.length){i.onStatus("no surface under the cursor — aim at the rubble and click again (ESC cancels)");return}const ne=z[0].point;i.onSitePlaced({x:ne.x,y:ne.y,z:ne.z}),Z(!1)}function Z(C){_=C,document.body.classList.toggle("marking",_),i.onHint(_?"MARKING — click a structure to place a site · ESC cancels":""),i.onMarkModeChange(_)}function ce(C,L,F){p=L;const J=new Set;for(const z of C){J.add(z.id);let ne=v.get(z.id);if(!ne){const _e=new oc({color:16739125,depthTest:!1,transparent:!0,opacity:.95}),ie=new qn(m,_e);ie.renderOrder=10,s.add(ie);const ae=document.createElement("div");ae.className="label",ae.addEventListener("pointerdown",ve=>ve.stopPropagation()),ae.addEventListener("click",ve=>{ve.stopPropagation(),i.onSelectSite(z.id)}),n.appendChild(ae),ne={mesh:ie,el:ae},v.set(z.id,ne)}ne.mesh.position.set(z.pos.x,z.pos.y,z.pos.z),ne.el.textContent=String(F.get(z.id)??"–"),ne.el.classList.toggle("low",z.conf==="low"),ne.el.classList.toggle("sel",z.id===p),ne.mesh.material.color.setHex(z.conf==="low"?16756768:16739125)}for(const[z,ne]of v)J.has(z)||(s.remove(ne.mesh),ne.mesh.material.dispose(),ne.el.remove(),v.delete(z))}const ge=new j;function ye(){const C=l.radius*.012,L=e.clientWidth,F=e.clientHeight;for(const[J,z]of v){if(z.mesh.scale.setScalar(C*(J===p?1.45:1)),ge.copy(z.mesh.position).project(a),ge.z>=1){z.el.style.display="none";continue}z.el.style.display="",z.el.style.left=(ge.x*.5+.5)*L+"px",z.el.style.top=(-ge.y*.5+.5)*F+"px"}for(const J of x){if(ge.copy(J.pos).project(a),ge.z>=1){J.el.style.display="none";continue}J.el.style.display="",J.el.style.left=(ge.x*.5+.5)*L+"px",J.el.style.top=(-ge.y*.5+.5)*F+"px"}}function Ie(){var C;for(let L=u.children.length-1;L>=0;L--){const F=u.children[L];u.remove(F),(C=F.geometry)==null||C.dispose(),F.material&&F.material.dispose()}x.forEach(L=>L.el.remove()),x=[]}const Re=C=>C.cls==="wall"&&C.band?C.band.hex:zw[C.cls],Ve=C=>C.cls==="wall"&&C.band?C.band.css:W_[C.cls];function Ye(C){Ie(),!(!C||!g)&&C.planes.forEach((L,F)=>{const J=Re(L),z=L.centroid,ne=L.u,_e=L.v,ie=(W,K)=>[z[0]+ne[0]*W+_e[0]*K,z[1]+ne[1]*W+_e[1]*K,z[2]+ne[2]*W+_e[2]*K],ae=[ie(L.umin,L.vmin),ie(L.umax,L.vmin),ie(L.umax,L.vmax),ie(L.umin,L.vmax)],ve=new Float32Array([].concat(ae[0],ae[1],ae[2],ae[3])),me=new un;me.setAttribute("position",new Jt(ve,3)),me.setIndex([0,1,2,0,2,3]);const fe=new qn(me,new oc({color:J,transparent:!0,opacity:.04+.11*L.fill,side:ui,depthWrite:!1}));fe.renderOrder=4,u.add(fe);const Se=new un;Se.setAttribute("position",new Jt(ve.slice(),3));const Ce=new Uw(Se,new yf({color:J,transparent:!0,opacity:.9}));Ce.renderOrder=5,u.add(Ce);const Ne=Math.max(L.umax-L.umin,L.vmax-L.vmin)*.12,D=new un;D.setAttribute("position",new Jt(new Float32Array([z[0],z[1],z[2],z[0]+L.n[0]*Ne,z[1]+L.n[1]*Ne,z[2]+L.n[2]*Ne]),3)),u.add(new V_(D,new yf({color:J,transparent:!0,opacity:.55})));const de=document.createElement("div");de.className="plabel",de.style.borderColor=Ve(L),de.style.color=Ve(L),de.textContent=L.label+(L.cls==="wall"&&L.drift!=null?"  "+(L.drift*100).toFixed(1)+"%":"  "+(L.tilt*180/Math.PI).toFixed(0)+"°"),de.addEventListener("click",W=>{W.stopPropagation(),O(F)}),n.appendChild(de),x.push({el:de,pos:new j(z[0],z[1],z[2])})})}function ze(){const C=h[f];Ye((C==null?void 0:C.geom)??null)}function O(C){var J;const L=h[f],F=(J=L==null?void 0:L.geom)==null?void 0:J.planes[C];F&&(d=new j(F.centroid[0],F.centroid[1],F.centroid[2]),i.onSelectPlane(C))}function Tt(){return h.A&&h.A.auto||!h.A?"A":h.B?f:"B"}function He(C){f=C,Object.keys(h).forEach(F=>{const J=h[F];J&&(J.obj.visible=F===f)}),ze(),i.onSlotsChanged();const L=h[f];i.onStatus(L?`slot ${f}: ${L.name} — ${Mn(L.kept)} pts`:`slot ${f} is empty — load a .ply into it`)}function Ge(C){const L=h[C];if(!L)return;const F=L.obj.geometry.boundingSphere;if(!F)return;const J=F.center.clone();L.obj.updateMatrixWorld(),J.applyMatrix4(L.obj.matrixWorld);const z=isFinite(F.radius)&&F.radius>0?F.radius:10;l.target.copy(J),l.radius=Ua(z*2.2,.3,600),l.theta=.7,l.phi=1.15,d=null,c.target.copy(J),c.radius=l.radius,c.theta=.7,c.phi=1.15,a.near=Math.max(.01,z/2e3),a.far=Math.max(100,z*60),a.updateProjectionMatrix()}function De(C,L,F,J=!1){const z=Tt(),ne=h[z];ne&&(s.remove(ne.obj),ne.obj.geometry.dispose(),ne.obj.material.dispose());const _e=new un;_e.setAttribute("position",new Jt(C.positions,3)),_e.setAttribute("color",new Jt(C.colors,3)),_e.computeBoundingSphere();const ie=_e.boundingSphere,ae=ie&&isFinite(ie.radius)&&ie.radius>0?ie.radius:10,ve=new G_({size:Math.max(.004,ae*.0035),vertexColors:!0,sizeAttenuation:!0}),me=new Fw(_e,ve);let fe=null,Se=F;Se==null&&(fe=kw(C.positions),Se=fe.index),me.rotation.x=ps[Se].rx,s.add(me),h[z]={obj:me,name:L,kept:C.kept,total:C.total,orient:Se,auto:J,detected:fe,alphas:C.alphas??null,cov:C.cov??null,radius:ae,geom:null},f=z,He(z),Ge(z),i.onStatus(`${L} → slot ${z} · ${Mn(C.kept)} / ${Mn(C.total)} pts · 1:${C.step} sampling · ${Mn(C.culled)} culled · colour ${C.colorSource}`+(fe?` · up-axis ${ps[Se].name}`+(fe.confident?` (detected, floor holds ${Math.round(fe.score*100)}% of points)`:" (UNCERTAIN — press f if this looks wrong)"):""))}function oe(){const C=h[f];if(!C)return i.onStatus(`slot ${f} is empty — nothing to reorient`),null;C.orient=(C.orient+1)%ps.length,C.obj.rotation.x=ps[C.orient].rx;let L=!1;return C.geom&&(C.geom=null,Ie(),L=!0),Ge(f),i.onSlotsChanged(),{name:ps[C.orient].name,clearedGeometry:L}}function q(C){const L=h[C];return L?{name:L.name,kept:L.kept,total:L.total,orient:ps[L.orient],hasCov:!!L.cov,radius:L.radius,auto:L.auto,geom:L.geom}:null}function E(){const C=h[f];return C?(C.obj.updateMatrixWorld(),{positions:C.obj.geometry.attributes.position.array,alphas:C.alphas,cov:C.cov,matrixWorld:C.obj.matrixWorld.elements,radius:C.radius}):null}function y(C){const L=h[f];L&&(L.geom=C),ze(),i.onSlotsChanged()}function I(){P||(T=requestAnimationFrame(I),d&&(l.target.lerp(d,.18),l.target.distanceTo(d)<l.radius*.001&&(d=null)),R(),ye(),r.render(s,a))}return b(),I(),{resize:b,resetView:A,installCloud:De,setActiveSlot:He,frameSlot:Ge,cycleOrientation:oe,getExtractInput:E,setGeom:y,refreshOverlay:ze,focusPlane:O,syncSites:ce,setMarkMode:Z,getSlot:q,getActiveSlot:()=>f,isMarkMode:()=>_,flyTo:C=>{d=new j(C.x,C.y,C.z)},setPlanesVisible:C=>{g=C,ze()},planesVisible:()=>g,dispose:()=>{P=!0,cancelAnimationFrame(T),t.removeEventListener("pointerdown",re),t.removeEventListener("pointermove",U),t.removeEventListener("pointerup",Q),t.removeEventListener("pointercancel",Q),t.removeEventListener("contextmenu",se),t.removeEventListener("wheel",ue),window.removeEventListener("resize",b),Ie(),v.forEach(C=>{s.remove(C.mesh),C.el.remove()}),v.clear(),r.dispose()}}}const ei={pancake:.35,mixed:.15,lean:.06},j_={pancake:"PANCAKE",mixed:"MIXED",lean:"LEAN-TO"},ms={n:8,q:.35,r:.6,type:"mixed",tau:4,conf:"med"};function gr(t){return t.n*t.q*t.r*ei[t.type]/Math.max(.1,t.tau)}function Lc(t){return t.slice().sort((e,n)=>gr(n)-gr(e))}function Bu(t){return Math.LN2/ei[t]}const Tf=9e5;var gs=.28209479177387814,Xm=.12;const $w={char:1,uchar:1,int8:1,uint8:1,short:2,ushort:2,int16:2,uint16:2,int:4,uint:4,int32:4,uint32:4,float:4,float32:4,double:8,float64:8},Yw={char:1,uchar:1,int8:1,uint8:1};function $m(t,e,n,i,r,s,a,o,l){var c=Math.exp(2*n),d=Math.exp(2*i),h=Math.exp(2*r);isFinite(c)||(c=0),isFinite(d)||(d=0),isFinite(h)||(h=0);var f=Math.sqrt(s*s+a*a+o*o+l*l);f>1e-12||(s=1,a=o=l=0,f=1),s/=f,a/=f,o/=f,l/=f;var m=1-2*(o*o+l*l),v=2*(a*o-s*l),_=2*(a*l+s*o),p=2*(a*o+s*l),u=1-2*(a*a+l*l),g=2*(o*l-s*a),x=2*(a*l-s*o),T=2*(o*l+s*a),P=1-2*(a*a+o*o),b=e*6;t[b]=c*m*m+d*v*v+h*_*_,t[b+1]=c*m*p+d*v*u+h*_*g,t[b+2]=c*m*x+d*v*T+h*_*P,t[b+3]=c*p*p+d*u*u+h*g*g,t[b+4]=c*p*x+d*u*T+h*g*P,t[b+5]=c*x*x+d*T*T+h*P*P}function X_(t){for(var e=[101,110,100,95,104,101,97,100,101,114],n=Math.min(t.length,4194304),i=0;i+e.length<n;i++)if(t[i]===e[0]){for(var r=!0,s=1;s<e.length;s++)if(t[i+s]!==e[s]){r=!1;break}if(r){var a=i+e.length;if(t[a]===13&&a++,t[a]===10)return{textEnd:a+1,dataStart:a+1}}}return null}function Kw(t){var e=new Uint8Array(t),n=X_(e);if(!n)throw new Error('no "end_header" found — this file is not a .ply, or it is truncated');var i=new TextDecoder("ascii").decode(e.subarray(0,n.textEnd)),r=i.split(/\r?\n/);if(!/^ply\s*$/i.test((r[0]||"").trim()))throw new Error('missing the "ply" magic line at the top of the file');for(var s=null,a=0,o=[],l=0,c=!1,d=!1,h=1;h<r.length;h++){var f=r[h].trim();if(f){var m=f.split(/\s+/);if(m[0]==="format")s=(m[1]||"").toLowerCase();else if(m[0]==="element")c=m[1]==="vertex",c&&(a=parseInt(m[2],10)||0,d=!0);else if(m[0]==="property"&&c){if(m[1]==="list")continue;var v=(m[1]||"").toLowerCase(),_=m[2],p=$w[v];if(!p)throw new Error('unsupported property type "'+m[1]+'" in the vertex element');o.push({name:_,type:v,size:p,offset:l,order:o.length}),l+=p}}}if(!s)throw new Error('header has no "format" line');if(s!=="binary_little_endian"&&s!=="binary_big_endian"&&s!=="ascii")throw new Error('unrecognised ply format "'+s+'"');if(!d)throw new Error('no "element vertex" in the header — this looks like a mesh-only or empty .ply');if(!a)throw new Error("the header declares 0 vertices");for(var u={},g=0;g<o.length;g++)u[o[g].name]=o[g];if(!u.x||!u.y||!u.z)throw new Error("vertex element has no x/y/z properties — this .ply carries no point coordinates");var x=s!=="binary_big_endian",T=s==="ascii",P=!!(u.f_dc_0&&u.f_dc_1&&u.f_dc_2),b=u.red&&u.green&&u.blue?["red","green","blue"]:u.r&&u.g&&u.b?["r","g","b"]:null,R=!!u.opacity,N=b&&Yw[u[b[0]].type]?1/255:1,Y=!!(u.scale_0&&u.scale_1&&u.scale_2&&u.rot_0&&u.rot_1&&u.rot_2&&u.rot_3),S=Math.max(1,Math.ceil(a/Tf)),A=Math.ceil(a/S),G=new Float32Array(A*3),V=new Float32Array(A*3),te=new Float32Array(A),ee=Y?new Float32Array(A*6):null,H=0;function re(D,de,W,K,le,xe,ke){var We=H*3;G[We]=D,G[We+1]=de,G[We+2]=W,V[We]=K,V[We+1]=le,V[We+2]=xe,te[H]=ke,H++}var U=0;if(T)for(var L=new TextDecoder("utf-8").decode(e.subarray(n.dataStart)),F=L.split(`
`),J=u.x.order,z=u.y.order,ne=u.z.order,_e=0,ie=0;ie<F.length&&_e<a;ie++){var ae=F[ie].trim();if(ae){var ve=_e++;if(ve%S===0){var me=ae.split(/\s+/);if(!(me.length<o.length)){var fe=1;if(R&&(fe=1/(1+Math.exp(-parseFloat(me[u.opacity.order]))),fe<Xm)){U++;continue}var Se=.6,Ce=.6,Ne=.6;P?(Se=Xt(.5+gs*parseFloat(me[u.f_dc_0.order])),Ce=Xt(.5+gs*parseFloat(me[u.f_dc_1.order])),Ne=Xt(.5+gs*parseFloat(me[u.f_dc_2.order]))):b&&(Se=Xt(parseFloat(me[u[b[0]].order])*N),Ce=Xt(parseFloat(me[u[b[1]].order])*N),Ne=Xt(parseFloat(me[u[b[2]].order])*N)),Y&&$m(ee,H,parseFloat(me[u.scale_0.order]),parseFloat(me[u.scale_1.order]),parseFloat(me[u.scale_2.order]),parseFloat(me[u.rot_0.order]),parseFloat(me[u.rot_1.order]),parseFloat(me[u.rot_2.order]),parseFloat(me[u.rot_3.order])),re(parseFloat(me[J]),parseFloat(me[z]),parseFloat(me[ne]),Se,Ce,Ne,fe)}}}}else{let D=function(de){var W=u[de];if(!W)return null;var K=W.offset;switch(W.type){case"float":case"float32":return function(le){return Q.getFloat32(le+K,x)};case"double":case"float64":return function(le){return Q.getFloat64(le+K,x)};case"uchar":case"uint8":return function(le){return Q.getUint8(le+K)};case"char":case"int8":return function(le){return Q.getInt8(le+K)};case"ushort":case"uint16":return function(le){return Q.getUint16(le+K,x)};case"short":case"int16":return function(le){return Q.getInt16(le+K,x)};case"uint":case"uint32":return function(le){return Q.getUint32(le+K,x)};case"int":case"int32":return function(le){return Q.getInt32(le+K,x)}}return null};for(var Q=new DataView(t),se=D("x"),ue=D("y"),Ae=D("z"),Fe=P?D("f_dc_0"):null,Z=P?D("f_dc_1"):null,ce=P?D("f_dc_2"):null,ge=b?D(b[0]):null,ye=b?D(b[1]):null,Ie=b?D(b[2]):null,Re=R?D("opacity"):null,Ve=Y?D("scale_0"):null,Ye=Y?D("scale_1"):null,ze=Y?D("scale_2"):null,O=Y?D("rot_0"):null,Tt=Y?D("rot_1"):null,He=Y?D("rot_2"):null,Ge=Y?D("rot_3"):null,De=n.dataStart,oe=0;oe<a;oe+=S){var q=De+oe*l;if(q+l>t.byteLength)break;var E=1;if(R&&(E=1/(1+Math.exp(-Re(q))),E<Xm)){U++;continue}var y=.6,I=.6,C=.6;P?(y=Xt(.5+gs*Fe(q)),I=Xt(.5+gs*Z(q)),C=Xt(.5+gs*ce(q))):b&&(y=Xt(ge(q)*N),I=Xt(ye(q)*N),C=Xt(Ie(q)*N)),Y&&$m(ee,H,Ve(q),Ye(q),ze(q),O(q),Tt(q),He(q),Ge(q)),re(se(q),ue(q),Ae(q),y,I,C,E)}}if(H===0)throw new Error("every point was rejected — all "+Mn(a)+" gaussians fell below the opacity floor, or the vertex data is unreadable");return{positions:G.subarray(0,H*3),colors:V.subarray(0,H*3),alphas:te.subarray(0,H),cov:ee?ee.subarray(0,H*6):null,total:a,kept:H,step:S,culled:U,colorSource:P?"SH dc":b?"rgb":"flat grey",format:s}}const Ym=262144,qw=700*1048576;function Zw(t){const e=new Uint8Array(t),n=X_(e);if(!n)return null;const i=new TextDecoder("ascii").decode(e.subarray(0,n.textEnd)),r=i.match(/element\s+vertex\s+(\d+)/i),s=i.match(/format\s+(\S+)/i);return{count:r&&parseInt(r[1],10)||0,format:s?s[1].toLowerCase():null,splat:/property\s+\S+\s+scale_0/i.test(i)&&/property\s+\S+\s+rot_0/i.test(i),dc:/property\s+\S+\s+f_dc_0/i.test(i)}}function Qw(t){return new Promise((e,n)=>{const i=new FileReader;i.onerror=()=>n(new Error("the browser refused to read this file")),i.onload=r=>e(r.target.result),i.readAsArrayBuffer(t)})}function Jw(t,e){return typeof t.stream!="function"||typeof ReadableStream>"u"?new Promise((n,i)=>{const r=new FileReader;r.onerror=()=>i(new Error("the browser refused to read this file")),r.onprogress=s=>{s.lengthComputable&&e(s.loaded/s.total)},r.onload=s=>n(s.target.result),r.readAsArrayBuffer(t)}):new Promise((n,i)=>{let r;try{r=new Uint8Array(t.size)}catch{i(new Error(`could not reserve ${Ef(t.size)} of memory for this scan`));return}const s=t.stream().getReader();let a=0;const o=()=>{s.read().then(({done:l,value:c})=>{if(l){n(r.buffer);return}if(a+c.length>r.length){i(new Error("the file changed size while it was being read"));return}r.set(c,a),a+=c.length,e(a/t.size),o()},i)};o()})}async function eA(t,e){e.onProgress({phase:"reading",frac:0,message:"opening …"});let n=null;try{n=Zw(await Qw(t.slice(0,Ym)))}catch(l){e.onFail("the browser refused to open this file",l);return}if(!n){e.onFail(`no "end_header" in the first ${Ef(Ym)} — this is not a .ply, or it is truncated`);return}const i=n.splat?"gaussian splat, covariance present":n.dc?"splat, no covariance":"point cloud",r=n.count?Math.max(1,Math.ceil(n.count/Tf)):1,s=`${Mn(n.count)} vertices · ${i}`+(r>1?` · sampling 1:${r}`:" · no sampling needed");if(e.onProgress({phase:"reading",frac:0,message:s}),t.size>qw&&!e.confirmLarge(`"${t.name}" is ${Ef(t.size)} (${Mn(n.count)} vertices).

A scan this large can exhaust the tab and kill the page. Rubble samples it down to ${Mn(Tf)} points, but the whole file has to be read in first.

Load it anyway?`)){e.onCancel();return}let a;try{a=await Jw(t,l=>{e.onProgress({phase:"reading",frac:l*.9,message:`${s}  ·  ${Math.round(l*100)}%`})})}catch(l){e.onFail(l instanceof Error?l.message:"the read failed",l);return}e.onProgress({phase:"parsing",frac:.93,message:`parsing ${Mn(n.count)} vertices …`}),await new Promise(l=>jm(l));let o;try{o=Kw(a)}catch(l){e.onFail(l instanceof Error?l.message:"parse failed",l);return}e.onProgress({phase:"building",frac:1,message:"building the point cloud …"}),await new Promise(l=>jm(l)),e.onDone(o,n)}function $_(){var t=14e3,e=12e3,n=32e3,i=t*6+e*2+n,r=new Float32Array(i*3),s=new Float32Array(i*3),a=0;function o(Fe,Z,ce,ge,ye,Ie){var Re=a*3;r[Re]=Fe,r[Re+1]=Z,r[Re+2]=ce,s[Re]=ge,s[Re+1]=ye,s[Re+2]=Ie,a++}function l(Fe,Z){var ce=.72+Math.random()*.5;return[Xt(Fe[0]*ce+Z*(Math.random()-.5)),Xt(Fe[1]*ce+Z*(Math.random()-.5)),Xt(Fe[2]*ce+Z*(Math.random()-.5))]}for(var c=new j,d=new hi,h=[.46,.44,.41],f=[.5,.45,.37],m=[.4,.37,.34],v=[{p:[0,.3,0],s:[17,.3,13],r:[.05,.1,-.03]},{p:[1.4,1.5,-1],s:[14,.26,11],r:[-.14,.55,.09]},{p:[-2.2,2.6,1.6],s:[12,.24,10],r:[.22,-.35,-.12]},{p:[2.8,3.6,2.2],s:[10,.22,9],r:[-.3,.95,.2]},{p:[-1,4.6,-2.4],s:[9,.2,8],r:[.38,.2,-.26]},{p:[.6,5.6,.8],s:[7,.18,6],r:[-.1,-.8,.34]}],_=0;_<v.length;_++){var p=v[_];d.set(p.r[0],p.r[1],p.r[2]);for(var u=0;u<t;u++){c.set((Math.random()-.5)*p.s[0],(Math.random()-.5)*p.s[1],(Math.random()-.5)*p.s[2]),c.applyEuler(d);var g=l(h,.06);o(c.x+p.p[0],c.y+p.p[1],c.z+p.p[2],g[0],g[1],g[2])}}for(var x=[{p:[-7.5,2.8,-4],s:[1,5.6,8],r:.18},{p:[6.8,2.2,4.6],s:[7,4.4,.9],r:-.11}],T=0;T<x.length;T++){var P=x[T];d.set(0,P.r,P.r*.5);for(var b=[P.s[1]*P.s[2],P.s[1]*P.s[2],P.s[0]*P.s[1],P.s[0]*P.s[1],P.s[0]*P.s[2]],R=[],N=0,Y=0;Y<5;Y++)N+=b[Y],R[Y]=N;for(var S=0;S<e;S++){for(var A=Math.random()*N,G=0;G<4&&R[G]<A;)G++;var V=(Math.random()-.5)*P.s[0],te=(Math.random()-.5)*P.s[1],ee=(Math.random()-.5)*P.s[2];G===0?V=-.5*P.s[0]:G===1?V=.5*P.s[0]:G===2?ee=-.5*P.s[2]:G===3?ee=.5*P.s[2]:te=.5*P.s[1]*(.8+Math.random()*.2),c.set(V,te,ee).applyEuler(d);var H=l(m,.05);o(c.x+P.p[0],c.y+P.p[1],c.z+P.p[2],H[0],H[1],H[2])}}for(var re=0;re<n;re++){var U=Math.pow(Math.random(),.6)*15.5,Q=Math.random()*Math.PI*2,se=Math.abs(Math.random()*Math.random())*1.7-.15,ue=l(f,.07);o(Math.cos(Q)*U+(Math.random()-.5)*.6,se,Math.sin(Q)*U+(Math.random()-.5)*.6,ue[0],ue[1],ue[2])}var Ae=new Float32Array(a);return Ae.fill(1),{positions:r.subarray(0,a*3),colors:s.subarray(0,a*3),alphas:Ae,cov:null,truth:{slabs:v,walls:x},total:a,kept:a,step:1,culled:0,colorSource:"procedural",format:"synthetic"}}let tA=1,nA=0,zs={sites:[],selectedId:null,selectedPlane:-1,tab:"queue",status:"ready — LOAD .PLY (or drop one here), or click SYNTHETIC SCENE",hint:"",metresPerUnit:1,markMode:!1,planesVisible:!0,loading:null,loadFile:"",geoStage:"idle",geoProgress:null,proposals:{},swarm:{run:null,busy:!1,notes:"",status:null},overrideLog:[],slotsVersion:0};const wf=new Set;function iA(){wf.forEach(t=>t())}function Ze(t){const e=typeof t=="function"?t(zs):t;zs={...zs,...e},iA()}function Pl(){return zs}function rA(t){return wf.add(t),()=>wf.delete(t)}function Sr(){return Dt.useSyncExternalStore(rA,()=>zs,()=>zs)}function sA(t){let e="",n=t|0;do e=String.fromCharCode(65+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}function aA(t){const e={id:tA++,name:"Site "+sA(nA++),pos:t,n:ms.n,q:ms.q,r:ms.r,type:ms.type,tau:ms.tau,conf:ms.conf};return Ze(n=>({sites:[...n.sites,e],selectedId:e.id,tab:"assess",status:`placed ${e.name} — ${n.sites.length+1} site${n.sites.length===0?"":"s"} marked`})),e}function Y_(t,e){Ze(n=>({sites:n.sites.map(i=>i.id===t?{...i,...e}:i)}))}function oA(t){Ze(e=>{const n=e.sites.find(r=>r.id===t),i=e.sites.filter(r=>r.id!==t);return{sites:i,selectedId:e.selectedId===t?null:e.selectedId,status:n?`deleted ${n.name} — ${i.length} site${i.length===1?"":"s"} remaining`:e.status}})}function K_(t){Ze({selectedId:t})}function pt(t){Ze({status:t})}function lA(t){Ze({hint:t})}function cA({viewer:t,ready:e,onLoadFile:n,onGeometry:i}){const r=Dt.useRef(null),s=Sr();s.slotsVersion;const a=e&&t?t.getActiveSlot():"A",o=()=>{t&&(pt("generating synthetic rubble field …"),window.setTimeout(()=>{try{t.installCloud($_(),"synthetic rubble field",0),Ze({selectedPlane:-1,geoStage:"idle"})}catch(c){console.error(c);const d=c instanceof Error?c.message:String(c);pt("synthetic scene failed: "+d),window.alert("Could not build the synthetic scene: "+d)}},30))},l=()=>{if(!t)return;const c=t.cycleOrientation();c&&(c.clearedGeometry&&Ze({geoStage:"idle",selectedPlane:-1}),pt(`slot ${t.getActiveSlot()} up-axis ${c.name}`+(c.clearedGeometry?" — extracted geometry cleared, re-run GEOMETRY":"")))};return M.jsxs("div",{id:"topbar",children:[M.jsxs("div",{className:"brand",children:["RUBBLE ",M.jsx("span",{children:"/ triage"})]}),M.jsx("button",{className:"btn",onClick:()=>{var c;return(c=r.current)==null?void 0:c.click()},children:"LOAD .PLY"}),M.jsx("input",{ref:r,type:"file",accept:".ply,application/octet-stream",hidden:!0,onChange:c=>{var h;const d=(h=c.target.files)==null?void 0:h[0];d&&n(d),c.target.value=""}}),M.jsx("button",{className:"btn",onClick:o,children:"SYNTHETIC SCENE"}),M.jsxs("button",{className:s.markMode?"btn on":"btn",onClick:()=>t==null?void 0:t.setMarkMode(!t.isMarkMode()),children:["⊕ MARK",M.jsx("em",{children:"m"})]}),M.jsx("span",{className:"sep"}),["A","B"].map(c=>M.jsx("button",{className:a===c?"btn slot on":"btn slot",title:`Scan slot ${c}`,onClick:()=>t==null?void 0:t.setActiveSlot(c),children:c},c)),M.jsx("span",{className:"sep"}),M.jsx("button",{className:"btn",onClick:()=>t==null?void 0:t.resetView(),children:"RESET VIEW"}),M.jsxs("button",{className:"btn",title:"Cycle the up-axis convention: Y-up, Y-down, Z-up, Z-down",onClick:l,children:["UP-AXIS",M.jsx("em",{children:"f"})]}),M.jsx("span",{className:"sep"}),M.jsxs("button",{className:"btn",title:"Fit planes, verticality and debris volume",onClick:i,children:["GEOMETRY",M.jsx("em",{children:"g"})]}),M.jsx("button",{className:s.planesVisible?"btn on":"btn",title:"Show or hide the fitted planes",onClick:()=>{if(!t)return;const c=!t.planesVisible();t.setPlanesVisible(c),Ze({planesVisible:c})},children:"PLANES"})]})}const uA={reading:"READING",parsing:"PARSING",building:"BUILDING"};function dA({progress:t,file:e}){return M.jsxs("div",{id:"loadbox",className:t?"on":void 0,children:[M.jsx("div",{className:"lt",children:t?uA[t.phase]:"READING"}),M.jsx("div",{className:"lf",children:e||"—"}),M.jsx("div",{className:"lm",children:(t==null?void 0:t.message)??""}),M.jsx("span",{className:"bar",children:M.jsx("i",{style:{width:`${(((t==null?void 0:t.frac)??0)*100).toFixed(1)}%`}})})]})}function ea(t,e){return t*e}function ta(t,e){return t*e*e}function na(t,e){return t*e*e*e}const fA="Ranked prior for incident command review. This is NOT an autonomous dispatch order — every input is an operator estimate and the ordering is only as good as those estimates.",hA="V_i(t) = n*q*r*exp(-lambda*t); greedy index rho = (n*q*r*lambda)/max(0.1, tau) [expected lives per crew-hour, ranked descending]",pA="Planes fitted by opacity-weighted RANSAC with a per-Gaussian tolerance eps_i = K*sqrt(n'*Sigma_i*n). Drift ratio = tan(tilt from plumb) and is scale-free. Areas and volumes are only metric if metres_per_unit is correct; debris volume is a column measure that assumes each pile is solid to the ground plane. Geometry is evidence for an assessor, not a slider value.",vs=t=>Number(t.toFixed(3));function q_(t,e,n){const i=new Blob([e],{type:n}),r=URL.createObjectURL(i),s=document.createElement("a");s.href=r,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(r),1500)}function Z_(){return new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}function mA(t){const e=t.geom;if(!e||!t.slot)return null;const n=t.metresPerUnit;return{scan:t.slot.name,slot:t.slotKey,metres_per_unit:n,scale_calibrated:n!==1,scene_radius:vs(e.radius),working_set_points:e.workingSet,used_per_gaussian_covariance:e.usedCovariance,unassigned_fraction:Number(e.residualFrac.toFixed(4)),fit_ms:e.ms,planes:e.planes.map(i=>({label:i.label,surface_class:i.cls,normal:i.n.map(vs),plane_offset_d:vs(i.d),centroid:i.centroid.map(vs),tilt_deg:Number((i.tilt*180/Math.PI).toFixed(3)),drift_ratio:i.drift==null?null:Number(i.drift.toFixed(5)),drift_band:i.band?i.band.name:null,area_m2:Number(ta(i.area,n).toFixed(3)),fill_fraction:Number(i.fill.toFixed(3)),support_fraction:Number(i.support.toFixed(4)),rms_residual_m:Number(ea(i.rms,n).toFixed(4)),inlier_points:i.count})),debris:{ground_height:vs(e.debris.groundY),ground_plane:e.debris.groundPlane,total_volume_m3:Number(na(e.debris.totalVolume,n).toFixed(2)),piles:e.debris.clusters.map(i=>({id:i.id,volume_m3:Number(na(i.volume,n).toFixed(2)),footprint_m2:Number(ta(i.footprint,n).toFixed(2)),max_height_m:Number(ea(i.maxHeight,n).toFixed(2)),centre:i.centre.map(vs)}))}}}function Q_(t){return Lc(t.sites).map((e,n)=>{const i=Nh(e,t.geom);return{rank:n+1,name:e.name,rho_lives_per_crew_hour:Number(gr(e).toFixed(6)),occupancy_persons:e.n,p_trapped_alive:e.q,p_extraction_success:e.r,collapse_type:e.type,lambda_per_hour:ei[e.type],crew_hours_tau:e.tau,confidence:e.conf,position:{x:Number(e.pos.x.toFixed(4)),y:Number(e.pos.y.toFixed(4)),z:Number(e.pos.z.toFixed(4))},geometry:i?{plane:i.plane.label,surface_class:i.plane.cls,tilt_deg:Number((i.plane.tilt*180/Math.PI).toFixed(3)),drift_ratio:i.plane.drift==null?null:Number(i.plane.drift.toFixed(5)),drift_band:i.plane.band?i.plane.band.name:null}:null}})}function gA(t){const e={generated:new Date().toISOString(),model:hA,note:fA,geometry_note:pA,geometry:mA(t),queue:Q_(t)};q_(`rubble-queue-${Z_()}.json`,JSON.stringify(e,null,2),"application/json")}const vA=["rank","name","rho_lives_per_crew_hour","occupancy_persons","p_trapped_alive","p_extraction_success","collapse_type","lambda_per_hour","crew_hours_tau","confidence","x","y","z","plane","surface_class","tilt_deg","drift_ratio","drift_band"];function _A(t){const e=String(t);return/[",\n]/.test(e)?'"'+e.replace(/"/g,'""')+'"':e}function xA(t){const e=[vA.join(",")];for(const n of Q_(t)){const i=n.geometry;e.push([n.rank,n.name,n.rho_lives_per_crew_hour,n.occupancy_persons,n.p_trapped_alive,n.p_extraction_success,n.collapse_type,n.lambda_per_hour,n.crew_hours_tau,n.confidence,n.position.x,n.position.y,n.position.z,(i==null?void 0:i.plane)??"",(i==null?void 0:i.surface_class)??"",(i==null?void 0:i.tilt_deg)??"",(i==null?void 0:i.drift_ratio)??"",(i==null?void 0:i.drift_band)??""].map(_A).join(","))}q_(`rubble-queue-${Z_()}.csv`,e.join(`
`)+`
`,"text/csv")}function yA({viewer:t}){const e=Sr(),n=Lc(e.sites);return M.jsxs(M.Fragment,{children:[M.jsx("div",{className:"qhead",children:"DISPATCH QUEUE — DESC BY ρ"}),!n.length&&M.jsxs("div",{className:"empty",children:["Queue empty.",M.jsx("br",{}),M.jsx("br",{}),"Press ",M.jsx("b",{children:"m"})," or the ",M.jsx("b",{children:"⊕ MARK"})," button, then click a structure in the 3D view to place your first assessment marker. Sites rank themselves by ρ as you score them — the order updates live."]}),n.map((i,r)=>{const s=r+1,a=i.conf==="low",o="qrow"+(s<=3?` rk${s}`:"")+(a?" low":"")+(i.id===e.selectedId?" sel":"");return M.jsxs("div",{className:o,onClick:()=>{K_(i.id),t==null||t.flyTo(i.pos)},children:[M.jsxs("div",{className:"top",children:[M.jsx("span",{className:"rank",children:s}),M.jsxs("span",{className:"nm",children:[i.name,a&&M.jsx("span",{className:"badge",children:"LOW CONF"})]}),M.jsx("span",{className:"rho",children:gr(i).toFixed(3)})]}),M.jsxs("div",{className:"meta",children:["n ",i.n," · q ",i.q.toFixed(2)," · r ",i.r.toFixed(2)," · ",j_[i.type]," λ",ei[i.type].toFixed(2)," · τ ",i.tau.toFixed(1),"h · conf"," ",i.conf.toUpperCase()]})]},i.id)})]})}const SA=[{v:"pancake",label:"PANCAKE"},{v:"mixed",label:"MIXED"},{v:"lean",label:"LEAN-TO"}],MA=["low","med","high"];function EA({viewer:t,snap:e}){var o,l;const n=Sr(),i=n.sites.find(c=>c.id===n.selectedId)??null;if(!i)return M.jsxs("div",{className:"empty",children:["No site selected.",M.jsx("br",{}),M.jsx("br",{}),"Press ",M.jsx("b",{children:"m"})," (or the ",M.jsx("b",{children:"⊕ MARK"})," button), then click a structure in the 3D view to place an assessment marker. Selecting a row in the ",M.jsx("b",{children:"QUEUE"})," tab also opens it here."]});const r=i.conf==="low",s=Nh(i,e.geom),a=c=>Y_(i.id,c);return M.jsxs(M.Fragment,{children:[M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"Site name"}),M.jsxs("span",{className:"val",children:["#",i.id]})]}),M.jsx("input",{type:"text",maxLength:40,spellCheck:!1,value:i.name,onChange:c=>a({name:c.target.value||`Site #${i.id}`})})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"n — occupancy"}),M.jsx("span",{className:"val",children:i.n})]}),M.jsxs("div",{className:"note",children:["Persons believed inside this structure when it came down."," ",M.jsx("b",{children:"This is the weakest input and it is not derived from the scan geometry"})," — it comes from witnesses, rosters, neighbours or time-of-day occupancy estimates."]}),M.jsx("input",{type:"range",min:0,max:50,step:1,value:i.n,onChange:c=>a({n:parseInt(c.target.value,10)})})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"q — P(trapped alive)"}),M.jsx("span",{className:"val",children:i.q.toFixed(2)})]}),M.jsx("div",{className:"note",children:"Probability an occupant is trapped and still alive now. From void-space evidence, hours since collapse, weather exposure, and any contact — voice, tapping, phone ping, canine alert."}),M.jsx("input",{type:"range",min:0,max:1,step:.01,value:i.q,onChange:c=>a({q:parseFloat(c.target.value)})})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"r — P(extraction)"}),M.jsx("span",{className:"val",children:i.r.toFixed(2)})]}),M.jsx("div",{className:"note",children:"Probability a committed crew actually gets them out alive. From access route, debris type, cutting and shoring burden, secondary-collapse risk and crew capability."}),M.jsx("input",{type:"range",min:0,max:1,step:.01,value:i.r,onChange:c=>a({r:parseFloat(c.target.value)})})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"τ — crew-hours"}),M.jsx("span",{className:"val",children:i.tau.toFixed(1)})]}),M.jsx("div",{className:"note",children:"Crew-hours this site is expected to consume before the outcome is decided. From debris volume to move, breaching and shoring required, and site access."}),M.jsx("input",{type:"range",min:.5,max:24,step:.5,value:i.tau,onChange:c=>a({tau:parseFloat(c.target.value)})})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"Collapse type"}),M.jsxs("span",{className:"val",children:["λ ",ei[i.type].toFixed(3)," /h"]})]}),M.jsx("div",{className:"note",children:"Sets the survival decay rate λ. Pancake voids are scarce and crush loads high; lean-to and V-void geometry holds survivable space far longer."}),M.jsx("div",{className:"seg",children:SA.map(c=>M.jsx("button",{className:i.type===c.v?"on":void 0,onClick:()=>a({type:c.v}),children:c.label},c.v))})]}),M.jsxs("div",{className:"field",children:[M.jsxs("div",{className:"lab",children:[M.jsx("b",{children:"Confidence"}),M.jsx("span",{className:"val",children:i.conf.toUpperCase()})]}),M.jsxs("div",{className:"note",children:["Evidence-quality flag for the operator. ",M.jsx("b",{children:"LOW"})," renders amber everywhere and badges the queue row — it does ",M.jsx("b",{children:"not"})," enter ρ."]}),M.jsx("div",{className:"seg",children:MA.map(c=>M.jsx("button",{className:i.conf===c?c==="low"?"on amber":"on":void 0,onClick:()=>a({conf:c}),children:c.toUpperCase()},c))})]}),M.jsxs("div",{className:"readout",children:[M.jsx("span",{className:"dim",children:"ρ = ( n × q × r × λ ) / max(0.1, τ)"}),M.jsx("br",{}),"ρ = ( ",i.n," × ",i.q.toFixed(2)," × ",i.r.toFixed(2)," × ",ei[i.type].toFixed(3)," ) /"," ",Math.max(.1,i.tau).toFixed(1),M.jsx("span",{className:r?"big amber":"big",children:gr(i).toFixed(3)}),M.jsx("span",{className:"unit",children:"LIVES / CREW-HOUR"}),r&&M.jsxs(M.Fragment,{children:[M.jsx("br",{}),M.jsx("span",{className:"dim",children:"LOW CONF — evidence flag only, not a factor in ρ"})]})]}),s&&M.jsxs("div",{className:"evbox",children:[M.jsx("div",{className:"t",children:"GEOMETRY AT THIS SITE"}),"Sits on ",M.jsx("b",{children:s.plane.label}),", a"," ",s.plane.cls==="wall"?"near-vertical wall ":s.plane.cls==="slab"?"near-level slab ":"inclined slab ",s.plane.cls==="wall"&&s.plane.drift!=null?M.jsxs(M.Fragment,{children:["out of plumb by ",M.jsxs("b",{children:[(s.plane.tilt*180/Math.PI).toFixed(2),"°"]}),", drift ratio"," ",M.jsxs("b",{style:{color:(o=s.plane.band)==null?void 0:o.css},children:[(s.plane.drift*100).toFixed(2),"%"]})," (",(l=s.plane.band)==null?void 0:l.name,")."]}):M.jsxs(M.Fragment,{children:["at ",M.jsxs("b",{children:[(s.plane.tilt*180/Math.PI).toFixed(1),"°"]})," from horizontal."]})," ","Area ",M.jsxs("b",{children:[bi(ta(s.plane.area,e.metresPerUnit))," m²"]}),", rms residual"," ",M.jsxs("b",{children:[bi(ea(s.plane.rms,e.metresPerUnit),3)," m"]}),".",M.jsx("br",{}),M.jsx("span",{className:"dim",children:"Measured evidence for the operator. It does not set any slider."})]}),M.jsxs("div",{className:"row",children:[M.jsx("button",{className:"btn primary",onClick:()=>t==null?void 0:t.flyTo(i.pos),children:"FLY TO"}),M.jsx("button",{className:"btn danger",onClick:()=>oA(i.id),children:"DELETE SITE"})]})]})}const TA=t=>t.cls==="wall"&&t.band?t.band.css:W_[t.cls];function Km({p:t,index:e,mpu:n,selected:i,onClick:r}){var o;const s=TA(t),a=t.cls==="wall"?`out of plumb ${(t.tilt*180/Math.PI).toFixed(2)}° · ${((o=t.band)==null?void 0:o.name)??""}`:`${t.cls==="slab"?"off level":"lean-to angle"} from horizontal`;return M.jsxs("div",{className:i?"grow sel":"grow","data-i":e,onClick:r,children:[M.jsxs("div",{className:"top",children:[M.jsx("span",{className:"tag",style:{borderColor:s,color:s},children:t.label}),M.jsx("span",{className:"nm",children:a}),M.jsx("span",{className:"num",style:{color:s},children:t.cls==="wall"&&t.drift!=null?`${(t.drift*100).toFixed(2)}%`:`${(t.tilt*180/Math.PI).toFixed(1)}°`})]}),M.jsxs("div",{className:"meta",children:["area ",bi(ta(t.area,n))," m² · fill ",Math.round(t.fill*100),"% · support"," ",(t.support*100).toFixed(1),"% · rms ",bi(ea(t.rms,n),3)," m · n [",t.n.map(l=>l.toFixed(2)).join(" "),"]"]})]})}function wA({viewer:t,snap:e,onGeometry:n}){var m,v,_,p;const i=Sr(),r=e.geom,s=e.metresPerUnit;if(!r)return M.jsx(M.Fragment,{children:i.geoStage==="ransac"||i.geoStage==="prep"?M.jsxs("div",{className:"prog",children:[((m=i.geoProgress)==null?void 0:m.stage)==="debris"?"measuring debris volume…":`fitting planes… ${((v=i.geoProgress)==null?void 0:v.planes)??0} found`,M.jsx("span",{className:"bar",children:M.jsx("i",{style:{width:`${Math.round(Xt(((_=i.geoProgress)==null?void 0:_.frac)??0)*100)}%`}})})]}):M.jsxs("div",{className:"empty",children:["No geometry extracted yet.",M.jsx("br",{}),M.jsx("br",{}),"Press ",M.jsx("b",{children:"g"})," or the ",M.jsx("b",{children:"GEOMETRY"})," button to fit planes to the loaded scan. You get wall verticality (the drift ratio structural engineers actually use), slab and lean-to angles, and debris volume — measured facts rather than a mesh.",M.jsx("br",{}),M.jsx("br",{}),M.jsx("button",{className:"btn",onClick:n,children:"RUN GEOMETRY"})]})});const a=r.planes.filter(u=>u.cls==="wall"),o=r.planes.filter(u=>u.cls==="slab"),l=r.planes.filter(u=>u.cls==="incline"),c=jw(a).reduce((u,g)=>!u||(g.drift??0)>(u.drift??0)?g:u,null),d=[...o,...l].sort((u,g)=>g.area-u.area),h=[...a].sort((u,g)=>(g.drift??0)-(u.drift??0)),f=u=>{const g=r.planes.indexOf(u);Ze({selectedPlane:g}),t==null||t.focusPlane(g)};return M.jsxs(M.Fragment,{children:[M.jsxs("div",{className:"gsum",children:[M.jsxs("div",{children:[M.jsx("span",{children:"PLANES"}),M.jsx("b",{children:r.planes.length})]}),M.jsxs("div",{children:[M.jsx("span",{children:"WALLS"}),M.jsx("b",{children:a.length})]}),M.jsxs("div",{children:[M.jsx("span",{children:"SLABS"}),M.jsx("b",{children:o.length})]}),M.jsxs("div",{children:[M.jsx("span",{children:"INCLINED"}),M.jsx("b",{children:l.length})]})]}),M.jsxs("div",{className:"gsum",children:[M.jsxs("div",{children:[M.jsx("span",{children:"WORST DRIFT"}),M.jsx("b",{style:{color:((p=c==null?void 0:c.band)==null?void 0:p.css)??"#8b93a1"},children:(c==null?void 0:c.drift)!=null?`${(c.drift*100).toFixed(2)}%`:"—"})]}),M.jsxs("div",{children:[M.jsx("span",{children:"DEBRIS VOL"}),M.jsxs("b",{children:[bi(na(r.debris.totalVolume,s))," m³"]})]}),M.jsxs("div",{children:[M.jsx("span",{children:"UNASSIGNED"}),M.jsxs("b",{children:[Math.round(r.residualFrac*100),"%"]})]}),M.jsxs("div",{children:[M.jsx("span",{children:"FIT TIME"}),M.jsxs("b",{children:[r.ms," ms"]})]})]}),M.jsxs("div",{className:"gnote",children:["Worst drift counts only walls holding at least 1% of the cloud at 25% fill or better; thinner fragments still appear in the list, with their support and fill shown. ",Mn(r.workingSet)," ","points fitted · epsilon from"," ",r.usedCovariance?"each Gaussian’s own extent along the normal (n′Σn)":"scene scale — this cloud carries no scale_*/rot_*, so there is no per-point covariance"]}),M.jsxs("div",{className:"scalebox",children:[M.jsx("label",{htmlFor:"f-scale",children:"1 SCAN UNIT ="}),M.jsx("input",{id:"f-scale",type:"number",min:1e-4,step:.01,value:s,onChange:u=>{const g=parseFloat(u.target.value);Ze({metresPerUnit:isFinite(g)&&g>0?g:1})}}),M.jsx("label",{children:"METRES"})]}),M.jsx("div",{className:"gnote",children:"Angles and drift ratios are scale-free and hold whatever this is set to. Areas and volumes do not — they are only metric if this figure is right. ARKit-derived exports (Scaniverse, Polycam) are usually already 1 unit = 1 m."}),M.jsxs("div",{className:"legend",children:[M.jsxs("span",{children:[M.jsx("i",{style:{background:"#ff3b30"}}),"SEVERE ≥2%"]}),M.jsxs("span",{children:[M.jsx("i",{style:{background:"#ff8a1f"}}),"MODERATE 1–2%"]}),M.jsxs("span",{children:[M.jsx("i",{style:{background:"#ffc21f"}}),"MINOR 0.5–1%"]}),M.jsxs("span",{children:[M.jsx("i",{style:{background:"#7d8896"}}),"COSMETIC <0.5%"]}),M.jsxs("span",{children:[M.jsx("i",{style:{background:"#4a9eff"}}),"SLAB"]}),M.jsxs("span",{children:[M.jsx("i",{style:{background:"#35d0c0"}}),"INCLINED"]})]}),M.jsx("div",{className:"ghead",children:"WALLS — VERTICALITY"}),!h.length&&M.jsx("div",{className:"gempty",children:"No near-vertical planes found."}),h.map(u=>M.jsx(Km,{p:u,index:r.planes.indexOf(u),mpu:s,selected:i.selectedPlane===r.planes.indexOf(u),onClick:()=>f(u)},u.label)),M.jsx("div",{className:"ghead",children:"SLABS & INCLINED SURFACES"}),!d.length&&M.jsx("div",{className:"gempty",children:"No horizontal or inclined planes found."}),d.map(u=>M.jsx(Km,{p:u,index:r.planes.indexOf(u),mpu:s,selected:i.selectedPlane===r.planes.indexOf(u),onClick:()=>f(u)},u.label)),M.jsx("div",{className:"ghead",children:"DEBRIS — BULK VOLUME ABOVE GROUND"}),M.jsxs("div",{className:"gnote",children:["Ground taken from"," ",r.debris.groundPlane?`plane ${r.debris.groundPlane}`:"the 2nd percentile of height (no ground slab was fitted)",". Column method: each grid cell contributes its height above ground × cell area."]}),!r.debris.clusters.length&&M.jsx("div",{className:"gempty",children:"No debris above the ground plane."}),r.debris.clusters.map(u=>M.jsxs("div",{className:"grow deb",children:[M.jsxs("div",{className:"top",children:[M.jsxs("span",{className:"tag",style:{borderColor:"#8b93a1",color:"#8b93a1"},children:["D",u.id]}),M.jsxs("span",{className:"nm",children:["debris pile ",u.id]}),M.jsxs("span",{className:"num",children:[bi(na(u.volume,s))," m³"]})]}),M.jsxs("div",{className:"meta",children:["footprint ",bi(ta(u.footprint,s))," m² · max height"," ",bi(ea(u.maxHeight,s),2)," m · ",u.cells," cells"]})]},u.id)),M.jsx("div",{className:"ghead",children:"WHAT THIS IS NOT"}),M.jsxs("ul",{className:"lim",children:[M.jsx("li",{children:"Not a mesh. Planes, angles and volumes are the measurable facts; a surface adds nothing to an assessment and hides the residual."}),M.jsxs("li",{children:["A splat captures ",M.jsx("b",{children:"exterior surfaces"}),". Debris volume is a column measure that assumes each pile is solid down to the ground plane — overhangs and interior voids are invisible."]}),M.jsxs("li",{children:["Plane extent is trimmed to the 1st–99th percentile of its own points; ",M.jsx("b",{children:"fill%"})," says how much of that rectangle is really surface."]}),M.jsx("li",{children:"These are inputs an assessor reads. They do not move the sliders by themselves."})]})]})}const Ll=[{key:"records",name:"RECORDS",param:"n",label:"n — occupancy",evidence:"rosters, shift patterns, witness statements, time-of-day occupancy",verifier:"two independent sources; disagreement widens the band instead of averaging it away"},{key:"access",name:"ACCESS",param:"r",label:"r — P(extraction)",evidence:"plane extents, debris columns, detected ground plane, route clearance",verifier:"re-run the route with the largest debris cluster removed; r must not jump a band"},{key:"volume",name:"VOLUME",param:"tau",label:"τ — crew-hours",evidence:"debris volume by column method, plane fill%, breaching and shoring burden",verifier:"column volume against a convex-hull bound; a gap past tolerance flags an overhang"},{key:"morphology",name:"MORPHOLOGY",param:"type",label:"λ — collapse type",evidence:"plane classes, slab tilt distribution, lean-to angles, wall drift bands",verifier:"re-fit on a held-out half of the cloud; the λ band must agree"},{key:"corroboration",name:"CORROBORATION",param:"conf",label:"confidence",evidence:"agreement across the other four agents and the quality of what they read",verifier:"flags LOW whenever any upstream agent failed its own verifier"}];function qm(t){return Ll.find(e=>e.key===t)??null}function AA(t,e){if(t==="type")return e==="pancake"||e==="mixed"||e==="lean"?e:null;if(t==="conf")return e==="low"||e==="med"||e==="high"?e:null;if(typeof e!="number"||!isFinite(e))return null;const n=(i,r,s)=>Math.min(s,Math.max(r,i));return t==="n"?Math.round(n(e,0,50)):t==="r"?n(e,0,1):t==="tau"?n(e,.5,24):null}function Zm(t){const e=t.sites.find(a=>a.id===t.selectedId)??null,n=t.slot,i=t.geom,r=t.metresPerUnit,s={generated:new Date().toISOString(),framing:"Advisory context for assisted assessment. Agents propose, the operator applies. Not a dispatch order.",site:null,scan:null,geometry:null,ranking:Lc(t.sites).map((a,o)=>({rank:o+1,name:a.name,rho:Number(gr(a).toFixed(4))}))};if(e){const a=Nh(e,i);s.site={id:e.id,name:e.name,n:e.n,q:e.q,r:e.r,tau:e.tau,collapse_type:e.type,lambda:ei[e.type],confidence:e.conf,rho:Number(gr(e).toFixed(4)),nearest_plane:a?a.plane.label:null}}return n&&(s.scan={slot:t.slotKey,source:n.name,points_rendered:n.kept,points_total:n.total,has_covariance:n.hasCov,orientation:n.orient.name,metres_per_unit:r,scale_calibrated:r!==1}),i&&(s.geometry={extraction_ms:i.ms,used_covariance:i.usedCovariance,residual_fraction:Number((i.residualFrac||0).toFixed(4)),planes:i.planes.map(a=>{const o={label:a.label,cls:a.cls,area_m2:Number(ta(a.area,r).toFixed(2)),fill:Number(a.fill.toFixed(3)),support:Number(a.support.toFixed(4)),rms_m:Number(ea(a.rms,r).toFixed(4)),tilt_deg:Number((a.tilt*180/Math.PI).toFixed(2))};return a.cls==="wall"&&a.drift!=null&&(o.drift_ratio=Number(a.drift.toFixed(4)),o.drift_band=a.band?a.band.name:null),o}),debris:i.debris?{total_volume_m3:Number(na(i.debris.totalVolume,r).toFixed(2)),clusters:i.debris.clusters.length,ground_plane:i.debris.groundPlane}:null}),s}function CA(t){var n;const e=()=>{try{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.top="-2000px",document.body.appendChild(i),i.focus(),i.select();const r=document.execCommand("copy");return document.body.removeChild(i),r}catch{return!1}};return(n=navigator.clipboard)!=null&&n.writeText?navigator.clipboard.writeText(t).then(()=>!0,()=>e()):Promise.resolve(e())}async function RA(){try{const t=await fetch("/api/swarm/status");return t.ok?await t.json():{configured:!1,provider:null,model:"",effort:""}}catch{return{configured:!1,provider:null,model:"",effort:""}}}async function bA(t){const e=await fetch("/api/swarm/run",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)}),n=await e.text();let i;try{i=JSON.parse(n)}catch{throw new Error(`swarm endpoint returned non-JSON (${e.status}): ${n.slice(0,200)}`)}if(!e.ok){const r=i.error??`swarm request failed (${e.status})`;throw new Error(r)}return i}function Af(t,e){if(!t)return"—";if(e==="type"){const i=t.type;return i?`${j_[i]} (λ ${ei[i].toFixed(3)})`:"—"}if(e==="conf")return String(t.conf??"—").toUpperCase();if(e==="n")return String(t.n??"—");if(e==="tau")return t.tau!=null?t.tau.toFixed(1):"—";const n=t[e];return n!=null?Number(n).toFixed(2):"—"}function Qm(t,e){const n={};return e==="type"?n.type=t:e==="conf"?n.conf=t:e==="n"?n.n=t:e==="tau"?n.tau=t:n.r=t,Af(n,e)}const PA={pass:"✓",fail:"✗",unverified:"·"},LA={pass:"vline pass",fail:"vline fail",unverified:"vline unver"};function NA({snap:t}){const e=Sr(),n=e.sites.find(v=>v.id===e.selectedId)??null,i=Zm(t),r=JSON.stringify(i).length,{run:s,busy:a,notes:o,status:l}=e.swarm,c=new Map(((s==null?void 0:s.results)??[]).map(v=>[v.key,v]));Dt.useEffect(()=>{e.swarm.status||RA().then(v=>Ze(_=>({swarm:{..._.swarm,status:v}})))},[e.swarm.status]),Dt.useEffect(()=>{const v={agents:Ll,context:()=>Zm(t),propose(_,p,u){const g=qm(_);if(!g)throw new Error(`no such agent "${_}" — try one of: ${Ll.map(T=>T.key).join(", ")}`);const x=AA(g.param,p);if(x===null)throw new Error(`value ${JSON.stringify(p)} is not valid for ${g.label}`);return Ze(T=>({proposals:{...T.proposals,[_]:{value:x,rationale:u??"",at:new Date}}})),x},clear:()=>Ze({proposals:{}}),log:()=>Pl().overrideLog.slice()};window.RubbleSwarm=v},[t]);const d=v=>{const _=qm(v),p=e.proposals[v];if(!_||!p||!n)return;const u=Af(n,_.param);Y_(n.id,{[_.param]:p.value});const g=Qm(p.value,_.param);Ze(x=>({overrideLog:[...x.overrideLog,{at:new Date,agent:_.name,label:_.label,from:u,to:g}]})),pt(`${_.name} proposal applied to ${n.name} — override logged`)},h=()=>{a||(Ze(v=>({swarm:{...v.swarm,busy:!0}})),pt("swarm running — five agents over the current evidence…"),bA({context:i,operatorNotes:o,siteId:(n==null?void 0:n.id)??null}).then(v=>{const _={};for(const g of v.results)g.abstained||g.value===null||g.error||(_[g.key]={value:g.value,rationale:g.rationale,at:new Date(v.generated)});Ze(g=>({swarm:{...g.swarm,run:v,busy:!1},proposals:_}));const p=v.results.filter(g=>!g.verified||g.error).length,u=v.results.filter(g=>g.abstained).length;pt(`swarm done in ${(v.totalMs/1e3).toFixed(1)}s · ${v.results.length} agents · ${u} abstained · ${p} did not verify`)}).catch(v=>{Ze(_=>({swarm:{..._.swarm,busy:!1}})),pt(`swarm failed: ${v instanceof Error?v.message:String(v)}`)}))},f=l?!l.configured:!1,m=a?"RUNNING…":"RUN SWARM";return M.jsxs(M.Fragment,{children:[M.jsx("div",{className:"h",children:"AGENT SWARM"}),M.jsx("p",{children:"One agent per ranking parameter, each with its own evidence source and a cheap verifier. The geometry layer is the evidence substrate — the agents read the measured planes, drift bands and debris volume, not the point cloud."}),M.jsxs("div",{className:"warn",style:{marginBottom:12},children:[M.jsx("b",{children:"Assisted assessment, not autonomous dispatch."})," An agent proposes; the operator applies. Sliders stay operator-set, and every override is recorded in the log below."]}),M.jsx("div",{className:"ghead",children:"CONTEXT HANDED TO EVERY AGENT"}),M.jsxs("div",{className:"sctx",children:[M.jsxs("div",{children:["SITE  ",n?M.jsxs(M.Fragment,{children:[M.jsx("b",{children:n.name})," · ρ ",gr(n).toFixed(3)," · n ",n.n," q ",n.q.toFixed(2)," r"," ",n.r.toFixed(2)," τ ",n.tau.toFixed(1)]}):M.jsxs(M.Fragment,{children:[M.jsx("b",{children:"none selected"})," — agents have no site to reason about"]})]}),M.jsxs("div",{children:["SCAN  ",t.slot?M.jsxs(M.Fragment,{children:[M.jsx("b",{children:t.slot.name})," · ",Mn(t.slot.kept)," pts · covariance"," ",t.slot.hasCov?"yes":"no"," · 1 unit = ",t.metresPerUnit," m"]}):M.jsx(M.Fragment,{children:M.jsxs("b",{children:["slot ",t.slotKey," empty"]})})]}),M.jsxs("div",{children:["GEO   ",t.geom?M.jsxs(M.Fragment,{children:[M.jsxs("b",{children:[t.geom.planes.length," planes"]})," · debris"," ",bi(na(t.geom.debris.totalVolume,t.metresPerUnit))," m³ · residual"," ",(t.geom.residualFrac*100).toFixed(1),"%"]}):M.jsxs(M.Fragment,{children:[M.jsx("b",{children:"not extracted"})," — press g to give the agents evidence"]})]}),M.jsxs("div",{style:{marginTop:6,color:"var(--dim)"},children:["payload ",Mn(r)," chars",s?` · last run ${s.model} · ${(s.totalMs/1e3).toFixed(1)}s`:""]})]}),M.jsx("div",{className:"ghead",children:"OPERATOR NOTES — THE ONLY SOURCE FOR OCCUPANCY"}),M.jsx("div",{className:"gnote",style:{marginBottom:6},children:"Nothing in a scan evidences how many people are inside. Anything you know from witnesses, rosters, building use or time of day goes here; the RECORDS agent abstains without it."}),M.jsx("textarea",{className:"snotes",value:o,placeholder:"e.g. primary school, weekday 10:40, two classes reported unaccounted for",onChange:v=>Ze(_=>({swarm:{..._.swarm,notes:v.target.value}}))}),M.jsxs("div",{className:"row",style:{margin:"10px 0 4px"},children:[M.jsx("button",{className:"btn primary",disabled:a||f||!n,title:f?"no ANTHROPIC_API_KEY on the dev server":n?"run all five agents":"select a site first",onClick:h,children:m}),M.jsx("button",{className:"btn",onClick:()=>{const v=JSON.stringify(i,null,2);CA(v).then(_=>_?pt(`agent context copied — ${Mn(v.length)} chars`):(console.log(v),pt("clipboard refused — the payload is on the console instead")))},children:"COPY CONTEXT"}),M.jsx("button",{className:"btn",onClick:()=>{Ze(v=>({proposals:{},swarm:{...v.swarm,run:null}})),pt("proposals cleared — the override log is kept")},children:"CLEAR"})]}),f?M.jsxs("div",{className:"gnote",style:{color:"var(--amber)"},children:["No reasoner reachable. Put ",M.jsx("b",{children:"ANTHROPIC_API_KEY"})," in ",M.jsx("b",{children:".env.local"})," and restart the dev server. The key is read server-side only — it is never bundled into the page."]}):l?M.jsxs("div",{className:"gnote",children:["reasoner: ",l.provider," · ",l.model," · runs in the dev server, key never reaches the browser"]}):null,M.jsx("div",{className:"ghead",children:"AGENTS"}),Ll.map(v=>{const _=c.get(v.key),p=e.proposals[v.key],u=_!=null&&_.error?"ERROR":_!=null&&_.abstained?"ABSTAINED":_&&!_.verified?"UNVERIFIED":p?"PROPOSED":"NO PROPOSAL";return M.jsxs("div",{className:"sagent",children:[M.jsxs("div",{className:"top",children:[M.jsx("span",{className:"nm",children:v.name}),M.jsxs("span",{className:"chip",children:["→ ",v.label]}),M.jsx("span",{className:p&&(_!=null&&_.verified)?"chip filled":"chip",children:u})]}),M.jsxs("div",{className:"q",children:["operator value now: ",M.jsx("b",{children:Af(n,v.param)})]}),M.jsxs("div",{className:"rd",children:["EVIDENCE · ",v.evidence]}),M.jsx("div",{className:_?"sverdict filled":"sverdict",children:_?_.error?`agent failed: ${_.error}`:M.jsxs(M.Fragment,{children:[_.abstained?M.jsx("b",{children:"ABSTAINED — no admissible evidence for this parameter"}):M.jsxs("b",{children:["proposes: ",Qm(_.value,v.param)]}),`  ·  self-confidence ${_.selfConfidence}  ·  ${(_.ms/1e3).toFixed(1)}s`,M.jsx("div",{style:{marginTop:5},children:_.rationale}),_.evidenceUsed.length>0?M.jsxs("div",{className:"scited",children:["cited: ",_.evidenceUsed.join("  ")]}):null,M.jsx("div",{style:{marginTop:6},children:_.verdicts.map((g,x)=>M.jsxs("div",{className:LA[g.status],children:[PA[g.status]," ",g.check,": ",g.detail]},x))})]}):"no proposal yet — RUN SWARM to put the agents over the current evidence"}),M.jsx("button",{className:"btn sbtn",disabled:!p||!n||!(_!=null&&_.verified)||(_==null?void 0:_.abstained),title:_&&!_.verified?"a verifier failed — review the proposal before applying it":_!=null&&_.abstained?"the agent abstained, so there is nothing to apply":"apply this value to the slider and log the override",onClick:()=>d(v.key),children:"APPLY TO SLIDER"})]},v.key)}),M.jsx("div",{className:"ghead",children:"OVERRIDE LOG"}),e.overrideLog.length?[...e.overrideLog].reverse().map((v,_)=>M.jsxs("div",{className:"grow deb",children:[M.jsx("div",{className:"top",children:M.jsxs("span",{className:"nm",children:[v.at.toTimeString().slice(0,8)," · ",v.agent]})}),M.jsxs("div",{className:"meta",children:[v.label," · ",v.from," → ",v.to," · operator applied"]})]},_)):M.jsx("div",{className:"gempty",children:"No overrides yet. Applying a proposal records what it replaced."}),M.jsx("div",{className:"ghead",children:"WHAT THIS IS NOT"}),M.jsxs("ul",{className:"lim",children:[M.jsxs("li",{children:[M.jsx("b",{children:"q — P(trapped alive) has no agent."})," Nothing in an exterior scan evidences whether an occupant is alive, so it is left wholly to the operator rather than given a plausible-looking number. The gap is deliberate."]}),M.jsx("li",{children:"A proposal is inert until an operator applies it. Applying is an operator decision, logged with the value it replaced."}),M.jsxs("li",{children:["A verifier is a cheap disagreement check, not a proof. ",M.jsx("b",{children:"Unverified is not a pass"})," — it means the evidence to check that claim is not in the payload at all, which is the honest state for extraction probability (no route network) and occupancy (no registry)."]}),M.jsx("li",{children:"Agents read the derived geometry, never the raw cloud. They inherit every limit of the extraction: exterior surfaces only, debris volume assuming solid piles, and uncalibrated scale unless you set it."})]})]})}function IA(){return M.jsxs(M.Fragment,{children:[M.jsx("div",{className:"h",children:"SURVIVAL DECAY"}),M.jsxs("p",{children:["Survival probability for entrapped victims decays approximately exponentially. Expected lives saved by dispatching a crew to site ",M.jsx("i",{children:"i"})," at time ",M.jsx("i",{children:"t"}),":"]}),M.jsxs("div",{className:"formula",children:["V",M.jsx("sub",{children:"i"}),"(t) = n",M.jsx("sub",{children:"i"})," · q",M.jsx("sub",{children:"i"})," · r",M.jsx("sub",{children:"i"})," · e",M.jsxs("sup",{children:["−λ",M.jsx("sub",{children:"i"})," t"]})]}),M.jsx("div",{className:"h",children:"GREEDY INDEX RULE"}),M.jsxs("p",{children:["Optimal scheduling of ",M.jsx("i",{children:"K"})," crews across competing sites is NP-hard. Rank descending by expected lives per crew-hour, weighted by urgency:"]}),M.jsxs("div",{className:"formula",children:["ρ",M.jsx("sub",{children:"i"})," = ( n",M.jsx("sub",{children:"i"})," · q",M.jsx("sub",{children:"i"})," · r",M.jsx("sub",{children:"i"})," · λ",M.jsx("sub",{children:"i"})," ) / τ",M.jsx("sub",{children:"i"})]}),M.jsx("p",{children:"The denominator is guarded at 0.1 crew-hours, so a slider at minimum cannot divide by zero. Confidence is an evidence flag and is deliberately absent from ρ."}),M.jsx("div",{className:"h",children:"λ BY COLLAPSE TYPE"}),M.jsx("table",{className:"lam",children:M.jsxs("tbody",{children:[M.jsxs("tr",{children:[M.jsx("th",{children:"TYPE"}),M.jsx("th",{children:"λ (/hour)"}),M.jsx("th",{children:"VOID CHARACTER"})]}),M.jsxs("tr",{children:[M.jsx("td",{children:"PANCAKE"}),M.jsx("td",{className:"n",children:ei.pancake.toFixed(2)}),M.jsx("td",{children:"Slabs stacked flat; voids scarce, crush loads high"})]}),M.jsxs("tr",{children:[M.jsx("td",{children:"MIXED"}),M.jsx("td",{className:"n",children:ei.mixed.toFixed(2)}),M.jsx("td",{children:"Partial pancake with surviving structure"})]}),M.jsxs("tr",{children:[M.jsx("td",{children:"LEAN-TO"}),M.jsx("td",{className:"n",children:ei.lean.toFixed(2)}),M.jsx("td",{children:"Slab resting on a wall or debris; large stable voids"})]})]})}),M.jsxs("p",{children:["Half-life of survival probability is ln 2 / λ: about"," ",M.jsxs("b",{children:[Bu("pancake").toFixed(1)," h"]})," for pancake,"," ",M.jsxs("b",{children:[Bu("mixed").toFixed(1)," h"]})," for mixed,"," ",M.jsxs("b",{children:[Bu("lean").toFixed(1)," h"]})," for lean-to."]}),M.jsx("div",{className:"h",children:"LIMITS"}),M.jsxs("ul",{className:"lim",children:[M.jsxs("li",{children:["A splat scan captures ",M.jsx("b",{children:"exterior surfaces"}),". Survivable voids are ",M.jsx("b",{children:"interior"}),". The scan tells you where a structure failed and how, not where anyone is."]}),M.jsxs("li",{children:[M.jsx("b",{children:"Occupancy is not geometric."})," n is a human estimate entered by the operator; it dominates ρ linearly and is the largest source of error in the ranking."]}),M.jsx("li",{children:"The point cloud is a render of the splat, not a true Gaussian rasterization — small features and thin voids will be under-represented."}),M.jsxs("li",{children:["A/B scan slots are a ",M.jsx("b",{children:"visual toggle only"}),". There is no alignment, registration, or geometric change detection between them."]}),M.jsx("li",{children:"No metric scale calibration by default. Distances are in scan units until you set the scale."})]}),M.jsxs("div",{className:"warn",children:["Output is a ",M.jsx("b",{children:"ranked prior for incident command review"}),". It is not an autonomous dispatch order. Every value in ρ is an operator estimate; the ordering is only as good as those estimates."]})]})}function DA(t){const e=Sr();return Dt.useMemo(()=>{const n=t?t.getActiveSlot():"A",i=t?t.getSlot(n):null;return{sites:e.sites,slotKey:n,slot:i,geom:(i==null?void 0:i.geom)??null,metresPerUnit:e.metresPerUnit,selectedId:e.selectedId}},[t,e.sites,e.metresPerUnit,e.selectedId,e.slotsVersion])}const UA=[{key:"queue",label:"QUEUE"},{key:"assess",label:"ASSESS"},{key:"geo",label:"GEO"},{key:"swarm",label:"SWARM"},{key:"model",label:"MODEL"}];function FA({viewer:t,onGeometry:e}){const n=Sr(),i=DA(t),r=()=>n.sites.length?!0:(window.alert("The dispatch queue is empty — place at least one site before exporting."),!1);return M.jsxs("div",{id:"panel",children:[M.jsx("div",{id:"tabs",children:UA.map(s=>M.jsx("button",{className:n.tab===s.key?"on":void 0,onClick:()=>Ze({tab:s.key}),children:s.label},s.key))}),M.jsxs("div",{id:"panes",children:[M.jsx("div",{className:n.tab==="queue"?"pane on":"pane",id:"pane-queue",children:M.jsx(yA,{viewer:t})}),M.jsx("div",{className:n.tab==="assess"?"pane on":"pane",id:"pane-assess",children:M.jsx(EA,{viewer:t,snap:i})}),M.jsx("div",{className:n.tab==="geo"?"pane on":"pane",id:"pane-geo",children:M.jsx(wA,{viewer:t,snap:i,onGeometry:e})}),M.jsx("div",{className:n.tab==="swarm"?"pane on":"pane",id:"pane-swarm",children:M.jsx(NA,{snap:i})}),M.jsx("div",{className:n.tab==="model"?"pane on":"pane",id:"pane-model",children:M.jsx(IA,{})})]}),M.jsxs("div",{id:"exports",children:[M.jsx("button",{className:"btn",onClick:()=>{r()&&(gA(i),pt(`exported JSON — ${n.sites.length} sites`))},children:"EXPORT JSON"}),M.jsx("button",{className:"btn",onClick:()=>{r()&&(xA(i),pt(`exported CSV — ${n.sites.length} sites`))},children:"EXPORT CSV"})]})]})}function OA(){const t=Dt.useRef(null),e=Dt.useRef(null),n=Dt.useRef(null),i=Dt.useRef(null),[r,s]=Dt.useState(!1),a=Sr();Dt.useEffect(()=>{if(!e.current||!t.current||!n.current)return;const d=Xw(e.current,t.current,n.current,{onStatus:pt,onHint:lA,onSitePlaced:f=>aA(f),onSelectSite:f=>K_(f),onSelectPlane:f=>Ze({selectedPlane:f,tab:"geo"}),onMarkModeChange:f=>Ze({markMode:f}),onSlotsChanged:()=>Ze(f=>({slotsVersion:f.slotsVersion+1}))});i.current=d,s(!0);const h=window.setTimeout(()=>{if(!d.getSlot("A")&&!d.getSlot("B"))try{d.installCloud($_(),"synthetic rubble field",0,!0),pt("synthetic rubble field loaded — press m and click a structure to place the first site")}catch(f){console.error(f)}},60);return()=>{window.clearTimeout(h),d.dispose(),i.current=null,s(!1)}},[]),Dt.useEffect(()=>{var h;const d=new Map(Lc(a.sites).map((f,m)=>[f.id,m+1]));(h=i.current)==null||h.syncSites(a.sites,a.selectedId,d)},[a.sites,a.selectedId]);const o=Dt.useCallback(d=>{const h=i.current;if(h){if(Pl().loading){pt("already loading a scan — let it finish first");return}Ze({loadFile:`${d.name}`,loading:{phase:"reading",frac:0,message:"opening …"}}),eA(d,{onProgress:f=>Ze({loading:f}),onDone:f=>{try{h.installCloud(f,d.name,null)}catch(m){console.error(m),Ze({loading:null}),pt(`could not build the point cloud: ${m.message}`);return}Ze({loading:null,selectedPlane:-1})},onFail:(f,m)=>{m&&console.error(m),Ze({loading:null}),pt(`load failed: ${f}`),window.alert(`Could not load "${d.name}".

${f}

Rubble reads point/splat .ply files (Scaniverse, Polycam, gaussian-splat exports). A mesh-only .ply with no vertex coordinates, or a file that is not a .ply at all, will fail here.`)},confirmLarge:f=>window.confirm(f),onCancel:()=>{Ze({loading:null}),pt(`cancelled — ${d.name} was not loaded`)}})}},[]),l=Dt.useCallback(()=>{const d=i.current;if(!d)return;const h=d.getExtractInput();if(!h){pt(`slot ${d.getActiveSlot()} is empty — load a scan before extracting geometry`);return}Pl().geoStage==="ransac"||Pl().geoStage==="prep"||(Ze({geoStage:"prep",geoProgress:null,selectedPlane:-1,tab:"geo"}),d.setGeom(null),Ww(h,(f,m,v)=>Ze({geoStage:"ransac",geoProgress:{planes:f,stage:m,frac:v}}),f=>{d.setGeom(f),Ze({geoStage:"done",geoProgress:null});const m=f.planes.filter(_=>_.cls==="wall"),v=m.reduce((_,p)=>Math.max(_,p.drift??0),0);pt(`${f.planes.length} planes in ${f.ms} ms · ${m.length} wall${m.length===1?"":"s"}`+(m.length?` · worst drift ${(v*100).toFixed(1)}%`:""))},f=>{console.error(f),Ze({geoStage:"failed",geoProgress:null}),pt(`geometry failed: ${f.message}`)}))},[]);Dt.useEffect(()=>{const d=h=>{const f=h.target;if(f&&(f.tagName==="INPUT"||f.tagName==="TEXTAREA")){h.key==="Escape"&&f.blur();return}const m=i.current;if(m)if(h.key==="m"||h.key==="M")m.setMarkMode(!m.isMarkMode());else if(h.key==="Escape")m.isMarkMode()&&(m.setMarkMode(!1),pt("marking cancelled"));else if(h.key==="f"||h.key==="F"){const v=m.cycleOrientation();v&&(v.clearedGeometry&&Ze({geoStage:"idle",selectedPlane:-1}),pt(`slot ${m.getActiveSlot()} up-axis ${v.name}`+(v.clearedGeometry?" — extracted geometry cleared, re-run GEOMETRY":"")+" — if the scene is mirrored rather than inverted that is a handedness issue, not this rotation"))}else(h.key==="g"||h.key==="G")&&l()};return window.addEventListener("keydown",d),()=>window.removeEventListener("keydown",d)},[l]);const c=d=>{var f,m;d.preventDefault();const h=(m=(f=d.dataTransfer)==null?void 0:f.files)==null?void 0:m[0];h&&o(h)};return M.jsxs("div",{id:"app",children:[M.jsxs("div",{id:"view",ref:t,onDragOver:d=>d.preventDefault(),onDrop:c,children:[M.jsx("canvas",{id:"gl",ref:e}),M.jsx("div",{id:"labels",ref:n}),M.jsx(cA,{viewer:i.current,ready:r,onLoadFile:o,onGeometry:l}),M.jsx("div",{id:"statusbar",children:a.status}),M.jsx("div",{id:"hintbar",className:a.hint?"on":void 0,children:a.hint}),M.jsx(dA,{progress:a.loading,file:a.loadFile})]}),M.jsx(FA,{viewer:i.current,onGeometry:l})]})}d_(document.getElementById("root")).render(M.jsx(Dt.StrictMode,{children:M.jsx(OA,{})}));
//# sourceMappingURL=index-B85jiwta.js.map
