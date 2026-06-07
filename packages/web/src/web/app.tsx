import { Route, Switch } from "wouter";
import Index from "./pages/index";
import SuccessPage from "./pages/success";
import SonnoEBenessere from "./pages/blog/sonno-e-benessere";
import CuraDellaFedera from "./pages/blog/cura-della-federa";
import Admin from "./pages/admin";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/blog/sonno-e-benessere" component={SonnoEBenessere} />
        <Route path="/blog/cura-della-federa" component={CuraDellaFedera} />
        <Route path="/admin" component={Admin} />
      </Switch>
      {import.meta.env.DEV && <AgentFeedback />}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
