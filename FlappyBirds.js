import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontFormatException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.Timer;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.Scanner;

@SuppressWarnings("serial")
public class FlappyMain extends JFrame {

	static int frameCounter = 0; // needed to make slower the movement
	private static int animationFrame = 0; // number for animation frame 
	private static int blockOneX = 0; 
	private static int blockTwoX = 343;
	private static int blockThreeX = 686;
	private static int blockFourX = 1029;
	
	private static JLabel ground = moveGround(animationFrame);
	
	private static JLabel blockOne = showBlocks(blockOneX);
	private static JLabel blockTwo = showBlocks(blockOneX);
	private static JLabel blockThree = showBlocks(blockOneX);
	private static JLabel blockFour = showBlocks(blockOneX);
	
	private static int playerY = 0; // Player's Y coordinates after initial		
	static int playerX = 50;
	private static boolean isFlying = false;
	private static int flyingHeight = 0;
	private static int currentScore = 0;
	private static int highScore = 0;
	// ::: Alex 20.5.14 
	private static Random rnd = new Random(); // random for pipe y
	
	private static int pipeOneX = 700; // Pipe start X coordinates
	private static int pipeTwoX = 820; // Pipe start X coordinates
	private static int pipeThreeX = 940; // Pipe start X coordinates
	private static int pipeFourX = 1060; // Pipe start X coordinates
	private static int pipeFiveX = 1180; // Pipe start X coordinates
	private static int pipeSixX = 1320; // Pipe start X coordinates
	

	private static int pipeOneY = 0; // pipe y
	private static int pipeTwoY = 0; // pipe y
	private static int pipeThreeY = 0; // pipe y
	private static int pipeFourY = 0; // pipe y
	private static int pipeFiveY = 0; // pipe y
	private static int pipeSixY = 0; // pipe y
	
	private static JLabel pipeOne = showPipes(pipeOneX,pipeOneY);
	private static JLabel pipeTwo = showPipes(pipeTwoX,pipeTwoY);
	private static JLabel pipeThree = showPipes(pipeThreeX,pipeThreeY);
	private static JLabel pipeFour = showPipes(pipeFourX,pipeFourY);
	private static JLabel pipeFive = showPipes(pipeFiveX,pipeFiveY);
	private static JLabel pipeSix = showPipes(pipeSixX,pipeSixY);
	private static ImageIcon icon = new ImageIcon("res/Images/startGame1.jpg");
	private static JLabel imagelabel = new JLabel(icon);
	private static JFrame frame = new JFrame();
	// ::: Alex
	
	private static JLabel player = showPlayer(playerY,animationFrame,isFlying);
	private static JLabel score = showScore(currentScore);
	private static JLabel highScoreLabel = showHighScore(highScore);
	private static JLabel curse = showCurse(playerY);
	//private static JLabel floor = showFloor();
	
	//private static String floorImage = "res/Images/floor.png";
	private static JLabel floor = showFloor();
	
	private static final Timer timer = new Timer(15, null);

