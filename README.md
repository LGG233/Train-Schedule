# Train-Schedule

# All Around the Island

All Around the Island is a project that produces a train schedule based on the provided on an "add train" form. Users enter the train name, the station where the train is scheduled to stop, the time of day that train first runs, and the time it takes for the train to loop back to that station. The schedule calculates both the next time the train will arrive and the minutes until that happens.

# Observations

The project was difficult: we had to use Firebase to save each individual train's data (and recall it again each time the page was refreshed), moment.js to calculate both the arrival time of the next train and the number of minutes for that to happen, and modals to alert users to incomplete data on the add train form and the success of the new train registration.

I also had some scoping problems that I solved using global variables. It wasn't the most elegant solution, but it worked.

- - -

# Why the Project Is Useful 
This exercise was very useful. In addition to working with the new function (modal) and technology (moment.js), the homework required me to set up and manage an external database for data persistence, something I'll use regularly going forward. 

The two new items, modals and moment.js, are things that I will no doubt use quite often going forward, so it was helpful to work with them a bit (even if my use was rudimentary). 

The code itself was fairly straightforward (with the exception of the moment.js function). I only created four functions (two of which are for the two modals used in the project). 