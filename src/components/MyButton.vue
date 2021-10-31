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
        secondary?: Boolean,
        warning?: Boolean,
        success?: Boolean,
        info?: Boolean,
    }

    const props = withDefaults(defineProps<ButtonProps>(), {
        text: 'Click me',
        primary: true,
        secondary: false,
        warning: false,
        success: false,
        info: false,
    })

    const emit = defineEmits<{
        (e: 'click', message: string): void,
    }>()

    const { text, primary, secondary, warning, success, info } = toRefs(props)

    const colourClasses = computed(() => {
        if (secondary.value === true) {
            return 'bg-white text-indigo-600 border-white-300 hover:text-indigo-200'
        }
        if (warning.value === true) {
            return 'bg-red-500 text-gray-100 border-red-300 hover:bg-red-200'
        }
        if (success.value === true) {
            return 'bg-green-500 text-gray-100 border-green-300 hover:bg-green-200'
        }
        if (info.value === true) {
            return 'bg-yellow-500 text-gray-100 border-yellow-300 hover:bg-yellow-200'
        }
        return 'text-white bg-indigo-600 border-indigo-300 hover:bg-indigo-200'
    })

    const clicked = () => {
        emit('click', `Clicked the ${ text.value } button`)
    }
</script>