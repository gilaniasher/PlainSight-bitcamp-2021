# PlainSight
Chrome extension that identifies and summarizes celebrities using Google Cloud Vision and the Wikipedia API.

[Github.io Site!](https://gilaniasher.github.io/PlainSight-bitcamp-2021/)

[Devpost Submission!](https://devpost.com/software/plainsight-x46jml)

- Quickly scan your screen for recognizable faces to provide useful information!
- Made by `Asher Gilani` `John Murray` `Eric Robertson` for Bitcamp 2021

![](https://raw.githubusercontent.com/gilaniasher/PlainSight-bitcamp-2021/main/example.gif)

![](https://raw.githubusercontent.com/gilaniasher/PlainSight-bitcamp-2021/main/chrome-extension/example.png)

## Technologies

- Chrome extension registers in your browser
- Clicking the extension takes a screenshot of your view and sends data to a Google Cloud Function
- Google Cloud Vision is invoked to process the image, recognize faces, and label them
- Wikipedia's API is queries for a description of each person and a link to their page is provided
- Data is returned to client for easy viewing
- Users come out more informed and knowledgeable in todays complicated world!