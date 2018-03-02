function temp26Controller($scope, $window, $timeout, $http, tempSrc, callback,$q){ 



!function t(r,o,i){function n(a,h){if(!o[a]){if(!r[a]){var u="function"==typeof require&&require;if(!h&&u)return u(a,!0);if(e)return e(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var c=o[a]={exports:{}};r[a][0].call(c.exports,function(t){var o=r[a][1][t];return n(o?o:t)},c,c.exports,t,r,o,i)}return o[a].exports}for(var e="function"==typeof require&&require,a=0;a<i.length;a++)n(i[a]);return n}({1:[function(t,r,o){if(!i)var i={map:function(t,r){var o={};return r?t.map(function(t,i){return o.index=i,r.call(o,t)}):t.slice()},naturalOrder:function(t,r){return r>t?-1:t>r?1:0},sum:function(t,r){var o={};return t.reduce(r?function(t,i,n){return o.index=n,t+r.call(o,i)}:function(t,r){return t+r},0)},max:function(t,r){return Math.max.apply(null,r?i.map(t,r):t)}};var n=function(){function t(t,r,o){return(t<<2*s)+(r<<s)+o}function r(t){function r(){o.sort(t),i=!0}var o=[],i=!1;return{push:function(t){o.push(t),i=!1},peek:function(t){return i||r(),void 0===t&&(t=o.length-1),o[t]},pop:function(){return i||r(),o.pop()},size:function(){return o.length},map:function(t){return o.map(t)},debug:function(){return i||r(),o}}}function o(t,r,o,i,n,e,a){var h=this;h.r1=t,h.r2=r,h.g1=o,h.g2=i,h.b1=n,h.b2=e,h.histo=a}function n(){this.vboxes=new r(function(t,r){return i.naturalOrder(t.vbox.count()*t.vbox.volume(),r.vbox.count()*r.vbox.volume())})}function e(r){var o,i,n,e,a=1<<3*s,h=new Array(a);return r.forEach(function(r){i=r[0]>>c,n=r[1]>>c,e=r[2]>>c,o=t(i,n,e),h[o]=(h[o]||0)+1}),h}function a(t,r){var i,n,e,a=1e6,h=0,u=1e6,s=0,p=1e6,f=0;return t.forEach(function(t){i=t[0]>>c,n=t[1]>>c,e=t[2]>>c,a>i?a=i:i>h&&(h=i),u>n?u=n:n>s&&(s=n),p>e?p=e:e>f&&(f=e)}),new o(a,h,u,s,p,f,r)}function h(r,o){function n(t){var r,i,n,e,a,h=t+"1",u=t+"2",c=0;for(s=o[h];s<=o[u];s++)if(v[s]>A/2){for(n=o.copy(),e=o.copy(),r=s-o[h],i=o[u]-s,a=i>=r?Math.min(o[u]-1,~~(s+i/2)):Math.max(o[h],~~(s-1-r/2));!v[a];)a++;for(c=T[a];!c&&v[a-1];)c=T[--a];return n[u]=a,e[h]=n[u]+1,[n,e]}}if(o.count()){var e=o.r2-o.r1+1,a=o.g2-o.g1+1,h=o.b2-o.b1+1,u=i.max([e,a,h]);if(1==o.count())return[o.copy()];var s,c,p,f,l,A=0,v=[],T=[];if(u==e)for(s=o.r1;s<=o.r2;s++){for(f=0,c=o.g1;c<=o.g2;c++)for(p=o.b1;p<=o.b2;p++)l=t(s,c,p),f+=r[l]||0;A+=f,v[s]=A}else if(u==a)for(s=o.g1;s<=o.g2;s++){for(f=0,c=o.r1;c<=o.r2;c++)for(p=o.b1;p<=o.b2;p++)l=t(c,s,p),f+=r[l]||0;A+=f,v[s]=A}else for(s=o.b1;s<=o.b2;s++){for(f=0,c=o.r1;c<=o.r2;c++)for(p=o.g1;p<=o.g2;p++)l=t(c,p,s),f+=r[l]||0;A+=f,v[s]=A}return v.forEach(function(t,r){T[r]=A-t}),n(u==e?"r":u==a?"g":"b")}}function u(t,o){function u(t,r){for(var o,i=1,n=0;p>n;)if(o=t.pop(),o.count()){var e=h(s,o),a=e[0],u=e[1];if(!a)return;if(t.push(a),u&&(t.push(u),i++),i>=r)return;if(n++>p)return}else t.push(o),n++}if(!t.length||2>o||o>256)return!1;var s=e(t),c=0;s.forEach(function(){c++});var l=a(t,s),A=new r(function(t,r){return i.naturalOrder(t.count(),r.count())});A.push(l),u(A,f*o);for(var v=new r(function(t,r){return i.naturalOrder(t.count()*t.volume(),r.count()*r.volume())});A.size();)v.push(A.pop());u(v,o-v.size());for(var T=new n;v.size();)T.push(v.pop());return T}var s=5,c=8-s,p=1e3,f=.75;return o.prototype={volume:function(t){var r=this;return(!r._volume||t)&&(r._volume=(r.r2-r.r1+1)*(r.g2-r.g1+1)*(r.b2-r.b1+1)),r._volume},count:function(r){var o=this,i=o.histo;if(!o._count_set||r){var n,e,a,h,u=0;for(n=o.r1;n<=o.r2;n++)for(e=o.g1;e<=o.g2;e++)for(a=o.b1;a<=o.b2;a++)h=t(n,e,a),u+=i[h]||0;o._count=u,o._count_set=!0}return o._count},copy:function(){var t=this;return new o(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(r){var o=this,i=o.histo;if(!o._avg||r){var n,e,a,h,u,c=0,p=1<<8-s,f=0,l=0,A=0;for(e=o.r1;e<=o.r2;e++)for(a=o.g1;a<=o.g2;a++)for(h=o.b1;h<=o.b2;h++)u=t(e,a,h),n=i[u]||0,c+=n,f+=n*(e+.5)*p,l+=n*(a+.5)*p,A+=n*(h+.5)*p;c?o._avg=[~~(f/c),~~(l/c),~~(A/c)]:o._avg=[~~(p*(o.r1+o.r2+1)/2),~~(p*(o.g1+o.g2+1)/2),~~(p*(o.b1+o.b2+1)/2)]}return o._avg},contains:function(t){var r=this,o=t[0]>>c;return gval=t[1]>>c,bval=t[2]>>c,o>=r.r1&&o<=r.r2&&gval>=r.g1&&gval<=r.g2&&bval>=r.b1&&bval<=r.b2}},n.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,o=0;o<r.size();o++)if(r.peek(o).vbox.contains(t))return r.peek(o).color;return this.nearest(t)},nearest:function(t){for(var r,o,i,n=this.vboxes,e=0;e<n.size();e++)o=Math.sqrt(Math.pow(t[0]-n.peek(e).color[0],2)+Math.pow(t[1]-n.peek(e).color[1],2)+Math.pow(t[2]-n.peek(e).color[2],2)),(r>o||void 0===r)&&(r=o,i=n.peek(e).color);return i},forcebw:function(){var t=this.vboxes;t.sort(function(t,r){return i.naturalOrder(i.sum(t.color),i.sum(r.color))});var r=t[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(t[0].color=[0,0,0]);var o=t.length-1,n=t[o].color;n[0]>251&&n[1]>251&&n[2]>251&&(t[o].color=[255,255,255])}},{quantize:u}}();r.exports=n.quantize},{}],2:[function(t,r,o){(function(){var r,o,i,n=function(t,r){return function(){return t.apply(r,arguments)}},e=[].slice;window.Swatch=o=function(){function t(t,r){this.rgb=t,this.population=r}return t.prototype.hsl=void 0,t.prototype.rgb=void 0,t.prototype.population=1,t.yiq=0,t.prototype.getHsl=function(){return this.hsl?this.hsl:this.hsl=i.rgbToHsl(this.rgb[0],this.rgb[1],this.rgb[2])},t.prototype.getPopulation=function(){return this.population},t.prototype.getRgb=function(){return this.rgb},t.prototype.getHex=function(){return"#"+((1<<24)+(this.rgb[0]<<16)+(this.rgb[1]<<8)+this.rgb[2]).toString(16).slice(1,7)},t.prototype.getTitleTextColor=function(){return this._ensureTextColors(),this.yiq<200?"#fff":"#000"},t.prototype.getBodyTextColor=function(){return this._ensureTextColors(),this.yiq<150?"#fff":"#000"},t.prototype._ensureTextColors=function(){return this.yiq?void 0:this.yiq=(299*this.rgb[0]+587*this.rgb[1]+114*this.rgb[2])/1e3},t}(),window.Vibrant=i=function(){function i(t,i,e){this.swatches=n(this.swatches,this);var a,h,u,s,c,p,f,l,A,v,T,g;"undefined"==typeof i&&(i=64),"undefined"==typeof e&&(e=5),f=new r(t);try{for(l=f.getImageData(),T=l.data,v=f.getPixelCount(),h=[],p=0;v>p;)A=4*p,g=T[A+0],c=T[A+1],u=T[A+2],a=T[A+3],a>=125&&(g>250&&c>250&&u>250||h.push([g,c,u])),p+=e;s=this.quantize(h,i),this._swatches=s.vboxes.map(function(t){return function(t){return new o(t.color,t.vbox.count())}}(this)),this.maxPopulation=this.findMaxPopulation,this.generateVarationColors(),this.generateEmptySwatches()}finally{f.removeCanvas()}}return i.prototype.quantize=t("quantize"),i.prototype._swatches=[],i.prototype.TARGET_DARK_LUMA=.26,i.prototype.MAX_DARK_LUMA=.45,i.prototype.MIN_LIGHT_LUMA=.55,i.prototype.TARGET_LIGHT_LUMA=.74,i.prototype.MIN_NORMAL_LUMA=.3,i.prototype.TARGET_NORMAL_LUMA=.5,i.prototype.MAX_NORMAL_LUMA=.7,i.prototype.TARGET_MUTED_SATURATION=.3,i.prototype.MAX_MUTED_SATURATION=.4,i.prototype.TARGET_VIBRANT_SATURATION=1,i.prototype.MIN_VIBRANT_SATURATION=.35,i.prototype.WEIGHT_SATURATION=3,i.prototype.WEIGHT_LUMA=6,i.prototype.WEIGHT_POPULATION=1,i.prototype.VibrantSwatch=void 0,i.prototype.MutedSwatch=void 0,i.prototype.DarkVibrantSwatch=void 0,i.prototype.DarkMutedSwatch=void 0,i.prototype.LightVibrantSwatch=void 0,i.prototype.LightMutedSwatch=void 0,i.prototype.HighestPopulation=0,i.prototype.generateVarationColors=function(){return this.VibrantSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.LightVibrantSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.DarkVibrantSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.MutedSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.LightMutedSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.DarkMutedSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION)},i.prototype.generateEmptySwatches=function(){var t;return void 0===this.VibrantSwatch&&void 0!==this.DarkVibrantSwatch&&(t=this.DarkVibrantSwatch.getHsl(),t[2]=this.TARGET_NORMAL_LUMA,this.VibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)),void 0===this.DarkVibrantSwatch&&void 0!==this.VibrantSwatch?(t=this.VibrantSwatch.getHsl(),t[2]=this.TARGET_DARK_LUMA,this.DarkVibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)):void 0},i.prototype.findMaxPopulation=function(){var t,r,o,i,n;for(o=0,i=this._swatches,t=0,r=i.length;r>t;t++)n=i[t],o=Math.max(o,n.getPopulation());return o},i.prototype.findColorVariation=function(t,r,o,i,n,e){var a,h,u,s,c,p,f,l,A;for(s=void 0,c=0,p=this._swatches,a=0,h=p.length;h>a;a++)l=p[a],f=l.getHsl()[1],u=l.getHsl()[2],f>=n&&e>=f&&u>=r&&o>=u&&!this.isAlreadySelected(l)&&(A=this.createComparisonValue(f,i,u,t,l.getPopulation(),this.HighestPopulation),(void 0===s||A>c)&&(s=l,c=A));return s},i.prototype.createComparisonValue=function(t,r,o,i,n,e){return this.weightedMean(this.invertDiff(t,r),this.WEIGHT_SATURATION,this.invertDiff(o,i),this.WEIGHT_LUMA,n/e,this.WEIGHT_POPULATION)},i.prototype.invertDiff=function(t,r){return 1-Math.abs(t-r)},i.prototype.weightedMean=function(){var t,r,o,i,n,a;for(n=1<=arguments.length?e.call(arguments,0):[],r=0,o=0,t=0;t<n.length;)i=n[t],a=n[t+1],r+=i*a,o+=a,t+=2;return r/o},i.prototype.swatches=function(){return{Vibrant:this.VibrantSwatch,Muted:this.MutedSwatch,DarkVibrant:this.DarkVibrantSwatch,DarkMuted:this.DarkMutedSwatch,LightVibrant:this.LightVibrantSwatch,LightMuted:this.LightMuted}},i.prototype.isAlreadySelected=function(t){return this.VibrantSwatch===t||this.DarkVibrantSwatch===t||this.LightVibrantSwatch===t||this.MutedSwatch===t||this.DarkMutedSwatch===t||this.LightMutedSwatch===t},i.rgbToHsl=function(t,r,o){var i,n,e,a,h,u;if(t/=255,r/=255,o/=255,a=Math.max(t,r,o),h=Math.min(t,r,o),n=void 0,u=void 0,e=(a+h)/2,a===h)n=u=0;else{switch(i=a-h,u=e>.5?i/(2-a-h):i/(a+h),a){case t:n=(r-o)/i+(o>r?6:0);break;case r:n=(o-t)/i+2;break;case o:n=(t-r)/i+4}n/=6}return[n,u,e]},i.hslToRgb=function(t,r,o){var i,n,e,a,h,u;return u=void 0,n=void 0,i=void 0,e=function(t,r,o){return 0>o&&(o+=1),o>1&&(o-=1),1/6>o?t+6*(r-t)*o:.5>o?r:2/3>o?t+(r-t)*(2/3-o)*6:t},0===r?u=n=i=o:(h=.5>o?o*(1+r):o+r-o*r,a=2*o-h,u=e(a,h,t+1/3),n=e(a,h,t),i=e(a,h,t-1/3)),[255*u,255*n,255*i]},i}(),window.CanvasImage=r=function(){function t(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)}return t.prototype.clear=function(){return this.context.clearRect(0,0,this.width,this.height)},t.prototype.update=function(t){return this.context.putImageData(t,0,0)},t.prototype.getPixelCount=function(){return this.width*this.height},t.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},t.prototype.removeCanvas=function(){return this.canvas.parentNode.removeChild(this.canvas)},t}()}).call(this)},{quantize:1}]},{},[2]);
/*! odometer 0.4.8 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=[].slice;q='<span class="odometer-value"></span>',n='<span class="odometer-ribbon"><span class="odometer-ribbon-inner">'+q+"</span></span>",d='<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">'+n+"</span></span>",g='<span class="odometer-formatting-mark"></span>',c="(,ddd).dd",h=/^\(?([^)]*)\)?(?:(.)(d+))?$/,i=30,f=2e3,a=20,j=2,e=.5,k=1e3/i,b=1e3/a,o="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",y=document.createElement("div").style,p=null!=y.transition||null!=y.webkitTransition||null!=y.mozTransition||null!=y.oTransition,w=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,l=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,s=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},v=function(a,b){return a.className=a.className.replace(new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi")," ")},r=function(a,b){return v(a,b),a.className+=" "+b},z=function(a,b){var c;return null!=document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c)):void 0},u=function(){var a,b;return null!=(a=null!=(b=window.performance)&&"function"==typeof b.now?b.now():void 0)?a:+new Date},x=function(a,b){return null==b&&(b=0),b?(a*=Math.pow(10,b),a+=.5,a=Math.floor(a),a/=Math.pow(10,b)):Math.round(a)},A=function(a){return 0>a?Math.ceil(a):Math.floor(a)},t=function(a){return a-x(a)},C=!1,(B=function(){var a,b,c,d,e;if(!C&&null!=window.jQuery){for(C=!0,d=["html","text"],e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(function(a){var b;return b=window.jQuery.fn[a],window.jQuery.fn[a]=function(a){var c;return null==a||null==(null!=(c=this[0])?c.odometer:void 0)?b.apply(this,arguments):this[0].odometer.update(a)}}(a));return e}})(),setTimeout(B,0),m=function(){function a(b){var c,d,e,g,h,i,l,m,n,o,p=this;if(this.options=b,this.el=this.options.el,null!=this.el.odometer)return this.el.odometer;this.el.odometer=this,m=a.options;for(d in m)g=m[d],null==this.options[d]&&(this.options[d]=g);null==(h=this.options).duration&&(h.duration=f),this.MAX_VALUES=this.options.duration/k/j|0,this.resetFormat(),this.value=this.cleanValue(null!=(n=this.options.value)?n:""),this.renderInside(),this.render();try{for(o=["innerHTML","innerText","textContent"],i=0,l=o.length;l>i;i++)e=o[i],null!=this.el[e]&&!function(a){return Object.defineProperty(p.el,a,{get:function(){var b;return"innerHTML"===a?p.inside.outerHTML:null!=(b=p.inside.innerText)?b:p.inside.textContent},set:function(a){return p.update(a)}})}(e)}catch(q){c=q,this.watchForMutations()}}return a.prototype.renderInside=function(){return this.inside=document.createElement("div"),this.inside.className="odometer-inside",this.el.innerHTML="",this.el.appendChild(this.inside)},a.prototype.watchForMutations=function(){var a,b=this;if(null!=l)try{return null==this.observer&&(this.observer=new l(function(a){var c;return c=b.el.innerText,b.renderInside(),b.render(b.value),b.update(c)})),this.watchMutations=!0,this.startWatchingMutations()}catch(c){a=c}},a.prototype.startWatchingMutations=function(){return this.watchMutations?this.observer.observe(this.el,{childList:!0}):void 0},a.prototype.stopWatchingMutations=function(){var a;return null!=(a=this.observer)?a.disconnect():void 0},a.prototype.cleanValue=function(a){var b;return"string"==typeof a&&(a=a.replace(null!=(b=this.format.radix)?b:".","<radix>"),a=a.replace(/[.,]/g,""),a=a.replace("<radix>","."),a=parseFloat(a,10)||0),x(a,this.format.precision)},a.prototype.bindTransitionEnd=function(){var a,b,c,d,e,f,g=this;if(!this.transitionEndBound){for(this.transitionEndBound=!0,b=!1,e=o.split(" "),f=[],c=0,d=e.length;d>c;c++)a=e[c],f.push(this.el.addEventListener(a,function(){return b?!0:(b=!0,setTimeout(function(){return g.render(),b=!1,z(g.el,"odometerdone")},0),!0)},!1));return f}},a.prototype.resetFormat=function(){var a,b,d,e,f,g,i,j;if(a=null!=(i=this.options.format)?i:c,a||(a="d"),d=h.exec(a),!d)throw new Error("Odometer: Unparsable digit format");return j=d.slice(1,4),g=j[0],f=j[1],b=j[2],e=(null!=b?b.length:void 0)||0,this.format={repeating:g,radix:f,precision:e}},a.prototype.render=function(a){var b,c,d,e,f,g,h;for(null==a&&(a=this.value),this.stopWatchingMutations(),this.resetFormat(),this.inside.innerHTML="",f=this.options.theme,b=this.el.className.split(" "),e=[],g=0,h=b.length;h>g;g++)c=b[g],c.length&&((d=/^odometer-theme-(.+)$/.exec(c))?f=d[1]:/^odometer(-|$)/.test(c)||e.push(c));return e.push("odometer"),p||e.push("odometer-no-transitions"),f?e.push("odometer-theme-"+f):e.push("odometer-auto-theme"),this.el.className=e.join(" "),this.ribbons={},this.formatDigits(a),this.startWatchingMutations()},a.prototype.formatDigits=function(a){var b,c,d,e,f,g,h,i,j,k;if(this.digits=[],this.options.formatFunction)for(d=this.options.formatFunction(a),j=d.split("").reverse(),f=0,h=j.length;h>f;f++)c=j[f],c.match(/0-9/)?(b=this.renderDigit(),b.querySelector(".odometer-value").innerHTML=c,this.digits.push(b),this.insertDigit(b)):this.addSpacer(c);else for(e=!this.format.precision||!t(a)||!1,k=a.toString().split("").reverse(),g=0,i=k.length;i>g;g++)b=k[g],"."===b&&(e=!0),this.addDigit(b,e)},a.prototype.update=function(a){var b,c=this;return a=this.cleanValue(a),(b=a-this.value)?(v(this.el,"odometer-animating-up odometer-animating-down odometer-animating"),b>0?r(this.el,"odometer-animating-up"):r(this.el,"odometer-animating-down"),this.stopWatchingMutations(),this.animate(a),this.startWatchingMutations(),setTimeout(function(){return c.el.offsetHeight,r(c.el,"odometer-animating")},0),this.value=a):void 0},a.prototype.renderDigit=function(){return s(d)},a.prototype.insertDigit=function(a,b){return null!=b?this.inside.insertBefore(a,b):this.inside.children.length?this.inside.insertBefore(a,this.inside.children[0]):this.inside.appendChild(a)},a.prototype.addSpacer=function(a,b,c){var d;return d=s(g),d.innerHTML=a,c&&r(d,c),this.insertDigit(d,b)},a.prototype.addDigit=function(a,b){var c,d,e,f;if(null==b&&(b=!0),"-"===a)return this.addSpacer(a,null,"odometer-negation-mark");if("."===a)return this.addSpacer(null!=(f=this.format.radix)?f:".",null,"odometer-radix-mark");if(b)for(e=!1;;){if(!this.format.repeating.length){if(e)throw new Error("Bad odometer format without digits");this.resetFormat(),e=!0}if(c=this.format.repeating[this.format.repeating.length-1],this.format.repeating=this.format.repeating.substring(0,this.format.repeating.length-1),"d"===c)break;this.addSpacer(c)}return d=this.renderDigit(),d.querySelector(".odometer-value").innerHTML=a,this.digits.push(d),this.insertDigit(d)},a.prototype.animate=function(a){return p&&"count"!==this.options.animation?this.animateSlide(a):this.animateCount(a)},a.prototype.animateCount=function(a){var c,d,e,f,g,h=this;if(d=+a-this.value)return f=e=u(),c=this.value,(g=function(){var i,j,k;return u()-f>h.options.duration?(h.value=a,h.render(),void z(h.el,"odometerdone")):(i=u()-e,i>b&&(e=u(),k=i/h.options.duration,j=d*k,c+=j,h.render(Math.round(c))),null!=w?w(g):setTimeout(g,b))})()},a.prototype.getDigitCount=function(){var a,b,c,d,e,f;for(d=1<=arguments.length?G.call(arguments,0):[],a=e=0,f=d.length;f>e;a=++e)c=d[a],d[a]=Math.abs(c);return b=Math.max.apply(Math,d),Math.ceil(Math.log(b+1)/Math.log(10))},a.prototype.getFractionalDigitCount=function(){var a,b,c,d,e,f,g;for(e=1<=arguments.length?G.call(arguments,0):[],b=/^\-?\d*\.(\d*?)0*$/,a=f=0,g=e.length;g>f;a=++f)d=e[a],e[a]=d.toString(),c=b.exec(e[a]),null==c?e[a]=0:e[a]=c[1].length;return Math.max.apply(Math,e)},a.prototype.resetDigits=function(){return this.digits=[],this.ribbons=[],this.inside.innerHTML="",this.resetFormat()},a.prototype.animateSlide=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q,s,t,u,v,w,x,y,z,B,C,D,E;if(s=this.value,j=this.getFractionalDigitCount(s,a),j&&(a*=Math.pow(10,j),s*=Math.pow(10,j)),d=a-s){for(this.bindTransitionEnd(),f=this.getDigitCount(s,a),g=[],b=0,m=v=0;f>=0?f>v:v>f;m=f>=0?++v:--v){if(t=A(s/Math.pow(10,f-m-1)),i=A(a/Math.pow(10,f-m-1)),h=i-t,Math.abs(h)>this.MAX_VALUES){for(l=[],n=h/(this.MAX_VALUES+this.MAX_VALUES*b*e),c=t;h>0&&i>c||0>h&&c>i;)l.push(Math.round(c)),c+=n;l[l.length-1]!==i&&l.push(i),b++}else l=function(){E=[];for(var a=t;i>=t?i>=a:a>=i;i>=t?a++:a--)E.push(a);return E}.apply(this);for(m=w=0,y=l.length;y>w;m=++w)k=l[m],l[m]=Math.abs(k%10);g.push(l)}for(this.resetDigits(),D=g.reverse(),m=x=0,z=D.length;z>x;m=++x)for(l=D[m],this.digits[m]||this.addDigit(" ",m>=j),null==(u=this.ribbons)[m]&&(u[m]=this.digits[m].querySelector(".odometer-ribbon-inner")),this.ribbons[m].innerHTML="",0>d&&(l=l.reverse()),o=C=0,B=l.length;B>C;o=++C)k=l[o],q=document.createElement("div"),q.className="odometer-value",q.innerHTML=k,this.ribbons[m].appendChild(q),o===l.length-1&&r(q,"odometer-last-value"),0===o&&r(q,"odometer-first-value");return 0>t&&this.addDigit("-"),p=this.inside.querySelector(".odometer-radix-mark"),null!=p&&p.parent.removeChild(p),j?this.addSpacer(this.format.radix,this.digits[j-1],"odometer-radix-mark"):void 0}},a}(),m.options=null!=(E=window.odometerOptions)?E:{},setTimeout(function(){var a,b,c,d,e;if(window.odometerOptions){d=window.odometerOptions,e=[];for(a in d)b=d[a],e.push(null!=(c=m.options)[a]?(c=m.options)[a]:c[a]=b);return e}},0),m.init=function(){var a,b,c,d,e,f;if(null!=document.querySelectorAll){for(b=document.querySelectorAll(m.options.selector||".odometer"),f=[],c=0,d=b.length;d>c;c++)a=b[c],f.push(a.odometer=new m({el:a,value:null!=(e=a.innerText)?e:a.textContent}));return f}},null!=(null!=(F=document.documentElement)?F.doScroll:void 0)&&null!=document.createEventObject?(D=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&m.options.auto!==!1&&m.init(),null!=D?D.apply(this,arguments):void 0}):document.addEventListener("DOMContentLoaded",function(){return m.options.auto!==!1?m.init():void 0},!1),"function"==typeof define&&define.amd?define([],function(){return m}):"undefined"!=typeof exports&&null!==exports?module.exports=m:window.Odometer=m}).call(this);

	var user_info, instagram_post;
	var loopCounter = 0;
	var cb = false;
	var interval33, interval34;


	for(var i=0; i< $scope.TemplateData.length; i++){
		if($scope.TemplateData[i].Template == 'temp26'){
			instagram_post = $scope.TemplateData[i].TempData[1];
			user_info = $scope.TemplateData[i].TempData[0];
			instagram_post.currentPosition = $scope.TemplateData[i].currentPosition;
			insertDataToScope();
		}
	}


	function insertDataToScope(){
		var data = instagram_post.postList[instagram_post.currentPosition];

		$scope.info = {
			username: user_info.username,
			profile_pic: user_info.profile_pic_url_hd,
			followers: numberWithCommas(user_info.followed_by.count),
			caption: removeEmojis(data.caption),
			photo: data.display_src,
			likes: numberWithCommas(data.likes.count),
			comments: numberWithCommas(data.comments.count),
			insta_date: moment.unix(data.date).format("MMM. D, YYYY"),
			image_width: data.dimensions.width,
			image_height: data.dimensions.height

		}

		var img = document.createElement('img');
		img.setAttribute('src', $scope.info.photo);
		img.setAttribute('crossorigin','anonymous');

		img.addEventListener('load', function() {
		    var vibrant = new Vibrant(img);
		    var swatches = vibrant.swatches()
		    var sidebar_color = swatches.Vibrant.rgb;
		    var sidebar_color2 = swatches.Muted.rgb;
		    var final_color = 'rgb('+sidebar_color[0]+','+sidebar_color[1]+','+sidebar_color[2]+')';
		    var final_color2 = 'rgba('+sidebar_color2[0]+','+sidebar_color2[1]+','+sidebar_color2[2]+',.6)';
		    $(".instagram-post").css("background",''+final_color+'');
		    $(".instagram-post .insta-left .insta-content").css("background",''+final_color+'');
		    $(".instagram-post .insta-left .insta-upper .insta-date").css("background",''+final_color2+'');
		});

		if ($scope.info.caption == "") {
			$(".instagram-post .insta-left .insta-upper .insta-date").css("display","none");
		}else {
			$(".instagram-post .insta-left .insta-upper .insta-date").css("display","inline-block");
		}

		if (user_info.username.length > 12) {
			$(".instagram-post .insta-left .insta-lower h2").css("font-size","1.4em");
		}else {
			$(".instagram-post .insta-left .insta-lower h2").css("font-size","2em");
		}

		console.log(instagram_post.currentPosition+'/'+instagram_post.post_length);

	       if (loopCounter == 0) {
	      	loop();
	      	cb = true;
	      	callCallback();
	      	loopCounter++;
	      }

	}

    function removeEmojis (string) {

      if (string) {
    	var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;  	
 		return string.replace(regex, '');
      }else {
      	return string;
      }
      

      
    }

	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	   function instaAddClass() {
	   	$(".insta-upper").addClass("fadeInLeft");
	   	$(".insta-left .insta-lower h2").addClass("fadeInUp");
	   	$(".instagram-post .insta-left .insta-lower img").addClass("fadeInUp");
	   	$(".insta-left .insta-lower p").addClass("fadeInUp");
	   	$(".insta-info").addClass("pulse");
       	
      }

      function instaRemoveClass(){
      	$(".insta-upper").removeClass("fadeInLeft");
      	$(".insta-left .insta-lower h2").removeClass("fadeInUp");
      	$(".instagram-post .insta-left .insta-lower img").removeClass("fadeInUp");
      	$(".insta-left .insta-lower p").removeClass("fadeInUp");
      	$(".insta-info").removeClass("pulse");
      }

        function updateValues() {
        	$scope.TemplateData.forEach(function(item){
					if(item.Template == 'temp26'){
							item.currentPosition = instagram_post.currentPosition;
			    		}
				  })
        }



    	function loop(){

	        if (instagram_post.loop) {

                interval33 = setInterval(function () {
                  instaRemoveClass();
                }, instagram_post.loopInterval/2);
            
	            interval34 = setInterval(function () {

	                  $scope.$apply(function(){

	                    	if (instagram_post.currentPosition >= instagram_post.post_length-1) {
	                    		instagram_post.currentPosition = 0;
	                    	}else {
	                    		instagram_post.currentPosition++;	
	                    	}

	                    	insertDataToScope();
                            instaAddClass();
                            updateValues();
	                    	
	                    });
	                    
	                }, instagram_post.loopInterval);
	            
	        }
    	}

    	function removeInterval2(){

			clearInterval(interval33);
			clearInterval(interval34);		
			
		}

		function callCallback(){

			if (cb) {
				$timeout(removeInterval2, 28000);      
				$timeout(callback, 30000);
			}
			
		}

};