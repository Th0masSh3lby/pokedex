Project - Pokedex App

deployed link - "https://Th0masSh3lby.github.io/pokedex/"

Required Features ---> Search page, Listing Page, View details Page,
Bookmarks Page

Assumptions:

1. Max Number of Pokemons = 999
2. for HomePage: Intial fetch list of 20 pokemons
   Send for 20 more pokemon requests if scroll bar goes below a certain point
3. for SearchPage: -Fetch and search the list of 20 pokemons on succesful submit.
   Fetch and search for more if the list is below 3/ scrollbar goes below a certain point.
   Filter for type is sufficient
   setLoading spinner to true during the search and fetch requests;
4. for ViewDetails: -Open as a popup
   Showing 2 sets of info --- Basic info and Stats;

Current Features

1. NavBar -- Done
2. Footer -- Done
3. HomePage -- Done
4. ViewPage -- Done
5. BookMarks -- Done

Steps Taken

1. NavBar --Done
2. Footer --Done
3. HomePage (CSs left)
4. Features - List all Pokemons(using infinte scroll ==> send api request for more only if the scrollbar is below a certain mark) - Set Loading Spinner --Done - navigate from card to view Full details
5. CardCSS -- Done
6. ViewPage/card
   Features - Popup , Toggle Bookmark button
   JS and CSS Done
7. HomePage CSS - Done
8. SearchPage(css Left)

Features - start sending api request only after Search button is submitted. - Infinite scroll, Loading spinner and Viewcard same as Home Page.
-Filter (initial thought filter for both type and abilities but number of abilities exceeded 20 so added only type filter)

9. SearchPageCSS - Done
10. Bookmark and BookmarkCSS
11. Features - Imported bookmarks and other features are same as HOmePage
12. Adding to github and deploying - Done
