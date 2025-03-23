import {
	ListViewContainer,
	ListItemElement,
} from "./list-view-container/list-view-container.component.js";

export default function InitListViewContainer() {
	customElements.define("list-item", ListItemElement);
	customElements.define("list-view-container", ListViewContainer);
}
