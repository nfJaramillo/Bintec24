import{aW as h,aX as m,aY as p,aZ as w,a_ as g,a$ as L,b0 as E,b1 as O,b2 as x,b3 as y,b4 as M}from"./index-f989188d.js";function R(s,e){if(!h(s,{strict:!1}))throw new m({address:s});if(!h(e,{strict:!1}))throw new m({address:e});return s.toLowerCase()===e.toLowerCase()}class $ extends p{constructor({callbackSelector:e,cause:a,data:n,extraData:c,sender:d,urls:t}){var i;super(a.shortMessage||"An error occurred while fetching for an offchain result.",{cause:a,metaMessages:[...a.metaMessages||[],(i=a.metaMessages)!=null&&i.length?"":[],"Offchain Gateway Call:",t&&["  Gateway URL(s):",...t.map(f=>`    ${w(f)}`)],`  Sender: ${d}`,`  Data: ${n}`,`  Callback selector: ${e}`,`  Extra data: ${c}`].flat(),name:"OffchainLookupError"})}}class S extends p{constructor({result:e,url:a}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${w(a)}`,`Response: ${g(e)}`],name:"OffchainLookupResponseMalformedError"})}}class A extends p{constructor({sender:e,to:a}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${a}`,`OffchainLookup sender address: ${e}`],name:"OffchainLookupSenderMismatchError"})}}const T="0x556f1830",q={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function G(s,{blockNumber:e,blockTag:a,data:n,to:c}){const{args:d}=L({data:n,abi:[q]}),[t,i,f,r,o]=d,{ccipRead:u}=s,b=u&&typeof(u==null?void 0:u.request)=="function"?u.request:C;try{if(!R(c,t))throw new A({sender:t,to:c});const l=await b({data:f,sender:t,urls:i}),{data:k}=await E(s,{blockNumber:e,blockTag:a,data:O([r,x([{type:"bytes"},{type:"bytes"}],[l,o])]),to:c});return k}catch(l){throw new $({callbackSelector:r,cause:l,data:n,extraData:o,sender:t,urls:i})}}async function C({data:s,sender:e,urls:a}){var c;let n=new Error("An unknown error occurred.");for(let d=0;d<a.length;d++){const t=a[d],i=t.includes("{data}")?"GET":"POST",f=i==="POST"?{data:s,sender:e}:void 0;try{const r=await fetch(t.replace("{sender}",e).replace("{data}",s),{body:JSON.stringify(f),method:i});let o;if((c=r.headers.get("Content-Type"))!=null&&c.startsWith("application/json")?o=(await r.json()).data:o=await r.text(),!r.ok){n=new y({body:f,details:o!=null&&o.error?g(o.error):r.statusText,headers:r.headers,status:r.status,url:t});continue}if(!M(o)){n=new S({result:o,url:t});continue}return o}catch(r){n=new y({body:f,details:r.message,url:t})}}throw n}export{C as ccipRequest,G as offchainLookup,q as offchainLookupAbiItem,T as offchainLookupSignature};
