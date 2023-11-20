
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TabContext } from "@/provider/tabProvider"
import { useContext , useState} from "react"



import { AnimationContext } from "@/provider/animationProvider"
import {Link} from "react-router-dom";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight, PlusCircle, Shuffle, UserPlus, Users, ChevronsUpDown, PanelLeftClose, LayoutGrid, LayoutDashboard, Newspaper, UserCircle, Layout, Search, Settings } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { BellIcon } from "@radix-ui/react-icons"
import { Home } from "lucide-react"
import { ListIcons } from "./sidebar/sidebardata/side-data"
import {menuData, MenuData} from "./sidebar/sidebardata/data";



import { LightningBoltIcon } from "@radix-ui/react-icons";
import ServicePrivileges from "./sidebar/privileges";
import { ServiceBadge } from "./sidebar/badge";
import DrawLine from "./sidebar/drawline";
import {  useEffect } from "react";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { TabContextType } from "typing"





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
  }
]

const iconstyle = 'w-4 h-4 stroke-2'
interface iconProps extends React.ReactElement<SVGAElement> { className?: string }
type BLogType = {title : TabContextType, icon : iconProps}
const Blogs : BLogType[] = [{title : 'Overview', icon : <LayoutDashboard className={iconstyle}/>},{title : 'Post', icon : <Newspaper className={iconstyle}/>},{title : 'Categories', icon : <LayoutGrid className={iconstyle} />},{title : 'Blogger', icon : <UserCircle className={iconstyle}/>}]
const Pages : BLogType[] = [{title : 'Page', icon : <Layout className={iconstyle} />},{title : 'SystemPage', icon : <LayoutGrid className={iconstyle}/>}]


