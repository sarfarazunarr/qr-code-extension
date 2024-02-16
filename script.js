let resultshow = document.getElementById('result');
let data = document.getElementById('data');
let image = document.getElementById('qrcode');
let bbtn = document.getElementById('backbtn');
let inputSection = document.getElementById('inputsection');
let loader = document.getElementsByClassName('loader')[0];

function generateQR(){
    loader.style.display = 'inline-flex';
    image.style.display = 'none';
    let datavalue = data.value;
    let link = `https://api.qrserver.com/v1/create-qr-code/?data=${datavalue}&amp;size=100x100`;
    image.src = link;
    setTimeout(() => {
        loader.style.display = 'none';
        inputSection.style.display = 'none';
        image.style.display = 'block';
        bbtn.style.display = 'block';
    }, 2000);;
}

function qranother(){
    inputSection.style.display = 'flex';
    image.style.display = 'none';
    bbtn.style.display = 'none'
}

// Getting image
const fileInput = document.querySelector('input[type="file"]')

if(fileInput){
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]
        if(file){
            loader.style.display = 'block';
            scanQRCodeWithImage(file);
        }
    } )
} else {
    resultshow.innerHTML = "File input element not found";
}

async function scanQRCodeWithImage(file){
    loader.style.display = 'block';
    try{
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`https://api.qrserver.com/v1/read-qr-code/`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if(Array.isArray(data) && data.length > 0 && data[0].type === 'qrcode') {
            loader.style.display = 'none';
            const result = data[0].symbol[0];
            if(result.error){
                resultshow.innerHTML = `QR Code reading failed!  ${result.error}`
            }
            else{
                resultshow.innerHTML = result.data;
            }
        } else {
            resultshow.innerHTML = 'Failed Try Again'
        }
    } catch(err) {
        resultshow.innerHTML = 'Failed Please Try Later'
    }
}

function showOther(){
    document.getElementsByClassName('qr-generator')[0].classList.toggle('hidden')
    document.getElementsByClassName('qr-reader')[0].classList.toggle('hidden')
}
document.getElementById('generateqr').addEventListener('click', generateQR)
document.getElementById('showScan').addEventListener('click', showOther)
bbtn.addEventListener('click', qranother)

