import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Nasi Goreng Spesial", price: 35000, tag: "Best Seller", emoji: "🍳", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80" },
  { id: 2, name: "Ayam Bakar Madu", price: 45000, tag: "Favorit", emoji: "🍗", img: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=500&q=80" },
  { id: 3, name: "Soto Betawi", price: 30000, tag: "Populer", emoji: "🍲", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80" },
  { id: 4, name: "Rendang Daging", price: 55000, tag: "Premium", emoji: "🥩", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80" },
  { id: 5, name: "Mie Goreng Jawa", price: 28000, tag: "Hemat", emoji: "🍜", img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80" },
  { id: 6, name: "Gado-Gado Jakarta", price: 25000, tag: "Sehat", emoji: "🥗", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80" },
];
const testimonials = [
  { id:1, name:"Andi Pratama", role:"Pelanggan 1 Tahun", gender:"boy", review:"Makanannya enak banget, pengiriman cepat dan packaging rapi. Sudah langganan dari setahun lalu!" },
  { id:2, name:"Sari Dewi", role:"Mahasiswi UI", gender:"girl", review:"Sedap memang beda! Menu nya banyak pilihan dan harganya ramah di kantong mahasiswa." },
  { id:3, name:"Budi Santoso", role:"Food Blogger", gender:"boy", review:"Ayam Bakar Madunya juara! Tidak pernah kecewa pesan di sini. Highly recommended." },
  { id:4, name:"Rina Marlina", role:"Ibu Rumah Tangga", gender:"girl", review:"Aplikasinya mudah dipakai, pesan tinggal klik dan makanan datang masih panas. Keren!" },
  { id:5, name:"Dimas Aryo", role:"Pengusaha", gender:"boy", review:"Pelayanan CS ramah, pernah ada masalah langsung direspon cepat. Terpercaya!" },
];
const partners = ["Google","GoPay","OVO","Tokopedia","Gojek","Grab"];
const navLinks = [
  { label:"Beranda", href:"#hero" },{ label:"Tentang", href:"#about" },
  { label:"Menu", href:"#products" },{ label:"Ulasan", href:"#testimonials" },{ label:"Kontak", href:"#footer" },
];
const steps = [
  { icon:"📱", step:"01", title:"Buka Aplikasi", desc:"Kunjungi Sedap melalui browser atau unduh aplikasi kami." },
  { icon:"🍽️", step:"02", title:"Pilih Menu", desc:"Jelajahi ratusan menu lezat pilihan chef terbaik kami." },
  { icon:"✅", step:"03", title:"Pesan & Bayar", desc:"Konfirmasi pesanan dan bayar dengan berbagai metode." },
  { icon:"🚀", step:"04", title:"Nikmati!", desc:"Pesanan tiba dalam 30 menit, masih panas dan segar." },
];
const stats = [
  { num:"50K+", label:"Pelanggan Aktif", icon:"👥" },
  { num:"1K+", label:"Menu Tersedia", icon:"🍽️" },
  { num:"98%", label:"Kepuasan Pelanggan", icon:"⭐" },
  { num:"30", label:"Menit Pengiriman", icon:"⚡" },
];
const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { font-family:'Poppins',sans-serif; background:#fff; overflow-x:hidden; }
  @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-16px) rotate(3deg);} }
  @keyframes floatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes spinSlowR { from{transform:rotate(0deg);} to{transform:rotate(-360deg);} }
  @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6;} 50%{transform:scale(1.08);opacity:1;} }
  @keyframes ripple { 0%{transform:scale(0.8);opacity:0.5;} 100%{transform:scale(2.2);opacity:0;} }
  @keyframes marqueeScroll { 0%{transform:translateX(0);} 100%{transform:translateX(-25%);} }

  @keyframes fadeSlideUp { from{opacity:0;transform:translateY(32px);} to{opacity:1;transform:translateY(0);} }
  .ha { animation:fadeSlideUp 0.7s ease both; }
  .ha1{animation-delay:0.05s;} .ha2{animation-delay:0.15s;} .ha3{animation-delay:0.25s;} .ha4{animation-delay:0.35s;} .ha5{animation-delay:0.45s;}
  .float-a { animation:floatA 6s ease-in-out infinite; }
  .float-b { animation:floatB 5s ease-in-out infinite 1s; }
  .float-c { animation:floatB 7s ease-in-out infinite 2s; }
  @media(max-width:900px){
    .d-nav{display:none!important;}
    .mob-btn{display:flex!important;}
    .hero-g{flex-direction:column!important;}
    .about-g{flex-direction:column!important;}
    .steps-g{grid-template-columns:1fr 1fr!important;}
    .prod-g{grid-template-columns:1fr 1fr!important;}
    .stats-g{grid-template-columns:1fr 1fr!important;}
    .footer-g{grid-template-columns:1fr 1fr!important;}
    .testi-top{grid-template-columns:1fr!important;}
    .testi-bot{grid-template-columns:1fr!important;}
  }
  @media(max-width:600px){
    .steps-g{grid-template-columns:1fr!important;}
    .prod-g{grid-template-columns:1fr!important;}
    .footer-g{grid-template-columns:1fr!important;}
  }
