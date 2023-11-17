export default function DrawLine({color, width, height, className}:{color?:string, width?:string, height?:string, className?:string}){
    return (<div className={className} style={{backgroundColor:color,height:height,width:width}} />)
  }