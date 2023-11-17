import  { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ListMinus, PlusCircle, Settings, Search, LayoutGrid, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";

import {Icons} from "@/components/ui/icons";
import ServiceModals from "./modal";


// import TeamModal from "../components/switchTeamModal";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }:{ isSidebarOpen : boolean, setIsSidebarOpen : any }){
  const [active, setActive] = useState('');
  const location = useLocation()





  const navigation = [
    { name: 'Dashboard', icon: <LayoutGrid viewBox='0 0 24 24' width='16' height='16' strokeWidth='1.5' color='#18181B' />, href: '/dashboard/app', current: active === '/dashboard/app' ? true : false, id: 'dashboard' },
    { name: 'Notifications', icon: <BellIcon viewBox='0 0 15 15' strokeWidth='1.5' color='#18181B' />, href: '/dashboard/notification', current: active === '/integration' || active === '/integration/connected' ? true : false, id: 'integration' },
    { name: 'Search', icon: <Search viewBox='0 0 24 24' width='16' height='16' strokeWidth='1.5' color='#18181B' />, href: '/gifts-privileges', current: active === "/gifts-privileges" || active === "/gifts-privileges/premium" || active === "/gifts-privileges/free" ? true : false, active: active, id: 'gift' },
    { name: 'Settings', icon: <Settings viewBox='0 0 24 24' width='16' height='16' strokeWidth='1.5' color='#18181B' />, href: '/dashboard/settings/account', current: active == "/dashboard/settings/account" || active == "/dashboard/settings/billing-plans" || active == "/dashboard/settings/notifications" ? true : false, active: active, id: 'settings' },
  ]


  const workspaceApp = [
    { name: 'Blog & Website', icon: <LayoutGrid viewBox="0 0 24 24" width='16' height='16' strokeWidth='1.5' color='#18181B' />, id: 'blog-website' ,href: ''},
    { name: 'CRM', icon: <LayoutGrid viewBox="0 0 24 24" width='16' height='16' strokeWidth='1.5' color='#18181B' />, id: 'crm' ,href: ''},
    { name: 'HR & HRM', icon: <LayoutGrid viewBox="0 0 24 24" width='16' height='16' strokeWidth='1.5' color='#18181B' />, id: 'hr-hrm',href: '' },
  ]

  useEffect(() => {
    setActive(location.pathname);
  })


  const IconSidebar = () => {
    return (
      <nav className="nav-left-side">
        <div className="nav-btns" id="home-btn" onClick={() => setIsSidebarOpen(true)}>
          <Home color='#18181B' viewBox='0 0 24 24' width='16' height='16'/>
        </div>

        <div className="nav-btns add-ons">
          <Link to='/'>
            <Icons.ZaviagoAppIcon />
          </Link>
        </div>

        <ServiceModals />

        <div className="nav-btns add">
          <PlusCircle color='#18181B' viewBox='0 0 24 24' width='16' height='16'/>
        </div>
      </nav>
    )
  }

  return (
    <>
      <IconSidebar />
      <div className={`flex flex-1 flex-col border-r border-gray-200 bg-white ${isSidebarOpen ? 'active' : 'inactive'}`} id="sidebar">
        <div className="flex flex-1 flex-col pt-3">
          <div className="flex flex-shrink-0 items-center px-3">
            <div className="flex gap-x-2 items-center w-full">
              <Button className='listminus-btn' variant='secondary' onClick={() => setIsSidebarOpen(false)}>
                <ListMinus viewBox='0 0 24 24' width='16' height='16'/>
              </Button>
            </div>
          </div>

          <nav className="flex bg-white px-3 pt-2 flex-col gap-y-4" aria-label="Sidebar">
            <section className="flex flex-col">
              {navigation.map((item) => (
                <Link to={item.href}>
                  <Button variant='ghost'  className={`w-full flex justify-start gap-x-2 text-[13px] items-center leading-5 ${item.href === active ? 'bg-zinc-100' : ''}`}>
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </section>

            {/* <section className="flex flex-col">
              <Button variant='ghost' className="text-[#797979] text-sm font-semibold tracking-[-0.35px] justify-between" onClick={() => setSellingMenus(!sellingMenus)}>
                Selling
                <ChevronDown viewBox="0 0 24 24" width='16' height='16' strokeWidth='1.5' className={`${sellingMenus ? 'rotate-180' : ''} transition duration-200`}/>
              </Button>
              {sellingMenus ? (
                <div className="mb-6">
                  {settingsMenus.map((item, index) => (
                    <>
                      <Button variant='ghost' key={index} onClick={() => {handleSubMenuClick(index);console.log(activeSubmenus)}} className={`w-full flex justify-start gap-x-2 text-[13px] items-center leading-5 ${item.href === active ? 'bg-zinc-100' : ''}`}>
                        {item.icon}
                        {item.name}
                      </Button>
                      {activeSubmenus[index] && (
                        <div>
                          {item.submenus.map((submenu, subIndex) => (
                            <Button variant='ghost' key={subIndex} className={`flex justify-start gap-x-2 text-[13px] items-center leading-5 ml-[15px] w-[calc(100%_-_15px)] ${item.href === active ? 'bg-zinc-100' : ''}`}>
                              {submenu.icon}
                              {submenu.title}
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              ) : null}
              <Button variant='ghost' className="text-[#797979] text-sm font-semibold tracking-[-0.35px] justify-between">
                CRM
              </Button>
              <Button variant='ghost' className="text-[#797979] text-sm font-semibold tracking-[-0.35px] justify-between">
                HR & HRM
              </Button>
              <Button variant='ghost' className="text-[#797979] text-sm font-semibold tracking-[-0.35px] justify-between">
                Accounting
              </Button>
            </section> */}


            <section className="flex flex-col">
              <h3 className="text-[#797979] text-sm font-semibold p-4">WorkSpace App</h3>
              <Button variant='ghost'  className={`w-full flex justify-start gap-x-2 text-[13px] items-center leading-5`}>
                <Layout viewBox="0 0 24 24" width='16' height='16' strokeWidth='1.5' color='#18181B' />
                Commerce
              </Button>
              {workspaceApp.map((item) => (
                <Link to={item.href}>
                  <Button variant='ghost' className={`w-full flex justify-start gap-x-2 text-[13px] items-center leading-5 ${item.href === active ? 'bg-zinc-100' : ''}`}>
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </section>
          </nav>
        </div>
      </div>
    </>
  )
}