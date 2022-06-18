const form = document.querySelector("form"),
fileInput = form.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", ()=>{
	fileInput.click();
});

fileInput.onchange = ({target}) =>{
	let file = target.files[0]; //getting file and [0] this means if user has selected multiples files then get first one only
	if(file){ //if file is selected
		let fileName = file.name; //getting selected file name
		if (fileName.length >= 12){ //if filename length is greater or equal to 12 the split the name and add.....
			let splitName = fileName.split('.')
			fileName = splitName[0].substring(0, 12)+ ".... ." + splitName[1];
		}
		uploadFile(fileName); //calling uploadFile with passing file name as an argument
	}
}

function uploadFile(name) {
	let xhr = XMLHttpRequest(); //creating new xml obj (AJAX)
	xhr.open("POST", "upload.php"); //sending post request to the specified URL/File
	xhr.upload.addEventListener("progress", ({loaded, total})=>{
		let fileLoaded = Math.floor((loaded / total) *100); //getting percentage of loded file size
		let fileTotal = Math.floor(total / 1000); // getting file size in KB from bytes
		if (file){ //if file is selected
			let fileName = file.name; //getting selected file name
			if (fileName.length >=12){ //if filename length is greater or equal to 12 the split the name and add....
				let splitName = fileName.split('.');
				fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
			}
		}
		
		// let progressHTML = '<li class="row">
		//						<i class="fas fa-file-alt"></i>
		//						<div class="content">
		//						<div class="details">
		//							<span class="name">${name} . Uploading</span>
		//							<span class="percent">${fileLoaded}%</span>
		//						</div>
		//							<div class="progress-bar">
		//							<div class="progress" style="width: ${fileLoaded}%"></div>
		//						</div>
		//						</div>
		//					</li>';
		progressArea.innerHTML = progressHTML;
		if(loaded == total){
			progressArea.innerHTML = "";
		//	let uploadedHTML = <li class="row">
		//						<i class="fas fa-file-alt"></i>
		//							<div class="content">
		//							<div class="details">
		//								<span class="name">${name}. Uploaded</span>
		//								<span class="size">${fileTotal}</span>
		//							</div>
		//							</div>
		//						<i class="fas fa-check"></i>
		//						</li>;

			uploadArea.insertAdjacentHTML("afterbegin",uploadedHTML);
		}
	});
	let formData = new FormData(form); //formData is an object to easily send form data
	xhr.send(formData); //sending form data to php
}