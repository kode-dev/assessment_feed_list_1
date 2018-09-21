# KodeScreen Support Case List Assessment 1

Welcome to your KodeScreen assessment. 

AcmeCorp sells a software product called AcmeForce. When their end-users have a problem with AcmeForce, they can view support articles online to help resolve their issue. If they can't find what they're looking for in those articles, they can file a support case to AcmeCorp, that an Acme support agent would handle.

AcmeCorps' support agents need a way to see the latest submitted cases.

We'd like your help to display the **last 20 submitted** AcmeCorp cases, which should be kept **up-to-date within the last 10 seconds**.

This repository contains components to render a feed of support cases, along with a dummy API to fetch these cases from a data store. 

## Your Environment
You'll need [NodeJS and NPM](https://www.npmjs.com/get-npm) to be able to run this project. 

## Getting Started
### Running the test server
We've implemented a test server to represent the backend and database for this problem. 

To start the server run these commands from the base directory:
```
cd feed-test-server
npm install
npm start
```
This will start the application server at **localhost:3000**.

### Running the Front-end Development Environment

To start the front-end development server, run these commands from the base directory:
```
cd case-feed-ui
npm install
npm run-script dev
```
This will allow you to see the UI at **localhost:8080** on your browser.

All the best! Don't hesitate to ask your interviewer any questions you have.

## Submission
All of your changes should take place inside the case-feed-ui directory. There's no need to touch / modify the server code. It exists simply to give you the data you need to render & update the front-end.

Submit your work by pushing to a branch titled: 'case-feed-20'.

You can create a branch at the start:
```
git checkout -b case-feed-20 
```
When it's time to submit your changes: 
```
git add .
git commit -m "<your commit message>"
git push origin case-feed-20
```
Make sure to submit your changes before the deadline: 90 minutes after you start. Your interviewer will remind you in Slack a few mins before the end, to make sure you get your changes in.

[GIT reference](https://git-scm.com/docs)

## Layout
* Landing Page
* Case Detail Page

## Support Case Model
A support case contains: 
* **label**: Subject line for the case.
* **description**: Issue description.
* **clientName**: Name of AcmeCorp client who submitted this case.
* **clientEmail**
* **severity**: Severity of the case ('LOW'/'MEDIUM'/'HIGH').

## Components
* **CaseListItem**: This represents a single case to be rendered in a list.
* **CaseList**: This is the list of CaseListItems.
* **NavigationBar**: Navigation bar that shows on both the landing page as well as the Case Detail Page.
* [**React-Bootstrap Components**](https://react-bootstrap.github.io/components/alerts/): A set of common base components that you can use if you need to.
