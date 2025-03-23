import ListItemElement from "../list-view-item/list-view-item.component.js";

class ListViewContainer extends HTMLElement {
	listItemStyles = `
    list-item {
        border: 1px solid black;
        border-radius: 10px;
        display: block;
        padding: 10px;
        margin: 15px;
        box-sizing: content-box;
        min-height: 40px;
        box-shadow: 2px 2px 10px;
    }
    
    list-item:state(mouseover) {
        transform: scale(1.02);
    }`;
	shadoow;
	_data;

	get data() {
		return this._data;
	}

	set data(val) {
		this._data = JSON.parse(val);
		this.renderListView();
	}

	constructor() {
		super();
		this.initView.call(this);
	}

	initView() {
		this.shadoow = this.attachShadow({
			mode: "open",
		});
		const styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(this.listItemStyles);
		this.shadoow.adoptedStyleSheets = [styleSheet];
	}

	renderListView(data) {
		this._data.forEach((listItem, index) => {
			const listViewItem = document.createElement("list-item");
			listViewItem.id = index;
			listViewItem.setAttribute("data", JSON.stringify(listItem));
			this.shadoow.append(listViewItem);
		});
	}
}

export { ListItemElement, ListViewContainer };

// customElements.define("list-item", ListItemElement);
// customElements.define("list-view-container", ListViewContainer);

// export default function InitListViewContainer() {
// 	customElements.define("list-item", ListItemElement);
// 	customElements.define("list-view-container", ListViewContainer);
// }
