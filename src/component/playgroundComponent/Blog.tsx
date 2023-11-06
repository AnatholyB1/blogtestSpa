
import Composer from './composer';
import { useContext } from 'react';
import { PostContext } from '@/provider/postProvider';


const Blog = () => {

    const postContext = useContext(PostContext)
    const data = postContext.data


    if(data)
    {
        return (
            <Composer value={JSON.parse(data.content_json).blocks} viewOnly={true} />
        )
    }
 
}

export default Blog