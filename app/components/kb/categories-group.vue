<template>

    <!-- ARTICLE CATEGORIES SECTION -->
    <div class="row">
        <div class="col-md-12">
            <div class="fb-heading">
                {{ $t("categories.title") }}
            </div>
            <hr class="style-three">
            <div class="row">
                <div class="col-md-6 margin-bottom-20">
                    <div class="fat-heading-abb">
                        <a href="single-category.html">
                            <i class="fa fa-folder"></i> General
                            <span class="cat-count">(10)</span>
                        </a>
                    </div>
                    <div class="fat-content-small padding-left-30">
                        <ul>
                            <li>
                                <a href="single-article.html">
                                    <i class="fa fa-file-text-o"></i> How to change account password?</a>
                            </li>
                            <li>
                                <a href="single-article.html">
                                    <i class="fa fa-file-text-o"></i> How to edit order details?</a>
                            </li>
                            <li>
                                <a href="single-article.html">
                                    <i class="fa fa-file-text-o"></i> Add new user</a>
                            </li>
                            <li>
                                <a href="single-article.html">
                                    <i class="fa fa-file-text-o"></i> Change customer details</a>
                            </li>
                            <li>
                                <a href="single-article.html">
                                    <i class="fa fa-file-text-o"></i> Lookup existing customer in order form</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END ARTICLES CATEOGIRES SECTION -->

</template>

<script>
import i18n from '../../locales/en/components/kb/categories-group';

export default {
    data:  () => {
        return {            
        }
    },
    i18n: { messages:{ en: i18n }}
}
</script> 