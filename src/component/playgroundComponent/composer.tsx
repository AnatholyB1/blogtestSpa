
import {   BlockNoteView,
    useBlockNote,
    createReactBlockSpec,

    DragHandleMenuItem,
    DragHandleMenu,
    RemoveBlockButton,
    DefaultSideMenu,
    SideMenuPositioner,
    FormattingToolbarPositioner,
    HyperlinkToolbarPositioner,
    SlashMenuPositioner,

    } from '@blocknote/react';
    import {
      uploadToTmpFilesDotOrg_DEV_ONLY,
        Block,
        BlockNoteEditor,
        BlockSchema,
    
        defaultBlockSchema,
        defaultProps,
        
      } from "@blocknote/core";
import React, {  useContext, useState } from 'react'
import "@blocknote/core/style.css";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimationContext } from '@/provider/animationProvider';
import { TypeContext } from '@/provider/typeProvider';
import { cn } from '@/lib/utils';
import FileSelection from './file-selector';


export default function Composer  ({state, value , onChange , viewOnly = false, className } : {state : string,value : any, onChange? : any, viewOnly? : boolean, className ?: string})  {
    const view = useContext(TypeContext)

    const customSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the custom image block.
    horizontal_rule : HorizontalRule,
    input : InputBlock,
    popover : PopOver,
    } satisfies BlockSchema;

    const handleChange = (editor : any) => {
      onChange && onChange(editor.topLevelBlocks) ; 
      view.changeBlock(editor.topLevelBlocks) ; 
      sessionStorage.setItem('block',JSON.stringify(editor.topLevelBlocks))
    }
    const GetStorageItem = () => {
      const temp = sessionStorage.getItem('block')
      if(temp)
      {
        return JSON.parse(temp)
      }
      return false
    }


    const editor = useBlockNote({
        initialContent: GetStorageItem() ? GetStorageItem()  :  value,
        editable: !viewOnly,
        uploadFile : uploadToTmpFilesDotOrg_DEV_ONLY,
        blockSchema: customSchema,
        onEditorContentChange: (editor) => handleChange(editor)
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
            case 'input' :
                    if(filteredBlocks[0].id)
                    {
                        editor.updateBlock(filteredBlocks[0].id,{type : 'input'})
                    }
                break;
            case 'popover' :
                    if(filteredBlocks[0].id)
                    {
                        editor.updateBlock(filteredBlocks[0].id,{type : 'popover'});
                    }
                    break;


        }
        
    }
    return ( 
      <div>
        <FileSelection mode={state}></FileSelection>
        <BlockNoteView onDragOver={enableDropping} onDrop={handleDrop} className={cn("h-full w-full ",className)} editor={editor} >
           <FormattingToolbarPositioner editor={editor} />
            <HyperlinkToolbarPositioner editor={editor} />
            <SlashMenuPositioner editor={editor} />
            <SideMenuPositioner
                editor={editor}
                sideMenu={(props) => (
                <DefaultSideMenu {...props} dragHandleMenu={CustomDragHandleMenu} />
                )}
            />
        </BlockNoteView>
      </div>
    )
}


const CustomDragHandleMenu : any = (props: {
    editor: BlockNoteEditor;
    block: Block;
  }) => {
    const animation = useContext(AnimationContext)
    return (
      <DragHandleMenu>
        {/*Default item to remove the block.*/}
        <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
        {/*Custom item which opens an alert when clicked.*/}
        <DragHandleMenuItem onClick={() => animation.toggle('SideBarRight')}>
          Colors
        </DragHandleMenuItem>
      </DragHandleMenu>
    );
  };


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
    },
    containsInlineContent: false,
    render: ({ block }) => (
      <div id="horizontal_rule" style={{
        width: `${block.props.width}px`,
        height: `${block.props.height}px`,
        background: block.props.backgroundColor,
        borderRadius: '0.375rem',
      }}>
      </div>
    ),
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