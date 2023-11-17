
import lineCRMbg from '@/img/line-crm-bg.png'
import untitleBg from '@/img/untitle-bg.png'
import inbioBg from '@/img/inbio-bg.png'
import posBg from '@/img/pos-bg.png'
import erpBg from '@/img/erp-bg.png'
import blogAndPagesBg from '@/img/blog-and-pages-bg.png'
import rewardfulBg from '@/img/rewardful-bg.png'
import reducoedBg from '@/img/reducoed-bg.png'


export type MenuData = {
  id: number;
  image: string;
  title: JSX.Element;
  desc: string;
  require_pro_text: string;
  link: string;
};

export const menuData = [
    {
      id: 0,
      image: erpBg,
      title: (<h2>For enterprises, time to upgrade to <span className="text-[#0A5FD9]">Zaviago ERP</span></h2>),
      desc: 'Access exclusive tools to help you build client sites and scale your business',
      require_pro_text: 'Upgrade pro plan to use this feature',
      link: ''
    },
    {
      id: 1,
      image: posBg,
      title: (<h2><span className="text-[#013395]">POS in.store</span> : store management</h2>),
      desc: 'Access exclusive tools to help you build client sites and scale your business',
      require_pro_text: 'Upgrade pro plan to use this feature',
      link: ''
    },
    {id: 2,
      image:rewardfulBg, 
    title:<h2>Set your Loyalty Program by <span className="text-[#FF7009]">Rewardful</span></h2>,
     desc:'Access exclusive tools to help you build client sites and scale your business', 
     require_pro_text:'Upgrade pro plan to use this feature', 
     link:''
    },
    {
      id: 3,
      image:untitleBg,
     title:<>Building your website creation with <span className="text-[#FBB604]">Untitle</span></>, 
     desc:'Access exclusive tools to help you build client sites and scale your business', 
     require_pro_text:'Upgrade pro plan to use this feature', 
     link:''},
    
    {id: 4,
      image:reducoedBg, 
    title:<><span className="text-[#EB4F9F]">REDUCOED</span> : The most advanced campaign</>,
     desc:'Access exclusive tools to help you build client sites and scale your business', 
     require_pro_text:'Upgrade pro plan to use this feature', 
     link:''},
    
    {id: 5,
      image:inbioBg,
         title:<>Everything you are. In one, simple <span className="text-[#FF4A00]">Inbio</span></>,
     desc:'Access exclusive tools to help you build client sites and scale your business', 
     require_pro_text:'Coming soon', 
     link:''},
    
    {id: 6,
    image:blogAndPagesBg,
    title:<><span className="text-[#7000FF]">Blog and Pages</span> in your style</>, 
    desc:'Access exclusive tools to help you build client sites and scale your business', 
    require_pro_text:'Coming soon', 
    link:''},
    
    {id: 7,
    image:lineCRMbg, 
    title:<>Unlock <span className='text-[#3BCD76]'>Line CRM</span> to let people engage</>, 
    desc:'Access exclusive tools to help you build client sites and scale your business', 
    require_pro_text:'Upgrade pro plan to use this feature', 
    link:''},
    
    {id: 8,
    image:blogAndPagesBg, 
    title:<><span className="text-[#7000FF]">Blog and Pages</span> in your style</>, 
    desc:'Access exclusive tools to help you build client sites and scale your business', 
    require_pro_text:'Coming soon', 
    link:''},
    
    {id: 9,
    image:blogAndPagesBg, 
    title:<><span className="text-[#7000FF]">Blog and Pages</span> in your style</>, 
    desc:'Access exclusive tools to help you build client sites and scale your business', 
    require_pro_text:'Coming soon', 
    link:''},
  ];