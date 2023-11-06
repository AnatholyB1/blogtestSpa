

import Composer from './composer';
import { useContext } from 'react';
import { PageContext } from '@/provider/pageProvider';


const Page = () => {
    
    const pageContext = useContext(PageContext)
    const data = pageContext.data

    if(data)
    {
        return (
            <Composer value={JSON.parse(data.content_json).blocks} viewOnly={true} />
        )
    }
 
}

export default Page