package com.beans;

public class WoodBean {
	private Integer wood_no;
	private String wood_name;
	private String wood_latin;
	private String wood_origin;
	private String wood_air_dry_density;
	private String wood_common_name;
	
	public WoodBean() {
		
	}
	public WoodBean(String name, String latin, String origin, String density, String commonName) {
		this.setWood_name(name);
		this.setWood_latin(latin);
		this.setWood_origin(origin);
		this.setWood_air_dry_density(density);
		this.setWood_common_name(commonName);
	}
	public Integer getWood_no() {
		return wood_no;
	}
	public void setWood_no(Integer wood_no) {
		this.wood_no = wood_no;
	}
	public String getWood_name() {
		return wood_name;
	}
	public void setWood_name(String wood_name) {
		this.wood_name = wood_name;
	}
	public String getWood_latin() {
		return wood_latin;
	}
	public void setWood_latin(String wood_latin) {
		this.wood_latin = wood_latin;
	}
	public String getWood_origin() {
		return wood_origin;
	}
	public void setWood_origin(String wood_origin) {
		this.wood_origin = wood_origin;
	}
	public String getWood_air_dry_density() {
		return wood_air_dry_density;
	}
	public void setWood_air_dry_density(String wood_air_dry_density) {
		this.wood_air_dry_density = wood_air_dry_density;
	}
	public String getWood_common_name() {
		return wood_common_name;
	}
	public void setWood_common_name(String wood_common_name) {
		this.wood_common_name = wood_common_name;
	}
	
	
	
}
