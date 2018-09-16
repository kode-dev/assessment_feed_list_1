# assessment_feed_list_1

Welcome to your KodeScreen assessment. 

AcmeCorp sells a software product called AcmeForce. When their end-users have a problem with AcmeForce, they can view support articles online to help resolve their issue. If they can't find what they're looking for in articles, they can submit a support case to AcmeCorp, that a support agent would address.

AcmeCorps' case agents need a way to see the latest submitted cases.

We'd like your help to display the **last 20 submitted** AcmeCorp cases, which should be kept **up-to-date within the last 10 seconds**.

This repository contains components to render a feed of support cases, along with a dummy API to pull more cases.

## Layout
* Landing Page
* Case Detail Page

## Case Model
A case will contain: 
* **label**: The subject line for the case.
* **description**: What the issue is.
* **clientName**: The name of the AcmeCorp client that submitted this case.
* **clientEmail** 
* **severity**: Severity of the case (LOW/MEDIUM/HIGH).

## Components
* **CaseListItem**: This represents a single case in the list of cases to be rendered. 
* **CaseList**: This is the list of CaseListItems.
* **NavigationBar**: Navigation bar that shows on both the landing page as well as the Case Detail Page.
* **React-Bootstrap Components**: A set of common base components that you can use if you need to.

## Getting Started

## Testing
