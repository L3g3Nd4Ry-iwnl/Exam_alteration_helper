import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;
public class Dean_Admin {
	
	//--------------dean login----------------
		@Test
		public static void _01_Login_Valid() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			System.out.println("dean login page Successfully passed");
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
			Thread.sleep(1000);		
		}
		
		
		@Test
		public static void _02_Login_Invalid() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			System.out.println("dean login page with invalid credentials Successfully passed");
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
			Thread.sleep(1000);		
		}
		
		
		@Test
		public static void _03_Login_Null_Cred() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			System.out.println("dean login page with null credentials Successfully passed");
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
			Thread.sleep(1000);		
		}
		
		
		@Test
		public static void _04_Logout() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/header/form/button")).click();
			String expected_tittle = "You have been logged out successfully!";
			WebElement actual_tittle1 = driver.findElement(By.xpath("/html/body/main/div/div[2]/strong"));
			String actual = actual_tittle1.getAttribute("innerHTML");
	 		if(expected_tittle.equals(actual)) {
				System.out.println("Logout Successful");
			}else {
				System.out.println("Logout Failed");
			}
	
		}
		
		@Test
		public static void _05_View_Faculty() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[1]/form/button")).click();
			Thread.sleep(1500);
			System.out.println("Faculty Details Page Opened Successgully");
			
		}
		
		
		@Test
		public static void _06_View_Exam_TimeTable() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[2]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("endsemester");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2018");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("branch"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("btech");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			System.out.println("TimeTable Opened Successfully");
			
		}
		
		
		@Test
		public static void _07_View_Exam_TimeTable() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[2]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("periodical2");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2020");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("branch"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("english");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			System.out.println("Time Table wasn't Uploaded");
			
		}
		
		
		@Test
		public static void _08_View_Hall_Allotment() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[3]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("dean_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[3]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("endsemester");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2018");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("department"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("cse");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			System.out.println("Hall Allotment File Opened Successfully");
			
		}
