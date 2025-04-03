<script lang="ts">
    import Infusion from './Infusion.svelte'
    import Forged from './Forged.svelte'

    let Current = $state(Infusion)
</script>

<div>
    <div>
        <button onclick={() => (Current = Infusion)}>Инфузия</button>
        <button onclick={() => (Current = Forged)}>Кованный</button>
    </div>

    <div>
        <Current />
    </div>
</div>
