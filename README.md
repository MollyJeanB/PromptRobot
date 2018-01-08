# PromptRobot
Prompt Robot is a web app that uses the GIPHY API and the Words API to generate writing prompts for writers and creative writing teachers. The live version is available at https://promptrobot.herokuapp.com/. This project was built with HTML, CSS, JavaScript, jQuery, and Node.

Surrealist artist Max Ernst wrote that creativity is "that marvelous capacity to grasp mutually distinct realities and draw a spark from their juxtaposition." This app randomizes over large quantities of data to pull a GIF and a set of three words that aim to surprise and inspire through their juxtaposition. While testing a prototype of the app, one high school English teacher said that Prompt Robot would be a visually engaging way to get beginning writers in his classroom interested in starting new projects.

User summary: 

When a user opens the app, the robot is empty and intro text below the header explains the app and prompts the user to click the 'New Prompt' button.

![ScreenShot](https://github.com/MollyJeanB/PromptRobot/blob/master/screenshots/img1_startview.png)

A user can select whether they wish to see only g-rated GIFs via a toggle switch.

![ScreenShot](https://github.com/MollyJeanB/PromptRobot/blob/master/screenshots/img4_controls.png)

Once the button is clicked, a GIF, an adjective, a noun, and a verb appear in the content boxes. The GIF data is fetched via GIPHY's randomzing endpoint, with a randomized tag word from a bank sent as a parameter. Each word is fetched through a separate API call via a web server. Each call sends a different part of speech as a parameter.

![ScreenShot](https://github.com/MollyJeanB/PromptRobot/blob/master/screenshots/img2_withPrompt.png)

When a user mouses over a word, the box is highlighted. When a user clicks on a word, a separate tab opens with the dictionary.com definition of that word. 

![ScreenShot](https://github.com/MollyJeanB/PromptRobot/blob/master/screenshots/img3_wordHighlighted.png)

On smaller screens and mobile, the content blocks within the robot stack for a smoother UX.

![ScreenShot](https://github.com/MollyJeanB/PromptRobot/blob/master/screenshots/img5_responsiveView.png)

To learn more about the dictionary API used in this project, visit https://www.wordsapi.com/
And for GIPHY's API documentation, see https://developers.giphy.com/



