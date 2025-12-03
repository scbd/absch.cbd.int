<template>
     <div>
        this is a typescript vue component hello.
        good morning
        <h1>{{ greeting }}</h1>
        <button @click="incrementCount">Count: {{ count }}</button>
    </div>    
</template>
    
<script setup lang="ts">
console.log('hello')    
import { ref, reactive, defineProps, withDefaults } from 'vue';

// Define a type for a user object
interface User {
  id: number;
  name: string;
}

// Define props for the component with type-based declaration
interface Props {
  initialGreeting?: string;
  user: User;
}

// Set default values for props using withDefaults
const props = withDefaults(defineProps<Props>(), {
  initialGreeting: 'Hello from Vue 3 + TypeScript!',
});

// Reactive state with ref for primitive types
const count = ref(0);

// Reactive state with reactive for objects
const user = reactive<User>({name:'blaise', id:1});

// Computed property (example)
const greeting = ref('initialGreeting');

// Method to increment the count
const incrementCount = () => {
  count.value++;
};


</script>
