<template>
    <div class="inline-flex ml-3 rounded-md shadow">
        <button :class="colourClasses"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out  border border-transparent rounded-md focus:outline-none"
                @click.prevent="clicked">
            {{ text }}
        </button>
    </div>
</template>

<script lang="ts"
        setup>
    import { computed, toRefs, withDefaults } from 'vue'

    interface ButtonProps {
        text?: String,
        primary?: Boolean,
    }

    const props = withDefaults(defineProps<ButtonProps>(), {
        text: 'Click me',
        primary: true,
    })

    const emit = defineEmits<{
        (e: 'click', message: string): void,
    }>()

    const { text, primary } = toRefs(props)

    const colours = {
        primaryText: 'text-white',
        primaryBackground: 'bg-indigo-600',
        primaryHoverText: 'hover:bg-indigo-500',
        secondaryText: 'text-indigo-600',
        secondaryBackground: 'bg-white',
        secondaryHoverText: 'hover:text-indigo-500'
    }

    const colourClasses = computed(() => {
        if (!primary.value) {
            return `${ colours.secondaryText } ${ colours.secondaryBackground } ${ colours.secondaryHoverText }`
        }
        return `${ colours.primaryText } ${ colours.primaryBackground } ${ colours.primaryHoverText }`
    })
    
    const clicked = () => {
        emit('click', `Clicked the ${ text.value } button`)
    }
</script>