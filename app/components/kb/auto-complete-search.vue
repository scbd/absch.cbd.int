<template>
    <div>
        <title>{{ $t("knowledgeBase") }}</title>
        <link href="css/kb-style.css" rel="stylesheet">
        <div  class="map-bg overlay">
            <div class="masthead text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h1>{{ $t("knowledgeBase") }}</h1>
                            <form>
                                <input type="text" class="search-field" placeholder="Search Something ... ">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:  () => {
            return {
            }
        }
    }
</script>
