class Tree {
    // constructor of tree
    constructor () {
        this.root = undefined;
        this._id_set = [];
    }

    // method for creating a tree
    static create_tree() {
        return new Tree();
    }

    // methods for setting a root (a root should exist in a tree before any node is added to the tree)
    set_root(node) {
        if (node === this.root)
            return this.root;

        if (this._id_set.includes(node.id)) {
            console.error("[ERROR] id + '" + node.id + "' already exist in the tree");
            return;
        }
        
        if (typeof this.root !== 'undefined') {
            this.root.parent_node = node;
            node.child_list.push(this.root);
        }

        this.root = node;
        this._id_set.push(node.id);

        return this.root;
    }

    // methods for adding graphic properties to a node (used internally)
    // 1. for shape, such as point, rectangle, etc.
    _set_point(pos_x, pos_y) {
        if (typeof pos_x !== 'number') {
            console.error("[ERROR] invalid parameter: 'pos_x' sholud be a number");
        }
        if (typeof pos_y !== 'number') {
            console.error("[ERROR] invalid parameter: 'pos_y' sholud be a number");
        }

        return {
            x : pos_x,
            y : pos_y,
        };
    }
    _set_line(start_x, start_y, end_x, end_y) {
        return {
            start_point : this._set_point(start_x, start_y),
            end_point : this._set_point(end_x, end_y),
        };
    }
    _set_rectangle(pos_x, pos_y, width, height) {
        if (typeof width !== 'number' || width <= 0) {
            console.error("[ERROR] invalid parameter: 'width' sholud be a positive number");
        }
        if (typeof height !== 'number' || height <= 0) {
            console.error("[ERROR] invalid parameter: 'height' sholud be a positive number");
        }

        return {
            position : this._set_point(pos_x, pos_y),
            width : width,
            height : height,
        };
    }
    _set_circle(pos_x, pos_y, radius) {
        if (typeof radius !== 'number' || radius <= 0) {
            console.error("[ERROR] invalid parameter: 'radius' sholud be a positive number");
        }

        return {
            position : this._set_point(pos_x, pos_y),
            radius : radius,
        };
    }
    // 2. for style, such as font color, line weight, etc.
    _set_font_style(size, family) {
        return {
            size : size,
            family : family,
        };
    }
    _set_line_style(color, weight) {
        return {
            color : color,
            weight : weight,
        };
    }
    _set_background_style(color) {
        return {
            color : color,
        };
    }

    // methods for creating a node or an extended node (i.e., a GUI node)
    create_node(id) {
        let new_node = {
            id : id,
            parent_node : undefined,
            child_list : [],
            type : "Node",
        };
        return new_node;
    }
    create_window(id, pos_x, pos_y, width, height, title) {
        let new_window = this.create_node(id);
        new_window.type = "Window";
        new_window.content_box = this._set_rectangle(pos_x, pos_y+20, width, height);

        let title_width = width, title_height = 20;
        let title_pos_x = pos_x, title_pos_y = pos_y;
        new_window.title_box = this._set_rectangle(title_pos_x, title_pos_y, title_width, title_height);
        new_window.title = title;
    
        new_window.style = {};
        new_window.style.background = this._set_background_style("#cdcdcd");
        new_window.style.border = this._set_line_style("#000000", "3px");
        new_window.style.font = this._set_font_style(10, "Arial");

        return new_window;
    }
    create_button(id, pos_x, pos_y, width, height, text) {
        let new_button = this.create_node(id);
        new_button.type = "Button";
        new_button.content_box = this._set_rectangle(pos_x, pos_y, width, height);
        new_button.text = text;

        new_button.style = {};
        new_button.style.background = this._set_background_style("#cdcdcd");
        new_button.style.border = this._set_line_style("#000000", "3px");
        new_button.style.font = this._set_font_style(10, "Arial");

        return new_button;
    }
    create_textbox(id, pos_x, pos_y, width, height, text) {
        let new_textbox = this.create_node(id);
        new_textbox.type = "Textbox";
        new_textbox.content_box = this._set_rectangle(pos_x, pos_y, width, height);
        new_textbox.text = text;
        
        new_textbox.style = {};
        new_textbox.style.background = this._set_background_style("#cdcdcd");
        new_textbox.style.border = this._set_line_style("#000000", "3px");
        new_textbox.style.font = this._set_font_style(10, "Arial");

        return new_textbox;
    }
    create_label(id, pos_x, pos_y, width, height, text) {
        let new_label = this.create_node(id);
        new_label.type = "Label";
        new_label.content_box = this._set_rectangle(pos_x, pos_y, width, height);
        new_label.text = text;

        new_label.style = {};
        new_label.style.background = this._set_background_style("#cdcdcd");
        new_label.style.font = this._set_font_style(10, "Arial");

        return new_label;
    }
    create_checkbox(id, pos_x, pos_y, width, height) {
        let new_checkbox = this.create_node(id);
        new_checkbox.type = "Checkbox";
        new_checkbox.content_box = this._set_rectangle(pos_x, pos_y, width, height);
        new_checkbox.isChecked = false;

        new_checkbox.style = {};
        new_checkbox.style.background = this._set_background_style("#cdcdcd");
        new_checkbox.style.border = this._set_line_style("#000000", "3px");

        return new_checkbox;
    }

