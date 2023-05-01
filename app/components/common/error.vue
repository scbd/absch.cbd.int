<template>
    <div class="alert d-flex align-items-center" role="alert" :class="alertClass">

        <div v-if="error.code == 'notFound'">
            <h4 class="alert-heading">Not found!</h4>
            <p>
                It seems like the resource you are trying to access could not be found. Please double-check the URL.
            </p>
            <p>
                We apologize for any inconvenience this may have caused, Thank you for your understanding and cooperation.
            </p>

            <hr>

            <a @click.prevent="back()" href="" class="alert-link">
                Click here to go back to the previous page.
            </a>
        </div>

        <div v-else-if="error.code == 'unauthorized'">
            <h4 class="alert-heading">Authorization required!</h4>
            <p>
                It seems like the resource you are trying to access is restricted and requires authentication.
                To access this resource, you'll need to <a class="alert-link" href="#" @click.prevent="login()">sign in</a>
                using your credentials.
            </p>
            <p>
                Don't worry, signing in is a quick and easy process, and it will ensure that you have the proper permissions
                to view the content you're looking for.
                Once you've signed in, you should be able to access the resource and all its benefits.
            </p>
            <p>
                Thank you for your understanding and cooperation in this matter.
            </p>

            <hr>

            <a @click.prevent="login()" href="" class="alert-link">
                Please sign me in!
            </a>
        </div>

        <div v-else-if="error.code == 'forbidden'">
            <h4 class="alert-heading">Forbidden</h4>
            <p>
                It appears that the resource you are attempting to access is forbidden, and unfortunately, you do not have
                permission to view it at this time.
            </p>
            <p>
                If you believe this is a mistake or you feel that you should have access to this resource, please
                <a class="alert-link" href="mailto:secretariat@cbd.int">contact the Secretariat</a>.
            </p>

            <p>
                You can <a @click.prevent="refresh()" href="#" class="alert-link">try refreshing the page</a> to see
                if it resolves the error.
            </p>

            <p>
                We apologize for any inconvenience this may have caused, we want to ensure that only authorized users have
                access to sensitive information.
                Thank you for your understanding and cooperation.
            </p>

        </div>


        <div v-else>
            <h4 class="alert-heading">Unexpected error!</h4>

            <p>
                We are sorry to inform you that an unexpected error has occurred on this page.
                We understand that this is very unfortunate and may have caused inconvenience to you.
            </p>

            <p>
                You can <a @click.prevent="refresh()" href="#" class="alert-link">try refreshing the page</a> to see
                if it resolves the error.
            </p>

            <p>
                Please don't hesitate to <a class="alert-link" href="mailto:secretariat@cbd.int">contact the Secretariat</a>
                if you have any further questions or concerns.
            </p>

            <hr>

            <div>
                If you would like <a class="alert-link" href="#" @click.prevent="moreInfo()">more information about this
                    message</a>, you can <a class="alert-link" href="#" @click.prevent="moreInfo()">click here</a>.
            </div>

            <div v-if="showMoreInfo">
                <hr>
                <div v-if="error.code">
                    Error: <b>{{ error.code }}</b>
                </div>
                <div>
                    Message: {{ error.message }}
                </div>
            </div>



        </div>
    </div>
</template>
    
<script>

export default {
    name: 'Error',
    props: {
        error: {
            type: Object,
            require: true

        },
    },
    data() {
        return { showMoreInfo: false }
    },
    computed: {
        alertClass() {

            if (this.error.code == 'notFound') return 'alert-secondary';
            if (this.error.code == 'unauthorized') return 'alert-primary';
            if (this.error.code == 'forbidden') return 'alert-warning';

            return 'alert-danger'
        }
    },
    methods: {
        login()    { this.$auth.login(); },
        refresh()  { location.reload(); },
        back()     { history.back(); },
        moreInfo() { this.showMoreInfo = !this.showMoreInfo }
    }
};

</script>