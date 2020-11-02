import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Page from "./components/Page";
import Home from "./components/Home";

function App() {

  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/:id" component={Page} exact />
        </Container>
      </main>
    </Router>
  );
}

export default App;
