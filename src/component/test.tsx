import { useEffect, useState } from 'react';
import ItemSideBar from './playgroundComponent/itemSidebar';
import Composer from './playgroundComponent/composer';
import { createContext } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockSpec, PropSchema } from '@blocknote/core';

/*function TextElementComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const element = new TextElement('1', { x: 200, y: 200 }, 'Hello, world!');

  useEffect(() => {
    if (ref.current) {

    
    }
  }, []);

  return (<div className={element.className} id="1" ref={ref}></div>
        );
}*/

export type BlockType = {
    id : string,
    block : any,
}

export type BlockContextType = {
    handleBlockChange : (newState: any, id: string) => void,
    blockState : BlockType
    addedBlockSchema : BlockSchemaType
}

export type BlockSchemaType = {
    [key : string] : BlockSpec<string,PropSchema,boolean>
}

export const BlockContext = createContext<any>({});

function Test() {
    const [blockState, setBlockState] = useState<BlockType>();
    const [addedBlockSchema, setAddedBlockSchema] = useState<BlockSchemaType>({});

    const handleBlockChange = (newState : any, id : string) => {
      setBlockState( {id : id , block :newState});
    };

    const [blocks, setBlocks] = useState<any[]>()

    useEffect(() => {
        const storedBlocks = sessionStorage.getItem('blocks');
        if(storedBlocks !==  null)
        {
            const parsedBlocks = JSON.parse(storedBlocks)
            setBlocks(parsedBlocks)
        }
    }, []);


    const handleChange = (block : any[]) => {
        setBlocks(block);
        sessionStorage.setItem('blocks', JSON.stringify(block));
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>, key :string, id : string) => {
        const newValue = event.target.value;
        handleBlockChange({ ...blockState?.block, [key]: newValue }, id);
      };

    const context : BlockContextType = {
        handleBlockChange : handleBlockChange,
        blockState : blockState!,
        addedBlockSchema : addedBlockSchema
    }


    return (
            <BlockContext.Provider value={context}>
                <section className='w-screen h-screen bg-slate-50 '>
                    <ItemSideBar ></ItemSideBar>              
                    {typeof blocks  !== 'undefined' && <Composer className='fixed top-O left-[370px] ' noImage page={'Post'} state='edit' value={blocks} onChange={handleChange}></Composer>}
                    <div className='fixed top-0 right-0 w-[300px] h-full border-l bg-white z-50'>
                        <div className='flex flex-col gap-4 p-4'>
                            <h1 className='text-2xl font-bold'>Blocks</h1>
                            <div className='flex flex-col gap-4'>
                                {typeof blockState != 'undefined' && Object.entries(blockState.block).map(([key, value]) => (
                                        <div key={key}>
                                            <Label htmlFor={key}>{key}</Label>
                                            <Input id={key} type={typeof value}  onChange={(event) => handleInputChange(event, key, blockState.id)} value={value as string} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </BlockContext.Provider>  );
}

export default Test;