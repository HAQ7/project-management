if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),f={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-53c542cd.js",revision:null},{url:"assets/index-f0fb6a3c.css",revision:null},{url:"index.html",revision:"2b6eb73a5f252a5f6ed5e822a2d9d4fb"},{url:"registerSW.js",revision:"aded2c7a317dcbc951663146298bab13"},{url:"icons/manifest-icon-192.maskable.png",revision:"7be0645fa1eb1a7d9f67e527222ffebc"},{url:"icons/manifest-icon-512.maskable.png",revision:"2ed56dd9cfb1e61facf239122dc9440f"},{url:"manifest.webmanifest",revision:"9aa639e604c13edb69330da81f8ec862"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
