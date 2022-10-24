const selectVideo = (pic = {}) => {
    let selectVideo = document.querySelector('#selectVideo');
    if (selectVideo) {
        return;
    }
    selectVideo = document.createElement('input');
    selectVideo.setAttribute('type', 'file');
    selectVideo.setAttribute('accept', 'video/*')
    selectVideo.setAttribute('style', 'display:none;');
    selectVideo.setAttribute('id', 'selectVideo');
    document.body.appendChild(selectVideo);
    selectVideo.click();
    return new Promise((resolve, reject) => {
        selectVideo.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
                const res = e.target.result;
                // const base64Str = res.split('base64,')[1];
                const base64Str = await getVideoBase64(res, pic);
                resolve({
                    code: '1',
                    msg: '上传成功！',
                    data: {
                        base64Str
                    }
                })
            }
            reader.readAsDataURL(file);
            document.body.removeChild(selectVideo);
        })
    })
}

const getVideoBase64 = (src, pic) => {
    return new Promise((resolve, reject) => {
        const {width = 100, height = 100} = pic;
        const video = document.createElement('video');
        video.setAttribute('src', src);
        video.setAttribute('preload', 'auto');
        video.load();
        video.addEventListener('loadeddata', () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            const dataURL = canvas.toDataURL('image/jpeg');
            resolve(dataURL);
        });
    })
}

export default selectVideo