$(function(){
	$("#publish").on("click",function(){
		var msgType = "招工";
		$("[name=msgType]").each(function(){
			if(this.checked==true){
				msgType = this.dataset.type;
			}
		});
		var workType = $("#workType").text();
		var price = $("#price").val();
		var address = $("#address").val();
		var contact = $("#contact").val();
		var workTime = $("#workTime").val();
		var remark = $("#remark").val();
		
		if(workType == ""){
			weui.topTips('请选择班组！');
			return;
		}
		if(price == ""){
			weui.topTips('请填写价格！');
			return;
		}
		if(address == ""){
			weui.topTips('请填写工作地点！');
			return;
		}
		if(contact == ""){
			weui.topTips('请填写联系方式！');
			return;
		}
		if(workTime == ""){
			weui.topTips('请填写工作时间！');
			return;
		}
		
		var id = localStorage.getItem("id");
		var realName = localStorage.getItem("realName");
		loading = weui.loading('加载中');
		$.ajax({
			url:"msg/add",
			type:"post",
			dataType:"json",
			data:{
				id:id,
				realName:realName,
				msgType:msgType,
				workType:workType,
				price:price,
				address:address,
				contact:contact,
				workTime:workTime,
				remark:remark
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
	});
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$(".weui-cell_access").on("click",function(){
		weui.actionSheet([{
			label: '钢筋班组',
			onClick: function() {
				$("#workType").text("钢筋班组");
			}
		}, {
			label: '混泥土班组',
			onClick: function() {
				$("#workType").text("混泥土班组");
			}
		}, {
			label: '模板班组',
			onClick: function() {
				$("#workType").text("模板班组");
			}
		}, {
			label: '土方班组',
			onClick: function() {
				$("#workType").text("土方班组");
			}
		}, {
			label: '砌筑班组',
			onClick: function() {
				$("#workType").text("砌筑班组");
			}
		}, {
			label: '防水班组',
			onClick: function() {
				$("#workType").text("防水班组");
			}
		}, {
			label: '给排水班组',
			onClick: function() {
				$("#workType").text("给排水班组");
			}
		}, {
			label: '电器班组',
			onClick: function() {
				$("#workType").text("电器班组");
			}
		}, {
			label: '暖通班组',
			onClick: function() {
				$("#workType").text("暖通班组");
			}
		}], [{
			label: '取消',
			onClick: function() {
				console.log('取消');
			}
		}]);
		
	})
})
