const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("request", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      tokens["response-time"](req, res),
      "ms",
      tokens.request(req, res),
    ].join(" ");
  })
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const currentDate = new Date();
  const currentLength = persons.length;

  response.send(
    `<h2>Phonebook has info for ${currentLength} people</h2><h2>${currentDate}</h2>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return String(Math.floor(Math.random() * 100000) + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const exists = persons.find((person) => person.name === body.name);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (exists) {
    return response.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
,o){typeof f=="string"?(o=o||{},o.url=f):o=f||{},o=Il(this.defaults,o);const{transitional:s,paramsSerializer:d,headers:v}=o;s!==void 0&&si.assertOptions(s,{silentJSONParsing:Le.transitional(Le.boolean),forcedJSONParsing:Le.transitional(Le.boolean),clarifyTimeoutError:Le.transitional(Le.boolean)},!1),d!=null&&(A.isFunction(d)?o.paramsSerializer={serialize:d}:si.assertOptions(d,{encode:Le.function,serialize:Le.function},!0)),o.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?o.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:o.allowAbsoluteUrls=!0),si.assertOptions(o,{baseUrl:Le.spelling("baseURL"),withXsrfToken:Le.spelling("withXSRFToken")},!0),o.method=(o.method||this.defaults.method||"get").toLowerCase();let S=v&&A.merge(v.common,v[o.method]);v&&A.forEach(["delete","get","head","post","put","patch","common"],B=>{delete v[B]}),o.headers=fe.concat(S,v);const _=[];let U=!0;this.interceptors.request.forEach(function(L){typeof L.runWhen=="function"&&L.runWhen(o)===!1||(U=U&&L.synchronous,_.unshift(L.fulfilled,L.rejected))});const g=[];this.interceptors.response.forEach(function(L){g.push(L.fulfilled,L.rejected)});let D,H=0,V;if(!U){const B=[Rm.bind(this),void 0];for(B.unshift(..._),B.push(...g),V=B.length,D=Promise.resolve(o);H<V;)D=D.then(B[H++],B[H++]);return D}V=_.length;let ft=o;for(;H<V;){const B=_[H++],L=_[H++];try{ft=B(ft)}catch(x){L.call(this,x);break}}try{D=Rm.call(this,ft)}catch(B){return Promise.reject(B)}for(H=0,V=g.length;H<V;)D=D.then(g[H++],g[H++]);return D}getUri(f){f=Il(this.defaults,f);const o=Km(f.baseURL,f.url,f.allowAbsoluteUrls);return Gm(o,f.params,f.paramsSerializer)}};A.forEach(["delete","get","head","options"],function(f){kl.prototype[f]=function(o,s){return this.request(Il(s||{},{method:f,url:o,data:(s||{}).data}))}});A.forEach(["post","put","patch"],function(f){function o(s){return function(v,S,_){return this.request(Il(_||{},{method:f,headers:s?{"Content-Type":"multipart/form-data"}:{},url:v,data:S}))}}kl.prototype[f]=o(),kl.prototype[f+"Form"]=o(!0)});let f1=class km{constructor(f){if(typeof f!="function")throw new TypeError("executor must be a function.");let o;this.promise=new Promise(function(v){o=v});const s=this;this.promise.then(d=>{if(!s._listeners)return;let v=s._listeners.length;for(;v-- >0;)s._listeners[v](d);s._listeners=null}),this.promise.then=d=>{let v;const S=new Promise(_=>{s.subscribe(_),v=_}).then(d);return S.cancel=function(){s.unsubscribe(v)},S},f(function(v,S,_){s.reason||(s.reason=new La(v,S,_),o(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(f){if(this.reason){f(this.reason);return}this._listeners?this._listeners.push(f):this._listeners=[f]}unsubscribe(f){if(!this._listeners)return;const o=this._listeners.indexOf(f);o!==-1&&this._listeners.splice(o,1)}toAbortSignal(){const f=new AbortController,o=s=>{f.abort(s)};return this.subscribe(o),f.signal.unsubscribe=()=>this.unsubscribe(o),f.signal}static source(){let f;return{token:new km(function(d){f=d}),cancel:f}}};function s1(i){return function(o){return i.apply(null,o)}}function o1(i){return A.isObject(i)&&i.isAxiosError===!0}const Ff={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ff).forEach(([i,f])=>{Ff[f]=i});function Im(i){const f=new kl(i),o=Um(kl.prototype.request,f);return A.extend(o,kl.prototype,f,{allOwnKeys:!0}),A.extend(o,f,null,{allOwnKeys:!0}),o.create=function(d){return Im(Il(i,d))},o}const Rt=Im(Xn);Rt.Axios=kl;Rt.CanceledError=La;Rt.CancelToken=f1;Rt.isCancel=Vm;Rt.VERSION=$m;Rt.toFormData=hi;Rt.AxiosError=k;Rt.Cancel=Rt.CanceledError;Rt.all=function(f){return Promise.all(f)};Rt.spread=s1;Rt.isAxiosError=o1;Rt.mergeConfig=Il;Rt.AxiosHeaders=fe;Rt.formToJSON=i=>Zm(A.isHTMLForm(i)?new FormData(i):i);Rt.getAdapter=Wm.getAdapter;Rt.HttpStatusCode=Ff;Rt.default=Rt;const{Axios:g1,AxiosError:b1,CanceledError:p1,isCancel:E1,CancelToken:T1,VERSION:A1,all:O1,Cancel:z1,isAxiosError:_1,spread:R1,toFormData:D1,AxiosHeaders:U1,HttpStatusCode:M1,formToJSON:N1,getAdapter:C1,mergeConfig:H1}=Rt,vi="http://localhost:3001/persons",r1=i=>Rt.post(vi,i).then(f=>f.data),d1=()=>Rt.get(vi).then(i=>i.data),m1=i=>(console.log(i.id),Rt.delete(`${vi}/${i.id}`).then(f=>f.data)),h1=(i,f)=>Rt.put(`${vi}/${i}`,f).then(o=>o.data),ii={add:r1,getAll:d1,remove:m1,edit:h1},y1=()=>{const[i,f]=Ml.useState([]),[o,s]=Ml.useState(""),[d,v]=Ml.useState(""),[S,_]=Ml.useState(""),[U,g]=Ml.useState(""),[D,H]=Ml.useState("");Ml.useEffect(()=>{ii.getAll().then(P=>{f(P)})},[]);const V=P=>{P.preventDefault();const F={name:o,number:d};if(i.find(tt=>tt.name===o)){if(window.confirm(`${o} is already added to phonebook, replace the old number with a new one?`)){const tt=i.find(St=>St.name===o),zt={...tt,number:F.number};ii.edit(tt.id,zt).then(St=>{f(i.map(w=>w.id===tt.id?St:w)),s(""),v(""),g(`${tt.name}'s phone number was changed.`),setTimeout(()=>g(""),5e3)}).catch(St=>{console.error(St),H(`${tt.name} was already removed from server.`),setTimeout(()=>H(""),5e3)})}return}ii.add(F).then(tt=>{f(i.concat(tt)),s(""),v(""),g(`${F.name} added.`),setTimeout(()=>g(""),5e3)}).catch(tt=>{console.error(tt),H(`${F.name} could not be added to server.`),setTimeout(()=>H(""),5e3)})},ft=P=>{window.confirm(`Delete ${P.name}?`)&&ii.remove(P).then(()=>{f(i.filter(F=>F.id!==P.id)),g(`${P.name} removed.`),setTimeout(()=>g(""),5e3)}).catch(F=>{console.error(F),H(`${P.name} could not be removed from server.`),setTimeout(()=>H(""),5e3)})},B=P=>{s(P.target.value)},L=P=>{v(P.target.value)},x=P=>{_(P.target.value)},it=i.filter(P=>P&&P.name.toLowerCase().includes(S.toLowerCase()));return Ot.jsxs("div",{children:[Ot.jsx("h1",{children:"Phonebook"}),Ot.jsx(q0,{notificationMessage:U,errorMessage:D}),"filter shown with",Ot.jsx(C0,{value:S,onChange:x}),Ot.jsx("h2",{children:"add a new"}),Ot.jsx(B0,{onSubmit:V,newName:o,handleNameChange:B,newNumber:d,handleNumberChange:L}),Ot.jsx("h2",{children:"Numbers"}),Ot.jsx(H0,{filtered:it,remove:ft})]})};N0.createRoot(document.getElementById("root")).render(Ot.jsx(Ml.StrictMode,{children:Ot.jsx(y1,{})}));
