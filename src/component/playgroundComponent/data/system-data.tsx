interface input extends React.HTMLProps<HTMLInputElement> {dropdown : boolean, data? : string, name : name}
type name = 'blogger' 
export const SystemPageInput : input[] = [
    {
    name : 'blogger',
    type : 'text',
    placeholder : 'Choose your blogger...',
    required : true,
    label : 'Blogger',
    id : 'blogger',
    autoComplete : 'off',
    dropdown : true,
    data : 'Blogger'
},]