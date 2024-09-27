import{i as y,h as C,M as n,C as h,O as b,aR as k,A as m,E as S,k as E,R as c,aS as p,U as A,l as _,e as x,b as v,aT as O,f as w,d as L,aU as N}from"./index-4cdd706b.js";const T=y`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var d=globalThis&&globalThis.__decorate||function(u,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(u,e,t,i);else for(var l=u.length-1;l>=0;l--)(a=u[l])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};const g="scroll-lock";let r=class extends C{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=n.state.open,this.caipAddress=h.state.activeCaipAddress,this.caipNetwork=h.state.activeCaipNetwork,this.isSiweEnabled=b.state.isSiweEnabled,this.shake=n.state.shake,this.initializeTheming(),k.prefetch(),this.unsubscribe.push(n.subscribeKey("open",e=>e?this.onOpen():this.onClose()),n.subscribeKey("shake",e=>this.shake=e),m.subscribeKey("siweStatus",e=>this.onSiweStatusChange(e),"eip155"),h.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),h.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),b.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),S.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?E`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            <wui-card
              shake="${this.shake}"
              role="alertdialog"
              aria-modal="true"
              tabindex="0"
              data-testid="w3m-modal-card"
            >
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){const e=c.state.view==="ConnectingSiwe",t=c.state.view==="ApproveTransaction";if(this.isSiweEnabled){const{SIWEController:i}=await p(()=>import("./index-e2b1bfed.js"),["assets/index-e2b1bfed.js","assets/index-4cdd706b.js"]);i.state.status!=="success"&&(e||t)?n.shake():n.close()}else n.close()}initializeTheming(){const{themeVariables:e,themeMode:t}=N.state,i=A.getColorTheme(t);_(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),x.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=g,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${g}"]`);e&&e.remove()}onAddKeyboardListener(){var t;this.abortController=new AbortController;const e=(t=this.shadowRoot)==null?void 0:t.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:o}=i.target;o&&!o.includes("W3M-")&&!o.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}onSiweStatusChange(e){e==="success"&&n.close()}async onNewAddress(e){var o;const t=this.caipAddress?v.getPlainAddress(this.caipAddress):void 0,i=e?v.getPlainAddress(e):void 0;if(this.isSiweEnabled){const{SIWEController:s}=await p(()=>import("./index-e2b1bfed.js"),["assets/index-e2b1bfed.js","assets/index-4cdd706b.js"]),a=m.state.siweStatus==="success";!t&&i?this.onSiweNavigation():a&&t&&i&&t!==i&&(o=s.state._client)!=null&&o.options.signOutOnAccountChange&&(await s.signOut(),this.onSiweNavigation())}this.caipAddress=e}async onNewNetwork(e){var o,s,a,l;if(!this.caipAddress){this.caipNetwork=e;return}const t=(s=(o=this.caipNetwork)==null?void 0:o.id)==null?void 0:s.toString(),i=(a=e==null?void 0:e.id)==null?void 0:a.toString();if(t&&i&&t!==i)if(this.isSiweEnabled){const{SIWEController:f}=await p(()=>import("./index-e2b1bfed.js"),["assets/index-e2b1bfed.js","assets/index-4cdd706b.js"]);(l=f.state._client)!=null&&l.options.signOutOnNetworkChange?(await f.signOut(),this.onSiweNavigation()):c.goBack()}else c.goBack();this.caipNetwork=e}onSiweNavigation(){const e=h.state.activeChain===O.CHAIN.EVM;!(m.state.siweStatus==="success")&&e?this.open?c.replace("ConnectingSiwe"):n.open({view:"ConnectingSiwe"}):c.goBack()}};r.styles=T;d([w()],r.prototype,"open",void 0);d([w()],r.prototype,"caipAddress",void 0);d([w()],r.prototype,"caipNetwork",void 0);d([w()],r.prototype,"isSiweEnabled",void 0);d([w()],r.prototype,"shake",void 0);r=d([L("w3m-modal")],r);export{r as W3mModal};
