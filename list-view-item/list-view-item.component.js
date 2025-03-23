export default class ListItemElement extends HTMLElement {
	shadowDOMElement;
	static observedAttributes = ["data", "dataset"];
	mouseEnterStyles = `
		:state(mouseover) {
			transform: scale(0.7);
		}
	`;

	constructor() {
		super();
		this._internals = this.attachInternals();
		this.initView.call(this);
		this.addEventListener("mouseenter", (e) => {
			this._internals.states.add("mouseover");
		});
		this.addEventListener("mouseleave", (e) => {
			this._internals.states.delete("mouseover");
		});
	}

	connectedCallback() {}

	initView() {
		this.shadowDOMElement = this.attachShadow({
			mode: "open",
		});
		const styleSheet = new CSSStyleSheet();
		styleSheet.replaceSync(this.mouseEnterStyles);
		this.shadowDOMElement.adoptedStyleSheets = [styleSheet];
	}

	generateTemplateContent(titleText, descriptionText) {
		const title = this.createDOMElement("h3", "title", titleText);
		const description = this.createDOMElement(
			"p",
			"description",
			descriptionText
		);
		return [title, description];
	}

	createDOMElement(tagName, id, content) {
		const element = document.createElement(tagName);
		element.id = id;
		element.tabindex = 0;
		element["aria-label"] = content;
		element.innerText = content;
		return element;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "data") {
			const { title, description } = JSON.parse(newValue);
			const children = this.generateTemplateContent(title, description);
			children.forEach((child) => {
				this.shadowDOMElement.appendChild(child);
			});
		}
	}

	disconnectedCallback() {
		this.removeEventListener("mouseenter");
		this.removeEventListener("mouseleave");
	}
}
