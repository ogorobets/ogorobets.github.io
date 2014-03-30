Task description
================

Implement class `Slider`. Slider consists of fixed amount of 4 slides. Images have the same  dimensions known in advance. Changing slides is animated. When one of the bars on the left is clicked then slide is changed. Order of bars on the left coincides with one of slides(images). First bar - first slide, second bar from the top - second slide, etc. Right after initialization slider enables autoscrolling mode: another slide shows each 2 seconds. If user clicked on one of the bars on the left and after that current slide was changed then  autoscrolling mode has to be disabled. Autoscrolling mode has to be enabled again after bar was clicked and 5 seconds expired. Autoscrolling is cyclic: after the last slide is shown first slide is shown again. There is can be more than one slider on th page.

- use opportunities of jQuery for maximum 
- slider has to work in ie8
- no ready-made plugins have to be used, only write your own code
- slider has to be implemented using prototypes 
