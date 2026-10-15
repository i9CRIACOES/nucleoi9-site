import{t as e}from"./react.CvnImTBr.js";import{t}from"./createLucideIcon.DVlD4oVo.js";import{t as n}from"./mic.FmTM4lZr.js";import{t as r}from"./sparkles.CEfF0sdj.js";import{t as i}from"./jsx-runtime.Cr1s1OSH.js";var a={name:`ear`,size:24,node:[[`path`,{d:`M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0`,key:`1dfaln`}],[`path`,{d:`M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4`,key:`1qnva7`}]]};a.node;var o=t(a),s={name:`message-square-text`,size:24,node:[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}],[`path`,{d:`M7 11h10`,key:`1twpyw`}],[`path`,{d:`M7 15h6`,key:`d9of3u`}],[`path`,{d:`M7 7h8`,key:`af5zfr`}]]};s.node;var c=t(s),l={name:`mic-off`,size:24,node:[[`path`,{d:`M12 19v3`,key:`npa21l`}],[`path`,{d:`M15 9.34V5a3 3 0 0 0-5.68-1.33`,key:`1gzdoj`}],[`path`,{d:`M16.95 16.95A7 7 0 0 1 5 12v-2`,key:`cqa7eg`}],[`path`,{d:`M18.89 13.23A7 7 0 0 0 19 12v-2`,key:`16hl24`}],[`path`,{d:`m2 2 20 20`,key:`1ooewy`}],[`path`,{d:`M9 9v3a3 3 0 0 0 5.12 2.12`,key:`r2i35w`}]]};l.node;var u=t(l),d={name:`volume-2`,size:24,node:[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`path`,{d:`M16 9a5 5 0 0 1 0 6`,key:`1q6k2b`}],[`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`,key:`ijwkga`}]]};d.node;var f=t(d),p=e(),m=i(),h=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),g=function(e){return`/`+e},_={},v=function(e){return e.pathname.endsWith(`.css`)},y=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=g(t,n);let r=s(t),i=v(r);return y(_,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:h,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=`
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`,S=`
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  varying vec2 vUv;

  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
  }
  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;
    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
    return dot(vec4(31.316), n);
  }
  vec4 extractAlpha(vec3 c) { float a = max(max(c.r, c.g), c.b); return vec4(c.rgb / (a + 1e-5), a); }

  const vec3 color1 = vec3(0.153, 0.565, 0.824); /* #2790D2 azul claro */
  const vec3 color2 = vec3(0.208, 0.800, 0.384); /* #35CC62 verde */
  const vec3 color3 = vec3(0.000, 0.392, 0.608); /* #00649B azul do logo */
  const float innerRadius = 0.6;
  const float noiseScale = 0.65;

  float light1(float i, float a, float d) { return i / (1.0 + d * a); }
  float light2(float i, float a, float d) { return i / (1.0 + d * d * a); }

  vec4 draw(vec2 uv) {
    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float invLen = len > 0.0 ? 1.0 / len : 0.0;
    float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
    float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
    float d0 = distance(uv, (r0 * invLen) * uv);
    float v0 = light1(1.0, 10.0, d0);
    v0 *= smoothstep(r0 * 1.05, r0, len);
    float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
    float a = iTime * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    float d = distance(uv, pos);
    float v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);
    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
    vec3 col = mix(color1, color2, cl * 0.6);
    col = mix(color3, col, v0);
    col = (col + v1) * v2 * v3;
    col = clamp(col, 0.0, 1.0);
    return extractAlpha(col);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec2 center = iResolution.xy * 0.5;
    float size = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord - center) / size * 2.0;
    float s = sin(rot); float c = cos(rot);
    uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
    uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
    uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
    vec4 col = draw(uv);
    gl_FragColor = vec4(col.rgb * col.a, col.a);
  }
`;function C(e,t){switch(e){case`ouvindo`:return .12+.06*Math.sin(t*1.6);case`pensando`:return .3+.18*Math.sin(t*5);case`falando`:{let e=Math.sin(t*9.3)*.5+Math.sin(t*13.7)*.3+Math.sin(t*3.1)*.2;return .35+.5*Math.max(0,e)}default:return .04}}function w({estado:e,nivelExterno:t,className:n=``}){let r=(0,p.useRef)(null),i=(0,p.useRef)(e);i.current=e;let a=(0,p.useRef)(t);return a.current=t,(0,p.useEffect)(()=>{let e=r.current;if(!e||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=!1,n=0,o;return(async()=>{let{Renderer:s,Program:c,Mesh:l,Triangle:u,Vec3:d}=await b(async()=>{let{Renderer:e,Program:t,Mesh:n,Triangle:r,Vec3:i}=await import(`./src.BmjOrHhR.js`);return{Renderer:e,Program:t,Mesh:n,Triangle:r,Vec3:i}},[]);if(t||!r.current)return;let f;try{f=new s({alpha:!0,premultipliedAlpha:!1,antialias:!0,dpr:Math.min(window.devicePixelRatio||1,2)})}catch{return}let p=f.gl;p.clearColor(0,0,0,0),p.enable(p.BLEND),p.blendFunc(p.SRC_ALPHA,p.ONE_MINUS_SRC_ALPHA),e.appendChild(p.canvas),e.dataset.webgl=`1`;let m=new c(p,{vertex:x,fragment:S,uniforms:{iTime:{value:0},iResolution:{value:new d(1,1,1)},hover:{value:0},rot:{value:0},hoverIntensity:{value:0}}}),h=new l(p,{geometry:new u(p),program:m}),g=()=>{let t=e.clientWidth,n=e.clientHeight;t&&n&&(f.setSize(t,n),m.uniforms.iResolution.value.set(p.canvas.width,p.canvas.height,p.canvas.width/p.canvas.height))};window.addEventListener(`resize`,g),g();let _=0,v=0,y=0,w=e=>{n=requestAnimationFrame(w);let t=_?(e-_)*.001:0;_=e;let r=e*.001,o=a.current?a.current():C(i.current,r);y+=(o-y)*.18,v+=t*(.25+y*2.2),m.uniforms.iTime.value=r,m.uniforms.rot.value=v,m.uniforms.hover.value=Math.min(y*2,1),m.uniforms.hoverIntensity.value=Math.min(y*.7,.8),p.clear(p.COLOR_BUFFER_BIT),f.render({scene:h})};n=requestAnimationFrame(w),o=()=>{cancelAnimationFrame(n),window.removeEventListener(`resize`,g),e.contains(p.canvas)&&e.removeChild(p.canvas),p.getExtension(`WEBGL_lose_context`)?.loseContext()}})(),()=>{t=!0,o?.()}},[]),(0,m.jsx)(`div`,{ref:r,className:`relative aspect-square w-full [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:w-full ${n}`,"aria-hidden":`true`,children:(0,m.jsx)(`div`,{className:`absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#35cc62_0%,#2790d2_35%,#00649b_70%,transparent_72%)] opacity-90 blur-[1px] [[data-webgl]_&]:hidden`})})}var T=[{cliente:`Oi, vi o anúncio. Como funciona para clínica?`,agente:`Olá! Eu sou a assistente da Clínica Viva. Te explico em um minuto e já agendo uma avaliação. Prefere manhã ou tarde?`},{cliente:`Tá caro, não?`,agente:`Entendo. Pensa no custo de um paciente que liga e não é atendido. A avaliação é sem compromisso: quinta às 15h está livre.`},{cliente:`Vocês têm experiência com isso?`,agente:`Temos. Atendemos mais de 200 marcas em 20 anos, e a clínica fica com o histórico de cada paciente no mesmo lugar.`}],E=[{estado:`ouvindo`,duracao:2600},{estado:`pensando`,duracao:1100},{estado:`falando`,duracao:5200}],D={ouvindo:{texto:`Ouvindo o cliente`,Icone:o},pensando:{texto:`Pensando na resposta`,Icone:r},falando:{texto:`Respondendo por voz e texto`,Icone:f},parado:{texto:`Em espera`,Icone:c}};function O(){let[e,t]=(0,p.useState)(0),[r,i]=(0,p.useState)(0),[a,o]=(0,p.useState)(`desligado`),s=(0,p.useRef)(null),c=a===`ligado`?`ouvindo`:E[e].estado;(0,p.useEffect)(()=>{if(a===`ligado`)return;let n=setTimeout(()=>{t(e=>{let t=(e+1)%E.length;return t===0&&i(e=>(e+1)%T.length),t})},E[e].duracao);return()=>clearTimeout(n)},[e,a]);let l=(0,p.useCallback)(()=>{let e=s.current;if(!e)return 0;e.analyser.getByteFrequencyData(e.dados);let t=0;for(let n=0;n<e.dados.length;n++){let r=e.dados[n]/255;t+=r*r}return Math.min(Math.sqrt(t/e.dados.length)*4.5,1)},[]);async function d(){o(`pedindo`);try{let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),t=new AudioContext;t.state===`suspended`&&await t.resume();let n=t.createAnalyser();n.fftSize=512,n.smoothingTimeConstant=.3,t.createMediaStreamSource(e).connect(n),s.current={analyser:n,dados:new Uint8Array(n.frequencyBinCount),ctx:t,stream:e},o(`ligado`)}catch{o(`negado`)}}function f(){let e=s.current;e&&(e.stream.getTracks().forEach(e=>e.stop()),e.ctx.close().catch(()=>{}),s.current=null),o(`desligado`)}(0,p.useEffect)(()=>()=>f(),[]);let{texto:h,Icone:g}=D[c],_=T[r];return(0,m.jsxs)(`div`,{className:`flex flex-col items-center gap-5 text-center`,children:[(0,m.jsxs)(`div`,{className:`relative w-[min(300px,70vw)]`,children:[(0,m.jsx)(`div`,{className:`absolute inset-[6%] rounded-full bg-brand/20 blur-3xl`,"aria-hidden":`true`}),(0,m.jsx)(w,{estado:c,nivelExterno:a===`ligado`?l:void 0}),(0,m.jsxs)(`span`,{className:`absolute left-1/2 top-[92%] inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold shadow-soft ${c===`falando`?`bg-success text-navy`:`bg-white text-navy`}`,children:[(0,m.jsxs)(`span`,{className:`relative flex size-2`,"aria-hidden":`true`,children:[(0,m.jsx)(`span`,{className:`absolute inline-flex size-full animate-ping rounded-full bg-brand-light opacity-75`}),(0,m.jsx)(`span`,{className:`relative inline-flex size-2 rounded-full bg-brand`})]}),(0,m.jsx)(g,{className:`size-3.5`}),a===`ligado`?`Ouvindo você`:h]})]}),(0,m.jsx)(`div`,{className:`mt-3 min-h-[88px] w-full max-w-md`,"aria-live":`polite`,children:a===`ligado`?(0,m.jsx)(`p`,{className:`text-sm text-sidebar-fg`,children:`Fale alguma coisa. O orbe reage à sua voz, como reage à do seu cliente.`}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`p`,{className:`text-sm text-sidebar-fg`,children:[(0,m.jsx)(`span`,{className:`font-semibold text-white`,children:`Cliente:`}),` `,_.cliente]}),(0,m.jsxs)(`p`,{className:`mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-opacity duration-500 ${c===`falando`?`opacity-100`:`opacity-40`}`,children:[(0,m.jsx)(`span`,{className:`font-semibold text-brand-light`,children:`Agente iA:`}),` `,_.agente]})]})}),(0,m.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-2`,children:[a===`ligado`?(0,m.jsxs)(`button`,{type:`button`,onClick:f,className:`inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-navy`,children:[(0,m.jsx)(u,{className:`size-4`}),` Parar`]}):(0,m.jsxs)(`button`,{type:`button`,onClick:d,disabled:a===`pedindo`,className:`inline-flex h-10 items-center gap-2 rounded-xl border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60`,children:[(0,m.jsx)(n,{className:`size-4`}),` `,a===`pedindo`?`Pedindo o microfone…`:`Testar com a minha voz`]}),a===`negado`&&(0,m.jsx)(`span`,{className:`text-xs text-sidebar-fg`,children:`Sem microfone liberado. Tudo bem, o orbe segue na simulação.`})]})]})}export{O as default};