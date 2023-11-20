import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
  import {ReactElement, useEffect, useState} from "react"
  import { useNavigate } from "react-router-dom";
  

  interface AlertReturnProps extends ReactElement<any, any> {}
  export function AlertReturn({...props}) : AlertReturnProps {

    const [open, setOpen] = useState(false);
    const finishStatus = false;
    const router = useNavigate()
    const onBackButtonEvent = (e:any) => {
        e.preventDefault();
        if (!finishStatus) {
            setOpen(true)
        }else{
            router('/')
        }
    }
    useEffect(() => {
        window.history.pushState(null, 'null', window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
      }, []);


    return (
      <AlertDialog {...props} open={open} >
        <AlertDialogContent >
          <AlertDialogHeader >
            <AlertDialogTitle >Leave site</AlertDialogTitle>
            <AlertDialogDescription >
               Changes you made may not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter  >
            <AlertDialogCancel onClick={()=> setOpen(false)} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=> router(-1)} >Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  