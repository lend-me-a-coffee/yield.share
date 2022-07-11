<script lang="ts">
    import footer from "../../assets/footer-logo.svg";
    import { Container } from "sveltestrap";

    const creators:[string,string][] = [
        ["weichuliao", "https://twitter.com/weichuliao"],
        ["paigexx","mailto:pcjones12@gmail.com"],
        ["iamcryptoboi","https://twitter.com/iamcryptoboi"],
        ["Bullrich","https://twitter.com/JavierBullrich"],
        ["mondo","https://twitter.com/mondo989"]
    ]
</script>

<section class="footer">
    <Container style="min-width: 90%;">
        <div class="footer-container">
            <img src={footer} alt="footer logo" />
            <p>2022 Made at️ #ETHNewYork</p>
            <p>by: {#each creators as creator}
                <a href={creator[1]} target="_blank">@{creator[0]}</a>
            {/each}</p>
        </div>
    </Container>
</section>

<style>
    .footer {
        background-color: rgb(71, 145, 209);
    }

    .footer-container {
        padding: 30px 0;
        color: white;
    }

    a:link {
        color:white;
    }

    a:visited {
        color: rgb(213, 213, 213);
    }
</style>