	public static void main(String[] args) throws InterruptedException {

		// ::START::Initializing the window

		// ::START:: Set background image
		try {
			frame.setContentPane(new JLabel(
					new ImageIcon(
							ImageIO.read(new File("res/Images/fl2.jpg")))));
		} catch (IOException e) {
			e.printStackTrace();
		}
		// ::END:: Set background image
		frame.setTitle("Flappy Bird - Console Edition");
		frame.setResizable(false);
		frame.setSize(new Dimension(600, 420));
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setForeground(Color.WHITE);
		frame.setLayout(null);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		// ::END::Initializing the window

		// ::START::Declaring and initializing variables		
		frame.requestFocus();
		
		// ::Iliikata:: Start Screen

		imagelabel.setBounds(0, 0, 700, 420);
		frame.add(imagelabel);
		// ::Iliikata::
		
		
		KeyListener listener = new KeyListener() {

			boolean isReleased = true;

			@Override
			public void keyPressed(KeyEvent e) {
				int key = e.getKeyCode();

				if ((key == KeyEvent.VK_SPACE || key == KeyEvent.VK_UP )
						&& isReleased) {
					isReleased = false;
					flyingHeight = 0;
					isFlying = true;
				}
				if (key == KeyEvent.VK_ENTER && !timer.isRunning() && frameCounter == 0) {
					timer.start();
					frame.remove(imagelabel);
				}
				// ::Iliikta:: Close window with ESC
				if (e.getKeyCode() == KeyEvent.VK_ESCAPE) {
					System.exit(0);
				}
				// ::Iliikata::
			}

			@Override
			public void keyReleased(KeyEvent e) {
				isReleased = true;
			}

			@Override
			public void keyTyped(KeyEvent e) {
				//
			}
		};
		frame.addKeyListener(listener);
		frame.pack();
		// ::END::Declaring and initializing variables
	
		// ::: Alex 20.5.14 

		timer.setInitialDelay(0);
		timer.setDelay(15);

		timer.addActionListener(new ActionListener() {
		    public void actionPerformed(ActionEvent evt){
					  
		    	// ::: Jasen 19.5.14 
				frameCounter++;
				animation();	
				// ::: Jasen
				
				// ::: Alex 20.5.14 
				frame.remove(score);
				frame.remove(highScoreLabel);
				frame.remove(player); 
				frame.remove(pipeOne);
				frame.remove(pipeTwo);
				frame.remove(pipeThree);
				frame.remove(pipeFour);
				frame.remove(pipeFive);
				frame.remove(pipeSix);
				frame.remove(ground);
				frame.remove(blockOne);
				frame.remove(blockTwo);
				frame.remove(blockThree);
				frame.remove(blockFour);
				frame.remove(floor);
				// random y for the pipes (proceeded only when the pipe is in 
				// it's start position					
				randomYforPipes();				
				
				// show player
				player = showPlayer(playerY,animationFrame,isFlying);
				highScoreLabel = showHighScore(highScore);
				score = showScore(currentScore);
				ground = moveGround(animationFrame);
				curse = showCurse(playerY);
				//floor = showFloor();
				//show pipes
				showPipes();
				showBlocks();
				// move pipes
				movePipes();
				moveBlocks();
				
				// set pipes at start position, once they go to the end	
				setPipesAtStartPosition();
				
				
				// ::: Masovski 
				// show player & score (on 21/05/2014 05:20
				//player = showPlayer(playerY,animationFrame,isFlying);
				
		
				// ::::::::::::::::::::::::::::::
				
				//calculate and print the score
				getHighScore();
				calcScore();
				frame.add(score);
				frame.add(highScoreLabel);
				frame.add(player); // Print player on screen
				// ::: Masovski/Sisi
				
				setBlocksAtStartPosition();
				// ::: Alex
				
				flightControlLogic();

				//frame.add(player); // Print player on screen
				// ::: Masovski/Sisi

				// ::: Alex 20.5.14 
				frame.add(floor);
				frame.add(ground);
	            frame.add(pipeOne); // Print pipe on screen
	            frame.add(pipeTwo); 
	            frame.add(pipeThree); 
	            frame.add(pipeFour);
	            frame.add(pipeFive); 
	            frame.add(pipeSix); 
	            // ::: Alex
	            // ::: Jasen 20.5.14:::
	            frame.add(blockOne);
	            frame.add(blockTwo);
	            frame.add(blockThree);
	            frame.add(blockFour);
	            // ::: Jasen ::::
	            
	            // if collision, stop the game
	            if (isCollision()) {
	            	frame.remove(player); 
					frame.remove(pipeOne);
					frame.remove(pipeTwo);
					frame.remove(pipeThree);
					frame.remove(pipeFour);
					frame.remove(pipeFive);
					frame.remove(pipeSix);
					frame.remove(ground);
					frame.remove(blockOne);
					frame.remove(blockTwo);
					frame.remove(blockThree);
					frame.remove(blockFour);
					frame.remove(floor);
	            	
	            	player = showPlayer(playerY,animationFrame,isFlying);
	            	frame.add(score);
	            	frame.add(highScoreLabel);
					frame.add(player);
					frame.add(curse);
					frame.add(floor);
					frame.add(ground);
		            frame.add(pipeOne); 
		            frame.add(pipeTwo); 
		            frame.add(pipeThree); 
		            frame.add(pipeFour);
		            frame.add(pipeFive); 
		            frame.add(pipeSix);
		            frame.add(blockOne);
		            frame.add(blockTwo);
		            frame.add(blockThree);
		            frame.add(blockFour);
	            	frame.validate();
	            	frame.repaint();
	            	timer.stop();
				}
	            // ::: Alex
	            
				frame.validate(); // Validates the window
				frame.repaint(); // Repaints the window
			}
		});
	}


