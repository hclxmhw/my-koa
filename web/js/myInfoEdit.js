$(function(){
	var uploadCount = 0;
	var uploadCount2 = 0;
	var loading;
	
	var id = localStorage.getItem("id");
	var info = localStorage.getItem(id+"info");
	if(info!=null){
		info = JSON.parse(info);
		$("#mobile").val(info.mobile == null ? "" : info.mobile);
		$("#realName").val(info.realName == null ? "" : info.realName);
		$("#age").val(info.age == null ? "" : info.age);
		$("#idCardNum").val(info.idCardNum == null ? "" : info.idCardNum);
		var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
		$("#idCardFront")[0].dataset.path = info.idCardFront == null ? "" : info.idCardFront;
		$("#idCardFront").append($(tmpl.replace('#url#', info.idCardFront == null ? "" : "/grp"+info.idCardFront)));
		$("#idCardBack")[0].dataset.path = info.idCardBack == null ? "" : info.idCardBack;
		$("#idCardBack").append($(tmpl.replace('#url#', info.idCardBack == null ? "" : "/grp"+info.idCardBack)));
	}
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$("#update").on("click",function(){
		var mobile = $("#mobile").val();
		var realName = $("#realName").val();
		var age = $("#age").val();
		var idCardNum = $("#idCardNum").val();
		var idCardFront = $("#idCardFront")[0].dataset.path;
		var idCardBack = $("#idCardBack")[0].dataset.path;
		
		if(mobile == ""){
			weui.topTips('请填写手机号！');
			return;
		}
		if(realName == ""){
			weui.topTips('请填写姓名！');
			return;
		}
		if(age == ""){
			weui.topTips('请填写年龄！');
			return;
		}
		if(idCardNum == ""){
			weui.topTips('请填写身份证号！');
			return;
		}
		if(idCardFront == undefined){
			weui.topTips('请上传身份证正面照！');
			return;
		}
		if(idCardBack == undefined){
			weui.topTips('请上传身份证反面照！');
			return;
		}
		var id = localStorage.getItem("id");
		loading = weui.loading('加载中');
		$.ajax({
			url:"user/update.do",
			type:"post",
			dataType:"json",
			data:{
				id:id,
				mobile:mobile,
				realName:realName,
				age:age,
				idCardNum:idCardNum,
				idCardFront:idCardFront,
				idCardBack:idCardBack
			},
			success:function(data){
				loading.hide();
				if(data.code==200){
					weui.toast('保存成功！', {
					    duration: 2000,
					    callback: function(){ 
					    	history.back();
				    	}
					});
				}else{
					weui.alert(data.message);
				}
			},
			error:function(){
				loading.hide();
				weui.alert("网络异常！");
			}
		})
	})
	
	weui.uploader('#uploader', {
	   url: 'user/upload.do',
	   auto: true,
	   type: 'file',
	   fileVal: 'file',
	   compress: {
	       width: 1600,
	       height: 1600,
	       quality: .8
	   },
	   onBeforeQueued: function(files) {
	       // `this` 是轮询到的文件, `files` 是所有文件
	
	       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
	           weui.alert('请上传图片');
	           return false; // 阻止文件添加
	       }
	       if(this.size > 5 * 1024 * 1024){
	           weui.alert('请上传不超过5M的图片');
	           return false;
	       }
	       if (files.length > 1) { // 防止一下子选择过多文件
	           weui.alert('最多只能上传1张图片，请重新选择');
	           return false;
	       }
	       if (uploadCount + 1 > 1) {
	           weui.alert('最多只能上传1张图片');
	           return false;
	       }
	
	       ++uploadCount;
	
	       // return true; // 阻止默认行为，不插入预览图的框架
	   },
	   onProgress: function(procent){
	       console.log(this, procent);
	       // return true; // 阻止默认行为，不使用默认的进度显示
	   },
	   onSuccess: function (ret) {
	       console.log(this, ret);
	       // return true; // 阻止默认行为，不使用默认的成功态
	       $("#idCardFront")[0].dataset.path = ret.rows;
	   },
	   onError: function(err){
	       console.log(this, err);
	       // return true; // 阻止默认行为，不使用默认的失败态
	   }
	});
	
	weui.uploader('#uploader2', {
	   url: 'user/upload.do',
	   auto: true,
	   type: 'file',
	   fileVal: 'file',
	   compress: {
	       width: 1600,
	       height: 1600,
	       quality: .8
	   },
	   onBeforeQueued: function(files) {
	       // `this` 是轮询到的文件, `files` 是所有文件
	
	       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
	           weui.alert('请上传图片');
	           return false; // 阻止文件添加
	       }
	       if(this.size > 5 * 1024 * 1024){
	           weui.alert('请上传不超过5M的图片');
	           return false;
	       }
	       if (files.length > 1) { // 防止一下子选择过多文件
	           weui.alert('最多只能上传1张图片，请重新选择');
	           return false;
	       }
	       if (uploadCount2 + 1 > 1) {
	           weui.alert('最多只能上传1张图片');
	           return false;
	       }
	
	       ++uploadCount2;
	
	       // return true; // 阻止默认行为，不插入预览图的框架
	   },
	   onProgress: function(procent){
	       console.log(this, procent);
	       // return true; // 阻止默认行为，不使用默认的进度显示
	   },
	   onSuccess: function (ret) {
	       console.log(this, ret);
	       // return true; // 阻止默认行为，不使用默认的成功态
	       $("#idCardBack")[0].dataset.path = ret.rows;
	   },
	   onError: function(err){
	       console.log(this, err);
	       // return true; // 阻止默认行为，不使用默认的失败态
	   }
	});
	
	
    /*$("#idCardFront").on("change", function(e){
    	if($("#uploaderFiles").children(".weui-uploader__file").length == 1){
    		weui.alert("只能选择一张图片！");
    		return;
    	}
    	var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
        var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        for (var i = 0, len = files.length; i < len; ++i) {
            var file = files[i];

            if (url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            }

            $("#uploaderFiles").append($(tmpl.replace('#url#', src)));
        }
    });*/
    $("#idCardFront").on("click", "li", function(){
    	var url = this.style.backgroundImage.substring(5,this.style.backgroundImage.length-2);
    	var gallery = weui.gallery(url, {
		    className: 'custom-classname',
		    onDelete: function(){
		    	weui.confirm('是否删除？', 
		    	function(){
		    		console.log('yes');
		    		gallery.hide();
		    		$("#idCardFront").children(".weui-uploader__file").remove();
		    	}, 
		    	function(){ 
		    		console.log('no');
		    		gallery.hide();
		    	});
		    }
		});
    });
 /*   $("#idCardBack").on("change", function(e){
    	if($("#uploaderFiles2").children(".weui-uploader__file").length == 1){
    		weui.alert("只能选择一张图片！");
    		return;
    	}
    	var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';
        var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        for (var i = 0, len = files.length; i < len; ++i) {
            var file = files[i];

            if (url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            }

            $("#uploaderFiles2").append($(tmpl.replace('#url#', src)));
        }
    });*/
    $("#idCardBack").on("click", "li", function(){
    	var url = this.style.backgroundImage.substring(5,this.style.backgroundImage.length-2);
    	var gallery = weui.gallery(url, {
		    className: 'custom-classname',
		    onDelete: function(){
		    	weui.confirm('是否删除？', 
		    	function(){
		    		console.log('yes');
		    		gallery.hide();
		    		$("#idCardBack").children(".weui-uploader__file").remove();
		    	}, 
		    	function(){ 
		    		console.log('no');
		    		gallery.hide();
		    	});
		    }
		});
    });
})
