import { Icons } from "@/components/ui/icons";
import { createReactBlockSpec } from "@blocknote/react";
import {BlockSpec, PropSchema, defaultProps }from "@blocknote/core";
import { useContext, useEffect, useState } from "react";
import { BlockContextType } from "@/component/test";
import {BlockContext} from "@/component/test";


type Icon = {
    id: string,
    title: string,
    className?: string,
    icon : JSX.Element,
}
type BlockRenderType = {
    type: string,
    createBlockSpec : BlockSpec<string,PropSchema,boolean>,
}

const dataIcon : Icon[] = [
    {   
        id : 'horizontal_rule',
        title : 'HorinzonTal Rule',
        className : 'cursor-grab flex w-[142px] h-[133px] py-[20px]  flex-col justify-center items-center gap-[16px] rounded-sm bg-[#E5F5FF] text-[#00B2FF] text-center leading-trim text-cap font-Inter text-[14px] font-medium leading-[16px]',
        icon : <Icons.AppStoreApp01/>
    }]

const dataBlock : BlockRenderType[] = [
    {
        type : 'horizontal_rule',
        createBlockSpec : createReactBlockSpec({
            type: "horizontal_rule",
            propSchema: {
              ...defaultProps,
              height : {
                default : 4
              },
              width :{
                default : 144
              },
              backgroundColor :{
                default : 'black'
              },
              borderRadius : {
                default : 0.375
              }
            },
            containsInlineContent: false,
            render: ({ block }) => {
              const {handleBlockChange, blockState} = useContext<BlockContextType>(BlockContext);
              const [props, setProps] = useState(block.props);
              const handleClick = () => {
                // Appeler la fonction de rappel avec le nouvel état
                handleBlockChange(props , block.id);
              };
              useEffect(() => {
                if(typeof blockState !=`undefined` && blockState.id == block.id)
                {
                  const div = document.getElementById('blockview');
                  console.log(div?.dispatchEvent(new Event("change")))
                  div && div.dispatchEvent(new Event("change"));
                  setProps( blockState.block )
                }
              },[blockState])
          
              return (
                <div id={block.id} onClick={handleClick} className='hover:cursor-pointer'  style={{
                  width: `${props.width}px`,
                  height:  `${props.height}px`,
                  background:   props.backgroundColor,
                  borderRadius:  `${props.borderRadius}rem`,
                  textAlign: props.textAlignment,
                }}>
                </div>
              );
            },
          }),
    },
]



abstract class DraggableElement {
    data: Icon | undefined;
    constructor(public id: string) { 
        this.data = dataIcon.find(icon => icon.id === id);
        this.addblock(id)
    }
    isDragging = false;
    initialMousePos = { x: 0, y: 0 };

    private handleDrag = (event : React.DragEvent<HTMLButtonElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id)
    };
  
    render() {
        if (!this.data) {
            return <></>;
        }

        return (
            <button id={this.id} onDragStart={this.handleDrag} draggable="true" className={this.data.className}>
                {this.data.icon} 
                <span>{this.data.title}</span>
            </button>
        );
    }
    
    addblock = (object : string) => {
        const block = dataBlock.find(block => block.type === object);
        const renderBlock = block?.createBlockSpec;
        console.log(renderBlock)

        }



    JSXElement = () => { return this.render() }


  }
  


export  class HorizontaleRule extends DraggableElement {
    element: HTMLElement | null = null;

    constructor(public id: string) {
        super(id);
        
    }

    

    
  
  }



  