	// check if there is a collision with the pipes or the ground
	public static boolean isCollision () {
		int pipeXleft = 80;
		int pipeXright = 130;
		int pipeYuper = 0;
		int pipeYlower = 150;
		int groundLine = 283;
		
		if ((pipeOneX > pipeXleft && pipeOneX < pipeXright && pipeOneY + pipeYuper > playerY) || (pipeOneX > pipeXleft && pipeOneX < pipeXright && pipeOneY + pipeYlower < playerY)){
			return true;
		} else if ((pipeTwoX > pipeXleft && pipeTwoX < pipeXright && pipeTwoY + pipeYuper > playerY) || (pipeTwoX > pipeXleft && pipeTwoX < pipeXright && pipeTwoY + pipeYlower < playerY)) {
			return true;
		} else if ((pipeThreeX > pipeXleft && pipeThreeX < pipeXright && pipeThreeY + pipeYuper > playerY) || (pipeThreeX > pipeXleft && pipeThreeX < pipeXright && pipeThreeY + pipeYlower < playerY)) {
			return true;
		} else if ((pipeFourX > pipeXleft && pipeFourX < pipeXright && pipeFourY + pipeYuper > playerY) || (pipeFourX > pipeXleft && pipeFourX < pipeXright && pipeFourY + pipeYlower < playerY)) {
			return true;
		} else if ((pipeFiveX > pipeXleft && pipeFiveX < pipeXright && pipeFiveY + pipeYuper > playerY) || (pipeFiveX > pipeXleft && pipeFiveX < pipeXright && pipeFiveY + pipeYlower < playerY)) {
			return true;
		} else if ((pipeSixX > pipeXleft && pipeSixX < pipeXright && pipeSixY + pipeYuper > playerY) || (pipeSixX > pipeXleft && pipeSixX < pipeXright && pipeSixY + pipeYlower < playerY)) {
			return true;
		} else if (groundLine < playerY) {
			return true;
		} else {
			return false;
		}
	}
	// ::: Alex
	
	public static JLabel showPlayer(int y, int a, boolean s) {
		// Jasen  19.5.14 12:51 Animation --> added pictures and movement
		String[] playerImagesUp = {"res/Images/bird2UpWingUp.png","res/Images/bird2DownWingUp.png"};
		String[] playerImagesDown = {"res/Images/bird2UpWingDown.png","res/Images/bird2DownWingDown.png"};
		String playerImgCurrent = "";
		// Jasen  19.5.14 12:51 finished
		
		if (isCollision()) {
			playerImgCurrent = "res/Images/DeathBird.png";
		}
		else if (s) {
			playerImgCurrent = playerImagesUp[a];
		}
		else {
			playerImgCurrent = playerImagesDown[a];
		}
		JLabel player = new JLabel(new ImageIcon(playerImgCurrent));
		
		player.setSize(200, 100);
		player.setLocation(playerX, 10 + y);
		return player;
	}
	
	public static JLabel showCurse(int a){
		String curseImage = "res/Images/fuck.png";
		JLabel curse = new JLabel(new ImageIcon(curseImage));
		curse.setSize(80,80);
		curse.setLocation(playerX+15, playerY-15);
		return curse;
	}
	public static JLabel showFloor(){
		String floorImage = "res/Images/floor.jpg";
		JLabel floor = new JLabel(new ImageIcon(floorImage));
		floor.setSize(700,62);
		floor.setLocation(0, 372);
		return floor;
	}
	// ::: Alex 19.5.14 
	public static JLabel showPipes(int x, int y) {
		String pipeImage = "res/Images/pipes.png";
		JLabel pipe = new JLabel(new ImageIcon(pipeImage));
		pipe.setSize(100, 800);
		pipe.setLocation(x, -265 + y);
		
		return pipe;
	}
	//::: Alex
	
	// Jasen 19.5.14 12:51 Animation 
	public static JLabel showBlocks(int x) {
		String blockImage = "res/Images/blocks.png";
		JLabel block = new JLabel(new ImageIcon(blockImage));
		block.setSize(343, 64);
		block.setLocation(x, 296);
		
		return block;
	}
	public static JLabel moveGround (int a){
		
		int movement = a * 3;
		String groundImage = "res/Images/ground4.png";
		JLabel ground = new JLabel(new ImageIcon(groundImage));
		ground.setSize(857,17);
		ground.setLocation(-2+movement,355);
		return ground;
	}
	// ::: Jasen ::::
    public static void flightControlLogic() {
    	
    	if (!isFlying) {
			playerY += 4;
			flyingHeight = 0;
		} 
		else if (playerY <= -4) {
			isFlying = false;
		   }
		else {
			playerY -= 4;
			if (flyingHeight >= 20) {
				isFlying = false;
			}
			flyingHeight++;
		}
	}

	public static void animation(){
		
		int curentFrame = animationFrame;
			
		frameCounter++;
		
		if (frameCounter == 10) {
			
			frameCounter = 0;
			
			if (curentFrame == 0) {
				curentFrame = 1;
			}
			else {
				curentFrame = 0;
			}
		}
		animationFrame = curentFrame;
	}

