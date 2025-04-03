<script lang="ts">
    interface Props {
        value?: string
        onchange?: () => void
    }

    let { value = $bindable(), onchange }: Props = $props()
</script>

<input type="number" bind:value {onchange} />
