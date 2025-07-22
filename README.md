# VibeCheck
This is a personal planner and lifestyle management app designed for those who struggle with organization and motivation. 
It comes with the functions of many individual apps like calendar, reminders, notes, and files to create a go-to space for everything that needs to be tracked.

The UI is a top priority in the design of this app. The more straightforward and intuitive it is, the less time users need to spend learning how to use it and can just start using it. 

## Installation 

This app is not yet published. This project is currently in development. 

## Development 

The frontend is built using react native to ensure cross-platform compatibility. The backend is NodeJS and ExpressJS. The back-end will be connected to a MongoDB instance hosted on the free tier of MongoDB Atlas. Expo GO is utilized for UI development. 

## Features 

1. Users are first required to Sign Up. When they do, an email is sent to verify their account. Once their account has been verified, they can log in and start using the app.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/09aa67bf-39bf-447a-a154-f226ac10bbd6" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/2e62a6ff-f858-498b-ac39-0fcdac5e0c92" width="200" height="450" />

2. Once logged in, the users are directed to the Home page of the app. This contains the profile picture in the top left and a textbox for users to write themselves a motivational message at the top. Underneath that, there is a toolbar that has today's date, followed by a calendar button, search button, filter button, and a button to create new items in the calendar below. Users can easily see their daily, weekly, or monthly calendars right from the home screen using the respective buttons.  
<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/df14309a-e25d-487f-8bbf-1ee6618c0000" />
<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/5b215f94-db41-48e9-8649-e15e1bbdb199" />
<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/7c0d8ec0-b534-448b-bcc2-1a5b9b350c03" />

3. Using the calendar button, users can jump to a date to see their items on that day/week/month:
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/940485ed-a367-4c15-9174-d61eac502e20" width="200" height="450" />

4. One of the key features of this app is its easy searching and filtering. When users click the filter button, a modal pops up with fields of an item (such as its folder, duration, priority, type, etc.) that allow users to retrieve any item on their calendar quickly.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/d1ff2884-0d00-45f9-a6b7-e80aafe1d50a" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/dd6db0d8-af31-4225-9c61-07b536824461" width="200" height="450" />


5. This is the default template (certain fields can be hidden or collapsed to avoid cluttering on the screen):
   
   <img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/7e3bc9d5-b9cd-48a7-a467-c74d7e3883ee" />
   <img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/986c67f0-e033-4012-a563-aa6a84bccb37" />
   <img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/6608604d-b50a-405c-8a32-ef982d1a30b9" />


6. Items can be filed immediately into a folder, left in the Backlog (a default folder), or scheduled to the calendar. When an item on the calendar is selected, it opens up a screen with the item's details. Certain fields are collapsible, and certain fields like the favicon or description are omitted if they have no value. Users cannot edit the item details on this screen; they must choose to edit the item. 

<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/70c9a2d2-c65f-48f2-8f93-a132274e252b" />

7. Back from the homescreen, the list button on the bottom navigation bar leads to a directory page. Here are the folders (referred to as "categories") and its sections. To limit nesting, no folders can be created inside a section.

<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/311b9dc7-8fc5-47ad-ba40-11f4e99f4ecc" />

8. There is a contacts page where the contacts are displayed in a grid and shown in a modal when clicked:

<img width="200" height="450" alt="image" src="https://github.com/user-attachments/assets/2eb6e38f-0981-46cd-ae33-cefe89f425b0" />

