parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
function t(t,i){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=e(t))||i&&t&&"number"==typeof t.length){n&&(t=n);var s=0,a=function(){};return{s:a,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,o=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){o=!0,r=t},f:function(){try{c||null==n.return||n.return()}finally{if(o)throw r}}}}function e(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function t(e,i){a(this,t),this.x=e,this.y=i};function c(t,e){var i=parseInt(t.slice(1,3),16),n=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return e?"rgba(".concat(i,", ").concat(n,", ").concat(s,", ").concat(e,")"):"rgba(".concat(i,", ").concat(n,", ").concat(s,")")}var o=function(){function e(){a(this,e),this.colors=["#9c7979","#9c9279","#799c7d","#799c97","#798c9c","#93799c","#9c798f"],this.lastMousePos={x:0,y:0},this.mouseIsDown=!1;var t=document.getElementById("canv"),i=t.getContext("2d");this.origin=new r(0,0),this.ctx=i,this.canvas=t,this.addMouseListeners(),this.stepSize=50,this.stepRange=1,this.resize(),this.drawBasis()}return s(e,[{key:"addMouseListeners",value:function(){var t=this;this.canvas.addEventListener("mousedown",function(e){t.mouseIsDown=!0,t.lastMousePos.x=e.x,t.lastMousePos.y=e.y}),this.canvas.addEventListener("mouseup",function(){t.mouseIsDown=!1}),this.canvas.addEventListener("mousemove",function(e){if(t.mouseIsDown){if(void 0!==t.lastMousePos.x&&void 0!==t.lastMousePos.y){var i=e.x-t.lastMousePos.x,n=e.y-t.lastMousePos.y;t.shiftOrigin(i,n),t.drawBasis(),t.updateAll()}t.lastMousePos.x=e.x,t.lastMousePos.y=e.y}})}},{key:"changeStepSize",value:function(t){this.stepSize=t,this.drawBasis(),this.updateAll()}},{key:"changeStepRange",value:function(t){this.stepRange=t,this.drawBasis(),this.updateAll()}},{key:"resize",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=window.getComputedStyle(this.canvas,null).getPropertyValue("width"),i=window.getComputedStyle(this.canvas,null).getPropertyValue("height");this.canvas.setAttribute("width",e),this.canvas.setAttribute("height",i),t&&(this.origin=new r(this.canvas.width/2,this.canvas.height/2)),this.ctx.lineCap="round",this.ctx.lineJoin="round"}},{key:"clearGrid",value:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}},{key:"shiftOrigin",value:function(t,e){this.origin.x+=t,this.origin.y+=e}},{key:"drawXGuideline",value:function(t){this.ctx.lineWidth=2,this.ctx.strokeStyle="#eeeeee",this.ctx.beginPath(),this.ctx.moveTo(t,0),this.ctx.lineTo(t,this.canvas.height),this.ctx.stroke(),this.ctx.closePath()}},{key:"drawYGuideline",value:function(t){this.ctx.lineWidth=2,this.ctx.strokeStyle="#eeeeee",this.ctx.beginPath(),this.ctx.moveTo(0,t),this.ctx.lineTo(this.canvas.width,t),this.ctx.stroke(),this.ctx.closePath()}},{key:"drawBasis",value:function(){for(var t=this.origin.x+this.stepSize;t<this.canvas.width;t+=this.stepSize)this.drawXGuideline(t);for(var e=this.origin.x-this.stepSize;e>0;e-=this.stepSize)this.drawXGuideline(e);for(var i=this.origin.y+this.stepSize;i<this.canvas.height;i+=this.stepSize)this.drawYGuideline(i);for(var n=this.origin.y-this.stepSize;n>0;n-=this.stepSize)this.drawYGuideline(n);this.ctx.lineWidth=2,this.ctx.fillStyle="#c9c9c9",this.ctx.strokeStyle="#c9c9c9",this.ctx.beginPath(),this.ctx.arc(this.origin.x,this.origin.y,5,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#c9c9c9",this.ctx.beginPath(),this.ctx.moveTo(this.origin.x,0),this.ctx.lineTo(this.origin.x,this.canvas.height),this.ctx.stroke(),this.ctx.closePath(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#c9c9c9",this.ctx.beginPath(),this.ctx.moveTo(0,this.origin.y),this.ctx.lineTo(this.canvas.width,this.origin.y),this.ctx.stroke(),this.ctx.closePath()}},{key:"canvLocate",value:function(t){return new r(this.origin.x+this.stepSize*t.x/this.stepRange,this.origin.y-this.stepSize*t.y/this.stepRange)}},{key:"gridPoly",value:function(e,i){if(0!==e.length){this.ctx.fillStyle=c(i,"0.5"),this.ctx.strokeStyle=i,this.ctx.lineWidth=5,this.ctx.moveTo(e[0].x,e[0].y),this.ctx.beginPath();var n,s=t(e);try{for(s.s();!(n=s.n()).done;){var a=n.value,r=this.canvLocate(a);this.ctx.lineTo(r.x,r.y)}}catch(o){s.e(o)}finally{s.f()}this.ctx.closePath(),this.ctx.stroke(),this.ctx.fill()}}},{key:"addRect",value:function(t,e,i,n,s){var a=[];a.push(new r(t,i)),a.push(new r(t,n)),a.push(new r(e,n)),a.push(new r(e,i)),this.gridPoly(a,s)}},{key:"addCirc",value:function(t,e,i){this.ctx.strokeStyle=i,this.ctx.fillStyle=c(i,"0.5"),this.ctx.lineWidth=5,this.ctx.beginPath();var n=this.canvLocate(e);this.ctx.arc(n.x,n.y,t*this.stepSize,0,2*Math.PI),this.ctx.fill(),this.ctx.stroke(),this.ctx.closePath()}},{key:"addPoly",value:function(t,e,i){var n=[];switch(i){case"xyxy":for(var s=0;s<t.length;s+=2)n.push(new r(t[s],t[s+1]));break;case"xxyy":for(var a=Math.floor(t.length/2),c=0;c<a;c++)n.push(new r(t[c],t[c+a]))}this.gridPoly(n,e)}},{key:"isValid",value:function(e){var i,n=t(e);try{for(n.s();!(i=n.n()).done;){var s=i.value;if(Number.isNaN(s))return!1}}catch(a){n.e(a)}finally{n.f()}return!0}},{key:"isValidRect",value:function(t){return this.isValid(t)&&4===t.length}},{key:"isValidCirc",value:function(t){return this.isValid(t)&&3===t.length}},{key:"isValidPoly",value:function(t){return this.isValid(t)&&t.length%2==0}},{key:"updateAll",value:function(){var e=this;this.clearGrid(),this.drawBasis(),document.getElementById("shapes").childNodes.forEach(function(i,n){var s=i.getElementsByTagName("select"),a=s[0].value,c="m"===s[1].value,o=i.getElementsByTagName("textarea")[0].value.trim(),l=[];c?l=[o.split(/[\n ]+/).map(function(t){return+t})]:l=o.split(/\n+/).map(function(t){return t.split(/ +/).map(function(t){return+t})});var h,u=e.colors[n%e.colors.length],d=t(l);try{for(d.s();!(h=d.n()).done;){var y=h.value;switch(a){case"rectangle":e.isValidRect(y)&&e.addRect(y[0],y[1],y[2],y[3],u);break;case"circle":e.isValidCirc(y)&&e.addCirc(y[0],new r(y[1],y[2]),u);break;case"poly xyxy":e.isValidPoly(y)&&e.addPoly(y,u,"xyxy");break;case"poly xxyy":e.isValidPoly(y)&&e.addPoly(y,u,"xxyy")}}}catch(v){d.e(v)}finally{d.f()}})}}]),e}(),l=new o,h=document.getElementById("add"),u=document.getElementById("shapes"),d=["rectangle","circle","poly xyxy","poly xxyy"],y=new Map;function v(t,e){switch(t){case"a":f(),u.lastElementChild.getElementsByTagName("textarea")[0].focus()}}function f(){var e=document.createElement("li"),i=document.createElement("div"),n=document.createElement("textarea");i.append(n),i.style.width="100%",i.classList.add("w-wrap");var s=document.createElement("select"),a=document.createElement("select");e.append(s),e.append(a),e.append(i),u.append(e);var r,c=t(d);try{for(c.s();!(r=c.n()).done;){var o=r.value,l=document.createElement("option");l.append(document.createTextNode(o)),s.append(l)}}catch(x){c.e(x)}finally{c.f()}for(var h=0,y=["s","m"];h<y.length;h++){var v=y[h],f=document.createElement("option");f.append(document.createTextNode(v)),a.append(f)}}u.addEventListener("input",function(t){"TEXTAREA"===t.target.tagName&&l.updateAll()}),u.addEventListener("change",function(t){"SELECT"===t.target.tagName&&l.updateAll()}),window.addEventListener("keydown",function(t){var e=t.target;"Escape"!==t.key?["SELECT","TEXTAREA"].includes(e.tagName)||(y[t.key]=!0):e.blur()}),window.addEventListener("keyup",function(t){var e=t.key;y[e]&&v(e,t.target),y[e]=!1}),h.addEventListener("click",function(){f()}),window.addEventListener("resize",function(){l.resize(),l.drawBasis(),l.updateAll()});var x=document.getElementById("size");x.addEventListener("input",function(){""===x.value&&l.changeStepSize(50);var t=+x.value;Number.isNaN(t)||t>20&&l.changeStepSize(t)});var p=document.getElementById("range");p.addEventListener("input",function(){""===p.value&&l.changeStepRange(1);var t=+p.value;Number.isNaN(t)||t>0&&l.changeStepRange(t)});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.53a01124.js.map