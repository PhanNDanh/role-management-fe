import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "demo",
  clientId: "LFOpLOF5yP2yYxhh7ElVhyJNiVXW86LQ"
});

export default keycloak;