$(function(){
	var loading;
	
	var id = localStorage.getItem("id");
	var info = localStorage.getItem(id+"resume");
	if(info!=null){
		info = JSON.parse(info);
		$("#mobile").val(info.mobile == null ? "" : info.mobile);
		$("#realName").val(info.real_name == null ? "" : info.real_name);
		$("#age").val(info.age == null ? "" : info.age);
		$("#idCardNum").val(info.id_card_num == null ? "" : info.id_card_num);
		$("#workType").removeClass("gray");
		$("#workType").text(info.work_type == null ? "" : info.work_type);
		$("#certificate").val(info.certificate == null ? "" : info.certificate);
		$("#workYear").val(info.work_year == null ? "" : info.work_year);
		$("#workExp").val(info.work_exp == null ? "" : info.work_exp);
		$("#expSalary").val(info.exp_salary == null ? "" : info.exp_salary);
		$("#workAddress").val(info.work_address == null ? "" : info.work_address);
		$("#remark").val(info.remark == null ? "" : info.remark);
	}
	
	$("#workType").on("click",function(){
		weui.actionSheet([{
			label: '钢筋班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("钢筋班组");
			}
		}, {
			label: '混泥土班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("混泥土班组");
			}
		}, {
			label: '模板班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("模板班组");
			}
		}, {
			label: '土方班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("土方班组");
			}
		}, {
			label: '砌筑班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("砌筑班组");
			}
		}, {
			label: '防水班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("防水班组");
			}
		}, {
			label: '给排水班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("给排水班组");
			}
		}, {
			label: '电器班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("电器班组");
			}
		}, {
			label: '暖通班组',
			onClick: function() {
				$("#workType").removeClass("gray");
				$("#workType").text("暖通班组");
			}
		}], [{
			label: '取消',
			onClick: function() {
				console.log('取消');
			}
		}]);
	})
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$("#update").on("click",function(){
		var realName = $("#realName").val();
		var mobile = $("#mobile").val();
		var idCardNum = $("#idCardNum").val();
		var age = $("#age").val();
		var workType = $("#workType").text();
		var certificate = $("#certificate").val();
		var workYear = $("#workYear").val();
		var workExp = $("#workExp").val();
		var expSalary = $("#expSalary").val();
		var workAddress = $("#workAddress").val();
		var remark = $("#remark").val();
		
		if(realName == ""){
			weui.topTips('请填写姓名！');
			return;
		}
		if(mobile == ""){
			weui.topTips('请填写手机号！');
			return;
		}
		if(idCardNum == ""){
			weui.topTips('请填写身份证号！');
			return;
		}
		if(age == ""){
			weui.topTips('请填写年龄！');
			return;
		}
		if(workType == ""||workType == "请选择工种"){
			weui.topTips('请选择工种！');
			return;
		}
		if(certificate == ""){
			weui.topTips('请填写职业证书！');
			return;
		}
		if(workYear == ""){
			weui.topTips('请填写工作年限！');
			return;
		}
		if(workExp == ""){
			weui.topTips('请填写工作经验！');
			return;
		}
		if(expSalary == ""){
			weui.topTips('请填写工资要求！');
			return;
		}
		if(workAddress == ""){
			weui.topTips('请填写工作地点！');
			return;
		}
		/*if(remark == ""){
			weui.topTips('请填写备注！');
			return;
		}*/
		loading = weui.loading('加载中');
		var id = localStorage.getItem("id")
		$.ajax({
			url:"resume/update",
			type:"post",
			dataType:"json",
			data:{
				id : id,
				realName : realName,
				mobile : mobile,
				idCardNum : idCardNum,
				age : age,
				workType : workType,
				certificate : certificate,
				workYear : workYear,
				workExp : workExp,
				expSalary : expSalary,
				workAddress : workAddress,
				remark : remark
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
})