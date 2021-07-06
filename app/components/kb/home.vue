<template>
    <div class="knowledge-base">
<!--        <auto-complete-search></auto-complete-search>-->
<!--        <section class="categories">-->
<!--            <div class="container">-->
<!--                <div class="row">-->
<!--                    <categories-group :is-bch="isBch" :locale="locale"></categories-group>-->
<!--                    <right-menu :is-bch="isBch" :locale="locale"></right-menu>-->
<!--                </div>-->
<!--            </div>-->
<!--        </section>-->
        <div>
            <h1>Hello rout!</h1>
            <p>
                <router-link to="/">about</router-link>
                <router-link to="/Profile">Go to profile</router-link>
            </p>
            <router-view></router-view>
        </div>


    </div>

</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

    import CategoriesGroup from '../../components/kb/categories-group.vue';
    import RightMenu from '../../components/kb/right-menu.vue';
    import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';
    import Profile from './profile.vue';
    import router from './router/index';

    export default {
        name:'kbHome',
        components:{
            CategoriesGroup,
            RightMenu,
            Profile,
            about,
            AutoCompleteSearch
        },
        router,
        props:{
            tokenReader: { type: Function, required: false },
            isBch: String,
            locale: String
        },
        data:  () => {
            return {

            }
        },
        watch: {
            tokenReader: function(tokenReader) {
                // if(tokenReader) addApiOptions({ tokenReader })
            }
        }
    }
</script>
