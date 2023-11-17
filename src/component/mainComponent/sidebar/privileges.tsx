export default function ServicePrivileges({icon, title, desc}: {
    icon: JSX.Element;
    title: string;
    desc: string;
}){
    return (
      <li className="flex gap-x-4">
        {icon}
        <div>
          <h2 className="subheading">{title}</h2>
          <p className="main-desc">{desc}</p>
        </div>
      </li>
    )
  }