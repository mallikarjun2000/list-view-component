# List View Renderer

-   Library code to render static list of items from an array with title and description.

Usage:

1. After importing the package.
2. Run the init function in your index file.
3. Start using the tags <list-view-container data="">
4. Pass an array to data attribute.

Example:

```
const listItemContainerElement = document.createElement("list-view-container");
listItemContainerElement.data = JSON.stringify(shoppingList);
container.append(listItemContainerElement);
```
