$(function() {
	InitLeftMenu();
})
var xmlrequest;

// 完成XMLHttpRequest对象的初始化
function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		// DOM 2浏览器
		xmlrequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		// IE浏览器
		try {
			xmlrequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlrequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}
}
function initXMLHttpRequest(uri, func) {
	// 初始化XMLHttpRequest对象
	createXMLHttpRequest();
	// 设置处理响应的回调函数
	xmlrequest.onreadystatechange = func;
	// 设置以POST方式发送请求，并打开连接
	xmlrequest.open("POST", uri, true);
	// 设置POST请求的请求头
	xmlrequest.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
}
// 定义处理响应的回调函数
function processResponse_List() {
	// 响应完成且响应正常
	if (xmlrequest.readyState == 4) {
		if (xmlrequest.status == 200) {
			// 获取服务器的JSON响应
			// 并调用eval()函数将服务器响应解析成JavaScript数组
			// alert("OK");
			var woods = eval(xmlrequest.responseText);
			showWoodInfo(woods);
		} else {
			// 页面不正常
			window.alert("您所请求的页面有异常。");
		}
	}
}
function processResponse_Add() {
	// 响应完成且响应正常
	if (xmlrequest.readyState == 4) {
		if (xmlrequest.status == 200) {
			// 获取服务器的JSON响应
			// 并调用eval()函数将服务器响应解析成JavaScript数组
			// alert("OK");
			// var status = eval(xmlrequest.responseText);
			// alert(status);
			add_after();
		} else {
			// 页面不正常
			window.alert("您所请求的页面有异常。");
		}
	}
}
function processResponse_Edit() {
	// 响应完成且响应正常
	if (xmlrequest.readyState == 4) {
		if (xmlrequest.status == 200) {
			// 获取服务器的JSON响应
			// 并调用eval()函数将服务器响应解析成JavaScript数组
			// alert("OK");
			// var status = eval(xmlrequest.responseText);
			// alert(status);
			update_after();
		} else {
			// 页面不正常
			window.alert("您所请求的页面有异常。");
		}
	}
}
function processResponse_Del() {
	// 响应完成且响应正常
	if (xmlrequest.readyState == 4) {
		if (xmlrequest.status == 200) {
			// 获取服务器的JSON响应
			// 并调用eval()函数将服务器响应解析成JavaScript数组
			// alert("OK");
			// var status = eval(xmlrequest.responseText);
			// alert(status);
			delete_after();
		} else {
			// 页面不正常
			window.alert("您所请求的页面有异常。");
		}
	}
}

function getWoodInfo() {
	var listallsql = "select * from woods";
	// 设置请求响应的URI
	var uri = "../executeSearchAndList.do"
	initXMLHttpRequest(uri, processResponse_List);
	// 发送请求
	xmlrequest.send("sql=" + listallsql);
}

function _add(newWood) {
	var addsql = "insert into woods(wood_name, wood_latin, wood_origin, wood_air_dry_density, wood_common_name)"
			+ " values('"
			+ newWood.wood_name
			+ "','"
			+ newWood.wood_latin
			+ "','"
			+ newWood.wood_origin
			+ "','"
			+ newWood.wood_air_dry_density
			+ "','"
			+ newWood.wood_common_name
			+ "');";
	alert(addsql);
	var uri = "../executeInsUpdAndDel.do"
	initXMLHttpRequest(uri, processResponse_Add);
	// 发送请求
	xmlrequest.send("sql=" + addsql);
}
/**
 * 删除
 */
function _delete(no) {
	var delsql = "delete from woods where wood_no = " + no;

	alert(delsql);
	var uri = "../executeInsUpdAndDel.do"
	initXMLHttpRequest(uri, processResponse_Del);
	// 发送请求
	xmlrequest.send("sql=" + delsql);
}

