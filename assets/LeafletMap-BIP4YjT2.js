import{j as e}from"./vendor-motion-Mfk5WHBf.js";import{g as j,r as l}from"./vendor-react-CvKz9FoO.js";import{r as v}from"./vendor-leaflet-DCIffZry.js";import{u as w}from"./index-B4L_qjkg.js";import{a9 as C}from"./vendor-icons-fvVnL4xS.js";var k=v();const n=j(k),B=({className:m="",focusTarget:o="project"})=>{const i=l.useRef(null),s=l.useRef(null),{isBn:t}=w();return l.useEffect(()=>{if(!i.current)return;s.current&&s.current.remove();const d=[{name:t?"দখিনা সিটি (প্রকল্প এলাকা)":"Dakhina City (Flagship Masterplan)",subtitle:t?"১২০০ বিঘা পরিকল্পিত উপশহর":"1,200 Bigha Masterplanned Township",lat:23.8345,lng:90.3152,type:"project"},{name:t?"দখিনা টাওয়ার (প্রধান কার্যালয়)":"Dakhina Tower (Headquarters)",subtitle:"543/A ECB Chattar, Dhaka Cantonment",lat:23.8242,lng:90.3875,type:"office"},{name:t?"উত্তরা ১৮ নম্বর সেক্টর / মেট্রোরেল":"Uttara Sector 18 (Metro Rail Line 6)",subtitle:"Direct Link Via 100ft Boulevard",lat:23.8745,lng:90.3752,type:"landmark"},{name:t?"মাসকাট প্লাজা":"Maskat Plaza, Uttara",subtitle:"Direct access point (10 mins)",lat:23.8682,lng:90.3985,type:"landmark"}],f=o==="office"?[23.8242,90.3875]:[23.8345,90.3352],u=o==="office"?14:12,r=n.map(i.current,{center:f,zoom:u,scrollWheelZoom:!1});s.current=r,n.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19}).addTo(r),d.forEach(a=>{const c=a.type==="project",p=a.type==="office",h=`
        <div style="
          background-color: ${c?"#0F3D2E":p?"#B8934A":"#1C1C1C"};
          color: white;
          border: 2px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border-radius: 9999px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        ">
          ${c?"D":p?"T":"•"}
        </div>
      `,g=n.divIcon({className:"custom-leaflet-icon",html:h,iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]}),b=`
        <div style="font-family: sans-serif; padding: 4px;">
          <h4 style="margin: 0; font-size: 13px; font-weight: bold; color: #0F3D2E;">${a.name}</h4>
          <p style="margin: 3px 0 0 0; font-size: 11px; color: #555;">${a.subtitle}</p>
        </div>
      `,y=n.marker([a.lat,a.lng],{icon:g}).addTo(r).bindPopup(b);o===a.type&&y.openPopup()});const x=setTimeout(()=>{r.invalidateSize()},250);return()=>{clearTimeout(x),r.remove(),s.current=null}},[o,t]),e.jsxs("div",{className:`relative overflow-hidden rounded-2xl border border-gray-200 shadow-md ${m}`,children:[e.jsx("div",{ref:i,className:"h-full w-full min-h-[360px]"}),e.jsxs("div",{className:"absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-gray-200 text-xs shadow-lg pointer-events-auto space-y-1.5 max-w-xs hidden sm:block",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"h-3 w-3 rounded-full bg-[#0F3D2E]"}),e.jsx("span",{className:"font-semibold text-gray-800",children:t?"দখিনা সিটি প্রকল্প":"Dakhina City Project Area"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"h-3 w-3 rounded-full bg-[#B8934A]"}),e.jsx("span",{className:"font-semibold text-gray-800",children:t?"দখিনা টাওয়ার হেড অফিস":"Dakhina Tower (ECB Chattar)"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-[10px] text-gray-500 pt-1 border-t border-gray-100",children:[e.jsx(C,{className:"h-3 w-3 text-emerald-600"}),e.jsx("span",{children:t?"উত্তরা ও সেনানিবাস থেকে ৩টি প্রধান সংযোগ সড়ক":"Connected via 3 arterial routes from Uttara & Cantonment"})]})]})]})};export{B as L};
