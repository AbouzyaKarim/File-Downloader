const fileInput = document.querySelector("input");
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    downloadBtn.innerText="Downloading file...";
    fetchFile(fileInput.value); 
});

function fetchFile(url){
    // fetching file & returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a URL of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href=tempUrl; // passing filename as download value of <a> tag
        // passing file last name & extension as download value of <a> tag
        aTag.download=url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click(); // clicking <a> tag so the file begin downloading
        aTag.remove();// removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl);// removing tempURL from document
        downloadBtn.innerText="Download File";
    }).catch(() => {
        //catch method will be called if any error comes during download
        downloadBtn.innerText="Download File";
        alert("Failed to download file!");
    });
}