export function SidebarMain({ className}: {className? : string}) {
  const tab = useContext(TabContext)
  const animation = useContext(AnimationContext)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  var data = {} as MenuData
  useEffect(() => {
    if(selected > 0)
    {
        data = menuData[selected]
    }

  }, [selected])


  return (
    <> 
    <div id='full sidebar' className={cn(className, 'h-screen w-auto flex flex-column')}>
      <div id='first sidebar' className="fixed top-0 left-0 gap-[3px] py-[7px] px-[12px] flex flex-col items-center w-[60px]   h-screen border-r border-gray-300 z-10 bg-white" >
          <div className=" py-[8px]"><Button variant={'secondary'} className="px-[9px] border" onClick={()=>{animation.toggle('SideBar')}}><Home className="stroke-2 w-4 h-4"></Home></Button></div>
          <div className="flex flex-col gap-4 flex-shrink-0 py-[8px] ">
          <Dialog>
            {ListIcons.map((i, index) => (
          <DialogTrigger  tabIndex={index} onClick={() => setSelected(index)}>{i}</DialogTrigger>

              ))}
            <DialogContent className='p-0 border-0 max-w-4xl'>
                <DialogHeader className='flex-row'>
                  <DialogTitle className='relative'>
                    <img src={data.image} className='rounded-l-lg h-full w-[800px]'/>
                    <div className="absolute left-5 bottom-5 flex gap-x-2 items-center">
                      <Button variant='link' className='text-white text-xs p-0 h-fit'>Privacy Policy</Button>
                      <DrawLine color='#FFF' width='1px' height='14px'/>
                      <Button variant='link' className='text-white text-xs p-0 h-fit'>Contact us</Button>
                    </div>
                  </DialogTitle>
                  <DialogDescription className='px-10 pt-6 pb-10 shadow-lg'>
                    <div className="flex flex-col justify-between h-full">
                      <section>
                        <ServiceBadge text={data.require_pro_text}/>
                        <h1 className="main-heading tracking-[-0.6px] mt-3 mb-2">{data.title}</h1>
                        <p>{data.desc}</p>
                        <ul className="mt-6 gap-y-[17px] flex flex-col px-2">
                          {privileges.map((p,index) => {
                            return (<ServicePrivileges key={index} icon={p.icon} title={p.title} desc={p.desc}/>)
                          })}
                        </ul>
                      </section>
                      <section>
                        <Link to='/payment'>
                          <Button className='btn-with-icon w-full mt-10 mb-[7px]'>
                            <LightningBoltIcon />Upgrade to Pro
                          </Button>
                        </Link>
                        <p className="main-desc">See all features in <Link className="text-[#006AFF]" to={`/integration/appstore/${data.link}`}>App store Detail</Link></p>
                      </section>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="py-[8px]"><Link className="w-[36px] h-[36px] border rounded-md flex items-center justify-center " to=''><PlusCircle className="w-4 h-4 stroke-1"></PlusCircle></Link></div>
      </div>

      <div id='second sidebar' className={`nav-bar ${animation.sidebar ? 'open' : 'close'} h-screen border-r  border-gray-300 bg-white pt-[6px] px-[12px]`}>
        <div id="container" className="flex flex-col gap-4">
        <div id="primary">
            <div id='popover' className="flex  py-[8px] bg-white flex-row gap-2" aria-label="Sidebar">
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                role="combobox"
                aria-expanded={open}
                className=" justify-between h-10 flex-grow"
              >
                <span className="flex gap-x-2 items-center justify-center leading-[1px] font-inter">
                  <Icons.ZaviagoSearch  className="w-5 h-5"/>
                  Zaviago
                </span>
                <ChevronsUpDown className="ml-2 shrink-0 opacity-50" viewBox="0 0 24 24" width='12' height='12' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-[105] relative left-[24px]">
              <Command>
                <CommandInput placeholder="Search app..." />
                <CommandList className='max-h-none'>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem>
                      <Users viewBox="0 0 24 24" width='16' height='16' className="mr-2"/>
                      Team
                    </CommandItem>
                    <CommandItem>
                      <Shuffle viewBox="0 0 24 24" width='16' height='16' className="mr-2"/>
                      Change Team
                      <CommandShortcut>
                        <ChevronRight viewBox="0 0 24 24" width='16' height='16' color='#09090B'/>
                      </CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <UserPlus viewBox="0 0 24 24" width='16' height='16' className="mr-2"/>
                      Invite Teammates
                      <CommandShortcut>⌘+T</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Current App">
                    <CommandItem>
                      <div className="w-5 h-5 rounded-full bg-[#5BB3FF] mr-2" />
                      Blog / Pages
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="App">
                    <CommandItem>
                      <div className="w-5 h-5 rounded-full bg-[#5BB3FF] mr-2" />
                      Loyalty System
                    </CommandItem>
                    <CommandItem>
                      <div className="w-5 h-5 rounded-full bg-[#79FF97] mr-2" />
                      Data Studio
                    </CommandItem>
                    <CommandItem>
                      <div className="w-5 h-5 rounded-full bg-[#F4C344] mr-2" />
                      B2B CRM
                    </CommandItem>
                    <CommandItem>
                      <div className="w-5 h-5 rounded-full bg-[#FF9797] mr-2" />
                      Commerce
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem>
                      <PlusCircle viewBox="0 0 24 24" width='16' height='16' className="mr-2"/>
                      See more apps
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
            </Popover>
            <Button onClick={() => animation.toggle('SideBar')} variant={'secondary'} className="h-[40px] w-[40px] px-[10px] pt-[8px] flex  justify-center items-center  "><PanelLeftClose className="w-[16px] h-[16px]  stroke-1"/></Button>
            </div>
                
            <div id='main' className="flex flex-col items-center  h-[144px]">
              <Button variant="ghost" className="flex h-[36px] gap-[8px] justify-start items-center self-stretch">
                <LayoutGrid className={iconstyle}/>
                <h2 className="text-forground font-inter text-[13px] leading-[20px]">Dashboard</h2>
              </Button>
              <Button variant="ghost" className="flex h-[36px] gap-[8px] justify-start items-center  self-stretch">
                <BellIcon className={iconstyle}/>
                <h2 className="text-forground font-inter text-[13px] leading-[20px]">Notifications</h2>
              </Button>
              <Button variant="ghost" className="flex h-[36px] gap-[8px] justify-start items-center  self-stretch">
                <Search className={iconstyle}/>
                <h2 className="text-forground font-inter text-[13px] leading-[20px]">Search</h2>
              </Button>
              <Button variant="ghost" className="flex h-[36px] gap-[8px] justify-start items-center self-stretch">
                <Settings className={iconstyle}/>
                <h2 className="text-forground font-inter text-[13px] leading-[20px]">Settings</h2>
              </Button>
            </div>
        </div>


        <div id='secondary' className="flex flex-col gap-4">
              <div id='Blogs block' className="flex flex-col py-2 gap-[8px]">
                <div  className="flex justify-start items-center">          
                    <h2 className="sidebar-title px-4">
                      Blogs
                    </h2>
                </div>
                <div className="flex flex-col items-start self-stretch w-full h-[138px]">
                  {Blogs.map((item, index)=> {
                    return (
                      <Link title='home' key={index} to="/" className="w-full">
                        <Button variant="ghost" onClick={() => {tab.ChangeVariable(item.title)}} className="flex h-9 py-2 gap-2 w-full justify-start items-center  self-stretch">
                          {item.icon}
                          <h2 className="sidebar-item">{item.title}</h2>   
                        </Button>
                      </Link>
                    )
                  }
                  )
                  }
                </div>
              </div>

              <div id='PageBlock' className="flex flex-col items-start py-2 gap-2 self-stretch">

                <div className="flex  justify-center items-center">        
                  <h2 className="sidebar-title px-4">
                    Pages
                  </h2>
                </div>

                <div className="flex flex-col items-start self-stretch">
                {Pages.map((item, index)=> {
                    return (
                      <Link title='home' className="w-full" key={index} to="/">
                        <Button variant="ghost" onClick={() => {tab.ChangeVariable(item.title)}} className="flex h-9 gap-2 w-full justify-start items-center self-stretch">
                          {item.icon}
                          <h2 className="sidebar-item">{item.title}</h2>   
                        </Button>
                      </Link>
                    )
                  }
                  )
                  }
                </div>

              </div>


        </div>
      </div>
    </div>
    </div>
     </>
   
  )
}