    // methods for setting or editing style of a node
    set_font_size(node, size) {
        if (node.type === "Node" || node.type === "Checkbox") {
            console.error("[ERROR] type '" + node.type + "' doesn't have a font size property");
            return;
        }
        node.style.font.size = size;
    }
    set_font_family(node, family) {
        if (node.type === "Node" || node.type === "Checkbox") {
            console.error("[ERROR] type '" + node.type + "' doesn't have a font family property");
            return;
        }
        node.style.font.family = family;
    }
    set_line_color(node, color) {
        if (node.type === "Node" || node.type === "Checkbox" || node.type === "Label") {
            console.error("[ERROR] type '" + node.type + "' doesn't have a line color property");
            return;
        }
        node.style.border.color = color;
    }
    set_line_weight(node, weight) {
        if (node.type === "Node" || node.type === "Checkbox" || node.type === "Label") {
            console.error("[ERROR] type '" + node.type + "' doesn't have a line weight property");
            return;
        }
        node.style.border.weight = weight;
    }
    set_background_color(node, color) {
        if (node.type === "Node" || node.type === "Checkbox") {
            console.error("[ERROR] type '" + node.type + "' doesn't have a background color property");
            return;
        }
        node.style.background.color = color;
    }

    // methods for adding or deleting a node to/from a tree
    add_node(parent, child) {
        if (!this._is_node(parent)) {
            console.error("[ERROR] can't add a data that is not a node : 'parent' is not a node")
        }
        if (!this._is_node(child)) {
            console.error("[ERROR] can't add a data that is not a node : 'child' is not a node")
        }

        if (this._id_set.includes(child.id)) {
            console.error("[ERROR] id '" + child.id + "' already exist in the tree");
            return;
        }

        if (typeof child.parent_node !== 'undefined') {
            console.error("[ERROR] can't add a node that has a parent : 'child' already has a parent");
            return;
        }

        child.parent_node = parent;
        parent.child_list.push(child);
        this._id_set.push(child.id);
    }
    delete_node(del_node) {
        if (!this._is_node(del_node)) {
            console.error("[ERROR] can't delete a data that is not a node : 'del_node' is not a node");
            return;
        }

        let idx = this._id_set.indexOf(del_node.id);
        this._id_set.splice(idx, 1);

        if (del_node === this.root) {
            if (del_node.child_list.length > 0) {
                this.root = del_node.child_list.shift();
                this.root.parent_node = undefined;
                while (del_node.child_list.length > 0) {
                    let tmp_node = del_node.child_list.shift();
                    this.root.child_list.push(tmp_node);
                }
                return this.root;
            }
            else {
                this.root = undefined;
                return del_node;
            }
        }
        else {
            let parent_node = del_node.parent_node;
            while (del_node.child_list.length > 0) {
                let tmp_node = del_node.child_list.shift();
                parent_node.child_list.push(tmp_node);
            }
            
            let del_idx = parent_node.child_list.indexOf(del_node);
            return parent_node.child_list.splice(del_idx, 1);
        }
    }
    _is_node(x) {
        let node_set = [ "Node", "Window", "Button", "Textbox", "Label", "Checkbox" ];
        if (typeof x !== 'object' ||
            !('type' in x) ||
            !(node_set.includes(x.type)) ) {
                return false;
        }
        return true;
    }

