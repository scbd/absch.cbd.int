<template>
  <div id="shareRecord">
    <a
      id="shareSearchDomId"
      rel="noopener"
      href="#"
      class="table-export-button"
      @click="openModel()"
    >
      <i class="fa fa-paper-plane" aria-hidden="true"></i> {{ $t("share") }}
    </a>
    <div
      class="modal fade"
      ref="shareModal"
      tabindex="-1"
      aria-hidden="true"
      id="share-modal"
    >
      <!-- <modal size="lg" @show="onShowDialog" ref="shareModal" id="share-modal"> -->
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t("share") }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="modal.hide()"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="wrapper">
              <a
                href="#"
                class="icon share-link"
                v-bind:class="{ selected: sharedData.type == 'link' }"
                @click="loadTabData('link')"
                :disabled="loading"
              >
                <div class="tooltip">{{ $t("link") }}</div>
                <span><i class="bi bi-link"></i></span>
              </a>
              <a
                href="#"
                class="icon embed"
                v-bind:class="{
                  selected: sharedData.type == 'embed',
                  disabled:
                    sharedData.storageType == 'chm-search-result' &&
                    !sharedData.recordKey,
                }"
                @click="loadTabData('embed')"
                :disabled="loading"
              >
                <div class="tooltip">{{ $t("embed") }}</div>
                <span><i class="bi bi-code-slash"></i></span>
              </a>
              <a
                href="#"
                class="icon email"
                v-bind:class="{
                  selected: sharedData.type == 'email',
                  disabled:
                    sharedData.storageType == 'chm-search-result' &&
                    !sharedData.recordKey,
                }"
                @click="loadTabData('email')"
                :disabled="loading"
              >
                <div class="tooltip">{{ $t("email") }}</div>
                <span><i class="bi bi-envelope"></i></span>
              </a>
              <div class="row">
                {{ sharedData | json }}
              </div>
              <div class="row" v-if="!loading">
                <div class="col-md-12">
                  <div
                    v-if="!loading && sharedData.success"
                    class="alert alert-success"
                  >
                    Email send successfully.
                  </div>
                  <div v-if="loading" class="alert alert-info">
                    <i class="fa fa-spin fa-spinner" v-if="loading"></i>
                    {{ $t("processing") }}
                  </div>
                  <div v-if="sharedData.error" class="alert alert-error">
                    {{ error }}
                  </div>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'link'">
                <div class="col-md-12 padding-left-0">
                  <div
                    class="
                      field
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <span class="bi bi-link text-center"></span>
                    <p class="copy-link">{{ sharedData.link }}</p>
                    <button class="btn btn-primary" @click="copy('shareLink')">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div class="row" v-if="sharedData.type == 'email'">
                <div
                  class="col-md-12 padding-left-0"
                  v-if="!sharedData.email || !isValidEmail"
                >
                  <div class="alert alert-info">
                    Please enter email(s) separated by , or ;
                  </div>
                </div>
                <div class="col-md-12 padding-left-0">
                  <div class="link-container">
                    <input
                      type="email"
                      class="input-email"
                      multiple
                      pattern="^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},*[\W]*)+$"
                      v-model="sharedData.email"
                      placeholder="Email(s)"
                    />
                    <button
                      class="email-btn"
                      @click="shareLinkMail()"
                      :disabled="loading || !sharedData.email"
                      v-bind:class="{ disabled: loading || !sharedData.email }"
                    >
                      send
                    </button>
                  </div>
                </div>
              </div>

              <div class="row" v-if="sharedData.type == 'embed'">
                <div
                  class="col-12 padding-left-0"
                  v-if="!sharedData.domain || !isValidDomain"
                >
                  <div class="alert alert-info">
                    Please enter domain where you intent to embed
                  </div>
                </div>
                <form class="row g-3">
                  <div class="col-12">
                    <label for="inputPassword2">Domain</label>
                    <input
                      v-model="sharedData.domain"
                      type="url"
                      placeholder="for eg. https://www.cbd.int"
                      class="form-control"
                      @change="onDomainChange"
                    />
                  </div>
                  <div class="col-12">
                    <!-- || !isValidDomain -->
                    <button
                      class="btn btn-primary"
                      @click.prevent="generateEmbedCode()"
                      :disabled="loading || !sharedData.domain"
                      v-bind:class="{
                        disabled:
                          loading || !sharedData.domain || !isValidDomain,
                      }"
                    >
                      Generate Code
                    </button>
                  </div>
                </form>
                <div class="row g-3" v-if="sharedData.code">
                    <div class="col-12">
                        <div class="bd-clipboard">
                            <button class="btn-clipboard" title="" data-original-title="Copy to clipboard" @click="copyCode()">{{$t('copyCode')}}</button>
                        </div>    
                        <div class="highlight">
                            <code data-lang="html">
                                {{ sharedData.code }}
                            </code>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="modal.hide()"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentShareApi from "~/api/document-share";
