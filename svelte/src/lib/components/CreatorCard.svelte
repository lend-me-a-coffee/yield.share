<script lang="ts">
    import { Card, CardBody, Button } from "sveltestrap";
    import type { Creator } from "../utils/fetch";
    import { navigate } from "svelte-routing";

    export let creator: Creator;
</script>

<Card style="margin-bottom: 30px;">
    <CardBody>
        <img src={creator.photo} alt={creator.name} />
        <h2><u>{creator.name}</u></h2>
        <p>{creator.tagline}</p>
        <Button color="primary" on:click={() => navigate(`/detailView/${creator.address}`)}>View creator</Button>
    </CardBody>
</Card>

<style>
    img {
        border-radius: 50%;
        width: 170px;
        height: 170px;
    }
</style>
