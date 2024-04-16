<template>
    <div class="alert d-flex align-items-center" role="alert" :class="alertClass">

        <div v-if="error.code == 'notFound'">
            <h4 class="alert-heading">{{ t('notFound') }}</h4>
            <p>
                {{ t('notFoundText') }}
            </p>
            <p>
                {{ t('notFoundApology') }}
            </p>

            <hr>

            <a @click.prevent="back()" href="" class="alert-link">
                {{ t('backLink') }}
            </a>
        </div>

        <div v-else-if="error.code == 'unauthorized'">
            <h4 class="alert-heading">{{ t('unauthorized') }}</h4>
            <p>
                {{ t('unauthorizedText') }} <a class="alert-link" href="#" @click.prevent="login()">{{ t('signIn') }}</a>
                {{ t('usingCredential') }} 
            </p>
            <p>
                {{ t('unauthorizedBenefits') }}</p>
            <p>
                {{ t('unauthorizedApology') }}
            </p>

            <hr>

            <a @click.prevent="login()" href="" class="alert-link">
                {{ t('signInLink') }}
            </a>
        </div>

        <div v-else-if="error.code == 'forbidden'">
            <h4 class="alert-heading">{{ t('forbidden') }}</h4>
            <p>
                {{ t('forbiddenText') }} 
            </p>
            <p>
                {{ t('forbiddenContact') }} 
                <a class="alert-link" href="mailto:secretariat@cbd.int">{{ t('contact') }}</a>.
            </p>

            <p>
                {{ t('youCan') }} <a @click.prevent="refresh()" href="#" class="alert-link">{{ t('try') }} </a> {{ t('watch') }}
            </p>

            <p>
                {{ t('forbiddenApology') }}
            </p>

        </div>


        <div v-else>
            <h4 class="alert-heading">{{ t('unexpected') }}</h4>

            <p>
                {{ t('unexpectedText') }} </p>

            <p>
                {{ t('youCan') }} <a @click.prevent="refresh()" href="#" class="alert-link">{{ t('try') }} </a> {{ t('watch') }}
            </p>

            <p>
                {{ t('unexpectedContact') }} <a class="alert-link" href="mailto:secretariat@cbd.int">{{ t('contact') }}</a>
                {{ t('concern') }}
            </p>

            <hr>

            <div>
                {{ t('moreInfoLink') }} <a class="alert-link" href="#" @click.prevent="moreInfo()">{{ t('moreInformation') }} </a>, {{ t('youCan') }} <a class="alert-link" href="#" @click.prevent="moreInfo()">{{ t('clickHere') }}</a>.
            </div>

            <div v-if="showMoreInfo">
                <hr>
                <div v-if="error.code">
                    {{ t('errorLabel') }} <b>{{ error.code }}</b>
                </div>
                <div>
                    {{ t('messageLabel') }} {{ error.message }}
                </div>
            </div>



        </div>
    </div>
</template>
    
<script setup>
    import {useAuth} from '@scbd/angular-vue/src/index.js';
    import { ref ,computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/error.json';
    const auth = useAuth();
    const { t } = useI18n({ messages });
    const { error } = defineProps({
        error: {
        type: Object,
        required: true,
    },
    });

const showMoreInfo = ref(false);

    const alertClass = computed(() => {
        if (error.code === 'notFound') return 'alert-secondary';
        if (error.code === 'unauthorized') return 'alert-primary';
        if (error.code === 'forbidden') return 'alert-warning';

        return 'alert-danger';
        });

    const login = () => {
        auth.login();
    };

    const refresh = () => {
        location.reload();
    };

    const back = () => {
        history.back();
    };

    const moreInfo = () => {
        showMoreInfo.value = !showMoreInfo.value;
    };
</script>