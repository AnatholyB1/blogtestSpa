
import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton () {
    return (
    <div>
        <Skeleton className="navbar bg-gray-200">Navbar</Skeleton>
        <Skeleton className="container flex">
            <Skeleton className="sidebar w-1/4 bg-gray-300">Sidebar</Skeleton>
            <Skeleton className="main-content w-3/4 bg-gray-100">Main Content</Skeleton>
        </Skeleton>
    </div>
    )
}