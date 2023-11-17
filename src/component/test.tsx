import Sidebar from "./mainComponent/sidebar/sibebar";

function Test() {
    return ( <section className="h-screen w-screen" >
        <Sidebar setIsSidebarOpen={true} isSidebarOpen={true} />
    </section> );
}

export default Test;