// pdfToImageConverter.js

var j = 0;

function convertToImagesAndSave(fileInput) {
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function(event) {
            var typedarray = new Uint8Array(event.target.result);
            PDFJS.getDocument(typedarray).promise.then(function(pdf) {
                var totalPages = pdf.numPages;
                var promises = [];

                for (var i = 1; i <= totalPages; i++) {
                    promises.push(convertPageToImage(pdf, i));
                }

                Promise.all(promises).then(function(imagesData) {
                    for (var j = 0; j < imagesData.length; j++) {
                        saveImage(imagesData[j], 'page_' + (j + 1) + '.png');
                    }
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
};

function convertPageToImage(pdf, pageNumber) {
    return pdf.getPage(pageNumber).then(function(page) {
        var viewport = page.getViewport({ scale: 1.0 });
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        return page.render(renderContext).promise.then(function() {
            return canvas.toDataURL('image/png');
        });
    });
};

function saveImage(imageData, fileName) {
    var link = document.createElement('a');
    link.href = imageData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Example usage:
// var fileInput = document.getElementById('pdfInput');
// convertToImagesAndSave(fileInput);



// for when we have to display the image on the viewer page, this will be called each time they go to the next page


function retrievePages() {
  j+= 1;
var fname = 'page_' + j + '.png'
var input = document.getElementById(fname);
var files = input.files;

for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // Assuming you want to process each image file, you can use FileReader to read its contents
    var reader = new FileReader();

    reader.onload = function(event) {
        // 'event.target.result' contains the data URL representing the file's data
        var imageData = event.target.result;

        // Here you can process the imageData, for example, display it in an <img> element
        var img = document.createElement('img');
        img.src = imageData;
        document.body.appendChild(img);
    };

    // Read the file as a Data URL
    reader.readAsDataURL(file);
};