function _update(no, newWood) {
	var editsql = "update woods set" + " wood_name = '" + newWood.wood_name
			+ "', wood_latin = '" + newWood.wood_latin + "',wood_origin = '"
			+ newWood.wood_origin + "',wood_air_dry_density = '"
			+ newWood.wood_air_dry_density + "',wood_common_name = '"
			+ newWood.wood_common_name + "' where wood_no = " + no;
	alert(editsql);
	var uri = "../executeInsUpdAndDel.do"
	initXMLHttpRequest(uri, processResponse_Edit);
	// 发送请求
	xmlrequest.send("sql=" + editsql);
}
function searchWood(value, name) {
	var searchsql = "select * from woods where " + name + " like '%25" + value + "%25'";
	alert(searchsql);
	var uri = "../executeSearchAndList.do"
	initXMLHttpRequest(uri, processResponse_List);
	// 发送请求
	xmlrequest.send("sql=" + searchsql);
}

function showWoodInfo(data) {
	if (data == null || data.length == 0)
		errorMassage('无结果');
	var obj = {
		'total' : data.length,
		'rows' : data
	};
	$('#dg').datagrid('loadData', obj);
}

/**
 * 添加成功，返回 id
 * 
 * @param data
 */
function add_after() {
	// debugger;
	// alert(data.msg);
	addBottomFont('添加', info);
	getWoodInfo();

}

/**
 * 修改成功
 * 
 * @param data
 */
function update_after() {

	addBottomFont('编辑', info);
	getWoodInfo();

}

/**
 * 修改成功
 * 
 * @param data
 */
function delete_after() {
	getWoodInfo();

}
function disptime() {
	var today = new Date(); // 获得当前时间
	var hh = today.getHours(); // 获得小时、分钟、秒
	var mm = today.getMinutes();
	var ss = today.getSeconds();

	document.getElementById("time").innerHTML = "北京时间:" + hh + ":" + mm + ":"
			+ ss;

	var myTime = setTimeout("disptime()", 1000);
}
function InitLeftMenu() {

	var _menus = {
		"menus" : [ {
			"menuid" : "1",
			"icon" : "icon-menu",
			"menuname" : "数据操作",
			"menus" : [ {
				"menuid" : "12",
				"menuname" : "欢迎使用",
				"icon" : "icon-tip",
				"url" : "welcome.html"
			}, {
				"menuid" : "13",
				"menuname" : "图片样本",
				"icon" : "icon-filter",
				"url" : "pictures.html"
			},

			]
		}, {
			"menuid" : "2",
			"icon" : "icon-menu",
			"menuname" : "帮助",
			"menus" : [ {
				"menuid" : "21",
				"menuname" : "使用指南",
				"icon" : "icon-lock",
				"url" : "help.html"
			}, {
				"menuid" : "22",
				"menuname" : "存在问题",
				"icon" : "icon-more",
				"url" : "problem.html"
			} ]
		} ]
	};

	$("#nav").accordion({
		animate : false
	});// 为id为nav的div增加手风琴效果，并去除动态滑动效果
	$.each(_menus.menus, function(i, n) {// $.each 遍历_menu中的元素
		var menulist = '';
		menulist += '<ul>';
		$.each(n.menus, function(j, o) {
			menulist += '<li><div><a class = "lmenu" ref="' + o.menuid
					+ '" href="#" rel="' + o.url + '" ><span class="icon '
					+ o.icon
					+ '" >&nbsp&nbsp&nbsp&nbsp&nbsp</span><span class="nav">'
					+ o.menuname + '</span></a></div></li> ';
		})

		menulist += '</ul>';

		$('#nav').accordion('add', {
			title : n.menuname,
			content : menulist,
			iconCls : 'icon ' + n.icon
		});

	});

	$('.easyui-accordion li a').click(function() {// 当单击菜单某个选项时，在右边出现对用的内容
		var tabTitle = $(this).children('.nav').text();// 获取超链里span中的内容作为新打开tab的标题

		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");// 获取超链接属性中ref中的内容

		addTab(tabTitle, url);// 增加tab
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	})

}

function addTab(subtitle, url) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(subtitle, url),
			closable : true,
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		$('#mm-tabupdate').click();
	}

}

function createFrame(name, url) {
	// alert(url);
	var s = '<iframe name = "' + name
			+ '" scrolling="auto" frameborder="0"  src="' + url
			+ '" style="width:100%;height:100%;"></iframe>';
	// alert(s);
	return s;
}
