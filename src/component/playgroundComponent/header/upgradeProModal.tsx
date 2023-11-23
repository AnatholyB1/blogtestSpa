import React, {useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import upgradeProBg from '@/img/upgrade-pro-bg.png'
import { ServiceBadge } from '@/component/mainComponent/sidebar/badge'
import ServicePrivileges from '@/component/mainComponent/sidebar/privileges'
import { Link } from 'react-router-dom'
import { BellIcon, LightningBoltIcon, EyeNoneIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import DrawLine from '@/component/mainComponent/sidebar/drawline'

export default function UpgradeProModal(){
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [perYear, setPerYear] = useState<boolean>(false);

  const handleCloseModal = () : void => {
    if (openModal){
      setOpenModal(false);
      setTimeout(() => {
        setPerYear(false)
      }, 100)
    } else {
      setOpenModal(true);
    }
  }

  const handlePerYear = () => {
    setPerYear(!perYear)
  }

  const privileges = [
    {
      icon:<BellIcon className="mt-1" color='#09090B' width='20' height='20'/>,
      title:'Super Admin',
      desc:'Can access billing and members'
    },
    {
      icon:<EyeNoneIcon className="mt-1" color='#09090B' width='20' height='20'/>,
      title:'Remove',
      desc:'Turn off all notifications'
    },
    {
      icon:<BellIcon className="mt-1" color='#09090B' width='20' height='20'/>,
      title:'Super Admin',
      desc:'Can access billing and members'
    },
    {
      icon:<EyeNoneIcon className="mt-1" color='#09090B' width='20' height='20'/>,
      title:'Remove',
      desc:'Turn off all notifications'
    },
  ]

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <DialogTrigger>
        <Button variant='ghost' className='text-[#006AFF] hover:text-[#006AFF] hover:bg-transparent gap-x-2 text-xs flex items-center font-normal'>
          <LightningBoltIcon color='#006AFF'/>
          Upgrade to Pro
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 border-0 max-w-4xl'>
        <DialogHeader className='flex-row'>
          <DialogTitle>
            <img src={upgradeProBg} className='rounded-l-lg h-full w-[800px]'/>

            <div className="absolute left-5 bottom-5 flex gap-x-2 items-center">
              <Button variant='link' className='text-white text-xs p-0 h-fit'>Support</Button>
              <DrawLine color='#FFF' width='1px' height='14px'/>
              <Button variant='link' className='text-white text-xs p-0 h-fit'>Contact us</Button>
            </div>
          </DialogTitle>
          <DialogDescription className='px-10 pt-6 pb-10 shadow-lg'>
            <div className="flex flex-col justify-between h-full">
              <section>
                <div className='flex items-center justify-between mb-2'>
                  <h1 className="main-heading tracking-[-0.6px]">Professional</h1>
                  <ServiceBadge text='Recommended'/>
                </div>
                <p>Say hello to the world and let readers know what your blog is all about.</p>

                <div className='mt-6 flex flex-col gap-y-[18px]'>
                  <div className='flex gap-x-3 items-center'>
                    <Switch onCheckedChange={handlePerYear} />
                    <Badge variant='outline'>Yearly save - ฿ 990</Badge>
                  </div>
                  <div className='flex gap-x-2'>
                    <h1 className="text-[40px] text-[#09090B] font-bold tracking-[-1px]">{perYear ? '฿ 7,500' : '฿ 750'}</h1>
                    <p className='text-[#71717A] text-base'>{perYear ? 'Bath / year / User' : 'Bath / month / User'}</p>
                  </div>
                </div>

                <ul className="mt-6 gap-y-[17px] flex flex-col px-2">
                  {privileges.map(p => (
                    <ServicePrivileges icon={p.icon} title={p.title} desc={p.desc}/>
                  ))}
                </ul>
              </section>
              <section>
                <a href="https://zaviago-dashboard.vercel.app/payment">
                  <Button className='btn-with-icon w-full mb-[7px]'>
                    <LightningBoltIcon />
                    Upgrade to Pro
                  </Button>
                </a>
                <p className="main-desc">See more details at <a href="https://zaviago-dashboard.vercel.app/dashboard/compare-plan" className="text-[#006AFF]">Compare Plan</a></p>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}