	public static void randomYforPipes(){
		
		if ((pipeOneY == 0 && pipeOneX == 700) || pipeOneX == 700 ) {
			pipeOneY = rnd.nextInt(100); 
		} else if ((pipeTwoY == 0 && pipeTwoX == 700) || pipeTwoX == 700 ) {
			pipeTwoY = rnd.nextInt(100);
		} else if ((pipeThreeY == 0 && pipeThreeX == 700) || pipeThreeX == 700 ) {
			pipeThreeY = rnd.nextInt(100); 
		} else if ((pipeFourY == 0 && pipeFourX == 700) || pipeFourX == 700 ) {
			pipeFourY = rnd.nextInt(100); 
		} else if ((pipeFiveY == 0 && pipeFiveX == 700) || pipeFiveX == 700 ) {
			pipeFiveY = rnd.nextInt(100); 
		} else if ((pipeSixY == 0 && pipeSixY == 700) || pipeSixY == 700 ) {
			pipeSixY = rnd.nextInt(100);
		}
	}

	public static void setPipesAtStartPosition(){
		
		if (pipeOneX == -70) {
			pipeOneX = 700;
		} else if (pipeTwoX == -70) {
			pipeTwoX = 700;
		} else if (pipeThreeX == -70) {
			pipeThreeX = 700;
		} else if (pipeFourX == -70) {
			pipeFourX = 700;
		} else if (pipeFiveX == -70) {
			pipeFiveX = 700;
		} else if (pipeSixX == -70) {
			pipeSixX = 700;
		}
	}
	
	public static void setBlocksAtStartPosition(){
		
		if (blockOneX == -343) {
			blockOneX = 686;
		} else if (blockTwoX == -343) {
			blockTwoX = 686;
		} else if (blockThreeX == -343) {
			blockThreeX = 686;
		} else if (blockFourX == -343) {
			blockFourX = 686;
		}
	}
	
	public static void movePipes() {
		
		pipeOneX -= 2;
		pipeTwoX -= 2;
		pipeThreeX -= 2;
		pipeFourX -= 2;
		pipeFiveX -= 2;
		pipeSixX -= 2;
	}

	public static void moveBlocks() {

			
			blockOneX -= 1;
			blockTwoX -= 1;
			blockThreeX -= 1;
	

		
	}

	public static void showPipes(){
		
		pipeOne = showPipes(pipeOneX,pipeOneY); 
		pipeTwo = showPipes(pipeTwoX,pipeTwoY); 
		pipeThree = showPipes(pipeThreeX,pipeThreeY);
		pipeFour = showPipes(pipeFourX,pipeFourY);
		pipeFive = showPipes(pipeFiveX,pipeFiveY);
		pipeSix = showPipes(pipeSixX,pipeSixY);
	}

	public static void showBlocks(){
		
		blockOne = showBlocks(blockOneX); 
		blockTwo = showBlocks(blockTwoX); 
		blockThree = showBlocks(blockThreeX);

	}
	
	// Masovski on 21/05/2014 Score
	public static JLabel showScore(int currentScore) {
		JLabel score = new JLabel("score: " + String.valueOf(currentScore));
		score.setLayout(null);
		score.setForeground(Color.yellow);
		Font font;
		try {
			font = Font.createFont(Font.TRUETYPE_FONT, new File("res/font.ttf"));
			score.setFont(font.deriveFont(18f));
		} catch (FontFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		score.setSize(200, 20);
		score.setLocation(10, 10);
		return score;		
	}
	public static void calcScore() {
		int localPlayerX = playerX + 40; 
		if(localPlayerX == pipeOneX || localPlayerX == pipeTwoX || localPlayerX == pipeThreeX || localPlayerX == pipeFourX ||
				localPlayerX == pipeFiveX || localPlayerX == pipeSixX) {
			currentScore++;
		}
		if(currentScore > highScore) {
			highScore = currentScore;
			saveHighScore();
		}
	}
	public static void saveHighScore() {
		PrintWriter writer;
		try { 
		writer = new PrintWriter("res/highscore", "UTF-8");
		writer.println(highScore);
		//Close the document
		writer.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void getHighScore() {
		
        try {
        	File file = new File("res/highscore");
            @SuppressWarnings("resource")
			Scanner scan = new Scanner(file);
            if (scan.hasNextLine()) {
                String line = scan.nextLine();
                highScore = Integer.parseInt(line);
            }
        } catch (FileNotFoundException e) {
        	PrintWriter writer;
        	try {
				writer = new PrintWriter("res/highscore", "UTF-8");
				writer.println("0");
	    		//Close the document
	    		writer.close();
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (UnsupportedEncodingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
    		
        }
	}
	public static JLabel showHighScore(int currentHighScore) {
		JLabel score = new JLabel("Record: " + String.valueOf(currentHighScore));
		score.setLayout(null);
		score.setForeground(Color.red);
		Font font;
		try {
			font = Font.createFont(Font.TRUETYPE_FONT, new File("res/font.ttf"));
			score.setFont(font.deriveFont(18f));
		} catch (FontFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		score.setSize(200, 20);
		score.setLocation(10, 30);
		return score;		
	}
}
