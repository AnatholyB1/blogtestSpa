
import {   BlockNoteView,
    useBlockNote,
    createReactBlockSpec,

    } from '@blocknote/react';
    import {
      uploadToTmpFilesDotOrg_DEV_ONLY,
        BlockSchema,
    
        defaultBlockSchema,
        defaultProps,
        PartialBlock,
        
      } from "@blocknote/core";
import React, {  useContext, useEffect, useState } from 'react'
import "@blocknote/core/style.css";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TypeContext } from '@/provider/typeProvider';
import { cn } from '@/lib/utils';
import FileSelection from './file-selector';
import { TabContextType } from 'typing';
import { BlockContext, BlockContextType } from '../test';


export default function Composer  ({state, page, value , onChange , viewOnly = false, className, noImage = false } : {noImage? : boolean, page : TabContextType, state : string,value : any[] | undefined, onChange? : any, viewOnly? : boolean, className ?: string})  {
    const view = useContext(TypeContext)

    const customSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the custom image block.
    horizontal_rule : HorizontalRule,
    } satisfies BlockSchema;


    const handleChange = (editor : any) => {
      console.log('here')
      onChange && onChange(editor.topLevelBlocks) ; 
      view.changeBlock(editor.topLevelBlocks) ; 
      sessionStorage.setItem('block',JSON.stringify(editor.topLevelBlocks))
    }
    
    const handleSetting = (editor :any) => {
      sessionStorage.setItem('block',JSON.stringify(editor.topLevelBlocks))
    }


    const editor = useBlockNote({
        initialContent :  value,
        editable: !viewOnly,
        uploadFile : uploadToTmpFilesDotOrg_DEV_ONLY,
        blockSchema: customSchema,
        onEditorContentChange: (editor) => handleChange(editor),
        onEditorReady:(editor) => handleSetting(editor), 
    
    });
    const enableDropping = (event : React.DragEvent) =>
    {
        event.preventDefault()
    }

    const handleDrop = (event:React.DragEvent) => {
        const id = event.dataTransfer.getData('text')
        const blocks : any = editor.topLevelBlocks;
        let filteredBlocks : any[] = [] 
        if (blocks)
                {
                filteredBlocks = blocks.filter((item : any) => {
                    if (item.content){
                        if (item.content[0] && item.content[0].text === id) {
                            return true;
                        }
                    }
                    return false;
                    });
                }
        switch (id)
        {
            case 'heading':
                    if(filteredBlocks[0].id)
                    {
                        editor.updateBlock(filteredBlocks[0].id,{type : 'heading'})
                    }
                
                break;
            case 'horizontal_rule':
                    if(filteredBlocks[0].id)
                    {
                        editor.updateBlock(filteredBlocks[0].id,{type : 'horizontal_rule'})
                    }
                break;


        }
        
    }
    return ( 
      <div className='w-full h-full flex flex-col rounded-xl bg-white '>
        {!noImage && <FileSelection  page = {page} className={`w-full `} mode={state} ></FileSelection>}
        <BlockNoteView id="blockview" onDragOver={enableDropping} onDrop={handleDrop} className={cn("h-full w-full  rounded-none bg-white",className)} editor={editor} >
        </BlockNoteView>
      </div>
    )
}

  const PopOver = createReactBlockSpec({
    type: "popover",
    propSchema: {
      ...defaultProps,
    },
    containsInlineContent: true,
    render: () => {
        const [isOpen, setIsOpen] = useState(true);
        const togglePopover = () => {
            setIsOpen(!isOpen);
          };
        return (
            <>
            {   
                 isOpen ?             
                (<div id="popover" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width : '20em',
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    borderRadius:'5px',
                    padding: '10px',
                  }}>
                    <button style={{ 
                        marginLeft: 'auto', // Place le bouton en haut à droite 
                        cursor: 'pointer',
                        fontSize: '20px',
                        lineHeight: '1',}} 
                        onClick={togglePopover} 
                    >&times;</button>
                     <div style={{padding: '10px',
                                display : 'flex',                        
                                flexDirection : 'column',
                                justifyContent : 'center',
                                alignItems : 'flex-start',}}>
                        <h1 style={{fontSize : '3em', fontWeight : '700',padding: '3px 0',flexGrow: '1',transition: 'font-size .2s'}}>Header</h1>
                        <p>this is an exemple of a pop over inline content</p>
                     </div>
                  </div>) : (<Button onClick={togglePopover} > Show </Button>)
            }
            </>
        )},
  });


  const HorizontalRule = createReactBlockSpec({
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
  });

  const InputBlock = createReactBlockSpec({
    type: "input",
    propSchema: {
      ...defaultProps,
      height : {
        default : 144
      },
      width :{
        default : 4
      },
      backgroundColor :{
        default : 'black'
      },
      type : {
        default : 'women'
      }
    },
    containsInlineContent: false,
    render: ({ block }) => (
      <Input id="input" style={{width : `${block.props.height}px`}}/>
    ),
  });