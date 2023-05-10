import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
function DashboradWrapper(props) {
    return (
      <div className="app">
            <Sidebar />
            <main className="content">
                <Topbar />
                {props.children}
            </main>
     </div>
    );
  }
  export default DashboradWrapper;
  