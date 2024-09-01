document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const deleteButton = document.getElementById('deleteButton');
    const startRecognitionButton = document.getElementById('startRecognitionButton');
    const resultText = document.getElementById('resultText');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const uploadText = document.getElementById('upload-text');

    let uploadedFile = null;

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];

        // 检查文件类型
        const validImageTypes = ['image/jpeg', 'image/png', 'image/bmp'];
        if (!validImageTypes.includes(file.type)) {
            alert('请上传图片文件（格式: .jpg, .jpeg, .png, .bmp）');
            fileInput.value = '';
            return;
        }

        uploadedFile = file;

        // 显示删除按钮
        deleteButton.style.display = 'block';
        uploadText.style.display = 'none'; // 隐藏上传文本

        // 显示缩略图
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            thumbnailContainer.innerHTML = '';
            thumbnailContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    deleteButton.addEventListener('click', function () {
        // 清空文件输入框
        fileInput.value = '';
        uploadedFile = null;

        // 隐藏删除按钮
        deleteButton.style.display = 'none';

        // 移除缩略图并恢复上传文本
        thumbnailContainer.innerHTML = '+';
        uploadText.style.display = 'block';
    });

    startRecognitionButton.addEventListener('click', function () {
        if (!uploadedFile) {
            alert('请先上传文件！');
            return;
        }

        // 禁用按钮以防重复点击
        startRecognitionButton.disabled = true;
        startRecognitionButton.textContent = '处理中...';

        // 创建FormData对象
        const formData = new FormData(uploadForm);

        // 调用API
        fetch('https://example.com/recognize', { // 替换为实际API端点
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            // 假设返回的是PDF文件
            const url = window.URL.createObjectURL(blob);
            startRecognitionButton.textContent = '下载PDF';
            startRecognitionButton.disabled = false;

            // 更改按钮行为为下载文件
            startRecognitionButton.onclick = function() {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'result.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            };
        })
        .catch(error => {
            console.error('识别失败:', error);
            resultText.textContent = '识别失败，请重试。';
            startRecognitionButton.textContent = '开始识别';
            startRecognitionButton.disabled = false;
        });
    });
});
