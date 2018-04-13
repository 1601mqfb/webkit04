var Upload = function(el, ops) {
    this.addbox = document.querySelector(el);
    //input
    this.addbtn = this.addbox.querySelector('input');
    //要求长传文件的类型
    this.t = ops.type;
    //要求大小
    this.s = ops.size; //3MB
    //弹出框
    this.dialog = document.querySelector('#dialog');
    //弹出框标语
    this.dialogT = this.dialog.querySelector('.t1');
    //this指向实例对象
    this.init();
};

Upload.prototype = {
    constructor: Upload,
    init: function() {
        var that = this; //Upload对象
        //文件域的值发生变化时触发change事件
        this.addbtn.addEventListener('change', function() {
            //this 指向表单
            var files = this.files[0]; //本地文件对象
            var fType = files.type.split('/')[1], //类型
                fSize = files.size; //大小  b
            //console.log(that.t.indexOf(fType));
            //console.log(this); // input
            if (that.t.indexOf(fType) === -1) {
                //不符合文件类型 alert
                that.dialog.style.display = "block";
                that.dialogT.innerHTML = '请上传' + that.t.join('、') + '格式的文件';
                return false;
            }
            //判断文件大小
            if (that.s * 1048576 < fSize) {
                that.dialog.style.display = "block";
                that.dialogT.innerHTML = '请不超过上传' + that.s + 'Mb大小的文件';
                return false;
            }
            //文件类型和大小都符合要求，所以获取本地文件对象，放到浏览器展示
            //创建FileReader对象
            var fileRead = new FileReader();
            //设置读取文件对象
            fileRead.readAsDataURL(files);
            //文件读取成功
            fileRead.onload = function() {
                var img = new Image();
                img.src = this.result; // img的src路径
                var div = document.createElement('div');
                div.className = "text-center bg-primary col-xs-3";
                div.appendChild(img);
                wrap.appendChild(div);
            }

            //判断上传文件个数
        }, false);
    }
}