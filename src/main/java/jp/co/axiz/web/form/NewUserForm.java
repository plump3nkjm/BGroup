package jp.co.axiz.web.form;

public class NewUserForm {

	private String name;
	private String pass;
	private String repass;
	private String id;
	public String getId() {
		return id;
	}

	public void clear(){
		this.name="";
		this.id="";
		this.pass="";
		this.repass="";
	}
	public void setId(String id) {
		this.id = id;
	}

	public NewUserForm(){
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getRepass() {
		return repass;
	}

	public void setRepass(String repass) {
		this.repass = repass;
	}



}
