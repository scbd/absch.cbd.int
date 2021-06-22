<template>
    <iframe id="ifrm" frameborder="0" scrolling="yes" style="background-color:transparent; position:relative; width:100%; 
height:750px;" :src="url" v-bind:target="target" v-on:scroll="scrollEvent" v-on:load="Resize" ref="frame">
    </iframe>
</template>

<script>
export default {
    name:'EmbedExternal',
    props: {
        url:String,
        target: String
    }, 
    data:  () => {
        return {            
        }
    },
	methods: {
        scrollEvent() {
            alert('hi');
        },
        Resize() {
            //offsetHeight
            document.getElementById('ifrm').style.height = '450px';
            var target = document.getElementById('ifrm').getAttribute("target");
            var ele  = document.getElementById('ifrm').contentWindow.document.querySelector(target);
            document.getElementById('ifrm').contentWindow.document.body.prepend(ele);
            //document.getElementById('ifrm').contentWindow.document.body.innerHTML = ele.innerHTML; 
            //------------------------------------------------------------
            document.getElementById('ifrm').contentWindow.document.
            querySelectorAll("body > :not(:first-child)")
            .forEach(function(value){
                value.classList.add("hide");
            });
            //here call function that loads the specif page content and set frame height.....
            
            //alert(document.getElementById('ifrm').contentDocument.body.scrollHeight);
            document.getElementById('ifrm').addEventListener('scroll', this.scrollEvent);

            if(parseInt(ele.offsetHeight) == 0){
                setTimeout(() => {
                    //alert(ele.offsetHeight);
                    document.getElementById('ifrm').style.height = parseInt(ele.offsetHeight+20)+'px';  
                }, 3000);
            } 
            //------------------------------------------------------------
            /*
            var elems  = document.getElementById('ifrm').contentWindow.document.querySelectorAll("body *:not("+target+")");
            Array.prototype.slice.call(elems).forEach(function(value){
                //alert(value.getAttribute("class"));
                value.classList.add("hide");
            });*/

            //alert(document.getElementById('ifrm').contentWindow.document.body.innerHTML);
            //alert(document.getElementById('ifrm').contentWindow.document.querySelector(target).innerHTML);
            //------------------------------------------------------------

        },
        mounted() {
            const $iframe = document.getElementById('ifrm');
            // method 1
            $iframe.addEventListener('scroll', this.scrollEvent);
            // method 2
            $iframe.contentDocument.addEventListener('scroll',this.scrollEvent);
            // method 3
            this.$refs.frame.addEventListener('scroll', this.scrollEvent);
        },
        /*
		async exportedData(){ 
			require(['tableexport'], function () {
				$('#lmoExport').tableExport({
					formats: ['xlsx'],
					filename: 'LMO-registry',
				});
				$('.xlsx').click();
				$('.xlsx').remove();
			});
		}
        */
	},
}
</script> 
