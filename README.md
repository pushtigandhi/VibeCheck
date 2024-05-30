# VibeCheck
This is a a personal planner and lifestyle management app designed for those that struggle with organization and motivation. 
It comes the functions of many individual apps like calendar, reminders, notes, and files to create a go-to space for everything that needs to be tracked.

The UI is a top priority in this app's design. The more straightforward and intuitive it is, the less time users need to spend learning how to use it and can just start using it. 

## Installation 

This app is not yet published. This project is currently in development. 

## Development 

The frontend is built using react native to ensure cross-platform compatibility. The backend is NodeJs and ExpressJS. The back-end will be connected to a mongoDB instance hosted on the free-tier of mongo atlas. Expo GO is utilized for UI development. 

## Features 

1. Users are first required to Sign Up. When they do, an email is sent to verify their account. Once their account has been verified, they can login and start using the app.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/09aa67bf-39bf-447a-a154-f226ac10bbd6" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/2e62a6ff-f858-498b-ac39-0fcdac5e0c92" width="200" height="450" />

2. Once logged in, the users are directed to the Home page of the app. This contains the profile picture in the top left and a textbox for users to write themselves a motivational message at the top. Underneath that, there is a toolbar that has today's date, followed by a a calendar button, search button, filter button, and a button to create new items in the calendar below. Users can easily see their daily, weekly, or monthly calendars right from the home screen using the respective buttons.  
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/186c0a9d-2310-4d3b-9373-2d5964ea3b6c" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/2f8f4795-c520-40f7-9df6-8b365f0f5906" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/ba20cd49-99d7-4075-a193-94d2b888e099" width="200" height="450" />

3. Using the calendar button, users can jump to a date to see their items on that day/week/month:
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/940485ed-a367-4c15-9174-d61eac502e20" width="200" height="450" />

5. One of the key features of this app is its easy searching and filtering. When users click the filter button, a modal pops up with fields of an item (such as its folder, duration, priority, type, etc.) that allow users to quickly retrieve any item on their calendar.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/d1ff2884-0d00-45f9-a6b7-e80aafe1d50a" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/dd6db0d8-af31-4225-9c61-07b536824461" width="200" height="450" />

6. Back from the home page, when users select the add button on the calendar's toolbar, it takes them to a screen that allows them to schedule a new or existing item.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/016653ed-688d-4ac8-81ef-278807398bcb" width="200" height="450" />

7. When users choose to create a new item (either from the schedule screen or from the add button on the homescreen's bottom navigation bar), they must first select the item type which opens a specific template for each item where users can add in info and an image from their phone's photo gallery. As of now, there are five types. 
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/4ddc5a25-81c7-47a9-98d3-bd62691f9265" width="200" height="450" />

8. The templates are in order: Item, Task, Event, Page, and Recipe (certain fields are collapsable to avoid cluttering on the screen):
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/dcc280b8-73c0-412c-a046-a5c3ad0cade7" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/dface7d9-7077-4271-99a3-0cc6ec20144d" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/6d05b897-8455-4ff9-be67-06f8927e245c" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/c210eaf8-825d-4beb-9984-e71ed9477a84" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/5db3b012-14c9-47c3-8190-45cdb1f3c868" width="200" height="450" />

9. Items can be filed immediately into a folder, left in the Backlog (a default folder), or scheduled to the calendar. When an item on the calendar is selected, it opens up a screen with the item's details. Certain fields are collapsable and certain fields like the favicon or description are omitted if they have no value. Users cannot edit details of the item on this screen; however, if there is a checklist, they can check and uncheck items on the list. 
Here are test examples of each:

<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/96bc50b6-62a3-4d75-ac9c-161a88b426ad" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/b2afa6ab-1eec-409c-9f1f-e7436a52a8e5" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/1fafb032-77a3-4d22-a500-eabbdfe71a9c" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/80e7493e-9d2d-4141-8114-2ae7fe3718c8" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/c6aab178-110d-4a60-9a27-5e51b7d0cf6a" width="200" height="450" />
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/7a22ffe8-b0b3-4841-a097-bd06a54879dd" width="200" height="450" />

9. Back from the homescreen, the list button on the bottom navigation bar leads to a directory page. Here are the folders (referred to as "categories") and its sections. To limit nesting, no folders can be created inside a section. This screen as well as section views are under construction.
<img src="https://github.com/pushtigandhi/VibeCheck/assets/47700298/4c8d70da-f19e-4c8b-8d11-7029cc15b2da" width="200" height="450" />


