var loading,pageSize = 10,totalPage,page = 1;
var dataList = {};
$(function(){
	dataList.page = page;
	dataList.pageSize = pageSize;
	
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
		        dataList.createTime =  result[0].value +"-"+ result[1].value +"-"+ result[2].value;
		        queryList(dataList);
		    },
		    id: 'datePicker'
		});
	})
	
	$(".mui-action-back").on("click",function(){
		history.back();
	});
	
	$("body").on("click",".jobList",function(e){
		var id = e.currentTarget.id;
		localStorage.setItem("jobId",id);
		location.href = "jobInfo.html";
	});
	
	
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
	
})

function queryList(data){
	loading = weui.loading('加载中');
	$.ajax({
		url:"msg/select",
		type:"post",
		dataType:"json",
		data:data,
		success:function(data){
			loading.hide();
			if(data.code==200){
				totalPage = data.total;
				$(".listview").children("a").remove();
				for (var i = 0; i < data.data.length; i++) {
					var a = '<a class="weui-cell weui-cell_access jobList" id="'+data.data[i].id+'" href="javascript:;">'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+data.data[i].work_type+'</p>'+
				                '</div>'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+data.data[i].real_name+'</p>'+
				                '</div>'+
				                '<div class="weui-cell__bd" style="text-align: center;">'+
				                    '<p>'+dateFormatYMD(data.data[i].create_time)+'</p>'+
				                '</div>'+
				            '</a>'
					$(".listview").append(a);
					localStorage.setItem(data.data[i].id,JSON.stringify(data.data[i]));
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
