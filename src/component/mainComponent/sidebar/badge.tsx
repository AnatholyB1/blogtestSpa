import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

export const ServiceBadge = ({text} : { text: string}) => {
  return (
    <Badge className='rounded-full text-[#006AFF] bg-[#E5F5FF] hover:bg-[#E5F5FF] shadow-none font-normal gap-x-2'>
      <Crown viewBox='0 0 24 24' width='16' height='16' color='#006AFF'/>{text}
    </Badge>
  )
}