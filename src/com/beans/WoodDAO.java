package com.beans;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.naming.java.javaURLContextFactory;
import org.apache.tomcat.dbcp.dbcp2.PStmtKey;

public class WoodDAO {

	public WoodDAO() {

	}

	public static Connection getConnection() throws ClassNotFoundException,
			SQLException {
		String driverName = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql:///wooddb";
		String userName = "root";
		String password = "201430320231sjk";
		Class.forName(driverName);
		Connection con = DriverManager.getConnection(url, userName, password);
		return con;
	}

	public int ins_upd_delWood(String sql) throws SQLException,
			ClassNotFoundException {
		Connection conn = null;
		java.sql.Statement stmt = null;
		conn = WoodDAO.getConnection();
		stmt = conn.createStatement();
		boolean isSuccess = stmt.execute(sql);
		return isSuccess == true ? 1 : 0;
	}

	
	public ArrayList<WoodBean> searchAndListAll(String sql) throws SQLException,
			ClassNotFoundException {
		Connection conn = null;
		java.sql.Statement stmt = null;
		ResultSet rst = null;

		conn = WoodDAO.getConnection();
		stmt = conn.createStatement();

		ArrayList<WoodBean> list = new ArrayList<WoodBean>();
		rst = stmt.executeQuery(sql);
		WoodBean wood;
		while (rst.next()) {
			wood = new WoodBean(rst.getString(2), rst.getString(3),
					rst.getString(4), rst.getString(5), rst.getString(6));
			wood.setWood_no(rst.getInt(1));
			list.add(wood);
			// System.out.println(user.getName());
		}
		return list;
	}
}
