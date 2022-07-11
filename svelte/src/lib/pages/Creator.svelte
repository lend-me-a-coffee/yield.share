<script lang="ts">
    import { Button, Card, CardBody, Container } from "sveltestrap";
    import { fetchCreator } from "../utils/fetch";
    export let address: string;

    const creatorData = fetchCreator(address);
</script>

<section class="creator-data">
    <Container>
        {#await creatorData}
            Loading
        {:then creator}
        <div class="card-container">
            <Card style="max-width: 720px; padding-top: 20px; margin: auto;">
                <CardBody>
                    <img src={creator.photo} alt={creator.name} />
                    <h2><b>{creator.name}</b></h2>
                    <h5>{creator.tagline}</h5>
                    <p>{creator.description}</p>
                    <Button color="primary" on:click={()=> console.log(creator)}>Support {creator.name}</Button>
                </CardBody>
            </Card>
        </div>
        {/await}
    </Container>
</section>

<style>
    .creator-data {
        background-color: rgb(71, 145, 209);
    }

    .card-container {
        padding: 20px 0;
    }

    img {
        border-radius: 50%;
        width: 170px;
        height: 170px;
    }
</style>
