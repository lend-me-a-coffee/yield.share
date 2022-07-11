<script lang="ts">
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Button,
    } from "sveltestrap";
    import logo from "../../assets/logo-navbar.svg";
    import { authWallet } from "../stores/crypto";

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
</script>

<Navbar color="light" light expand="md">
    <NavbarBrand href="/">
        <img src={logo} alt="logo" />
    </NavbarBrand>

    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ms-auto" navbar>
            {#if $authWallet}
                <NavItem>
                    <Button color="light" on:click={() => authWallet.signOff()}>
                        Disconnect {$authWallet}
                    </Button>
                </NavItem>
            {:else}
                <NavItem>
                    <Button color="light" on:click={() => authWallet.signIn()}>
                        Connect Wallet
                    </Button>
                </NavItem>
            {/if}
        </Nav>
    </Collapse>
</Navbar>
