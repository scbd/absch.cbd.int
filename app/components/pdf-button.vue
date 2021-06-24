<template>
        <button @click="divImport" class="record-link-style color-white">
            <strong>  export PDF !</strong>
        </button>
</template>

<script>

export default {
	props: ['data'],
    data:  () => {
        return {            
        }
    },
	methods: {

		    divImport(){
				let url = document.getElementById('pdfUrl').value;
				console.log('url', url);
				window.open(url, '_blank');
				// window.location.href = url;
				let htmlCanvas = document.createElement('script');  
				htmlCanvas.setAttribute('src',"https://html2canvas.hertzen.com/dist/html2canvas.js");
				document.head.appendChild(htmlCanvas);
				let pdfFile = document.createElement('script');  
				pdfFile.setAttribute('src',"https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js");
				document.head.appendChild(pdfFile);
				let elemet = document.querySelectorAll('#statement');
				let btn = document.getElementById('pdfbtn')
		
				// elemet.filter((val)=>{
				//  return val.getAttribute('data')==
				// })
		
				elemet.forEach(function(el){
					console.log(el)
					const elmentDiv=el.firstElementChild
					console.log(elmentDiv)
					const term = elmentDiv.getAttribute("data-id").
					console.log(term)
				})
			    var pdf = new jsPDF('p', 'pt', 'a4');
				pdf.html(document.getElementById('statement'), {
					callback: function (pdf) {
						pdf.save('a4.pdf');
       				}
    			});
				// const doc = new jsPDF();

				// doc.text("Hello world!", 10, 10);
				// doc.save("a4.pdf")
				// window.html2canvas=html2canvas;
				// var doc =new jsPDF("p","pt","a4")
				// doc.html(document.querySelector('#statement'),{
				// 	callback:function (pdf){
				// 	pdf.save("mypdf.pdf")
				// 		}
				// 	})
    		}
	},
}
</script> 
