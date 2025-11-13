
import bni from '../assets/bni-logo.png';
import bri from '../assets/bri-logo.png';
import srm from '../assets/srm-logo.png';
import nusamba from '../assets/nusamba-logo.png';
import bprbde from '../assets/bpr-bde-logo.png';
import globe from '../assets/globe-logo.png'; 
import telkom from '../assets/telkom-logo.png';
import cfds from '../assets/cfds-logo.png';
import amc from '../assets/amc-logo.png';
import software from '../assets/software-seni-logo.png';
import matahari from '../assets/matahari-logo.png';
import alfamidi from '../assets/alfamidi-logo.png';
import bj from '../assets/bj-home-logo.png';
import waroeng from '../assets/waroeng-logo.png';
import yamic from '../assets/yamic-panda-logo.png';
import joger from '../assets/joger-logo.png';


import ugm from '../assets/ugm-logo.png';
import uin from '../assets/uin-logo.png';
import ut from '../assets/ut-logo.png'; 
import isi from '../assets/isi-logo.png';
import uii from '../assets/uii-logo.png';
import umy from '../assets/umy-logo.png';
import usd from '../assets/usd-logo.png';
import uajy from '../assets/uajy-logo.png';
import ukdw from '../assets/ukdw-logo.png';
import ykpn from '../assets/ykpn-logo.png'; 
import febugm from '../assets/feb-ugm-logo.png'; 
import hi from '../assets/hi-logo.png'; 
import mmsd from '../assets/mm-usd-logo.png';
import fsmb from '../assets/mercu-buana-logo.png';
import mesinugm from '../assets/ft-ugm-logo.png';
import fikom from '../assets/fikomm-logo.png'; 


import kemhan from '../assets/kemhan-logo.png'; 
import bmkg from '../assets/bmkg-logo.png';
import sagan from '../assets/sagan-logo.png'; 
import sdsyuhada from '../assets/sd-syuhada-logo.png';
import sdnpurwo from '../assets/sdn-logo.png';
import pawitikra from '../assets/pawitikra-logo.png';
import bnn from '../assets/bnn-logo.png';
import ojk from '../assets/ojk-logo.png';
import dispar from '../assets/dispar-diy-logo.png';
import beacukai from '../assets/bea-cukai-logo.png';
import rsmyap from '../assets/rsm-yap-logo.png';
import kaltim from '../assets/kaltim-logo.png';
import dimasdiajeng from '../assets/dimas-diajeng-logo.png';
import depotloro from '../assets/depot-loro-logo.png';
import nasiuduk from '../assets/nasi-uduk-logo.png';
import uksw from '../assets/uksw-logo.png';




