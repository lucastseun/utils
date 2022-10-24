const selectImage = () => {
    let selectFile = document.querySelector('#selectFile');
    if (selectFile) {
        return;
    }
    selectFile = document.createElement('input');
    selectFile.setAttribute('type', 'file');
    selectFile.setAttribute('accept', 'image/*')
    selectFile.setAttribute('style', 'display:none;');
    selectFile.setAttribute('id', 'selectFile');
    document.body.appendChild(selectFile);
    selectFile.click();
    return new Promise((resolve, reject) => {
        selectFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const res = e.target.result;
                const base64Str = res.split('base64,')[1];
                resolve({
                    code: '1',
                    msg: '上传成功！',
                    data: {
                        base64Str
                    }
                })
            }
            reader.readAsDataURL(file);
            document.body.removeChild(selectFile);
        })
    })
}

export default selectImage