`;

const GridDots = ({ style }) => (
  <svg style={{position:"absolute",...style,pointerEvents:"none"}} width="260" height="260" viewBox="0 0 260 260">
    {Array.from({length:6}).map((_,r)=>Array.from({length:6}).map((_,c)=>(
      <circle key={`${r}-${c}`} cx={c*46+23} cy={r*46+23} r="2.5" fill="#22c55e" opacity="0.14"/>
    )))}
  </svg>
);

function Navbar() {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,transition:"all 0.4s ease",
      background:scrolled?"rgba(255,255,255,0.97)":"transparent",
      boxShadow:scrolled?"0 2px 32px rgba(0,0,0,0.07)":"none",
      backdropFilter:scrolled?"blur(16px)":"none",padding:scrolled?"10px 0":"18px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link to="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(34,197,94,0.45)"}}>
            <span style={{color:"#fff",fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:20}}>S</span>
          </div>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:27,color:"#0f172a",letterSpacing:-1}}>Sedap<span style={{color:"#22c55e"}}>.</span></span>
        </Link>
        <div className="d-nav" style={{display:"flex",alignItems:"center",gap:38}}>
          {navLinks.map(n=>(
            <a key={n.label} href={n.href} style={{fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:14.5,color:"#334155",textDecoration:"none",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#22c55e"} onMouseLeave={e=>e.target.style.color="#334155"}>{n.label}</a>
          ))}
        </div>
        <div className="d-nav" style={{display:"flex",gap:10}}>
          <Link to="/login" style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:14,color:"#22c55e",border:"2px solid #22c55e",borderRadius:10,padding:"9px 22px",textDecoration:"none",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.target.style.background="#22c55e";e.target.style.color="#fff";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#22c55e";}}>Login</Link>
          <Link to="/register" style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#fff",background:"linear-gradient(135deg,#22c55e,#16a34a)",borderRadius:10,padding:"9px 22px",textDecoration:"none",boxShadow:"0 4px 14px rgba(34,197,94,0.35)",transition:"all 0.25s",border:"none"}}
            onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 8px 24px rgba(34,197,94,0.5)";}} onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 4px 14px rgba(34,197,94,0.35)";}}>Daftar</Link>
        </div>
        <button className="mob-btn" onClick={()=>setOpen(!open)} style={{display:"none",background:"none",border:"none",cursor:"pointer",flexDirection:"column",gap:5,padding:4}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:26,height:2.5,background:"#0f172a",borderRadius:2}}/>)}
        </button>
      </div>
      {open&&(
        <div style={{background:"#fff",padding:"16px 48px 24px",borderTop:"1px solid #f1f5f9",display:"flex",flexDirection:"column",gap:14}}>
          {navLinks.map(n=><a key={n.label} href={n.href} onClick={()=>setOpen(false)} style={{fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:16,color:"#334155",textDecoration:"none"}}>{n.label}</a>)}
          <div style={{display:"flex",gap:10,marginTop:8}}>
            <Link to="/login" style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:14,color:"#22c55e",border:"2px solid #22c55e",borderRadius:10,padding:"8px 20px",textDecoration:"none"}}>Login</Link>
            <Link to="/register" style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#fff",background:"#22c55e",borderRadius:10,padding:"8px 20px",textDecoration:"none"}}>Daftar</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",background:"linear-gradient(135deg,#ecfdf5 0%,#d1fae5 35%,#f0f9ff 100%)",position:"relative",overflow:"hidden",paddingTop:90}}>
      <div style={{position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"rgba(34,197,94,0.07)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-120,left:-80,width:380,height:380,borderRadius:"50%",background:"rgba(34,197,94,0.06)",pointerEvents:"none"}}/>
      <div className="float-c" style={{position:"absolute",top:"18%",right:"6%",width:220,height:220,borderRadius:"50%",border:"2px solid rgba(34,197,94,0.2)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"22%",right:"8%",width:160,height:160,borderRadius:"50%",border:"2px dashed rgba(34,197,94,0.15)",animation:"spinSlowR 18s linear infinite",pointerEvents:"none"}}/>
      <GridDots style={{top:80,left:20,opacity:0.8}}/>
      <GridDots style={{bottom:40,right:60,opacity:0.55}}/>
      <div style={{position:"absolute",right:"15%",top:"50%",transform:"translateY(-50%)",width:440,height:440,borderRadius:"50%",background:"rgba(34,197,94,0.08)",animation:"pulse 4s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:"15%",top:"50%",transform:"translateY(-50%)",width:520,height:520,borderRadius:"50%",border:"1.5px solid rgba(34,197,94,0.12)",animation:"ripple 3.5s ease-out infinite",pointerEvents:"none"}}/>
      {[{e:"🌶️",t:"15%",l:"48%",d:"0s"},{e:"🧅",t:"70%",l:"52%",d:"1s"},{e:"🥬",t:"25%",l:"76%",d:"2s"},{e:"🫙",t:"60%",l:"80%",d:"0.5s"}].map((f,i)=>(
        <div key={i} style={{position:"absolute",top:f.t,left:f.l,fontSize:26,animation:"floatB 5s ease-in-out infinite",animationDelay:f.d,pointerEvents:"none",zIndex:0,opacity:0.65}}>{f.e}</div>
      ))}
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px",width:"100%",display:"flex",alignItems:"center",gap:60,position:"relative",zIndex:1}} className="hero-g">
        <div style={{flex:"0 0 52%"}}>
          <div className="ha ha1" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(34,197,94,0.12)",borderRadius:100,padding:"7px 18px",marginBottom:22}}>
            <span style={{fontSize:18}}>🍽️</span>
            <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:13,color:"#16a34a",letterSpacing:0.4}}>Selamat Datang di Sedap</span>
          </div>
          <h1 className="ha ha2" style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(2.6rem,5.5vw,4.2rem)",lineHeight:1.1,color:"#0f172a",marginBottom:18}}>
            Nikmati Cita Rasa{" "}
            <span style={{color:"#22c55e",textDecoration:"underline",textDecorationColor:"#22c55e",textDecorationThickness:4,textUnderlineOffset:7,fontStyle:"italic"}}>Terbaik</span>
            {" "}Indonesia
          </h1>
          <p className="ha ha3" style={{fontFamily:"'Poppins',sans-serif",fontWeight:400,fontSize:16.5,color:"#475569",lineHeight:1.8,maxWidth:500,marginBottom:36}}>
            Kami menghadirkan pengalaman makan yang menyenangkan — dari dapur terbaik langsung ke meja Anda. Pesan mudah, cepat, dan lezat!
          </p>
          <div className="ha ha4" style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:48}}>
            <a href="#products" style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"#fff",background:"linear-gradient(135deg,#22c55e,#16a34a)",padding:"13px 32px",borderRadius:12,textDecoration:"none",boxShadow:"0 8px 28px rgba(34,197,94,0.38)",transition:"all 0.3s",display:"inline-block"}}
              onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.boxShadow="0 14px 36px rgba(34,197,94,0.5)";}} onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 8px 28px rgba(34,197,94,0.38)";}}>🍽️ Lihat Menu</a>
            <Link to="/login" style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:15,color:"#16a34a",background:"#fff",padding:"13px 32px",borderRadius:12,textDecoration:"none",border:"2px solid #22c55e",transition:"all 0.3s",display:"inline-block"}}
              onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.background="#f0fdf4";}} onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.background="#fff";}}>Masuk Sekarang →</Link>
          </div>
          <div className="ha ha5" style={{display:"flex",gap:0,background:"#fff",borderRadius:20,padding:"20px 28px",boxShadow:"0 8px 32px rgba(0,0,0,0.07)",width:"fit-content"}}>
            {[["1K+","Menu Lezat","🍽️"],["50K+","Pelanggan","👥"],["4.9★","Rating","⭐"]].map(([num,label,icon],i)=>(
              <div key={label} style={{textAlign:"center",padding:"0 24px",borderRight:i<2?"1px solid #f1f5f9":"none"}}>
                <div style={{fontSize:20,marginBottom:2}}>{icon}</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:22,color:"#0f172a",lineHeight:1}}>{num}</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:12,color:"#94a3b8",marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="float-a" style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
          <div style={{width:420,height:420,borderRadius:"50%",background:"linear-gradient(135deg,rgba(34,197,94,0.18),rgba(134,239,172,0.1))",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85" alt="Makanan Lezat"
              style={{width:360,height:360,objectFit:"cover",borderRadius:"50%",boxShadow:"0 28px 70px rgba(0,0,0,0.2)",border:"7px solid #fff"}}/>
            <div className="float-b" style={{position:"absolute",top:20,right:-30,background:"#fff",borderRadius:18,padding:"12px 18px",boxShadow:"0 10px 30px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",gap:10,minWidth:160}}>
              <span style={{fontSize:26}}>🍜</span>
              <div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:"#0f172a"}}>Fresh & Hot</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"#94a3b8"}}>Diantar hangat</div>
              </div>
            </div>
            <div className="float-c" style={{position:"absolute",bottom:30,left:-40,background:"#fff",borderRadius:18,padding:"12px 18px",boxShadow:"0 10px 30px rgba(0,0,0,0.12)",display:"flex",alignItems:"center",gap:10,minWidth:155}}>
              <span style={{fontSize:26}}>⚡</span>
              <div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:"#0f172a"}}>30 Menit</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"#94a3b8"}}>Pengiriman cepat</div>
              </div>
            </div>
            <div style={{position:"absolute",bottom:-10,right:-10,background:"linear-gradient(135deg,#22c55e,#16a34a)",borderRadius:16,padding:"10px 16px",boxShadow:"0 8px 24px rgba(34,197,94,0.4)",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:22}}>⭐</span>
              <div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:14,color:"#fff"}}>4.9/5.0</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontSize:10,color:"rgba(255,255,255,0.8)"}}>10K+ ulasan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const [activeIdx, setActiveIdx] = useState(null);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setActiveIdx(i % partners.length); i++; }, 1100);
    return () => clearInterval(iv);
  }, []);

  const quadrupled = [...partners, ...partners, ...partners, ...partners];

  return (
    <section style={{ padding:"44px 0", background:"#fff", borderTop:"1px solid #f1f5f9", borderBottom:"1px solid #f1f5f9", overflow:"hidden" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px", display:"flex", alignItems:"center", gap:40 }}>
        <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:14, color:"#94a3b8", whiteSpace:"nowrap", flexShrink:0 }}>Dipercaya Oleh:</span>
        <div style={{ overflow:"hidden", flex:1 }}>
          <div style={{ display:"flex", gap:56, animation:"marqueeScroll 14s linear infinite", width:"max-content", willChange:"transform" }}>
            {quadrupled.map((p, i) => (
              <span key={i} style={{
                fontFamily:"'Poppins',sans-serif",
                fontWeight:800,
                fontSize:20,
                color: activeIdx === i % partners.length ? "#0f172a" : "#cbd5e1",
                transition:"color 0.5s, transform 0.3s",
                transform: activeIdx === i % partners.length ? "scale(1.15)" : "scale(1)",
                display:"inline-block",
                letterSpacing:-0.5
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.15}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  const feats=[
    {icon:"🍽️",title:"Menu Autentik",desc:"Chef berpengalaman, resep tradisional Indonesia."},
    {icon:"⚡",title:"Pengiriman Cepat",desc:"Dijamin tiba dalam 30 menit atau gratis."},
    {icon:"💯",title:"Kualitas Terjamin",desc:"Bahan segar pilihan, tanpa bahan pengawet."},
    {icon:"🎯",title:"Harga Terjangkau",desc:"Porsi besar, rasa premium, harga bersahabat."},
  ];
  return (
    <section id="about" ref={ref} style={{padding:"110px 0",background:"#fff",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(70px,12vw,150px)",color:"rgba(34,197,94,0.04)",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none",letterSpacing:-4}}>SEDAP INDONESIA</div>
      <GridDots style={{top:40,right:40,opacity:0.8}}/>
      <GridDots style={{bottom:40,left:40,opacity:0.5}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px",display:"flex",alignItems:"center",gap:80,flexWrap:"wrap"}} className="about-g">
        <div style={{flex:"0 0 460px",position:"relative",transform:vis?"translateX(0)":"translateX(-50px)",opacity:vis?1:0,transition:"all 0.8s ease"}}>
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=85" alt="Dapur Sedap"
            style={{width:"100%",borderRadius:28,boxShadow:"0 28px 70px rgba(0,0,0,0.13)",objectFit:"cover",height:460}}/>
          <div style={{position:"absolute",bottom:-28,right:-28,background:"#fff",borderRadius:22,padding:"22px 26px",boxShadow:"0 16px 48px rgba(0,0,0,0.13)"}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:34,color:"#22c55e",lineHeight:1}}>5.0★</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:12,color:"#64748b",marginTop:3}}>Rating Rata-rata</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:12,color:"#0f172a"}}>10.000+ ulasan</div>
          </div>
          <div style={{position:"absolute",top:-20,left:-20,width:90,height:90,background:"linear-gradient(135deg,#22c55e,#16a34a)",borderRadius:22,zIndex:-1,opacity:0.55}}/>
          <div style={{position:"absolute",top:24,left:-32,background:"#0f172a",borderRadius:16,padding:"14px 20px",boxShadow:"0 8px 28px rgba(0,0,0,0.2)"}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:26,color:"#22c55e",lineHeight:1}}>5+</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:11,color:"#94a3b8"}}>Tahun Pengalaman</div>
          </div>
        </div>
        <div style={{flex:1,minWidth:300,transform:vis?"translateX(0)":"translateX(50px)",opacity:vis?1:0,transition:"all 0.8s ease 0.2s"}}>
          <div style={{display:"inline-block",background:"rgba(34,197,94,0.1)",borderRadius:100,padding:"5px 16px",marginBottom:20,fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:12,color:"#16a34a",letterSpacing:1,textTransform:"uppercase"}}>Tentang Sedap</div>
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",color:"#0f172a",lineHeight:1.15,marginBottom:18}}>
            Pertumbuhan Bisnis{" "}<span style={{color:"#22c55e",fontStyle:"italic"}}>Melampaui Ekspektasi.</span>
          </h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15.5,color:"#475569",lineHeight:1.85,marginBottom:32}}>
            Sedap adalah platform restoran modern yang menghubungkan pelanggan dengan cita rasa terbaik Indonesia. Kami mendesain konsep, proses, dan pengalaman baru untuk generasi berikutnya.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
            {feats.map((f,i)=>(<FeatCard key={f.title} f={f} delay={i*0.08} vis={vis}/>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
            {["Copywriting tool yang menghasilkan marketing","Harga Kompetitif Untuk Semua Layanan","Solusi Infrastruktur Jaringan Handal","Backup Data & Pemulihan Bencana"].map(item=>(
              <div key={item} style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:22,height:22,borderRadius:6,background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#fff",fontSize:12,fontWeight:700}}>✓</span>
                </div>
                <span style={{fontFamily:"'Poppins',sans-serif",fontSize:14,color:"#334155"}}>{item}</span>
              </div>
            ))}
          </div>
          <a href="#products" style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"#fff",background:"linear-gradient(135deg,#22c55e,#16a34a)",padding:"13px 32px",borderRadius:12,textDecoration:"none",display:"inline-block",boxShadow:"0 8px 28px rgba(34,197,94,0.32)",transition:"all 0.3s"}}
            onMouseEnter={e=>{e.target.style.transform="translateY(-3px)";e.target.style.boxShadow="0 14px 36px rgba(34,197,94,0.44)";}} onMouseLeave={e=>{e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 8px 28px rgba(34,197,94,0.32)";}}>Lebih Lanjut →</a>
        </div>
      </div>
    </section>
  );
}

function FeatCard({f,delay,vis}) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{padding:"18px",borderRadius:16,border:`1.5px solid ${hov?"#22c55e":"#f1f5f9"}`,background:hov?"#f0fdf4":"#fafafa",transition:"all 0.3s",cursor:"default",transform:vis?(hov?"translateY(-4px)":"translateY(0)"):"translateY(20px)",opacity:vis?1:0,transitionDelay:`${delay}s`}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{fontSize:30,marginBottom:8}}>{f.icon}</div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#0f172a",marginBottom:4}}>{f.title}</div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontSize:12,color:"#64748b",lineHeight:1.6}}>{f.desc}</div>
    </div>
  );
}

function HowItWorks() {
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.1}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <section ref={ref} style={{padding:"100px 0",background:"linear-gradient(180deg,#f0fdf4 0%,#ecfdf5 100%)",position:"relative",overflow:"hidden"}}>
      <GridDots style={{top:20,left:20,opacity:0.7}}/>
      <GridDots style={{bottom:20,right:20,opacity:0.5}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{display:"inline-block",background:"rgba(34,197,94,0.12)",borderRadius:100,padding:"5px 18px",marginBottom:16,fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:12,color:"#16a34a",letterSpacing:1,textTransform:"uppercase"}}>Cara Pesan</div>
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.8rem)",color:"#0f172a"}}>
            Cara Pesan di <span style={{color:"#22c55e"}}>Sedap</span>
          </h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15.5,color:"#64748b",marginTop:12,maxWidth:480,margin:"12px auto 0"}}>
            Cukup 4 langkah mudah dan makanan lezat sudah ada di depan pintu kamu.
          </p>
        </div>
        <div className="steps-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:28}}>
          {steps.map((s,i)=>(<StepCard key={s.step} s={s} i={i} vis={vis}/>))}
        </div>
      </div>
    </section>
  );
}

function StepCard({s,i,vis}) {
  const [hov,setHov]=useState(false);
  return (
    <div style={{background:"#fff",borderRadius:24,padding:"36px 28px",textAlign:"center",position:"relative",overflow:"hidden",
      boxShadow:hov?"0 20px 50px rgba(34,197,94,0.15)":"0 4px 20px rgba(0,0,0,0.05)",
      transform:vis?(hov?"translateY(-6px)":"translateY(0)"):"translateY(40px)",
      opacity:vis?1:0,transition:`all 0.5s ease ${i*0.1}s`,cursor:"default"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{position:"absolute",top:-10,right:-10,fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:80,color:"rgba(34,197,94,0.06)",lineHeight:1,userSelect:"none"}}>{s.step}</div>
      {i<3&&<div style={{position:"absolute",top:"50%",right:-14,width:28,height:2,background:"linear-gradient(90deg,#22c55e,#86efac)",zIndex:10}}/>}
      <div style={{width:70,height:70,borderRadius:"50%",background:hov?"linear-gradient(135deg,#22c55e,#16a34a)":"rgba(34,197,94,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:32,transition:"all 0.3s",boxShadow:hov?"0 8px 24px rgba(34,197,94,0.4)":"none"}}>{s.icon}</div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:11,color:"#22c55e",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Langkah {s.step}</div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:17,color:"#0f172a",marginBottom:10}}>{s.title}</div>
      <div style={{fontFamily:"'Poppins',sans-serif",fontSize:13.5,color:"#64748b",lineHeight:1.65}}>{s.desc}</div>
    </div>
  );
}

function Products() {
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.08}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <section id="products" ref={ref} style={{padding:"110px 0",background:"#fff",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(60px,10vw,130px)",color:"rgba(34,197,94,0.03)",whiteSpace:"nowrap",pointerEvents:"none",letterSpacing:-4,userSelect:"none"}}>MENU PILIHAN</div>
      <GridDots style={{top:60,right:60,opacity:0.7}}/> <GridDots style={{bottom:60,left:60,opacity:0.5}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:56,flexWrap:"wrap",gap:20}}>
          <div>
            <div style={{display:"inline-block",background:"rgba(34,197,94,0.1)",borderRadius:100,padding:"5px 18px",marginBottom:14,fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:12,color:"#16a34a",letterSpacing:1,textTransform:"uppercase"}}>Produk Unggulan</div>
            <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",color:"#0f172a"}}>Menu <span style={{color:"#22c55e"}}>Terpopuler</span> Kami</h2>
            <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15,color:"#64748b",marginTop:10,maxWidth:420}}>Pilihan menu autentik yang digemari ribuan pelanggan setia Sedap.</p>
          </div>
          <a href="#" style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:14,color:"#22c55e",border:"2px solid #22c55e",borderRadius:10,padding:"10px 24px",textDecoration:"none",transition:"all 0.25s"}}
            onMouseEnter={e=>{e.target.style.background="#22c55e";e.target.style.color="#fff";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#22c55e";}}>Lihat Semua Menu →</a>
        </div>
        <div className="prod-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
          {products.map((p,i)=><ProdCard key={p.id} product={p} delay={i*0.09} vis={vis}/>)}
        </div>
      </div>
    </section>
  );
}

function ProdCard({product,delay,vis}) {
  const [hov,setHov]=useState(false);
  const [err,setErr]=useState(false);
  return (
    <div style={{background:"#fff",borderRadius:22,overflow:"hidden",boxShadow:hov?"0 24px 60px rgba(34,197,94,0.18)":"0 4px 20px rgba(0,0,0,0.06)",transform:vis?(hov?"translateY(-8px)":"translateY(0)"):"translateY(32px)",opacity:vis?1:0,transition:`all 0.5s ease ${delay}s`,cursor:"pointer",border:`1.5px solid ${hov?"rgba(34,197,94,0.3)":"transparent"}`}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{position:"relative",overflow:"hidden",height:220}}>
        {err?(
          <div style={{width:"100%",height:"100%",background:"linear-gradient(135deg,#f0fdf4,#dcfce7)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}>
            <span style={{fontSize:56}}>{product.emoji}</span>
            <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:13,color:"#16a34a"}}>{product.name}</span>
          </div>
        ):(
          <img src={product.img} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.45s ease",transform:hov?"scale(1.07)":"scale(1)"}} onError={()=>setErr(true)}/>
        )}
        <div style={{position:"absolute",top:14,left:14,background:"linear-gradient(135deg,#22c55e,#16a34a)",color:"#fff",borderRadius:10,padding:"5px 14px",fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:11}}>{product.tag}</div>
        {hov&&<div style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.18)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#fff",borderRadius:12,padding:"10px 22px",fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:"#22c55e"}}>Pesan Sekarang</div></div>}
      </div>
      <div style={{padding:"22px 24px"}}>
        <h3 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:17,color:"#0f172a",marginBottom:10}}>{product.name}</h3>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:20,color:"#22c55e"}}>{formatRp(product.price)}</span>
          <button style={{background:hov?"linear-gradient(135deg,#22c55e,#16a34a)":"#f0fdf4",color:hov?"#fff":"#22c55e",border:"none",borderRadius:10,padding:"8px 18px",fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.3s"}}>+ Pesan</button>
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.15}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <section ref={ref} style={{padding:"90px 0",background:"linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,left:-80,width:300,height:300,borderRadius:"50%",background:"rgba(34,197,94,0.08)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-100,right:-60,width:400,height:400,borderRadius:"50%",background:"rgba(34,197,94,0.05)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.8rem)",color:"#fff"}}>Angka Yang <span style={{color:"#22c55e"}}>Berbicara</span></h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15,color:"#94a3b8",marginTop:10}}>Dipercaya puluhan ribu pelanggan dari seluruh Indonesia</p>
        </div>
        <div className="stats-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {stats.map((s,i)=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.05)",borderRadius:22,padding:"36px 24px",textAlign:"center",border:"1px solid rgba(34,197,94,0.15)",transform:vis?"translateY(0) scale(1)":"translateY(40px) scale(0.9)",opacity:vis?1:0,transition:`all 0.6s cubic-bezier(.34,1.56,.64,1) ${i*0.1}s`}}>
              <div style={{fontSize:40,marginBottom:12}}>{s.icon}</div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:42,color:"#22c55e",lineHeight:1}}>{s.num}</div>
              <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:500,fontSize:14,color:"#94a3b8",marginTop:8}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref=useRef(); const [vis,setVis]=useState(false); const [active,setActive]=useState(0);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.08}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  useEffect(()=>{ const t=setInterval(()=>setActive(a=>(a+1)%testimonials.length),4000); return()=>clearInterval(t); },[]);
  return (
    <section id="testimonials" ref={ref} style={{padding:"110px 0",background:"linear-gradient(180deg,#f8fafc 0%,#f0fdf4 100%)",position:"relative",overflow:"hidden"}}>
      <GridDots style={{top:40,left:40,opacity:0.7}}/> <GridDots style={{bottom:40,right:40,opacity:0.5}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{display:"inline-block",background:"rgba(34,197,94,0.1)",borderRadius:100,padding:"5px 18px",marginBottom:16,fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:12,color:"#16a34a",letterSpacing:1,textTransform:"uppercase"}}>Ulasan Pengguna</div>
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",color:"#0f172a"}}>Apa Kata Mereka <span style={{color:"#22c55e"}}>Tentang Sedap?</span></h2>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:15,color:"#64748b",marginTop:10}}>Bergabung dengan 50.000+ pelanggan puas di seluruh Indonesia</p>
        </div>
        <div className="testi-top" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:16}}>
          {testimonials.slice(0,3).map((t,i)=><TestiCard key={t.id} t={t} i={i} active={active} vis={vis}/>)}
        </div>
        <div className="testi-bot" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24,maxWidth:820,margin:"0 auto"}}>
          {testimonials.slice(3).map((t,i)=><TestiCard key={t.id} t={t} i={i+3} active={active} vis={vis}/>)}
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:36}}>
          {testimonials.map((_,i)=><button key={i} onClick={()=>setActive(i)} style={{width:i===active?32:10,height:10,borderRadius:5,border:"none",cursor:"pointer",background:i===active?"#22c55e":"#cbd5e1",transition:"all 0.35s"}}/>)}
        </div>
      </div>
    </section>
  );
}

function TestiCard({t,i,active,vis}) {
  const isActive=active===i;
  return (
    <div style={{background:"#fff",border:`2px solid ${isActive?"#22c55e":"#f1f5f9"}`,borderRadius:22,padding:"28px",transform:vis?(isActive?"translateY(-8px) scale(1.02)":"translateY(0)"):"translateY(40px)",opacity:vis?1:0,transition:`all 0.5s ease ${i*0.09}s`,boxShadow:isActive?"0 16px 48px rgba(34,197,94,0.18)":"0 2px 12px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"}}>
      {isActive&&<div style={{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#22c55e,#86efac)"}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
        <div style={{fontSize:20,color:"#fbbf24",letterSpacing:2}}>★★★★★</div>
        <span style={{fontSize:36,opacity:0.1,fontFamily:"Georgia,serif",lineHeight:1,marginTop:-8}}>"</span>
      </div>
      <p style={{fontFamily:"'Poppins',sans-serif",fontSize:14,color:"#475569",lineHeight:1.75,marginBottom:20,fontStyle:"italic"}}>"{t.review}"</p>
      <div style={{display:"flex",alignItems:"center",gap:12,borderTop:"1px solid #f1f5f9",paddingTop:16}}>
        <img src={`https://avatar-placeholder.iran.liara.run/public/${t.gender}?username=${encodeURIComponent(t.name)}`} alt={t.name}
          style={{width:46,height:46,borderRadius:"50%",objectFit:"cover",border:`2.5px solid ${isActive?"#22c55e":"#e2e8f0"}`}}
          onError={e=>{e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=22c55e&color=fff&size=80`;}}/>
        <div>
          <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#0f172a"}}>{t.name}</div>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:11.5,color:"#94a3b8"}}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function CTABanner() {
  const ref=useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{ const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.15}); if(ref.current)obs.observe(ref.current); return()=>obs.disconnect(); },[]);
  return (
    <section ref={ref} style={{padding:"60px 48px",background:"#fff"}}>
      <div style={{maxWidth:1400,margin:"0 auto",background:"linear-gradient(135deg,#22c55e 0%,#16a34a 60%,#15803d 100%)",borderRadius:32,padding:"72px 80px",position:"relative",overflow:"hidden",transform:vis?"translateY(0)":"translateY(50px)",opacity:vis?1:0,transition:"all 0.8s cubic-bezier(.34,1.2,.64,1)"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-40,right:120,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:30,left:"40%",width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:36,position:"relative",zIndex:1}}>
          <div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:"rgba(255,255,255,0.75)",letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Mulai Sekarang — Gratis!</div>
            <h2 style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,3.5vw,3rem)",color:"#fff",lineHeight:1.15,maxWidth:600}}>Siap Merasakan Kelezatan Sedap?</h2>
            <p style={{fontFamily:"'Poppins',sans-serif",fontSize:16,color:"rgba(255,255,255,0.8)",marginTop:14,maxWidth:500,lineHeight:1.7}}>Bergabunglah dengan jutaan pelanggan yang sudah menikmati kemudahan memesan makanan lewat Sedap.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,flexShrink:0}}>
            <Link to="/register" style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:16,color:"#16a34a",background:"#fff",borderRadius:14,padding:"16px 40px",textDecoration:"none",boxShadow:"0 8px 28px rgba(0,0,0,0.2)",transition:"all 0.3s",display:"block",textAlign:"center"}}
              onMouseEnter={e=>{e.target.style.transform="translateY(-3px) scale(1.02)";e.target.style.boxShadow="0 14px 40px rgba(0,0,0,0.3)";}} onMouseLeave={e=>{e.target.style.transform="translateY(0) scale(1)";e.target.style.boxShadow="0 8px 28px rgba(0,0,0,0.2)";}}>🚀 Daftar Gratis Sekarang</Link>
            <Link to="/login" style={{fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:15,color:"rgba(255,255,255,0.9)",textDecoration:"none",textAlign:"center",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.9)"}>Sudah punya akun? Login →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" style={{background:"#0f172a",color:"#94a3b8",padding:"90px 0 32px"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
        <div className="footer-g" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:52,marginBottom:72}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(34,197,94,0.4)"}}>
                <span style={{color:"#fff",fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:22}}>S</span>
              </div>
              <span style={{fontFamily:"'Poppins',sans-serif",fontWeight:900,fontSize:26,color:"#fff"}}>Sedap<span style={{color:"#22c55e"}}>.</span></span>
            </div>
            <p style={{fontFamily:"'Poppins',sans-serif",fontSize:14,lineHeight:1.85,maxWidth:280,marginBottom:28}}>Platform restoran modern yang menghadirkan cita rasa terbaik Indonesia langsung ke meja Anda.</p>
            <div style={{display:"flex",gap:10}}>
              {[["IG","Instagram"],["TW","Twitter"],["FB","Facebook"],["TT","TikTok"]].map(([code,name])=>(
                <a key={name} href="#" title={name} style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",textDecoration:"none",fontFamily:"'Poppins',sans-serif",fontSize:12,fontWeight:700,transition:"all 0.25s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#22c55e";e.currentTarget.style.color="#fff";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.color="#94a3b8";}}>{code}</a>
              ))}
            </div>
          </div>
          {[
            {title:"Navigasi",links:["Beranda","Tentang Kami","Menu","Blog","Karir"]},
            {title:"Layanan",links:["Pesan Antar","Reservasi Meja","Catering","Program Loyalti","Partnership"]},
            {title:"Kontak",links:["📍 Jl. Sudirman No.1 Jakarta","📞 +62 812-3456-7890","✉️ halo@sedap.id","🕐 Buka 08.00–22.00","💬 Live Chat"]},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"#fff",marginBottom:22}}>{col.title}</div>
              <div style={{display:"flex",flexDirection:"column",gap:13}}>
                {col.links.map(l=>(
                  <a key={l} href="#" style={{fontFamily:"'Poppins',sans-serif",fontSize:13.5,color:"#94a3b8",textDecoration:"none",transition:"color 0.2s"}}
                    onMouseEnter={e=>e.target.style.color="#22c55e"} onMouseLeave={e=>e.target.style.color="#94a3b8"}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:32,marginBottom:32,display:"flex",alignItems:"center",gap:36,flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:12,color:"#475569",textTransform:"uppercase",letterSpacing:1}}>Partner:</span>
          {partners.map(p=>(
            <span key={p} style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#334155",transition:"color 0.2s",cursor:"default"}}
              onMouseEnter={e=>e.target.style.color="#22c55e"} onMouseLeave={e=>e.target.style.color="#334155"}>{p}</span>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:13}}>© 2025 Sedap Restaurant. All Rights Reserved.</span>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:13}}>Made with ❤️ in Indonesia</span>
        </div>
      </div>
    </footer>
  );
}

export default function GuestPage() {
  return (
    <>
      <style>{globalStyle}</style>
      <Navbar />
      <Hero />
      <Partners />
      <About />
      <HowItWorks />
      <Products />
      <StatsSection />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}