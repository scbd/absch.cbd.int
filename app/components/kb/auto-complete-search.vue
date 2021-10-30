<template>
    <div>
        <title><span class="uppercase">{{ $t("knowledgeBase") }}</span></title>
        <link href="css/kb-style.css" rel="stylesheet">
        <div  class="map-bg overlay">
            <div class="masthead text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h1>{{$realm.chShortName+ " "}}<span class="uppercase">{{ $t("knowledgeBase") }}</span></h1>
                            <form>
                                 <div class="searchbar">
                                    <input class="search_input" type="text" name="" placeholder="Search the knowledge base...">
                                    <a href="#" class="search_icon"><i class="fa fa-search"></i></a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../locales/en/components/kb.json';
    export default {
        name:'kbAutoCompleteSearch',
        data:  () => {
            return {
            }
        },
        i18n: { messages:{ en: i18n }}
    }
</script>
