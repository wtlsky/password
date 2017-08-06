$(document).ready(function () {
    var elt = {
        fileE: $("#realFile")[0],
        uidE: $("#uid"),
        useE: $("#use"),
        lenE: $("#len"),
        btnE: $("#btn"),
        fileNameE: $("#fileName"),
        resultE: $("#result")
    };
    var fun = {
        create: function (fileHash) {
            var uid = elt.uidE.val();
            var use = elt.useE.val().toUpperCase();
            var len = parseInt(elt.lenE.val());
            var checkResult = fun.check(uid, use, len);
            if (!checkResult) return;
            var uufResult = this.md5(uid, use, fileHash);//将用户、账户用途、种子文件共同计算md5值
            var cutResult = this.cut(uufResult, len);//截取用户要求的长度作为最后结果
            var result = this.addUpperCase(cutResult);
            elt.resultE.html(result).show();
        },
        addUpperCase: function (str) {
            var result = str.split('');
            for (var i = 0; i < result.length; i++) {
                if (i % 2 != 0) {
                    result[i] = result[i].toUpperCase();
                }
            }
            return result.join('');
        },
        cut: function (str, len) {
            return str.substr(0, len);
        },
        md5: function (uid, use, fileHash) {
            var str = uid + use + fileHash;
            return SparkMD5.hash(str, false);
        },
        readFile: function () {
            var file = elt.fileE.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var res = SparkMD5.hashBinary(this.result);
                elt.fileNameE.val(file.name);
                fun.create(res);
            };
            reader.readAsBinaryString(file)
        },
        check: function (uid, use, len) {
            if (!uid) {
                elt.resultE.html('请输入您的账号').show();
                return false;
            } else if (!use) {
                elt.resultE.html('请输入您的账号用途').show();
                return false;
            } else if (!len) {
                elt.resultE.html('请输入您要生成的密码长度').show();
                return false;
            } else {
                return true;
            }
        }
    };
    elt.fileNameE.on('click',function(){
        $(elt.fileE).val(null);
        $(elt.fileE).click();
    });
    elt.btnE.on("click", function () {
        $(elt.fileE).val(null);
        $(elt.fileE).click();
    });
    $(elt.fileE).on("change", fun.readFile);
});