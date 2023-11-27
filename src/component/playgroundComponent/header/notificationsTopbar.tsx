import { BellIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NotificationsTopbar(){
  const notices = [
    {
      avatar:'https://github.com/shadcn.png',
      text:'The React Framework - created and maintained by Mark',
      date:'December 2021'
    },
    {
      avatar:'https://github.com/shadcn.png',
      text:'The React Framework - created and maintained by Mark',
      date:'December 2021'
    },
    {
      avatar:'https://github.com/shadcn.png',
      text:'The React Framework - created and maintained by Mark',
      date:'December 2021'
    }
  ]
  return (
    <Popover>
      <PopoverTrigger>
        <BellIcon color='#7D7D7D' width='21' height='21'/>
      </PopoverTrigger>
      <PopoverContent className='w-[400px]'>
        <h2 className='font-semibold tracking-[-0.4px] text-[#09090B]'>Notifications</h2>
        <p className='text-sm text-[#71717A] mb-6'>Choose what you want to be notified about</p>

        <ul className='flex flex-col gap-y-[14px]'>
          {notices.map(notice => (
            <li className='flex gap-x-4'>
              <Avatar>
                <AvatarImage src={notice.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className='text-sm text-[#09090B]'>{notice.text}</h3>
                <p className='text-xs text-[#71717A] mt-2'>{notice.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}