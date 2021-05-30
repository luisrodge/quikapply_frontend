import { Switch, Route } from "react-router-dom";

import ApplicationList from "../features/applications/ApplicationList";
import ApplicationOverview from "../features/applications/ApplicationOverview";
import SectionDesigner from "../features/applications/SectionDesigner";
import Apply from "../features/apply/Apply";
import ApplySuccess from "../features/apply/ApplySuccess";
import SimpleHome from "../components/SimpleHome";
import ShortUrlRedirect from "../features/apply/ShortUrlRedirect";
import PublishSuccess from "../features/apply/PublishSuccess";

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <SimpleHome />
    </Route>
    <Route path="/s/:shortUrl" exact>
      <ShortUrlRedirect />
    </Route>
    <Route path="/applications" exact>
      <ApplicationList />
    </Route>
    <Route path="/applications/:slug" exact>
      <ApplicationOverview />
    </Route>
    <Route path="/applications/:applicationSlug/sections/:sectionId" exact>
      <SectionDesigner />
    </Route>
    <Route path="/:slug/apply" exact>
      <Apply />
    </Route>
    <Route path="/apply/success" exact>
      <ApplySuccess />
    </Route>
    <Route path="/:applicationSlug/published" exact>
      <PublishSuccess />
    </Route>
  </Switch>
);

export default Routes;
