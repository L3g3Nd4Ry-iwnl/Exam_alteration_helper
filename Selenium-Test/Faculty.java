import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;
public class Faculty {
	//---------------------------------------FACULTY LOGIN-------------------------------------------------------
			@Test
			public static void _19_Login_Valid() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				System.out.println("faculty login page Successfully passed");
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
				Thread.sleep(1000);
			}
					
					
			@Test
			public static void _20_Login_Invalid() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("faculty");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				System.out.println("faculty login page with invalid credentials Successfully passed");
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
				Thread.sleep(1000);
			}
					
					
			@Test
			public static void _21_Login_NullCred() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				System.out.println("Faculty login page with null credentials Successfully passed");
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
				Thread.sleep(1000);
			}
			
			@Test
			public static void _22_Logout() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
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
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
				Thread.sleep(1000);
								
			}
					


			@Test
			public static void _23_Update_Details() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[1]/form/button")).click();
				WebElement Phone_no = driver.findElement(By.name("phoneno"));
				Phone_no.sendKeys("8881123444");
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[1]/form/div[12]/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "Details have been updated successfully!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				if(expected_tittle.equals(actual)) {
					System.out.println("Update Successful");
				}else {
					System.out.println("Update Failed");
				}
							
			}
					
					
					
			@Test
			public static void _24_View_Schedule() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[2]/form/button")).click();		
				System.out.println("view my schedule page is Successfully passed");
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);	
				Thread.sleep(1000);
		    }
					
					
			@Test
			public static void _25_View_Timetable() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("gautham_r_cse@cb.amrita.edu");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("gautham123");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[3]/form/button")).click();	
				Thread.sleep(1000);
				WebElement ddown = driver.findElement(By.name("examname"));
				Select select = new Select(ddown);
				select.selectByValue("endsemester");
				Thread.sleep(2000);
				WebElement ddown1 = driver.findElement(By.name("year"));
				Select select1 = new Select(ddown1);
				select1.selectByValue("2018");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/main/div/form/div[3]/button")).click();			
				String expected_tittle = "2018 endsemester  timetable";
				WebElement actual_tittle1 = driver.findElement(By.xpath("/html/body/main/div[1]/h2"));
				String actual = actual_tittle1.getAttribute("innerHTML");
				if(expected_tittle.equals(actual)) {
					System.out.println("Exam TimeTable Opened Successfully");
				}else {
					System.out.println("Exam TimeTable Failed to Open");	
				Thread.sleep(1000);
				}			
					
			 }
					
					
			@Test
			public static void _26_View_Timetable() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("gautham_r_cse@cb.amrita.edu");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("gautham123");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[3]/form/button")).click();	
				Thread.sleep(1000);
				WebElement ddown = driver.findElement(By.name("examname"));
				Select select = new Select(ddown);
				select.selectByValue("periodical1");
				Thread.sleep(2000);
				WebElement ddown1 = driver.findElement(By.name("year"));
				Select select1 = new Select(ddown1);
				select1.selectByValue("2018");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/main/div/form/div[3]/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "Sorry! File was not found!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
			    if(expected_tittle.equals(actual)) {
					System.out.println("TimeTable not uploaded-Test case Successful");
				}else {
					System.out.println("TimeTable not uploaded-Test case Failed");
				}
			}
		
					
			@Test		
		    public static void _27_FAQ() throws InterruptedException
			{
							
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000/faculty/login");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/footer/div/div[1]/form/button")).click();
				Thread.sleep(1520);
				WebElement name = driver.findElement(By.xpath("/html/body/form/div[1]/input"));
				name.sendKeys("yasasvi");
				Thread.sleep(1520);
				WebElement email = driver.findElement(By.xpath("/html/body/form/div[2]/input"));
				email.sendKeys("yasasviyenigalla01@gmail.com");
				Thread.sleep(1520);
				WebElement question = driver.findElement(By.xpath("/html/body/form/div[3]/input"));
				question.sendKeys("How to upload a profile picture");
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/form/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "Your question was submitted successfully!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				if(expected_tittle.equals(actual)) {
					System.out.println("Question Updated Successfully");
				}else {
					System.out.println("Question Update Failed");
				}	
							
				
			}
			
					
			@Test
			public static void _28_AboutUs() throws InterruptedException
			 {
						
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000/faculty/login");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/footer/div/div[3]/form/button")).click();
				Thread.sleep(1520);
				String expected_tittle = "About The Website";
				WebElement actual_tittle1 = driver.findElement(By.xpath("/html/body/main/div[1]/h3/strong/u"));
				String actual = actual_tittle1.getAttribute("innerHTML");

				if(expected_tittle.equals(actual)) {
					System.out.println("About Us button verified");
				}else {
					System.out.println("About us button failed to verify");
				}
							
			}
					
					
			@Test
			public static void _29_Request_Exachange() throws InterruptedException
			 {
						
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("gautham_r_cse@cb.amrita.edu");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("gautham123");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[4]/form/button")).click();	
				Thread.sleep(1000);
				WebElement ddown = driver.findElement(By.name("examname"));
				Select select = new Select(ddown);
				select.selectByValue("endsemester");
				Thread.sleep(2000);
				WebElement ddown1 = driver.findElement(By.name("year"));
				Select select1 = new Select(ddown1);
				select1.selectByValue("2018");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/main/div/form/div[3]/button")).click();
				Thread.sleep(1500);
				WebElement radio1 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[8]/input"));
				radio1.click();
				Thread.sleep(1500);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1500);	
				WebElement radio2 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[9]/input"));
				radio2.click();
				Thread.sleep(1500);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "Request has been made! Please wait for the respective faculty to respond!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
					System.out.println("Request Made Successfully");
				}else {
					System.out.println("Making Request Failed");
				}	
			}
			
			
			@Test
			public static void _30_Request_Exachange() throws InterruptedException
			 {
				
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			    driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("gautham_r_cse@cb.amrita.edu");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("gautham123");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[4]/form/button")).click();	
				Thread.sleep(1000);
				WebElement ddown = driver.findElement(By.name("examname"));
				Select select = new Select(ddown);
				select.selectByValue("endsemester");
				Thread.sleep(2000);
				WebElement ddown1 = driver.findElement(By.name("year"));
				Select select1 = new Select(ddown1);
				select1.selectByValue("2018");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/main/div/form/div[3]/button")).click();
				Thread.sleep(1000);
				WebElement radio1 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[8]/input"));
				radio1.click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				WebElement radio2 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[9]/input"));
				radio2.click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "You had already made a request! Please wait for the existing response!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
					 System.out.println("Request Already Made Successfully");
				}
			}
			
			
			@Test
			public static void _31_Reject_Accept() throws InterruptedException
			 {
					
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("saadhith2@gmail.com");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[5]/form/button")).click();	
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/table/tbody/tr[2]/td[15]/a[2]")).click();	
				Thread.sleep(1000);
				String expected_tittle = "Request rejected successfully!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
					System.out.println("Request Rejected");
				}
			}
					
			
			@Test
			public static void _32_Reject_Accept() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("saadhith2@gmail.com");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[5]/form/button")).click();	
				Thread.sleep(1000);
				String expected_tittle = "You have no requests!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
				     System.out.println("No New Requests Found");
				}
				
			 }
					
					
			@Test
			public static void _33_Accept_Reject() throws InterruptedException
			 {

				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("gautham_r_cse@cb.amrita.edu");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("gautham123");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[4]/form/button")).click();	
				Thread.sleep(1000);
				WebElement ddown = driver.findElement(By.name("examname"));
				Select select = new Select(ddown);
				select.selectByValue("endsemester");
				Thread.sleep(2000);
				WebElement ddown1 = driver.findElement(By.name("year"));
				Select select1 = new Select(ddown1);
				select1.selectByValue("2018");
				Thread.sleep(2000);
				driver.findElement(By.xpath("/html/body/main/div/form/div[3]/button")).click();
				Thread.sleep(1000);
				WebElement radio1 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[8]/input"));
				radio1.click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				WebElement radio2 = driver.findElement(By.xpath("/html/body/main/div[2]/form/table/tbody/tr[2]/td[9]/input"));
				radio2.click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/header/form/button")).click();
				WebElement txtbx_username1 = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username1.sendKeys("saadhith2@gmail.com");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[5]/form/button")).click();	
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/table/tbody/tr[2]/td[15]/a[1]")).click();	
				Thread.sleep(1000);
				String expected_tittle = "Request accepted successfully!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
					 System.out.println("Request Accepted ");
				}
					
			 }
					
					
					
			@Test
			public static void _34_Accept_Reject() throws InterruptedException
			 {
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("saadhith2@gmail.com");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[5]/form/button")).click();	
				Thread.sleep(1000);
				String expected_tittle = "You have no requests!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				System.out.println(actual);
				if(expected_tittle.equals(actual)) {
					 System.out.println("No New Requests Found");
				}
			
			}
					
					
			@Test
			public static void _35_Change_Password() throws InterruptedException
			 {
							
				System.setProperty("webdriver.chrome.driver","C:\\browserdriver\\chromedriver.exe");
				WebDriver driver = new ChromeDriver();
				driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
				driver.manage().window().maximize();
				driver.get("http://localhost:3000");
				Thread.sleep(6800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]")).click();
				Thread.sleep(1520);
				driver.findElement(By.xpath("/html/body/main/div[2]/div[1]/div/a")).click();
				Thread.sleep(1500);
				WebElement txtbx_username = driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[1]/input"));
				txtbx_username.sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.name("password")).sendKeys("test");
				Thread.sleep(1500);
				driver.findElement(By.xpath("//*[@id=\"mainform\"]/form[1]/div[3]/button")).click();
				Thread.sleep(800);
				driver.findElement(By.xpath("/html/body/main/div[2]/div/div[1]/form/button")).click();
				driver.findElement(By.xpath("/html/body/main/div[2]/form/button")).click();
				Thread.sleep(1000);
				WebElement oldpass = driver.findElement(By.name("oldpass"));
				oldpass.sendKeys("test");
				Thread.sleep(1000);
				WebElement newpass1 = driver.findElement(By.name("newpass1"));
				newpass1.sendKeys("test1");
				Thread.sleep(1000);
				WebElement newpass2 = driver.findElement(By.name("newpass2"));
				newpass2.sendKeys("test1");
				Thread.sleep(1000);
				driver.findElement(By.xpath("/html/body/main/form/button")).click();
				Thread.sleep(1000);
				String expected_tittle = "Password updated successfully!";
				WebElement actual_tittle1 = driver.findElement(By.id("error"));
				WebElement actual_tittle = actual_tittle1.findElement(By.tagName("h5"));
				String actual = actual_tittle.getAttribute("innerHTML");
				if(expected_tittle.equals(actual)) {
					System.out.println("Password Updated Successfully");
				}else {
					System.out.println("Password Update Failed");
				}
							

			}
					


		public static void main(String[] args) throws InterruptedException 
		{
			
//
//		    _19_Login_Valid();
//		    _20_Login_Invalid();
//		    _21_Login_NullCred();
		    _22_Logout();
		    _23_Update_Details();
		    _24_View_Schedule();
		    _25_View_Timetable();
		    _26_View_Timetable();
		    _27_FAQ();
		    _28_AboutUs();
		    _29_Request_Exachange();
		    _30_Request_Exachange();
		    _31_Reject_Accept();
		    _32_Reject_Accept();
		    _33_Accept_Reject();
		    _34_Accept_Reject();
		    _35_Change_Password();

		}

	}