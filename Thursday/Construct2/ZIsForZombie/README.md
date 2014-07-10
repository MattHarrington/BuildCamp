<a name="Title" />
# "Z is for Zombie" - Construct 2 - Demo Snippets #

---


##Pre-Requisites##

To follow the steps in the demo below, you will need the following: 

- Scirra's Construct 2 r149 or later. You can view the list of the [latest releases](https://www.scirra.com/construct2/releases) or downlod [r149](https://www.scirra.com/construct2/releases/r149) directly.  
- The latest version of these demo files from http://github.com/BretStateham/ZisForZombie

---

##Steps##

###Basic Demo###

 - [Create the Game Project](#CreateGame)
 - [Setup the Game Layers](#SetupTheGameLayers)
 - [Add the Standing "Z" To the Game](#AddStandingZ)
 - [Add the "Platform" and "Scroll To" Behaviors](#AddPlatformAndScrollToBehavior)
 - [Add Platforms](#AddPlatforms)
 - [Add Zombie Animations](#AddZombieAnimations)
 - [Add Zombie Movement Events](#AddZombieMovementEvents)
 - [Add the Enemy](#AddEnemy)
 - [Check for Zombie and Enemy Collisions](#CheckForZombieEnemyCollisions)
 - [Add Brians for the Zombie to Collect](#AddBrains)
 - [Add Pits](#AddPits)
 - [Add Background](#AddBackground)

<!-- ======================================================================= -->
<a name="CreateGame" />
### Create the Game Project ###
<!-- ======================================================================= -->
---

Create a new Windows 8 game in Construct 2

- Start **Construct 2**

- Create a **"New Windows 8 Project"**.  From the ribbon bar, click **"File"** | **"New"**, select **"New Windows 8 Project"**, then click **"Open"**

	![00NewWin8Project](images/00newwin8project.png?raw=true)

- In the **Projects** Bar, ensure that the new project is selected:

	![01NewProjectInProjectBar](images/01newprojectinprojectbar.png?raw=true "New Project in Project Bar")

- In the **Properties** Panel, change (leave all others at default):
	- **Name:** ZisForZombie
	- **Description:** Zombie Game
	- **Author:**  Your Name
	- **Window Size:** 1366x768

	![01NewProjectProperties](images/01newprojectproperties.png?raw=true "New Project Properites")

- In the **Projects** Panel, expand **ZisForZombie**
	- Rename **"Layouts"** | **"Layout 1"**, **"Game Layout"**
	- Rename **"Events"** | **"Event sheet 1"**, **"Game Events"**

	![02RenamedLayoutAndEvents](images/02renamedlayoutandevents.png?raw=true "Renamed Layout and Events")

- On the Layout designer, note the default **Share** and **Purchase** buttons, but then delete all the contents on the designer

	![03DeleteDefaultObjects](images/03deletedefaultobjects.png?raw=true "Delete Default Objects")

- Zoom out to show the entire designer surface

- On the design surface, note that the Window Size (dotted line) is different thant the Layout size (white box)

	![04WindowsSizevsLayoutSize](images/04windowssizevslayoutsize.png?raw=true "Window Size vs Layout Size")

- Select **"Projects"** | **"Layouts"** | **"Game Layout"**.  In the **"Properties"** panel, change the **"Layout Size"** to: **2732,768**

	![05WideLayout](images/05widelayout.png?raw=true "Wide Layout")
 
	> **Note:** Thatis (1366x2)x728, or twice the width of the window.  


- From menu bar, select **"File"** | **"Save As Single File..."**.  Save the file as **"ZisForZombie.capx"** in the directory of your choice.  

	![05SaveAsSingleFile](images/05saveassinglefile.png?raw=true "Save As Single File")

	> **Note:** **.capx** files are basically **.zip** files that contain the entire projects assets.  They make it easy to share your project with others. For large projects, they can be slow, so using **"File"** | **"Save As Project..."** may be a better choice in that case. 

A completed version of the game so far can be found here: **"Demo\End\01 - ZisForZombie - Initial Project.capx"**

<!-- ======================================================================= -->
<a name="SetupTheGameLayers" />
### Setup the Game Layers ###
<!-- ======================================================================= -->
---

In this step, we will setup the various layers in the game.  A single "Layout" (like our "Game Layout") can have multiple "Layers".  Layers allow you to control which objects appear infront of the scene or in back of the scene.  You can also change the rate at which various layers move and scale.  This let's you create cool parallalx effects and more.  

- With the **"Game Layout"** tab selected in the designer, switch to the **"Layers"** tab. 
- Select **"Layer 0"** and rename it to **"Background"**.  You can right click on the layer name and select **"Rename"** from the pop-up menu, or click the **"pencil"** icon on the **Layers** bar

	![06RenameLayer0ToBackground](images/06renamelayer0tobackground.png?raw=true "Rename Layer 0 to Background")

- Then in the **"Layers"** panel, click the **"+"** button at the top to add a new layer.
- Name the new layer **"Game"**

	![07AddGameLayer](images/07addgamelayer.png?raw=true "Add Game Layer")

A completed version of the game so far can be found here: **"Demo\End\02 - ZisForZombie - Layers Created.capx"**

<!-- ======================================================================= -->
<a name="AddStandingZ" />
### Add the Standing "Z" To the Game ###
<!-- ======================================================================= -->
---

We will start adding our hero, "Z" to the game.  He has multiple states (standing, walking, jumping, falling).  We'll start by adding him with the single "Standing" animation.  

- On the design surface, make sure you are on the **"Game Layout"** tab
- In the **"Layers"** panel, make sure the **"Game"** layer is selected.
- Right click on the layout in the designer, and select **"Insert new object"**

	![08InsertNewObject](images/08insertnewobject.png?raw=true "Insert New Object")

- Review the different types of objects that can be added.  
- Select the **"Sprite"** object type, set the name to **"Zombie"**, and click **"Insert"**

	![09InsertZombieSprite](images/09insertzombiesprite.png?raw=true "Insert Zombie Sprite")

- **Move the cross-hairs with the mouse** to place the center of the sprite over towards the **left edge of the layout**.
- The **sprite boundary** will appear on the layout, as will the **"Edit Image"**, **"Animations"**, and **"Animation frames"** windows.

	![10AnimationEditorWindows](images/10animationeditorwindows.png?raw=true "Animation Editor Windows")

- In the **"Animations"** window, rename the **"Default"** animation **"Standing"**.  You can **right-click** on the **"Default"** name and select **"Rename"** fromt the pop-up menu.

	![11RenameDefaultAnimationToStanding](images/11renamedefaultanimationtostanding.png?raw=true "Rename Default Animation to Standing")

- In the **"Animation frames"** window, right-click the white space, and select **"Import sprite strip..."** from the popup menu.

	![12ImportFromSpriteStrip](images/12importfromspritestrip.png?raw=true "Import From Sprite Strip")

- Navigate to the **"Demo\Assets\Art\Z\Standing"** folder, select the **"StandingZombieNoOutline64.png"** file, and click **"Open"**

![13ImportZombieStandingSpriteStrip](images/13importzombiestandingspritestrip.png?raw=true "Import Zombie Standing Sprite Strip")

- In the **"Import sprite strip"** window, confirm the following and click *OK**:
	- **Number of horizontal cells**: 4
	- **Number of vertical cells**: 1 

	![14ConfirmStripSettings](images/14confirmstripsettings.png?raw=true "Confirm Strip Settings")

- In the **"Animation frames"** window, right click frame **0**, and choose **"Delete"** from the popup menu.

	![15DeleteFrome0](images/15deletefrome0.png?raw=true "Delete Frame 0")

- In the **"Edit image: Zombie (Standing, frame 0)"** Window, Hold down the **"Shift Key**" on the keyboard and click the **"Crop"** icon on the toolbar.  Holding the **"Shift Key"** down crops all frames at once, and trims the extra space off. 

	![16CropAnimationFrames](images/16cropanimationframes.png?raw=true "Crop Animation Frames")

- In the **"Animations"** window, select the **"Standing"** animation.
- In the **"Properites"** panel, set:
	- **"Speed:"** 5
	- **"Loop:"** Yes

	![17LoopStandingAnimation](images/17loopstandinganimation.png?raw=true "Loop Standing Animation")

- In the **"Animations"** window, **right-click** the **"Standing"** animation, and choose "Preview" from the popup menu to preview the animation.  Close the preview window when done.

	![18PreviewStandingAnimation](images/18previewstandinganimation.png?raw=true "Preview Standing Animation")

- **Close** the animation preview window

- **Close** the **"Edit image: Zombie (Standing, frame 0)"** window

- From the **"Home"** ribbon along the top, click **"Run layout"** to run the game in the browser.  You may need to refresh the page in the browser to see the latest changes.

	![19RunLayout](images/19runlayout.png?raw=true "Run Layout")

- The game doesn't do anything right now.  Our Zombie just stands there and wobbles a little. Close the browser when you are done.  

	![20LayoutRunningInBrowser](images/20layoutrunninginbrowser.png?raw=true "Layout Running in Browser")

A completed version of the demo so far can be found here: **"Demo\End\03 - ZisForZombie - Standing Zombie.capx"**

<!-- ======================================================================= -->
<a name="AddPlatformAndScrollToBehavior" />
### Add the Platform and Scroll To Behaviors ###
<!-- ======================================================================= -->
---

We need our Zombie to be able to move back and forth and jump to platforms (we havent' built any platforms yet though).  With Construct 2, that's easy to do using "Behaviors"

- With the **"Zombie"** sprite selected on the design surface, from the **"Properties"** panel, **click** the **"Behaviors"** link. 

	![21ZombieBehaviorsLink](images/21zombiebehaviorslink.png?raw=true "Zombie Behaviors Link")

- In the **"Zombie: Behaviors"** window click the **"+"** button along the top to add a new behavior

	![22AddBehavior](images/22addbehavior.png?raw=true "Add Behavior")

- In the **"Add behavior"** window, under the **"Movements"** header, select **"Platform"**, and click **"Add"**

	![23AddPlatformBehavior](images/23addplatformbehavior.png?raw=true "Add Platform Behavior")

- Again, In the **"Zombie: Behaviors"** window click the **"+"** button along the top
- This time, in the **"Add Behavior"** window, under the **"General"** header, pick **"Scroll To"** and click **"Add"**

	![24AddScrollToBehavior](images/24addscrolltobehavior.png?raw=true "Add Scroll To Behavior")

- Close the **"Zombie: Behaviors"** Window

	![25CloseBehaviorsWindow](images/25closebehaviorswindow.png?raw=true "Close Behaviors Window")

- In the **"Properties"** panel, expand **"Behaviors"** | **"Platform"**, and set:
	- **"Max Speed:"** 100
	- **"Jump Strength:"** 525
	- Leave all others at default.

	![26ZombiePlatformSettings](images/26zombieplatformsettings.png?raw=true "Zombie Platofrm Settings")

	> **Note:** The **"Max Speed"** property controls how fast our Zombie can move, and the **"Jump Strength"** property controls how high he can jump.  Using the settings above causes our Zombie to move a little bit slower and jump a little bit lower than the default settings.  You can tweak these in your game if desired.  Notice that there are also a bunch of other properties you can play with!

- From the **"Home"** ribbon along the top, click **"Run layout"** to run the game in the browser.  You may need to refresh the page in the browser to see the latest changes. 

	![27RunLayout](images/27runlayout.png?raw=true "Run Layout")
 
- **Notice that "Z" falls right off the screen**.  That is because we don't have any platforms for him to land on.  Close the browser when done.

A completed version of the demo so far can be found here: **"Demo\End\04 - ZisForZombie - Zombie Behaviors.capx"**




<!-- ======================================================================= -->
<a name="AddPlatforms" />
### Add Platforms###
<!-- ======================================================================= -->
---

We need platforms for our Zombie to jump around on.  There are a number of platform blocks you can use in the game assets.  First, we'll set the layout grid to 16x16.

- **Right-click** the **"View"** ribbon tab, and **"de-select"** the **"Minimize the Ribbon"** option, to keep the ribbon bar visible. 

	![28TurnOffMinimizeRibbon](images/28turnoffminimizeribbon.png?raw=true "Turn Off Minimize Ribbon")

- Switch to the **"View"** ribbon.  Turn **ON** the **"Snap to grid"** checkbox, and set the **"Grid Width"** and **"Grid Height"** both to **16**

	> **Note:**, the blocks and sprites we are using are all at sizes that are multiples of 16 (32x32,64x64).  The 16x16 grid size give us a conventient way to position items in the layout. 

	- Optionally turn **ON** the **"Show grid"** checkbox. 

	![29TurnOnGrid](images/29turnongrid.png?raw=true "Turn On Grid")

- Drag each of the **"Assets\Art\Blocks\Asphalt*.png"** images (**INDIVIDUALLY, NOT AS A GROUP**) into the design surface just to the left of the layout.  (off screen)

	![30DragBlockSprites](images/30dragblocksprites.png?raw=true "Drag Block Sprites")

- Each file will create a new sprite object and instance.
- Add the "Solid" behavior to each one (sorry, you need to do this one by one).

	![31AddSolidToBlock](images/31addsolidtoblock.png?raw=true "Add Solid Behavior to Blocks")

- Right click on the design surface and pick **"Insert new object"**.  

- In the **"Insert New Object"** window, select **"Tiled Background"**, set the name to **"GroundFill"** and click **"Insert"**, and use the cross hairs to place an instance to the left of the layout neard the block tiles. 

	![32AddGroundFill](images/32addgroundfill.png?raw=true "Add Ground Fill")

- In the **"Edit image: GroundFill"** window, click the **"Resize"** button, and set the size to **32x32**

	![33SizeGroundFill](images/33sizegroundfill.png?raw=true "Size Ground Fill")

- Click the **"Paint Bucket"** icon, **set the fill color** to **43,29,0,255** (**RGBA**), and fill the entire 32x32 image with the color. 

	![34SetGroundFillColor](images/34setgroundfillcolor.png?raw=true "Set Ground Fill Color")

- Close the **"Edit image: GroundFill"** window.

- **Set the size of the GroundFill object to 32x32** by **selecting it on the designer**, then setting the size to **32,32** in the **Properties bar**

	![35SetGroundFillObjectSize](images/35setgroundfillobjectsize.png?raw=true "Set Ground Fill Object Size")

- Position platform blocks and ground fill to build a series of platforms.  You can easily copy existing blocks by holding down the CTRL key on the keyboard while you drag an existing block to a new location.  

	![36BlockLayout](images/36blocklayout.png?raw=true "Block Layout")


  - ***This can be time consuming***.  Just do a quick layout so you can test it.  There is a completed layout at **"Demo\End\05 - ZisForZombie - Platform Blocks.capx"**

- **Run the layout in the browser**. Use the left, right , up arrows to move Z.  Note that he doesn't walk, he just slides.  You may also notice there are places where Z can't naviate through the platform blocks because they are either too close or too far apart.  Adjust as needed.  Close browser when done. 

A completed version of the game so far can be found here: **"Demo\End\05 - ZisForZombie - Platform Blocks.capx"**
    

<!-- ======================================================================= -->
<a name="AddZombieAnimations" />
### Add Zombie Animations ###
<!-- ======================================================================= -->
---

Add more animations to the Zombie

- On the design surface, double click on "Z" to open his animations. 
- In the **"Animations"** window, **right-click** and choose **"Add animation"**. 

	![37AddAnimation](images/37addanimation.png?raw=true "Add Animation")

- Name the new animation **"Walking"**, and make sure it is selected.

	![38WalkingAnimationSelected](images/38walkinganimationselected.png?raw=true "Walking Animation Selected")

- In the **"Animation frames"** window, right click and choose **"Import sprite strip..."**

	![12importfromspritestrip](images/12importfromspritestrip.png?raw=true "Import From Sprite Strip")

- Import the **"Assets\Art\Z\Walking\ZombieStompRightNoOutline64.png"** sprite strip. 

	![39ImportWalkkingAnimatoin](images/39importwalkkinganimatoin.png?raw=true "Import Walking Animation")
 
- Confirm the sprite strip settings, and click **OK**:
	- **Number of horizontal cells:** 4
	- **Number of vertical cells:** 1

	![40ConfirmSpriteStripSettings](images/40confirmspritestripsettings.png?raw=true "Confirm Sprite Strip Settings")

- **Delete frame 0**

	![41DeleteFrame0](images/41deleteframe0.png?raw=true "Delete Frame 0")

- **Shift-click** the **crop** button to crop the entire animation

	![42CropEntireImage](images/42cropentireimage.png?raw=true "Crop Entire Image")

- In the **"Properties"** panel for the **"Walking"** animation set:
	- **Speed:** 10
	- **Loop:** Yes

	![43SetWalkingProperites](images/43setwalkingproperites.png?raw=true "Set Walking Animation Properties")

- Add another new animation named **"Jumping"**
- In the **"Animation frames"** window, right-click and select **"Import Frames..."**.
- Import the single **"Assets\Art\Z\Jumping\JumpingZombieNoOutline64.png"** file.
- Delete Frame 0
- Click the "Crop" button to crop the image.

- Repeat the aboove two steps.  Create an animation called **"Falling"** and import the  **"Assets\Art\Z\Jumping\FallingZombieNoOutline64.png"** sprite. Be sure to delete frame 0 and crop the image.

- Close the **"Edit image.."** window

A completed version of the game so far can be found here: **"Demo\End\06 - ZisForZombie - Zombie Animations.capx"**

<!-- ======================================================================= -->
<a name="AddZombieMovementEvents" />
### Add Zombie Movement Events ###
<!-- ======================================================================= -->
---

So far we've done everything on the Layout page.  Now, we need to add some events to control which animation is showing for the Zombie based on his state.

- Open the **"Game Events"** page.  
- Notice that there are a number of events already there.  Those are there because twe used the **"New Windows 8 Project"** when we created our game.

	![44OriginalEvents](images/44originalevents.png?raw=true "Original Events")

- Select all of the existing events (**Ctrl+A**), and delete them.

	![45DeleteAllEvents](images/45deleteallevents.png?raw=true "Delete All Events")

- Click the **"Add event"** text at the end of the event list. In the "Add event" window

	![46ClickAddEvent](images/46clickaddevent.png?raw=true "Click Add Event")

- We'll use events to control which Zombie animation (Standing, Walking, Jumping or Falling) is being played depending on how the is moving.  To start, we'll setup an event that is triggered when the Zombie is NOT Moving.  In the **Add event** window, click **Zombie** then click **Next**:

	![47SelectZombie](images/47selectzombie.png?raw=true "Select Zombie")

- Under the **"Platform"** heading, click **"Is moving"** then click **"Done"**

	![48IsMoving](images/48ismoving.png?raw=true "Select Is moving")

- The above event would be triggered when the Zombie IS moving.  We want to trigger instead when it is NOT moving.  To do that, we'll "Invert" the event.  **Right-click** the **"Zombie | Platform is moving"** event and select **"Invert"** to imply the condition is met with the Zombie is NOT moving. 

	![49InvertCondition](images/49invertcondition.png?raw=true "Invert Condition")

- Notice that there is now a red **"X"** next to the event condition.  

- So the event is now set to trigger when the Zombie is NOT moving.  Next, we need to tell Construct 2 what to do when the event triggers.  We do that by adding one or more "Actions". 

- Click the **"Add action"** link

	![50ClickAddAction](images/50clickaddaction.png?raw=true "Click Add Action")

- We want to perform an action (set the animation) on the "Zombie" object.  In the **"Add action"** window, select **"Zombie"** and click **"Next"**:

	![51SelectZombie](images/51selectzombie.png?raw=true "Select Zombie and click Next")

- The action we want to take, is to set the Zombie to play a specific animation. Under the **"Animations"** header, click **"Set animation"** and click **"Next"**

	![52SetAnimation](images/52setanimation.png?raw=true "Select "Set Animation"")

- In the **"Parameters for Zombie: Set animation"** window, set:
	- **Animation:** "Standing" (include the quotes)
	- **From:** beginning
	- click **"Done"**

	![52StandingAnimation](images/52standinganimation.png?raw=true)

- Cool.  So now, when the Zombie is NOT moving, the "Standing" animation should be shown.  What about if it IS moving.  We can do that by adding an "Else" event to the previous event.  Since the original event is triggered when the Zombie IS NOT Moving, the Else should be triggered if the Zombie IS moving.  In that case, we want to set the Zombie's animation to "Walking".

- **Right click** an the very left edge of the **"Zombie | X Platform is moving"** event, select **"Add"** | **"Add 'Else' (X)"** from the pop-up menu.

	![53AddElse](images/53addelse.png?raw=true "Add Else")

- On the new **Else** event, click the **"Add Action"** link:

	![54AddElseAction](images/54addelseaction.png?raw=true "Else Action")

- Add an action to set the Zombie Animation to **"Walking"** (using the same steps we used for the "Standing" animation above)

	![55WalkingAnimationAdded](images/55walkinganimationadded.png?raw=true)

- Awesome, so now we have animations that play when the Zombie is Standing and Walking.  There are two other animations though.  One for when the Zombie is Jumping and one for when he is falling.  Use the methods above to create a new Event for Zombie, for when the Platform behavior is Jumping, and have it set the animation to "Jumping".  Repeat again, to show the "Falling" animation when the Zombie is falling:

- Add a new event / action:
	- **Event Object:** Zombie
	- **Event Condition:** Platform Is Jumping
	- **Action Object:** Zombie
	- **Action:** Set Animation to "Jumping"

- Add a new event / action:
	- **Event Object:** Zombie
	- **Event Condition:** Platform Is Falling
	- **Action Object:** Zombie
	- **Action:** Set Animation to "Falling"

	![56ZombieAnimationEvents](images/56zombieanimationevents.png?raw=true "Add Zombie Animation Events")

- Run the game in the browser to show the animations.  However, they only look right when the player is moving right. This is because the animation is drawn with the Zombie facing right.  He looks fine as long as he is moving right.  If he is moving to the left though it looks like he is walking backwards.  Close the browser.

- To fix the problem, we'll setup two new events.  One will cause the Zombie image to be mirrored if the Left Arrow key is pressed on the keyboard.  The other will set him back to Un-Mirrored if the Right Arrow key is pressed on the keyboard. 

- Add a new event / action:
	- **Event Object:** Keyboard
	- **Event Condition:** On key pressed, Left Arrow
	- **Action Object:** Zombie
	- **Action:** **Set Mirrored** to "Mirrored"

- Add a new event / action:
	- **Event Object:** Keyboard
	- **Event Condition:** On key pressed, Right Arrow
	- **Action Object:** Zombie
	- **Action:** **Set Mirrored** to "Not Mirrored"
  
	![57ZombieMorrorEvents](images/57zombiemorrorevents.png?raw=true "Zombie Mirror Events")

- Run the game in the browser and confirm that the Zombie faces the proper direction when he moves now.  Close the browser when you are done.

A complete version of the game so far can be found here: **"Demo\End\07 - ZisForZombie - Zombie Events.capx"**

<!-- ======================================================================= -->
<a name="AddEnemy" />
### [Add the Enemy](#AddEnemy) ###
<!-- ======================================================================= -->
---

We need an enemy to avoid! We'll add that next

- On the **"Game Layout"**, insert a new **sprite** object named **"Enemy"**

	![58EnemySprite](images/58enemysprite.png?raw=true "Add Enemy Sprite")

- On the "Default" animation, import the frames from the **"Demo\Assets\Art\Enemy\EnemyWalking64.png"** sprite strip: 
	- **Number of horizontal cells:** 8
	- **Number of vertical cells:** 1
	- **Delete** frame **0**
	- **Crop** the entire image (**shift-click crop**)
	- Set the **"Default"** animation's **"Speed"** property to **10**
	- Set the **"Default"** animation's **"Loop"** property to **"Yes"**

	![59EnemySprite](images/59enemysprite.png?raw=true "Enemy Sprite")

- Add the **"Platform"** behavior to it:
	- **Max Speed:** 100
	- **Default Controls:** No (keeps it from responding to the keyboard)

	![60EnemyPlatformBehavior](images/60enemyplatformbehavior.png?raw=true "Enemy Platform Behavior")

- We want the enemy to just pace back and forth.  We'll give it some objects to collide with that cause it to referse it's direction. 

- Right click the layout, and Insert a new sprite named "EnemyBoundary".  
	- Give the default frame a transparent yellowish fill (just so we can see it)
	- Set it's size to 32x32
	- Set it's **Initial Visibility** to **Invisible**
	- Position a couple of instances around your enemy(s) to where you want them to reverse direction

	![61EnemyBoundaryObjects](images/61enemyboundaryobjects.png?raw=true "Enemy Boundary Objects")

- **Select** one of the **Enemy** instances on the design surface.  In the **"Properties"** panel, click the **"Instance variables"** link 
- In the **"EnemyBoundary: Instance variables"** window, click the **"+"** button to add a new instance variable.
- Create a new variable with the following:
	- **Name:** Direction
	- **Type:** Text
	- **Initial value:** Left 
	- **Description:** Keeps track of the current direction of the enemy

	![62EnemyDirectionVariable](images/62enemydirectionvariable.png?raw=true "Enemy Direction Variable")

- Now we need to control the **"Enemy"** movements using events.  Switch to the **"Game Events"** tab.  

- Add a new event / action:
	- **Event Object:** System
	- **Event Condition:** On start of layout
	- **Action Object:** Enemy
	- **Action:** Platform | Simulate Control | Left

- Add a new event :
	- **Event Object:** Enemy
	- **Event Condition:** On collision with EnemyBoundary

- Add a Sub Event:
	- **Event Object:** Enemy
	- **Event Condition:** Compare Instance Variable | Distance | = "Left"
	- **Action Object:** Enemy
	- **Action:** "Instance Variables" | "Set Value" | Distance | "Right"
	- **Action Object:** Enemy
	- **Action:** Set Mirrored | Mirrored

- Add and Else on the SubEvent
	- **Action Object:** Enemy
	- **Action:** Platform | Simulate Control | Left
	- **Action Object:** Enemy
	- **Action:** Set Mirrored | Not Mirrored

- Add a new event:
	- **Event Object:** System
	- **Event Condition:** For Each | Enemy
	- Add a Sub Event:
	- **Event Object:** Enemy
	- **Event Condition:** Compare Instance Variable | Distance | = | "Left"
	- **Action Object:** Enemy
	- **Action:** Platform | Simulate Control | Left
	- Add an else:
	- **Action Object:** Enemy
	- **Action:** Platform | Simulate Control | Right
  
	![63EnemyMovementEvents](images/63enemymovementevents.png?raw=true)

- Run the game in the browser and verify that the enemy moves correctly, turns where the EnemyBoundary objects are, and is facing the proper direction as he moves.  You should also notice that nothing happens when the Zombie collides with an Enemy.  We'll fix that next.  Close the browser when you are done.

A completed version of the game so far can be found here: **"Demo\End\08 - ZisForZombie - Enemy.capx"**

<!-- ======================================================================= -->
<a name="CheckForZombieEnemyCollisions" />
### Check for Zombie and Enemy Collisions ###
<!-- ======================================================================= -->
---

Now, we want to check to see if Z collides with an enemy

- Import sounds **"Demo\Assets\Sounds\Grunt\Grunt.wav"** and **"Demo\Assets\Sounds\Dying\Dying.wav"** by dragging **right-clicking** on the **"Sounds"** folder in the **"Projects"** bar, and selecting **"Import sounds"**

	![64ImportSounds](images/64importsounds.png?raw=true "Import Sounds")

- Then navigate to the sound file you want to import.  Add more sounds to import by clicking the **"Add more files..."** button.  Finally, click the **"Import"** button, then click **"OK"** when the import is complete:

	![65ImportAudioFiles](images/65importaudiofiles.png?raw=true "Import Audio Files")

- Modify the **"System"** | **"On Start of Layout"**
	- Click on the very left edge of the "System | On start of layout" event and drag it to the top of the event sheet.  This isn't necessary but it helps me to see the things that happen first, show up first.
	- Add an **Audio** | **Preload** | **Grunt** action
	- Add an **Audio** | **Preload** | **Dying** action

	![65PreloadSounds](images/65preloadsounds.png?raw=true "Preload Sounds")

- When the Zombie collides with an enemy, what happens depends on what the Zombie is doing.  If the Zombie falls on an Enemy, the Enemy dies and the Zombie bounces up off of him, otherwise, the Enemy kills the Zombie (normal Platform game behavior).  

- Now at the bottom of the event sheet, Add a new event:
	- **Event Object:** Zombie
	- **Event Condition:** On collision with Enemy
	- Add a Sub Event (right click on the left edge of the collision event, and select **"Add"** **|** **"Add sub-Event (S)"**):
	- **Event Object:** Zombie
	- **Event Condition:** Platform | Is Falling?
	- **Action Object:** Enemy
	- **Action:** Destroy
	- **Action Object:** Zombie
	- **Action:** Set Y Vector | -300
	- **Action Object:** Audio
	- **Action:** Play Grunt | Not Looping | Volume 0
  
- Add an else:
	- **Action Object:** Zombie
	- **Action:** Destroy
	- **Action Object:** Audio
	- **Action:** Play Dying | Not Looping | Volume 0

	![66EnemyCollisions](images/66enemycollisions.png?raw=true "Enemy Collisions")

- Play the game in the browser and verify that the Zombie can kill enemy's by falling on them, and that the enemy kills the Zombie if it runs directly into it.  Close the browser when you are done.

A complete version of the game so far can be found here: **"Demo\End\09 - ZisForZombie - Enemy Collisions.capx"**


<!-- ======================================================================= -->
<a name="AddBrains" />
### Add Brians for the Zombie to Collect ###
<!-- ======================================================================= -->
---

We've got a hero ("Z") and some enemies.  Now let's add some Brains for "Z" to collect.  

- On the **Game Layout**, **Insert a new sprite object** named **"Brain"**:
	- Import "Default" animation frames from sprite strip: **"Demo\Assets\Art\Brains\BouncingBrain32.png"**
	- Number of Horizontal Cells: 5
	- Number of Vertical Cells: 1
	- delete default frame 0
	- Crop entire image (**shift-click crop**)
	- Set speed to 5
	- Set looping to Yes

	![67BrainSprite](images/67brainsprite.png?raw=true "BrainSprite")

- Place multiple brains around the layout where Z has to jump to get them. 

- Import the **"Demo\Assets\Sounds\Brains\Brains.wav"** sound 
- Add a pre-load action to the "System | On start of layout" event at the top of the event sheet.
- Add an event to check for Zombie / Brain collisions
	- Destroy the brain
	- Play the Brains sound

	![68BrainEvents](images/68brainevents.png?raw=true "Brain Events")

A complete version of the game so far can be found here: "**Demo\End\10 - ZisForZombie - Brains.capx"**

<!-- ======================================================================= -->
<a name="AddPits" />
### Add Pits###
<!-- ======================================================================= -->
---

When the Zombie falls into a pit, he just disappears.  We want him to at least screen like he is dying.  To do that, we'll place an invisible "Pit" object in those gaps that he can collide with when he falls into them.

- On the **"Game Layout"** tab, make sure the **"Game"** layer is selected
- Insert a new **"Sprite"** object named **"Pit"**
- Place the initial on where one of the gaps in the ground are
- Size the sprite image to 32x32
- Fill it with a translucent red color (255,0,0,128) so we can see it on the design surface
- Set the **"Initial Visibility"** to **"Invisible"**
- Resize the sprite instance on the design surface to fill the pit

	![69Pit](images/69pit.png?raw=true "Pit")

- On the "Game Events" tab, add a new event: **"Zombie"** | **"On collision with another object"** | **"Pit"**
- Add the action: **"Audio"** | **"Play"** | **"Dying"**
	- **Not Looping**
	- Tag **"DYING"**
	- Volumn **0**

- Find the previous action that plays the "Dying" sound when the zombie collides with the enemy and set the tag to "DYING" as well.

	![69DyingTag](images/69dyingtag.png?raw=true "Dying Tag")

- At the bottom of the Event sheet, add another event: **"Audio"** | **"On ended"** | **"DYING"**
- Add the action: **"System"** | **"Restart layout"**

-Run the game in the browser to verify that the pits work, and that when the Zombie dies (or at least when the audio tagged as "DYING" finishes playing, the game restarts. Close the browser when you are done.

A complete version of the game so far can be found here: "**Demo\End\11 - ZisForZombie - Pits.capx"**

<!-- ======================================================================= -->
<a name="AddBackground" />
### Add Background ###
<!-- ======================================================================= -->
---

Let's polish things up with a background graphic and sound

- With the **"Game Layout"** open in the designer, in the **"Layers"** panel, select the **"Background"** layer.  
- Drag the **"Demo\Assets\Art\Background\NightSkyBackground2049.png"** graphic onto the layout, and position it to the left edge of the layout. Notice that it doesn't fill up the entire width.  We're going to adjust the parallax so it scrolls slower than the rest.  
- Again, select the **"Background Layer"** and change the **"Parallax"** to **"50,0"**
- In the **"Layers"** Panel, click on the **"Lock"** icon next to the layer name to lock the layer. 

	![69Background](images/69background.png?raw=true "Background")

- Import the **"Demo\Assets\Sounds\Background Music\DungeonCrawl.wav"** sound file to the "Music" folder
- Preload DungeonCrawl
- Add an action to the **System** | **On start of layout** to play it. 

	![70BackgroundMusic](images/70backgroundmusic.png?raw=true "Background Music")

- Play the game in the browser and notice the new background image and music. Close the browser when you are done.

A complete version of the game so far can be found here: "**12 - ZisForZombie - Background.capx"**