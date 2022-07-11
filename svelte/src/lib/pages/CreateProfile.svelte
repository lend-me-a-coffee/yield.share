<script lang="ts">
    import {
        Card,
        CardBody,
        Container,
        Form,
        FormGroup,
        Input,
        Label,
    } from "sveltestrap";
    import type { Creator } from "../utils/fetch";
    import {authWallet} from "../stores/crypto";

    let formData: Creator = {
        name: "",
        tagline: "",
        links: [],
        address: $authWallet,
        description: "",
        photo: "",
        chain: "",
    };
</script>

<Container style="align-items: center">
    <h2>Setup Creator Profile</h2>
    <div class="card">
        <CardBody>
            <Form>
                <FormGroup>
                    <Label for="name">Set Creator Username</Label>
                    <Input
                        type="text"
                        bind:value={formData.name}
                        placeholder="Vitalik Buterin"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="tagline">Set Creator Tagline</Label>
                    <Input
                        type="text"
                        bind:value={formData.tagline}
                        placeholder="Is saving kittens"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Set Creator Description</Label>
                    <Input
                        type="textarea"
                        bind:value={formData.description}
                        placeholder="I also do other things, I just like saving kittens and it is really important to me. Join me in my quest to save the kittens."
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="chain">Select on Which Chain Users can Stake</Label>
                    <Input type="select" name="select" id="chain" bind:value={formData.chain}>
                        <option value="robsten">Robsten</option>
                        <option>Optimism</option>
                        <option></option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                </FormGroup>
            </Form>

            {JSON.stringify(formData)}
        </CardBody>
    </div>
</Container>

<style>
    .card {
        background-color: rgb(243, 243, 243);
        max-width: 48rem;
        margin: 30px auto;
    }
</style>
