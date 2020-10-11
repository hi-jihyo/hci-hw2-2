class TreeParser {
    static render_tree(tree) {
        let canvas = document.getElementById('my-canvas');
        let context = canvas.getContext('2d');

        let node_list = tree.list_nodes();
        for (let i = node_list.length-1; i >= 0; i--) {
            if (node_list[i].type === "Window")
                this._render_window_node(context, node_list[i]);
            if (node_list[i].type === "Button")
                this._render_button_node(context, node_list[i]);
            if (node_list[i].type === "Textbox")
                this._render_textbox_node(context, node_list[i]);
            if (node_list[i].type === "Label")
                this._render_label_node(context, node_list[i]);
            if (node_list[i].type === "Checkbox")
                this._render_checkbox_node(context, node_list[i]);
        }
    }
    static _render_window_node(context, node) {
        this._render_border_rectangle(context, node.content_box, node.style);
        this._render_border_rectangle(context, node.title_box, node.style);
        context.fillStyle = "#000000";
        context.font = "20px serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.title, node.title_box.position.x + node.title_box.width/2, node.title_box.position.y + node.title_box.height/2);
    }
    static _render_button_node(context, node) {
        this._render_border_rectangle(context, node.content_box, node.style);
        context.fillStyle = "#000000";
        context.font = "20px serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_textbox_node(context, node) {
        this._render_border_rectangle(context, node.content_box, node.style);
        context.fillStyle = "#000000";
        context.font = "20px serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_label_node(context, node) {
        this._render_borderless_rectangle(context, node.content_box, node.style);
        context.fillStyle = "#000000";
        context.font = "20px serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_checkbox_node(context, node) {
        this._render_border_rectangle(context, node.content_box, node.style);

        if (node.isChecked) {
            context.fillStyle = "#000000";
            context.font = "20px serif";
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillText("✓", node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
        }
    }
    static _render_border_rectangle(context, rectangle, style) {
        context.strokeStyle = style.border.color;
        context.strokeRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
        context.fillStyle = style.background.color;
        context.fillRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
    }
    static _render_borderless_rectangle(context, rectangle, style) {
        context.fillStyle = style.background.color;
        context.fillRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
    }
}