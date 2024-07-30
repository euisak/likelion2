//[판매액 input: 1000단위로 , 생성]
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
} 

function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

function inputOnlyNumberFormat(obj) {
    obj.value = onlynumber(uncomma(obj.value));
}

function onlynumber(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1');
}

//[사진등록: 사진 여러개 등록 시 어떤 파일 등록했는지 확인]
document.addEventListener("DOMContentLoaded", function() {
    const productImageInput = document.getElementById('productImage');
    const fileList = document.getElementById('productImage-fileList');

    // 기존 파일 목록
    const filesArray = [];

    productImageInput.addEventListener('change', function() {
        const files = Array.from(productImageInput.files);

        // 선택된 파일을 기존 목록에 추가
        files.forEach(file => {
            if (!filesArray.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)) {
                filesArray.push(file);
                const li = document.createElement('li');
                li.textContent = file.name;
                fileList.appendChild(li);
            }
        });

        // 파일 input을 리셋하여 다음 파일 선택을 가능하게 함
        productImageInput.value = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('productImage');
    const errorMessage = document.getElementById('fileErrorMessage');

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        // 파일 개수 확인
        if (files.length > 1) {
            errorMessage.style.display = 'block';
            fileInput.value = ''; // Clear the input
        } else {
            errorMessage.style.display = 'none';
        }
    });
});