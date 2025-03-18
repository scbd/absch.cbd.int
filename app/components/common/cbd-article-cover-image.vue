<template>
   <div class="image-credit-wrapper"  v-if="coverImage.url">    
      <div :class="'img cover-image cover-image-position-' + (coverImage.position||'center') + ' cover-image-size-' + (coverImage.size||'cover')" 
          v-if="coverImageUrl" :style="'background-image: url(' + cssEscapeUrl(coverImageUrl) + ');'">
      </div>    
      <span class="image-credit" v-if="coverImage.credits">{{coverImage.credits}}</span>
      <slot></slot>
      <slot name="after"></slot>
  </div>
</template>

<script setup>
  import {computed} from 'vue'
  import { cssEscape } from "../../services/css.escape";

  const props = defineProps({
    coverImage: { type: Object, required: true },
    coverImageSize: { type: String, default: "1280x720" },
  });

  const coverImageUrl = computed(() => {
    return getSizedImage(props.coverImage?.url, props.coverImageSize);
  });

  const cssEscapeUrl = function (url) {
    return cssEscape(url);
  };

  const getSizedImage = function (url, size) {
    return (
      url &&
      url
        .replace(/attachments.cbd.int\//, "$&" + size + "/")
        .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, "$&" + size + "/")
    );
  };
</script>

<style scoped>
.image-credit-wrapper img {
  width: 100% !important;
}

.image-credit-wrapper {
  overflow: hidden;
  position: relative;
  /* margin-left: -15px;
  margin-right: -15px; */
  max-height: 375px;
  width: 100%;
}

.image-credit-wrapper .image-credit {
  position: absolute;
  right: 0px;
  bottom: 4px;
}

.image-credit {
  background: rgba(0, 0, 0, 0.7);
  color: #ccc;
  display: inline-block;
  font-size: 11px;
  font-family: helvetica;
  font-weight: 300;
  padding: 5px 8px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.cover-image {
  width: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.cover-image-position-left {
  background-position: left;
}
.cover-image-position-right {
  background-position: right;
}
.cover-image-position-top {
  background-position: top;
}
.cover-image-position-center {
  background-position: center;
}
.cover-image-position-bottom {
  background-position: bottom;
}

.cover-image-size-cover {
  background-size: cover;
}
.cover-image-size-contain {
  background-size: contain;
}
@media (max-width: 767px) {
  /*For all phone sizes*/
  .image-credit-wrapper {
    height: 120px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  /* For IPads*/
  .image-credit-wrapper {
    height: 250px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  /* For IPad pro*/
  .image-credit-wrapper {
    height: 300px;
  }
}
@media (min-width: 1200px) {
  /* For big screens*/
  .image-credit-wrapper {
    height: 350px;
  }
}
</style>