import SubscriptionsApi from "~/api/subscriptions";
import { Modal } from "bootstrap";
import i18n from "../../locales/en/components/export.json";

export default {
  components: {},
  props: ["getQuery", "tokenReader", "userStatus", "generateLink"],
  data: () => {
    return {
      modal: null,
      loading: false,
      open: false,
      isValidEmail: true,
      isValidDomain: true,
      sharedData: {
        email: undefined,
        // storageType      : '',
      },
      // shareType        : 'link',
      // embedScript      : '',
      // domain           : '',
      // recordKey        : '',
      // type             : '',
      // shareLink        : '',
      // sendResponse     : '',
      // email            : '',
      // documentShareId  : ''
    };
  },
  created() {
    this.documentShareApi = new DocumentShareApi(this.tokenReader);
    this.subscriptionsApi = new SubscriptionsApi(this.tokenReader);
  },
  async mounted() {
    this.modal = new Modal(this.$refs.shareModal);
  },
  methods: {
    async openModel() {
      const token = await this.tokenReader();
      if (!token) {
        await this.userStatus();
        this.open = false;
        return;
      } else {
        this.modal.show();
        // this.open = true;
        return true;
      }
    },
    async onShowDialog() {
      this.loadTabData("embed");
      // this.populateData();
    },
    loadTabData(tab) {
      this.sharedData = {
        type: tab || "link",
        success: undefined,
        email: undefined,
        link: undefined,
      };
      console.log(this.sharedData);
      const { recordKey, type } = this.getQuery(); //TODO: change, GetQuery is getting details about what type of share it is (id and type search-relesult/document)

      this.sharedData.recordKey = recordKey;
      this.sharedData.storageType = type;

      if (this.sharedData.storageType == "chm-document") {
        this.sharedData.storageType = "chm-document";
        this.sharedData.link = `${this.$realm.baseURL}/${this.$locale}/database/${this.sharedData.recordKey}`;
      }
      if (this.sharedData.storageType == "chm-search-result") {
        this.sharedData.storageType = "chm-search-result";
      }
      if (this.sharedData.storageType == "chm-country-profile") {
        this.sharedData.storageType = "chm-country-profile";
        this.sharedData.link = `${this.$realm.baseURL}/${this.$locale}/countries/${this.sharedData.recordKey}`;
      }
      console.log(this.sharedData);
    },
    closeDialog() {
      this.open = false;
    },
    copy(id) {
      const r = document.createRange();
      r.selectNode(document.getElementById(id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    async shareLinkMail() {
      if (
        !this.sharedData.email ||
        !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          this.sharedData.email
        )
      ) {
        this.isValidEmail = false;
        return;
      }
      this.isValidEmail = true;
      try {
        this.loading = true;
        const emailLink = {
          storageType: this.sharedData.storageType,
          sharedData: {
            code: this.sharedData.recordKey,
          },
          sharedWith: {
            link: true,
            emails: this.sharedData.email,
          },
        };
        const response = await this.documentShareApi.shareDocument(emailLink);

        if (response) {
          this.sharedData.success = true;
          this.sharedData.email = undefined;
        } else {
          this.error = "Error sending email, please try again.";
        }
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async generateEmbedCode() {
      this.onDomainChange();
      if (!this.isValidDomain) return;

      this.loading = true;

      const param = {
        storageType: this.sharedData.storageType,
        shareType: this.sharedData.type,
        sharedWith: {
          link: true,
        },
        sharedData: {
          domain: this.sharedData.domain,
          recordKey: this.sharedData.recordKey,
          realm: this.$realm.value,
        },
      };
      try {
        if (this.sharedData.documentShareId || "" == "") {
          if (this.sharedData.storageType == "chm-search-result") {
            //save query
          }
          const shareDetails = await this.documentShareApi.shareDocument(param);
          const urlHash = await this.documentShareApi.getSharedDocument(shareDetails?.id, {f:{ shortUrlHash :1 }})
          this.sharedData.documentShareId = shareDetails?.id;
          this.sharedData.shortUrlHash    = urlHash.shortUrlHash;

        }
        if (this.sharedData.documentShareId) {
         
            if (this.sharedData.storageType == "chm-document") {
              this.sharedData.code = `<div class="scbd-chm-document" data-type="chm-document" data-access-key="${this.sharedData.shortUrlHash}" width="100%"></div>`;
            } 
            else if (this.sharedData.storageType == "chm-search-result") {
              this.sharedData.code = `<div class="scbd-chm-search-result" data-type="chm-search-result" data-access-key="${this.sharedData.shortUrlHash}" width="100%"></div>`;
            } 
            else if (this.sharedData.storageType == "chm-country-profile") {
              this.sharedData.code = `<div class="scbd-chm-country-profile" data-type="chm-country-profile" data-access-key="${this.sharedData.shortUrlHash}" width="100%"></div>`;
            }
        }
        this.sharedData = Object.assign({}, this.sharedData);
        
      } catch (err) {
        this.sendResponse = err;
      } finally {
        this.loading = false;
      }
    },
    onDomainChange() {
      console.log(this.sharedData.domain);
      const regexp =
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (!regexp.test(this.sharedData.domain)) {
        this.isValidDomain = false;
        return;
      }
      this.isValidDomain = true;
    },
  },
  i18n: {
    messages: {
      en: i18n,
    },
  },
};
</script>

<style>
.modal-body {
  background: #ddd;
}
.wrapper {
  /* text-align: center; */
}
.wrapper .icon {
  position: relative;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 10px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  display: inline-block;
  align-items: center;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  color: #333;
  text-decoration: none;
}
.wrapper .tooltip {
  position: absolute;
  top: 0;
  line-height: 1.5;
  font-size: 14px;
  background-color: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
/* .wrapper .icon.share-link:hover .tooltip {
    left: -25px;
    width: 80px!important;
} */

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}
.wrapper .share-link.selected,
.wrapper .share-link:hover,
.wrapper .share-link:hover .tooltip,
.wrapper .share-link:hover .tooltip::before {
  background-color: #3b5999;
  color: #ffffff;
}
.wrapper .embed.selected,
.wrapper .embed:hover,
.wrapper .embed:hover .tooltip,
.wrapper .embed:hover .tooltip::before {
  background-color: #46c1f6;
  color: #ffffff;
}
.wrapper .email.selected,
.wrapper .email:hover,
.wrapper .email:hover .tooltip,
.wrapper .email:hover .tooltip::before {
  background-color: #e1306c;
  color: #ffffff;
}
.wrapper .share-link span,
.wrapper .embed span,
.wrapper .email span {
  margin: inherit;
}

.wrapper .field {
  margin: 15px 0px -5px 0px;
  height: 40px;
  border: 1px solid #0d6efd;
  border-radius: 5px;
}

.wrapper .field.active {
  border-color: #0d6efd;
}

.wrapper .field span {
  width: 50px;
  font-size: 1.1rem;
}

.wrapper .field.active span {
  color: #0d6efd;
}

.wrapper .field .copy-link {
  border: none;
  outline: none;
  font-size: 0.89rem;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0px;
  margin: 5px 0px;
  white-space: nowrap;
  overflow: scroll;
  padding-top: 8px;
}

.btn-clipboard:hover,
.btn-clipboard:focus {
  color: #fff!important;
  background-color: #0d6efd;
}

.bd-clipboard {
  position: relative;
  float: right;
}
.highlight {
    background-color: #fff!important;
    padding: 10px;
  border-radius: 0.25rem;     
}

.btn-clipboard {
  position: absolute;
  z-index: 10;
  display: block;
  padding: 0.25rem 0.5rem;
  font-size: 75%;
  color: #818a91;
  cursor: pointer;
  background-color: transparent;
  border-radius: 0.25rem;     
  border: 1px solid #0d6efd;
  color: #0d6efd;
}

</style>