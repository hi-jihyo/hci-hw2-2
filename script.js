/**
 * class TreeParser to parse a tree of gui nodes and render them, which was for homework 2-2.
 */
class TreeParser {
    static init() {
        let canvas = document.getElementById('my-canvas');
        if (!canvas.getContext) {
            alert("Your browser doesn't support canvas!");
        }
    }
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
        this._render_rectangle(context, node.content_box, node.style);
        this._render_rectangle(context, node.title_box, node.style);
        context.fillStyle = node.style.font.color;
        context.font = node.style.font.size + "px " + node.style.font.family;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.title, node.title_box.position.x + node.title_box.width/2, node.title_box.position.y + node.title_box.height/2);
    }
    static _render_button_node(context, node) {
        this._render_rectangle(context, node.content_box, node.style);
        context.fillStyle = node.style.font.color;
        context.font = node.style.font.size + "px " + node.style.font.family;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_textbox_node(context, node) {
        this._render_rectangle(context, node.content_box, node.style);
        context.fillStyle = node.style.font.color;
        context.font = node.style.font.size + "px " + node.style.font.family;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_label_node(context, node) {
        this._render_rectangle(context, node.content_box, node.style);
        context.fillStyle = node.style.font.color;
        context.font = node.style.font.size + "px " + node.style.font.family;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(node.text, node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
    }
    static _render_checkbox_node(context, node) {
        this._render_rectangle(context, node.content_box, node.style);

        if (node.isChecked) {
            context.fillStyle = node.style.font.color;
            context.font = node.style.font.size + "px " + node.style.font.family;
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillText("✓", node.content_box.position.x + node.content_box.width/2, node.content_box.position.y + node.content_box.height/2);
        }
    }
    static _render_rectangle(context, rectangle, style) {
        context.fillStyle = style.background.color;
        if ('border' in style) {
            context.strokeStyle = style.border.color;
            if ('radius' in rectangle) {
                this._stroke_rounded_rect(context, rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height, rectangle.radius);
                this._fill_rounded_rect(context, rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height, rectangle.radius);
            }
            else {
                context.strokeRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
                context.fillRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
            }
        }
        else {
            if ('radius' in rectangle) {
                this._fill_rounded_rect(context, rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height, rectangle.radius);
            }
            else {
                context.fillRect(rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
            }
        }
    }
    static _fill_rounded_rect(context, x, y, width, height, radius) {
        context.beginPath();
        context.moveTo(x, y + radius);
        context.lineTo(x, y + height - radius);
        context.arcTo(x, y + height, x + radius, y + height, radius);
        context.lineTo(x + width - radius, y + height);
        context.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        context.lineTo(x + width, y + radius);
        context.arcTo(x + width, y, x + width - radius, y, radius);
        context.lineTo(x + radius, y);
        context.arcTo(x, y, x, y + radius, radius);
        context.fill();
    }
    static _stroke_rounded_rect(context, x, y, width, height, radius) {
        context.beginPath();
        context.moveTo(x, y + radius);
        context.lineTo(x, y + height - radius);
        context.arcTo(x, y + height, x + radius, y + height, radius);
        context.lineTo(x + width - radius, y + height);
        context.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        context.lineTo(x + width, y + radius);
        context.arcTo(x + width, y, x + width - radius, y, radius);
        context.lineTo(x + radius, y);
        context.arcTo(x, y, x, y + radius, radius);
        context.stroke();
    }
}