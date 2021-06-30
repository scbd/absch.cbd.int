<template>
    <div>
        <title>Knowledge Base</title>
        <link href="css/kb-style.css" rel="stylesheet">
        <div  class="map-bg overlay">

            <div class="masthead text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h1>Knowledge Base</h1>

                            <form>
                                <input type="text" class="search-field" placeholder="Search Something ... ">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                            <a href="#" class="btn btn-kb"> Github Project<span class="icon-right"></span></a>
                            <a href="#" class="btn btn-kb-dark"> Github Project<span class="icon-right"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="kb-breadcrumbs">
            <div class="container">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Knowledge Base</a></li>
                    <li class="active">Explore Topics</li>
                </ol>
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