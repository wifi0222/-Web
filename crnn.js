document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const deleteButton = document.getElementById('deleteButton');
    const startRecognitionButton = document.getElementById('startRecognitionButton');
    const resultText = document.getElementById('resultText');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const uploadText = document.getElementById('upload-text');

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

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
        }
    });

    deleteButton.addEventListener('click', function () {
        // 清空文件输入框
        fileInput.value = '';
        // 隐藏删除按钮
        deleteButton.style.display = 'none';
        // 移除缩略图并恢复上传文本
        thumbnailContainer.innerHTML = '+';
        uploadText.style.display = 'block';
    });

    startRecognitionButton.addEventListener('click', function () {
        if (fileInput.files.length === 0) {
            alert('请先上传文件！');
            return;
        }

        // 识别按钮点击后的逻辑
        const formData = new FormData(uploadForm);
        fetch('https://example.com/recognize', { // Replace with your actual API endpoint
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultText.textContent = '识别结果: ' + data.result; // 显示识别结果
        })
        .catch(error => {
            console.error('识别失败:', error);
            resultText.textContent = '识别失败，请重试。';
        });
    });
});
