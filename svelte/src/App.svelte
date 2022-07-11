<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Footer from "./lib/components/Footer.svelte";
  import NavBar from "./lib/components/NavBar.svelte";
import CreateProfile from "./lib/pages/CreateProfile.svelte";
import Creator from "./lib/pages/Creator.svelte";
import Encryptor from "./lib/pages/Encryptor.svelte";
  import Landing from "./lib/pages/Landing.svelte";

  export let url = "";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  <Router {url}>
    <NavBar />
    <Route path="/"><Landing /></Route>
    <Route path="/createProfile" component={CreateProfile}/>
    <Route path="/encrypt" component={Encryptor}/>
    <Route path="detailView/:id" let:params>
      <Creator address="{params.id}" />
    </Route>
    <Footer />
  </Router>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
