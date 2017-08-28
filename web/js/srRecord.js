var loading,pageSize = 10,totalPage,page = 1;
var dataList = {};
$(function(){
	dataList.page = 1;
	dataList.pageSize = 10;
	queryList(dataList);
	
	$("#bz").on("focus",function(){
		weui.actionSheet([{
			label: '钢筋班组',
			onClick: function() {
				$("#bz").val("钢筋班组");
				dataList.workType = "钢筋班组";
				queryList(dataList);
			}
		}, {
			label: '混泥土班组',
			onClick: function() {
				$("#bz").val("混泥土班组");
				dataList.workType = "混泥土班组";
				queryList(dataList);
			}
		}, {
			label: '模板班组',
			onClick: function() {
				$("#bz").val("模板班组");
				dataList.workType = "模板班组";
				queryList(dataList);
			}
		}, {
			label: '土方班组',
			onClick: function() {
				$("#bz").val("土方班组");
				dataList.workType = "土方班组";
				queryList(dataList);
			}
		}, {
			label: '砌筑班组',
			onClick: function() {
				$("#bz").val("砌筑班组");
				dataList.workType = "砌筑班组";
				queryList(dataList);
			}
		}, {
			label: '防水班组',
			onClick: function() {
				$("#bz").val("防水班组");
				dataList.workType = "防水班组";
				queryList(dataList);
			}
		}, {
			label: '给排水班组',
			onClick: function() {
				$("#bz").val("给排水班组");
				dataList.workType = "给排水班组";
				queryList(dataList);
			}
		}, {
			label: '电器班组',
			onClick: function() {
				$("#bz").val("电器班组");
				dataList.workType = "电器班组";
				queryList(dataList);
			}
		}, {
			label: '暖通班组',
			onClick: function() {
				$("#bz").val("暖通班组");
				dataList.workType = "暖通班组";
				queryList(dataList);
			}
		}], [{
			label: '取消',
			onClick: function() {
				console.log('取消');
			}
		}]);
	})
	
	$("#publicUserNameA").on("click",function(e){
		var id = e.currentTarget.dataset.publicUserId;
		localStorage.setItem("id", id);
		location.href = "myInfo.html";
	})
	
	$("#postUserNameA").on("click",function(e){
		var id = e.currentTarget.dataset.postUserId;
		localStorage.setItem("id", id);
		location.href = "myInfo.html";
	})
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$("body").on("click",".msgList",function(e){
		loading = weui.loading('加载中');
		var id = e.currentTarget.dataset.msgid;
		$.ajax({
			url:"msg/select",
			type:"post",
			dataType:"json",
			async:false,
			data:{
				id:id,
				page:page,
				pageSize:pageSize
			},
			success:function(data){
				loading.hide();
				if(data.code==200){
					$("#createTime").text(dateFormat(data.data[0].create_time));
					$("#publicUserName").text(data.data[0].real_name);
					$("#publicUserName").parents("a")[0].dataset.publicUserId = e.currentTarget.dataset.publicuserid;
					$("#postUserName").text(e.currentTarget.dataset.postusername);
					$("#postUserName").parents("a")[0].dataset.postUserId = e.currentTarget.dataset.postuserid;
					$("#workType").text(data.data[0].work_type);
					$("#address").text(data.data[0].address);
					$("#price").text(data.data[0].price);
					$("#contact").text(data.data[0].contact);
					$("#workTime").text(dateFormat(data.data[0].work_time));
					$("#postTime").text(e.currentTarget.dataset.posttime);
					$("#remark").text(data.data[0].remark == null ? "无" : data.data[0].remark);
				}else{
					weui.alert(data.message);
				}
			},
			error:function(){
				loading.hide();
				weui.alert("网络异常！");
			}
		})
		$(".popview").show();
	});
	
	$(".popview").on("click",function(e){
		if(this==e.target){
			$(this).hide();
		}
	})
	
	$("#date").on("focus",function(){
		var date = new Date();
		weui.datePicker({
		    start: 2017,
		    end: new Date(),
		    defaultValue: [date.getFullYear(), date.getMonth()+1, date.getDate()],
		    onChange: function(result){
//		        console.log(result[0].value +"-"+ result[1].value +"-"+ result[2].value);
		    },
		    onConfirm: function(result){
		        console.log(result[0].value +"-"+ result[1].value +"-"+ result[2].value);
		        $("#date").val(result[0].value +"-"+ result[1].value +"-"+ result[2].value);
		        dataList.postTime = result[0].value +"-"+ result[1].value +"-"+ result[2].value;
		        queryList(dataList);
		    },
		    id: 'datePicker'
		});
	})
	
	$('.count-wrapper').dropload({
		scrollArea: $(".count-wrapper"),
		autoLoad: true,
		loadUpFn: function(me) {
			queryList(dataList);
			me.resetload();
		},
		loadDownFn: function(me) {
			if(page < totalPage) {
				dataList.page = ++page;
				queryList(dataList);
			} else {
				me.noData();
			}
			me.resetload();
		}
	});
});

function queryList(data){
	loading = weui.loading('加载中');
	$.ajax({
		url:"mbi/list",
		type:"post",
		dataType:"json",
		data:data,
		success:function(data){
			loading.hide();
			if(data.code==200){
				totalPage = data.total;
				$(".listview").children("a").remove();
				for (var i = 0; i < data.data.length; i++) {
					var a = '<a class="weui-cell weui-cell_access msgList" id="'+data.data[i].id+'" data-msgId="'+data.data[i].msg_id+'" data-publicUserId="'+data.data[i].public_user_id+'" data-postUserId="'+data.data[i].post_user_id+'" data-postUserName="'+data.data[i].post_user_name+'" data-postTime="'+dateFormatYMD(data.data[i].post_time)+'" href="javascript:;">'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<div class="weui-cell__bd" style="text-align: center;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;">'+
					                    '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>班组：'+data.data[i].work_type+'</p>'+
						                '</div>'+
						                '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>发布人：'+data.data[i].public_user_name+'</p>'+
						                '</div>'+
					                '</div>'+
					                '<div class="weui-cell__bd" style="text-align: center;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center;">'+
					                    '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>投递人：'+data.data[i].post_user_name+'</p>'+
						                '</div>'+
						                '<div class="weui-cell__bd" style="text-align: center;">'+
						                    '<p>时间：'+dateFormatYMD(data.data[i].post_time)+'</p>'+
						                '</div>'+
					                '</div>'+
				                '</div>'+
				            '</a>'
					$(".listview").append(a);
					localStorage.setItem(data.data[i].id+"record",JSON.stringify(data.data[i]));
				}
	            
			}else{
				weui.alert(data.message);
			}
		},
		error:function(){
			loading.hide();
			weui.alert("网络异常！");
		}
	})
}