//	----------------------------------ADMIN LOGIN-------------------------------------------------	
		
		@Test
		public static void _09_login_success() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			System.out.println("admin login page Successfully passed");
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
			Thread.sleep(1000);		
		}
		
		
		@Test
		public static void _10_Login_Invalid() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			System.out.println("admin login page with invalid credentials Successfully passed");
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
			Thread.sleep(1000);		
		}
		
		
		
		@Test
		public static void _11_Add_User() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[1]/form/button")).click();
			Thread.sleep(1500);
			WebElement email = driver.findElement(By.name("email"));
			email.sendKeys("yasasvi_7@gmail.com");
			Thread.sleep(1000);
			WebElement name = driver.findElement(By.name("name"));
			name.sendKeys("Yasasvi Y");
			Thread.sleep(1000);
			WebElement Phone_no = driver.findElement(By.name("phoneno"));
			Phone_no.sendKeys("8881123444");
			Thread.sleep(1000);
			WebElement houseno = driver.findElement(By.name("houseno"));
			houseno.sendKeys("88");
			Thread.sleep(1000);
			WebElement streetname = driver.findElement(By.name("streetname"));
			streetname.sendKeys("Kottagudem");
			Thread.sleep(1000);
			WebElement area = driver.findElement(By.name("area"));
			area.sendKeys("tanuku");
			Thread.sleep(1000);
			WebElement ddown = driver.findElement(By.name("state"));
			Select select = new Select(ddown);
			select.selectByValue("Andhra Pradesh");
			Thread.sleep(2000);
			WebElement city = driver.findElement(By.name("city"));
			city.sendKeys("tanuku");
			Thread.sleep(1000);
			WebElement department = driver.findElement(By.name("dept"));
			department.sendKeys("CSE");
			Thread.sleep(1000);
			WebElement password = driver.findElement(By.name("pwd"));
			password.sendKeys("test");
			Thread.sleep(1000);
			WebElement file = driver.findElement(By.xpath("/html/body/main/div[2]/form/div[11]/input"));
			String filepath = "C:\\Users\\yasasvi\\Desktop\\CB.EN.U4CSE18168.pdf";
			file.sendKeys(filepath);
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/form/div[13]/button[1]")).click();
			Thread.sleep(1500);
		}	
		
		@Test
		public static void _12_User_Deletion() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[2]/form/button")).click();
			Thread.sleep(1500);
			WebElement email = driver.findElement(By.xpath("/html/body/main/div[1]/form/div[2]/input"));
			email.sendKeys("yasasvi_6@gmail.com");
			Thread.sleep(1000);
			driver.findElement(By.xpath("/html/body/main/div[1]/form/div[3]/button")).click();
			Thread.sleep(1000);
			String expected_tittle = "User has been deleted successfully!";
			WebElement actual_tittle1 = driver.findElement(By.id("error"));
			WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
			String actual = actual_tittle.getAttribute("innerHTML");

	 		if(expected_tittle.equals(actual)) {
				System.out.println("User Deleted Successfully");
			}else {
				System.out.println("User Deletion Failed");
			}
			
		}
		
		
		@Test
		public static void _13_Upload_New_TimeTable() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[3]/form/button")).click();
			Thread.sleep(1500);
			
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("periodical2");
			Thread.sleep(1500);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2019");
			Thread.sleep(1500);
			WebElement ddown2 = driver.findElement(By.name("branch"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("english");
			Thread.sleep(1500);
			
			WebElement file = driver.findElement(By.xpath("/html/body/main/div/form/div[4]/input"));
			String filepath = "C:\\Users\\yasasvi\\Desktop\\B.Tech 2018 & 2019 End Semester Schedule.pdf";
			file.sendKeys(filepath);
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div/form/div[5]/button")).click();
			Thread.sleep(1500);
		
			String expected_tittle = "File uploaded successfully!";
			WebElement actual_tittle1 = driver.findElement(By.id("error"));
			WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
			String actual = actual_tittle.getAttribute("innerHTML");
	 		if(expected_tittle.equals(actual)) {
				System.out.println("File Uploaded");
			}

				
		}
		
		
		@Test
		public static void _14_New_FAQ() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[5]/form/button")).click();
			Thread.sleep(1500);
			System.out.println("New FAQ's Page Opened Successfully");
			
		}
		
		
		@Test
		public static void _15_Download_Hall_Allotment() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[6]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("endsemester");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2018");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("department"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("cse");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			Thread.sleep(1500);
			System.out.println("Downloaded Successfully");
			
		}
		
		
		@Test
		public static void _16_Download_Hall_Allotment_F() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[6]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("periodical2");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2019");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("department"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("cse");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			Thread.sleep(1500);
			System.out.println("Download Failed-File Doesn't Exist");
			
		}
		
		
		@Test
		public static void _17_Delete_Hall_Allotment() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[7]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("endsemester");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2018");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("department"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("cse");
			Thread.sleep(2000);
			driver.findElement(By.xpath("/html/body/main/div/form/div[4]/button")).click();
			Thread.sleep(1500);
			System.out.println("Deleted Successfully");
			
		}
		
		@Test
		public static void _18_Upload_New_HallAllotment() throws InterruptedException
		{
			System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
			WebDriver driver = new ChromeDriver();
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			driver.manage().window().maximize();
			driver.get("http://localhost:3000");
			Thread.sleep(6800);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]")).click();
			Thread.sleep(1520);
			driver.findElement(By.xpath("/html/body/main/div[2]/div[2]/div/a")).click();
			Thread.sleep(1500);
			WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/div[1]/input"));
			txtbx_username.sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.name("password")).sendKeys("admin_amrita");
			Thread.sleep(1500);
			driver.findElement(By.xpath("//*[@id=\"mainform\"]/form/button")).click();
			Thread.sleep(1500);
			driver.findElement(By.xpath("/html/body/main/div[2]/div/div[4]/form/button")).click();
			Thread.sleep(1500);
			WebElement ddown = driver.findElement(By.name("examname"));
			Select select = new Select(ddown);
			select.selectByValue("endsemester");
			Thread.sleep(2000);
			WebElement ddown1 = driver.findElement(By.name("year"));
			Select select1 = new Select(ddown1);
			select1.selectByValue("2018");
			Thread.sleep(2000);
			WebElement ddown2 = driver.findElement(By.name("department"));
			Select select2 = new Select(ddown2);
			select2.selectByValue("cse");
			Thread.sleep(2000);
			WebElement file = driver.findElement(By.xpath("/html/body/main/div/form/div[4]/input"));
			String filepath = "C:\\Users\\yasasvi\\Desktop\\2018_endsemester_cse.csv";
			file.sendKeys(filepath);
			Thread.sleep(1500);
			
			driver.findElement(By.xpath("/html/body/main/div/form/div[5]/button")).click();
			Thread.sleep(1500);
			
			System.out.println("Uploaded Successfully");
			
		}	
		



	public static void main(String[] args) throws InterruptedException 
	{
		// TODO Auto-generated method stub
		_01_Login_Valid();
		_02_Login_Invalid();
		_03_Login_Null_Cred();
		_04_Logout();
		_05_View_Faculty();
		_06_View_Exam_TimeTable();
		_07_View_Exam_TimeTable();
	    _08_View_Hall_Allotment();
	    
	    
	    _12_User_Deletion();
	    _13_Upload_New_TimeTable();
	    _14_New_FAQ();
	    _15_Download_Hall_Allotment();
	    _16_Download_Hall_Allotment_F();
	    _17_Delete_Hall_Allotment();
	    _18_Upload_New_HallAllotment();




	}

}
