<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%><%	String path = request.getContextPath();	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()			+ path + "/";%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><base href="<%=basePath%>"><meta http-equiv="pragma" content="no-cache"><meta http-equiv="cache-control" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="keywords" content="keyword1,keyword2,keyword3"><meta http-equiv="description" content="This is my page"></head><body>	 <link type="text/css" rel="stylesheet" href="raty-2.5.2/demo/css/application.css">  <script type="text/javascript" src="raty-2.5.2/demo/js/jquery.min.js"></script>  <script type="text/javascript" src="raty-2.5.2/lib/jquery.raty.min.js"></script></body><div id="star" ></div></br></br><button id='btn'>获取分数</button><script type="text/javascript">	$(function(){		$.fn.raty.defaults.path = 'raty-2.5.2/lib/img';		$('#star').raty({	        half    : false,	        starOff : 'star-off.png',	        starOn  : 'star-on.png',	        starHalf: 'star-half.png',	        score: function() {	            return $(this).attr('data-score');	          },	        click: function(score, evt) {	        	$(this).attr('data-score',score);	        }	      });		$("#btn").click(function(){			var score = $("#star").attr('data-score');			alert(score);		});	});</script></html>