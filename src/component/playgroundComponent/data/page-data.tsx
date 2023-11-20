interface input extends React.HTMLProps<HTMLInputElement> {dropdown : boolean, data? : string, name : name}
type name = 'published_on' | 'blogger'
export const PageInput : input[] = [
    {
        name : 'published_on',
        type : 'date',
        placeholder : 'pick a date...',
        required : true,
        label : 'Published Date',
        id : 'date',
        autoComplete : 'off',
        dropdown : false,
    }
    ,{
    name : 'blogger',
    type : 'text',
    placeholder : 'Choose your blogger...',
    required : true,
    label : 'Blogger',
    id : 'blogger',
    autoComplete : 'off',
    dropdown : true,
    data : 'Blogger'
}]