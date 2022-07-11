<script lang="ts">
    import { Col, Container, Row } from "sveltestrap";
    import hero from "../../assets/hero-img.png";
    import comment from "../../assets/works/a-comment.svg";
    import wallet from "../../assets/works/a-wallet.svg";
    import yields from "../../assets/works/a-yield.svg";
    import CreatorCard from "../components/CreatorCard.svelte";
    import { fetchCreators } from "../utils/fetch";

    const creators = fetchCreators();
</script>

<section class="background" id="landing">
    <Container style="min-width: 90%; max-height: 680px">
        <Row class="d-flex flex-wrap align-items-center justify-content-center">
            <Col>
                <div class="row-container">
                    <h1 class="title">
                        Stake your assets, support the creator with the yield.
                    </h1>
                </div>
            </Col>
            <Col>
                <div class="row-container">
                    <div class="logo">
                        <img class="logo" src={hero} alt="hero" width="480px" />
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</section>
<section class="works">
    <Container>
        <h1 class="work-title">How it Works?</h1>
        <Row>
            <Col>
                <img src={wallet} alt="wallet" width="120px" />
                <p class="work-detail">
                    Connect Wallet and <u><b>find creator to support</b></u>
                </p>
            </Col>
            <Col>
                <img src={yields} alt="yield" width="120px" />
                <p class="work-detail">
                    Stake assets in smart contract.
                    <br />
                    <u><b>Asset's yields are sent to creator</b></u>
                    <br />
                    <u><b>Withdrawl anytime!</b></u>
                </p>
            </Col>
            <Col>
                <img src={comment} alt="comment" width="120px" />
                <p class="work-detail">
                    Leave a <u><b>motivational comment</b></u> for your creator
                </p>
            </Col>
        </Row>
    </Container>
</section>
<section class="creators">
    <Container>
        <h1>Featured Creators</h1>
        {#await creators}
            <h5>Loading</h5>
        {:then crts}
            <Row>
                {#each crts as creator}
                    <Col md={4}>
                        <CreatorCard {creator} />
                    </Col>
                {/each}
            </Row>
        {/await}
    </Container>
</section>

<style>
    .background {
        min-height: 70vh;
        max-height: 680px;
        padding-top: 60px;
        background: rgba(0, 0, 0, 0)
            linear-gradient(
                rgb(71, 145, 209) 16.51%,
                rgb(71, 145, 209) 54.62%,
                rgb(34, 86, 131) 77.38%
            )
            repeat scroll 0% 0%;
        overflow: hidden;
        color: white;
    }

    .title {
        padding: 1.5rem;
        margin-left: 15%;
        font-size: 2.8rem;
        font-weight: 700;
        text-align: left;
        width: 512px;
        line-height: 1.5;
    }

    .row-container {
        justify-content: center;
    }

    img.logo {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    .works {
        background-color: rgb(243, 243, 243);
        padding: 3rem 0;
    }

    .work-title {
        color: rgb(71, 145, 209);
    }

    .work-detail {
        font-size: 20px;
        margin-top: 20px;
    }

    .creators {
        padding: 3rem 0;
    }
</style>