export const Clients = () => {

  const clientLogosRow1 = [
    { name: 'Bank Negara Indonesia', logo: bni },
    { name: 'Bank Rakyat Indonesia', logo: bri },
    { name: 'SRM Corporate University', logo: srm },
    { name: 'Bank Nusamba', logo: nusamba },
    { name: 'BPR BDE Yogyakarta', logo: bprbde },
    { name: 'Globe', logo: globe },
    { name: 'Telkom Indonesia', logo: telkom },
    { name: 'Center for Digital Society', logo: cfds },
    { name: 'AMC IT Consulting', logo: amc },
    { name: 'Software Seni', logo: software },
    { name: 'Matahari Department Store', logo: matahari },
    { name: 'Alfamidi', logo: alfamidi },
    { name: 'BJ Home Supermarket', logo: bj },
    { name: 'Waroeng Steak & Shake', logo: waroeng },
    { name: 'Yamic Panda', logo: yamic },
    { name: 'Mutiara Joger Bakpia Pathok', logo: joger },
  ];

  
  const clientLogosRow2 = [
    { name: 'Universitas Gadjah Mada', logo: ugm },
    { name: 'UIN Sunan Kalijaga Yogyakarta', logo: uin },
    { name: 'Universitas Terbuka', logo: ut }, 
    { name: 'Institut Seni Indonesia Yogyakarta', logo: isi },
    { name: 'Universitas Islam Indonesia', logo: uii },
    { name: 'Universitas Muhammadiyah Yogyakarta', logo: umy },
    { name: 'Universitas Sanata Dharma Yogyakarta', logo: usd },
    { name: 'Universitas Atma Jaya Jogjakarta', logo: uajy },
    { name: 'Universitas Kristen Duta Wacana', logo: ukdw },
    { name: 'STIE YKPN Yogyakarta', logo: ykpn },
    { name: 'FEB UGM', logo: febugm },
    { name: 'Hubungan Internasional', logo: hi },
    { name: 'Magister Manajemen Universitas Sanata Dharma', logo: mmsd },
    { name: 'Fakultas Psikologi Universitas Mercu Buana', logo: fsmb },
    { name: 'Mesin FT UGM', logo: mesinugm },
    { name: 'FIKOMM', logo: fikom }, 
  ];


  const clientLogosRow3 = [
    { name: 'Kementerian Pertahanan Republik Indonesia', logo: kemhan }, 
    { name: 'Badan Meteorologi Klimatologi dan Geofisika', logo: bmkg },
    { name: 'Sagan Yogyakarta', logo: sagan },
    { name: 'SD Masjid Syuhada', logo: sdsyuhada },
    { name: 'SDN Purwodingratan', logo: sdnpurwo },
    { name: 'Pawitikra', logo: pawitikra },
    { name: 'Badan Narkotika Nasional', logo: bnn },
    { name: 'Otoritas Jasa Keuangan', logo: ojk },
    { name: 'Dinas Pariwisata Daerah Istimewa Yogyakarta', logo: dispar },
    { name: 'Bea Cukai Yogyakarta', logo: beacukai },
    { name: 'RSM Dr. YAP Yogyakarta', logo: rsmyap },
    { name: 'Kaltim Methanol Industri', logo: kaltim },
    { name: 'Paguyuban Dimas Diajeng Jogja', logo: dimasdiajeng },
    { name: 'Depot Loro AMM Yogyakarta', logo: depotloro },
    { name: 'Nasi Uduk Palagan', logo: nasiuduk },
    { name: 'Universitas Kristen Satya Wacana', logo: uksw },
  ];

  
  const LogoItem = ({ name, logo }: { name: string; logo: string }) => (
    <div className="clients-logo-item flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-md mx-2 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 p-4">
      <img 
        src={logo} 
        alt={name}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );

  
  const ScrollingRow = ({ direction, logos }: { direction: 'left' | 'right'; logos: Array<{ name: string; logo: string }> }) => {
    if (logos.length === 0) return null;
    
    return (
      <div className="relative mb-6 scrolling-row">
        <div className={`flex scrolling-row-inner ${direction === 'right' ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
         
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex">
              {logos.map((client, idx) => (
                <LogoItem key={`${index}-${idx}`} name={client.name} logo={client.logo} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="clients" className="py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Klien Kami</h2>
          <div className="w-24 h-1 bg-[#F9B800] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dipercaya oleh perusahaan-perusahaan terkemuka di Indonesia
          </p>
        </div>
      </div>

      
      <div className="relative z-10">
        <ScrollingRow direction="right" logos={clientLogosRow1} />

      
        <ScrollingRow direction="left" logos={clientLogosRow2} />

      
        <ScrollingRow direction="right" logos={clientLogosRow3} />
      </div>

      {clientLogosRow1.length === 0 && clientLogosRow2.length === 0 && clientLogosRow3.length === 0 && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <p className="text-gray-400 italic">
              Logo klien akan segera ditampilkan
            </p>
          </div>
        </div>
      )}
      
      {(clientLogosRow1.length > 0 || clientLogosRow2.length > 0 || clientLogosRow3.length > 0) && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mt-8">
            <p className="text-gray-600 italic">
              Dan masih banyak perusahaan lainnya yang telah mempercayai kami
            </p>
          </div>
        </div>
      )}
    </section>
  );
};