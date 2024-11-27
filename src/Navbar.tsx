import TopAppBar from 'preact-material-components/TopAppBar';
import "./Navbar.less";

export function Navbar() {
    
    return(

        <TopAppBar className="topappbar" onNav={() => {console.log("Navigation icon clicked");}}>
            <TopAppBar.Row>
              <TopAppBar.Section>
                <TopAppBar.Icon className="topappbar-icon"><img src=""></img></TopAppBar.Icon>
                <TopAppBar.Section>
                    <a>Help</a>
                </TopAppBar.Section>
              </TopAppBar.Section>
            </TopAppBar.Row>
          </TopAppBar>
    );
}