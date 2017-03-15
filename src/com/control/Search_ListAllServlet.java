package com.control;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;

import com.beans.WoodBean;
import com.beans.WoodDAO;

public class Search_ListAllServlet extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		WoodDAO woodDAO = new WoodDAO();
		System.out.println("成功进入Servlet_SearchAndList");
		
		String sql = (String)request.getParameter("sql");
		System.out.println(sql);
		
		try {
			ArrayList<WoodBean> results = woodDAO.searchAndListAll(sql);
			response.setContentType("text/html;charset=GBK");
			PrintWriter out = response.getWriter();
			
			out.println(new JSONArray(results));
			
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
