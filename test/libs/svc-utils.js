!function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(n,u,function(t){return e[t]}.bind(null,u));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=342)}({342:function(e,t,r){"use strict";mk.service("utils",function(){var e=function(e,t){return e.substr(0,t)},t=function(e,t){return e.substr(e.length>t?e.length-t:0)},r=function(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:" ";return e.length>=r?e:t(n.repeat(r)+e,r)};return{left:e,right:t,lpad:r,rpad:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:" ";return t.length>=r?t:e(t+n.repeat(r),r)},formatDate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"yyyymmdd",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Date;return e.replace(/(yyyy|yy|mm|dd|h24|hh|mi|ss|ms|a\/p)/gi,function(e){switch(e){case"yyyy":return t.getFullYear();case"yy":return r(t.getFullYear(),2,"0");case"mm":return r(t.getMonth()+1,2,"0");case"dd":return r(t.getDate(),2,"0");case"h24":return r(t.getHours(),2,"0");case"hh":return r(t.getHours()%12||12,2,"0");case"mi":return r(t.getMinutes(),2,"0");case"ss":return r(t.getSeconds(),2,"0");case"ms":return r(t.getMilliseconds(),3,"0");default:return""}})},promise:function(e){return new Promise(e)},promiseAll:function(e){return Promise.all(e)},json:function(e){return"string"==typeof e?JSON.parse(e):JSON.stringify(e)},entries:function(e){return Object.entries(e)},assign:function(e,t){return Object.assign(e,t)},snakeCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})},camelCase:function(e){return e.replace(/-\w/g,function(e){return e.toUpperCase().substr(1)})}}})}});