    // method for searching a node with id
    search_node(id) {
        if (!this._id_set.includes(id)) {
            console.error("[ERROR] 'id' doesn't exist");
            return;
        }

        let result = this._search_node_in_subtree(this.root, id);
        return result;
    }
    _search_node_in_subtree(sub_root, id) {
        if (sub_root.id === id)
            return sub_root;
        
        for (let i = 0; i < sub_root.child_list.length; i++) {
            let result = this._search_node_in_subtree(sub_root.child_list[i], id);
            if (result) return result;
        }

        return undefined;
    }
    // methods for listing such node(s)
    list_nodes() {
        let result = this._list_nodes_in_subtree(this.root);
        return result;
    }
    _list_nodes_in_subtree(sub_root) {
        let node_list = [];

        for (let i = 0; i < sub_root.child_list.length; i++) {
            let sub_node_list = this._list_nodes_in_subtree(sub_root.child_list[i]);
            while (sub_node_list.length > 0) {
                let tmp_node = sub_node_list.shift();
                node_list.push(tmp_node);
            }
        }

        node_list.push(sub_root);
        return node_list;
    }
    list_windows() {
        let result = this._list_gui_nodes_in_subtree(this.root, "Window");
        return result;
    }
    list_buttons() {
        let result = this._list_gui_nodes_in_subtree(this.root, "Button");
        return result;
    }
    list_textboxs() {
        let result = this._list_gui_nodes_in_subtree(this.root, "Textbox");
        return result;
    }
    list_labels() {
        let result = this._list_gui_nodes_in_subtree(this.root, "Label");
        return result;
    }
    list_checkboxs() {
        let result = this._list_gui_nodes_in_subtree(this.root, "Checkbox");
        return result;
    }
    _list_gui_nodes_in_subtree(sub_root, type) {
        let node_list = [];

        for (let i = 0; i < sub_root.child_list.length; i++) {
            let sub_node_list = this._list_gui_nodes_in_subtree(sub_root.child_list[i], type);
            while (sub_node_list.length > 0) {
                let tmp_node = sub_node_list.shift();
                node_list.push(tmp_node);
            }
        }

        if (sub_root.type === type)
            node_list.push(sub_root);
        
        return node_list;
    }
    
    // method for printing a tree in a post-order dfs way
    print_in_dfs() {
        let layer = 0;
        for (let i = 0; i < this.root.child_list.length; i++) {
            this._print_sub_tree(this.root.child_list[i], layer+1, i);
        }
        console.log("1th element at layer " + layer + ": " + this.root.type + "(" + this.root.id + ")");
    }
    _print_sub_tree(node, layer, order) {
        for (let i = 0; i < node.child_list.length; i++ ){
            this._print_sub_tree(node.child_list[i], layer+1, i);
        }
        console.log((order+1) + "th element at layer " + layer + ": " + node.type + "(" + node.id +")");
    }
}

const Main = () => {
    my_tree = Tree.create_tree();
    my_node = my_tree.create_window("window-1", 10, 10, 500, 500, "My Window");
    my_tree.set_root(my_node);
    my_node = my_tree.create_button("button-1", 50, 50, 100, 30, "My Button");
    my_tree.add_node(my_tree.root, my_node);
    my_node = my_tree.create_textbox("textbox-1", 100, 100, 200, 200, "My Textbox");
    my_tree.add_node(my_tree.root, my_node);
    my_node = my_tree.create_label("label-1", 80, 400, 150, 30, "My Label");
    my_tree.set_background_color(my_node, "#345678");
    my_tree.add_node(my_tree.root, my_node);
    my_node = my_tree.create_checkbox("checkbox-1", 400, 400, 20, 20);
    my_node.isChecked = true;
    my_tree.add_node(my_tree.root, my_node);
}
Main();