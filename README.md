# grid

A simple way to visualize geometric objects on a 2D coordinate plane.

[Hosted on GitHub Pages](https://mizlan.github.io/grid/)


## usage

### create a new shape

To create a new shape, click "add" and then choose the desired shape from the
drop down list. Polygon can be used to implement most shapes, such as lines,
triangles, squares, rectangles, and so on. Rectangle uses 4 values: two for
the x-coordinates and two for the y-coordinates. Circle takes in a radius and
the center as two coordinates.

### define coordinates

grid uses whitespace-separated numbers as values. Simply type out or copy paste
the desired input data and grid will hot reload all edits. grid will not display
shapes with invalid data, including NaN's or incorrect parameter length.

### change grid settings

grid provides two modifiable settings: step size and step range, where one "step"
represents the area between two consecutive tick marks as shown on the graph.

To make the spacing between these tick marks bigger, set a custom pixel value for
the "pixel width" input box. Values must be bigger than 20px and the default is 50px.

To change the numerical representation of a step (for example, treating every
step as an increase of 2 instead of 1), use the "step range" attribute. The
default value is 1.
