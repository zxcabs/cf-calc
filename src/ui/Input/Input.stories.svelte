<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf'
    import Input from './Input.svelte'
    import { fn } from '@storybook/test'

    const { Story } = defineMeta({
        title: 'ui/Input',
        component: Input,
        tags: ['autodocs'],
        argTypes: {},
        args: {
            value: '12312',
            onchange: fn(),
        },
    })
</script>

<Story name="Default" />
