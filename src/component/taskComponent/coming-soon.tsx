import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from '@/components/ui/alert-dialog';
import {ReactElement, useState, useEffect} from 'react';

export type CustomType ={
        title : string,
        description : string,
        cancel? : string,
        button : string
}
interface AlertComingSoon extends ReactElement<any, any>{
    custom? : CustomType,
    open? : boolean

}
export function AlertComingSoon ({...props}) : AlertComingSoon {
    const [open, setOpen] = useState(false)
    useEffect(() => {if(props.open)setOpen(true)},[props.open])
    return(
            <AlertDialog {...props} open={open} >
            <AlertDialogContent >
            <AlertDialogHeader >
                <AlertDialogTitle >{props.custom?.title}</AlertDialogTitle>
                <AlertDialogDescription >
                {props.custom?.description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter  >
                {props.custom?.cancel && <AlertDialogCancel onClick={()=> setOpen(false)} >{props.custom?.cancel}</AlertDialogCancel>}
                <AlertDialogAction onClick={()=> setOpen(false)} >{props.custom?.button}</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
    )
}

